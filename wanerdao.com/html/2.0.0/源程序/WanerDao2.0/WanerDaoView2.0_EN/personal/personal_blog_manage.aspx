<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_blog_manage.aspx.cs" Inherits="personal_personal_blog_manage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Diary maintenance-Personal-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Diary maintenance, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit, delete and re-category personal diary, rename and delete category and edit permission" />
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
                <li><a href="blog_set.html">Page Setting</a></li>
                <li><a href="javascript:;" class="tagf">Management</a></li>
            </ul>
        </div>
        <div class="black10"></div>
        
        <div class="log_manage clearfix">
            <div class="log_manage_le">
                <dl class="per_blog_man_lsel">
                    <dt>Category Settings</dt>
                    <dd>
                    	<label>Default category</label>
                        <select name="select" style="width:140px;" id="selectCat">
                        </select>
                    </dd>
                    <dd>
                    	<label>Default permission</label>
                        <select name="select" style="width:140px;" id="selectPermission">
                        </select>
                    </dd>
                    <dd class="mt15"><input name="" type="text" class="inp09" id="newcat" value="Add new category" inputdefault="Add new category" ><input name="" type="button" class="inp10" value="Add" id="createCat"></dd>
                </dl> 
                <ul id="blogcat">
                    
                   
                </ul> 
            </div>
            <div class="log_manage_ri">
                <div class="log_manage_Rxl" >
                    <div class="Rxl_le">
                    <label>Time</label>
                        <input type="text" class="text" style=" height:22px;" id="time1" readonly="readonly"/>
                        -
                        <input type="text" class="text" style=" height:22px;" id="time2" readonly="readonly" />
                       <label>Category</label>
                        <select style="width:120px;" id="sCat">
                        <option value="">category</option>
                        </select>
                       <input type="text" class="text" style="width:140px; height:22px;" id="key"/>
                        <input  type="button" class="inp14" value="Search" id="srhButton">
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

