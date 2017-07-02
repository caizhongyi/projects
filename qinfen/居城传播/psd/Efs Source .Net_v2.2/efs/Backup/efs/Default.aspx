<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>
<%
  string strUserIP = Request.UserHostAddress;   

%>
<html>
<head>
<title>Efs Frame 企业级框架 （EfsFrame框架团队 http://www.efsframe.cn/）</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<style type="text/css">
<!--

BODY {
  BACKGROUND-POSITION: left top; 
  BACKGROUND-COLOR: #ffffff; images: fixed
}

td {
  font-size:9pt;
}

.TextBorder {
    color:              #333333;
    width:              120px;
    font-size:          9pt;
    background-color:   #ffffff;
    border:             1px solid #0080FF;
}

.button {
  BORDER-RIGHT: #7b9ebd 1px solid;
  PADDING-RIGHT: 2px;
  BORDER-TOP:#7b9ebd 1px solid;
  PADDING-LEFT: 2px;
  FONT-SIZE: 12px; FILTER:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ffffff, EndColorStr=#cecfde);
  BORDER-LEFT: #7b9ebd 1px solid;
  CURSOR: hand; COLOR: black;
  PADDING-TOP: 2px;
  BORDER-BOTTOM: #7b9ebd 1px solid
}
-->
</style>

<script language="javascript">
function doKeyDown() {
    var keyCode = event.keyCode;
    var src = event.srcElement;
    var edt1 = document.all("txtUserName");
    var edt2 = document.all("txtUserPWD");
    var btn = document.all("Submit");

    switch (keyCode) {
        case 27:    // ESC
            edt1.value = "";
            edt2.value = "";
            return false;
            break;

        case 38:    // UP
            if (src == edt1) {
                btn.focus();
            }
            else if (src == edt2) {
                edt1.focus();
            }
            else if (src == btn) {
                edt2.focus();
            }
            break;

        case 13:    // Enter
        case 40:    // Down
        case 108:   // Enter(小键盘上)
            if (src == edt1) {
                edt2.focus();
            }
            else if (src == edt2) {
                btn.focus();
                if (keyCode != 40) {
                    if (doSubmit()) {
                        frmMain.submit();
                    }
                }
            }
            else if (src == btn) {
                edt1.focus();
            }
            return false;
    }
    return true;
}
  
function doSubmit()
{
    strUserIp = "<% =strUserIP %>";
    strUserTitle = document.getElementById("txtUserName").value;
    if(strUserTitle == "")
    {
      alert("用户名不能为空");
      return false;
    }
    strUserPWD = document.getElementById("txtUserPWD").value;
    if(strUserPWD == "")
    {
      alert("密码不能为空");
      return false;
    }
    strMac = document.getElementById("txtMac").value;
    
    strXml = '<?xml version="1.0"?> <EFSFRAME efsframe="urn=www-efsframe-cn" version="1.0"><DATAINFO><LOGININFO><USERTITLE>' + strUserTitle + '</USERTITLE><USERPASSWORD>' + strUserPWD + '</USERPASSWORD><LOGINIP>' + strUserIp + '</LOGINIP><MAC>' + strMac + '</MAC></LOGININFO></DATAINFO></EFSFRAME>';

    document.getElementById("txtXML").value = strXml;
    
    return true;
}


window.onload = function() 
{
  document.all("txtMac").value = "";
  document.all("txtUserName").focus();
}

</SCRIPT>
<BODY leftMargin=0 topMargin=0 marginheight="0" marginwidth="0">

<FORM name="frmMain" action="" method="post" runat="server" onsubmit="return doSubmit()">
<TABLE height="100%" cellSpacing=0 cellPadding=0 width="100%" border=0>
  <TR>
    <TD align=middle>
      <TABLE height=70 cellSpacing=0 cellPadding=0 width=600 border=0>
        <TBODY>
        <TR>
          <TD width=324>
      <TABLE height=288 cellSpacing=0 cellPadding=0 width=600 border=0>
        <TBODY>
        <TR>
          <TD align=middle width=600 background=images/index/famlmain_center.jpg height=288>
            <TABLE cellSpacing=0 cellPadding=0 width="100%" align=center border=0>
              <TBODY>
              <TR>
                <TD width="250px"></TD>
                <TD height=180 valign="bottom">
                  <TABLE cellSpacing=0 cellPadding=0 width="100%" align=center border=0>
                    <TBODY>
                    <TR height=24>
                      <TD width=150 align="right"><SPAN class=Text>用户名：</SPAN>
                      </TD>
                      <TD width=100>
                      <INPUT name="txtUserName" id="txtUserName" maxlength="30" class="TextBorder" onkeydown="return doKeyDown()" onfocus="this.select()" value="system">&nbsp;system
                      </TD>
                      <TD width=480>&nbsp;</TD>
                    </TR>
                    <TR height=24>
                      <TD width=150 align="right"><SPAN class=Text>密&nbsp;&nbsp;码：</SPAN>
                      </TD>
                      <TD width=100><INPUT type="password" name="txtUserPWD" id="txtUserPWD" maxlength="30" class="TextBorder" onkeydown="return doKeyDown()" onfocus="this.select()" value="a">&nbsp;a
             </TD>
                      <TD width=480><INPUT type="hidden" name="txtMac" id="txtMac" value=""><INPUT type="hidden" id="txtXML" name="txtXML">
                      </TD>
                  </TR>
          <TR>
                      <TD align="middle" colSpan="2"
                        height=30>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="Submit" name="Submit" class="button" value="登 录"  accesskey="E" onKeyDown="doKeyDown()"> &nbsp; &nbsp; &nbsp; 
                        
                      </TD>
                       <TD width=350>
                       &nbsp;
                       </TD>
                  </TR>                  
                      </TBODY></TABLE>
                      
                      </TD></TR></TBODY></TABLE></TD></TR></TBODY></TABLE>
      <TABLE height="70" cellSpacing="0" cellPadding="0" width="600" border="0">
        <TBODY>
        <TR>
          <TD width="60" rowspan="2">&nbsp;&nbsp;<img src="images/index/efs.gif" width="32" height="32"></TD>
          <TD align="left"
          height="100%">
          <span style="color:#00309C">
          版权所有： <a href="http://www.efsframe.cn/" target="_blank">EfsFrame框架团队</a> &nbsp;&nbsp; <B>版本： <font color="red">V 2.0&nbsp;&nbsp;&nbsp;&nbsp;全面支持IE、FireFox</font></B></span><BR>
          <span style="color:#9C9A9C">技术支持电话：027-87176370&nbsp;&nbsp;&nbsp;EMail：enjsky@163.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </TD>
        </TR>
         </TBODY>
         </TABLE>
         </TD></TR></TBODY></TABLE>
     </TD>
   </TR>
   </TABLE>
</FORM>
</BODY>
</html>
