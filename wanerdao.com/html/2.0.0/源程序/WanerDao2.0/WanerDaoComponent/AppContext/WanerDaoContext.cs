#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/25 19:01:36 
* 文件名：WanerDaoContext 
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
//using WanerDaoComponent.AppContext;
using WanerDao2.WanerDaoCacheManager;
using WanerDao2.WanerDaoModule.TipInfo;
using WanerDao2.WanerDaoDALFactory;
using System.Data;
using WanerDao2.WanerDaoModule.Cookie;
//namespace WanerDaoComponent.AppContext
//{
//    public class CurrentContext
//    {
//        private CurrentContext()
//        {

//        }

//        private static volatile CurrentContext instance = null;
//        private static readonly Object syncRoot = new object();
//        public static CurrentContext GetInstance()
//        {
//            if (instance == null)
//            {
//                lock (syncRoot)
//                {
//                    if (instance == null)
//                    {
//                        instance = new CurrentContext();
//                    }
//                }
//            }
//            return instance;
//        }

//        //private PersonalSecurityProfileModel _pspModel;

//        public PersonalSecurityProfileModel PspModel
//        {
//            get { return GetUserSecurityInfo(); }
//            //set { _pspModel = value; }
//        }

//        private string _userID;

//        public string UserID
//        {
//            get
//            {
//                return PspModel == null ? null : PspModel.user_id;
//            }
//        }

//        private PersonalSecurityProfileModel GetUserSecurityInfo()
//        {
//            PersonalSecurityProfileModel pspmodel = null;
//            Dictionary<string, string> cookies = WanerDaoCookie.GetCookieValues("wanerdao_uid");
//            if (cookies != null)
//            {
//                string user_id = WanerDao2.WanerDaoModule.Security.WanerDaoDES.Decode(cookies["uid"]);
//                string account = WanerDao2.WanerDaoModule.Security.WanerDaoDES.Decode(cookies["account"]);
//                string password = WanerDao2.WanerDaoModule.Security.WanerDaoDES.Decode(cookies["password"]);
//                pspmodel = (PersonalSecurityProfileModel)WanerDaoCacheFactory.SingleInstance().GetStrategy(0).RetrieveObject("PersonalSecurityProfile_" + user_id);
//                if (pspmodel == null)
//                {
//                    Dictionary<string, object> mydic = new Dictionary<string, object>(){
//                    {"account",account},{"password",password} };

//                    IList<PersonalSecurityProfileModel> personlist = new List<PersonalSecurityProfileModel>();
//                    personlist = DbHelperFactory.SingleInstance().GetGenericModel<PersonalSecurityProfileModel>("PersonSQL", "SelectPersonalSecurity", mydic);
//                    if (personlist != null)
//                    {
//                        pspmodel = personlist[0];
//                        WanerDaoCacheFactory.SingleInstance().GetStrategy(0).AddObject("PersonalSecurityProfile_" + pspmodel.user_id, pspmodel);
//                    }
//                    else
//                    {
//                        WanerDaoCookie.ClearCookie("wanerdao_uid");
//                    }
//                }

//                //if (CommonContext.CurrentContext == null || CommonContext.GetUserSecurityInfo() == null || !CommonContext.GetUserSecurityInfo().Equals(pspmodel))
//                //{
//                //    CommonContext.CurrentContext = CurrentContext.GetInstance();
//                //    CommonContext.GetUserSecurityInfo() = pspmodel;
//                //}
//            }
//            else
//            {//cookie不存在
//                pspmodel = null;
//            }
//            return pspmodel;
//        }

//    }
//}

