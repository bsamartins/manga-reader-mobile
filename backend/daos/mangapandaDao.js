var q = require('q');
var jsdom = require('jsdom');
var request = require('request');

function getUrl2(uri, parseCallback) {
	var deferred = q.defer();

	var options = {
		'uri': uri
	}

	request(options, function(error, response, body) {
		if (error) {
			deferred.reject(error);
			console.log('Error when contacting: ', uri);
			console.log(error);
			return;	    					    
  		}

  		if(response && response.statusCode != 200) {
  			deferred.reject(new Error());
  			console.log('Error when contacting: ', uri, ' HTTP Status: ', response.statusCode);
			return;
  		}

		jsdom.env({
			html: body,
	  		scripts: ["http://code.jquery.com/jquery.js"],
	  		done: function (errors, window) {
	    		var $ = window.$;	    	
	    		deferred.resolve($);
	    	}	  	
		});
	});

	return deferred.promise;
}

exports.getMangas = function() {
	var result = getUrl2('http://www.mangareader.net/alphabetical')
	.then(function($) {
		return extractMangas($)
	});

	return result;
}

exports.getMangaIssues = function(id) {
	var result = getUrl2('http://www.mangareader.net' + id)
	.then(function(d) {
		return extractMangaIssues(d);
	});
	return result;
}

function extractMangas($) {
	var result = [];

	$('.series_alpha li a').each(function(i, e) {				
		result.push({
			'name': $(e).text(),
			'uri': $(e).attr('href')
		});
	});
	return result;
}

function extractMangaIssues($) {
	var result = [];

	$('#chapterlist tr').each(function(i, e) {	
		if(i > 0) {		
			var cells = $(e).find('td');	

			result.push({
				'name': $(cells[0]).text().replace(/\n/g, ''),
				'uri': $(cells[0]).find('a').attr('href'),
				'date': $(cells[1]).text().replace(/\n/g, '')
			});
		}
	});
	return result;
}

function parseDate(strDate) {
	var dateParts = strDate.split('/');
	return new Date(dateParts[2], dateParts[1]-1, dateParts[0]);
}