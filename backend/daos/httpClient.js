var request = require('request');
var q = require('q');

exports.getUrl = function(uri) {
	var deferred = q.defer();

	var options = {
		'uri': uri
	}

	console.log('getting resource: ', uri);

	request(options, function(error, response, body) {
		if (error) {
			console.log('error fetching resource: ', error)
			deferred.reject(error);
			return;	    					    
  		}

  		if(response && response.statusCode != 200) {
  			console.log('error fetching resource: ', response.statusCode)
  			deferred.reject(new Error());
			return;
  		}

  		console.log('resource fetched successfully');
  		deferred.resolve(body);
  	});

	return deferred.promise;
}
