<%@ Page Language="C#" AutoEventWireup="true" CodeFile="manageunitlist.aspx.cs" Inherits="sysadmin_manageunitlist" %>
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
<title>单位维护</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">

Efs.onReady(
  function(){	
  	Efs.getDom("unitList").setAttribute("txtXML",Efs.Common.getQryXml());
  	Efs.getExt("unitgrid").store.load();
  }
);

var sUnitID = "";
function doGridClick(data)
{
  sUnitID = data["MUNITID"];
  Efs.getExt("cmdEdit").enable();
  Efs.getExt("cmdDel").enable();
}

// 进入查询
function doQry()
{
  var strXml = Efs.Common.getQryXml(Efs.getExt("frmQry"));
  Efs.getDom("unitList").setAttribute("txtXML", strXml);
  Efs.getExt("unitgrid").store.load();
}


function onAddEx()
{
  Efs.getDom("MUnitID").setAttribute("operation", "0");
  Efs.getDom("MUnitID").setAttribute("state", "0");

  Efs.getExt("frmData").reset();
  with(Efs.getExt("UnitMWin"))
  {
    setTitle("添加单位");
    show();
  }
}


function onEditEx()
{
  if(sUnitID == "")
  {
    alert("没有选择单位");
    return false;
  }
  Efs.getExt("frmData").reset();
  
  Efs.Common.ajax("baseRefWeb.aspx?method=QryUnitDetail&txtUnitID=" + sUnitID,"",function(succ,response,options){
   if(succ){ // 是否成功
     var xmlReturnDoc = response.responseXML;
     Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmData"), "QUERYINFO");
   }
   else{
     alert("加载数据失败!");
   }
  });
  
  Efs.getDom("MUnitID").setAttribute("operation", "1");
  Efs.getDom("MUnitID").setAttribute("state", "5");
  
  
  with(Efs.getExt("UnitMWin"))
  {
    setTitle("修改单位");
    show();
  }
}

function doMUnit()
{
  Efs.getExt("frmData").submit();
}

// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("UnitMWin").hide();
    doQry();
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

function onDelEx()
{
  if(sUnitID == "420100000000")
  {
    alert("权限不足");
    return false;
  }
  
  if(sUnitID == "")
  {
    alert("没有选择单位");
    return false;
  }
  
  if(!confirm("确定要删除吗？"))
    return false;
    
  var strXml = Efs.getExt("unitgrid").getDelXml();
  Efs.getExt("frmData").submit(strXml);
}

function onDicEx()
{
  Efs.getExt("frmPost").submit("MANAGEUNIT");
}

</SCRIPT>
</HEAD>
<BODY>
<div iconCls="icon-panel" region="north" height="60" title="单位查询" border="false">
 <form id="frmQry"  method="post">
  <TABLE class="formAreaTop" width="100%" height="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>&nbsp;</td>
        <TD width="60">单位编号</TD>
        <TD width="160"><INPUT fieldname="MUNITID" type="text" kind="text"></TD>
        <TD width="60">单位名称</TD>
        <TD width="160"><INPUT fieldname="MUNITNAME" type="text" operation="like" hint="模糊查询"></TD>
        <TD width="60">上级单位</TD>
        <TD width="160"><INPUT fieldname="MSUNITID" type="text" kind="dic" src="MANAGEUNIT"></TD>
        <TD width="60">单位级别</TD>
        <TD width="160"><INPUT fieldname="MLEVEL" type="text" kind="dic" src="DIC_MLEVEL"></TD>
        <td><input iconCls="icon-qry" type="button" value="查 询" onEfsClick="doQry()"></td>
        <td>&nbsp;</td>
      </TR>
    </TABLE>
  </form>
</div>

