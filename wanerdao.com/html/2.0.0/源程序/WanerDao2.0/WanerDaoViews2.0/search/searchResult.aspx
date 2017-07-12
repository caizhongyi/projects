<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="searchResult.aspx.cs" Inherits="search_searchResult" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>搜索结果-玩儿道</title>
    <meta content="搜索结果，用户，玩儿道，生活社交网络" name="keywords" />
    <meta content="全站搜索结果分类显示用户" name="description" />
    <link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />
    <link href="/css/search.css" media="all" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="container layout">
        <div class="tabs">
            <div id="hint">
            </div>
            <div class="mes_com_box_Tab">
                <a class="active" href="javascript:;">搜索</a>
            </div>
            <div class="tabs-panel clearfix">
                <div class="searchbar clearfix">
                    <span class="search-textbox">
                        <input type="text" id="searchKey" /><input type="button" id="search" />显示<span class="allCount">0</span>个搜索结果</span>
                    <div class="pageList">
                        <a title="首页" href="javascript:;" class="first">首页</a><a title="上一页" href="javascript:;"
                            class="prev">上一页</a><input type="text" class="text currentPage" value="0">/<span
                                class="totalPage">0</span><a title="下一页" href="javascript:;" class="next">下一页</a><a
                                    title="尾页" href="javascript:;" class="last">尾页</a></div>
                </div>
                <ul class="sidenav">
                    <li class="cur" id="person"><a href="javascript:;">用户&nbsp;&nbsp;(<span class="searchCount">0</span>)</a></li>
                    <li id="group"><a href="javascript:;">圈子&nbsp;&nbsp;(<span class="searchCount">0</span>)</a></li>
                    <li id="activity"><a href="javascript:;" class="activity">活动&nbsp;&nbsp;(<span class="searchCount">0</span>)</a></li>
                    <%--<li><a href="javascript:;">帖子&nbsp;&nbsp;(<span class="searchCount">0</span>)</a></li>--%>
                </ul>
                <div class="main">
                    <ul class="results">
                    </ul>
                    <div class="pageList">
                        <a title="首页" href="javascript:;" class="first">首页</a><a title="上一页" href="javascript:;"
                            class="prev">上一页</a><input type="text" class="text currentPage" value="0">/<span
                                class="totalPage">0</span><a title="下一页" href="javascript:;" class="next">下一页</a><a
                                    title="尾页" href="javascript:;" class="last">尾页</a></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="../scripts/search/search.js"></script>
</asp:Content>
