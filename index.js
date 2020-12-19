const request = require('request-promise');
const utils = require('./utils');

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
    'funny',
];

function getRandomSubRedit() {
    return opts[Math.trunc(Math.random() * opts.length)];
}

function formatObject(data) {
    return {
        title: data.title,
        url: data.url,
        author: data.author,
        subreddit: data.subreddit,
        created: utils.time(parseInt(data.created, 10)),
        created_utc: utils.time(parseInt(data.created_utc, 10)),
    };
}

function meme(subredit, callback) {
    if (typeof subredit === 'function') {
        callback = subredit; // eslint-disable-line no-param-reassign
        subredit = getRandomSubRedit(); // eslint-disable-line no-param-reassign
    }

    //  eslint-disable-next-line no-param-reassign
    if (subredit === undefined) subredit = getRandomSubRedit();

    const url = `https://www.reddit.com/r/${subredit}.json?sort=top&t=day&limit=100`;

    return utils.subredditCheck(url)
        .then(() => request(encodeURI(url)))
        .then((bodyStr) => {
            const body = JSON.parse(bodyStr);
            let data = body.data.children;
            data = data.filter((i) => utils.extensionCheck(i.data.url));

            if (!data.length) throw new Error('No results found (png/jpg/gif/gifv).');

            const rand = Math.floor(Math.random() * Math.floor(data.length));

            const obj = formatObject(data[rand].data);
            return typeof callback === 'function' ? callback(null, obj) : obj;
        })
        .catch((err) => {
            if (typeof callback === 'function') {
                callback(err, null);
            } else {
                throw err;
            }
        });
}

exports.meme = meme;

// this is deprecated to be removed in version 2.0
exports.memeAsync = meme;
