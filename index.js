var express = require('express');
var app = express();

var appRoutes = require('./backend/routes.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

appRoutes.configure(app);

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});