#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/10/15 16:12:15 
* 文件名：WanerDaoBlogManager 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;
using System.Collections.Generic;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.Validation;
using System.Net;
using System.Xml;
using System.Xml.Linq;
using System.Data;
using System.Web;
using Newtonsoft.Json;
using WanerDao2.WanerDaoModule.Config;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModel.Post;
using WanerDao2.WanerDaoIBLL;

namespace WanerDao2.WanerDaoBLL.Person
{
    public class WanerDaoBlogManager : IWanerDaoBlogManager
    {

        PersonalSecurityProfileModel pspmodel = null;

        IWanerDaoCommon Icommon = null;

        public WanerDaoBlogManager()
        {

            // _IsSelf = IsSelf();
            Icommon = new WanerDaoBLL.Common.WanerdaoCommon();

            pspmodel = CommonContext.GetUserSecurityInfo();


        }


        #region 搜索所有个人日志

        public PersonalBlogModel GetPersonalBlogModel(string blogid)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", blogid);
            IList<PersonalBlogModel> Ilist = DbHelperFactory.SingleInstance().GetGenericModel<PersonalBlogModel>("PersonSQL", "GetPersonalBlogModel", dic);
            if (Ilist != null && Ilist.Count > 0)
            {
                return Ilist[0];
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 查询所有用户日志 分页
        /// </summary>
        /// <param name="pagecurrent">当前页</param>
        /// <param name="pageSize">页大小</param>
        /// <returns></returns>
        public DataSet GetAllPersonalBlogs(string pagecurrent, string pageSize, string where)
        {
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", "personalblog pb left join (select blog_id,count(id)as count from blogcomments bc GROUP BY blog_id) bc on pb.id=bc.blog_id  join blogcategory bcy on pb.category_id=bcy.id");
            mydic.Add("fldName", "pb.id,pb.is_transmit,pb.transmit_id,pb.category_id,bcy.category_name,pb.title,pb.content,pb.post_date,pb.weather,pb.location,pb.counter,pb.permission,IFNULL(bc.count,0) as count");
            mydic.Add("where", string.Format(" {0} ", where));
            mydic.Add("fldSortId", "pb.post_date");
            mydic.Add("sort", 0);
            mydic.Add("pagecurrent", pagecurrent);
            mydic.Add("pageSize", pageSize);
            DataSet ds = Icommon.WanerDaoPaginationDataSet(mydic);
            return ds;
        }

        /// <summary>
        /// 查询所有用户日志 分页
        /// </summary>
        /// <param name="pagecurrent">当前页</param>
        /// <param name="pageSize">页大小</param>
        /// <returns></returns>
        public DataSet AdminGetAllPersonalBlogs(string pagecurrent, string pageSize, string where)
        {
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", "personalblog pb join blogcategory bcy on pb.category_id=bcy.id join PropertyPermission pp on pb.permission=pp.id ");
            mydic.Add("fldName", "pb.id,pb.category_id,bcy.category_name,pb.title,pb.post_date,pb.permission,pp.name as permissionname");
            mydic.Add("where", string.Format(" {0} ", where));
            mydic.Add("fldSortId", "pb.post_date");
            mydic.Add("sort", 0);
            mydic.Add("pagecurrent", pagecurrent);
            mydic.Add("pageSize", pageSize);
            DataSet ds = Icommon.WanerDaoPaginationDataSet(mydic);
            return ds;
        }

        /// <summary>
        /// 根据时间范围内荣搜索日志
        /// </summary>
        /// <param name="dic">string user_id,string time1, string time2, string categoryid,string titleOrContent, string pagecurrent,string pageSize </param>
        /// <returns></returns>
        public string SearchPersonBlogByTimeRange(Dictionary<string, object> dic)
        {

            string conditions = string.Empty;
            if (dic["time1"].ToString().Trim() != "")
            {
                DateTime dt1;
                bool b = DateTime.TryParse(dic["time1"].ToString(), out dt1);
                if (!b) { return Message("TimeOneError", MessageType.error); }
                else
                {
                    conditions += " and post_date>='" + dt1 + "'";
                }
            }
            if (dic["time2"].ToString().Trim() != "")
            {
                DateTime dt2;
                bool b = DateTime.TryParse(dic["time2"].ToString(), out dt2);
                if (!b) { return Message("TimeTwoError", MessageType.error); }
                else
                {
                    conditions += " and post_date<='" + dt2.AddHours(23).AddSeconds(3599) + "'";
                }
            }
            if (dic["categoryid"].ToString() != "")
            {
                conditions += "and category_id ='" + dic["categoryid"].ToString() + "'";
            }
            string titleOrContent = dic["titleOrContent"].ToString();
            if (titleOrContent.Trim() != string.Empty)
            {
                conditions += "and (title like '%" + titleOrContent + "%' or content like '%" + titleOrContent + "%')";
            }
            string pagecurrent = dic["pagecurrent"].ToString();
            string pageSize = dic["pageSize"].ToString();
            DataSet ds = GetAllPersonalBlogs(pagecurrent, pageSize, conditions);
            string json = Icommon.WanerDaoPagination(ds);
            return json;
        }

        /// <summary>
        /// 个人日志主页搜索
        /// </summary>
        /// <param name="dic">string user_id,string titOrContent,string category_id,string timeName,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        public string SearchOfIndex(Dictionary<string, object> dic)
        {
            IWanerDaoPermission IPermission = new WanerDaoPermission();
            string json = string.Empty;
            string user_id = dic["user_id"].ToString();
            string titOrContent = dic.ContainsKey("titOrContent") ? dic["titOrContent"].ToString() : null;
            string category_id = dic.ContainsKey("category_id") ? dic["category_id"].ToString() : null;
            string timeName = dic.ContainsKey("timeName") ? dic["timeName"].ToString() : null;
            string whereSplice = string.Empty;

            //if (titOrContent == string.Empty && category_id == string.Empty && timeName == string.Empty)
            //{
            //    json = Message("请输入你要查询的条件", MessageType.error);
            //}
            //else if ((titOrContent != string.Empty && category_id != string.Empty) || (titOrContent != string.Empty && timeName != string.Empty))
            //{
            //    json = Message("请检查你的参数", MessageType.error);
            //}
            //else if (category_id != string.Empty && timeName != string.Empty)
            //{
            //    json = Message("请检查你的参数", MessageType.error);
            //}
            //else
            //{

            if (IsSelf(ref user_id))//是主人
            {
                if (!string.IsNullOrEmpty(titOrContent))
                {
                    whereSplice += " and (pb.title like '%" + titOrContent + "%' or pb.content like '%" + titOrContent + "%')";
                }
                if (!string.IsNullOrEmpty(category_id))
                {
                    whereSplice += " and pb.category_id ='" + category_id + "'";
                }
                if (!string.IsNullOrEmpty(timeName))
                {
                    if (timeName.Trim().Length == 4)
                    {
                        whereSplice += " and (SUBSTR(pb.post_date from 1 for 4)) = '" + timeName.Trim() + "'";
                    }
                    else
                    {
                        whereSplice += " and SUBSTR(pb.post_date from 1 for 7)='" + timeName.Trim() + "'";
                    }
                }
                whereSplice += " and pb.user_id='" + user_id + "' and pb.active=true ";
                DataSet ds = GetAllPersonalBlogs(dic["pagecurrent"].ToString(), dic["pageSize"].ToString(), whereSplice);
                json = Icommon.WanerDaoPagination(ds);
            }
            else//不是主人  判断权限啊
            {
                if (!string.IsNullOrEmpty(titOrContent))
                {
                    whereSplice += " and (pb.title like '%" + titOrContent + "%' or pb.content like '%" + titOrContent + "%')";
                }
                if (!string.IsNullOrEmpty(category_id))
                {
                    whereSplice += " and pb.category_id ='" + category_id + "'";
                }
                if (!string.IsNullOrEmpty(timeName))
                {
                    if (timeName.Trim().Length == 4)
                    {
                        whereSplice += "and (SUBSTR(pb.post_date from 1 for 4))='" + timeName.Trim() + "'";
                    }
                    else
                    {
                        whereSplice += " and SUBSTR(pb.post_date from 1 for 7)='" + timeName.Trim() + "'";
                    }
                }
                whereSplice += " and pb.user_id='" + user_id + "' and pb.active=true ";

                DataSet ds = GetAllPersonalBlogs(dic["pagecurrent"].ToString(), dic["pageSize"].ToString(), whereSplice);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    Dictionary<string, object> permissionDic = new Dictionary<string, object>();
                    permissionDic.Add("user_id", user_id); permissionDic.Add("permission_id", ds.Tables[0].Rows[i]["permission"].ToString());
                    bool IsCanSee = IPermission.SelectPermissionAllowArray(permissionDic);
                    if (IsCanSee == false)
                    {
                        ds.Tables[0].Rows.RemoveAt(i);
                    }
                }
                json = Icommon.WanerDaoPagination(ds);
                //}
            }
            return json;
        }

