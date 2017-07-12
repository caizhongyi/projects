/*****activity_main.aspx 以下页面下的动态绑定*****/
$(".actList li").live("mouseover", function () {
    $(this).addClass("mHover");
});
$(".actList li").live("mouseout", function () {
    $(this).removeClass("mHover");
});
/*****activity_main.aspx 以上页面下的动态绑定*****/
function copyUrl() {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        var clipBoardContent = window.location.href;
        window.clipboardData.setData("Text", clipBoardContent);
    }
    else {
        alert("目前只支持IE");
    }
}
//获取日期中的月和日--确保日期为合法日期
function getMonthAndDate(time) {

    var varTime = "";
    var len=time.indexOf("-");
    if (len >= 0) {
        varTime = time.split("-");
    }
    else {
        varTime = time.replace(" ", ":").replace(/\:/g, "/").split("/");
    }
    return varTime[1] + "/" + varTime[2];
}

//ajax 调用失败提示
function errorFunc(data) { alert(wanerdaoLangTip('common_00082')); }

///字符串过长用...表示
function subPoints(str, sub_length) {
    var temp1 = str.replace(/[^\x00-\xff]/g, "**"); //精髓
    var temp2 = temp1.substring(0, sub_length);
    //找出有多少个*
    var x_length = temp2.split("\*").length - 1;
    var hanzi_num = x_length / 2;
    sub_length = sub_length - hanzi_num; //实际需要sub的长度是总长度-汉字长度
    var res = str.substring(0, sub_length);
    if (sub_length < str.length) {
        var end = res + "……";
    } else {
        var end = res;
    }
    return end;
}