<div id="unitgrid" region="center" xtype="grid" title="" border="false" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" buttonAlign="center">
  <div xtype="tbar">
    <span style="font-size:9pt;font-weight:bold;color:#15428B;">单位列表</span>
    <div text="->"></div>
    <div iconCls="icon-add" text="增加单位#A" onEfsClick="onAddEx()"></div>
    <div iconCls="icon-edit" id="cmdEdit" text="编辑单位#E" onEfsClick="onEditEx()" disabled="true"></div>
    <div iconCls="icon-del" id="cmdDel" text="删除单位#D" onEfsClick="onDelEx()" disabled="true"></div>
    <div iconCls="icon-dic" id="cmdDic" text="生成字典文件#T" onEfsClick="onDicEx()"></div>
    <div iconCls="icon-back" text="返 回" onEfsClick="top.showTask()"></div>      
  </div>
	<div id="unitList" xtype="store" url="baseRefWeb.aspx?method=QryUnitList" txtXML='' autoLoad="false">
		<div xtype="xmlreader" fieldid="MUNITID" tabName="MANAGEUNIT" record="ROW" totalRecords="QUERYINFO@records">
			<div name="MUNITID" mapping="MUNITID"></div>
			<div name="MUNITNAME" mapping="MUNITNAME"></div>
			<div name="MSUNITID"></div>
			<div name="MTYPE"></div>
			<div name="MLEVEL"></div>
      <div name="VALID"></div>
		</div>
	</div>

	<div xtype="colmodel">
		<div header="单位编号" width="80" sortable="true" dataIndex="MUNITID" align="center"></div>
		<div header="单位名称" width="120" sortable="true" dataIndex="MUNITNAME" align="center"></div>
		<div header="上级单位" width="120" sortable="true" dataIndex="MSUNITID" align="center" kind="dic" src="MANAGEUNIT"></div>
		<div header="单位类型" width="80" sortable="true" dataIndex="MTYPE" kind="dic" src="DIC_MTYPE"></div>
		<div header="单位级别" width="60" sortable="true" dataIndex="MLEVEL" align="center" kind="dic" src="DIC_MLEVEL"></div>
    <div header="是否有效" width="80" sortable="true" dataIndex="VALID" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
	</div>
</div>


    <!-- window开始 -->
    <div iconCls="icon-panel" id="UnitMWin" xtype="window" width="560" height="250" title="添加用户" resizable="true" modal="true">
      <div region="center" xtype="panel" title="" border="false" autoScroll="true">
        <div xtype="tbar">
          <div text="->"></div>
          <div iconCls="icon-ok2" id="cmdUser" text="确  定" onEfsClick="doMUnit()"></div>
        </div>
        <form txtXML="" id="frmData" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
        <TABLE class="formArea">
          <tr>
            <td class="label">单位编号</td>
            <td><input type="text" class="Edit" name="MUnitID" id="MUnitID" maxlength="16" kind="text" fieldname="MANAGEUNIT/MUNITID" must="true" operation="0" writeevent="0" state="0" datatype="0"></td>
            <td class="label">单位类型</td>
            <td><input type="text" class="Edit" kind="dic" src="DIC_MTYPE" fieldname="MANAGEUNIT/MTYPE" state="0" datatype="0" must="true"></td>
          </tr>
          <tr>
            <td class="label">单位名称</td>
            <td colspan="3"><input type="text" style="width:385px" class="Edit" kind="text" fieldname="MANAGEUNIT/MUNITNAME" state="0" datatype="0" must="true"></td>
          </tr>
          <tr>
            <td class="label">上级单位</td>
            <td colspan="3"><input type="text" class="Edit" style="width:385px"  kind="dic" src="MANAGEUNIT" state="0" datatype="0" fieldname="MANAGEUNIT/MSUNITID" must="true"></td>
          </tr>
          <tr>
            <td class="label">是否有效</td>
            <td><input type="text" class="Edit" kind="dic" src="DIC_TRUEFALSE" fieldname="MANAGEUNIT/VALID" state="0" datatype="1" code="1" value="是" must="true"></td>
            <td class="label">单位级别</td>
            <td><input type="text" class="Edit" kind="dic" src="DIC_MLEVEL" fieldname="MANAGEUNIT/MLEVEL" state="0" datatype="1" must="true"></td>
          </tr>
          <tr>
            <td class="label">管理单位描述</td>
            <td colspan="3"><TEXTAREA class="Edit" kind="text" style="height:60px;width:385px" fieldname="MANAGEUNIT/MDES" state="0" datatype="0"></TEXTAREA></td>
          </tr>
        </TABLE>
        </form>
      </div>
    </div>
    <!-- window结束 -->
    
    
    <form id="frmPost" class="efs-box" method="post" url="baseRefWeb.aspx?method=CreateDicFile" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
    </form>
</BODY>
</HTML>

