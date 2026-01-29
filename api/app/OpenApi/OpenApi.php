<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\OpenApi(
    info: new OA\Info(
        title: 'Bumpa Loyalty API',
        version: '1.0.0',
        description: 'API documentation for the Bumpa loyalty and rewards service.'
    ),
    servers: [
        new OA\Server(
            url: 'http://localhost:8000/api',
            description: 'Local API'
        )
    ],
    components: new OA\Components(
        securitySchemes: [
            new OA\SecurityScheme(
                securityScheme: 'sanctum',
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'Sanctum token',
                description: 'Include the token as: Bearer {token}'
            )
        ]
    )
)]
class OpenApi
{
    // Marker class for OpenAPI meta definitions.
}
