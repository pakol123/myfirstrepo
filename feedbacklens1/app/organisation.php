<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class organisation extends Model
{
    //
    protected $table = 'fl_org';
    protected $primaryKey = 'ORG_ID';
    protected $guarded = ['ORG_ID'];
    public $timestamps = false;

    public function users()
    {
    	return $this->hasMany(User::class,'ORG_ID','ORG_ID');
    }

}
