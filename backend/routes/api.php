<?php

use App\Api\Http\Controllers\AttachmentsController;
use App\Api\Http\Controllers\AuthController;
use App\Api\Http\Controllers\KnowledgeBase\KnowledgeBaseController;
use App\Api\Http\Controllers\KnowledgeBase\KnowledgeBaseTemplateController;
use App\Api\Http\Controllers\MockApiController;
use App\Api\Http\Controllers\TagController;
use App\Api\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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
 * Knowledge Base Routes
 */
Route::group(
    [
        'middleware' => ['api', 'auth:sanctum'],
        'prefix'     => 'knowledge-base/items',
        'as'         => 'knowledge_base.items.',
        'controller' => KnowledgeBaseController::class,
    ],
    function () {
        Route::get('', 'index')->name('index');
        Route::get('{itemId}', 'show')->name('show');
        Route::post('', 'create')->name('create');
        Route::put('{itemId}', 'update')->name('update');
        Route::delete('{itemId}', 'deleteById')->name('delete-by-id');
    }
);

Route::group(
    [
        'middleware' => ['api', 'auth:sanctum'],
        'prefix'     => 'knowledge-base/templates',
        'as'         => 'knowledge_base.templates.',
        'controller' => KnowledgeBaseTemplateController::class,
    ],
    function () {
        Route::get('', 'index')->name('index');
    }
);

/**
 * Attachments routes
 */
Route::group(
    [
        'prefix' => '/attachments',
        'as'     => 'attachments.',
    ],
    function () {
        Route::get('{entityName}/{entityId}', [AttachmentsController::class, 'getEntityAttachments'])->name('getEntityAttachments');
        Route::post('{entityName}/{entityId}/attach', [AttachmentsController::class, 'attachToEntity'])->name('attachToEntity');
        Route::post('upload/tmp', [AttachmentsController::class, 'uploadTmpAttachment'])->name('uploadTmpAttachment');
    }
);

/**
 * Tags routes
 */
Route::group(
    [
        'prefix' => '/tags',
        'as'     => 'tags.',
    ],
    function () {
        Route::post('', [TagController::class, 'create'])->name('create');
        Route::post('search', [TagController::class, 'search'])->name('search');
    }
);
