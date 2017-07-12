/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2011-9-25 13:41:31                           */
/*==============================================================*/


drop table if exists AccountType;

drop table if exists Activity;

drop table if exists ActivityCategory;

drop table if exists ActivityCategorySettings;

drop table if exists ActivityComments;

drop table if exists ActivityCreateType;

drop table if exists ActivityEmailDuration;

drop table if exists ActivityEvent;

drop table if exists ActivityImage;

drop table if exists ActivityImageFolder;

drop table if exists ActivityInfoRecordsComments;

drop table if exists ActivityJoinConditions;

drop table if exists ActivityKickDuration;

drop table if exists ActivityKickList;

drop table if exists ActivityMember;

drop table if exists ActivityMoneyFlow;

drop table if exists ActivityMoneyFlowAttachedFile;

drop table if exists ActivityMoneyFlowBalance;

drop table if exists ActivityMoneyFlowOpe;

drop table if exists ActivityMsgExceptionList;

drop table if exists ActivityPlace;

drop table if exists ActivityPlaceCategory;

drop table if exists ActivityPlaceEvent;

drop table if exists ActivityPlacePlayType;

drop table if exists ActivityPlaceProgram;

drop table if exists ActivityPlaceSpecialEvent;

drop table if exists ActivityPosts;

drop table if exists ActivityRole;

drop table if exists ActivitySectionPage;

drop table if exists ActivitySignUpType;

drop table if exists ActivityVehicleType;

drop table if exists ApplicationCategory;

drop table if exists ApplicationType;

drop table if exists AttentionEmailDuration;

drop table if exists AutoBrand;

drop table if exists AutoCarpool;

drop table if exists AutoModel;

drop table if exists BackHomeCategorySettings;

drop table if exists BackHomeComments;

drop table if exists BackHomeRecords;

drop table if exists BlogCategory;

drop table if exists BlogComments;

drop table if exists BookmarkCategory;

drop table if exists CandidateEducation;

drop table if exists CandidatePool;

drop table if exists CandidateResume;

drop table if exists CandidateWork;

drop table if exists CareerRecordsComments;

drop table if exists CarpoolKickList;

drop table if exists CarpoolType;

drop table if exists ChartExceptionList;

drop table if exists ChartHistory;

drop table if exists City;

drop table if exists Company;

drop table if exists Contellation;

drop table if exists Country;

drop table if exists CreditType;

drop table if exists CustomizedPermission;

drop table if exists DataTable;

drop table if exists DealsRecords;

drop table if exists DealsRecordsComments;

drop table if exists Degree;

drop table if exists Department;

drop table if exists DiscussComments;

drop table if exists District;

drop table if exists Dormistry;

drop table if exists DraftMessage;

drop table if exists FriendsClass;

drop table if exists GiftCategory;

drop table if exists GiftsMarket;

drop table if exists GoAboardComments;

drop table if exists GoAboardRecords;

drop table if exists GoaboardCategorySettings;

drop table if exists GolfPlace;

drop table if exists GroupBudget;

drop table if exists GroupBudgetOpe;

drop table if exists GroupCategory;

drop table if exists GroupChartHistory;

drop table if exists GroupChartMember;

drop table if exists GroupDiscuss;

drop table if exists GroupEmailDuration;

drop table if exists GroupEvent;

drop table if exists GroupEventProcess;

drop table if exists GroupEventRecords;

drop table if exists GroupEventVoteHistory;

drop table if exists GroupInfo;

drop table if exists GroupJoinType;

drop table if exists GroupKickDuration;

drop table if exists GroupKickList;

drop table if exists GroupManageType;

drop table if exists GroupMember;

drop table if exists GroupMoneyFlow;

drop table if exists GroupMoneyFlowAttachedFile;

drop table if exists GroupMoneyFlowOpe;

drop table if exists GroupMsgExceptionList;

drop table if exists GroupRole;

drop table if exists HelpComments;

drop table if exists HelpDoc;

drop table if exists HelpDocCategory;

drop table if exists HelpPosts;

drop table if exists HelpVisitHistory;

drop table if exists ImageComments;

drop table if exists ImageFolder;

drop table if exists ImagePythicalLocation;

drop table if exists InboxInviteMessage;

drop table if exists InboxMessage;

drop table if exists InfoActicityRecords;

drop table if exists InfoActivityCategory;

drop table if exists InfoSectionPage;

drop table if exists InfoSubSectionPage;

drop table if exists JobRecords;

drop table if exists JoinConditions;

drop table if exists Language;

drop table if exists LeaveMessage;

drop table if exists LeaveMessageComments;

drop table if exists LinkFeeds;

drop table if exists Major;

drop table if exists ModelCategory;

drop table if exists Module;

drop table if exists Money;

drop table if exists NewFeeds;

drop table if exists NewFeedsBlockList;

drop table if exists NewFeedsComments;

drop table if exists NewLinkFeedsComments;

drop table if exists Page;

drop table if exists PayStatus;

drop table if exists PayType;

drop table if exists PermissionBlackList;

drop table if exists PersonalActivityArchives;

drop table if exists PersonalActivityFollow;

drop table if exists PersonalActivitySchedule;

drop table if exists PersonalActivitySettings;

drop table if exists PersonalBlog;

drop table if exists PersonalBlogDraft;

drop table if exists PersonalBlogSettings;

drop table if exists PersonalBookmark;

drop table if exists PersonalCalendar;

drop table if exists PersonalChartSettings;

drop table if exists PersonalContact;

drop table if exists PersonalCreditCard;

drop table if exists PersonalEducation;

drop table if exists PersonalFriends;

drop table if exists PersonalFriendsFollow;

drop table if exists PersonalGift;

drop table if exists PersonalGroupFollow;

drop table if exists PersonalGroupSettings;

drop table if exists PersonalImage;

drop table if exists PersonalInterests;

drop table if exists PersonalLoginLog;

drop table if exists PersonalModuleFollow;

drop table if exists PersonalNameCard;

drop table if exists PersonalNote;

drop table if exists PersonalOpertionLog;

drop table if exists PersonalOtherContact;

drop table if exists PersonalPhotoSettings;

drop table if exists PersonalPostsDraft;

drop table if exists PersonalPostsFollow;

drop table if exists PersonalProfile;

drop table if exists PersonalRadomCode;

drop table if exists PersonalSecurityProfile;

drop table if exists PersonalStatus;

drop table if exists PersonalTools;

drop table if exists PersonalVideo;

drop table if exists PersonalVideoSettings;

drop table if exists PersonalViewRecord;

drop table if exists PersonalWork;

drop table if exists PlayType;

drop table if exists Position;

drop table if exists PositionCategory;

drop table if exists PositionPool;

drop table if exists PositionType;

drop table if exists Posts;

drop table if exists PostsComments;

drop table if exists ProcessStatus;

drop table if exists PropertyPermission;

drop table if exists RentalHouseImage;

drop table if exists RentalHouseRecords;

drop table if exists RentalHouseRecordsComments;

drop table if exists Report;

drop table if exists ReportProcess;

drop table if exists ReportType;

drop table if exists RoleEventRules;

drop table if exists SaleAutoImage;

drop table if exists SaleAutoRecords;

drop table if exists SaleAutoRecordsComments;

drop table if exists SalesImage;

drop table if exists SalesRecords;

drop table if exists SalesRecordsComments;

drop table if exists School;

drop table if exists SchoolType;

drop table if exists SearchContentRecords;

drop table if exists SecurityQuestion;

drop table if exists SelfAdvertise;

drop table if exists SelfAdvertiseContact;

drop table if exists SelfAdvertisePay;

drop table if exists SelfAdvertisePlan;

drop table if exists SendInviteMessage;

drop table if exists SendMessage;

drop table if exists ServiceProcess;

drop table if exists SiteApplication;

drop table if exists SiteSuggest;

drop table if exists SourceType;

drop table if exists SourceTypeCategory;

drop table if exists State;

drop table if exists StatusCategorySettings;

drop table if exists StatusComments;

drop table if exists StatusContent;

drop table if exists StatusRecords;

drop table if exists StatusRules;

drop table if exists SuggestComments;

drop table if exists SuggestScreenShot;

drop table if exists Tax;

drop table if exists TimeZone;

drop table if exists ToolCategory;

drop table if exists ToolsPool;

drop table if exists TopicCategory;

drop table if exists UnitCategory;

drop table if exists UnitList;

drop table if exists UnitRules;

drop table if exists UserVisitHistory;

drop table if exists VideoComments;

drop table if exists VideoFolder;

/*==============================================================*/
/* Table: AccountType                                           */
/*==============================================================*/
create table AccountType
(
   id                   int not null,
   type_name            varchar(60),
   active               bool default true,
   primary key (id)
);

alter table AccountType comment '账号类型';

/*==============================================================*/
/* Table: Activity                                              */
/*==============================================================*/
create table Activity
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   active_name          varchar(60),
   active_link          varchar(200),
   datetime             datetime,
   original_id          varchar(40),
   create_id            varchar(40),
   create_type_id       int,
   title                varchar(60),
   description          text,
   create_email         varchar(60),
   create_phone         varchar(20),
   activity_score       int,
   max_nbr              int,
   join_member_nbr      int,
   sight_id             varchar(40),
   sight_name           varchar(60),
   address              varchar(60),
   country_id           varchar(40),
   province_id          varchar(40),
   city_id              varchar(40),
   zip                  varchar(20),
   begin_datetime       datetime,
   end_datetime         datetime,
   report_datetime      datetime,
   report_type_id       int,
   report_pass          varchar(40),
   pay_type_id          int,
   pay_method           text,
   prepay_nbr           double,
   prepay_reason        varchar(200),
   is_kick_protected    bool,
   kick_protected_duration double,
   is_balance           bool,
   balance_date         datetime,
   balance_type         int,
   is_public            bool,
   schedule_type        int,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table Activity comment '活动信息';

/*==============================================================*/
/* Table: ActivityCategory                                      */
/*==============================================================*/
create table ActivityCategory
(
   id                   varchar(40) not null,
   activity_id          varchar(40),
   category_id          varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (id)
);

alter table ActivityCategory comment '活动分类标签信息';

/*==============================================================*/
/* Table: ActivityCategorySettings                              */
/*==============================================================*/
create table ActivityCategorySettings
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (id)
);

alter table ActivityCategorySettings comment '分类设定';

/*==============================================================*/
/* Table: ActivityComments                                      */
/*==============================================================*/
create table ActivityComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   active_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityComments comment '活动回复';

/*==============================================================*/
/* Table: ActivityCreateType                                    */
/*==============================================================*/
create table ActivityCreateType
(
   id                   int not null,
   type_name            varchar(60),
   active               bool default true,
   primary key (id)
);

alter table ActivityCreateType comment '报名方式（0表示个人发起，1表示圈子发起）';

