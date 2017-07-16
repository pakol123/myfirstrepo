<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class feedback extends Model
{
    //
    protected $table = "fl_feedback";
    protected $primaryKey = "FEEDBACK_ID";
    protected $guarded = ["DOMAIN_ID"];
    public $timestamps = false;

    public function category()
    {
    	return $this->belongsTo(category::class,'CAT_ID','CAT_ID');
    }

     public function subcategory()
    {
    	return $this->belongsTo(subcategory::class,'SUBCAT_ID','SUBCAT_ID');
    }

   public function domain()
    {
    	return $this->belongsTo(domain::class,'DOMAIN_ID','DOMAIN_ID');
    }



}
