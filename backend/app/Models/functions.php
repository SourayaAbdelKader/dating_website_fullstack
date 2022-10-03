<?php

namespace App\Models;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class functions extends Model
{
    function getUsers(){
        $users = DB::table('users')
        ->select('id','name', 'location', 'birth_date', 'gender', 'interested_in', 'bio')
        ->where()
        ->get();

        $users = ::
                    where("category_id", 1)
                    ->orderBy("id", "DESC")
                    ->with("Category")
                    ->get();

        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);
    }


    function addOrUpdateStore(Request $request, $id = "add"){
        if($id == "add"){
            $store = new Store; 
        }else{
            $store = Store::find($id);
        }

        $store->name = $request->name ? $request->name : $store->name;
        $store->category_id = $request->category_id? $request->category_id : $store->category_id;

        if($store->save()){
            return response()->json([
                "status" => "Success",
                "data" => $store
            ]);
        }

        return response()->json([
            "status" => "Error",
            "data" => "Error creating a model"
        ]);
    }


    function getUsers($id = null){
        if(!$id){
            return Users::all();
        }
        return Category::find($id);
    }

    function notFound(){
        return response()->json([
            "status" => "Error",
            "data" => "Not Found"
        ]);
    }

}
