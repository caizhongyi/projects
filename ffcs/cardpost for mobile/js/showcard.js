
$(function(){
    $('<audio id="bgsound" loop="loop"></audio>').appendTo('body');

    gCardText = $.trim($('#textcontent').html());
    onLoad();
})

var gTextSub        = 0;
var gTextSuper      = 0;
var gTextContent    = 0;
var gPrintText      = '';
var gOrgCardText    = '';

var faces = [':)', ':~', ':B',':|','8-)',':<',':$',':X',':Z',
    ':-|',':@',':P',':D',':O',':(',':+','--b',':Q',':T',
    ',@P',',@-D',':d',',@o',':g','|-)',':!',':L',':>',':,@',
    ',@f',':-S','?/',':,@x',',@@',':8',',@!','!!!','xx','bye',
    'wipe','dig','handclap','&-(','B-)','<@','@>',':-O','>-|','P-(',
    'X-)',':*','@x','8*','pd','<W>','beer','basketb','oo',
    'coffee','eat','pig','rose','fade','showlove','heart','break','cake','li',
    'bome','kn','footb','ladybug','shit','moon','sun','gift','hug','strong',
    'weak','share','v','@)','jj','@@','bad','lvu','no','ok',
    'love','<L>','jump','shake','<O>','circle','kotow','turn','skip','oY'];
var urls  = [];


if(typeof(gTextAreaLeft) == 'undefined')
{
    var gTextAreaLeft = 0.1;
}

if(typeof(gTextAreaTop) == 'undefined')
{
    var gTextAreaTop = 0.2;
}

if(typeof(gTextAreaWidth) == 'undefined')
{
    var gTextAreaWidth = 0.8;
}

if(typeof(gTextAreaHeight) == 'undefined')
{
    var gTextAreaHeight = 0.2;
}

if(typeof(gCardText) == 'undefined')
{
    var gCardText = '一张小小的卡片，捎去微卡对您的无限祝福!';
}

if(typeof(gCardTextNoWrap) == 'undefined')
{
    var gCardTextNoWrap = '一张小小的卡片，捎去微卡对您的无限祝福!';
}

if(typeof(gSizeMode) == 'undefined')
{
    var gSizeMode = 'img';  // img or bodywidth
}

if(typeof(gAnimateMode) == 'undefined')
{
    var gAnimateMode = 'left';
}

if(typeof(gSpeed) == 'undefined')
{
    var gSpeed = 350;
}

function ConvFaceOnBegin(message)
{
    var result = '';

    var i = 0;

    if(message.substring(i, i + 2) == '/:')
    {
        for(f=0; f<faces.length; f++)
        {
            facestr = faces[f];
            if(message.substring(i + 2, i + 2 + facestr.length) == facestr)
            {
                result = '<img src="' + urls[f] +'" width="16" height="16">';
                i = i + 2 + facestr.length;
                break;
            }
        }
    }

    return [result, i];
}

function ConvFace(message)
{
    var msglen = message.length;
    var result = '';

    var i = 0;

    while(i < msglen)
    {
        var found = false;

        if(message.substring(i, i + 2) == '/:')
        {
            for(f=0; f<faces.length; f++)
            {
                facestr = faces[f];
                if(message.substring(i + 2, i + 2 + facestr.length) == facestr)
                {
                    result = result + '<img src="' + urls[f] +'" width="16" height="16">';
                    i = i + 2 + facestr.length;
                    found = true;
                    break;
                }
            }
        }

        if(found == false)
        {
            result = result + message.substring(i, i + 1);
            i += 1;
        }
    }

    return result;
}

function playsound()
{
    if(typeof(gSound) != 'undefined')
    {
        var audio = document.getElementById('bgsound');
        audio && audio.play();
    }
}

function onLoad()
{
    gTextSub     = document.getElementById("textsub");
    gTextSuper   = document.getElementById("textsuper");
    gTextContent = document.getElementById("textcontent");


    if(gSizeMode == 'img')
    {
        var cardimg = document.getElementById("cardimg");
        gTextSuper.style.left   = cardimg.offsetLeft + cardimg.offsetWidth  * gTextAreaLeft;
        gTextSuper.style.top    = cardimg.offsetTop  + cardimg.offsetHeight * gTextAreaTop;
        gTextSuper.style.height = cardimg.offsetHeight * gTextAreaHeight;
        gTextSuper.style.width  = cardimg.offsetWidth  * gTextAreaWidth;
    }
    else if(gSizeMode == 'bodywidth')
    {
        var $ruler   = $(window.document.body)
        var baseLen = $ruler.width();
        gTextSuper.style.left   = baseLen * gTextAreaLeft;
        gTextSuper.style.top    = baseLen * gTextAreaTop;
        gTextSuper.style.height = baseLen * gTextAreaHeight;
        gTextSuper.style.width  = baseLen * gTextAreaWidth;
    }



    if(gAnimateMode == 'print')
    {
        onPrintLoad();
        setTimeout("onPrintAnimate()", 1500);
    }
    else if( gAnimateMode == 'rowFade' ){
        onRowFadeLoad();
    }
    else if(gAnimateMode == 'up')
    {
        onUpLoad();
        setTimeout("onUpAnimate()", 10);
    }
    else if(gAnimateMode == 'left')
    {
        onLeftLoad();
        setTimeout("onLeftAnimate()", 10);
    }

    gTextContent.innerHTML = gCardText;

    // sound
    var audio = document.getElementById('bgsound');
    if(audio && window.gSound){
        audio.src = gSound;
        audio.play();
    };
    // font size
    if(typeof(gFontSize) != 'undefined')
    {
        gTextContent.style.fontSize = gFontSize;
    }
}