        /// <summary>
        /// 个人日志主页搜索
        /// </summary>
        /// <param name="dic">string user_id,string titOrContent,string category_id,string timeName,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        public DataSet SearchOfIndexDs(Dictionary<string, object> dic)
        {
            IWanerDaoPermission IPermission = new WanerDaoPermission();
            string json = string.Empty;
            string user_id = dic["user_id"].ToString();
            string titOrContent = dic.ContainsKey("titOrContent") ? dic["titOrContent"].ToString() : null;
            string category_id = dic.ContainsKey("category_id") ? dic["category_id"].ToString() : null;
            string timeName = dic.ContainsKey("timeName") ? dic["timeName"].ToString() : null;
            string whereSplice = string.Empty;

            if (IsSelf(ref user_id))//是主人
            {
                if (!string.IsNullOrEmpty(titOrContent))
                {
                    whereSplice += " and (pb.title like '%" + titOrContent + "%' or pb.content like '%" + titOrContent + "%')";
                }
                if (!string.IsNullOrEmpty(category_id))
                {
                    whereSplice += " and pb.category_id ='" + category_id + "'";
                }
                if (!string.IsNullOrEmpty(timeName))
                {
                    if (timeName.Trim().Length == 4)
                    {
                        whereSplice += " and (SUBSTR(pb.post_date from 1 for 4)) = '" + timeName.Trim() + "'";
                    }
                    else
                    {
                        whereSplice += " and SUBSTR(pb.post_date from 1 for 7)='" + timeName.Trim() + "'";
                    }
                }
                whereSplice += " and pb.user_id='" + user_id + "' and pb.active=true ";
                DataSet ds = GetAllPersonalBlogs(dic["pagecurrent"].ToString(), dic["pageSize"].ToString(), whereSplice);
                return ds;
            }
            else//不是主人  判断权限啊
            {
                if (!string.IsNullOrEmpty(titOrContent))
                {
                    whereSplice += " and (pb.title like '%" + titOrContent + "%' or pb.content like '%" + titOrContent + "%')";
                }
                if (!string.IsNullOrEmpty(category_id))
                {
                    whereSplice += " and pb.category_id ='" + category_id + "'";
                }
                if (!string.IsNullOrEmpty(timeName))
                {
                    if (timeName.Trim().Length == 4)
                    {
                        whereSplice += "and (SUBSTR(pb.post_date from 1 for 4))='" + timeName.Trim() + "'";
                    }
                    else
                    {
                        whereSplice += " and SUBSTR(pb.post_date from 1 for 7)='" + timeName.Trim() + "'";
                    }
                }
                whereSplice += " and pb.user_id='" + user_id + "' and pb.active=true ";

                DataSet ds = GetAllPersonalBlogs(dic["pagecurrent"].ToString(), dic["pageSize"].ToString(), whereSplice);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    Dictionary<string, object> permissionDic = new Dictionary<string, object>();
                    permissionDic.Add("user_id", user_id); permissionDic.Add("permission_id", ds.Tables[0].Rows[i]["permission"].ToString());
                    bool IsCanSee = IPermission.SelectPermissionAllowArray(permissionDic);
                    if (IsCanSee == false)
                    {
                        ds.Tables[0].Rows.RemoveAt(i);
                    }
                }
                return ds;
            }
        }


