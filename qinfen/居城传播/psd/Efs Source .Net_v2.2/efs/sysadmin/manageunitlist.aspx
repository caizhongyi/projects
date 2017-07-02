<%@ Page Language="C#" AutoEventWireup="true" CodeFile="manageunitlist.aspx.cs" Inherits="sysadmin_manageunitlist" %>
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
<title>��λά��</title>
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

// �����ѯ
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
    setTitle("��ӵ�λ");
    show();
  }
}


function onEditEx()
{
  if(sUnitID == "")
  {
    alert("û��ѡ��λ");
    return false;
  }
  Efs.getExt("frmData").reset();
  
  Efs.Common.ajax("baseRefWeb.aspx?method=QryUnitDetail&txtUnitID=" + sUnitID,"",function(succ,response,options){
   if(succ){ // �Ƿ�ɹ�
     var xmlReturnDoc = response.responseXML;
     Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmData"), "QUERYINFO");
   }
   else{
     alert("��������ʧ��!");
   }
  });
  
  Efs.getDom("MUnitID").setAttribute("operation", "1");
  Efs.getDom("MUnitID").setAttribute("state", "5");
  
  
  with(Efs.getExt("UnitMWin"))
  {
    setTitle("�޸ĵ�λ");
    show();
  }
}

function doMUnit()
{
  Efs.getExt("frmData").submit();
}

// ��ȡ�첽�ύ�ķ��ؼ�������
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
      
      alert("����ʧ�ܣ�" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
      objXML = null;
    }
    xml_http = null;
  }
}

function onDelEx()
{
  if(sUnitID == "420100000000")
  {
    alert("Ȩ�޲���");
    return false;
  }
  
  if(sUnitID == "")
  {
    alert("û��ѡ��λ");
    return false;
  }
  
  if(!confirm("ȷ��Ҫɾ����"))
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
<div iconCls="icon-panel" region="north" height="60" title="��λ��ѯ" border="false">
 <form id="frmQry"  method="post">
  <TABLE class="formAreaTop" width="100%" height="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>&nbsp;</td>
        <TD width="60">��λ���</TD>
        <TD width="160"><INPUT fieldname="MUNITID" type="text" kind="text"></TD>
        <TD width="60">��λ����</TD>
        <TD width="160"><INPUT fieldname="MUNITNAME" type="text" operation="like" hint="ģ����ѯ"></TD>
        <TD width="60">�ϼ���λ</TD>
        <TD width="160"><INPUT fieldname="MSUNITID" type="text" kind="dic" src="MANAGEUNIT"></TD>
        <TD width="60">��λ����</TD>
        <TD width="160"><INPUT fieldname="MLEVEL" type="text" kind="dic" src="DIC_MLEVEL"></TD>
        <td><input iconCls="icon-qry" type="button" value="�� ѯ" onEfsClick="doQry()"></td>
        <td>&nbsp;</td>
      </TR>
    </TABLE>
  </form>
</div>

<div id="unitgrid" region="center" xtype="grid" title="" border="false" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" buttonAlign="center">
  <div xtype="tbar">
    <span style="font-size:9pt;font-weight:bold;color:#15428B;">��λ�б�</span>
    <div text="->"></div>
    <div iconCls="icon-add" text="���ӵ�λ#A" onEfsClick="onAddEx()"></div>
    <div iconCls="icon-edit" id="cmdEdit" text="�༭��λ#E" onEfsClick="onEditEx()" disabled="true"></div>
    <div iconCls="icon-del" id="cmdDel" text="ɾ����λ#D" onEfsClick="onDelEx()" disabled="true"></div>
    <div iconCls="icon-dic" id="cmdDic" text="�����ֵ��ļ�#T" onEfsClick="onDicEx()"></div>
    <div iconCls="icon-back" text="�� ��" onEfsClick="top.showTask()"></div>      
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
		<div header="��λ���" width="80" sortable="true" dataIndex="MUNITID" align="center"></div>
		<div header="��λ����" width="120" sortable="true" dataIndex="MUNITNAME" align="center"></div>
		<div header="�ϼ���λ" width="120" sortable="true" dataIndex="MSUNITID" align="center" kind="dic" src="MANAGEUNIT"></div>
		<div header="��λ����" width="80" sortable="true" dataIndex="MTYPE" kind="dic" src="DIC_MTYPE"></div>
		<div header="��λ����" width="60" sortable="true" dataIndex="MLEVEL" align="center" kind="dic" src="DIC_MLEVEL"></div>
    <div header="�Ƿ���Ч" width="80" sortable="true" dataIndex="VALID" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
	</div>
</div>


    <!-- window��ʼ -->
    <div iconCls="icon-panel" id="UnitMWin" xtype="window" width="560" height="250" title="����û�" resizable="true" modal="true">
      <div region="center" xtype="panel" title="" border="false" autoScroll="true">
        <div xtype="tbar">
          <div text="->"></div>
          <div iconCls="icon-ok2" id="cmdUser" text="ȷ  ��" onEfsClick="doMUnit()"></div>
        </div>
        <form txtXML="" id="frmData" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
        <TABLE class="formArea">
          <tr>
            <td class="label">��λ���</td>
            <td><input type="text" class="Edit" name="MUnitID" id="MUnitID" maxlength="16" kind="text" fieldname="MANAGEUNIT/MUNITID" must="true" operation="0" writeevent="0" state="0" datatype="0"></td>
            <td class="label">��λ����</td>
            <td><input type="text" class="Edit" kind="dic" src="DIC_MTYPE" fieldname="MANAGEUNIT/MTYPE" state="0" datatype="0" must="true"></td>
          </tr>
          <tr>
            <td class="label">��λ����</td>
            <td colspan="3"><input type="text" style="width:385px" class="Edit" kind="text" fieldname="MANAGEUNIT/MUNITNAME" state="0" datatype="0" must="true"></td>
          </tr>
          <tr>
            <td class="label">�ϼ���λ</td>
            <td colspan="3"><input type="text" class="Edit" style="width:385px"  kind="dic" src="MANAGEUNIT" state="0" datatype="0" fieldname="MANAGEUNIT/MSUNITID" must="true"></td>
          </tr>
          <tr>
            <td class="label">�Ƿ���Ч</td>
            <td><input type="text" class="Edit" kind="dic" src="DIC_TRUEFALSE" fieldname="MANAGEUNIT/VALID" state="0" datatype="1" code="1" value="��" must="true"></td>
            <td class="label">��λ����</td>
            <td><input type="text" class="Edit" kind="dic" src="DIC_MLEVEL" fieldname="MANAGEUNIT/MLEVEL" state="0" datatype="1" must="true"></td>
          </tr>
          <tr>
            <td class="label">����λ����</td>
            <td colspan="3"><TEXTAREA class="Edit" kind="text" style="height:60px;width:385px" fieldname="MANAGEUNIT/MDES" state="0" datatype="0"></TEXTAREA></td>
          </tr>
        </TABLE>
        </form>
      </div>
    </div>
    <!-- window���� -->
    
    
    <form id="frmPost" class="efs-box" method="post" url="baseRefWeb.aspx?method=CreateDicFile" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
    </form>
</BODY>
</HTML>

