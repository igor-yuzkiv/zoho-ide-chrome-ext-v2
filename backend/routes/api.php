<?php

use App\Api\Http\Controllers\AuthController;
use App\Api\Http\Controllers\MockApiController;
use App\Api\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/**
 * Authentication Routes
 */
Route::group(
    [
        'middleware' => ['api'],
        'prefix'     => 'auth',
        'as'         => 'auth.',
        'controller' => AuthController::class,
    ],
    function () {
        Route::post('login', 'login')->name('login');
        Route::get('me', 'me')->name('me')->middleware('auth:sanctum');
    }
);

/**
 * User Management Routes
 */
Route::group(
    [
        'middleware' => ['api', 'auth:sanctum'],
        'prefix'     => 'users',
        'as'         => 'users.',
        'controller' => UserController::class,
    ],
    function () {
        Route::get('', 'index')->name('index');
        Route::get('{userId}', 'show')->name('show');
        Route::post('', 'create')->name('create');
        Route::put('{userId}', 'update')->name('update');
        Route::delete('{userId}', 'delete')->name('delete');
    }
);

/**
 * Mock API Routes
 */
Route::group(
    [
        'middleware' => ['api'],
        'prefix'     => 'mock',
        'as'         => 'mock.',
        'controller' => MockApiController::class,
    ],
    function () {
        Route::get('{fileName}', 'get')->name('get');
        Route::post('{fileName}', 'create')->name('create');
    }
);
