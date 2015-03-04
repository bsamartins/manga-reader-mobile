'use strict';

describe('Service: mangaService', function () {

  // load the service's module
  beforeEach(module('mangaReaderMobileApp'));

  // instantiate service
  var mangaService;
  beforeEach(inject(function (_mangaService_) {
    mangaService = _mangaService_;
  }));

  it('should do something', function () {
    expect(!!mangaService).toBe(true);
  });

});
