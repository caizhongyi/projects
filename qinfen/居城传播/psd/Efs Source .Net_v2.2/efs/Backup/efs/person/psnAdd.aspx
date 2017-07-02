<%@ Page Language="C#" AutoEventWireup="true" CodeFile="psnAdd.aspx.cs" Inherits="person_psnAdd" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2010-07-31
//** 联系邮箱：   enjsky@163.com
//*******************************
-->


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML XMLNS:ELEMENT>
<head>
<title>添加学生</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT language="JavaScript">
<!--
function doRet()
{
  location.href = "../task.aspx";
}

function reRet()
{
  Efs.getExt("frmPost").reset();
}

function doSubmit()
{
  if(Efs.getExt("frmPost").isValid())
    Efs.getExt("frmPost").submit();
}
//-->
</SCRIPT>
</HEAD>
<BODY>
<div xtype="panel" iconCls="titleIcon" title="添加学生" border="false" buttonAlign="center" autoScroll="true">
  <form id="frmPost" class="efs-box" method="post" action="">
      <TABLE class="formArea">
        <tr>
          <td labelFor="personid">学生编号</td>
          <td><input id="personid" type="text" hint="请输入10位的学生编号" kind="text" fieldname="PERSON/PERSONID" operation="0" writeevent="0" state="0" datatype="0" must="true" maxlength="10"></td>
        </tr>
        <tr>
          <td labelFor="pname">学生姓名</td>
          <td><input id="pname" type="text" kind="text" fieldname="PERSON/NAME" state="0" datatype="0" value="" must="true"></td>
        </tr>
        <tr>
          <td>身份证号码</td>
          <td><input type="text" kind="idcard" fieldname="PERSON/IDCARD" state="0" datatype="0" sex="xb" birthday="csrq"></td>
        </tr>
        <tr>
          <td>学生性别</td>
          <td><input type="text" id="xb" kind="dic" src="DIC_SEX" fieldname="PERSON/SEX" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td>出生日期</td>
          <td><input type="text" id="csrq" kind="date" fieldname="PERSON/BIRTHDAY" state="0" datatype="3"></td>
        </tr>
        <tr>
          <td>年龄</td>
          <td><input type="text"  kind="int" fieldname="PERSON/YEAROLD" state="0" datatype="1"></td>
        </tr>
        <tr>
          <td>描述</td>
          <td><TEXTAREA kind="text" style="height:60px;width:380px" fieldname="PERSON/BAK" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
	</form>
	 <div xtype="buttons">
     	<div text="提  交" onEfsClick="doSubmit()"></div>
     	<div text="清  空" onEfsClick="reRet()"></div>
     	<div text="返  回" onEfsClick="doRet()"></div>
     </div>

</div>

</BODY>
</HTML>

