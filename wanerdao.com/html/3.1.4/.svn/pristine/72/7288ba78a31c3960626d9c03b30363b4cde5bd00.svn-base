$(document).ready(function(){
    init();
    $('.form-item .combo').eq(0).children().eq(3).children().children().click(onselectMonth);
    $('.form-item .combo').eq(2).children().eq(3).children().children().click(onselectYear);
    $('.form-panel-mini input[type=submit]').click(onSignupClick);
});


function init(){
    dateInit();
    monthInit();
    yearInit();
}
var year = new Date().getFullYear();
var month = 1;
function dateInit(){
    $('.form-item .combo').eq(1).children().eq(3).children().html('');
    
    var ld = new Date(year, month-1, 1).clearTime().moveToLastDayOfMonth().getDate();
    var dateHtml = '';
    for(var i = 1 ; i <= ld ; i++){
        dateHtml += '<li value="'+i+'">'+i+'</li>';
    }
    $('.combo-list').eq(1).children().html(dateHtml);
    
}

function monthInit(){
    for(var i = 1 ; i <= 12 ; i++){
        $('.form-item .combo').eq(0).children().eq(3).children().append('<li value="'+i+'">'+i+'</li>');
    }
    
}

function yearInit(){
    var curr_year = new Date().getFullYear();
    for(var i = curr_year ; i >= curr_year - 80 ; i--){
        $('.form-item .combo').eq(2).children().eq(3).children().append('<li value="'+i+'">'+i+'</li>');
    }
    
}

function onselectMonth(){
    month = $(this).val();
    dateInit();
}

function onselectYear(){
    year = $(this).val();
    dateInit();
}

function onSignupClick(){
    
    
    
    
    $(this).parent().parent().parent().attr('action' , 'registerAction.do?is_register_page=true');
    $(this).parent().parent().parent().submit();
}

