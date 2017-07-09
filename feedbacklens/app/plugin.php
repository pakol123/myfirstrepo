<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class plugin extends Model
{
    //

    protected $table = 'fl_plugin';
    protected $primaryKey = "PLUGIN_ID";
    protected $guarded = ['PLUGIN_ID','DOMAIN_ID'];
    public $timestamps = false;

    public function organisation()
    {
    	return $this->belongsTo(domain::class,'DOMAIN_ID','DOMAIN_ID');
    }

}
