<%@ Page Language="C#" AutoEventWireup="true" CodeFile="affairtypelist.aspx.cs" Inherits="developer_affairtypelist" %>
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
<title>事务类型列表</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">

var sAffairTypeID = "";
function onEditEx()
{
  if(sAffairTypeID != "")
    location.href = "affairtypeEdit.aspx?txtAffairTypeID=" + sAffairTypeID;
}

function onAddEx()
{
   location.href = "affairtypeAdd.aspx";
}

function onDicEx()
{
    Efs.getDom("frmPost").setAttribute("url","CreateDicFile.aspx");
  
    Efs.getExt("frmPost").submit();
}

var g_XML = Efs.Common.getQryXml();

function doGridClick(data){
  sAffairTypeID = data["AFFAIRTYPEID"];
  if(sAffairTypeID != ""){
    Efs.getExt("cmdEdit").enable();
    Efs.getExt("cmdDel").enable();
  }
}

function onDel()
{
    if(confirm("确定删除吗？"))
    {
        Efs.getDom("frmPost").setAttribute("url","../sysadmin/baseRefWeb.aspx?method=affairTypeDel");
      
        Efs.getExt("frmPost").submit(sAffairTypeID);
    }
  
}
// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("affgrid").store.reload();
  }
  else
  {
    var xml_http = action.response;
    if(xml_http != null )
    {
      var strRet = xml_http.responseText;
      var objXML = Efs.Common.createDocument(strRet);
      
      alert("加载失败：" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
      objXML = null;
    }
    xml_http = null;
  }
}
</SCRIPT>
</HEAD>
<BODY>

<div iconCls="icon-panel" title="事务类型列表" id="affgrid" region="center" xtype="grid" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()">
     <div xtype="tbar">
       <div text="->"></div>
       <div iconCls="icon-add" text="增加事务#A" onEfsClick="onAddEx()"></div>
      <div text="-"></div>
       <div iconCls="icon-edit" id="cmdEdit" text="编辑事务#E" onEfsClick="onEditEx()" disabled="true"></div>
      <div text="-"></div>
       <div iconCls="icon-del" id="cmdDel" text="删除#D" onEfsClick="onDel()" disabled="true"></div>
      <div text="-"></div>
       <div iconCls="icon-dic" text="生成字典文件#T" onEfsClick="onDicEx()"></div>
      <div text="-"></div>
       <div iconCls="icon-back" text="返 回" onEfsClick="top.showTask()"></div>
     </div>
  <div id="affList" xtype="store" url="../sysadmin/baseRefWeb.aspx?method=affairTypeList" baseParams="{txtXML:g_XML}" autoLoad="true">
    <div xtype="xmlreader" fieldid="AFFAIRTYPEID" record="ROW" totalRecords="QUERYINFO@records">
      <div name="AFFAIRTYPEID"></div>
      <div name="AFFAIRTYPENAME"></div>
      <div name="AFFAIRTYPEMODE" mapping="AFFAIRTYPEMODE"></div>
      <div name="AFFAIRTYPEDES"></div>
    </div>
  </div>
  <div xtype="colmodel">
    <div header="事务类型编号" width="100" sortable="true" dataIndex="AFFAIRTYPEID" hidden="true"></div>
    <div header="事务类型名称" width="200" sortable="true" dataIndex="AFFAIRTYPENAME"></div>
    <div header="事务类型模式" width="200" sortable="true" dataIndex="AFFAIRTYPEMODE" kind="dic" src="DIC_AFFAIRTYPEMODE"></div>
    <div header="事务类型描述" width="200" sortable="true" dataIndex="AFFAIRTYPEDES"></div>
  </div>
</div>

  <FORM id="frmPost" name="frmPost" url="" method="post" style="display:none;" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
    <INPUT type="hidden" name="txtDicName" value="AFFAIRTYPE">
  </FORM>
</BODY>
</HTML>