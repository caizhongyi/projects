using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WanerDao2.WanerDaoBLL.Activity;

public partial class plugindemo_activity_activitysharedemo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (WanerDaoShareActivityImageOrFolder.ShareImagesToSystemFolder("1312738115ef4f02bf86123ec269335a", "02ea3d0065fa4d02bb9e520eca659ba5"))
        {
            Label1.Text = "成功";
        }
        else
        {
            Label1.Text = "失败";
        }
        
    }
}