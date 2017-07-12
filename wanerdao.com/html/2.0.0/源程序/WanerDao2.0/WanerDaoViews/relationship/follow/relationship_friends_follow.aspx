<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="relationship_friends_follow.aspx.cs" Inherits="relationship_follow_relationship_friends_follow" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>关注好友-关系-玩儿道</title>
    <meta name="keywords" content="关注好友，关系，玩儿道，生活社交网络" />
    <meta name="description" content="对添加关注的好友进行统一管理，并配置邮件或者站内信息通知" />
    <!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
    <link rel="stylesheet" type="text/css" href="/style/layout.css" />
    <link rel="stylesheet" type="text/css" href="/style/pers_rel.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/style/relationship.css" media="all" />
    <link href="/style/select_upload.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="mCon">
        <div class="prPdBox">
            <div class="subChaTab">
                <a href="/relationship/relationship_myfriends.html">我的好友</a> <a href="/relationship/relationship_friends_search.html">寻找好友</a> <a
                    href="/relationship/follow/follow_friends.html">关注设置</a> <a href="/relationship/relationship_mygroup.html">我的圈子</a> <a href="/relationship/relationship_group_search.html">
                        寻找圈子</a> <a href="/relationship/relationship_group_create.html">创建圈子</a> <a href="/relationship/relationship_gift_info.html">我的礼物</a>
                <a href="/relationship/relationship_gift_market.html">礼物市场</a>
            </div>
            <div class="clearfix">
                <div class="Fnavigation">
                    <ul>
                        <li><a href="follow_friends.html">关注人</a></li>
                        <li><a href="follow_group.html">关注圈子</a></li>
                        <!--<li><a href="follow_posts.html">关注帖子</a></li>-->
                        <li><a href="follow_activity.html">关注活动</a></li>
                        <!--<li><a href="follow_module.html">关注模块</a></li>-->
                        <li><a href="follow_myself.html">关注我的人</a></li>
                    </ul>
                </div>
                <div class="ColuTwo_wrap clearfix">
                    <div class="leftside">
                        <h4>
                            搜索好友</h4>
                        <div class="Serh_Div">
                            <input class="Stext he24 friendName" type="text" style="width: 123px;" />
                            <input type="button" class="prBtn search" value="搜 索" />
                        </div>
                    </div>
                    <div class="rCon">
                        <div class="pr_Tag">
                            <div class="prPageNav">
                                <ul>
                                    <li class="first"><a href="javascript:void(0);">首页</a></li>
                                    <li class="prev"><a href="javascript:void(0);">上页</a></li>
                                    <li>
                                        <select class="pageTop">
                                        </select>
                                    </li>
                                    <li class="next"><a href="javascript:void(0);">下页</a></li>
                                    <li class="last"><a href="javascript:void(0);">末页</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="search_result">
                            <ul>
                            </ul>
                        </div>
                        <div class="pr_Tag">
                            <div class="prPageNav">
                                <ul>
                                    <li class="first"><a href="javascript:void(0);">首页</a></li>
                                    <li class="prev"><a href="javascript:void(0);">上页</a></li>
                                    <li>
                                        <select class="pageButtom">
                                        </select>
                                    </li>
                                    <li class="next"><a href="javascript:void(0);">下页</a></li>
                                    <li class="last"><a href="javascript:void(0);">末页</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="server">
    <script type="text/javascript" src="/Scripts/relationship/Follow/friendsFollow.js"></script>
</asp:Content>
