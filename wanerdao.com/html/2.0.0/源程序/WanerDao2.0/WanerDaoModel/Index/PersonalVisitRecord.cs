#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 用户访问记录实体类
* 作者：杨晓东   时间：2012/3/19 19:59:00 
* 文件名：PersonalVisitRecord 
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

namespace WanerDao2.WanerDaoModel.Index
{
    [Serializable]
    public class PersonalVisitRecord
    {
        /// <summary>
        /// 序列号
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 用户id
        /// </summary>
        public string user_id { get; set; }

        /// <summary>
        /// 访问者id
        /// </summary>
        public string visit_user_id { get; set; }

        /// <summary>
        /// 访问者姓名
        /// </summary>
        public string visit_user_name { get; set; }

        /// <summary>
        /// 访问者头像缩略图路径
        /// </summary>
        public string logo_small_path { get; set; }

        /// <summary>
        /// 访问时间
        /// </summary>
        public DateTime update_date { get; set; }

        /// <summary>
        /// 是否有效
        /// </summary>
        public bool active { get; set; }
    }
}