/*==============================================================*/
/* Table: ActivityEmailDuration                                 */
/*==============================================================*/
create table ActivityEmailDuration
(
   id                   int not null,
   duration_name        varchar(20),
   unit_day             double,
   active               bool default true,
   primary key (id)
);

alter table ActivityEmailDuration comment 'Email发送周期';

/*==============================================================*/
/* Table: ActivityEvent                                         */
/*==============================================================*/
create table ActivityEvent
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   source_type_id       varchar(40),
   source_id            varchar(60),
   create_date          datetime,
   activity_place_category_id varchar(40),
   event_name           varchar(60),
   description          text,
   phone                varchar(20),
   Email                varchar(60),
   contact_people       varchar(60),
   guess_datetime       varchar(20),
   event_start          datetime,
   event_end            datetime,
   website              varchar(60),
   other_link           varchar(60),
   address              varchar(60),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   zip                  varchar(20),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityEvent comment '活动事件（球赛，音乐会等）';

/*==============================================================*/
/* Table: ActivityImage                                         */
/*==============================================================*/
create table ActivityImage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   create_id            varchar(40),
   activity_id          varchar(40),
   activity_name        varchar(60),
   link_id              varchar(40),
   fold_id              varchar(40),
   image_name           varchar(60),
   image_path           varchar(200),
   image_small_path     varchar(200),
   fileSize             double,
   sequence             int,
   description          text,
   upload_date          datetime,
   is_submit            bool,
   counter              int,
   is_block             bool,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityImage comment '活动相片';

/*==============================================================*/
/* Table: ActivityImageFolder                                   */
/*==============================================================*/
create table ActivityImageFolder
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   activity_id          varchar(40),
   activity_name        varchar(60),
   folder_name          varchar(60),
   create_date          datetime,
   update_date          datetime,
   description          text,
   is_system            bool,
   is_block             bool,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityImageFolder comment '活动图片文件夹';

/*==============================================================*/
/* Table: ActivityInfoRecordsComments                           */
/*==============================================================*/
create table ActivityInfoRecordsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityInfoRecordsComments comment '活动信息讨论回复';

/*==============================================================*/
/* Table: ActivityJoinConditions                                */
/*==============================================================*/
create table ActivityJoinConditions
(
   id                   varchar(40) not null,
   activity_id          varchar(40),
   activity_name        varchar(60),
   condition_id         varchar(40),
   condition_name       int,
   value                varchar(10),
   active               bool default true,
   primary key (id)
);

alter table ActivityJoinConditions comment '加入条件列表';

/*==============================================================*/
/* Table: ActivityKickDuration                                  */
/*==============================================================*/
create table ActivityKickDuration
(
   id                   int not null auto_increment,
   duration_name        varchar(20),
   unit_day             double,
   active               bool default true,
   primary key (id)
);

alter table ActivityKickDuration comment '踢人保护时限';

/*==============================================================*/
/* Table: ActivityKickList                                      */
/*==============================================================*/
create table ActivityKickList
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   active_id            varchar(40),
   user_id              varchar(40),
   kick_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityKickList comment '活动踢出列表，被提出的用户在安全时间内不能再报名';

/*==============================================================*/
/* Table: ActivityMember                                        */
/*==============================================================*/
create table ActivityMember
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   active_id            varchar(40),
   user_id              varchar(40),
   role_id              varchar(40),
   vehicle_type_id      int,
   is_auto              bool,
   is_need_carpool      bool,
   is_permit_carpool    bool,
   carpool_type_id      int,
   carpool_money        double,
   auto_brand_id        varchar(40),
   auto_model_id        varchar(40),
   auto_year            varchar(10),
   auto_plate           varchar(20),
   carpool_nbr          int,
   current_carpool_nbr  int,
   address              varchar(60),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   zip                  varchar(20),
   distance             varchar(20),
   phone                varchar(20),
   email                varchar(60),
   pay_status           int,
   is_authorized        bool,
   report_date          datetime,
   join_date            datetime,
   like_nbr             int,
   dislike_nbr          int,
   soso_nbr             int,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityMember comment '活动人员列表';

/*==============================================================*/
/* Table: ActivityMoneyFlow                                     */
/*==============================================================*/
create table ActivityMoneyFlow
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             int,
   group_name           int,
   match_budget_id      varchar(40),
   is_personal          bool,
   pay_id               varchar(40),
   item_name            varchar(100),
   description          text,
   is_in                bool,
   item_money           double,
   money_ope_id         varchar(40),
   money_ope_name       varchar(60),
   ope_date             datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityMoneyFlow comment '活动流水账';

/*==============================================================*/
/* Table: ActivityMoneyFlowAttachedFile                         */
/*==============================================================*/
create table ActivityMoneyFlowAttachedFile
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   activity_id          varchar(40),
   money_flow_id        varchar(40),
   store_path           varchar(200),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityMoneyFlowAttachedFile comment '活动流水附件';

/*==============================================================*/
/* Table: ActivityMoneyFlowBalance                              */
/*==============================================================*/
create table ActivityMoneyFlowBalance
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   activity_id          varchar(40),
   balance_nbr          double,
   is_balance           bool,
   process_date         datetime,
   ope_id               varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityMoneyFlowBalance comment '活动流水结算';

/*==============================================================*/
/* Table: ActivityMoneyFlowOpe                                  */
/*==============================================================*/
create table ActivityMoneyFlowOpe
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   activity_id          varchar(40),
   money_flow_id        varchar(40),
   ope_id               varchar(40),
   ope_name             varchar(60),
   ope_date             datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityMoneyFlowOpe comment '活动预算执行人列表';

/*==============================================================*/
/* Table: ActivityMsgExceptionList                              */
/*==============================================================*/
create table ActivityMsgExceptionList
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   activity_id          varchar(40),
   special_id           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityMsgExceptionList comment '活动信息特例名单';

/*==============================================================*/
/* Table: ActivityPlace                                         */
/*==============================================================*/
create table ActivityPlace
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   source_type_id       varchar(40),
   source_id            varchar(60),
   create_date          datetime,
   activity_place_category_id varchar(40),
   activity_place_name  varchar(60),
   description          text,
   phone                varchar(20),
   Email                varchar(60),
   contact_people       varchar(60),
   season               varchar(50),
   daily_start          varchar(20),
   daily_end            varchar(20),
   open_date            varchar(50),
   close_date           varchar(50),
   website              varchar(60),
   other_link           varchar(60),
   address              varchar(60),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   zip                  varchar(20),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityPlace comment '活动地点';

/*==============================================================*/
/* Table: ActivityPlaceCategory                                 */
/*==============================================================*/
create table ActivityPlaceCategory
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (id)
);

alter table ActivityPlaceCategory comment '活动地站点的分类（夜店类，极限类，休闲类）';

/*==============================================================*/
/* Table: ActivityPlaceEvent                                    */
/*==============================================================*/
create table ActivityPlaceEvent
(
   id                   varchar(40),
   sort_id              int not null,
   activity_place_id    varchar(40),
   activity_place_name  varchar(60),
   event_name           varchar(60),
   event_description    text,
   season               varchar(50),
   daily_end            varchar(20),
   daily_start          varchar(20),
   open_date            varchar(50),
   close_date           varchar(50),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityPlaceEvent comment '游玩地事件及活动（定期发生）';

/*==============================================================*/
/* Table: ActivityPlacePlayType                                 */
/*==============================================================*/
create table ActivityPlacePlayType
(
   id                   varchar(40),
   sort_id              int not null,
   activity_place_id    varchar(40),
   activity_place_name  varchar(60),
   play_type_id         varchar(40),
   play_type_name       varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityPlacePlayType comment '活动地活动类型（露营，登山，钓鱼等等）';

/*==============================================================*/
/* Table: ActivityPlaceProgram                                  */
/*==============================================================*/
create table ActivityPlaceProgram
(
   id                   varchar(40),
   sort_id              int not null,
   activity_place_id    varchar(40),
   activity_place_name  varchar(60),
   special_event_name   varchar(60),
   special_event_description text,
   season               varchar(50),
   daily_end            varchar(20),
   daily_start          varchar(20),
   open_date            varchar(50),
   close_date           varchar(50),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityPlaceProgram comment '游玩地项目';

/*==============================================================*/
/* Table: ActivityPlaceSpecialEvent                             */
/*==============================================================*/
create table ActivityPlaceSpecialEvent
(
   id                   varchar(40),
   sort_id              int not null,
   activity_place_id    varchar(40),
   activity_place_name  varchar(60),
   program_name         varchar(60),
   rpogram_description  text,
   season               varchar(50),
   daily_end            varchar(20),
   daily_start          varchar(20),
   open_date            varchar(50),
   close_date           varchar(50),
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityPlaceSpecialEvent comment '游玩地特殊活动（不是经常发生，特别节目）';

/*==============================================================*/
/* Table: ActivityPosts                                         */
/*==============================================================*/
create table ActivityPosts
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   active_id            varchar(40),
   active_name          varchar(60),
   create_id            varchar(40),
   subject              varchar(60),
   content              text,
   post_date            datetime,
   counter              int,
   is_block             bool,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivityPosts comment '活动发帖';

/*==============================================================*/
/* Table: ActivityRole                                          */
/*==============================================================*/
create table ActivityRole
(
   id                   varchar(40) not null,
   role_name            varchar(60),
   description          text,
   level                int,
   active               bool default true,
   primary key (id)
);

alter table ActivityRole comment '活动角色列表(0级为超级管理员，1级为普通管理员，2级为财务员)';

/*==============================================================*/
/* Table: ActivitySectionPage                                   */
/*==============================================================*/
create table ActivitySectionPage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   section_name         varchar(50),
   section_description  text,
   logo_path            varchar(60),
   sequence             int,
   active               bool default true,
   primary key (sort_id)
);

alter table ActivitySectionPage comment '活动分类';

/*==============================================================*/
/* Table: ActivitySignUpType                                    */
/*==============================================================*/
create table ActivitySignUpType
(
   id                   int not null,
   type_name            varchar(60),
   active               bool default true,
   primary key (id)
);

alter table ActivitySignUpType comment '报名方式（0为直接加入，1为审核报名，2为口令报名）';

/*==============================================================*/
/* Table: ActivityVehicleType                                   */
/*==============================================================*/
create table ActivityVehicleType
(
   id                   int not null,
   type_name            varchar(60),
   active               bool default true,
   primary key (id)
);

alter table ActivityVehicleType comment '活动交通方式（0为汽车，1为公共交通，2为其他）';

/*==============================================================*/
/* Table: ApplicationCategory                                   */
/*==============================================================*/
create table ApplicationCategory
(
   id                   varchar(40) not null,
   category_name        varchar(60),
   description          text,
   active               bool default true,
   primary key (id)
);

alter table ApplicationCategory comment '应用分类';

/*==============================================================*/
/* Table: ApplicationType                                       */
/*==============================================================*/
create table ApplicationType
(
   id                   varchar(40) not null,
   type_name            varchar(60),
   description          text,
   active               bool default true,
   primary key (id)
);

alter table ApplicationType comment '应用类型';

/*==============================================================*/
/* Table: AttentionEmailDuration                                */
/*==============================================================*/
create table AttentionEmailDuration
(
   id                   int not null,
   duration_name        varchar(20),
   unit_day             double,
   active               bool default true,
   primary key (id)
);

alter table AttentionEmailDuration comment '关注Email发送周期';

/*==============================================================*/
/* Table: AutoBrand                                             */
/*==============================================================*/
create table AutoBrand
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   company_id           varchar(40),
   company_name         varchar(60),
   brand_name           varchar(60),
   description          text,
   logo_path            varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table AutoBrand comment '汽车品牌信息';

/*==============================================================*/
/* Table: AutoCarpool                                           */
/*==============================================================*/
create table AutoCarpool
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   active_id            varchar(40),
   owner_id             varchar(40),
   owner_name           varchar(60),
   carpool_id           varchar(40),
   carpool_name         varchar(60),
   is_pass              int,
   active               bool default true,
   primary key (sort_id)
);

alter table AutoCarpool comment '搭车信息';

/*==============================================================*/
/* Table: AutoModel                                             */
/*==============================================================*/
create table AutoModel
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   brand_id             varchar(40),
   brand_name           varchar(60),
   model_name           varchar(60),
   image_path           varchar(60),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table AutoModel comment '汽车型号';

/*==============================================================*/
/* Table: BackHomeCategorySettings                              */
/*==============================================================*/
create table BackHomeCategorySettings
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (id)
);

alter table BackHomeCategorySettings comment '回国信息分类设定';

/*==============================================================*/
/* Table: BackHomeComments                                      */
/*==============================================================*/
create table BackHomeComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table BackHomeComments comment '回国讨论回复';

/*==============================================================*/
/* Table: BackHomeRecords                                       */
/*==============================================================*/
create table BackHomeRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(60),
   is_anonymity         bool,
   home_country_id      varchar(40),
   from_country_id      varchar(40),
   category_id          varchar(40),
   title                varchar(60),
   content              text,
   public_date          datetime,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table BackHomeRecords comment '办身份，出国，回国信息记录';

/*==============================================================*/
/* Table: BlogCategory                                          */
/*==============================================================*/
create table BlogCategory
(
   id                   varchar(40) not null,
   user_id              varchar(40),
   category_name        varchar(60),
   create_date          datetime,
   permission           varchar(40),
   active               bool default true,
   primary key (id)
);

alter table BlogCategory comment '日志分类';

/*==============================================================*/
/* Table: BlogComments                                          */
/*==============================================================*/
create table BlogComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   blog_id              varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              national varchar(140),
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table BlogComments comment '文章评论';

/*==============================================================*/
/* Table: BookmarkCategory                                      */
/*==============================================================*/
create table BookmarkCategory
(
   id                   varchar(40) not null,
   create_id            varchar(40),
   category             varchar(60),
   sequence             int,
   create_datetime      datetime,
   is_system            bool,
   active               bit,
   primary key (id)
);

alter table BookmarkCategory comment '收藏夹分类';

/*==============================================================*/
/* Table: CandidateEducation                                    */
/*==============================================================*/
create table CandidateEducation
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   user_name            varchar(60),
   school_name          varchar(60),
   graduate_year        varchar(10),
   degree               varchar(20),
   major                varchar(60),
   active               bool,
   primary key (sort_id)
);

