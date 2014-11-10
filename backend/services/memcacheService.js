var memjs = require('memjs');
var q = require('q');

console.log('memcache instances: ', process.env.MEMCACHEDCLOUD_SERVERS);
console.log('memcache username: ', process.env.MEMCACHEDCLOUD_USERNAME);
console.log('memcache password: ', process.env.MEMCACHEDCLOUD_PASSWORD);

var client = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
  username: process.env.MEMCACHEDCLOUD_USERNAME,
  password: process.env.MEMCACHEDCLOUD_PASSWORD
});

exports.get = function(key) {
	console.log('getting: ', key);
	var deferred = q.defer();
	
	client.get(key, function(err, val) {
		if(err) {
			deferred.reject(err);
		} else {			
			deferred.resolve(JSON.parse(val));
		}
	})

	return deferred.promise;
}

exports.set = function(key, o) {
	console.log('setting: ', key);
	var deferred = q.defer();
	
	client.set(key, JSON.stringify(o), function(err, val){
		if(err) {
			deferred.reject(err);
		} else {
			deferred.resolve(o);
		}
	})

	return deferred.promise;
}