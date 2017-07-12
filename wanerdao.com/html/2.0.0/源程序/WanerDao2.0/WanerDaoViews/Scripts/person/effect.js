// JavaScript Document
$(document).ready(function () {
    //列表hover
    $(".imporInfo tr").hover(function () {
        $(this).addClass("hover")
			.find(".actView").children().css("visibility", "visible");
    }, function () {
        $(this).removeClass("hover")
			.find(".actView").children().css("visibility", "hidden");
    });
    $(".search_result li").bind("mouseenter mouseleave", function () {
        $(this).toggleClass("active")
			.children(".flBtnDiv").toggle();
    })
    //搜索框
    $(".prInpSty").focus(function () {
        if ($(this).val() == "请输入关键字") {
            $(this).val("");
        }
    })
    $(".prInpSty").blur(function () {
        if ($(this).val() == "") {
            $(this).val("请输入关键字");
        }
    })
    //全反选checkbox
    $(".pr_Tag .T_ckBox").click(function () {
        $(".search_result input[type='checkbox']").each(function () {
            if (this.checked == false) {
                this.checked = true;
            }
            else {
                this.checked = false;
            }
        })
    })
    /*
    * 相册编辑hover
    */
    $(".alb_edit li").bind("mouseenter mouseleave", function () {
        $(this).toggleClass("hover")
			.find(".hr_wp").toggle();
    })
    /*
    * 相册展示hover
    */
    $(".preview_pic li").bind("mouseenter mouseleave", function () {
        $(this).find(".bm_info").toggle();
    })
    /*
    * 左侧相册上下滚动
    */
    $(".scrTop_pic li").bind("mouseenter mouseleave", function () {
        $(this).find(".per_hr_ico").toggle();
    })
    var arrTop = $(".scroll_pic_wp").find(".arr_top");
    var arrBm = $(".scroll_pic_wp").find(".arr_bm");
    var _list = $(".scrTop");
    var _li = _list.children();
    var _plas = _li.size() - 4;
    arrTop.click(function () {
        if (_plas > 0) {
            if (!_list.is(":animated")) {
                if (!parseInt(_list.css("top")) == "0") {
                    _list.animate({ top: "+=205" })
                }
            }
        }
    })
    arrBm.click(function () {
        if (_plas > 0) {
            if (!_list.is(":animated")) {
                if (-parseInt(_list.css("top")) >= _plas * 205)
                    return false;

                _list.animate({ top: "-=205" });

            }
        }
    })
    /*
    * 照片编辑列表
    */
    $(".pe_list li").bind("mouseenter mouseleave", function () {
        $(this).toggleClass("hover")
			.find(".hover_box").toggle();
    })
    $(".pu_photo_wp li").bind("mouseenter mouseleave", function () {
        $(this).find(".delete").toggle();
    })
    /*
    * 相册预览留言
    */
    $(".reply_content:gt(2)").hide();
    $("#closed").hide();
    $("#closed").click(function () {
        $(".reply_content:gt(2)").hide();
        $(this).hide()
			.prev().show();
    })
    $("#more_reply").click(function () {
        $(".reply_content:gt(2)").show();
        $(this).hide()
			.next().show();
    })
})