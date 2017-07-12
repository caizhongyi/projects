#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：xux   时间：2012/1/3
* 文件名：WanerDaoGroupFactory 
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
using System.Web;
using System.Web.SessionState;
using WanerDao2.WanerDaoIBLL.IMessage;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.String;
using WanerDao2.WanerDaoComponent;
using WanerDao2.WanerDaoIBLL.IRelation;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoModule.WanerDaoImage;
using WanerDao2.WanerDaoIBLL.IPerson;
using System.Data;
using WanerDao2.WanerDaoIBLL.IIndex;
using WanerDao2.WanerDaoModule.WanerDaoGuid;

namespace WanerDao2.WanerDaoBLLFactory.relationship
{

    public class WanerDaoGroupFactory : IHttpHandler, IRequiresSessionState
    {
        #region IHttpHandler Members

        IWanerDaoGroup iwdg = new WanerDao2.WanerDaoBLL.Relation.WanerDaoGroup() as IWanerDaoGroup;
        IWanerDaoFriends iwdfr = new WanerDao2.WanerDaoBLL.Relation.WanerDaoFriends() as IWanerDaoFriends;
        //PersonalSecurityProfileModel pspmodel = CommonContext.GetUserSecurityInfo();
        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Cache.SetCacheability(HttpCacheability.ServerAndNoCache);
           
            string json = string.Empty;
            IWanerDaoPersonInfoManager iwpi = new WanerDao2.WanerDaoBLL.Person.WanerDaoPersonInfoManager() as IWanerDaoPersonInfoManager;
            IWanerDaoFollow iwdf = new WanerDao2.WanerDaoBLL.Relation.WanerDaoFollow() as IWanerDaoFollow;
           
