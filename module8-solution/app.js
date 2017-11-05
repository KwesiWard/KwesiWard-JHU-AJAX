(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
	
  var ddo = {
	  
    templateUrl: 'foundItems.html',
	scope: {
      foundItem: '<',
	  onRemove: '&'
    },
	controller: NarrowItDownDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function NarrowItDownDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	
	var narrowItDown = this;
	narrowItDown.found = [];
	
	narrowItDown.search = "";
	narrowItDown.message = "";
  
	narrowItDown.searchTerm = function () {
		
		if(!MenuSearchService.isEmpty(narrowItDown.search)) {
			
			var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.search);
		
			promise.then(function (response) {
				
				if(response.length != 0) {
					narrowItDown.message = "";
					narrowItDown.found = response;	
				} 
				else {
					narrowItDown.message = "Nothing found";	
					narrowItDown.found = response;	
				}
			})
			.catch(function (error) {
				console.log("Something went terribly wrong.");
			});	
		}
		else {
			narrowItDown.message = "Nothing found";
			narrowItDown.found = "";
		}
	};
	
	narrowItDown.removeItem = function (itemIdex) {
		narrowItDown.found.splice(itemIdex, 1);
	};
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	
	var service = this;
	
	service.isEmpty = function (searchItem) {
	
		var flag = false;
		
		searchItem = searchItem.trim();
		
		if(searchItem.length === 0) {
			flag = true;	
		}
		
		return flag;
	}
	
	service.getMatchedMenuItems = function (searchItem) {
		
		return $http({
			
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
			
		}).then(function (response) {
			
			var foundItems = [];
			
			for(var i = 0; i < response.data.menu_items.length; i++) {
				
				if(response.data.menu_items[i].description.indexOf(searchItem) !== -1) {
					
					var item = {
						name: response.data.menu_items[i].name,	
						shortName:  response.data.menu_items[i].short_name,	
						description: response.data.menu_items[i].description
					};
					
					foundItems.push(item);
				}
			}
			
			return foundItems;
		});	
	};
}
  
})();

