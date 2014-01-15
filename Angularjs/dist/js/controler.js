var hirenx = angular.module('hiren',['ngRoute']);

hirenx.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
		.when("/explore" ,{
			templateUrl:'alphaselect.html',
			controller: 'hirenx'
		})
		.when('/x' ,{
			templateUrl: 'artistsName.html' ,
			controller : 'hireny'
		})
		.when('/hiren' , {
			templateUrl : 'download.html',
			controller : 'hirenz'
		})
		.otherwise({
			redirectTo: '/'
		});
		//$locationProvider.html5Mode(true);
	}]);



var rootURL = "http://localhost/music/public/index.php/";

hirenx.controller('hireny' , function($scope ,$http , $location){
	//$http.defaults.useXDomain = true;
	$http.get( rootURL + 'alpha').success(function(data){
		$scope.message = data ;
		$scope.click = function(value){
			//console.log(value);
			var x = {'name' : value};
			$http.post( rootURL + 'alphapost', x).success(function(data){
				console.log('data send');
				$location.path(value);
			});
		}
	});
});