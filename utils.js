const request = require('request-promise');

function time(unixtime) {
    const u = new Date(unixtime * 1000);
    return u.toISOString().replace('T', ' ').replace('Z', '');
}

function extensionCheck(url) {
    return /^(http(s?):\/\/)([/|.|\w|\s|-])*\.(?:jpg|gif|png|gifv)/.test(url);
}

function subredditCheck(url) {
    return request(url)
        .then((bodyStr) => {
            const body = JSON.parse(bodyStr);
            const data = body.data.children;

            if (!data.length) throw new Error('Invalid subredit');
            return true;
        })
        .catch(() => {
            throw new Error('Invalid subredit');
        });
}

module.exports = {
    time,
    extensionCheck,
    subredditCheck,
};
