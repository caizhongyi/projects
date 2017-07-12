#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 站内消息实现类
* 作者：杨晓东   时间：2011/11/15 22:12:07 
* 文件名：WanerDaoMessage 
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
using WanerDao2.WanerDaoIBLL.IMessage;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModel.Message;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections;
using System.Data.Common;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoModule.Utils;
using WanerDao2.WanerDaoModel.Activity;

namespace WanerDao2.WanerDaoBLL.Message
{
    public class WanerDaoMessage : IWanerDaoMessage
    {
        #region INITIALIZE

        readonly WanerDaoIBLL.IPerson.IWanerDaoPersonSecurity IPersonSec = null;
        readonly WanerDaoIBLL.IPerson.IWanerDaoPersonInfoManager IPersonInfo = null;
        readonly WanerDaoIBLL.ICommon.IWanerDaoCommon ICommon = null;
        PersonalSecurityProfileModel _pspmodel;

        PersonalProfileModel _ppmodel;
        SendMessageModel smmodel;
        DraftMessageModel drfmodel;
        InboxInviteMessageModel inivmodel;
        SendInviteMessageModel sendInivmodel;
        InboxInviteMessageModel inboxInivmodel;
        InboxMessageModel inmsgmodel;
        public PersonalProfileModel Ppmodel
        {
            get
            {
                if (_ppmodel == null)
                    _ppmodel = IPersonInfo.GetPersonalProfileModel(Pspmodel.user_id);
                return _ppmodel;
            }
        }
        public PersonalSecurityProfileModel Pspmodel
        {
            get
            {
                if (_pspmodel == null)
                    _pspmodel = CommonContext.GetUserSecurityInfo();
                return _pspmodel;
            }
        }

        public WanerDaoMessage()
        {
            if (IPersonSec == null)
                IPersonSec = new WanerDaoBLL.Person.WanerDaoPersonSecurity();
            if (IPersonInfo == null)
                IPersonInfo = new WanerDaoBLL.Person.WanerDaoPersonInfoManager();
            if (ICommon == null)
                ICommon = new WanerDaoBLL.Common.WanerdaoCommon();
            //if (smmodel == null)
            //    smmodel = new SendMessageModel();
            //if (drfmodel == null)
            //    drfmodel = new DraftMessageModel();
            //if (inivmodel == null)
            //    inivmodel = new InboxInviteMessageModel();
        }
        #endregion

        #region 留言
        /// <summary>
        /// 添加留言
        /// </summary>
        /// <param name="dic">string content,string isopen(0 or 1),string recive_user</param>
        /// <returns></returns>
        public string AddLeaveMessage(string content, bool isOpen, string recivedUserId)
        {
            if (recivedUserId == Pspmodel.user_id) return ErrMsg("CanNotLeaveMsgSelf");
            string guid = WanerDaoGuid.GetGuid();
            LeaveMessageModel leaveMsgModel = new LeaveMessageModel()
            {
                id = guid,
                content = content,
                from_id = Pspmodel.user_id,
                is_open = isOpen ? 1 : 0,
                to_id = recivedUserId,
                post_date = DateTime.Now
            };
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<LeaveMessageModel>("MessageSQL", "AddLeaveMessage", leaveMsgModel);
            if (result > 0)
            {
                WanerDao2.WanerDaoIBLL.IIndex.IWanerDaoActionState actionIndex = new Index.WanerDaoPersonState() as WanerDao2.WanerDaoIBLL.IIndex.IWanerDaoActionState;
                WanerDao2.WanerDaoModel.Index.UserOperationModel operateModel = new WanerDaoModel.Index.UserOperationModel();
                operateModel.id = WanerDaoGuid.GetGuid();
                operateModel.object_id = guid;
                operateModel.user_id = recivedUserId;
                operateModel.permission = CommonContext.PublicPermission;
                operateModel.option_id = "message";
                operateModel.action_category_id = "";
                actionIndex.AddUserOperation(operateModel);
                return SucMsg("SuccessInfoCn");
            }
            return ErrMsg("FailInfoCn");
        }

        #endregion

        #region 写信息
        /// <summary>
        /// 发送站内消息
        /// </summary>
        /// <param name="dic">string receivePerson(多个的话用逗号分隔哦,只传id就行了),string content,string isSava(0或1)</param>
        /// <returns></returns>
        public string SendMessage(Dictionary<string, object> dic)
        {
            List<string> strarr = dic["receivePerson"].ToString().Trim().Split(new char[] { ',' }).ToList();
            string isSave = dic["isSava"].ToString();
            string parentid = dic.ContainsKey("parentid") ? dic["parentid"].ToString() : null;
            DateTime nowTime = WanerDaoUtils.GetNow();
            string sendGuid = WanerDaoGuid.GetGuid();

            smmodel = new SendMessageModel();
            smmodel.id = sendGuid;
            smmodel.user_id = Ppmodel.user_id;
            smmodel.send_id = Ppmodel.user_id;
            smmodel.send_email = Pspmodel.security_email;
            smmodel.is_delete = false;
            smmodel.is_mark = false;
            smmodel.content = dic["content"].ToString();
            smmodel.reply_id = sendGuid;
            smmodel.send_date = nowTime;
            smmodel.is_msg = true;
            if (parentid != null) smmodel.reply_id = parentid;
            //向发件箱插入发送的消息
            DbHelperFactory.SingleInstance().ExecuteNonQuery<SendMessageModel>("MessageSQL", "SendMessage", smmodel);
            strarr.Add(Ppmodel.user_id);  //把自己也添加到收件人列表
            if (parentid == null)
            {
                #region 保存草稿和循环插入收件人列表
                for (int i = 0; i < strarr.Count; i++)
                {
                    var listDic = new Dictionary<string, object>()
                    {
                        {"id", sendGuid},{"user_id",strarr[i].ToString()}
                    };
                    //向接受消息的人物列表中插入收件人
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "InsertSendMessageReceiverList", listDic);

                    if (isSave.Equals("1"))
                    {
                        drfmodel = new DraftMessageModel()
                        {
                            id = WanerDaoGuid.GetGuid(),
                            user_id = Pspmodel.user_id,
                            send_id = strarr[i].ToString(),
                            send_email = Pspmodel.security_email,
                            draft_date = nowTime,
                            //send_username = Ppmodel.name,
                            is_system = false,
                            is_msg = true,
                            content = dic["content"].ToString()
                        };
                        int relt = DbHelperFactory.SingleInstance().ExecuteNonQuery<DraftMessageModel>("MessageSQL", "SaveDraftMessage", drfmodel);
                        if (relt < 0)
                        {
                            return ErrMsg("FailInfoCn");
                        }
                    }
                }
                #endregion
            }

