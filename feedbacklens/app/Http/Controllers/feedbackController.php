<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Log;

use Illuminate\Http\Request;

class feedbackController extends Controller
{
    //

public function create(Request $request)
{

    /*$domainName = Request('domainUrl');
    $domainId = DB::table('fl_domain')
                     ->select(DB::raw('DOMAIN_ID '))
                     ->where('DOMAIN_URL', '=', $domainName)
                     ->get();*/

    //$domainId = DB::select('select DOMAIN_ID from fl_domain where active = ?', $domainName);
	$feedback = new \App\feedback;
	$feedback->DOMAIN_ID = Request('domainId');
	$feedback->CAT_ID = Request('catId');
	$feedback->SUBCAT_ID = Request('subcatId');
	$feedback->URL = Request('url');
	$feedback->RATING = Request('rating');
	$feedback->TEXT = Request('text');
    $feedback->OS = Request('os');
    $feedback->RESOLUTION = Request('resolution');
    $feedback->DEVICE = Request('device');
    $feedback->IP = Request('ip');
    $feedback->BROWSER = Request('browser');
    $feedback->COUNTRY = Request('country');
    $feedback->EMAIL = Request('email');
    $feedback->CREATED_BY = 0;

    $feedback->save();
 //return response()->json(['success' => 'feedback successful'], 200);

}


    public function getFeedback(Request $request)
     {
        Log::info(Request("domainId"));
               if(Request('notification') == "0")
       {
       //$feedbacks = \App\feedback::where('DOMAIN_ID',Request('domainId'))->get();

         $feedbacks = DB::table('fl_feedback')
            ->join('fl_category_master', 'fl_feedback.CAT_ID', '=', 'fl_category_master.CAT_ID')
            ->join('fl_subcategory_master', 'fl_feedback.SUBCAT_ID', '=', 'fl_subcategory_master.SUBCAT_ID')
            ->select('fl_feedback.*', 'fl_subcategory_master.SUBCAT_NAME', 'fl_category_master.CAT_NAME')
            ->where('DOMAIN_ID',Request('domainId'))
            ->get();


       return response()->json(array('feedbacks'=>$feedbacks));
     }

     else
     {

        $feedbacks = DB::table('fl_feedback')
            ->join('fl_category_master', 'fl_feedback.CAT_ID', '=', 'fl_category_master.CAT_ID')
            ->join('fl_subcategory_master', 'fl_feedback.SUBCAT_ID', '=', 'fl_subcategory_master.SUBCAT_ID')
            ->select('fl_feedback.*', 'fl_subcategory_master.SUBCAT_NAME', 'fl_category_master.CAT_NAME')
            ->where('DOMAIN_ID',Request('domainId'))
            ->orderBy('FEEDBACK_ID','desc')->take(10)
            ->get();
        return response()->json(array('feedbacks'=>$feedbacks));
     }
     }


     

     public function filterFeedback(Request $request,$id)
      {
        Log::info(Request("fromDate"));
        $input = $request->except(['token','fromDate','toDate']);
        $fromDate = Carbon::parse(Request('fromDate'));
        $toDate = Carbon::parse(Request('toDate'));
        $filteredFeedbacks = \App\feedback::where($input)->whereBetween('CREATED_AT',[$fromDate,$toDate])->get();

        return response()->json(array('filteredFeedbacks'=>$filteredFeedbacks));
      }  
}
