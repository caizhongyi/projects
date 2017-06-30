/**
 * @desc 仿客户端toast 提示框
 * @copyright (c) 2014 273 Inc
 * @author 陈朝阳 <chency@273.cn>
 * @since 2014-09-18
 */

var Toast = function(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var $toast = document.createElement('div');
    $toast.innerHTML = msg;
    $toast.style.cssText = "width:200px; min-width:100px; opacity:0.9; color:#fff; line-height:30px; text-align:center; border-radius:8px; position:fixed; top:50%; left:50%; margin-left: -100px; z-index:9999;filter: alpha(opacity=80);background-color: rgba(0,0,0,.7);";
    document.body.appendChild($toast);
    setTimeout(function() {
        var d = 0.5;
        $toast.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        $toast.style.opacity = '0';
        setTimeout(function() { document.body.removeChild($toast); }, d * 1000);
    }, duration);
};

module.exports = Toast;