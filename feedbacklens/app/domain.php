<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class domain extends Model
{
    //
   protected $table = 'fl_domain';
    protected $primaryKey = "DOMAIN_ID";
    protected $guarded = ['DOMAIN_ID','ORG_ID'];
    public $timestamps = false;

    public function organisation()
    {
    	return $this->belongsTo(organisation::class,'ORG_ID','ORG_ID');
    }

    public function plugin()
    {
    	return $this->hasOne(plugin::class,'DOMAIN_ID','DOMAIN_ID');
    }



}
