const { TwitterApi } = require('twitter-api-v2');
var config = require('./config.js');
var fs = require('fs');
var readLine = require('readline');

const userClient = new TwitterApi(config);

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
           tweet = tweet.replace(/\//g,"\n");
            console.log(tweet)
            await userClient.v2.tweet(tweet);
        }
    });
}

