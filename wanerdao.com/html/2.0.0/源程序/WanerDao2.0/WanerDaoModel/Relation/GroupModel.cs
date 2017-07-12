using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WanerDao2.WanerDaoModel.Relation
{
    /// <summary>
    /// 描述:圈子实体类
    /// 描述：xux
    /// 时间：2011-10-25
    /// </summary>
    [Serializable]
    public partial class GroupModel
    {
        public GroupModel() { }

        #region Model
        private string _id;
        private string _group_name;
        private int _sort_id;
        private string _category_name;
        private string _logo_path;
        private string _website;
        private string _category_id;
        private string _create_id;
        private string _create_name;
        private DateTime _create_date;
        private int _member_nbr;
        private double _activity_score;
        private double _follow_score;
        private string _summary;
        private string _description;
        private string _join_fee;
        private string _join_method_id;
        private string _join_method_name;
        private string _user_name;
        private string _user_id;
        private string _manage_type_id;
        private string _manage_type_name;
        private string _transfer_account;
        private string _transfer_description;
        private bool _is_kick_protected;
        private string _kick_protected_duration_id;
        private string _duration_name;
        private string _event_id;
        private string _event_name;
        private string _event_description;

        private string _contact_email;
        private bool _is_email_event;
        private bool _is_notice_event;
        private bool _is_email_updates;
        private bool _is_notice_updates;
        private bool _is_email_digest;
        private bool _is_notice_digest;
        private int _digest_duration;
        private bool _is_allow_msg;
        private string _special_id;
        private string _special_name;

        /// <summary>
        /// 特例用户名
        /// </summary>
        public string special_name
        {
            set { _special_name = value; }
            get { return _special_name; }
        }
        /// <summary>
        /// 特例用户号
        /// </summary>
        public string special_id
        {
            set { _special_id = value; }
            get { return _special_id; }
        }
        /// <summary>
        /// 是否允许短消息
        /// </summary>
        public bool is_allow_msg
        {
            set { _is_allow_msg = value; }
            get { return _is_allow_msg; }
        }
        /// <summary>
        /// 接受圈子更新简要时间间隔
        /// </summary>
        public int digest_duration
        {
            set { _digest_duration = value; }
            get { return _digest_duration; }
        }
        /// <summary>
        /// 是否通过站内信息接受圈子摘要
        /// </summary>
        public bool is_notice_digest
        {
            set { _is_notice_digest = value; }
            get { return _is_notice_digest; }
        }
        /// <summary>
        /// 是否通过邮件接受圈子简要
        /// </summary>
        public bool is_email_digest
        {
            set { _is_email_digest = value; }
            get { return _is_email_digest; }
        }
        /// <summary>
        /// 是否通过站内信息接受即时圈子更新
        /// </summary>
        public bool is_notice_updates
        {
            set { _is_notice_updates = value; }
            get { return _is_notice_updates; }
        }
        /// <summary>
        /// 是否通过邮件接受即时更新
        /// </summary>
        public bool is_email_updates
        {
            set { _is_email_updates = value; }
            get { return _is_email_updates; }
        }
        /// <summary>
        /// 是否通过站内信息接受重要通知
        /// </summary>
        public bool is_notice_event
        {
            set { _is_notice_event = value; }
            get { return _is_notice_event; }
        }
        /// <summary>
        /// 是否通过邮件接受重要通知
        /// </summary>
        public bool is_email_event
        {
            set { _is_email_event = value; }
            get { return _is_email_event; }
        }
        /// <summary>
        /// 联系邮箱
        /// </summary>
        public string contact_email
        {
            set { _contact_email = value; }
            get { return _contact_email; }
        }
        /// <summary>
        /// 事件号
        /// </summary>
        public string event_id
        {
            set { _event_id = value; }
            get { return _event_id; }
        }

        /// <summary>
        /// 事件名
        /// </summary>
        public string event_name
        {
            set { _event_name = value; }
            get { return _event_name; }
        }


        /// <summary>
        /// 事件描述
        /// </summary>
        public string event_description
        {
            set { _event_description = value; }
            get { return _event_description; }
        }

        /// <summary>
        /// 序列号
        /// </summary>
        public string id
        {
            set { _id = value; }
            get { return _id; }
        }

        /// <summary>
        /// 圈子名
        /// </summary>
        public string group_name
        {
            set { _group_name = value; }
            get { return _group_name; }
        }

        /// <summary>
        /// 排序号
        /// </summary>
        public int sort_id
        {
            set { _sort_id = value; }
            get { return _sort_id; }
        }

        /// <summary>
        /// 分类名
        /// </summary>
        public string category_name
        {
            set { _category_name = value; }
            get { return _category_name; }
        }

        /// <summary>
        /// 圈子logo
        /// </summary>
        public string logo_path
        {
            set { _logo_path = value; }
            get { return _logo_path; }
        }

        /// <summary>
        /// 圈子网址
        /// </summary>
        public string website
        {
            set { _website = value; }
            get { return _website; }
        }

        /// <summary>
        /// 分类号
        /// </summary>
        public string category_id
        {
            set { _category_id = value; }
            get { return _category_id; }
        
        }

        /// <summary>
        /// 创建人ID
        /// </summary>
        public string create_id
        {
            set { _create_id = value; }
            get { return _create_id; }

        }

        /// <summary>
        /// 创建人名字
        /// </summary>
        public string create_name
        {
            set { _create_name = value; }
            get { return _create_name; }

        }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime create_date
        {
            set { _create_date = value; }
            get { return _create_date; }
        }

        /// <summary>
        /// 圈子现有人数
        /// </summary>
        public int member_nbr
        {
            set { _member_nbr = value; }
            get { return _member_nbr; }
        }

        /// <summary>
        /// 活跃度
        /// </summary>
        public double activity_score
        {
            set { _activity_score = value; }
            get { return _activity_score; }
        }

        /// <summary>
        /// 关注度
        /// </summary>
        public double follow_score
        {
            set { _follow_score = value; }
            get { return _follow_score; }
        }

        /// <summary>
        /// 圈子描述
        /// </summary>
        public string summary
        {
            set { _summary = value; }
            get { return _summary; }
        }

        /// <summary>
        /// 圈子规章
        /// </summary>
        public string description
        {
            set { _description = value; }
            get { return _description; }
        }

        /// <summary>
        /// 圈子会费
        /// </summary>
        public string join_fee
        {
            set { _join_fee = value; }
            get { return _join_fee; }
        }

        /// <summary>
        /// 加入方式号
        /// </summary>
        public string join_method_id
        {
            set { _join_method_id = value; }
            get { return _join_method_id; }
        }

        /// <summary>
        /// 加入方式名
        /// </summary>
        public string join_method_name
        {
            set { _join_method_name = value; }
            get { return _join_method_name; }
        }


        /// <summary>
        /// 用户名
        /// </summary>
        public string user_name
        {
            set { _user_name = value; }
            get { return _user_name; }
        }

        /// <summary>
        /// 用户ID
        /// </summary>
        public string user_id
        {
            set { _user_id = value; }
            get { return _user_id; }
        }

        /// <summary>
        /// 管理架构方式
        /// </summary>
        public string manage_type_id
        {
            set { _manage_type_id = value; }
            get { return _manage_type_id; }
        }

        /// <summary>
        /// 管理架构名
        /// </summary>
        public string manage_type_name
        {
            set { _manage_type_name = value; }
            get { return _manage_type_name; }
        }

        /// <summary>
        /// 汇款账号
        /// </summary>
        public string transfer_account
        {
            set { _transfer_account = value;}
            get { return _transfer_account; }
        }

        /// <summary>
        /// 汇款说明
        /// </summary>
        public string transfer_description
        {
            set { _transfer_description = value; }
            get { return _transfer_description; }
        }

        /// <summary>
        /// 是否启动踢人保护
        /// </summary>
        public bool is_kick_protected
        {
            set { _is_kick_protected = value; }
            get { return _is_kick_protected; }
        }

        /// <summary>
        /// 踢人时限号
        /// </summary>
        public string kick_protected_duration_id
        {
            set { _kick_protected_duration_id = value; }
            get { return _kick_protected_duration_id; }
        }

        /// <summary>
        /// 时限范围名
        /// </summary>
        public string duration_name
        {
            set { _duration_name = value; }
            get { return _duration_name; }
        }
        #endregion Model


    }
}
