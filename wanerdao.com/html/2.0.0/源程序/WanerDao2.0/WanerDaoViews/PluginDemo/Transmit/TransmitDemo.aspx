<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/WanerDaoMasterPage.master"
    CodeFile="TransmitDemo.aspx.cs" Inherits="PluginDemo_Transmit_TransmitDemo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/style/layout.css" rel="stylesheet" type="text/css">
    <link href="/style/nav_info.css" rel="stylesheet" type="text/css">
    <link href="/style/pop.css" rel="stylesheet" type="text/css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <input id="inp1" rel="transmit" value="click me!" type="button" />
    <div id="transmit" style="display: none">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="/scripts/jquery-1.4.2-vsdoc.js"></script>
    <script type="text/javascript" src="/scripts/Plugin/Transmit/jcarousellite.js"></script>
    <script type="text/javascript" src="/scripts/Plugin/Transmit/wanerdao2.transmit.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#inp1").transmit({ currType: "vedio", transId: '66753cc2d6a64d43a7fcdd13fb4a3d24' });
        });
    </script>
</asp:Content>
