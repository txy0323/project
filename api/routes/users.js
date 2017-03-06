var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/me';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//进行resume下的skill表的操作连接
router.get('/api',function(req,res){

		var queryData = function(db,callback){
			//连接表
			var conn = db.collection('skill');

			conn.find({}).toArray(function(err,results){
				if(err){
					return;
				}
				callback(results);
			})
		}
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if(err){
				return;
			}else{
				queryData(db,function(results){
					console.log(results);
					res.send(results);
				});
				
			}
		});
});

/*//进行resume下的work表的操作连接
router.get('/api1',function(req,res){
	var queryData = function(db,callback){
		//连接表
		var conn = db.collection('work');
		conn.find({}).toArray(function(err,results){
			if(err){
				return;
			}
			callback(results);
		})
	}
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			return;
		}else{
			queryData(db,function(results){
				console.log(results);
				res.send(results);
			});
			
		}
	});
});

//进行resume下的projects表的操作连接
router.get('/api3',function(req,res){
	var queryData = function(db,callback){
		//连接表
		var conn = db.collection('projects');
		conn.find({}).toArray(function(err,results){
			if(err){
				return;
			}
			callback(results);
		})
	}
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			return;
		}else{
			queryData(db,function(results){
				console.log(results);
				res.send(results);
			});
			
		}
	});
});

//进行resume下的introduce表的操作连接
router.get('/api4',function(req,res){
	var queryData = function(db,callback){
		//连接表
		var conn = db.collection('introduce');
		conn.find({}).toArray(function(err,results){
			if(err){
				return;
			}
			callback(results);
		})
	}
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			return;
		}else{
			queryData(db,function(results){
				console.log(results);
				res.send(results);
			});
			
		}
	});
});
*/


module.exports = router;
