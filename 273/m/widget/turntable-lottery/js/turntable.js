/**
 *  server callback
 *  { index : 1, text : 'xxxx' };
 * */

var $ = require('zepto');
require('rotate');

$.fn.turntable = function (options) {

    var opts = $.extend(true, {}, {
        count: 8,
        startBtn: '#turntable-btn',
        rotate: '#turntable-arrow',
        ajax : function(){

        }
    }, options);

    var $start = $(opts.startBtn);
    var timeOut = function () {  //超时函数
        $(opts.rotate).rotate({
            angle: 0,
            duration: 10000,
            animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
            callback: function () {
                alert('网络超时');
                $start.removeAttr('disabled');
            }
        });
    };

    var rotateFunc = function (awards, angle, callback ) {
        //awards:奖项，angle:奖项对应的角度
        $(opts.rotate).stopRotate();
        $(opts.rotate).rotate({
            angle: 0,
            duration: 5000,
            animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback: function () {
                callback && callback( {
                    index : awards,
                    angle : angle
                } );
                $start.removeAttr('disabled');
            }
        });
    };

    function result( index , callback  ){
        var itemAngle = 360 / opts.count;
        var angle = index == -1 ? 0 : index * itemAngle - itemAngle / 2;
        rotateFunc( index, angle, callback );
    }

    // $(opts.arrow).rotate({});
    $start.click(function () {
        $(this).attr('disabled', 'disabled');
        if( opts.start ){
            opts.start.call( this ,  result  )
        }
        else{
            result( -1 );
        }
    })

}

module.exports = $;