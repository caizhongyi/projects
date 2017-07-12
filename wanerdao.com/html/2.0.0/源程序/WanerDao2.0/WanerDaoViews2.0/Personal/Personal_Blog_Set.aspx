<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog_Set.aspx.cs" Inherits="Personal_Personal_Blog_Set" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>设定个人日记-个人-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="设定个人日记，个人，玩儿道，生活社交网络" />
<meta name="description" content="设定个人日记薄的薄名，签名等信息" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/personal.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">

<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        
        <div class="mes_com_box_Tab">
            <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" class="active" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
        </div>
        <div class="black10"></div>
        <div class="log_tab clearfix mb12">
            <ul>
               <li><a href="blog.html">查看日志</a></li>
                            <li><a href="blog_compose.html">发表修改日志</a></li>
                            <li><a href="javascript:;" class="tagf">页面设置</a></li>
                            <li><a href="blog_manage.html">日志管理</a></li>
            </ul>
        </div>
        <div class="black10"></div>
        
        <div class="log_add">
            <ul>
                <li><label>日志空间名：</label><input type="text" class="text" style="width:500px;" id="txtBlogName" maxlength="50" /></li>
                <li><label class="v_top">个人签名：</label><textarea name="" cols="" rows="" id="txtBlogDesc" class="text per_blogset_text" maxlength="300"></textarea></li>    
                <li>
                    <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14 ml_btn" id="btnSave" value="保 存">
                    <%--<input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="取 消" id="btnCancel">--%>
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