function onRowFadeLoad(){
     var arr = gCardText.split('<br>'), content = '' ;
     for(var i = 0 ; i < arr.length  ;i ++ ){
         content += '<div>' + arr[i] + '</div>';
     }

     var $elem  = $('#textsub').html(content).children().hide() ,index = 0 ;

     setInterval( function() {
         $elem.eq( index ).fadeIn( 1500 );
         index ++ ;
         if( index == $elem.length + 1 ){
             index = 0 ;
             $elem.hide();
         }
     } , 1500 )
}

function onPrintLoad()
{
    gTextSub.style.top = gTextSuper.offsetHeight;
    gPrintText         = gCardText;
    gOrgCardText       = gCardText;
    gCardText          = '';
}

function onUpLoad()
{
    gCardText = ConvFace(gCardText);
    gTextSub.style.top = gTextSuper.offsetHeight;
}

function onLeftLoad()
{
    gCardText = ConvFace(gCardText);
    textwidth = 75 * gCardText.length;
    if(textwidth < 500) textwidth = 500;

    gTextSub.style.width = textwidth;
    gTextSub.style.left  = gTextSuper.offsetWidth;
}

function onPrintAnimate()
{
    pushText = '';
    var reachEnd = 0;
    if(gPrintText.length == 1)
    {
        reachEnd = 1;
    }

    var cutlen = 0;
    if(gPrintText.length >= 4 && gPrintText.substring(0, 4) == '<br>')
    {
        gPrintText = gPrintText.substring(4);
        pushText = '<br>';
        cutlen = 4;
    }
    else if(gPrintText.substring(0, 2) == '/:')
    {
        result = ConvFaceOnBegin(gPrintText);
        cutlen = result[1];
        if(cutlen > 0)
        {
            gPrintText = gPrintText.substring(cutlen)
            pushText = result[0]
        }
    }

    if(cutlen == 0 && gPrintText.length >= 1)
    {
        pushText   = gPrintText.substring(0, 1)
        gPrintText = gPrintText.substring(1)
    }

    textcontent.innerHTML = textcontent.innerHTML + pushText

    if(textsub.offsetTop + textsub.offsetHeight > textsuper.offsetHeight)
    {
        textsub.style.top = textsuper.offsetHeight - textsub.offsetHeight;
    }

    if(reachEnd == 1)
    {
        setTimeout("onPrintAnimate()", 5000);
    }
    else if(gPrintText.length == 0)
    {
        gTextSub.style.top     = gTextSuper.offsetHeight;
        gPrintText             = gOrgCardText;
        gTextContent.innerHTML = gCardText;

        setTimeout("onPrintAnimate()", 1500);
    }
    else
    {
        setTimeout("onPrintAnimate()", gSpeed);
    }
}
function o()
{
}
function onUpAnimate()
{
    textsub.style.top = (parseFloat(textsub.offsetTop) - 1) + 'px';
    if(textsub.offsetTop < - textsub.offsetHeight)
    {
        textsub.style.top = textsuper.offsetHeight + 'px';

        setTimeout("o()", 1000);

    }
    setTimeout("onUpAnimate()", 30);
}

function onLeftAnimate()
{
    gTextSub.style.left = (gTextSub.offsetLeft - 1) + 'px';

    if(gTextSub.offsetLeft < - textwidth)
    {
        gTextSub.style.left = gTextSuper.offsetWidth  + 'px';
    }

    setTimeout("onLeftAnimate()", 10);
}

/*function weixinAddContact()
{
    if(typeof(WeixinJSBridge) != "undefined")
    {
        WeixinJSBridge.invoke(
            "addContact",
            {webtype: "1",username: " kas "},
            function(e){
                if(e.err_msg == "access_control:not_allow")
                {
                    document.location = ""
                }
            }
        )
    }
    else
    {
        document.location = ""
    }
}*/
