<%@ Page Language="C#" AutoEventWireup="true" CodeFile="print.aspx.cs" Inherits="Common_print" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <script type="text/javascript" src="../Scripts/jquery-1.4.2.min.js"></script>
         <link href="../css/print/framework.css" rel="stylesheet" type="text/css" media="all" />
         <link href="../css/print/style.css" rel="stylesheet" type="text/css" />
     <style  media="print" type="text/css">  
    .noprint{visibility:hidden}   
    </style>  
     <script type="text/javascript">
         function getPrint(s) {
            $.ajax({
                url: "wandao_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: s,
                error: function (data) {
                    alert("ERROR!")
                  
                },
                success: function (data) {
                    $("#printDIV").html(data.msg)
                }
            });
        }
        function printPage() {
            window.print();
        }
       </script>
</head>
<body >
    <form id="form1" runat="server">
    <div class="header clearfix" style="height:62px;">
    
	<img class="left" alt="wandao" src="../images/logo.gif"/>
    <div class="left company">
    	<h3>Savor<span>board</span></h3>
        <p>start simply</p>
    </div>

    
    </div>

    <div class="noprint"></div>
    <div class="container">
    <div id="printDIV" ></div>
    <div><input type="button" onclick="printPage()"  class="button blue-radius-btn" value="打印" /></div>
    </div>
    </form>
</body>
</html>
