var mangapandaService = require('./services/mangapandaService.js');

exports.configure = function(app) {

	app.get('/', function(req, res) {
		res.json({ message: 'Hello World' });
	});

	app.get('/mangas', function(req, res) {
		var result = mangapandaService.getMangaList();
		result.then(function(d) {
			console.log('no error');
			res.json(d);
		})
		.fail(function(e) {
			console.log('error');
			res.statusCode = 500;
			res.send('There was an error: ' + e);
		});
	});
}