<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use DB;

class AuthController extends Controller {

    public function login() {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(){
        $user = new User;
        $user->name = $request->name ? $request->name : $user->name;
        $user->email = $request->email? $request->email : $user->email;
        $user->password = $request->password? $request->password : $user->password;
        $user->birth_date = $request->birth_date? $request->birth_date : $user->birth_date;
        $user->gender = $request->gender? $request->gender : $user->gender;
        $user->interested_in = $request->interested_in? $request->interested_in : $user->interested_in;
        $user->bio = $request->bio? $request->bio : $user->bio;
        $user->location = $request->location? $request->location : $user->location;
        $user->visible = $request->visible? $request->visible : $user->visible;
        // for the users picture
        $picture = $request->pic_url;
        $folderPath = "profile-photos/";
        $image_parts = explode(";base64", $picture);
        $image_type_aux = explode("image/",$image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = $folderPath.$username.".png"; 
        file_put_contents($file,$image_base64);
        $user->pic_url = urlencode($file);
        
        $user->token = $token;

        $email = $request->email;
        $new_user = DB::select("select * from users where email= {$email} ");

        if($user->save()){
            return response()->json([
                "status" => "Success",
                "data" => $new_user
            ]);
        }

    }

    public function me(){
        return response()->json(auth()->user());
    }

    public function logout(){
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(){
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
