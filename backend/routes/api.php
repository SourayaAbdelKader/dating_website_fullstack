<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get("/users/{id?}", [UserController::class, 'getUsers']);

Route::get("/favorites/{id?}", [UserController::class, 'getFavorites']);

Route::get("/addFavorite/{id?} {favorite_id?}", [UserController::class, 'addFavorite']);
Route::get("/block/{id?} {blocked_id?}", [UserController::class, 'block']);
Route::get("/messages/{id?}", [UserController::class, 'getMessages']);
Route::post("/notVisible", [UserController::class, 'notVisible']);
Route::post("/create", [UserController::class, 'createOrUpdateUser']);
Route::post("/sendMessage", [UserController::class, 'sendMessage']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
