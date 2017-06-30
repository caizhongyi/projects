/**
 * Created by caizhongyi on 2016-09-07.
 */
var $elems = $('img ,video ').on('load',function(){
    $('.jdt').css('margin-right', (( 1 / $elems.length ) * 100) + '%');
})


window.onload = function(){
    $('.jdt').css('margin-right', '0%');
}