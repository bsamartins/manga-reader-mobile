var cheerio = require('cheerio');
var http = require('http');
var url = require('url');
var q = require('q');

function getUrl(uri) {

	var options = {
  		host: "localhost",
  		port: 8888,
  		headers: {}
	};

	// proxy settings
	options.path = uri;
	options.headers.Host = url.parse(uri).host;

	var deferred = q.defer();

	var req = http.get(options, function(data) {
			if (data.statusCode == 200) {
				deferred.resolve(data);
			} else {
				deferred.reject(new Error('Failed getting resource \'' + uri + '\', cause: ' + data.statusCode));	
			}
		})
		.on('error', function(e) {
			deferred.reject(e);
		});

	req.end();

	return deferred.promise;
}


exports.getMangas = function() {
	var result = getUrl('http://www.mangareader.net/alphabetical')
	.then(function(d) {
		return extractMangas(d)
	})
	.fail(function(e) {
		return new Error(e);
	});

	return result;
}

function extractMangas(data) {
	var $ = cheerio.load(data);
	var result = [];

	$('.series_alpha li a').each(function(i, e) {				
		
		result.push({
			'name': $(e).text(),
			'uri': $(e).attr('href').text()
		});
	});
	return result;
}