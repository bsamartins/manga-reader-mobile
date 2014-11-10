var mangapandaDao = require('../daos/mangapandaDao.js');
var memcacheService = require('./memcacheService.js');

exports.getMangas = function() {
	return memcacheService.get('mangas')
		.then(getMangasHandler);
	//return mangapandaDao.getMangas();
}

exports.getMangaIssues = function(mangaId) {
	var key = 'manga_' + mangaId;

	return memcacheService.get(key)
		.then(function(d) {
			if(!d) {
				console.log('cache not found ', 'mangas');
				return mangapandaDao.getMangaIssues(mangaId);	
			} else {
				return d;
			}
		})
		.then(function(d){
			return memcacheService.set(key, d);
		});
}

function getMangasHandler(d) {
	if(!d) {
		console.log('cache not found ', 'mangas');
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