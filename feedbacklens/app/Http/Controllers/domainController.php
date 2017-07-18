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
    	 //$this->middleware('jwt.auth');
    }

    public function index(Request $request)
    {

     

    }

     public function validateDomain()
  {
    if(count(\App\domain::where('DOMAIN_URL',request('domainName'))->get()) == 1)
{
  return 1;
}

  }

    public function store(Request $request)
    {
        
  
//dd($request);  

      if($this->validateDomain() == 1)
      {
        return response()->json(['error' => 'Domain duplication'], 400);
      }
      $domain = new domain;
      $domain->ORG_ID = request('orgId');
      $domain->DOMAIN_URL = request('domainName');
      $domain->DOMAIN_SECTOR=request('domainSector');
      $domain->START_DATE= Carbon::now();
      $domain->CREATED_BY = request('createdBy');
      $domain->Save();
      

      $domain->subcategories()->attach([1,2,3,4],["ISACTIVE"=>1,"CREATED_BY"=>1,"CREATED_AT"=>null]);


      $plugin = plugin::create($request);
      $plugin->Save();



      return response()->json(['success' => 'Domain and plugin registration successful'], 200);
    }

    public function update(Request $request)
    {

    }

    public function getAllDomains(Request $request,$id)
    {

           $domains =  \App\domain::all()->where('ORG_ID',$id);

           return response()->json(array('domains'=>$domains));

    }

    public function getDomainPluginproperties(request $request,$id)
    {
              $domain = \App\domain::find($id);
              $result = \App\plugin::getpluginProperties($domain->DOMAIN_ID);
              //dd($result);
              return response()->json(array('domain'=>$domain,'pluginconfig'=>$result));

    }

}
