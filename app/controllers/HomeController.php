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
		$alpha = select_artist_by_alpha();
		return Response::json($alpha);
	}



	public function artist_name()
	{

		if(Input::has('alpha')){
			$artist_name = select_artist_by_name(Input::get('alpha'));
		}
		return Response::json($artist_name);
	}

	public function album_name()
	{
		if(Input::has('alpha') &&  Input::has('name'))
			$get_list = get_album_list(Input::get('alpha'),Input::get('name'));
		return Response::json($get_list) ;
	}

	public function music(){
		if(Input::has('alpha') && Input::has('name') && Input::has('album'))
			$hiren = get_music_list(Input::get('alpha') , Input::get('name') , Input::get('album'));
		return Response::json($hiren) ;
	}

}