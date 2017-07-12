#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人日志管理接口
* 作者：杨晓东   时间：2011/10/2 1:45:42 
* 文件名：IWanerDaoBlogManager 
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
using WanerDao2.WanerDaoModel.Person;
using System.Data;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoBlogManager
    {
        #region 搜索所有个人日志

        /// <summary>
        /// 搜索单个日志模型
        /// </summary>
        /// <param name="blogid">日志id</param>
        /// <returns></returns>
        PersonalBlogModel GetPersonalBlogModel(string blogid);

        /// <summary>
        /// 个人日志主页搜索
        /// </summary>
        /// <param name="dic">string user_id,string titOrContent,string category_id,string timeName,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        string SearchOfIndex(Dictionary<string, object> dic);

        /// <summary>
        /// 个人日志主页搜索
        /// </summary>
        /// <param name="dic">string user_id,string titOrContent,string category_id,string timeName,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        DataSet SearchOfIndexDs(Dictionary<string, object> dic);
        /// <summary>
        /// 日志管理搜索
        /// </summary>
        /// <param name="dic">string titOrContent,string category_id,string time1,string time2,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        string AdminSearchOfManager(Dictionary<string, object> dic);

        /// <summary>
        /// 根据时间范围内荣搜索日志
        /// </summary>
        /// <param name="dic">string user_id,string time1, string time2, string categoryid,string titleOrContent, string pagecurrent,string pageSize </param>
        /// <returns></returns>
        string SearchPersonBlogByTimeRange(Dictionary<string, object> dic);

        #endregion

        #region 个人日志评论
        /// <summary>
        /// 查询日志评论
        /// </summary>
        /// <param name="dic">字典（日志id，分页参数）</param>
        /// <returns></returns>
        String SelectPersonBlogComments(Dictionary<string, object> dic);

        /// <summary>
        /// 添加日志评论
        /// </summary>
        /// <param name="dic"> string id,followId,content</param>
        /// <returns></returns>
        String AddPersonBlogComments(Dictionary<string, object> dic);

        /// <summary>
        /// 删除日志评论
        /// </summary>
        /// <param name="dic">字典（评论id）</param>
        /// <returns></returns>
        String DeletePersonBlogComments(Dictionary<string, object> dic);
        #endregion

        #region 个人日志分类
        /// <summary>
        /// 获取日志类别MODEL
        /// </summary>
        /// <param name="id">类别id</param>
        /// <returns></returns>
        BlogCategoryModel GetPersonalBlogCategory(string id);

        /// <summary>
        /// 修改日志分类权限
        /// </summary>
        /// <param name="dic">string cid(分类id),pid(权限id)</param>
        /// <returns></returns>
        string UpdateBlogCategoryPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 按时间分类
        /// </summary>
        /// <param name="dic">string user_id</param>
        /// <returns></returns>
        string PersonBlogCategoryOfTime(Dictionary<string, object> dic);
        /// <summary>
        /// 添加日志分类
        /// </summary>
        /// <param name="bcmodel"></param>
        /// <returns></returns>
        String AddPersonBlogCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 删除日志分类
        /// </summary>
        /// <param name="dic">分类id</param>
        /// <returns></returns>
        String DeletePersonBlogCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 查找日志分类
        /// </summary>
        /// <returns></returns>
        String SelectPersonBlogCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 更新日志分类
        /// </summary>
        /// <param name="dic">分类模型</param>
        /// <returns></returns>
        String UpdatePersonBlogCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 根据分类id查询分类名称
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        String SelectBlogCategoryNameByCategoryId(Dictionary<string, object> dic);

        /// <summary>
        /// 根据用户获取用户日志分类（徐蓓添加，2012-7-11）
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <returns></returns>
        string GetBlogCategories(string userId);

        /// <summary>
        /// 根据用户获取用户日志分类，经过格式化，获取格式为{id:'1',value:'test'}（徐蓓添加，2012-8-10）
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <returns></returns>
        string GetBlogCategoriesWithFormat(string userId);
        #endregion

        #region 个人日志设定
        /// <summary>
        /// 获取日志默认权限列表
        /// </summary>
        /// <returns></returns>
        string GetDefaultPermissionList();

        /// <summary>
        /// 获取个人设定默认权限号
        /// </summary>
        /// <returns></returns>
        string GetDefultPermission();

        /// <summary>
        /// 获取日志默认分类
        /// </summary>
        /// <returns></returns>
        string GetDefalutCategroy();

        /// <summary>
        /// 更改个人日志设定中的日志空间名  空间签名
        /// </summary>
        /// <param name="dic">bname   bdescription </param>
        /// <returns></returns>
        string UpdatePersonalBlogSettingsOfBlogName(Dictionary<string, object> dic);

        /// <summary>
        ///  更改个人日志设定中的默认分类号
        /// </summary>
        /// <param name="dic">个人日志设定id</param>
        /// <returns></returns>
        string UpdatePersonalBlogSettingsOfDefaultCategoryId(Dictionary<string, object> dic);

        /// <summary>
        ///  更改个人日志设定中的默认权限号
        /// </summary>
        /// <param name="dic">个人日志设定id</param>
        /// <returns></returns>
        string UpdatePersonalBlogSettingsOfDefaultPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 添加个人日志设定
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        /// string bname,bdescription,default_category_id,default_permission
        string AddPersonalBlogSettings(Dictionary<string, object> dic);

        /// <summary>
        /// 获取当前用户日志默认分类下拉
        /// </summary>
        /// <returns></returns>
        string GetDefaultCategoryDropDown();

        /// <summary>
        /// 查询个人日志设定--名字 和 主页描述
        ///  return---  name  description
        /// </summary>
        string GetPersonBlogNameAndDes(Dictionary<string, object> dic);
        #endregion

        #region 个人日志草稿

        /// <summary>
        /// 添加系统日志
        /// </summary>
        /// <param name="dic">string title,string content</param>
        /// <returns></returns>
        string AddSystemBlogDraft(Dictionary<string, object> dic);

        /// <summary>
        /// 获取日志草稿
        /// </summary>
        /// <returns></returns>
        string SelectPersonalBlogDraft();

        #endregion

        #region 个人日志操作
        /// <summary>
        /// 根据ID和类型查询上下日志
        /// </summary>
        /// <param name="dic">type（[0] 所有列表,[1] 类别列表, [2] 时间列表, [3] 搜索列表）
        /// string blog_id，string param
        /// </param>
        /// <returns></returns>
        string GetPrevAndNextBlogByIdType(Dictionary<string, object> dic);

        /// <summary>
        /// 根据日志ID查询个人日志
        /// </summary>
        /// <param name="dic">日志ID</param>
        /// <returns></returns>
        String SelecPersonalBlogByBlogId(Dictionary<string, object> dic);

        /// <summary>
        ///  根据日志ID更新个人日志
        /// </summary>
        /// <param name="pbmodel">日志ID</param>
        /// <returns></returns>
        String UpdatePersonalBlogByBlogId(Dictionary<string, object> dic);

        /// <summary>
        /// 添加个人日志
        /// </summary>
        /// <param name="dic">日志模型</param>
        /// <returns></returns>
        String AddPersonalBlog(Dictionary<string, object> dic);
        #endregion

        #region 个人日志批量操作

        /// <summary>
        ///  单个或者批量删除个人日志
        /// </summary>
        /// <param name="dic">日志id</param>
        /// <returns></returns>
        /// string blogid
        string DeletePersonalBlogByBlogId(Dictionary<string, object> dic);

        /// <summary>
        /// 单个或者批量修改日志分类
        /// </summary>
        /// <param name="dic">string blogid(一个或者多个日志id),string cid(类别id) </param>
        /// <returns></returns>
        string UpdateBlogCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 批量更新个人日志访问权限
        /// </summary>
        /// <param name="dic">日志id字符串</param>
        /// <returns></returns>
        String UpdateSomePersonalBlogPermission(Dictionary<string, object> dic);
        #endregion

        #region 公共方法
        /// <summary>
        /// 是不是主人
        /// </summary>
        /// <returns></returns>
        bool IsSelf(ref string user_id);
        #endregion
    }
}
