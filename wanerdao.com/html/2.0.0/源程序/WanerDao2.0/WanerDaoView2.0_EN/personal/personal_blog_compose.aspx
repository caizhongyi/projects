<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_blog_compose.aspx.cs" Inherits="personal_personal_blog_compose" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Post diary-Personal-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Post diary, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit and publish diary" />

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
           <a href="javascript:;" id="tab_zl">Profile</a>
		    <a href="javascript:;" class="active" id="tab_rz">Diary</a>
		    <a href="javascript:;" id="tab_xc">Album</a>
		    <a href="javascript:;" id="tab_sp">Video</a>
        </div>
        <div class="black10"></div>
        <div class="log_tab clearfix mb12">
            <ul>
                <li><a href="blog.html">Read</a></li>
                <li><a href="javascript:;" class="tagf">Publish</a></li>
                <li><a href="blog_set.html">Page Setting</a></li>
                <li><a href="blog_manage.html">Management</a></li>
            </ul>
        </div>
        
        <div class="log_postinfo">
            <ul>
                <li class="log_Ptit"><label>Title：</label>&nbsp;<input type="text" class="text" style="width:280px;"  id="txtTitle" maxlength="60"/></li>
                <li class="log_Pweath">
                	<label>&nbsp;&nbsp;</label>
                    <input style=" margin-left:30px; margin-right:5px;" name="" type="checkbox" value="" class="inp01" id="chkShowWeather" /><label for="chkShowWeather">Display weather：</label><span id="weather" style="display: none; cursor: pointer;">Select weather</span>
                    <input type="checkbox" value="" class="inp01" id="chkShowLocaiton"><label for="chkShowLocaiton">Display Address：</label><input type="text" class="text" style="width:200px;" id="txtLocation"/>
                </li>
                <li class="log_Pcon">
                    <label>Content：</label>
                    <textarea name="" cols="" rows="" class="text mes_com_send_con" id="txtContent"></textarea>
              </li>
                <li class="log_save">
                    <input name="saveDraft" type="checkbox" value="" class="v_top1"  id="saveDraft"><label for="saveDraft">Save as a draft</label>
                  
                    <div class="save_draft_alert stip" style=" display: none;" >
                        
                    </div>
                </li>
                <li class="log_qx">
                    <label>Permission：</label><select id="selectPermission"></select>
                    <label>Category：</label><select id="selectCat" style=" width: 120px"><option value="">add new</option></select>&nbsp;<input type="text" class="text" id="txtNewCat" maxlength="50" style=" width:120px;" />
                    <input type="hidden" id="sharetoactivity" />
                    <input type="hidden" id="sharetogroup" />
                    <input type="hidden" id="sharetoinfor" />
                </li>
                <li class="sharetools" style=" margin-left:40px;">
                </li>         
                <li>
                    <div class="black10"></div><div class="black10"></div><div class="black10"></div>
                    <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="Preview and publish" id="btnPreview">
                    <input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="Cancel" id="btnCancel">
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

