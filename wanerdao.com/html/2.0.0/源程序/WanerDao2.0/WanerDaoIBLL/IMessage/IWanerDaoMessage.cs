#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 站内消息接口
* 作者：杨晓东   时间：2011/11/13 21:37:54 
* 文件名：IWanerDaoMessage 
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
using WanerDao2.WanerDaoModel.Activity;

namespace WanerDao2.WanerDaoIBLL.IMessage
{
    public interface IWanerDaoMessage
    {
        #region 写信息
        /// <summary>
        /// 发送站内消息
        /// </summary>
        /// <param name="dic">string receivePerson,string content,string isSava</param>
        /// <returns></returns>
        string SendMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 保存到草稿箱
        /// </summary>
        /// <param name="dic">string receivePerson,string content</param>
        /// <returns></returns>
        string SaveToMessageBox(Dictionary<string, object> dic);

        /// <summary>
        /// 系统保存到草稿箱
        /// </summary>
        /// <param name="dic">>string receivePerson,string content</param>
        /// <returns></returns>
        string SysSaveToMessageBox(Dictionary<string, object> dic);

        /// <summary>
        /// 根据id获取回复内容
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        string GetReplyCountentByid(Dictionary<string, object> dic);
        #endregion

        #region 圈子邀请
        /// <summary>
        /// 发送圈子邀请
        /// </summary>
        /// <param name="dic">string allFriends,string allGroups,string friend,string sendGroup,string recGroup</param>
        /// 分为邀请好友(friend)和圈子(sendGroup),加入选择的圈子也就是要发送的圈子(recGroup)
        /// <returns></returns>
        string SendGroupMessage(Dictionary<string, object> dic);

        #endregion

        #region 活动邀请
        /// <summary>
        /// 发送活动邀请
        /// </summary>
        /// <param name="dic">string allFriends,string allGroups,string receivePerson,string receiveGroup,string sendGroup</param>
        /// <returns></returns>
        string SendActivityMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 发送活动邀请（2012-11-16 徐蓓添加）
        /// </summary>
        /// <param name="invite">活动邀请信息</param>
        /// <returns></returns>
        bool InviteActivityMessage(ActivityInvite invite);
        #endregion

        #region 好友邀请
        /// <summary>
        /// 发送好友邀请
        /// </summary>
        /// <param name="dic">string personid(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        string SendPersonalInvite(Dictionary<string, object> dic);

        /// <summary>
        /// 同意好友邀请
        /// </summary>
        /// <param name="dic">string id(邀请那条信息的id),string class_id(好友分组id)</param>
        /// <returns></returns>
        string AssentFriendInvite(Dictionary<string, object> dic);

        #endregion

        #region 信息收件箱
        /// <summary>
        ///  获取收件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string currentPageIndex,string pageSize</param>
        /// <returns></returns>
        string GetMessageList(Dictionary<string, object> dic);

        /// <summary>
        /// 阅读消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        string ReadMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 标记消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        string MarkMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 获取未读取消息个数
        /// </summary>
        /// <returns></returns>
        string GetNotReadCount();

        /// <summary>
        /// 删除消息
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开)</param>
        /// <returns></returns>
        string DelMessage(Dictionary<string, object> dic);
        #endregion

        #region 邀请收件箱
        /// <summary>
        /// 获取邀请收件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string currentPageIndex,string pageSize</param>
        /// <returns></returns>
        string GetInviteList(Dictionary<string, object> dic);

        ///// <summary>
        ///// 接受邀请
        ///// </summary>
        ///// <param name="dic">string id(多个为集合用逗号分开),</param>
        ///// <returns></returns>
        //string AcceptInvite(Dictionary<string, object> dic);

        /// <summary>
        /// 忽略邀请
        /// </summary>
        /// <param name="dic">string id(多个为集合用逗号分开)</param>
        /// <returns></returns>
        string NeglectInvite(Dictionary<string, object> dic);
        #endregion

