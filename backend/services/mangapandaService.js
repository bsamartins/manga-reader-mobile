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

function getMangasHandler(d) {
	if(!d) {
		return mangapandaDao.getMangas()
			.then(cacheMangasHandler);	
	} else {
		return d;
	}
}

function cacheMangasHandler() {
	return memcacheService.set('mangas', d);
}