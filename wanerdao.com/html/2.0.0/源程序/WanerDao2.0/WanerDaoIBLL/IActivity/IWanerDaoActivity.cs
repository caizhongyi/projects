#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 玩儿道2.0项目里面的所有活动插件或者控件调用本接口定义的函数
* 作者：徐兵   时间：2011-11-13
* 文件名：Interface1 
* 版本：V2.0 
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
using WanerDao2.WanerDaoModel.Activity.Common;
using WanerDao2.WanerDaoModel.Activity.ActivityCreate;
using WanerDao2.WanerDaoModel.Activity.ActivitySignUp;
using WanerDao2.WanerDaoModel.Activity.ActivitySetting;
using WanerDao2.WanerDaoModel.Activity.ActivityManage;
using WanerDao2.WanerDaoModel.Activity.ActivitySearch;
using WanerDao2.WanerDaoModule.Weather;

namespace WanerDao2.WanerDaoIBLL.IActivity
{
    public  interface IWanerDaoActivity
    {

        #region 活动查询
        /// <summary>
        /// 描述：通过活动ID获取某活动的详细信息
        /// 作者:徐兵
        /// 时间：2011-10-22
        /// </summary>
        /// <param name="dic">里面包含这些元素：id
        /// </param>
        /// <returns>JSON格式的数据{msg:活动信息}</returns>
        string WanerDaoGetActivityDetailsInfoByID(Dictionary<string, object> dic);
        /// <summary>
        /// 根据指定的日期查询每日活动数目
        /// </summary>
        /// <param name="beginDate"></param>
        /// <param name="lenth"></param>
        /// <returns></returns>
        string SelectActivityCountByDate(DateTime beginDate, int length);
        /// <summary>
        /// 返回指定数量最新、距离最近的活动
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        string GetNewestAndNearestActivity(int count);
        #endregion

        #region 活动地图
        /// <summary>
        /// 地图活动查找
        /// </summary>
        /// <param name="mapSearche">查找参数</param>
        /// <returns></returns>
        string SearchActivityMap(MapSearch mapSearche);

        #endregion

        #region 对应页面查询的方法
        /// <summary>
        /// activity_index页面
        /// </summary>
        /// <param name="dic">包含 id:活动ID</param>
        /// <returns></returns>
        string GetActivityIndexPage(Dictionary<string, object> dic);
        /// <summary>
        /// Activity_define页面
        /// </summary>
        /// <param name="section_id"></param>
        /// <returns></returns>
        string GetActivityDefineTotalPage(string section_id);
        #endregion

        #region 活动信息
        /// <summary>
        /// 添加活动
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        bool AddSimpleActivity(activity activity);
        //bool AddPersonCreateActivity(activity activity,
        /// <summary>
        /// 创建活动
        /// </summary>
        /// <param name="activityCreateMain"></param>
        /// <returns></returns>
        string AddActivity(ActivityCreateMain activityCreateMain);
        /// <summary>
        /// 按照活动ID查找活动详细信息
        /// </summary>
        /// <returns></returns>
        activity SearchActivityByID(string id);

        /// <summary>
        /// 获取活动主要信息
        /// </summary>
        /// <param name="activityId">活动ID</param>
        /// <returns></returns>
        string GetActivityMainInfoForJson(string activityId);
        /// <summary>
        /// 修改活动主要信息
        /// </summary>
        /// <param name="activityMainInfo">活动主要信息</param>
        /// <returns></returns>
        string UpdateActivityMainInfo(ActivityMainInfo activityMainInfo);

        #endregion

        #region 活动管理
        /// <summary>
        /// 获取活动管理中的活动计划
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        string GetActivityPlanManageForJson(string activityId);
        /// <summary>
        /// 修改活动管理中的活动计划
        /// </summary>
        /// <param name="activityPlanJson"></param>
        /// <returns></returns>
        string UpdageActivityPlanJson(ActivityPlanJson activityPlanJson);

        /// <summary>
        /// 获取活动权限（当前用户）
        /// </summary>
        /// <param name="activityID"></param>
        /// <returns></returns>
        string GetActivityMemberRoleKeyValueJson(string activityID);
        /// <summary>
        /// 获取活动权限
        /// </summary>
        /// <param name="activityID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        string GetActivityMemberRoleKeyValueJson(string activityID, string userID);

        /// <summary>
        /// 获取活动天气预报
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        string GetActivityWeatherInfoJson(string activityId);

