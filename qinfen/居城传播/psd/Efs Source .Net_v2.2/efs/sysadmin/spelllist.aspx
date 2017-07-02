<%@ Page Language="C#" AutoEventWireup="true" CodeFile="spelllist.aspx.cs" Inherits="sysadmin_spelllist" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2009-10-28
//** 联系邮箱：   enjsky@163.com
//*******************************
-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML>
<head>
<title>用户维护</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT language="JavaScript">

var sText = "";
var sSpell = "";
var sASpell = "";

function doGridClick(data){
  sText = data["WORD"]
  sSpell = data["SPELL"]
  sASpell = data["ASPELL"]
  if(sText != ""){
    Efs.getExt("cmdEdit").enable();
    Efs.getExt("cmdDel").enable();
  }
}

function objGridDbClick()
{
  onEditEx();
}

function onEditEx()
{
  if(sText == "")
  {
    alert("没有选择汉字");
    return false;
  }
  with(document.frmPost)
  {
    txtText.value = sText;
    txtSpell.value = sSpell;
    txtASpell.value = sASpell;
  }
  Efs.getDom("txtText").setAttribute("operation", "1");
  Efs.getDom("txtText").setAttribute("state", "5");
  
  with(Efs.getExt("WinSpell"))
  {
    setTitle("修改汉字");
    show();
  }
  
}

function doSubmit()
{
  Efs.getExt("frmPost").submit();
}

/// 删除
function onDelEx()
{
  Efs.getExt("frmPost").submit(Efs.getExt("spellGrid").getDelXml());
}

function onAddEx()
{
  Efs.getExt("frmPost").reset();
  
  Efs.getDom("txtText").setAttribute("operation", "0");
  Efs.getDom("txtText").setAttribute("state", "0");
  with(Efs.getExt("WinSpell"))
  {
    setTitle("添加汉字");
    show();
  }
}

// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("WinSpell").hide();
    Efs.getExt("spellGrid").store.load();
  }
  else
  {
    var xml_http = action.response;
    if(xml_http != null )
    {
      var strRet = xml_http.responseText;
      var objXML = Efs.Common.createDocument(strRet);
      
      alert("处理失败：" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
      objXML = null;
    }
    xml_http = null;
  }
}


var g_XML = Efs.Common.getQryXml();

</SCRIPT>
</HEAD>
<BODY>
<div iconCls="icon-panel" title="汉字及拼音维护" id="spellGrid" region="center" xtype="grid" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()">
     <div xtype="tbar">
     	<span></span>
     	<div iconCls="icon-add" text="增加汉字#A" onEfsClick="onAddEx()"></div>
      <div text="-"></div>
     	<div iconCls="icon-edit" id="cmdEdit" text="编辑汉字#E" onEfsClick="onEditEx()" disabled="true"></div>
      <div text="-"></div>
     	<div iconCls="icon-del" id="cmdDel" text="删除汉字#E" onEfsClick="onDelEx()" disabled="true"></div>
      <div text="-"></div>
     	<div iconCls="icon-back" text="返 回" onEfsClick="top.showTask()"></div>      
     </div>
	<div id="affList" xtype="store" url="baseRefWeb.aspx?method=QrySpellList" baseParams="{txtXML:g_XML}" autoLoad="true">
		<div xtype="xmlreader" fieldid="WORD" record="ROW" tabName="SPELL" totalRecords="QUERYINFO@records">
			<div name="WORD" mapping="WORD"></div>
			<div name="SPELL" mapping="SPELL"></div>
			<div name="ASPELL"></div>
		</div>
	</div>
	<div xtype="colmodel">
		<div header="字" width="50" sortable="true" dataIndex="WORD"></div>
		<div header="拼音头" width="50" sortable="true" dataIndex="SPELL"></div>
		<div header="全拼" width="50" sortable="true" dataIndex="ASPELL"></div>
	</div>
</div>


<div id="WinSpell" xtype="window" title="拼音维护" height="160" width="300" border="true">
  <form id="frmPost" name="frmPost" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <TABLE class="formArea">
        <tr>
          <td class="label">字符</td>
          <td><input type="text" class="Edit" kind="text" name="txtText" fieldname="SPELL/WORD" must="true" name="txtText" id="txtText" state="0" operation="0"></td>
        </tr>
        <tr>
          <td class="label">拼音头</td>
          <td><input type="text" class="Edit" kind="text" name="txtSpell" fieldname="SPELL/SPELL" must="true" name="txtSpell"></td>
        </tr>
        <tr>
          <td class="label">全拼</td>
          <td><input type="text" class="Edit" kind="text" name="txtASpell" fieldname="SPELL/ASPELL" must="true" name="txtASpell">
          </td>
        </tr>
      </TABLE>
      </FORM>
    <div xtype="tbar">
      <div iconCls="icon-ok2" text="确  定" onEfsClick="doSubmit()"></div>
    </div>
</div>

</BODY>
</HTML>

