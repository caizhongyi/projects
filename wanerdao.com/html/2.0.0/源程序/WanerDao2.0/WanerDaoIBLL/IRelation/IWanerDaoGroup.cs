using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Relation;
using System.Web;
using WanerDao2.WanerDaoModule.WanerDaoImage;
using System.Data;

namespace WanerDao2.WanerDaoIBLL.IRelation
{
    /// <summary>
    /// 描述:圈子类接口
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
   public  interface IWanerDaoGroup
    {
        /// <summary>
        /// 查询超级管理员或者执行管理员的全部圈子
        /// </summary>
        /// <param name="user_id">用户ID</param>
        /// <returns></returns>
       DataTable SelectAllGroupForActivity(string user_id);

       /// <summary>
       /// 判断圈子是否存在
       /// </summary>
       /// <param name="dic">圈子ID</param>
       /// <returns></returns>
       string ifexistgroup(Dictionary<string, object> dic);

        /// <summary>
        /// 查询用户参与的全部圈子
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        string  SelectAll_UserGroup(Dictionary<string, object> dic);

        /// <summary>
        /// 查询用户参与的全部圈子
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        DataTable SelectAll_UserGroupDT(Dictionary<string, object> dic);

       /// <summary>
       /// 好友参加的圈子
       /// </summary>
       /// <param name="dic">user_id</param>
       /// <returns></returns>
        string selectFriendGroup(Dictionary<string, object> dic);

        /// <summary>                
        /// 查询圈子人数
        /// </summary>
        /// <param name="dic">group_id</param>
        /// <returns></returns>
        string get_GroupInfoMember(Dictionary<string, object> dic);


       /// <summary>
        /// 创建圈子第一步，上传图片
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
        int ADD_TempGroupInformation(Dictionary<string, object> dic);

       /// <summary>
        /// 删除未创建的圈子的图片
       /// </summary>
       /// <param name="dic">用户ID</param>
       /// <returns></returns>
        int Delete_TempGroupInformation(Dictionary<string, object> dic);

        /// <summary>
        /// 踢出圈子
        /// </summary>
        /// <param name="dic">用户ID</param>
        /// <returns></returns>
        int Delete_GroupMember(Dictionary<string, object> dic);


        /// <summary>
        /// 删除圈子发帖
        /// </summary>
        /// <param name="dic">ID</param>
        /// <returns></returns>
        int Del_GroupDiscuss(Dictionary<string, object> dic);

