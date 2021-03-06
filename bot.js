var twit = require('twit');
var config = require('./.gitignore/config.js');
var fs = require('fs');
var readLine = require('readline');

var T = new twit(config);

tweet();

async function getLyrics(){
    lyrics = [];
    const fileStream = fs.createReadStream('lyrics.txt');

    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    for await (const line of rl){
       lyrics.push(line);
    }
    return lyrics;
}
function tweet() {
    fs.readFile('lyrics.txt','utf8', async function(error,lyrics){
        if (error){
            console.log(error.message);
        } else {
           lyrics = await getLyrics();
           tweet = lyrics[Math.floor(Math.random()*lyrics.length)];
           while (tweet == "" || tweet[0] == "["){
            tweet = lyrics[Math.floor(Math.random()*lyrics.length)];
           }
           tweet = tweet.replace(/\//g,"\n");
            console.log(tweet)
            T.post('statuses/update', { status: tweet }, function(err,data,response){
                if (error){
                    console.log("Error making post.", error.message);
                };
            });
        }
    });
}
