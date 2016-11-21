var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/treats';

router.get('/', function(req, res) {
  console.log('get request');
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT * FROM treats', function(err, result) {
      done();
      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);

    });
  })
});

module.exports = router;
