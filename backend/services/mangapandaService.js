var mangapandaDao = require('../daos/mangapandaDao.js');

exports.getMangas = function() {
	return mangapandaDao.getMangas();
}

exports.getMangaIssues = function(mangaId) {
	return mangapandaDao.getMangaIssues(mangaId);
}