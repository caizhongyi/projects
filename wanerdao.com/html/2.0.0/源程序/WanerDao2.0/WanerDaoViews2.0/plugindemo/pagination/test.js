$(function () {

    //基础配置
    $(".pagewrap").myPagination({
        showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: test,
        pagermore: true,
        ajax: {
            url: 'area_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'demopagiation'//操作码
            }
            },
            info: {
                first: '首页',
                last: '尾页',
                next: '下一页',
                prev: '上一页',
                first_on: true,
                last_on: true,
                next_on: true,
                prev_on: true,
                msg_on: true, //如果为true显示第几页以及总页数，否则不显示
                tipmsg: '第{tip}页'
            },
            systole:
            {
                disabled: false, //如果为true表示禁用收缩功能，否则显示收缩功能
                config: {
                    id: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能,收缩ID，当disabled为false时，不允许为空。
                    showtext: wanerdaoLangTip('common_00077'), //展示文本
                   // showcls: 'icon icon-packup', //展示样式
                    hidetext: wanerdaoLangTip('common_00078'), //隐藏后文本
                    //hidecls: 'icon icon-packup'//隐藏后样式
                }
            }
        ,
        //在出现2个导航条时，需要注意的事情就是自定义操作没有办法事件同步，所以需要程序自己来控制自定义事件的同步
        toolbar: [{ text: '全选', cls: 'checkbox', type: 'checkbox', handler: function (data) {
            //$(this).attr("checked", false);
            //                    if ($(this).attr("checked")) {
            //                        $(this).attr("checked", "");
            //                    }
            //.attr("checked")==true
            alert("全选");
        }
        },
                { symbol: '|', type: 'separator'
                },
                { text: '提醒缴费', cls: '', type: 'button', handler: function (data) {
                    alert("提醒缴费");
                }
                },
                { symbol: '|', type: 'separator'
                },
                { text: '提醒缴费1', cls: '', type: 'text', handler: function (data) {
                    var v = $(this);
                    alert("提醒缴费1");
                }
                }, { cls: '', type: 'select', url: '', ajaxdata: '', localdata: [{ "id": "1", "value": "1" }, { "id": "2", "value": "2"}], handler: function () {
                    alert("select");
                }
                },
                { title: 'a测试', cls: '', type: 'a', handler: function (data) {
                    var v = data;
                    alert("aaaa");
                }
                }
                ]
    });
    //更改样式
    function test(data, total, more) {//more此参数来判断是否用户点击加载更多，如果为true表示加载更多或显示更多
        //debugger;
        //alert(total);
        var pagecontent = $('<ul></ul>').appendTo("#content");
        $.each(data.rows, function (i, msg) {
            //alert(msg.name);
            $('<li>' + msg.unit_name + '</li>').appendTo(pagecontent);
        });
    }
})