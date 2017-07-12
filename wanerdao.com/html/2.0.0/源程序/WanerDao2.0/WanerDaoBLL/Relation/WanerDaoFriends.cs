using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IRelation;
using WanerDao2.WanerDaoModel.Relation;
using WanerDao2.WanerDaoDALFactory;
using System.Data;
using WanerDao2.WanerDaoIBLL.ICommon;
using WanerDao2.WanerDaoModule.String;

namespace WanerDao2.WanerDaoBLL.Relation
{
    /// <summary>
    /// 描述:好友类接口实现
    /// 描述：xux
    /// 时间：2011-11-20
    /// </summary>
    public class WanerDaoFriends: IWanerDaoFriends
    {

        IWanerDaoCommon Icommon = new WanerDaoBLL.Common.WanerdaoCommon();
        /// <summary>
        /// 查询用户的全部好友分组
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        public IList<FriendsModel> InitData_Class(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetGenericModel<FriendsModel>("FriendsSQL", "SelectInitData_Class", dic);
        }

        /// <summary>
        /// 查询用户某个分组的好友
        /// </summary>
        /// <param name="dic">user_id，class_id</param>
        /// <returns></returns>
        public String Selectfriend_Class(Dictionary<string, object> dic) {
            return DbHelperFactory.SingleInstance().GetDataTable("FriendsSQL", "Selectfriend_Class", dic);
        }


        /// <summary>
        /// 查询用户的全部好友
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        public DataTable SelectAllfriends(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("FriendsSQL", "SelectAllfriends", dic);
        }

        /// <summary>
        /// 查询用户的全部好友分组
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        public String InitData_ClassStr(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().GetDataTable("FriendsSQL", "SelectInitData_Class", dic);
        }

        /// <summary>
        /// 创建分组
        /// </summary>
        /// <param name="dic">用户ID;分组名</param>
        /// <returns></returns>
        public int CreateFriendGroup(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("FriendsSQL", "CreateFriendGroup", dic);
        }

        /// <summary>
        /// 修改分组名
        /// </summary>
        /// <param name="dic">主键ID;新分组号</param>
        /// <returns></returns>
        public int UpdateFriendsGounpName(Dictionary<string, object> dic) {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("FriendsSQL", "UpdateFriendsGounpName", dic);
        }

        /// <summary>
        /// 修改分组
        /// </summary>
        /// <param name="dic">主键ID;新分组号</param>
        /// <returns></returns>
        public int UpdateFriendsGounp(Dictionary<string, object> dic)
        {
            try
            {
                string[] ids = WanerDaoString.SplitString(dic["friend_id"].ToString(), ",");
                Dictionary<string, object> dicSQL = new Dictionary<string, object>();
                dicSQL.Add("user_id", dic["user_id"].ToString());
                dicSQL.Add("friend_id", "");
                dicSQL.Add("class_id", dic["class_id"].ToString());
                foreach (string id in ids)
                {
                    dicSQL["friend_id"] = id;
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("FriendsSQL", "UpdateFriendsGounp", dicSQL);
                }
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }

           
        }

        /// <summary>
        /// 删除好友分组
        /// </summary>
        /// <param name="dic">主键ID</param>
        /// <returns></returns>
        public int Delete_relationship_class(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("FriendsSQL", "Delete_myclass", dic);
        }


        /// <summary>
        /// 删除好友
        /// </summary>
        /// <param name="dic">主键ID</param>
        /// <returns></returns>
        public int Delete_relationship_myfriends(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("FriendsSQL", "Delete_myfriend", dic);
        }

        /// <summary>
        /// 批量删除好友
        /// </summary>
        /// <param name="dic">主键ID</param>
        /// <returns></returns>
        public int Delete_Allrelationship_myfriends(Dictionary<string, object> dic)
        {
            try
            {
                string[] ids = WanerDaoString.SplitString(dic["friend_id"].ToString(), ",");
                Dictionary<string, object> dicSQL = new Dictionary<string, object>();
                dicSQL.Add("user_id", dic["user_id"].ToString());
                dicSQL.Add("friend_id", "");
                foreach (string id in ids)
                {
                    dicSQL["friend_id"] = id;
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("FriendsSQL", "Delete_myfriend", dicSQL);
                }
                return 1;
            }catch( Exception){
                return 0;
            }
        }

        /// <summary>
        /// 好友申请
        /// </summary>
        /// <param name="user_id">申请发起人</param>
        /// <param name="user_name">申请名字</param>
        /// <param name="user_address">申请发送人地址</param>
        /// <param name="bodycount">邀请数量</param>
        /// <param name="bodylist">邀请对象</param>
        /// <param name="content">邀请信息</param>
        /// <param name="msgtype">邀请类型，1圈子，2活动，3好友</param>
        /// <param name="msgid">邀请目标ID</param>
        /// <returns></returns>
        public int send_invite(Dictionary<string, object> dic)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQuery("FriendsSQL", "Invite_myfriend", dic);
        }

        /// <summary>
        /// 我的好友搜索
        /// </summary>
        /// <param name="dic">string user_id,string titOrContent,string class_id,string pagecurrent,string pageSize</param>
        /// <returns></returns>
        public string SearchOfIndex(Dictionary<string, object> dic)
        {
            // IWanerDaoPermission IPermission = new WanerDaoPermission();
            string json = string.Empty;
            string user_id = dic["user_id"].ToString();
            string titOrContent = dic["titOrContent"].ToString();
            string class_id = dic["class_id"].ToString();
            string whereSplice = " and T1.active =1 and T1.relation_from_id = '" + user_id + "'";

                if (titOrContent != string.Empty)
                {
                    whereSplice += " and ( T1.name like '%" + titOrContent + "%')";
                }
                if (class_id != string.Empty)
                {
                    whereSplice += " and T1.class_id ='" + class_id + "'";
                }

             DataSet ds = GetAllFriends(dic["pagecurrent"].ToString(), dic["pageSize"].ToString(), whereSplice);

           json = Icommon.WanerDaoPagination(ds);
            
            return json;
        }



        /// <summary>
        /// 查询所有好友 分页
        /// </summary>
        /// <param name="pagecurrent">当前页</param>
        /// <param name="pageSize">页大小</param>
        /// <returns></returns>
        public  DataSet GetAllFriends(string pagecurrent, string pageSize, string where)
        {
            Dictionary<string, object> mydic = new Dictionary<string, object>();
            mydic.Add("tablename", " PersonalProfile T0 inner join personalfriends T1 on T0.user_id = T1.relation_to_id  inner join FriendsClass T2 on T1.class_id = T2.class_id left join PersonalFriendsFollow T3 on T3.attention_id = T0.user_id and T3.user_id = '1' and T3.active = 1 ");
            mydic.Add("fldName", " T0.user_id,T0.name,T0.logo_small_path,T1.class_id,T2.relation_name,ifnull(T3.attention_id,'N') as attention_id ");
            mydic.Add("where", string.Format(" {0} ", where));
            mydic.Add("fldSortId", " T0.name ");
            mydic.Add("sort", 0);
            mydic.Add("pagecurrent", pagecurrent);
            mydic.Add("pageSize", pageSize);
            DataSet ds = Icommon.WanerDaoPaginationDataSet(mydic);
            return ds;
        }
    }
}
