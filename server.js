var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    request = require('request'),
    session = require('express-session'),
    csrf = require('csurf'),
    override = require('method-override'),
    // bodyParser = require('body-parser'),
    $ = require('jquery'),
    _ = require('underscore')
    // mongoose = require('mongoose');

// var app = express();


function startServer() {
    function querify(queryParamsObject) {
        var params = Object.keys(queryParamsObject).map(function(val, key) {
            return val + '=' + queryParamsObject[val]
        }).join('&')
        return params.length === 0 ? '' : '?' + params
    }


    // adds a new rule to proxy a localUrl -> webUrl
    // i.e. proxify ('/my/server/google', 'http://google.com/')
    function proxify(localUrl, webUrl) {
        app.get(localUrl, (req, res) => {
            var tokens = webUrl.match(/:(\w+)/ig)
            var remote = (tokens || []).reduce((a, t) => {
                return a.replace(new RegExp(t, 'ig'), req.params[t.substr(1)])
            }, webUrl)
            req.pipe(request(remote + querify(req.query))).pipe(res)
        })
    }
    // app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '')));

    //----------------------ROUTES-------------------//
    app.get('/',function(req,res){
        res.sendFile(path.join(__dirname+'/index.html'));
    });

    app.get('/donuts',function(req,res){
        res.sendFile(path.join(__dirname+'/donuts.html'));
    });

    app.get('/kolaches',function(req,res){
        res.sendFile(path.join(__dirname+'/kolaches.html'));
    });

    app.get('/croissants',function(req,res){
        res.sendFile(path.join(__dirname+'/croissants.html'));
    });

    app.get('/moreitems',function(req,res){
        res.sendFile(path.join(__dirname+'/moreitems.html'));
    });

    // var uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
    // mongoose.connect('mongodb://localhost/donutshopitems');

    // var Schema = mongoose.Schema;

    // var DonutSchema = new Schema({
    //     itemType: String,
    //     name: String
    // });

    // mongoose.model('DonutModel', DonutSchema);

    // var DonutModel = mongoose.model('DonutModel');

    // app.get('/api/donuts', function(req, res) {
    //     DonutModel.find(function(err, docs) {
    //         docs.forEach(function(item) {
    //             console.log("Received a GET request for _id: " + item._id);
    //         })
    //         res.send(docs);
    //     });
    // });
    app.disable('x-powered-by')
        // change the generic session cookie name
    app.use(session({ secret: 'some secret', key: 'sessionId', cookie: { httpOnly: true, secure: true } }))
        // enable overriding
    app.use(override("X-HTTP-Method-Override"))
        // enable CSRF protection
    app.use(csrf())
    app.use((req, res, next) => {
        res.locals.csrftoken = req.csrfToken() // send the token to the browser app
        next()
    })
    app.set('port', process.argv[3] || process.env.PORT || 3000)

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
    })

}

module.exports.startServer = startServer
