var express = require("express"),
    bodyParser = require('body-parser'),
    app = express();

var mongojs = require('mongojs');

var db = mongojs('assignment7');
var links = db.collection('links');

app.use(express.static(__dirname));
// Create our Express-powered HTTP server
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});

app.use(bodyParser());

app.post('/links',function(req,res){ 
    var temp = req.body;
    temp.clicks = 0;
    links.update({"title": req.body.title}, temp, {upsert: true});
    res.sendStatus(200);
});

app.get('/links',function(req,res){ 
	links.find(function(err, doc){
		if(doc != null){
            res.json(doc);
        }
	});
});

app.get('/click/:title',function(req,res){ 
	links.findAndModify({ query: {title: req.params.title}, update: {$inc: {clicks: 1}}}, function(err, doc){
		if(doc != null){
            res.redirect(doc.link);
        }
	});
});