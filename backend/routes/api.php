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
Route::group(["prefix"=> "v0"], function(){
   
    Route::group(["middleware" => "auth:api"], function(){
        Route::get("/users/{id?}", [UserController::class, 'getUsers'])->name("get-user");
        Route::get("/favorites/{id?}", [UserController::class, 'getFavorites'])->name("get-favorite");
        Route::get("/addFavorite/{id?} {favorite_id?}", [UserController::class, 'addFavorite'])->name("add-favorite");
        Route::get("/block/{id?} {blocked_id?}", [UserController::class, 'block'])->name("block-user");
        Route::get("/messages/{id?}", [UserController::class, 'getMessages'])->name("get-message");
        Route::post("/sendMessage", [UserController::class, 'sendMessage'])->name("send-message");
        Route::post("/notVisible", [UserController::class, 'notVisible'])->name("not-visible");
        Route::post("/create", [UserController::class, 'createOrUpdateUser'])->name("update-user");

    }); 

    Route::get("/login", [AuthController::class, "login"])->name("login");
    Route::get("/register", [AuthController::class, "register"])->name("register");
    Route::get("/not_found", [UserController::class, "notFound"])->name("not-found");

});
