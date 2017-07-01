alienjs-countdown
===============

A alienjs-countdown.js plugin


Install
-------

Install with npm:

    $ npm install alienjs-countdown

Usage
-----

```js
  $.fn.countdown( {
        lastDate  : new Date(2014, 9, 26),
        startDate :  new Date(),
        format    : 'dd天 hh时 mm分 ss秒',
        callback  : function(e){
            $(this).html('时间到了！');
        }
  });
```

For more details please visit [中文文档](https://www.alienjs.net)
