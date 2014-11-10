var request = require('request');
var q = require('q');

exports.getUrl = function(uri) {
	var deferred = q.defer();

	var options = {
		'uri': uri
	}

	console.log('getting resource:', uri);

	request(options, function(error, response, body) {
		if (error) {
			console.log('error fetching resource:', error)
			deferred.reject(error);
			return;	    					    
  		}

  		console.log('resource result:', '[' + response.statusCode + ']', uri);

  		if(response && response.statusCode != 200) {  			
  			deferred.reject(new Error());
			return;
  		}

  		deferred.resolve(body);
  	});

	return deferred.promise;
}
