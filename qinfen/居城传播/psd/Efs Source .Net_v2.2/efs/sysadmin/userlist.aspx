<%@ Page Language="C#" AutoEventWireup="true" CodeFile="userlist.aspx.cs" Inherits="sysadmin_userlist" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** �����Ա��   Enjsky
//** ������ڣ�   2009-10-28
//** ��ϵ���䣺   enjsky@163.com
//*******************************
-->
<HTML XMLNS:ELEMENT>
<head>
<title>�û�ά��</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">
// ҳ���ʼ������
Efs.onReady(
  function(){
  	Efs.getDom("dicList").setAttribute("txtXML", Efs.Common.getQryXml());
  	Efs.getExt("dicgrid").store.load();
  }
);

// �����ѯ
function doQry()
{
  var strXml = Efs.Common.getQryXml(Efs.getExt("frmQry"));
  Efs.getDom("dicList").setAttribute("txtXML", strXml);
  
  Efs.getExt("dicgrid").store.load();
}

var sUserID = "";
var opType = "";
function doGridClick(data)
{
  sUserID = data["USERID"];
  Efs.getExt("cmdEdit").enable();
  Efs.getExt("cmdDel").enable();
  Efs.getExt("cmdPsw").enable();
}

function onEditEx()
{
  if(sUserID == "")
  {
    alert("û��ѡ���û�");
    return false;
  }
  Efs.getExt("frmData").reset();
  
  Efs.Common.ajax("baseRefWeb.aspx?method=QryUserDetail&txtUserID=" + sUserID,"",function(succ,response,options){
   if(succ){ // �Ƿ�ɹ�
     var xmlReturnDoc = response.responseXML;
     Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmData"), "QUERYINFO");
   }
   else{
     alert("��������ʧ��!");
   }
  });
  
  Efs.getDom("UserID").setAttribute("operation", "1");
  Efs.getDom("UserID").setAttribute("state", "5");
  
  
  with(Efs.getExt("UserMWin"))
  {
    setTitle("�޸��û�");
    show();
  }
}

function onAddEx()
{
  Efs.getDom("UserID").setAttribute("operation", "0");
  Efs.getDom("UserID").setAttribute("state", "0");

  Efs.getExt("frmData").reset();
  with(Efs.getExt("UserMWin"))
  {
    setTitle("����û�");
    show();
  }
}

function onDelEx()
{
  if(sUserID == "")
  {
    alert("û��ѡ���û�");
    return false;
  }
  
  if((sUserID == "4201000001"))
  {
    alert("Ĭ�Ϲ���Ա����ɾ����Ȩ�޲���");
    return false;
  }
  if(!confirm("ȷ��Ҫɾ����"))
    return false;

  Efs.getDom("frmData").setAttribute("url", "baseRefWeb.aspx?method=userDrop");

  Efs.getExt("frmData").submit(sUserID);
}


function onPswEx()
{
  Efs.getDom("frmData").setAttribute("url", "XmlDataDeal.aspx");
  var sTmpXml = "<DATAINFO><USERLIST writeevent='0' operation='1'><USERID datatype='0' state='5'>" + sUserID + "</USERID><USERPASSWORD datatype='0' state='0'>a</USERPASSWORD></USERLIST></DATAINFO>";
  Efs.getExt("frmData").submit(sTmpXml);
}

function doDealUser()
{ 
  if(Efs.getDom("UserID").getAttribute("operation") == "0")
    Efs.getDom("frmData").setAttribute("url", "baseRefWeb.aspx?method=userAdd");
  else if(Efs.getDom("UserID").getAttribute("operation") == "1")
    Efs.getDom("frmData").setAttribute("url", "XmlDataDeal.aspx");

  Efs.getExt("frmData").submit();
}

