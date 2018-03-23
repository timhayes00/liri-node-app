keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
require("dotenv").config();
var request = require("request");
var fs = require("fs");
var liriOrders;

switch(process.argv[2]) {
    case `my-tweets`:
        twitterHistory();
        break;
    case `spotify-this-song`:
        spotify();
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        batchRun();
        break;
}



function movie(){
    if(process.argv[3]){
        var movieName = process.argv[3];
        for (i = 4; process.argv[i]; i++){
            movieName += "%20" + process.argv[i];
        }
    }
    else{
        movieName = "Mr%20Nobody"; // arbitrarily chosen default case if they select movie but don't pass in a title
    }
    //console.log("liri orders = " + liriOrders);
    if(liriOrders){
        movieName = liriOrders[0];
        for (i = 1; liriOrders[i]; i++){
            movieName += "%20" + liriOrders[i];
       }
    }        
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(JSON.parse(body));
            console.log("The movie's title is " + JSON.parse(body).Title + ".")
            console.log("The movie's release year was: " + JSON.parse(body).Year + ".");
            console.log("The IMDB rating for this movie is " +  JSON.parse(body).imdbRating) + ".";
            console.log("The Rotten Tomatoes rating is " + JSON.parse(body).Ratings[1].Value + ".")
            console.log("The movie was made in " + JSON.parse(body).Country + ".")
            console.log("Recorded in " + JSON.parse(body).Language + ".")
            console.log('The plot is summarized as "' + JSON.parse(body).Plot + '"')
            console.log("The main actors were " + JSON.parse(body).Actors + ".")
        }
    });
};

function twitterHistory(){
    var twitter = new Twitter;
    console.log(twitter);
    //begin psuedocode
    //once Twitter's API has been called to give me the last twenty tweets in an array
    //name that array "arrayTweets"
    //set up a for loop
    //for (i = 0; arrayTweets[i] < 20; i++) {
        //console.log(arrayTweets[i].data);
        //console.log(arrayTweets[i].date);
        //console.log("========================================");
    //}
};

function spotify() {
    var spotify = new Spotify(keys.spotify);
    console.log("ignition")
    spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
        //spotify isnt cooperating
        //begin psuedocode
        //once spotify is returning an array with artist, song title, preview of song, and the album in "data"
        //console.log(data.artist);
        //console.log(data.title);
        //console.log(data.preview-link);
        //console.log(data.album);
    });
}

function batchRun() {
    fs.readFile("random.txt", "utf8", function (err, data){
        if(err) {
            return console.log("Error encountered" + err);
        }
        liriOrders = data.split(", ");
        switch(liriOrders[0]) {
            case `my-tweets`:
                fixFormat();
                twitterHistory();
                break;
            case `spotify-this-song`:
                fixFormat();
                
                break;
            case 'movie-this':
                fixFormat();
                movie();
                break;
        }
        
    }
)};

function fixFormat(){
    var removed = liriOrders.splice(0, 1);
}