<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_blog_set.aspx.cs" Inherits="personal_personal_blog_set" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Diary parameter settings-Personal-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Diary parameter settings, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit diary name and signature" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/personal.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">

<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        
        <div class="mes_com_box_Tab">
           <a href="javascript:;" id="tab_zl">Profile</a>
		    <a href="javascript:;" class="active" id="tab_rz">Diary</a>
		    <a href="javascript:;" id="tab_xc">Album</a>
		    <a href="javascript:;" id="tab_sp">Video</a>
        </div>
        <div class="black10"></div>
        <div class="log_tab clearfix mb12">
            <ul>
               <li><a href="blog.html">Read</a></li>
                <li><a href="blog_compose.html">Publish</a></li>
                <li><a href="javascript:;" class="tagf">Page Setting</a></li>
                <li><a href="blog_manage.html">Management</a></li>
            </ul>
        </div>
        <div class="black10"></div>
        
        <div class="log_add">
            <ul>
                <li><label>Diary name：</label><input type="text" class="text" style="width:500px;" id="txtBlogName" maxlength="50" /></li>
                <li><label class="v_top">Diary signature：</label><textarea name="" cols="" rows="" id="txtBlogDesc" class="text per_blogset_text" maxlength="300"></textarea></li>    
                <li>
                    <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14 ml_btn" id="btnSave" value="Save">
                    <%--<input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="Cancel" id="btnCancel">--%>
                </li>
            </ul>
        </div>
        
    </div>
</div>
<div class="mes_main_bot"></div>
<!--mes_main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/blog_set.js" type="text/javascript"></script>
</asp:Content>

