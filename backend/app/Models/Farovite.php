<?php

namespace App\Models;
use App\User;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Favorite extends Model
{
    use HasFactory;
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
