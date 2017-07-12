<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_blog_view.aspx.cs" Inherits="personal_personal_blog_view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>View diary-Personal-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="View diary, Personal, Savorboard, Life and social network" />
<meta name="description" content="View diary and publish comments" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
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
         <%if (isCurUser)
                  { %>
				<div class="log_tab clearfix mb12">
                     	<ul>
                        	<li><a href="javascript:void(0);" class="tagf">Read</a></li>
                            <li><a href="blog_compose.html">Publish</a></li>
                            <li><a href="blog_set.html">Page Setting</a></li>
                            <li><a href="blog_manage.html">Management</a></li>
                        </ul>
                </div>
                <script type="text/javascript">
                    var self = true;
                </script>
                <%} 
                else
                { %>
                <script type="text/javascript">
                    var self = false;
                </script>
                <%} %>
        <div class="black10"></div>
        
        <div class="log_viewinfo">
        </div>
        
    </div>
</div>
<div class="mes_main_bot"></div>
    <div id="transmit" style="display: none"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/plugin/Weather/wanerdao2.weather.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script src="../scripts/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../scripts/plugin/transmit/wanerdao2.transmit.js" type="text/javascript"></script>
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/blog_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/blog_view.js" type="text/javascript"></script>
</asp:Content>

