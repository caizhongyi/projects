    var fid ="0"; //当前相册ID
    if (getQueryString("fid") != null && getQueryString("fid") != "undefined") {
        fid = getQueryString("fid");
    }
    var setLayerCount = "2"; //回复层数
    var commentCount = '5'; // 每一层回复显示个数
    var currentPhtoId = "";
    var picsJson=""
    $(function () {
        $.ajax({
            url: "photo_common.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getactivityimagebyfoldid', fold_id:'" + fid + "'}",
            error: function (data) { },
            success: function (data) {
                $.each(data.rows, function (i, msg) {
                    var comma = ",";
                    if (i == "0") { comma = ""; getLeavmessage(msg.id); }
                    picsJson += (comma + "{\"thumbPicUrl\":\"" + msg.image_small_path + "\",\"middlePicUrl\":\"" + msg.image_path + "\",\"id\":\"" + msg.id + "\"}");
                });
                picsJson = "{\"pics\":[" + picsJson + "]}";
                picsJson = jQuery.parseJSON(picsJson);
                var autoPalyer = new AutoPlayer({
                    "baseUrl": "#",
                    "tag": "",
                    "screenId": "screen",
                    "altId": "alt",
                    "defaultAlt": "相册游览",
                    "navId": "nav",
                    "butPlayId": "butPlay",
                    "butPauseId": "butPause",
                    "butStopId": "butStop",
                    "playStatusId": "playStatus",
                    "butPrevId": "butPrev,topPrev",
                    "butNextId": "butNext,topNext",
                    "butPrevGroupId": "butPrevGroup",
                    "butNextGroupId": "butNextGroup",
                    "butPrevLinkId": "butPrevLink",
                    "butNextLinkId": "butNextLink",
                    "butExamineId": "butExamine",
                    "pvCounterId": "span_count",
                    "butSpeedGroupId": "speedGroup",
                    "showTotalId": "showTotal",
                    "showPageId": "showPage",
                    "showSourceId": "showSource",
                    "showSourceCompositeId": "showSourceComposite",
                    "data": picsJson["pics"],
                    "curId": 2531086,
                    "picFilter": "",
                    "curUrl": ""
                });
            }
        });

    });

   

    function getphotoinfor(pid) {
        currentPhtoId = pid;
        getLeavmessage(pid);
   }
    function getLeavmessage(pid) {
        $("#huifuid").myPagination({
            currPage: 1,
            callback: getContent,
            cssStyle: 'noll',
            sidebarpage: true,
            ajax: {
                param: {
                    pageSize: 5,
                    opertype: 'leavesinglemessage',
                    SetLayer: setLayerCount, //设置显示层数
                    CommentCount: commentCount, //每一层回复显示个数
                    active_posts_id: pid
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
                showpageno: false,
                tipmsg: '第{tip}页',
                msg_on: false,
                link: '#',
                msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
                text: {
                    width: '22px'
                }
            }

        });

        function getContent(data) {
            //$('#totalMesage').html('(' + data.total + '条留言)');
            var strContent = "";
            strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));  
            $('#messageContent').html(strContent);

        }

       
        
        function appendHtml(Data, currentLayer, showLayer) {
            var strContent = "";
            if (parseInt(currentLayer) < parseInt(showLayer)) {
                $.each(Data, function (i, msg) {
                    strContent += ("<div class=\"hdpj_g_box\">");
                    strContent += ("<ul>");
                    strContent += ("<li>");
                    strContent += ("<span class=\"hd_pj_leftex\"><a href=\"#\" class=\"blue\">" + msg.username + "</a>&nbsp;&nbsp;<a href=\"#\">&nbsp;</a> <i style=\"display:none;\" class=\"page_state_wd\">[已读]</i></span>");
                    strContent += ("</li>");
                    strContent += ("<li>" + msg.content + "</li>");
                    strContent += ("<li class=\"oInfo\">");
                    strContent += ("<p class=\"replyOpera\">");
                    rowsDate = msg.rows;
                    oneDate = "0";
                    varRowTotalCount = "0";
                    if (rowsDate != null && rowsDate != "") {
                        oneData = $.parseJSON(rowsDate);
                        varRowTotalCount = oneData.rowCount
                    }
                    strContent += ("<a href=\"javascript:void(0);\" class=\"ico_1\"  onclick=\"showDetReply(this)\" title=\"展开\">(" + varRowTotalCount + ")</a>");
                    //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_2\" title=\"标题\"></a>");
                    //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_3\" title=\"标题\"></a>");
                   //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_4\" title=\"标题\"></a>");
                    //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_5\" title=\"标题\"></a>");
                    strContent += ("</p>");
                    strContent += ("<span class=\"pTime\">" + msg.createdate + "</span>");
                    strContent += ("</li>");
                    strContent += ("</ul>");
                    strContent += ("<div class=\"pl_yuedu\"><a href=\"#\"><img src=\"../images/talk_peo_img.png\" width=\"50\" height=\"50\" /></a></div>");
                    strContent += ("<div class=\"hd_picpl_box_con hidden\">");
                    strContent += ("<div class=\"hd_picpl_box\">");
                    strContent += ("<ins></ins>");
                    strContent += ("<div class=\"hd_picpl_mid\" style='margin:0 40px 0 40px;width:760px;'>");
                    strContent += ("<div class=\"picpl_form_box\">");
                    strContent += ("<div>");
                    strContent += ("<input type=\"text\" name=\"textfield\" id=\"textTwofield\" class=\"picpl_hf_kuang\" hidefocus=\"ture\" style=\"outline:none;\"/>");
                    strContent += ("<input type=\"button\" name=\"button\" onclick=\"twoLeavelHuifu('" + msg.id + "')\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
                    strContent += ("<input type=\"button\" name=\"button2\" id=\"buttonTwoCancel\" value=\"取消\" class=\"picpl_hf_an02\"tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'\"  onfocus=\"this.blur()\"/>");
                    strContent += ("</div>");
                    strContent += ("</div>");
                    rowsDate = msg.rows;
                    if (rowsDate != null && rowsDate != "") {
                        $.each(oneData.data, function (j, oneMsg) {
                            active_posts_id = oneMsg.active_posts_id;
                            follow_id = oneMsg.follow_id;
                            strContent += ("<div class=\"picpl_huif_box\">");
                            strContent += ("<div class=\"huif_left\"><img src=\"../images/talk_peo_img.png\" width=\"37\" height=\"37\" /></div>");
                            strContent += ("<div class=\"huif_right\" style=\"width:710px;\">");
                            strContent += ("<div class=\"huif_text\">");
                            strContent += oneMsg.content;
                            strContent += ("</div>");
                            strContent += ("<div class=\"huif_line\">");
                            strContent += ("<span class=\"huif_time\">" + oneMsg.createdate + "</span>");
                            strContent += ("<span class=\"huif_huif\"><a href=\"#\">回复</a></span>");
                            strContent += ("<span class=\"huif_delete\"><a href=\"#\">删除</a></span>");
                            strContent += ("</div>");
                            strContent += ("</div>");
                            strContent += ("</div>");
                        });
                        strContent += ("<div class=\"huif_more\">");
                        strContent += ("<div class=\"huif_colse_an\"><a href=\"###\" onclick=\"hideDetReply(this);\">收起</a></div>");
                        strContent += ("<div class=\"huif_open_an\"><a href=\"###\"  onclick=\"outspreadContent(this,'" + varRowTotalCount + "','" + active_posts_id + "','" + follow_id + "')\">更多回复</a></div>");
                        strContent += ("</div>");
                    }
                        strContent += ("</div>");
                        strContent += ("</div>");
                        strContent += ("</div>");
                    strContent += ("<div class=\"xia_b_xian\"></div>");
                    strContent += ("</div>");
                });
            }
            return strContent;
        }
    }

    $(".hdpj_g_box").live("mouseout", function () {
        $(this).removeClass("hdpj_mhover")
    }).live("mouseover", function () {
        $(this).addClass("hdpj_mhover")
    });

    $("a[type =hide]").live('click', function () {
        $(this).parent().hide();
        $parent = $(this).parent().prevAll();
        $.each($parent, function (i) {
            var currentIndex = $(this).index();
            if (currentIndex > parseInt(commentCount)) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        });
    });
    function showDetReply(obj) {
        var reObj = $(obj).parent().parent().parent().parent().find(".hd_picpl_box_con").eq(0)
        var fObj = reObj.parent();
        if (reObj.hasClass("hidden")) {
            $(obj).attr("title", "隐藏");
            reObj.removeClass("hidden");
            fObj.addClass("hdpj_on");
        }
        else {
            reObj.addClass("hidden");
            fObj.removeClass("hdpj_on");
            $(obj).attr("title", "展开")
        }
    }
    function hideDetReply(obj) {
        var reObj = $(obj).parent().parent().parent().parent().parent();
        var fObj = reObj.parent();
        reObj.addClass("hidden");
        fObj.removeClass("hdpj_on");
    }

    function outspreadContent(obj, rowTotalCount, active_posts_id, follow_id) {
        var strContent = "";
        $.ajax({
            url: "leavemessage_activity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'displayleavemessage',active_posts_id:'" + active_posts_id +
                    "',follow_id:'" + follow_id + "',offsetcount:" + commentCount +
                     ",rcount:" + parseInt(parseInt(rowTotalCount) - parseInt(commentCount)) + "}",
            error: function (data) { },
            success: function (data) {
                $.each(data.rows, function (i, msg) {
                    strContent += ("<div class=\"picpl_huif_box\">");
                    strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
                    strContent += ("<div class=\"huif_right\" style=\"width:710px;\" >");
                    strContent += ("<div class=\"huif_text\">");
                    strContent += msg.content;
                    strContent += ("</div>");
                    strContent += ("<div class=\"huif_line\">");
                    strContent += ("<span class=\"huif_time\">" + msg.createdate + "</span>");
                    strContent += ("<span class=\"huif_huif\"><a href=\"###\">回复</a></span>");
                    strContent += ("<span class=\"huif_delete\"><a href=\"###\">删除</a></span>");
                    strContent += ("</div>");
                    strContent += ("</div>");
                    strContent += ("</div>");
                });

                $(obj).parent().parent().prev().after(strContent);
                $(obj).hide();
            }
        });
    }
    function oneLeavalHuifu() {
      var textfield=$("#textfield").val().replace(/\s/g, "");
      if (textfield != "") {
          huifuAjax(currentPhtoId, "-1", textfield)
          $("#textfield").val("");
      }
      else {
          alert("请输入回复信息");
          $("#textfield").focus();
      }
    }

    function twoLeavelHuifu(follow_id) {
        var textfield = $("#textTwofield").val().replace(/\s/g, "");
        if (textfield != "") {
            huifuAjax(currentPhtoId, follow_id, textfield)
            $("#textTwofield").val("");
        }
        else {
            alert("请输入回复信息");
            $("#textTwofield").focus();
        }
    }
    $("input[type=button][class=picpl_hf_an02]").live("click",function () {
        $(this).parent().children("input").eq(0).val("");
    });

    function huifuAjax(active_posts_id,follow_id,content) {
        var pars = "{opertype:'insertactivitycomments',active_posts_id:'" + active_posts_id + "',follow_id:'" + follow_id + "',user_id:'" + wd_B.uin.uid + "',content:'" + content + "'}";
        $.ajax({
            url: "huifu_activity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: pars,
            error: function (data) { },
            success: function (data) {
                if (data.msg == "恭喜，保存成功") {
                    alert("恭喜，保存成功！");
                    getLeavmessage(currentPhtoId);
                }
            }
        });   
    }