            string typestr = WanerDaoValidation.ValidateParamters(context.Request.Form.ToString());
            int i;
            if (typestr == string.Empty)
            {
                json = WanerDaoJSON.GetErrorJson("no operator type or invalid operator!");
            }
            else
            {
                Dictionary<string, object> dic = WanerDaoJSON.GetContentInfo(context.Request.Form.ToString());

                dic.Add("language_id", CommonContext.GetClientLanguage());
                //if (!dic.ContainsKey("group_id")) {
                //   dic.Add("group_id", WanerDao2.WanerDaoModule.Cookie.WanerDaoCookie.GetCookieValues("wanerdaomygroupID"));
                //}
               

                switch (typestr)
                {
                    #region 上传圈子图片
                    case "uploadimagefile":
                        try
                        {
                            HttpPostedFile postedImageFile = context.Request.Files[0];
                            WanerDaoUploadImageResult UploadImageResult = iwdg.WanerDaoUploadImageFile(postedImageFile, dic);
                            if (UploadImageResult.isSuccess)
                            {
                                HttpContext.Current.Response.Write(UploadImageResult.SmallFileWebPath + "-,-" + UploadImageResult.imageId + "-,-" + UploadImageResult.fileName + "-,-GroupUpload");
                                HttpContext.Current.Response.StatusCode = 200;
                            }
                            else
                            {
                                HttpContext.Current.Response.Write(UploadImageResult.resultMsg);
                                HttpContext.Current.Response.StatusCode = 500;
                            }
                        }
                        catch (Exception)
                        {
                            HttpContext.Current.Response.Write("文件上传失败，请重试");
                            HttpContext.Current.Response.StatusCode = 500;
                        }
                                finally
                                {
                                    HttpContext.Current.Response.End();
                                    HttpContext.Current.Response.Close();
                                }
                        break;
                    #endregion
                    #region 上传附件
                    case "financefile":
                        try
                        {
                            HttpPostedFile postedImageFile = context.Request.Files[0];
                            WanerDaoUploadImageResult UploadImageResult = iwdg.WanerDaoUploadFile(postedImageFile, dic);
                            if (UploadImageResult.isSuccess)
                            {
                                HttpContext.Current.Response.Write(UploadImageResult.fileName + "-,-" + UploadImageResult.imageId + "-,-" + UploadImageResult.oldFileName + "-,-Groupfile");
                                HttpContext.Current.Response.StatusCode = 200;
                            }
                            else
                            {
                                HttpContext.Current.Response.Write(UploadImageResult.resultMsg);
                                HttpContext.Current.Response.StatusCode = 500;
                            }
                        }
                        catch (Exception)
                        {
                            HttpContext.Current.Response.Write("文件上传失败，请重试");
                            HttpContext.Current.Response.StatusCode = 500;
                        }
                        finally
                        {
                            HttpContext.Current.Response.End();
                            HttpContext.Current.Response.Close();
                        }
                        break;
                    #endregion
                    #region 添加\删除圈子关注
                    case "groupfollow":
                        i = iwdf.updateGroupFollow(dic);
                        if (i == 2)
                        {
                            if (dic["addvalue"].ToString() == "1")
                            {

                            }
                            else { 
                                
                            }
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 查询圈子类型
                    case "groupcategory":
                        json  = iwdg.SelectAll_GroupCategory(dic);
                        break;
                    #endregion
                    #region 查询圈子基础类型
                    case "groupmanagetype":
                        json = iwdg.Select_groupmanagetype(dic);
                        break;
                    #endregion
                    #region 查询圈子缴纳费用单位
                    case "feeunit":
                        json = iwdg.GetGroupParamList("feeUnit");
                        break;
                    #endregion
                    #region 判断圈子是否存在
                    case "ifexistgroup":
                        i =int.Parse( iwdg.ifexistgroup(dic));
                        if (i > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 获取角色事件
                    case "getevent":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        json = iwdg.get_event(dic);
                        break;
                    #endregion
                    #region 自定义缴纳费用单位
                    case "definedunit": 
                        json = iwdg.GetGroupParamList("definedUnit");
                        break;
                    #endregion
                    #region 保护时限
                    case "protecttime":
                        json = iwdg.GetGroupParamList("protectTime");
                        break;
                    #endregion
                    #region 好友参加的全部圈子
                    case "friendjoingroup":
                        json = iwdg.selectFriendGroup(dic);
                        break;
                    #endregion
                    #region 查询用户参加的全部圈子
                    case "getalljiongroup":
                        json = iwdg.SelectAll_UserGroup(dic);
                        break;
                    #endregion
                    #region 查询个人爱好
                    case "gethobby":
                        json = iwpi.GetPersonalInterests();
                        break;
                    #endregion
                    #region 创建圈子
                    case "creategroup":
                        try
                        {
                            dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                            if (bool.Parse(dic["allfriends"].ToString()))
                            {
                                string fidstr = "";
                                DataTable DT = iwdfr.SelectAllfriends(dic);
                                foreach (DataRow DR in DT.Rows)
                                {
                                    fidstr += DR["id"] + ",";
                                }
                                if (fidstr.Length != 0)
                                {
                                    fidstr = fidstr.Substring(0, fidstr.Length - 1);
                                }
                                dic["frienddtata"] = fidstr;
                            }

                            if (bool.Parse(dic["allgroups"].ToString()))
                            {
                                string gidstr = "";
                                DataTable DT = iwdg.SelectAll_UserGroupDT(dic);
                                foreach (DataRow DR in DT.Rows)
                                {
                                    gidstr += DR["id"] + ",";
                                }
                                if (gidstr.Length != 0)
                                {
                                    gidstr = gidstr.Substring(0, gidstr.Length - 1);
                                }
                                dic["groupdata"] = gidstr;
                            }
                            i = iwdg.ADD_GroupInformation(dic);

                            if (i == 1)
                            {
                                json = WanerDaoJSON.GetSuccessJson("");
                            }
                            else
                            {
                                json = WanerDaoJSON.GetErrorJson("");
                            }
                        }
                        catch(Exception e){
                            json = WanerDaoJSON.GetErrorJson(e.Message); 
                        }
                        break;
                    #endregion
                    #region 查询圈子信息
                    case "searchgroupinfo":
                        json = iwdg.Select_GroupInfo(dic);
                        break;
                    #endregion
                    #region 查询圈子超级管理员
                    case "sreacsuper":
                        dic.Add("role_level", "d8a302bd-15fc-11e1-bb4e-000c295f9365");
                        json = iwdg.Select_GroupNormalManage(dic);
                        break;
                    #endregion
                    #region 查询圈子执行管理员
                    case "sreachmanager":
                        dic.Add("role_level", "d8cd3da4-15fc-11e1-bb4e-000c295f9365");
                        json = iwdg.Select_GroupNormalManage(dic);
                        break;
                    #endregion
                    #region 查询圈子财务员
                    case "sreachtreasurer":
                        dic.Add("role_level", "d899747f-15fc-11e1-bb4e-000c295f9365");
                        json = iwdg.Select_GroupNormalManage(dic);
                        break;
                    #endregion
                    #region 判断是否为圈子成员
                    case "ifgroupmember":
                        json = iwdg.ifGroupMember(dic);
                        break;
                    #endregion
                    #region 判断是否过期
                    case "ifexpire":
                        json = ifexpire(dic).ToString();
                        break;
                    #endregion
                    #region 修改圈子
                    case "editgroup":
                        i = iwdg.Edit_GroupInformation(dic);
                        json = WanerDaoJSON.GetSuccessJson("");
                        break;
                    #endregion
                    #region 判断能否加入圈子
                    case "ifcanjoin":
                        if (iwdg.ifCanJoin(dic))
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 直接加入圈子--不缴费
                    case "directlyjoin":
                        dic.Add("is_authorized","1");
                        dic.Add("is_pay", "0");
                        dic.Add("role_id", "d8c4fc32-15fc-11e1-bb4e-000c295f9365");
                        if (iwdg.ifCanJoin(dic))
                        {
                            i = iwdg.Join_GroupInformation(dic);

                            if (i == 2)
                            {
                                json = WanerDaoJSON.GetSuccessJson("dir");
                                WanerDaoExperience.jionGroupActivityScoreAdd(dic["group_id"].ToString());
                                AddOperation(dic["group_id"].ToString(), "10535b6b927411e183b9002354c6e759");
                            }
                            else
                            {
                                json = WanerDaoJSON.GetErrorJson("");
                            }
                        }
                        else {
                            json = WanerDaoJSON.GetSuccessJson("nojoin");
                            AddOperation(dic["group_id"].ToString(), "10535b6b927411e183b9002354c6e759");
                        }
                        break;
                    #endregion
                    #region 需要批准的加入
                    case "waitjoin":
                        dic.Add("is_authorized", "0");
                        dic.Add("is_pay", "0");
                        dic.Add("role_id", "d8c4fc32-15fc-11e1-bb4e-000c295f9365");
                        if (iwdg.ifCanJoin(dic))
                        {
                            i = iwdg.Join_GroupInformation(dic);

                            if (i == 1)
                            {
                                json = WanerDaoJSON.GetSuccessJson("wait");
                            }
                            else
                            {
                                json = WanerDaoJSON.GetErrorJson("");
                            }
                        }
                        else
                        {
                            json = WanerDaoJSON.GetSuccessJson("nojoin");
                        }
                        break;
                    #endregion
                    #region 获取用户设置
                    case "getsetting":
                        json =  iwdg.get_PersonalGroupSettings(dic);
                        break;
                    #endregion
                    #region 获取特例用户
                    case "getmsgexception":
                        json = iwdg.get_GroupMsgExceptionList(dic);
                        break;
                    #endregion
                    #region 修改圈子设置
                    case "updategroupsetting":
                        i = iwdg.update_GroupSetting(dic);

                        if (i == 1)
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 拒绝加入圈子
                    case "refusedjoingroup":
                       i =  iwdg.Refused_joinGroup(dic);
                       if (i == 2)
                       {
                           json = WanerDaoJSON.GetSuccessJson("");
                       }
                       else
                       {
                           json = WanerDaoJSON.GetErrorJson("");
                       }
                        break;
                    #endregion
                    #region 允许加入圈子
                    case "agreedjoingroup":
                        i =iwdg.AgreedJoin_GroupInformation(dic);
                        if (i == 2)
                        {
                            json = WanerDaoJSON.GetSuccessJson(""); 
                            WanerDaoExperience.jionGroupActivityScoreAdd(dic["group_id"].ToString());

                            AddOperation(dic["group_id"].ToString(), "10535b6b927411e183b9002354c6e759");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 查询用户角色
                    case "grouprole":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        json = iwdg.Select_UserRole(dic);
                        break;
                    #endregion
                    #region 判断是退出圈子还是注销圈子
                    case "delorleavegroup":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        string istr = iwdg.get_GroupInfoMember(dic);
                        if (istr == "1")
                        {
                            json = WanerDaoJSON.GetSuccessJson("isDelete");
                        }
                        else {
                            json = iwdg.Select_UserRole(dic);
                        }
                        break;
                    #endregion
                    #region 查询用户角色图标
                    case "grouproleimg":
                        json = iwdg.Select_UserRoleImg(dic);
                        break;
                    #endregion
                    #region 删除圈子成员
                    case "delmember":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        i = iwdg.Delete_GroupMember(dic);
                        if (i > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 删除圈子
                    case "delgroup":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        i = iwdg.del_Group(dic);
                        if (i > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 删除圈子发帖
                    case "delgroupdiscuss":
                        i = iwdg.Del_GroupDiscuss(dic);
                        if (i > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 退出圈子
                    case "quitgroup":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        i = iwdg.quit_Group(dic);
                        if (i > 0)
                        {
                            AddOperation(dic["group_id"].ToString(), "f2e914b7210711e281f400ff8069d05e");
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 添加流水账
                    case "saveflow":
                        dic.Add("money_ope_id", CommonContext.GetUserSecurityInfo().user_id);
                        i = iwdg.add_GroupMoneyFlow(dic);
                        if (i > 0)
                        {

                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 查询执行人
                    case "getflowpayer":
                        json = iwdg.get_GroupMoneyFlowPayer(dic);
                        break;
                    #endregion
                    #region 查询附件
                    case "getflowattachedfile":
                        json = iwdg.get_GroupMoneyFlowAttachedFile(dic);
                        break;
                    #endregion
                    #region 查询财务金额
                    case "getmoney":
                        json = iwdg.get_item_money(dic);
                        break;
                    #endregion
                    #region 按条件查询财务金额
                    case "getsremoney":
                        dic["id"] = "%" + dic["id"].ToString() + "%";
                        dic["item_name"] = "%" + dic["item_name"].ToString() + "%";
                        json = iwdg.get_sre_item_money(dic);
                        break;
                    #endregion
                    #region 删除上传文件
                    case "delfile":
                              dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                              if (iwdg.del_FlowFile(dic))
                              {
                                  json = WanerDaoJSON.GetSuccessJson("");
                              }
                              else {
                                  json = WanerDaoJSON.GetErrorJson("");
                              }
                        break;
                    #endregion
                    #region 圈子发帖
                    case "addgroupdiscuss":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        dic.Add("id",Guid.NewGuid().ToString("N"));
                        i = iwdg.add_GroupDiscuss(dic);

                        if (i > 0)
                        {
                            AddOperation(dic["id"].ToString(), "85948946211d11e281f400ff8069d05e");
                            WanerDaoExperience.postGroupActivityScoreAdd(dic["group_id"].ToString());
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }

                        if (dic["blogclass"].ToString()!="")
                        {

                            IWanerDaoBlogManager pblog = new WanerDao2.WanerDaoBLL.Person.WanerDaoBlogManager() as IWanerDaoBlogManager;
                            Dictionary<string, object> blogdic = new Dictionary<string, object> ();
                            blogdic.Add("title", dic["subject"].ToString());
                            blogdic.Add("neirong", dic["content"].ToString());
                            blogdic.Add("tianqi", "");
                            blogdic.Add("weizhi", "");
                            blogdic.Add("quanxian",CommonContext.PublicPermission);// "d500f146912111e0bae500210044b80f");
                            blogdic.Add("cid", dic["blogclass"].ToString());
                            blogdic.Add("cname", dic["blogclassname"].ToString());
                            blogdic.Add("activeid","");
                            blogdic.Add("groupid", "");
                            blogdic.Add("infoid", "");
                            
                            pblog.AddPersonalBlog(blogdic);
                        }
                        //此处调用活动分享接口 
                        Dictionary<string, object> mydic = new Dictionary<string, object>() { 
                        {"id",WanerDaoGuid.GetGuid()},{"active_id",dic["activityclass"].ToString() },{"active_name",dic["activityclassname"].ToString()},
                        {"create_id",CommonContext.GetUserSecurityInfo().user_id},{"SUBJECT",dic["subject"].ToString()},{"content",dic["content"].ToString()}
                    };
                        WanerDao2.WanerDaoIBLL.ICommon.IWanerDaoCommon Icommon = new WanerDaoBLL.Common.WanerdaoCommon();

                        Icommon.personalLogShareToActivity(mydic);
                        break;
                    #endregion
                    #region 删除圈子发帖回复
                    case "delgroupreply":
                        i = iwdg.Del_GroupReply(dic);
                        if (i > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion

                    #region 圈子发帖回复
                    case "addgroupreply":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                        i = iwdg.add_GroupReply(dic);
                        if (i > 0)
                        {
                            json = WanerDaoJSON.GetSuccessJson("");
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion
                    #region 下拉参数获取
                    case "getselparam":
                        json = iwdg.GetGroupParamList(dic["param"].ToString());
                        break;
                    #endregion
                    #region 待处理下拉参数获取
                    case "getsysparam":
                        string p = "levelSysList";
                        string type = iwdg.Select_GroupInfoType(dic);
                        if (type == "f1da1c0f-125a-11e1-9997-000c295f9365" || type == "4d774f02-5ca5-11e1-b02d-101f74b66417")
                        {
                            p = "democraticSysList";
                        }
                        json = iwdg.GetGroupParamList(p);
                        break;
                    #endregion

                    #region 处理记录下拉参数获取
                    case "getrecordparam":
                        p = "levelrecordList";
                        type = iwdg.Select_GroupInfoType(dic);
                        if (type == "f1da1c0f-125a-11e1-9997-000c295f9365" || type == "4d774f02-5ca5-11e1-b02d-101f74b66417")
                        {
                            p = "democraticrecordList";
                        }
                        json = iwdg.GetGroupParamList(p);
                        break;
                    #endregion               
                    #region 发起事件
                    case "submitbudget":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);

                        Boolean isLevelstructure = true;
                        i = iwdg.create_budget(dic, ref isLevelstructure);
                        if (i > 0 && i <2000)
                        {
                            if (isLevelstructure)
                            {

                            }
                            else { 
                                
                            }
                            json = WanerDaoJSON.GetSuccessJson(i);
                        }
                        else
                        {
                            json = WanerDaoJSON.GetErrorJson("");
                        }
                        break;
                    #endregion

                    #region 查询民主结构设置
                    case "getgroupdemocratic":
                        json = iwdg.Select_GroupDemocratic(dic);
                       
                        break;
                    #endregion
                    #region 事件投票操作
                    case "eventopter":
                        dic.Add("user_id", CommonContext.GetUserSecurityInfo().user_id);
                       i =  iwdg.add_GroupEventVoteHistory(dic);
                       if (i > 0)
                       {
                           json = WanerDaoJSON.GetSuccessJson("");
                       }
                       else
                       {
                           json = WanerDaoJSON.GetErrorJson("");
                       }
                        break;
                    #endregion
                    #region 查询超级管理员或者执行管理员的全部圈子
                    case "allgroupforactivity":
                        DataTable _dt = iwdg.SelectAllGroupForActivity(CommonContext.GetUserSecurityInfo().user_id);
                    
                        break;
                    #endregion
                }

               
               
              //json = WanerDaoComponent.WanerDaoPrint.getPrintTemplete(null ,"demo"); ;//WanerDaoJSON.GetSuccessJson(WanerDaoPropertyPermission.get_DefaultPermission(user1).ToString());
            }
            context.Response.Write(json);
        }
        #endregion


        public void AddOperation(string object_id, string category_id)
        {
            IWanerDaoActionState iwdas = new WanerDao2.WanerDaoBLL.Index.WanerDaoActionState() as IWanerDaoActionState;
            WanerDaoModel.Index.UserOperationModel userOperate = new WanerDaoModel.Index.UserOperationModel();
            userOperate.id = Guid.NewGuid().ToString("N");
            userOperate.user_id = CommonContext.GetUserSecurityInfo().user_id;
            userOperate.action_category_id = category_id; 
            userOperate.option_id = "group";
            userOperate.object_id = object_id;
            userOperate.permission = CommonContext.PublicPermission;
            userOperate.ope_date = new DateTime();
            iwdas.AddUserOperation(userOperate);
        }


        /// <summary>
        /// 判断是否过期
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        private bool ifexpire(Dictionary<string, object> dic)
        {
           return iwdg.ifexpire(dic);

        }
    }
}