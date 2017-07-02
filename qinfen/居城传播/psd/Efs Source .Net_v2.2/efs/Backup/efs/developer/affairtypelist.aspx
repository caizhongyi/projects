<%@ Page Language="C#" AutoEventWireup="true" CodeFile="affairtypelist.aspx.cs" Inherits="developer_affairtypelist" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** �����Ա��   Enjsky
//** ������ڣ�   2009-10-28
//** ��ϵ���䣺   enjsky@163.com
//*******************************
-->
<HTML>
<head>
<title>���������б�</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">

var sAffairTypeID = "";
function onEditEx()
{
  if(sAffairTypeID != "")
    location.href = "affairtypeEdit.aspx?txtAffairTypeID=" + sAffairTypeID;
}

function onAddEx()
{
   location.href = "affairtypeAdd.aspx";
}

function onDicEx()
{
    Efs.getDom("frmPost").setAttribute("url","CreateDicFile.aspx");
  
    Efs.getExt("frmPost").submit();
}

var g_XML = Efs.Common.getQryXml();

function doGridClick(data){
  sAffairTypeID = data["AFFAIRTYPEID"];
  if(sAffairTypeID != ""){
    Efs.getExt("cmdEdit").enable();
    Efs.getExt("cmdDel").enable();
  }
}

function onDel()
{
    if(confirm("ȷ��ɾ����"))
    {
        Efs.getDom("frmPost").setAttribute("url","../sysadmin/baseRefWeb.aspx?method=affairTypeDel");
      
        Efs.getExt("frmPost").submit(sAffairTypeID);
    }
  
}
// ��ȡ�첽�ύ�ķ��ؼ�������
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("affgrid").store.reload();
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
</SCRIPT>
</HEAD>
<BODY>

<div iconCls="icon-panel" title="���������б�" id="affgrid" region="center" xtype="grid" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()">
     <div xtype="tbar">
       <div text="->"></div>
       <div iconCls="icon-add" text="��������#A" onEfsClick="onAddEx()"></div>
      <div text="-"></div>
       <div iconCls="icon-edit" id="cmdEdit" text="�༭����#E" onEfsClick="onEditEx()" disabled="true"></div>
      <div text="-"></div>
       <div iconCls="icon-del" id="cmdDel" text="ɾ��#D" onEfsClick="onDel()" disabled="true"></div>
      <div text="-"></div>
       <div iconCls="icon-dic" text="�����ֵ��ļ�#T" onEfsClick="onDicEx()"></div>
      <div text="-"></div>
       <div iconCls="icon-back" text="�� ��" onEfsClick="top.showTask()"></div>
     </div>
  <div id="affList" xtype="store" url="../sysadmin/baseRefWeb.aspx?method=affairTypeList" baseParams="{txtXML:g_XML}" autoLoad="true">
    <div xtype="xmlreader" fieldid="AFFAIRTYPEID" record="ROW" totalRecords="QUERYINFO@records">
      <div name="AFFAIRTYPEID"></div>
      <div name="AFFAIRTYPENAME"></div>
      <div name="AFFAIRTYPEMODE" mapping="AFFAIRTYPEMODE"></div>
      <div name="AFFAIRTYPEDES"></div>
    </div>
  </div>
  <div xtype="colmodel">
    <div header="�������ͱ��" width="100" sortable="true" dataIndex="AFFAIRTYPEID" hidden="true"></div>
    <div header="������������" width="200" sortable="true" dataIndex="AFFAIRTYPENAME"></div>
    <div header="��������ģʽ" width="200" sortable="true" dataIndex="AFFAIRTYPEMODE" kind="dic" src="DIC_AFFAIRTYPEMODE"></div>
    <div header="������������" width="200" sortable="true" dataIndex="AFFAIRTYPEDES"></div>
  </div>
</div>

  <FORM id="frmPost" name="frmPost" url="" method="post" style="display:none;" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
    <INPUT type="hidden" name="txtDicName" value="AFFAIRTYPE">
  </FORM>
</BODY>
</HTML>