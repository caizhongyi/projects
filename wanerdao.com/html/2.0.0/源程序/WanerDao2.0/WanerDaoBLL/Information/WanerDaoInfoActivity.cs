#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/19 0:34:10 
* 文件名：WanerDaoInfoActivity 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IInformation;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Information;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoIBLL.IIndex;
using WanerDao2.WanerDaoModel.Index;
using WanerDao2.WanerDaoBLL.Index;
using WanerDao2.WanerDaoBLL.Common;

namespace WanerDao2.WanerDaoBLL.Information
{
    public class WanerDaoInfoActivity : IWanerDaoInfoActivity
    {
        #region 全局参数
        /// <summary>
        /// 用户个人信息
        /// </summary>
        private static readonly PersonalProfileModel m_ppModel = null;
        ICacheStrategy ICache = WanerDaoCacheFactory.SingleInstance().GetStrategy(0);
        /// <summary>
        /// 数据库操作类
        /// </summary>
        private WanerDaoDbWrapper m_DbHelper = null;

        private const string SQL_FILE = "InformationSQL";
        private const string GetActivityCategoryOfDropList_Cache_id = "26CBB433-C76F-40CA-B930-98386A12E721";
        #endregion

        #region 构造函数
        public WanerDaoInfoActivity()
        {
            m_DbHelper = DbHelperFactory.SingleInstance();
        }

        static WanerDaoInfoActivity()
        {
            if (m_ppModel == null)
            {
                IWanerDaoPersonInfoManager IPersonInfo =
                   new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
                m_ppModel = IPersonInfo.GetPersonalProfileModel();//不传参数的话为获取当前用户信息
            }
        }
        #endregion

        #region IWanerDaoInfoActivity 成员
        /// <summary>
        /// 获取下拉框的列表内容
        /// </summary>
        /// <param name="dic">页面语言 string language_id,parent_id</param>
        /// <returns></returns>
        public string GetActivityCategoryOfDropList(Dictionary<string, object> dic)
        {
            string parent_id = dic.ContainsKey("parent_id") ? dic["parent_id"].ToString() : "-1";
            string language_id = dic["language_id"].ToString();
            string result = string.Empty;

            List<InfoActivityCategoryModel> list = null;
            //取得所有的表数据,程序中进行查找
            if (ICache.ObjectIsExist(GetActivityCategoryOfDropList_Cache_id))
            {
                list = ICache.RetrieveObject(GetActivityCategoryOfDropList_Cache_id) as List<InfoActivityCategoryModel>;
            }
            else
            {
                list = m_DbHelper.GetGenericModel<InfoActivityCategoryModel>(
                SQL_FILE, "GetActivityCategoryOfDropList").ToList();
                if (list.Count > 0)
                {
                    ICache.AddObject(GetActivityCategoryOfDropList_Cache_id, list);
                }
            }
            //查找出符合记录的数据
            list = list.Where<InfoActivityCategoryModel>(x => (x.parent_id == parent_id &&
                  x.language_id == language_id)).ToList();
            dic = new Dictionary<string, object>();
            if (list.Count > 0)
            {
                list.ForEach(x =>
                {
                    dic.Add("id", x.id);
                    dic.Add("category_name", x.category_name);
                });
                result = WanerDaoJSON.GetSuccessJson(dic);
            }
            else
            {
                result = ErrMsg("无记录");
            }
            return result;
        }

        /// <summary>
        /// 获取某个分类下文章的个数
        /// </summary>
        /// <param name="dic">string category_id</param>
        /// <returns></returns>
        public string GetPostsCountByCategoryId(Dictionary<string, object> dic)
        {
            string source_type_id = dic["category_id"].ToString();
            object o = m_DbHelper.GetScalar(SQL_FILE, "GetPostsCountByCategoryId", dic);
            string result = string.Empty;
            if (o != null && o != DBNull.Value)
            {
                result = SucMsg(o.ToString());
            }
            else
            {
                result = ErrMsg("ReadOfErrorInfo");
            }
            return result;
        }

        #endregion

        #region IInfomationCommon 成员

        /// <summary>
        /// 信息搜索
        /// </summary>
        /// <param name="dic">string keyword,string category_id,string pagecurrent,string pageSize
        /// </param>
        /// <returns></returns>
        public string SearchDealsByKeyword(Dictionary<string, object> dic)
        {
            string category_id = string.Empty;
            string keyword = dic["keyword"].ToString();
            string pagecurrent = dic["pagecurrent"].ToString();
            string pageSize = dic["pageSize"].ToString();
            if (dic.ContainsKey("category_id"))
            {
                category_id = dic["category_id"] as string;
                if (string.IsNullOrEmpty(category_id))
                {
                    category_id = "-1";
                }
            }

            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", "infoactivityrecords i left join InfoActivityRecordsComments c on i.id=c.follow_id left join personalprofile pp on i.source_id=pp.user_id");
            mydic.Add("fldName", "i.id,i.source_id,pp.logo_small_path,i.subject,i.content,i.update_date,i.counter,count(c.id) as comment_count");
            mydic.Add("where", "(i.subject like CONCAT(\"%'" + keyword + "'%\") or i.content like CONCAT(\"%'" + keyword + "'%\"))");
            mydic.Add("fldSortId", "i.update_date");
            mydic.Add("sort", 1);
            mydic.Add("pagecurrent", pagecurrent);
            mydic.Add("pageSize", pageSize);
            WanerdaoCommon common = new WanerdaoCommon();
            return common.WanerDaoPagination(dic);
        }

