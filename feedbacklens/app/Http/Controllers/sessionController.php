<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use App\User;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Log;

class sessionController extends Controller
{
    //

public function __construct()
{
	//$this->middleware('guest');
}


public function getAuthenticatedUser()
{
    try
    {
        if(!$user = JWTAuth::parseToken()->authenticate())
        {
            return response()->json(['User not found'],404);
        }
  } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

    return response()->json(['token_expired'], $e->getStatusCode());

  } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

    return response()->json(['token_invalid'], $e->getStatusCode());

  } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

    return response()->json(['token_absent'], $e->getStatusCode());

  }
 
    //return response()->json(compact('user'));

  //dd($user->organisation->plans);
  $id = $user->organisation;
$count = DB::table('fl_domain')
                ->where('ORG_ID', $id->ORG_ID)
                ->count('*');

// $idd = $id->filteredPlans;
//echo $idd[0]->NO_OF_DOMAINS;
 
  return response()->json(array('user'=>$user,'no_of_domains'=>$count,'role_name'=>$user->role->ROLE_NAME));
}

    public function checkUser(Request $request)
    {

         /*if (\Auth::viaRemember()) {
    //

        dd("you are being logged in with remember token functionality");
        return redirect('/');
}
    	$credentials = [
                     'EMAIL' => request('email'),
                     'password'=> request('password'),
                     'IS_ACTIVE'=>1,
             ];
    	if(! auth()->attempt($credentials,true))
    	{
    		return back()->withErrors('Credentils does not match');
    	}
    	else
    	{
            dd(Auth()->User());
            $request->session()->put('UserID', Auth()->id());
            dd($request->Session());
    		return redirect('/');
    	}*/



        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid Credentials'], 404);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

public function allUsers(Request $request)
{
    //dd(user::all()->where('ORG_ID',request('ORG_ID')));
  $users = DB::table('fl_users')
            ->join('fl_role_master', 'fl_users.ROLE_ID', '=', 'fl_role_master.ROLE_ID')
            ->select('fl_users.*', 'fl_role_master.ROLE_NAME')
            ->where('fl_users.ORG_ID',Request('orgId'))
            ->get();

return response()->json(array('users'=>$users));
   //return response()->json(array('users'=>user::all()->where('ORG_ID',request('orgId'))));

}

}
