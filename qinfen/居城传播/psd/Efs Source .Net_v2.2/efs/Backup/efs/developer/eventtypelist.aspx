<%@ Page Language="C#" AutoEventWireup="true" CodeFile="eventtypelist.aspx.cs" Inherits="developer_eventtypelist" %>
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
<title>事件类型列表</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">

var g_XML = Efs.Common.getQryXml();

var sEventTypeID = "";
function onEditEx()
{
  if(sEventTypeID == "")
  {
    alert("没有选择事件类型");
    return false;
  }
  Efs.getExt("frmData").reset();
  
  Efs.Common.ajax("getEventTypeDetail.aspx?txtEventTypeID=" + sEventTypeID,"",function(succ,xml_http,options){
   if(succ){ // 是否成功
     var xmlReturnDoc = xml_http.responseXML;
     
     Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmData"), "QUERYINFO");
   }
   else{
     alert("加载数据失败!");
   }
  });
  
  Efs.getDom("EventtypeID").setAttribute("operation","1");
  Efs.getDom("EventtypeID").setAttribute("state","5");
  Efs.getDom("EventtypeID").readOnly = true;
  
  
  with(Efs.getExt("EventWin"))
  {
    setTitle("修改事件类型");
    show();
  }
}


function onAddEx()
{
  Efs.getDom("EventtypeID").setAttribute("operation","0");
  Efs.getDom("EventtypeID").setAttribute("state","0");
  Efs.getDom("EventtypeID").readOnly = false;


  Efs.getExt("frmData").reset();

  with(Efs.getExt("EventWin"))
  {
    setTitle("添加事件类型");
    show();
  }
}

function onDicEx()
{
    with(document.frmPost)
    {
      url = "CreateDicFile.aspx";
    }
  
    Efs.getExt("frmPost").submit();
}

function doGridClick(data){
	sEventTypeID = data["EVENTTYPEID"]
	if(sEventTypeID != ""){
		Efs.getExt("cmdEdit").enable();
		Efs.getExt("cmdDel").enable();
	}
}

function onDel()
{
    if(confirm("确定删除吗？"))
    {
        Efs.getDom("frmPost").setAttribute("url","../sysadmin/baseRefWeb.aspx?method=eventTypeDel");
      
        Efs.getExt("frmPost").submit(sEventTypeID);
    }
  
}

// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("EventWin").hide();
    Efs.getExt("affgrid").store.load();
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

function doDeal()
{
  if(Efs.getExt("frmData").isValid()){
    var strXml = Efs.Common.getOpXml(Efs.getExt("frmData"));
    with(document.frmPost) {
      setAttribute("url","EventTypeDeal.aspx");
      txtOpXml.value = strXml;
    }
  
    Efs.getExt("frmPost").submit();
  }
}

</SCRIPT>
</HEAD>
<BODY>


<div iconCls="icon-panel" id="affgrid" region="center" xtype="grid" title="事件类型列表" pagingBar="true" pageSize="20" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()" buttonAlign="center">
	<div id="affList" xtype="store" url="getRsQryEventTypeList.aspx" baseParams="{txtXML:g_XML}" autoLoad="true">
		<div xtype="xmlreader" fieldid="EVENTTYPEID" record="ROW" totalRecords="QUERYINFO@records">
			<div name="EVENTTYPEID" mapping="EVENTTYPEID"></div>
			<div name="EVENTTYPENAME" mapping="EVENTTYPENAME"></div>
			<div name="AFFAIRTYPENAME"></div>
			<div name="DISABLED"></div>
			<div name="VISIBLE"></div>
		</div>
	</div>
	<div xtype="colmodel">
		<div header="事件类型编号" width="80" sortable="true" dataIndex="EVENTTYPEID" align="center"></div>
		<div header="事件类型名称" width="120" sortable="true" dataIndex="EVENTTYPENAME" align="center"></div>
		<div header="事务类型名称" width="120" sortable="true" dataIndex="AFFAIRTYPENAME" align="center"></div>
		<div header="是否禁用" width="60" sortable="true" dataIndex="DISABLED" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
		<div header="是否显示" width="60" sortable="true" dataIndex="VISIBLE" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
	</div>

     <div xtype="buttons">
     	<div iconCls="icon-add" text="增加事件类型#A" onEfsClick="onAddEx()"></div>
     	<div iconCls="icon-edit" id="cmdEdit" text="编辑事件类型#E" onEfsClick="onEditEx()" disabled="true"></div>
     	<div iconCls="icon-del" id="cmdDel" text="删除事件类型#D" onEfsClick="onDel()" disabled="true"></div>
     	<div iconCls="icon-dic" text="生成字典文件#T" onEfsClick="onDicEx()"></div>
     	<div iconCls="icon-back" text="返 回" onEfsClick="top.showTask()"></div>      
     </div>