// ��ȡ�첽�ύ�ķ��ؼ�������
function frmPostSubBack(bln,from,action)
{
  if(bln)
  {
    Efs.getExt("UserMWin").hide();
    doQry();
  }
  else
  {
    var xml_http = action.response;
    if(xml_http != null )
    {
      var strRet = xml_http.responseText;
      var objXML = Efs.Common.createDocument(strRet);
      alert("����ʧ�ܣ�" + objXML.selectSingleNode("//FUNCERROR").text);
      alert("����ʧ�ܣ�" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
      objXML = null;
    }
    xml_http = null;
  }
}

</SCRIPT>
<style>
.Edit {
  width:100px;
}
</style>
</HEAD>
<BODY>
<div iconCls="icon-user" region="north" height="60" title="�û���ѯ" border="false">
 <form id="frmQry"  method="post">
  <TABLE class="formAreaTop" width="100%" height="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>&nbsp;</td>
        <td width="60">�û�����</td>
        <td width="100"><input type="text" class="Edit" kind="text" fieldname="USERNAME" operation="like" maxlength="30" hint="ģ����ѯ"></td>
        <td width="40">�Ա�</td>
        <td width="100"><input type="text" class="Edit" kind="dic" src="DIC_GENDER" fieldname="SEX"></td>
        <td width="60">�û�����</td>
        <td width="100"><input type="text" class="Edit" kind="dic" src="DIC_USERTYPE" fieldname="USERTYPE"></td>
        <td width="60">�û���λ</td>
        <td width="100"><input type="text" class="Edit" kind="dic" src="MANAGEUNIT" fieldname="UNITID"></td>
        <td><input iconCls="icon-qry" type="button" value="�� ѯ" onEfsClick="doQry()"></td>
        <td>&nbsp;</td>
      </tr>
    </TABLE>
  </form>
</div>

<div id="dicgrid" region="center" xtype="grid" border="false" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" buttonAlign="center">
  <div xtype="tbar">
    <span style="font-size:9pt;font-weight:bold;color:#15428B;">�û��б�</span>
    <div text="->"></div>
    <div iconCls="icon-add" text="�����û�#A" onEfsClick="onAddEx()"></div>
    <div text="-"></div>
    <div iconCls="icon-edit" id="cmdEdit" text="�༭�û�#E" onEfsClick="onEditEx()" disabled="true"></div>
    <div text="-"></div>
    <div iconCls="icon-del" id="cmdDel" text="ɾ���û�#D" onEfsClick="onDelEx()" disabled="true"></div>
    <div text="-"></div>
    <div id="cmdPsw" iconCls="icon-key" text="��ʼ������#P" onEfsClick="onPswEx()" disabled="true"></div>
    <div text="-"></div>
    <div iconCls="icon-back" text="�� ��" onEfsClick="top.showTask()"></div>
  </div>
	<div id="dicList" xtype="store" url="baseRefWeb.aspx?method=QryUserList" txtXML='' autoLoad="false">
		<div xtype="xmlreader" fieldid="USERID" record="ROW" totalRecords="QUERYINFO@records">
			<div name="USERID" mapping="USERID"></div>
			<div name="USERTITLE" mapping="USERTITLE"></div>
			<div name="USERNAME"></div>
			<div name="UNITNAME"></div>
			<div name="SEX"></div>
            <div name="DISABLED"></div>
			<div name="CANEDITPASSWORD"></div>
			<div name="USERTYPE"></div>
		</div>
	</div>

	<div xtype="colmodel">
		<div header="�û����" width="80" sortable="true" dataIndex="USERID" align="center"></div>
		<div header="�û�����" width="100" sortable="true" dataIndex="USERTITLE" align="center"></div>
		<div header="�û�����" width="80" sortable="true" dataIndex="USERNAME" align="center"></div>
		<div header="��λ����" width="120" sortable="true" dataIndex="UNITNAME"></div>
		<div header="�Ա�" width="40" sortable="true" dataIndex="SEX" align="center" kind="dic" src="DIC_GENDER"></div>
        <div header="�Ƿ�����û�" width="100" sortable="true" dataIndex="DISABLED" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
		<div header="�ܷ��޸Ŀ���" width="100" sortable="true" dataIndex="CANEDITPASSWORD" align="center" kind="dic" src="DIC_ABLE"></div>
		<div header="�û�����" width="80" sortable="true" dataIndex="USERTYPE" align="center" kind="dic" src="DIC_USERTYPE"></div>
	</div>

</div>

    <!-- window��ʼ -->
    <div iconCls="icon-panel" id="UserMWin" xtype="window" width="560" height="420" title="����û�" resizable="true" modal="true">
      <div region="center" xtype="panel" title="" border="false" autoScroll="true">
        <div xtype="tbar">
          <div text="->"></div>
          <div iconCls="icon-add" id="cmdUser" text="ȷ  ��" onEfsClick="doDealUser()"></div>
        </div>
        <form id="frmData" class="efs-box" method="post" url="" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
          <TABLE class="formArea">
          <tr style="display:none">
            <td>�û����</td>
            <td colspan="4"><input type="hidden" kind="text" fieldname="USERLIST/USERID" name="UserID" id="UserID" operation="0" writeevent="0" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td width="80">�û�����</td>
            <td width="160"><input type="text" kind="text" fieldname="USERLIST/USERTITLE" state="0" datatype="0" maxlength="30" must="true"></td>
            <td width="20">&nbsp;</td>
            <td width="80">�û�����</td>
            <td width="160"><input type="text" kind="zhunicode" fieldname="USERLIST/USERNAME" state="0" datatype="0"  maxlength="30" must="true"></td>
          </tr>
          <tr>
            <td>�û���λ</td>
            <td><input type="text" kind="dic" src="MANAGEUNIT" state="0" datatype="0" fieldname="USERLIST/UNITID" must="true"></td>
            <td width="20">&nbsp;</td>
            <td>ְ��</td>
            <td><input type="text" kind="dic" src="DIC_DUTY" state="0" datatype="0" fieldname="USERLIST/DUTY"></td>
          </tr>
          <tr>
            <td>������ݺ���</td>
            <td><input type="text" kind="idcard" fieldname="USERLIST/IDCARD" state="0" datatype="0" sex="sex" hint="������18λ�Ĺ�����ݺ���" birthday="birthday"></td>
            <td width="20">&nbsp;</td>
            <td>�Ա�</td>
            <td><input type="text" kind="dic" id="sex" src="DIC_GENDER" must="true" fieldname="USERLIST/SEX" state="0" datatype="1"></td>
          </tr>
          <tr>
            <td>��������</td>
            <td><input type="text" kind="date" id="birthday" fieldname="USERLIST/BIRTHDAY" state="0" datatype="3"></td>
            <td width="20">&nbsp;</td>
            <td>����</td>
            <td><input type="text" kind="dic" src="DIC_NATIVE" fieldname="USERLIST/NATION" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td>����</td>
            <td><input type="text" kind="dic" src="DIC_CODE" fieldname="USERLIST/NATIVEPLACE" state="0" datatype="0"></td>
            <td width="20">&nbsp;</td>
            <td>�Ļ��̶�</td>
            <td><input type="text" kind="dic" src="DIC_EDUCATION" fieldname="USERLIST/EDUCATION" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td>��ͥסַ</td>
            <td colspan="4"><input type="text" style="width:420px" kind="text" fieldname="USERLIST/ADDRESS" state="0" datatype="0" maxlength="100"></td>
          </tr>
          <tr>
            <td>��ס��ַ</td>
            <td colspan="4"><input type="text" style="width:420px" kind="text" fieldname="USERLIST/TEMPADDRESS" state="0" datatype="0" maxlength="100"></td>
          </tr>
          <tr>
            <td>��ϵ��ʽ</td>
            <td colspan="4"><input type="text" style="width:420px" kind="text" fieldname="USERLIST/CONTACT" maxlength="50" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td>�ֻ�����</td>
            <td><input type="text" kind="text" fieldname="USERLIST/SMSTEL" maxlength="15" state="0" datatype="0"></td>
            <td width="20">&nbsp;</td>
            <td>�Ƿ����</td>
            <td><input type="text" kind="dic" src="DIC_TRUEFALSE" code="0" value="��" fieldname="USERLIST/DISABLED" state="0" datatype="1"></td>
          </tr>
          <tr>
            <td>�ܷ��޸Ŀ���</td>
            <td><input type="text" kind="dic" src="DIC_ABLE" code="1" value="��" fieldname="USERLIST/CANEDITPASSWORD" state="0" datatype="1"></td>
            <td width="20">&nbsp;</td>
            <td>�û�����</td>
            <td><input type="text" kind="dic" src="DIC_USERTYPE" code="3" value="��ͨ����Ա" fieldname="USERLIST/USERTYPE" state="0" datatype="1"></td>
          </tr>
          <tr>
            <td>�û�����</td>
            <td colspan="4"><TEXTAREA kind="text" style="height:60px;width:420px" fieldname="USERLIST/USERDES" state="0" datatype="0"></TEXTAREA>
            </td>
          </tr>
          <tr style="display:none">
            <td>�û�����<br></td>
            <td colspan="4">|<input type="hidden" kind="text" fieldname="USERLIST/USERPASSWORD" state="0" datatype="0" value="a"><br></td>
          </tr>
        </TABLE>
        </form>
      </div>
    </div>
    <!-- window���� -->


</BODY>
</HTML>