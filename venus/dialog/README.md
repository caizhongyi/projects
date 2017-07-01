alienjs-dialog
===============

A alienjs-dialog.js plugin


Install
-------

Install with npm:

    $ npm install alienjs-dialog

Usage
-----

```include
    script( src = '../../jquery/dist/jquery.js')
    script( src = '../src/index.js')
    script( src = '../../jquery-transitionEnd/src/index.js')
    link( rel="stylesheet" ,type="text/css", media="all" , href = '../src/index.css')
    link( rel="stylesheet" ,type="text/css", media="all" , href = '../../../../css/animate/animate.css')
```

```jade
  a(data-popup="", href=".dialog") show dialog

  .dialog(data-backdrop="false")
      .dialog-container
          .dialog-header
              h3.dialog-title= title || '提示'
              .operate
                  a(href="javascript:;", 'data-hide') ×
          .dialog-body
          .dialog-footer
```

init

```js
   $(function () {
        $('.dialog').dialog();
   })
```

get source object
```js
   $(function () {
        var dialog = $('.dialog').dialog().data('dialog')//.backdrop();
   })
```

no html
```js
   $(function () {
        var dialog = $.dialog.alert()//.backdrop();
   })
```

For more details please visit [中文文档](https://www.alienjs.net)
