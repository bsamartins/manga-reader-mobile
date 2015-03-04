'use strict';

/**
 * @ngdoc function
 * @name mangaReaderMobileApp.controller:MangalistCtrl
 * @description
 * # MangalistCtrl
 * Controller of the mangaReaderMobileApp
 */
angular.module('mangaReaderMobileApp')
	.controller('MangalistCtrl', function ($scope, mangaService) {

		mangaService.mangaListAlphabetically()
		.then(function(result) {
			$scope.list = result;
		});
  });
