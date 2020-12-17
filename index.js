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
	'funny'
];

function getRandomSubRedit() {
    return opts[~~(Math.random() * opts.length)];
}

function formatObject(data) {

    return {
        title: data.title,
        url: data.url,
        author: data.author,
        subreddit: data.subreddit,
        created: utils.time(parseInt(data.created)),
        created_utc: utils.time(parseInt(data.created_utc))
    };
}

function meme(subredit, callback) {

    if (typeof subredit === 'function') {
        callback = subredit;
        subredit = getRandomSubRedit();
    }

    if (subredit === undefined) subredit = getRandomSubRedit();

    let url = `https://www.reddit.com/r/${subredit}.json?sort=top&t=day&limit=100`;


    return utils.subredditCheck(url)
		.then(() => request(encodeURI(url)))
		.then((body) => {

			body = JSON.parse(body);
			let data = body.data.children;
			data = data.filter(i => utils.extensionCheck(i.data.url));

			if (!data.length) throw new Error('No results found (png/jpg/gif/gifv).');

			let rand = Math.floor(Math.random() * Math.floor(data.length));

            let obj = formatObject(data[rand].data);
            return typeof callback === 'function' ? callback(obj) : obj;
		})
        .catch(err => {

            if (typeof callback === 'function') {
                callback(null, err);
            } else {
                throw err;
            }
        });
}

exports.meme = meme;

// this is deprecated to be removed in version 2.0
exports.memeAsync = meme;
