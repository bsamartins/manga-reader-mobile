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
  		'ngRoute'
  	])
  	.config(function($routeProvider) {
  		$routeProvider.when('/manga/list', {
			templateUrl: 'views/mangalist.html',
  			controller: 'MangalistCtrl'
		});
  	});
