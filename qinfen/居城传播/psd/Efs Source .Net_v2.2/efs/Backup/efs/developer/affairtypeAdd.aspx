<%@ Page Language="C#" AutoEventWireup="true" CodeFile="affairtypeAdd.aspx.cs" Inherits="developer_affairtypeAdd" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** �����Ա��   Enjsky
//** ������ڣ�   2009-10-28
//** ��ϵ���䣺   enjsky@163.com
//*******************************
-->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML XMLNS:ELEMENT>
<head>
<title>����¼�����</title>
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
    alert("�¼����ͱ�����6λ��ֵ");
    return false;
  }
  Efs.getExt("frmPost").submit();
}
//-->
</SCRIPT>
</HEAD>
<BODY>
<div xtype="panel" iconCls="titleIcon" title="������������" border="false" buttonAlign="center" autoScroll="true">
  <form id="frmPost" class="efs-box" method="post" action="">
      <TABLE class="formArea">
        <tr>
          <td labelFor="AFFAIRTYPEID">�������ͱ��</td>
          <td><input id="AFFAIRTYPEID" type="text" class="Edit" hint="�������ͱ������д6λ���ֱ��" kind="int" fieldname="AFFAIRTYPE/AFFAIRTYPEID" operation="0" writeevent="0" state="0" datatype="0" must="true" name="AffairTypeID" id="AffairTypeID" maxlength="6"></td>
        </tr>
        <tr>
          <td labelFor="AFFAIRTYPENAME">������������</td>
          <td><input id="AFFAIRTYPENAME" type="text" class="Edit" kind="text" fieldname="AFFAIRTYPE/AFFAIRTYPENAME" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td labelFor="AFFAIRTYPEMODE">��������ģʽ</td>
          <td><input id="AFFAIRTYPEMODE" type="text" class="Edit" kind="dic" src="DIC_AFFAIRTYPEMODE" fieldname="AFFAIRTYPE/AFFAIRTYPEMODE" state="0" datatype="1" value="ҵ����" code="1" must="true"></td>
        </tr>
        <tr>
          <td>������������</td>
          <td><TEXTAREA class="Edit" kind="text" style="height:60px;width:380px" fieldname="AFFAIRTYPE/AFFAIRTYPEDES" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
	</form>
	 <div xtype="buttons">
     	<div text="ȷ  ��" onEfsClick="doSubmit()"></div>
     	<div text="��  ��" onEfsClick="doRet()"></div>
     </div>

</div>

</BODY>
</HTML>
