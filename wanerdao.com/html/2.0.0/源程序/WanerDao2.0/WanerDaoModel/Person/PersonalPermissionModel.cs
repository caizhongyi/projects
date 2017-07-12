#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 权限实体
* 作者：胥鑫   时间：2011/10/25 
* 文件名：PersonalPermission 
* 版本：V1.0.1 
* 
* 修改者： 时间： 
* 修改说明： 
* ======================================================================== 
*/
#endregion

using System;

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 权限
    /// </summary>
    [Serializable]
    public partial class PersonalPermissionModel
    {
        public PersonalPermissionModel()
        { }
        #region Model
        private string _id;
        private string _name;
        private string _per_type;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
       
        /// <summary>
        /// 权限名
        /// </summary>
        public string name
        {
            set { _name = value; }
            get { return _name; }
        }

        /// <summary>
        /// 权限类型
        /// </summary>
        public string per_type
        {
            set { _per_type = value; }
            get { return _per_type; }
        }
       
        #endregion Model

    }
}