            //向收件箱插入收件人数据
            string guid = WanerDaoGuid.GetGuid();
            inmsgmodel = new InboxMessageModel();
            inmsgmodel.from_id = Ppmodel.user_id;
            inmsgmodel.from_email = Pspmodel.security_email;
            inmsgmodel.id = sendGuid;// 此处的guid为sendmessagereceiverlist所用 不做实际数据库插入。          
            inmsgmodel.receive_date = nowTime;
            inmsgmodel.content = dic["content"].ToString();
            inmsgmodel.reply_id = sendGuid;// "";
            if (parentid != null) { inmsgmodel.id = parentid; inmsgmodel.reply_id = parentid; }

            int result1 = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<InboxMessageModel>("MessageSQL", "ReciveMsg", inmsgmodel);

            if (result1 > 0)
            {
                return SucMsg("SendSuccess");
            }
            else
            {
                return ErrMsg("SendFailed");
            }
        }

        /// <summary>
        /// 保存到草稿箱
        /// </summary>
        /// <param name="dic">string receivePerson(多个的话用逗号分隔哦,只传id就行了),string content</param>
        /// <returns></returns>
        public string SaveToMessageBox(Dictionary<string, object> dic)
        {
            return SaveDrafMsg(dic, false);
        }

        private string SaveDrafMsg(Dictionary<string, object> dic, bool isSys)
        {
            string[] strarr = dic["receivePerson"].ToString().Trim().Split(new char[] { ',' });
            DateTime nowTime = DateTime.Now;
            for (int i = 0; i < strarr.Length; i++)
            {
                try
                {
                    drfmodel = new DraftMessageModel()
                    {
                        id = WanerDaoGuid.GetGuid(),
                        user_id = Pspmodel.user_id,
                        send_id = strarr[i].ToString(),
                        draft_date = nowTime,
                        send_email = "",
                        is_delete = false,
                        is_mark = false,
                        is_read = false,
                        subject = "",
                        is_system = isSys,
                        is_msg = true,
                        content = dic["content"].ToString()
                    };
                    int result;
                    if (isSys)
                    {
                        result = DbHelperFactory.SingleInstance().ExecuteNonQuery<DraftMessageModel>("MessageSQL", "SysSaveDraftMessage", drfmodel);
                        if (result > 0)
                        {
                            return SucMsg("DraftAlreadySaved");
                        }
                        else
                        {
                            return ErrMsg("AutoSavedError");
                        }
                    }
                    else
                    {
                        result = DbHelperFactory.SingleInstance().ExecuteNonQuery<DraftMessageModel>("MessageSQL", "SaveDraftMessage", drfmodel);
                    }
                }
                catch (Exception ex)
                {
#if DEBUG
                    Console.WriteLine(ex);//待注释
#endif
                    return ErrMsg(ex.Message);
                }
            }
            return SucMsg("SendSuccess");
        }


        /// <summary>
        /// 系统保存到草稿箱
        /// </summary>
        /// <param name="dic">string receivePerson,string content</param>
        /// 如果收件人为空的话传一个空的字符串,不要不传.
        /// <returns></returns>
        public string SysSaveToMessageBox(Dictionary<string, object> dic)
        {
            return SaveDrafMsg(dic, true);
        }

        /// <summary>
        /// 根据id过去回复内容-------这个好像没有用到哦
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        public string GetReplyCountentByid(Dictionary<string, object> dic)
        {
            return null;
            //            string[] strarr = dic["receivePerson"].ToString().Trim().Split(new char[] { ',' });
            //            string isSave = dic["isSava"].ToString();
            //            DateTime nowTime = DateTime.Now;
            //            for (int i = 0; i < strarr.Length; i++)
            //            {
            //                try
            //                {
            //                    string guid = WanerDaoGuid.GetGuid();
            //                    inmsgmodel = new InboxMessageModel();
            //                    inmsgmodel.id = guid;
            //                    inmsgmodel.from_id = Ppmodel.user_id;
            //                    inmsgmodel.user_id = strarr[i].ToString();
            //                    inmsgmodel.from_username = Ppmodel.name;
            //                    inmsgmodel.is_msg = true;
            //                    inmsgmodel.receive_date = nowTime;
            //                    inmsgmodel.content = dic["content"].ToString();

            //                    int result1 = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<InboxMessageModel>("MessageSQL", "ReciveMsg", inmsgmodel);
            //                    if (result1 < 0)
            //                    {
            //                        return ErrMsg("发送失败");
            //                    }

            //                    if (isSave.Equals("1"))
            //                    {
            //                        drfmodel = new DraftMessageModel()
            //                        {
            //                            id = guid,
            //                            user_id = Pspmodel.user_id,
            //                            send_id = strarr[i].ToString(),
            //                            draft_date = nowTime,
            //                            send_username = Ppmodel.name,
            //                            is_system = false,
            //                            is_msg = true,
            //                            content = dic["content"].ToString()
            //                        };
            //                        int relt = DbHelperFactory.SingleInstance().ExecuteNonQuery<DraftMessageModel>("MessageSQL", "SaveDraftMessage", drfmodel);
            //                        if (relt < 0)
            //                        {
            //                            return ErrMsg("保存失败");
            //                        }
            //                    }
            //                }
            //                catch (Exception ex)
            //                {
            //#if DEBUG
            //                    Console.WriteLine(ex.InnerException);//待注释
            //#endif
            //                    return ErrMsg(ex.Message);
            //                }
            //            }
            //            smmodel = new SendMessageModel();
            //            smmodel.id = WanerDaoGuid.GetGuid();
            //            smmodel.user_id = Ppmodel.user_id;
            //            smmodel.send_username = Ppmodel.name;
            //            smmodel.content = dic["content"].ToString();
            //            smmodel.send_date = DateTime.Now;
            //            smmodel.is_msg = true;
            //            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<SendMessageModel>("MessageSQL", "SendMessage", smmodel);
            //            if (result > 0)
            //            {
            //                return SucMsg("发送成功");
            //            }
            //            else
            //            {
            //                return ErrMsg("发送失败");
            //            }
        }
        #endregion

