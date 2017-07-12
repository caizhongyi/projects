<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="Search_Result.aspx.cs" Inherits="Search_SearchResult" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="../style/layout.css" rel="stylesheet" type="text/css" />
    <link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="mCon">
        <div class="subChaTab pt20">
            <a class="active">搜索</a>
        </div>
        <div class="searchbox clea1rfix">
            <div class="search_le">
                <input name="" class="sea_inp" type="text"/><!--<a href="#" class="sea_but"><img src="images/search_result_3.gif"></a>--><input
                    name="" class="sea_but search" type="button"/>
                <label>
                    显示<span class="totalCount">0</span>个搜索结果</label></div>
            <div class="alb_nav">
                <span class="first"><a href="javascript:void(0);">首页</a></span><span class="prev"><a href="javascript:void(0);">上一页</a></span><span><i
                    class="currentPage">0</i>/<i class="totalPage">0</i></span><span class="next"><a
                        href="javascript:void(0);">下一页</a></span><span class="last"><a href="javascript:void(0);">末页</a></span></div>
        </div>
        <div class="mainlist clearfix">
            <div class="listM_le">
                <ul>
                    <li id="current"><a href="javascript:void(0);" class="person">用户（<span class="searchCount">0</span>）</a></li>
                    <li><a href="javascript:void(0);" class="group">圈子（<span class="searchCount">0</span>）</a></li>
                    <li><a href="javascript:void(0);" class="activity">活动（<span class="searchCount">0</span>）</a></li>
                    <!--<li><a href="javascript:void(0);" class="posts">帖子（<span class="searchCount">0</span>）</a></li>-->
                </ul>
            </div>
            <div class="listM_ri">
                <ul>
                </ul>
                <div class="npage">
                    <div class="alb_nav">
                        <span class='viewMore'><a href="javascript:void(0);">显示更多</a></span><span class="first"><a href="javascript:void(0);">首页</a></span><span
                            class="prev"><a href="javascript:void(0);">上一页</a></span><span><i class="currentPage">0</i>/<i class="totalPage">0</i></span><span
                                class="next"><a href="javascript:void(0);">下一页</a></span><span class="last"><a href="javascript:void(0);">末页</a></span></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="Script">
    <script type="text/javascript" src="../Scripts/common/effect.js"></script>
    <script type="text/javascript" src="../Scripts/search/search.js"></script>
</asp:Content>
