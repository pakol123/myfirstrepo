<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

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

       $feedbacks = \App\feedback::all()->where('DOMAIN_ID',Request('domainID'));
       return response()->json(array('feedbacks'=>$feedbacks));
    }
}
