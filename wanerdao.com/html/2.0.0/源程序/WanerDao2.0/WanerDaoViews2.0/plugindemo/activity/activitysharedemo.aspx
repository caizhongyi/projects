<%@ Page Language="C#" AutoEventWireup="true" CodeFile="activitysharedemo.aspx.cs" Inherits="plugindemo_activity_activitysharedemo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        获取所有知道活动的所有相册
        <asp:DropDownList ID="DropDownList1" runat="server" 
            DataSourceID="ObjectDataSource1" DataTextField="folder_name" 
            DataValueField="id">
        </asp:DropDownList>
        <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" 
            SelectMethod="GetActivityAllShareImageFolder" 
            TypeName="WanerDao2.WanerDaoBLL.Activity.WanerDaoShareActivityImageOrFolder">
            <SelectParameters>
                <asp:Parameter DefaultValue="1312738115ef4f02bf86123ec269335a" 
                    Name="activityid" Type="String" />
            </SelectParameters>
        </asp:ObjectDataSource>
    <br />
    向活动系统自建相册共享图片,直接操作活动相片表:活动ID：1312738115ef4f02bf86123ec269335a，个人相册ID：02ea3d0065fa4d02bb9e520eca659ba5
        <asp:Button ID="Button1" runat="server" Text="adddefaultsystem" 
            onclick="Button1_Click" />
        <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>

    </div>
    </form>
</body>
</html>
