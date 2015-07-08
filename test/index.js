/**
 * Created by zhaoshuxiang on 15/7/8.
 */


var cfs = require('../index.js');

var stream = cfs.getStream({
    filename: 'test-YYYYMMDDHM.log',
    timeZone: 0
});

setInterval(function() {
    stream.write((new Date()).toLocaleTimeString() + '\n', 'utf8');
}, 10);

