#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人教育背景实体
* 作者：杨晓东   时间：2011/10/2 0:53:47 
* 文件名：IPersonalEducationModel 
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

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 个人教育背景
    /// </summary>
    [Serializable]
    public partial class PersonalEducationModel
    {
        public PersonalEducationModel()
        { }
        #region Model
        private string _id = "";
        private string _use_id = "";
        private string _school_name = "";
        private int _school_type;
        private string _campus = "";
        private string _department = "";
        private string _major = "";
        private string _degree = "";
        private string _domistry = "";
        private string _class = "";
        private string _class2 = "";
        private string _class3 = "";
        private int _begin_year;
        private int _begin_month;
        private int _end_year;
        private int _end_month;
        private string _permission = "";
        private bool _active = true;
        /// <summary>
        /// 序号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 用户号
        /// </summary>
        public string use_id
        {
            set { _use_id = value; }
            get { return _use_id; }
        }
        /// <summary>
        /// 学校名
        /// </summary>
        public string school_name
        {
            set { _school_name = value; }
            get { return _school_name; }
        }
        /// <summary>
        /// 学校类型（小学等）
        /// </summary>
        public int school_type
        {
            set { _school_type = value; }
            get { return _school_type; }
        }
        /// <summary>
        /// 学院
        /// </summary>
        public string campus
        {
            set { _campus = value; }
            get { return _campus; }
        }
        /// <summary>
        /// 系
        /// </summary>
        public string department
        {
            set { _department = value; }
            get { return _department; }
        }
        /// <summary>
        /// 专业
        /// </summary>
        public string major
        {
            set { _major = value; }
            get { return _major; }
        }
        /// <summary>
        /// 学位
        /// </summary>
        public string degree
        {
            set { _degree = value; }
            get { return _degree; }
        }
        /// <summary>
        /// 宿舍
        /// </summary>
        public string domistry
        {
            set { _domistry = value; }
            get { return _domistry; }
        }
        /// <summary>
        /// 班级
        /// </summary>
        public string Class
        {
            set { _class = value; }
            get { return _class; }
        }
        /// <summary>
        /// 班级2
        /// </summary>
        public string class2
        {
            set { _class2 = value; }
            get { return _class2; }
        }
        /// <summary>
        /// 班级3
        /// </summary>
        public string class3
        {
            set { _class3 = value; }
            get { return _class3; }
        }
        /// <summary>
        /// 开始年
        /// </summary>
        public int begin_year
        {
            set { _begin_year = value; }
            get { return _begin_year; }
        }
        /// <summary>
        /// 开始月
        /// </summary>
        public int begin_month
        {
            set { _begin_month = value; }
            get { return _begin_month; }
        }
        /// <summary>
        /// 结束年
        /// </summary>
        public int end_year
        {
            set { _end_year = value; }
            get { return _end_year; }
        }
        /// <summary>
        /// 结束月
        /// </summary>
        public int end_month
        {
            set { _end_month = value; }
            get { return _end_month; }
        }
        /// <summary>
        /// 其他用户访问权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
        }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
