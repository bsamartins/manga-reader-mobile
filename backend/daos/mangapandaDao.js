var q = require('q');
var request = require('request');
var cheerio = require('cheerio');

function getUrl(uri) {
	var deferred = q.defer();

	var options = {
		'uri': uri
	}

	request(options, function(error, response, body) {
		if (error) {
			deferred.reject(error);
			return;	    					    
  		}

  		if(response && response.statusCode != 200) {
  			deferred.reject(new Error());
			return;
  		}

  		deferred.resolve(body);
  	});

	return deferred.promise;
}

function asJquery(d) {
	var $ = cheerio.load(d);
	return $;
}

exports.getMangas = function() {
	var result = getUrl('http://www.mangareader.net/alphabetical')
	.then(asJquery)
	.then(extractMangas);
	return result;
}

exports.getMangaIssues = function(id) {
	var result = getUrl('http://www.mangareader.net/' + id)
	.then(asJquery)
	.then(extractMangaIssues);
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