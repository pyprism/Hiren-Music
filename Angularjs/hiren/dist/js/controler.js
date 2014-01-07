var hirenx = angular.module('hiren',['ngRoute' , 'ngResource']);

hirenx.config(['$routeProvider' ,
	function($routeProvider,$locationProvider){
		$routeProvider
		.when('/x' ,{
			templateUrl: '/x.html' ,
			controller : 'hireny'
		})
		.otherwise({
			redirectTo: '/'
		});
		//$locationProvider.html5Mode(true);
	}]);


/**hirenx.factory("Booking", function ($resource) {
    return $resource(
        "http://localhost:8000/x");
});**/

hirenx.controller('hireny' , function($scope , $resource){
	//$http.defaults.useXDomain = true;
	var x  = $resource('http://localhost:8000/json.json');
	console.log(x.get());
	$scope.message = [] ;
});