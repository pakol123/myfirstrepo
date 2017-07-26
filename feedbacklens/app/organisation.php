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

    public function domains()
    {
    	return $this->hasMany(domain::class,'ORG_ID','ORG_ID');
    }

    public function plans()
    {
           return $this->belongsToMany(plan::class,'fl_org_plan_map','ORG_ID','PLAN_ID')->withPivot('START_DATE','END_DATE','IS_ACTIVE');
    }

     public function filteredPlans()
    {
           return $this->belongsToMany(plan::class,'fl_org_plan_map','ORG_ID','PLAN_ID')->withPivot('START_DATE','END_DATE','IS_ACTIVE')->wherePivot('IS_ACTIVE',1);
    }

}
