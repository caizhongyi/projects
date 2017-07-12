#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-02-5 10:31:10 
* 文件名：bycarinfo 
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
    public class bycarinfo
    {
        private string _getpeople;

        private int _getpeoplecount;

        private double _carfare;

        private string _peoplefare;

        private string _caretype;

        private string _careid;

        private string _careyear;
        /// <summary>
        /// 是否愿意提供搭车
        /// </summary>
        public string getpeople
        {
            get { return _getpeople; }
            set { _getpeople = value; }
        }
        /// <summary>
        /// 搭车人数
        /// </summary>
        public int getpeoplecount
        {
            get { return _getpeoplecount; }
            set { _getpeoplecount = value; }
        }
        /// <summary>
        /// 搭车费
        /// </summary>
        public double carfare
        {
            get { return _carfare; }
            set { _carfare = value; }
        }
        /// <summary>
        /// 每人分担搭车费
        /// </summary>
        public string peoplefare
        {
            get { return _peoplefare; }
            set { _peoplefare = value; }
        }
        /// <summary>
        /// 车型
        /// </summary>
        public string caretype
        {
            get { return _caretype; }
            set { _caretype = value; }
        }
        /// <summary>
        /// 车牌号
        /// </summary>
        public string careid
        {
            get { return _careid; }
            set { _careid = value; }
        }
        /// <summary>
        /// 车辆年代
        /// </summary>
        public string careyear
        {
            get { return _careyear; }
            set { _careyear = value; }
        }
    }
}
