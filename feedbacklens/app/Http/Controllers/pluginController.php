<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Log;



class pluginController extends Controller
{
    //
    public function __construct()
    {
    	 $this->middleware('jwt.auth');
    }


	public function create()
	{

	}

	public function uploadLogo(Request $request)
	{
     
	    $file = Request('logoFile');
       log::info($file->getClientOriginalName());
	   $destinationPath = 'images';
       $file->move($destinationPath,Request('domainId').$file->getClientOriginalName());
       $plugininst = \App\Domain::find(Request('domainId'))->plugin;
	   $plugininst->LOGOPATH = 	"images/".Request('domainId').$file->getClientOriginalName();
	   $plugininst->save();
	 
      

	}

	public function update(Request $request)
	{


	$input = $request->except(['token','domainId']);
	dd(\App\plugin::where('DOMAIN_ID',Request('domainId'))->update($input));
	 }

	public function getpluginProperties($id)
	{
	 
	 	$domain = \App\domain::find($id);

	 	//dd($domain->plugin);

	  	return response()->json(array('properties'=>$domain->plugin,'cat'=>\App\category::all(),'subcat'=>$domain->subcategories));

	}

	public function updatePluginSubcategories(Request $request)
	{
		
		//dd($request);
		$domain = \App\domain::find(Request('doaminId'));
		
		$result = $domain->subcategories()->updateExistingPivot(Request('subcatId'),["ISACTIVE"=>Request('isactive'),"MODIFIED_AT"=>Carbon::now(),"MODIFIED_BY"=>Request('modifiedBy')]);
    
        if($result == 1)
        {
        return response()->json(['success' => 'subcategory updated'], 200);
    }
    else
    {
    	 return response()->json(['Error' => 'subcategory is not updated'], 400);
    }

		//$domain->subcategories()->updateExistingPivot('ISACTIVE', $isactive);


	}
}
