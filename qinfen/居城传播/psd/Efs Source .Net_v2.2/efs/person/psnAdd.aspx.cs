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
using Efsframe.cn.person;
using Efsframe.cn.baseManage;

public partial class person_psnAdd : System.Web.UI.Page
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

                string strRetXml = person.addNew(strXml);

                if (PageCommon.IsSucceed(strRetXml))
                {
                    Response.Write(PageCommon.showMsg("添加成功!", "../task.aspx"));
                    Response.End();
                }
                else
                {
                    Response.Write(PageCommon.showMsg("添加失败,错误原因是：" + PageCommon.getErrInfo(strRetXml), "back"));
                    Response.End();
                }
            }
            catch (Exception ep)
            {
                string strRet = ep.Message;
                Response.Write(PageCommon.showMsg("异常错误：" + strRet, "back"));
                Response.End();
            }
        }

    }
}
