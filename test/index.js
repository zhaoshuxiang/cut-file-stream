/**
 * Created by zhaoshuxiang on 15/7/8.
 */


var cfs = require('../index.js');

console.log(cfs.getDateTime('YYYYMMDDHM'));
//return;

/** print access log **/
var stream = cfs.getStream({
    filename: 'access-YYYYMMDDHM.log',
    timeZone: 0
});

setInterval(function() {
    stream.write('log: ' + (new Date()).toLocaleTimeString() + '\n', 'utf8');
}, 10);

/** print error log **/
var stream1 = cfs.getStream({
    filename: 'error-YYYYMMDDHM.log',
    timeZone: 0
});

setInterval(function() {
    stream1.write('error: ' + (new Date()).toLocaleTimeString() + '\n', 'utf8');
}, 300);



