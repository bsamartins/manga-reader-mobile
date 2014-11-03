var mangapandaDao = require('../daos/mangapandaDao.js');

exports.getMangaList = function() {
	return mangapandaDao.getMangas();
}