<%@ Page Language="C#" AutoEventWireup="true" CodeFile="errloglist.aspx.cs" Inherits="sysadmin_errloglist" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2009-10-28
//** 联系邮箱：   enjsky@163.com
//*******************************
-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML XMLNS:ELEMENT>
<head>
<title>错误日志</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT LANGUAGE="JavaScript">
var g_XML = Efs.Common.getQryXml();

var elog = "";
function rowClick(data)
{
  elog = data["SQLSCRIPT"];
}

function showLog()
{
  elog = elog.replace(/°/g, "'");
  Efs.getDom("showSQL").innerHTML = elog;
}

function doDel()
{
  Efs.getExt("frmPost").submit(Efs.getExt("ErrGrid").getDelXml());
}

// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
      Efs.getExt("ErrGrid").store.load();
  }
  else
  {
    var xml_http = action.response;
    if(xml_http != null )
    {
      var objXML = xml_http.responseXML;
      
      alert("加载失败：" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
      objXML = null;
    }
    xml_http = null;
  }
}
</SCRIPT>
</HEAD>
<BODY>
<div id="ErrGrid" title="错误日志列表" region="center" xtype="grid" pagingBar="true" pageSize="25" buttonAlign="center" onEfsRowDblClick="showLog()" onEfsRowClick="rowClick()">
	<div id="affList" xtype="store" url="baseRefWeb.aspx?method=QryErrLogList" baseParams="{txtXML:g_XML}" autoLoad="true">
		<div xtype="xmlreader" fieldid="SQLID" record="ROW" tabName="SQLSTORAGE" totalRecords="QUERYINFO@records">
			<div name="SQLID" mapping="SQLID"></div>
			<div name="APPLYDATE" mapping="APPLYDATE"></div>
			<div name="OBJID"></div>
			<div name="SQLSCRIPT"></div>
		</div>
	</div>
	<div xtype="colmodel">
		<div type="checkbox"></div>
		<div header="日志编号" width="60" sortable="true" dataIndex="SQLID" align="center"></div>
		<div header="产生时间" width="120" sortable="true" dataIndex="APPLYDATE" align="center"></div>
		<div header="对象标识" width="160" sortable="true" dataIndex="OBJID" align="center"></div>
		<div header="错误脚本" width="600" sortable="true" dataIndex="SQLSCRIPT" align="center"></div>
	</div>
   <div xtype="tbar">
    <div text="->"></div>
    <div iconCls="icon-doc" text="显示#S" onEfsClick="showLog()"></div>
    <div iconCls="icon-del" text="删除#D" onEfsClick="doDel()"></div>
    <div text="返 回" onEfsClick="top.showTask()"></div>
   </div>
</div>
<div region="south" xtype="panel" title="错误脚本" height="120" collapsible="true">
    <table cellpadding=0 cellspacing=0 width="100%" height="100%" bgcolor="#DEECFD">
      <tr height=50>
        <td>&nbsp;</td>
        <td align="left" style="font-size:9pt;" id="showSQL">
          &nbsp;
        </td>
      </tr>
    </table>
    
  </div>

<form id="frmPost" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
</form>

</BODY>
</HTML>
