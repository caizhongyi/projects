function friendclass(cId, cName) {
    this.id = cId;
    this.name = cName;
}
jQuery.extend(Boxy, {
    fAreaSettings: {
        loadmsg: '数据加载中...', //数据加载时提示信息
        errormsg: '数据加载错误', //数据加载错误时信息
        validatemsg: '最多只能选择3项，若需要更换其它选项，请先点击取消部分选择结果。', //当大于limit规定的数量后弹出的警告框
        validatetitle: '提示信息', //效验警告框的标题
        nodatamsg: '暂无数据', //无数据时显示信息
        friendmsg: '好友：', //作为好友集合前面的标题        
        footmsg: '备注：好友选择', //底部左侧的提示信息
        tipmsg: '您的选择', //选择后的提示信息
        limit: 3, //限制选定几个好友
        areaokbtn: '确定', //确定按钮文字信息
        areacancelbtn: '取消'//取消按钮文字信息
    },
    // 好友选择器
    // callback 表示回调,回调函数参数为JSON格式字符串集合
    // option 为json格式的可选项的集合
    searchfriend: function (options, callback) {

        options = jQuery.extend({ modal: true, closeable: true, fixed: false },
                                options || {},
                                { show: true, unloadOnHide: true });
        options = $.extend(Boxy.fAreaSettings, options);

        //好友选择结果集合
        var arrfriendSelItems = new Array();
        var friendmain = jQuery('<div></div>').append('<div id="area-main"></div>').css("padding-bottom", "0");
        //获取好友主体句柄
        var main = jQuery("#area-main", friendmain);
        //好友主体的head/body/foot三部分
        var head = jQuery("<div id='area-head' style='margin-bottom:5px;display:none;'></div>").html("<div class='area-title' style='font-weight:bold;height:16px;line-height:16px;'>" + options.tipmsg + "</div><ul id='area-result'></ul>");
        var body = jQuery("<div id='area-body'></div>");
        var foot = jQuery("<div id='area-foot'><span id='area-msg'>" + options.footmsg + "</span><span id='area-cancel' >" + options.areacancelbtn + "</span><span id='area-submit'>" + options.areaokbtn + "</span></div>");
        //好友
        var friend = jQuery("<div id='pro-main'><div id='pro-text'><span>" + options.friendmsg + "</span></div><div id='pro-content'></div></div>");
        var friendContent = jQuery("#pro-content", friend);

        //好友主体内容附加
        body.append(friend);
        main.append(head).append(body).append(foot);

        new Boxy(friendmain, options);

        //初始化好友选项
        GetfriendItems();
        //设置好友项
        function GetfriendItems() {
            ajaxinfo("friend", "", friendContent);
        };

        //获取每个好友项的Html格式
        function friendOption(id, name) {
            var value = "<a id='proItem" + id + "' href='javascript:void(0);'><span style='padding-left: 5px;' id='proName" + id + "'>" + name + "</span></a>";
            return value;
        };
        var isinit = false;
        //更新显示选择的结果
        function showhead(isinit) {
            var element = jQuery("#area-result", head);
            //清空DOM中的选择结果
            element.empty();
            if (arrfriendSelItems.Length == 0) {
                head.slideUp(400);
            }
            else {
                if (isinit) {
                    head.show();
                }
                else {
                    head.slideDown(400);
                }
                var items = "";

                //循环添加省/市/区被选择项
                for (var i = 0; i < arrfriendSelItems.length; i++) {
                    items += "<li class='jobResultItem'><div class='result-pad-left'></div><span id='proSel" + arrfriendSelItems[i].id + "' >" + arrfriendSelItems[i].name + "</span></li>";
                }
                if (items != "") {
                    element.append(items);
                    //为新添加项注册事件
                    jQuery(".jobResultItem", element).click(function (event) {
                        var ele = jQuery(event.target);
                        if (ele.attr("class") && ele.attr("class") == "jobResultItem") {
                            DelAreaSelItem(event);
                            showhead();
                        }
                    });
                }
            }
        };
        //从选择结果集合中移除指定项
        function DelAreaSelItem(event) {
            var ele = jQuery(event.currentTarget);
            var areaData = jQuery("span", ele).attr("id").split("Sel");
            var Items = new Array();
            switch (areaData[0]) {
                case "pro":
                    for (var i = 0; i < arrfriendSelItems.length; i++) {
                        if (arrfriendSelItems[i].id != areaData[1]) {
                            Items.push(arrfriendSelItems[i]);
                        }
                    }
                    arrfriendSelItems = Items;
                    break;
            }
        };

        //好友项点击事件
        function friendClickListener(event) {
            var proId = $(event.currentTarget).attr("id").split("Item")[1];
            var friendname = jQuery("#proName" + proId, friendContent).text();
            isinit = true;
            if (arrfriendSelItems.Length <= options.limit) {
                Boxy.alert(options.validatemsg, null, { title: options.validatetitle });
            }
            else {
                for (var i = 0; i < arrfriendSelItems.length; i++) {
                    if (arrfriendSelItems[i].id != proId) {
                        arrfriendSelItems.push(new friendclass(proId, friendname));
                    }
                }
            }
            showhead(isinit);
        };
        //css设置hover样式在IE没什么效果，所以用程序设置
        var linkStyle = jQuery("a", body);
        linkStyle.hover(function (event) {
            jQuery(event.currentTarget).addClass("hoverStyle");
        }, function (event) {
            jQuery(event.currentTarget).removeClass("hoverStyle");
        });
        //提交事件
        jQuery("#area-submit", foot).click(function () {
            //好友
            if (arrfriendSelItems.Length <= options.limit) {
                var data = '{"friend":[';
                var tmpitems = '';
                for (var i = 0; i < arrfriendSelItems.length; i++) {
                    tmpitems += '{"id":"' + arrfriendSelItems[i].id + '","name":"' + arrfriendSelItems[i].name + '},';
                }
                tmpitems = tmpitems.substring(0, tmpitems.length - 1);
                data = data + tmpitems + ']}';
                data = jQuery.parseJSON(data);
                //返回选择结果
                var clicked = this;
                Boxy.get(this).hide(function () {
                    if (callback) callback(data);
                });
            }
            else {
                Boxy.alert(options.validatemsg, null, { title: options.validatetitle });
            }
        });

        //关闭选择器
        jQuery("#area-cancel", foot).click(function (event) {
            //隐藏工作地区选择器
            Boxy.get(this).hide();
        });
        //通用读取后台数据
        function ajaxinfo(otype, id, divid) {
            $.ajax({
                url: 'area_common.axd',
                type: 'POST',
                dataType: "json",
                async: true,
                data: "{opertype:'" + otype + "',id:'" + id + "'}",
                cache: false,
                timeout: 60000,
                beforeSend: function () {
                    divid.html(options.loadmsg);
                },
                error: function () {
                    divid.html(options.errormsg);
                },
                success: function (data) {
                    divid.html("");
                    var items = "";
                    if (data.total > 0) {
                        //将所有好友项添加到页面
                        $.each(data.rows, function (i) {
                            items += friendOption(data.rows[i].user_id, data.rows[i].name);
                        });
                        divid.append(items);
                        //添加好友选择项触发事件
                        jQuery("a", divid).click(function (event) {
                            friendClickListener(event);
                        });
                    }
                    else {
                        divid.append(options.nodatamsg);
                    }
                }
            })
        };
    }
});