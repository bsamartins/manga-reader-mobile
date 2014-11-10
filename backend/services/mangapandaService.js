var mangapandaDao = require('../daos/mangapandaDao.js');
var memcacheService = require('./memcacheService.js');

exports.getMangas = function() {
	return memcacheService.get('mangas')
		.then(getMangasHandler);
}

exports.getMangaIssues = function(mangaId) {
	var key = 'manga_' + mangaId;

	return memcacheService.get(key)
		.then(function(d) {
			if(!d) {
				console.log('cache not found ', key);
				return mangapandaDao.getMangaIssues(mangaId);	
			} else {
				return d;
			}
		})
		.then(function(d){
			return memcacheService.set(key, d);
		});
}

exports.getMangaIssue = function(mangaId, issueId) {
	var key = 'manga_' + mangaId + '_' + issueId;	

	return memcacheService.get(key)
		.then(function(d) {
			if(!d) {
				console.log('cache not found ', key);
				return mangapandaDao.getMangaIssue(issueId);	
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