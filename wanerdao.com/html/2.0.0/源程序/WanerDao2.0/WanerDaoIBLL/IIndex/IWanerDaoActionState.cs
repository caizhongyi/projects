#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 主页动态数据
* 作者：杨晓东   时间：2012/3/17 0:42:09 
* 文件名：IActionState 
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
using WanerDao2.WanerDaoModel.Index;

namespace WanerDao2.WanerDaoIBLL.IIndex
{
    public interface IWanerDaoActionState
    {

        #region 用户信息
        /// <summary>
        /// 添加用户动作信息
        /// </summary>
        /// <param name="userOperate"></param>
        void AddUserOperation(UserOperationModel userOperate);

        /// <summary>
        /// 修改用户动作信息
        /// </summary>
        /// <param name="userOperate"></param>
        void ModifyUserOperation(UserOperationModel userOperate);

        /// <summary>
        /// 删除用户动作信息
        /// </summary>
        /// <param name="id"></param>
        void DeleteUserOperation(string id);
        #endregion

        #region 访问记录
        /// <summary>
        /// 获取访问过的用户记录
        /// </summary>
        /// <param name="dic">string user_id</param>
        /// <returns></returns>
        string GetVisitedUser(Dictionary<string, object> dic);

        /// <summary>
        /// 获取访问过的用户记录
        /// </summary>
        /// <param name="user_id"></param>
        /// <returns></returns>
        IList<PersonalVisitRecord> GetVisitedUser(string user_id);
        #endregion

        #region 可能认识的朋友
        /// <summary>
        /// 获取可能认识的朋友
        /// </summary>
        /// <param name="dic">string user_id</param>
        /// <returns></returns>
        string GetMayKnowFrieds(Dictionary<string, object> dic);
        #endregion

        #region 好友动态
        /// <summary>
        /// 获取HTML好友动态
        /// </summary>
        /// <returns></returns>
        string GetHTMLStateResult(Dictionary<string, object> dic);

        /// <summary>
        /// 获取好友动态(过滤权限后)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<UserOperationModel> GetBaseTableModelList(string user_id, string pageCurrent, string pageSize, string whereCategory);
        #endregion

        #region 主页留言
        /// <summary>
        /// 主页留言
        /// </summary>
        /// <param name="dic">string person_id,string msgcontent</param>
        /// <returns></returns>
        string LeaveMessages(Dictionary<string, object> dic);
        #endregion

        #region 屏蔽举报
        /// <summary>
        /// 屏蔽动态
        /// </summary>
        /// <param name="dic">string source_type_id,string target_user_id
        /// 主页对应的几个选项卡（new,message,group,activity,posts ）， 目标用户id
        /// </param>
        /// <returns></returns>
        string ShieldDynamicState(Dictionary<string, object> dic);

        /// <summary>
        /// 查询屏蔽的人的列表
        /// </summary>
        /// <param name="dic">string source_type_id</param>
        /// <returns></returns>
        string GetShieldStateList(Dictionary<string, object> dic);
        
        /// <summary>
        /// 删除屏蔽的动态
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        string ShieldDynamicStateOfDel(Dictionary<string, object> dic);
        
        /// <summary>
        /// 删除屏蔽的动态（2012-9-27徐蓓添加）
        /// </summary>
        /// <param name="sourceType">主页对应的几个选项卡（new,message,group,activity,posts）</param>
        /// <param name="targetUserId">被屏蔽用户标识</param>
        /// <returns></returns>
        string ShieldDynamicStateOfDel(string sourceType, string targetUserId);

        /// <summary>
        /// 举报
        /// </summary>
        /// <param name="dic">string source_type_id,target_id</param>
        /// <returns></returns>
        string DustInfoReport(Dictionary<string, object> dic);
        #endregion

        #region 回复
        /// <summary>
        /// 回复-- 其他回复添加switch分支
        /// </summary>
        /// <param name="dic">string category,string id,string followId,string content</param>
        /// <returns></returns>
        string ReplayComment(Dictionary<string, object> dic);
        #endregion

        #region 搜索服务
        /// <summary>
        /// 全站搜索服务接口
        /// </summary>
        /// <param name="searchStr">搜索的字符创</param>
        /// <param name="categroy">搜索类别(PERSON, GROUP,ACTIVITY,POSTS,OTHER)</param>
        /// <param name="pageCount">每页的显示的记录数</param>
        /// <param name="pageNum">当前页数</param>
        /// <param name="resultCount">返回总记录条数</param>
        /// <returns>搜索结果</returns>
        string GetSearchResult(Dictionary<string, object> dic);

        /// <summary>
        /// 传入关键词与搜索类型，可以返回此搜索类型的结果总数
        /// </summary>
        /// <param name="dic">term , category( 搜索类型，单个类型包括person、group、activity、posts、other、all。多个搜索类型用逗号隔开)</param>
        /// <returns>返回为json格式数据，建议格式为{result:true,data:{person:1,group:2}}</returns>
        string GetSearchCount(Dictionary<string, object> dic);
        #endregion

        #region 用户退出
        string Exit();
        #endregion

        #region 站内信息未读数量
        string GetMessageNonReadCount();
        #endregion

    }
}
