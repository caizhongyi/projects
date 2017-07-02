<%@ Page Language="C#" AutoEventWireup="true" CodeFile="userlist.aspx.cs" Inherits="sysadmin_userlist" %>
<!--#include file="../checkLog.inc" -->
<!--
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2009-10-28
//** 联系邮箱：   enjsky@163.com
//*******************************
-->
<HTML XMLNS:ELEMENT>
<head>
<title>用户维护</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>

<SCRIPT language="JavaScript">
// 页面初始化操作
Efs.onReady(
  function(){
  	Efs.getDom("dicList").setAttribute("txtXML", Efs.Common.getQryXml());
  	Efs.getExt("dicgrid").store.load();
  }
);

// 进入查询
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
    alert("没有选择用户");
    return false;
  }
  Efs.getExt("frmData").reset();
  
  Efs.Common.ajax("baseRefWeb.aspx?method=QryUserDetail&txtUserID=" + sUserID,"",function(succ,response,options){
   if(succ){ // 是否成功
     var xmlReturnDoc = response.responseXML;
     Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmData"), "QUERYINFO");
   }
   else{
     alert("加载数据失败!");
   }
  });
  
  Efs.getDom("UserID").setAttribute("operation", "1");
  Efs.getDom("UserID").setAttribute("state", "5");
  
  
  with(Efs.getExt("UserMWin"))
  {
    setTitle("修改用户");
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
    setTitle("添加用户");
    show();
  }
}

