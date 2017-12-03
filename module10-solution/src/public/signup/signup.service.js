(function () {
'use strict';

angular.module('public')
.service('SignupService', SignupService);

SignupService.$inject = ['$http', 'ApiBasePath']
function SignupService($http, ApiBasePath) {
	
	var service = this;
	
	var firstName = "";
	var lastName = "";
	var email = "";
	var phone = "";
	var shortName = "";
	var title = "";
	var description = "";
	var promiseFlag = false;
	
	service.setFirstName = function(first_name) {
		firstName = first_name;
	}
	
	service.getFirstName = function () {
		return firstName;
	};
	
	service.setLastName = function(last_name) {
		lastName = last_name;
	}
	
	service.getLastName = function () {
		return lastName;
	};
	
	service.setEmail = function(electronic_mail) {
		email = electronic_mail;
	}
	
	service.getEmail = function () {
		return email;
	};
	
	service.setPhone = function(phone_number) {
		phone = phone_number;
	}
	
	service.getPhone = function () {
		return phone;
	};
	
	service.setShortName = function(short_name) {
		shortName = short_name;
	}
	
	service.getShortName = function () {
		return shortName;
	};
	
	service.setTitle = function(name) {
		title = name;
	}
	
	
	service.getTitle = function () {
		return title;
	};
	
	service.setDescription = function(describe) {
		description = describe;
	}
	
	service.getDescription = function () {
		return description;
	};
	
	service.setPromiseFlag = function(promise_flag) {
		promiseFlag = promise_flag;	
	}
	
	service.getPromiseFlag = function() {
		return promiseFlag;
	}
	
	service.getMenuItem = function (shortname) {
		
		return $http({
			
			method: "GET",
			url: (ApiBasePath + "/menu_items/" + shortname + ".json")
			
		}).then(function (response) {
				
			return response.data;
		});	
	};
	
	service.validateFavoriteItem = function (shortname) {
		
		return $http({
			
			method: "GET",
			url: (ApiBasePath + "/menu_items/" + shortname + ".json")
			
		}).then(function (response) {
				
			return response.data;
		});	
	};	
}

})();


