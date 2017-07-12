#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：杨晓东   时间：2012/3/16 23:44:14 
* 文件名：BaseTableModel 
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
using System.Reflection;

namespace WanerDao2.WanerDaoModel.Index
{
    public class BaseTableModel
    {
        #region 属性
        private string _logo_small_path;
        private string _user_name;
        private int _comment_count;
        private DateTime _post_date;
        private string _user_id;
        private string _state_category;
        private string _id;

        private string _from_user_name;
        private string _from_user_id;
        private string _to_user_name;
        private string _to_user_id;

        public BaseTableModel()
        {

        }
        public BaseTableModel(string data_id)
        {
            _id = data_id;
        }
        /// <summary>
        /// 该条记录的id
        /// </summary>
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }
        /// <summary>
        /// 状态类别
        /// </summary>
        public string state_category
        {
            get { return _state_category; }
            set { _state_category = value; }
        }

        /// <summary>
        /// 用户id
        /// </summary>
        public string user_id
        {
            get { return _user_id; }
            set { _user_id = value; }
        }
        /// <summary>
        /// 发表时间
        /// </summary>
        public DateTime post_date
        {
            get { return _post_date; }
            set { _post_date = value; }
        }
        /// <summary>
        /// 评论数
        /// </summary>
        public int comment_count
        {
            get { return _comment_count; }
            set { _comment_count = value; }
        }
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string user_name
        {
            get { return _user_name; }
            set { _user_name = value; }
        }
        /// <summary>
        /// 头像地址
        /// </summary>
        public string logo_small_path
        {
            get { return _logo_small_path; }
            set { _logo_small_path = value; }
        }

        /// <summary>
        /// 操作用户姓名
        /// </summary>
        public string from_user_name
        {
            get;
            set;
        }
        /// <summary>
        /// 操作用户标识
        /// </summary>
        public string from_user_id
        {
            get;
            set;
        }
        /// <summary>
        /// 被操作用户姓名
        /// </summary>
        public string to_user_name
        {
            get;
            set;
        }
        /// <summary>
        /// 操作用户标识
        /// </summary>
        public string to_user_id
        {
            get;
            set;
        }
        #endregion

        #region 方法
        /// <summary>
        /// 获取配置文件的HTML结果
        /// </summary>
        /// <param name="configText">配置文件HTML内容</param>
        /// <returns></returns>
        public virtual string GetHTMLResult(string configText, string action_name, string category_name)
        {
            Type type = this.GetType();
            PropertyInfo[] propInfos = type.GetProperties(BindingFlags.Public | BindingFlags.GetProperty | BindingFlags.Instance);
            configText = configText.Replace("{action_name}", action_name).Replace("{category_name}", category_name);
            foreach (PropertyInfo item in propInfos)
            {
                if (item == null) continue;
                object value = item.GetValue(this, null);
                if (value == null) continue;
                configText = configText.Replace("{" + item.Name + "}", value.ToString());
            }
            return configText;
        }

        protected virtual void SetSelfValue(BaseTableModel b)
        {
            Type type = b.GetType();
            PropertyInfo[] propInfos = type.GetProperties(BindingFlags.Public | BindingFlags.GetProperty | BindingFlags.Instance);
            foreach (PropertyInfo item in propInfos)
            {
                object value = item.GetValue(b, null);
                if (value == null) continue;
                this.GetType().GetProperty(item.Name).SetValue(this, item.GetValue(b, null), null);
            }
        }
        #endregion
    }
}
