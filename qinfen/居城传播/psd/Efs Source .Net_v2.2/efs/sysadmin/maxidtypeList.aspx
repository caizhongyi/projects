<%@ Page Language="C#" AutoEventWireup="true" CodeFile="maxidtypeList.aspx.cs" Inherits="sysadmin_maxidtypeList" %>
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
<title>��������б�</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">

var g_XML = Efs.Common.getQryXml();

var sMaxIDType = "";

function onAddEx()
{
  Efs.getDom("IDType").setAttribute("operation", "0");
  Efs.getDom("IDType").setAttribute("state", "0");
  Efs.getDom("IDType").readOnly = false;

  Efs.getExt("frmPost").reset();
  with(Efs.getExt("MaxTypeWin"))
  {
    setTitle("��ӱ������");
    show();
  }
}

function onEditEx()
{
  if(sMaxIDType == "")
  {
    alert("û��ѡ��������");
    return false;
  }
  Efs.getExt("frmPost").reset();
  
  Efs.Common.ajax("baseRefWeb.aspx?method=QryMaxTypeDetail&txtMaxIDType=" + sMaxIDType,"",function(succ,response,options){
   if(succ){ // �Ƿ�ɹ�
     var xmlReturnDoc = response.responseXML;
     Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmPost"), "QUERYINFO");
   }
   else{
     alert("��������ʧ��!");
   }
  });
  
  Efs.getDom("IDType").setAttribute("operation", "1");
  Efs.getDom("IDType").setAttribute("state", "5");
  Efs.getDom("IDType").readOnly = true;
  
  
  with(Efs.getExt("MaxTypeWin"))
  {
    setTitle("�޸��û�");
    show();
  }
  
}
// ɾ���������
function onDelEx()
{
  if(sMaxIDType == "")
  {
    alert("û��ѡ��������");
    return false;
  }
  if(!confirm("ȷ��Ҫɾ����"))
    return false;
    
  var strXml = "<DATAINFO><MAXIDTYPE writeevent='0' operation='2'><IDTYPE datatype='0' state='5'>" + sMaxIDType + "</IDTYPE></MAXIDTYPE></DATAINFO>";
  Efs.getExt("frmPost").submit(strXml);
}

function doGridClick(data){
	sMaxIDType = data["IDTYPE"]
	if(sMaxIDType != ""){
		Efs.getExt("cmdEdit").enable();
    Efs.getExt("cmdDel").enable();
    Efs.getExt("cmdMaxID").enable();
	}
}

function doMaxType()
{
  if(Efs.getDom("IDType").value.length != 6)
  {
    alert("�����ű�����6λ");
    return false;
  }
  
  Efs.getExt("frmPost").submit();
}

// ��ȡ�첽�ύ�ķ��ؼ�������
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    if(opObj != "maxid") {
      Efs.getExt("MaxTypeWin").hide();
      Efs.getExt("maxgrid").store.load();
    }
    else {
      Efs.getExt("maxidGrid").store.load();
    }
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


function onMaxID()
{
  Efs.getExt("MaxIDWin").show();  
  Efs.getDom("maxidList").setAttribute("txtXML", sMaxIDType);
  Efs.getExt("maxidGrid").store.load();
}


var opObj = "";
// ɾ���Ѿ�����ı���
function onMaxIDDel()
{
  if(!confirm("ȷʵҪɾ����"))
  {
    return false;
  }
  opObj = "maxid";
  
  var objXML = Efs.getExt("maxidGrid").getSelectedXml(true);
  var Comm = Efs.Common;

  if(Comm.getNode(objXML,"//DATAINFO/MAXID")) {
    for(var i=0;i<Comm.selectNodes(objXML,"//DATAINFO/MAXID").length;i++)
    {
      Comm.selectNodes(objXML,"//DATAINFO/MAXID")[i].setAttribute("operation","2");
      Comm.selectNodes(objXML,"//DATAINFO/MAXID/IDTYPE")[i].setAttribute("state","5");
      Comm.selectNodes(objXML,"//DATAINFO/MAXID/IDTYPE")[i].setAttribute("datatype","0");
      Comm.selectNodes(objXML,"//DATAINFO/MAXID/ID1")[i].setAttribute("state","5");
      Comm.selectNodes(objXML,"//DATAINFO/MAXID/ID1")[i].setAttribute("datatype","0");
      Comm.selectNodes(objXML,"//DATAINFO/MAXID/MAXID")[i].setAttribute("state","5");
      Comm.selectNodes(objXML,"//DATAINFO/MAXID/MAXID")[i].setAttribute("datatype","0");
    }
    var sXmlTmp = Comm.getXML(objXML);
    objXML = null;
    
    Efs.getExt("frmPost").submit(sXmlTmp);
  }
  else {
    alert("û��ѡ���ѷ���ı���");
  }
  
}
</SCRIPT>
</HEAD>
<BODY>

