<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="relationship_friends_follow.aspx.cs" Inherits="relationship_follow_relationship_friends_follow" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>关注好友-关系-玩儿道</title>
    <meta name="keywords" content="关注好友，关系，玩儿道，生活社交网络" />
    <meta name="description" content="对添加关注的好友进行统一管理，并配置邮件或者站内信息通知" />
    <link rel="stylesheet" type="text/css" href="/css/table.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/icon.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/form.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/scripts/jquery.chosen/jquery.chosen.css" />
    <link rel="stylesheet" type="text/css" href="/css/relationship.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/pager.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="mes_main layout">
        <div class="mes_box per_blog clearfix">
            <div class="black10">
            </div>
            <div class="black10">
            </div>
            <div class="black10">
            </div>
            <div id="TopMenu">
            </div>
            <div class="black10">
            </div>
            <div class="black10">
            </div>
            <div class="black10">
            </div>
            <div id="followMenu">
            </div>
            <div class="clearfix">
                <div class="ColuTwo_wrap clearfix">
                    <div class="leftside">
                        <div class="black10">
                        </div>
                        <div class="addGroup">
                            <h3 class="groupTit f14 follow_tit">
                                搜索朋友</h3>
                            <p>
                                <input type="text" class="text" style="width: 122px; color: #CCC;" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}"
                                    onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}"
                                    value="请输入朋友名称" id="searchStr" />
                                <input type="button" value="搜 索" class="prBtn" id="search" /></p>
                        </div>
                    </div>
                    <div class="rCon">
                        <div id="hint">
                        </div>
                        <div class="topNav">
                            <div class="pagewrap clearfix">
                            </div>
                        </div>
                        <div class="follow_list" id="content">
                        </div>
                        <div class="topNav bmNav clearfix">
                            <div class="pagewrap clearfix">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mes_main_bot">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="/scripts/jquery.chosen/jquery.chosen.js"></script>
    <script type="text/javascript" src="/scripts/common/wanerdaoutils.js"></script>
    <script type="text/javascript" src="/scripts/multiplelanguage/loader.js"></script>
    <script type="text/javascript" src="/scripts/plugin/pagination/wanerdao2.pager.js"></script>
    <script type="text/javascript" src="/scripts/relationship/relation_common.js"></script>
    <script type="text/javascript" src="/scripts/relationship/follow/friendsFollow.js"></script>
</asp:Content>
