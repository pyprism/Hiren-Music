var hirenx = angular.module('hiren',['ngRoute']);

hirenx.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
		.when("/explore" ,{
			templateUrl:'/alphaselect.html',
			controller: 'hirenx'
		})
		.when('/x' ,{
			templateUrl: '/artistsName.html' ,
			controller : 'hireny'
		})
		.when('/hiren' , {
			templateUrl : '/download.html',
			controller : 'hirenz'
		})
		.otherwise({
			redirectTo: '/'
		});
		//$locationProvider.html5Mode(true);
	}]);

hirenx.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

hirenx.controller('hireny' , function($scope ,$http){
	//$http.defaults.useXDomain = true;
	$http.get('http://localhost:8000/json.json').success(function(data){
		$scope.message = data ;
		$scope.click = function(value){
			//console.log(value);
			var x = {'name' : value};
			$http.post('http://localhost:8000/nisha', x).success(function(data){
				console.log('data send');
			});
		}
	});
});