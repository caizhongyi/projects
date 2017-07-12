#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 
* 作者：徐兵   时间：2012-09-12 22:21:37 
* 文件名：ImagePythicalLocation 
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

namespace WanerDao2.WanerDaoModel.Common
{
    /// <summary>
    /// 实体类imagepythicallocation 
    /// </summary>
    [Serializable]
    public class ImagePythicalLocationModel:Base.ModelBase
    {
        #region Model
        private string _image_path;
        private string _image_small_path;
        private double _filesize;
        private string _user_id;
        private DateTime _upload_date;
        private int _link_nbr;
        private bool _active;
        /// <summary>
        /// image_path
        /// </summary>
        public string image_path
        {
            set { _image_path = value; }
            get { return _image_path; }
        }
        /// <summary>
        /// image_small_path
        /// </summary>
        public string image_small_path
        {
            set { _image_small_path = value; }
            get { return _image_small_path; }
        }
        /// <summary>
        /// fileSize
        /// </summary>
        public double fileSize
        {
            set { _filesize = value; }
            get { return _filesize; }
        }
        /// <summary>
        /// user_id
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// upload_date
        /// </summary>
        public DateTime upload_date
        {
            set { _upload_date = value; }
            get { return _upload_date; }
        }
        /// <summary>
        /// link_nbr
        /// </summary>
        public int link_nbr
        {
            set { _link_nbr = value; }
            get { return _link_nbr; }
        }
        /// <summary>
        /// active
        /// </summary>
        public bool active
        {
            set { _active = value; }
            get { return _active; }
        }
        #endregion Model

    }
}
