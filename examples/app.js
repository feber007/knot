var Knot = require('../lib'),
    config = require('./config');

var app = new Knot(config);
app.run(8080);
