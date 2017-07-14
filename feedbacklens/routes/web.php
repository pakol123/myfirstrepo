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
Route::get('/api/domain/getAllDomains','domainController@getAllDomains');
Route::get('/api/getuserdata','sessionController@getAuthenticatedUser');
Route::post('api/adduser','registrationController@userAdd');
Route::get('api/allUsers','sessionController@allUsers');
Route::post('/api/fetchRole',function()
	{

        return \App\Role()->get(['ROLE_ID','ROLE_NAME']);

	});

Route::post('api/domain/pluginupdate','pluginController@update');
Route::post('api/domain/addsubcat','subcategoryController@create');