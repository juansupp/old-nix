'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/mails/send', function() {

  it('Just plain text', function(done) {
    request(app)
      .post('/api/mails/send')
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
});
