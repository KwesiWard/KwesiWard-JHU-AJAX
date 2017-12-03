describe('signup', function () {

  var signup;
  var $httpBackend;
  var ApiBasePath;
  var shortname;

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      signup = $injector.get('SignupService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('should return a menu item', function() {
    $httpBackend.whenGET(ApiBasePath + "/menu_items/" + "A1" + ".json").respond("Testing...");
    signup.validateFavoriteItem("A1").then(function(response) {
      expect(response.data).toEqual("Testing...");
    });
    $httpBackend.flush();
  });

});
