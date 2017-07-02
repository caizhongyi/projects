<%@ Page Language="C#" AutoEventWireup="true" CodeFile="affairtypeAdd.aspx.cs" Inherits="developer_affairtypeAdd" %>
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
<title>添加事件类型</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT language="JavaScript">
<!--
function doRet()
{
  location.href = "affairtypelist.aspx";
}

function doSubmit()
{
  if(Efs.getDom("AFFAIRTYPEID").value.length != 6)
  {
    alert("事件类型必须是6位数值");
    return false;
  }
  Efs.getExt("frmPost").submit();
}
//-->
</SCRIPT>
</HEAD>
<BODY>
<div xtype="panel" iconCls="titleIcon" title="新增事务类型" border="false" buttonAlign="center" autoScroll="true">
  <form id="frmPost" class="efs-box" method="post" action="">
      <TABLE class="formArea">
        <tr>
          <td labelFor="AFFAIRTYPEID">事务类型编号</td>
          <td><input id="AFFAIRTYPEID" type="text" class="Edit" hint="事务类型编号请书写6位数字编号" kind="int" fieldname="AFFAIRTYPE/AFFAIRTYPEID" operation="0" writeevent="0" state="0" datatype="0" must="true" name="AffairTypeID" id="AffairTypeID" maxlength="6"></td>
        </tr>
        <tr>
          <td labelFor="AFFAIRTYPENAME">事务类型名称</td>
          <td><input id="AFFAIRTYPENAME" type="text" class="Edit" kind="text" fieldname="AFFAIRTYPE/AFFAIRTYPENAME" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td labelFor="AFFAIRTYPEMODE">事务类型模式</td>
          <td><input id="AFFAIRTYPEMODE" type="text" class="Edit" kind="dic" src="DIC_AFFAIRTYPEMODE" fieldname="AFFAIRTYPE/AFFAIRTYPEMODE" state="0" datatype="1" value="业务类" code="1" must="true"></td>
        </tr>
        <tr>
          <td>事务类型描述</td>
          <td><TEXTAREA class="Edit" kind="text" style="height:60px;width:380px" fieldname="AFFAIRTYPE/AFFAIRTYPEDES" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
	</form>
	 <div xtype="buttons">
     	<div text="确  定" onEfsClick="doSubmit()"></div>
     	<div text="返  回" onEfsClick="doRet()"></div>
     </div>

</div>

</BODY>
</HTML>
