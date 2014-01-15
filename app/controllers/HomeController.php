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

	public function artist_alpha()
	{
		//header('Access-Control-Allow-Origin: *');
		global $alpha ;
		$alpha = select_artist_by_alpha();
		return Response::json(array_keys($alpha));
	}

	public function artist_alpha_post(){
		global $alpha;
		global $selected_alpha ;
		if (Input::has('name')){
			if (Input::get('name')  == $alpha)
			//$my_file = '/tmp/' . Input::get('name');
			//$handle = fopen($my_file, 'w') ;
				$selected_alpha = Input::get('name') ;
		}
	}

	public function artist_name()
	{
		global $artist_name ;
		$artist_name = select_artist_by_name();
		return Response::json(array_keys($artist_name));
	}

}