</div>


    <!-- window开始 -->
    <div iconCls="icon-panel" id="EventWin" xtype="window" width="700" height="280" title="添加事件类型" resizable="true" modal="true">
      <div region="center" xtype="panel" title="" border="false" autoScroll="true">
        <div xtype="tbar">
          <div text="->"></div>
          <div iconCls="icon-ok2" id="cmdUser" text="确  定" onEfsClick="doDeal()"></div>
        </div>
        <form id="frmData"  class="efs-box" method="post">
        <TABLE class="formArea">
        <tr>
          <td class="label">事件类型编号</td>
          <td><input type="text" class="Edit" kind="text" name="EventtypeID" id="EventtypeID" operation="0" writeevent="0" state="0" datatype="0" fieldname="EVENTTYPE/EVENTTYPEID" must="true" maxlength="6"></td>
          <td class="label">事件类型名称</td>
          <td><input type="text" class="Edit" kind="text" fieldname="EVENTTYPE/EVENTTYPENAME" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td class="label">事务类型</td>
          <td><input type="text" class="Edit" kind="dic" src="AFFAIRTYPE" state="0" datatype="0" fieldname="EVENTTYPE/AFFAIRTYPEID" must="true" maxlength="6"></td>
          <td class="label">是否为起始事件类型</td>
          <td><input type="text" class="Edit" kind="dic" src="DIC_TRUEFALSE" fieldname="EVENTTYPE/BEGINEVENT" state="0" datatype="1" must="true" code="0" value="否"></td>
        </tr>
        <tr>
          <td class="label">操作URL</td>
          <td colspan="3"><input type="text" class="Edit" style="width:475px" kind="text" fieldname="EVENTTYPE/OPURL" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td class="label">是否禁用</td>
          <td><input type="text" class="Edit" kind="dic" src="DIC_TRUEFALSE" fieldname="EVENTTYPE/DISABLED" state="0" datatype="1" must="true" code="0" value="否"></td>
          <td class="label">是否为快捷方式</td>
          <td><input type="text" class="Edit" kind="dic" src="DIC_TRUEFALSE" code="0" value="否" fieldname="EVENTTYPE/SHORTCUT" state="0" datatype="1" must="true"></td>
        </tr>
        <tr>
          <td class="label">是否显示</td>
          <td colspan="3"><input type="text" class="Edit" kind="dic" src="DIC_TRUEFALSE" code="1" value="是" fieldname="EVENTTYPE/VISIBLE" state="0" datatype="1" must="true"></td>
        </tr>
        <tr>
          <td class="label">事件类型描述</td>
          <td colspan="3"><TEXTAREA class="Edit" kind="text" style="height:60px;width:475px" fieldname="EVENTTYPE/EVENTTYPEDES" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
        </form>
      </div>
    </div>
    <!-- window结束 -->
    
   <FORM id="frmPost" name="frmPost" url="" method="post" style="display:none;" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
    <INPUT type="hidden" name="txtOpXml">
    <INPUT type="hidden" name="txtDicName" value="AFFAIRTYPE">
  </FORM>
  
</BODY>
</HTML>