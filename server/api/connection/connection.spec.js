'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/connections/q', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .post('/api/connections/q')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/connections/i', function() {

  it('Just plain text', function(done) {
    request(app)
      .post('/api/connections/i')
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
});

describe('GET /api/connections/u', function() {

  it('Just plain text', function(done) {
    request(app)
      .post('/api/connections/u')
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
});
//PROCEDURES

describe('GET /api/connections/eP', function() {

  it('Just plain text', function(done) {
    request(app)
      .post('/api/connections/eP')
      .end(function(err, res) {
        if (err)
          return done(err);
        done();
      });
  });
});
//PROCEDURES
describe('GET /api/connections/rP', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .post('/api/connections/rP')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
