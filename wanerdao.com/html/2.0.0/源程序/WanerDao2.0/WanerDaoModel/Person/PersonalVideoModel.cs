#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人视频连接实体
* 作者：杨晓东   时间：2011/10/1 19:01:42 
* 文件名：PersonalVideoModel 
* 版本：V1.0.1 
* 
* 修改者：王薪杰 时间： 
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
    /// 个人视频
    /// </summary>
    [Serializable]
    public partial class PersonalVideoModel
    {
        public PersonalVideoModel()
        { }
        #region Model
        private string _id = string.Empty;
        private string _user_id = string.Empty;
        private string _fold_id = string.Empty;
        private string _source = string.Empty;
        private string _video_name = string.Empty;
        private string _video_link = string.Empty;
        private string _video_path = string.Empty;
        private string _video_code = string.Empty;
        private int _sequence;
        private string _description = string.Empty;
        private string _weather = string.Empty;
        private string _location = string.Empty;
        private DateTime? _upload_date;
        private int _counter;
        private bool? _is_transmit = false;
        private string _transmit_id = "";
        private string _permission = string.Empty;
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
        /// 用户名
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 视频夹号
        /// </summary>
        public string fold_id
        {
            set { _fold_id = value; }
            get { return _fold_id; }
        }
        /// <summary>
        /// 来源网站
        /// </summary>
        public string source
        {
            set { _source = value; }
            get { return _source; }
        }
        /// <summary>
        /// 视频名
        /// </summary>
        public string video_name
        {
            set { _video_name = value; }
            get { return _video_name; }
        }
        /// <summary>
        /// 视频引用地址
        /// </summary>
        public string video_link
        {
            set { _video_link = value; }
            get { return _video_link; }
        }
        /// <summary>
        /// 视频存储地址
        /// </summary>
        public string video_path
        {
            set { _video_path = value; }
            get { return _video_path; }
        }
        /// <summary>
        /// 视频代码
        /// </summary>
        public string video_code
        {
            set { _video_code = value; }
            get { return _video_code; }
        }
        /// <summary>
        /// 序号
        /// </summary>
        public int sequence
        {
            set { _sequence = value; }
            get { return _sequence; }
        }
        /// <summary>
        /// 描述
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }
        /// <summary>
        /// 天气
        /// </summary>
        public string weather
        {
            set { _weather = value; }
            get { return _weather; }
        }
        /// <summary>
        /// 地点
        /// </summary>
        public string location
        {
            set { _location = value; }
            get { return _location; }
        }
        /// <summary>
        /// 上传地址
        /// </summary>
        public DateTime? upload_date
        {
            set { _upload_date = value; }
            get { return _upload_date; }
        }
        /// <summary>
        /// 点击率
        /// </summary>
        public int counter
        {
            set { _counter = value; }
            get { return _counter; }
        }
        /// <summary>
        /// 视频权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
        }
        /// <summary>
        /// 是否转发
        /// </summary>
        public bool? is_transmit
        {
            get { return _is_transmit; }
            set { _is_transmit = value; }
        }
        /// <summary>
        /// 来源号
        /// </summary>
        public string transmit_id
        {
            get { return _transmit_id; }
            set { _transmit_id = value; }
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
