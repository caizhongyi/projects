#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/9 23:24:31 
* 文件名：GiftCategoryModel 
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

namespace WanerDao2.WanerDaoModel.Relation
{
    /// <summary>
    /// 礼物分类类别
    /// </summary>
    [Serializable]
    public class GiftCategoryModel
    {
        public GiftCategoryModel()
        { }
        #region Model
        private string _id;
        private string _parent_id;
        private string _category_name;
        private string _description;
        private string _language_id;
        private bool _active = true;
        /// <summary>
        /// 分类号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 父级分类号
        /// </summary>
        public string parent_id
        {
            set { _parent_id = value; }
            get { return _parent_id; }
        }
        /// <summary>
        /// 节目分类名
        /// </summary>
        public string category_name
        {
            set { _category_name = value; }
            get { return _category_name; }
        }
        /// <summary>
        /// 分类说明
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }
        /// <summary>
        /// 语言号
        /// </summary>
        public string language_id
        {
            set { _language_id = value; }
            get { return _language_id; }
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
