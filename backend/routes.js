var mangapandaService = require('./services/mangapandaService.js');

exports.configure = function(app) {

	app.get('/', function(req, res) {
		res.json({ message: 'Hello World' });
	});

	app.get('/mangas', function(req, res) {
		var result = mangapandaService.getMangas();
		result.then(function(d) {
			res.send("<html><body><pre>" + JSON.stringify(d, null, 2) + "</pre></body></html>");
		}, function(e) {
			res.statusCode = 500;
			res.send('There was an error: ' + e);
		});
	});

	app.get('/mangas/:manga*', function(req, res) {
		var mangaId = req.param('manga');

		console.log(mangaId, unescape(mangaId));

		var result = mangapandaService.getMangaIssues(mangaId);
		result.then(function(d) {
			res.send("<html><body><pre>" + JSON.stringify(d, null, 2) + "</pre></body></html>");
		}, function(e) {
			res.statusCode = 500;
			res.send('There was an error: ' + e);
		});
	});

}