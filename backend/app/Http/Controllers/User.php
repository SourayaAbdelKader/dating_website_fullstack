<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class User extends Controller
{

    public function getUSerInfo(Request $request, $id){
        $user = DB::select("select * from users where user_id= {$id}");
        return response()->json([
            "status" => "Success",
            "data" => $user
        ]);
    }

    // this function chooses the users which are not blocked to get displayed
    public function getUsers(Request $request, $id){

        $users = DB::select("select name, location, birth_date, gender, interested_in, bio, pic_url from users 
        where visible=1 and id != {$id} and id not in ( SELECT blocked_id from blocks Where user_id= {$id} )");

        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);
    }

    // this function chooses the favorites
    public function getFavorites(Request $request, $id){

        $favorites = DB::select("select * from favorites f join users u on u.id=f.favorite_id where user_id= {$id}");

        return response()->json([
            "status" => "Success",
            "data" => $favorites
        ]);
    }

    public function addFavorite(Request $request, $id, $favorite_id){

        $data = array(
            "user_id" => $id,
            "favorite_id" => $favorite_id,
        );

        DB::table('favorites')->insert($data);

        return response()->json([
            "status" => "Success", 
        ]);
    }

    public function block(Request $request, $id, $blocked_id){

        $data = array(
            "user_id" => $id,
            "blocked_id" => $blocked_id,
        );

        DB::table('blocks')->insert($data);
        DB::delete("delete from favorites where ( user_id = {$id} and favorite_id = {$blocked_id} ) or ( user_id = {$blocked_id} and favorite_id = {$id} )");
        DB::delete("delete from messages where ( user_id = {$id} and receiver_id = {$blocked_id} ) or ( user_id = {$blocked_id} and receiver_id = {$id} )");

        return response()->json([
            "status" => "Success", 
        ]);
    }
}