<div iconCls="icon-panel" id="maxgrid" region="center" xtype="grid" title="����������" pagingBar="true" pageSize="20" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()" buttonAlign="center">
  <div xtype="tbar">
    <span style="font-size:9pt;font-weight:bold;color:#15428B;">�����б�</span>
    <div text="->"></div>
    <div iconCls="icon-add" text="���ӱ���#A" onEfsClick="onAddEx()"></div>
    <div text="-"></div>
    <div iconCls="icon-deal" text="���봦��">
      <div iconCls="icon-edit" id="cmdEdit" text="�޸ı���#E" onEfsClick="onEditEx()" disabled="true"></div>
      <div text="-"></div>
      <div iconCls="icon-del" id="cmdDel" text="ɾ������#D" onEfsClick="onDelEx()" disabled="true"></div>
      <div text="-"></div>
      <div iconCls="icon-doc" id="cmdMaxID" text="�ѷ���������" onEfsClick="onMaxID()" disabled="true"></div>
    </div>
    <div text="-"></div>
    <div iconCls="icon-back" text="�� ��" onEfsClick="top.showTask()"></div>      
  </div>
	<div id="maxList" xtype="store" url="baseRefWeb.aspx?method=QryMaxIDTypeList" baseParams="{txtXML:g_XML}" autoLoad="true">
		<div xtype="xmlreader" fieldid="IDTYPE" tabName="MAXIDTYPE" record="ROW" totalRecords="QUERYINFO@records">
			<div name="IDTYPE" mapping="IDTYPE"></div>
			<div name="IDNAME" mapping="IDNAME"></div>
			<div name="IDSIZE"></div>
			<div name="IDPARA"></div>
			<div name="IDLOOP"></div>
			<div name="IDMIN"></div>
			<div name="IDMAX"></div>
		</div>
	</div>
	<div xtype="colmodel">
    <div type="radio"></div>
		<div header="������" width="80" sortable="true" dataIndex="IDTYPE" align="center"></div>
		<div header="��������" width="120" sortable="true" dataIndex="IDNAME" align="left"></div>
		<div header="���볤��" width="60" sortable="true" dataIndex="IDSIZE" align="center"></div>
		<div header="�������" width="80" sortable="true" dataIndex="IDPARA" align="center" kind="dic" src="DIC_IDPARA"></div>
		<div header="�Ƿ�ѭ��" width="60" sortable="true" dataIndex="IDLOOP" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
		<div header="��Сֵ" width="80" sortable="true" dataIndex="IDMIN" align="center"></div>
		<div header="���ֵ" width="100" sortable="true" dataIndex="IDMAX" align="left"></div>
	</div>
</div>

<div iconCls="icon-panel" id="MaxIDWin" xtype="window" width="280" height="400" title="�ѷ�������б�" resizable="true" modal="true">
  <div id="maxidGrid" region="center" xtype="grid" title="">
    <div xtype="tbar">
      <div text="->"></div>
      <div iconCls="icon-del" id="cmdMaxIDDel" text="ɾ���ѷ������#D" onEfsClick="onMaxIDDel()"></div>
    </div>
    <div id="maxidList" xtype="store" url="baseRefWeb.aspx?method=QryMaxList" txtXML="" autoLoad="false">
      <div xtype="xmlreader" fieldid="ID1" tabName="MAXID" record="ROW">
        <div name="IDTYPE"></div>
        <div name="ID1"></div>
        <div name="MAXID"></div>
      </div>
    </div>
    <div xtype="colmodel">
      <div type="checkbox"></div>
      <div header="������" width="60" sortable="true" dataIndex="IDTYPE" align="center"></div>
      <div header="����" width="60" sortable="true" dataIndex="ID1" align="center"></div>
      <div header="��ǰֵ" width="80" sortable="true" dataIndex="MAXID" align="center"></div>
    </div>
  </div>
</div>

<!-- window��ʼ -->
<div iconCls="icon-panel" id="MaxTypeWin" xtype="window" width="500" height="190" title="��ӱ������" resizable="true" modal="true">
  <div region="center" xtype="panel" title="" border="false" autoScroll="true">
    <div xtype="tbar">
      <div text="->"></div>
      <div iconCls="icon-add" id="cmdUser" text="ȷ  ��" onEfsClick="doMaxType()"></div>
    </div>
    <form id="frmPost" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
    <TABLE class="formArea">
      <tr>
        <td class="label">������</td>
        <td><input type="text" class="Edit" name="IDType" id="IDType" maxlength="6" kind="int" fieldname="MAXIDTYPE/IDTYPE" must="true" operation="0" writeevent="0" state="0" datatype="0"></td>
        <td>&nbsp;</td>
        <td class="label">��������</td>
        <td><input type="text" class="Edit" kind="text" fieldname="MAXIDTYPE/IDNAME" state="0" datatype="0" must="true"></td>
      </tr>
      <tr>
        <td class="label">���볤��</td>
        <td><input type="text" class="Edit" kind="int" fieldname="MAXIDTYPE/IDSIZE" state="0" datatype="1" must="true"></td>
        <td>&nbsp;</td>
        <td class="label">�������</td>
        <td><input type="text" class="Edit" kind="dic" src="DIC_IDPARA" fieldname="MAXIDTYPE/IDPARA" state="0" datatype="0" must="true"></td>
      </tr>
      <tr>
        <td class="label">�Ƿ�ѭ��</td>
        <td><input type="text" class="Edit" kind="dic" src="DIC_TRUEFALSE" fieldname="MAXIDTYPE/IDLOOP" state="0" datatype="0" must="true"></td>
        <td>&nbsp;</td>
        <td class="label">��Сֵ</td>
        <td><input type="text" class="Edit" kind="int" fieldname="MAXIDTYPE/IDMIN" state="0" datatype="1" must="true"></td>
      </tr>
      <tr>
        <td class="label">���ֵ</td>
        <td><input type="text" class="Edit" kind="int" fieldname="MAXIDTYPE/IDMAX" state="0" datatype="1" must="true"></td>
      </tr>
    </TABLE>
    </form>
  </div>
</div>
<!-- window���� -->
  
</BODY>
</HTML>