alter table CandidateEducation comment '学习经历';

/*==============================================================*/
/* Table: CandidatePool                                         */
/*==============================================================*/
create table CandidatePool
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   user_name            varchar(60),
   position_id          varchar(40),
   position_name        varchar(60),
   process_stauts       varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table CandidatePool comment '投过的简历信息';

/*==============================================================*/
/* Table: CandidateResume                                       */
/*==============================================================*/
create table CandidateResume
(
   user_id              varchar(40) not null,
   sort_id              int not null auto_increment,
   name                 varchar(60),
   phone                varchar(20),
   email                varchar(60),
   address              varchar(60),
   nationality          varchar(40),
   nation               varchar(40),
   Country_id           varchar(40),
   State_id             varchar(40),
   City_id              varchar(40),
   zip                  varchar(20),
   position_id          varchar(40),
   resume_description   text,
   file_path            varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table CandidateResume comment '求职者简历信息';

/*==============================================================*/
/* Table: CandidateWork                                         */
/*==============================================================*/
create table CandidateWork
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   user_name            varchar(60),
   work_place_name      varchar(60),
   title                varchar(60),
   description          text,
   begin_year           int,
   begin_month          int,
   end_year             int,
   end_month            int,
   active               bool,
   primary key (sort_id)
);

alter table CandidateWork comment '工作经历';

/*==============================================================*/
/* Table: CareerRecordsComments                                 */
/*==============================================================*/
create table CareerRecordsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table CareerRecordsComments comment '打折商品讨论回复';

/*==============================================================*/
/* Table: CarpoolKickList                                       */
/*==============================================================*/
create table CarpoolKickList
(
   id                   varchar(40) not null,
   carpool_id           varchar(40),
   user_id              varchar(40),
   kick_date            datetime,
   active               bool default true,
   sort_id              int not null auto_increment,
   primary key (sort_id)
);

alter table CarpoolKickList comment '搭车踢出列表';

/*==============================================================*/
/* Table: CarpoolType                                           */
/*==============================================================*/
create table CarpoolType
(
   id                   int not null,
   type_name            varchar(60),
   description          text,
   active               bool default true,
   primary key (id)
);

alter table CarpoolType comment '搭车付费类型（0为免费搭车，1为按邮费均分，2为叫价搭车）';

/*==============================================================*/
/* Table: ChartExceptionList                                    */
/*==============================================================*/
create table ChartExceptionList
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   exception_id         varchar(40),
   exception_name       varchar(60),
   record_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table ChartExceptionList comment '即时聊天例外列表';

/*==============================================================*/
/* Table: ChartHistory                                          */
/*==============================================================*/
create table ChartHistory
(
   id                   varchar(40) not null,
   chart_from_id        varchar(40),
   chart_from_name      varchar(60),
   chart_to_id          varchar(40),
   chart_to_name        varchar(60),
   content              text,
   chart_time           datetime,
   bit                  bit,
   primary key (id)
);

alter table ChartHistory comment '聊天记录';

/*==============================================================*/
/* Table: City                                                  */
/*==============================================================*/
create table City
(
   city_id              varchar(40) not null,
   sort_id              int not null auto_increment,
   state_id             varchar(40),
   city_name            varchar(60),
   city_initial         varchar(50),
   city_type            varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table City comment '城市信息';

/*==============================================================*/
/* Table: Company                                               */
/*==============================================================*/
create table Company
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   category_id          varchar(40),
   company_name_cn      varchar(255),
   description          text,
   logo_path            varchar(200),
   address              varchar(255),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   zip                  varchar(255),
   web_link             varchar(255),
   active               bool default true,
   primary key (sort_id)
);

alter table Company comment '公司信息';

/*==============================================================*/
/* Table: Contellation                                          */
/*==============================================================*/
create table Contellation
(
   id                   varchar(40) not null,
   contellation_name    varchar(20),
   begin_month          int,
   begin_day            int,
   end_month            int,
   end_day              int,
   description          text,
   characters           text,
   active               bool default true,
   primary key (id)
);

alter table Contellation comment '星座信息';

/*==============================================================*/
/* Table: Country                                               */
/*==============================================================*/
create table Country
(
   country_id           varchar(40) not null,
   sort_id              int not null auto_increment,
   country_name_en      varchar(255),
   country_name_chn     varchar(255),
   country_initial      varchar(20),
   continent            varchar(60),
   capital              varchar(255),
   language             varchar(255),
   active               bool default true,
   primary key (sort_id)
);

alter table Country comment 'j国家及相关州省信息';

/*==============================================================*/
/* Table: CreditType                                            */
/*==============================================================*/
create table CreditType
(
   id                   varchar(40) not null,
   type_name            varchar(20),
   description          text,
   company_id           varchar(40),
   active               bool default true,
   primary key (id)
);

alter table CreditType comment '信用卡类别';

/*==============================================================*/
/* Table: CustomizedPermission                                  */
/*==============================================================*/
create table CustomizedPermission
(
   id                   varchar(40) not null,
   user_id              varchar(40),
   obj_type             varchar(40),
   visit_type           int,
   permission_id        varchar(40),
   active               bool default true,
   primary key (id)
);

alter table CustomizedPermission comment '用户自定义权限管理用户表';

/*==============================================================*/
/* Table: DataTable                                             */
/*==============================================================*/
create table DataTable
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   table_name           varchar(60),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table DataTable comment '数据库表信息';

/*==============================================================*/
/* Table: DealsRecords                                          */
/*==============================================================*/
create table DealsRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   is_anonymity         bool,
   source_id            varchar(60),
   image_link           varchar(200),
   link                 varchar(200),
   type                 int,
   goods                varchar(60),
   description          text,
   content              text,
   money_id             varchar(40),
   money_symbol         varchar(10),
   price                varchar(40),
   expire               varchar(60),
   public_date          datetime,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table DealsRecords comment '打折记录';

/*==============================================================*/
/* Table: DealsRecordsComments                                  */
/*==============================================================*/
create table DealsRecordsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table DealsRecordsComments comment '打折商品讨论回复';

/*==============================================================*/
/* Table: Degree                                                */
/*==============================================================*/
create table Degree
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   degree_name_cn       varchar(60),
   degree_initial       varchar(10),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table Degree comment '学位信息';

/*==============================================================*/
/* Table: Department                                            */
/*==============================================================*/
create table Department
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   school_id            varchar(40),
   parent_id            varchar(40),
   department_name      varchar(60),
   description          text,
   web_link             varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table Department comment '学院信息';

/*==============================================================*/
/* Table: DiscussComments                                       */
/*==============================================================*/
create table DiscussComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   gourp_posts_id       varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table DiscussComments comment '讨论回复';

/*==============================================================*/
/* Table: District                                              */
/*==============================================================*/
create table District
(
   district_id          varchar(40) not null,
   city_id              varchar(40),
   district_name        varchar(60),
   active               bool default true,
   sort_id              int not null auto_increment,
   primary key (sort_id)
);

alter table District comment '区域信息';

/*==============================================================*/
/* Table: Dormistry                                             */
/*==============================================================*/
create table Dormistry
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   shcool_id            varchar(40),
   dorm_name            varchar(60),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table Dormistry comment '住宿信息';

