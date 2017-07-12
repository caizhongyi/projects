<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog_Manage.aspx.cs" Inherits="Personal_Personal_Blog_Manage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>管理个人日记-个人-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="管理个人日记，个人，玩儿道，生活社交网络" />
<meta name="description" content="对个人日记进行修改，删除，重分类等管理操作，并能对分类进行重命名，删除，设定权限等操作" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/personal.css" rel="stylesheet" type="text/css"  media="all"/>
    <link href="../scripts/plugin/Share/Share.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../scripts/plugin/autocomplete/fgautocompelte.css" rel="stylesheet" type="text/css" media="all" />
 <link rel="stylesheet" type="text/css" href="/css/pop.css" media="all" />
 <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.21/themes/ui-lightness/jquery-ui.css"  media="all" />
 <link rel="stylesheet" type="text/css" href="/css/plugin/timepicker/jquery-ui-timepicker-addon.css" media="all" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" media="all" />
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
                <li><a href="blog_set.html">页面设置</a></li>
                <li><a href="javascript:;" class="tagf">日志管理</a></li>
            </ul>
        </div>
        <div class="black10"></div>
        
        <div class="log_manage clearfix">
            <div class="log_manage_le">
                <dl class="per_blog_man_lsel">
                    <dt>分类设置</dt>
                    <dd>
                    	<label>默认分类</label>
                        <select name="select" style="width:140px;" id="selectCat">
                        </select>
                    </dd>
                    <dd>
                    	<label>默认权限</label>
                        <select name="select" style="width:140px;" id="selectPermission">
                        </select>
                    </dd>
                    <dd class="mt15"><input name="" type="text" class="inp09" id="newcat" value="新建分类" inputdefault="新建分类" ><input name="" type="button" class="inp10" value="新建" id="createCat"></dd>
                </dl> 
                <ul id="blogcat">
                    
                   
                </ul> 
            </div>
            <div class="log_manage_ri">
                <div class="log_manage_Rxl" >
                    <div class="Rxl_le">
                    <label>时间</label>
                        <input type="text" class="text" style=" height:22px;" id="time1" readonly="readonly"/>
                        -
                        <input type="text" class="text" style=" height:22px;" id="time2" readonly="readonly" />
                       <label>分类</label>
                        <select style="width:150px;" id="sCat">
                        <option value="">选择分类</option>
                        </select>
                       <input type="text" class="text" style="width:140px; height:22px;" id="key"/>
                        <input  type="button" class="inp14" value="搜索" id="srhButton">
                    </div>
                </div>
                    <div class="pageList"></div>
                <div class="log_manage_Rlist">
                <div style=" clear: both;"></div>
                    <ul id="content">
                        
                    </ul>
                    <div class="page_end">
                        <div class="pageList  f_right"></div>

                        <div class="page_end_le" id="tools">
                           
                        </div>
                    </div>
                </div>
            </div>
		</div>
        
    </div>
</div>
<div class="mes_main_bot"></div>
<!--mes_main-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script type="text/javascript" src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script src="../scripts/plugin/CustomPermission/wanerdao2.custompermission.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/plugin/autocomplete/fgautocompelte.js" type="text/javascript"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery-ui-timepicker-addon.js"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>    
    <script src="../scripts/personal/blog_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/blog_manage.js" type="text/javascript"></script>
</asp:Content>

