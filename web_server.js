/**
 * Created by pallali on 28/3/16.
 */

/**
 * Created by pallali on 24/3/16.
 */
var config = {
    port: 8966,
    viewPath: __dirname + '/views', //Template Engine
    publicPath: __dirname + '/public', //Public Folder (Javascript, CSS)
    sessionStore: true,
    socketIO: true
}

//var us = require('underscore');
var assert = require('assert');
var XPressIO = require('xpressio');
var xpress = new XPressIO(config).start();
var app = xpress.app;
var io = xpress.io;

/*POC Modules*/
var node_cryptojs = require('node-cryptojs-aes');
var CryptoJS = node_cryptojs.CryptoJS;
var crypto = require('crypto');
var randomstring = require('randomstring');


var MongoClient = require('mongodb').MongoClient;
var db = null
MongoClient.connect("mongodb://localhost:27017/database", function(err, database) {
    db = database;
    assert.equal(null, err);

});


app.get('/', function(req, res){
    res.render("index")
})

app.post('/find', function(req,res){})

app.post("/register",function(req,res){

    console.log(req.body);

    /*var collection=db.collection('user');
    var doc1={"username":req.body.Username,"password":req.body.Password,"mobileno":req.body.Phoneno,"email":req.body.Email};
    collection.insert(doc1,{w:1},function(err,result){
        console.log(err,result);
        res.send(result);
    })*/
    setTimeout(function() {
        var pass = req.body.Password;
        var salt = generateSalt();
        var collection = db.collection('user');
        var doc1 = {
            "username": req.body.Username,
            "password": salt + md5(pass + salt),
            "mobileno": req.body.Phoneno,
            "email": req.body.Email
        };
        collection.insert(doc1, {w: 1}, function (err, result) {
            console.log(err, result);
            res.send(result);
            console.log("SALT : ", salt);
            console.log("DIGESTED_PWD : ", md5(pass + salt))
            console.log("Encrypted Password : ", salt + md5(pass + salt))
        }, 3000);
    })
})


var generateSalt = function()
{
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
};


var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
};

var saltAndHash = function(pass, callback)
{
    var salt = generateSalt();
    callback(null, salt + md5(pass + salt));
};




/*setTimeout(function(){
    var pass = req.body.Password;
    var salt = generateSalt();
    console.log("SALT : ", salt);
    console.log("DIGESTED_PWD : ", md5(pass + salt))
    console.log("Encrypted Password : ",  salt +md5(pass + salt))
}, 3000);*/



app.post("/loginform",function(req,res){

    console.log(req.body);
    console.log(req.sessionID);

    req.session.destroy(function(err){
        //console.log(err,req.sessionID)
    })

})

