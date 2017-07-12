<%@ Page Title="玩儿道,最好玩最贴心的生活社交网络，发现活动，组织活动，简单开始" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master"
    AutoEventWireup="true" CodeFile="Personal_Home.aspx.cs" Inherits="Personal_Personal_Home" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta name="keywords" content="编辑个人相片，个人，玩儿道，生活社交网络" />
    <meta name="description" content="修改个人相片的名字，描述，顺序，设置首页等信息" />
    <title>玩儿道,最好玩最贴心的生活社交网络，发现活动，组织活动，简单开始</title>
    <link href="../style/layout.css" rel="stylesheet" type="text/css" />
    <link href="../style/homes.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/pop.css" rel='stylesheet' type="text/css" />
    <style type="text/css">
        /*.tooltip
        {
            display: none;
            background: transparent url(/images/black_arrow.png);
            font-size: 12px;
            height: 7px;
            width: 16px;
            padding: 25px;
            color: #eee;
        }*/
        .tooltip
        {
            cursor: pointer;
        }
        #tooltip
        {
            position: absolute;
            border: 1px solid #333;
            background: #f7f5d1;
            padding: 2px 5px;
            color: #333;
            display: none;
        }
        /* 超过的字以...显示 */
        .ellipsis
        {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            -o-text-overflow: ellipsis;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
        }
        /* end 超过的字以...显示 */
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="home-content">
        <div class="side">
            <div class="equal">
                <div class="datepicker datepicker-ui clearfix" style="margin: auto;">
                    <div class="tabs left">
                        <a href="#" class="day">日</a> <a href="#" class="week">周</a> <a href="#" class="month datepicker-ui current">
                            月</a>
                    </div>
                    <div class="datepanel">
                        <div class="week datepicker-ui">
                            <span>日</span><span class="current datepicker-ui">一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                        </div>
                        <div class="clearfix">
                            <table class="left">
                            </table>
                            <div class="page">
                                <a href="#" class="prev datepicker-ui"></a><a href="#" class="next datepicker-ui">
                                </a>
                            </div>
                            <span class="month">12</span>
                        </div>
                    </div>
                </div>
                <div class="join">
                    <span class="invite">快邀请您的朋友一起参加玩儿道！</span> <!--<a href="javascript:void(0);" class="join-submit">
                    </a>-->
                </div>
                <div class="sidebox recentVisitor">
                    <div class="hd clearfix">
                        <h3>
                            最近来访<span>（<span class="total">0</span>）</span></h3>
                        <div class="pager">
                            <a href="javascript:;" class="prev-disable prev"></a><a href="javascript:;" class="next">
                            </a>
                        </div>
                    </div>
                    <div class="bd">
                        <ul class="clearfix">
                        </ul>
                    </div>
                </div>
                <div class="sidebox possibleFriends">
                    <div class="hd clearfix">
                        <h3>
                            您可能认识的朋友<span>（<span class="total">0</span>）</span></h3>
                        <div class="pager">
                            <a href="javascript:;" class="prev-disable prev"></a><a href="javascript:;" class="next">
                            </a>
                        </div>
                    </div>
                    <div class="bd">
                        <ul class="clearfix">
                        </ul>
                    </div>
                </div>
                <div class="sidebox rightRecomm">
                    <div class="hd clearfix">
                        <h3>
                            活动推荐<span>(<span class="rightRecommCount">0</span>)</span></h3>
                    </div>
                    <div class="bd">
                        <div class="boxpager clearfix">
                            <!-- prev next -->
                            <a href="javascript:;" class="prev-disable jcarousel-prev"></a><a href="javascript:;"
                                class="next-disable jcarousel-next"></a>
                            <div class="jcarousel-clip" style="overflow: hidden">
                                <style type="text/css">
                                    .boxpager .jcarousel-list li
                                    {
                                        width: 185px;
                                        height: auto;
                                        margin: 0;
                                    }
                                </style>
                                <ul class="jcarousel-list">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sidebox areabox">
                    <div class="hd clearfix">
                        <a href="javascript:void(0)" class="cur aroundAct">周边</a><a href="javascript:void(0)"
                            class="interestingAct">感兴趣</a><a href="javascript:void(0)" class="followAct">关注</a>
                    </div>
                    <div class="bd">
                        <div class="areabox-content">
                            <div class="selectArea">
                                <input type='text' id='country' rel='#tt' />
                            </div>
                            <ul class="arealist">
                            </ul>
                            <div class="sidepage">
                                <a class="prev-disabled prev" href="javascript:void(0);"></a><span class="currPage">
                                    0</span>/<span class="totalPage">0</span><a href="javascript:void(0);" class="next-disabled  next"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="tabs box clearfix" data-el="tabs" data-isauto="true">
                <ul class="tabs-nav activityPanel">
                </ul>
                <ul class="tabs-panel activityMain">
                </ul>
            </div>
            <div class="commentbox box" data-el="tabs" data-effect="normal">
                <div class="panel-box">
                    <ul class="tabs-panel">
                        <li class="status" style="display: none;">
                            <div id="spetit_word">
                            </div>
                            <textarea id="p_qa_content"></textarea></li>
                        <li class="pic" style="display: none;">
                            <label>
                                图片:</label><input type="text" class="text" id="uploadImgUrl"/><a href="javascript:void(0);" id="aButtonPlaceholder" class="upload">上传</a><br />
                            <br />
                            <label>
                                描述:</label><textarea id="uploadImgDesc"></textarea>
                        </li>
                        <li class="link" style="display: none;">
                            <label>
                                链接:</label><input type="text" class="text" id="linkUrl" /><br />
                            <br />
                            <label>
                                描述:</label><textarea id="linkContent"></textarea>
                        </li>
                        <li class="vedio" style="display: none;">
                            <label>
                                视频链接:</label><input type="text" class="text" id="vedioUrl"/><span class="red">支持优酷,土豆</span><br />
                            <br />
                            <label>
                                描述:</label><textarea id="vedioDesc"></textarea>
                        </li>
                    </ul>
                </div>
                <div class="clearfix" style="position: relative; z-index: 4;">
                    <div class="left">
                        <em>共享:</em>
                        <div class="tabs-nav">
                            <a class="status" href="javascript:;">
                                <img alt="" src="../images/home/arrowhead_bottom.png" />状态</a><a href="javascript:;"
                                    class="pic"><img alt="" src="../images/home/arrowhead_bottom.png" />图片</a><a href="javascript:;"
                                        class="link"><img alt="" src="../images/home/arrowhead_bottom.png" />链接</a><a href="javascript:;"
                                            class="vedio"><img alt="" src="../images/home/arrowhead_bottom.png" />视频</a>
                        </div>
                    </div>
                    <div class="right">
                        <a href="#" class="right">权限</a><input type="submit" class="submit" value="发布" /></div>
                </div>
            </div>
            <div class="subChaTab pt20 clearfix">
                <div class="left" id="stateTab">
                    <a href="javascript:;" class="active">最新状态</a> <a href="javascript:;">留言</a> <a href="javascript:;">
                        圈子</a> <a href="javascript:;">活动</a>
                    <%--<a href="javascript:;">资道</a>--%>
                </div>
                <div class="options">
                    <a href="javascript:;" class="ref"></a><a href="javascript:;" class="set"></a>
                </div>
            </div>
            <ul class="comments" id="statelist">
            </ul>
            <div class="loading">
            </div>
            <div class="morebar" style="display: none">
                显示更多好友更新>></div>
        </div>
    </div>
    <div class="mFoot">
    </div>
