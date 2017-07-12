using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class relationship_relationship_mygroup_finance : System.Web.UI.Page
{
    public string groupID;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
        {
            groupID = Request.QueryString["id"].ToString();
            Dictionary<string, string> groupidcookie = new Dictionary<string, string>();
            groupidcookie.Add("mygroupID", groupID);
            WanerDao2.WanerDaoModule.Cookie.WanerDaoCookie.AddCookie("wanerdaomygroupID", groupidcookie,0);
        }
    }
}