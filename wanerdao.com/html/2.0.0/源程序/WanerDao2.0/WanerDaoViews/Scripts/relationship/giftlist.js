$(document).ready(initData);


function initData() {
    getMenu(8);
    setGiftCategory();
    pagination("1", "");

    $('#txt_time').datetimepicker({
        showHour: false,
        showMinute: false,
        showTime:false,
        timeFormat:''
    });

   

}

function showdata(data) {
    alert(data.group[0].id);
}


function setGiftCategory() {
    $.ajax({
        url: "../wandao_gift.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getgiftcategory'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            var box = $("#ul_category");
            box.empty();
            var html = "<li>";
            var p = 0;
            var pi = 0;
            $.each(data.rows, function (i, v) {
                if (v.parent_id == "-1") {
                    if (p != 0) {
                        if (pi == 0) {
                            html += "</ul>";
                        }
                        html += "</li><li>"
                    } else {
                        p = 1;
                    }
                    html += " <div><a href='javascript:;' >" + v.value + "</a></div>";
                    pi = 1;
                } else {
                    if (pi == 1) {
                        html += "<ul style='display:none'>";
                        pi = 0;
                    }
                    html += " <li><div><a href=\"javascript:pagination('1','" + v.id + "')\">" + v.value + "（" + v.num + "）</a></div></li>";
                }

                    });
            if (pi == 0) {
                html += "</ul>";
            }
            html += "</li>";
            box.append(html);
      
            setcategoryEvent();
        }

    });
}

function setcategoryEvent() {
    $('.market_le > ul > li > div').toggle(
			function () { $(this).attr('id', 'current02') },
			function () { $(this).attr('id', '') }
			)
			.click(function () {
			    $(this).next().animate({ height: 'toggle' })
			})

}



//分页数据绑定
function databind(data) {
    $('#div_body').empty();
    $("#lab_sreachresults").html(data.total);
    if (data.result && data.rows) {
        var box = $('#div_body');
        $.each(data.rows, function (i, v) {

            var html = "<dl><img src='"+v.gift_logo_path+"' /><dd><h1>"+v.gift_name+"</h1><p>分 类："+v.category_name+"</p>"+
                       "<p>描 述： <i>"+v.description+"</i></p> <input type='button' class='inp66' onclick=\"openDes('"+v.id+"')\"/></dd></dl>"


            box.append(html);
        });
    }
    liMousemoveSearch();

}

var giftID;
function openDes(id) {
    giftID = id;
    $.ajax({
        url: "../wandao_gift.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getgift',id:'" + id + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            $.each(data.rows, function (i, v) {
                $("#div_img").empty().append("  <img src=\"" + v.gift_logo_path + "\" />");
                $("#lab_name").html(v.gift_name);
                $("#lab_cate").html(v.category_name);
                $("#lab_des").html(v.description);
            });
        }
    });

    width2 = $(window).width();
    left2 = (width2 - 687) / 2 + 90;
    top2 = $(document.body).scrollTop();
    $('#upbox_market').css('top', top2);
    $('#upbox_market').css('left', left2);
    $('#upbox_market').show();	
}


function liMousemoveSearch() {

    $(".market_ri dl").each(function () {
        $(this).mouseout(
			function () {
			    $(this).css("backgroundColor", "#fff");
			    $(this).css("border", "1px solid #DFDFDF");
			}
		);

        $(this).mouseover(
			function () {
			    $(this).css("backgroundColor", "#eef7fe");
			    $(this).css("border", "1px solid #60b1d3");
			}
		);
    });
}


function btn_submit() {

    $.ajax({
        url: "../wandao_gift.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sendgift',gift_id:'" + giftID + "',friend_id:'" + $("#txt_friend").attr("lang") + "',date_time:'" + $("#txt_time").val() + "',content:'" + $("#txt_message").val() + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            $('#upbox_market').hide();
        }
    });
   
}
function pagination(currPage, cid) {
    $("#pager1").myPagination({
           showmore: true, //是否显示加载更多
                showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
                contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
                callback: databind,
                ajax: {
                    url: '../wandao_gift.axd',//此处必须填写，分页已没有固定处理工厂
                    param: {
                        pagecurrent: currPage,
                pageSize: 10,
                opertype: 'searchgiftmarket',
                keyword: $("#txt_giftkey").val(),
                category_id: cid
                    }
                }

    });
}
