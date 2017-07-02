swipe
===============

A swipe.js plugin


Install
-------

Install with npm:

    $ npm install swipe

Usage
-----

```html
  <div id="banner_box" class="box_swipe">
      <ul>
          <li><img src="pic/1.jpg" alt=""/><span class="title">活动名称活动名称</span><div class="mask"></div></li>
          <li><img src="pic/1.jpg" alt=""/><span class="title">活动名称活动名称</span><div class="mask"></div></li>
      </ul>
      <ol>
          <li class="on"></li>
          <li></li>
      </ol>
  </div>
```

init

```js
     $(function () {
         new Swipe($('#banner_box')[0], {
             speed: 500,
             auto: 3000,
             callback: function () {
                 var lis = $(this.element).next("ol").children();
                 lis.removeClass("on").eq(this.index).addClass("on");
             }
         });
     });
```


For more details please visit [中文文档](https://www.alienjs.net)
