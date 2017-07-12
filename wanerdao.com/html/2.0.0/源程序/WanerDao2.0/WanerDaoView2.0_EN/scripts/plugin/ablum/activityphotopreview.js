        var Request = new Object();
        Request = GetRequest();
        var currAlbumID = Request['fid']; //当前相册ID


        $(function () {
            $("#pageid").myPagination({
                currPage: 1,
                callback: test1,
                cssStyle: 'noll',
                sidebarpage: true,
                ajax: {
                    param: {
                        pageSize: 6,
                        opertype: 'getactivityimagebyfoldidforpage',
                        fold_id: currAlbumID

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
                    msg_on: true,
                    link: '#',
                    msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
                    text: {
                        width: '22px'
                    }
                }

            });
            function test1(data) {
                var strContent = "";
                $.each(data.rows, function (i, msg) {
                    strContent += "<li>";
                    strContent += "<div class=\"photo_album photo_photos\">";
                    strContent += "<a href=\"ActivityPhotoView.aspx?fid=" + currAlbumID + "&pid=" + msg.id + "\"><img src=" + msg.image_small_path + "/></a>";
                    strContent += "<div class=\"columnNews\">";
                    strContent += "<span class=\"floatLeft blog_diaryName\"> <a href=\"###\">" + msg.image_name + " </a></span>";
                    strContent += "<span class=\"floatRight subLink\"><a href=\"#\">编辑</a></span>";
                    strContent += " </div>";
                    strContent += "</div>";
                    strContent += "</li>";
                });
                $('#photo_albumUl').html(strContent);
            }

            $("#pgalbum").myPagination({
                currPage: 1,
                callback: test2,
                cssStyle: 'noll',
                ajax: {
                    param: {
                        pageSize: 16,
                        opertype: 'getactivityimagefolder',
                        searchType: "11",
                        userIds: "111111",
                        activityIds: "111111",
                        isSearchBlock: "",
                        orderByFileds: "",
                        sort: "",
                        pagecurrent: "1",
                        pageSize: "10"
                    }
                },
                info: {
                    first: '首页',
                    last: '尾页',
                    next: '下一页',
                    prev: '上一页',
                    first_on: false,
                    last_on: false,
                    next_on: false,
                    prev_on: false,
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
            function test2(data) {
                var strContent = "<li class=\"allclear\" style=\"margin: 0px;\"></li>";
                var strListyle = "";
                $.each(data.rows, function (i, msg) {

                    if (msg.id == currAlbumID) {
                        strListyle = " class=\"active\"  ";
                        $("#imgPage").html("<img  src=" + msg.image_path + " style=\"border-width:0px;\">");
                    }
                    else { strListyle = " onclick=\"saveLi(this)\" "; }

                    strContent += "<li" + strListyle + ">";
                    strContent += "<div class=\"photo_album\">";
                    strContent += "<a href=\"ActivityPhotoPreview.aspx?fid=" + msg.id + "\" >";
                    strContent += "<img alt='' title=''   src=" + msg.image_small_path + " style=\"border-width:0px;\" />";
                    strContent += " </a>";
                    strContent += "<div class=\"columnNews\">";
                    strContent += "<span class=\"floatLeft blog_diaryName\" style=\"width:100%;\"><span class=\"orangecolor\">";
                    strContent += msg.image_count + "</span><span class=\"gray9\">(<span>0</span>)</span></span> <span class=\"txtFolderhide\" style=\"display: none\">";
                    strContent += " <input type=\"text\" style=\"width: 90px\" value=\"" + msg.image_count + "\" />";
                    strContent += "</span></div>";
                    strContent += " </div>";
                    strContent += "</li>";
                });
                strContent += ("<li  onclick=\"returnTop()\">");
                strContent += ("<div class=\"photo_album\">");
                strContent += ("<input type=\"image\"   src=\"../../images/PluginImages/Album/photo_frist.jpg\" style=\"border-width:0px;\" />");
                strContent += ("<div class=\"columnNews\">");
                strContent += ("<span class=\"floatLeft blog_diaryName\" style=\"width:100%;\"><span class=\"orangecolor\">");
                strContent += ("1</span><span class=\"gray9\">(<span  >0</span>)</span></span> <span class=\"txtFolderhide\" style=\"display: none\">");
                strContent += ("<input type=\"text\" style=\"width: 90px\" value=\"1\" />");
                strContent += ("</span></div>");
                strContent += ("</div>");
                strContent += ("</li>");
                $('#ULphotoFolder').html(strContent);
            };


        })
        function GetRequest() { 
            var url = location.search; //获取url中"?"符后的字串   
            var theRequest = new Object(); 
            if (url.indexOf("?") != -1) { 
                var str = url.substr(1); 
                strs = str.split("&"); 
                for (var i = 0; i < strs.length; i++) { 
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]); 
                } 
            } 
            return theRequest; 
        } 
        
 