        /// <summary>
        /// 评论帖子
        /// </summary>
        /// <param name="dic">string follow_id(回复号),string record_id(记录号),string content</param>
        /// <returns></returns>
        public string ActivityRecordsComment(Dictionary<string, object> dic)
        {
            string record_id = dic["record_id"].ToString();
            string content = dic["content"].ToString();
            string follow_id = dic["follow_id"] as string;
            if (string.IsNullOrEmpty(follow_id))
            {
                follow_id = "-1";
            }
            InfoActivityRecordsCommentsModel commentModel = new InfoActivityRecordsCommentsModel()
            {
                id = WanerDao2.WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid(),
                follow_id = follow_id,
                record_id = record_id,
                comments_date = DateTime.Now,
                content = content,
                user_id = m_ppModel.user_id
            };

            int result = 0;
            result = m_DbHelper.ExecuteNonQuery<InfoActivityRecordsCommentsModel>(SQL_FILE, "ActivityRecordsComment", commentModel);
            if (result > 0) return SucMsg("SuccessInfoCn");
            else return ErrMsg("FailInfoCn");
        }

        /// <summary>
        /// 获取某个类别下所有帖子的个数
        /// </summary>
        /// <param name="dic">string source_id</param>
        /// <returns></returns>
        public string GetInformationCount(Dictionary<string, object> dic)
        {
            string source_type_id = dic["source_id"].ToString();
            object o = m_DbHelper.GetScalar(SQL_FILE, "GetInformationCount", dic);
            string result = string.Empty;
            if (o != null && o != DBNull.Value)
            {
                result = SucMsg(o.ToString());
            }
            else
            {
                result = ErrMsg("ReadOfErrorInfo");
            }
            return result;
        }

        /// <summary>
        /// 共享信息
        /// </summary>
        /// <param name="dic">string level_id(第一个分类id),
        /// string category_id(最后一个分类的id),string title,string content
        /// string is_sync_state(是否同步状态 1或0),string is_anonymity(是否匿名 1或0)
        /// string page_language_id
        /// </param>
        /// <returns></returns>
        public string SubmitInfomation(Dictionary<string, object> dic)
        {
            //=====是否同步状态
            bool is_sync_state = dic["is_sync_state"].ToString() == "1" ? true : false;

            string source_type_id = dic["source_type_id"] as string;
            if (string.IsNullOrEmpty(source_type_id))
            {
                source_type_id = "ff2b0b4d-203c-11e1-8a87-000c29a5c50c";//管理员
            }
            else
            {
                source_type_id = "ff55f59a-203c-11e1-8a87-000c29a5c50c";//个人
            }
            string level = dic["level"].ToString();
            string category_id = dic["category_id"].ToString();
            string subject = dic["title"].ToString();
            string content = dic["content"].ToString();
            string is_anonymity = dic["is_anonymity"].ToString();
            string page_language_id = dic["page_language_id"].ToString();
            string guid = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            dic = new Dictionary<string, object>();

            dic.Add("id", guid);
            dic.Add("source_id", m_ppModel.user_id);//个人
            dic.Add("source_type_id", source_type_id);
            dic.Add("is_anonymity", is_anonymity);
            dic.Add("category_id", category_id);
            dic.Add("level", level);
            dic.Add("subject", subject);
            dic.Add("content", content);
            dic.Add("page_language_id", page_language_id);
            int result = m_DbHelper.ExecuteNonQuery(SQL_FILE, "SubmitInfomation", dic);
            if (result > 0)
            {
                if (is_sync_state)
                {
                    AddActivityToState(guid);
                }
                return SucMsg("SuccessInfoCn");
            }
            else
            {
                return ErrMsg("FailInfoCn");
            }
        }

        private void AddActivityToState(string guid)
        {
            IWanerDaoActionState IActionState = new WanerDaoBLL.Index.WanerDaoActionState();
            UserOperationModel userOperationModel = new UserOperationModel()
            {
                id = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid(),
                user_id = m_ppModel.user_id,
                action_category_id = "",//TODO: 添加对象信息 , 现在基本表还没数据
                object_id = guid,
                permission =CommonContext.PublicPermission,// "d500f146912111e0bae500210044b80f",//权限
                ope_date = DateTime.Now,
                option_id = TabOptions.activity.ToString()
            };
            IActionState.AddUserOperation(userOperationModel);
        }

        #endregion

        #region 私有成员
        private string SucMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetSuccessJson(tipLanguage);
        }
        private string ErrMsg(string key)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            return WanerDaoJSON.GetErrorJson(tipLanguage);
        }
        #endregion
    }
}
