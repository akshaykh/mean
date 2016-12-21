var topModule = angular.module('topModule',['ngRoute', 'crudModule']);

topModule.config(function($routeProvider){
	$routeProvider
      .when('/', {
        templateUrl: 'insert',
        controller: 'insertController'
      });
});


topModule.directive('createTable', function(){
	return {
		restrict : 'E',
		scope : {
			employees : '=info',
			message : '=sayhi'
		},
		templateUrl : 'dataTable'
	};
});


topModule.directive('moreThanHundread', function($q){
	return{
		restrict : 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ngModel){
			ngModel.$validators.limitCross = function(modelValue, viewValue){
				try{
				//var differ = $q.defer();
				console.log(viewValue);
				
				if(viewValue != '' && viewValue != null){
				if(viewValue > 100)
					ngModel.$setValidity('lessThanHundread', true);
					//differ.resolve();
				else
					ngModel.$setValidity('lessThanHundread', false);
				}
				}
				catch(e){
					console.log(e);
				}
				return viewValue;
			};
		}
		
	};
});