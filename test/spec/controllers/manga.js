'use strict';

describe('Controller: MangaCtrl', function () {

  // load the controller's module
  beforeEach(module('mangaReaderMobileApp'));

  var MangaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MangaCtrl = $controller('MangaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
