(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['$stateParams', 'MenuDataService'];
function ItemsController($stateParams, MenuDataService) {
  var itemsList = this;
  itemsList.items = [];

  itemsList.$onInit = function () {  
    MenuDataService.getItemsForCategory($stateParams.shortName)
    .then(function (result) {	
        itemsList.items = result;
    });
  };
}

})();