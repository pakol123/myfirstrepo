<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;

use Illuminate\Http\Request;


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
	//echo $input;

	 //echo $updateString;

	dd(\App\plugin::where('DOMAIN_ID',Request('domainId'))->update($input));
	 }

	public function getpluginProperties($id)
	{
	 
	 	$domain = \App\domain::find($id);

	 	//dd($domain->plugin);

	  	return response()->json(array('properties'=>$domain->plugin,'cat'=>\App\category::all(),'subcat'=>$domain->subcategories));

	}
}
