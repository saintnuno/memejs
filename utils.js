const request = require('request-promise');

class Utils {
    static time(unixtime) {
        var u = new Date(unixtime*1000);

        return u.getUTCFullYear() +
          '-' + ('0' + u.getUTCMonth()).slice(-2) +
          '-' + ('0' + u.getUTCDate()).slice(-2) + 
          ' ' + ('0' + u.getUTCHours()).slice(-2) +
          ':' + ('0' + u.getUTCMinutes()).slice(-2) +
          ':' + ('0' + u.getUTCSeconds()).slice(-2) +
          '.' + (u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) 
    }

    static extensionCheck(url) {
        if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|gifv)/g.test(url)) {
            return true;
        } else {
            return false;
        }
    }

    static async subredditCheck(url) {
        return new Promise(async (resolve, reject) => {
            request(url)
            .then((body) => {
                body = JSON.parse(body);
                let data = body.data.children;
                if (!data.length)
                    resolve(false);
                resolve(true);
            })
            .catch(e => {
                resolve(false);
            })
        })
    }
}

module.exports = Utils;
