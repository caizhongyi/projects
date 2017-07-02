<%@ Page Language="C#" AutoEventWireup="true" CodeFile="roleedit.aspx.cs" Inherits="sysadmin_roleedit" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2009-10-28
//** 联系邮箱：   enjsky@163.com
//*******************************
-->

<%
  string strRoleID = Request["txtRoleID"];
%>
<HTML XMLNS:ELEMENT>
<head>
<title>角色维护</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT language="JavaScript">
<!--
Efs.onReady(
  function(){
    
    Efs.Common.ajax("baseRefWeb.aspx?method=RoleDetail","<%=strRoleID%>",function(succ,response,options){
     if(succ){ // 是否成功
       var xmlReturnDoc = response.responseXML;
       Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmPost"), "QUERYINFO");
     }
     else{
       alert("加载数据失败!");
     }
    });
    
    doReadyRight();
    doReadyUser();
  }
);
// 构造角色下的权限列表
function doReadyRight()
{
  Efs.getDom("eList").setAttribute("txtXML", "<%=strRoleID%>");
  Efs.getExt("eGrid").store.load();
}
// 构造角色下的用户列表
function doReadyUser()
{
  Efs.getDom("uList").setAttribute("txtXML", "<%=strRoleID%>");
  Efs.getExt("uGrid").store.load();
}

function doRet()
{
  location.href = "rolelist.aspx";
}

// 提交信息
function doSubmit()
{
  opType = "edit";
  Efs.getExt("frmPost").submit();
}

function toAddEventTypeToRole()
{
  Efs.getExt("toAddEWin").show();
  Efs.getDom("etrList").setAttribute("txtXML", "<%=strRoleID%>");
  Efs.getExt("etrGrid").store.load();
}

function toAddUserToRole()
{
  Efs.getExt("toAddUWin").show();
  var sTmpXml = "<?xml version='1.0'?><EFSFRAME><QUERYCONDITION currentpagenum='1'><PREDICATE/><CONDITIONS><TYPE>and</TYPE><CONDITION alias='' datatype=''><FIELDNAME sv=''>USERID</FIELDNAME><OPERATION>NOT IN</OPERATION><VALUE>(SELECT USERID FROM ROLEUSER WHERE ROLEID = '<%=strRoleID %>')</VALUE></CONDITION></CONDITIONS></QUERYCONDITION></EFSFRAME>"
  Efs.getDom("utrList").setAttribute("txtXML", sTmpXml);
  Efs.getExt("utrGrid").store.load();
}



var opType = "";
// 将事件添加到角色中
function AddEventToRoleSure()
{
	opType = "event";
  
  // var xml = Efs.getExt("etrGrid").getSelectedXml();
  var objXML = Efs.getExt("etrGrid").getDelXml(true);
  var Comm = Efs.Common;
  var sXmlTmp = "";
  for(var i=0;i<Comm.selectNodes(objXML,"//ROW").length;i++)
  {
    sXmlTmp = sXmlTmp + '<ROLEPOWER writeevent="0" operation="0"><ROLEID datatype="0" state="0"><%=strRoleID%></ROLEID><EVENTTYPEID datatype="0" state="0">' +
              Comm.getText(Comm.selectNodes(objXML,"//EVENTTYPEID")[i]) + '</EVENTTYPEID></ROLEPOWER>'
  }
  sXmlTmp = '<DATAINFO>' + sXmlTmp + '</DATAINFO>';
  objXML = null;

  Efs.getExt("frmPost").submit(sXmlTmp);
}

// 将用户添加到角色中
function AddUserToRoleSure()
{
  opType = "user";
  var objXML = Efs.getExt("utrGrid").getDelXml(true);
  var Comm = Efs.Common;
  
  var sXmlTmp = "";
  for(var i=0;i<Comm.selectNodes(objXML,"//ROW").length;i++)
  {
    sXmlTmp = sXmlTmp + '<ROLEUSER writeevent="0" operation="0"><ROLEID datatype="0" state="0"><%=strRoleID%></ROLEID><USERID datatype="0" state="0">' +
              Comm.getText(Comm.selectNodes(objXML,"//USERID")[i]) + '</USERID></ROLEUSER>'
  }
  sXmlTmp = '<DATAINFO>' + sXmlTmp + '</DATAINFO>';
  objXML = null;
  
  Efs.getExt("frmPost").submit(sXmlTmp);
}


// 删除角色包含的事件类型权限
function toDelEventType()
{
  opType = "delevent";
  var objXML = Efs.getExt("eGrid").getDelXml(true);
  var Comm = Efs.Common;
  
  var sXmlTmp = "";
  for(var i=0;i<Comm.selectNodes(objXML,"//ROW").length;i++)
  {
    sXmlTmp = sXmlTmp + '<ROLEPOWER writeevent="0" operation="2"><ROLEID datatype="0" state="5"><%=strRoleID%></ROLEID><EVENTTYPEID datatype="0" state="5">' +
              Comm.getText(Comm.selectNodes(objXML,"//EVENTTYPEID")[i]) + '</EVENTTYPEID></ROLEPOWER>'
  }
  sXmlTmp = '<DATAINFO>' + sXmlTmp + '</DATAINFO>';
  objXML = null;
  
  Efs.getExt("frmPost").submit(sXmlTmp);
}

