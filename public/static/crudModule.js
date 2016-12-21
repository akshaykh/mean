var crudModule = angular.module('crudModule',['serviceModule']);



crudModule.controller("insertController", function($scope,$http,crudService){
	$scope.saveData = function(){
		var emp = $scope.employee;
		emp.dateOfJoining = new Date();
		console.log(JSON.stringify(($scope.employee)));
		crudService.saveEmp(emp);
	};
	
	$scope.message = "My Name";
	
    $http({
    	method:"GET",
    	url:"http://localhost:3000/empList"
    }).then(function(response){
    	console.log(response);
    	$scope.empList = response.data;
    	console.log('empList');
    	console.log($scope.empList[0].firstName)
    },function(response){
    	
    });
    
    $scope.update = function(){
    	var emp = $scope.employee;
    	crudService.updateEmp(emp);
    };
	
    $scope.deleteEmp = function(){
    	var emp = $scope.employee;
    	crudService.removeEmp(emp);
    };
    
	$scope.search = function(){
	  var empNo = $scope.employee.employeeNumber;
	  var someThing = crudService.returnEmp(empNo,$scope);
	 // $scope.employee = someThing;
	  console.log(someThing);
          
	};
});