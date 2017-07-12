$(".active_con").hover(function () {
    $(this).addClass("acrive_bg");
}, function () {
    $(this).removeClass("acrive_bg");
})
$(".open_activity").hover(function () {
    $(this).addClass("acrive_bg");
}, function () {
    $(this).removeClass("acrive_bg");
})



$(".active_con").live("mouseover", function () {
    $(this).addClass("acrive_bg");
});
$(".active_con").live("mouseout", function () {
    $(this).removeClass("acrive_bg");
});

$(".open_activity").live("mouseover", function () {
    $(this).addClass("acrive_bg");
});
$(".open_activity").live("mouseout", function () {
    $(this).removeClass("acrive_bg");
});


//获取日期中的月和日--确保日期为合法日期
 function  getMonthAndDate (time) {
    var varTime = "";
    var timearr = time.replace(" ", ":").replace(/\:/g, "/").split("/");
    return timearr[1] + "/" + timearr[2];
}