using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoIBLL;
using WanerDao2.WanerDaoBLL.Posts;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModel.Post;
using WanerDao2.WanerDaoIBLL.IPosts;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoBLL.Person;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoIBLL.ITool;
using WanerDao2.WanerDaoBLL.Tool;
using WanerDao2.WanerDaoModel.Tool;

namespace WanerDao2.WanerDaoBLLFactory.PersonalTool
{
    public class WanerDaoPersonalToolsFactory : IHttpHandler, IRequiresSessionState
    {
        /// <summary>
        /// 您将需要在您网站的 web.config 文件中配置此处理程序，
        /// 并向 IIS 注册此处理程序，然后才能进行使用。有关详细信息，
        /// 请参见下面的链接: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
            string json = string.Empty;
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
            if (typestr == string.Empty)
            {
                json = WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
                context.Response.Write(json);
            }
            else
            {
                IWanerDaoPersonalTools personalTools = new WanerDaoPersonalTools();
                IWanerDaoToolManager tool = new WanerDaoToolManager();
                PersonalSecurityProfileModel personalSecurity = CommonContext.GetUserSecurityInfo();
                Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());
                string id = string.Empty;
                string userId = string.Empty;
                int pageCurrent = 0;
                int pageSize = 0;
                string languageId = CommonContext.GetClientLanguage();
                switch (typestr)
                {
                    case "getpersonaltoolsbyuserid"://通过userId获取个人工具设定信息，可以分页
                        userId = dic["userId"].ToString();
                        pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                        pageSize = Convert.ToInt32(dic["pageSize"]);
                        json = personalTools.GetPersonalToolsByUserId(pageCurrent, pageSize, userId);
                        break;
                    case "getpersonaltoolsbyid"://通过主键获取个人工具设定信息。必须传入id
                        id = dic["id"].ToString();
                        json = personalTools.GetPersonalTool(id);
                        break;
                    case "setuppersonaltool"://安装个人工具。必须传入userId,toolId
                        PersonalToolsModel model = new PersonalToolsModel();

                        //必传userId,toolId
                        model.user_id = dic["userId"].ToString();
                        model.tool_id = dic["toolId"].ToString();
                        model.is_onbar = true;//暂时先默认为放到bar上
                        json = personalTools.SetupPerosnalTool(model);
                        break;
                    case "unloadpersonaltool"://卸载个人工具。必须传入id
                        json = personalTools.UnloadPersonalTool(dic["id"].ToString());
                        break;

                    case "gettools"://获取工具信息。必须传入pageCurrent，pageSize
                        pageCurrent = Convert.ToInt32(dic["pageCurrent"]);
                        pageSize = Convert.ToInt32(dic["pageSize"]);
                        json = tool.GetTools(pageCurrent, pageSize);
                        break;
                    case "gettoolsbycate"://通过工具分类获取工具。必须传入pagecurrent，pagesize，cateid
                        pageCurrent = WanerDaoValidation.ValidateInt(dic, "pagecurrent");
                        pageSize = WanerDaoValidation.ValidateInt(dic, "pagesize");
                        string cateId = WanerDaoValidation.ValidateString(dic, "cateid");
                        json = tool.GetToolsByCate(pageCurrent, pageSize, cateId, CommonContext.GetUserSecurityInfo().user_id);
                        break;
                    case "gettoolscategory"://获取工具分类分页信息。必须传入pagecurrent，pagesize
                        pageCurrent = WanerDaoValidation.ValidateInt(dic, "pagecurrent");
                        pageSize = WanerDaoValidation.ValidateInt(dic, "pagesize");
                        json = tool.GetToolCategory(pageCurrent, pageSize);
                        break;
                    default:
                        json = WanerDaoJSON.GetErrorJson("没有对应类型处理!");
                        break;
                }
            }

            context.Response.Write(json);


        }
        #endregion
        #region 私有函数
        /// <summary>
        /// 描述:构造分页查询参数
        /// </summary>
        /// <param name="_tablename">表名</param>
        /// <param name="_fldname">查询字段，如果是多个字段请用英文的“,”分隔</param>
        /// <param name="_where">where WHERE条件(不用传入WHERE关键字,可为空)</param>
        /// <param name="_fldSortId">排序条件(不用传入ORDER BY关键字,可为空)</param>
        /// <param name="_sort">0升序 1倒序</param>
        /// <param name="dic"></param>
        private void GetPaginationParams(string _tablename, string _fldname, string _where, string _fldSortId, string _sort, ref Dictionary<string, object> dic)
        {
            dic.Add("tablename", _tablename);
            dic.Add("fldName", _fldname);
            dic.Add("where", _where);
            dic.Add("fldSortId", _fldSortId);
            dic.Add("sort", _sort);
        }
        #endregion
    }
}
