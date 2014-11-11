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
	var result = getMangaPandaResource('/alphabetical')
	.then(asJquery)
	.then(extractMangas);
	return result;
}

exports.getMangaChapters = function(id) {
	var result = getMangaPandaResource(id)
	.then(asJquery)
	.then(extractMangaChapters);
	return result;
}

exports.getMangaChapter = function(id) {
	var chapterPages = [];

	var result = getMangaPandaResource(id)
	.then(asJquery)
	.then(function($) {
		chapterPages = extractMangaChapter($);
		return chapterPages;
	})
	.then(getMangaChapterPages)
	.then(asJquery)
	.then(function(jqArr) {
		var chapterImages = extractChapterImages(jqArr);

		chapterPages.forEach(function(e, i) {
			e.imageUri = chapterImages[i].imageUri;
		});

		return chapterPages;
	});
	return result;
}

function getMangaPandaResource(resource) {
	return httpClient.getUrl('http://www.mangareader.net' + resource);
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

function extractMangaChapters($) {
	var result = [];

	$('#chapterlist tr').each(function(i, e) {	
		if(i > 0) {		
			var cells = $(e).find('td');	

			var chapterFullName = $(cells[0]).text().replace(/\n/g, '');
			var chapterUri = $(cells[0]).find('a').attr('href');
			var chapterDatePublished = $(cells[1]).text().replace(/\n/g, '')

			result.push({
				'fullName': chapterFullName,
				'uri': chapterUri,
				'datePublished': chapterDatePublished
			});
		}
	});
	return result;
}

function extractMangaChapter($) {
	var result = [];

	$('#pageMenu option').each(function(i, e) {	

		var pageNumber = $(e).text();
		var pageUri = $(e).attr('value');

		result.push({
			'number': pageNumber,
			'uri': pageUri
		});
	});
	return result;
}

function extractChapterImages(jqArr) {
	var result = []
	jqArr.forEach(function($, i) {

		var imageUri = $('#img').attr('src');

		result.push({
			'imageUri': imageUri
		});
	});
	return result;
}

function getMangaChapterPages(d) {
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

function buildId(s) {
	

}