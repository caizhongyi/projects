<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivitySideBar.aspx.cs" Inherits="PluginDemo_ActivitySideBar_ActivitySideBar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../css/PluginCss/SideBar/sidebar.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/SideBar/wanerdao2.sidebar.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">     
     <div id="Sidebar" >
         <div class="friendsBox">
				    <div class="title"><h5><a href="#">您可能感兴趣的活动</a></h5><span  id="interestPageid" style="float:right" > <a class="arrr" title="下一页" href="#"></a> <a  class="arrl" title="上一页" href="#"></a></span></div>
            	    <div id="interestContent"></div>
         </div>
     </div>

      <div id="Div1" style="width:220px; font-size:12px;">
         <div class="friendsBox">
				    <div class="title"><h5><a href="#">最新创建的活动</a></h5><span  id="newactivityPageid" style="float:right" > <a class="arrr" title="下一页" href="#"></a> <a  class="arrl" title="上一页" href="#"></a></span></div>
            	    <div id="newActivityContent"></div>
         </div>
     </div>


      <div id="Div2" style="width:220px; font-size:12px;">
         <div class="friendsBox">
				    <div class="title"><h5><a href="#">好友参加的活动</a></h5><span  id="friendPageid" style="float:right" > <a class="arrr" title="下一页" href="#"></a> <a  class="arrl" title="上一页" href="#"></a></span></div>
            	    <div id="friendContent"></div>
         </div>
     </div>
    </form>
</body>
</html>

