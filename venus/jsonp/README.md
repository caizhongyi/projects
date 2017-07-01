alienjs-jsonp
===============

A alienjs-jsonp.js plugin


Install
-------

Install with npm:

    $ npm install alienjs-jsonp

Usage
-----

server page

```php
   $callback = $_GET["callback"];
   echo "{$callback}([ { name:\"John\",password:'xuxiangpan'},{ name:'111',password:'111'},{ name:'222',password:'222'},{ name:'333',password:'333'} ] )";
```

```js
  $.fn.jsonp( url , data , function( data ){

  });
```

For more details please visit [中文文档](https://www.alienjs.net)
