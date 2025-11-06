<?php

use App\Api\Http\Controllers\MockApiController;
use Illuminate\Support\Facades\Route;

Route::get('mock/{fileName}', [MockApiController::class, 'get'])->middleware('api')->name('mock-api');
Route::post('mock/{fileName}', [MockApiController::class, 'create'])->middleware('api')->name('mock-api');
