var mangapandaDao = require('../daos/mangapandaDao.js');
var memcacheService = require('./memcacheService.js');

exports.getMangas = function() {
	return memcacheService.get('mangas')
		.then(getMangasHandler);
	//return mangapandaDao.getMangas();
}

exports.getMangaIssues = function(mangaId) {
	return mangapandaDao.getMangaIssues(mangaId);
}

function getMangasHandler = function(d) {
	if(!d) {
		return memcacheService.set('mangas', d)
			.then(function(d) {
				return d;
			});
	} else {
		return d;
	}
}