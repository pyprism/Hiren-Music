<?php


class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
		return View::make('hello');
	}
	public function temp()
	{
		header('Access-Control-Allow-Origin: *');
		$x = select_artist_by_name();
		return Response::json(array_keys($x));
	}

	public function p(){
		if (Input::has('name')){
			if (Input::get('name') == "x"){
			$my_file = 'file2.txt';
			$handle = fopen($my_file, 'w') ;
			}

		}
	}

}