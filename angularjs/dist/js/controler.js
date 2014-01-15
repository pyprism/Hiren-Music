var hirenx = angular.module('hiren',['ngRoute']);

hirenx.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
		.when("/" ,{
			templateUrl:'home.html'
			//controller: 'hirenx'
		})
		.when("/explore" ,{
			templateUrl:'parials/alphaselect.html',
			controller: 'hirenx'
		})
		.when('/artist/:name' ,{
			templateUrl: 'parials/artistsName.html' ,
			controller : 'hireny'
		})
		.when('/artist/:name/album/:albumname' , {
			templateUrl : 'parials/download.html',
			controller : 'hirenz'
		})
		.when('/about' , {
			templateUrl : 'parials/about.html'
			//controller : 'hirenz'
		})
		.when('/playlist' , {
			templateUrl : 'parials/playlist.html'
			//controller : 'hirenz'
		})
		.otherwise({
			redirectTo: '/'
		});
		//$locationProvider.html5Mode(true);
	}]);



var rootURL = "http://localhost/music/public/index.php/";

hirenx.controller('hireny' , function($scope ,$http , $location){
	$http.get( rootURL + 'alpha').success(function(data){
		$scope.message = data ;
		$scope.click = function(value){
			var x = {'name' : value};
			$http.post( rootURL + 'alphapost', x).success(function(data){
				console.log('data send');
				$location.path("/hiren");
			});
		}
	});
});