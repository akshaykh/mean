var loginmodule = angular.module('loginmodule',[]);

loginmodule.controller('login', function($scope,$http,$location){
	
	$scope.signin = function(){
		console.log('sign in function');
		var User = $scope.user;
		$http({  method:"POST",
			     url:"http://localhost:3000/signin",
			     data: User}).
			     then(function(response){
                     console.log(response.data);
                     if (response.data == true) {
                         console.log('in if');
                         console.log('loc'+$location.path());
                         $location.path = '/homepage';
                     }
			     },function(resp){
			    	 
			     });
		
	};
	
	$scope.signup = function(){
		var User = $scope.user;
        console.log('sign up');
        console.log(User);
		$http({
			method : "POST",
			url : "http://localhost:3000/signup",
			data: User
		}).then(function(response){},function(resp){});
	};
	
});