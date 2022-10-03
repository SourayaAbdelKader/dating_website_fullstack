<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;


class User extends Authenticatable
{
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

