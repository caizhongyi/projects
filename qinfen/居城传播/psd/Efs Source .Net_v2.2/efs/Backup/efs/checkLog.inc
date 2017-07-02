<%
  if (Session["RoleUser"] == null)
  {
%>
    <SCRIPT LANGUAGE=javascript>
    try
    {
      alert("登录超时，请重新登录系统！");
      top._doExit();
    }
    catch(e)
    {
      top._doExit();
    }
    </SCRIPT>
<%
  Response.End();
  }
%>