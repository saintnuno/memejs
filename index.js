var req = require('request');

var utils = require('./utils');

var meme = function(sr, callback) {

    var arr = [
        'https://www.reddit.com/r/crappydesign/',
        'https://www.reddit.com/r/dankmemes/',
        'https://www.reddit.com/r/me_irl/',
        'https://www.reddit.com/r/wholesomememes/',
        'https://www.reddit.com/r/memeeconomy/',
        'https://www.reddit.com/r/adviceanimals',
        'https://www.reddit.com/r/comedycemetery',
        'https://www.reddit.com/r/memes/',
        'www.reddit.com/r/prequelmemes/',
        'www.reddit.com/r/terriblefacebookmemes/',
        'www.reddit.com/r/pewdiepiesubmissions/',
        'www.reddit.com/r/funny/',
        'www.reddit.com/r/teenagers/'
        
    ];

    var opts = [
        'crappydesign',
        'dankmemes',
        'me_irl',
        'wholesomememes',
        'memeeconomy',
        'adviceanimals',
        'comedycemetery',
        'memes',
        'prequelmemes',
        'terriblefacebookmemes',
        'pewdiepiesubmissions',
        'funny',
        'teenagers'
    ];

    var url;
    var ran = arr[~~(Math.random() * arr.length)];
    var t;

    if (typeof sr === 'function') {
        callback = sr
        sr = {}

        url = `${ran}.json?sort=top&t=day&limit=100`;
    } else {
        if (!opts.includes(sr.toLowerCase()))
            throw new Error('Invalid subreddit');

        if (opts.includes(sr.toLowerCase())) {
            var i;
            for (i = 0; i < opts.length; i++) {
                if (sr.toLowerCase() === arr[i].split('/')[4]) {
                    t = arr[i];
                }
            }
        }

        url = `${t}.json?sort=top&t=day&limit=100`;
    }

    var obj = {
        'title': [],
        'url': [],
        'author': [],
        'subreddit': [],
        'created': [],
        'created_utc': []
    };

    req.get(url, function(err, res, body) {
        if (err || res.statusCode !== 200) {
            console.error(new Error('Try running the program again.'));
            return callback(err);
        } else
        if (!err && res.statusCode === 200) {
            body = JSON.parse(res.body);
            data = body.data.children;
            var rand = Math.floor(Math.random() * Math.floor(data.length));
            obj.title.push(data[rand].data.title);
            obj.url.push(data[rand].data.url);
            obj.author.push(data[rand].data.author);
            obj.subreddit.push(data[rand].data.subreddit);
            obj.created.push(utils.time(parseInt(data[rand].data.created)));
            obj.created_utc.push(utils.time(parseInt(data[rand].data.created_utc)));
            return callback(obj);
        }
    })
}

module.exports = meme;
