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
using Efsframe.cn.baseManage;

public partial class developer_affairtypeAdd : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      string strXml = Request["txtXML"];
      if (!General.empty(strXml))
      {
        try
        {

          UserSession userSession = ((UserSession)Session["RoleUser"]);

          strXml = PageCommon.setOpDocXML(strXml, userSession);

          string strRetXml = AffairType.addOrEdit(strXml);

          if (PageCommon.IsSucceed(strRetXml))
          {
            Response.Write(PageCommon.showMsg("添加事务类型成功,请重新生成字典文件！", "affairtypelist.aspx"));
            Response.End();
          }
          else
          {
            Response.Write(PageCommon.showMsg("添加事务类型失败,错误原因是：" + PageCommon.getErrInfo(strRetXml), "back"));
            Response.End();
          }
        }
        catch (Exception ep)
        {
          
        }
      }

    }
}
