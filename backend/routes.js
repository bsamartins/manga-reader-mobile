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

	app.get('/services/manga', mangaController.getMangas);
	app.get('/services/manga/:manga', mangaController.getMangaIssues);
	app.get('/services/manga/:manga/:chapter', mangaController.getMangaChapter);

}