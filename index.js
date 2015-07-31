/**
 * Created by zhaoshuxiang on 15/7/8.
 */
var fs = require('fs');
var defaultDateTimeFormat = 'YYYY-MM-DD H:M:S';
var defaultTimeZone = 8;
var timeZone;
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

	tz = tz || defaultTimeZone;

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
	return getDateTime(formatStr, timeZone);
}

res.getStream = function(args) {
	if (!args || !args.filename) {
		return process.stdout;
	}

	timeZone = ('number' === typeof args.timeZone) ?  args.timeZone : defaultTimeZone;

	return new Stream(args.filename);
};

function Stream(str) {
	this.rex = str;
	this.fn = getFileName(str);
	this.s = fs.createWriteStream(this.fn, {flags: 'a'});
}

Stream.prototype.write= function(data, encoding) {
	var filename = getFileName(this.rex);

	if (filename !== this.fn) {
		this.s.end();
		this.fn = filename;
		this.s = fs.createWriteStream(filename, {flags: 'a'});
	}

	this.s.write(data, encoding);
};

res.getDateTime = getDateTime;

module.exports = res;