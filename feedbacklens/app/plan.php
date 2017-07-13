<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class plan extends Model
{
    //
        protected $table = "fl_plan_master";
    protected $primaryKey = "PLAN_ID";
    protected $guarded = ["PLAN_ID","PLAN_NAME"];
    public $timestamps = false;

    public function organisations()
    {  
           return $this->belongsToMany(organisations::class,'fl_org_plan_map','PLAN_ID','ORG_ID');
    }
}

