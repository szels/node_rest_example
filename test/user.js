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
