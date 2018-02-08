require("dotenv").config();
var keys = require('./keys');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs      = require('fs');

//Imported Keys//
var spotify = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);

///Twitter Function//
var params = {
  screen_name: process.argv[3]
};

if (process.argv[2] === "my-tweets") {

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);


      }
      //console.log(tweets);
    }
  });
};

///Spotify Function///

if (process.argv[2] === "spotify-this-song") {
  var songName = process.argv[3];
  if (!songName) {
    songName = 'The Sign Ace';
  }
  spotify.search({
    type: 'track',
    query: songName,
    limit: 20
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //console.log(JSON.stringify(data, null, 2));

    for (var i = 0; i < data.tracks.items.length; i++) {
      //console.log(JSON.stringify(data[i]));
      //var track = data.tracks.items[0];
      console.log('Album name: ', data.tracks.items[i].album.name);
      console.log('Song Name: ', data.tracks.items[i].name);

      if (data.tracks.items[i].preview_url === null) {
        console.log('Song Preview URL:  Not Avalible')
      } else {
        console.log('Song Preview URL: ', data.tracks.items[i].preview_url);
      }
      console.log('Artist Name: ', data.tracks.items[i].album.artists[0].name);
      //console.log(data.tracks.items[0].album);
      console.log('\n')
    }

  })
}

////OMDB//////

if (process.argv[2] === "omdb") {
  var title = process.argv[3];
  if (!title) {
    title = "Mr Nobody";
  }

  request('http://www.omdbapi.com/?t=' + title + '&apikey=27987b08', function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var movie = JSON.parse(body)
    //console.log(body);
    console.log('Title: ', movie.Title);
    console.log('Year: ', movie.Year);
    console.log('imdb Rating: ', movie.imdbRating);
    console.log('Rotten Tomatoes ', movie.Ratings[1].Value);
    console.log('Country Filmed: ', movie.Country);
    console.log('Languages: ', movie.Language);
    console.log('Plot: ', movie.Plot);
    console.log('Actors: ', movie.Actors);

  });
};


////////////Liri DWIS////////////////////////////

if (process.argv[2] === "do-what-it-says") {
      fs.readFile("random.txt", "UTF-8", function(error, data){
          if (error){
              console.log(error);
          }
              console.log(data);


    });

  };
