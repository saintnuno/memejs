var req = require('request');


var meme = function(callback) {
    var arr = ['https://www.reddit.com/r/dankmemes/', 'https://www.reddit.com/r/me_irl/', 'https://www.reddit.com/r/wholesomememes/', 'https://www.reddit.com/r/MemeEconomy/'];
    var ran = arr[~~(Math.random() * arr.length)];
    var obj = {
        'title': [],
        'url': []
    };
    req.get(`${ran}.json?sort=top&t=day&limit=100`, function(err, res, body) {
        if (err || res.statusCode !== 200) {
            console.error(new Error('Try running this shit again'));
            return callback(err);
        } else
        if (!err && res.statusCode === 200) {
            body = JSON.parse(res.body);
            data = body.data.children;
            var rand = Math.floor(Math.random() * Math.floor(data.length));
            obj.title.push(data[rand].data.title);
            obj.url.push(data[rand].data.url);
            return callback(obj);
        }
    })
};

module.exports = meme;
