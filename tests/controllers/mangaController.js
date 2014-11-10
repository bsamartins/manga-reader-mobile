var assert = require("assert");
var mangaController = require('../../backend/controllers/mangaController.js');

describe('getMangas', function() {
	it('returns manga list', function() {
		assert.notNull(mangaController.getMangas());
	});
});