        /// <summary>
        /// 添加活动成员
        /// </summary>
        /// <param name="activityMember"></param>
        /// <returns></returns>
        bool AddSimpleActivityMember(activitymember activityMember);

        /// <summary>
        /// 活动报名
        /// </summary>
        /// <param name="_signupmain"></param>
        /// <returns></returns>
        string ActivitySignUp(signupmain _signupmain);
        /// <summary>
        /// 验证用户报名条件
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <returns></returns>
        string VerifyActivitySignUp(string activityid);
        /// <summary>
        /// 验证用户报名条件
        /// </summary>
        /// <param name="activityid">活动ID</param>
        /// <param name="userid"></param>
        /// <returns></returns>
        string VerifyActivitySignUp(string activityid, string userid);
        /// <summary>
        /// 获取活动自主叫价费用列表
        /// </summary>
        /// <param name="activity_id"></param>
        /// <returns></returns>
        string GetGroupCarpoolMoney(string activity_id);
        /// <summary>
        /// 添加加入活动条件
        /// </summary>
        /// <param name="activityJoinConditions"></param>
        /// <returns></returns>
        bool AddActivityJoinConditions(activityjoinconditions activityJoinConditions);
        /// <summary>
        /// 根据活动ID查找加入活动条件
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        List<activityjoinconditions> SelectActivityJoinconditionsByActivityID(string activityId);


        /// <summary>
        /// 修改个人活动设置
        /// </summary>
        /// <param name="_settingJson"></param>
        /// <returns></returns>
        string UpdatePersongActivitySettings(PersonActivitySettingsJson _settingJson);
        /// <summary>
        /// 查询个人活动设置 JSON
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        string GetPersongActivitySettingsJosnForJson(string activityId, string userId);
        /// <summary>
        /// 查询个人活动设置订阅周期 JSON
        /// </summary>
        /// <returns></returns>
        string GetPersongActivitySettingsPeriod();

        #endregion

        #region 活动计划

        /// <summary>
        /// 添加活动计划
        /// </summary>
        /// <param name="activityPlan"></param>
        /// <returns></returns>
        bool AddActivityPlan(activityplan activityPlan);
        /// <summary>
        /// 添加活动多个计划
        /// </summary>
        /// <param name="activityPlan"></param>
        /// <returns></returns>
        bool AddActivityPlan(List<activityplan> activityPlan);
        /// <summary>
        /// 按照活动ID查找活动活动计划
        /// </summary>
        /// <returns></returns>
        List<activityplan> SelectActivityPlanByActivityID(string activityId);

        #endregion

        #region 活动成员

        #region 业务
        /// <summary>
        /// 获取活动成员键值对 id:活动成员主键ID， name:成员名字
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        string GetActivityMemberKeyValue(string activityId);
        /// <summary>
        /// 获取活动成员键值对 id:成员用户ID， name:成员名字
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        string GetActivityMemberUserKeyValue(string activityId);
        /// <summary>
        /// 活动退出
        /// </summary>
        /// <param name="activityID">活动ID</param>
        /// <param name="userID">用户ID</param>
        /// <param name="reason">原因</param>
        /// <param name="superUserID">接班人</param>
        /// <param name="optType">optType 0:退出，1：解散</param>
        /// <returns></returns>
        string SignOutActivity(string activityID, string userID, string reason, string superUserID, string optType);
        string GetUserJoinActivityPath(string acitivtyid);
        string GetUserJoinActivityPath(string acitivtyid, string userid);

        /// <summary>
        /// 获取某车主搭车信息统计
        /// </summary>
        /// <param name="user_id"></param>
        /// <param name="activity_id"></param>
        /// <returns></returns>
        string GetCarOwerCustomTotal(string user_id, string activity_id);

        #endregion
        #endregion

        #region 活动支付方式

        #region 业务
        string GetActivityPayMethodsByIDForJson(string id);
        string GetActivityPayMethodsJson(string activityID);
        string GetGetActivityPayMethodsJson(string activityID, string userID);

        #endregion

        bool AddActivityPayMethods(ActivityPayMethods activityPayMethods);
        List<ActivityPayMethods> SelectActivityPayMethods(string activityID, string userID);
        ActivityPayMethods SelectActivityPayMethods(string id);

        #endregion

