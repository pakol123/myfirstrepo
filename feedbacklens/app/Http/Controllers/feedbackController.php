<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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

       if(Request('notification') == "0")
       {
       $feedbacks = \App\feedback::all()->where('DOMAIN_ID',Request('domainId'));
       return response()->json(array('feedbacks'=>$feedbacks));
     }

     else
     {
        $feedbacks = \App\feedback::where('DOMAIN_ID',Request('domainID'))->orderBy('FEEDBACK_ID','desc')->take(10)->get();
        return response()->json(array('feedbacks'=>$feedbacks));
     }
     }


     

     public function filterFeedback(Request $request,$id)
      {

        $checked = $request->has('fromDate') ? true: false;
        

        if($checked)
        { 
              $input = $request->except(['token','fromDate','toDate']);
              $fromDate = Carbon::parse(Request('fromDate'));
              $toDate = Carbon::parse(Request('toDate'));
              $filteredFeedbacks = \App\feedback::where($input)->whereBetween('CREATED_AT',[$fromDate,$toDate])->get();

        }
       else
       {

         $input = $request->except(['token']);
          $filteredFeedbacks = \App\feedback::where($input)->get();
       }
      
        return response()->json(array('filteredFeedbacks'=>$filteredFeedbacks));
        

      }  


}
