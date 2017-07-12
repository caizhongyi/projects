<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="transmit.aspx.cs" Inherits="plugindemo_transmit_transmit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" type="text/css" href="/css/pop.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/style.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/form.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/icon.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/scripts/jquery.chosen/jquery.chosen.css"
        media="all" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <input id="inp1" rel="transmit" value="click me!" type="button" />
    <div id="transmit" style="display: none"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="/scripts/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="/scripts/global.js"></script>
    <script type="text/javascript" src="/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/jquery.chosen/jquery.chosen.js"></script>
    <script type="text/javascript" src="/scripts/plugin/transmit/wanerdao2.transmit.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#inp1").transmit({ currType: "videoFolder", transId: 'c45913668f8f4d88b7cc603203e77765', transTitle: '相册标题' });
        });
    </script>
</asp:Content>
