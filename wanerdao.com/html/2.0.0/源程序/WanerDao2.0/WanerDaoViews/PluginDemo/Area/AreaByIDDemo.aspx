<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AreaByIDDemo.aspx.cs" Inherits="PluginDemo_Area_AreaByIDDemo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>通过ID获取地区信息</title>
    <script type="text/javascript" src="../../Scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#btnGetArea").click(function () {
                //alert($("#txtCountry").val());
                $.ajax({
                    url: "areaen_common.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                                    data: "{opertype:'areaen',cid:'" + $("#txtCountry").val() + "',sid:'" + $("#txtState").val() + "',id:'" + $("#txtCity").val() + "'}",
                    error: function (data) {
                        alert(data);
                    },
                    success: function (data) {
                        debugger;
                        $("#divArea").append(data.country[0].name + "  " + data.state[0].name + "  " + data.city[0].name);
                    }
                });
            })
        })
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    Country:<input type="text" value="7f7a92b8-ea4c-11e0-8606-00306701b527" id="txtCountry" /><br />
    State:<input type="text" value="ed336e0f-f48c-11e0-b192-00306701b527" id="txtState" /><br />
    City:<input type="text" value="b3e246dc-f4bb-11e0-b192-00306701b527" id="txtCity" /><br />
    <input type="button" id="btnGetArea" value="AreaByIDDemo"/>
    </div>
    <div id="divArea">
    </div>
    </form>
</body>
</html>
