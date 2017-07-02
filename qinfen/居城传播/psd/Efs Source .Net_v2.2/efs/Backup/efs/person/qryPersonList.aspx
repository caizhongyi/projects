<%@ Page Language="C#" AutoEventWireup="true" CodeFile="qryPersonList.aspx.cs" Inherits="person_qryPersonList" %>

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
<title>查询学生信息列表</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT LANGUAGE="JavaScript">

// 页面初始化操作
Efs.onReady(
  function(){	
  
  	doQry();
  	
  }
);


function doQry()
{
    var strXml = Efs.Common.getQryXml(Efs.getExt("frmQry"));

    Efs.getDom("psnList").txtXML = strXml;

    Efs.getExt("psngrid").store.reload();  
}


var personid = "";
function doGridClick(data)
{
   personid = data["PERSONID"];
   Efs.getExt("cmdEdit").enable();
   Efs.getExt("cmdDel").enable();
   Efs.getExt("cmdDel2").enable();
   
}

function onEditEx(data)
{
   showEdit();
}

function showEdit()
{
    if(personid == "")
    {
      alert("请选择需要修改的学生");
      return false;
    }
   Efs.getExt("frmPost").reset();
   
   Efs.Common.ajax("../sysadmin/baseRefWeb.aspx?method=personDetail",personid,function(succ,xml_http,options){
   if(succ){ // 是否成功
     var xmlReturnDoc = xml_http.responseXML;
     
     Efs.Common.setEditValue(xmlReturnDoc.xml,Efs.getExt("frmPost"), "QUERYINFO");
   }
   else{
     alert("加载数据失败!");
   }
  });
  
    Efs.getExt("psnEdit").show();
}

function doEdit()
{
  Efs.getExt("frmPost").submit();
}


// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{  
  if(bln)
  {
    Efs.getExt("psnEdit").hide();
    Efs.getExt("psngrid").store.reload();  
  }
  else
  {
    var xml_http = action.response;
    if(xml_http != null)
    {
      var objXML = xml_http.responseXML;
      
      alert("添加失败：" + objXML.selectSingleNode("//FUNCERROR").text);
      objXML = null;
      xml_http = null;
    }
  }
}

// 删除
function doDel()
{
    var strXml = Efs.getExt("psngrid").getDelXml();
    // var strXml = Efs.getExt("psngrid").getSelectedXml();
    // alert(strXml);
    
    Efs.getExt("frmPost").submit(strXml);
}



function doDel2()
{
    if(personid == "")
    {
      alert("请选择需要删除的学生");
      return false;
    }
   
   Efs.Common.ajax("../sysadmin/baseRefWeb.aspx?method=personDel",personid,delsucc);
}


// 监听异步删除ajax状态
function delsucc(succ,xml_http,options)
{
   if(succ){ // 是否成功
     var xmlReturnDoc = xml_http.responseXML;
     
     if(xmlReturnDoc.selectSingleNode("//ERRORRESULT").text == "0")
     {
       Efs.getExt("psngrid").store.reload();  
     }
     else
     {
       alert("删除失败：" + xmlReturnDoc.selectSingleNode("//FUNCERROR").text);
     }
   }
   else{
     alert("加载数据失败!");
   }
}
</SCRIPT>
</HEAD>
<BODY>
<div iconCls="icon-panel" region="north" height="60" title="查询学生列表" border="false">
 <form id="frmQry"  method="post">
  <TABLE class="formAreaTop" width="100%" height="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>&nbsp;</td>
        <td width="60">姓名</td>
        <td width="160"><input type="text" kind="text" fieldname="NAME" operation="like" maxlength="30"></td>
        <td width="40">性别</td>
        <td width="160"><input type="text" kind="dic" src="DIC_SEX" fieldname="SEX"></td>
        <td><input iconCls="icon-qry" type="button" value="查 询" onEfsClick="doQry()"></td>
        <td>&nbsp;</td>
      </tr>
    </TABLE>
  </form>
</div>

<div iconCls="icon-panel" title="查询学生列表" id="psngrid" region="center" xtype="grid" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()">
  <div xtype="tbar">
    
    <div text="->"></div>
    <div iconCls="icon-edit" id="cmdEdit" text="修改#E" onEfsClick="showEdit()" disabled></div>
    <div text="-"></div>
    <div iconCls="icon-del" id="cmdDel" text="删除#E" onEfsClick="doDel()" disabled></div>
    <div text="-"></div>
    <div iconCls="icon-del" id="cmdDel2" text="单个删除操作#G" onEfsClick="doDel2()" disabled></div>
  </div>
  <div id="psnList" xtype="store" url="../sysadmin/baseRefWeb.aspx?method=personList" txtXML="" autoLoad="false">
    <div xtype="xmlreader" fieldid="PERSONID" record="ROW" tabName="PERSON" totalRecords="QUERYINFO@records">
      <div name="PERSONID"></div>
      <div name="NAME"></div>
      <div name="SEX_CODE" mapping="SEX"></div>
      <div name="IDCARD"></div>
      <div name="YEAROLD"></div>
    </div>
  </div>
  <div xtype="colmodel">
    <div type="radio"></div>
    <div header="学生姓名" width="80" sortable="true" dataIndex="NAME"></div>
    <div header="身份证号码" width="80" sortable="true" dataIndex="IDCARD"></div>
    <div header="年龄" width="80" sortable="true" dataIndex="YEAROLD"></div>
    <div header="性别" width="40" sortable="true" dataIndex="SEX_CODE" kind="dic" src="DIC_SEX"></div>
  </div>
</div>


<div iconCls="icon-panel" id="psnEdit" xtype="window" width="500" height="340" title="修改学生基本信息">
   <form id="frmPost" class="efs-box" method="post" url="../sysadmin/baseRefWeb.aspx?method=dealWithXml" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <TABLE class="formArea">
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
          <td>籍贯</td>
          <td><input type="text" kind="dic" src="DIC_CODE" fieldname="PERSON/PLACECODE" state="0" datatype="0"></td>
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
      <input id="personid" type="hidden" kind="text" fieldname="PERSON/PERSONID" operation="1" writeevent="0" state="5" datatype="0">
	</form>
	 <div xtype="buttons">
     	<div text="提  交" onEfsClick="doEdit()"></div>
     </div>
     
</div>

</BODY>
</HTML>
