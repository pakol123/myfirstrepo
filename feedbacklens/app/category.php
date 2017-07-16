<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    //
    protected $table = "fl_category";
    protected $primaryKey = "CAT_ID";
    protected $guarded = ["CAT_ID","CAT_NAME"];
    public $timestamps = false;

    public function feedbacks()
{
  return $this->hasMany(feedback::class,'CAT_ID','CAT_ID');
}

}
