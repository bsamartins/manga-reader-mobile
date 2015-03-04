'use strict';

/**
 * @ngdoc function
 * @name mangaReaderMobileApp.controller:MangachapterCtrl
 * @description
 * # MangachapterCtrl
 * Controller of the mangaReaderMobileApp
 */
angular.module('mangaReaderMobileApp')
  	.controller('MangachapterCtrl', function ($scope, $routeParams, mangaService) {

  		$scope.pageIndex = 0;

    	mangaService.mangaPages($routeParams.mangaId, $routeParams.chapterId)
    	.then(function(result) {
    		$scope.pages = result;
    		$scope.pageIndex = 0;
    		$scope.page = $scope.pages[$scope.pageIndex];
    	});    	

    	$scope.showNext = function() {    	
    		if($scope.hasNext()) {
	    		$scope.pageIndex += 1;
    			$scope.page = $scope.pages[$scope.pageIndex];
    		}
    	}

    	$scope.showPrevious = function() {
    		if($scope.hasPrevious()) {
    			$scope.pageIndex -= 1;
    			$scope.page = $scope.pages[$scope.pageIndex];
    		}
    	}

    	$scope.hasNext = function() {
    		if($scope.pageIndex != undefined
    			&& $scope.pages != undefined
    			&& $scope.pageIndex < ($scope.pages.length-1)) {
    			return true;
    		}
    		return false;
    	}

		$scope.hasPrevious = function() {
			if($scope.pageIndex != undefined
				&& $scope.pages != undefined
				&& $scope.pageIndex > 0
    			&& $scope.pageIndex < $scope.pages.length) {
    			return true;
    		}
    		return false;
    	}
  	});
