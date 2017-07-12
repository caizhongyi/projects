#region Version Info
/* ======================================================================== 
* 【本类功能概述】 
* 个人基础信息实体
* 作者：杨晓东   时间：2011/10/2 0:49:47 
* 文件名：PersonalProfileModel 
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
    /// 个人基础信息
    /// </summary>
    [Serializable]
    public partial class PersonalProfileModel
    {
        public PersonalProfileModel()
        { }
        #region Model
        private string _user_id;
        private bool? _is_online;
        private string _name = "";
        private string _second_name = "";
        private bool? _gender;
        private string _logo_path = "";
        private string _logo_small_path = "";
        private DateTime? _upload_datetime;
        private double _experience;
        private double _integrity_score;
        private double _activity_score;
        private double _follow_score;
        private double _credit_score;
        private double _gold;
        private double _share_score;
        private int _birthday_year;
        private int _birthday_month;
        private int _birthday_day;
        private string _constellation = "";
        private string _use_experience = "";
        private string _current_address = "";
        private string _current_distinct_id = "";
        private string _current_zip = "";
        private string _current_country_id = "";
        private string _current_state_id = "";
        private string _current_city_id = "";
        private string _birth_district = "";
        private string _birth_country_id = "";
        private string _birth_state_id = "";
        private string _birth_city_id = "";
        private string _is_msg_me = "";
        private string _friend_request = "";
        private bool? _is_find_me;
        private string _permission = "";
        /// <summary>
        /// 用户号
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }

        /// <summary>
        /// 是否在线
        /// </summary>
        public bool? is_online
        {
            set { _is_online = value; }
            get { return _is_online; }
        }
        /// <summary>
        /// 姓名
        /// </summary>
        public string name
        {
            set { _name = value; }
            get { return _name; }
        }
        /// <summary>
        /// 英文名
        /// </summary>
        public string second_name
        {
            set { _second_name = value; }
            get { return _second_name; }
        }
        /// <summary>
        /// 性别
        /// </summary>
        public bool? gender
        {
            set { _gender = value; }
            get { return _gender; }
        }
        /// <summary>
        /// 头像相片存储地址
        /// </summary>
        public string logo_path
        {
            set { _logo_path = value; }
            get { return _logo_path; }
        }
        /// <summary>
        /// 小头像相片存储地址
        /// </summary>
        public string logo_small_path
        {
            set { _logo_small_path = value; }
            get { return _logo_small_path; }
        }
        /// <summary>
        /// 上传时间
        /// </summary>
        public DateTime? upload_datetime
        {
            set { _upload_datetime = value; }
            get { return _upload_datetime; }
        }
        /// <summary>
        /// 经验
        /// </summary>
        public double experience
        {
            set { _experience = value; }
            get { return Math.Round(_experience); }
        }
        /// <summary>
        /// 资料完成度
        /// </summary>
        public double integrity_score
        {
            set { _integrity_score = value; }
            get { return Math.Round(_integrity_score); }
        }
        /// <summary>
        /// 活跃度
        /// </summary>
        public double activity_score
        {
            set { _activity_score = value; }
            get { return Math.Round(_activity_score); }
        }
        /// <summary>
        /// 关注度
        /// </summary>
        public double follow_score
        {
            set { _follow_score = value; }
            get { return Math.Round(_follow_score); }
        }
        /// <summary>
        /// 信用度
        /// </summary>
        public double credit_score
        {
            set { _credit_score = value; }
            get { return Math.Round(_credit_score); }
        }
        /// <summary>
        /// 金币数
        /// </summary>
        public double gold
        {
            set { _gold = value; }
            get { return Math.Round(_gold); }
        }
        /// <summary>
        /// 爱心度
        /// </summary>
        public double share_score
        {
            set { _share_score = value; }
            get { return Math.Round(_share_score); }
        }
        /// <summary>
        /// 出生年
        /// </summary>
        public int birthday_year
        {
            set { _birthday_year = value; }
            get { return _birthday_year; }
        }
        /// <summary>
        /// 出生月
        /// </summary>
        public int birthday_month
        {
            set { _birthday_month = value; }
            get { return _birthday_month; }
        }
        /// <summary>
        /// 出生日
        /// </summary>
        public int birthday_day
        {
            set { _birthday_day = value; }
            get { return _birthday_day; }
        }
        /// <summary>
        /// 星座
        /// </summary>
        public string constellation
        {
            set { _constellation = value; }
            get { return _constellation; }
        }
        /// <summary>
        /// 用户习惯特点
        /// </summary>
        public string use_experience
        {
            set { _use_experience = value; }
            get { return _use_experience; }
        }
        /// <summary>
        /// 现所在地址
        /// </summary>
        public string current_address
        {
            set { _current_address = value; }
            get { return _current_address; }
        }
        /// <summary>
        /// 现所在区域
        /// </summary>
        public string current_distinct_id
        {
            set { _current_distinct_id = value; }
            get { return _current_distinct_id; }
        }
        /// <summary>
        /// 现所在邮编
        /// </summary>
        public string current_zip
        {
            set { _current_zip = value; }
            get { return _current_zip; }
        }
        /// <summary>
        /// 现所在国家
        /// </summary>
        public string current_country_id
        {
            set { _current_country_id = value; }
            get { return _current_country_id; }
        }
        /// <summary>
        /// 现所在州
        /// </summary>
        public string current_state_id
        {
            set { _current_state_id = value; }
            get { return _current_state_id; }
        }
        /// <summary>
        /// 现所在城市
        /// </summary>
        public string current_city_id
        {
            set { _current_city_id = value; }
            get { return _current_city_id; }
        }
        /// <summary>
        /// 出生区域
        /// </summary>
        public string birth_district
        {
            set { _birth_district = value; }
            get { return _birth_district; }
        }
        /// <summary>
        /// 出生国家
        /// </summary>
        public string birth_country_id
        {
            set { _birth_country_id = value; }
            get { return _birth_country_id; }
        }
        /// <summary>
        /// 出生州
        /// </summary>
        public string birth_state_id
        {
            set { _birth_state_id = value; }
            get { return _birth_state_id; }
        }
        /// <summary>
        /// 出生城市
        /// </summary>
        public string birth_city_id
        {
            set { _birth_city_id = value; }
            get { return _birth_city_id; }
        }
        /// <summary>
        /// 谁可以跟我打招呼
        /// </summary>
        public string is_msg_me
        {
            set { _is_msg_me = value; }
            get { return _is_msg_me; }
        }
        /// <summary>
        /// 谁可以向我发送好友请求
        /// </summary>
        public string friend_request
        {
            set { _friend_request = value; }
            get { return _friend_request; }
        }
        /// <summary>
        /// 允许站外的人在登录页上或通过搜索引擎搜索到我的账号
        /// </summary>
        public bool? is_find_me
        {
            set { _is_find_me = value; }
            get { return _is_find_me; }
        }
        /// <summary>
        /// 其他用户对该资料模块的浏览权限
        /// </summary>
        public string permission
        {
            set { _permission = value; }
            get { return _permission; }
        }

        #endregion Model

    }
}
