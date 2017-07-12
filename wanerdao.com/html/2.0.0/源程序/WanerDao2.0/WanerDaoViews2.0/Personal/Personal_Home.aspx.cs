using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Personal_Personal_Home : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        WanerDao2.WanerDaoBLL.Person.WanerDaoPersonSecurity ps = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonSecurity();
        string uid = Request.QueryString["uid"];
        if (!string.IsNullOrEmpty(uid))
        {
            WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager pInfo = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager();

            if (pInfo.GetPersonalProfileModel(uid) == null)
            {
                if (CommonContext.GetUserSecurityInfo() != null)
                {
                }
                else
                {
                    Response.Redirect("/index.html");
                }
                Response.End();
            }
        }
    }
}