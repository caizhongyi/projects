<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>
<!--#include file="checkLog.inc" -->
<%
Efsframe.cn.baseManage.UserSession userSession = ((Efsframe.cn.baseManage.UserSession)Session["RoleUser"]);

string strUrl = Request.ServerVariables["SCRIPT_NAME"];

string sPort = Request.ServerVariables["SERVER_PORT"];
if (sPort != "80")
{
  strUrl = "http://" + Request.ServerVariables["SERVER_NAME"] + ":" + sPort + strUrl.Substring(0, strUrl.LastIndexOf("/"));
}
else
{
  strUrl = "http://" + Request.ServerVariables["SERVER_NAME"] + strUrl.Substring(0, strUrl.LastIndexOf("/"));
}
string WebRoot = strUrl;
%>
<HTML>
<HEAD>
<title>Efs Frame 企业级框架 （EfsFrame框架团队 http://www.efsframe.cn/）</title>
<link rel="stylesheet" type="text/css" href="css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/efs-all.css" />
<script type="text/javascript" src="js/loadmask.js"></script>
<script type="text/javascript" src="js/efs-all.js"></script>

<style>
<!--
.efs-box td{
  padding :5;
  font:normal normal normal 9pt Arial;
}
.title{
  font:18pt 黑体;
  color:#ffffff;
}

td{
  font-size:9pt;
}

a  { font:normal 12px ; color:#FFFFFF; text-decoration:none; }
a:hover  { color:#FFFFFF;text-decoration: underline; }

-->
</style>

<script type="text/javascript">

var mainpanel;
Ext.BLANK_IMAGE_URL ="images/default/s.gif";

function doTreeClick(node){
    if(typeof mainpanel == "undefined"){
        mainpanel = Efs.getExt("main");
    }
    
    var url = node.attributes.opurl;
    var eventtypeid = node.attributes.eventtypeid;
    if(typeof url == "undefined"){
      return false;
    }
  	var datNow = new Date();
  	var sRandom = datNow.getUTCFullYear() + datNow.getUTCMonth() +
              		datNow.getUTCDate() + datNow.getUTCHours() + datNow.getUTCMinutes() +
              		datNow.getMinutes() + datNow.getUTCSeconds() + datNow.getUTCMilliseconds();
    
    if(url.indexOf("?") == -1)
      url += "?txtEventTypeID=" + eventtypeid + "&random=" + sRandom;
    else
      url += "&txtEventTypeID=" + eventtypeid + "&random=" + sRandom;
    
    if(url){
      window.open(url,"famRMain")
    }
}

// 显示任务
function showTask(strEventTypeID)
{
	var datNow = new Date();
	var obj = top.famRMain;
	var sRandom = datNow.getUTCFullYear() + datNow.getUTCMonth() +
		datNow.getUTCDate() + datNow.getUTCHours() + datNow.getUTCMinutes() +
		datNow.getMinutes() + datNow.getUTCSeconds() + datNow.getUTCMilliseconds();
	var sUrl = "<%=WebRoot%>/task.aspx?random=" + sRandom;

	if (strEventTypeID) {
		if (strEventTypeID.length > 0) {
			sUrl += "&EventTypeID=" + strEventTypeID;
		}
	}
	obj.location = unescape(sUrl);
}

// 帮助
function doHelp()
{
	alert("帮助");
}

// 退出
function doQuit()
{
  famRMain.location = "<%=WebRoot%>/LogOff.aspx";
}

// 退出
function _doExit()
{
	document.location = "<%=WebRoot%>/Default.aspx";
}

function logOff()
{
	try
	{
		alert("登录超时，请重新登录");
		_doExit();
	}
	catch(e){}
}

Efs.onReady(
  function(){
    showTask("0001");
    Efs.getExt("treepanel").expandAll();
});
</script>

</HEAD>
<BODY bgcolor="#FFFFFF" text="#000000" topmargin="0" leftmargin="0" marginwidth="0" marginheight="0">
<div region="north" height="55">
<table background="images/hd-bg.gif" width="100%" cellpadding="0" cellspacing="0" height="57">
    <tr>
      <td class="title" width="500px" style="background:url(images/title.gif) no-repeat;">
      </td>
      <td valign="middle" align="right" width="*">
        <TABLE cellpadding="0" cellspacing="0" height="100%">
        <TR>
          <TD width="16"><img src="images/default/dd/home.gif"></TD>
          <TD style="padding-top:4px;padding-left:2px;"><a target="famRMain" href="task.aspx">任务首页</a></TD>
          <TD width="12px;">&nbsp;&nbsp;</TD>
          <TD width="16"><img src="images/default/dd/changePwd.gif"></TD>
          <TD style="padding-top:4px;padding-left:2px;"><a target="famRMain" href="sysadmin/SetPassword.aspx">修改密码</a></TD>
          <TD width="12px;">&nbsp;&nbsp;</TD>
          <TD width="16"><img src="images/default/dd/help.gif"></TD>
          <TD style="padding-top:4px;padding-left:2px;"><a style="cursor:pointer;" href="help/efsdocs/index.htm" target="_blank">帮助</a></TD>
          <TD width="12px;">&nbsp;&nbsp;</TD>
          <TD width="16"><img src="images/default/dd/quit.gif"></TD>
          <TD style="padding-top:4px;padding-left:2px;"><a style="cursor:pointer;" onclick="doQuit()">退出</a></TD>
          <TD width="12px;">&nbsp;&nbsp;</TD>
        </TR>
        </TABLE>
      </td>
    </tr>
  </table>
</div>

<div iconCls="icon-tree" region="west" width="150" title="功能树" collapsible="true" border="false">
	<div region="center" id="treepanel" xtype="treepanel" height="450" autoScroll="true" onEfsClick="doTreeClick()" border="false">
    <div xtype="xmlloader" url="sysadmin/baseRefWeb.aspx?method=getUserRightTree" parentPath="QUERYINFO"></div>
	</div>
  
	<div iconCls="icon-user" region="south" title="用户信息" border="false" height="100" collapsible="true">
	  <table cellpadding=0 cellspacing=0 width="100%" height="100%" bgcolor="#DEECFD">
		<tr height=50>
    <td>&nbsp;</td>
		<td align="left">
			用户名：<%=userSession.getUserName()%><br>
			单&nbsp;&nbsp;&nbsp;&nbsp;位：<%=userSession.getUnitName()%>
		</td>
		</tr>
	  </table>
	</div>
</div>
<div id="main" region="center">
<iframe id="famRMain" name="famRMain" region="center" frameborder="no" height="100%" width="100%" src=""></iframe>
</div>

</BODY>
</HTML>