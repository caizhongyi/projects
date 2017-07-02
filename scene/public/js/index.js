/**
 * Created by fierayan on 2014/11/13.
 */


// 渐显元素
function showElement(){
    function shown( index , face ){
        var time = 1000;
        setTimeout(function(){
            $(".p"+index+"__"+ face +"_des").addClass("fadeIn");
        },time);
        setTimeout(function(){
            $(".p"+index+"__main").addClass("fadeIn");
        },time += 500 );

        setTimeout(function(){
            $(".p"+index+"__"+ face +"_band").addClass("fadeIn");
            $(".p"+index+"__"+ face +"_1").addClass("fadeIn");
            $(".p"+index+"__"+ face +"_2").addClass("fadeIn");
        },time += 500 );

        $('.p'+ index +'__'+ face +'_dialogue').children().each(function(){
            var $this = $(this);
            setTimeout(function(){
                $this.addClass("bubble_show");
            },time += 500);
        })
    }

    function riseUp(){
        var time = 1000;
        $('.p'+ pageNumber).children('.part').each(function(){
            var $this = $(this);
            setTimeout(function(){
                $this.addClass("riseUp");
            },time += 500);
        })
    }
    switch (pageNumber){
        case 0 : break;
        case 4:case 5:case 6:
            riseUp();
            break;
        default :
            var currentPage=pageNumber;
            if(isFlip[currentPage]===2){
                shown( currentPage , 'f' );
            }else{
                shown( currentPage , 'b' );
            }
            break;
    }
}
// 隐藏内容
function hideContent(){
    var currentPage=pageNumber;
    if(isFlip[currentPage]===2){
        $(".p"+currentPage+"__of").css("opacity","0");
    }else{
        $(".p"+currentPage+"__ob").css("opacity","0");
    }
}
// 显示内容
function showContent(){
    var currentPage=pageNumber;
    if(isFlip[currentPage]==1){
        setTimeout(function(){
            $(".p"+currentPage+"__of").css("opacity","1");
        },1000);

    }else{
        setTimeout(function(){
            $(".p"+currentPage+"__ob").css("opacity","1");
        },1000);
    }
}

// 翻转图片
function flipCard(){
    if(islock) return ;
    var selectorMain=".p"+pageNumber+"__main";
    var selectorFI=".p"+pageNumber+"__f_img";
    var selectorBI=".p"+pageNumber+"__b_img";

    var contentNumber = pageNumber;

    if(isFlip[pageNumber]===2){
        // 转到反面

        // 正面元素消失
        hideContent();

        // 背面元素显示
        showContent();

        // 照片翻转
        $(selectorMain).addClass("flip");

        if(bIsAndroid){
            $(selectorFI).addClass("fadeOut");
            $(selectorBI).addClass("fadeIn");
        }else{
            $(selectorBI).css("z-index","3");
            setTimeout(function(){
                $(selectorFI).css("display","none");
            },500);
        }

        // 背景变色

        $(".content-li").eq(contentNumber).addClass("fliped");

        // 显示指引
        setTimeout(function(){
            $(".notice-swipe-up").addClass("swipeMove");
        },1200);

        // 修改参数
        isFlip[pageNumber]=1;

        // 后面元素显示
        showElement();
    }else{

        // 转回正面

        // 背面元素消失
        hideContent();

        // 正面元素显示
        showContent();

        $(selectorMain).removeClass("flip");

        if(bIsAndroid){
            $(selectorFI).removeClass("fadeOut");
            $(selectorBI).removeClass("fadeIn");
        }else{
            $(selectorBI).css("z-index","1");
            setTimeout(function(){
                $(selectorFI).css("display","block");
            },500);
        }

        $(".content-li").eq(contentNumber).removeClass("fliped");
        isFlip[pageNumber]=2;

    }


}

// 滑动屏幕操作相关

// 上一屏
function screenBack(){
    if(islock) return;
    var translateString,transitionString;
    pageNumber--;

    if(pageNumber<=0){
        pageNumber=1;
    }
    currentDistance=screenHeight*pageNumber;
    translateString="translate3d(0, -"+currentDistance+"px, 0)";
    transitionString="all 0.5s ease-in";

    contentList.css({"-webkit-transform":translateString,"transform":translateString,"-webkit-transition":transitionString,"transition":transitionString});

    // 显示引导
    if(pageNumber > firstPage ){
        setTimeout(function(){
            $(".notice-swipe-up").addClass("swipeMove");
        },800);
    }else{
        $(".notice-swipe-up").css("display","none");
    }
}

// 下一屏
function screenForward(){
    if(islock) return;
    var translateString,transitionString;
    pageNumber++;

    if(!showTheLast && pageNumber===maxPage){
        pageNumber= maxPage - 1;
    }

    if(pageNumber> maxPage){
        pageNumber=maxPage;
    }
    currentDistance=screenHeight*pageNumber;
    translateString="translate3d(0, -"+currentDistance+"px, 0)";
    transitionString="all 0.5s ease-in";

    contentList.css({"-webkit-transform":translateString,"transform":translateString,"-webkit-transition":transitionString,"transition":transitionString});

    // 显示元素
    showElement();

    // 显示引导
    if(pageNumber < maxPage ){
        if( pageNumber != maxPage - 1)
            setTimeout(function(){
                $(".notice-swipe-up").addClass("swipeMove");
            },800);
    }else{
      $(".notice-swipe-up").css("display","none");
    }
}

function startTouch(event) {
    event.touches = event.touches || event.originalEvent.touches;
    if (!event.touches.length) {
        return;
    }

    tmpEndY = 0;
    var touch = event.touches[0];
    tmpStartY = touch.pageY;
}

