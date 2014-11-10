var mangapandaService = require('./services/mangapandaService.js');

function JsonError(code, message) {
	return {
		'code': code,
		'message': message
	}
}

exports.configure = function(app) {

	app.get('/', function(req, res) {
		res.json({ message: 'Hello World' });
	});

	app.get('/mangas', function(req, res) {
		var result = mangapandaService.getMangas();
		result.then(function(d) {
			res.json(d);
		}, function(e) {
			res.statusCode = 500;
			res.json(new JsonError(500, e.message));
		});
	});

	app.get('/mangas/:manga*', function(req, res) {
		var mangaId = req.param('manga');

		var result = mangapandaService.getMangaIssues(mangaId);
		result.then(function(d) {
			res.json(d);
		}, function(e) {
			res.statusCode = 500;
			res.json(new JsonError(500, e.message));
		});
	});

}