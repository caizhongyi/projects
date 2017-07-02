<%@ Page Language="C#" AutoEventWireup="true" CodeFile="diclist.aspx.cs" Inherits="sysadmin_diclist" %>
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
<title>��ͨ�ֵ��б�</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">
var sDicName = ""
var sDicDes = ""

function onEditDicTm()
{
  if(sDicName == "")
  {
    alert("û��ѡ���ֵ�");
    return false;
  }
  Efs.getExt("DicWin").setTitle("�����ֵ���Ŀ��" + sDicName);
  Efs.getExt("DicWin").show();
  
  Efs.getDom("datastore").setAttribute("txtXML", "<?xml version='1.0'?><EFSFRAME efsframe='urn=www-efsframe-cn' version='1.0'><QUERYCONDITION currentpagenum='1' dicname='" + sDicName + "'></QUERYCONDITION></EFSFRAME>");
  Efs.getExt("datagrid").store.load();
}

function onAddDicEx()
{
  Efs.getExt("winDic").show();
}

Efs.onReady(
  function(){	
  	Efs.getDom("dicList").setAttribute("txtXML", Efs.Common.getQryXml());
  	Efs.getExt("dicTab").setActiveTab(1);
  	Efs.getExt("dicgrid").store.load();
  }
);

// �����ѯ
function doQry()
{
	Efs.getDom("dicList").setAttribute("txtXML", Efs.Common.getQryXml(Efs.getExt("frmQry")));
	Efs.getExt("dicTab").setActiveTab(1);
	Efs.getExt("dicgrid").store.load();
}

function doGridClick(data)
{
	sDicName = data["DICNAME"];
 	sDicDes = data["DICDES"];
  
  Efs.getExt("cmdEditTm").enable();
  Efs.getExt("cmdDic").enable();
  Efs.getExt("cmdDel").enable();
}

// �����ֵ��ļ�
function onCreateDic()
{
  with(document.frmPost) {
    setAttribute("url", "../developer/CreateDicFile.aspx");
    txtDicName.value = sDicName;
  }

  Efs.getExt("frmPost").submit();
}

// ɾ���ֵ�
function onDelDic()
{
  if(!confirm("ȷ��Ҫɾ����"))
    return false;

  var sXmlTmp = '<DATAINFO><DICLIST operation="2"><DICNAME state="5" datatype="0">' + sDicName + '</DICNAME></DICLIST><DICDATA operation="2"><DICNAME state="5" datatype="0">' + sDicName + '</DICNAME></DICDATA></DATAINFO>';
  
  Efs.getDom("frmPost").setAttribute("url","XmlDataDeal.aspx");
  Efs.getExt("frmPost").submit(sXmlTmp);
  
}

// ��ȡ�첽�ύ�ķ��ؼ�������
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("winDic").hide();
    Efs.getExt("dicgrid").store.load();
  }
  else
  {
    var xml_http = action.response;
    
    var strRet = xml_http.reponseText;
    if(strRet == "")
    {
      alert("�������");
    }
    
    xml_http = null;
  }
}

// �ֵ���Ŀ�ĵ����¼�
function doItemGridClick(data)
{
  Efs.getDom("ItemDicCode").value = data["DIC_CODE"];
  Efs.getDom("ItemDicText").value = data["DIC_TEXT"];
  Efs.getExt("cmdItemEdit").enable();
  Efs.getExt("cmdItemDel").enable();  
}



function onItemDelDic()
{
  var objXML = Efs.getExt("datagrid").getSelectedXml(true);
  var Comm = Efs.Common;
  if(Comm.getNode(objXML,"//DATAINFO/DICDATA")) {
    for(var i=0;i<Comm.selectNodes(objXML,"//DATAINFO/DICDATA").length;i++)
    {
      Comm.selectNodes(objXML,"//DATAINFO/DICDATA")[i].setAttribute("operation","2");
      Comm.selectNodes(objXML,"//DATAINFO/DICDATA/DICNAME")[i].setAttribute("state","5");
      Comm.selectNodes(objXML,"//DATAINFO/DICDATA/DICNAME")[i].setAttribute("datatype","0");
      Comm.selectNodes(objXML,"//DATAINFO/DICDATA/DIC_CODE")[i].setAttribute("state","5");
      Comm.selectNodes(objXML,"//DATAINFO/DICDATA/DIC_CODE")[i].setAttribute("datatype","0");
    }
    var sXmlTmp = Comm.getXML(objXML);
    objXML = null;
  }
  
  Efs.getExt("frmItemPost").submit(sXmlTmp);
}

function onItemAdd()
{
  Efs.getExt("frmItemPost").reset();

  Efs.getDom("ItemDicName").value = sDicName;
  Efs.getDom("ItemDicCode").readOnly = false;
  Efs.getDom("ItemDicCode").setAttribute("operation", "0");
  Efs.getDom("ItemDicCode").setAttribute("state", "0");
  Efs.getDom("ItemDicName").setAttribute("state", "0");


  with(Efs.getExt("DicItemWin"))
  {
    setTitle("����ֵ���Ŀ");
    show();
  }
}

