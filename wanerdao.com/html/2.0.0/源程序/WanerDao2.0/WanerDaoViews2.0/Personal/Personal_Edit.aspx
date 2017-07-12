<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Edit.aspx.cs" Inherits="Personal_Personal_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>编辑个人信息-个人-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="编辑个人资料，基本信息，教育背景，工作背景，兴趣爱好，联系方式，个人，玩儿道，生活社交网络" />
<meta name="description" content="编辑个人资料的基本信息部分，教育背景，工作背景，兴趣爱好，联系方式" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/private.css" rel="stylesheet" type="text/css" />
    <link href="../css/personal.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../scripts/openplugin/imgareaselect/imgareaselect-default.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/plugin/autocomplete/fgautocompelte.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/plugin/personal/avatarUpload.css" rel="stylesheet" type="text/css" />
 <link rel="stylesheet" type="text/css" href="/css/pop.css" media="all" />
 <link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">

<div class="mes_main layout">
	<div class="mes_box clearfix">
		<div class="mes_box_left">
        	
            <div class="black10"></div>
            <div class="mes_com_box_Tab">
                     <a href="javascript:;" class="active" id="tab_zl">资料</a>
					 <a href="javascript:;" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
            </div>
            
            <div class="mainlist clearfix" >
                <div class="datum_hobby_le">
                    <ul>
                        <li id="show_basic"><a href="javascript:;">基本信息</a></li>
                        <li id="show_edubg"><a href="javascript:;">教育背景</a></li>
                        <li id="show_workbg"><a href="javascript:;">工作背景</a></li>
                        <li id="show_interest"><a href="javascript:;">兴趣爱好</a></li>
                        <li id="show_contacts"><a href="javascript:;">联系方式</a></li>
                    </ul>
                </div>
                <div class="datum_hobby">
                    
                </div>
            </div>
            
        </div>
		<div class="mes_box_right">
                    <div class="user_card">
                    	<h1></h1>
                         <div class="user_card_img">
                        </div>
                    </div>
                	<div class="user_bar">
                    	<ul>
                        	<li class="blue_tj"><label>资料完整度：</label><span id="integrity"></span></li>
                            <li><label>活跃度：</label><span id="activity"></span></li>
                            <li><label>关注度：</label><span id="follow"></span></li>
                            <li style=" display: none;"><label>爱心度：</label><span id="share"></span></li>
                            <li><label>经验度：</label><span id="experience"></span></li>
                        </ul>
                    </div>
                    <div class="user_flei">
                    	<ul>
                            <li class="clearfix"><label>星&nbsp;&nbsp;座：</label><span id="is_display_contellation_text">&nbsp;</span></li>
                            <li class="clearfix"><label>家&nbsp;&nbsp;乡：</label><span id="is_display_home_text">&nbsp;</span></li>
                            <li class="clearfix"><label>所在地：</label><span id="is_display_current_place_text">&nbsp;</span></li>
                            <li class="clearfix"><label>学&nbsp;&nbsp;校：</label><span id="is_display_school_text">&nbsp;</span></li>
                            <li class="clearfix"><label>工&nbsp;&nbsp;作：</label><span id="is_display_work_text">&nbsp;</span></li>
                        </ul>
                    </div>
        </div>
    </div>
</div>
<div class="mes_main_bot"></div>
<!--mes_main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/imgareaselect/jquery.imgareaselect.pack.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.overlay.js" type="text/javascript"></script>
    <script src="../scripts/plugin/autocomplete/fgautocompelte.js" type="text/javascript"></script>
    <script src="../scripts/plugin/autocomplete/wanerdao.complete.simple.js" type="text/javascript"></script>
    <script src="../scripts/plugin/personal/wanerdao.personAvatarUpload.js" type="text/javascript"></script>
    <script src="../scripts/plugin/CustomPermission/wanerdao2.custompermission.js" type="text/javascript"></script>
    <!--area--->
    <script src="../scripts/jquery.floatbox.js"></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/pagination/wanerdao2.pager.js"></script>
     <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
    <!--area end--->
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>

    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/persnal_edit.js" type="text/javascript"></script>

</asp:Content>

