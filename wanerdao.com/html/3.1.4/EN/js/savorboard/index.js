$(document).ready(function(){
    $('.login-form input[type=button]').click(onLoginClick);
    $('.side-footer a').click(onSignupClick);
});

function onLoginClick(){
    var username = $('.login-form input[type=text]').val();
    var password = $('.login-form input[type=password]').val();
    if(username == ''){
        alert('input username');
        return;
    }
    if(password == ''){
        alert('input password');
        return;
    }
//    $('form').attr('action' , 'loginAction.do');
//    $('form').submit();
    $('.login-form').parent().attr('action' , 'loginAction.do');
    $('.login-form').parent().submit();
}

function onSignupClick(){
    $(this).parent().parent().attr('action' , 'registerAction.do');
    $(this).parent().parent().submit();
}
