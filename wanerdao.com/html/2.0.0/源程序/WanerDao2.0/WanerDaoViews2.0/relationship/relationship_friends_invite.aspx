<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_friends_invite.aspx.cs" Inherits="relationship_relationship_friends_invite" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>邀请好友-关系-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="邀请好友，获取好友列表，关系，玩儿道，生活社交网络" />
<meta name="description" content="可以选择直接向好友发送邀请或者通过用户的某个邮箱获取相关好友的联系方式，统一发送邀请" />
<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">

<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">

        <div id="TopMenu"></div>
        
        <div class="searFsTip">快让你更多的朋友来玩儿道吧，同你快乐共分享</div>
        <div class="prTnvit_wrap">
            <div class="prT_name"><b></b>邀请信息寻友</div>
            <div class="bd">
                <div class="labTit">复制邀请：</div>
                <div class="dTbc">
                    <textarea name="" class="prTxaSty" id="txtInvited"  style="color:#999;" id="" cols="30" rows="10"> </textarea>
                    <div class="copy">
                        <input type="button" class="prBtn" value="复 制" onclick="copytext();"/>&nbsp;&nbsp;&nbsp;<span  id="copyMessage" style="display:none; color :Red" ></span>
                    </div>
                </div>
            </div>
        </div>
        

        
    </div>
</div>
<div class="mes_main_bot"></div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">


<script src="../scripts/jquery.chosen/jquery.chosen.js"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/friendsInvite.js" type="text/javascript"></script>
</asp:Content>

