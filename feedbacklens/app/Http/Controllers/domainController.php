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
      $domain->ORG_ID = request('orgId');
      $domain->DOMAIN_URL = request('domainName');
      $domain->DOMAIN_SECTOR=request('domainSector');
      $domain->START_DATE= Carbon::now();
      $domain->created_by = request('createdBy');
      $domain->Save();
      
      $plugin = new plugin;
      $plugin->ALIGNMENT = request('pluginAlignment');
      $plugin->PLUGIN_COLOR = request('pluginColor');
      $plugin->ISACTIVE = false;
      $plugin->DOMAIN_ID = domain::latest()->first()->DOMAIN_ID;
      $plugin->CREATED_BY = request('createdBy');
      $plugin->Save();

      return response()->json(['success' => 'Domain and plugin registration successful'], 200);
    }

    public function update(Request $request)
    {

    }

}
