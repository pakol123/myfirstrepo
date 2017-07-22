<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class reportController extends Controller
{
    

    public function getCategoryCount(Request $request, $id)
    {
      

         $result = DB::table('fl_feedback')
                     ->select(DB::raw('count(*) as cat_count,CAT_ID'))
                     ->where('DOMAIN_ID', '=', $id)
                     ->groupBy('CAT_ID')
                     ->orderBy('CAT_ID')
                     ->get();

//dd($result);
             return response()->json(array('CategoryCount'=>$result,'catName'=>\App\Category::select('CAT_NAME')->orderBy('CAT_ID', 'asc')->get()));        


    }

     public function getSubcategoryCount(Request $request, $id)
    {
       

       $result = DB::table('fl_feedback')
                     ->select(DB::raw('count(*) as subCat_count,SUBCAT_ID'))
                     ->where('DOMAIN_ID', '=', $id)
                     ->groupBy('SUBCAT_ID')
                     ->orderBy('SUBCAT_ID')
                     ->get();
      
      return response()->json(array('subcatCount'=>$result,'subcatname'=>\App\domain::find($id)->subcategories));


    	
    }

     public function getRatingCount(Request $request, $id)
    {
    	$result = DB::table('fl_feedback')
                     ->select(DB::raw('count(*) as rating_count,RATING'))
                     ->where('DOMAIN_ID', '=', $id)
                     ->groupBy('RATING')
                     ->orderBy('RATING')
                     ->get();

             return response()->json(array('ratingCount'=>$result));   
    	
    }




}
