<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AreaDemo.aspx.cs" Inherits="PluginDemo_Area_AreaDemo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>地区选择插件</title>
    <link rel='stylesheet' href="../../css/PluginCss/Area/boxy.css" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.boxy.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/Area/wanerdao2.area.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#btnarea").click(function () {
                Boxy.area({ title: "工作地区选择器" }, function (data) {
                    //debugger;
                    alert("你选择的是: " + data.country.id + "|" + data.country.name);
                });
                return false;
            });
        });
        
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <input type="button" id="btnarea" value="选择地区"/>
    </div>
    </form>
</body>
</html>