/*==============================================================*/
/* Table: DraftMessage                                          */
/*==============================================================*/
create table DraftMessage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   send_id              varchar(40),
   send_username        varchar(60),
   send_email           varchar(60),
   subject              varchar(60),
   content              national varchar(2000),
   draft_date           datetime,
   is_system            bool,
   is_msg               bool,
   is_mark              bool,
   is_read              bool,
   is_delete            bool,
   delete_date          datetime,
   active               bool,
   primary key (sort_id)
);

alter table DraftMessage comment '草稿信息';

/*==============================================================*/
/* Table: FriendsClass                                          */
/*==============================================================*/
create table FriendsClass
(
   type_id              int not null auto_increment,
   user_id              varchar(40),
   relation_name        varchar(60),
   create_date          datetime,
   active               bool default true,
   primary key (type_id)
);

alter table FriendsClass comment '好友分组信息';

/*==============================================================*/
/* Table: GiftCategory                                          */
/*==============================================================*/
create table GiftCategory
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   festival_date        datetime,
   active               bool default true,
   primary key (id)
);

alter table GiftCategory comment '礼物分类类别';

/*==============================================================*/
/* Table: GiftsMarket                                           */
/*==============================================================*/
create table GiftsMarket
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   gift_name            varchar(60),
   category_id          varchar(40),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table GiftsMarket comment '礼品市场';

/*==============================================================*/
/* Table: GoAboardComments                                      */
/*==============================================================*/
create table GoAboardComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table GoAboardComments comment '出国讨论回复';

/*==============================================================*/
/* Table: GoAboardRecords                                       */
/*==============================================================*/
create table GoAboardRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(60),
   is_anonymity         bool,
   home_country_id      varchar(40),
   to_country_id        varchar(40),
   category_id          varchar(40),
   title                varchar(60),
   content              text,
   public_date          datetime,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table GoAboardRecords comment '出国信息记录';

/*==============================================================*/
/* Table: GoaboardCategorySettings                              */
/*==============================================================*/
create table GoaboardCategorySettings
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (id)
);

alter table GoaboardCategorySettings comment '出国信息分类设定';

/*==============================================================*/
/* Table: GolfPlace                                             */
/*==============================================================*/
create table GolfPlace
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   activity_place_id    varchar(40),
   activity_place_name2 varchar(60),
   is_public            bool,
   designer             varchar(60),
   year_built           varchar(10),
   greens_grass_type    varchar(20),
   fairways_grass_type  varchar(20),
   water_hazards        varchar(20),
   sand_bunkers         varchar(20),
   yardage_markers      varchar(50),
   green_fee            varchar(50),
   driving_range        varchar(20),
   training_facilities  varchar(60),
   coach                varchar(200),
   is_rental_clubs      bool,
   is_carts             bool,
   is_pullcarts         bool,
   is_caddies           bool,
   is_walking           bool,
   is_food              bool,
   is_bar               bool,
   is_homes_on_course   bool,
   active               bool default true,
   primary key (sort_id)
);

alter table GolfPlace comment '高尔夫地点';

/*==============================================================*/
/* Table: GroupBudget                                           */
/*==============================================================*/
create table GroupBudget
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             int,
   group_name           int,
   item_name            varchar(100),
   item_description     text,
   is_in                bool,
   budget_money         double,
   create_id            varchar(40),
   create_name          varchar(60),
   create_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupBudget comment '圈子预算';

/*==============================================================*/
/* Table: GroupBudgetOpe                                        */
/*==============================================================*/
create table GroupBudgetOpe
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   budget_id            varchar(40),
   ope_id               varchar(40),
   ope_name             varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table GroupBudgetOpe comment '圈子预算计划执行人列表';

/*==============================================================*/
/* Table: GroupCategory                                         */
/*==============================================================*/
create table GroupCategory
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table GroupCategory comment '圈子分类信息';

/*==============================================================*/
/* Table: GroupChartHistory                                     */
/*==============================================================*/
create table GroupChartHistory
(
   id                   varchar(40) not null,
   group_id             varchar(40),
   talk_id              varchar(40),
   content              text,
   chart_datetime       datetime,
   active               bit,
   primary key (id)
);

alter table GroupChartHistory comment '临时群聊天信息';

/*==============================================================*/
/* Table: GroupChartMember                                      */
/*==============================================================*/
create table GroupChartMember
(
   id                   varchar(40) not null,
   group_id             varchar(40),
   member_id            varchar(40),
   join_time            datetime,
   active               bit,
   primary key (id)
);

alter table GroupChartMember comment '临时聊天群人员';

/*==============================================================*/
/* Table: GroupDiscuss                                          */
/*==============================================================*/
create table GroupDiscuss
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   post_id              varchar(40),
   post_name            varchar(60),
   post_date            datetime,
   subject              varchar(60),
   content              text,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupDiscuss comment '裙子信息';

/*==============================================================*/
/* Table: GroupEmailDuration                                    */
/*==============================================================*/
create table GroupEmailDuration
(
   id                   int not null,
   duration_name        varchar(20),
   unit_day             double,
   active               bool default true,
   primary key (id)
);

alter table GroupEmailDuration comment 'Email发送周期';

/*==============================================================*/
/* Table: GroupEvent                                            */
/*==============================================================*/
create table GroupEvent
(
   id                   int not null auto_increment,
   event_name           varchar(60),
   event_description    text,
   value_nbr            int,
   standard_title       varchar(60),
   standard_content     text,
   active               bool default true,
   primary key (id)
);

alter table GroupEvent comment '圈子中可触发事件集合';

/*==============================================================*/
/* Table: GroupEventProcess                                     */
/*==============================================================*/
create table GroupEventProcess
(
   id                   int not null,
   process_name         varchar(60),
   active               bool default true,
   primary key (id)
);

alter table GroupEventProcess comment '圈子事件处理';

/*==============================================================*/
/* Table: GroupEventRecords                                     */
/*==============================================================*/
create table GroupEventRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   class_id             varchar(40),
   event_id             int,
   event_name           varchar(60),
   create_id            varchar(40),
   create_name          varchar(60),
   delay_invoke         int,
   title                varchar(60),
   content              text,
   link_value1          varchar(60),
   link_value2          varchar(60),
   link_value3          varchar(60),
   link_value4          varchar(60),
   link_value5          varchar(60),
   process_status       int,
   begin_date           datetime,
   end_date             datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupEventRecords comment '圈子事件记录';

/*==============================================================*/
/* Table: GroupEventVoteHistory                                 */
/*==============================================================*/
create table GroupEventVoteHistory
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   event_id             int,
   user_id              varchar(40),
   vote_date            datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupEventVoteHistory comment '圈子事件投票记录';

/*==============================================================*/
/* Table: GroupInfo                                             */
/*==============================================================*/
create table GroupInfo
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   create_id            varchar(40),
   create_date          datetime,
   category_id          varchar(40),
   group_name           varchar(60),
   member_nbr           int,
   group_account        double,
   summary              text,
   description          text,
   activity_score       double,
   website              varchar(60),
   logo_path            varchar(200) default '../content/images/avatar.jpg',
   templogo_path        varchar(200),
   manage_type_id       int,
   democracy_rate       double,
   public_duration      int,
   vote_pass_rate       double,
   join_method_id       int,
   join_fee             double,
   fee_unit             int,
   transfer_account     varchar(20),
   transfer_description varchar(200),
   is_kick_protected    bool,
   kick_protected_duration int,
   is_public            bool,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupInfo comment '圈子信息';

/*==============================================================*/
/* Table: GroupJoinType                                         */
/*==============================================================*/
create table GroupJoinType
(
   id                   varchar(40) not null,
   type_name            varchar(60),
   active               bool default true,
   primary key (id)
);

alter table GroupJoinType comment '圈子加入方式（无需申请直接加入，批准加入）';

/*==============================================================*/
/* Table: GroupKickDuration                                     */
/*==============================================================*/
create table GroupKickDuration
(
   id                   int not null auto_increment,
   duration_name        varchar(20),
   unit_day             double,
   active               bool default true,
   primary key (id)
);

alter table GroupKickDuration comment '圈子保护时限';

/*==============================================================*/
/* Table: GroupKickList                                         */
/*==============================================================*/
create table GroupKickList
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   user_id              varchar(40),
   kick_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupKickList comment '圈子踢出列表，被提出的用户在安全时间内不能再报名';

/*==============================================================*/
/* Table: GroupManageType                                       */
/*==============================================================*/
create table GroupManageType
(
   id                   varchar(40) not null,
   type_name            varchar(60),
   active               bool default true,
   primary key (id)
);

alter table GroupManageType comment '圈子管理方式名（阶梯管理方式，大民主体制，小民主体制）';

/*==============================================================*/
/* Table: GroupMember                                           */
/*==============================================================*/
create table GroupMember
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   group_name           varchar(60),
   user_id              varchar(40),
   user_name            varchar(60),
   is_authorized        bool,
   role_id              varchar(40),
   join_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupMember comment '圈子人员信息';

/*==============================================================*/
/* Table: GroupMoneyFlow                                        */
/*==============================================================*/
create table GroupMoneyFlow
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             int,
   group_name           int,
   match_budget_id      varchar(40),
   is_personal          bool,
   pay_id               varchar(40),
   item_name            varchar(100),
   description          text,
   is_in                bool,
   item_money           double,
   money_ope_id         varchar(40),
   money_ope_name       varchar(60),
   ope_date             datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupMoneyFlow comment '圈子流水账';

/*==============================================================*/
/* Table: GroupMoneyFlowAttachedFile                            */
/*==============================================================*/
create table GroupMoneyFlowAttachedFile
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   money_flow_id        varchar(40),
   store_path           varchar(200),
   active               bool default true,
   primary key (sort_id)
);

alter table GroupMoneyFlowAttachedFile comment '圈子流水附件';

/*==============================================================*/
/* Table: GroupMoneyFlowOpe                                     */
/*==============================================================*/
create table GroupMoneyFlowOpe
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   money_flow_id        varchar(40),
   ope_id               varchar(40),
   ope_name             varchar(60),
   ope_date             datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupMoneyFlowOpe comment '圈子执行人列表';

/*==============================================================*/
/* Table: GroupMsgExceptionList                                 */
/*==============================================================*/
create table GroupMsgExceptionList
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   group_id             varchar(40),
   special_id           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table GroupMsgExceptionList comment '圈子信息特例名单';

/*==============================================================*/
/* Table: GroupRole                                             */
/*==============================================================*/
create table GroupRole
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   group_id             varchar(40),
   group_name           varchar(60),
   manage_type_id       int,
   role_name            varchar(60),
   description          text,
   begin_date           datetime,
   change_duration      int,
   salary               double,
   unit                 int,
   level                int,
   active               bool default true,
   primary key (sort_id)
);

alter table GroupRole comment '圈子角色信息';

/*==============================================================*/
/* Table: HelpComments                                          */
/*==============================================================*/
create table HelpComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   posts_id             varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   evaluation           int,
   active               bool default true,
   primary key (sort_id)
);

