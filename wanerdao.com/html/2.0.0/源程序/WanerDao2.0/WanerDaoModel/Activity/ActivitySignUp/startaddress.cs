#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-24 
* 文件名：address 
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

namespace WanerDao2.WanerDaoModel.Activity.ActivitySignUp
{
    public class startaddress
    {
        private string _address;
        private string _countryid;
        private string _stateid;
        private string _cityid;
        private string _zip;

        public string address
        {
            get { return _address; }
            set { _address = value; }
        }
        
        public string countryid
        {
            get { return _countryid; }
            set { _countryid = value; }
        }
        
        public string stateid
        {
            get { return _stateid; }
            set { _stateid = value; }
        }
        
        public string cityid
        {
            get { return _cityid; }
            set { _cityid = value; }
        }
        
        public string zip
        {
            get { return _zip; }
            set { _zip = value; }
        }
    }
}
