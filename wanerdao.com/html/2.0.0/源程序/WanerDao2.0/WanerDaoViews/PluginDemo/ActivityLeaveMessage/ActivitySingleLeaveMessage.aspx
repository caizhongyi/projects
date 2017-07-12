<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivitySingleLeaveMessage.aspx.cs" Inherits="PluginDemo_ActivityLeaveMessage_ActivitySingleLeaveMessage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link href="../../css/PluginCss/LeaveMessage/leaveMessage.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
      <script src="../../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/ActivityLeaveMessage/wanerdao2.activitySingleLeaveMessage.js"  type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
       <div id="leavemessage">
         <div class="overBox">
          	    <div class="title"><h5 class="etd_close">留言板</h5><span class="floatLeft gray9" id="totalMesage">(325条留言)</span>
                    <div id="pageid" class="blog_page"></div>
                 </div>
                <div id="d6" class="overBox"></div>
        	     <div class="blog_pageBg">
        		        <div id="pageidbt" class="blog_page"> </div>
            </div>
        </div>            
    </div>
    </form>
</body>
</html>
