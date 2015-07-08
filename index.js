/**
 * Created by zhaoshuxiang on 15/7/8.
 */
var fs = require('fs');
var defaultDateTimeFormat = 'YYYY-MM-DD H:M:S';
var defaultFileNameFormat = 'access-YYYYMMDD.log';
var defaultTimeZone = 8;
var timeZone;
var customFileNameFormat;
var stream = {};
var res = {};

/**
 *
 * @param 自定义时间格式， 缺省：YYYY-MM-DD H:M:S
 * @returns {string} 2015-07-08 12:16:16
 */
function getDateTime(f, tz) {
    var now = new Date();
    now = now.getTime() + now.getTimezoneOffset() * 60000 + tz * 60  * 60 * 1000;
    now = new Date(now);
    f = f || defaultDateTimeFormat;

    f = f.replace(/YYYY/, now.getFullYear())
    .replace(/MM/, fillZero(now.getMonth() + 1))
    .replace(/DD/, fillZero(now.getDate()))
    .replace(/H/, fillZero(now.getHours()))
    .replace(/M/, fillZero(now.getMinutes()))
    .replace(/S/, fillZero(now.getSeconds()));

    return f;
}

function fillZero(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}

function getFileName(formatStr) {
    formatStr = formatStr || defaultFileNameFormat;

    // 中国在东八区
    return getDateTime(formatStr, timeZone);
}

res.getStream = function(args) {
    if (!args || !args.filename) {
        return process.stdout;
    }

    customFileNameFormat = args.filename;
    timeZone = 'number' === typeof args.timeZone ?  args.timeZone : defaultTimeZone;

    var filename = getFileName(args.filename);

    if(!stream.c) {
        stream.f = filename;
        stream.c = fs.createWriteStream(filename, {flags: 'a'});
    }

    return stream;
};

stream.write = function(data, encoding) {
    var filename = getFileName(customFileNameFormat);

    if (filename !== stream.f) {
        stream.c.end();
        stream.f = filename;
        stream.c = fs.createWriteStream(filename, {flags: 'a'});
    }

    stream.c.write(data, encoding);
};


module.exports = res;