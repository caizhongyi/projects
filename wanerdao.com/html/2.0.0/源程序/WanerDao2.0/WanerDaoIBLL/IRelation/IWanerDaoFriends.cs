using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Relation;
using System.Data;

namespace WanerDao2.WanerDaoIBLL.IRelation
{
    /// <summary>
    /// 描述:好友类接口
    /// 描述：xux
    /// 时间：2011-11-20
    /// </summary>
    public interface IWanerDaoFriends
    {
        /// <summary>
        /// 查询用户的全部好友分组
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        IList<FriendsModel> InitData_Class(Dictionary<string, object> dic);

        /// <summary>
        /// 查询用户的全部好友
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        DataTable SelectAllfriends(Dictionary<string, object> dic);

        /// <summary>
        /// 查询用户某个分组的好友
        /// </summary>
        /// <param name="dic">user_id，class_id</param>
        /// <returns></returns>
        String Selectfriend_Class(Dictionary<string, object> dic);


        /// <summary>
        /// 查询用户的全部好友分组
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        String InitData_ClassStr(Dictionary<string, object> dic);

        /// <summary>
        /// 创建分组
        /// </summary>
        /// <param name="dic">用户ID;分组名</param>
        /// <returns></returns>
        int CreateFriendGroup(Dictionary<string, object> dic);

        /// <summary>
        /// 修改分组
        /// </summary>
        /// <param name="dic">主键ID;新分组号</param>
        /// <returns></returns>
        int UpdateFriendsGounp(Dictionary<string, object> dic);

        /// <summary>
        /// 修改分组名
        /// </summary>
        /// <param name="dic">主键ID;新分组号</param>
        /// <returns></returns>
        int UpdateFriendsGounpName(Dictionary<string, object> dic);

        /// <summary>
        /// 删除好友分组
        /// </summary>
        /// <param name="dic">主键ID</param>
        /// <returns></returns>
        int Delete_relationship_class(Dictionary<string, object> dic);

        /// <summary>
        /// 删除好友
        /// </summary>
        /// <param name="dic">主键ID</param>
        /// <returns></returns>
        int Delete_relationship_myfriends(Dictionary<string, object> dic);

        /// <summary>
        /// 批量删除好友
        /// </summary>
        /// <param name="dic">主键ID</param>
        /// <returns></returns>
        int Delete_Allrelationship_myfriends(Dictionary<string, object> dic);
        /// <summary>
        /// 好友申请
        /// </summary>
        /// <param name="user_id">申请发起人</param>
        /// <param name="user_name">申请名字</param>
        /// <param name="user_address">申请发送人地址</param>
        /// <param name="bodylist">邀请对象</param>
        /// <param name="content">邀请信息</param>
        /// <param name="msgtype">邀请类型，1圈子，2活动，3好友</param>
        /// <param name="msgid">邀请目标ID</param>
        /// <returns></returns>
        int send_invite(Dictionary<string, object> dic);

        /// <summary>
        /// 我的好友搜索
        /// </summary>
        /// <param name="dic">string user_id,string titOrContent,string class_id,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        string SearchOfIndex(Dictionary<string, object> dic);

    }
}
