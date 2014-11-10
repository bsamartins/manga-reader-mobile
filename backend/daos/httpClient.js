var request = require('request');
var q = require('q');

exports.getUrl = function(uri) {
	var deferred = q.defer();

	var options = {
		'uri': uri
	}

	request(options, function(error, response, body) {
		if (error) {
			deferred.reject(error);
			return;	    					    
  		}

  		if(response && response.statusCode != 200) {
  			deferred.reject(new Error());
			return;
  		}

  		deferred.resolve(body);
  	});

	return deferred.promise;
}
