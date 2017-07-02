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
using Efsframe.cn.baseManage;

public partial class developer_getEventTypeDetail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      Response.ContentType = "text/xml;charset=utf-8";
      Response.Charset = "UTF-8";
      string strEventTypeID = Request["txtEventTypeID"];

      Response.Write(EventType.eventTypeDetail(strEventTypeID));
    }
}
