(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;
  
	service.getAllCategories = function () {
		
		return $http({
			
			method: "GET",
			url: (ApiBasePath + "/categories.json")
			
		}).then(function (response) {
			
			var categories = [];
			
			for(var i = 0; i < response.data.length; i++) {
				
				var item = {
					id: response.data[i].id,	
					shortName: response.data[i].short_name,
                    name: response.data[i].name,					
					specialInstructions: response.data[i].special_instructions,
					url: response.data[i].url
				};
					
				categories.push(item);
			}
				
			return categories;
		});	
	};
	
	service.getItemsForCategory = function (categoryShortName) {
		
		return $http({
			
			method: "GET",
			url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
			
		}).then(function (response) {
			
			var items = [];
			
			for(var i = 0; i < response.data.menu_items.length; i++) {
				
				var item = {
					id: response.data.menu_items[i].id,	
					shortName: response.data.menu_items[i].short_name,
                    name: response.data.menu_items[i].name,					
					description: response.data.menu_items[i].description,
					smallPrice: response.data.menu_items[i].price_small,
					largePrice: response.data.menu_items[i].price_large,
					smallPortionName: response.data.menu_items[i].small_portion_name,
					largePortionName: response.data.menu_items[i].large_portion_name
				};
					
				items.push(item);
			}
			
			return items;
		});	
	};	
}

})();
