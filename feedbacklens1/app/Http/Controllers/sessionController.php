<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class sessionController extends Controller
{
    //

public function __construct()
{
	$this->middleware('guest');
}

    public function checkuser()
    {
    	$credentials = [
                     'EMAIL' => request('email'),
                     'password'=> request('password'),
             ];
    	if(! auth()->attempt($credentials,true))
    	{
    		return back();
    	}
    	else
    	{
    		return redirect('/');
    	}
    }

}
