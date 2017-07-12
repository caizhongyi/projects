<%@ Page Language="C#" AutoEventWireup="true" CodeFile="printDemo.aspx.cs" Inherits="xuxtest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <script type="text/javascript" src="Scripts/jquery-1.4.2.min.js"></script>
     <script type="text/javascript" src="Scripts/common/help.js"></script>
    <script type="text/javascript">
        function gettest() {

            $.ajax({
                url: "wandao_group.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'1',post_id:'" + $("#useraccount").val() + "',post_name:'" + $("#newPermission").val() + "',subject:'" + $("#oldPermission").val() + "',content:'" + $("#Permissionname").val() + "',group_id:'" + $("#allowObj").val() + "',refuseObj:'" + $("#refuseObj").val() + "',getDefault:'" + $("#getDefault").val() + "'}",
                error: function (data) {
                    alert("11")
                  
                },
                success: function (data) {
                    $("#test").html(data.msg)
                }
            });
        }

        function goPrint() {
            var str = "{opertype:'print',printfile:'demo', printdatafile: 'GroupSQL', printdata_test1: 'Select_GroupNormalManage', printdata_test2: 'Select_GroupKickDuration', group_id: 123456, role_name: 'user',language_id:'xxx' }";
            window.location.href = "Common/print.aspx?jsonparam=" + str;
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
     <div>
   <%-- 用户1：<input id="useraccount" type="text" /> 新权限：<input id="newPermission" type="text" />旧权限：<input id="oldPermission" type="text" />
    权限名：<input id="Permissionname" type="text" /> 允许：<input id="allowObj" type="text" />拒接：<input id="refuseObj" type="text" />自定义：<input id="getDefault" type="text" />
   --%> <hr />
    <input type="button" value="进入打印" onclick="goPrint();"/>
    </div>
    </div>
    <div id="test"></div>
    </form>
</body>
</html>
