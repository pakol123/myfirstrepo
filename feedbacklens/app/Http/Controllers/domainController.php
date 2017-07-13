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
        
  
//dd($request);  
      $domain = new domain;
      $domain->ORG_ID = request('orgId');
      $domain->DOMAIN_URL = request('domainName');
      $domain->DOMAIN_SECTOR=request('domainSector');
      $domain->START_DATE= Carbon::now();
      $domain->CREATED_BY = 1;
      $domain->Save();
      

      $domain->subcategories()->attach([1,2,3,4],["ISACTIVE"=>1,"CREATED_BY"=>1,"CREATED_AT"=>null]);


      $plugin = plugin::create($request);
      $plugin->Save();



      return response()->json(['success' => 'Domain and plugin registration successful'], 200);
    }

    public function update(Request $request)
    {

    }

}
