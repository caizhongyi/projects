<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog.aspx.cs" Inherits="Personal_Personal_Blog" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>个人日记-个人-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="个人日记，个人，玩儿道，生活社交网络" />
<meta name="description" content="按时间，按分类浏览个人日记" />
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
           <a href="javascript:;" id="tab_zl">资料</a>
		    <a href="javascript:;" class="active" id="tab_rz">日志</a>
		    <a href="javascript:;" id="tab_xc">相册</a>
		    <a href="javascript:;" id="tab_sp">视频</a>
        </div>
        <div class="black10"></div>
          <%if (isCurUser)
                  { %>
                <div class="log_tab clearfix mb12">
                     	<ul>
                        	<li><a href="javascript:;" class="tagf">查看日志</a></li>
                            <li><a href="blog_compose.html">发表修改日志</a></li>
                            <li><a href="blog_set.html">页面设置</a></li>
                            <li><a href="blog_manage.html">日志管理</a></li>
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
                    <input name="sText" type="text" class="inp09" id="sText"><input name="srhcode" id="srhcode" type="button" class="inp10" value="查询">
                </div>
                <dl style=" display: none;">
                    <dt class="mb5">按分类</dt>
                    <dd class="m0">
                    <ul class="mt0" id="articlecat">

                    </ul> 
                </dd>
                </dl> 
                <dl class="mt10" style=" display: none;">
                    <dt class="mb5">按时间</dt>
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
    <script src="../scripts/plugin/notebook/wanerdao2.replycontent.js" type="text/javascript"></script>
    <script src="../scripts/plugin/transmit/wanerdao2.transmit.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/blog_list.js" type="text/javascript"></script>
</asp:Content>

