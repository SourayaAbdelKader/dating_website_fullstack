<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::group(["prefix"=> "v"], function(){
   
    //Route::group(["middleware" => "auth:api"], function(){
        Route::get("/users/{id?}", [UserController::class, 'getUsers'])->name("get-user");
        Route::get("/favorites/{id?}", [UserController::class, 'getFavorites'])->name("get-favorite");
        Route::get("/addFavorite/{id?} {favorite_id?}", [UserController::class, 'addFavorite'])->name("add-favorite");
        Route::get("/block/{id?} {blocked_id?}", [UserController::class, 'block'])->name("block-user");
        Route::get("/messages/{id?}", [UserController::class, 'getMessages'])->name("get-message");
        Route::post("/sendMessage", [UserController::class, 'sendMessage'])->name("send-message");
        Route::post("/notVisible", [UserController::class, 'notVisible'])->name("not-visible");
        Route::post("/update/{id?}", [UserController::class, 'updateUser'])->name("update-user");
        Route::get("/getUserInfo/{id?}", [UserController::class, 'getUserInfo'])->name("get-user-info");
        Route::get("/getUserInfoByEmail/{email?}", [UserController::class, 'getUserInfoByEmail'])->name("get-user-info-by-email");
        
    //}); 

    //Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get("/not_found", [UserController::class, "notFound"])->name("not-found");

});
