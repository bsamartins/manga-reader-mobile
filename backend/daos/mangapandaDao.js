var cheerio = require('cheerio');
var http = require('http');
var url = require('url');
var q = require('q');

function getUrl(uri) {

	var options;

	if(process.env.HTTP_PROXY) {
		var proxyConfig = url.parse(process.env.HTTP_PROXY);

		options = {};
		options.host = proxyConfig.hostname;
		options.port = proxyConfig.port;
		options.path = uri;
		options.headers = {
			Host: url.parse(uri).host
		}
	} else {
		options = uri;
	}

	var deferred = q.defer();

	console.log('Calling to: ' + JSON.stringify(options));

	var req = http.get(options, function(res) {
			var body = '';

			res.on('data', function(chunk){
				body += chunk;
			});

			res.on('end', function() {
				if (res.statusCode == 200) {
					deferred.resolve(body);
				} else {
					deferred.reject(new Error('Failed getting resource \'' + uri + '\', cause: ' + res.statusCode));	
				}
			});

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
	});

	return result;
}

function extractMangas(data) {
	var $ = cheerio.load(data);
	var result = [];

	$('.series_alpha li a').each(function(i, e) {				
		result.push({
			'name': $(e).text(),
			'uri': $(e).attr('href')
		});
	});
	return result;
}

exports.getMangaIssues = function(id) {
	var result = getUrl('http://www.mangareader.net' + id)
	.then(function(d) {
		return extractMangaIssues(d);
	});
	return result;
}

function extractMangaIssues(data) {
	var $ = cheerio.load(data);
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