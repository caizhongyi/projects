using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModel.Relation
{
    /// <summary>
    /// 描述:好友实体类
    /// 描述：xux
    /// 时间：2011-11-20
    /// </summary>
    [Serializable]
    public partial class FriendsModel
    {
        public FriendsModel() { }

        #region Model
        private string _class_id;
        private string _relation_name;
        private string _num;
        private int _sort_id;
        /// <summary>
        /// 序列号
        /// </summary>
        public string class_id
        {
            set { _class_id = value; }
            get { return _class_id; }
        }

        /// <summary>
        /// 分组名
        /// </summary>
        public string relation_name
        {
            set { _relation_name = value; }
            get { return _relation_name; }
        }

        /// <summary>
        /// 数量
        /// </summary>
        public string num
        {
            set { _num = value; }
            get { return _num; }
        }


        /// <summary>
        /// 排序号
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }

        #endregion Model
    }
}
