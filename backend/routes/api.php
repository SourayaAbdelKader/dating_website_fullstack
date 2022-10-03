<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User;
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
Route::get("/users/{id?}", [User::class, 'getUsers']);

Route::get("/favorites/{id?}", [User::class, 'getFavorites']);

Route::get("/addFavorite/{id?} {favorite_id?}", [User::class, 'addFavorite']);
Route::get("/block/{id?} {blocked_id?}", [User::class, 'block']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