alter table HelpComments comment '帮助评论';

/*==============================================================*/
/* Table: HelpDoc                                               */
/*==============================================================*/
create table HelpDoc
(
   id                   varchar(40) not null,
   category_id          varchar(40),
   doc_name             varchar(60),
   doc_content          text,
   update_date          datetime,
   is_useful            int,
   counter              int,
   active               bool default true,
   primary key (id)
);

alter table HelpDoc comment '帮助文档';

/*==============================================================*/
/* Table: HelpDocCategory                                       */
/*==============================================================*/
create table HelpDocCategory
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (id)
);

alter table HelpDocCategory comment '帮助分类';

/*==============================================================*/
/* Table: HelpPosts                                             */
/*==============================================================*/
create table HelpPosts
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   subject              varchar(60),
   content              text,
   create_date          datetime,
   process_status       int,
   is_response          bool,
   very_satisfied       int,
   satisfied            int,
   soso                 int,
   dissatisfied         int,
   very_dissatisfied    int,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table HelpPosts comment '服务留言信息';

/*==============================================================*/
/* Table: HelpVisitHistory                                      */
/*==============================================================*/
create table HelpVisitHistory
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   help_id              varchar(40),
   very_satisfied       int,
   satisfied            int,
   soso                 int,
   dissatisfied         int,
   very_dissatisfied    int,
   view_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table HelpVisitHistory comment '帮助浏览历史记录';

/*==============================================================*/
/* Table: ImageComments                                         */
/*==============================================================*/
create table ImageComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   image_id             varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table ImageComments comment '图片评论';

/*==============================================================*/
/* Table: ImageFolder                                           */
/*==============================================================*/
create table ImageFolder
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   folder_name          varchar(60),
   create_date          datetime,
   update_date          datetime,
   description          text,
   is_system            bool,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table ImageFolder comment '图片文件夹';

/*==============================================================*/
/* Table: ImagePythicalLocation                                 */
/*==============================================================*/
create table ImagePythicalLocation
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   image_path           varchar(200),
   image_small_path     varchar(200),
   fileSize             double,
   user_id              varchar(40),
   upload_date          datetime,
   link_nbr             int,
   active               bool default true,
   primary key (sort_id)
);

alter table ImagePythicalLocation comment '相片真实存储地址';

/*==============================================================*/
/* Table: InboxInviteMessage                                    */
/*==============================================================*/
create table InboxInviteMessage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   from_id              varchar(40),
   from_username        varchar(60),
   from_email           varchar(60),
   msg_type             int,
   msg_id               varchar(40),
   content              national varchar(2000),
   send_date            datetime,
   is_delete            bool,
   delete_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table InboxInviteMessage comment '邀请信息';

/*==============================================================*/
/* Table: InboxMessage                                          */
/*==============================================================*/
create table InboxMessage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   from_id              varchar(40),
   from_username        varchar(60),
   from_email           varchar(60),
   subject              varchar(60),
   content              national varchar(2000),
   receive_date         datetime,
   is_msg               bool,
   is_mark              bool,
   is_read              bool,
   is_delete            bool,
   delete_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table InboxMessage comment '收件箱信息';

/*==============================================================*/
/* Table: InfoActicityRecords                                   */
/*==============================================================*/
create table InfoActicityRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(40),
   is_anonymity         bool,
   category_id          varchar(40),
   level                int,
   subject              varchar(200),
   content              text,
   update_date          datetime,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table InfoActicityRecords comment '活动信息记录';

/*==============================================================*/
/* Table: InfoActivityCategory                                  */
/*==============================================================*/
create table InfoActivityCategory
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(100),
   active               bool default true,
   primary key (id)
);

alter table InfoActivityCategory comment '活动分类';

/*==============================================================*/
/* Table: InfoSectionPage                                       */
/*==============================================================*/
create table InfoSectionPage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   section_name         varchar(50),
   section_description  text,
   logo_path            varchar(200),
   sequence             int,
   active               bool default true,
   primary key (sort_id)
);

alter table InfoSectionPage comment '资道页面结构';

/*==============================================================*/
/* Table: InfoSubSectionPage                                    */
/*==============================================================*/
create table InfoSubSectionPage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   section_id           varchar(40),
   name                 varchar(50),
   description          varchar(200),
   sequence             int,
   page_path            varchar(200),
   logo_path            varchar(200),
   template_id          int,
   is_open              bool default true,
   active               bool default true,
   primary key (sort_id)
);

alter table InfoSubSectionPage comment '资道模块子模块';

/*==============================================================*/
/* Table: JobRecords                                            */
/*==============================================================*/
create table JobRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(60),
   is_anonymity         bool,
   image_link           varchar(200),
   link                 varchar(200),
   title                varchar(60),
   type                 int,
   company_name         varchar(60),
   description          text,
   location             varchar(60),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   zipcode              varchar(10),
   money_id             varchar(40),
   money_symbol         varchar(10),
   payrate              varchar(40),
   job_length           varchar(50),
   employ_type          varchar(60),
   is_travel            varchar(60),
   is_open              bool,
   public_date          datetime,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table JobRecords comment '求职记录';

/*==============================================================*/
/* Table: JoinConditions                                        */
/*==============================================================*/
create table JoinConditions
(
   id                   int not null,
   condition_name       varchar(60),
   active               bool default true,
   primary key (id)
);

alter table JoinConditions comment '加入条件列表';

/*==============================================================*/
/* Table: Language                                              */
/*==============================================================*/
create table Language
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   name                 varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table Language comment '语言信息';

/*==============================================================*/
/* Table: LeaveMessage                                          */
/*==============================================================*/
create table LeaveMessage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   from_id              varchar(40),
   to_id                varchar(40),
   content              varchar(280),
   post_date            datetime,
   is_open              bool default true,
   active               bool default true,
   primary key (sort_id)
);

alter table LeaveMessage comment '访问留言';

/*==============================================================*/
/* Table: LeaveMessageComments                                  */
/*==============================================================*/
create table LeaveMessageComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   message_id           varchar(40),
   user_id              varchar(40),
   content              varchar(280),
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table LeaveMessageComments comment '留言回复';

/*==============================================================*/
/* Table: LinkFeeds                                             */
/*==============================================================*/
create table LinkFeeds
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   link                 varchar(60),
   description          text,
   post_date            datetime,
   counter              int,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table LinkFeeds comment '新鲜事链接信息';

/*==============================================================*/
/* Table: Major                                                 */
/*==============================================================*/
create table Major
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   department_id        varchar(40),
   major_name_cn        varchar(60),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table Major comment '专业信息';

/*==============================================================*/
/* Table: ModelCategory                                         */
/*==============================================================*/
create table ModelCategory
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table ModelCategory comment '分块分类信息';

/*==============================================================*/
/* Table: Module                                                */
/*==============================================================*/
create table Module
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_category_id   varchar(40),
   name                 varchar(60),
   positive             int,
   negative             int,
   follow_score         double,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table Module comment '模块信息';

/*==============================================================*/
/* Table: Money                                                 */
/*==============================================================*/
create table Money
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   money_name_cn        varchar(50),
   money_name_en        varchar(50),
   country_id           varchar(40),
   currency_unit_dolar  double,
   normal_currency_unit varchar(50),
   old_currency_unit    varchar(50),
   active               bool default true,
   primary key (sort_id)
);

alter table Money comment '货币';

/*==============================================================*/
/* Table: NewFeeds                                              */
/*==============================================================*/
create table NewFeeds
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   content              text,
   post_date            datetime,
   counter              int,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table NewFeeds comment '新鲜事信息';

/*==============================================================*/
/* Table: NewFeedsBlockList                                     */
/*==============================================================*/
create table NewFeedsBlockList
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   source_type_id       varchar(40),
   source_id            varchar(40),
   block_type_id        varchar(40),
   block_id             varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table NewFeedsBlockList comment '更新状态信息屏蔽';

/*==============================================================*/
/* Table: NewFeedsComments                                      */
/*==============================================================*/
create table NewFeedsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   news_id              varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              varchar(500),
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table NewFeedsComments comment '讨论回复';

/*==============================================================*/
/* Table: NewLinkFeedsComments                                  */
/*==============================================================*/
create table NewLinkFeedsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   active               bool default true,
   link_id              varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              varchar(500),
   comments_date        datetime,
   positive             int,
   negative             int,
   primary key (sort_id)
);

alter table NewLinkFeedsComments comment '讨论回复';

/*==============================================================*/
/* Table: Page                                                  */
/*==============================================================*/
create table Page
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   language_id          varchar(40),
   page_name            varchar(60),
   page_link            varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table Page comment '页面信息';

/*==============================================================*/
/* Table: PayStatus                                             */
/*==============================================================*/
create table PayStatus
(
   id                   int not null,
   type_name            varchar(60),
   active               bool default true,
   primary key (id)
);

alter table PayStatus comment '付费状态（0,为未付款，1为汇款中，2为已付款）';

/*==============================================================*/
/* Table: PayType                                               */
/*==============================================================*/
create table PayType
(
   id                   varchar(40) not null,
   type_name            varchar(60),
   description          text,
   active               bool default true,
   primary key (id)
);

alter table PayType comment '活动缴费方式（Paypal, 银行汇款，自定义）';

/*==============================================================*/
/* Table: PermissionBlackList                                   */
/*==============================================================*/
create table PermissionBlackList
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   source_id            varchar(40),
   source_type_id       varchar(40),
   black_id             varchar(40),
   black_type_id        varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PermissionBlackList comment '权限黑名单';

/*==============================================================*/
/* Table: PersonalActivityArchives                              */
/*==============================================================*/
create table PersonalActivityArchives
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   activity_id          varchar(40),
   save_name            varchar(60),
   save_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalActivityArchives comment '个人活动保存记录';

/*==============================================================*/
/* Table: PersonalActivityFollow                                */
/*==============================================================*/
create table PersonalActivityFollow
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   attention_id         varchar(40),
   attention_datetime   datetime,
   is_email             bool,
   email_duration       int,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalActivityFollow comment '活动关注信息';

/*==============================================================*/
/* Table: PersonalActivitySchedule                              */
/*==============================================================*/
create table PersonalActivitySchedule
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   activity_id          varchar(40),
   is_build_directly    bool,
   begin_date           datetime,
   email_pre_date       int,
   is_notice            bool,
   notice_pre_date      int,
   is_email             bool,
   is_fixed_schedule    bool,
   fix_schedule         int,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalActivitySchedule comment '个人活动周期订制';

/*==============================================================*/
/* Table: PersonalActivitySettings                              */
/*==============================================================*/
create table PersonalActivitySettings
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   activity_id          varchar(40),
   is_carpool_kick_protected bool,
   kick_carpool_duration int,
   contact_email        varchar(60),
   is_email_event       bool,
   is_notice_event      bool,
   is_email_updates     bool,
   is_notice_updates    bool,
   is_email_digest      bool,
   is_notice_digest     bool,
   digest_duration      int,
   is_allow_msg         bool,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalActivitySettings comment '个人活动设定';

