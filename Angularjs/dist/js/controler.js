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
		//$locationProvider.html5Mode(true);
	}]);


/**hirenx.factory("Booking", function ($resource) {
    return $resource(
        "http://localhost:8000/x");
});**/

/**hirenx.factory('User', function($resource) {
    return $resource('http://localhost:8000/x');
});**/

hirenx.controller('hireny' , function($scope ,$http,$anchorScroll){
	//$http.defaults.useXDomain = true;
	//var x  = $resource('http://localhost:8000/json.json');
	//console.log(User.query());
	$http.get('http://localhost:8000/json.json').success(function(data){
		$scope.message = data ;
		$anchorScroll();
	});
});




/**app.factory('User', function($resource) {
    return $resource('http://myapp.com/ws/users');
});

app.controller('UsersController', function($scope, User) {
    $scope.title = "Users";
    $scope.users = User.query();
});**/