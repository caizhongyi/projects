#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/4/9 23:25:54 
* 文件名：GiftsMarketModel 
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
    /// 礼品市场
    /// </summary>
    [Serializable]
    public class GiftsMarketModel
    {
        public GiftsMarketModel()
        { }
        #region Model
        private string _id;
        private string _gift_name;
        private string _category_id;
        private string _description;
        private string _language_id;
        private bool _active = true;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 礼品名
        /// </summary>
        public string gift_name
        {
            set { _gift_name = value; }
            get { return _gift_name; }
        }
        /// <summary>
        /// 礼品分类
        /// </summary>
        public string category_id
        {
            set { _category_id = value; }
            get { return _category_id; }
        }
        /// <summary>
        /// 礼品描述
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
