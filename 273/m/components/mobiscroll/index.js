var $ = require('zepto');
$.fn.outerWidth = function(){
    return $(this).width() + parseFloat($(this).css('padding-left')) * 2 ;
}
$.fn.outerHeight = function(){
    return $(this).height() + parseFloat($(this).css('padding-top')) * 2 ;
}
/*require('dev/js/mobiscroll.core-2.5.2.js');
require('dev/js/mobiscroll.core-2.5.2-zh.js');
require('dev/js/mobiscroll.datetime-2.5.1.js');
require('dev/js/mobiscroll.datetime-2.5.1-zh.js');
require('dev/js/mobiscroll.list-2.5.1.js');
require('dev/js/mobiscroll.select-2.5.1.js');
require('dev/js/mobiscroll.wp-2.5.2.js');
require('dev/js/mobiscroll.jqm-2.5.1.js');
require('dev/js/mobiscroll.ios-2.5.1.js');
require('dev/js/mobiscroll.android-2.5.1.js');
require('dev/js/mobiscroll.android-ics-2.5.2.js');*/
require('js/mobiscroll.custom-2.16.1.min.js')

