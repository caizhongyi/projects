using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoIBLL.IRelation;
using WanerDao2.WanerDaoModel.Relation;
using WanerDao2.WanerDaoDALFactory;
using System.Data;
using System.Web;
using WanerDao2.WanerDaoModule.WanerDaoImage;
using WanerDao2.WanerDaoBLL.Common;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using WanerDao2.WanerDaoModule.Config;
using System.IO;
using System.Data.Common;
using WanerDao2.WanerDaoIBLL.IMessage;
using WanerDao2.WanerDaoEmailQueue;

namespace WanerDao2.WanerDaoBLL.Relation
{

    /// <summary>
    /// 描述:圈子类接口实现
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
   public class WanerDaoGroup : IWanerDaoGroup 
    {

        /// <summary>
        /// 查询超级管理员或者执行管理员的全部圈子
        /// </summary>
        /// <param name="user_id">用户ID</param>
        /// <returns></returns>
       public DataTable SelectAllGroupForActivity(string user_id) {
           Dictionary<string, object> _dic = new Dictionary<string, object>();
           _dic.Add("user_id", user_id);
           return DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "SelectAllGroupForActivity", _dic);
       }


       /// <summary>
       /// 删除圈子发帖
       /// </summary>
       /// <param name="dic">ID</param>
       /// <returns></returns>
       public int Del_GroupDiscuss(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "del_GroupDiscuss", dic);
       }


       /// <summary>
       /// 删除圈子发帖回复
       /// </summary>
       /// <param name="dic">ID</param>
       /// <returns></returns>
       public int Del_GroupReply(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "del_GroupReply", dic);
       }


       /// <summary>
       /// 圈子发帖回复
       /// </summary>
       /// <param name="dic">group_id：圈子ID，post_id：发表人ID，subject:主题，content：内容</param>
       /// <returns></returns>
       public int add_GroupReply(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "add_GroupReply", dic);
       }

       /// <summary>
       /// 判断圈子是否存在
       /// </summary>
       /// <param name="dic">圈子ID</param>
       /// <returns></returns>
       public string ifexistgroup(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "ifexistgroup", dic).ToString();
       }


       /// <summary>
        /// 查询用户参与的全部圈子
       /// </summary>
        /// <param name="dic">用户ID</param>
       /// <returns></returns>
       public string SelectAll_UserGroup(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "SelectAll_UserGroup", dic);
       }

       /// <summary>
       /// 查询用户参与的全部圈子
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       public DataTable SelectAll_UserGroupDT(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "SelectAll_UserGroup", dic);
       }

       /// <summary>
       /// 好友参加的圈子
       /// </summary>
       /// <param name="dic">user_id</param>
       /// <returns></returns>
       public string selectFriendGroup(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "selectFriendGroup", dic);
       }


       /// <summary>                
       /// 查询圈子人数
       /// </summary>
       /// <param name="dic">group_id</param>
       /// <returns></returns>
       public string get_GroupInfoMember(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "get_GroupInfoMember", dic).ToString();
       }


       /// <summary>
       /// 创建圈子第一步，上传图片
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int ADD_TempGroupInformation(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "ADD_TempGroupInfo", dic);
       }


       /// <summary>
       /// 删除未创建的圈子的图片
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       public int Delete_TempGroupInformation(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "Delete_TempGroupInfo", dic);
       }

       /// <summary>
       /// 踢出圈子
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
       public int Delete_GroupMember(Dictionary<string, object> dic) {
           DataTable DT =  DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "Select_UserRole", dic);
           Boolean isManager = false;
           Boolean isAdmin = false;
           foreach (DataRow DR in DT.Rows) {
               if (DR["level"].ToString() == "0") {
                   isAdmin = true;
               }
               else if (DR["level"].ToString() == "1")
               {
                   isManager = true;
               }
           }


           Dictionary<string, object> newdic = dic;
           newdic["user_id"] = dic["member_id"].ToString();
           DataTable newDT = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "Select_UserRole", newdic);
           Boolean isMemberManager = false;
           Boolean isMemberAdmin = false;
           foreach (DataRow DR in DT.Rows)
           {
               if (DR["level"].ToString() == "0")
               {
                   isMemberAdmin = true;
               }
               else if (DR["level"].ToString() == "1")
               {
                   isMemberManager = true;
               }
           }

           if (isAdmin || (isManager && !isMemberAdmin && !isMemberManager))
           {
               newdic.Add("member_nbr", "-1");
               List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "update_GroupInfoMember", newdic));
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Del_GroupMember", newdic));
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "quit_GroupRole", newdic));
               return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
           }
           else {
               return 0;
           }

       }

       /// <summary>
       /// 查询圈子基础类型
       /// </summary>
       /// <param name="dic">语言号</param>
       /// <returns></returns>
       public string Select_groupmanagetype(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "select_groupmanagetype", dic);
       }


       /// <summary>
       /// 查询圈子类型
       /// </summary>
       /// <param name="dic">圈子ID</param>
       /// <returns></returns>
       public string Select_GroupInfoType(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "Select_GroupInfoType", dic).ToString();
       }

       /// <summary>
       /// 查询圈子缴费类型
       /// </summary>
       /// <param name="dic">圈子ID</param>
       /// <returns></returns>
       public string Select_GroupFee_unit(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "Select_GroupFee_unit", dic).ToString();
       }

       /// <summary>
       /// 查询圈子成员过期时间
       /// </summary>
       /// <param name="dic">圈子ID，用户ID</param>
       /// <returns></returns>
       public string Select_GroupMemberExpire_date(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "Select_GroupMemberExpire_date", dic).ToString();
       }
       /// <summary>
       /// 查询圈子分类
       /// </summary>
       /// <param name="dic">语言号</param>
       /// <returns></returns>
       public string  SelectAll_GroupCategory(Dictionary<string, object> dic)
       {

           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "SelectAll_GroupCategory", dic);
       }


       /// <summary>
       /// 删除圈子
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
        public int del_Group(Dictionary<string, object> dic){
            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
            listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Del_GroupInfo", dic));
            listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Del_AllGroupMember", dic));
            listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Del_AllGroupManageRole", dic));
            return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
        }



       /// <summary>
       /// 创建圈子
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int ADD_GroupInformation(Dictionary<string, object> dic)
       {
           string name = dic["logo_name"].ToString();

           string innerPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "groupImagePath").Trim().Trim(new char[] { '\\', '/' }) + "/";
           string serverRootPath = Common.WannerDaoImageAndFolderManage.GetServerRootImagePath();
           string path = serverRootPath + innerPath;
           string webRootPath = Common.WannerDaoImageAndFolderManage.GetConfigPhotoRelativePath() + "/";
           string newName="";
           string newpath = "";
           if (name != "")
           {
                newName = WanerDaoGuid.GetGuid() + name.Substring(name.LastIndexOf("."));
               newpath =  webRootPath + innerPath + newName;
           }

           if (newName=="" || Common.WannerDaoImageAndFolderManage.copyfile(path + name, path + newName))
           {

               dic.Add("logo_path", newpath);
               string groupID = WanerDaoGuid.GetGuid();
               dic.Add("group_id",groupID);

               dic.Add("is_authorized", 1);
               dic.Add("is_pay", 1);
               dic.Add("role_id", "d8a302bd-15fc-11e1-bb4e-000c295f9365");//超级管理员
               if (dic["fee_unit"].ToString() == "0") {
                   dic["join_fee"] = "0";
               }

               if (dic["is_kick_protected"].ToString().ToLower() == "true")
               {
                   dic["is_kick_protected"] = 1;
               }
               else {
                   dic["is_kick_protected"] = 0;
               }
               List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "ADD_GroupInfor", dic));
               dic.Add("expire_date", "9999-1-1");
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Join_GroupInformation", dic));
               dic.Add("role_level", "d8a302bd-15fc-11e1-bb4e-000c295f9365");//超级管理员
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", dic));
               dic["role_level"] = "d8cd3da4-15fc-11e1-bb4e-000c295f9365";//执行管理员
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", dic));
               dic["role_level"] = "d899747f-15fc-11e1-bb4e-000c295f9365";//财务员
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", dic));
           
               int i =  DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
               if (i == 5)
               {
                   Dictionary<string, object> inviterdic = new Dictionary<string, object>();
                   if (dic["allfriends"].ToString() == "True")
                   {
                       inviterdic.Add("allFriends", "1");
                   }
                   else {
                       inviterdic.Add("allFriends", "0");
                   }
                   if (dic["allgroups"].ToString() == "True")
                   {
                       inviterdic.Add("allGroups", "1");
                   }
                   else {
                       inviterdic.Add("allGroups", "0");
                   }
                  
                   inviterdic.Add("friend", dic["frienddtata"]);
                   inviterdic.Add("sendGroup", dic["groupdata"]);
                   inviterdic.Add("recGroup", groupID);

                   IWanerDaoMessage iwdm = new WanerDao2.WanerDaoBLL.Message.WanerDaoMessage() as IWanerDaoMessage;
                   iwdm.SendGroupMessage(inviterdic);
                   Dictionary<string, string> groupidcookie = new Dictionary<string, string>();
                   groupidcookie.Add("mygroupID", groupID);
                   WanerDao2.WanerDaoModule.Cookie.WanerDaoCookie.AddCookie("wanerdaomygroupID", groupidcookie, 1);
                   return 1;
               }
               else {
                   return 0;
               }
               
           }
           else {
               return 0;
           }
          
       }

       /// <summary>
       /// 判断是否为圈子成员
       /// </summary>
       /// <param name="dic">圈子ID；用户ID</param>
       /// <returns></returns>
       public string ifGroupMember(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "Select_GroupMember", dic).ToString();
       }

       /// <summary>
       /// 查询用户角色
       /// </summary>
       /// <param name="dic">圈子ID；用户ID</param>
       /// <returns></returns>
       public string Select_UserRole(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "Select_UserRole", dic);
       }

       /// <summary>
       /// 查询用户角色图标
       /// </summary>
       /// <param name="dic">圈子ID；用户ID</param>
       /// <returns></returns>
       public string Select_UserRoleImg(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "Select_UserRoleImg", dic);
       }

       /// <summary>
       /// 查询圈子信息
       /// </summary>
       /// <param name="dic">group_id</param>
       /// <returns></returns>
       public string Select_GroupInfo(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "Select_GroupInfo", dic);
       }

       /// <summary>
       /// 查询用户参加的所有圈子信息（只包含ID ，NAME）
       /// add by xubing at 2012-5-27
       /// </summary>
       /// <param name="dic">userid</param>
       /// <returns></returns>
       public DataTable GetUserJoinGroup(string userid)
       {
           Dictionary<string, object> dic = new Dictionary<string, object>();
           dic.Add("user_id", userid);
           return DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "Select_UserJoinGroup", dic);
       }

       /// <summary>
       /// 查询圈子某种角色名
       /// </summary>
       /// <param name="dic">圈子ID，查询某种角色名</param>
       /// <returns></returns>
       public string Select_GroupNormalManage(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "Select_GroupNormalManage", dic);
       }

       /// <summary>
       /// 查询圈子保护时限
       /// </summary>
       /// <param name="dic">语言号;</param>
       /// <returns></returns>
       public IList<GroupModel> Select_GroupKickDuration(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetGenericModel<GroupModel>("GroupSQL", "Select_GroupKickDuration", dic);
       }

       /// <summary>
       /// 加入圈子
       /// </summary>
       /// <param name="dic">group_id;user_id;is_authorized;is_pay;role_id</param>
       /// <returns></returns>
       public int Join_GroupInformation(Dictionary<string, object> dic)
       {
           List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
           if (dic["is_authorized"].ToString() == "1")
           {
               dic.Add("member_nbr", 1);
             
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "update_GroupInfoMember", dic));
           }
           string feeUnit = Select_GroupFee_unit(dic);
           if (feeUnit == "0")
           {
               dic.Add("expire_date", "9999-1-1");
           }
           else {
               dic.Add("expire_date", "1900-1-1");
           }
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Join_GroupInformation", dic));
          
           return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }

       /// <summary>
       /// 退出圈子
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int quit_Group(Dictionary<string, object> dic) {
           List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "quit_Group", dic));
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "quit_GroupRole", dic));
           if (dic.ContainsKey("member_nbr"))
           {
               dic["member_nbr"] = "-1";
           }
           else {
               dic.Add("member_nbr", "-1");
           }
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "update_GroupInfoMember", dic));
           return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }


       /// <summary>
       ///  查询圈子全部成员
       /// </summary>
       /// <param name="dic">圈子号</param>
       /// <returns></returns>
       public IList<GroupModel> Select_GroupAllMember(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetGenericModel<GroupModel>("GroupSQL", "Select_GroupAllMember", dic);
       }

       /// <summary>
       /// 查询执行人
       /// </summary>
       /// <param name="dic">flow_id</param>
       /// <returns></returns>
       public string get_GroupMoneyFlowPayer(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "select_GroupMoneyFlowPayer", dic);
       }

       /// <summary>
       /// 查询附件
       /// </summary>
       /// <param name="dic">flow_id</param>
       /// <returns></returns>
       public string get_GroupMoneyFlowAttachedFile(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "select_GroupMoneyFlowAttachedFile", dic);
       }

       /// <summary>
       /// 添加流水账
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int add_GroupMoneyFlow(Dictionary<string, object> dic) {
           List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

           string flow_id = DateTime.Now.ToString("yyyyMMdd");
           dic.Add("flow_id", flow_id + "%");
           string oldID = DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "select_GroupMoneyFlowID", dic).ToString();
           if (oldID == "")
           {
               dic["flow_id"] = flow_id + "0001";
           }
           else {
               dic["flow_id"] =Decimal .Parse(oldID) + 1;
           }
           dic.Add("store_path", "");
           dic.Add("member_id", "");
           if (dic["executor"].ToString() != "") {
              string[]  executors =  WanerDaoModule.String.WanerDaoString.SplitString(dic["executor"].ToString(), ",");
              foreach (string e in executors)
              {
                  if (e != "")
                  {
                      dic["member_id"] = e;
                      listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupMoneyFlowPayer", dic));
                  }
              }
           }

           List<string> payuserList = new List<string>();
           if (dic["payUser"].ToString() != "")
           {
               if (dic["payUser"].ToString() == "all")
               {
                  DataTable DT =  DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "Select_GroupAllMember", dic);
                  if (dic["payer_nbr"].ToString() == "all") {
                      dic["payer_nbr"] = DT.Rows.Count;
                  }
                  
                  foreach(DataRow DR in DT.Rows)
                  {
                       dic["member_id"]= DR[0];
                       payuserList.Add(DR[2].ToString());
                      listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupMoneyFlowPayer", dic));
                  
                  }
               }
               else
               {
                   string[] payUser = WanerDaoModule.String.WanerDaoString.SplitString(dic["payUser"].ToString(), ",");
                   string fu="";
                   if (dic["is_in"].ToString() == "3")
                   {
                       fu = Select_GroupFee_unit(dic);
                     
                   }
                   Dictionary<string, object> emaildic = new Dictionary<string, object>();
                   emaildic.Add("user_id", "");
                   foreach (string p in payUser)
                   {
                       
                       if (p != "")
                       {
                           dic["member_id"] = p;
                           emaildic["user_id"] = p;
                           DataTable EDT = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("PersonSQL", "GetSecurityEmailByUser", emaildic);
                           payuserList.Add(EDT.Rows[0][0].ToString());
                           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupMoneyFlowPayer", dic));

                           DateTime DTime = DateTime.Parse( Select_GroupMemberExpire_date(dic));
                           DateTime newDTime = DateTime.Now;
                           if (DTime.CompareTo(newDTime) > 0) {
                               newDTime = DTime;
                           }
                           if (dic["is_in"].ToString() == "3")
                           {
                               switch (fu)
                               {
                                   case "0"://入门费
                                       dic.Add("expire_date", "9999-1-1");
                                       break;
                                   case "1"://按月
                                       dic.Add("expire_date", newDTime.AddMonths(1));
                                       break;
                                   case "2"://按年
                                       dic.Add("expire_date", newDTime.AddYears(1));
                                       break;
                                   case "3"://入门费
                                       dic.Add("expire_date", "9999-1-1");
                                       break;
                                   case "10"://小时
                                       dic.Add("expire_date", newDTime.AddHours(1));
                                       break;
                                   case "11"://周
                                       dic.Add("expire_date", newDTime.AddDays(7));
                                       break;
                                   case "12"://月
                                       dic.Add("expire_date", newDTime.AddMonths(1));
                                       break;
                                   case "13"://年
                                       dic.Add("expire_date", newDTime.AddYears(1));
                                       break;
                               }
                               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "update_expire_date", dic));
                     
                           }
                         
                       }
                       
                       
                   }
               }
           }
           dic.Add("file_name", "");
           if (dic["files"].ToString() != "") {
               string[] files = WanerDaoModule.String.WanerDaoString.SplitString(dic["files"].ToString(), ",,");
               string innerPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "groupFilePath").Trim().Trim(new char[] { '\\', '/' }) + "/";

               innerPath = innerPath + dic["money_ope_id"].ToString() + "/";
               string serverRootPath = Common.WannerDaoImageAndFolderManage.GetConfigFilesRelativePath();
               string serverImagPath = Path.Combine(serverRootPath, innerPath);
               foreach (string f in files) {
                   if (f != "")
                   {
                       string[] fi = WanerDaoModule.String.WanerDaoString.SplitString(f, ",");
                       dic["store_path"] = "../" + serverImagPath +fi[0];
                       dic["file_name"] =  fi[1];
                       listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupMoneyFlowAttachedFile", dic));
                   }
               }
           }
          
          listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupMoneyFlow", dic));
              int i =     DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
              if (i > 0) {
                  WanerDaoMailSimpleSchema mailSchema = new WanerDaoMailSimpleSchema();
                 
                  mailSchema.Content = WanerDaoFilterReader.GetParam("emailContent");
                  mailSchema.Subject = WanerDaoFilterReader.GetParam("emailSubject");
                  foreach (string addr in payuserList) {
                      mailSchema.EmailAddress = addr;
                      WanerDaoMessageQueue.SendEmail(mailSchema);
                  }
                  
               
              }
              return i;
       }
       
       /// <summary>
       /// 查询财务金额
       /// </summary>
       /// <param name="dic">group_id</param>
       /// <returns></returns>
       public string get_item_money(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "select_item_money", dic);
       }

       /// <summary>
       /// 按条件查询财务金额
       /// </summary>
       /// <param name="dic">group_id,id,item_name</param>
       /// <returns></returns>
       public string get_sre_item_money(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "select_sre_item_money", dic);
       }

       /// <summary>
       /// 修改圈子(层次结构)
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int Edit_GroupInformation(Dictionary<string, object> dic)
       {
           List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
           string[] managerIDStr = WanerDaoModule.String.WanerDaoString.SplitString(dic["managerID"].ToString(), ",");
           string[] treasurerIDStr = WanerDaoModule.String.WanerDaoString.SplitString(dic["treasurerID"].ToString(), ",");
           dic.Add("user_id", "");
           //删除原圈子执行管理人员
           dic.Add("role_level", "d8cd3da4-15fc-11e1-bb4e-000c295f9365");
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "del_GroupManageRole", dic));
           foreach (string id in managerIDStr)
           {
               if (id != "")
               {
                   dic["user_id"] = id;
                   //添加圈子执行管理员
                   listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", dic));
               }
             
           }

           //删除原圈子财务人员
           dic["role_level"]="d899747f-15fc-11e1-bb4e-000c295f9365";
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "del_GroupManageRole", dic));
           foreach (string id in treasurerIDStr)
           {
               if (id != "")
               {
                   dic["user_id"] = id;
                   //添加财务人员
                   listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", dic));
               }
               
           }

           //logo处理
           string name = dic["logo_name"].ToString();
           string innerPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "groupImagePath").Trim().Trim(new char[] { '\\', '/' }) + "/";
           string serverRootPath = Common.WannerDaoImageAndFolderManage.GetServerRootImagePath();
           string path = serverRootPath + innerPath;
           string webRootPath = Common.WannerDaoImageAndFolderManage.GetConfigPhotoRelativePath() + "/";

           if (bool.Parse(dic["logoChange"].ToString()))
           {
               string newName = WanerDaoGuid.GetGuid() + name.Substring(name.LastIndexOf("."));
               Common.WannerDaoImageAndFolderManage.copyfile(path + name, path + newName);
               dic.Add("logo_path", webRootPath + innerPath + newName);
           }
           else {
               dic.Add("logo_path", webRootPath + innerPath + name);
           }
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Edit_GroupInformation", dic));
           if (dic["manage_type_id"].ToString() == "f1da1c0f-125a-11e1-9997-000c295f9365" || dic["manage_type_id"].ToString() == "f1da1c0f-125a-11e1-9997-000c295f9365")
           {
               listSqlParam = this.Edit_GroupToDemocratic(dic,listSqlParam);
           }
           return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }


       /// <summary>
       /// 修改圈子(层次结构转民主制度)
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public List<KeyValuePair<string, DbParameter[]>> Edit_GroupToDemocratic(Dictionary<string, object> dic, List<KeyValuePair<string, DbParameter[]>> listSqlParam)
       {
           Dictionary<string, object> newdic =new Dictionary<string, object>();
           newdic.Add("group_id", dic["group_id"].ToString());
           newdic.Add("manage_type_id", dic["manage_type_id"].ToString());
           //执行管理员
           newdic.Add("role_level", "d8cd3da4-15fc-11e1-bb4e-000c295f9365");
           newdic.Add("change_duration", dic["mchange_duration"].ToString());
           newdic.Add("pay_duration", dic["mpay_duration"].ToString());
           newdic.Add("salary", dic["msalary"].ToString());
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Create_DemocraticRoleEventRulesSetting", newdic));

     
           //财务员
           newdic["role_level"]="d8cd3da4-15fc-11e1-bb4e-000c295f9365";
           newdic["change_duration"] = dic["fchange_duration"].ToString();
           newdic["pay_duration"] = dic["fpay_duration"].ToString();
           newdic["salary"] = dic["fsalary"].ToString();
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Create_DemocraticRoleEventRulesSetting", newdic));

           //综合设置
           newdic["vote_life"] = dic["vote_life"].ToString();
           newdic["public_life"] = dic["public_life"].ToString();
           newdic["vote_pass_rate"] = dic["vote_pass_rate"].ToString();
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Create_DemocraticGroupSetting", newdic));

           return listSqlParam;
       }

       /// <summary>
       /// 查询民主结构设置
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public string Select_GroupDemocratic(Dictionary<string, object> dic) {
           dic.Add("manager_role", "d8cd3da4-15fc-11e1-bb4e-000c295f9365");
           dic.Add("financial_role", "d899747f-15fc-11e1-bb4e-000c295f9365");
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "Select_GroupDemocratic", dic);
       }


       /// <summary>
       ///   用户具有的圈子事件
       /// </summary>
       /// <param name="dic">圈子号;权限号;管理结构</param>
       /// <returns></returns>
       public IList<GroupModel> Select_RoleEventRules(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().GetGenericModel<GroupModel>("GroupSQL", "Select_RoleEventRules", dic);
       }

       /// <summary>
       /// 读取圈子列表参数
       /// </summary>
       /// <param name="dic">参数</param>
       /// <returns></returns>
       public string GetGroupParamList(string param)
       {
           return  WanerDaoModule.Config.WanerDaoFilterReader.GetGroupParamList(param);
       }

       /// <summary>
       /// 发起事件
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int Add_GroupEventRecords(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "Add_GroupEventRecords", dic);
       }


       /// <summary>
       /// 拒绝加入圈子
       /// </summary>
       /// <param name="dic">圈子ID，用户ID</param>
       /// <returns></returns>
       public int Refused_joinGroup(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans("GroupSQL", "Refused_joinGroup", dic);
       }

       /// <summary>
       /// 职位变更
       /// </summary>
       /// <param name="dic">圈子ID，用户ID</param>
       /// <returns></returns>
       public int Update_GroupRole(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "Update_GroupRole", dic);
       }


       /// <summary>
       /// 圈子发帖,其他模块发帖分享
       /// </summary>
       /// <param name="dic">group_id：圈子ID，post_id：发表人ID，subject:主题，content：内容</param>
       /// <returns></returns>
       public int add_GroupDiscuss(Dictionary<string, object> dic)
       {
           return DbHelperFactory.SingleInstance().ExecuteNonQuery("GroupSQL", "add_GroupDiscuss", dic);
       }

       /// <summary>
       /// 活动相关圈子总数
       /// </summary>
       /// <param name="dic">category_name:分类名称</param>
       /// <returns></returns>
       public int searchGroupRelateActivityCount(Dictionary<string, object> dic)
       {
           dic["category_name"] ="%"+ dic["category_name"].ToString()+"%";
           return int.Parse( DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "searchGroupRelateActivityCount", dic).ToString ());
       }

       /// <summary>
       /// 查询圈子中的个人信息
       /// </summary>
       /// <param name="dic">group_id,user_id</param>
       /// <returns></returns>
       public string searchGroupMember(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "select_GroupMember", dic);
          
       }

       /// <summary>
       /// 判断会员是否过期
       /// </summary>
       /// <param name="dic">group_id,user_id</param>
       /// <returns></returns>
       public bool ifexpire(Dictionary<string, object> dic) {
           DataTable DT =  DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "select_GroupMember", dic);
           DateTime nowTime = DateTime.Now;
           DateTime expireTime = DateTime.Parse( DT.Rows[0]["expire_date"].ToString());
           if(nowTime>expireTime){
                return true;
           }else{
               return false;
           }
       }


       /// <summary>
       /// 判断是否可以加入圈子
       /// </summary>
       /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
       public bool ifCanJoin(Dictionary<string, object> dic)
       {
           DataTable DT = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "select_GroupKickList", dic);
           if (DT.Rows.Count == 0)
           {
               return true;
           }
           else
           {
               DateTime nowTime = DateTime.Now;

               if (bool.Parse(DT.Rows[0]["is_kick_protected"].ToString()))
               {
                   if (DT.Rows[0]["kick_date"] == null)
                   {
                       return true;
                   }
                   else
                   {
                       DateTime kickDate = DateTime.Parse(DT.Rows[0]["kick_date"].ToString());
                       if (kickDate.AddDays(int.Parse(DT.Rows[0]["kick_protected_duration"].ToString())) > nowTime)
                       {
                           return false;
                       }
                       else
                       {
                           return true;
                       }
                   }


               }
               else
               {
                   return true;
               }
           }
       }


       /// <summary>
       /// 获取圈子个人设置
       /// </summary>
       /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
       public string get_PersonalGroupSettings(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "get_PersonalGroupSettings", dic);
       }


       /// <summary>
       /// 批准加入圈子
       /// </summary>
       /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
        public int AgreedJoin_GroupInformation(Dictionary<string, object> dic) {
            List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

            listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "AgreedJoin_GroupInformation", dic));
                dic.Add("member_nbr", 1);
                listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "update_GroupInfoMember", dic));
            return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }
       /// <summary>
       /// 修改圈子设置
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int update_GroupSetting(Dictionary<string, object> dic) {
           List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
           string[] userIDStr = WanerDaoModule.String.WanerDaoString.SplitString(dic["userID"].ToString(), ",");
           dic.Add("special_id", "");

           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "del_GroupMsgExceptionList", dic));
           foreach (string id in userIDStr)
           {
               if (id != "")
               {
                   dic["special_id"] = id;
                   //添加圈子执行管理员
                   listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupMsgExceptionList", dic));
               }

           }
          

           if (dic["id"].ToString() == "")
           {
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupSetting", dic));
           }
           else {
               listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "update_GroupSetting", dic));
           }
           return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }


       /// <summary>
       /// 获取圈子特例用户
       /// </summary>
       /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
       public string get_GroupMsgExceptionList(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "get_GroupMsgExceptionList", dic);
       }

       /// <summary>
       /// 更新圈子特例用户
       /// </summary>
       /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
       public int update_GroupMsgExceptionList(Dictionary<string, object> dic) {
           List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
           string[] userIDStr = WanerDaoModule.String.WanerDaoString.SplitString(dic["userID"].ToString(), ",");
           dic.Add("special_id", "");

           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "del_GroupMsgExceptionList", dic));
           foreach (string id in userIDStr)
           {
               if (id != "")
               {
                   dic["special_id"] = id;
                   //添加圈子执行管理员
                   listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupMsgExceptionList", dic));
               }

           }
           return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }

       /// <summary>
       /// 删除上传文件
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public bool del_FlowFile(Dictionary<string, object> dic) {
           string innerPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "groupFilePath").Trim().Trim(new char[] { '\\', '/' }) + "/";
           string filename = Common.WannerDaoImageAndFolderManage.GetAndRemoveValue("filename", dic);
           string user_id = Common.WannerDaoImageAndFolderManage.GetAndRemoveValue("user_id", dic);
           innerPath = innerPath + user_id + "/";
           string serverRootPath = Common.WannerDaoImageAndFolderManage.GetServerRootFilePath();
           string serverImagPath = Path.Combine(serverRootPath, innerPath) + "/" + filename;
           return Common.WannerDaoImageAndFolderManage.DeleteFile(serverImagPath);
       }

       /// <summary>
       /// 按角色取事件权限
       /// </summary>
       /// <param name="dic">group_id,user_id</param>
       /// <returns></returns>
       public string get_event(Dictionary<string, object> dic) {
           return DbHelperFactory.SingleInstance().GetDataTable("GroupSQL", "select_roleEvent", dic);
       }

       /// <summary>
       /// 发起事件
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int create_budget(Dictionary<string, object> dic, ref  Boolean isLevelstructure)
       {
           DataTable DT = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "select_eventRole", dic);
             dic.Add("begin_date", DateTime.Now);
             if (Select_GroupInfoType(dic) == "f1ceb590-125a-11e1-9997-000c295f9365")
             {
                 isLevelstructure = true;
                 dic.Add("positive", "1");
             }
             else
             {
                 isLevelstructure = false;
                 dic.Add("positive", "0");
             }

             if (!dic.ContainsKey("link_value1"))
             {
                 dic.Add("link_value1", "");
             }
             if (!dic.ContainsKey("link_value2"))
             {
                 dic.Add("link_value2", "");
             }
             if (!dic.ContainsKey("link_value3"))
             {
                 dic.Add("link_value3", "");
             }
             if (!dic.ContainsKey("link_value4"))
             {
                 dic.Add("link_value4", "");
             }
             if (!dic.ContainsKey("link_value5"))
             {
                 dic.Add("link_value5", "");
             }
             if (!dic.ContainsKey("link_value6"))
             {
                 dic.Add("link_value6", "");
             }
             if (!dic.ContainsKey("link_value7"))
             {
                 dic.Add("link_value7", "");
             }
             if (!dic.ContainsKey("link_value8"))
             {
                 dic.Add("link_value8", "");
             }
           
             List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();

             //if (Boolean.Parse(DT.Rows[0]["is_self_approve"].ToString())) {
             //    int maxID = int.Parse( DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "get_maxGroupEventRecords", dic).ToString());
             //    dic.Add("delay_invoke", 0);
             //    dic.Add("class_id", maxID+1);
             //    dic.Add("process_status", "64303850-6151-11e1-bce8-101f74b66417");                 
             //    dic.Add("end_date",  DateTime.Now);
             //}

             Dictionary<string, object> newdic = new Dictionary<string, object>();
             newdic = dic;
             #region 查询当前操作用户角色
             DataTable RoleDT = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "Select_UserRole", dic);
             Boolean isAdmin = false;
             Boolean ismanager = false;
             Boolean isTreasurer = false;
             foreach (DataRow DR in RoleDT.Rows)
             {
                 if (DR["role_id"].ToString() == "d8a302bd-15fc-11e1-bb4e-000c295f9365")//超级管理员
                 {
                     isAdmin = true;
                 }
                 if (DR["role_id"].ToString() == "d8cd3da4-15fc-11e1-bb4e-000c295f9365")//执行管理员
                 {
                     ismanager = true;
                 }
                 if (DR["role_id"].ToString() == "d899747f-15fc-11e1-bb4e-000c295f9365")//财务员
                 {
                     isTreasurer = true;
                 }
             }
             #endregion
             int maxID = int.Parse(DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "get_maxGroupEventRecords", dic).ToString());            
             dic.Add("class_id", maxID + 1);
             dic.Add("delay_invoke", 0);
             string tempUserID = "";
           //阶梯类型
             if (isLevelstructure)
             {
                 newdic.Add("manage_type_id", "f1ceb590-125a-11e1-9997-000c295f9365");//阶梯型管理
                 #region 超级管理员变动
                 if (dic["event_id"].ToString() == "36639d9b-8a16-11e1-8de6-101f74b66417")
                 {
                     newdic.Add("role_level", "d8a302bd-15fc-11e1-bb4e-000c295f9365");//超级管理员


                     listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "del_GroupManageRole", newdic));

                     tempUserID = dic["user_id"].ToString();
                     newdic["user_id"] = newdic["link_value1"].ToString();//新管理员ID
                     listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", newdic));
                     dic["user_id"] = tempUserID;

                 }
                 #endregion
                 #region 执行管理员变动
                 string[] tuserID = WanerDaoModule.String.WanerDaoString.SplitString(newdic["link_value2"].ToString(), ",");//新管理员\财务员ID
                
                 if (dic["event_id"].ToString() == "366870f6-8a16-11e1-8de6-101f74b66417")
                 {

                     newdic.Add("role_level", "d8cd3da4-15fc-11e1-bb4e-000c295f9365");//执行管理员

                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "1")
                     {

                         if (!isAdmin)
                         {
                             return 1035;//返回执行管理员无新增权限
                         }
                         else
                         {
                             tempUserID = dic["user_id"].ToString();
                            foreach (string ti in tuserID ){
                                newdic["user_id"] = ti;
                                if (DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "SelectRole_GroupNormalManage", newdic).ToString() == "1")
                                {
                                 //   return 1034;//返回添加的执行管理员已经存在
                                }
                                else
                                {
                                    listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", newdic));
                                  }
                            }
                             dic["user_id"] = tempUserID;
                         }
                     }


                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "2")
                     {
                         if (!isAdmin)
                         {
                             return 1035;//返回执行管理员无撤除权限
                         }
                         else
                         {
                             tempUserID = dic["user_id"].ToString();
                             foreach (string ti in tuserID) {
                                 newdic["user_id"] = ti;//新管理员ID
                                 listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "delRole_GroupManageRole", newdic));
                            
                             }
                            dic["user_id"] = tempUserID;
                         }
                     }

                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "3")
                     {
                         return 1035;//返回圈子层级结构无弹劾权限
                     }

                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "4")
                     {
                         if (ismanager)
                         {
                             listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "delRole_GroupManageRole", newdic));
                         }
                         else
                         {
                             return 1035;//返回不是执行管理员
                         }
                     }

                 }
                 #endregion
                 #region 财务员变动
                 if (dic["event_id"].ToString() == "366d68da-8a16-11e1-8de6-101f74b66417")
                 {
                     newdic.Add("role_level", "d899747f-15fc-11e1-bb4e-000c295f9365");//财务员

                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "1")
                     {

                         if (!isAdmin)
                         {
                             return 1035;//返回财务员无新增权限
                         }
                         else
                         {
                             tempUserID = dic["user_id"].ToString();
                             foreach (string ti in tuserID)
                             {
                                 newdic["user_id"] = ti;//新财务员ID
                                 if (DbHelperFactory.SingleInstance().GetScalar("GroupSQL", "SelectRole_GroupNormalManage", newdic).ToString() == "1")
                                 {
                                     return 1036;//返回添加的财务员已经存在
                                 }
                                 else
                                 {

                                     listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", newdic));

                                 }
                             }
                             dic["user_id"] = tempUserID;
                         }
                     }


                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "2")
                     {
                         if (!isAdmin)
                         {
                             return 1035;//返回财务员无撤除权限
                         }
                         else
                         {
                             tempUserID = dic["user_id"].ToString();
                             foreach (string ti in tuserID)
                             {
                                 newdic["user_id"] = ti;//新财务员ID
                                 listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "delRole_GroupManageRole", newdic));

                             } dic["user_id"] = tempUserID;
                         }
                     }

                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "3")
                     {
                         return 1035;//返回圈子层级结构无弹劾权限
                     }

                     if (WanerDaoModule.String.WanerDaoString.RTrim(dic["link_value1"].ToString()) == "4")
                     {
                         if (isTreasurer)
                         {
                             listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "delRole_GroupManageRole", newdic));
                         }
                         else
                         {
                             return 1035;//返回不是财务员
                         }
                     }

                 }
                 #endregion

                 #region 解散圈子
                 if (dic["event_id"].ToString() == "365e8996-8a16-11e1-8de6-101f74b66417")
                 {
                     del_Group(dic);
                     return 1040;//解散圈子
                     //listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "delRole_GroupManageRole", dic));
                 }
                 #endregion

                 #region 活动专用预算
                 if (dic["event_id"].ToString() == "3659eb18-8a16-11e1-8de6-101f74b66417")
                 {
                     //暂时未有特殊处理
                 }
                 #endregion

                 #region 收支预算
                 if (dic["event_id"].ToString() == "364ef1eb-8a16-11e1-8de6-101f74b66417")
                 {
                     //暂时未有特殊处理
                 }
                 #endregion

                 #region 基本信息变更
                 if (dic["event_id"].ToString() == "3651d57b-8a16-11e1-8de6-101f74b66417")
                 {
                     string t = dic["link_value1"].ToString();
                     string sql = "update GroupInfo set ";
                     switch (t)
                     {
                         case "0":
                             sql += " group_name=?link_value2 ";
                             break;
                         case "1":
                             sql += " category_id=?link_value2 ";
                             break;
                         case "2":
                             sql += " is_public=?link_value2 ";
                             break;
                         case "3":
                             sql += " join_method_id=?link_value2 ";
                             break;
                         case "4":
                             sql += " logo_path=?link_value2 ";
                             string name = dic["link_value2"].ToString();
                             string innerPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "groupImagePath").Trim().Trim(new char[] { '\\', '/' }) + "/";
                             string serverRootPath = Common.WannerDaoImageAndFolderManage.GetServerRootImagePath();
                             string path = serverRootPath + innerPath;
                             string webRootPath = Common.WannerDaoImageAndFolderManage.GetConfigPhotoRelativePath() + "/";

                             string newName = WanerDaoGuid.GetGuid() + name.Substring(name.LastIndexOf("."));
                             Common.WannerDaoImageAndFolderManage.copyfile(path + name, path + newName);
                             dic["link_value2"] = webRootPath + innerPath + newName;

                             break;
                         case "5":
                             sql += " summary=?link_value2 ";
                             break;
                         case "6":
                             sql += " description=?link_value2 ";
                             break;
                         case "7":
                             sql += " website=?link_value2 ";
                             break;
                         case "8":
                             sql += " join_fee=?link_value3 and fee_unit = ?link_value2 ";
                             break;
                         case "9":
                             sql += " transfer_account=?link_value2 ";
                             break;
                         case "10":
                             sql += " transfer_description=?link_value2 ";
                             break;
                         case "11":
                             sql += " is_kick_protected=?link_value2 ";
                             break;
                     }
                     sql += "  where id =?group_id ";
                     listSqlParam.Add(DbHelperFactory.SingleInstance().CommonExecuteNonQuery(sql, dic));

                 }
                 #endregion


                 dic.Add("process_status", "64303850-6151-11e1-bce8-101f74b66417");//事件结束
                 dic.Add("end_date", DateTime.Now);

             }
             //民主类型
             else {
                 DataTable DT2 = DbHelperFactory.SingleInstance().GetDataTableBasedOnSql("GroupSQL", "Select_DemocraticGroupSetting", dic);

                 #region 超级管理员变动
                 if (dic["event_id"].ToString() == "36639d9b-8a16-11e1-8de6-101f74b66417")
                 {
                     dic.Add("process_status", "64303850-6151-11e1-bce8-101f74b66417");//事件结束.昝无延时
                     dic.Add("end_date", DateTime.Now);
                     newdic.Add("manage_type_id", "f1da1c0f-125a-11e1-9997-000c295f9365");//民主型管理
                     newdic.Add("role_level", "d8a302bd-15fc-11e1-bb4e-000c295f9365");//超级管理员


                     listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "del_GroupManageRole", newdic));

                     tempUserID = dic["user_id"].ToString();
                     newdic["user_id"] = newdic["link_value1"].ToString();//新管理员ID
                     listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupManageRole", newdic));
                     dic["user_id"] = tempUserID;


                 }
                 
                 #endregion

                 else
                 {
                     dic.Add("process_status", "64303007-6151-11e1-bce8-101f74b66417");//决定事件.昝无延时
                     dic.Add("end_date", DateTime.Now.AddDays(double.Parse(DT2.Rows[0]["vote_life"].ToString())));
                 }
              
         
             }

             //if (dic["event_id"].ToString() == "3651d57b-8a16-11e1-8de6-101f74b66417" && (dic["link_value1"].ToString() == "4" || dic["link_value1"].ToString() == "5"))
             //    {
                    

             //        string[] strID = WanerDaoModule.String.WanerDaoString.SplitString(dic["link_value2"].ToString(), ",");
             //        foreach (string id in strID)
             //        {
             //            if (id != "")
             //            {
             //                newdic["link_value2"] = id;
             //                listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Add_GroupEventRecords", newdic));
             //            }
             //        }
             //    }
             //    else
             //    {
                     listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "Add_GroupEventRecords", dic));

             // }
             return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }


       /// <summary>
       /// 事件投票操作
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
       public int add_GroupEventVoteHistory(Dictionary<string, object> dic) {
           List<KeyValuePair<string, DbParameter[]>> listSqlParam = new List<KeyValuePair<string, DbParameter[]>>();
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "add_GroupEventVoteHistory", dic));
           listSqlParam.Add(DbHelperFactory.SingleInstance().GetNonQueryDBParamBasedOnSql("GroupSQL", "update_GroupEventRecords", dic));
           
           return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans(listSqlParam);
       }


       /// <summary>
       /// 描述 上传圈子文件
       /// <param name="httpPosteFile">上传文件请求流</param>
       /// <param name="dic">dic包含信息：
       /// user_id：用户ID
       /// </summary>
       /// <returns></returns>
       public WanerDaoUploadImageResult WanerDaoUploadFile(HttpPostedFile httpPosteFile, Dictionary<string, object> dic)
       {
           WanerDaoUploadImageResult _imageResult = new WanerDaoUploadImageResult();
           _imageResult.isSuccess = false;
           try
           {
               string user_id = Common.WannerDaoImageAndFolderManage.GetAndRemoveValue("user_id", dic);
             //  string group_id = Common.WannerDaoImageAndFolderManage.GetAndRemoveValue("group_id", dic);
               string fileType = httpPosteFile.FileName.Substring(httpPosteFile.FileName.LastIndexOf("."));
               string guid = WanerDaoGuid.GetGuid(); ;
               _imageResult.imageId = guid;
               _imageResult.userId = user_id;
               _imageResult.oldFileName = httpPosteFile.FileName.Replace(fileType, "");
               _imageResult.size = httpPosteFile.InputStream.Length;
               _imageResult.fileName = guid + fileType;

               string innerPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "groupFilePath").Trim().Trim(new char[] { '\\', '/' }) + "/";

               innerPath = innerPath + user_id + "/";
               _imageResult.innerPath = innerPath;
               _imageResult.serverRootPath = Common.WannerDaoImageAndFolderManage.GetServerRootFilePath();
               string serverImagPath = Path.Combine(_imageResult.serverRootPath, _imageResult.innerPath);
               if (Common.WannerDaoImageAndFolderManage.SaveFile(httpPosteFile, serverImagPath, _imageResult.fileName))
               {

                   _imageResult.resultMsg = "成功";
                   _imageResult.isSuccess = true;
               }
               else
               {
                   _imageResult.resultMsg = "抱歉：上传失败。";
               }

           }
           catch (Exception)
           {
           }
           return _imageResult;
       }



       /// <summary>
       /// 描述 上传圈子图片
       /// <param name="httpPosteFile">上传文件请求流</param>
       /// <param name="dic">dic包含信息：
       /// user_id：用户ID
       /// </summary>
       /// <returns></returns>
       public WanerDaoUploadImageResult WanerDaoUploadImageFile(HttpPostedFile httpPosteFile, Dictionary<string, object> dic)
       {
           WanerDaoUploadImageResult _imageResult = new WanerDaoUploadImageResult();
           _imageResult.isSuccess = false;
           try
           {
               string user_id = Common.WannerDaoImageAndFolderManage.GetAndRemoveValue("user_id", dic);

               string fileType = httpPosteFile.FileName.Substring(httpPosteFile.FileName.LastIndexOf("."));
               string guid = user_id+"-temp";
               _imageResult.imageId = guid;
               _imageResult.userId = user_id;
               _imageResult.oldFileName = httpPosteFile.FileName.Replace(fileType, "");
               _imageResult.size = httpPosteFile.InputStream.Length;
               _imageResult.fileName = guid + fileType;
               _imageResult.smallFileName = guid + "-small" + fileType;

               string innerPath = WanerDaoConfigReader.GetConfigXml("WanerDaoConfig", "groupImagePath").Trim().Trim(new char[] { '\\', '/' }) +"/";
        
               
               _imageResult.innerPath = innerPath;
               _imageResult.webRootPath = Common.WannerDaoImageAndFolderManage.GetConfigPhotoRelativePath() + "/";
               _imageResult.serverRootPath = Common.WannerDaoImageAndFolderManage.GetServerRootImagePath();
               string serverImagPath = Path.Combine(_imageResult.serverRootPath, _imageResult.innerPath);
               if (Common.WannerDaoImageAndFolderManage.SaveFile(httpPosteFile, serverImagPath, _imageResult.fileName))
               {
                  
                   WanerDaoThumbnail.MakeThumbnailImage(serverImagPath + _imageResult.fileName, serverImagPath + _imageResult.smallFileName, 300, 300);
                   _imageResult.resultMsg = "成功";
                   _imageResult.isSuccess = true;
               }
               else
               {
                   _imageResult.resultMsg = "抱歉：上传失败。";
               }

           }
           catch (Exception)
           {
           }
           return _imageResult;
       }
    }
}
