using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Account_Account_Edit_Pass_Step2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (CommonContext.GetUserSecurityInfo() == null)
        {
            Response.Redirect("/account/login.html");
        }
    }
}