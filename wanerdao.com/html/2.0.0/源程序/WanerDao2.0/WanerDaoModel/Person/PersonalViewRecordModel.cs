#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人阅读记录实体
* 作者：徐蓓   时间：2011/12/18 1:48:13 
* 文件名：PersonalViewRecord 
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
using WanerDao2.WanerDaoModule.TipInfo;

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// PersonalViewRecord:个人阅读记录表
    /// </summary>
    [Serializable]
    public class PersonalViewRecordModel
    {
        public PersonalViewRecordModel()
        { }
        #region Model
        private string _id;
        private int _sort_id;
        private string _user_id;
        private string _source_id;
        private string _source_type_id;
        private bool? _is_read;
        private DateTime? _rec_date;
        //private string _language_id = WanerDaoGlobalTip.GetClientLanguageGuid();
        private string _language_id = string.Empty;
        private bool? _active = true;
        /// <summary>
        /// 
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// auto_increment
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string source_id
        {
            set { _source_id = value; }
            get { return _source_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string source_type_id
        {
            set { _source_type_id = value; }
            get { return _source_type_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? is_read
        {
            set { _is_read = value; }
            get { return _is_read; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? rec_date
        {
            set { _rec_date = value; }
            get { return _rec_date; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string language_id
        {
            set { _language_id = value; }
            get { return _language_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