        #region 预算
        /// <summary>
        /// 查询预算和收支额度统计
        /// </summary>
        /// <param name="activityid"></param>
        /// <returns></returns>
        string SelectBudgetSumAndFlowSum(string activityid);
        /// <summary>
        /// 添加预算
        /// </summary>
        /// <param name="budgetManage"></param>
        /// <returns></returns>
        string AddActivityBudget(ActivityBudgetManage budgetManage);
        /// <summary>
        /// 查找某条预算
        /// </summary>
        /// <param name="budgetID"></param>
        /// <returns></returns>
        string GetActivityBudgetManageForJson(string budgetID);
        /// <summary>
        /// 修改某条预算
        /// </summary>
        /// <param name="budgetManage"></param>
        /// <returns></returns>
        string UpdateActivityBudget(ActivityBudgetManage budgetManage);

        /// <summary>
        /// 添加预算
        /// </summary>
        /// <param name="activityBudget">预算内容</param>
        ///  <param name="activityBudgetOpe">预算人</param>
        /// <returns></returns>
        bool AddActivityBudget(activitybudget activityBudget, activitybudgetope activityBudgetOpe);

        /// <summary>
        /// 添加预算
        /// </summary>
        /// <param name="activityBudget"></param>
        /// <returns></returns>
        bool AddActivityBudget(activitybudget activityBudget);

        bool DeleteActivityBudget(string id);
        /// <summary>
        /// 添加预算
        /// </summary>
        /// <param name="listActivityBudget"></param>
        /// <returns></returns>
        bool AddActivityBudget(List<activitybudget> listActivityBudget);

        /// <summary>
        /// 按照活动ID查找活动活动预算
        /// </summary>
        /// <returns></returns>
        List<activitybudget> SelectActivityBudgetByActivityID(string activityId);

        /// <summary>
        /// 添加活动预算制定人
        /// </summary>
        /// <param name="activityBudgetOpe"></param>
        /// <returns></returns>
        bool AddActivityBudgetOpe(activitybudgetope activityBudgetOpe);

        #endregion

        #region//预算执行人员

        #region 业务
        /// <summary>
        /// 预算项执行人员
        /// </summary>
        /// <param name="budgetID"></param>
        /// <returns></returns>
        string GetBudgetOpeKeyValueByBudgetID(string budgetID);

        #endregion
        #endregion

        #region 实际收支项
        /// <summary>
        /// 添加实际收支项
        /// </summary>
        /// <param name="moneyFlowManage"></param>
        /// <returns></returns>
        string AddActivityMoneyFlow(ActivityMoneyFlowManage moneyFlowManage);

        /// <summary>
        /// 查找某条实际收支项
        /// </summary>
        /// <param name="budgetID"></param>
        /// <returns></returns>
        string GetActivityMoneyFlowManageForJson(string budgetID);

        /// <summary>
        /// 修改某条实际收支项
        /// </summary>
        /// <param name="moneyFlowManage"></param>
        /// <returns></returns>
        string UpdateActivityMoneyFlow(ActivityMoneyFlowManage moneyFlowManage);

        #endregion

        #region 实际收支项执行人员

        #region 业务
        /// <summary>
        /// 实际收支项执行人员 键值对： id：人员ID name:用户名字
        /// </summary>
        /// <param name="moneyFlowID"></param>
        /// <returns></returns>
        string GetMoneyFlowOpeKeyValueByMoneyFlowID(string moneyFlowID);

        #endregion
        #endregion

        #region 付款人员

        #region 业务
        /// <summary>
        /// 付款人员 键值对： id：成员表ID name:用户名字
        /// </summary>
        /// <param name="moneyFlowID"></param>
        /// <returns></returns>
        string GetMoneyFlowPayerKeyValueByMoneyFlowID(string moneyFlowID);

        #endregion

        #endregion



        #region 活动分类
        /// <summary>
        /// 添加活动分类
        /// </summary>
        /// <param name="activitycategory"></param>
        /// <returns></returns>
        bool AddActivitycategory(activitycategory activitycategory);
        /// <summary>
        /// 添加活动分类
        /// </summary>
        /// <param name="listActivityBudget"></param>
        /// <returns></returns>
        bool AddActivitycategory(List<activitycategory> listActivityBudget);
        /// <summary>
        /// 根据活动ID获取活动分类
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        List<activitycategory> SelectActivitycategoryByActivityID(string activityId);
        #endregion


