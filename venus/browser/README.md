alienjs-browser
===============

A alienjs-browser.js plugin


Install
-------

Install with npm:

    $ npm install alienjs-browser

Usage
-----

```js
  $.browser.supportsCSSProperty(prop)
  $.browser.translate(x, y, z)
  $.browser.rotateX(deg)
  $.browser.rotateY(deg)
  $.browser.rotateZ(deg)
  $.browser.rotate(axis, deg)


  $.browser.mozilla //火狐内核
  $.browser.webkit //苹果、谷歌内核
  $.browser.opera //opera内核
  $.browser.msie //IE内核
  $.browser.msie.version //IE内核
  $.browser.mobile //是否为移动终端
  $.browser.ios //ios终端
  $.browser.android //android终端或者uc浏览器
  $.browser.iPhone
  $.browser.iPad
  $.browser.uc
  $.browser.midp
  $.browser.safari //是否web应该程序，没有头部与底部
  $.browser.language

```

For more details please visit [中文文档](https://www.alienjs.net)
