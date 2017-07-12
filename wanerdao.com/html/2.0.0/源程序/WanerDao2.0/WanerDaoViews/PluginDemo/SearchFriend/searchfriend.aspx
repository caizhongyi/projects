<%@ Page Language="C#" AutoEventWireup="true" CodeFile="searchfriend.aspx.cs" Inherits="PluginDemo_SearchFriend_searchfriend" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <title>查询好友</title>
    <link rel='stylesheet' href="../../css/PluginCss/Area/boxy.css" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.boxy.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/SearchFriend/wanerdao2.searchfriend.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#btnarea").click(function () {
                Boxy.searchfriend({ title: "好友选择",limit:1 }, function (data) {
                    //debugger;
                    $.each(data.friend, function (i, n) {
                        alert("你选择的是: " + data.friend[i].id + "|" + data.friend[i].name);
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
    <input type="button" id="btnarea" value="查询好友"/>
    </div>
    </form>
</body>
</html>
