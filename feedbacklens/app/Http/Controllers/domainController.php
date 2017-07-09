<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\domain;
use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;
use Carbon\Carbon;
use App\plugin;



class domainController extends Controller
{
    public function __construct()
    {
    	 $this->middleware('jwt.auth');
    }

    public function index(Request $request)
    {

     

    }

    public function store(Request $request)
    {
        
      $domain = new domain;
      $domain->ORG_ID = 51;
      $domain->DOMAIN_URL = request('DOMAIN_NAME');
      $domain->DOMAIN_SECTOR=request('DOMAIN_SECTOR');
      $domain->START_DATE= Carbon::now();
      $domain->created_by = 1;
      $domain->Save();


      
      $plugin = new plugin;
      $plugin->ALIGNMENT = 'left';
      $plugin->PLUGIN_COLOR = '#000000';
      $plugin->ISACTIVE = false;
      $plugin->DOMAIN_ID = domain::latest()->first()->DOMAIN_ID;
      $plugin->CREATED_BY = 1;
      $plugin->Save();



      return response()->json(['success' => 'Domain and plugin registration successful'], 200);
    }

    public function update(Request $request)
    {

    }

}
