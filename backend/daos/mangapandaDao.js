var cheerio = require('cheerio');
var q = require('q');
var httpClient = require('./httpClient.js');

function asJquery(d) {
	if(Array.isArray(d)) {
		var jqArr = [];
		d.forEach(function(e, i) {
			var $ = cheerio.load(e);
			jqArr.push($);
		});
		return jqArr;
	} else {
		var $ = cheerio.load(d);
		return $;
	}
}

exports.getMangas = function() {
	var result = httpClient.getUrl('http://www.mangareader.net/alphabetical')
	.then(asJquery)
	.then(extractMangas);
	return result;
}

exports.getMangaIssues = function(id) {
	var result = httpClient.getUrl('http://www.mangareader.net' + id)
	.then(asJquery)
	.then(extractMangaIssues);
	return result;
}

exports.getMangaIssue = function(id) {
	var issuePages = [];

	var result = httpClient.getUrl('http://www.mangareader.net' + id)
	.then(asJquery)
	.then(function($) {
		issuePages = extractMangaIssue($);
		return issuePages;
	})
	.then(getMangaPages)
	.then(asJquery)
	.then(function(jqArr) {
		var issueImages = extractPageImages(jqArr);

		issuePages.forEach(function(e, i) {
			e.imageUri = issueImages[i].imageUri;
		});

		return issuePages;
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

function extractMangaIssue($) {
	var result = [];

	$('#pageMenu option').each(function(i, e) {	
		result.push({
			'pageNumber': $(e).text(),
			'uri': $(e).attr('value')
		});
	});
	return result;
}

function extractPageImages(jqArr) {
	var result = []
	jqArr.forEach(function($, i) {
		result.push({
			'imageUri': $('#img').attr('src')
		});
	});
	return result;
}

function getMangaPages(d) {
	var promises = [];
	d.forEach(function(e) {
		var promise = httpClient.getUrl('http://www.mangareader.net' + e.uri);
		promises.push(promise);
	});

	return q.all(promises);
}

function parseDate(strDate) {
	var dateParts = strDate.split('/');
	return new Date(dateParts[2], dateParts[1]-1, dateParts[0]);
}