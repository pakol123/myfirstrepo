<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class subcategory extends Model
{
    //
     protected $table = "fl_subcategory_master";
    protected $primaryKey = "SUBCAT_ID";
    protected $guarded = ["SUBCAT_ID","ISUSERDEF"];
    public $timestamps = false;

    public static function preparesubcat(Request $request)
    {
  $subcat = new \App\subcategory;
$subcat->SUBCAT_NAME = Request("subcatName");
$subcat->ISUSERDEF = 1;
$subcat->CREATED_BY = 1;

return $subcat;
    }

public function domains()
    {
           return $this->belongsToMany(domain::class,'fl_domain_subcat_map','SUBCAT_ID','DOMAIN_ID')->withPivot('CREATED_BY','CREATED_BY','ISACTIVE');
    }


public function feedbacks()
{
  return $this-.hasMany(feedback::class,'SUBCAT_ID','SUBCAT_ID');
}

}
