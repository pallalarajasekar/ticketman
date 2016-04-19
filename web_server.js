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

var XPressIO = require('xpressio');
var xpress = new XPressIO(config).start();
var app = xpress.app;
var io = xpress.io;

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/database';


app.get('/', function(req, res){
    res.render("index")
})

app.post('/find', function(req,res){})

app.post("/loginform",function(req,res){

    //console.log(req.body);

    /*data={
        "uname": req.body.Username,
        "pwd" : req.body.Password
    }
    console.log(data.pwd);*/

    var logindata = function(db, callback) {
        var cursor =db.collection('user').findOne( function(err, doc) {
            console.log(doc);

                if(doc.name==req.body.Username && doc.password==req.body.Password){

                    console.log("successfully login")
                    res.send(req.body);
                }
                else{
                    console.log("Invalid");
                    res.send(req.body);
                }
        });
           /* } else {
                callback();
            }
            /!*console.log("name:" +doc.name);
            console.log("PWD:" +doc.password);
*!/

        });*/
        /*console.log("name:" +doc.name);
        console.log("PWD:" +doc.password);*/
    };
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        logindata(db, function() {
            //db.close();
        });
    });




})

