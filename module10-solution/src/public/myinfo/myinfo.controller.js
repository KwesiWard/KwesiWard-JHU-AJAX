(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);
 
MyInfoController.$inject = ['SignupService'];
function MyInfoController(SignupService) {
	
	var myInfoCtrl = this;
  
	myInfoCtrl.firstname = SignupService.getFirstName();
	myInfoCtrl.lastname = SignupService.getLastName();
	myInfoCtrl.email = SignupService.getEmail();
	myInfoCtrl.phone = SignupService.getPhone();
	myInfoCtrl.shortname = SignupService.getShortName();
	myInfoCtrl.title = SignupService.getTitle();
	myInfoCtrl.description = SignupService.getDescription();
    myInfoCtrl.promiseFlag = SignupService.getPromiseFlag();
}

})();
