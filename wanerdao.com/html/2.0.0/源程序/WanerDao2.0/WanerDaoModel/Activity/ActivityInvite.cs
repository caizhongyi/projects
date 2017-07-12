using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModel.Activity
{
    /// <summary>
    /// 活动邀请（2012-11-16 徐蓓添加）
    /// </summary>
    public class ActivityInvite
    {
        public string InviteUrl { get; set; }//所邀请活动的url
        public string FromUserId { get; set; }//发送人编号
        public string[] ToFriend { get; set; }//被发送好友编号
        public string[] ToGroup { get; set; }//被发送圈子编号
        public SendRange Range { get; set; }//发送范围
        public InviteType Type { get; set; }//发送类型

        public ActivityInvite()
        {
            this.InviteUrl = string.Empty;
            this.FromUserId = string.Empty;
            this.ToFriend = null;
            this.ToGroup = null;
            this.Range = SendRange.All;
            this.Type = InviteType.Friend;
        }


    }

    public enum InviteType
    {
        Friend = 1,
        Group = 2
    }

    public enum SendRange
    {
        All = 1,
        Part = 2
    }
}
