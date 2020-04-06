const req = require('request');

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

exports.meme = async (sr, callback) => {
	let url;
	var ran = opts[~~(Math.random() * opts.length)];

	if (typeof sr === 'function') {
		callback = sr;
		url = `https://www.reddit.com/r/${ran}.json?sort=top&t=day&limit=100`;
	} else {
		url = `https://www.reddit.com/r/${sr}.json?sort=top&t=day&limit=100`;
	}

	await utils.subredditCheck(url)
		.then(r => {
			if (!r)
				return callback(new Error('Invalid subreddit.'));
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
					return callback(new Error(err));
				} else
				if (!err && res.statusCode === 200) {
					body = JSON.parse(res.body);
					data = body.data.children;
					data = data.filter(i => utils.extensionCheck(i.data.url));
					if (!data.length && !sr)
						return callback(null, this.meme());
					else if (!data.length && typeof sr === 'string')
						return callback(new Error('No results found'));
					if (!data.length)
						return callback(new Error('No results found'));
					var rand = Math.floor(Math.random() * Math.floor(data.length));
					obj.title = data[rand].data.title;
					obj.url = data[rand].data.url;
					obj.author = data[rand].data.author;
					obj.subreddit = data[rand].data.subreddit;
					obj.created = utils.time(parseInt(data[rand].data.created));
					obj.created_utc = utils.time(parseInt(data[rand].data.created_utc));
					return callback(null, obj);
				}
			})
		})
		.catch(e => {
			return callback(new Error(e));
		});
}

exports.memeAsync = async (sr) => {
	return new Promise(async (resolve, reject) => {
		let url;
		let ran = opts[~~(Math.random() * opts.length)];

		if (!sr) {
            url = `https://www.reddit.com/r/${ran}.json?sort=top&t=day&limit=100`;
        } else {
            url = `https://www.reddit.com/r/${sr}.json?sort=top&t=day&limit=100`;
        }

		await utils.subredditCheck(url)
			.then(r => {
				if (!r)
					reject('Invalid subreddit');
			})
			.catch(e => reject(e));

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
				if (!data.length && !sr)
					resolve(this.memeAsync());
				else if (!data.length && typeof sr === 'string') {
					reject('No results found (png/jpg/gif/gifv).');
				}

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
