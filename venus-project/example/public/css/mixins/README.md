stylus-mixins
===============

A stylus-mixins plugin


Install
-------

Install with npm:

    $ npm install stylus-mixins

Usage
-----

```stylus
    scroll 'x' 200px
    unstyled()
    placeholder #999
    input-icon( icon , icon-size , position = 'left')
    center-box()

    font-face: DIN  '/fonts'
    text-selection : #F80  #EEE

    bg-contain  : 'test.jpg'  no-repeat
    bg-cover : 'test.jpg'  no-repeat

    image: 'test.jpg' center center
    image-block: 'test.jpg' 300 200

    sprite-grid: 'test.png' 1 5 16px 24px
    sprite-extend: '.sprite' 1 5 16px 24px
    sprite-replace: 'test.png' 1 5 16px 24px // 图标替换字体
    sprite-inline: 'test.png' 1 5 18px 18px 16px 24px
    sprite-inline-extend: '.sprite'  1 5 18px  24px
    sprite-padded: 'test.png' 1 5 18px 18px 10px 5px 32px //图标填补

    text-overflow: ellipsis 200
    text-hide()

    no-select()

    triangle: down 15px #F80 // 三角形
```

For more details please visit [中文文档](https://www.alienjs.net)