/*==============================================================*/
/* Table: PersonalBlog                                          */
/*==============================================================*/
create table PersonalBlog
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   is_transmit          bool,
   transmit_id          varchar(40),
   category_id          varchar(40),
   title                varchar(60),
   content              text,
   post_date            datetime,
   weather              varchar(20),
   location             varchar(100),
   counter              int,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalBlog comment '日志';

/*==============================================================*/
/* Table: PersonalBlogDraft                                     */
/*==============================================================*/
create table PersonalBlogDraft
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   title                varchar(60),
   content              text,
   save_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalBlogDraft comment '个人日志草稿';

/*==============================================================*/
/* Table: PersonalBlogSettings                                  */
/*==============================================================*/
create table PersonalBlogSettings
(
   user_id              varchar(40) not null,
   blog_name            varchar(60),
   blog_description     varchar(256),
   default_category_id  varchar(40),
   default_permission   varchar(40),
   active               bool default true,
   primary key (user_id)
);

alter table PersonalBlogSettings comment '个人日志设定';

/*==============================================================*/
/* Table: PersonalBookmark                                      */
/*==============================================================*/
create table PersonalBookmark
(
   id                   varchar(40) not null,
   category_id          varchar(40),
   link_content         varchar(60),
   description          varchar(100),
   mark_time            datetime,
   active               bit,
   primary key (id)
);

alter table PersonalBookmark comment '个人收藏夹';

/*==============================================================*/
/* Table: PersonalCalendar                                      */
/*==============================================================*/
create table PersonalCalendar
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   title                varchar(100),
   destination          varchar(100),
   event                varchar(500),
   begin_date           datetime,
   end_date             datetime,
   is_agenda            bool,
   is_hint              bool,
   hint_duration        int,
   hint_unit            varchar(10),
   is_email             bool,
   email_duration       int,
   email_unit           varchar(10),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalCalendar comment '个人日历';

/*==============================================================*/
/* Table: PersonalChartSettings                                 */
/*==============================================================*/
create table PersonalChartSettings
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   is_accept            bool,
   is_exception         bool,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalChartSettings comment '个人聊天设定';

/*==============================================================*/
/* Table: PersonalContact                                       */
/*==============================================================*/
create table PersonalContact
(
   user_id              varchar(40) not null,
   web_email            varchar(60),
   email                varchar(60),
   is_bond_email        bool,
   email_bond_date      datetime,
   skype                   varchar(20),
   is_bond_skype           bool,
   skype_bond_date         datetime,
   msn                  varchar(20),
   is_bond_msn          bool,
   msn_bond_date        datetime,
   cell                 varchar(20),
   is_bond_cell         bool,
   cell_bond_date       datetime,
   web_website          varchar(60),
   website              varchar(60),
   permission           varchar(40),
   active               bool default true,
   primary key (user_id)
);

alter table PersonalContact comment '个人联系信息';

/*==============================================================*/
/* Table: PersonalCreditCard                                    */
/*==============================================================*/
create table PersonalCreditCard
(
   id                   varchar(40) not null,
   user_id              varchar(40),
   card_type_id         varchar(40),
   card_nbr             varchar(40),
   name_on_card         varchar(20),
   expire_date_year     int,
   expire_date_month    int,
   active               bool default true,
   primary key (id)
);

alter table PersonalCreditCard comment '个人信用卡信息';

/*==============================================================*/
/* Table: PersonalEducation                                     */
/*==============================================================*/
create table PersonalEducation
(
   id                   varchar(40) not null,
   use_id               varchar(40),
   school_name          varchar(60),
   school_type          int,
   campus               varchar(60),
   department           varchar(60),
   major                varchar(60),
   degree               varchar(40),
   domistry             varchar(60),
   class                varchar(60),
   class2               varchar(10),
   class3               varchar(10),
   begin_year           int,
   begin_month          int,
   end_year             int,
   end_month            int,
   permission           varchar(40),
   active               bit,
   primary key (id)
);

alter table PersonalEducation comment '个人教育背景';

/*==============================================================*/
/* Table: PersonalFriends                                       */
/*==============================================================*/
create table PersonalFriends
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   relation_from_id     varchar(40),
   relation_to_id       varchar(40),
   class_id             varchar(40),
   join_date            datetime,
   is_authorize         bool,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalFriends comment '好友信息栏';

/*==============================================================*/
/* Table: PersonalFriendsFollow                                 */
/*==============================================================*/
create table PersonalFriendsFollow
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   attention_id         varchar(40),
   attention_datetime   datetime,
   is_email             bool,
   email_duration       int,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalFriendsFollow comment '个人关注信息';

/*==============================================================*/
/* Table: PersonalGift                                          */
/*==============================================================*/
create table PersonalGift
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   category_id          varchar(40),
   content              text,
   is_receive           bool,
   action_id            varchar(40),
   action_name          varchar(60),
   action_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalGift comment '个人礼品';

/*==============================================================*/
/* Table: PersonalGroupFollow                                   */
/*==============================================================*/
create table PersonalGroupFollow
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   attention_id         varchar(40),
   attention_datetime   datetime,
   is_email             bool,
   email_duration       int,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalGroupFollow comment '个人圈子关注信息';

/*==============================================================*/
/* Table: PersonalGroupSettings                                 */
/*==============================================================*/
create table PersonalGroupSettings
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   group_id             varchar(40),
   contact_email        varchar(60),
   is_email_event       bool,
   is_notice_event      bool,
   is_email_updates     bool,
   is_notice_updates    bool,
   is_email_digest      bool,
   is_notice_digest     bool,
   digest_duration      int,
   is_allow_msg         bool,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalGroupSettings comment '个人圈子设定';

/*==============================================================*/
/* Table: PersonalImage                                         */
/*==============================================================*/
create table PersonalImage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   link_id              varchar(40),
   fold_id              varchar(40),
   image_path           varchar(200),
   image_name           varchar(60),
   image_small_path     varchar(200),
   fileSize             double,
   sequence             int,
   description          text,
   weather              varchar(20),
   location             varchar(20),
   upload_date          datetime,
   is_cover             bool,
   is_submit            bool,
   counter              int,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalImage comment '个人相片';

/*==============================================================*/
/* Table: PersonalInterests                                     */
/*==============================================================*/
create table PersonalInterests
(
   user_id              varchar(40) not null,
   sort_id              int not null auto_increment,
   hobby                varchar(60),
   music                varchar(60),
   movie                varchar(60),
   game                 varchar(60),
   sport                varchar(60),
   book                 varchar(60),
   cartoon              varchar(60),
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalInterests comment '个人兴趣爱好信息';

/*==============================================================*/
/* Table: PersonalLoginLog                                      */
/*==============================================================*/
create table PersonalLoginLog
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   login_date           datetime,
   logout_date          datetime,
   ip                   varchar(20),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalLoginLog comment '个人登录记录';

/*==============================================================*/
/* Table: PersonalModuleFollow                                  */
/*==============================================================*/
create table PersonalModuleFollow
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   attention_id         varchar(40),
   attention_datetime   datetime,
   is_email             bool,
   email_duration       int,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalModuleFollow comment '模块关注信息';

/*==============================================================*/
/* Table: PersonalNameCard                                      */
/*==============================================================*/
create table PersonalNameCard
(
   user_id              varchar(40) not null,
   is_available         bool,
   is_display_current_place bool,
   current_place        varchar(50),
   is_display_home      bool,
   home                 varchar(50),
   is_display_school    bool,
   school               varchar(60),
   is_display_work      bool,
   work_place           varchar(60),
   is_display_contellation bool,
   contellation         varchar(20),
   active               bool default true,
   primary key (user_id)
);

alter table PersonalNameCard comment '个人名片卡';

/*==============================================================*/
/* Table: PersonalNote                                          */
/*==============================================================*/
create table PersonalNote
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   content              text,
   sequence             int,
   page                 int,
   note_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalNote comment '个人记事本';

/*==============================================================*/
/* Table: PersonalOpertionLog                                   */
/*==============================================================*/
create table PersonalOpertionLog
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   login_id             varchar(40),
   page_use_path        varchar(60),
   Exception            text,
   exception_date       datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalOpertionLog comment '个人操作日志';

/*==============================================================*/
/* Table: PersonalOtherContact                                  */
/*==============================================================*/
create table PersonalOtherContact
(
   id                   int not null,
   user_id              varchar(40),
   contact_name         varchar(40),
   contact_number       varchar(20),
   active               bool default true,
   primary key (id)
);

alter table PersonalOtherContact comment '用户其他联系方式';

/*==============================================================*/
/* Table: PersonalPhotoSettings                                 */
/*==============================================================*/
create table PersonalPhotoSettings
(
   user_id              varchar(40) not null,
   default_folder_id    varchar(40),
   default_permission   varchar(40),
   active               bool default true,
   primary key (user_id)
);

alter table PersonalPhotoSettings comment '个人相册设定';

/*==============================================================*/
/* Table: PersonalPostsDraft                                    */
/*==============================================================*/
create table PersonalPostsDraft
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   title                varchar(60),
   content              text,
   save_date            datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalPostsDraft comment '个人杂烩草稿';

/*==============================================================*/
/* Table: PersonalPostsFollow                                   */
/*==============================================================*/
create table PersonalPostsFollow
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   attention_id         varchar(40),
   attention_datetime   datetime,
   is_email             bool,
   email_duration       int,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalPostsFollow comment '个人发帖关注信息';

/*==============================================================*/
/* Table: PersonalProfile                                       */
/*==============================================================*/
create table PersonalProfile
(
   user_id              varchar(40) not null,
   sort_id              int not null auto_increment,
   is_online            bool,
   name                 varchar(60),
   english_name         varchar(60),
   gender               bool,
   logo_path            varchar(200),
   logo_small_path      varchar(200),
   upload_datetime      datetime,
   experience           double,
   integrity_score      double,
   activity_score       double,
   follow_score         double,
   credit_score         double,
   gold                 double,
   share_score          double,
   birthday_year        int,
   birthday_month       int,
   birthday_day         int,
   constellation        varchar(10),
   use_experience       text,
   current_address      varchar(60),
   current_distinct_id  varchar(40),
   current_zip          varchar(20),
   current_country_id   varchar(40),
   current_state_id     varchar(40),
   current_city_id      varchar(40),
   birth_district       varchar(40),
   birth_country_id     varchar(40),
   birth_state_id       varchar(40),
   birth_city_id        varchar(40),
   is_msg_me            varchar(40),
   friend_request       varchar(40),
   is_find_me           bool,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalProfile comment '个人基础信息';

/*==============================================================*/
/* Table: PersonalRadomCode                                     */
/*==============================================================*/
create table PersonalRadomCode
(
   user_id              varchar(40) not null,
   radom_code           varchar(50),
   radom_datetime       datetime,
   active               bool,
   primary key (user_id)
);

alter table PersonalRadomCode comment '找回密码随机码表';

/*==============================================================*/
/* Table: PersonalSecurityProfile                               */
/*==============================================================*/
create table PersonalSecurityProfile
(
   user_id              varchar(40) not null,
   account              varchar(60),
   account_type_id      int,
   password             varchar(60),
   security_email       varchar(60),
   question_id          varchar(40),
   answer               varchar(60),
   question2_id         varchar(40),
   answer2              varchar(60),
   active               bool default true,
   primary key (user_id)
);

alter table PersonalSecurityProfile comment '个人安全信息';

/*==============================================================*/
/* Table: PersonalStatus                                        */
/*==============================================================*/
create table PersonalStatus
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   rule_id              varchar(40),
   think_to_do          varchar(50),
   what_to_do           varchar(50),
   country_id           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalStatus comment '个人状态信息';

/*==============================================================*/
/* Table: PersonalTools                                         */
/*==============================================================*/
create table PersonalTools
(
   序号                   varchar(40) not null,
   user_id              varchar(40),
   tool_id              varchar(40),
   sequence             int,
   is_onbar             bool,
   active               bool default true,
   primary key (序号)
);

alter table PersonalTools comment '个人工具设定信息';

/*==============================================================*/
/* Table: PersonalVideo                                         */
/*==============================================================*/
create table PersonalVideo
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   fold_id              varchar(40),
   source               varchar(40),
   video_name           varchar(60),
   video_link           varchar(60),
   video_path           varchar(200),
   video_code           varchar(500),
   sequence             int,
   description          text,
   weather              varchar(20),
   location             varchar(20),
   upload_date          datetime,
   counter              int,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalVideo comment '个人视频';

/*==============================================================*/
/* Table: PersonalVideoSettings                                 */
/*==============================================================*/
create table PersonalVideoSettings
(
   user_id              varchar(40) not null,
   default_folder_id    varchar(40),
   default_permission   varchar(40),
   active               bool default true,
   primary key (user_id)
);

alter table PersonalVideoSettings comment '个人视频设定';

/*==============================================================*/
/* Table: PersonalViewRecord                                    */
/*==============================================================*/
create table PersonalViewRecord
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   sourse_id            varchar(40),
   source_type_id       varchar(40),
   is_read              bool,
   rec_date             datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalViewRecord comment '阅读记录';

/*==============================================================*/
/* Table: PersonalWork                                          */
/*==============================================================*/
create table PersonalWork
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   company_name         varchar(60),
   position_name        varchar(60),
   description          text,
   begin_date           datetime,
   end_date             datetime,
   is_present           bool,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table PersonalWork comment '个人工作信息';

/*==============================================================*/
/* Table: PlayType                                              */
/*==============================================================*/
create table PlayType
(
   id                   varchar(40) not null,
   play_type            varchar(60),
   description          text,
   active               bool default true,
   primary key (id)
);

alter table PlayType comment '活动类型';

/*==============================================================*/
/* Table: Position                                              */
/*==============================================================*/
create table Position
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   category_id          varchar(40),
   position_name        varchar(60),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table Position comment '职位信息';

/*==============================================================*/
/* Table: PositionCategory                                      */
/*==============================================================*/
create table PositionCategory
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   parent_id            varchar(40),
   category_name        varchar(60),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table PositionCategory comment '职位分类信息';

/*==============================================================*/
/* Table: PositionPool                                          */
/*==============================================================*/
create table PositionPool
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   position_id          varchar(40),
   type_id              varchar(40),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   amount               int,
   requirements         text,
   salary_begin         double,
   salary_end           double,
   active               bool default true,
   primary key (sort_id)
);

alter table PositionPool comment '职位信息';

/*==============================================================*/
/* Table: PositionType                                          */
/*==============================================================*/
create table PositionType
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   parent_id            varchar(40),
   type_name            varchar(60),
   description          text,
   active               bool default true,
   primary key (sort_id)
);

