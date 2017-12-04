describe('signup', function () {

  var signup;
  var $httpBackend;
  var ApiBasePath;
  var shortName = "A1";

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      signup = $injector.get('SignupService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('It should return a menu item', function() {
    $httpBackend.whenGET(ApiBasePath + "/menu_items/" + shortName + ".json").respond("Testing...");
    signup.validateFavoriteItem(shortName).then(function(response) {
      expect(response.data).toEqual("Testing...");
    });
    $httpBackend.flush();
  });

});
