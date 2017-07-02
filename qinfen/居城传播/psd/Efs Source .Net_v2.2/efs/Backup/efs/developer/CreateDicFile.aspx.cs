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
using Efsframe.cn.baseCls;
using Efsframe.cn.declare;
using Efsframe.cn.func;

public partial class developer_CreateDicFile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      Response.ContentType = "text/xml;charset=utf-8";
      Response.Charset = "UTF-8";
      string strDicName = Request["txtDicName"];
      ReturnDoc obj_ReturnDoc = new ReturnDoc();

      try
      {
        General.CreateDicFile(strDicName);
        obj_ReturnDoc.setErrorResult(Common.SRT_SUCCESS);
      }
      catch (Exception ep)
      {
        obj_ReturnDoc.addErrorResult(ep.Message);
        obj_ReturnDoc.setFuncErrorInfo(Common.SRT_FUNCERROR);
      }

      Response.Write(obj_ReturnDoc.getXml());
    }
}
