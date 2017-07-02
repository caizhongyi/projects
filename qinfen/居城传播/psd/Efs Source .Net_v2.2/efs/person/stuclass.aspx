<%@ Page Language="C#" AutoEventWireup="true" CodeFile="stuclass.aspx.cs" Inherits="person_stuclass" %>
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
<title>查询班级列表</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<script language="javascript">

// 页面初始化操作
Efs.onReady(
  function(){	
    
    Efs.getDom("classList").txtXML = Efs.Common.getQryXml();
    
    Efs.getExt("classgrid").store.load();  
  }
);


var classid = "";
function doGridClick(data)
{
   classid = data["CLASSID"];
   Efs.getExt("cmdEdit").enable();
   Efs.getExt("cmdDel").enable();
}

function doAdd()
{
  Efs.getExt("frmPost").reset();
  // 注意这里是getDom
  Efs.getDom("frmPost").url="../sysadmin/baseRefWeb.aspx?method=ClassAdd" ;
  
  Efs.getExt("classWindow").setTitle("添加班级");
  
  // 下面两个是 getDom  // 修改属性，配置为insert操作
  Efs.getDom("classid").operation = "0";
  Efs.getDom("classid").state = "0";
  
  Efs.getExt("classWindow").show();
}


function onEditEx(data)
{
   showEdit();
}

function showEdit()
{
    if(classid == "")
    {
      alert("请选择需要修改的班级");
      return false;
    }
   Efs.getExt("frmPost").reset();
   
   Efs.Common.ajax("../sysadmin/baseRefWeb.aspx?method=stuClassDetail",classid,function(succ,xml_http,options){
   if(succ){ // 是否成功
     var xmlReturnDoc = xml_http.responseXML;
     
     Efs.Common.setEditValue(xmlReturnDoc.xml,Efs.getExt("frmPost"), "QUERYINFO");
   }
   else{
     alert("加载数据失败!");
   }
  });
  
  Efs.getExt("frmPost").reset();
  // 注意这里是getDom
  Efs.getDom("frmPost").url="../sysadmin/baseRefWeb.aspx?method=ClassEditOrDel" ;
  
  Efs.getExt("classWindow").setTitle("修改班级");
  
  // 下面两个是 getDom  // 修改属性，配置为insert操作
  Efs.getDom("classid").operation = "1";
  Efs.getDom("classid").state = "5";
  
  Efs.getExt("classWindow").show();
}


function doDel()
{
    var strXml = Efs.getExt("classgrid").getDelXml();    
    Efs.getDom("frmPost").url="../sysadmin/baseRefWeb.aspx?method=ClassEditOrDel" ;
    
    Efs.getExt("frmPost").submit(strXml);
}


function doSubmit()
{
  Efs.getExt("frmPost").submit();
}



// 获取异步提交的返回监听函数
function frmPostSubBack(bln,from,action)
{  
  if(bln)
  {
    Efs.getExt("classWindow").hide();
    Efs.getExt("classgrid").store.reload();  
  }
  else
  {
    var xml_http = action.response;
    if(xml_http != null)
    {
      var objXML = xml_http.responseXML;
      
      alert("处理失败：" + objXML.selectSingleNode("//FUNCERROR").text);
      objXML = null;
      xml_http = null;
    }
  }
}
</script>
</HEAD>
<BODY>
<div iconCls="icon-panel" title="班级列表" id="classgrid" region="center" xtype="grid" pagingBar="true" pageSize="25" onEfsRowClick="doGridClick()" onEfsRowDblClick="onEditEx()">
  <div xtype="tbar">
    
    <div text="->"></div>
    <div iconCls="icon-add" id="cmdAdd" text="添加班级#A" onEfsClick="doAdd()"></div>
    <div text="-"></div>
    <div iconCls="icon-edit" id="cmdEdit" text="修改班级#E" onEfsClick="showEdit()" disabled></div>
    <div text="-"></div>
    <div iconCls="icon-del" id="cmdDel" text="删除班级#D" onEfsClick="doDel()" disabled></div>
  </div>
  <div id="classList" xtype="store" url="../sysadmin/baseRefWeb.aspx?method=stuClassList" txtXML="" autoLoad="false">
    <div xtype="xmlreader" fieldid="CLASSID" record="ROW" tabName="STUCLASS" totalRecords="QUERYINFO@records">
      <div name="CLASSID"></div>
      <div name="CLASSNAME"></div>
    </div>
  </div>
  <div xtype="colmodel">
    <div type="radio"></div>
    <div header="班级编码" width="80" sortable="true" dataIndex="CLASSID"></div>
    <div header="班级描述" width="80" sortable="true" dataIndex="CLASSNAME"></div>
  </div>
</div>


<div iconCls="icon-panel" id="classWindow" xtype="window" width="500" height="200" title="修改班级信息">
   <form id="frmPost" class="efs-box" method="post" url="../sysadmin/baseRefWeb.aspx?method=ClassEditOrDel" onEfsSuccess="frmPostSubBack(true)" onEfsFailure="frmPostSubBack(false)">
      <TABLE class="formArea">
        <tr>
          <td labelFor="pname">班级名称</td>
          <td><input id="pname" type="text" kind="text" fieldname="STUCLASS/CLASSNAME" state="0" datatype="0" value="" must="true"></td>
        </tr>
        <tr>
          <td>描述</td>
          <td><TEXTAREA kind="text" style="height:60px;width:380px" fieldname="STUCLASS/CLASSBAK" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
      <input id="classid" type="hidden" kind="text" fieldname="STUCLASS/CLASSID" operation="1" writeevent="0" state="5" datatype="0">
	</form>
	 <div xtype="buttons">
     	<div iconCls="icon-ok" text="提  交" onEfsClick="doSubmit()"></div>
     </div>
     
</div>

</BODY>
</HTML>

