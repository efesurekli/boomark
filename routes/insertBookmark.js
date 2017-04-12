const axios = require('axios');
const SC_API_URL = 'http://api.soundcloud.com';
const apiEndpoint = '/resolve';

// first check if the API keys are entered correctly:
try { 
  var clientId = require('../keys/keylist.js').SC_KEY; 
} catch(err) {
  console.log('please insert api keys as in readme');
  if (err) throw err;  
}

// hook up the database, normally this should not be here but for the purpose of the exercise:
module.exports.db = {
  user:'',
  musicList:[]
}; 

/*
  first gets the permalink and the sound bookmark from the client
  resolves the permalink via a SoundCloud API to get track data
  finally inserts a the track data to the database
*/
module.exports.insertBookmark = (req, res) => {
  const { permalink, timeMs } = req.body;
  axios({
      method: 'get',
      baseURL: SC_API_URL,
      url:'/resolve',
      params: {
        url: permalink,
        client_id: clientId
      } 
    }).then(({ data }) => {
      const { id, title, artwork_url, permalink_url, description } = data;
      const track = {
        id,
        title,
        artworkUrl: artwork_url,
        permalinkUrl: permalink_url,
        description,
        mark: timeMs
      };
      exports.db.musicList.push(track);
      res.json(track);
    }).catch((error) => {
      console.log(error);
      console.error('failed to get soundcloud SDK');
      res.send(404);
  });
};
  