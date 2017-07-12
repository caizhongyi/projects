using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class PersonInfo_Personal_Edit : System.Web.UI.Page
{
    protected Boolean isCurUser = true;
    protected string uid = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        //WanerDao2.WanerDaoBLL.Person.WanerDaoPersonSecurity ps = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonSecurity();
        ///判断访问的用户是否存在
        string uid = Request.QueryString["uid"];
        if (!string.IsNullOrEmpty(uid))
        {
            WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager pInfo = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager();

            if (pInfo.GetPersonalProfileModel(uid) == null)
            {
                Response.Redirect("/index.html");
                Response.End();
            }
        }

       //判断是否是访问自己
        if (!string.IsNullOrEmpty(uid) && uid !=CommonContext.GetUserSecurityInfo().user_id)
        {
            isCurUser = false;
        }
    }
}