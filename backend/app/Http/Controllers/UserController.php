<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

use App\Models\User;
use App\Models\Block;
use App\Models\Favorite;
use App\Models\Message;

class UserController extends Controller{

    public function createOrUpdateUser(Request $request, $id = "add"){
        if($id == "add"){
            $user = new User; 
        }else{
            $id= Auth::$id();
            $user = User::find($id);
        }
        $user->name = $request->name ? $request->name : $user->name;
        $user->email = $request->email? $request->email : $user->email;
        $user->password = $request->password? $request->password : $user->password;
        $user->birth_date = $request->birth_date? $request->birth_date : $user->birth_date;
        $user->gender = $request->gender? $request->gender : $user->gender;
        $user->interested_in = $request->interested_in? $request->interested_in : $user->interested_in;
        $user->bio = $request->bio? $request->bio : $user->bio;
        $user->location = $request->location? $request->location : $user->location;
        $user->visible = $request->visible? $request->visible : $user->visible;
        $user->pic_url = $request->pic_url? $request->pic_url : $user->pic_url;

        $email = $request->email;
        $new_user = DB::select("select * from users where email= {$email} ");

        if($user->save()){
            return response()->json([
                "status" => "Success",
                "data" => $new_user
            ]);
        }

        return response()->json([
            "status" => "Error",
            "data" => "Error creating a model"
        ]);
    }

    public function sendMessage(Request $request){
        $message = new Message;
        $message->user_id = $request->user_id ? $request->user_id : $user->user_id;
        $message->receiver_id = $request->receiver_id ? $request->receiver_id : $user->receiver_id;
        $message->message = $request->message ? $request->message : $user->message;

        $message->save();

        return 'Success';
    }

    public function getUSerInfo(Request $request, $id){
        $id= Auth::$id();
        $user = DB::select("select * from users where user_id= {$id}");
        return response()->json([
            "status" => "Success",
            "data" => $user
        ]);
    }

    // this function chooses the users which are not blocked to get displayed
    public function getUsers(Request $request, $id){
        $id= Auth::$id();
        $users = DB::select("select name, location, birth_date, gender, interested_in, bio, pic_url from users 
        where visible=1 and id != {$id} and id not in ( SELECT blocked_id from blocks Where user_id= {$id} )");

        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);
    }

    // this function chooses the favorites
    public function getFavorites(Request $request, $id){
        $id= Auth::$id();
        $favorites = DB::select("select * from favorites f join users u on u.id=f.favorite_id where user_id= {$id}");
        return response()->json([
            "status" => "Success",
            "data" => $favorites
        ]);
    }

    public function getMessages(Request $request, $id){
        $id= Auth::$id();
        $messages = DB::select("select * from messages m join users u on u.id=m.user_id where receiver_id= {$id}");
        return response()->json([
            "status" => "Success",
            "data" => $messages
        ]);
    }

    public function addFavorite(Request $request, $id, $favorite_id){
        $id= Auth::$id();
        $data = array(
            "user_id" => Auth::$id,
            "favorite_id" => $favorite_id,
        );

        DB::table('favorites')->insert($data);

        return response()->json([
            "status" => "Success", 
        ]);
    }

    public function block(Request $request, $id, $blocked_id){
        $id= Auth::$id();
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

    public function notVisible(Request $request, $id){
        $id= Auth::$id();
        $user = User::find($id);
        $user->visible = "0";
        $user->save();
        return redirect()->back()->with('status','Updated Successfully');
    }

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    function notFound(){
        return response()->json([
            "status" => "Error",
            "data" => "Not Found"
        ]);
    }
}