function onItemEdit()
{
  Efs.getDom("ItemDicName").value = sDicName;
  Efs.getDom("ItemDicCode").readOnly = true;
  Efs.getDom("ItemDicCode").setAttribute("operation", "1");
  Efs.getDom("ItemDicCode").setAttribute("state", "5");
  Efs.getDom("ItemDicName").setAttribute("state", "5");
  

  with(Efs.getExt("DicItemWin"))
  {
    setTitle("�޸��ֵ���Ŀ");
    show();
  }
}

// �ύ ��ӻ����޸�ɾ���ֵ���Ŀ
function doItemSubmit()
{
  Efs.getExt("frmItemPost").submit();
}

// ��ȡ�첽�ύ�ķ��ؼ�������
function frmItemSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getDom("datastore").setAttribute("txtXML", "<?xml version='1.0'?><EFSFRAME efsframe='urn=www-efsframe-cn' version='1.0'><QUERYCONDITION currentpagenum='1' dicname='" + sDicName + "'></QUERYCONDITION></EFSFRAME>");
    Efs.getExt("datagrid").store.load();
    Efs.getExt("DicItemWin").hide();
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


function doAddDic()
{
  var sXmlTmp = Efs.Common.getOpXml(Efs.getExt("frmDic"));
  
  Efs.getDom("frmPost").setAttribute("url","XmlDataDeal.aspx");
  Efs.getExt("frmPost").submit(sXmlTmp);
}

</SCRIPT>
</HEAD>
<BODY>
<div id="dicTab" region="center" xtype="tabpanel" region="center" border="false" title="�ֵ�ά��" activeTab="0">
     <div id="tab1" title="�ֵ�򵥲�ѯ"  buttonAlign="center">
     <form id="frmQry" class="efs-box" method="post">
      <TABLE class="formArea">
        <tr>
          <td class="label">�ֵ�����</td>
          <td><input type="text" class="Edit" kind="text" fieldname="DICNAME"></td>
        </tr>
        <tr>
          <td class="label">�ֵ�����</td>
          <td><input type="text" class="Edit" kind="text" fieldname="DICDES"></td>
        </tr>
        <tr>
          <td class="label">�ֵ���볤��</td>
          <td><input type="text" class="Edit" kind="float" fieldname="CODELEN"></td>
        </tr>
        <tr>
          <td class="label">�ֵ��޸�Ȩ��</td>
          <td><input type="text" class="Edit" kind="dic" src="DIC_DICEDITABLE" fieldname="EDITABLE"></td>
        </tr>
      </TABLE>   
      </form>
      <div xtype="buttons">
     	  <div text="��  ѯ" onEfsClick="doQry()"></div>
      </div>       
     </div>
     
     <div id="tab2" title="�ֵ��б�">

        <div id="dicgrid" region="center" xtype="grid" title="" border="false" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" buttonAlign="center">
        <div xtype="tbar">
          <span style="font-size:9pt;font-weight:bold;color:#15428B;">�ֵ��б�</span>
          <div text="-"></div>
          <div iconCls="icon-deal" text="�ֵ����">
            <div iconCls="icon-add" text="�����ֵ�#A" onEfsClick="onAddDicEx()"></div>
            <div text="-"></div>
            <div iconCls="icon-del" id="cmdDel" text="ɾ���ֵ�#D" onEfsClick="onDelDic()" disabled="true"></div>
          </div>
          <div iconCls="icon-edit" id="cmdEditTm" text="�ֵ���Ŀά��#E" onEfsClick="onEditDicTm()" disabled="true"></div>
          <div text="-"></div>
          <div iconCls="icon-dic" id="cmdDic" text="�����ֵ��ļ�#C" onEfsClick="onCreateDic()" disabled="true"></div>
          <div text="-"></div>
          <div iconCls="icon-back" text="�� ��" onEfsClick="top.showTask()"></div>   
        </div>
        	<div id="dicList" xtype="store" url="baseRefWeb.aspx?method=QryDicList" txtXML='' autoLoad="false">
				<div xtype="xmlreader" fieldid="DICNAME" record="ROW" totalRecords="QUERYINFO@records">
					<div name="DICNAME" mapping="DICNAME"></div>
					<div name="DICDES" mapping="DICDES"></div>
					<div name="CODELEN"></div>
					<div name="EDITABLE"></div>
				</div>
			</div>
			<div xtype="colmodel">
				<div header="�ֵ�����" width="105" sortable="true" dataIndex="DICNAME"></div>
				<div header="�ֵ���������" width="200" sortable="true" dataIndex="DICDES"></div>
				<div header="���볤��" width="200" sortable="true" dataIndex="CODELEN"></div>
				<div header="�ֵ�����" width="200" sortable="true" dataIndex="EDITABLE" kind="dic" src="DIC_DICEDITABLE"></div>
			</div>		
		</div>
     </div>
</div>        

