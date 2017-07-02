<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AffairtypeEdit.aspx.cs" Inherits="developer_AffairtypeEdit" %>
<!--#include file="../checkLog.inc" -->
<%
//*******************************
//** 设计人员：   Enjsky
//** 设计日期：   2009-10-28
//** 联系邮箱：   enjsky@163.com
//*******************************
%>
<%
  string strAffairTypeID = Request["txtAffairTypeID"];
  // string strXmlRet = Efsframe.cn.baseManage.AffairType.affairTypeDetail(strAffairTypeID);
 %>
<HTML>
<head>
<title>修改事务类型</title>
<link rel="stylesheet" type="text/css" href="../css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/efs-all.css" />
<script type="text/javascript" src="../js/loadmask.js"></script>
<script type="text/javascript" src="../js/efs-all.js"></script>
<SCRIPT language="JavaScript">
<!--
Efs.onReady(function(){
   Efs.Common.ajax("../sysadmin/baseRefWeb.aspx?method=affairTypeDetail","<%=strAffairTypeID%>",function(succ,response,options){
   if(succ){ // 是否成功
     var xmlReturnDoc = response.responseXML;
     Efs.Common.setEditValue(xmlReturnDoc,Efs.getExt("frmPost"), "QUERYINFO");
   }
   else{
     alert("加载数据失败!");
   }
  });
  
});
    
function doRet()
{
  location.href = "affairtypelist.aspx";
}

// 提交信息
function doSubmit()
{
	Efs.getExt("frmPost").submit();
}
//-->
</SCRIPT>
</HEAD>


<BODY>
<div xtype="panel" title="新增事务类型" autoHeight="true" border="false" buttonAlign="center">
  <form id="frmPost" class="efs-box" method="post" action="">
      <TABLE class="formArea">
        <tr>
          <td labelFor="AFFAIRTYPEID">事务类型编号</td>
          <td><input id="AFFAIRTYPEID" type="text" class="Edit" kind="text" fieldname="AFFAIRTYPE/AFFAIRTYPEID" operation="1" writeevent="0" state="5" datatype="0" must="true" readonly maxlength="6"></td>
        </tr>
        <tr>
          <td labelFor="AFFAIRTYPENAME">事务类型名称</td>
          <td><input id="AFFAIRTYPENAME" type="text" class="Edit" kind="text" fieldname="AFFAIRTYPE/AFFAIRTYPENAME" state="0" datatype="0" must="true"></td>
        </tr>
        <tr>
          <td labelFor="AFFAIRTYPEMODE">事务类型模式</td>
          <td><input id="AFFAIRTYPEMODE" type="text" class="Edit" kind="dic" src="DIC_AFFAIRTYPEMODE" fieldname="AFFAIRTYPE/AFFAIRTYPEMODE" state="0" datatype="1" must="true"></td>
        </tr>
        <tr>
          <td>事务类型描述</td>
          <td><TEXTAREA class="Edit" kind="text" style="height:60px;width:380px" fieldname="AFFAIRTYPE/AFFAIRTYPEDES" state="0" datatype="0"></TEXTAREA>
          </td>
        </tr>
      </TABLE>
	</form>
	
	<div xtype="buttons">
     	<div text="确  定" onEfsClick="doSubmit()"></div>
     	<div text="返  回" onEfsClick="doRet()"></div>
     </div>
</div>


</BODY>
</HTML>
