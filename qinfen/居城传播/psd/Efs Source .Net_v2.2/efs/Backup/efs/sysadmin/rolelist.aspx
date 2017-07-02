<%@ Page Language="C#" AutoEventWireup="true" CodeFile="rolelist.aspx.cs" Inherits="sysadmin_rolelist" %>
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
<title>角色管理</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<style>
.Edit {
  width : 100px;
}
</style>
<SCRIPT language="JavaScript">
Efs.onReady(
  function(){
    Efs.getDom("roleList").setAttribute("txtXML", Efs.Common.getQryXml());
    Efs.getExt("rolegrid").store.load();
  }
);
// 进入查询
function doQry()
{
  var strXml = Efs.Common.getQryXml(Efs.getExt("frmQry"))

	Efs.getDom("roleList").setAttribute("txtXML", strXml);
	Efs.getExt("rolegrid").store.load();
}

// 添加角色
function onAddEx()
{
  Efs.getExt("RoleMWin").show();
}

// 添加角色
function doAdd()
{
  Efs.getDom("frmData").setAttribute("url", "baseRefWeb.aspx?method=RoleAdd");
  
  Efs.getExt("frmData").submit();
}

var sRoleID = "";

function doGridClick(data,grid,rowId,e)
{
  sRoleID = data["ROLEID"];
  Efs.getExt("cmdEdit").enable();
  Efs.getExt("cmdDel").enable();
}

function onEditEx()
{
  if(sRoleID == "")
  {
    alert("没有选择角色");
    return false;
  }
  
  location.href = "roleedit.aspx?txtRoleID=" + sRoleID;
}

// 删除角色
function onDelEx()
{
  if(!confirm("确实要删除该角色吗？"))
    return false;

  if((sRoleID == "000001"))
  {
    alert("权限不足");
    return false;
  }

  Efs.getDom("frmData").setAttribute("url", "baseRefWeb.aspx?method=DropRole");
  
  Efs.getExt("frmData").submit(sRoleID);

}

// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
      Efs.getExt("RoleMWin").hide();
      Efs.getExt("rolegrid").store.load();
  }
  else
  {
    var xml_http = action.response;
    if(xml_http != null )
    {
      var objXML = xml_http.responseXML;
      
      alert("处理失败：" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
      objXML = null;
    }
    xml_http = null;
  }
}

</SCRIPT>
</HEAD>
<BODY>
<div id="roleTab" region="north" height="60" xtype="panel" border="false" title="角色管理">
   <form id="frmQry" method="post">
    <TABLE class="formAreaTop" width="100%" height="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="60">角色编号</td>
          <td width="100"><input type="text" class="Edit" kind="text" fieldname="ROLEID"></td>
          <td width="60">角色名称</td>
          <td width="100"><input type="text" class="Edit" fieldname="ROLENAME" operation="like" hint="模糊查询"></td>
          <td width="60">角色描述</td>
          <td width="100"><input type="text" class="Edit" fieldname="ROLEDES" operation="like" hint="模糊查询"></td>
          <td><input iconCls="icon-qry" type="button" value="查 询" onEfsClick="doQry()"></td>
          <td>&nbsp;</td>
        </tr>
        
      </TABLE>
    </form>
</div>

<div id="rolegrid" region="center" xtype="grid" title="" border="false" pagingBar="true" pageSize="20" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()" buttonAlign="center">
  <div xtype="tbar">
    <span style="font-size:9pt;font-weight:bold;color:#15428B;">角色列表</span>
    <div text="->"></div>
    <div iconCls="icon-add" text="增加角色#A" onEfsClick="onAddEx()"></div>
    <div text="-"></div>
    <div iconCls="icon-edit" id="cmdEdit" text="编辑角色#E" onEfsClick="onEditEx()" disabled="true"></div>
    <div text="-"></div>
    <div iconCls="icon-del" id="cmdDel" text="删除角色#D" onEfsClick="onDelEx()" disabled="true"></div>
    <div text="-"></div>
    <div iconCls="icon-back" text="返 回" onEfsClick="top.showTask()"></div>      
  </div>
  <div id="roleList" xtype="store" url="baseRefWeb.aspx?method=QryRoleList" txtXML='' autoLoad="false">
    <div xtype="xmlreader" fieldid="ROLEID" record="ROW" totalRecords="QUERYINFO@records">
      <div name="ROLEID" mapping="ROLEID"></div>
      <div name="ROLENAME" mapping="ROLENAME"></div>
      <div name="ROLEDES"></div>
    </div>
  </div>
  <div xtype="colmodel">
    <div header="角色编号" width="105" sortable="true" dataIndex="ROLEID" align="center"></div>
    <div header="角色名" width="200" sortable="true" dataIndex="ROLENAME" align="center"></div>
    <div header="角色描述" width="200" sortable="true" dataIndex="ROLEDES" align="center"></div>
  </div>
</div>



<!-- window开始 -->
<div iconCls="icon-panel" id="RoleMWin" xtype="window" width="500" height="180" title="添加角色" resizable="true" modal="true">
  <div region="center" xtype="panel" title="" border="false" autoScroll="true">
    <div xtype="tbar">
      <div text="->"></div>
      <div iconCls="icon-add" id="cmdUser" text="确  定" onEfsClick="doAdd()"></div>
    </div>
    <form id="frmData" class="efs-box" method="post" url="" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <TABLE class="formArea">
        <tr style="display:none">
          <td class="label">角色编号</td>
          <td><input type="text" kind="text" fieldname="ROLEBASIC/ROLEID" operation="0" writeevent="0" state="0" datatype="0"></td>
        </tr>
        <tr>
          <td class="label">角色名称</td>
          <td><input type="text" style="width:380px;" kind="text" fieldname="ROLEBASIC/ROLENAME" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td class="label">角色描述</td>
          <td><TEXTAREA class="Edit" kind="text" style="height:60px;width:380px" fieldname="ROLEBASIC/ROLEDES" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
    </form>
  </div>
</div>
<!-- window结束 -->

</BODY>
</HTML>