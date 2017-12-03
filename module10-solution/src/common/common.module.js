(function() {
"use strict";

angular.module('common', [])
.constant('ApiBasePath', 'https://kward.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