        #region 信息发件箱
        /// <summary>
        ///  获取发件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string currentPageIndex,string pageSize</param>
        /// <returns></returns>
        string GetSendMessageList(Dictionary<string, object> dic);

        /// <summary>
        /// 标记消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个),string isMark</param>
        /// <returns></returns>
        string MarkSendMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 删除消息
        /// </summary>
        /// <param name="dic">string id(多个为集合用逗号分开)</param>
        /// <returns></returns>
        string DelSendMessage(Dictionary<string, object> dic);
        #endregion

        #region 邀请发件箱
        /// <summary>
        /// 获取邀请发件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string currentPageIndex,string pageSize</param>
        /// <returns></returns>
        string GetSendInviteList(Dictionary<string, object> dic);

        /// <summary>
        /// 再次发送邀请
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开),</param>
        /// <returns></returns>
        string SendInviteAgain(Dictionary<string, object> dic);

        /// <summary>
        /// 删除邀请
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开)</param>
        /// <returns></returns>
        string DelSendInvite(Dictionary<string, object> dic);
        #endregion

        #region 垃圾箱页面
        #region 消息
        /// <summary>
        /// 信息垃圾箱页面-获取列表
        /// </summary>
        /// <param name="dic"> string optionid,string currentPageIndex,string pageSize</param>
        /// <returns></returns>
        string GetRubbishMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 标记垃圾消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个),string isMark</param>
        /// <returns></returns>
        string MarkRubbishMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 还原消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        string RevertRubbishMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 彻底删除消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        string QuiteDeleteRubbishMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 清空垃圾箱消息
        /// </summary>
        /// <returns></returns>
        string ClearRubbishMessage();
        #endregion

        #region 邀请
        /// <summary>
        /// 获取邀请垃圾箱列表
        /// </summary>
        /// <param name="dic">string optionid,string currentPageIndex,string pageSize</param>
        /// <returns></returns>
        string GetRubbishInvite(Dictionary<string, object> dic);

        /// <summary>
        /// 还原邀请信息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        string RevertRubbishInvite(Dictionary<string, object> dic);

        /// <summary>
        /// 清空垃圾箱邀请
        /// </summary>
        /// <returns></returns>
        string ClearRubbishInvite();

        /// <summary>
        /// 彻底删除邀请
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        string QuiteDeleteRubbishInvite(Dictionary<string, object> dic);
        #endregion
        #endregion

        #region 草稿箱
        /// <summary>
        /// 读取系统草稿
        /// </summary>
        /// <returns></returns>
        string GetSystemDrafeMessage();

        /// <summary>
        /// 获取消息草稿箱列表
        /// </summary>
        /// <param name="dic">string optionid,string currentPageIndex,string pageSize</param>
        /// <returns></returns>
        string GetDraftMessageList(Dictionary<string, object> dic);

        /// <summary>
        /// 标记草稿消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个),string isMark</param>
        /// <returns></returns>
        string MarkDraftMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 删除消息
        /// </summary>
        /// <param name="dic">string id(多个为集合用逗号分开)</param>
        /// <returns></returns>
        string DelDraftMessage(Dictionary<string, object> dic);
        #endregion

        #region 详细浏览页
        /// <summary>
        /// 获取消息列表
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        string GetDetailedMessageList(Dictionary<string, object> dic);

        /// <summary>
        /// 获取消息内容
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        string GetDetailedMessage(Dictionary<string, object> dic);

        /// <summary>
        /// 加载邮件详细信息
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        string LoadingMessageDetail(Dictionary<string, object> dic);

        /// <summary>
        /// 发件箱回复
        /// </summary>
        /// <param name="dic">string parentid,string receivePersonid,string receiveCoutent</param>
        /// <returns></returns>
        string ReplyMessage(Dictionary<string, object> dic);

        #endregion

        #region 共有成员
        /// <summary>
        /// 联想输入 查询用户好友
        /// </summary>
        /// <param name="name">好友姓名(string fname)</param>
        /// <returns></returns>
        string GetPersonalFriendsByName(Dictionary<string, object> dic);
        #endregion
    }
}
