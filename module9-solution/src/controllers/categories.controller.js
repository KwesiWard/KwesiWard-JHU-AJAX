(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['MenuDataService'];
function CategoriesController(MenuDataService) {
  var categoriesList = this;
  categoriesList.categories = [];

  categoriesList.$onInit = function () {  
    MenuDataService.getAllCategories()
    .then(function (result) {	
        categoriesList.categories = result;
    });
  };
}

})();

