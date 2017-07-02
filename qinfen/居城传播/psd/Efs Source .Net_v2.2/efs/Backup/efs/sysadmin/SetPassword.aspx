<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SetPassword.aspx.cs" Inherits="sysadmin_SetPassword" %>
<!--#include file="../checkLog.inc" -->
<%
Efsframe.cn.baseManage.UserSession userSession = ((Efsframe.cn.baseManage.UserSession)Session["RoleUser"]);
%>
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
<title>用户维护 -- 设置口令</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT language="JavaScript">
<!--
function doSubmit()
{
  var newpasswd = Efs.getDom("newpasswd");
  var newpasswd2 = Efs.getDom("newpasswd2");  
  if (newpasswd.value != newpasswd2.value) {
    newpasswd.value = newpasswd2.value = "";
    newpasswd.focus();
    alert("输入的两个口令不一致，请重新输入！");
    return false;
  }
  Efs.getExt("frmPost").submit();
}


// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    alert("修改成功");
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
<div xtype="panel" title="设置口令" autoHeight="true" border="false" buttonAlign="center">
  <form id="frmPost" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <table>
        <tr>
          <td class="label">旧的口令</td>
          <td><input type="password" id="oldpasswd" class="Edit" kind="text" fieldname="USERLIST/OLDPASSWORD" must="true" maxlength="12" ignore="true"></td>
        </tr>
        <tr>
          <td class="label">新的口令</td>
          <td><input type="password" id="newpasswd" class="Edit" kind="text" operation="1" writeevent="0" state="0" datatype="0" fieldname="USERLIST/USERPASSWORD" must="true" maxlength="12"></td>
        </tr>
        <tr>
          <td class="label">再次确认新口令</td>
          <td><input type="password" id="newpasswd2" class="Edit" kind="text" fieldname="" must="true" maxlength="12" ignore="true"></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="hidden" class="Edit" kind="text" fieldname="USERLIST/USERID" state="5" datatype="0" value="<%=userSession.getUserID()%>"></td>
        </tr>
      </table>
      </FORM>
	<div xtype="buttons">
     	<div text="确  定" onEfsClick="doSubmit()"></div>
     	<div text="返  回" onEfsClick="doRet()"></div>
     </div>
</div>

</BODY>
</HTML>

