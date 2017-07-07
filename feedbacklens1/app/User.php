<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    protected $table = 'fl_users';
    protected $primaryKey = 'USER_ID';
    public $timestamps = false;
   


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'FIRST_NAME','LAST_NAME' ,'EMAIL', 'PASSWORD','PLAN_ID', 'ORG_ID', 'ROLE_ID', 'ADDRESS', 'PHONE_NO','IS_ACTIVE', 
    ];
   
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'PASSWORD', 'REMEMBER_TOKEN',
    ];


    public function getAuthPassword()
     {
    return $this->PASSWORD;
     }

     public function organisation()
     {
        return $this->belongsTo(organisation::class,'ORG_ID','ORG_ID');
     }

}


