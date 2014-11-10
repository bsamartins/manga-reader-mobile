var mangapandaDao = require('../daos/mangapandaDao.js');
var memcacheService = require('./memcacheService.js');

exports.getMangas = function() {
	return memcacheService.get('mangas')
		.then(getMangasHandler);
}

exports.getMangaChapters = function(mangaId) {
	var key = 'manga_' + mangaId;

	return memcacheService.get(key)
		.then(function(d) {
			if(!d) {
				console.log('cache not found ', key);
				return mangapandaDao.getMangaIssues(mangaId)
					.then(function(d){
						return memcacheService.set(key, d);
					});
			} else {
				return d;
			}
		});
}

exports.getMangaChapter = function(mangaId, chapterId) {
	var key = 'manga_' + mangaId + '_' + chapterId;	

	return memcacheService.get(key)
		.then(function(d) {
			if(!d) {
				console.log('cache not found ', key);
				return mangapandaDao.getMangaChapter(chapterId)
					.then(function(d){
						return memcacheService.set(key, d);
					});
			} else {
				return d;
			}
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