'use strict';

var _ = require('lodash');
var sql = require('mssql');
var Promise = require('promise');
//var CryptoJS = require("crypto-js");
// Get list of connections
var config = {
    user: 'sa',
    password: 'A*96NIXZ1996',
    server: '170.117.20.7', // You can use 'localhost\\instance' to connect to named instance
    database: 'ivoryPrueba' // IVORY PRODUCTION
}

//Constructor de consulta
/*
  If open is true means  the query return a json
  else return a ture or flase accodring the back
*/
function con (sentence,open) {
  return new Promise(function(resolve,reject){
    var connection = new sql.Connection(config, function(err) {
        var request = new sql.Request(connection);
        request.query(sentence, function(err, recordset) {
             connection.close();
             if(open)
                err ? reject({err: err}) : resolve({recordset: recordset});
              else
                err ? reject(err): resolve(err);
        });
    });
  });
}
//Query
exports.q = function(req,res){
  var sentence = 'select ' +  req.body.v +' from '+ req.body.t +' where '+ req.body.w ;

  con(sentence,true).then(response => {
    res.json(response.recordset);
  })
  .catch(err => {
    res.send(err);
  });
};
//Insert
exports.i = function(req,res){
  var sentence = ' insert into '+  req.body.t +' values '+ req.body.v;

  con(sentence,true).then(response => {
    res.send(err);
  })
  .catch(err => {
    res.send(err);
  });

};
//Update
exports.u = function(req,res){
  var sentence = 'update '+ req.body.t  +' set '+ req.body.v +'where '+ req.body.w

  con(sentence,true).then(response => {
    res.send(err);
  })
  .catch(err => {
    res.send(err);
  });
};
//return Procedure
exports.rP = function(req,res){
  var sentence = 'exec '+ req.body.t  +'  '+ req.body.v ;

  con(sentence,true).then(response => {
    res.json(response.recordset);
  })
  .catch(err => {
    res.send(err);
  });
};
//empty Procedure
exports.eP = function(req,res){
  var sentence = 'exec '+ req.body.t  +'  '+ req.body.v ;
  con(sentence,true).then(response => {
    res.send(err);
  })
  .catch(err => {
    res.send(err);
  });

};