        #region 活动分类参数 ActivityCategorySettings
        /// <summary>
        /// 活动分类  ActivityCategorySettings
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        activitycategorysettings SelectActivityCategorySettingsByID(string id);
        List<activitycategorysettings> SelectActivityCategorySettingsTop();
        activitycategorysettings SelectActivityCategorySettingsParent(string id);
        string ConvertActivityCategorySettingsToJson(List<activitycategorysettings> _list);
        List<activitycategorysettings> SelectActivityCategorySettingsUpperLayer(string id);
        List<activitycategorysettings> SelectActivityCategorySettingsChild(string id);
        List<activitycategorysettings> SelectAllActivityCategorySettings();

        #endregion

        #region//活动页面分类 activitysectionpage
        activitysectionpage SelectActivitySectionPageByID(string id);
        #endregion
         /// <summary>
        /// 活动回复表-查询指定的记录数
        /// 作者：王渝友 时间：2012-2-15
        /// </summary>
        /// <param name="dic">前台获取数据集合</param>
        /// <returns></returns>
        string SearchAtivitycommentsGetlimit(Dictionary<string, object> dic);

        #region 各类型查询
        /// <summary>
        /// 根据活动参数ID获取活动创建参数
        /// </summary>
        /// <param name="personActivityarchivesId"></param>
        /// <returns></returns>
        string GetActivityParamByPersonActivityarchivesID(string personActivityarchivesId);
        /// <summary>
        /// 根据活动ID获取活动创建参数
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        string GetActivityParamByActivityID(string activityId);
        /// <summary>
        /// 为活动创建获取活动参数 JSON
        /// </summary>
        /// <returns></returns>
        string GetKeyValueActivityParamByUserID();
        /// <summary>
        /// 获取用户创建的活动参数 JSON
        /// </summary>
        /// <returns></returns>
        string GetKeyValuePersonalActivityArchivesParam();
        /// <summary>
        /// 根据活动参数ID获取
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        personalactivityarchives SelectPersonalActivityArchivesByID(string id);
        /// <summary>
        /// 根据角色ID查询角色名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectRoleNameById(string id);
        /// <summary>
        /// 根据角色ID查询角色信息
        /// </summary>
        /// <returns></returns>
        activityrole SelectActivityRoleById(string id);
        /// <summary>
        /// 查询所有角色信息
        /// </summary>
        /// <returns></returns>
        List<activityrole> SelectAllActivityRole();
        /// <summary>
        /// 获取角色ID与名字JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllActivityRole();

        /// <summary>
        /// 根据报名方式ID查询方式名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectSignUpTypeNameById(string id);
        /// <summary>
        /// 根据报名方式ID查询信息
        /// </summary>
        /// <returns></returns>
        activitysignuptype SelectSignUpTypeById(string id);
        /// <summary>
        /// 查询所有报名方式信息
        /// </summary>
        /// <returns></returns>
        List<activitysignuptype> SelectAllSignUpType();
        /// <summary>
        /// 获取报名方式ID与名字JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllSignUpType();



        /// <summary>
        /// 活动创建个人信息
        /// </summary>
        /// <returns></returns>
        string GetCreateactivityPersonalinfo();
        /// <summary>
        /// 发起活动者类型 圈子或者个人  ActivityCreateType
        /// </summary>
        /// <returns></returns>
        string GetActivityCreateType();
        /// <summary>
        /// 发起活动者类型 圈子或者个人
        /// </summary>
        /// <returns></returns>
        List<activitycreatetype> SelectAllActivityCreateType();
        /// <summary>
        /// 以圈子名义发起活动获取圈子
        /// </summary>
        /// <returns></returns>
        string GetkevaluecreateActivitybygroup();  
        /// <summary>
        /// 活动周期定制  一次性（默认），订制固定周期，订制浮动周期
        /// </summary>
        /// <returns></returns>
        string GetkeyvalueActivityduration();
        /// <summary>
        /// 间隔周期 每天，每周（默认），每月，每季度，每年
        /// </summary>
        /// <returns></returns>
        string GetkeyvalueActivityIntervalDuration();
        /// <summary>
        /// 创建形式 直接创建活动（默认），通知创建人同意后，活动创建
        /// </summary>
        /// <returns></returns>
        string GetkeyvalueCreateMode();
        /// <summary>
        /// 发送email周期性  ActivityEmailDuration
        /// </summary>
        /// <returns></returns>
        string GetActivityEmailDuration();
        /// <summary>
        /// 发送email周期性
        /// </summary>
        /// <returns></returns>
        List<activityemailduration> SelectAllActivityEmailDuration();

