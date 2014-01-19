var hiren = angular.module('hiren',['ngRoute']);

hiren.config(
	function($routeProvider){
		$routeProvider
		.when("/" ,{
			templateUrl:'partials/home.html'
			//controller: 'hirenx'
		})
		//http://www.music.com.bd/download/browse/
		.when("/explore" ,{
			templateUrl:'partials/alphaselect.html',
			controller: 'hirenw'
		})
		//http://www.music.com.bd/download/browse/A/
		.when('/artist/:alpha/' ,{
			templateUrl: 'partials/artistsName.html' ,
			controller : 'hirenx'
		})
		//http://www.music.com.bd/download/browse/A/Abbasuddin%20Ahmed/
		.when('/artist/:alpha/:name/' ,{
			templateUrl: 'partials/albumName.html' ,
			controller : 'hireny'
		})
		//http://www.music.com.bd/download/browse/A/Abbasuddin%20Ahmed/Bhatir%20Ganger%20Naiya/
		.when('/artist/:alpha/:name/:albumname/' , {
			templateUrl : 'partials/download.html',
			controller : 'hirenz'
		})
		.when('/about' , {
			templateUrl : 'partials/about.html'
			//controller : 'hirenz'
		})
		.when('/playlist' , {
			templateUrl : 'partials/playlist.html',
			controller : 'hiren'
		//})
		//.otherwise({
		//	redirectTo: '/'
		});
		//$locationProvider.html5Mode(true);
	});



var rootURL = "http://localhost/music/public/index.php/";

hiren.controller('hirenw' , function($scope ,$http , $location){
	$http.get( rootURL + 'alpha').success(function(data){
		$scope.message = data ;
		$scope.click = function(value){
			//var x = {'alpha' : value};
			$location.path("/artist/" + value + "/");
			//$http.post( (rootURL + 'alphapost') , x).success(function(data){
				//console.log(data);
			//	$location.path("/artist/" + value );
			//});
		}
	});
});

hiren.controller('hirenx' , function($scope , $http , $location , $routeParams){
	$http.post( (rootURL + 'artistname') , {'alpha' : $routeParams.alpha }).success(function(data){
		$scope.message = data;
	});
	$scope.click = function(value){
		//console.log($routeParams.alpha + "/" + value);
		$location.path("/artist/" + $routeParams.alpha + "/" + encodeURI(value) + "/");
	}
});

hiren.controller('hireny',function($scope , $http , $location , $routeParams){
	//var x = encodeURI(name);
	$http.post((rootURL + 'albumname/') , {'alpha' : $routeParams.alpha , 'name' : $routeParams.name}).success(function(data){
		$scope.message = data;
	});
	$scope.click = function(value){
		$location.path = ("/artist/" + $routeParams.alpha + "/" + $routeParams.name + '/' + encodeURI(value) + "/" );
	}
});

hiren.controller('hirenz',function($scope,$http,$location,$routeParams){
	$http.post( (rootURL + "hiren/") , {'alpha' : $routeParams.alpha , 'name' : $routeParams.name , 'album' : $routeParams.albumname }).success(function(data){
		//
	});
});