<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

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


   public static function create(Request $request)
   {
      $plugin = new plugin;
      $plugin->ALIGNMENT = "left";
      $plugin->PLUGIN_COLOR = "#000000";
      $plugin->ISACTIVE = false;
      $plugin->DOMAIN_ID = domain::latest()->first()->DOMAIN_ID;
      $plugin->CREATED_BY = 1;
        
        return $plugin;
   }
}