        #region 活动地址类型 activityplacecategory

        /// <summary>
        /// 活动地址类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        activityplacecategory SelectActivityPlaceCategoryByID(string id);
        /// <summary>
        /// 获取顶级分类，活动地址类型
        /// </summary>
        /// <returns></returns>
        List<activityplacecategory> SelectActivityPlaceCategoryTop();
        /// <summary>
        /// 获取分类ID制定父分类，活动地址类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        activityplacecategory SelectActivityPlaceCategoryParent(string id);
        /// <summary>
        /// 将 Activityplacecategory 转换成JSON输出
        /// </summary>
        /// <param name="_list"></param>
        /// <returns></returns>
        string ConvertActivityPlaceCategoryToJson(List<activityplacecategory> _list);
        /// <summary>
        /// 获取分类ID的父分类，活动地址类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<activityplacecategory> SelectActivityPlaceCategoryUpperLayer(string id);
        /// <summary>
        /// 获取分类ID的子分类，活动地址类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<activityplacecategory> SelectActivityPlaceCategoryChild(string id);
        /// <summary>
        /// 活动地址类型
        /// </summary>
        /// <returns></returns>
        List<activityplacecategory> SelectAllActivityPlaceCategory();

        #endregion

        /// <summary>
        /// 根据活动地址分类查询所有地址
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        string GetActivityPlaceByCategoryID(string categoryId);

        /// <summary>
        /// 踢人保护时限  ActivityKickDuration
        /// </summary>
        /// <returns></returns>
        string GetkeyvalueActivityKickDuration();
        /// <summary>
        /// 踢人保护时限
        /// </summary>
        /// <returns></returns>
        List<activitykickduration> SelectAllActivityKickDuration();


        /////////////////////////////////////////////////////////////

        #region activityCommon
        /// <summary>
        /// 根据交通方式ID查询交通名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectVehicleTypeNameById(string id);
        /// <summary>
        /// 根据交通方式ID查询信息
        /// </summary>
        /// <returns></returns>
        activityvehicletype SelectVehicleTypeById(string id);
        /// <summary>
        /// 查询所有交通方式信息
        /// </summary>
        /// <returns></returns>
        List<activityvehicletype> SelectAllVehicleType();
        /// <summary>
        /// 交通方式ID和名字 JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllVehicleType();

        /// <summary>
        /// 根据付费方式ID查询付费名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectPayTypeNameById(string id);
        /// <summary>
        /// 根据付费方式ID查询信息
        /// </summary>
        /// <returns></returns>
        paytype SelectPayTypeById(string id);
        /// <summary>
        /// 查询所有付费方式信息
        /// </summary>
        /// <returns></returns>
        List<paytype> SelectAllPayType();
        /// <summary>
        /// 获取付费方式的ID和名字 JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllPayType();

        /// <summary>
        /// 根据搭车付费方式ID查询付费名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectCarPoolTypeNameById(string id);
        /// <summary>
        /// 根据搭车付费方式ID查询信息
        /// </summary>
        /// <returns></returns>
        carpooltype SelectCarPoolTypeById(string id);
        /// <summary>
        /// 查询所有搭车付费方式信息
        /// </summary>
        /// <returns></returns>
        List<carpooltype> SelectAllCarPoolType();
        /// <summary>
        /// 获取所有搭车付费ID和名称 JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllCarPoolType();

        /// <summary>
        /// 根据车品牌类型ID查询品牌名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectAutoBrandNameById(string id);
        /// <summary>
        /// 根据车品牌类型ID查询信息
        /// </summary>
        /// <returns></returns>
        autobrand SelectAutoBrandById(string id);
        /// <summary>
        /// 查询所有车品牌类型信息
        /// </summary>
        /// <returns></returns>
        List<autobrand> SelectAllAutoBrand();
        /// <summary>
        /// 获取所有汽车品牌ID和名称 JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllAutoBrand();

        /// <summary>
        /// 根据车型号ID查询型号名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectAutoModelNameById(string id);
        /// <summary>
        /// 根据车型号ID查询信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        automodel SelectAutoModelById(string id); 
        /// <summary>
        /// 根据车品牌ID查询所有车型号
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<automodel> SelectAllAutoModelByBrandId(string id);
        /// <summary>
        /// 根据品牌ID获取所有汽车型号ID和名称 JSON数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string GetKeyValueJsonAllAutoModelByBrandId(string id);
        /// <summary>
        /// 查询所有车型号
        /// </summary>
        /// <returns></returns>
        List<automodel> SelectAllAutoModel();
        /// <summary>
        /// 获取所有汽车型号ID和名称 JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllAutoModel();

