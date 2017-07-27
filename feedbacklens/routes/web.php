<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/registration',function()
{
	  return view('registration');
})->middleware('guest');

Route::post('/registration','registrationController@store');

Route::get('/login',function()
{
return view('login');
})->middleware('guest')->name('login');

Route::post('/login','sessionController@checkuser');

Route::get('/logout',function()
{
Auth()->logout();
return redirect('/');
})->middleware('auth');*/


Route::get('/', function () {
    return view('index');
});



Route::post('/api/registration', 'registrationController@store');
Route::post('/api/login', 'sessionController@checkUser');

Route::post('/api/domain/create','domainController@store');
Route::get('/api/domain/getAllDomains/{id}','domainController@getAllDomains');
Route::get('/api/getuserdata','sessionController@getAuthenticatedUser');
Route::post('api/adduser','registrationController@userAdd');
Route::get('api/allUsers','sessionController@allUsers');
Route::get('/api/fetchRole',function()
	{

        return \App\Role::get(['ROLE_ID','ROLE_NAME']);

	});

Route::post('api/domain/pluginupdate','pluginController@update');
Route::post('api/domain/addsubcat','subcategoryController@create');
Route::get('api/domain/getsubcat/{id}','subcategoryController@getsubcatbyDomains');
Route::get('activate/user/{id}','registrationController@verifyUser');
Route::get('api/plugin/{id}', 'pluginController@getpluginProperties');
Route::get('api/domain/fetchData','domainController@getDomainPluginproperties');
Route::post('api/feedback/sendFeedBack','feedbackController@create');


Route::post('api/plugin/updateSubCat' , 'pluginController@updatePluginSubcategories');
Route::get('api/feedback/getFeedback' , 'feedbackController@getFeedback');
Route::get('api/feedback/filter/{id}' , 'feedbackController@filterFeedback');
Route::get('api/feedback/export/{id}','feedbackController@exportAsFile');

Route::get('api/notifications','feedbackController@notifications');

Route::get('api/report/category/{id}' , 'reportController@getCategoryCount');
Route::get('api/report/rating/{id}' , 'reportController@getRatingCount');
Route::get('api/report/subcategory/{id}' , 'reportController@getSubCategoryCount');
Route::get('api/report/feedbackText/{id}' , 'reportController@getfeedbackText');

Route::get('api/report/getReportDetails/{id}','reportController@getReportDetails');