alienjs-validator
===============

A alienjs-validator.js plugin


Install
-------

Install with npm:

    $ npm install alienjs-validator

Usage
-----

```js
  $.fn.validator( options );
```
标签定义扩展
required  : 是否为空 ;
data-tip : 提示标签 ;
data-role: 为扩展对像的名称 ;
data-equal : 为对比的标签;
验证扩展
$.validator.rules.user = {
    fn      :   function (val) { return /^[a-z\d_\u4e00-\u9fa5]{6,20}/i.test(val);},
   // ajax    :   function( callback ){ $.get('',{} , function(data){ callback && callback.call(this , true) }); }  //当需要服务器验证时候加入
    message :   '6~20位字符，由字母与数字组成，只能以字母开头',
    error   :   '输入用户名格式不正确!',
    success :   '正确!',
    required :   '请输入用户名!'
}

For more details please visit [中文文档](https://www.alienjs.net)
