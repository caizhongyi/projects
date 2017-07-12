$(document).ready(initData);



function initData() {
    getMenu(7);
    pagination(1);
   
}


function pagination(currPage) {
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
                        opertype: 'getmygift',
                        is_received: '1'
                    }
                }





    });
}

function databind(data) {
    var box = $('#div_body');
    box.empty();
    if (!data.result) {
           box.html("你未收到如何礼物");
       }
    if (data.result && data.rows) {
        
        $.each(data.rows, function (i, v) {

            var html = "<li><div class='gift_box clearfix'><img src=\"" + v.gift_logo_path + "\"/><div class='gift_img'>" +
                	   "<dd>礼 品 名： <a><b>" + v.gift_name + "</b></a></dd>" +
                       "<dd>分&nbsp;&nbsp;&nbsp;&nbsp;类： <a>" + v.category_name + "</a></dd>" +
                       "<dd>发 送 人： <a>" + v.name + "</a></dd>" +
                       "<dd>发送时间： <i>" + v.action_date + "</i></dd>" +
                       "<dd>赠&nbsp;&nbsp;&nbsp;&nbsp;言： <i>" + v.content + "</i></dd>" +
                       "</div></div></li>";


            box.append(html);
        });
    }
}