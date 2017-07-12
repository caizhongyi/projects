#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
*  Cookie操作类
* 作者：杨晓东   时间：2011/9/29 22:48:23 
* 文件名：WanerDaoCookie 
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
using System.Collections;

namespace WanerDao2.WanerDaoModule.Cookie
{
    public class WanerDaoCookie
    {
        public WanerDaoCookie() { }

        /// <summary>
        /// 保存一个Cookie
        /// </summary>        
        /// <param name="CookieName">Cookie名称</param>
        /// <param name="CookieValue">uid=xxx,pwd=xxx</param>        
        /// <param name="CookieTime">Cookie过期时间(小时),0为关闭页面失效</param>
        public static void AddCookie(string CookieName, Dictionary<string,string> CookieValue, double CookieTime)
        {
            if (HttpContext.Current.Request.Cookies[CookieName] != null)
            {
                HttpContext.Current.Response.Cookies.Remove(CookieName);
            }

            HttpCookie myCookie = new HttpCookie(CookieName);

            DateTime now = DateTime.Now;

            //for (int i = 0; i < CookieValue.Length / 2; i++)
            //{
            //    myCookie.Values.Add(CookieValue[i * 2], CookieValue[i * 2 + 1]);
            //}
            IEnumerator ie = CookieValue.Keys.GetEnumerator();
            while (ie.MoveNext())
            {
                myCookie.Values.Add(ie.Current.ToString(), HttpContext.Current.Server.UrlEncode(CookieValue[ie.Current.ToString()].ToString()));
            }
            if (CookieTime != 0)
            {
                myCookie.Expires = now.AddHours(CookieTime);
            }

            //myCookie.Domain = WanerDaoModule.Config.WanerDaoConfigReader.GetSiteDomain();
            myCookie.Path = "/";

            HttpContext.Current.Response.Cookies.Add(myCookie);
        }

        /// <summary>
        /// 取得Cookie
        /// </summary>
        /// <param name="CookieName">Cookie名称</param>
        /// <returns>uid</returns>
        public static Dictionary<string, string> GetCookieValues(string CookieName)
        {
            HttpCookie myCookie;

            Dictionary<string, string> cookieValue = null;

            if (HttpContext.Current.Request.Cookies[CookieName] != null)
            {
                myCookie = HttpContext.Current.Request.Cookies[CookieName];

                if (myCookie.Values.Count > 0) cookieValue = new Dictionary<string, string>();

                for (int i = 0; i < myCookie.Values.Count; i++)
                {
                    cookieValue.Add(myCookie.Values.GetKey(i), HttpContext.Current.Server.UrlDecode(myCookie.Values[myCookie.Values.GetKey(i)]));
                }
            }

            return cookieValue;
        }


        /// <summary>
        /// 清除CookieValue
        /// </summary>
        /// <param name="CookieName">Cookie名称</param>
        public static void ClearCookie(string CookieName)
        {
            HttpCookie myCookie = new HttpCookie(CookieName);
            DateTime now = DateTime.Now;

            myCookie.Expires = now.AddYears(-100);

            HttpContext.Current.Response.Cookies.Add(myCookie);
        }
    }
}