namespace System
{
    public static class CommonContext
    {
        //private static CurrentContext _CurrentContext;
        //private static Dictionary<string, string> cookieDic = WanerDao2.WanerDaoModule.Cookie.WanerDaoCookie.GetCookieValues("wanerdao_uid");
        //public static CurrentContext CurrentContext
        //{
        //    get 
        //    {
        //        return CurrentContext.GetInstance();            
        //    }
        //    //get
        //    //{
        //    //    if (cookieDic != null)
        //    //    {
        //    //        string cacheKey = cookieDic["uid"].ToString() + "_commonCacheKey";
        //    //        object cacheObj = WanerDaoCacheFactory.SingleInstance().GetStrategy(0).RetrieveObject(cacheKey);
        //    //        if (cacheObj != null) return (CurrentContext)cacheObj;
        //    //        else return null;
        //    //    }
        //    //    else
        //    //    {
        //    //        return null;
        //    //    }
        //    //}
        //    //set
        //    //{
        //    //    string cacheKey = cookieDic["uid"].ToString() + "_commonCacheKey";
        //    //    WanerDaoCacheFactory.SingleInstance().GetStrategy(0).AddObject(cacheKey, value);
        //    //    _CurrentContext = value;
        //    //}
        //}
        /// <summary>
        /// 获取当前登陆用户的信息（2012-10-23 徐蓓添加）
        /// 先通过cookie获取用户的uid、account、password，然后再以"PersonalSecurityProfile_" + uid为key在缓存中查找。
        /// 如果没有就从数据库中获取，返回值可能为null。
        /// 
        /// </summary>
        /// <returns></returns>
        public static PersonalSecurityProfileModel GetUserSecurityInfo()
        {
            PersonalSecurityProfileModel pspmodel = null;
            Dictionary<string, string> cookies = WanerDaoCookie.GetCookieValues("wanerdao_uid");
            if (cookies != null)
            {
                string user_id = WanerDao2.WanerDaoModule.Security.WanerDaoDES.Decode(cookies["uid"]);
                string account = WanerDao2.WanerDaoModule.Security.WanerDaoDES.Decode(cookies["account"]);
                string password = WanerDao2.WanerDaoModule.Security.WanerDaoDES.Decode(cookies["password"]);
                pspmodel = (PersonalSecurityProfileModel)WanerDaoCacheFactory.SingleInstance().GetStrategy(0).RetrieveObject("PersonalSecurityProfile_" + user_id);
                if (pspmodel == null)
                {
                    Dictionary<string, object> mydic = new Dictionary<string, object>(){
                    {"account",account},{"password",password} };

                    IList<PersonalSecurityProfileModel> personlist = new List<PersonalSecurityProfileModel>();
                    personlist = DbHelperFactory.SingleInstance().GetGenericModel<PersonalSecurityProfileModel>("PersonSQL", "SelectPersonalSecurity", mydic);
                    if (personlist != null)
                    {
                        pspmodel = personlist[0];
                        WanerDaoCacheFactory.SingleInstance().GetStrategy(0).AddObject("PersonalSecurityProfile_" + pspmodel.user_id, pspmodel);
                    }
                    else
                    {
                        WanerDaoCookie.ClearCookie("wanerdao_uid");
                    }
                }
            }
            else
            {//cookie不存在
                pspmodel = null;
            }
            return pspmodel;
        }
        public static string SucMsg(object sucessMessage)
        {
            if (sucessMessage is string)
            {
                string tipLanguage = WanerDao2.WanerDaoModule.TipInfo.WanerDaoGlobalTip.GetInternationalizationTip(sucessMessage.ToString());

                return WanerDao2.WanerDaoModule.Json.WanerDaoJSON.GetSuccessJson(tipLanguage);
            }
            else
            {
                return WanerDao2.WanerDaoModule.Json.WanerDaoJSON.GetSuccessJson(sucessMessage);
            }
        }

        public static string ErrMsg(string errorMessage)
        {
            return WanerDao2.WanerDaoModule.Json.WanerDaoJSON.GetErrorJson(errorMessage);
        }

        #region 获取客户端语言
        /// <summary>
        /// 获取客户端语言并转换成数据库对应语言ID
        /// </summary>
        /// <returns></returns>
        public static string GetClientLanguage()
        {
            string languageid = string.Empty;
            ICacheStrategy ics = WanerDaoCacheFactory.SingleInstance().GetStrategy(CacheType.CacheHttpCache);
            //string o = "languageid";
            string langType = WanerDaoGlobalTip.GetClientLanguageName();
            if (!ics.ObjectIsExist(langType))
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                dic.Add("name", langType);
                DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "wanerdaoLanguage", dic);
                if (ds != null && ds.Tables[0] != null)
                {
                    languageid = ds.Tables[0].Rows[0][0].ToString();
                    ics.AddObject(langType, languageid);
                }
            }
            else
            {
                languageid = ics.RetrieveObject(langType).ToString();
            }
            //现在增加了切换语言的功能，所以缓存需要去掉（2012-8-28徐蓓修改）
            //Dictionary<string, object> dic = new Dictionary<string, object>();
            //dic.Add("name", WanerDaoGlobalTip.GetClientLanguageName());
            //DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "wanerdaoLanguage", dic);
            //if (ds != null && ds.Tables[0] != null)
            //{
            //    languageid = ds.Tables[0].Rows[0][0].ToString();
            //}
            return languageid;
            // return WanerDaoJSON.GetSuccessJson(WanerDaoModule.TipInfo.WanerDaoGlobalTip.GetClientLanguageHasSeparator());
        }

        /// <summary>
        /// 根据传入的语言类型获取语言号（2012-8-28徐蓓添加）
        /// </summary>
        /// <param name="langType">语言类型（比如en-us、zh-cn）</param>
        /// <returns></returns>
        public static string GetLanguageId(string langType)
        {
            string languageid = string.Empty;
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("name", WanerDaoGlobalTip.GetClientLanguageName(langType));
            DataSet ds = DbHelperFactory.SingleInstance().GetDataSet("CommonSQL", "wanerdaoLanguage", dic);
            if (ds != null && ds.Tables[0] != null)
            {
                languageid = ds.Tables[0].Rows[0][0].ToString();
            }
            return languageid;
        }
        #endregion

        public static string PublicPermission { get { return "ce5e9318-a617-11e1-aa1f-101f74b66417"; } }  //d500f146912111e0bae500210044b80f
    }
}
