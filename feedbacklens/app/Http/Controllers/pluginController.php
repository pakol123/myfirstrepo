<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;

use Illuminate\Http\Request;
use Carbon\Carbon;



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
		$domain = \App\domain::find(Request('domainId'));
		
		$result = $domain->subcategories()->updateExistingPivot(Request('subcatId'),["ISACTIVE"=>1,"MODIFIED_AT"=>Carbon::now(),"MODIFIED_BY"=>1]);
    
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
