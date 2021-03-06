var mangapandaService = require('../services/mangapandaService.js');

exports.getMangas = function (req, res) {
	var result = mangapandaService.getMangas();
	result.then(function(d) {
		res.json(d);
	}, function(e) {
		console.log(e);
		res.statusCode = 500;
		res.json(new JsonError(500, 'Error getting mangas'));
	});
}

exports.getMangaIssues = function(req, res) {
	var mangaId = req.param('manga');

	console.log('issues');

	var result = mangapandaService.getMangaChapters(mangaId);
	result.then(function(d) {
		res.json(d);
	}, function(e) {
		res.statusCode = 500;
		res.json(new JsonError(500, 'Error getting issues'));
	});
}

exports.getMangaChapter = function(req, res) {
	var mangaId = req.param('manga');
	var chapterId = req.param('chapter');

	console.log('chapter:', mangaId, ':', chapterId);

	var result = mangapandaService.getMangaChapter(mangaId, chapterId);

	result.then(function(d) {
		res.json(d);
	}, function(e) {
		res.statusCode = 500;
		res.json(new JsonError(500, 'Error getting chapter'));
	});
}