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
		console.log('cache key not found ', 'mangas');
		return mangapandaDao.getMangas()
			.then(cacheMangasHandler);	
	} else {
		return d;
	}
}

function cacheMangasHandler(d) {
	console.log('caching mangas');
	return memcacheService.set('mangas', d);
}