function moveTouch(event) {
    event.preventDefault();
    event.touches = event.touches || event.originalEvent.touches;
    if (!event.touches.length) {
        return;
    }
    var touch = event.touches[0];
    tmpEndY = touch.pageY;
}

// 触摸结束时判断执行上翻或者下翻
function endTouch() {
    var endY = tmpEndY;
    var startY = tmpStartY;
    if (endY && endY !== startY && endY-startY<=-25) {
        console.log(pageNumber+":"+isFlip[pageNumber]);
        if(isFlip[pageNumber]<=1){

            screenForward();
            $(".notice-swipe-up").removeClass("swipeMove");

        }else{
            flipCard();
        }

    }else if(endY && endY !== startY && endY-startY>=25){
        console.log(pageNumber+":"+isFlip[pageNumber]);
        if(!isFlip[pageNumber] || isFlip[pageNumber]===2 ){
            if(pageNumber >firstPage)
                screenBack();
        }else{
            flipCard();
        }

    }
}

// 滑动相关 end

// 预加载图片

function preImg(ele){
    var img_src=$(ele).css("background-image");
    img_src=img_src.split("(")[1].split(")")[0];
    var preImg=new Image();
    preImg.src=img_src;
    return preImg;
}

// 正式开始

// 定义变量
var screenHeight=$(window).height();
var currentDistance=0;
var contentList=$(".content-list");
var tmpEndY,tmpStartY;
var isFlip=[0,2,2,2,2,0,0,0];
var showTheLast=0;
var maxPage = 7, firstPage = 0,pageNumber = 0, islock = false;;

// 判断是否安卓

var sUserAgent = navigator.userAgent.toLowerCase();
var bIsAndroid = sUserAgent.match(/android/i) == "android";

// 判断是否短屏手机
var isShort;
if($(window).height()<=416){
    isShort=true;
}


// 每一页高度自适应
$(".content-li").each(function () {
    $(this).css("height", $(window).height());
});

// 长屏幕增加背景
if(screenHeight>504){
    var gapHeight=(screenHeight-504)/2;
    $(".p5__extra").css({"top":-gapHeight,"height":gapHeight+5});
    $(".p6__extra").css({"top":-gapHeight,"height":gapHeight+5});
}

function wScratchPad(){
    var percent = 0;
    firstPage = 1 ;
    screenForward();

    islock = true;
    $('.notice-swipe-up').hide();
    function bindScratchpad(e){

        var p = $('#scratchpad').data('wScratchPad')._scratchPercent();
        if(p < 30 ) return ;

        islock = false;
        $('.notice-swipe-up').show();
        $('#scratchpad').fadeOut(1000);
        /*   $('.notice-swipe-up').show().addClass('swipeMove');
         $('#scratchpad').off('touchstart.scratchpad touchmove.scratchpad touchend.scratchpad').on("touchstart.scratchpad",function(e){
         startTouch(e);
         }).on("touchmove.scratchpad",function(e){
         moveTouch(e);
         }).on("touchend.scratchpad",function(e){
         endTouch(e);
         if(pageNumber >= maxPage - 1){
         $('#scratchpad').hide();
         }
         else{
         $('#scratchpad').show();
         }
         });

         $('.content-list').on("touchend.scratchpad",function(e){
         if(pageNumber < maxPage - 1) {
         $('#scratchpad').show();
         }
         });*/

    }

    $('#scratchpad').wScratchPad({
        size        : 50,          // The size of the brush/scratch.
        bg          : '../public/img/blank.png',  // Background (image path or hex color).
        fg          : '../public/img/scratchpad-front.png',  // Foreground (image path or hex color).
        realtime    : false,       // Calculates percentage in realitime.
        scratchDown : function( e, p ){
        },      // Set scratchDown callback.
        scratchUp   : function( e, p ){
        },       // Set scratchUp callback.
        scratchMove : function(e , p ){
        },       // Set scratcMove callback.
        cursor      : 'pointer' // Set cursor.
    }).on('touchend.scratchpad',function(e){
        bindScratchpad(e);
    }).on('touchstart.scratchpad',function(e){
        $('.handle').remove();
    })
    $(window).load(function(){
        $('.scratchpad').css('background','none')
        $('.loading').fadeOut(2000);
    })
}
screenForward();

// 首屏动画
setTimeout(function(){
    $(".p0__bubble").addClass("riseUp");
},500);
setTimeout(function(){
    $(".p0__t_1").addClass("riseUp");
},800);
setTimeout(function(){
    $(".p0__t_2").addClass("riseUp");
},1000);
setTimeout(function(){
    $(".p0__t_3").addClass("riseUp");
},1200);


// 绑定翻页
contentList.on("touchstart",function(e){
    startTouch(e);
});
contentList.on("touchmove",function(e){
    moveTouch(e);
});
contentList.on("touchend",function(e){
    endTouch(e);
});

// 载入后显示指引
setTimeout(function(){
    $(".notice-swipe-up").addClass("swipeMove");
},500);

// 显示分享浮层
$(".p6__share-btn").on("tap",function(){
    $(".speaker").css("display","none");
    $(".share-mask").css({"display":"block","-webkit-transition":"display 0.3s ease-in","transition":"display 0.3s ease-in"});
    setTimeout(function(){
        $(".share-mask").css("display","none");
        $(".speaker").css("display","block");
    },1500);
});



// 控制声音
/*$(".speaker").on("click",function(){
    var audioEle=document.querySelector("audio");
    if(audioEle.paused){
        $(".speaker").removeClass("speaker_muted");
        audioEle.play();
    }else{
        $(".speaker").addClass("speaker_muted");
        audioEle.pause();
    }
});*/


