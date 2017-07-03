<?php

namespace App\Http\Controllers;

use App\Mail\Welcome;
use Illuminate\Http\Request;

class registrationController extends Controller
{
    //

    public function store(Request $request)
    {
  
             $this->validate($request,[
                   
                   'fname' =>'required',
                   'lname'=>'required',
                   'email'=>'required|email',
                   'password'=>'required|confirmed',
                   'address'=>'required',
                   'organisation'=>'required',

             	]);


/*if(\App\organisation::where('SUPER_USER',request('email')))
{
	//return redirect()->back()->withErrors(['Email has been taken']);
	dd(\App\organisation::where('SUPER_USER',request('email')));
}*/

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

       Auth()->login($user);

       \Mail::to($user->EMAIL)->send(new Welcome);
           	return redirect('/');


    }
}
