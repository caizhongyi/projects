using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.IO;
using System.Net;

public partial class Personal_Personal_Video_Upload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //string url = "http://v.youku.com/v_show/id_XMzQxNTM1Mzcy.html";
        //string host = "";
        //string getVideoInfo = "http://v.youku.com/player/getPlayList/VideoIDS/{0}/version/5/source/out?onData=%5Btype%20Function%5D&n=3";
        ////try
        ////{
        //    HttpRequest request_VideoUrl = new HttpRequest(string.Empty, url, string.Empty);
        //    host = request_VideoUrl.Url.Host;

        //    System.Text.RegularExpressions.Match match_Id = System.Text.RegularExpressions.Regex.Match(url, @"id_\w*\.html");
        //    string id = match_Id.Value.Replace("id_", "").Replace(".html","");

        //    RequestWeb rw = new RequestWeb();
        //    string response = rw.GetPageContent(string.Format(getVideoInfo, id), null);

        //    //new HttpRequest(string.Empty, string.Format(getVideoInfo, id), string.Empty);
        //    //System.Runtime.Serialization.Json.DataContractJsonSerializer jsonS = new System.Runtime.Serialization.Json.DataContractJsonSerializer(Type.GetTypeFromProgID(response));

        //    System.Text.RegularExpressions.Match match_title = System.Text.RegularExpressions.Regex.Match(response, "\"logo\"[:]\"http[:]\\\\/\\\\/g2.ykimg.com\\\\/[a-zA-Z0-9]+[-][a-zA-Z0-9]+[-][a-zA-Z0-9]+[-][a-zA-Z0-9]+[-][a-zA-Z0-9]+\"");
        //    Response.Write("a:" + match_title.Value);
        //   // Response.Write("a:" + response);
        
        //}
        //catch (Exception ex)
        //{
        //}
    }
}