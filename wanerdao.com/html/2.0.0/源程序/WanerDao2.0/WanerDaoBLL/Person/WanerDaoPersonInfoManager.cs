#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/10/26 21:34:23 
* 文件名：WanerDaoPersonInfoManager 
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
using WanerDao2.WanerDaoIBLL.IPerson;
using WanerDao2.WanerDaoModel.Person;
using WanerDao2.WanerDaoDALFactory;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Validation;
using WanerDao2.WanerDaoModule.WanerDaoGuid;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoBLL.Person
{
    public class WanerDaoPersonInfoManager : IWanerDaoPersonInfoManager
    {
        private readonly string basicKey = "PersonalProfile_";
        private readonly string educationKey = "PersonalEducation_";
        private readonly string contactKey = "PersonalContact_";
        private readonly string workKey = "PersonalWork_";
        private readonly string interestsKey = " PersonalInterests_";
        private readonly string nameCardKey = "PersonalNameCard_";

        IWanerDaoPersonSecurity ps = new WanerDaoPersonSecurity();
        PersonalSecurityProfileModel pspmodel;
        WanerDaoCacheManager.ICacheStrategy icache = null;

        #region 构造方法

        public WanerDaoPersonInfoManager()
        {
            icache = WanerDaoCacheManager.WanerDaoCacheFactory.SingleInstance().GetStrategy(0);
            pspmodel = CommonContext.GetUserSecurityInfo();

        }
        #endregion

        #region 个人名片卡
        //获取个人名片信息
        public string GetPersonNameCard()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("uid", pspmodel.user_id);
            return GetPersonNameCard(dic);
        }

        public string GetPersonNameCard(Dictionary<string, object> dic)
        {
            string user_id = string.Empty;
            if (dic.ContainsKey("uid"))
            {
                if (!string.IsNullOrEmpty(dic["uid"].ToString())) { user_id = dic["uid"].ToString(); }
                else { user_id = pspmodel.user_id; }
            }
            else { user_id = pspmodel.user_id; }

            PersonalNameCardModel model = GetPersonalNameCardModel(user_id);
            if (model != null)
            {
                return "{\"result\":true,\"obj\":" + JsonConvert.SerializeObject(model) + "}";
            }
            else
            {
                return Message("ErrorInfoCn", MessageType.error);
            }
        }

        //设置个人名片资料 string json
        //string json (是一个model)
        public string SetPersonNameCard(Dictionary<string, object> dic)
        {
            string jsonmodel = dic["json"].ToString();
            PersonalNameCardModel pncmodel = JsonConvert.DeserializeObject<PersonalNameCardModel>(jsonmodel);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalNameCardModel>("PersonSQL", "SetPersonNameCard", pncmodel);
            if (result >= 0)
            {
                return Message("SaveInfoCn", MessageType.success);
            }
            else
            {
                return Message("FailInfoCn", MessageType.error);
            }

        }

        public PersonalNameCardModel GetPersonalNameCardModel(string userid)
        {
            string key = nameCardKey + "Model_" + userid;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                return (PersonalNameCardModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", userid);
                IList<PersonalNameCardModel> pncmodelList;
                pncmodelList = DbHelperFactory.SingleInstance().GetGenericModel<PersonalNameCardModel>("PersonSQL", "GetPersonalNameCardModel", dic);
                if (pncmodelList != null)
                {
                    icache.AddObject(key, pncmodelList[0], 1200);
                    return pncmodelList[0];
                }
                else
                {
                    return null;
                }
            }
        }

        #endregion

        #region Ajax更新获取个人名片卡
        /// <summary>
        /// 更新个人权限，是否被搜索到
        /// </summary>
        /// <param name="dic">string is_available  0 or 1</param>
        /// <returns></returns>
        public string UpdateNameCardVisible(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpDatePersonprofilePermission", dic);
            if (result >= 0)
            {
                RemoveModelCache(nameCardKey, pspmodel.user_id);
                return Message("SaveInfoCn", MessageType.success);
            }
            else
            {
                return Message("FailInfoCn", MessageType.error);
            }
        }

        /// <summary>
        /// 获取个人名片卡星座信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string GetConstellation()
        {
            string key = nameCardKey + "Model_" + pspmodel.user_id;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                PersonalNameCardModel pncmodel = GetPersonalNameCardModel(pspmodel.user_id);
                return Message(pncmodel.contellation, MessageType.success);
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", pspmodel.user_id);
                object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetConstellation", dic);
                if (o != null || o != DBNull.Value)
                {
                    return Message(o.ToString(), MessageType.success);
                }
                else
                {
                    return Message("ErrorInfoCn", MessageType.error);
                }
            }
        }
        /// <summary>
        /// 更新个人名片卡星座信息,是否被查看到
        /// </summary>
        /// <param name="dic">string cansee= 0 or 1 </param>
        /// <returns></returns>
        public string UpdateConstellation(Dictionary<string, object> dic)
        {
            string[][] strarr = new string[][] { new string[] { "cansee", "is_display_contellation" } };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateConstellation", dic);
            if (result >= 0)
            {
                RemoveModelCache(nameCardKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                return Message("UpdateFailInfoCn", MessageType.error);
            }
        }

        /// <summary>
        /// 获取家乡信息
        /// </summary>
        /// <returns></returns>
        public string GetHome()
        {
            string key = nameCardKey + "Model_" + pspmodel.user_id;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                PersonalNameCardModel pncmodel = GetPersonalNameCardModel(pspmodel.user_id);
                return Message(pncmodel.home, MessageType.success);
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", pspmodel.user_id);
                object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetHome", dic);
                if (o != null || o != DBNull.Value)
                {
                    return Message(o.ToString(), MessageType.success);
                }
                else
                {
                    return Message("ErrorInfoCn", MessageType.error);
                }
            }
        }
        /// <summary>
        /// 更新家乡信息
        /// </summary>
        /// <param name="dic">string cansee=0 or 1</param>
        /// <returns></returns>
        public string UpdateHome(Dictionary<string, object> dic)
        {
            //dic.Clear();
            //dic.Add("cansee","0");
            string[][] strarr = new string[][] { new string[] { "cansee", "is_display_home" } };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateHome", dic);
            if (result >= 0)
            {
                RemoveModelCache(nameCardKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                return Message("UpdateFailInfoCn", MessageType.error);
            }
        }

        /// <summary>
        /// 获取当前所在地
        /// </summary>
        /// <returns></returns>
        public string GetCurrentPlace()
        {
            string key = nameCardKey + "Model_" + pspmodel.user_id;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                PersonalNameCardModel pncmodel = GetPersonalNameCardModel(pspmodel.user_id);
                //return Message(pncmodel.current_place, MessageType.success);//徐蓓2012-8-13修改，原版本无法获取地址信息
                return Message(pncmodel, MessageType.success);
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", pspmodel.user_id);
                object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetCurrentPlace", dic);
                if (o != null || o != DBNull.Value)
                {
                    return Message(o, MessageType.success);
                }
                else
                {
                    return Message("ErrorInfoCn", MessageType.error);
                }
            }
        }
        /// <summary>
        /// 更新当前所在地
        /// </summary>
        /// <param name="dic">string cansee=0 or 1</param>
        /// <returns></returns>
        public string UpdateCurrentPlace(Dictionary<string, object> dic)
        {
            string[][] strarr = new string[][] { new string[] { "cansee", "is_display_current_place" } };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateCurrentPlace", dic);
            if (result >= 0)
            {
                RemoveModelCache(nameCardKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                return Message("UpdateFailInfoCn", MessageType.success);
            }
        }

        /// <summary>
        /// Ajax获取学校信息
        /// </summary>
        /// <param name="dic">string school_typeid(学校类型id数字）,string keyword(关键字)</param>
        /// <returns>5条</returns>
        public string AjaxGetBasicSchool(Dictionary<string, object> dic)
        {
            string type_id = CastSchoolType(dic["school_typeid"].ToString()); //转换id为数据库中学校类型id
            dic.Remove("school_typeid");
            dic.Add("school_typeid", type_id);
            dic.Add("language_id", CommonContext.GetClientLanguage());
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "AjaxGetBasicSchool", dic);
        }

        /// <summary>
        /// Ajax获取专业信息
        /// </summary>
        /// <param name="dic">string keyword(关键字)</param>
        /// <returns>5条</returns>
        public string AjaxGetBasicMajor(Dictionary<string, object> dic)
        {
            dic.Add("language_id", CommonContext.GetClientLanguage());
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "AjaxGetBasicMajor", dic);
        }

        /// <summary>
        /// Ajax获取单位名称信息
        /// </summary>
        /// <param name="dic">string keyword</param>
        /// <returns>5条</returns>
        public string AjaxGetCompanyBasic(Dictionary<string, object> dic)
        {
            dic.Add("language_id", CommonContext.GetClientLanguage());
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "AjaxGetCompanyBasic", dic);
        }

        /// <summary>
        /// Ajax获取职位名称信息
        /// </summary>
        /// <param name="dic">string keyword,parentid</param>
        /// <returns>5条</returns>
        public string AjaxGetPositionBasic(Dictionary<string, object> dic)
        {
            dic.Add("language_id", CommonContext.GetClientLanguage());
            return DbHelperFactory.SingleInstance().GetDataTable("PersonSQL", "AjaxGetPositionBasic", dic);
        }

        /// <summary>
        /// 获取学校信息
        /// </summary>
        /// <returns></returns>
        public string GetSchool()
        {
            string key = nameCardKey + "Model_" + pspmodel.user_id;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                PersonalNameCardModel pncmodel = GetPersonalNameCardModel(pspmodel.user_id);
                return WanerDaoJSON.GetSuccessJson(pncmodel.school);
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", pspmodel.user_id);
                object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetSchool", dic);
                if (o != null || o != DBNull.Value)
                {
                    return WanerDaoJSON.GetSuccessJson(o.ToString());
                }
                else
                {
                    return Message("ErrorInfoCn", MessageType.error);
                }
            }
        }
        /// <summary>
        /// 更新学校信息
        /// </summary>
        /// <param name="dic">string cansee=0 or 1</param>
        /// <returns></returns>
        public string UpdateSchool(Dictionary<string, object> dic)
        {
            string[][] strarr = new string[][] { new string[] { "cansee", "is_display_school" } };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateSchool", dic);
            if (result >= 0)
            {
                RemoveModelCache(nameCardKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                return Message("UpdateFailInfoCn", MessageType.success);
            }
        }

        /// <summary>
        /// 获取工作信息
        /// </summary>
        /// <returns></returns>
        public string GetWork()
        {
            string key = nameCardKey + "Model_" + pspmodel.user_id;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                PersonalNameCardModel pncmodel = GetPersonalNameCardModel(pspmodel.user_id);
                return WanerDaoJSON.GetSuccessJson(pncmodel.work_place);
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", pspmodel.user_id);
                object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetWork", dic);
                if (o != null || o != DBNull.Value)
                {
                    return WanerDaoJSON.GetSuccessJson(o.ToString());
                }
                else
                {
                    return Message("ErrorInfoCn", MessageType.error);
                }
            }
        }
        /// <summary>
        /// 更新工作信息
        /// </summary>
        /// <param name="dic">string cansee= 0 or 1</param>
        /// <returns></returns>
        public string UpdateWord(Dictionary<string, object> dic)
        {
            string[][] strarr = new string[][] { new string[] { "cansee", "is_display_work" } };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateWord", dic);
            if (result > 0)
            {
                RemoveModelCache(nameCardKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                return Message("UpdateFailInfoCn", MessageType.error);
            }
        }

        #endregion

        #region 个人基本信息

        //string name,enname,sex,biryear,birmonth,birday,constellation,
        //bircountry,birstate,bircity,curcountry,curstate,curcity,
        //curaddress,curzip
        public string UpdatePersonalProfile(Dictionary<string, object> dic)
        {
            /* dic.Clear();
             pspmodel.user_id = "9af097af243f49b4bf2f88b48393369c";
             dic.Add("name", "晓得");
             dic.Add("enname", "Xiaodongyang");
             dic.Add("sex", "1");
             dic.Add("biryear", "1990");
             dic.Add("birmonth", "12");
             dic.Add("birday", "14");
             dic.Add("constellation", "水瓶座");
             dic.Add("bircountry", "2");
             dic.Add("birstate", "5");
             dic.Add("bircity", "6");
             dic.Add("curcountry", "7");
             dic.Add("curstate", "8");
             dic.Add("curcity", "10");
             dic.Add("curaddress", "中国成都");
             dic.Add("curzip", "4568236");*/
            //验证信息
            string name = dic["name"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref name, false, false, false, 60))
                return Message("CnNameTooLarge", MessageType.error);

            string enname = dic["enname"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref enname, false, false, false, 60))
                return Message("EnNameTooLarge", MessageType.error);

            string curaddress = dic["curaddress"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref curaddress, false, false, false, 60))
                return Message("AddressTooLarge", MessageType.error);

            string zip = dic["curzip"].ToString();
            if (!WanerDaoValidation.ValidateParameter(ref zip, false, false, false, 10))
                return Message("ZipError", MessageType.error);

            string json = string.Empty;
            PersonalProfileModel ppmodel = SetPersonalProfileModel(dic);
            try
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<PersonalProfileModel>("PersonSQL", "UpdatePersonalProfile", ppmodel);
                if (result > 0)
                {
                    DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalNameCard", new Dictionary<string, object>
                    {
                       {"current_country_id",ppmodel.current_country_id},{"current_state_id",ppmodel.current_state_id},
                        {"current_city_id",ppmodel.current_city_id}, {"birth_country_id",ppmodel.birth_country_id},                       
                        {"birth_state_id",ppmodel.birth_state_id},{"birth_city_id",ppmodel.birth_city_id},
                        {"language_id",CommonContext.GetClientLanguage()},
                        {"user_id",ppmodel.user_id},{"constellation",ppmodel.constellation}                      
                    });
                    RemoveModelCache(basicKey, pspmodel.user_id);
                    RemoveModelCache(nameCardKey, pspmodel.user_id);
                    EditExp();
                    json = Message("UpdateInfoCn", MessageType.success);
                    return GetPersonalProfile();
                }
                else
                {
                    json = Message("UpdateFailInfoCn", MessageType.error);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return json;
        }

        public bool UpdatePersonalProfile(PersonalProfileModel personalProfileModel)
        {
            return DbHelperFactory.SingleInstance().ExecuteNonQueryForTrans<PersonalProfileModel>("PersonSQL", "UpdatePersonalProfile", personalProfileModel) > 0;
        }

        private PersonalProfileModel SetPersonalProfileModel(Dictionary<string, object> dic)
        {
            PersonalProfileModel ppmodel = new PersonalProfileModel();
            ppmodel.user_id = pspmodel.user_id;
            ppmodel.name = dic["name"].ToString();
            ppmodel.second_name = dic["enname"].ToString();
            ppmodel.gender = int.Parse(dic["sex"].ToString()) == 0 ? false : true;
            ppmodel.birthday_year = int.Parse(dic["biryear"].ToString());
            ppmodel.birthday_month = int.Parse(dic["birmonth"].ToString());
            ppmodel.birthday_day = int.Parse(dic["birday"].ToString());
            ppmodel.constellation = dic["constellation"].ToString();
            ppmodel.birth_country_id = dic["bircountry"].ToString();
            ppmodel.birth_state_id = dic["birstate"].ToString();
            ppmodel.birth_city_id = dic["bircity"].ToString();
            ppmodel.current_country_id = dic["curcountry"].ToString();
            ppmodel.current_state_id = dic["curstate"].ToString();
            ppmodel.current_city_id = dic["curcity"].ToString();
            ppmodel.current_address = dic["curaddress"].ToString();
            ppmodel.current_zip = dic["curzip"].ToString();
            return ppmodel;
        }

        //获取个人资料
        public string GetPersonalProfile()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("uid", pspmodel.user_id);
            return GetPersonalProfile(dic);
        }

        public string GetPersonalProfile(Dictionary<string, object> dic)
        {
            string user_id = string.Empty;
            if (dic.ContainsKey("uid"))
            {
                if (!string.IsNullOrEmpty(dic["uid"].ToString())) { user_id = dic["uid"].ToString(); }
                else { user_id = pspmodel.user_id; }
            }
            else { user_id = pspmodel.user_id; }

            PersonalProfileModel model = GetPersonalProfileModel(user_id);

            if (model != null)
            {
                return "{\"result\":true,\"obj\":" + JsonConvert.SerializeObject(model) + "}";
            }
            else
            {
                return Message("读取错误", MessageType.error);
            }
        }

        public PersonalProfileModel GetPersonalProfileModel()
        {
            return GetPersonalProfileModel(pspmodel.user_id);
        }

        //根据用户id获取PersonalProfileModel
        public PersonalProfileModel GetPersonalProfileModel(string userid)
        {
            string key = basicKey + "Model_" + userid;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                return (PersonalProfileModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", userid);
                IList<PersonalProfileModel> ppmodelList;
                ppmodelList = DbHelperFactory.SingleInstance().GetGenericModel<PersonalProfileModel>("PersonSQL", "GetPersonalProfileModel", dic);
                if (ppmodelList != null)
                {
                    icache.AddObject(key, ppmodelList[0], 1200);
                    return ppmodelList[0];
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        ///     王薪杰
        /// 修改个人基本信息权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdatePersonalProfilePermission(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalProfilePermission", dic);
            if (result > 0)
            {
                RemoveModelCache(basicKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);

        }

        /// <summary>
        ///     王薪杰
        /// 是否能被站外搜索
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateIfCanBeOutManSearch(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateIfCanBeOutManSearch", dic);
            if (result > 0)
            {
                RemoveModelCache(basicKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);

        }

        /// <summary>
        ///     王薪杰
        /// 谁可以给用户发消息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateCanMsgToPermission(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateCanMsgToPermission", dic);
            if (result > 0)
            {
                RemoveModelCache(basicKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);

        }

        /// <summary>
        ///     王薪杰
        /// 谁可以向用户发好友申请
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateCanSendFriendRequestPermission(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdateCanSendFriendRequestPermission", dic);
            if (result > 0)
            {
                RemoveModelCache(basicKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);

        }

        /// <summary>
        /// 王薪杰
        /// 修改头像
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public bool UpdatePersonalLogo(string logo)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("logo_path", logo);
            if (DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalLogo", dic) > 0)
            {
                RemoveModelCache(basicKey, pspmodel.user_id);
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 王薪杰
        /// 修改小头像
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public bool UpdatePersonalSmallLogo(string small_logo)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("logo_small_path", small_logo);

            if (DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalSmallLogo", dic) > 0)
            {
                RemoveModelCache(basicKey, pspmodel.user_id);
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region 个人教育信息

        public IList<PersonalEducationModel> GetPersonalEducationModel(string userid)
        {
            string key = educationKey + "Model_" + userid;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                return (IList<PersonalEducationModel>)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("use_id", userid);
                IList<PersonalEducationModel> pemodelList;
                pemodelList = DbHelperFactory.SingleInstance().GetGenericModel<PersonalEducationModel>("PersonSQL", "GetPersonalEducationModel", dic);
                if (pemodelList != null)
                {
                    icache.AddObject(educationKey, pemodelList, 1200);
                    return pemodelList;
                }
                else
                {
                    return null;
                }
            }
        }

        //string del,add,update
        public string SetingEducationInfo(Dictionary<string, object> dic)
        {
            bool isAddSuccess = false;
            bool isDelSuccess = false;
            bool isUpdateSuccess = false;
            string delArr = dic["del"].ToString();
            if (!string.IsNullOrEmpty(delArr))
            {
                isDelSuccess = DeletePersonalEducation(delArr);
            }
            else
            {
                isDelSuccess = true;
            }

            string addJson = dic["add"].ToString(); ;
            if (!string.IsNullOrEmpty(addJson))
            {
                isAddSuccess = AddPersonalEducation(addJson);
                // SetPersonNameCardOfEducation();
            }
            else
            {
                isAddSuccess = true;
            }

            string updateJson = dic["update"].ToString(); ;
            if (!string.IsNullOrEmpty(updateJson))
            {
                isUpdateSuccess = UpdatePersonalEducation(updateJson);
                // SetPersonNameCardOfEducation();
            }
            else
            {
                isUpdateSuccess = true;
            }

            if (isAddSuccess && isDelSuccess && isUpdateSuccess)
            {
                RemoveModelCache(educationKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);

                //return SelectPersonalEducation();
            }
            else
            {
                return Message("UpdateFailInfoCn", MessageType.error);
            }

        }

        private bool UpdatePersonalEducation(string updateJson)
        {
            bool flag = false;
            IList<PersonalEducationModel> pwmodellist = JsonConvert.DeserializeObject<IList<PersonalEducationModel>>(updateJson);
            foreach (PersonalEducationModel pwmodel in pwmodellist)
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalEducationModel>("PersonSQL", "UpdatePersonalEducation", pwmodel);
                if (result > 0)
                {
                    flag = true;
                }
                else
                {
                    flag = false;
                    //throw new Exception("添加错误");
                }
            }
            return flag;
        }

        //更新个人名片卡教育信息
        private void SetPersonNameCardOfEducation()
        {
            try
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", pspmodel.user_id);
                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetPersonNameCardOfEducation", dic);
                RemoveModelCache(nameCardKey, pspmodel.user_id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //string json 
        private bool AddPersonalEducation(string json)
        {
            bool flag = false;
            IList<PersonalEducationModel> list = JsonConvert.DeserializeObject<IList<PersonalEducationModel>>(json);
            foreach (PersonalEducationModel pemodel in list)
            {
                pemodel.id = WanerDaoGuid.GetGuid();
                pemodel.use_id = pspmodel.user_id;
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalEducationModel>("PersonSQL", "AddPersonalEducation", pemodel);
                if (result > 0)
                {
                    flag = true;
                }
                else
                {
                    flag = false;
                    // throw new Exception("添加错误");
                }
            }
            return flag;
        }

        //string id  删除个人教育信息
        private bool DeletePersonalEducation(string delArr)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", delArr);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalEducation", dic);
            if (result > 0)
            {
                return true;
            }
            else { return false; }
        }
        //查询个人教育信息
        public string SelectPersonalEducation()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("uid", pspmodel.user_id);
            return SelectPersonalEducation(dic);
        }

        public string SelectPersonalEducation(Dictionary<string, object> dic)
        {
            string user_id = string.Empty;
            if (dic.ContainsKey("uid"))
            {
                if (!string.IsNullOrEmpty(dic["uid"].ToString())) { user_id = dic["uid"].ToString(); }
                else { user_id = pspmodel.user_id; }
            }
            else { user_id = pspmodel.user_id; }

            IList<PersonalEducationModel> list = GetPersonalEducationModel(user_id);

            if (list == null)
            {
                return "{\"result\":true,\"total\":0,\"rows\":\"\"}";
            }
            else
            {
                return "{\"result\":true,\"total\":" + list.Count + ",\"rows\":" + JsonConvert.SerializeObject(list) + "}";
            }
        }

        /// <summary>
        ///   王薪杰
        /// 获取当前用户 教育权限
        /// </summary>
        /// <returns></returns>
        public string GetEducationPermission()
        {
            IList<PersonalEducationModel> list = GetPersonalEducationModel(pspmodel.user_id);
            if (list == null)
            {
                return "{\"result\":false,\"obj\":{\"permission\":\"\"}}";
            }
            else
            {
                return "{\"result\":true,\"obj\":{\"permission\":\"" + list[0].permission + "\"}}";
            }
        }

        /// <summary>
        /// 王薪杰
        /// 修改 当前用户教育权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateEducationPermission(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalEducationPermission", dic);
            if (result > 0)
            {
                RemoveModelCache(educationKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);
        }

        /// <summary>
        /// 添加个人教育信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string AddPersonalEducation(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            PersonalEducationModel pemodel = JsonConvert.DeserializeObject<PersonalEducationModel>(dic["model"].ToString());

            pemodel.id = WanerDaoGuid.GetGuid();
            pemodel.use_id = pspmodel.user_id;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalEducationModel>("PersonSQL", "AddPersonalEducation", pemodel);

            if (result > 0)
            {
                RemoveModelCache(educationKey, pspmodel.user_id);
                //SetPersonNameCardOfEducation();
                json = Message("AddInfoCn", MessageType.success);
            }
            else
            {
                json = Message("AddInfoFail", MessageType.error);
            }
            return json;
        }


        /// <summary>
        /// 修改个人教育信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdatePersonalEducation(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            PersonalEducationModel pemodel = JsonConvert.DeserializeObject<PersonalEducationModel>(dic["model"].ToString());

            pemodel.use_id = pspmodel.user_id;
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalEducationModel>("PersonSQL", "UpdatePersonalEducation", pemodel);

            if (result > 0)
            {
                RemoveModelCache(educationKey, pspmodel.user_id);
                SetPersonNameCardOfEducation();
                json = Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                json = Message("UpdateFailInfoCn", MessageType.error);
            }
            return json;
        }

        /// <summary>
        /// 删除教育信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string DeletePersonalEducation(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            if (DeletePersonalEducation(dic["id"].ToString()))
            {
                RemoveModelCache(educationKey, pspmodel.user_id);
                SetPersonNameCardOfEducation();
                json = Message("DeleteInfoCn", MessageType.success);
            }
            else
            {
                json = Message("DeleteFailInfoCn", MessageType.error);
            }
            return json;
        }

        #endregion

        #region 个人工作信息

        public IList<PersonalWorkModel> GetPersonalWorkModel(string userid)
        {
            string key = workKey + "Model_" + userid;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                return (IList<PersonalWorkModel>)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", userid);
                IList<PersonalWorkModel> pwmodelList;
                pwmodelList = DbHelperFactory.SingleInstance().GetGenericModel<PersonalWorkModel>("PersonSQL", "GetPersonalWorkModel", dic);
                if (pwmodelList != null)
                {
                    icache.AddObject(key, pwmodelList, 1200);
                    return pwmodelList;
                }
                else
                {
                    return null;
                }
            }
        }
        //string add,del,update( {add:"[{user_id:"dfgrty45345efdsdg45g5u6",description:"dsdasda"},{},等等...]",del:"4,65,7,8,2"}")
        public string SetingPersonalWork(Dictionary<string, object> dic)
        {
            bool isAddSuccess = false;
            bool isDelSuccess = false;
            bool isUpdateSuccess = false;
            string delArr = dic["del"].ToString();
            if (!string.IsNullOrEmpty(delArr))
            {
                isDelSuccess = DeletePersonalWork(delArr);
            }
            else
            {
                isDelSuccess = true;
            }

            string addJson = dic["add"].ToString(); ;
            if (!string.IsNullOrEmpty(addJson))
            {
                isAddSuccess = AddPersonalWork(addJson);
                // SetPersonNameCardOfWork(); //名片信息
            }
            else
            {
                isAddSuccess = true;
            }

            string updateJson = dic["update"].ToString();
            if (!string.IsNullOrEmpty(updateJson))
            {
                isUpdateSuccess = UpdatePersonalWork(updateJson);
                //SetPersonNameCardOfWork(); //名片信息
            }
            else
            {
                isUpdateSuccess = true;
            }

            if (isAddSuccess && isDelSuccess && isUpdateSuccess)
            {
                return Message("UpdateInfoCn", MessageType.success);
                //return SelectPersonalEducation();
            }
            else
            {
                return Message("UpdateFailInfoCn", MessageType.error);
            }
        }

        private bool UpdatePersonalWork(string updateJson)
        {
            bool flag = false;
            IList<Dictionary<string, object>> pwmodellist = JsonConvert.DeserializeObject<IList<Dictionary<string, object>>>(updateJson);
            foreach (Dictionary<string, object> pwmodel in pwmodellist)
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalWork", pwmodel);
                if (result > 0)
                {
                    RemoveModelCache(workKey, pspmodel.user_id);
                    flag = true;
                }
                else
                {
                    flag = false;
                    // throw new Exception("添加错误");
                }
            }
            return flag;
        }

        //更新个人名片卡工作信息
        private void SetPersonNameCardOfWork()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            try
            {
                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetPersonNameCardOfWork", dic);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private bool AddPersonalWork(string addjson)
        {
            bool flag = false;
            IList<Dictionary<string, object>> pwmodellist = JsonConvert.DeserializeObject<IList<Dictionary<string, object>>>(addjson);
            foreach (Dictionary<string, object> pwmodel in pwmodellist)
            {
                pwmodel["id"] = WanerDaoGuid.GetGuid();
                pwmodel["user_id"] = pspmodel.user_id;
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonalWork", pwmodel);
                if (result > 0)
                {
                    //SetPersonNameCardOfWork();
                    RemoveModelCache(workKey, pspmodel.user_id);
                    flag = true;
                }
                else
                {
                    flag = false;
                    // throw new Exception("添加错误");
                }
            }
            return flag;
        }

        /// <summary>
        ///  王薪杰
        /// 添加工作信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string AddPersonalWork(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string[][] strarr = new string[][] { new string[] { "cname", "company_name" },
                new string[] { "pcat", "position_category" },
                new string[] { "pname", "position_name" },
                new string[] { "begindate", "begin_date" },
                new string[] { "enddate", "end_date" },
                new string[] { "present", "is_present" },
                new string[]{"desc","description"}
            };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);
            dic.Add("id", WanerDaoGuid.GetGuid());

            bool is_present = Convert.ToBoolean(dic["is_present"]);
            dic["is_present"] = is_present ? 1 : 0;
            if (is_present)
            {
                dic["end_date"] = DateTime.MinValue;
            }

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "AddPersonalWork", dic);
            if (result > 0)
            {
                RemoveModelCache(workKey, pspmodel.user_id);
                //SetPersonNameCardOfWork();//更新工作信息
                json = Message("AddInfoCn", MessageType.success);
            }
            else
            {
                json = Message("AddInfoFail", MessageType.error);
            }

            return json;
        }

        /// <summary>
        ///  王薪杰
        /// 修改工作信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdatePersonalWork(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            string[][] strarr = new string[][] { new string[] { "cname", "company_name" },
                new string[] { "pcat", "position_category" },
                new string[] { "pname", "position_name" },
                new string[] { "begindate", "begin_date" },
                new string[] { "enddate", "end_date" },
                new string[] { "present", "is_present" },
                new string[]{"desc","description"}
            };
            ReNameDic(strarr, ref dic);
            dic.Add("user_id", pspmodel.user_id);

            bool is_present = Convert.ToBoolean(dic["is_present"]);
            dic["is_present"] = is_present ? 1 : 0;
            if (is_present)
            {
                dic["end_date"] = DateTime.MinValue;
            }

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalWork", dic);
            if (result > 0)
            {
                RemoveModelCache(workKey, pspmodel.user_id);
                json = Message("UpdateInfoCn", MessageType.success);
            }
            else
            {
                json = Message("UpdateFailInfoCn", MessageType.error);
            }

            return json;
        }

        /// <summary>
        ///  王薪杰
        /// 删除个人工作信息
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string DeletePersonalWork(Dictionary<string, object> dic)
        {
            string json = string.Empty;

            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalWork", dic);
            if (result > 0)
            {
                SetPersonNameCardOfWork();//更新工作信息
                json = Message("DeleteInfoCn", MessageType.success);
            }
            else
            {
                json = Message("DeleteFailInfoCn", MessageType.error);
            }
            return json;
        }

        //获取个人工作信息
        public string SelectPersonalWork()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("uid", pspmodel.user_id);
            return SelectPersonalWork(dic);
        }

        public string SelectPersonalWork(Dictionary<string, object> dic)
        {
            string user_id = string.Empty;
            if (dic.ContainsKey("uid"))
            {
                if (!string.IsNullOrEmpty(dic["uid"].ToString())) { user_id = dic["uid"].ToString(); }
                else { user_id = pspmodel.user_id; }
            }
            else { user_id = pspmodel.user_id; }

            IList<PersonalWorkModel> list = GetPersonalWorkModel(user_id);

            if (list == null)
            {
                return "{\"result\":true,\"total\":0,\"rows\":\"\"}";
            }
            else
            {
                return "{\"result\":true,\"total\":" + list.Count + ",\"rows\":" + JsonConvert.SerializeObject(list) + "}";
            }
        }

        private bool DeletePersonalWork(string strarr)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("id", strarr);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "DeletePersonalWork", dic);
            if (result > 0)
            {
                SetPersonNameCardOfWork();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 王薪杰
        /// 获取当前用户 工作权限
        /// </summary>
        /// <returns></returns>
        public string GetWorkPermission()
        {
            IList<PersonalWorkModel> list = GetPersonalWorkModel(pspmodel.user_id);
            if (list == null)
            {
                return "{\"result\":false,\"obj\":{\"permission\":\"\"}}";
            }
            else
            {
                return "{\"result\":true,\"obj\":{\"permission\":\"" + list[0].permission + "\"}}";
            }
        }

        /// <summary>
        /// 修改 当前用户工作权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateWorkPermission(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalWorkPermission", dic);
            if (result > 0)
            {
                RemoveModelCache(workKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);
        }
        #endregion

        #region 个人兴趣爱好信息
        //获取个人兴趣爱好信息
        public PersonalInterestsModel GetPersonalInterestsModel(string userid)
        {
            string key = interestsKey + "Model_" + userid;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                return (PersonalInterestsModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", userid);
                IList<PersonalInterestsModel> pimodelList = new List<PersonalInterestsModel>();
                pimodelList = DbHelperFactory.SingleInstance().GetGenericModel<PersonalInterestsModel>("PersonSQL", "GetPersonalInterestsModel", dic);
                if (pimodelList != null)
                {
                    icache.AddObject(key, pimodelList[0], 1200);
                    return pimodelList[0];
                }
                else
                {
                    return null;
                }
            }
        }

        public string GetPersonalInterests()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("uid", pspmodel.user_id);
            return GetPersonalInterests(dic);
        }

        public string GetPersonalInterests(Dictionary<string, object> dic)
        {
            string user_id = string.Empty;
            if (dic.ContainsKey("uid"))
            {
                if (!string.IsNullOrEmpty(dic["uid"].ToString())) { user_id = dic["uid"].ToString(); }
                else { user_id = pspmodel.user_id; }
            }
            else { user_id = pspmodel.user_id; }

            PersonalInterestsModel model = GetPersonalInterestsModel(user_id);
            if (model != null)
            {
                return "{\"result\":true,\"obj\":" + JsonConvert.SerializeObject(model) + "}";
            }
            else
            {
                return Message("ErrorInfoCn", MessageType.error);
            }
        }

        private string formatSeparator(string str)
        {
            string result = string.Empty;

            //第一次去除中文逗号、空格、英文逗号的分隔符
            string pattern = @"[，\s,]+";
            string replacement = ",";
            result = Regex.Replace(str, pattern, replacement);
            
            //第二次去除头尾的英文逗号分隔符
            pattern = "^,|,$";
            replacement = string.Empty;
            result = Regex.Replace(result, pattern, replacement);

            return result;
        }

        //string music,movie,game,cartoon,book,sport
        public string UpdatePersonalInterests(Dictionary<string, object> dic)
        {
            string[] str = new string[] { "music", "movie", "game", "cartoon", "book", "sport" };
            Dictionary<string, object> paramContainer = new Dictionary<string, object>();
            for (int i = 0; i < str.Length; i++)
            {
                paramContainer.Add(str[i], formatSeparator(dic[str[i]].ToString()));
                if (dic[str[i]].ToString().Length > 60)
                {
                    return str[i] + Message("LengthTooLarge", MessageType.error);
                }
            }
            PersonalInterestsModel pwmodel = new PersonalInterestsModel();
            pwmodel.user_id = pspmodel.user_id;
            pwmodel.music = paramContainer["music"].ToString();
            pwmodel.movie = paramContainer["movie"].ToString();
            pwmodel.game = paramContainer["game"].ToString();
            pwmodel.cartoon = paramContainer["cartoon"].ToString();
            pwmodel.book = paramContainer["book"].ToString();
            pwmodel.sport = paramContainer["sport"].ToString();

            try
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalInterestsModel>("PersonSQL", "UpdatePersonalInterests", pwmodel);
                if (result > 0)
                {
                    EditExp();
                    RemoveModelCache(interestsKey, pspmodel.user_id);
                    return Message("UpdateInfoCn", MessageType.success);
                }
                else
                {
                    return Message("UpdateFailInfoCn", MessageType.error);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        ///     王薪杰
        /// 修改当前用户兴趣爱好权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateInterestsPermission(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalInterestsPermission", dic);
            if (result > 0)
            {
                RemoveModelCache(interestsKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);

        }
        #endregion

        #region 个人联系信息

        //获取个人联系方式
        public PersonalContactModel GetPersonalContactModel(string userid)
        {
            string key = contactKey + "Model_" + userid;
            object cache = icache.RetrieveObject(key);
            if (cache != null)
            {
                return (PersonalContactModel)cache;
            }
            else
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", userid);
                IList<PersonalContactModel> pwmodelList = new List<PersonalContactModel>();
                pwmodelList = DbHelperFactory.SingleInstance().GetGenericModel<PersonalContactModel>("PersonSQL", "GetPersonalContactModel", dic);
                if (pwmodelList != null)
                {
                    icache.AddObject(key, pwmodelList[0], 1200);
                    return pwmodelList[0];
                }
                else
                {
                    return null;
                }
            }
        }

        public string GetPersonalContact()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("uid", pspmodel.user_id);
            return GetPersonalContact(dic);
        }

        public string GetPersonalContact(Dictionary<string, object> dic)
        {
            string user_id = string.Empty;
            if (dic.ContainsKey("uid"))
            {
                if (!string.IsNullOrEmpty(dic["uid"].ToString())) { user_id = dic["uid"].ToString(); }
                else { user_id = pspmodel.user_id; }
            }
            else { user_id = pspmodel.user_id; }

            PersonalContactModel model = GetPersonalContactModel(user_id);
            if (model != null)
            {
                return "{\"result\":true,\"obj\":" + JsonConvert.SerializeObject(model) + "}";
            }
            else
            {
                return Message("ErrorInfoCn", MessageType.error);
            }
        }

        //string email,skype,msn,tel,website
        public string UpdatePersonalContact(Dictionary<string, object> dic)
        {
            string web_email = dic["webemail"].ToString();
            string skype = dic["skype"].ToString();
            string msn = dic["msn"].ToString();
            string cell = dic["tel"].ToString();
            string web_website = dic["website"].ToString();
            //if (!(WanerDaoValidation.ValidateParameter(ref web_email, false, false, false, 60) && WanerDaoValidation.ValidateEmail(web_email)))
            //{
            //    return Message("EmailError", MessageType.error);
            //}
            if (!(WanerDaoValidation.ValidateParameter(ref skype, false, false, false, 20)))
            {
                return Message("SkypeError", MessageType.error);
            }
            if (!WanerDaoValidation.ValidateParameter(ref msn, false, false, false, 60))
            {
                return Message("MSNError", MessageType.error);
            }
            if (!(WanerDaoValidation.ValidateParameter(ref cell, false, false, false, 20) && Regex.IsMatch(cell, @"^\s{0}$|^\d*$")))
            {
                return Message("电话验证失败", MessageType.error);
            }
            if (!WanerDaoValidation.ValidateParameter(ref web_website, false, false, false, 60))
            {
                return Message("网站验证失败", MessageType.error);
            }

            PersonalContactModel pwmodel = new PersonalContactModel();
            pwmodel.user_id = pspmodel.user_id;
            pwmodel.email = web_email;
            pwmodel.skype = skype;
            pwmodel.msn = msn;
            pwmodel.cell = cell;
            pwmodel.web_website = web_website;
            try
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalContactModel>("PersonSQL", "UpdatePersonalContact", pwmodel);
                if (result > 0)
                {
                    EditExp();
                    RemoveModelCache(contactKey, pspmodel.user_id);
                    ps.RefreshCookie(pspmodel.user_id);
                    return Message("UpdateInfoCn", MessageType.success);
                }
                else
                {
                    return Message("UpdateFailInfoCn", MessageType.error);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public bool UpdatePersonalContact(PersonalContactModel newmodel)
        {
   //         PersonalContactModel model = GetPersonalContactModel(pspmodel.user_id);

            string web_email = newmodel.email;
            string skype = newmodel.skype;
            string msn = newmodel.msn;
            string cell = newmodel.cell;
            string web_website = newmodel.web_website;
            //if (!(WanerDaoValidation.ValidateParameter(ref web_email, false, false, false, 60) && WanerDaoValidation.ValidateEmail(web_email)))
            //{
            //    return Message("EmailError", MessageType.error);
            //}
            if (!(WanerDaoValidation.ValidateParameter(ref skype, false, false, false, 20)))
            {
                return false;
            }
            if (!WanerDaoValidation.ValidateParameter(ref msn, false, false, false, 60))
            {
                return false;
            }
            if (!(WanerDaoValidation.ValidateParameter(ref cell, false, false, false, 20) && Regex.IsMatch(cell, @"^\s{0}$|^\d*$")))
            {
                return false;
            }
            if (!WanerDaoValidation.ValidateParameter(ref web_website, false, false, false, 60))
            {
                return false;
            }

            //PersonalContactModel pwmodel = new PersonalContactModel();
            //model.user_id = pspmodel.user_id;
            //model.email = web_email;
            //model.skype = skype;
            //model.msn = msn;
            //model.cell = cell;
            //model.web_website = web_website;
            try
            {
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery<PersonalContactModel>("PersonSQL", "UpdatePersonalContact", newmodel);
                if (result > 0)
                {
                    EditExp();
                    RemoveModelCache(contactKey, pspmodel.user_id);
                    ps.RefreshCookie(pspmodel.user_id);
                    return true;
                    //return Message("UpdateInfoCn", MessageType.success);
                }
                else
                {
                    return false;
                    //return Message("UpdateFailInfoCn", MessageType.error);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        /// <summary>
        ///     王薪杰
        /// 修改当前用户联系方式权限
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public string UpdateContactPermission(Dictionary<string, object> dic)
        {
            dic.Add("user_id", pspmodel.user_id);
            int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "UpdatePersonalContactPermission", dic);
            if (result > 0)
            {
                RemoveModelCache(contactKey, pspmodel.user_id);
                return Message("UpdateInfoCn", MessageType.success);
            }
            else
                return Message("UpdateFailInfoCn", MessageType.error);

        }

        #region 设置登录账号
        public string SettingSkypeToAccount()
        {
            string json = string.Empty;
            PersonalContactModel pcmodel = GetPersonalContactModel(pspmodel.user_id);
            if (pcmodel != null)
            {
                if (!string.IsNullOrEmpty(pcmodel.skype))
                {
                    if (!ps.ValidateAccountExist(pcmodel.skype))
                    {
                        Dictionary<string, object> dic = new Dictionary<string, object>();
                        dic.Add("user_id", pspmodel.user_id);
                        dic.Add("account", pcmodel.skype);
                        int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetLoginAccount", dic);
                        if (result > 0)
                        {
                            try
                            {
                                dic.Remove("account");
                                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SettingSkypeToAccount", dic);
                                RemoveModelCache(contactKey, pspmodel.user_id);
                                json = Message("SetingSuccess", MessageType.success);
                            }
                            catch (Exception ex)
                            {
                                throw ex;
                            }
                        }
                        else
                        {
                            json = Message("SetingError", MessageType.error);
                        }
                    }
                    else
                    {
                        json = Message("AccountIsExists", MessageType.error);
                    }
                }
                else
                {
                    json = Message("SkypeInfoBlank", MessageType.error);
                }
            }
            else
            {
                json = Message("ReadOfErrorInfo", MessageType.error);
            }
            return json;
        }

        public string SettingEmailToAccount()
        {
            string json = string.Empty;
            PersonalContactModel pcmodel = GetPersonalContactModel(pspmodel.user_id);
            if (pcmodel != null)
            {
                if (!string.IsNullOrEmpty(pcmodel.email))
                {
                    if (!ps.ValidateAccountExist(pcmodel.email))
                    {
                        Dictionary<string, object> dic = new Dictionary<string, object>();
                        dic.Add("user_id", pspmodel.user_id);
                        dic.Add("account", pcmodel.email);
                        int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetLoginAccount", dic);
                        if (result > 0)
                        {
                            try
                            {
                                dic.Remove("account");
                                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SettingEmailToAccount", dic);
                                RemoveModelCache(contactKey, pspmodel.user_id);
                                json = Message("SetingSuccess", MessageType.success);
                            }
                            catch (Exception ex)
                            {
                                throw ex;
                            }
                        }
                        else
                        {
                            json = Message("SetingError", MessageType.error);
                        }
                    }
                    else
                    {
                        json = Message("AccountIsExists", MessageType.error);
                    }
                }
                else
                {
                    json = Message("EmailInfoBlank", MessageType.error);
                }
            }
            else
            {
                json = Message("ReadOfErrorInfo", MessageType.error);
            }
            return json;
        }

        public string SettingMSNToAccount()
        {
            string json = string.Empty;
            PersonalContactModel pcmodel = GetPersonalContactModel(pspmodel.user_id);
            if (pcmodel != null)
            {
                if (!string.IsNullOrEmpty(pcmodel.msn))
                {
                    if (!ps.ValidateAccountExist(pcmodel.msn))
                    {
                        Dictionary<string, object> dic = new Dictionary<string, object>();
                        dic.Add("user_id", pspmodel.user_id);
                        dic.Add("account", pcmodel.msn);
                        int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetLoginAccount", dic);
                        if (result > 0)
                        {
                            try
                            {
                                dic.Remove("account");
                                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SettingMSNToAccount", dic);
                                RemoveModelCache(contactKey, pspmodel.user_id);
                                json = Message("SetingSuccess", MessageType.success);
                            }
                            catch (Exception ex)
                            {
                                throw ex;
                            }
                        }
                        else
                        {
                            json = Message("SetingError", MessageType.error);
                        }
                    }
                    else
                    {
                        json = Message("AccountIsExists", MessageType.error);
                    }
                }
                else
                {
                    json = Message("MSNInfoBlank", MessageType.error);
                }
            }
            else
            {
                json = Message("ReadOfErrorInfo", MessageType.error);
            }
            return json;
        }


        public string SettingCellToAccount()
        {
            string json = string.Empty;
            PersonalContactModel pcmodel = GetPersonalContactModel(pspmodel.user_id);
            if (pcmodel != null)
            {
                if (!string.IsNullOrEmpty(pcmodel.cell))
                {
                    if (!ps.ValidateAccountExist(pcmodel.cell))
                    {
                        Dictionary<string, object> dic = new Dictionary<string, object>();
                        dic.Add("user_id", pspmodel.user_id);
                        dic.Add("account", pcmodel.cell);
                        int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetLoginAccount", dic);
                        if (result > 0)
                        {
                            try
                            {
                                dic.Remove("account");
                                DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SettingCellToAccount", dic);
                                RemoveModelCache(contactKey, pspmodel.user_id);
                                json = Message("SetingSuccess", MessageType.success);
                            }
                            catch (Exception ex)
                            {
                                throw ex;
                            }
                        }
                        else
                        {
                            json = Message("SetingError", MessageType.error);
                        }
                    }
                    else
                    {
                        json = Message("AccountIsExists", MessageType.error);
                    }
                }
                else
                {
                    json = Message("CellInfoBlank", MessageType.error);
                }
            }
            else
            {
                json = Message("ReadOfErrorInfo", MessageType.error);
            }
            return json;
        }


        #endregion

        #endregion

        #region 公有方法

        /// <summary>
        /// 获取资料完成度
        /// </summary>
        /// <returns></returns>
        public string GetExp()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("user_id", pspmodel.user_id);
            object o = DbHelperFactory.SingleInstance().GetScalar("PersonSQL", "GetExp", dic);
            if (o != null || o != DBNull.Value)
            {
                return WanerDaoJSON.GetSuccessJson(o.ToString());
            }
            else
            {
                return Message("ZeroOfFinished", MessageType.error);
            }

        }

        /// <summary>
        /// 设置登录账号
        /// </summary>
        /// <param name="dic">string account</param>
        /// <returns></returns>
        public string SetLoginAccount(Dictionary<string, object> dic)
        {
            string json = string.Empty;
            if (!ps.ValidateAccountExist(dic["account"].ToString()))
            {
                dic.Add("user_id", pspmodel.user_id);
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "SetLoginAccount", dic);
                if (result > 0)
                {
                    json = Message("SetingSuccess", MessageType.success);
                }
                else
                {
                    json = Message("SetingError", MessageType.error);
                }
            }
            else
            {
                json = Message("AccountIsExists", MessageType.success);
            }
            return json;
        }

        public int EditExp()
        {
            try
            {
                int exp = 0;
                string uid = pspmodel.user_id;
                int k1 = 0, k2 = 0;

                //个人安全资料
                k1++; if (pspmodel.security_email != null && pspmodel.security_email != "") k2++;//安全邮箱
                k1++; if (pspmodel.question_id != null && pspmodel.question_id != "") k2++;//
                k1++; if (pspmodel.answer != null && pspmodel.answer != "") k2++;//
                k1++; if (pspmodel.question2_id != null && pspmodel.question2_id != "") k2++;//
                k1++; if (pspmodel.answer2 != null && pspmodel.answer2 != "") k2++;//

                //个人注册资料
                PersonalProfileModel profileModel = new PersonalProfileModel();
                profileModel = GetPersonalProfileModel(pspmodel.user_id);
                k1 += 3;//birthday
                if (profileModel.birthday_year != 0) k2++;
                if (profileModel.birthday_month != 0) k2++;
                if (profileModel.birthday_day != 0) k2++;
                k1 += 3;//家乡
                if (profileModel.birth_country_id != null && profileModel.birth_country_id != "") k2++;
                if (profileModel.birth_state_id != null && profileModel.birth_state_id != "") k2++;
                if (profileModel.birth_city_id != null && profileModel.birth_city_id != "") k2++;
                k1 += 3;//所在地
                if (profileModel.current_country_id != null && profileModel.current_country_id != "") k2++;
                if (profileModel.current_state_id != null && profileModel.current_state_id != "") k2++;
                if (profileModel.current_city_id != null && profileModel.current_city_id != "") k2++;
                k1++; if (profileModel.logo_path != null && profileModel.logo_path != "") k2++;//logo
                k1++; if (profileModel.current_address != null && profileModel.current_address != "") k2++;//current_address        
                k1++; if (profileModel.current_zip != null && profileModel.current_zip != "") k2++;//current_zip      
                k1++; if (profileModel.gender != null) k2++;//
                k1++; if (profileModel.constellation != null && profileModel.constellation != "") k2++;//
                k1++; if (profileModel.second_name != null && profileModel.second_name != "") k2++;//
                k1++; if (profileModel.logo_small_path != null && profileModel.logo_small_path != "") k2++;//
                k1++; if (profileModel.name != null && profileModel.name != "") k2++;//

                //教育背景
                IList<PersonalEducationModel> edu = GetPersonalEducationModel(uid);
                k1 += 3;
                if (edu != null && edu.Count > 0)
                {
                    if (!string.IsNullOrEmpty(edu[0].school_name)) k2++;
                    if (!string.IsNullOrEmpty(edu[0].major)) k2++;
                    if (!string.IsNullOrEmpty(edu[0].degree)) k2++;
                }

                //工作背景
                IList<PersonalWorkModel> work = GetPersonalWorkModel(uid);
                k1 += 3;
                if (work != null && work.Count > 0)
                {
                    if (!string.IsNullOrEmpty(work[0].company_name)) k2++;
                    if (!string.IsNullOrEmpty(work[0].position_name)) k2++;
                    if (!string.IsNullOrEmpty(work[0].position_category)) k2++;
                }

                //联系方式
                PersonalContactModel contactModel = new PersonalContactModel();
                contactModel = GetPersonalContactModel(pspmodel.user_id);

                k1++; if (contactModel.skype != null && contactModel.skype != "") k2++;
                k1++; if (contactModel.msn != null && contactModel.msn != "") k2++;
                k1++; if (contactModel.cell != null && contactModel.cell != "") k2++;
                k1++; if (contactModel.website != null && contactModel.website != "") k2++;

                //爱好
                PersonalInterestsModel interestsModel = new PersonalInterestsModel();
                interestsModel = GetPersonalInterestsModel(pspmodel.user_id);
                k1++; if (interestsModel.book.Trim() != "") k2++;
                k1++; if (interestsModel.cartoon.Trim() != "") k2++;
                k1++; if (interestsModel.game.Trim() != "") k2++;
                k1++; if (interestsModel.movie.Trim() != "") k2++;
                k1++; if (interestsModel.music.Trim() != "") k2++;
                k1++; if (interestsModel.sport.Trim() != "") k2++;

                exp = k2 * 100 / k1;

                profileModel.integrity_score = (double)exp;
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("user_id", pspmodel.user_id);
                dic.Add("integrity_score", profileModel.integrity_score);
                int result = DbHelperFactory.SingleInstance().ExecuteNonQuery("PersonSQL", "EditExp", dic);
                if (result > 0)
                {
                    if (icache.ObjectIsExist("PersonalSecurityProfile_" + pspmodel.user_id))
                    {
                        icache.RemoveObject("PersonalSecurityProfile_" + pspmodel.user_id);
                    }
                    RemoveModelCache(basicKey, pspmodel.user_id);
                }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        //public bool Exists(string uid)
        //{
        //    string key = basicKey + "IsNull_" + uid;

        //    if (personalInterface == null) personalInterface = new PersonalProfileSqlDataProvided();

        //    if (HttpRuntime.Cache[key] != null)
        //        return (bool)HttpRuntime.Cache[key];
        //    else
        //    {
        //        bool data = personalInterface.Exists(uid);
        //        Caches.TryAddCache(key, data, TimeSpan.FromMinutes(20), System.Web.Caching.CacheItemPriority.Normal);
        //        return data;
        //    }
        //}


        #endregion

        #region 私有成员

        private string CastSchoolType(string flagId)
        {
            string result = string.Empty;
            switch (flagId)
            {
                case "1":
                    result = "0a88a926-05c5-11e1-b0dd-00306701b527"; //大学
                    break;
                case "2":
                    result = "0a7db215-05c5-11e1-b0dd-00306701b527"; //高中
                    break;
                case "3":
                    result = "0a8200ec-05c5-11e1-b0dd-00306701b527"; //职高
                    break;
                case "4":
                    result = "0a7215d8-05c5-11e1-b0dd-00306701b527"; //初中
                    break;
                case "5":
                    result = "0a78a5dc-05c5-11e1-b0dd-00306701b527"; //中专
                    break;
                case "6":
                    result = "0a6a9d93-05c5-11e1-b0dd-00306701b527"; //小学
                    break;
                default:
                    break;
            }
            return result;
        }

        private void RemoveModelCache(string key, string uid)
        {
            if (icache.ObjectIsExist(key + "Model_" + uid))
            {
                icache.RemoveObject(key + "Model_" + uid);
            }
        }


        /// <summary>
        /// 重命名Dictionary
        /// </summary>
        /// <param name="str">锯齿数组</param>
        /// <param name="dic">Ref 字典</param>
        private void ReNameDic(string[][] str, ref  Dictionary<string, object> dic)
        {
            System.Collections.ArrayList list = new System.Collections.ArrayList(dic.Keys);
            foreach (string key in list)
            {
                foreach (string[] arr in str)
                {
                    if (arr != null && arr.Length >= 2)
                    {
                        if (arr[0] == key)
                        {
                            dic.Add(arr[1], dic[key]);
                            dic.Remove(key);
                        }
                    }
                }
            }
        }

        private string Message(string key, MessageType msgtype)
        {
            string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(tipLanguage);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson(tipLanguage);
            }
        }

        /// <summary>
        /// 徐蓓 2012-8-13添加
        /// </summary>
        /// <param name="o"></param>
        /// <param name="msgtype"></param>
        /// <returns></returns>
        private string Message(object o, MessageType msgtype)
        {
            //string tipLanguage = WanerDaoGlobalTip.GetInternationalizationTip(key);
            if (msgtype == MessageType.success)
            {
                return WanerDaoJSON.GetSuccessJson(o);
            }
            else
            {
                return WanerDaoJSON.GetErrorJson("fail");
            }
        }
        enum MessageType
        {
            success,
            error
        }

        #endregion
    }
}
