#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2011/10/31 21:33:35 
* 文件名：PersonalNameCardModel 
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
    /// 个人名片卡
    /// </summary>
    [Serializable]
    public class PersonalNameCardModel
    {
        public PersonalNameCardModel()
        { } 
        #region Model
        private string _user_id;
        private bool _is_available;
        private bool _is_display_current_place;
        private string _current_place = "";
        private bool _is_display_home;
        private string _home="";
        private bool _is_display_school;
        private string _school="";
        private bool _is_display_work;
        private string _work_place="";
        private bool _is_display_contellation;
        private string _contellation="";
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 是否被搜索
        /// </summary>
        public bool is_available
        {
            set { _is_available = value; }
            get { return _is_available; }
        }
        /// <summary>
        /// 是否显示现在地址
        /// </summary>
        public bool is_display_current_place
        {
            set { _is_display_current_place = value; }
            get { return _is_display_current_place; }
        }
        /// <summary>
        /// 现所在地
        /// </summary>
        public string current_place
        {
            set { _current_place = value; }
            get { return _current_place; }
        }
        /// <summary>
        /// 是否显示家乡
        /// </summary>
        public bool is_display_home
        {
            set { _is_display_home = value; }
            get { return _is_display_home; }
        }
        /// <summary>
        /// 家乡
        /// </summary>
        public string home
        {
            set { _home = value; }
            get { return _home; }
        }
        /// <summary>
        /// 是否显示学校
        /// </summary>
        public bool is_display_school
        {
            set { _is_display_school = value; }
            get { return _is_display_school; }
        }
        /// <summary>
        /// 学校
        /// </summary>
        public string school
        {
            set { _school = value; }
            get { return _school; }
        }
        /// <summary>
        /// 是否显示工作单位
        /// </summary>
        public bool is_display_work
        {
            set { _is_display_work = value; }
            get { return _is_display_work; }
        }
        /// <summary>
        /// 工作单位
        /// </summary>
        public string work_place
        {
            set { _work_place = value; }
            get { return _work_place; }
        }
        /// <summary>
        /// 是否显示星座
        /// </summary>
        public bool is_display_contellation
        {
            set { _is_display_contellation = value; }
            get { return _is_display_contellation; }
        }
        /// <summary>
        /// 星座
        /// </summary>
        public string contellation
        {
            set { _contellation = value; }
            get { return _contellation; }
        }
        #endregion Model

    }
}
