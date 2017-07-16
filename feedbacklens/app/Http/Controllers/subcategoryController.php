<?php

namespace App\Http\Controllers;

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
 $subc->domains()->attach($id,["ISACTIVE"=>0,"CREATED_BY"=>1,"CREATED_AT"=>null]);
 return response()->json(['success' => 'subcategory added successful'], 200);

}

public function update()
{
	$input = $request->except(['token','domainId','pluginId']);

	dd(\App\subcategory::where('DOMAIN_ID',Request('domainId'))->update($input));
}




}
