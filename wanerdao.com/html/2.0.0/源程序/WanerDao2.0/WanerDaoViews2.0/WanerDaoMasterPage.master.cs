using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoModel.Person;
public partial class WanerDaoMasterPage : System.Web.UI.MasterPage
{
    private PersonalSecurityProfileModel personalSecurity;
    public PersonalSecurityProfileModel PersonalSecurity
    {
        get { return personalSecurity; }
    }

    private PersonalProfileModel personalProfile;

    public PersonalProfileModel PersonalProfile
    {
        get { return personalProfile; }
        set { personalProfile = value; }
    }

    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);
        
        personalSecurity = CommonContext.GetUserSecurityInfo();
        if (PersonalSecurity == null)
        {
            Response.Redirect(WanerDao2.WanerDaoModule.Config.WanerDaoFilterReader.GetGoUrl("login") + "?url=" + HttpContext.Current.Server.UrlEncode(this.Request.RawUrl));
            Response.End();
        }
        personalProfile = new WanerDaoPersonInfoManager().GetPersonalProfileModel(personalSecurity.user_id);
    
    }


    protected void Page_Load(object sender, EventArgs e)
    {
    }
}
