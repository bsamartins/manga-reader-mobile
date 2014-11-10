var mangaController = require('./controllers/mangaController.js');

function JsonError(code, message) {
	return {
		'code': code,
		'message': message
	}
}

exports.configure = function(app) {
/*
	app.get('/', function(req, res) {
		res.json({ message: 'Hello World' });
	});
*/

	app.get('/manga', mangaController.getMangas);
	app.get('/manga/:manga', mangaController.getMangaIssues);
	app.get('/manga/:manga/:issue', mangaController.getMangaIssue);

}