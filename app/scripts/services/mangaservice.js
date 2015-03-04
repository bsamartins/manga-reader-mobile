'use strict';

/**
 * @ngdoc service
 * @name mangaReaderMobileApp.mangaService
 * @description
 * # mangaService
 * Service in the mangaReaderMobileApp.
 */
angular.module('mangaReaderMobileApp')
  .service('mangaService', function mangaService($q) {  	
    return {
    	mangaListAlphabetically: function() {    		

    		return $q(function(resolve, reject){
	    		var result = [];

    			result[0] = { 
    				character: 'A', 
    				mangas: [
    					{ 
    						id: 'antonio',
    						name: 'Antonio'
    					}, 
    					{ 
    						id: 'alberto',
    						name: 'Alberto'
    					}]
    			};
				result[1] = { 
    				character: 'B', 
    				mangas: [
    					{ id:'bern', name: 'Bernardo'}, 
    					{ id:'brun', name: 'Bruno'}]
    			};
				result[2] = { 
    				character: 'C', 
    				mangas: [{ id:'carl', name: 'Carlos'}]
    			};    	

    			resolve(result);
    		});
    	},
    	mangaChapters: function(mangaId) {
    		return $q(function(resolve, reject){
				var result = [];

				result[0] = { fullName: 'Bern 1', datePublished: '2012-01-01', uri: 'chapter-1', id: 'bern-1' };
				result[1] = { fullName: 'Bern 2', datePublished: '2012-02-01', uri: 'chapter-2', id: 'bern-2' };
				result[2] = { fullName: 'Bern 3', datePublished: '2012-03-01', uri: 'chapter-3', id: 'bern-3' };

				resolve(result);
    		});
    	},
    	mangaPages: function(mangaId, chapterId) {
    		return $q(function(resolve, reject){
				var result = [];

				result[1] = { imageUri: 'http://41.media.tumblr.com/b59a72a754aef35ceea343e78905ae21/tumblr_njf1k6GEcY1rrv8t0o1_1280.jpg' };
				result[0] = { imageUri: 'http://40.media.tumblr.com/9bc3999387b538a0fb6652c388961105/tumblr_niv7ck65dh1rrv8t0o1_1280.jpg' };
				result[2] = { imageUri: 'http://40.media.tumblr.com/b92f554529318ab4f76107ac6bf50f43/tumblr_nit2zgjQhu1rrv8t0o1_1280.jpg' };

				resolve(result);
    		});
    	}
    }
  });
