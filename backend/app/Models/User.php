<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;


class User extends Authenticatable implements JWTSubject {
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'location',
        'birth_date',
        'gender',
        'interested_in',
        'bio',
        'pic_url',
        'visible',

    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function favorites()
    {
        return $this->belongsToMany(Favorite::class);
    }

    public function blocks()
    {
        return $this->belongsToMany(Block::class);
    }

    public function messages()
    {
        return $this->belongsToMany(Message::class);
    }

}

