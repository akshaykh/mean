var serviceModule = angular.module('serviceModule',[]);

serviceModule.service('crudService', function($http){
	
	this.saveEmp = function(emp){
		$http.post("http://localhost:3000/create",emp);
	};
	
	this.returnEmp = function(empNo, scope){
		$http({ method: "GET",
		   	   url: "http://localhost:3000/read/"+empNo
	   }).then(function (response) {
		   console.log(response.data[0]);
		   scope.employee = response.data[0];
		   return response.data[0];
	   }, function(resp){
		   return null;
	   });
	};
	
	
	this.removeEmp = function(emp){
		console.log('remove emp:'+emp.employeeNumber);
		$http.post("http://localhost:3000/delete", emp);
	};
	
	this.updateEmp = function(emp){
		console.log('update method is called');
	 $http.post("http://localhost:3000/update", emp);	
	};
	
});