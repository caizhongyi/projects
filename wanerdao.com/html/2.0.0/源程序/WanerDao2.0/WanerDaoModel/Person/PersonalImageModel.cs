#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人相片实体
* 作者：杨晓东   时间：2011/10/1 19:00:58 
* 文件名：PersonalImageModel 
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

namespace WanerDao2.WanerDaoModel.Person
{
    /// <summary>
    /// 个人相片
    /// </summary>
    [Serializable]
    public partial class PersonalImageModel
    {
        public PersonalImageModel()
        { }
        #region Model
        private string _id;
        private string _user_id;
        private string _link_id = "";
        private string _fold_id = "";
        private string _image_path = "";
        private string _image_name = "";
        private string _image_small_path = "";
        private double _filesize;
        private int _sequence;
        private string _description = "";
        private string _weather = "";
        private string _location = "";
        private DateTime _upload_date;
        private bool _is_cover;
        private bool _is_submit;
        private int _counter;
        private string _permission = "";
        private bool? _is_transmit = false;
        private string _transmit_id = "";
        private bool? _active = true;
        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 物理地址号
        /// </summary>
        public string link_id
        {
            set { _link_id = value; }
            get { return _link_id; }
        }
        /// <summary>
        /// 相册号
        /// </summary>
        public string fold_id
        {
            set { _fold_id = value; }
            get { return _fold_id; }
        }
        /// <summary>
        /// 相片存储地址
        /// </summary>
        public string image_path
        {
            set { _image_path = value; }
            get { return _image_path; }
        }
        /// <summary>
        /// 相片名
        /// </summary>
        public string image_name
        {
            set { _image_name = value; }
            get { return _image_name; }
        }
        /// <summary>
        /// 相片缩略图存储地址
        /// </summary>
        public string image_small_path
        {
            set { _image_small_path = value; }
            get { return _image_small_path; }
        }
        /// <summary>
        /// 文件大小
        /// </summary>
        public double fileSize
        {
            set { _filesize = value; }
            get { return _filesize; }
        }
        /// <summary>
        /// 排序
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
        /// 上传时间
        /// </summary>
        public DateTime upload_date
        {
            set { _upload_date = value; }
            get { return _upload_date; }
        }
        /// <summary>
        /// 是否为封页
        /// </summary>
        public bool is_cover
        {
            set { _is_cover = value; }
            get { return _is_cover; }
        }
        /// <summary>
        /// 是否上传提交
        /// </summary>
        public bool is_submit
        {
            set { _is_submit = value; }
            get { return _is_submit; }
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
        /// 相片权限
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
        public bool? active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
