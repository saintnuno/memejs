const req = require('request');

const request = require('request-promise');

const utils = require('./utils');

const arr = [
    'https://www.reddit.com/r/crappydesign/',
    'https://www.reddit.com/r/dankmemes/',
    'https://www.reddit.com/r/me_irl/',
    'https://www.reddit.com/r/wholesomememes/',
    'https://www.reddit.com/r/memeeconomy/',
    'https://www.reddit.com/r/adviceanimals',
    'https://www.reddit.com/r/comedycemetery',
    'https://www.reddit.com/r/memes/',
    'https://www.reddit.com/r/prequelmemes/',
    'https://www.reddit.com/r/terriblefacebookmemes/',
    'https://www.reddit.com/r/pewdiepiesubmissions/',
    'https://www.reddit.com/r/funny/',
    'https://www.reddit.com/r/teenagers/'
    
];

const opts = [
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
    'funny'
];

exports.meme = (sr, callback) => {
    let url;
    var ran = arr[~~(Math.random() * arr.length)];
    let t;

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

    let obj = {
        'title': '',
        'url': '',
        'author': '',
        'subreddit': '',
        'created': '',
        'created_utc': ''
    };

    req.get(encodeURI(url), function(err, res, body) {
        if (err || res.statusCode !== 200) {
            return callback(err);
        } else
        if (!err && res.statusCode === 200) {
            body = JSON.parse(res.body);
            data = body.data.children;
            data = data.filter(i => utils.extensionCheck(i.data.url));
            if (!data.length)
                return callback('No results found.');
            var rand = Math.floor(Math.random() * Math.floor(data.length));
            obj.title = data[rand].data.title;
            obj.url = data[rand].data.url;
            obj.author = data[rand].data.author;
            obj.subreddit = data[rand].data.subreddit;
            obj.created = utils.time(parseInt(data[rand].data.created));
            obj.created_utc = utils.time(parseInt(data[rand].data.created_utc));
            return callback(obj);
        }
    })
}

exports.memeAsync = async (sr) => {
    return new Promise(async (resolve, reject) => {
        let url;
        let ran = arr[~~(Math.random() * arr.length)];
        let t;
    
        if (!sr) {
            sr = {}
            url = `${ran}.json?sort=top&t=day&limit=100`;
        } else {
            if (!opts.includes(sr.toLowerCase()))
                reject("Invalid subreddit")
    
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
    
        let obj = {
            'title': '',
            'url': '',
            'author': '',
            'subreddit': '',
            'created': '',
            'created_utc': ''
        };

        request(encodeURI(url))
        .then((body) => {
            body = JSON.parse(body);
            let data = body.data.children;
            data = data.filter(i => utils.extensionCheck(i.data.url));
            if (!data.length)
                reject('No results found.');
            let rand = Math.floor(Math.random() * Math.floor(data.length));
            obj.title = data[rand].data.title;
            obj.url = data[rand].data.url;
            obj.author = data[rand].data.author;
            obj.subreddit = data[rand].data.subreddit;
            obj.created = utils.time(parseInt(data[rand].data.created));
            obj.created_utc = utils.time(parseInt(data[rand].data.created_utc));
            resolve(obj);
        })
        .catch((err) => reject(err));
    })
}
