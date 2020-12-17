const request = require('request-promise');

function time(unixtime) {
    let u = new Date(unixtime*1000);
    return u.toISOString().replace('T', ' ').replace('Z', '');
}

function extensionCheck(url) {
    return /^(http(s?):\/\/)([/|.|\w|\s|-])*\.(?:jpg|gif|png|gifv)/.test(url);
}

function subredditCheck(url) {

    return request(url)
        .then((body) => {
            body = JSON.parse(body);
            let data = body.data.children;

            if (!data.length)
                throw new Error("Invalid subredit");
            return true;
        })
        .catch(e => {
            throw new Error("Invalid subredit");
        });
}

module.exports = {
    time: time,
    extensionCheck: extensionCheck,
    subredditCheck: subredditCheck
};
