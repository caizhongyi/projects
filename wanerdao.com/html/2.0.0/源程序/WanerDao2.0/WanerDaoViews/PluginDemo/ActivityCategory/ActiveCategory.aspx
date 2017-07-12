<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActiveCategory.aspx.cs" Inherits="PluginDemo_ActivityCategory_ActiveCategory" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>活动分类</title>
    <link rel='stylesheet' href="../../css/PluginCss/Area/boxy.css" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.boxy.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/activitycategory/wanerdao2.ac.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#btnarea").click(function () {
                Boxy.searchac({ title: "活动分类" }, function (data) {
                    //debugger;
                    $.each(data.acs, function (i, n) {
                        alert("你选择的是: " + data.acs[i].id + "|" + data.acs[i].name);
                    });

                });
                return false;
            });
        });
        
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <input type="button" id="btnarea" value="活动分类"/>
    </div>
    </form>
</body>
</html>
