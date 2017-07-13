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

public function subcategories()
    {
           return $this->belongsToMany(subcategory::class,'fl_domain_subcat_map','DOMAIN_ID','SUBCAT_ID')->withPivot('CREATED_BY','CREATED_BY','ISACTIVE');
    }


}
