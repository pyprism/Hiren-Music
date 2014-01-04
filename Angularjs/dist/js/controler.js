var hirenx = angular.module('hiren',['ngRoute']);

hirenx.config(['$routeProvider' ,
	function($routeProvider){
		$routeProvider
		.when('/x' ,{
			templateUrl: '/x.html' ,
			controller : 'hireny'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);

hirenx.controller('hireny' , function($scope){
	$scope.message = "example" ;
});