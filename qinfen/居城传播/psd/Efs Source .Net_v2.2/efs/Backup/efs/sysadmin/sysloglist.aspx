<%@ Page Language="C#" AutoEventWireup="true" CodeFile="sysloglist.aspx.cs" Inherits="sysadmin_sysloglist" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2009-10-28
//** 联系邮箱：   enjsky@163.com
//*******************************
-->
<HTML XMLNS:ELEMENT>
<head>
<title>系统日志</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT LANGUAGE="JavaScript">
<!--
var g_XML = Efs.Common.getQryXml();
//-->
</SCRIPT>
</HEAD>
<BODY>
<div iconCls="icon-doc" title="登录日志列表" region="center" xtype="grid" pagingBar="true" pageSize="25" buttonAlign="center">
	<div id="affList" xtype="store" url="baseRefWeb.aspx?method=QrySysLogList" baseParams="{txtXML:g_XML}" autoLoad="true">
		<div xtype="xmlreader" fieldid="LOGID" record="ROW" totalRecords="QUERYINFO@records">
			<div name="LOGID" mapping="LOGID"></div>
			<div name="USERID" mapping="USERID"></div>
			<div name="USERNAME"></div>
			<div name="UNITNAME"></div>
			<div name="LOGINIP"></div>
			<div name="ENTERTIME"></div>
		</div>
	</div>
	<div xtype="colmodel">
		<div header="日志编号" width="100" sortable="true" dataIndex="LOGID" align="center"></div>
		<div header="用户编号" width="100" sortable="true" dataIndex="USERID" align="center"></div>
		<div header="用户姓名" width="100" sortable="true" dataIndex="USERNAME" align="center"></div>
		<div header="用户单位名称" width="200" sortable="true" dataIndex="UNITNAME" align="center"></div>
		<div header="登录IP地址" width="100" sortable="true" dataIndex="LOGINIP" align="center"></div>
		<div header="登录时间" width="140" sortable="true" dataIndex="ENTERTIME" align="center"></div>
	</div>
   <div xtype="buttons">
    <div text="返 回" onEfsClick="top.showTask()"></div>
   </div>
</div>
</BODY>
</HTML>

