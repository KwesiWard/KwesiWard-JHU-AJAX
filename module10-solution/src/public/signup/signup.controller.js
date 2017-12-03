(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['SignupService'];
function SignupController(SignupService) {
	
	var signupCtrl = this;
  
	signupCtrl.firstname = "";
	signupCtrl.lastname = "";
	signupCtrl.email = "";
	signupCtrl.phone = "";
	signupCtrl.shortname = "";
	signupCtrl.promiseFlag = null;
	signupCtrl.displayMessage = "";

	signupCtrl.send = function () {
		
		var promise = SignupService.getMenuItem(signupCtrl.shortname);
		
			promise.then(function (response) {
				console.log("Success...");	
				signupCtrl.promiseFlag = true;
				SignupService.setFirstName(signupCtrl.firstname);
				SignupService.setLastName(signupCtrl.lastname);
				SignupService.setEmail(signupCtrl.email);
				SignupService.setPhone(signupCtrl.phone);
				SignupService.setShortName(signupCtrl.shortname);
				SignupService.setTitle(response.name);
				SignupService.setDescription(response.description);
				SignupService.setPromiseFlag(true);
			})
			.catch(function (error) {
				console.log("Failure...");
				signupCtrl.displayMessage = "No such menu number exists.";
				signupCtrl.promiseFlag = false;
				SignupService.setPromiseFlag(false);
			});
	};
	
	signupCtrl.isFavoriteItem = function () {
		
		var promise = SignupService.validateFavoriteItem(signupCtrl.shortname);	
		
			promise.then(function (response) {
				console.log("Success...");	
				signupCtrl.displayMessage = "";
		    })
			.catch(function (error) {
				console.log("Failure...");
				signupCtrl.displayMessage = "No such menu number exists.";
				signupCtrl.promiseFlag = false;
				SignupService.setPromiseFlag(false);
			}); 
	};	
}

})();
