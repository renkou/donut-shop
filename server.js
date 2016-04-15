var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    request = require('request'),
    session = require('express-session'),
    csrf = require('csurf'),
    override = require('method-override'),
    bodyParser = require('body-parser'),
    $ = require('jquery'),
    _ = require('underscore'),
    mongoose = require('mongoose');

var app = express();


function startServer() {
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '')));

    // var uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
    mongoose.connect('mongodb://localhost/donutshopitems');

    var Schema = mongoose.Schema;

    var DonutSchema = new Schema({
        itemType: String,
        name: String
    });

    mongoose.model('DonutModel', DonutSchema);

    var DonutModel = mongoose.model('DonutModel');

    app.get('/api/donuts', function(req, res) {
        DonutModel.find(function(err, docs) {
            docs.forEach(function(item) {
                console.log("Received a GET request for _id: " + item._id);
            })
            res.send(docs);
        });
    });

    app.set('port', process.argv[3] || process.env.PORT || 3000)

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
    })

}

module.exports.startServer = startServer