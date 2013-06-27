var request = require('supertest'),
    express = require('express');

var app = require('../app.js');


describe('GET', function(){
  it('responds with a version number in JSON', function(done){
    request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('POST', function(){
  it('responds with an user object in JSON', function(done){
    request(app)
    .post('/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({'username': 'test', 'password': 'secret', 'email': 'test@example.com'})
    .expect(200, done);
  });
});


describe('GET', function(){
  it('responds with a list of users in JSON', function(done){
    request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

