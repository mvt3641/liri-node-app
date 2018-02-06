require("dotenv").config();
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//Imported Keys//
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

///Twitter Function//
var params = {screen_name: 'Dutch0836'};

if (process.argv[2] === "my-tweets"){

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
};

///Spotify Function///
if ( process.argv[2] === "spotify-this-song" ){
//var songName = process.argv[3];
spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log(JSON.stringify(data, null, 2));
// if (data.hasOwnProperty("name")){
//     console.log(JSON.stringify(data.name));

});
 };
//console.log(JSON.stringify(data, null, 2));
