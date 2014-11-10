var mangapandaService = require('../services/mangapandaService.js');

exports.getMangas = function (req, res) {
	var result = mangapandaService.getMangas();
	result.then(function(d) {
		res.json(d);
	}, function(e) {
		res.statusCode = 500;
		res.json(new JsonError(500, e.message));
	});
}

exports.getMangaIssues = function(req, res) {
	var mangaId = req.param('manga');

	var result = mangapandaService.getMangaIssues(mangaId);
	result.then(function(d) {
		res.json(d);
	}, function(e) {
		res.statusCode = 500;
		res.json(new JsonError(500, e.message));
	});
}
