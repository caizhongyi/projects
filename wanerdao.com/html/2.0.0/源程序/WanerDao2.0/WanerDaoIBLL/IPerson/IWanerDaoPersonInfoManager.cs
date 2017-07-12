#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户个人资料相关接口
* 作者：杨晓东   时间：2011/10/2 0:34:05 
* 文件名：IWanerDaoPersonInfoManager 
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
using WanerDao2.WanerDaoModel.Person;

namespace WanerDao2.WanerDaoIBLL.IPerson
{
    public interface IWanerDaoPersonInfoManager
    {
        #region 个人名片卡

        /// <summary>
        /// 获取个人名片资料
        /// </summary>
        /// <returns></returns>
        string GetPersonNameCard();
        string GetPersonNameCard(Dictionary<string, object> dic);

        /// <summary>
        /// 设置个人名片资料
        /// </summary>
        /// <returns></returns>
        string SetPersonNameCard(Dictionary<string, object> dic);

        /// <summary>
        /// 获取个人名片model
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        PersonalNameCardModel GetPersonalNameCardModel(string userid);
        #endregion

        #region 个人基本信息

        /// <summary>
        /// 修改个人信息
        /// </summary>
        /// <param name="ppmodel">个人资料model</param>
        /// <returns></returns>
        String UpdatePersonalProfile(Dictionary<string, object> dic);
        bool UpdatePersonalProfile(PersonalProfileModel personalProfileModel);
        /// <summary>
        /// 获取个人基本信息Model
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        PersonalProfileModel GetPersonalProfileModel(string userid);
        PersonalProfileModel GetPersonalProfileModel();
        /// <summary>
        /// 根据账号查询个人基本信息
        /// </summary>
        /// <returns></returns>
        String GetPersonalProfile();