        /// <summary>
        /// 日志管理搜索
        /// </summary>
        /// <param name="dic">string titOrContent,string category_id,string time1,string time2,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        public string AdminSearchOfManager(Dictionary<string, object> dic)
        {
            try
            {
                string json = string.Empty;
                string whereSplice = string.Empty;
                string titOrContent = dic.ContainsKey("titOrContent") ? dic["titOrContent"].ToString() : null;
                string category_id = dic.ContainsKey("category_id") ? dic["category_id"].ToString() : null;
                DateTime? time1 = null; DateTime? time2 = null;

                if (dic.ContainsKey("time1"))
                {
                    if (dic["time1"].ToString() != "")
                        time1 = DateTime.Parse(dic["time1"].ToString());
                }
                if (dic.ContainsKey("time2"))
                {
                    if (dic["time2"].ToString() != "")
                        time2 = DateTime.Parse(dic["time2"].ToString()).AddDays(1).AddSeconds(-1);
                }

                if (!string.IsNullOrEmpty(titOrContent))
                {
                    whereSplice += " and (pb.title like '%" + titOrContent + "%' or pb.content like '%" + titOrContent + "%')";
                }
                if (!string.IsNullOrEmpty(category_id))
                {
                    whereSplice += " and pb.category_id ='" + category_id + "'";
                }
                if (time1 != null)
                {
                    whereSplice += " and pb.post_date>'" + time1 + "'";
                }
                if (time2 != null)
                {
                    whereSplice += " and pb.post_date<='" + time2 + "'";
                }
                whereSplice += " and pb.user_id='" + pspmodel.user_id + "' and pb.active=true and pp.language_id='" + CommonContext.GetClientLanguage() + "' ";
                DataSet ds = AdminGetAllPersonalBlogs(dic["pagecurrent"].ToString(), dic["pageSize"].ToString(), whereSplice);
                json = Icommon.WanerDaoPagination(ds);
                return json;
            }
            catch (Exception ex)
            {
                WanerDaoExceptionManager.WanerDaoLog4Net.Write("Admin日志搜索: " + ex.Message, WanerDaoExceptionManager.WanerDaoLog4Net.LogMessageType.Error);
                return Message("ErrorInfoCn", MessageType.error);
            }
        }

        #endregion

        #region 个人日志评论
        /// <summary>
        /// 查询日志评论
        /// </summary>
        /// <param name="dic">字典（日志id，分页参数）</param>
        /// <returns></returns>
        public string SelectPersonBlogComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;

