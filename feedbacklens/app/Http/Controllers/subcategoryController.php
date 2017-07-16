<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;

class subcategoryController extends Controller
{
    //
     public function __construct()
    {
    	 $this->middleware('jwt.auth');
    }

	public function create(Request $request)
	{

		$subcat = \App\subcategory::preparesubcat($request);
		$subcat->save();

		$id =  \App\domain::find(Request('domainId'))->DOMAIN_ID;

		 $subc = \App\subcategory::latest()->first();
		 $subc->domains()->attach($id,["ISACTIVE"=>0,"CREATED_BY"=>Request('createdBy'),"CREATED_AT"=>Carbon::now()]);
		 return response()->json(['success' => 'subcategory added successful'], 200);

	}

	public function update()
	{
		$input = $request->except(['token','domainId','pluginId']);

		dd(\App\subcategory::where('DOMAIN_ID',Request('domainId'))->update($input));
	}

	public function getsubcatbyDomains($id)
	{
	//
	//$domain = \App\domain::find($id);

	//$subcategories = $domain->subcategories;

	$subcat = DB::table('fl_domain_subcat_map')
	                     ->select(DB::raw('*'))->where('DOMAIN_ID','=',$id6)
	                     >get();


	 return response()->json(array('subcategories'=>$subcat));

	}



}