alter table PositionType comment '工作分类';

/*==============================================================*/
/* Table: Posts                                                 */
/*==============================================================*/
create table Posts
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   post_id              varchar(40),
   post_name            varchar(60),
   is_anonymity         bool,
   post_datetime        datetime,
   category_id          varchar(40),
   subject              varchar(60),
   content              text,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table Posts comment '发帖信息';

/*==============================================================*/
/* Table: PostsComments                                         */
/*==============================================================*/
create table PostsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   news_id              varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table PostsComments comment '发帖回复';

/*==============================================================*/
/* Table: ProcessStatus                                         */
/*==============================================================*/
create table ProcessStatus
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   process_name         varchar(60),
   description          text,
   sequence             int,
   amount_seq           int,
   active               bool default true,
   primary key (sort_id)
);

alter table ProcessStatus comment '处理进度信息';

/*==============================================================*/
/* Table: PropertyPermission                                    */
/*==============================================================*/
create table PropertyPermission
(
   id                   varchar(40) not null,
   name                 varchar(60),
   user_id              varchar(40),
   per_type             varchar(40),
   level                int,
   active               bool default true,
   primary key (id)
);

alter table PropertyPermission comment '权限信息';

/*==============================================================*/
/* Table: RentalHouseImage                                      */
/*==============================================================*/
create table RentalHouseImage
(
   id                   varchar(40) not null,
   record_id            varchar(40),
   image_path           varchar(200),
   small_image_path     varchar(200),
   description          text,
   is_submit            bool,
   sequence             int,
   active               bit default true,
   primary key (id)
);

alter table RentalHouseImage comment '租房图片信息';

/*==============================================================*/
/* Table: RentalHouseRecords                                    */
/*==============================================================*/
create table RentalHouseRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(60),
   is_anonymity         bool,
   house_name           varchar(60),
   type                 int,
   address              varchar(500),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   zipcode              varchar(20),
   money_id             varchar(40),
   money_symbol         varchar(10),
   price                varchar(40),
   pay_type             varchar(60),
   description          text,
   contact              varchar(60),
   is_open              bool,
   public_date          datetime,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table RentalHouseRecords comment '出租房屋记录';

/*==============================================================*/
/* Table: RentalHouseRecordsComments                            */
/*==============================================================*/
create table RentalHouseRecordsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table RentalHouseRecordsComments comment '租房讨论回复';

/*==============================================================*/
/* Table: Report                                                */
/*==============================================================*/
create table Report
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   report_id            varchar(40),
   type_id              int,
   report_date          datetime,
   process_status       int,
   evaluation           int,
   end_date             datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table Report comment '举报信息';

/*==============================================================*/
/* Table: ReportProcess                                         */
/*==============================================================*/
create table ReportProcess
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   process_id           varchar(40),
   follow_id            varchar(40),
   answer_id            varchar(40),
   is_answer            bool,
   content              text,
   reply_date           datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table ReportProcess comment '举报处理记录';

/*==============================================================*/
/* Table: ReportType                                            */
/*==============================================================*/
create table ReportType
(
   id                   varchar(40) not null,
   category_id          varchar(40),
   type_name            varchar(60),
   active               bool,
   primary key (id)
);

alter table ReportType comment '举报类型';

/*==============================================================*/
/* Table: RoleEventRules                                        */
/*==============================================================*/
create table RoleEventRules
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   level                int,
   manage_type_id       int,
   event_id             int,
   active               bool default true,
   primary key (sort_id)
);

alter table RoleEventRules comment '角色能发起的事件';

/*==============================================================*/
/* Table: SaleAutoImage                                         */
/*==============================================================*/
create table SaleAutoImage
(
   id                   varchar(40) not null,
   record_id            varchar(40),
   image_path           varchar(200),
   small_image_path     varchar(200),
   description          text,
   is_submit            bool,
   sequence             int,
   active               bit default true,
   primary key (id)
);

alter table SaleAutoImage comment '卖车图片信息';

/*==============================================================*/
/* Table: SaleAutoRecords                                       */
/*==============================================================*/
create table SaleAutoRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(60),
   is_anonymity         bool,
   brand_id             varchar(40),
   type_id              varchar(40),
   year                 int,
   mile_nbr             int,
   state                varchar(40),
   city                 varchar(40),
   money_id             varchar(40),
   money_symbol         varchar(10),
   price                varchar(40),
   pay_type             varchar(60),
   contact              varchar(200),
   description          text,
   public_date          datetime,
   counter              int,
   is_open              bool,
   active               bool default true,
   primary key (sort_id)
);

alter table SaleAutoRecords comment '买车记录';

/*==============================================================*/
/* Table: SaleAutoRecordsComments                               */
/*==============================================================*/
create table SaleAutoRecordsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table SaleAutoRecordsComments comment '卖车信息讨论回复';

/*==============================================================*/
/* Table: SalesImage                                            */
/*==============================================================*/
create table SalesImage
(
   id                   varchar(40) not null,
   record_id            varchar(40),
   image_path           varchar(200),
   small_image_path     varchar(200),
   description          text,
   sequence             int,
   is_submit            bool,
   active               bit default true,
   primary key (id)
);

alter table SalesImage comment '卖物图片信息';

/*==============================================================*/
/* Table: SalesRecords                                          */
/*==============================================================*/
create table SalesRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(60),
   is_anonymity         bool,
   name                 varchar(60),
   address              varchar(60),
   country_id           varchar(40),
   state_id             varchar(40),
   city                 varchar(40),
   zip                  varchar(10),
   money_id             varchar(40),
   money_symbol         varchar(10),
   price                varchar(40),
   pay_type             varchar(60),
   contact              varchar(100),
   description          text,
   public_date          datetime,
   is_open              bool,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table SalesRecords comment '跳蚤市场记录';

/*==============================================================*/
/* Table: SalesRecordsComments                                  */
/*==============================================================*/
create table SalesRecordsComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table SalesRecordsComments comment '卖物讨论回复';

/*==============================================================*/
/* Table: School                                                */
/*==============================================================*/
create table School
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   school_type_id       varchar(40),
   school_name_cn       varchar(60),
   school_initial       varchar(60),
   school_description   text,
   logo_path            varchar(200),
   address              varchar(60),
   country_id           varchar(40),
   state_id             varchar(40),
   city_id              varchar(40),
   zip                  varchar(20),
   web_link             varchar(500),
   active               bool default true,
   primary key (sort_id)
);

alter table School comment '小学，初中，高中，职高，中专， 大学表';

/*==============================================================*/
/* Table: SchoolType                                            */
/*==============================================================*/
create table SchoolType
(
   id                   varchar(40) not null,
   type_name            varchar(60),
   description          text,
   active               bool default true,
   primary key (id)
);

alter table SchoolType comment '学校类型（小学，初中，中专，高中，职高，大学，研究所）';

