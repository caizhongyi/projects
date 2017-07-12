#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户收藏夹分类实体
* 作者：吴志斌   时间：2011/12/5 22:48:00 
* 文件名：BookMarkCategoryModel 
* 版本：V1.0.0 
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
    [Serializable]
    public class BookMarkCategoryModel
    {
        public BookMarkCategoryModel()
        { }

        #region Model
        private string _id;
        private string _create_id;
        private string _category;
        private int? _sequence;
        private DateTime? _create_time;
        private bool? _is_system;
        private bool? _active;

        /// <summary>
        /// 序号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }

        /// <summary>
        /// 创建人号
        /// </summary>
        public string create_id
        {
            set { _create_id = value; }
            get { return _create_id; }
        }

        /// <summary>
        /// 分类名
        /// </summary>
        public string category
        {
            set { _category = value; }
            get { return _category; }
        }

        /// <summary>
        /// 顺序
        /// </summary>
        public int? sequence
        {
            set { _sequence = value; }
            get { return _sequence; }
        }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? create_datetime
        {
            set { _create_time = value; }
            get { return _create_time; }
        }

        /// <summary>
        /// 是否系统创建
        /// </summary>
        public bool? is_system
        {
            set { _is_system = value; }
            get { return _is_system; }
        }

        /// <summary>
        /// 是否有效
        /// </summary>
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion
    }
}