// 删除角色中包含的用户
function toDelUser()
{
  opType = "deluser";
  var objXML = Efs.getExt("uGrid").getDelXml(true);
  var Comm = Efs.Common;
  
  var sXmlTmp = "";
  for(var i=0;i<Comm.selectNodes(objXML,"//ROW").length;i++)
  {
    sXmlTmp = sXmlTmp + '<ROLEUSER writeevent="0" operation="2"><ROLEID datatype="0" state="5"><%=strRoleID%></ROLEID><USERID datatype="0" state="5">' +
              Comm.getText(Comm.selectNodes(objXML,"//USERID")[i]) + '</USERID></ROLEUSER>';
  }
  sXmlTmp = '<DATAINFO>' + sXmlTmp + '</DATAINFO>';
  objXML = null;

  Efs.getExt("frmPost").submit(sXmlTmp);
}

// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    if(opType == "event")
    {
      Efs.getExt("toAddEWin").hide();
      doReadyRight();
    }
    else if(opType == "delevent")
      doReadyRight();
    else if(opType == "user")
    {
      Efs.getExt("toAddUWin").hide();
      doReadyUser();
    }
    else if(opType == "deluser")
      doReadyUser();
    else if(opType == "edit")
      location.href = "rolelist.aspx";
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

//-->
</SCRIPT>

</HEAD>

<BODY>
<div id="roleTab" region="center" buttonAlign="center" xtype="tabpanel" region="center" border="false" title="角色管理">
  <div id="tab1" title="角色属性">
    <form id="frmPost" name="frmPost" class="efs-box" url = "XmlDataDeal.aspx"; method="post" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <TABLE class="formArea">
        <tr>
          <td class="label">角色编号</td>
          <td><input type="text" class="Edit" readOnly kind="text" fieldname="ROLEBASIC/ROLEID" operation="1" writeevent="0" state="5" datatype="0"></td>
        </tr>
        <tr>
          <td class="label">角色名称</td>
          <td><input type="text" class="Edit" kind="text" fieldname="ROLEBASIC/ROLENAME" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td class="label">角色描述</td>
          <td><TEXTAREA class="Edit" kind="text" style="height:60px;width:380px" fieldname="ROLEBASIC/ROLEDES" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
      </form>
  </div>
  <div id="tab2" title="角色事件权限">
    <div id="eGrid" region="center" xtype="grid" title="" border="false" buttonAlign="center">
      <div xtype="tbar">
        <span style="font-size:9pt;font-weight:bold;color:#15428B;">角色事件权限列表</span>
        <div text="->"></div>
        <div iconCls="icon-add" id="cmdAddEvent" text="添加事件类型" onEfsClick="toAddEventTypeToRole()"></div>
        <div iconCls="icon-del" id="cmdDelEvent" text="删除事件类型" onEfsClick="toDelEventType()"></div>
      </div>
      <div id="eList" xtype="store" url="baseRefWeb.aspx?method=QryRoleRightList" txtXML='' autoLoad="false">
        <div xtype="xmlreader" fieldid="EVENTTYPEID" record="ROW" totalRecords="QUERYINFO@records">
          <div name="EVENTTYPEID" mapping="EVENTTYPEID"></div>
          <div name="EVENTTYPENAME" mapping="EVENTTYPENAME"></div>
          <div name="DISABLED"></div>
          <div name="SHORTCUT"></div>
          <div name="VISIBLE"></div>
        </div>
      </div>
      <div xtype="colmodel">
	      <div type="checkbox"></div>
        <div header="事件类型编号" width="105" sortable="true" dataIndex="EVENTTYPEID" align="center"></div>
        <div header="事件类型名" width="200" sortable="true" dataIndex="EVENTTYPENAME" align="center"></div>
        <div header="是否禁用" width="60" sortable="true" dataIndex="DISABLED" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
        <div header="是否快捷键" width="80" sortable="true" dataIndex="SHORTCUT" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
        <div header="是否显示" width="60" sortable="true" dataIndex="VISIBLE" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
      </div>
    </div>

  </div>
  <div id="tab3" title="角色用户">
    <div id="uGrid" region="center" xtype="grid" title="" border="false" buttonAlign="center">
      <div xtype="tbar">
        <span style="font-size:9pt;font-weight:bold;color:#15428B;">角色用户列表</span>
        <div text="->"></div>
        <div iconCls="icon-add" id="cmdAddUser" text="添加用户" onEfsClick="toAddUserToRole()"></div>
        <div iconCls="icon-del" id="cmdDelUser" text="删除用户" onEfsClick="toDelUser()"></div>
      </div>
      <div id="uList" xtype="store" url="baseRefWeb.aspx?method=QryRoleUserList" txtXML='' autoLoad="false">
        <div xtype="xmlreader" fieldid="USERID" record="ROW" totalRecords="QUERYINFO@records">
          <div name="USERID" mapping="USERID"></div>
          <div name="USERTITLE" mapping="USERTITLE"></div>
          <div name="USERNAME"></div>
          <div name="UNITNAME"></div>
          <div name="DISABLED"></div>
          <div name="USERTYPE"></div>
        </div>
      </div>
      <div xtype="colmodel">
        <div type="checkbox"></div>
        <div header="用户编号" width="105" sortable="true" dataIndex="USERID" align="center"></div>
        <div header="用户名称" width="100" sortable="true" dataIndex="USERTITLE" align="center"></div>
        <div header="用户姓名" width="100" sortable="true" dataIndex="USERNAME" align="center"></div>
        <div header="用户单位" width="200" sortable="true" dataIndex="UNITNAME" align="center"></div>
        <div header="是否禁用" width="60" sortable="true" dataIndex="DISABLED" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
        <div header="用户类型" width="80" sortable="true" dataIndex="USERTYPE" align="center" kind="dic" src="DIC_USERTYPE"></div>
      </div>
    </div>
  </div>
  
  	<div xtype="buttons">
     	<div iconCls="icon-ok" text="确  定" onEfsClick="doSubmit()"></div>
     	<div iconCls="icon-back" text="返  回" onEfsClick="doRet()"></div>
     </div>
  