            return json;
        }

        /// <summary>
        /// 添加日志评论
        /// </summary>
        /// <param name="bcmodel">string id(日志id),string content(评论内容),string followId(父贴id)</param>
        /// <returns></returns>
        public string AddPersonBlogComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            BlogCommentsModel model = new BlogCommentsModel();
            model.id = WanerDaoModule.WanerDaoGuid.WanerDaoGuid.GetGuid();
            model.user_id = pspmodel.user_id;
            model.blog_id = dic["id"].ToString();
            model.comments_date = DateTime.Now;
            model.content = dic["content"].ToString();
            model.follow_id = dic["followId"].ToString();
            if (model.follow_id == string.Empty) { model.follow_id = "-1"; }
            model.positive = 0;
            model.negative = 0;
            model.active = true;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<BlogCommentsModel>("PersonSQL", "AddBLogComment", model);
            if (result > 0)
                json = Message("SaveInfoCn", MessageType.success);
            else
                json = Message("FailInfoCn", MessageType.error);

            return json;
        }

        /// <summary>
        /// 删除日志评论
        /// </summary>
        /// <param name="dic">字典（评论id）</param>
        /// <returns></returns>
        /// string cid
        public string DeletePersonBlogComments(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeleteBlogCommentById", dic);

            if (result > 0)
            {
                json = Message("DeleteInfoCn", MessageType.success);
            }
            else
            {
                json = Message("DeleteFailInfoCn", MessageType.error);
            }
            return json;
        }
        #endregion

        #region 个人日志分类
        /// <summary>
        /// 获取日志类别MODEL
        /// </summary>
        /// <param name="id">类别id</param>
        /// <returns></returns>
        public BlogCategoryModel GetPersonalBlogCategory(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", id);
            IList<BlogCategoryModel> Listbcmodel;
            Listbcmodel = DbHelperFactory.SingleInstance().GetGenericModel<BlogCategoryModel>("PersonSQL", "GetPersonalBlogCategory", dic);
            if (Listbcmodel != null)
                return Listbcmodel[0];
            else
                return null;
        }

        /// <summary>
        /// 获取日志默认分类id
        /// </summary>
        /// <returns></returns>
        private string GetBlogDefaultCategoryId()
        {
            string defaultCategoryId = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "WanerDaoBlogDefaultCategoryId").Trim();
            return defaultCategoryId;
        }

        /// <summary>
        /// 添加日志分类
        /// </summary>
        /// <param name="bcmodel"></param>
        /// <returns></returns>
        /// string cyname, 返回result,msg:类别添加成功
        public string AddPersonBlogCategory(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string cname = dic["cyname"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref cname, true, true, true, 50))
            {
                return Message("CategoryNameTooLarge", MessageType.error);
            }
            if (IsExistOfBlogCategory(cname)) { return Message("CategoryNameIsExists", MessageType.error); }
            string[][] strarr = new string[][] { new string[] { "cyname", "category_name" } };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("categoryid", WanerDaoGuid.GetGuid());
            dic.Add("permission", CommonContext.PublicPermission);// "d500f146912111e0bae500210044b80f");
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonBlogCategory", dic);
            if (result > 0)
            {
                json = Message("SaveInfoCn", MessageType.success);
            }
            else { json = Message("FailInfoCn", MessageType.error); }
            return json;
        }

        /// <summary>
        /// 删除日志分类
        /// </summary>
        /// <param name="dic">分类id</param>
        /// <returns></returns>
        /// string cid
        public string DeletePersonBlogCategory(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("defaultcategoryid", GetBlogDefaultCategoryId());
            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("PersonSQl", "DeletePersonBlogCategory", dic);
            if (result > 0)
            {
                json = Message("DeleteInfoCn", MessageType.success);
            }
            else { json = Message("DeleteFailInfoCn", MessageType.error); }
            return json;
        }

        public IList<PersonalBlogModel> GetPersonBlogList(string user_id)
        {
            IList<PersonalBlogModel> BlogModelList = null;
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "user_id", user_id } };
            BlogModelList = DbHelperFactory.SingleInstance().GetGenericModel<PersonalBlogModel>("PersonSQL", "SelectPersonBlogCategory", dic);
            return BlogModelList;
        }
        /// <summary>
        /// 个人日志分类
        /// </summary>
        /// string user_id
        /// <returns>{"total":"1","rows":[{"category_id":"1","user_id":"9f6c58f988cc4aff9c910504dce3edc2","CATEGORY_NAME":"个人日志","BlogCategory_CREATE_DATE":"2011/12/10 2:07:37","BlogCategory_PERMISSION":"","catecount":"1"}],"result":"True"}</returns>
        public string SelectPersonBlogCategory(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string user_id = dic["user_id"].ToString();
            IsSelf(ref user_id);
            dic["user_id"] = user_id;
            json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectPersonBlogCategory", dic);
            return json;
        }

        public string GetBlogCategories(string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            string json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectPersonBlogCategory", param);
            return json;
        }

        public string GetBlogCategoriesWithFormat(string userId)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("user_id", userId);
            string json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectPersonBlogCategoryWithFormat", param);
            return json;
        }

        /// <summary>
        /// 按时间分类
        /// </summary>
        /// <param name="dic">string user_id</param>
        /// <returns></returns>
        public string PersonBlogCategoryOfTime(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string user_id = dic["user_id"].ToString();
            IsSelf(ref user_id);
            dic["user_id"] = user_id;
            json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "PersonBlogCategoryOfTime", dic);
            return json;
        }

        /// <summary>
        /// 更新日志分类名称
        /// </summary>
        /// <param name="bcmodel">分类id</param>
        /// <returns></returns>
        /// string cname, string cid
        public string UpdatePersonBlogCategory(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);
            if (IsExistOfBlogCategory(dic["cname"].ToString()))
            {
                json = Message("CategoryNameIsExists", MessageType.success);
            }
            else
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonBlogCategory", dic);
                if (result > 0)
                {
                    json = Message("UpdateInfoCn", MessageType.success);
                }
                else { json = Message("UpdateFailInfoCn", MessageType.error); }
            }
            return json;
        }

        /// <summary>
        /// 根据分类id查询分类名称
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        /// string cid
        public string SelectBlogCategoryNameByCategoryId(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "SelectBlogCategoryNameByCategoryId", dic);
            if (o.ToString().Equals(string.Empty))
            {
                json = Message(o.ToString(), MessageType.success);
            }
            else
            {
                json = Message("FailInfoCn", MessageType.error);
            }
            return json;
        }

        /// <summary>
        /// 修改日志分类权限
        /// </summary>
        /// <param name="dic">string cid(分类id),pid(权限id)</param>
        /// <returns></returns>
        public string UpdateBlogCategoryPermission(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            if (dic.ContainsKey("cid") && dic.ContainsKey("pid"))
            {
                string category_id = dic["cid"].ToString();
                dic.Add("user_id", pspmodel.user_id);
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateBlogCategoryPermission", dic);
                if (result > 0)
                {
                    json = Message("UpdateInfoCn", MessageType.success);
                }
                else
                {
                    json = Message("UpdateFailInfoCn", MessageType.error);
                }
            }
            else
            {
                json = Message("ParameterError", MessageType.error);
            }
            return json;


        }
        #endregion

        #region 个人日志转发
        /// <summary>
        /// 转发日志
        /// </summary>
        /// <param name="dic">string id(日志id)</param>
        /// <returns></returns>
        public string ForwardBlog(string id, string categoryid)
        {

            if (string.IsNullOrEmpty(id)) return CommonContext.ErrMsg("ParameterError");

            PersonalBlogModel pbmodel = GetPersonalBlogModel(id);
            if (pbmodel.user_id == pspmodel.user_id)
            {
                return CommonContext.ErrMsg("CanNotForwardSelfBlog");
            }

            Newtonsoft.Json.Linq.JObject jObject = WanerDaoJSON.ParseJson(GetDefultPermission());
            string default_permission = string.Empty;
            if (jObject["result"].ToString().ToLower() == "false")
            { //没有默认权限 取分类的权限
                default_permission = GetPersonalBlogCategory(categoryid).permission;
            }
            else
            {
                default_permission = jObject["default_permission"].ToString();
            }

            string guid = WanerDaoGuid.GetGuid();
            Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                  {"guid",guid},
                  {"copyid",id},
                  {"user_id",pspmodel.user_id},
                  {"categoryid",categoryid},
                  {"default_permission",default_permission}};

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyBlogToMyblog", mydic);
            if (result > 0)
            {
                WanerDao2.WanerDaoBLL.Index.WanerDaoPersonState.AddHomeOperate(guid, "104595f8927411e183b9002354c6e759");
                return CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                return CommonContext.ErrMsg("ForwardFailed");
            }

        }

        /// <summary>
        /// 转发日志（徐蓓 2012-8-8修改）
        /// </summary>
        /// <param name="id">日志主键</param>
        /// <param name="categoryid">转发至分类</param>
        /// <param name="newName">新日志名</param>
        /// <returns></returns>
        public string ForwardBlog(string id, string categoryid, string newName)
        {

            if (string.IsNullOrEmpty(id)) return CommonContext.ErrMsg("ParameterError");

            PersonalBlogModel pbmodel = GetPersonalBlogModel(id);
            if (pbmodel.user_id == pspmodel.user_id)
            {
                return CommonContext.ErrMsg("CanNotForwardSelfBlog");
            }

            Newtonsoft.Json.Linq.JObject jObject = WanerDaoJSON.ParseJson(GetDefultPermission());
            string default_permission = string.Empty;
            if (jObject["result"].ToString().ToLower() == "false")
            { //没有默认权限 取分类的权限
                default_permission = GetPersonalBlogCategory(categoryid).permission;
            }
            else
            {
                default_permission = jObject["default_permission"].ToString();
            }

            string guid = WanerDaoGuid.GetGuid();
            Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                  {"guid",guid},
                  {"copyid",id},
                  {"user_id",pspmodel.user_id},
                  {"categoryid",categoryid},
                  {"title",newName},
                  {"default_permission",default_permission}};

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("CommonSQL", "CopyBlogToMyblog", mydic);
            if (result > 0)
            {
                WanerDao2.WanerDaoBLL.Index.WanerDaoPersonState.AddHomeOperate(guid, "104595f8927411e183b9002354c6e759");
                return CommonContext.SucMsg("ForwardSuc");
            }
            else
            {
                return CommonContext.ErrMsg("ForwardFailed");
            }

        }
        #endregion

        #region 个人日志设定

        public PersonalBlogSettingsModel GetPersonalBlogSettingsModel()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            IList<PersonalBlogSettingsModel> mylist = DbHelperFactory.SingleInstance().GetGenericModel<PersonalBlogSettingsModel>("PersonSQL", "GetPersonalBlogSettingsModel", dic);
            if (mylist != null)
            {
                return mylist[0];
            }
            return null;
        }
        /// <summary>
        /// 获取个人设定默认权限号
        /// </summary>
        /// <returns></returns>
        public string GetDefultPermission()
        {
            PersonalBlogSettingsModel pbmodel = GetPersonalBlogSettingsModel();
            if (pbmodel != null)
            {
                //徐蓓，2012-7-12修改
                //原代码：return WanerDaoJSON.GetSuccessJson(pbmodel.default_permission);

                Dictionary<string, object> param = new Dictionary<string, object>();
                param.Add("default_permission", pbmodel.default_permission);
                return WanerDaoJSON.GetSuccessJson(param);
            }
            else
            {
                return Message("ErrorInfoCn", MessageType.error);
            }
        }


        /// <summary>
        /// 获取日志默认分类
        /// </summary>
        /// <returns></returns>
        public string GetDefalutCategroy()
        {
            PersonalBlogSettingsModel pbmodel = GetPersonalBlogSettingsModel();
            if (pbmodel != null)
            {
                return WanerDaoJSON.GetSuccessJson(pbmodel.default_category_id);
            }
            else
            {
                return Message("ErrorInfoCn", MessageType.error);
            }

        }

        /// <summary>
        /// 添加个人日志设定
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        /// string bname,bdescription,default_category_id,default_permission
        public string AddPersonalBlogSettings(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonalBlogSettings", dic);
            if (result > 0)
            {
                json = Message("SetingSuccess", MessageType.success);
            }
            else
            {
                json = Message("SetingError", MessageType.error);
            }
            return json;
        }

        /// <summary>
        /// 更改个人日志设定中的日志空间名
        /// </summary>
        /// <param name="pbsmodel"> string bname,string bdescription</param>
        /// <returns></returns>               
        public string UpdatePersonalBlogSettingsOfBlogName(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalBlogSettings", dic);
            if (result > 0)
            {
                json = Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                json = Message("UpdateFailInfoCn", MessageType.error);
            }
            return json;
        }


        /// <summary>
        /// 获取日志默认分类下拉
        /// </summary>
        /// <returns></returns>
        public string GetDefaultCategoryDropDown()
        {
            string json = string.Empty;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetDefaultCategoryDropDown", dic);
            return json;
        }

        /// <summary>
        ///  更改个人日志设定中的默认分类号
        /// </summary>
        /// <param name="dic">个人日志设定id</param>
        /// <returns></returns>
        public string UpdatePersonalBlogSettingsOfDefaultCategoryId(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalBlogSettingsOfDefaultCategoryId", dic);
            if (result > 0)
            {
                json = Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                json = Message("UpdateFailInfoCn", MessageType.error);
            }
            return json;
        }

        /// <summary>
        ///  更改个人日志设定中的默认权限号
        /// </summary>
        /// <param name="dic">个人日志设定id</param>
        /// <returns></returns>
        public string UpdatePersonalBlogSettingsOfDefaultPermission(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalBlogSettingsOfDefaultPermission", dic);
            if (result > 0)
            {
                json = Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                json = Message("UpdateFailInfoCn", MessageType.error);
            }
            return json;
        }
        /// <summary>
        /// 查询个人日志设定--名字 和 主页描述
        /// string user_id
        ///  return---  name  description
        /// </summary>
        public string GetPersonBlogNameAndDes(Dictionary<string, object> dic)
        {
            string user_id = null;
            if (dic.ContainsKey("user_id"))
            {
                user_id = dic["user_id"].ToString();
            }
            IsSelf(ref user_id);
            dic["user_id"] = user_id;
            PersonalBlogSettingsModel pbsmodel = GetPersonalBlogSettingsModel();
            if (pbsmodel != null)
            {
                dic.Add("name", pbsmodel.blog_name);
                dic.Add("description", pbsmodel.blog_description);
                return WanerDaoJSON.GetSuccessJson(dic);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson("ErrorInfoCn");
            }
        }

        #endregion

        #region 个人日志权限
        /// <summary>
        /// 获取日志默认权限
        /// </summary>
        /// <returns></returns>
        public string GetDefaultPermissionList()
        {
            IWanerDaoPermission IPermission = new WanerDaoPermission();
            IList<PersonalPermissionModel> pbsList = IPermission.SelectAll_propertyPermission(new Dictionary<string, object>() { { "user_id", pspmodel.user_id } });
            string json = string.Empty;
            if (pbsList != null)
            {
                foreach (PersonalPermissionModel item in pbsList)
                {
                    json += ",{\"name\":\"" + item.name + "\",\"id\":\"" + item.id + "\"}";
                }
                json = "[" + json.Substring(1) + "]";
                return WanerDaoJSON.GetSuccessJson(json);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson("ErrorInfoCn");
            }
        }
        #endregion

        #region 个人日志草稿

        /// <summary>
        /// 查询日志草稿
        /// </summary>
        /// <returns>返回:{result:true,rows:[],}  title,content,save_date</returns>
        public string SelectPersonalBlogDraft()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelectPersonalBlogDraft", dic);
        }

        /// <summary>
        /// 添加系统日志
        /// </summary>
        /// <param name="dic">string title,string content</param>
        /// <returns></returns>
        public string AddSystemBlogDraft(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddSystemBlogDraft", dic);
            if (result > 0)
            {
                return Message("DraftAlreadySaved", MessageType.success);
            }
            return Message("AutoSavedError", MessageType.error);
        }
        #endregion

        #region 个人日志操作

        /// <summary>
        /// 根据ID和类型查询上下日志
        /// </summary>
        /// <param name="dic">type（[0] 所有列表,[1] 类别列表, [2] 时间列表, [3] 搜索列表）
        /// string blog_id，string param
        /// </param>
        /// <returns></returns>
        public string GetPrevAndNextBlogByIdType(Dictionary<string, object> dic)
        {
            if (!dic.ContainsKey("type") || !dic.ContainsKey("blog_id") || !dic.ContainsKey("param"))
            {
                return Message("ParameterError", MessageType.error);
            }
            dic.Add("user_id", pspmodel.user_id);
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "GetPrevAndNextBlogByIdType", dic);
        }

        /// <summary>
        /// 根据日志ID查询个人日志
        /// </summary>
        /// <param name="dic">string blogid(日志ID),string user_id</param>
        /// <returns>{"category_id":"1","content":"内容","id":"20ae4c915cb14f81ae3ad2227acb55c9",
        /// "post_date":"2011/10/23 15:13:24","weather":"晴天","counter":"0","title":"sdsadsad","result":"True"}</returns>
        public string SelecPersonalBlogByBlogId(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string user_id = dic.ContainsKey("user_id") ? dic["user_id"].ToString() : null;
            IsSelf(ref user_id);//是否为主人 如果为主人user_id 设置为主人的id  否则为用户的id
            if (!dic.ContainsKey("blogid"))
            {
                json = Message("ParameterError", MessageType.error);
            }
            else
            {
                PersonalBlogModel pbmodel = GetPersonalBlogModel(dic["blogid"].ToString());
                if (pbmodel != null)
                {
                    IWanerDaoPermission Ipermission = new WanerDaoPermission();
                    Dictionary<string, object> mydic = new Dictionary<string, object>() { { "user_id", user_id }, { "permission_id", pbmodel.permission } };

                    if (Ipermission.SelectPermissionAllowArray(mydic))//是否有权限
                    {
                        json = DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "SelecPersonalBlogByBlogId", dic);
                    }
                    else
                    {
                        json = Message("HaveNoRule", MessageType.error);
                    }
                }
                else
                {
                    json = Message("BlogNotSavedOrDel", MessageType.error);
                }
            }
            return json;
        }

        /// <summary>
        ///  更新个人日志
        /// </summary>
        /// <param name="pbmodel">日志ID</param>
        /// <returns></returns>
        /// string bid,cid,title,neirong,tianqi,weizhi,quanxian,cname
        public string UpdatePersonalBlogByBlogId(Dictionary<string, object> dic)
        {
            string title = dic["title"].ToString();
            string neirong = dic["neirong"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref title, true, true, false, 60))
                return Message("TitleNotRequied", MessageType.error);
            if (!WanerDaoValidation.ValidateParameter(ref neirong, true, true, false, 4000))
                return Message("ContentNotRequied", MessageType.error);
            string category_name = dic.ContainsKey("cname") ? dic["cname"].ToString() : null;
            string new_categoryid = WanerDaoGuid.GetGuid();
            if (!string.IsNullOrEmpty(category_name))
            {
                Dictionary<string, object> mydic = new Dictionary<string, object>();
                mydic.Add("categoryid", new_categoryid);
                mydic.Add("user_id", pspmodel.user_id);
                mydic.Add("cyname", category_name);//类别名称
                mydic.Add("permission", CommonContext.PublicPermission);// "d500f146912111e0bae500210044b80f");//公开               
                int myresult = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonBlogCategory", mydic);
                if (myresult < 0)
                {
                    return Message("ErrorInfoCn", MessageType.error);
                }
                dic["cid"] = new_categoryid;
            }
            string[][] strarr = new string[][] { 
                new string[]{"cid","category_id"},new string[]{"quanxian","permission"},
                new string[]{"neirong","content"},new string[]{"tianqi","weather"},new string[]{"weizhi","location"}               
            };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            string json = string.Empty;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalBlogByBlogId", dic);
            if (result > 0)
            {
                json = Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                json = Message("UpdateFailInfoCn", MessageType.error);
            }
            return json;
        }

        /// <summary>
        /// 添加个人日志
        /// </summary>
        /// <returns></returns>
        /// string cid,title,neirong,tianqi,weizhi,quanxian,cname,activeid,active_name,groupid,infoid,infoname,page_language_id
        //新添加需要传的参数 active_name , infoname  , page_language_id
        public string AddPersonalBlog(Dictionary<string, object> dic)
        {
            /* dic.Clear();
             dic.Add("cid", "1");
             dic.Add("title", "sdsadsad");
             dic.Add("neirong", "内容");
             dic.Add("tianqi", "晴天");
             dic.Add("weizhi", "纽约");
             dic.Add("quanxian", "1");*/
            //===================================

            string title = dic["title"].ToString();
            string neirong = dic["neirong"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref title, true, true, false, 60))
                return Message("TitleNotRequied", MessageType.error);
            if (!WanerDaoValidation.ValidateParameter(ref neirong, true, true, false, 4000))
                return Message("ContentNotRequied", MessageType.error);
            string categoryid = WanerDaoGuid.GetGuid();
            if (dic["cname"].ToString() != "")
            {
                Dictionary<string, object> mydic = new Dictionary<string, object>();
                mydic.Add("categoryid", categoryid);
                mydic.Add("user_id", pspmodel.user_id);
                mydic.Add("category_name", dic["cname"].ToString());//类别名称
                mydic.Add("permission", CommonContext.PublicPermission);// "d500f146912111e0bae500210044b80f");//公开               
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonBlogCategory", mydic);
                if (result < 0)
                {
                    return Message("ErrorInfoCn", MessageType.error);
                }
                dic["cid"] = categoryid;
            }
            string[][] strarr = new string[][] { //重命名
                new string[]{"cid","category_id"},new string[]{"quanxian","permission"},
                new string[]{"neirong","content"},new string[]{"tianqi","weather"},
                new string[]{"weizhi","location"} 
            };
            ReNameDic(strarr, ref dic);
            string guid = WanerDaoGuid.GetGuid();  //日志id
            dic.Add("id", guid);
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("post_date", DateTime.Now.ToString());
            dic.Add("is_transmit", 0);//不是转发
            dic.Add("counter", 0);//点击率00
            string json = string.Empty;
            int result2 = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonalBlog", dic);
            if (result2 > 0)
            {
                //添加到主页选项卡
                WanerDao2.WanerDaoBLL.Index.WanerDaoPersonState.AddHomeOperate(guid, "1017fafb927411e183b9002354c6e759");

                json = Message("BlogSendSuccess", MessageType.success);
                WanerDaoIBLL.IPerson.IWanerDaoPersonInfoManager IperInfo = new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
                PersonalProfileModel ppmodel = IperInfo.GetPersonalProfileModel(pspmodel.user_id);
                if (dic["activeid"].ToString() != "")
                {
                    //此处调用活动分享接口  guid为日志id
                    Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                        {"id",guid},{"active_id",dic["activeid"].ToString() },{"active_name",dic["active_name"].ToString()},
                        {"create_id",pspmodel.user_id},{"SUBJECT",title},{"content",neirong}
                    };
                    WanerDao2.WanerDaoIBLL.ICommon.IWanerDaoCommon Icommon = new WanerDaoBLL.Common.WanerdaoCommon();
                    //>前台获取数据集合-id:日志表id，active_id:活动id,active_name:活动名,
                    ///  create_id:操作人id,SUBJECT:主题content:内容

                    Icommon.personalLogShareToActivity(mydic);
                }
                if (dic["groupid"].ToString() != "")
                {
                    //此处调用圈子分享接口  guid为日志id
                    WanerDao2.WanerDaoIBLL.IRelation.IWanerDaoGroup IGroup = new WanerDaoBLL.Relation.WanerDaoGroup();
                    Dictionary<string, object> mydic = new Dictionary<string, object>();
                    mydic.Add("group_id", dic["groupid"].ToString());
                    dic.Add("post_id", pspmodel.user_id);
                    dic.Add("post_name", ppmodel.name);
                    dic.Add("subject", title);
                    dic.Add("content", neirong);
                    IGroup.add_GroupDiscuss(mydic);
                }
                if (dic["infoid"].ToString() != "")
                {
                    //此处调用杂烩分享接口  guid为日志id
                    PostsModel pmodel = new PostsModel();
                    pmodel.post_id = dic["infoid"].ToString();
                    pmodel.subject = title;
                    pmodel.category_id = "";
                    pmodel.page_language_id = dic["page_language_id"].ToString();
                    pmodel.content = neirong;
                    IWanerDaoPosts Ipost = new WanerDaoBLL.Posts.WanerDaoPosts();
                    Ipost.CreatePost(pmodel);
                }
            }
            else
            {
                json = Message("BlogSendError", MessageType.error);
            }
            return json;
        }
        #endregion

        #region 个人日志批量操作

        /// <summary>
        ///  单个或者批量删除个人日志
        /// </summary>
        /// <param name="dic">日志id</param>
        /// <returns></returns>
        /// string blogid
        public string DeletePersonalBlogByBlogId(Dictionary<string, object> dic)
        {

            string[] strarr = dic["blogid"].ToString().Trim().Split(new char[] { ',' });
            try
            {
                for (int i = 0; i < strarr.Length; i++)
                {
                    Dictionary<string, object> mydic = new Dictionary<string, object>();
                    mydic.Add("blogid", strarr[i].ToString());
                    mydic.Add("user_id", pspmodel.user_id);
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalBlogByBlogId", mydic);
                }

                return Message("DeleteInfoCn", MessageType.success);
            }
            catch (Exception)
            {

                return Message("DeleteFailInfoCn", MessageType.error);
            }

        }


        /// <summary>
        /// 单个或者批量修改日志分类
        /// </summary>
        /// <param name="dic">string blogid(一个或者多个日志id),string cid(类别id) </param>
        /// <returns></returns>
        public string UpdateBlogCategory(Dictionary<string, object> dic)
        {
            string[] strarr = dic["blogid"].ToString().Trim().Split(new char[] { ',' });
            string cid = dic["cid"].ToString();
            try
            {
                for (int i = 0; i < strarr.Length; i++)
                {
                    Dictionary<string, object> mydic = new Dictionary<string, object>();
                    mydic.Add("blogid", strarr[i].ToString());
                    mydic.Add("cid", cid);
                    mydic.Add("user_id", pspmodel.user_id);
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateBlogCategory", mydic);
                }

                return Message("UpdateInfoCn", MessageType.success);
            }
            catch (Exception)
            {

                return Message("ErrorInfoCn", MessageType.error);
            }

        }


        /// <summary>
        /// 批量更新个人日志访问权限
        /// </summary>
        /// <param name="dic">string blogid, permissionid</param>
        /// <returns></returns>
        public string UpdateSomePersonalBlogPermission(Dictionary<string, object> dic)
        {
            string[] strarr = dic["blogid"].ToString().Trim().Split(new char[] { ',' });
            string permissionid = dic["permissionid"].ToString();
            try
            {
                for (int i = 0; i < strarr.Length; i++)
                {
                    Dictionary<string, object> mydic = new Dictionary<string, object>();
                    mydic.Add("blogid", strarr[i].ToString());
                    mydic.Add("permissionid", permissionid);
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateSomePersonalBlogPermission", mydic);
                } DbHelperFactory.SingleInstance().CommonTransExecuteNonQuery("", null);

                return Message("UpdateInfoCn", MessageType.success);
            }
            catch (Exception)
            {

                return Message("ErrorInfoCn", MessageType.error);
            }
        }
        #endregion

        #region 公共成员
        /// <summary>
        /// 是不是主人
        /// </summary>
        /// <returns></returns>
        public bool IsSelf(ref string user_id)
        {

            bool flag = false;
            if (!string.IsNullOrEmpty(user_id) && !(user_id.Length > 40))
            {
                flag = pspmodel.user_id == user_id.ToString() ? true : false;
            }
            else
            {
                user_id = pspmodel.user_id;
                flag = true;
            }
            return flag;
        }
        ///// <summary>
        ///// 获取URL中的日志id
        ///// </summary>
        ///// <returns></returns>
        //public string GetUrlBlogId()
        //{
        //    HttpContext hc = new HttpContext();
        //    string blogid = string.Empty;
        //    if (hc.Request.QueryString["bid"] != null)
        //    {
        //        blogid = hc.Request.QueryString["bid"].ToString();
        //    }
        //    return blogid;
        //}
        #endregion

        #region 私有成员

        private bool IsExistOfBlogCategory(string category_name)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("category_name", category_name);
            dic.Add("user_id", pspmodel.user_id);
            Object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "IsExistOfBlogCategory", dic);
            if (o != null && o != DBNull.Value)
            {
                if (int.Parse(o.ToString()) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
        }

        /// <summary>
        /// 重命名Dictionary
        /// </summary>
        /// <param name="str">锯齿数组</param>
        /// <param name="dic">Ref 字典</param>
        private void ReNameDic(string[][] str, ref  Dictionary<string, object> dic)
        {
            System.Collections.ArrayList list = new System.Collections.ArrayList(dic.Keys);
            foreach (string key in list)
            {
                foreach (string[] arr in str)
                {
                    if (arr != null && arr.Length >= 2)
                    {
                        if (arr[0] == key)
                        {
                            dic.Add(arr[1], dic[key]);
                            dic.Remove(key);
                        }
                    }
                }
            }
        }

        private string Message(string key, MessageType msgtype)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(tipLanguage);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(tipLanguage);
            }
        }
        enum MessageType
        {
            success,
            error
        }

        private static XmlDocument GoogleWeatherAPI_Parser(string baseUrl)
        {
            HttpWebRequest GWP_Request;
            HttpWebResponse GWP_Response = null;
            XmlDocument GWP_XMLdoc = null;
            try
            {
                GWP_Request = (HttpWebRequest)WebRequest.Create(string.Format(baseUrl));
                GWP_Request.UserAgent = @"Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4";
                GWP_Response = (HttpWebResponse)GWP_Request.GetResponse();
                GWP_XMLdoc = new XmlDocument();
                GWP_XMLdoc.Load(GWP_Response.GetResponseStream());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            GWP_Response.Close();
            return GWP_XMLdoc;
        }

        private static string GetWeather(string cityname, string country, string language)
        {
            string baseurl = "http://www.google.com/ig/api?weather=" + cityname + "," + country + "&" + "hl=" + language;
            XDocument xdoc = XDocument.Load(GoogleWeatherAPI_Parser(baseurl).CreateNavigator().ReadSubtree());
            string xname = xdoc.Element("xml_api_reply").Element("weather").Element("current_conditions").Element("condition").Attribute("data").Value;
            //  XName xname= xele.FirstAttribute.Name;
            return xname;
        }
        #endregion

    }
}
