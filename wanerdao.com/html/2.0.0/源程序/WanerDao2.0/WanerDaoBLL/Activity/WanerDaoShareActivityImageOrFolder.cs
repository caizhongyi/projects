using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Activity;
using WanerDao2.WanerDaoDALFactory;

#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：
* 玩儿道活动相册共享
 * 本类具有以下功能
* 1.向活动系统自建相册共享图片
* 2.向活动共享整个个人相册文件夹
* 3.向活动指定相册共享图片
* 4.获取某个活动相册列表
* 作者：金广亮
* 时间：2012-10-25 23:18:09 
* 文件名：WanerDaoShareActivity 
* 版本：V0.0.1
* 
* 修改者： 
* 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoBLL.Activity
{
    public class WanerDaoShareActivityImageOrFolder
    {
        #region 获取共享相册列表
        /// <summary>
        /// 返回指定活动下属所有相册(里面包含活动系统自建、他人创建或共享、自己创建或共享的相册)
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <returns>相册列表，列表里面包含相册ID，相册名称，相册描述，创建或共享者ID</returns>
        public static IList<ActivityShareImageFolder> GetActivityAllShareImageFolder(string activityid)
        {
            IList<ActivityShareImageFolder> imagefolderlist = new List<ActivityShareImageFolder>();
            IList<ActivityShareImageFolder> _systemfolderlist = GetActivitySystemShareImageFolder(activityid);
            if (_systemfolderlist != null)
            {
                foreach (ActivityShareImageFolder sf in _systemfolderlist)
                {
                    imagefolderlist.Add(sf);
                }
            }
            IList<ActivityShareImageFolder> _mysharefolderlist = GetActivityMyShareImageFolder(activityid);
            if (_mysharefolderlist != null)
            {
                foreach (ActivityShareImageFolder sf in _mysharefolderlist)
                {
                    imagefolderlist.Add(sf);
                }
            }
            IList<ActivityShareImageFolder> _mycreatefolderlist = GetActivityMyCreateImageFolder(activityid);
            if (_mycreatefolderlist != null)
            {
                foreach (ActivityShareImageFolder sf in _mycreatefolderlist)
                {
                    imagefolderlist.Add(sf);
                }
            }
            IList<ActivityShareImageFolder> _otherpersonsharefolderlist = GetActivityOtherPersonShareImageFolder(activityid);
            if (_otherpersonsharefolderlist != null)
            {
                foreach (ActivityShareImageFolder sf in _otherpersonsharefolderlist)
                {
                    imagefolderlist.Add(sf);
                }
            }
            IList<ActivityShareImageFolder> _otherpersoncreatefolderlist = GetActivityOtherPersonCreateImageFolder(activityid);
            if (_otherpersoncreatefolderlist != null)
            {
                foreach (ActivityShareImageFolder sf in _otherpersoncreatefolderlist)
                {
                    imagefolderlist.Add(sf);
                }
            }
            return imagefolderlist;
        }
        /// <summary>
        /// 返回指定活动中系统自建相册
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <returns>相册列表，列表里面包含相册ID，相册名称，相册描述，创建或共享者ID</returns>
        public static IList<ActivityShareImageFolder> GetActivitySystemShareImageFolder(string activityid)
        {
            IList<ActivityShareImageFolder> imagefolderlist = new List<ActivityShareImageFolder>();
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityid);
            imagefolderlist = DbHelperFactory.SingleInstance().GetGenericModel<ActivityShareImageFolder>("ActivitySQL", "activitysystemimagefolder",dic);
            return imagefolderlist;
        }
        /// <summary>
        /// 返回指定活动中自己共享的相册
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <returns>相册列表，列表里面包含相册ID，相册名称，相册描述，创建或共享者ID</returns>
        public static IList<ActivityShareImageFolder> GetActivityMyShareImageFolder(string activityid)
        {
            IList<ActivityShareImageFolder> imagefolderlist = new List<ActivityShareImageFolder>();
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityid);
            dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
            imagefolderlist = DbHelperFactory.SingleInstance().GetGenericModel<ActivityShareImageFolder>("ActivitySQL", "myshareimagefolder", dic);
            return imagefolderlist;
        }
        /// <summary>
        /// 返回指定活动中自己创建的相册
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <returns>相册列表，列表里面包含相册ID，相册名称，相册描述，创建或共享者ID</returns>
        public static IList<ActivityShareImageFolder> GetActivityMyCreateImageFolder(string activityid)
        {
            IList<ActivityShareImageFolder> imagefolderlist = new List<ActivityShareImageFolder>();
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityid);
            dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
            imagefolderlist = DbHelperFactory.SingleInstance().GetGenericModel<ActivityShareImageFolder>("ActivitySQL", "mycreateimagefolder", dic);
            return imagefolderlist;
        }
        /// <summary>
        /// 返回指定活动中他人共享的相册
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <returns>相册列表，列表里面包含相册ID，相册名称，相册描述，创建或共享者ID</returns>
        public static IList<ActivityShareImageFolder> GetActivityOtherPersonShareImageFolder(string activityid)
        {
            IList<ActivityShareImageFolder> imagefolderlist = new List<ActivityShareImageFolder>();
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityid);
            dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
            imagefolderlist = DbHelperFactory.SingleInstance().GetGenericModel<ActivityShareImageFolder>("ActivitySQL", "otherpersonshareimagefolder", dic);
            return imagefolderlist;
        }
        /// <summary>
        /// 返回指定活动中他人创建的相册
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <returns>相册列表，列表里面包含相册ID，相册名称，相册描述，创建或共享者ID</returns>
        public static IList<ActivityShareImageFolder> GetActivityOtherPersonCreateImageFolder(string activityid)
        {
            IList<ActivityShareImageFolder> imagefolderlist = new List<ActivityShareImageFolder>();
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("activity_id", activityid);
            dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
            imagefolderlist = DbHelperFactory.SingleInstance().GetGenericModel<ActivityShareImageFolder>("ActivitySQL", "otherpersoncreateimagefolder", dic);
            return imagefolderlist;
        }
        #endregion
        #region 向活动系统自建相册共享图片
        /// <summary>
        /// 向活动系统自建相册共享图片,直接操作活动相片表
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <param name="folderid">个人相册ID</param>        
        /// <returns>true：共享成功；false：共享失败</returns>
        public static bool ShareImagesToSystemFolder(string activityid, string folderid)
        {
            bool isSuccess = false;
            try
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("activity_id", activityid);
                dic.Add("folder_id", folderid);
                dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                int i = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("ActivitySQL", "shareimagestosystemfolder", dic);
                if (i>-1)
                {
                    isSuccess = true;
                } 
                else
                {
                    isSuccess = false;
                }                
            }
            catch (System.Exception ex)
            {
                isSuccess = false;
            }
                
            return isSuccess;
        }
        #endregion
        #region 向活动共享整个个人相册文件夹
        /// <summary>
        /// 向活动共享整个个人相册文件夹
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <param name="folderid">个人相册ID</param>
        /// <param name="foldername">共享相册名</param>
        /// <returns>true：共享成功；false：共享失败</returns>
        public static bool ShareFolderToActivity(string activityid, string folderid,string foldername)
        {
            bool isSuccess = false;
            try
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("activity_id", activityid);
                dic.Add("folder_id", folderid);
                dic.Add("folder_name", foldername);
                dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                int i = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("ActivitySQL", "shareimagestoactivity", dic);
                if (i > -1)
                {
                    isSuccess = true;
                }
                else
                {
                    isSuccess = false;
                }
            }
            catch (System.Exception ex)
            {
                isSuccess = false;
            }
            return isSuccess;
        }
        #endregion
        #region 向活动指定相册共享图片
        /// <summary>
        /// 向活动指定相册共享图片
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <param name="photoIds">相片ID集合</param>
        /// <param name="activityfolderid">活动相册ID</param>
        /// <returns>true：共享成功；false：共享失败</returns>
        public static bool ShareImagesToCustomFolder(string activityid,List<string> photoIds,string activityfolderid)
        {
            bool isSuccess = false;
            try
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("activity_id", activityid);
                dic.Add("folder_id", activityfolderid);
                StringBuilder sb = new StringBuilder();
                foreach (string s in photoIds)
                {
                    sb.Append(s).Append(",");
                }
                sb.Remove(sb.Length - 1, 1);
                dic.Add("photoids", sb.ToString());
                dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                int i = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("ActivitySQL", "shareimagestocustomfolder", dic);
                if (i > -1)
                {
                    isSuccess = true;
                }
                else
                {
                    isSuccess = false;
                }
            }
            catch (System.Exception ex)
            {
                isSuccess = false;
            }
            return isSuccess;
        }
        #endregion
    }
}
