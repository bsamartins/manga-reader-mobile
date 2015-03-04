'use strict';

/**
 * @ngdoc overview
 * @name mangaReaderMobileApp
 * @description
 * # mangaReaderMobileApp
 *
 * Main module of the application.
 */
angular
  	.module('mangaReaderMobileApp', [
  		'ngRoute',
      'ngTouch'
  	])
  	.config(function($routeProvider) {
  		$routeProvider
  		.when('/manga/list', {
			templateUrl: 'views/mangalist.html',
  			controller: 'MangalistCtrl'
		})
		.when('/manga/:mangaId', {
  			templateUrl: 'views/manga.html',
  			controller: 'MangaCtrl'
		})
		.when('/manga/:mangaId/:chapterId', {
  			templateUrl: 'views/mangachapter.html',
  			controller: 'MangachapterCtrl'
		});
  	});
