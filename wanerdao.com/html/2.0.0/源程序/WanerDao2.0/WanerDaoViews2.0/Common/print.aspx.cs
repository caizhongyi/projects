using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WanerDao2.WanerDaoModule.Json;

public partial class Common_print : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string param = Request.QueryString["jsonparam"];
        this.Page.ClientScript.RegisterStartupScript(this.Page.GetType(), "", "<script>getPrint(" + param + ")</script>");

    }
}