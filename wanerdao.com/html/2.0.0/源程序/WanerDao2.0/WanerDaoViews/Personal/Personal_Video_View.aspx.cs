using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Personal_Personal_Video_View : System.Web.UI.Page
{
    protected Boolean isCurUser = true;
    protected string uid = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        //WanerDao2.WanerDaoBLL.Person.WanerDaoPersonSecurity ps = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonSecurity();

        string uid = Request.QueryString["uid"];

        if (!string.IsNullOrEmpty(uid))
        {
            WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager pi = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager();
            WanerDao2.WanerDaoModel.Person.PersonalProfileModel pprofile = pi.GetPersonalProfileModel(uid);
            if (pprofile == null)
            {
                Response.Redirect(WanerDao2.WanerDaoModule.Config.WanerDaoFilterReader.GetGoUrl("index"));
                return;
            }

            if (uid != CommonContext.GetUserSecurityInfo().user_id)
            {
                isCurUser = false;
            }
        }
    }
}