function onDelEx()
{
  if(sUserID == "")
  {
    alert("没有选择用户");
    return false;
  }
  
  if((sUserID == "4201000001"))
  {
    alert("默认管理员不能删除，权限不足");
    return false;
  }
  if(!confirm("确定要删除吗？"))
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

// 获取异步提交的返回监听函数
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
      alert("处理失败：" + objXML.selectSingleNode("//FUNCERROR").text);
      alert("处理失败：" + Efs.Common.getNodeValue(objXML,"//FUNCERROR",0));
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
<div iconCls="icon-user" region="north" height="60" title="用户查询" border="false">
 <form id="frmQry"  method="post">
  <TABLE class="formAreaTop" width="100%" height="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>&nbsp;</td>
        <td width="60">用户姓名</td>
        <td width="100"><input type="text" class="Edit" kind="text" fieldname="USERNAME" operation="like" maxlength="30" hint="模糊查询"></td>
        <td width="40">性别</td>
        <td width="100"><input type="text" class="Edit" kind="dic" src="DIC_GENDER" fieldname="SEX"></td>
        <td width="60">用户类型</td>
        <td width="100"><input type="text" class="Edit" kind="dic" src="DIC_USERTYPE" fieldname="USERTYPE"></td>
        <td width="60">用户单位</td>
        <td width="100"><input type="text" class="Edit" kind="dic" src="MANAGEUNIT" fieldname="UNITID"></td>
        <td><input iconCls="icon-qry" type="button" value="查 询" onEfsClick="doQry()"></td>
        <td>&nbsp;</td>
      </tr>
    </TABLE>
  </form>
</div>

<div id="dicgrid" region="center" xtype="grid" border="false" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" buttonAlign="center">
  <div xtype="tbar">
    <span style="font-size:9pt;font-weight:bold;color:#15428B;">用户列表</span>
    <div text="->"></div>
    <div iconCls="icon-add" text="增加用户#A" onEfsClick="onAddEx()"></div>
    <div text="-"></div>
    <div iconCls="icon-edit" id="cmdEdit" text="编辑用户#E" onEfsClick="onEditEx()" disabled="true"></div>
    <div text="-"></div>
    <div iconCls="icon-del" id="cmdDel" text="删除用户#D" onEfsClick="onDelEx()" disabled="true"></div>
    <div text="-"></div>
    <div id="cmdPsw" iconCls="icon-key" text="初始化口令#P" onEfsClick="onPswEx()" disabled="true"></div>
    <div text="-"></div>
    <div iconCls="icon-back" text="返 回" onEfsClick="top.showTask()"></div>
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
		<div header="用户编号" width="80" sortable="true" dataIndex="USERID" align="center"></div>
		<div header="用户名称" width="100" sortable="true" dataIndex="USERTITLE" align="center"></div>
		<div header="用户姓名" width="80" sortable="true" dataIndex="USERNAME" align="center"></div>
		<div header="单位名称" width="120" sortable="true" dataIndex="UNITNAME"></div>
		<div header="性别" width="40" sortable="true" dataIndex="SEX" align="center" kind="dic" src="DIC_GENDER"></div>
        <div header="是否禁用用户" width="100" sortable="true" dataIndex="DISABLED" align="center" kind="dic" src="DIC_TRUEFALSE"></div>
		<div header="能否修改口令" width="100" sortable="true" dataIndex="CANEDITPASSWORD" align="center" kind="dic" src="DIC_ABLE"></div>
		<div header="用户类型" width="80" sortable="true" dataIndex="USERTYPE" align="center" kind="dic" src="DIC_USERTYPE"></div>
	</div>

</div>

    <!-- window开始 -->
    <div iconCls="icon-panel" id="UserMWin" xtype="window" width="560" height="420" title="添加用户" resizable="true" modal="true">
      <div region="center" xtype="panel" title="" border="false" autoScroll="true">
        <div xtype="tbar">
          <div text="->"></div>
          <div iconCls="icon-add" id="cmdUser" text="确  定" onEfsClick="doDealUser()"></div>
        </div>
        <form id="frmData" class="efs-box" method="post" url="" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
          <TABLE class="formArea">
          <tr style="display:none">
            <td>用户编号</td>
            <td colspan="4"><input type="hidden" kind="text" fieldname="USERLIST/USERID" name="UserID" id="UserID" operation="0" writeevent="0" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td width="80">用户名称</td>
            <td width="160"><input type="text" kind="text" fieldname="USERLIST/USERTITLE" state="0" datatype="0" maxlength="30" must="true"></td>
            <td width="20">&nbsp;</td>
            <td width="80">用户姓名</td>
            <td width="160"><input type="text" kind="zhunicode" fieldname="USERLIST/USERNAME" state="0" datatype="0"  maxlength="30" must="true"></td>
          </tr>
          <tr>
            <td>用户单位</td>
            <td><input type="text" kind="dic" src="MANAGEUNIT" state="0" datatype="0" fieldname="USERLIST/UNITID" must="true"></td>
            <td width="20">&nbsp;</td>
            <td>职务</td>
            <td><input type="text" kind="dic" src="DIC_DUTY" state="0" datatype="0" fieldname="USERLIST/DUTY"></td>
          </tr>
          <tr>
            <td>公民身份号码</td>
            <td><input type="text" kind="idcard" fieldname="USERLIST/IDCARD" state="0" datatype="0" sex="sex" hint="请输入18位的公民身份号码" birthday="birthday"></td>
            <td width="20">&nbsp;</td>
            <td>性别</td>
            <td><input type="text" kind="dic" id="sex" src="DIC_GENDER" must="true" fieldname="USERLIST/SEX" state="0" datatype="1"></td>
          </tr>
          <tr>
            <td>出生日期</td>
            <td><input type="text" kind="date" id="birthday" fieldname="USERLIST/BIRTHDAY" state="0" datatype="3"></td>
            <td width="20">&nbsp;</td>
            <td>民族</td>
            <td><input type="text" kind="dic" src="DIC_NATIVE" fieldname="USERLIST/NATION" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td>籍贯</td>
            <td><input type="text" kind="dic" src="DIC_CODE" fieldname="USERLIST/NATIVEPLACE" state="0" datatype="0"></td>
            <td width="20">&nbsp;</td>
            <td>文化程度</td>
            <td><input type="text" kind="dic" src="DIC_EDUCATION" fieldname="USERLIST/EDUCATION" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td>家庭住址</td>
            <td colspan="4"><input type="text" style="width:420px" kind="text" fieldname="USERLIST/ADDRESS" state="0" datatype="0" maxlength="100"></td>
          </tr>
          <tr>
            <td>暂住地址</td>
            <td colspan="4"><input type="text" style="width:420px" kind="text" fieldname="USERLIST/TEMPADDRESS" state="0" datatype="0" maxlength="100"></td>
          </tr>
          <tr>
            <td>联系方式</td>
            <td colspan="4"><input type="text" style="width:420px" kind="text" fieldname="USERLIST/CONTACT" maxlength="50" state="0" datatype="0"></td>
          </tr>
          <tr>
            <td>手机号码</td>
            <td><input type="text" kind="text" fieldname="USERLIST/SMSTEL" maxlength="15" state="0" datatype="0"></td>
            <td width="20">&nbsp;</td>
            <td>是否禁用</td>
            <td><input type="text" kind="dic" src="DIC_TRUEFALSE" code="0" value="否" fieldname="USERLIST/DISABLED" state="0" datatype="1"></td>
          </tr>
          <tr>
            <td>能否修改口令</td>
            <td><input type="text" kind="dic" src="DIC_ABLE" code="1" value="能" fieldname="USERLIST/CANEDITPASSWORD" state="0" datatype="1"></td>
            <td width="20">&nbsp;</td>
            <td>用户类型</td>
            <td><input type="text" kind="dic" src="DIC_USERTYPE" code="3" value="普通管理员" fieldname="USERLIST/USERTYPE" state="0" datatype="1"></td>
          </tr>
          <tr>
            <td>用户描述</td>
            <td colspan="4"><TEXTAREA kind="text" style="height:60px;width:420px" fieldname="USERLIST/USERDES" state="0" datatype="0"></TEXTAREA>
            </td>
          </tr>
          <tr style="display:none">
            <td>用户口令<br></td>
            <td colspan="4">|<input type="hidden" kind="text" fieldname="USERLIST/USERPASSWORD" state="0" datatype="0" value="a"><br></td>
          </tr>
        </TABLE>
        </form>
      </div>
    </div>
    <!-- window结束 -->


</BODY>
</HTML>