        /// <summary>
        /// 删除圈子发帖回复
        /// </summary>
        /// <param name="dic">ID</param>
        /// <returns></returns>
        int Del_GroupReply(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子分类
        /// </summary>
        /// <param name="dic">语言号</param>
        /// <returns></returns>
        string SelectAll_GroupCategory(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子基础类型
        /// </summary>
        /// <param name="dic">语言号</param>
        /// <returns></returns>
        string Select_groupmanagetype(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子类型
        /// </summary>
        /// <param name="dic">圈子ID</param>
        /// <returns></returns>
        string Select_GroupInfoType(Dictionary<string, object> dic);

        /// <summary>
        /// 创建圈子
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        int ADD_GroupInformation(Dictionary<string, object> dic);


        /// <summary>
        /// 删除圈子
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        int del_Group(Dictionary<string, object> dic);


        /// <summary>
        /// 退出圈子
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        int quit_Group(Dictionary<string, object> dic);


       /// <summary>
       /// 判断是否为圈子成员
       /// </summary>
       /// <param name="dic">圈子ID；用户ID</param>
       /// <returns></returns>
        string ifGroupMember(Dictionary<string, object> dic);

        /// <summary>
        /// 查询用户角色
        /// </summary>
        /// <param name="dic">圈子ID；用户ID</param>
        /// <returns></returns>
        string Select_UserRole(Dictionary<string, object> dic);

        /// <summary>
        /// 查询用户角色图标
        /// </summary>
        /// <param name="dic">圈子ID；用户ID</param>
        /// <returns></returns>
        string Select_UserRoleImg(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子信息
        /// </summary>
        /// <param name="dic">group_id</param>
        /// <returns></returns>
        string Select_GroupInfo(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子某种角色名
        /// </summary>
        /// <param name="dic">圈子ID;查询某种角色ID</param>
        /// <returns></returns>
        string Select_GroupNormalManage(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子保护时限
        /// </summary>
        /// <param name="dic">语言号;</param>
        /// <returns></returns>
        IList<GroupModel> Select_GroupKickDuration(Dictionary<string, object> dic);

        /// <summary>
        /// 加入圈子
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        int Join_GroupInformation(Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子全部成员
        /// </summary>
        /// <param name="dic">圈子号;</param>
        /// <returns></returns>
        IList<GroupModel> Select_GroupAllMember(Dictionary<string, object> dic);

        /// <summary>
        /// 修改圈子(层次结构)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        int Edit_GroupInformation(Dictionary<string, object> dic);

        /// <summary>
        /// 修改圈子(层次结构转民主制度)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
       // int Edit_GroupToDemocratic(Dictionary<string, object> dic, List<Dictionary<string, object>> l);


        /// <summary>
        /// 用户具有的圈子事件
        /// </summary>
        /// <param name="dic">圈子号;权限号;管理结构</param>
        /// <returns></returns>
        IList<GroupModel> Select_RoleEventRules(Dictionary<string, object> dic);


        /// <summary>
        /// 读取圈子列表参数
        /// </summary>
        /// <param name="param">参数</param>
        /// <returns></returns>
        string  GetGroupParamList(string param);


        /// <summary>
        /// 发起事件
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        int Add_GroupEventRecords(Dictionary<string, object> dic);


       /// <summary>
       /// 拒绝加入圈子
       /// </summary>
       /// <param name="dic">圈子ID，用户ID</param>
       /// <returns></returns>
        int Refused_joinGroup(Dictionary<string, object> dic);

        /// <summary>
        /// 职位变更
        /// </summary>
        /// <param name="dic">圈子ID，用户ID；角色ID；角色名</param>
        /// <returns></returns>
        int Update_GroupRole(Dictionary<string, object> dic);

       /// <summary>
       /// 圈子发帖
       /// </summary>
        /// <param name="dic">group_id：圈子ID，post_id：发表人ID，subject:主题，content：内容</param>
       /// <returns></returns>
        int add_GroupDiscuss(Dictionary<string, object> dic);

        /// <summary>
        /// 圈子发帖回复
        /// </summary>
        /// <param name="dic">group_id：圈子ID，post_id：发表人ID，subject:主题，content：内容</param>
        /// <returns></returns>
        int add_GroupReply(Dictionary<string, object> dic);

       /// <summary>
       /// 活动相关圈子总数
       /// </summary>
        /// <param name="dic">category_name:分类名称</param>
       /// <returns></returns>
        int searchGroupRelateActivityCount(Dictionary<string, object> dic);

        /// <summary>
        /// 描述 上传圈子图片
        /// <param name="httpPosteFile">上传文件请求流</param>
        /// <param name="dic">dic包含信息：
        /// user_id：用户ID
        /// </summary>
        /// <returns></returns>
        WanerDaoUploadImageResult WanerDaoUploadImageFile(HttpPostedFile postedImageFile, Dictionary<string, object> dic);

        /// <summary>
        /// 描述 圈子文件上传
        /// <param name="httpPosteFile">上传文件请求流</param>
        /// <param name="dic">dic包含信息：
        /// user_id：用户ID
        /// </summary>
        /// <returns></returns>
        WanerDaoUploadImageResult WanerDaoUploadFile(HttpPostedFile postedImageFile, Dictionary<string, object> dic);

        /// <summary>
        /// 查询圈子中的个人信息
        /// </summary>
        /// <param name="dic">group_id,user_id</param>
        /// <returns></returns>
        string searchGroupMember(Dictionary<string, object> dic);

       /// <summary>
       /// 判断会员是否过期
       /// </summary>
        /// <param name="dic">group_id,user_id</param>
       /// <returns></returns>
        bool ifexpire(Dictionary<string, object> dic);

       /// <summary>
       /// 判断是否可以加入圈子
       /// </summary>
       /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
        bool ifCanJoin(Dictionary<string, object> dic);

       /// <summary>
       /// 获取圈子个人设置
       /// </summary>
       /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
        string get_PersonalGroupSettings(Dictionary<string, object> dic);

       /// <summary>
       /// 修改圈子设置
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
        int update_GroupSetting(Dictionary<string, object> dic);

        /// <summary>
        /// 获取圈子特例用户
        /// </summary>
        /// <param name="dic">user_id,group_id</param>
        /// <returns></returns>
        string get_GroupMsgExceptionList(Dictionary<string, object> dic);

        /// <summary>
        /// 更新圈子特例用户
        /// </summary>
        /// <param name="dic">user_id,group_id</param>
        /// <returns></returns>
        int update_GroupMsgExceptionList(Dictionary<string, object> dic);

       /// <summary>
       /// 批准加入圈子
       /// </summary>
        /// <param name="dic">user_id,group_id</param>
       /// <returns></returns>
        int AgreedJoin_GroupInformation(Dictionary<string, object> dic);

       /// <summary>
       /// 添加流水账
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
        int add_GroupMoneyFlow(Dictionary<string, object> dic);

        /// <summary>
        /// 删除上传文件
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        bool del_FlowFile(Dictionary<string, object> dic);

        /// <summary>
        /// 查询执行人
        /// </summary>
        /// <param name="dic">flow_id</param>
        /// <returns></returns>
        string get_GroupMoneyFlowPayer(Dictionary<string, object> dic);

        /// <summary>
        /// 查询附件
        /// </summary>
        /// <param name="dic">flow_id</param>
        /// <returns></returns>
        string get_GroupMoneyFlowAttachedFile(Dictionary<string, object> dic);

        /// <summary>
        /// 查询财务金额
        /// </summary>
        /// <param name="dic">group_id</param>
        /// <returns></returns>
        string get_item_money(Dictionary<string, object> dic);

        /// <summary>
        /// 按条件查询财务金额
        /// </summary>
        /// <param name="dic">group_id,id,item_name</param>
        /// <returns></returns>
        string get_sre_item_money(Dictionary<string, object> dic);

        /// <summary>
        /// 按角色取事件权限
        /// </summary>
        /// <param name="dic">group_id,id,item_name</param>
        /// <returns></returns>
        string get_event(Dictionary<string, object> dic);

       /// <summary>
       /// 发起收支预算事件
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
        int create_budget(Dictionary<string, object> dic, ref  Boolean isLevelstructure);

       /// <summary>
        /// 查询民主结构设置
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
        string Select_GroupDemocratic(Dictionary<string, object> dic);

       /// <summary>
        /// 事件投票操作
       /// </summary>
       /// <param name="dic"></param>
       /// <returns></returns>
        int add_GroupEventVoteHistory(Dictionary<string, object> dic);
    }
}
