using System;
using System.Data;
using System.Data.OleDb;
using System.Xml;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Efsframe.cn.baseCls;
using Efsframe.cn.db;
using Efsframe.cn.declare;
using Efsframe.cn.baseManage;
using Efsframe.cn.func;

public partial class _Default : System.Web.UI.Page 
{
    protected void Page_Load(object sender, EventArgs e)
    {
      


      
      if (IsPostBack)
      {
        try{
          string strXml = Request["txtXML"];
          // strXml = XmlFun.addXDocHead(strXml);
          XmlDocument doc = XmlFun.CreateNewDoc(strXml);

          string strUsertitle = XmlFun.getNodeValue(doc,Common.BAR2 + Common.XDOC_LOGININFO + Common.BAR + Field.USERTITLE);
          string strPassWord = XmlFun.getNodeValue(doc, Common.BAR2 + Common.XDOC_LOGININFO + Common.BAR + Field.USERPASSWORD);
          string strIP = XmlFun.getNodeValue(doc, Common.BAR2 + Common.XDOC_LOGININFO + Common.BAR + Field.LOGINIP);
          string strMac = XmlFun.getNodeValue(doc, Common.BAR2 + Common.XDOC_LOGININFO + Common.BAR + Field.MAC);

          string str_SQL = "SELECT * FROM VW_USERLIST WHERE USERTITLE='" + strUsertitle + "'";
          string strErr = "";
          ReturnDoc Rtdoc = new ReturnDoc();

          OleDbDataReader rst = null;
          string strRet = CommonQuery.qryRst(str_SQL, ref rst);
          if (strRet == "0")
          {
            Rtdoc.getQueryInfo(rst);
            
            if (strPassWord != Rtdoc.getNodeValue(Common.BAR2 + Field.USERPASSWORD))
            {
              strErr = "密码错误";
            }
          }
          else
          {
            strErr = "查询用户信息为空";
          }

          rst.Close();

          if(strErr == "")
          {
            UserSession user = new UserSession(Rtdoc.getXml());

            string[] arrSys = { user.getUserID(), user.getUserTitle(), user.getUserName(), "", user.getUnitID(), user.getUnitName(), strIP, strMac };
            string logid = SystemLog.addSysLog(arrSys);
            user.setLogID(logid);

            Session.Add("RoleUser", user);
            Response.Redirect("Login.aspx");
            Response.End();
          }
          else
          {
            Response.Write("<script language=\"javascript\">");
            Response.Write("alert('" + strErr + "');");
            Response.Write("history.back();");
            Response.Write("</script>");
          }
        }
        catch(Exception ex)
        {
          
        }

      }

    }
}
