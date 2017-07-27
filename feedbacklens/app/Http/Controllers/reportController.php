<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Log;

class reportController extends Controller
{
    

    public function getCategoryCount(Request $request, $id)
    {
      Log::info($id);


         $result = DB::select("select count(fl_feedback.CAT_ID) as cat_count,a.CAT_ID ,b.CAT_NAME from ((select '1' CAT_ID UNION ALL select '2' CAT_ID UNION ALL select '3' CAT_ID UNION ALL select '4') a left join fl_feedback on fl_feedback.CAT_ID = a.CAT_ID )inner JOIN fl_category_master b on b.CAT_ID = a.CAT_ID group by a.CAT_ID,b.CAT_NAME order by a.CAT_ID");

         return response()->json(array('CategoryCount'=>$result));   

        /* $result = DB::table('fl_feedback')
                     ->join('fl_category_master', 'fl_feedback.CAT_ID', '=', 'fl_category_master.CAT_ID')
                      ->where('fl_feedback.DOMAIN_ID', '=', $id)
                     ->select(DB::raw('count(fl_category_master.CAT_NAME) as cat_count,fl_category_master.CAT_NAME'))
                     ->groupBy('fl_category_master.CAT_NAME')
                     ->orderBy('fl_feedback.CAT_ID')
                     ->get();*/


          

                  


    }

     public function getSubcategoryCount(Request $request, $id)
    {
       

       $result = DB::table('fl_feedback')
                     ->join('fl_subcategory_master', 'fl_feedback.SUBCAT_ID', '=', 'fl_subcategory_master.SUBCAT_ID')
                     ->select(DB::raw('count(fl_subcategory_master.SUBCAT_NAME) as subCat_count,fl_subcategory_master.SUBCAT_NAME'))
                     ->where('DOMAIN_ID', '=', $id)
                     ->groupBy('fl_subcategory_master.SUBCAT_NAME')
                     ->orderBy('fl_subcategory_master.SUBCAT_ID')
                     ->get();
      
      return response()->json(array('subcatCount'=>$result));


    	
    }

     public function getRatingCount(Request $request, $id)
    {


      $result = DB::select("select count(fl_feedback.RATING) as rating_count,a.RATING from (select '1' RATING UNION ALL select '2' RATING UNION ALL select '3' RATING UNION ALL select '4' RATING UNION ALL SELECT '5' RATING) a left join fl_feedback on fl_feedback.RATING = a.RATING  group by a.RATING order by a.RATING");
    	/*$result = DB::table('fl_feedback')
                     ->select(DB::raw('count(*) as rating_count,RATING'))
                     ->where('DOMAIN_ID', '=', $id)
                     ->groupBy('RATING')
                     ->orderBy('RATING')
                     ->get(); */

        return response()->json(array('ratingCount'=>$result,'avgRating'=>\App\feedback::where('DOMAIN_ID',$id)->avg('RATING')));   
    	
    }



 public function getfeedbackText(Request $request)
      {

      	$resultText = "";

      	$feedbacks = \App\feedback::all()->where('domain_Id',Request('domainId'));

      	foreach ($feedbacks as $feedback)
      	{
      		$resultText = $resultText.$feedback->TEXT." ";
      	}

      	return $resultText;
        
      }


      public function getReportDetails(Request $request,$id)
      {
  
$resultText = "";

               $resultCategory = DB::select("select count(fl_feedback.CAT_ID) as cat_count,a.CAT_ID ,b.CAT_NAME from ((select '1' CAT_ID UNION ALL select '2' CAT_ID UNION ALL select '3' CAT_ID UNION ALL select '4') a left join fl_feedback on fl_feedback.CAT_ID = a.CAT_ID )inner JOIN fl_category_master b on b.CAT_ID = a.CAT_ID group by a.CAT_ID,b.CAT_NAME order by a.CAT_ID");


             $resultSubcategory = DB::table('fl_feedback')
                     ->join('fl_subcategory_master', 'fl_feedback.SUBCAT_ID', '=', 'fl_subcategory_master.SUBCAT_ID')
                     ->select(DB::raw('count(fl_subcategory_master.SUBCAT_NAME) as subCat_count,fl_subcategory_master.SUBCAT_NAME'))
                     ->where('DOMAIN_ID', '=', $id)
                     ->groupBy('fl_subcategory_master.SUBCAT_NAME')
                     ->orderBy('fl_subcategory_master.SUBCAT_ID')
                     ->get();

              $resultRatings = DB::select("select count(fl_feedback.RATING)  as rating_count,a.RATING from (select '1' RATING UNION ALL select '2' RATING UNION ALL select '3' RATING UNION ALL select '4' RATING UNION ALL SELECT '5' RATING) a left join fl_feedback on fl_feedback.RATING = a.RATING  group by a.RATING order by a.RATING");


$feedbacks = \App\feedback::all();

      	foreach ($feedbacks as $feedback)
      	{
      		$resultText = $resultText.$feedback->TEXT." ";
      	}
             return response()->json(array('resultCategory'=>$resultCategory,'resultSubcategory'=>$resultSubcategory,'resultRatings'=>$resultRatings,'feedbacktext'=>$resultText,'avgRating'=>\App\feedback::where('DOMAIN_ID',$id)->avg('RATING')));   
    	

      }

}
