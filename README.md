# Cut Log File Stream

Support morgan  
Support timeZone  

## Install
```
npm install --save cut-file-stream
```

## Usage

Format filename：

- YYYY => Year
- MM => Month
- DD => Day
- H => Hour
- M => minute
- S => Second

Cut file stream by day
```js
var cts = require('cut-file-stream');
var stream = cfs.getStream({
    filename: 'custom-string-YYYYMMDD-custom-string.log',
    timeZone: 0 // UTC
});
```

Cut file stream by hour
```js
var cts = require('cut-file-stream');
var stream = cfs.getStream({
    filename: 'custom-string-YYYYMMDDH-custom-string.log',
});
```

Cut file stream by minute
```js
var cts = require('cut-file-stream');
var stream = cfs.getStream({
    filename: 'custom-string-YYYYMMDDHM-custom-string.log'
});
```

If no filename, stdout will return

If no timeZone, default timeZone will be BeiJing: UTC+8

## Bug fixed list

2015/07/16  Support multi log file steam 

## Contact

If you have any question, please contact me zhaoshuxiang2010@gmail.com



