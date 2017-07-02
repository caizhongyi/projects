<%@ Page Language="C#" AutoEventWireup="true" CodeFile="spelllist.aspx.cs" Inherits="sysadmin_spelllist" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** �����Ա��   Enjsky
//** ������ڣ�   2009-10-28
//** ��ϵ���䣺   enjsky@163.com
//*******************************
-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML>
<head>
<title>�û�ά��</title>
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
    alert("û��ѡ����");
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
    setTitle("�޸ĺ���");
    show();
  }
  
}

function doSubmit()
{
  Efs.getExt("frmPost").submit();
}

/// ɾ��
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
    setTitle("��Ӻ���");
    show();
  }
}

// ��ȡ�첽�ύ�ķ��ؼ�������
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
      
      alert("����ʧ�ܣ�" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
      objXML = null;
    }
    xml_http = null;
  }
}


var g_XML = Efs.Common.getQryXml();

</SCRIPT>
</HEAD>
<BODY>
<div iconCls="icon-panel" title="���ּ�ƴ��ά��" id="spellGrid" region="center" xtype="grid" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()">
     <div xtype="tbar">
     	<span></span>
     	<div iconCls="icon-add" text="���Ӻ���#A" onEfsClick="onAddEx()"></div>
      <div text="-"></div>
     	<div iconCls="icon-edit" id="cmdEdit" text="�༭����#E" onEfsClick="onEditEx()" disabled="true"></div>
      <div text="-"></div>
     	<div iconCls="icon-del" id="cmdDel" text="ɾ������#E" onEfsClick="onDelEx()" disabled="true"></div>
      <div text="-"></div>
     	<div iconCls="icon-back" text="�� ��" onEfsClick="top.showTask()"></div>      
     </div>
	<div id="affList" xtype="store" url="baseRefWeb.aspx?method=QrySpellList" baseParams="{txtXML:g_XML}" autoLoad="true">
		<div xtype="xmlreader" fieldid="WORD" record="ROW" tabName="SPELL" totalRecords="QUERYINFO@records">
			<div name="WORD" mapping="WORD"></div>
			<div name="SPELL" mapping="SPELL"></div>
			<div name="ASPELL"></div>
		</div>
	</div>
	<div xtype="colmodel">
		<div header="��" width="50" sortable="true" dataIndex="WORD"></div>
		<div header="ƴ��ͷ" width="50" sortable="true" dataIndex="SPELL"></div>
		<div header="ȫƴ" width="50" sortable="true" dataIndex="ASPELL"></div>
	</div>
</div>


<div id="WinSpell" xtype="window" title="ƴ��ά��" height="160" width="300" border="true">
  <form id="frmPost" name="frmPost" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <TABLE class="formArea">
        <tr>
          <td class="label">�ַ�</td>
          <td><input type="text" class="Edit" kind="text" name="txtText" fieldname="SPELL/WORD" must="true" name="txtText" id="txtText" state="0" operation="0"></td>
        </tr>
        <tr>
          <td class="label">ƴ��ͷ</td>
          <td><input type="text" class="Edit" kind="text" name="txtSpell" fieldname="SPELL/SPELL" must="true" name="txtSpell"></td>
        </tr>
        <tr>
          <td class="label">ȫƴ</td>
          <td><input type="text" class="Edit" kind="text" name="txtASpell" fieldname="SPELL/ASPELL" must="true" name="txtASpell">
          </td>
        </tr>
      </TABLE>
      </FORM>
    <div xtype="tbar">
      <div iconCls="icon-ok2" text="ȷ  ��" onEfsClick="doSubmit()"></div>
    </div>
</div>

</BODY>
</HTML>

