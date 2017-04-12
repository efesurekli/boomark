'use strict'

var expect = require('chai').expect;
var request = require('supertest');
var SERVER_URL = 'localhost:3000'
var app = require('../app.js').app;
var db = require('../routes/insertBookmark.js').db;

beforeEach(function(){
    // clear local database
    db = { user: '', musicList:[] };
});

describe('Soundcloud API Tests', function() {
  
  var dummyMusicList = [
    {
      title: 'Tom Yorke',
      artworkUrl: '11.png',
      permalinkUrl: 'https://soundcloud.com/yorke/',
      mark: '60000'
    },
    {
      title: 'Massive Attack',
      artworkUrl: '11.png',
      permalinkUrl: 'https://soundcloud.com/yorke/',
      mark: '60000'
    },
    {
      title: 'Portishead',
      artworkUrl: '11.png',
      permalinkUrl: 'https://soundcloud.com/yorke/',
      mark: '60000'
    },
    {
      title: 'Deepchord',
      artworkUrl: '11.png',
      permalinkUrl: 'https://soundcloud.com/yorke/',
      mark: '60000'
    }
  ];
  
  // fill in the database
  db.musicList = dummyMusicList;

  var dummyID = 151695107;
  var dummyBookmark = { 
    permalink: 'https://soundcloud.com/robot-heart/acid-pauli-robot-heart-ny-spring-2014',
    timeMs: '600000'
  };

  it('should be able to GET all track bookmarks', function(done) {
    request(app)
      .get('/api/bookmarks')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.length).to.equal(dummyMusicList.length);
        done();
      })
  });

  it('should be able to POST a track bookmark', function(done) {
    request(app)
      .post('/api/1')
      .send(dummyBookmark)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.id).to.equal(dummyID);
        done();
      });
  });
});


