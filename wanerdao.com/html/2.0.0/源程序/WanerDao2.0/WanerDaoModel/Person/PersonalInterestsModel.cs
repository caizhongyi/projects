#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人兴趣爱好信息实体
* 作者：杨晓东   时间：2011/10/2 0:58:01 
* 文件名：PersonalInterestsModel 
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
    /// 个人兴趣爱好信息
    /// </summary>
    [Serializable]
    public partial class PersonalInterestsModel
    {
        public PersonalInterestsModel()
        { }
        #region Model
        private string _user_id;
        private int _sort_id;
        private string _hobby="";
        private string _music="";
        private string _movie="";
        private string _game="";
        private string _sport="";
        private string _book="";
        private string _cartoon="";
        private string _permission="";
        private bool? _active = true;
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }
        /// <summary>
        /// 排序ID
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }
        /// <summary>
        /// 爱好
        /// </summary>
        public string hobby
        {
            set { _hobby = value; }
            get { return _hobby; }
        }
        /// <summary>
        /// 音乐
        /// </summary>
        public string music
        {
            set { _music = value; }
            get { return _music; }
        }
        /// <summary>
        /// 电影
        /// </summary>
        public string movie
        {
            set { _movie = value; }
            get { return _movie; }
        }
        /// <summary>
        /// 游戏
        /// </summary>
        public string game
        {
            set { _game = value; }
            get { return _game; }
        }
        /// <summary>
        /// 运动
        /// </summary>
        public string sport
        {
            set { _sport = value; }
            get { return _sport; }
        }
        /// <summary>
        /// 书籍
        /// </summary>
        public string book
        {
            set { _book = value; }
            get { return _book; }
        }
        /// <summary>
        /// 动漫
        /// </summary>
        public string cartoon
        {
            set { _cartoon = value; }
            get { return _cartoon; }
        }
        /// <summary>
        /// 其他用户对该部分的访问权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
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
