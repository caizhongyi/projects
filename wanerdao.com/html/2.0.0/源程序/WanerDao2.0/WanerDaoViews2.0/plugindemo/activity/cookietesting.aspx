<%@ Page Language="C#" AutoEventWireup="true" CodeFile="cookietesting.aspx.cs" Inherits="plugindemo_activity_cookietesting" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="/scripts/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="/scripts/Plugin/cookie/wanerdao2.cookies.js"></script>


<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
    alert(groupid);
</script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