/*==============================================================*/
/* Table: SearchContentRecords                                  */
/*==============================================================*/
create table SearchContentRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   page_id              varchar(40),
   search_content       text,
   search_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table SearchContentRecords comment '搜索栏搜索词条历史记录';

/*==============================================================*/
/* Table: SecurityQuestion                                      */
/*==============================================================*/
create table SecurityQuestion
(
   id                   varchar(40) not null,
   question             varchar(60),
   active               bool default true,
   primary key (id)
);

alter table SecurityQuestion comment '安全问题列表';

/*==============================================================*/
/* Table: SelfAdvertise                                         */
/*==============================================================*/
create table SelfAdvertise
(
   id                   varchar(40) not null,
   user_id              varchar(40),
   module_id            varchar(40),
   is_use_icon          bool,
   icon_name            varchar(60),
   icon_path            varchar(60),
   icon_type            varchar(10),
   company_id           varchar(40),
   email                char(60),
   plan_id              varchar(40),
   begin_date           datetime,
   end_date             datetime,
   active               bool default true,
   sort_id              int not null auto_increment,
   primary key (sort_id)
);

alter table SelfAdvertise comment '个人广告';

/*==============================================================*/
/* Table: SelfAdvertiseContact                                  */
/*==============================================================*/
create table SelfAdvertiseContact
(
   id                   varchar(40) not null,
   advertise_id         varchar(40),
   contact_id           varchar(40),
   nbr                  int,
   active               bool default true,
   sort_id              int not null auto_increment,
   primary key (sort_id)
);

alter table SelfAdvertiseContact comment '自助广告联系信息';

/*==============================================================*/
/* Table: SelfAdvertisePay                                      */
/*==============================================================*/
create table SelfAdvertisePay
(
   id                   varchar(40) not null,
   card_id              varchar(40),
   csc                  int,
   money_id             varchar(40),
   cut_money            double,
   tax_id               varchar(40),
   active               bool default true,
   sort_id              int not null auto_increment,
   primary key (sort_id)
);

alter table SelfAdvertisePay comment '自助广告付费记录';

/*==============================================================*/
/* Table: SelfAdvertisePlan                                     */
/*==============================================================*/
create table SelfAdvertisePlan
(
   id                   varchar(40) not null,
   plan_name            varchar(60),
   description          text,
   cost                 double,
   time                 double,
   begin_date           datetime,
   end_date             datetime,
   active               bool default true,
   sort_id              int not null auto_increment,
   primary key (sort_id)
);

alter table SelfAdvertisePlan comment '自助广告计划信息';

/*==============================================================*/
/* Table: SendInviteMessage                                     */
/*==============================================================*/
create table SendInviteMessage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   send_id              varchar(40),
   send_username        varchar(60),
   send_email           varchar(60),
   msg_type             int,
   msg_id               varchar(40),
   content              national varchar(2000),
   send_date            datetime,
   is_delete            bool,
   delete_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table SendInviteMessage comment '发送的邀请信息';

/*==============================================================*/
/* Table: SendMessage                                           */
/*==============================================================*/
create table SendMessage
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   send_id              varchar(40),
   send_username        varchar(60),
   send_email           varchar(60),
   subject              varchar(60),
   content              national varchar(2000),
   send_date            datetime,
   is_msg               bool,
   is_mark              bool,
   is_delete            bool,
   delete_date          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table SendMessage comment '发送信息';

/*==============================================================*/
/* Table: ServiceProcess                                        */
/*==============================================================*/
create table ServiceProcess
(
   id                   int not null,
   process_name         varchar(60),
   process_description  text,
   active               bool default true,
   primary key (id)
);

alter table ServiceProcess comment '服务处理记录';

/*==============================================================*/
/* Table: SiteApplication                                       */
/*==============================================================*/
create table SiteApplication
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   type_id              varchar(40),
   category_id          varchar(40),
   app_name             varchar(60),
   app_path             varchar(60),
   version              varchar(10),
   update_date          datetime,
   app_description      text,
   install_doc          text,
   install_doc_path     varchar(200),
   help_doc             text,
   help_doc_path        varchar(200),
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

/*==============================================================*/
/* Table: SiteSuggest                                           */
/*==============================================================*/
create table SiteSuggest
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   user_id              varchar(40),
   subject              varchar(60),
   content              text,
   create_date          datetime,
   is_satisfy           bool,
   iscontent            bool,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table SiteSuggest comment '站点建议信息';

/*==============================================================*/
/* Table: SourceType                                            */
/*==============================================================*/
create table SourceType
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   category_id          int,
   type_name            varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table SourceType comment '来源类型管理';

/*==============================================================*/
/* Table: SourceTypeCategory                                    */
/*==============================================================*/
create table SourceTypeCategory
(
   id                   int not null,
   parent_id            int,
   category_name        varchar(60),
   active               bool,
   primary key (id)
);

alter table SourceTypeCategory comment '来源类型分类';

/*==============================================================*/
/* Table: State                                                 */
/*==============================================================*/
create table State
(
   state_id             varchar(40) not null,
   sort_id              int not null auto_increment,
   country_id           varchar(40),
   state_name           varchar(50),
   state_initial        varchar(20),
   area                 varchar(60),
   timezone_id          varchar(40),
   tax_id               varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table State comment '州/省信息';

/*==============================================================*/
/* Table: StatusCategorySettings                                */
/*==============================================================*/
create table StatusCategorySettings
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   active               bool default true,
   primary key (id)
);

alter table StatusCategorySettings comment '办身份信息分类设定';

/*==============================================================*/
/* Table: StatusComments                                        */
/*==============================================================*/
create table StatusComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   record_id            varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table StatusComments comment '办身份讨论回复';

/*==============================================================*/
/* Table: StatusContent                                         */
/*==============================================================*/
create table StatusContent
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   country_id           varchar(40),
   what_to_do           varchar(50),
   think_to_do          varchar(50),
   active               bool default true,
   primary key (sort_id)
);

alter table StatusContent comment '状态信息';

/*==============================================================*/
/* Table: StatusRecords                                         */
/*==============================================================*/
create table StatusRecords
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   module_id            varchar(40),
   module_name          varchar(60),
   source_type_id       varchar(40),
   source_id            varchar(60),
   is_anonymity         bool,
   country_id           varchar(40),
   category_id          varchar(40),
   title                varchar(60),
   content              text,
   public_date          datetime,
   counter              int,
   active               bool default true,
   primary key (sort_id)
);

alter table StatusRecords comment '办身份信息记录';

/*==============================================================*/
/* Table: StatusRules                                           */
/*==============================================================*/
create table StatusRules
(
   id                   varchar(40) not null,
   status_id            varchar(40),
   module_id            varchar(40),
   module_name          varchar(60),
   active               bool default true,
   primary key (id)
);

alter table StatusRules comment '状态规则信息';

/*==============================================================*/
/* Table: SuggestComments                                       */
/*==============================================================*/
create table SuggestComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   suggest_id           varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table SuggestComments comment '建议评论';

/*==============================================================*/
/* Table: SuggestScreenShot                                     */
/*==============================================================*/
create table SuggestScreenShot
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   suggest_id           varchar(40),
   image_path           varchar(60),
   active               bool default true,
   primary key (sort_id)
);

alter table SuggestScreenShot comment '建议截图';

/*==============================================================*/
/* Table: Tax                                                   */
/*==============================================================*/
create table Tax
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   country_id           varchar(40),
   state_id             varchar(40),
   tax                  double,
   groceries            varchar(40),
   local_surtax         double,
   prepared_food        varchar(40),
   prescriotion_drug    varchar(40),
   non_prescription_drug varchar(40),
   clothing             varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table Tax comment '税率信息';

/*==============================================================*/
/* Table: TimeZone                                              */
/*==============================================================*/
create table TimeZone
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   zone_name            varchar(60),
   time_diff            varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table TimeZone comment '全球时区表';

/*==============================================================*/
/* Table: ToolCategory                                          */
/*==============================================================*/
create table ToolCategory
(
   category_id          varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   description          text,
   active               bit,
   primary key (category_id)
);

alter table ToolCategory comment '工具分类';

/*==============================================================*/
/* Table: ToolsPool                                             */
/*==============================================================*/
create table ToolsPool
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   image_location       varchar(60),
   category_id          varchar(40),
   tool_name            varchar(60),
   tool_description     text,
   developer_id         varchar(60),
   update_time          datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table ToolsPool comment '工具池信息';

/*==============================================================*/
/* Table: TopicCategory                                         */
/*==============================================================*/
create table TopicCategory
(
   id                   varchar(40) not null,
   parent_id            varchar(40),
   category_name        varchar(60),
   is_available_forum   bool,
   is_available_group   bool,
   is_available_activity bool,
   active               bool default true,
   primary key (id)
);

alter table TopicCategory comment '话题分类类别';

/*==============================================================*/
/* Table: UnitCategory                                          */
/*==============================================================*/
create table UnitCategory
(
   id                   varchar(40) not null,
   category_name        varchar(60),
   active               bit,
   primary key (id)
);

alter table UnitCategory comment '单位分类';

/*==============================================================*/
/* Table: UnitList                                              */
/*==============================================================*/
create table UnitList
(
   id                   varchar(40) not null,
   category_id          varchar(40),
   unit_name            varchar(60),
   active               bool,
   primary key (id)
);

alter table UnitList comment '单位列表';

/*==============================================================*/
/* Table: UnitRules                                             */
/*==============================================================*/
create table UnitRules
(
   id                   varchar(40) not null,
   from_id              varchar(40),
   from_name            varchar(60),
   to_id                varchar(40),
   to_name              varchar(60),
   value                varchar(20),
   active               bool,
   primary key (id)
);

alter table UnitRules comment '单位换算规则';

/*==============================================================*/
/* Table: UserVisitHistory                                      */
/*==============================================================*/
create table UserVisitHistory
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   login_id             varchar(60),
   ip                   varchar(20),
   visit_date           datetime,
   active               bool default true,
   primary key (sort_id)
);

alter table UserVisitHistory comment '用户浏览记录,防止频繁登陆';

/*==============================================================*/
/* Table: VideoComments                                         */
/*==============================================================*/
create table VideoComments
(
   id                   varchar(40) not null,
   sort_id              int not null auto_increment,
   video_id             varchar(40),
   follow_id            varchar(40),
   user_id              varchar(40),
   content              text,
   comments_date        datetime,
   positive             int,
   negative             int,
   active               bool default true,
   primary key (sort_id)
);

alter table VideoComments comment '视频评论';

/*==============================================================*/
/* Table: VideoFolder                                           */
/*==============================================================*/
create table VideoFolder
(
   sort_id              int not null auto_increment,
   id                   varchar(40) not null,
   user_id              varchar(40),
   folder_name          varchar(60),
   create_date          datetime,
   description          text,
   is_system            bool,
   permission           varchar(40),
   active               bool default true,
   primary key (sort_id)
);

alter table VideoFolder comment '视频文件夹';

