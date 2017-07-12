<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="relationship_posts_follow.aspx.cs" Inherits="relationship_follow_relationship_posts_follow" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>关注帖子-关系-玩儿道</title>
    <meta name="keywords" content="关注帖子，关系，玩儿道，生活社交网络" />
    <meta name="description" content="对添加关注的帖子进行统一管理，并配置邮件或者站内信息通知" />
    <link href="/style/layout.css" rel="stylesheet" type="text/css" />
    <link href="/style/nav_info.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="mCon pr49">
        <!--#include virtual="../menuTop.htm"-->
        <!--#include virtual="tabTop.htm"-->
        <div class="follow_main clearfix pb50">
            <div class="follow_le">
                <h1>
                    搜索杂烩</h1>
                <input type="text" style="color: Black" class="inp15 subject" />
                <input type="button" class="inp16 search" value="搜&nbsp;&nbsp;索" />
            </div>
            <div class="follow_ri">
                <div class="follow_npage">
                    <div class="alb_nav">
                        <span class="first"><a href="#">首页</a></span> <span class="prev"><a href="#">上一页</a></span>
                        <select class="pageTop">
                        </select>
                        <span class="next"><a href="#">下一页</a></span> <span class="last"><a href="#">末页</a></span>
                    </div>
                </div>
                <div class="follow_list01">
                    <ul id="report_list">
                    </ul>
                </div>
                <div class="follow_npage btop mt10">
                    <div class="alb_nav">
                        <span class="first"><a href="#">首页</a></span> <span class="prev"><a href="#">上一页</a></span>
                        <select class="pageButtom">
                        </select>
                        <span class="next"><a href="#">下一页</a></span> <span class="last"><a href="#">末页</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="server">
    <script type="text/javascript" src="/Scripts/common/effect.js"></script>
    <script type="text/javascript" src="/Scripts/relationship/Follow/postsFollow.js"></script>
</asp:Content>