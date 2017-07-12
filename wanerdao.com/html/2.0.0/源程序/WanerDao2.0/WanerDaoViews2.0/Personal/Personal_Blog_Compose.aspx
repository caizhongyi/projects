<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog_Compose.aspx.cs" Inherits="Personal_Personal_Blog_Compose" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>修改，发布个人日记-个人-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="修改，发布个人日记，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改，发布个人日记" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/personal.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/plugin/Share/Share.css" rel="stylesheet" type="text/css" />
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
                <li><a href="javascript:;" class="tagf">发表修改日志</a></li>
                <li><a href="blog_set.html">页面设置</a></li>
                <li><a href="blog_manage.html">日志管理</a></li>
            </ul>
        </div>
        
        <div class="log_postinfo">
            <ul>
                <li class="log_Ptit"><label>标题：</label>&nbsp;<input type="text" class="text" style="width:280px;"  id="txtTitle" maxlength="60"/></li>
                <li class="log_Pweath">
                	<label>&nbsp;&nbsp;</label>
                    <input style=" margin-left:30px; margin-right:5px;" name="" type="checkbox" value="" class="inp01" id="chkShowWeather" /><label for="chkShowWeather">显示天气：</label><span id="weather" style="display: none; cursor: pointer;">选择天气</span>
                    <input type="checkbox" value="" class="inp01" id="chkShowLocaiton"><label for="chkShowLocaiton">显示发表地：</label><input type="text" class="text" style="width:200px;" id="txtLocation"/>
                </li>
                <li class="log_Pcon">
                    <label>内容：</label>
                    <textarea name="" cols="" rows="" class="text mes_com_send_con" id="txtContent"></textarea>
              </li>
                <li class="log_save">
                    <input name="saveDraft" type="checkbox" value="" class="v_top1"  id="saveDraft"><label for="saveDraft">保存一份到草稿箱</label>
                  
                    <div class="save_draft_alert stip" style=" display: none;" >
                        
                    </div>
                </li>
                <li class="log_qx">
                    <label>权限：</label><select id="selectPermission"></select>
                    <label>分类：</label><select id="selectCat" style=" width: 120px"><option value="">添加新分类</option></select>&nbsp;<input type="text" class="text" id="txtNewCat" maxlength="50" style=" width:120px;" />
                    <input type="hidden" id="sharetoactivity" />
                    <input type="hidden" id="sharetogroup" />
                    <input type="hidden" id="sharetoinfor" />
                </li>
                <li class="sharetools" style=" margin-left:40px;">
                </li>         
                <li>
                    <div class="black10"></div><div class="black10"></div><div class="black10"></div>
                    <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="预览后发布" id="btnPreview">
                    <input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="取 消" id="btnCancel">
                </li>
            </ul>
        </div>
        
        
         <div class="log_show clearfix" style=" display:none;">
                    
                </div>
    </div>
</div>
<div class="mes_main_bot"></div>
<!--mes_main-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script type="text/javascript" src="/scripts/openplugin/jquery.floatbox.js"></script>
    <script type="text/javascript" src="/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/pagination/wanerdao2.pager.js"></script>
    <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
    <script src="../scripts/plugin/Share/wanerdao2.sharetools.js" type="text/javascript"></script>
    <script src="../scripts/plugin/Weather/wanerdao2.weather.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/blog_compose.js" type="text/javascript"></script>
</asp:Content>

