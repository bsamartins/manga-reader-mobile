var fs = require('fs')
var Q = require('q')

loadFile('/mangas.json')
.then(bufferToJson)
.then(transform)
.then(saveToFile)
.fail(function(err) {
	console.log(err);
})

function loadFile(file) {
	var deferred = Q.defer();

	fs.readFile(__dirname + file, function (err, data) {
  		if (err) {
    		deferred.reject(err);
    		return;
  		}
  		deferred.resolve(data);
	});

	return deferred.promise;
}

function writeFile(file, data) {
	var deferred = Q.defer();

	fs.writeFile(__dirname + file, data, function(err) {
	    if(err) {
	        deferred.reject(err);
	        return;
	    }
	    deferred.resolve();
	}); 

	return deferred.promise;
}

function buildMangaId(s) {

	// trim double spaces
	s = s.trim();
	s = s.replace(/(?!([a-zA-Z0-9]))*/g, '');
	s = s.replace(/\s+/g, ' ');
	s = s.replace(/#/g, '');
	s = s.replace(/-/g, ' ');
	s = s.replace(/\s/g, '-');	

	return s.toLowerCase();
}

function bufferToString(buf) {
	return buf.toString();
}

function bufferToJson(buf) {
	return JSON.parse(bufferToString(buf));
}

function print(d) {
	d.forEach(function(e) {
		console.log(e.name, ':', e.uri);
	});
}

function transform(d) {
	var s = ''
	d.forEach(function(e) {
		s += buildMangaId(e.name);
		s += ';';
		s += e.name;
		s += ';';
		s += e.uri;
		s += '\n';
	});
	return s;
}

function getDuplicates(d) {
	arrayTuple(d, function(current, next) {
		if(current.uri == next.uri) {
			console.log(current.name, ':', current.uri);	
			console.log(next.name, ':', next.uri);	
		}		
	});
}

function arrayTuple(d, callback) {
	for(var i=0; i < (d.length-1); i++) {
		if(callback(d[i], d[i+1])) {
			break;
		}
	}
}

function saveToFile(d) {
	return writeFile('test-result.csv', d);
}