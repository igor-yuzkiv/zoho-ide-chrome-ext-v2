<?php

use App\Api\Http\Controllers\MockApiController;
use App\Api\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'middleware' => ['api'],
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
