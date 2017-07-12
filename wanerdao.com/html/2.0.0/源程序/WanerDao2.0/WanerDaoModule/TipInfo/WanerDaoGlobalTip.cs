using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModule.Config;
using System.Web;
using WanerDao2.WanerDaoModule.Json;
using WanerDao2.WanerDaoModule.Cookie;
#region 【本类功能概述】
/* ======================================================================== *  
* 功能说明：
* 
* 作者：金广亮
* 时间：2012-1-1 23:42:38 
* 文件名：WanerDaoTip 
* 版本：V0.0.1
* 
* 修改者： 
* 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion
namespace WanerDao2.WanerDaoModule.TipInfo
{
    public class WanerDaoGlobalTip
    {
        /// <summary>
        /// 描述：获取根据浏览器的UserLanguages获取对应地区提示信息
        /// </summary>
        /// <param name="key">配置文件中的KEY名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        public static string GetInternationalizationTip(string key)
        {
            string tip = string.Empty;
            //GetTipInfo
            string lang = GetCookieInternLang();
            if (string.IsNullOrEmpty(lang))
            {
                string[] languages = HttpContext.Current.Request.UserLanguages;
                if (languages == null)
                {
                    tip = GetTipInfo("en-us", key);
                }
                else
                {
                    if (languages[0].Contains(";"))
                    {
                        tip = GetTipInfo(languages[0].ToLower().Substring(0, languages[0].IndexOf(";")), key);
                    }
                    else
                    {
                        tip = GetTipInfo(languages[0].ToLower(), key);
                    }
                }
            } 
            else
            {
                tip = GetTipInfo(lang, key);
            }

            return tip;
        }
        
        /// <summary>
        /// 描述：以JSON格式获取根据浏览器的UserLanguages获取对应地区提示信息
        /// </summary>
        /// <param name="key">配置文件中的KEY名称</param>
        /// <param name="result">成功与否枚举</param>
        /// <returns>以JSON格式返回提示信息</returns>
        public static string GetInternationalizationTip(string key,WanerDaoResultEnum result)
        {
            if (result==WanerDaoResultEnum.Success)
            {
                return WanerDaoJSON.GetSuccessJson(GetInternationalizationTip(key));
            } 
            else
            {
                return WanerDaoJSON.GetErrorJson(GetInternationalizationTip(key));
            }
        }
        /// <summary>
        /// 描述：获取客户端的用户语言
        /// 作者：金广亮
        /// 时间：2012-2-16
        /// </summary>
        /// <returns>如果获取不到用户客户端语言返回英语，否则返回用户客户端语言集合中的第一个选项</returns>
        public static string GetClientLanguage()
        {
            string tip = string.Empty;
            string lang = GetCookieInternLang();
            if (string.IsNullOrEmpty(lang))
            {
                string[] languages = HttpContext.Current.Request.UserLanguages;
                if (languages == null)
                {
                    tip = "en-us";
                }
                else
                    tip = languages[0].ToLower();
            }
            else
            {
                tip = lang;
            }
            return tip;
        }
        /// <summary>
        /// 描述：通过cookie获取用户自行设置的语言版本
        /// 作者：金广亮
        /// 时间：2012-2-29
        /// </summary>
        /// <returns>如果用户设置语言版本返回其语言信息反之返回string.Empty</returns>
        public static string GetCookieInternLang()
        {
            Dictionary<string, string> dicLang = WanerDaoCookie.GetCookieValues("multiplelang");
            string lang = string.Empty;
            if (dicLang != null)
            {
                lang = dicLang["langid"];
            }
            return lang;
        }
        /// <summary>
        /// 描述：获取TipConfig文件夹下面的对应语言版本信息
        /// 作者：金广亮
        /// 时间：2012-2-29
        /// </summary>
        /// <param name="langid">语言ID(例如中文:zh-cn)</param>
        /// <param name="key">配置文件中的KEY名称</param>
        /// <returns>成功返回结果，否则返回string.Empty</returns>
        private static string GetTipInfo(string langid,string key)
        {
            return WanerDaoConfigReader.GetConfigXml("TipConfig", langid, "Info", key);
        }

        /// <summary>
        /// 获取用户语言GUID
        /// 作者：徐兵
        /// 时间：2012-4-19
        /// 修改者：金广亮
        /// 时间：2012-5-29
        /// 修改原因：从数据库读取对应语言版本ID
        /// </summary>
        /// <returns></returns>
        public static string GetClientLanguageName()
        {
            string x = WanerDaoConfigReader.GetConfigXml("MultipleLanguage","language", GetClientLanguage());
            //string _languageGuid = "a098d6c8-f181-11e0-8a53-00306701b527";
            //string _languageGuid = "a1c3e20e-f181-11e0-8a53-00306701b527";
            return x;
        }
        /// <summary>
        /// 根据语言类型获取语言名称
        /// </summary>
        /// <param name="langType">语言类型</param>
        /// <returns></returns>
        public static string GetClientLanguageName(string langType)
        {
            string x = WanerDaoConfigReader.GetConfigXml("MultipleLanguage", "language", langType);
            return x;
        }

    }
}
