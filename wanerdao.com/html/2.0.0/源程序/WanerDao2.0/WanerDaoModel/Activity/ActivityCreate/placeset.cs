#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-5 9:48:49 
* 文件名：placeset 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivityCreate
{
    /// <summary>
    /// 活动地址
    /// </summary>
    public class PlaceSet
    {
        private string _countryid;
        private string _countryname;
        private string _provinceid;
        private string _provincename;
        private string _cityid;
        private string _cityname;

        private string _zip;
        private string _addr;
        /// <summary>
        /// 国家ID
        /// </summary>
        public string countryid
        {
            get { return _countryid; }
            set { _countryid = value; }
        }
        public string countryname
        {
            get { return _countryname; }
            set { _countryname = value; }
        }
        /// <summary>
        /// 省份ID
        /// </summary>
        public string provinceid
        {
            get { return _provinceid; }
            set { _provinceid = value; }
        }
        public string provincename
        {
            get { return _provincename; }
            set { _provincename = value; }
        }
        /// <summary>
        /// 城市ID
        /// </summary>
        public string cityid
        {
            get { return _cityid; }
            set { _cityid = value; }
        }

        public string cityname
        {
            get { return _cityname; }
            set { _cityname = value; }
        }
        /// <summary>
        /// 邮编
        /// </summary>
        public string zip
        {
            get { return _zip; }
            set { _zip = value; }
        }

        /// <summary>
        /// 地址
        /// </summary>
        public string addr
        {
            get { return _addr; }
            set { _addr = value; }
        }
    }
}
