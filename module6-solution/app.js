(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController); 

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  
  $scope.performComputation = function () {
    $scope.result = parseInput($scope.name);
	$scope.name = ""; 
  };
  
  function parseInput(input) {
	var temp = input.split(",");
	var output = "";
	var count = 0;
	
	for(var i=0; i<temp.length; i++) {
		if(!isEmpty(temp[i])) {
			count++;
		}
	}
	
	if(count == 0) {
		output = "Please enter data first";	
		$scope.display = "condition1";
	}
	else if(count >= 1 && count <= 3) {
		output = "Enjoy!"
		$scope.display = "condition2";
	}
	else {
		output = "Too much!"
		$scope.display = "condition2";
	}
	
	return output;	
  }
  
  function isEmpty(token) {
	
	var flag = false;
	
	token = token.trim();
	
	if(token.length === 0) {
		flag = true;	
	}
	
    return flag;
  }
  
}
})();
