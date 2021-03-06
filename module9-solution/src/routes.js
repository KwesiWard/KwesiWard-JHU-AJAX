(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
	.state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })
  
  // Categories page
	.state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/main-categories.template.html',
	controller: 'CategoriesController as categoriesList',
	resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  
  // Items page
	.state('items', {
    url: '/items/{shortName}',
    templateUrl: 'src/templates/main-items.template.html',
	controller: 'ItemsController as itemsList',
	resolve: {
        items: ['$stateParams', 'MenuDataService', 
		function ( $stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
	
  });
}

})();
