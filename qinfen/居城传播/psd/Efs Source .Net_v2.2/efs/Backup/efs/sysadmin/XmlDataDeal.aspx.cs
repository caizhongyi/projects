using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Efsframe.cn.func;
using Efsframe.cn.baseCls;
using Efsframe.cn.baseManage;


public partial class sysadmin_XmlDataDeal : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      string strXml = Request["txtXML"];
      if (!General.empty(strXml))
      {
        UserSession userSession = ((UserSession)Session["RoleUser"]);

        strXml = PageCommon.setOpDocXML(strXml, userSession);

        string strRetXml = Operation.dealWithXml(strXml);

        Response.ContentType = "text/xml;charset=utf-8";
        Response.Charset = "UTF-8";

        Response.Write(strRetXml);
      }

    }
}
