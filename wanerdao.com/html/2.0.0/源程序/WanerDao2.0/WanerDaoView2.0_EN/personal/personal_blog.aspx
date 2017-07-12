<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_blog.aspx.cs" Inherits="personal_personal_blog" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Diary-Personal-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Diary, Personal, Savorboard, Life and social network" />
<meta name="description" content="View diary by date or cateogry" />

    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
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
                        	<li><a href="javascript:;" class="tagf">Read</a></li>
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
        <div class="log_manage clearfix">
            <div class="log_manage_le">
                <div class="log_manage_Lin">
                    <input name="sText" type="text" class="inp09" id="sText"><input name="srhcode" id="srhcode" type="button" class="inp10" value="Search">
                </div>
                <dl style=" display: none;">
                    <dt class="mb5">Category</dt>
                    <dd class="m0">
                    <ul class="mt0" id="articlecat">

                    </ul> 
                </dd>
                </dl> 
                <dl class="mt10" style=" display: none;">
                    <dt class="mb5">Date category</dt>
                    <dd class="m0">
                    <ul class="mt0" id="datecat">
                </ul> 
                    
                    </dd>
                </dl>
            </div>
            <div class="log_manage_ri">
                <div class="log_manage_Rtit" style="display:none;">
                </div>
                <div class="log_manage_Rfrist">
                    <div class=" pageList">
                    </div> 
                </div>
                <div id="content">
                                
                </div>
    <div id="transmit" style="display: none"></div>
                <div class="page_end mr14">
                    <div class=" pageList">
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

    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/plugin/Weather/wanerdao2.weather.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script src="../scripts/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../scripts/plugin/transmit/wanerdao2.transmit.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/blog_list.js" type="text/javascript"></script>
</asp:Content>