        String GetPersonalProfile(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 修改个人基本信息权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdatePersonalProfilePermission(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 是否能被站外搜索
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateIfCanBeOutManSearch(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 谁可以给用户发消息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateCanMsgToPermission(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 谁可以向用户发好友申请
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateCanSendFriendRequestPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 修改头像
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        bool UpdatePersonalLogo(string logo);

        /// <summary>
        /// 修改小头像
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        bool UpdatePersonalSmallLogo(string small_logo);
        #endregion

        #region Ajax更新获取个人名片卡
        /// <summary>
        /// 更新个人权限，是否被搜索到
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateNameCardVisible(Dictionary<string, object> dic);

        /// <summary>
        /// 获取个人名片卡星座信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string GetConstellation();
        /// <summary>
        /// 更新个人名片卡星座信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateConstellation(Dictionary<string, object> dic);

        /// <summary>
        /// 获取家乡信息
        /// </summary>
        /// <returns></returns>
        string GetHome();
        /// <summary>
        /// 更新家乡信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateHome(Dictionary<string, object> dic);

        /// <summary>
        /// 获取当前所在地
        /// </summary>
        /// <returns></returns>
        string GetCurrentPlace();
        /// <summary>
        /// 更新当前所在地
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateCurrentPlace(Dictionary<string, object> dic);

        /// <summary>
        /// Ajax获取学校信息
        /// </summary>
        /// <param name="dic">string school_typeid(学校类型id数字）,string keyword(关键字)</param>
        /// <returns>5条</returns>
        string AjaxGetBasicSchool(Dictionary<string, object> dic);

        /// <summary>
        /// Ajax获取专业信息
        /// </summary>
        /// <param name="dic">string keyword(关键字)</param>
        /// <returns>5条</returns>
        string AjaxGetBasicMajor(Dictionary<string, object> dic);

        /// <summary>
        /// Ajax获取单位名称信息
        /// </summary>
        /// <param name="dic">string keyword</param>
        /// <returns>5条</returns>
        string AjaxGetCompanyBasic(Dictionary<string, object> dic);

        /// <summary>
        /// Ajax获取职位名称信息
        /// </summary>
        /// <param name="dic">string keyword,parentid</param>
        /// <returns>5条</returns>
        string AjaxGetPositionBasic(Dictionary<string, object> dic);

        /// <summary>
        /// 获取学校信息
        /// </summary>
        /// <returns></returns>
        string GetSchool();
        /// <summary>
        /// 更新学校信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateSchool(Dictionary<string, object> dic);

        /// <summary>
        /// 获取工作信息
        /// </summary>
        /// <returns></returns>
        string GetWork();
        /// <summary>
        /// 更新工作信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateWord(Dictionary<string, object> dic);

        #endregion

        #region 个人教育信息

        ///// <summary>
        ///// 添加个人教育背景
        ///// </summary>
        ///// <param name="pemodel">个人教育背景model</param>
        ///// <returns></returns>
        //String AddPersonalEducation(Dictionary<string, object> dic);

        ///// <summary>
        ///// 修改个人教育背景
        ///// </summary>
        ///// <param name="pemodel"></param>
        ///// <returns></returns>
        //String DeletePersonalEducation(Dictionary<string, object> dic);

        /// <summary>
        /// 获取个人教育信息Model
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        IList<PersonalEducationModel> GetPersonalEducationModel(string userid);

        /// <summary>
        /// 查找用户个人教育背景
        /// </summary>
        /// <param name="dic">字典（userid）</param>
        /// <returns></returns>
        String SelectPersonalEducation();
        String SelectPersonalEducation(Dictionary<string, object> dic);
        /// <summary>
        /// 更新个人教育信息 update add delete
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string SetingEducationInfo(Dictionary<string, object> dic);

        /// <summary>
        /// 获取当前用户 教育权限
        /// </summary>
        /// <returns></returns>
        string GetEducationPermission();

        /// <summary>
        /// 王薪杰
        /// 修改 当前用户教育权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateEducationPermission(Dictionary<string, object> dic);
        #endregion

        #region 个人工作信息
        /// <summary>
        /// 获取个人工作背景
        /// </summary>
        /// <returns>json</returns>
        string SelectPersonalWork();

        string SelectPersonalWork(Dictionary<string, object> dic);

        /// <summary>
        /// 获取个人工作信息model
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        IList<PersonalWorkModel> GetPersonalWorkModel(string userid);

        /// <summary>
        /// 修改个人工作信息
        /// </summary>
        /// <param name="pwmodel">个人工作信息model</param>
        /// <returns></returns>
        String SetingPersonalWork(Dictionary<string, object> dic);

        /// <summary>
        /// 王薪杰
        /// 获取当前用户 工作权限
        /// </summary>
        /// <returns></returns>
        string GetWorkPermission();

        /// <summary>
        /// 王薪杰
        /// 修改 当前用户工作权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateWorkPermission(Dictionary<string, object> dic);

        /// <summary>
        /// 王薪杰
        /// 添加工作信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string AddPersonalWork(Dictionary<string, object> dic);

        /// <summary>
        /// 修改工作信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdatePersonalWork(Dictionary<string, object> dic);

        /// <summary>
        /// 删除个人工作信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string DeletePersonalWork(Dictionary<string, object> dic);

        /// <summary>
        /// 添加个人教育信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string AddPersonalEducation(Dictionary<string, object> dic);

        /// <summary>
        /// 修改个人教育信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdatePersonalEducation(Dictionary<string, object> dic);

        /// <summary>
        /// 删除教育信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string DeletePersonalEducation(Dictionary<string, object> dic);
        #endregion

        #region 个人兴趣爱好

        /// <summary>
        /// 获取兴趣爱好信息model
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        PersonalInterestsModel GetPersonalInterestsModel(string userid);

        /// <summary>
        /// 获取个人兴趣爱好
        /// </summary>
        /// <returns></returns>
        string GetPersonalInterests();
        string GetPersonalInterests(Dictionary<string, object> dic);

        /// <summary>
        /// 修改个人兴趣爱好信息
        /// </summary>
        /// <param name="pimodel">个人兴趣爱好信息model</param>
        /// <returns></returns>
        String UpdatePersonalInterests(Dictionary<string, object> dic);

        /// <summary>
        ///     王薪杰
        /// 修改当前用户兴趣爱好权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateInterestsPermission(Dictionary<string, object> dic);
        #endregion

        #region 个人联系信息

        /// <summary>
        /// 获取个人联系信息model
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        PersonalContactModel GetPersonalContactModel(string userid);

        /// <summary>
        /// 获取个人联系信息
        /// </summary>
        /// <returns></returns>
        string GetPersonalContact();
        string GetPersonalContact(Dictionary<string, object> dic);

        /// <summary>
        /// 修改个人联系信息
        /// </summary>
        /// <param name="pcmodel">个人联系信息模型</param>
        /// <returns></returns>
        String UpdatePersonalContact(Dictionary<string, object> dic);
        /// <summary>
        /// 修改个人联系信息
        /// </summary>
        /// <param name="newmodel">个人联系信息模型</param>
        /// <returns></returns>
        bool UpdatePersonalContact(PersonalContactModel newmodel);
        /// <summary>
        ///     王薪杰
        /// 修改当前用户联系方式权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        string UpdateContactPermission(Dictionary<string, object> dic);

        #region 设置为登陆账号
        string SettingSkypeToAccount();
        string SettingEmailToAccount();
        string SettingMSNToAccount();
        string SettingCellToAccount();
        #endregion

        #endregion

        #region 公有方法
        /// <summary>
        /// 获取资料完成度
        /// </summary>
        /// <returns></returns>
        string GetExp();
        /// <summary>
        /// 设置登录账号
        /// </summary>
        /// <param name="dic">string account</param>
        /// <returns></returns>
        string SetLoginAccount(Dictionary<string, object> dic);

        #endregion
    }
}