        /// <summary>
        /// 查询所有加入条件信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string SelectJoinConditionsNameById(string id); 
        /// <summary>
        /// 根据加入条件ID查询信息
        /// </summary>
        /// <returns></returns>
        joinconditions SelectJoinConditionsById(string id); 
        /// <summary>
        /// 查询所有加入条件信息
        /// </summary>
        /// <returns></returns>
        List<joinconditions> SelectAllJoinConditions();
        /// <summary>
        /// 获取所有加入条件ID和名称 JSON数据
        /// </summary>
        /// <returns></returns>
        string GetKeyValueJsonAllJoinConditions();

        #endregion

        #endregion

        #region 天气预报
        /// <summary>
        /// 获取天气预报
        /// </summary>
        /// <param name="cityName"></param>
        /// <returns></returns>
        WeatherInfo GetWeatherInfo(string cityName);
        /// <summary>
        /// 获取天气预报 JSON
        /// </summary>
        /// <param name="cityName"></param>
        /// <returns></returns>
        string GetWeatherInfoJson(string cityName);
        #endregion

        #region  活动评价
        /// <summary>
        /// 判断当前用户是否已经投票
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        bool IsEvaluateActivity(string activityId);
        /// <summary>
        /// 评价活动
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="evaluateflag">1;不喜欢,2:一般般,3:</param>
        /// <returns></returns>
        bool EvaluateActivity(string activityId, int evaluateflag);
        /// <summary>
        /// 统计活动评价
        /// </summary>
        /// <param name="activityId"></param>
        /// <returns></returns>
        string GetActivityEvaluateTotal(string activityId);

        /// <summary>
        /// 活动评价
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="user_id"></param>
        /// <param name="evaluateFlag">1;喜欢,2:一般般,3:不喜欢</param>
        /// <returns></returns>
        bool UpdateActivityMemberEvaluate(string activityId, string user_id, int evaluateFlag);
        #endregion

        #region
        /// <summary>
        /// 获取用户地址信息
        /// </summary>
        /// <returns></returns>
        string GetUserAddressInfo();
        /// <summary>
        /// 更新用户地址信息
        /// </summary>
        /// <param name="dic">
        /// address
        /// country_id
        /// state_id
        /// city_id
        /// zip
        /// </param>
        /// <returns></returns>
        string SetUserAddressInfo(Dictionary<string, object> dic);
        #endregion

        /// <summary>
        /// 获取登录用户参加的历史活动数目
        /// 作者：王渝友 时间：20120308
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string GetHistoryActivityCount(Dictionary<string, object> dic);

        /// <summary>
        /// 活动设置
        /// 作者：王渝友
        /// </summary>
        /// <param name="dic">前台获取参数</param>
        /// <param name="sqlMapped">查询sql映射
        /// sqlMapped=ActivitySetting：活动设置查询
        /// sqlMapped=getjoinActivityUser：获取参加活动的用户
        /// sqlMapped=getActivityMsgExceptionList：获取活动的例外名单
        /// </param>
        /// <returns></returns>
        string GetActivitySetting(Dictionary<string, object> dic, string sqlMapped);


        /// <summary>
        /// 保存更新活动设置
        /// 作者：王渝友
        /// </summary>
        /// <param name="dic">前台获取参赛</param>
        string SaveActivitySetting(Dictionary<string, object> dic);

        /// <summary>
        /// 修改相片信息
        /// 作者：王渝友
        /// </summary>
        /// <param name="dic">前台获取参赛</param>
        string UpdateActivityImage(Dictionary<string, object> dic);

        /// <summary>
        /// 保存回复内容
        /// 作者：王渝友
        /// </summary>
        /// <param name="dic">前台获取参赛</param>
        /// <returns></returns>
        string InsertActivityComments(Dictionary<string, object> dic);

         /// <summary>
        ///查找活动预算
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SearchActivityBudgetbyActivityid(Dictionary<string, object> dic);
        /// <summary>
        /// 效验授权
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string CheckAuthorization(Dictionary<string, object> dic);
        string SetUserContactInfo(Dictionary<string, object> dic);
    }
}