</div>

		<!-- window开始 -->
    <div id="toAddEWin" xtype="window" width="450" height="360" title="给角色添加事件类型权限" resizable="true" modal="true">
	    <div id="etrGrid" region="center" xtype="grid" title="" border="false">
	      <div xtype="tbar">
	        <div text="->"></div>
	        <div iconCls="icon-ok" id="cmdAddEventToRole" text="确  定" onEfsClick="AddEventToRoleSure()"></div>
	      </div>
	      <div id="etrList" xtype="store" url="baseRefWeb.aspx?method=getEventTypeList_AddToRole" txtXML='' autoLoad="false">
	        <div xtype="xmlreader" fieldid="EVENTTYPEID" record="ROW" totalRecords="QUERYINFO@records">
	          <div name="EVENTTYPEID" mapping="EVENTTYPEID"></div>
	          <div name="EVENTTYPENAME" mapping="EVENTTYPENAME"></div>
	          <div name="DISABLED"></div>
	          <div name="SHORTCUT"></div>
	          <div name="VISIBLE"></div>
	        </div>
	      </div>
	      <div xtype="colmodel">
					<div type="checkbox"></div>
	        <div header="事件类型编号" width="80" sortable="true" dataIndex="EVENTTYPEID" align="center"></div>
	        <div header="事件类型名" width="100" sortable="true" dataIndex="EVENTTYPENAME" align="center"></div>
	        <div header="是否禁用" width="60" sortable="true" dataIndex="DISABLED" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
	        <div header="是否快捷键" width="70" sortable="true" dataIndex="SHORTCUT" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
	        <div header="是否显示" width="60" sortable="true" dataIndex="VISIBLE" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
	      </div>
	    </div>
    </div>
    <!-- window结束 -->

    <!-- window开始 -->
    <div id="toAddUWin" xtype="window" width="450" height="360" title="给角色添加用户" resizable="true" modal="true">
          <div id="utrGrid" region="center" pagingBar="true" pageSize="20" xtype="grid" title="" border="false">
            <div xtype="tbar">
              <div text="->"></div>
              <div iconCls="icon-ok2" id="cmdAddUserToRole" text="确  定" onEfsClick="AddUserToRoleSure()"></div>
            </div>
            <div id="utrList" xtype="store" url="baseRefWeb.aspx?method=userList_AddToRole" txtXML='' autoLoad="false">
              <div xtype="xmlreader" fieldid="USERID" record="ROW" totalRecords="QUERYINFO@records">
                <div name="USERID" mapping="USERID"></div>
                <div name="USERTITLE" mapping="USERTITLE"></div>
                <div name="USERNAME"></div>
                <div name="UNITNAME"></div>
                <div name="USERTYPE"></div>
              </div>
            </div>
            <div xtype="colmodel">
              <div type="checkbox"></div>
              <div header="用户编号" width="80" sortable="true" dataIndex="USERID" align="center"></div>
              <div header="用户名称" width="100" sortable="true" dataIndex="USERTITLE" align="center"></div>
              <div header="用户姓名" width="60" sortable="true" dataIndex="USERNAME" align="center"></div>
              <div header="用户单位" width="70" sortable="true" dataIndex="UNITNAME" align="center"></div>
              <div header="用户类型" width="60" sortable="true" dataIndex="USERTYPE" align="center" kind="dic" src="DIC_USERTYPE"></div>
            </div>
          </div>
    </div>
    <!-- window结束 -->


</BODY>
</HTML>


