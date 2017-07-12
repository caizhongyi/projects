#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 主页动态相关实体
* 作者：杨晓东   时间：2012/3/17 1:22:33 
* 文件名：Class1 
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
using WanerDao2.WanerDaoDALFactory;

namespace WanerDao2.WanerDaoModel.Index
{
    public class UserOperationModel
    {

        #region 字段常量
        //private string _action_id;
        //private string _category_id;
        /// <summary>
        /// SQL文件名称
        /// </summary>
        private const string SQLFILE = "HomeSQL"; 
        #endregion
            
        #region 构造函数
        public UserOperationModel()
        {

        }

        public UserOperationModel(string id)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>() { { "id", id } };
            var IList = DbHelperFactory.SingleInstance().GetGenericModel<UserOperationModel>(SQLFILE, "UserOperationModel", dic)
                as IList<UserOperationModel>;
            if (IList != null)
            {
                this.id = IList[0].id;
                this.user_id = IList[0].user_id;
                this.option_id = IList[0].option_id;
                this.action_category_id = IList[0].action_category_id;
                this.action_name = IList[0].action_name;
                this.category_name = IList[0].category_name;
                this.table_id = IList[0].table_id;
                this.object_id = IList[0].object_id;
                this.permission = IList[0].permission;
                this.ope_date = IList[0].ope_date;
                this.active = IList[0].active;
            }
            else
            {
                throw new Exception("Nothing Data");
            }
        } 
        #endregion

        #region 属性
        /// <summary>
        /// 序列号
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// 用户id
        /// </summary>
        public string user_id { get; set; }
        /// <summary>
        /// 动作类别id
        /// </summary>
        public string action_category_id { get; set; }
        /// <summary>
        /// 选项卡id名称(option_id(new,message,group,activity,posts)分别对应主页的几个选项卡)
        /// </summary>
        public string option_id { get; set; }
        /// <summary>
        /// 动作名称
        /// </summary>
        public string action_name { get;  set; }
        /// <summary>
        /// 类别名称
        /// </summary>
        public string category_name { get;  set; }
        /// <summary>
        /// 数据库标示
        /// </summary>
        public string table_id { get; set; }
        /// <summary>
        /// 对象id
        /// </summary>
        public string object_id { get; set; }
        /// <summary>
        /// 权限id
        /// </summary>
        public string permission { get; set; }
        /// <summary>
        /// 操作时间
        /// </summary>
        public DateTime ope_date { get; set; }
        /// <summary>
        /// 是否有效
        /// </summary>
        public bool active { get; set; }
        ///// <summary>
        ///// 类别id
        ///// </summary>
        //public string category_id
        //{
        //    get { return _category_id; }
        //    set { _category_id = value; }
        //}
        ///// <summary>
        ///// 动作id
        ///// </summary>
        //public string action_id
        //{
        //    get { return _action_id; }
        //    set { _action_id = value; }
        //} 
        #endregion
    }
}
