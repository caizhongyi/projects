using System;
using System.Xml;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using Efsframe.cn.baseManage;


public partial class developer_getRsQryAffairTypeList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      Response.ContentType = "text/xml;charset=utf-8";
      Response.Charset = "UTF-8";
      string strXML = Request["txtXML"];

      Response.Write(AffairType.affairTypeList(strXML));
    }
}
