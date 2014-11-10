var mangapandaDao = require('../daos/mangapandaDao.js');
var memcacheService = require('./memcacheService.js');

exports.getMangas = function() {
	return memcacheService.get('mangas')
		.then(function(d) {
			if(!d) {
				return [];
			} else {
				return d;
			}
		});
	//return mangapandaDao.getMangas();
}

exports.getMangaIssues = function(mangaId) {
	return mangapandaDao.getMangaIssues(mangaId);
}