<div iconCls="icon-panel" id="DicWin" xtype="window" width="540" height="320" title="�����ֵ���Ŀ" resizable="true" modal="true">
  <div id="datagrid" region="center" xtype="grid" title="" pagingBar="true" pageSize="20" onEfsRowclick="doItemGridClick()">
     <div xtype="tbar">
      <div iconCls="icon-add" text="������Ŀ#A" onEfsClick="onItemAdd()"></div>
      <div text="-"></div>
      <div iconCls="icon-edit" id="cmdItemEdit" text="�༭��Ŀ#E" onEfsClick="onItemEdit()" disabled="true"></div>
      <div text="-"></div>
      <div iconCls="icon-del" id="cmdItemDel" text="ɾ����Ŀ#D" onEfsClick="onItemDelDic()" disabled="true"></div>
      <div text="-"></div>
      <div iconCls="icon-dic" id="cmdItemDic" text="�����ֵ��ļ�#C" onEfsClick="onCreateDic()"></div>
     </div>
    <div id="datastore" xtype="store" url="baseRefWeb.aspx?method=QryDicDataList" txtXML='' autoLoad="false">
      <div xtype="xmlreader" fieldid="DIC_CODE" tabName="DICDATA" record="ROW" totalRecords="QUERYINFO@records">
        <div name="DIC_CODE" mapping="DIC_CODE"></div>
        <div name="DIC_TEXT" mapping="DIC_TEXT"></div>
        <div name="DIC_VALID"></div>
        <div name="DICNAME"></div>
      </div>
    </div>
    <div xtype="colmodel">
      <div header="�ֵ����" width="80" sortable="true" dataIndex="DIC_CODE"></div>
      <div header="�ֵ�����" width="260" sortable="true" dataIndex="DIC_TEXT"></div>
      <div header="�Ƿ���Ч" width="80" sortable="true" dataIndex="DIC_VALID" kind="dic" src="DIC_TRUEFALSE"></div>
      <div header="�ֵ���" width="80" sortable="true" dataIndex="DICNAME" hidden="true"></div>
    </div>  
  </div>
</div>

<div iconCls="icon-panel" id="DicItemWin" xtype="window" width="260" height="150" title="����ֵ���Ŀ" resizable="true" modal="true">
    <div xtype="tbar">
      <div text="->"></div>
      <div iconCls="icon-ok2" text="ȷ  ��" onEfsClick="doItemSubmit()"></div>
     </div>
    <form id="frmItemPost" class="efs-box" method="post" url="XmlDataDeal.aspx" onEfsSuccess="frmItemSubBack(true)" onEfsFailure="frmItemSubBack(false)">
      <TABLE class="formArea">
        <tr>
          <td class="label">�ֵ���</td>
          <td><input type="text" kind="text" id="ItemDicCode" fieldname="DICDATA/DIC_CODE" must="true" operation="0"></td>
        </tr>
        <tr>
          <td class="label">�ֵ�����</td>
          <td><input type="text" kind="text" id="ItemDicText" fieldname="DICDATA/DIC_TEXT" must="true"></td>
        </tr>
        <tr style="display:none">
          <td class="label">�Ƿ���Ч</td>
          <td><input type="text" kind="dic" src="DIC_VALID" id="ItemDicValid" fieldname="DICDATA/DIC_VALID" value="��Ч" code="1"></td>
        </tr>
      </TABLE>
      <input type="hidden" kind="text" id="ItemDicName" fieldname="DICDATA/DICNAME">
     </FORM>
</div>


<div iconCls="icon-panel" id="winDic" xtype="window" title="����µ��ֵ�" height="200" width="280" resizable="true" modal="true">
	<div xtype="tbar">
     	<div iconCls="icon-ok2" text="ȷ  ��" onEfsClick="doAddDic()"></div>
  </div>
  <form id="frmDic" class="efs-box" method="post">
      <TABLE class="formArea">
        <tr>
          <td class="label">�ֵ�����</td>
          <td><input type="text" class="Edit" kind="text" fieldname="DICLIST/DICNAME" must="true" operation="0"></td>
        </tr>
        <tr>
          <td class="label">�ֵ�����</td>
          <td><input type="text" class="Edit" kind="text" fieldname="DICLIST/DICDES" must="true"></td>
        </tr>
        <tr>
          <td class="label">�ֵ���볤��</td>
          <td><input type="text" class="Edit" kind="float" fieldname="DICLIST/CODELEN" must="true" datatype="1"></td>
        </tr>
        <tr>
          <td class="label">�ֵ��޸�Ȩ��</td>
          <td><input type="text" class="Edit" kind="dic" src="DIC_DICEDITABLE" name="Editable" fieldname="DICLIST/EDITABLE" must="true" datatype="1"></td>
        </tr>
        <tr style="display:none">
          <td class="label">�ֵ��ı�����</td>
          <td><input type="text" class="Edit" kind="float" fieldname="DICLIST/TEXTLEN" value="50" datatype="1"></td>
        </tr>
      </TABLE>
      </FORM>
</div>


<FORM id="frmPost" name="frmPost" url="" method="post" style="display:none;" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
  <INPUT type="hidden" name="txtDicName">
  <INPUT type="hidden" name="txtDicDes">
</FORM>

</BODY>
</HTML>