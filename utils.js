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
}

module.exports = Utils;
