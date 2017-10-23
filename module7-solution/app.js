(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('custom', CustomFilterFactory);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  
  toBuyList.toBuy = ShoppingListCheckOffService.getToBuy();
  var temp = ShoppingListCheckOffService.getToBuy();
 
  toBuyList.removeItemBuy = function (itemIndex) {
	
	ShoppingListCheckOffService.addItemBought(temp[itemIndex].name, temp[itemIndex].quantity, temp[itemIndex].pricePerItem);
    ShoppingListCheckOffService.removeItemBuy(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
	
    boughtList.bought = ShoppingListCheckOffService.getBought();		
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
    var toBuy = [
	    {
		    name: "Oranges",
		    quantity: 2,
			pricePerItem: 1
	    },
	    {
		    name: "Donuts",
		    quantity: 12,
			pricePerItem: 2
	    },
	    {
		    name: "Cookies",
		    quantity: 20,
			pricePerItem: 3
	    },
	    {
		    name: "Chocolates",
		    quantity: 5,
			pricePerItem: 2
	    },
	    {
		    name: "Yogurts",
		    quantity: 8,
			pricePerItem: 1
	    }
    ];
	
	// Already Bought List of shopping items
	var bought = [];
	
	var totalPrice = 0;

	service.addItemBought = function (itemName, quantity, pricePerItem) {
		
		var item = {
		  name: itemName,
		  quantity: quantity,
		  pricePerItem: pricePerItem
		};
		
		bought.push(item);
	};

	service.removeItemBuy = function (itemIdex) {
		toBuy.splice(itemIdex, 1);
	};

	service.getToBuy = function () {
		return toBuy;
	};
	  
	service.getBought = function () {
		return bought;
	};
 }
 
 function CustomFilterFactory() {
	return function (input, arg1, arg2) {
   
		return arg1 + input + arg2;
  }
}
 
})();

