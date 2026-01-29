<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoyaltyController;
use App\Http\Controllers\Api\PurchaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/users/{user}/achievements', [LoyaltyController::class, 'getUserAchievements']);
    Route::get('/users/{user}/purchases', [PurchaseController::class, 'getUserPurchases']);
    Route::post('/purchases', [PurchaseController::class, 'store']);
});