</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="Script">
    <script type="text/javascript" src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js"></script>
    <script src="../Scripts/Plugin/personal/wanerdao2.personalInfo.js" type="text/javascript"></script>
    <script src="../Scripts/home/userstate.js" type="text/javascript"></script>
    <script type="text/javascript" src="/Scripts/Plugin/Area/wanerdao2.area.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
    <script type="text/javascript" src="/Scripts/wanerdao.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/tooltip.js"></script>
    <script type="text/javascript" src="../scripts/common/json2.js"></script>
    <script type="text/javascript" src="/Scripts/person/home_calendar.js"></script>
    <script type="text/javascript" src="/Scripts/person/personal_home.js"></script>
    <script type="text/javascript" src="/scripts/OpenProjectPlugin/jquery.jcarousel.min.js"></script>
    <script type="text/javascript" src="/Scripts/home/czy.ui.js"></script>
    <script type="text/javascript"src="../Scripts/Plugin/Ablum/swfupload.js"></script>
    <script type="text/javascript" src="../Scripts/Plugin/Ablum/swfupload.queue.js"></script>
    <script type="text/javascript" src="../Scripts/person/photo_upload_handler.js"></script>
    <script type="text/javascript">
        (function () {
            $('.comments .replay-content').hide();
            $('.comments .replay').click(function () {
                $(this).parentsUntil('li').find('.replay-content').animate({ height: 'toggle' })
            })

            $(window).load(function () {

                var minHeight = 20;
                var norHeight = 100;
                $('.panel-box').click(function () {
                    var _this = this;
                    $(this).stop(true, true).animate({ height: norHeight }, function () {
                        $(_this).children().fadeIn();
                    });
                }).hover(function () { }, function () {
                    //var _this = this;
                    //$(this).children().fadeOut(function(){
                    //	$(_this).stop(true,true).animate({height:minHeight});
                    //});

                }).height(minHeight).children().hide();
            })


            /*var areabox = $('.areabox');
            $('.hd > a', areabox).click(function () {
            $('.hd > a', areabox).removeClass('cur');
            temp = $(this).addClass('cur');
            var contents = $('.bd > .areabox-content', areabox);
            contents.hide();
            contents.eq($(this).index()).stop(true, true).fadeIn();
            })*/


            /*
            function mycarousel_itemLoadCallback(carousel, state) {
            // Check if the requested items already exist
            if (carousel.has(carousel.first, carousel.last)) {
            return;
            }

            jQuery.get(
            'dynamic_ajax_php.php',
            {
            first: carousel.first,
            last: carousel.last
            },
            function (xml) {
            mycarousel_itemAddCallback(carousel, carousel.first, carousel.last, xml);
            },
            'xml'
            );
            };

            function mycarousel_itemAddCallback(carousel, first, last, xml) {
            // Set the size of the carousel
            carousel.size(parseInt(jQuery('total', xml).text()));

            jQuery('image', xml).each(function (i) {
            carousel.add(first + i, mycarousel_getItemHTML(jQuery(this).text()));
            });
            };
            */
            /**
            * Item html creation helper.
            
            function mycarousel_getItemHTML(url) {
            return '<img src="' + url + '" width="75" height="75" alt="" />';
            };
            jQuery(document).ready(function () {
            jQuery('.boxpager').jcarousel({
            });
            });
            */
        })()
    </script>
</asp:Content>
