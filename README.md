#Cut Log File Stream

##install
npm install cut-file-stream

##usage

format filename：
YYYY => Year
MM => Month
DD => Day
H => Hour
M => minute
S => Second

cut file stream by day
```
var cts = require('cut-file-stream');
var stream = cfs.getStream({
    filename: 'custom-string-YYYYMMDD-custom-string.log',
    timeZone: 0 // UTC
});
```

cut file stream by hour
```
var cts = require('cut-file-stream');
var stream = cfs.getStream({
    filename: 'custom-string-YYYYMMDDH-custom-string.log',
});
```

cut file stream by minute
```
var cts = require('cut-file-stream');
var stream = cfs.getStream({
    filename: 'custom-string-YYYYMMDDHM-custom-string.log'
});
```

if no filename, stdout will return;

if no timeZone, default timeZone will be beijing: UTC+8;

