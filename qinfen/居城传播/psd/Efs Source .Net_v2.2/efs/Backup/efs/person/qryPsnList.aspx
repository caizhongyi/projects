<%@ Page Language="C#" AutoEventWireup="true" CodeFile="qryPsnList.aspx.cs" Inherits="person_qryPsnList" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2009-10-28
//** 联系邮箱：   enjsky@163.com
//*******************************
-->
<HTML>
<head>
<title>查询学生列表</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">

var g_XML = Efs.Common.getQryXml();

var sPersonID = "";
function doGridClick(data){
	sPersonID = data["PERSONID"]
	if(sPersonID != ""){
		Efs.getExt("cmdEdit").enable();
    Efs.getExt("cmdDel").enable();
	}
}

// 进入查询
function doQry()
{
  var strXml = Efs.Common.getQryXml(Efs.getExt("frmQry"));
  Efs.getDom("psnList").txtXML = strXml;
  Efs.getExt("psnGrid").store.load();
}

// 修改人员档案
function onEditEx() {
  
  if(sPersonID == "")
  {
    alert("没有选择学生");
    return false;
  }
  Efs.getExt("frmData").reset();
  var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  xmlhttp.Open("POST","../sysadmin/baseRefWeb.aspx?method=personDetail&txtPersonID=" + sPersonID,false);
  xmlhttp.Send();
  var xmlReturnDoc = new ActiveXObject("MSXML2.DOMDocument");
  xmlReturnDoc = xmlhttp.responseXML;
  Efs.Common.setEditValue(xmlReturnDoc.xml,Efs.getExt("frmData"), "QUERYINFO");
  xmlReturnDoc = null;
  xmlhttp = null;
  
  Efs.getExt("PsnMWin").show();
}

// 提交修改人员信息
function doPsnEdit() {
  Efs.getExt("frmData").submit();
}


// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("PsnMWin").hide();
    doQry();
  }
  else
  {
    var xml_http = action.response;
    var objXML = xml_http.responseXML;
    alert("处理失败：" + objXML.selectSingleNode("//FUNCERROR").text);
    objXML = null;
    xml_http = null;
  }
}

// 删除人员信息
function onDelEx()
{
  Efs.getExt("frmData").submit(Efs.getExt("psnGrid").getDelXml());
}

</SCRIPT>
</HEAD>
<BODY>
<div iconCls="icon-panel" region="north" height="60" title="查询学生列表" border="false">
 <form id="frmQry"  method="post">
  <TABLE class="formAreaTop" width="100%" height="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>&nbsp;</td>
        <td width="60">姓名</td>
        <td width="160"><input type="text" class="Edit" kind="text" fieldname="NAME" operation="like" maxlength="30" hint="模糊查询"></td>
        <td width="40">性别</td>
        <td width="160"><input type="text" class="Edit" kind="dic" src="DIC_SEX" fieldname="SEX"></td>
        <td width="40">籍贯</td>
        <td width="160"><input type="text" class="Edit" kind="dic" src="DIC_CODE" fieldname="PLACECODE"></td>
        <td><input iconCls="icon-qry" type="button" value="查 询" onEfsClick="doQry()"></td>
        <td>&nbsp;</td>
      </tr>
    </TABLE>
  </form>
</div>

