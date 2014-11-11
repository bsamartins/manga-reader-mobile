var mangapandaDao = require('../daos/mangapandaDao.js');

exports.getMangas = function() {
	return mangapandaDao.getMangas();
}

exports.getMangaChapters = function(mangaId) {
	var key = 'manga_' + mangaId;

	return mangapandaDao.getMangaChapters(mangaId);
}

exports.getMangaChapter = function(mangaId, chapterId) {
	var key = 'manga_' + mangaId + '_' + chapterId;	

	return mangapandaDao.getMangaChapter(chapterId);		
}