using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class plugindemo_activity_cookietesting : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Dictionary<string, string> groupidcookie = new Dictionary<string, string>();
        groupidcookie.Add("mygroupID", "22");
        WanerDao2.WanerDaoModule.Cookie.WanerDaoCookie.AddCookie("wanerdaomygroupID", groupidcookie,1);
    }
}