<div id="psnGrid" region="center" xtype="grid" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()">
   <div xtype="tbar">
   	<span style="font-size:9pt;font-weight:bold;color:#15428B;">学生列表</span>
    <div text="->"></div>
   	<div iconCls="icon-edit" id="cmdEdit" text="编辑学生#E" onEfsClick="onEditEx()" disabled></div>
    <div text="-"></div>
   	<div iconCls="icon-Del" id="cmdDel" text="删除学生#D" onEfsClick="onDelEx()" disabled></div>
    <div text="-"></div>
   	<div iconCls="icon-back" text="返 回" onEfsClick="top.showTask()"></div>
   </div>
	<div id="psnList" xtype="store" url="../sysadmin/baseRefWeb.aspx?method=personList" baseParams="{txtXML:g_XML}" autoLoad="true">
		<div xtype="xmlreader" fieldid="PERSONID" record="ROW" tabName="PERSON" totalRecords="QUERYINFO@records">
			<div name="PERSONID" mapping="PERSONID"></div>
			<div name="NAME" mapping="NAME"></div>
			<div name="IDCARD"></div>
			<div name="SEX"></div>
      <div name="PLACECODE"></div>
			<div name="BIRTHDAY"></div>
			<div name="TEL"></div>
		</div>
	</div>
	<div xtype="colmodel">
		<div type="checkbox"></div>
    <div header="学生编码" width="80" sortable="true" dataIndex="PERSONID"></div>
		<div header="学生姓名" width="80" sortable="true" dataIndex="NAME"></div>
		<div header="身份证号" width="120" sortable="true" dataIndex="IDCARD" align="center"></div>
		<div header="性别" width="40" sortable="true" dataIndex="SEX" kind="dic" src="DIC_SEX"></div>
    <div header="籍贯" width="120" sortable="true" dataIndex="PLACECODE" kind="dic" src="DIC_CODE" align="center"></div>
		<div header="出生日期" width="100" sortable="true" dataIndex="BIRTHDAY" align="center"></div>
		<div header="联系电话" width="100" sortable="true" dataIndex="TEL"></div>
	</div>
</div>

<!-- window开始 -->
<div iconCls="icon-panel" id="PsnMWin" xtype="window" width="560" height="255" title="修改学生" resizable="true" modal="true">
  <div region="center" xtype="panel" title="" border="false" autoScroll="true">
    <div xtype="tbar">
      <div text="->"></div>
      <div iconCls="icon-ok2" id="cmdUser" text="确  定" onEfsClick="doPsnEdit()"></div>
    </div>
    <form id="frmData" class="efs-box" method="post" url="../sysadmin/XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <TABLE class="formArea">
        <TR>
          <TD width="100" labelFor="name">姓  名</TD>
          <TD><INPUT id="name" type="text" kind="zhunicode" must="true" maxlength="50" fieldname="PERSON/NAME" datatype="0" state="0"></TD>
          <TD width="20"></TD>
          <TD width="100">身份证号码</TD>
          <TD><INPUT type="text" kind="idcard" fieldname="PERSON/IDCARD" sex="sex" birthdate="birthday" datatype="0" state="0"></TD>
        </TR>
        <TR>
          <TD width="100" labelFor="sex">性  别</TD>
          <TD><INPUT type="text" kind="dic" src="DIC_SEX" id="sex" fieldname="PERSON/SEX" must="true" datatype="0" state="0"></TD>
          <TD width="20"></TD>
          <TD width="100" labelFor="birthday">出生日期</TD>
          <TD><INPUT type="text" kind="date" id="birthday" fieldname="PERSON/BIRTHDAY" datatype="3" state="0" must="true"></TD>
        </TR>
        <TR>
          <TD width="100">籍  贯</TD>
          <TD><INPUT type="text" kind="dic" src="DIC_CODE" fieldname="PERSON/PLACECODE" datatype="0" state="0"></TD>
          <TD width="20"></TD>
          <TD width="100">年  龄</TD>
          <TD><INPUT type="text" kind="int" range=[0,100] fieldname="PERSON/YEAROLD" datatype="1" state="0"></TD>
        </TR>
        <TR>
          <TD width="100">邮  箱</TD>
          <TD><INPUT type="text" kind="email" fieldname="PERSON/EMAIL" datatype="0" state="0"></TD>
          <TD width="20"></TD>
          <TD width="100">电话号码</TD>
          <TD><INPUT type="text" kind="text" fieldname="PERSON/TEL" datatype="0" state="0"></TD>
        </TR>
        <tr>
          <td>备注</td>
          <td colspan="4"><TEXTAREA class="Edit" kind="text" style="height:60px;width:430px" fieldname="PERSON/BAK" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
      <INPUT type="hidden" kind="text" fieldname="PERSON/PERSONID" datatype="0" state="5" operation="1" writeevent="0"><!--operation="0"  定义为修改接口-->
    </form>            
  </div>
</div>
<!-- window结束 -->

</BODY>
</HTML>
