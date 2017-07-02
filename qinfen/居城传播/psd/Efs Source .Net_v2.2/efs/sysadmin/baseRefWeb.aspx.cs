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
using System.Reflection;
using Efsframe.cn.baseCls;
using Efsframe.cn.func;
using Efsframe.cn.declare;


public partial class sysadmin_baseRefWeb : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      try
      {
        string sMothod = Request["method"];
        if (!General.empty(sMothod))
        {
          Type ts = typeof(baseRef);

          object obj = Activator.CreateInstance(ts, null); //获得一个实例

          object[] methodParamArgs = new object[] { Request, Response };

          MethodInfo mi = ts.GetMethod(sMothod); //获得执行方法

          string sXml = (string)mi.Invoke(obj, methodParamArgs); //带参数方法的调用并返回值

          Response.ContentType = "text/xml;charset=utf-8";
          Response.Charset = "UTF-8";

          Response.Write(sXml);
        }
      }
      catch (Exception ex)
      {
        ReturnDoc obj_ReturnDoc = new ReturnDoc();
        obj_ReturnDoc.addErrorResult(ex.Message);
        obj_ReturnDoc.setFuncErrorInfo(Common.SRT_FUNCERROR);
        Response.Write(obj_ReturnDoc.getXml());
      }

    }
}
