<?php

namespace App\Http\Controllers;
use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;

use App\Mail\Welcome;
use Illuminate\Http\Request;

class registrationController extends Controller
{
    //

    public function store(Request $request)
    {
  
            /* $this->validate($request,[
                   
                   'fname' =>'required',
                   'lname'=>'required',
                   'email'=>'required|email',
                   'password'=>'required|confirmed',
                   'address'=>'required',
                   'organisation'=>'required',

             	]);*/


/*if(count(\App\organisation::where('SUPER_USER',request('email'))->get()) == 1)
{
	//return redirect()->back()->withErrors(['Email has been taken']);
	return redirect()->back()->withErrors('Email has been taken');
}*/

//$users = \DB::table('fl_org')->where('SUPER_USER', '=', request('email'))->get();
//dd(count($users));
//\Mail::to($user->EMAIL)->send(new Welcome);
       $org = new \App\organisation;
       //dd($request);
       $org->ORG_NAME = request('organisation');
       $org->SUPER_USER = request('email');
       $org->CREATED_BY = 1;
       $org->save();

       $iid = \App\organisation::latest()->first()->ORG_ID;
       //dd($iid);

       $user = new \App\User;
       $user->FIRST_NAME = request('fname');
       $user->LAST_NAME = request('lname');
       $user->EMAIL = request('email');
       $user->PASSWORD = bcrypt(request('password'));
       $user->ORG_ID = $iid;
       $user->PLAN_ID = 1;
       $user->ADDRESS=request('address');
       $user->PHONE_NO = request('phone');
       $user->ROLE_ID = 1;
       $user->IS_ACTIVE = 0;
       $user->CREATED_BY = 1;

       $user->save();

       //Auth()->login($user);

        \Mail::to($user->EMAIL)->send(new Welcome);
           	return response()->json(['success' => 'registration successful'], 200);
      //  return \Redirect::to('/')->with('user', 'pratik');

       //return \View::make('welcome')->with('user', $user->FIRST_NAME);
       //return $user;


    }
}
