'use strict';

/**
 * @ngdoc function
 * @name mangaReaderMobileApp.controller:MangaCtrl
 * @description
 * # MangaCtrl
 * Controller of the mangaReaderMobileApp
 */
angular.module('mangaReaderMobileApp')
	.controller('MangaCtrl', function ($scope, $routeParams, mangaService) {

		$scope.manga = {
			id: $routeParams.mangaId,
			title: 'MTitle'
		};

    	mangaService.mangaChapters($routeParams.mangaId)
    	.then(function(result) {
    		$scope.chapters = result;
    	});
   	});
