<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Models\User;
use App\Events\PurchaseMade;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA;

class PurchaseController extends Controller
{
    #[OA\Post(
        path: '/purchases',
        tags: ['Purchases'],
        summary: 'Create a new purchase',
        description: 'Records a new purchase and triggers loyalty program processing',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['user_id', 'amount'],
                properties: [
                    new OA\Property(property: 'user_id', type: 'integer', description: 'User ID'),
                    new OA\Property(property: 'amount', type: 'number', format: 'float', description: 'Purchase amount'),
                    new OA\Property(property: 'currency', type: 'string', description: 'Currency code', default: 'NGN'),
                    new OA\Property(property: 'metadata', type: 'object', description: 'Additional purchase data', nullable: true)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Purchase created successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'id', type: 'integer'),
                        new OA\Property(property: 'user_id', type: 'integer'),
                        new OA\Property(property: 'amount', type: 'number'),
                        new OA\Property(property: 'currency', type: 'string'),
                        new OA\Property(property: 'metadata', type: 'object', nullable: true),
                        new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                        new OA\Property(property: 'updated_at', type: 'string', format: 'date-time')
                    ]
                )
            ),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'currency' => 'sometimes|string|size:3',
            'metadata' => 'sometimes|array',
        ]);

        $purchase = Purchase::create([
            'user_id' => $request->user()->id,
            'amount' => $validated['amount'],
            'currency' => $validated['currency'] ?? 'NGN',
            'metadata' => $validated['metadata'] ?? null,
        ]);

        // Fire purchase event to trigger loyalty processing
        event(new PurchaseMade($purchase));

        return response()->json($purchase, 201);
    }

    #[OA\Get(
        path: '/users/{user}/purchases',
        tags: ['Purchases'],
        summary: 'Get user purchase history',
        parameters: [
            new OA\Parameter(
                name: 'user',
                in: 'path',
                description: 'User ID',
                required: true,
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Success',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'purchases', type: 'array', items: new OA\Items(type: 'object')),
                        new OA\Property(property: 'total_spent', type: 'number'),
                        new OA\Property(property: 'purchase_count', type: 'integer')
                    ]
                )
            )
        ]
    )]
    public function getUserPurchases(Request $request, User $user): JsonResponse
    {
        if (! $request->user()->is($user)) {
            abort(403, 'You are not authorized to view this user.');
        }

        $purchases = $user->purchases()->orderBy('created_at', 'desc')->get();

        return response()->json([
            'purchases' => $purchases,
            'total_spent' => $user->total_spent,
            'purchase_count' => $user->purchase_count,
        ]);
    }
}
