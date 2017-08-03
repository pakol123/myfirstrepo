<?php

namespace App\Http\Controllers;
use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;

use App\Mail\Welcome;
use App\Mail\activated;
use Illuminate\Http\Request;
use App\plan;

class registrationController extends Controller
{
    //

  public function validateOrganisation()
  {
    if(count(\App\organisation::where('ORG_NAME',request('organisation'))->get()) == 1)
{
  return 1;
}

  }


  public function validateEmailandPhone()
{
    if(count(\App\User::where('EMAIL',request('email'))->get()) == 1)
  {
  return 1;
  }
}




public function userAdd(Request $request)
  {
       
       if($this->validateEmailandPhone(request('email')) == 1)
       {
          
          return response()->json(['error' => 'Email is already used'], 400);

       }

       $user = new \App\User;
       $user->FIRST_NAME = request('fname');
       $user->LAST_NAME = request('lname');
       $user->EMAIL = request('email');
       $user->PASSWORD = bcrypt('123456');
       $user->ORG_ID = request('orgId'); // session data
       $user->ADDRESS=request('address');
       $user->PHONE_NO = request('phone');
       $user->ROLE_ID = request('role');
       $user->IS_ACTIVE = 1;
       $user->CREATED_BY = request('createdBy'); // Session data

       $user->save();

       //Auth()->login($user);

        //\Mail::to($user->EMAIL)->send(new Welcome);
            return response()->json(['success' => 'registration successful'], 200);
  }




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



 if($this->validateEmailandPhone() == 1)
       {
          
          return response()->json(['error' => 'Email duplication'], 400);

       }

        if($this->validateOrganisation() == 1)
       {
          
          return response()->json(['error' => 'organisation duplication'], 400);

       }

       $org = new \App\organisation;
       //dd($request);
       $org->ORG_NAME = request('organisation');
       $org->SUPER_USER = request('email');
       $org->CREATED_BY = 1;
      
      //$plan = plan::where('PLAN_NAME', 'free')->get();

      


        $org->save();

       $iid = \App\organisation::latest()->first()->ORG_ID;

       \App\organisation::latest()->first()->plans()->attach(1);
       //dd($iid);

       $user = new \App\User;
       $user->FIRST_NAME = request('fname');
       $user->LAST_NAME = request('lname');
       $user->EMAIL = request('email');
       $user->PASSWORD = bcrypt(request('password'));
       $user->ORG_ID = $iid;
       $user->ADDRESS=request('address');
       $user->PHONE_NO = request('phone');
       $user->ROLE_ID = 1;
       $user->IS_ACTIVE = 0;
       $user->CREATED_BY = 1;

       $user->save();

       //Auth()->login($user);

        //\Mail::to($user->EMAIL)->send(new Welcome($org,$user));
            return response()->json(['success' => 'registration successful'], 200);
      //  return \Redirect::to('/')->with('user', 'pratik');

       //return \View::make('welcome')->with('user', $user->FIRST_NAME);
       //return $user;


    }

    public function verifyUser($id)
    {
        $users = \App\User::get();
        //dd($users);
foreach ($users as $user) {
    
    if(md5($user->USER_ID) == $id)
    {
(\App\user::where('USER_ID',$user->USER_ID)->update(['IS_ACTIVE'=>1]));
$org = $user->organisation;
 \Mail::to($user->EMAIL)->send(new activated($org,$user));

    }

     
}
    }
}
