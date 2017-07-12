#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-24 
* 文件名：VehicleType 
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
    /// <summary>
    /// 搭车信息
    /// </summary>
    public class vehicletype
    {
        private string _vehicletypeid;
        private bool _isauto;
        private providercar _providercar;
        private bycar _bycar;

        public string vehicletypeid
        {
            get { return _vehicletypeid; }
            set { _vehicletypeid = value; }
        }
        public bool isauto
        {
            get { return _isauto; }
            set { _isauto = value; }
        }
        public providercar providercar
        {
            get { return _providercar; }
            set { _providercar = value; }
        }
        public bycar bycar
        {
            get { return _bycar; }
            set { _bycar = value; }
        }
    }
    public class providercar
    {
        
        private bool _ispermit;
        private List<bycaruser> _bycarusers;
        private string _carpooltypeid;
        private Double _carpoolmoney;
        private string _autobrandid;
        private string _automodelid;
        private string _autoplate;
        private string _autoyear;
        private int _carpoolnbr;
        private int _currentcarpoolnbr;
        
        public bool ispermit
        {
            get { return _ispermit; }
            set { _ispermit = value; }
        }
        public List<bycaruser> bycarusers
        {
            get { return _bycarusers; }
            set { _bycarusers = value; }
        }
        
        public string carpooltypeid
        {
            get { return _carpooltypeid; }
            set { _carpooltypeid = value; }
        }
        public Double carpoolmoney
        {
            get { return _carpoolmoney; }
            set { _carpoolmoney = value; }
        }
        public string autobrandid
        {
            get { return _autobrandid; }
            set { _autobrandid = value; }
        }
        public string automodelid
        {
            get { return _automodelid; }
            set { _automodelid = value; }
        }
        /// <summary>
        /// 车牌号
        /// </summary>
        public string autoplate
        {
            get { return _autoplate; }
            set { _autoplate = value; }
        }
        public string autoyear
        {
            get { return _autoyear; }
            set { _autoyear = value; }
        }
        
        public int carpoolnbr
        {
            get { return _carpoolnbr; }
            set { _carpoolnbr = value; }
        }
        public int currentcarpoolnbr
        {
            get { return _currentcarpoolnbr; }
            set { _currentcarpoolnbr = value; }
        }

    }
    public class bycaruser
    {
        private string _userid;
        private string _username;
        private int _ispass;

        /// <summary>
        /// 成员ID
        /// </summary>
        public string userid
        {
            get { return _userid; }
            set { _userid = value; }
        }
        public string username
        {
            get { return _username; }
            set { _username = value; }
        }
        /// <summary>
        /// 是否通过申请0通过1拒绝2审核
        /// </summary>
        public int ispass
        {
            get { return _ispass; }
            set { _ispass = value; }
        }
    }
    public class bycar
    {
        private bool _isneedcarpool;
        private string _carpoolid;
        private string _providercarpoolid;

        private string _carpooltypeid;
        private Double _carpoolmoney;
        private string _providercarpoolname;

        public bool isneedcarpool
        {
            get { return _isneedcarpool; }
            set { _isneedcarpool = value; }
        }
        public string carpoolid
        {
            get { return _carpoolid; }
            set { _carpoolid = value; }
        }
        public string providercarpoolid
        {
            get { return _providercarpoolid; }
            set { _providercarpoolid = value; }
        }


        public string carpooltypeid
        {
            get { return _carpooltypeid; }
            set { _carpooltypeid = value; }
        }
        public Double carpoolmoney
        {
            get { return _carpoolmoney; }
            set { _carpoolmoney = value; }
        }
        public string providercarpoolname
        {
            get { return _providercarpoolname; }
            set { _providercarpoolname = value; }
        }
    }
}