        #region 圈子邀请
        /// <summary>
        /// 发送圈子邀请
        /// </summary>
        /// <param name="dic">string allFriends,string allGroups,string friend,string sendGroup,string recGroup(圈子id集合)</param>
        /// 分为邀请好友(friend)和圈子(sendGroup),加入选择的圈子也就是要发送的圈子(recGroup)
        /// 
        /// <returns></returns>
        public string SendGroupMessage(Dictionary<string, object> dic)
        {
            string allFriends = dic["allFriends"].ToString();
            string allGroups = dic["allGroups"].ToString();
            if (allFriends == "1")
            {
                dic["friend"] = GetFriends();
            }
            if (allGroups == "1")
            {
                dic["sendGroup"] = GetGroups();
            }
            return SendInvite(dic, 1);
        }

        //Atype   1为圈子 2为活动 

        private string SendInvite(Dictionary<string, object> dic, int Atype)
        {
            string[] firdArr = dic["friend"].ToString().Trim().Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            string[] sendGpArr = dic["sendGroup"].ToString().Trim().Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            string[] recGroup = dic["recGroup"].ToString().Trim().Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            // string id = WanerDaoGuid.GetGuid();
            DateTime nowTime = DateTime.Now;
            for (int i = 0; i < recGroup.Length; i++)
            {
                for (int j = 0; j < firdArr.Length; j++)
                {
                    //循环 朋友的邀请
                    string id = WanerDaoGuid.GetGuid();
                    sendInivmodel = new SendInviteMessageModel()
                    {
                        user_id = Ppmodel.user_id,
                        id = id,
                        is_delete = false,
                        send_id = firdArr[j].ToString(),
                        content = "3",  // 视content 为send_type (1圈子,  2活动， 3 个人，）
                        msg_id = recGroup[i].ToString(),
                        msg_type = Atype,
                        send_date = nowTime
                    };
                    DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<SendInviteMessageModel>("MessageSQL", "SendInvitFird", sendInivmodel);
                }
                //循环接收圈子→ 圈子的邀请
                for (int j = 0; j < sendGpArr.Length; j++)
                {
                    string id = WanerDaoGuid.GetGuid();
                    sendInivmodel = new SendInviteMessageModel()
                    {
                        user_id = Ppmodel.user_id,
                        id = id,
                        is_delete = false,
                        send_id = sendGpArr[j].ToString(),
                        content = "1",//视content 为send_type (1圈子,  2活动， 3 个人，）
                        msg_id = recGroup[i].ToString(),
                        msg_type = Atype,
                        send_date = nowTime
                    };
                    if (Atype == 1)
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<SendInviteMessageModel>("MessageSQL", "SendInvitGroup", sendInivmodel);
                    }
                    if (Atype == 2)
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<SendInviteMessageModel>("MessageSQL", "SendInvitActivity", sendInivmodel);
                    }
                }
            }
            return SucMsg("SaveInfoCn");
        }

        private string GetFriends()
        {
            string friendsJson = new WanerDaoBLL.Common.WanerdaoCommon().WanerDaoGetAllPersonFriends();
            if (WanerDaoJSON.ParseJson(friendsJson)["total"].ToString() == "0")
            {
                return string.Empty;
            }

            var arr = WanerDaoModule.Json.WanerDaoJSON.ParseJson(friendsJson)["rows"].Values("user_id").ToArray();
            string friend = string.Empty;
            for (int i = 0; i < arr.Length; i++)
            {
                friend += arr[i].ToString() + ",";
            }
            return friend = friend.TrimEnd(',');
        }
        private string GetGroups()
        {
            string groupsJson = new WanerDaoBLL.Common.WanerdaoCommon().WanerDaoSearchGroup();
            if (WanerDaoJSON.ParseJson(groupsJson)["total"].ToString() == "0")
            {
                return string.Empty;
            }

            var arr = WanerDaoModule.Json.WanerDaoJSON.ParseJson(groupsJson)["rows"].Values("id").ToArray();
            string gorups = string.Empty;
            for (int i = 0; i < arr.Length; i++)
            {
                gorups += arr[i].ToString() + ",";
            }
            return gorups = gorups.TrimEnd(',');
        }
        #endregion

        #region 活动邀请
        /// <summary>
        /// 发送活动邀请
        /// </summary>
        /// <param name="dic">string allFriends,string allGroups,string friend,string sendGroup,string recGroup(圈子id集合)</param>
        /// <returns></returns>
        public string SendActivityMessage(Dictionary<string, object> dic)
        {
            string allFriends = dic["allFriends"].ToString();
            string allGroups = dic["allGroups"].ToString();
            if (allFriends == "1")
            {
                dic["friend"] = GetFriends();
            }
            if (allGroups == "1")
            {
                dic["sendGroup"] = GetGroups();
            }
            return SendInvite(dic, 2);
        }

        public bool InviteActivityMessage(ActivityInvite invite)
        {
            return true;
        }

        #endregion

        #region 好友邀请
        /// <summary>
        /// 发送好友邀请
        /// </summary>
        /// <param name="dic">string personid(一个或者多个,用逗号分开)</param>
        /// <returns></returns>
        public string SendPersonalInvite(Dictionary<string, object> dic)
        {
            string[] arrPersons = dic["personid"].ToString().Trim().Split(new char[] { ',' });
            for (int i = 0; i < arrPersons.Length; i++)
            {
                Dictionary<string, object> dic2 = new Dictionary<string, object>();
                dic2.Add("user_id", Pspmodel.user_id);
                dic2.Add("personid", arrPersons[i].ToString());
                object o = DbHelperFactory.SingleInstance().GetScalar("MessageSQL", "CheckIsUsersFriend", dic2);
                if (int.Parse(o.ToString()) > 0)
                {
                    return ErrMsg("IsYourFriend");
                }
                string msgGuid = WanerDaoGuid.GetGuid();
                Dictionary<string, object> mydic = new Dictionary<string, object>();
                mydic.Add("id", msgGuid);
                mydic.Add("user_id", arrPersons[i].ToString());
                //mydic.Add("send_username", Ppmodel.name);
                mydic.Add("msg_type", 3);
                mydic.Add("send_date", DateTime.Now);
                mydic.Add("send_type_id", 1);
                mydic.Add("send_id", Ppmodel.user_id);
                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("MessageSQL", "SendPersonalInvite", mydic);
                if (result < 0)
                {
                    return ErrMsg("FailInfoCn");
                }
            }
            return SucMsg("SendSuccess");
        }
        /// <summary>
        /// 同意好友邀请
        /// </summary>
        /// <param name="dic">string id(邀请那条信息的id),string class_id(好友分组id)</param>
        /// <returns></returns>
        public string AssentFriendInvite(Dictionary<string, object> dic)
        {
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("id", dic["id"].ToString());
            mydic.Add("user_id", Pspmodel.user_id);
            mydic.Add("class_id", dic["class_id"].ToString());

            object pId = DbHelperFactory.SingleInstance().GetScalar("MessageSQL", "SelectFromIdOfInboxinvite",
                new Dictionary<string, object>() { { "id", dic["id"].ToString() } });
            Dictionary<string, object> dic2 = new Dictionary<string, object>();
            dic2.Add("user_id", Pspmodel.user_id);
            dic2.Add("personid", pId.ToString());
            object o = DbHelperFactory.SingleInstance().GetScalar("MessageSQL", "CheckIsUsersFriend", dic2);
            if (int.Parse(o.ToString()) > 0)
            {
                return SucMsg("IsYourFriend");
            }

            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("MessageSQL", "AssentFriendInvite", mydic);
            if (result > 0)
            {
                //添加经验积分
                WanerDaoComponent.WanerDaoExperience.addfriendAdd(Pspmodel.user_id);
                return SucMsg("AddInfoCn");
            }
            else
            {
                return ErrMsg("FailInfoCn");
            }
        }
        #endregion

        #region 信息收件箱
        /// <summary>
        ///  获取收件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        public string GetMessageList(Dictionary<string, object> dic)
        {
            string result = string.Empty;
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", "inboxmessage join PersonalProfile on PersonalProfile.user_id=inboxmessage.user_id");
            mydic.Add("fldName", "logo_small_path,id,is_read,is_mark,GetUserNameById(from_id) as from_username,SUBSTR(content FROM 1 FOR 12) as content,min(receive_date) as receive_date");
            mydic.Add("where", string.Format(" and inboxmessage.user_id='{0}' and is_msg=1 {1} and  is_delete=0 and inboxmessage.active=1 group by reply_id ", Ppmodel.user_id, ReturnOptionsName(dic["optionid"].ToString())));
            mydic.Add("fldSortId", "receive_date");
            mydic.Add("sort", 0);
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            result = ICommon.WanerDaoPagination(mydic);
            return result;
        }

        /// <summary>
        /// 获取未读取消息个数
        /// </summary>
        /// <returns></returns>
        public string GetNotReadCount()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "user_id", Pspmodel.user_id } };
            var result = DbHelperFactory.SingleInstance().GetScalar("MessageSQL", "GetNotReadCount", dic);
            return int.Parse(result.ToString()) >= 0 ? SucMsg(result.ToString()) : ErrMsg("FailInfoCn");
        }

        /// <summary>
        /// 阅读消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个类似(2,3,4,5,6))</param>
        /// <returns></returns>
        public string ReadMessage(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "ReadMessage", "MarkSuccess", "MarkFailed");
        }

        /// <summary>
        /// 标记消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个类似(2,3,4,5,6))</param>
        /// <returns></returns>
        public string MarkMessage(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "MarkMessage", "MarkSuccess", "MarkFailed");
        }

        /// <summary>
        /// 删除消息
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开)</param>
        /// <returns></returns>
        public string DelMessage(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "DeleteMessage", "DeleteInfoCn", "DeleteFailInfoCn");
        }
        #endregion

        #region 邀请收件箱
        /// <summary>
        /// 获取邀请收件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string pagecurrent,string pageSize</param>
        ///  optionid: 全部(0),个人邀请(1),活动邀请(2),圈子邀请(3)       
        /// <returns>from_where: 1为发件箱  2为收件箱
        ///          msg_type: 1为圈子 2活动 3好友
        /// </returns>
        public string GetInviteList(Dictionary<string, object> dic)
        {
            //Dictionary<string, object> dic3 = new Dictionary<string, object>(){
            //    {"allFriends","1"},{"allGroups","1"},
            //    {"friend","563af18a102648abba48bbf1e7a7000d"},
            //    {"sendGroup","73e0af3b927c48baa0c44bc83064afbd"},{"recGroup","6012b7d506294feb994bc482289eb63d"}};
            //SendActivityMessage(dic3);

            //Dictionary<string, object> dic4 = new Dictionary<string, object>(){
            //    {"allFriends","1"},{"allGroups","1"},
            //    {"friend","563af18a102648abba48bbf1e7a7000d"},
            //    {"sendGroup","73e0af3b927c48baa0c44bc83064afbd"},{"recGroup","0b16841215f14696906053545fc1cb33"}};
            //SendGroupMessage(dic4);

            string config = WanerDaoModule.Config.WanerDaoFilterReader.GetFollow("PersonalGroupFollow");
            double dbcfig = Convert.ToDouble(config);

            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("user_id", Pspmodel.user_id);
            mydic.Add("optionid", int.Parse(dic["optionid"].ToString()));
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            mydic.Add("config", dbcfig);

            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("MessageSQL", "GetInviteList", mydic);
            string result = ICommon.WanerDaoPagination(ds);
            if (!string.IsNullOrEmpty(result))
            {
                return result;
            }
            else
            {
                return ErrMsg("ReadOfErrorInfo");
            }
        }

        //        /// <summary>
        //        /// 好友接受邀请------待完成,需要调用别人接口
        //        /// </summary>
        //        /// <param name="dic">string id(多个为集合用逗号分开),string class_id(好友分组id,可以不传)</param>
        //        /// <returns></returns>
        //        public string AcceptInvite(Dictionary<string, object> dic)
        //        {
        //            string id = dic["id"].ToString();
        //            string class_id = dic.ContainsKey("class_id") ? dic["class_id"].ToString() : null;
        //            try
        //            {
        //                Dictionary<string, object> mydic = new Dictionary<string, object>();
        //                mydic.Add("id", idArr[i]);
        //                object o = DbHelperFactory.SingleInstance().GetScalar("MessageSQL", "GetInviteType", dic);
        //                if (o != null || o != DBNull.Value)
        //                {  
        //                    int type = int.Parse(o.ToString());
        //                    Dictionary<string, object> Paramdic = new Dictionary<string, object>();
        //                    switch (type)
        //                    {
        //                        case 1://圈子 此处需要调用加入圈子接口
        //                            // Paramdic.Add("group_id");
        //                            // WanerDao2.WanerDaoIBLL.IRelation.IWanerDaoGroup IGroup = new WanerDaoBLL.Relation.WanerDaoGroup();
        //                            // IGroup.add_GroupDiscuss();
        //                            DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "", mydic);
        //                            break;
        //                        case 2://活动  此处需要调用加入活动接口
        //                            DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "", mydic);
        //                            break;
        //                        case 3://个人  此处需要调用加为好友接口
        //                            mydic.Add("class_id", class_id);
        //                            AssentFriendInvite(mydic);
        //                            // DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "", mydic);
        //                            break;
        //                        default: break;
        //                    }
        //                }
        //                //删除到垃圾箱
        //                DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "DeleteInvitMessage", mydic);


        //                return SucMsg("AcceptInviteSuccess");
        //            }
        //            catch (Exception ex)
        //            {
        //#if DEBUG
        //                Console.WriteLine(ex);
        //#endif
        //                return ErrMsg("AcceptInviteFailed");
        //            }
        //        }

        /// <summary>
        /// 忽略邀请
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开)</param>
        /// <returns></returns>
        public string NeglectInvite(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "DeleteInvitMessage", "SuccessInfoCn", "FailInfoCn");
        }
        #endregion

        #region 信息发件箱
        /// <summary>
        ///  获取发件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string pagecurrent,string pageSize</param>
        /// optionid:全部(0),标记(1),未标记(2)
        /// <returns></returns>
        public string GetSendMessageList(Dictionary<string, object> dic)
        {
            string result = string.Empty;
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", "sendmessage s join sendmessagereceiverlist sl on s.reply_id=sl.message_id join PersonalProfile p on p.user_id=sl.send_id");
            mydic.Add("fldName", "s.id,p.name,s.is_mark,SUBSTR(s.content FROM 1 FOR 20) as content,s.send_date");
            mydic.Add("where", string.Format(" and s.user_id='{0}' {1} and s.is_delete=0 and s.active=1 and sl.send_id!='{0}' ", Ppmodel.user_id, ReturnOptionsNameOfRubbish(dic["optionid"].ToString())));
            mydic.Add("fldSortId", "s.send_date");
            mydic.Add("sort", 0);
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            result = ICommon.WanerDaoPagination(mydic);
            return result;
        }

        /// <summary>
        /// 标记消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        public string MarkSendMessage(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "MarkSendMessage", "MarkSuccess", "MarkFailed");
        }

        /// <summary>
        /// 删除消息
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开)</param>
        /// <returns></returns>
        public string DelSendMessage(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "DelSendMessage", "DeleteInfoCn", "DeleteFailInfoCn");
        }
        #endregion

        #region 邀请发件箱
        /// <summary>
        /// 获取邀请发件箱列表
        /// </summary>
        /// <param name="dic">string optionid,string pagecurrent,string pageSize</param>
        ///  optionid: 全部(0),个人邀请(1),活动邀请(2),圈子邀请(3)       
        /// <returns>from_where: 1为发件箱  2为收件箱
        ///          msg_type: 1为圈子 2活动 3好友
        /// </returns>
        public string GetSendInviteList(Dictionary<string, object> dic)
        {
            string config = WanerDaoModule.Config.WanerDaoFilterReader.GetFollow("PersonalGroupFollow");
            double dbcfig = Convert.ToDouble(config);

            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("user_id", Pspmodel.user_id);
            mydic.Add("optionid", int.Parse(dic["optionid"].ToString()));
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            mydic.Add("config", dbcfig);

            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("MessageSQL", "GetSendInviteList", mydic);
            string result = ICommon.WanerDaoPagination(ds);
            if (!string.IsNullOrEmpty(result))
            {
                return result;
            }
            else
            {
                return ErrMsg("ReadOfErrorInfo");
            }
        }

        /// <summary>
        /// 重新发送
        /// </summary>
        /// <param name="dic">string json(messageid,type)(多个为集合用逗号分开),</param>
        /// <returns></returns>   type:1 圈子  2活动  3好友
        public string SendInviteAgain(Dictionary<string, object> dic)
        {
            string json = dic["json"].ToString();
            try
            {
                List<Dictionary<string, object>> mydicList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(json);
                foreach (Dictionary<string, object> mydic in mydicList)
                {
                    if (mydic["type"].ToString() == "3")
                    {
                        mydic["type"] = "0";
                    }
                    DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("MessageSQL", "GetMsgIdAndSendidByMessageid", mydic);
                    if (ds == null || ds.Tables.Count == 0)
                    {
                        return ErrMsg("SendFailed");
                    }
                    string o = ds.Tables[0].Rows[0][0].ToString();//messageid  发送的圈子或活动id
                    string o2 = ds.Tables[0].Rows[0][1].ToString();//receiveid 接收的圈子或活动id
                    if (mydic["type"].ToString() == "1")//圈子
                    {
                        mydic.Clear(); mydic.Add("friend", "");
                        mydic.Add("sendGroup", o.ToString());
                        mydic.Add("recGroup", o2.ToString());
                        SendGroupMessage(mydic);
                    }
                    else if (mydic["type"].ToString() == "2")//活动
                    {
                        mydic.Clear(); mydic.Add("friend", "");
                        mydic.Add("sendGroup", o.ToString());
                        mydic.Add("recGroup", o2.ToString());
                        SendActivityMessage(mydic);
                    }
                    else//好友
                    {
                        mydic.Clear(); mydic.Add("personid", o.ToString());
                        SendPersonalInvite(mydic);
                    }
                }
                return SucMsg("SendSuccess");
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine(ex);
#endif
                return SucMsg("SendFailed");
            }
        }

        /// <summary>
        /// 删除邀请
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开)</param>
        /// <returns></returns>
        public string DelSendInvite(Dictionary<string, object> dic)
        {

            return ExcuteFor(dic, "DelSendInvite", "DeleteInfoCn", "DeleteFailInfoCn");
        }

        #endregion

        #region 垃圾箱页面
        #region 消息
        /// <summary>
        /// 信息垃圾箱页面-获取列表
        /// </summary>
        /// <param name="dic"> string optionid,string pagecurrent,string pageSize</param>
        /// 全部(0),标记(1),未标记(2),来自发件箱(3),来自已读收件箱(4),来自未读收件箱(5),来自草稿箱(6)
        /// 返回字段 from_where:  1收件箱 2发件箱 3草稿箱
        /// mailstate: 已读收件箱(1),未读收件箱(0) ,草稿箱(3),发件箱(4)
        /// <returns></returns> 
        public string GetRubbishMessage(Dictionary<string, object> dic)
        {
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("id", int.Parse(dic["optionid"].ToString()));
            mydic.Add("user_id", Ppmodel.user_id);
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("MessageSQL", "GetRubbishMessage", mydic);
            string result = ICommon.WanerDaoPagination(ds);
            return result;
        }

        /// <summary>
        /// 标记垃圾消息
        /// </summary>
        /// <param name="dic">string json(messageid,type)   ( [{"messageid":"fdgdf",type:"1"},{"messageid":"fghfh",type:"2"}])</param>
        ///   type 为 from_where  的值   1收件箱 2发件箱 3草稿箱
        /// <returns></returns>
        public string MarkRubbishMessage(Dictionary<string, object> dic)
        {
            // return ExcuteFor(dic, "MarkRubbishMessage", "标记成功", "标记失败");
            string json = dic["json"].ToString();
            try
            {
                List<Dictionary<string, object>> mydicList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(json);
                foreach (Dictionary<string, object> mydic in mydicList)
                {
                    if (mydic["type"].ToString() == "1")//收件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "MarkRubbishMessageOfInbox", mydic);
                    }
                    else if (mydic["type"].ToString() == "2")//发件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "MarkRubbishMessageOfSend", mydic);
                    }
                    else//草稿箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "MarkRubbishMessageOfDraft", mydic);
                    }
                }
                return SucMsg("MarkSuccess");
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine(ex);
#endif
                return SucMsg("MarkFailed");
            }
        }

        /// <summary>
        /// 还原消息
        /// </summary>
        /// <param name="dic">string json(messageid,type)   ( [{"messageid":"fdgdf",type:"1"},{"messageid":"fghfh",type:"2"}])</param>
        ///   type 为 from_where  的值   1收件箱 2发件箱 3草稿箱
        /// <returns></returns>
        public string RevertRubbishMessage(Dictionary<string, object> dic)
        {
            string json = dic["json"].ToString();
            try
            {
                List<Dictionary<string, object>> mydicList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(json);
                foreach (Dictionary<string, object> mydic in mydicList)
                {
                    if (mydic["type"].ToString() == "1")//收件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "RevertRubbishMessageOfInbox", mydic);
                    }
                    else if (mydic["type"].ToString() == "2")//发件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "RevertRubbishMessageOfSend", mydic);
                    }
                    else//草稿箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "RevertRubbishMessageOfDraft", mydic);
                    }
                }
                return SucMsg("SuccessInfoCn");
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine(ex);
#endif
                return SucMsg("FailInfoCn");
            }
        }

        /// <summary>
        /// 彻底删除消息
        /// </summary>
        /// <param name="dic">string json(messageid,type)   ( [{"messageid":"fdgdf",type:"1"},{"messageid":"fghfh",type:"2"}])</param>
        ///   type 为 from_where  的值   1发件箱 2收件箱 3草稿箱
        /// <returns></returns>
        public string QuiteDeleteRubbishMessage(Dictionary<string, object> dic)
        {
            string json = dic["json"].ToString();
            try
            {
                List<Dictionary<string, object>> mydicList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(json);
                foreach (Dictionary<string, object> mydic in mydicList)
                {
                    if (mydic["type"].ToString() == "1")//收件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "DeleteRubbishMessageOfInbox", mydic);
                    }
                    else if (mydic["type"].ToString() == "2")//发件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "DeleteRubbishMessageOfSend", mydic);
                    }
                    else//草稿箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "DeleteRubbishMessageOfDraft", mydic);
                    }
                }
                return SucMsg("SuccessInfoCn");
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine(ex);
#endif
                return SucMsg("FailInfoCn");
            }
        }

        /// <summary>
        /// 清空垃圾箱消息
        /// </summary>
        /// <returns></returns>
        public string ClearRubbishMessage()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", Ppmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("MessageSQL", "ClearRubbishMessage", dic);
            if (result > 0)
            {
                return SucMsg("SuccessInfoCn");
            }
            else
            {
                return ErrMsg("FailInfoCn");
            }
        }
        #endregion

        #region 邀请
        /// <summary>
        /// 获取邀请垃圾箱列表
        /// </summary>
        /// <param name="dic">string optionid,string pagecurrent,string pageSize</param>
        /// optionid: 全部(0),个人邀请(1),活动邀请(2),圈子邀请(3)        /// 
        /// <returns>from_where: 1为发件箱  2为收件箱
        ///          msg_type: 1为圈子 2活动 3好友
        /// </returns>
        public string GetRubbishInvite(Dictionary<string, object> dic)
        {
            string config = WanerDaoModule.Config.WanerDaoFilterReader.GetFollow("PersonalGroupFollow");
            double dbcfig = Convert.ToDouble(config);

            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("user_id", Pspmodel.user_id);
            mydic.Add("optionid", int.Parse(dic["optionid"].ToString()));
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            mydic.Add("config", dbcfig);

            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("MessageSQL", "GetRubbishInvite", mydic);
            string result = ICommon.WanerDaoPagination(ds);
            if (!string.IsNullOrEmpty(result))
            {
                return result;
            }
            else
            {
                return ErrMsg("ReadOfErrorInfo");
            }
        }

        /// <summary>
        /// 还原邀请信息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>json:messageid type(1发件箱  2收件箱 )
        public string RevertRubbishInvite(Dictionary<string, object> dic)
        {
            string json = dic["json"].ToString();
            try
            {
                List<Dictionary<string, object>> mydicList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(json);
                foreach (Dictionary<string, object> mydic in mydicList)
                {
                    if (mydic["type"].ToString() == "1")//发件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "RevertRubbishInviteOfSend", mydic);
                    }
                    else//收件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "RevertRubbishInviteOfInbox", mydic);
                    }
                }
                return SucMsg("SuccessInfoCn");
            }
            catch (Exception ex)
            {
#if DEBUG
                Console.WriteLine(ex);
#endif
                return SucMsg("FailInfoCn");
            }
        }

        /// <summary>
        /// 清空垃圾箱邀请
        /// </summary>
        /// <returns></returns>
        public string ClearRubbishInvite()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", Ppmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("MessageSQL", "ClearRubbishInvite", dic);
            if (result > 0)
            {
                return SucMsg("SuccessInfoCn");
            }
            else
            {
                return ErrMsg("FailInfoCn");
            }
        }

        /// <summary>
        /// 彻底删除邀请
        /// </summary>
        /// <param name="dic">string json(messageid,type(id的集合一个或多个))</param>
        /// <returns></returns>
        public string QuiteDeleteRubbishInvite(Dictionary<string, object> dic)
        {
            string json = dic["json"].ToString();
            try
            {
                List<Dictionary<string, object>> mydicList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(json);
                foreach (Dictionary<string, object> mydic in mydicList)
                {
                    if (mydic["type"].ToString() == "1")//发件箱
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "QuiteDeleteRubbishInviteOfSend", mydic);
                    }
                    else//收件箱 
                    {
                        DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", "QuiteDeleteRubbishInviteOfInbox", mydic);
                    }
                }
                return SucMsg("DeleteInfoCn");
            }
            catch (Exception ex)
            {
                return SucMsg("DeleteFailInfoCn");
            }
        }
        #endregion
        #endregion

        #region 草稿箱
        /// <summary>
        /// 读取系统草稿
        /// </summary>
        /// <returns></returns>
        public string GetSystemDrafeMessage()
        {
            string json = string.Empty;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", Pspmodel.user_id);
            string result = DbHelperFactory.SingleInstance().GetDataTable("MessageSQL", "GetSystemDrafeMessage", dic);
            if (!string.IsNullOrEmpty(result))
            {
                json = result;
            }
            else
            {
                json = ErrMsg("NoSysDrafeMsg");
            }
            return json;

        }
        /// <summary>
        /// 获取消息草稿箱列表
        /// </summary>
        /// <param name="dic">string optionid,string pagecurrent,string pageSize</param>
        /// optionid: 全部(0) 标记(1),未标记(2)
        /// <returns></returns>
        public string GetDraftMessageList(Dictionary<string, object> dic)
        {
            string result = string.Empty;
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", "DraftMessage");
            mydic.Add("fldName", "id,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,draft_date");
            mydic.Add("where", string.Format(" and user_id='{0}' and is_msg=1 {1} and is_delete=0 and active=1 and (is_system=0 or is_system is null)", Ppmodel.user_id, ReturnOptionsNameOfRubbish(dic["optionid"].ToString())));
            mydic.Add("fldSortId", "draft_date");
            mydic.Add("sort", 0);
            mydic.Add("pagecurrent", dic["pagecurrent"].ToString());
            mydic.Add("pageSize", dic["pageSize"].ToString());
            result = ICommon.WanerDaoPagination(mydic);
            return result;
        }

        /// <summary>
        /// 标记草稿消息
        /// </summary>
        /// <param name="dic">string messageid(id的集合一个或多个)</param>
        /// <returns></returns>
        public string MarkDraftMessage(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "MarkDraftMessage", "MarkSuccess", "MarkFailed");
        }

        /// <summary>
        /// 删除消息
        /// </summary>
        /// <param name="dic">string messageid(多个为集合用逗号分开)</param>
        /// <returns></returns>
        public string DelDraftMessage(Dictionary<string, object> dic)
        {
            return ExcuteFor(dic, "DelDraftMessage", "DeleteInfoCn", "DeleteFailInfoCn");
        }
        #endregion

        #region 详细浏览页
        /// <summary>
        /// 获取消息列表
        /// </summary>
        /// <param name="dic">string id,string from_where</param>
        /// from_where: 1收件箱  2发件箱  3草稿箱
        /// <returns></returns>
        public string GetDetailedMessageList(Dictionary<string, object> dic)
        {
            string from_where = dic["from_where"].ToString();
            dic.Add("user_id", Pspmodel.user_id);
            dic.Remove("from_where");
            if (from_where == "1")//收件箱
            {
                return DbHelperFactory.SingleInstance().GetDataTable("MessageSQL", "GetDetailedMessageList", dic);
            }
            else if (from_where == "2")//发件箱
            {
                return DbHelperFactory.SingleInstance().GetDataTable("MessageSQL", "GetDetailedMessageListOfSend", dic);
            }
            else//草稿箱
            {
                return DbHelperFactory.SingleInstance().GetDataTable("MessageSQL", "GetDetailedMessageListOfDraf", dic);
            }
        }

        /// <summary>
        /// 获取消息内容
        /// </summary>
        /// <param name="dic">string id,string from_where </param>
        /// from_where: 1收件箱  2发件箱  3草稿箱
        /// <returns></returns>
        public string GetDetailedMessage(Dictionary<string, object> dic)
        {
            int from_where = int.Parse(dic["from_where"].ToString());
            dic.Remove("from_where");
            dic.Add("from_where", from_where);
            return DbHelperFactory.SingleInstance().GetDataTable("MessageSQL", "GetDetailedMessage", dic);
        }

        /// <summary>
        /// 加载邮件详细信息
        /// </summary>
        /// <param name="dic">string id</param>
        /// <returns></returns>
        public string LoadingMessageDetail(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("MessageSQL", "LoadingMessageDetail", dic);
        }

        /// <summary>
        /// 收件箱回复
        /// </summary>
        /// <param name="dic">string from_where,string parentid,string receivePersonid,string receiveCoutent</param>
        /// from_where:  1收件箱  2发件箱
        /// 如果该条消息没有父消息 ， 则parentid设置为空
        /// <returns></returns>
        public string ReplyMessage(Dictionary<string, object> dic)
        {

            string parentid = dic["parentid"].ToString();

            Dictionary<string, object> persondic = new Dictionary<string, object>();
            persondic.Add("parentid", parentid);
            string receivePersonid = dic["receivePersonid"].ToString();
            string receiveCoutent = dic["receiveCoutent"].ToString();
            string guid = WanerDaoGuid.GetGuid();
            object o = DbHelperFactory.SingleInstance().GetScalar("MessageSQL", "IsExistsOfRecords", persondic);
            if (o != null)
            {
                parentid = o.ToString();
            }
            //string receivePerson,string content,string isSava(0或1)
            Dictionary<string, object> dics = new Dictionary<string, object>();
            dics.Add("receivePerson", receivePersonid);
            dics.Add("content", receiveCoutent);
            dics.Add("parentid", parentid);
            dics.Add("isSava", "0");
            return SendMessage(dics);

            //DateTime nowTime = DateTime.Now;
            //Dictionary<string, object> mydic = null;

            //mydic = new Dictionary<string, object>() { 
            //         {"id",guid},  {"user_id",Pspmodel.user_id},{"send_email",Pspmodel.security_email},
            //         {"reply_id",parentid},{"is_delete","0"},{"is_mark","0"},
            //         {"content",receiveCoutent},{"receive_date",nowTime},{"is_msg","1"}};

            //int result = -1;

            //if (dic["from_where"].ToString() != "1")
            //{
            //    result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("MessageSQL", "ReplySendMessage", mydic);
            //}
            //else
            //{
            //    result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("MessageSQL", "ReplyInboxMessage", mydic);
            //}
            //if (result > 0)
            //{
            //    return SucMsg("SendSuccess");
            //}
            //else
            //{
            //    return ErrMsg("SendFailed");
            //}
        }
        #endregion

        #region 共有成员
        /// <summary>
        /// 联想输入 查询好友
        /// </summary>
        /// <param name="name">string fname</param>
        /// <returns></returns>
        public string GetPersonalFriendsByName(Dictionary<string, object> dic)
        {
            dic.Add("user_id", Ppmodel.user_id);
            return ICommon.WanerDaoGetPersonalFriendsByName(dic);
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
        /// <summary>
        /// 根据选项id读取要查询编号的条件  消息
        /// </summary>
        /// <param name="optionid">全部(0),已读(1),未读(2),标记(3),为标记(4)</param>
        /// <returns></returns>
        private string ReturnOptionsName(string optionid)
        {
            string resultString = string.Empty;

            switch (optionid)
            {
                case "0":
                    resultString = "";
                    break;
                case "1":
                    resultString = " and is_read=1";
                    break;
                case "2":
                    resultString = " and (is_read=0 or is_read is null)";
                    break;
                case "3":
                    resultString = " and is_mark=1";
                    break;
                case "4":
                    resultString = " and (is_mark=0 or is_mark is null)";
                    break;
                default:
                    resultString = " and active=1";
                    break;
            }
            return resultString;
        }

        /// <summary>
        /// 根据选项id读取要查询编号的条件  邀请
        /// </summary>
        /// <param name="optionid">全部(0),个人邀请(1),活动邀请(2),圈子邀请(3)</param>
        /// <returns></returns>
        private string ReturnOptionsNameOfInvit(string optionid)
        {
            string resultString = string.Empty;

            switch (optionid)
            {
                case "0":
                    resultString = "";
                    break;
                case "1":
                    resultString = " and msg_type=3";
                    break;
                case "2":
                    resultString = " and msg_type=2";
                    break;
                case "3":
                    resultString = " and msg_type=1";
                    break;
                default:
                    resultString = " and active=1";
                    break;
            }
            return resultString;
        }

        /// <summary>
        /// 垃圾箱-- 根据选项id读取要查询编号的条件 
        /// </summary>
        /// <param name="optionid">全部(0),标记(1),未标记(2),来自发件箱(3),来自已读收件箱(4),来自未读收件箱(5),来自草稿箱(6)</param>
        /// <returns></returns>
        private string ReturnOptionsNameOfRubbish(string optionid)
        {
            string resultString = string.Empty;
            switch (optionid)
            {
                case "0":
                    resultString = "";
                    break;
                case "1":
                    resultString = " and is_mark=1";
                    break;
                case "2":
                    resultString = " and (is_mark=0 or is_mark is null)";
                    break;
                case "3":
                    resultString = " and msg_type=1";
                    break;
                case "4":
                    resultString = " and msg_type=1";
                    break;
                case "5":
                    resultString = " and msg_type=1";
                    break;
                case "6":
                    resultString = " and msg_type=1";
                    break;
                default:
                    resultString = " and active=1";
                    break;
            }
            return resultString;
        }

        /// <summary>
        /// 执行关于messageid的循环操作
        /// </summary>
        /// <param name="inSQL">MessageSQL-SQL文件的id</param>
        /// <param name="sucMsg">成功的消息</param>
        /// <param name="errMsg">失败的消息</param>
        private string ExcuteFor(Dictionary<string, object> dic, string inSQL, string sucMsg, string errMsg)
        {
            try
            {
                string[] strarr = dic["messageid"].ToString().Split(',');
                for (int i = 0; i < strarr.Length; i++)
                {
                    Dictionary<string, object> mydic = new Dictionary<string, object>();
                    mydic.Add("messageid", strarr[i].ToString());
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("MessageSQL", inSQL, mydic);
                } return SucMsg(sucMsg);
            }
            catch (Exception)
            {
                return ErrMsg(errMsg);
            }
        }

        #endregion

    }
}