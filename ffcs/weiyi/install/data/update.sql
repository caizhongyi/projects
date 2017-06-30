

CREATE TABLE IF NOT EXISTS `ims_fans_col_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `colname` varchar(50) default null,
  `col` varchar(60) default null,
  `type` varchar(10) default null,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;


CREATE TABLE IF NOT EXISTS `ims_fans_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) default null,
  `colid` varchar(50) default null,
  `create_time` varchar(10) default null,
  `ruleid` int(10) default null,
  `isnecessary` tinyint(1) default null,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;


ALTER TABLE `ims_members`
ADD COLUMN `groupid`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户组id' AFTER `uid`;

CREATE TABLE IF NOT EXISTS `ims_members_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `modules` varchar(1000) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8


ALTER TABLE `ims_site_styles`
ADD COLUMN `weid`  int(10) NULL AFTER `content`;

##################12月24日融合官方版本SQL更新 by fangyq@ffcs.cn##################

ALTER TABLE `ims_category` ADD COLUMN `nid`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '关联导航id' AFTER `weid`;

ALTER TABLE `ims_fans` ADD COLUMN `credit1`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '积分' AFTER `follow`;

ALTER TABLE `ims_fans` ADD COLUMN `credit2`  double UNSIGNED NOT NULL DEFAULT 0 COMMENT '余额' AFTER `credit1`;

ALTER TABLE `ims_members` ADD COLUMN `groupid`  int(10) UNSIGNED NOT NULL DEFAULT 0 AFTER `uid`;

CREATE TABLE `ims_members_group` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`name`  varchar(50) NOT NULL ,
`modules`  varchar(1000) NOT NULL DEFAULT '' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_modules` ADD COLUMN `type`  varchar(20) NOT NULL DEFAULT '' COMMENT '类型' AFTER `name`;

ALTER TABLE `ims_modules` ADD COLUMN `isrulesingle`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否单入口模块' AFTER `isrulefields`;

CREATE TABLE `ims_paylog` (
`plid`  int(11) NOT NULL AUTO_INCREMENT ,
`type`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' ,
`weid`  int(11) NOT NULL ,
`openid`  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' ,
`tid`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`fee`  decimal(10,2) NOT NULL ,
`status`  tinyint(4) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`plid`)
)
ENGINE=MyISAM
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1
CHECKSUM=0
ROW_FORMAT=DYNAMIC
DELAY_KEY_WRITE=0
;


ALTER TABLE `ims_userapi_reply` ADD COLUMN `description`  varchar(300) NOT NULL DEFAULT '' AFTER `rid`;





alter table ims_fans add sex tinyint(4) default 0;
alter table ims_fans add age tinyint(4) default 0;


CREATE TABLE `ims_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `type` varchar(30) NOT NULL DEFAULT '',
  `pcate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '一级分类',
  `ccate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '二级分类',
  `title` varchar(100) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `thumb` varchar(100) NOT NULL DEFAULT '' COMMENT '缩略图',
  `source` varchar(50) NOT NULL DEFAULT '' COMMENT '来源',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_type` (`type`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `ims_album` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `content` varchar(1000) NOT NULL DEFAULT '',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `isview` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE `ims_album_photo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `albumid` int(10) unsigned NOT NULL,
  `title` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(1000) NOT NULL DEFAULT '',
  `attachment` varchar(100) NOT NULL DEFAULT '',
  `ispreview` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `displayorder` int(10) unsigned NOT NULL DEFAULT '0',
  `createtime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;



ALTER TABLE `ims_userapi_reply` ADD COLUMN `req_type`  varchar(10) default null;
ALTER TABLE `ims_userapi_reply` ADD COLUMN `resp_type`  varchar(10) default null;

#常用服务接入-添加字段 2013.12.25
ALTER TABLE `ims_userapi_reply` ADD COLUMN `description`  varchar(300) default null;

#添加微官网模块
INSERT INTO `ims_modules` (`name`,`title`,`version`,`ability`,`description`,`author`,`url`,`settings`,`subscribes`,`handles`,`isrulefields`,`isrulesingle`,`home`,`issystem`,`options`,`profile`,`site_menus`,`platform_menus`) VALUES ( 'site', '微官网', '1.0', '微官网', '微官网', 'ffcsteam', '', '0', '', '', '1', '0', '0', '1', '', '0', '', '');
#添加微官网模块回复表
CREATE TABLE IF NOT EXISTS `ims_site_reply`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rid` int(10) unsigned NOT NULL,
  `parentid` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `thumb` varchar(60) NOT NULL,
  `content` text NOT NULL,
  `url` varchar(255) NOT NULL,
  `createtime` int(10) DEFAULT NULL COMMENT '创建时间或者最后更新时间',
  `islocation` tinyint(2) DEFAULT '0' COMMENT '是否直接跳转来源连接',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


#添加微团购表
CREATE TABLE `ims_group_buying` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '团购编号',
  `weid` int(10) NOT NULL COMMENT '公众账号id',
  `key` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '关键词',
  `name` varchar(100) NOT NULL COMMENT '活动名称',
  `summary` varchar(255) NOT NULL COMMENT '团购简介',
  `starttime` int(10) NOT NULL COMMENT '活动开始时间',
  `endtime` int(10) NOT NULL COMMENT '活动结束时间',
  `email` varchar(50) NOT NULL COMMENT '通知邮箱',
  `email_password` varchar(32) NOT NULL COMMENT '邮箱密码',
  `smtp` varchar(30) NOT NULL COMMENT 'SMTP服务器',
  `consume_password` varchar(32) NOT NULL COMMENT '消费确认密码',
  `description` text NOT NULL COMMENT '活动描述及商品描述',
  `notice` varchar(255) DEFAULT NULL COMMENT '特别提醒',
  `end_theme` varchar(50) NOT NULL COMMENT '活动结束公告主题',
  `end_description` text COMMENT '活动结束说明',
  `phonenum` varchar(13) DEFAULT NULL COMMENT '团购电话',
  `address` varchar(120) DEFAULT NULL COMMENT '联系地址',
  `pay` varchar(50) DEFAULT NULL COMMENT '收款支付宝',
  `business_description` varchar(255) DEFAULT NULL COMMENT '商家介绍',
  `businessname` varchar(50) DEFAULT NULL COMMENT '商品名字',
  `oldprice` float NOT NULL COMMENT '商品原价',
  `per_maxnum` int(10) NOT NULL COMMENT '每人最多团购产品数',
  `newprice` float NOT NULL COMMENT '商品团购价',
  `totalnum` int(10) DEFAULT NULL COMMENT '商品总数',
  `least` int(10) NOT NULL COMMENT '最低参团人数',
  `virtualnum` int(10) DEFAULT NULL COMMENT '虚拟参团人数',
  `copyright` varchar(255) DEFAULT NULL COMMENT '版权设置',
  `start_img` varchar(255) DEFAULT NULL COMMENT '活动开始图片网址',
  `end_img` varchar(255) DEFAULT NULL COMMENT '活动结束图片网址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#文章表article—添加nid
ALTER TABLE `ims_article` ADD COLUMN `nid` int(10) DEFAULT NULL COMMENT '导入的图文回复的编号';

#添加支付类型表
CREATE TABLE `ims_pay_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '名称',
  `pay_name` varchar(100) NOT NULL COMMENT '支付名称',
  `pay_code` varchar(20) NOT NULL COMMENT '支付英文名',
  `pay_desc` text NOT NULL COMMENT '描述',
  `config` text NOT NULL COMMENT '配置',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `version` varchar(20) NOT NULL DEFAULT '1.0' COMMENT '版本',
  `weid` int(11) NOT NULL COMMENT '公众号id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

#添加支付配置字段
ALTER TABLE `ims_wechats` ADD COLUMN `payment`  varchar(500) NOT NULL DEFAULT '' AFTER `styleid`;

ALTER TABLE `ims_wechats` ADD COLUMN `shortcuts`  varchar(2000) NOT NULL DEFAULT '' AFTER `payment`;


#微团购表删除key字段，添加rid字段（规则id）
ALTER TABLE `ims_group_buying` ADD COLUMN `rid` int(10) DEFAULT NULL COMMENT '规则编号';
ALTER TABLE `ims_group_buying` DROP COLUMN `key`;
#添加团购订单表
CREATE TABLE `ims_group_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `gid` int(10) NOT NULL COMMENT '团购编号',
  `from_user` varchar(50) NOT NULL COMMENT '用户唯一身份ID',
  `phonenum` varchar(13) NOT NULL COMMENT '用户手机号',
  `name` varchar(20) NOT NULL COMMENT '用户名字',
  `number` int(10) NOT NULL COMMENT '购买数量',
  `address` varchar(50) DEFAULT NULL COMMENT '地址',
  `weid` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#菜单管理
#--- ims_menu_priv
CREATE TABLE `ims_menu_priv` (
  `groupid` int(10) unsigned NOT NULL DEFAULT '0',
  `menuid` int(10) NOT NULL,
  `create_time` varchar(10) NOT NULL DEFAULT '0',
  KEY `roleid` (`groupid`,`create_time`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8

#--- ims_menu
CREATE TABLE `ims_menu` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(40) NOT NULL DEFAULT '',
  `parentid` smallint(6) NOT NULL DEFAULT '0',
  `m` char(20) NOT NULL DEFAULT '' COMMENT '文件名',
  `a` char(20) NOT NULL DEFAULT '' COMMENT 'act参数',
  `d` char(20) NOT NULL DEFAULT '' COMMENT 'do参数',
  `data` char(100) NOT NULL DEFAULT '',
  `listorder` smallint(6) unsigned NOT NULL DEFAULT '0',
  `display` enum('1','0') NOT NULL DEFAULT '1',
  `lang` text,
  `ch_name` varchar(60) DEFAULT NULL COMMENT '菜单中文名',
  `icon` varchar(100) DEFAULT NULL COMMENT '一级菜单图标',
  `n` char(20) DEFAULT NULL COMMENT 'name参数',
  `plink` tinyint(1) DEFAULT NULL COMMENT '一级菜单是否为可点击链接',
  PRIMARY KEY (`id`),
  KEY `listorder` (`listorder`) USING BTREE,
  KEY `parentid` (`parentid`) USING BTREE,
  KEY `module` (`m`,`a`,`d`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=136 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ims_menu
-- ----------------------------
INSERT INTO `ims_menu` VALUES ('1', 'basic_service', '0', 'setting', 'menu', 'add', '', '1', '1', null, '基础服务', 'icon-comments', null, null);
INSERT INTO `ims_menu` VALUES ('2', 'keyword_rules', '1', 'rule', 'display', '', '', '11', '1', null, '关键字自动回复', null, null, null);
INSERT INTO `ims_menu` VALUES ('3', 'default_rules', '1', 'rule', 'system', '', '', '12', '1', null, '欢迎与默认回复设置', null, null, null);
INSERT INTO `ims_menu` VALUES ('4', 'common_rules', '0', 'index', 'module', 'switch', '', '7', '1', null, '微服务', 'icon-bookmark', 'userapi', '1');
INSERT INTO `ims_menu` VALUES ('5', 'statistics', '0', 'setting', 'module', 'pu', '', '8', '1', null, '微统计', 'icon-cogs', 'stat', null);
INSERT INTO `ims_menu` VALUES ('6', 'pu_statistics', '5', 'index', 'module', 'pu', '', '81', '1', null, '访问量统计', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('7', 'fans_statistics', '5', 'index', 'module', 'display', '', '82', '1', null, '粉丝统计', null, 'fans', null);
INSERT INTO `ims_menu` VALUES ('8', 'chat_statistics', '5', 'index', 'module', 'history', '', '83', '1', null, '聊天记录', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('9', 'rule_statistics', '5', 'index', 'module', 'rule', '', '84', '1', null, '规则使用率', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('10', 'keword_statistics', '5', 'index', 'module', 'keyword', '', '85', '1', null, '关键字使用率', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('12', 'account_list', '1', 'account', 'display', '', 'type=1', '13', '1', null, '公众号管理', '', null, null);
INSERT INTO `ims_menu` VALUES ('13', 'module_setting', '1', 'member', 'module', '', '', '15', '1', null, '模块功能设置', '', null, null);
INSERT INTO `ims_menu` VALUES ('14', 'customize_menus', '1', 'menu', '', '', '', '14', '1', null, '自定义菜单', '', null, null);
INSERT INTO `ims_menu` VALUES ('15', 'official_website', '0', 'setting', 'menu', 'add', '', '2', '1', null, '微官网', 'icon-eye-open', null, null);
INSERT INTO `ims_menu` VALUES ('16', 'style_setting', '15', 'site', 'style', '', '', '22', '1', null, '风格设置', null, null, null);
INSERT INTO `ims_menu` VALUES ('17', 'navigation_manage', '15', 'site', 'nav', '', '', '23', '1', null, '导航管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('18', 'sort_manage', '15', 'setting', 'category', '', '', '24', '1', null, '分类管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('19', 'article_manage', '15', 'site', 'article', 'display', '', '21', '1', null, '文章管理', '', null, null);
INSERT INTO `ims_menu` VALUES ('20', 'album_manage', '15', 'site', 'album', '', '', '25', '1', null, '相册管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('21', 'website_entry', '15', 'site', 'rule', '', '', '26', '1', null, '设置微官网入口', null, null, null);
INSERT INTO `ims_menu` VALUES ('22', 'member', '0', 'setting', 'menu', 'add', '', '3', '1', null, '微会员', 'icon-group', null, null);
INSERT INTO `ims_menu` VALUES ('32', 'activities', '0', 'setting', 'menu', 'add', '', '4', '1', null, '微活动', 'icon-coffee', null, null);
INSERT INTO `ims_menu` VALUES ('33', 'egg', '32', 'index', 'module', 'customlist', '', '41', '1', null, '砸蛋', null, 'egg', null);
INSERT INTO `ims_menu` VALUES ('34', 'lotery', '32', 'index', 'module', 'customlist', '', '42', '1', null, '大转盘', null, 'lotery', null);
INSERT INTO `ims_menu` VALUES ('35', 'scratch', '32', 'index', 'module', 'customlist', '', '43', '1', null, '刮刮卡', null, 'scratch', null);
INSERT INTO `ims_menu` VALUES ('36', 'vote', '32', 'index', 'module', 'customlist', '', '44', '1', null, '投票', null, 'vote', null);
INSERT INTO `ims_menu` VALUES ('37', 'wxwall', '32', 'index', 'module', 'customlist', '', '45', '1', null, '微信墙', null, 'wxwall', null);
INSERT INTO `ims_menu` VALUES ('38', 'system_user_manage', '0', 'setting', 'menu', 'add', '', '9', '1', null, '系统用户管理', 'icon-user', null, null);
INSERT INTO `ims_menu` VALUES ('39', 'user_manage', '38', 'member', 'display', '', '', '91', '1', null, '用户管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('40', 'user_group_manage', '38', 'member', 'group', '', '', '92', '1', null, '用户组管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('41', 'register', '38', 'setting', 'register', '', '', '93', '1', null, '注册设置', null, null, null);
INSERT INTO `ims_menu` VALUES ('42', 'system_manage', '0', 'setting', 'menu', 'add', '', '10', '1', null, '系统管理', 'icon-wrench', null, null);
INSERT INTO `ims_menu` VALUES ('43', 'module_manage', '42', 'setting', 'module', '', '', '101', '1', null, '模块管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('44', 'common_rules_manage', '42', 'index', 'module', 'switchmanage', '', '103', '1', null, '微服务管理', '', 'userapi', null);
INSERT INTO `ims_menu` VALUES ('45', 'other_setting', '42', 'setting', 'common', '', '', '104', '1', null, '其他设置', null, null, null);
INSERT INTO `ims_menu` VALUES ('46', 'personal_profile', '42', 'setting', 'profile', '', '', '105', '1', null, '个人资料', null, null, null);
INSERT INTO `ims_menu` VALUES ('47', 'update_cache', '42', 'setting', 'updatecache', '', '', '106', '1', null, '更新缓存', null, null, null);
INSERT INTO `ims_menu` VALUES ('48', 'menu_manage', '42', 'setting', 'menu', '', '', '107', '1', null, '菜单管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('49', 'sub_module_manage', '43', 'setting', 'module', '', '', '0', '1', null, '模块管理', null, null, null);
INSERT INTO `ims_menu` VALUES ('50', 'sub_new_module', '43', 'setting', 'designer', '', '', '0', '1', null, '设计新模块', null, null, null);
INSERT INTO `ims_menu` VALUES ('51', 'add_user_group', '40', 'member', 'group', 'post', '', '0', '1', null, '添加用户组', null, null, null);
INSERT INTO `ims_menu` VALUES ('52', 'member_group_list', '40', 'member', 'group', 'display', '', '0', '1', null, '用户组列表', null, null, null);
INSERT INTO `ims_menu` VALUES ('53', 'add_member', '39', 'member', 'create', '', '', '0', '1', null, '添加用户', null, null, null);
INSERT INTO `ims_menu` VALUES ('54', 'member_list', '39', 'member', 'display', '', '', '0', '1', null, '用户列表', null, null, null);
INSERT INTO `ims_menu` VALUES ('55', 'audit_member', '39', 'member', 'display', '', 'status=-1', '0', '1', null, '审核用户', null, null, null);
INSERT INTO `ims_menu` VALUES ('64', 'sub_install_style', '16', 'site', 'style', '', '', '0', '1', null, '已安装风格', null, null, null);
INSERT INTO `ims_menu` VALUES ('65', 'sub_uninstall_style', '16', 'site', 'style', 'uninstalltemplates', '', '0', '1', null, '未安装风格', null, null, null);
INSERT INTO `ims_menu` VALUES ('66', 'sub_wechat_account', '12', 'account', 'display', '', 'type=1', '0', '1', null, '微信公众号', null, null, null);
INSERT INTO `ims_menu` VALUES ('67', 'sub_yichat_account', '12', 'account', 'display', '', 'type=2', '0', '1', null, '易信公众号', null, null, null);
INSERT INTO `ims_menu` VALUES ('68', 'sub_exist_rules_reply', '8', 'index', 'module', 'history', 'searchtype=rule', '0', '1', null, '已有规则回复', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('69', 'sub_default_rules_reply', '8', 'index', 'module', 'history', 'searchtype=default', '0', '1', null, '默认规则回复', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('70', 'sub_triggered_rules', '9', 'index', 'module', 'rule', '', '0', '1', null, '已触发规则', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('71', 'sub_untriggered_rules', '9', 'index', 'module', 'rule', 'foo=miss', '0', '1', null, '未触发规则', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('72', 'sub_triggered_kewords', '10', 'index', 'module', 'keyword', '', '0', '1', null, '已触发关键字', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('73', 'sub_untriggered_keywords', '10', 'index', 'module', 'keyword', 'foo=miss', '0', '1', null, '未触发关键字', null, 'stat', null);
INSERT INTO `ims_menu` VALUES ('74', 'other_operation', '0', 'setting', 'menu', 'add', '', '120', '0', null, '其他操作', '', null, null);
INSERT INTO `ims_menu` VALUES ('75', 'navigation_other', '74', 'setting', 'menu', 'add', '', '0', '0', null, '导航菜单', '', null, null);
INSERT INTO `ims_menu` VALUES ('76', 'navigation_index', '75', 'index', 'frame', '', '', '0', '0', null, '导航首页按钮', '', null, null);
INSERT INTO `ims_menu` VALUES ('77', 'fans_list', '75', 'index', 'module', 'display', '', '0', '0', null, '粉丝列表', '', 'fans', null);
INSERT INTO `ims_menu` VALUES ('78', 'member_profile', '75', 'setting', 'profile', '', '', '0', '0', null, '用户个人资料', '', null, null);
INSERT INTO `ims_menu` VALUES ('79', 'account_list', '75', 'account', 'display', '', 'type=1', '0', '0', null, '公众号列表', '', null, null);
INSERT INTO `ims_menu` VALUES ('80', 'account_setting', '75', 'account', 'post', '', 'id=current', '0', '0', null, '设置公众号', '', null, null);
INSERT INTO `ims_menu` VALUES ('81', 'member_navigation', '74', 'setting', 'menu', 'add', '', '0', '0', null, '用户导航', '', null, null);
INSERT INTO `ims_menu` VALUES ('82', 'keyword_test', '81', 'test', '', '', '', '0', '0', null, '关键字测试', '', null, null);
INSERT INTO `ims_menu` VALUES ('83', 'member_help', '81', 'index', 'help', '', '', '0', '0', null, '帮助', '', null, null);
INSERT INTO `ims_menu` VALUES ('84', 'account_switch', '81', 'account', 'switch', '', '', '0', '0', null, '公众号切换', '', null, null);
INSERT INTO `ims_menu` VALUES ('85', 'account_menu', '81', 'setting', 'menu', 'add', '', '0', '0', null, '公众号菜单', '', null, null);
INSERT INTO `ims_menu` VALUES ('86', 'logout', '81', 'member', 'logout', '', '', '0', '0', null, '用户退出', '', null, null);
INSERT INTO `ims_menu` VALUES ('87', 'welcome_page', '81', 'index', 'welcome', '', '', '0', '0', null, '欢迎页面', '', null, null);
INSERT INTO `ims_menu` VALUES ('88', 'add_rule', '2', 'rule', 'post', '', '', '0', '0', null, '添加规则', '', null, null);
INSERT INTO `ims_menu` VALUES ('89', 'rule_usage_trend', '9', 'index', 'module', 'trend', '', '0', '0', null, '使用率走势', '', 'stat', null);
INSERT INTO `ims_menu` VALUES ('90', 'add_account', '66', 'account', 'post', '', '', '0', '0', null, '添加公众号', '', null, null);
INSERT INTO `ims_menu` VALUES ('91', 'account_delete', '66', 'account', 'delete', '', '', '0', '0', null, '公众号删除', '', null, null);
INSERT INTO `ims_menu` VALUES ('92', 'account_edit', '66', 'account', 'post', '', '', '0', '0', null, '公众号编辑', '', null, null);
INSERT INTO `ims_menu` VALUES ('93', 'account_switch2', '66', 'account', 'switch', '', '', '0', '0', null, '公众号切换', '', null, null);
INSERT INTO `ims_menu` VALUES ('94', 'btn_forbidden', '13', 'member', 'module', 'enable', '', '0', '0', null, '禁用', '', null, null);
INSERT INTO `ims_menu` VALUES ('95', 'btn_set', '13', 'member', 'module', 'setting', '', '0', '0', null, '设置', '', null, null);
INSERT INTO `ims_menu` VALUES ('96', 'site', '64', 'style', 'default', '', '', '0', '0', null, '设为默认', '', null, null);
INSERT INTO `ims_menu` VALUES ('97', 'style_design', '64', 'site', 'style', 'designer', '', '0', '0', null, '设计风格', '', null, null);
INSERT INTO `ims_menu` VALUES ('98', 'btn_install', '65', 'site', 'style', 'install', '', '0', '0', null, '安装', '', null, null);
INSERT INTO `ims_menu` VALUES ('99', 'btn_add_nav', '17', 'site', 'nav', 'post', '', '0', '0', null, '添加导航', '', null, null);
INSERT INTO `ims_menu` VALUES ('100', 'btn_nav_edit', '17', 'site', 'nav', 'post', '', '0', '0', null, '编辑', '', null, null);
INSERT INTO `ims_menu` VALUES ('101', 'btn_nav_delete', '17', 'site', 'nav', 'delete', '', '0', '0', null, '删除', '', null, null);
INSERT INTO `ims_menu` VALUES ('102', 'btn_add_category', '18', 'setting', 'category', 'post', '', '0', '0', null, '添加分类', '', null, null);
INSERT INTO `ims_menu` VALUES ('103', 'btn_delete_category', '18', 'setting', 'category', 'delete', '', '0', '0', null, '删除', '', null, null);
INSERT INTO `ims_menu` VALUES ('104', 'btn_edit_category', '18', 'setting', 'category', 'post', '', '0', '0', null, '编辑', '', null, null);
INSERT INTO `ims_menu` VALUES ('105', 'btn_add_article', '19', 'site', 'article', 'post', '', '0', '0', null, '添加文章', '', null, null);
INSERT INTO `ims_menu` VALUES ('106', 'btn_add_album', '20', 'site', 'album', 'create', '', '0', '0', null, '添加相册', '', null, null);
INSERT INTO `ims_menu` VALUES ('107', 'btn_edit_article', '19', 'site', 'article', 'post', '', '0', '0', null, '编辑', '', null, null);
INSERT INTO `ims_menu` VALUES ('108', 'btn_delete_article', '19', 'site', 'article', 'delete', '', '0', '0', null, '删除', '', null, null);
INSERT INTO `ims_menu` VALUES ('109', 'btn_add_album_photo', '20', 'site', 'album', 'photo', '', '0', '0', null, '上传照片', '', null, null);
INSERT INTO `ims_menu` VALUES ('110', 'btn_edit_album', '20', 'site', 'album', 'create', '', '0', '0', null, '编辑', '', null, null);
INSERT INTO `ims_menu` VALUES ('111', 'btn_delete_album', '20', 'site', 'album', 'delete', '', '0', '0', null, '删除', '', null, null);
INSERT INTO `ims_menu` VALUES ('112', 'btn_welcome_info', '2', 'rule', 'system', 'set', 'type=welcome', '0', '0', null, '设为欢迎信息', '', null, null);
INSERT INTO `ims_menu` VALUES ('113', 'btn_default_info', '2', 'rule', 'system', 'set', 'type=default', '0', '0', null, ' 设为默认回复', '', null, null);
INSERT INTO `ims_menu` VALUES ('114', 'btn_trend', '2', 'stat', 'trend', 'rule', '', '0', '0', null, '使用率走势', '', null, null);
INSERT INTO `ims_menu` VALUES ('115', 'btn_rule_delete', '2', 'rule', 'delete', '', 'type=rule', '0', '0', null, '删除', '', null, null);
INSERT INTO `ims_menu` VALUES ('116', 'btn_rule_edit', '2', 'rule', 'post', '', 'id=', '0', '0', null, '编辑', '', null, null);
INSERT INTO `ims_menu` VALUES ('117', 'btn_export_article', '19', 'site', 'news', 'all', '', '0', '0', null, '导入文章', '', null, null);
INSERT INTO `ims_menu` VALUES ('118', 'btn_style_delete', '64', 'site', 'style', 'uninstall', '', '0', '0', null, '删除', '', null, null);
INSERT INTO `ims_menu` VALUES ('119', 'group_buying', '0', 'groupbuying', 'display', '', '', '6', '1', null, '微团购', 'icon-gift', null, '1');
INSERT INTO `ims_menu` VALUES ('120', 'btn_groupbuying_add', '119', 'groupbuying', 'create', '', '', '61', '0', null, '添加团购活动', '', null, null);
INSERT INTO `ims_menu` VALUES ('121', 'market', '0', 'setting', 'menu', '', '', '5', '1', null, '微商城', 'icon-home', null, null);
INSERT INTO `ims_menu` VALUES ('122', 'order_manage', '121', 'index', 'module', 'order', '', '51', '1', null, '订单管理', '', 'shopping', null);
INSERT INTO `ims_menu` VALUES ('123', 'goods_manage', '121', 'index', 'module', 'goods', '', '52', '1', null, '商品管理', '', 'shopping', null);
INSERT INTO `ims_menu` VALUES ('124', 'goods_category', '121', 'index', 'module', 'category', '', '53', '1', null, '商品分类', '', 'shopping', null);
INSERT INTO `ims_menu` VALUES ('125', 'market_entry', '121', 'rule', 'entry', '', 'module=shopping', '54', '1', null, '设置微商城入口', '', null, null);
INSERT INTO `ims_menu` VALUES ('126', 'btn_set_privilage', '54', 'member', 'edit', '', '', '0', '0', null, '设置操作权限', '', null, null);
INSERT INTO `ims_menu` VALUES ('127', 'btn_set_member_status', '54', 'member', 'edit', 'deny', '', '0', '0', null, '启用/禁用用户', '', null, null);
INSERT INTO `ims_menu` VALUES ('128', 'btn_delete_member', '54', 'member', 'edit', 'delete', '', '0', '0', null, '删除用户', '', null, null);
INSERT INTO `ims_menu` VALUES ('129', 'btn_member_group_edit', '52', 'member', 'group', 'post', '', '0', '0', null, '编辑', '', null, null);
INSERT INTO `ims_menu` VALUES ('130', 'btn_set_member_group_privilege', '52', 'member', 'group', 'priv', '', '0', '0', null, '设置用户组权限', '', null, null);
INSERT INTO `ims_menu` VALUES ('131', 'payment_manage', '42', 'pay', 'payment', '', '', '102', '1', null, '支付管理', '', null, null);
INSERT INTO `ims_menu` VALUES ('133', 'edit_menu', '48', 'setting', 'menu', 'edit', '', '0', '0', null, '修改', '', '', '0');
INSERT INTO `ims_menu` VALUES ('132', 'add_menu', '48', 'setting', 'menu', 'add', '', '0', '0', null, '添加菜单', '', '', '0');
INSERT INTO `ims_menu` VALUES ('134', 'delete_menu', '48', 'setting', 'menu', 'delete', '', '0', '0', null, '删除', '', '', '0');
#添加微团购规则ID
ALTER TABLE `ims_group_buying` ADD COLUMN `rid`  int(10) NOT NULL  ;

#微活动 活动时间字段
ALTER TABLE `ims_egg_reply` ADD COLUMN `start_time`  int(10) DEFAULT NULL ;
ALTER TABLE `ims_egg_reply` ADD COLUMN `end_time`  int(10) DEFAULT NULL ;

ALTER TABLE `ims_lotery_reply` ADD COLUMN `start_time`  int(10) DEFAULT NULL ;
ALTER TABLE `ims_lotery_reply` ADD COLUMN `end_time`  int(10) DEFAULT NULL ;

ALTER TABLE `ims_scratch_reply` ADD COLUMN `start_time`  int(10) DEFAULT NULL ;
ALTER TABLE `ims_scratch_reply` ADD COLUMN `end_time`  int(10) DEFAULT NULL ;

ALTER TABLE `ims_wxwall_reply` ADD COLUMN `start_time`  int(10) DEFAULT NULL ;
ALTER TABLE `ims_wxwall_reply` ADD COLUMN `end_time`  int(10) DEFAULT NULL ;
#投票多选情况可多选几个选项
ALTER TABLE `ims_vote_reply` ADD COLUMN `maxitem`  int(4) NOT NULL COMMENT '最多选项，0表示默认选项，单选只能选1项，多选最多可以全部选择' AFTER `interval`;

#微活动列表链接配置 sql更新后请更新缓存 2014.1.17
update ims_modules set options = 'a:1:{i:0;a:3:{s:5:"title";s:12:"中奖名单";s:2:"do";s:9:"awardlist";s:5:"state";s:0:"";}}' where mid = 7;
update ims_modules set options = 'a:1:{i:0;a:3:{s:5:"title";s:12:"中奖名单";s:2:"do";s:9:"awardlist";s:5:"state";s:0:"";}}' where mid = 8;
update ims_modules set options = 'a:2:{i:0;a:3:{s:5:"title";s:18:"添加投票选项";s:2:"do";s:6:"option";s:5:"state";s:0:"";}i:1;a:3:{s:5:"title";s:18:"查看投票结果";s:2:"do";s:6:"result";s:5:"state";s:0:"";}}' where mid = 11;

#菜单添加新字段
ALTER TABLE `ims_menu` ADD COLUMN `ispublic`  int(10) DEFAULT 0 ;


#1月4日官方版升级

ALTER TABLE   ims_category  RENAME TO  ims_article_category;


CREATE TABLE `ims_album_reply` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`rid`  int(11) NOT NULL ,
`albumid`  int(11) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Fixed
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_article` DROP COLUMN `nid`;

CREATE TABLE `ims_article_category` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属帐号' ,
`nid`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '关联导航id' ,
`name`  varchar(50) NOT NULL COMMENT '分类名称' ,
`parentid`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类ID,0为第一级' ,
`displayorder`  tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序' ,
`enabled`  tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否开启' ,
`icon`  varchar(100) NOT NULL DEFAULT '' COMMENT '分类图标' ,
`description`  varchar(100) NOT NULL DEFAULT '' COMMENT '分类描述' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_article_reply` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`rid`  int(11) NOT NULL ,
`articleid`  int(11) NOT NULL ,
`isfill`  tinyint(1) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Fixed
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_attachment` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`uid`  int(10) UNSIGNED NOT NULL ,
`filename`  varchar(255) NOT NULL ,
`attachment`  varchar(255) NOT NULL ,
`type`  tinyint(3) UNSIGNED NOT NULL COMMENT '1为图片' ,
`createtime`  int(10) UNSIGNED NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_business` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`title`  varchar(50) NOT NULL DEFAULT '' ,
`thumb`  varchar(100) NOT NULL DEFAULT '' ,
`content`  varchar(1000) NOT NULL DEFAULT '' ,
`phone`  varchar(15) NOT NULL DEFAULT '' ,
`qq`  varchar(15) NOT NULL DEFAULT '' ,
`province`  varchar(50) NOT NULL DEFAULT '' ,
`city`  varchar(50) NOT NULL DEFAULT '' ,
`dist`  varchar(50) NOT NULL DEFAULT '' ,
`address`  varchar(500) NOT NULL DEFAULT '' ,
`lng`  varchar(10) NOT NULL DEFAULT '' ,
`lat`  varchar(10) NOT NULL DEFAULT '' ,
`industry1`  varchar(10) NOT NULL DEFAULT '' ,
`industry2`  varchar(10) NOT NULL DEFAULT '' ,
`createtime`  int(10) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_card` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`title`  varchar(100) NOT NULL DEFAULT '' ,
`color`  varchar(255) NOT NULL DEFAULT '' ,
`background`  varchar(255) NOT NULL DEFAULT '' ,
`logo`  varchar(255) NOT NULL DEFAULT '' ,
`format`  varchar(50) NOT NULL DEFAULT '' ,
`fields`  varchar(1000) NOT NULL DEFAULT '' ,
`snpos`  int(11) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_card_coupon` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`title`  varchar(50) NOT NULL ,
`starttime`  int(10) NOT NULL DEFAULT 0 ,
`endtime`  int(10) NOT NULL DEFAULT 0 ,
`type`  tinyint(1) NOT NULL ,
`pretotal`  int(11) NOT NULL DEFAULT 1 ,
`total`  int(11) NOT NULL DEFAULT 1 ,
`content`  text NOT NULL ,
`displayorder`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
`status`  tinyint(1) NOT NULL ,
`createtime`  int(10) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_card_log` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`from_user`  varchar(50) NOT NULL ,
`type`  tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1积分，2金额，3优惠券' ,
`content`  varchar(255) NOT NULL DEFAULT '' ,
`createtime`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_card_members` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`from_user`  varchar(50) NOT NULL DEFAULT '' ,
`cardsn`  varchar(20) NOT NULL DEFAULT '' ,
`credit1`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
`credit2`  double UNSIGNED NOT NULL DEFAULT 0 ,
`status`  tinyint(1) NOT NULL ,
`createtime`  int(10) UNSIGNED NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_card_members_coupon` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`couponid`  int(10) UNSIGNED NOT NULL ,
`from_user`  varchar(50) NOT NULL ,
`status`  tinyint(1) NOT NULL COMMENT '1为正常状态，2为已使用' ,
`receiver`  varchar(50) NOT NULL ,
`consumetime`  int(10) UNSIGNED NOT NULL ,
`createtime`  int(10) UNSIGNED NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_card_password` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`name`  varchar(50) NOT NULL DEFAULT '' ,
`password`  varchar(200) NOT NULL DEFAULT '' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_cover_reply` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`rid`  int(10) UNSIGNED NOT NULL ,
`module`  varchar(30) NOT NULL DEFAULT '' ,
`do`  varchar(30) NOT NULL DEFAULT '' ,
`title`  varchar(255) NOT NULL DEFAULT '' ,
`description`  varchar(255) NOT NULL DEFAULT '' ,
`thumb`  varchar(255) NOT NULL DEFAULT '' ,
`url`  varchar(255) NOT NULL DEFAULT '' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;


ALTER TABLE `ims_members_group` MODIFY COLUMN `modules`  varchar(5000) NOT NULL DEFAULT '' AFTER `name`;

ALTER TABLE `ims_members_group` ADD COLUMN `templates`  varchar(5000) NOT NULL DEFAULT '' AFTER `modules`;

ALTER TABLE `ims_members_group` ADD COLUMN `maxaccount`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0为不限制' AFTER `templates`;

CREATE TABLE `ims_members_permission` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`uid`  int(11) NOT NULL ,
`resourceid`  int(11) NOT NULL DEFAULT 0 ,
`type`  tinyint(1) NOT NULL DEFAULT 1 COMMENT '1为模块,2为模板' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Fixed
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_members_profile` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`uid`  int(10) UNSIGNED NOT NULL ,
`createtime`  int(10) UNSIGNED NOT NULL COMMENT '加入时间' ,
`realname`  varchar(10) NOT NULL DEFAULT '' COMMENT '真实姓名' ,
`nickname`  varchar(20) NOT NULL DEFAULT '' COMMENT '昵称' ,
`avatar`  varchar(100) NOT NULL DEFAULT '' COMMENT '头像' ,
`qq`  varchar(15) NOT NULL DEFAULT '' COMMENT 'QQ号' ,
`mobile`  varchar(11) NOT NULL DEFAULT '' COMMENT '手机号码' ,
`fakeid`  varchar(30) NOT NULL ,
`vip`  tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'VIP级别,0为普通会员' ,
`gender`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '性别(0:保密 1:男 2:女)' ,
`birthyear`  smallint(6) UNSIGNED NOT NULL DEFAULT 0 COMMENT '生日年' ,
`birthmonth`  tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '生日月' ,
`birthday`  tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '生日' ,
`constellation`  varchar(10) NOT NULL DEFAULT '' COMMENT '星座' ,
`zodiac`  varchar(5) NOT NULL DEFAULT '' COMMENT '生肖' ,
`telephone`  varchar(15) NOT NULL DEFAULT '' COMMENT '固定电话' ,
`idcard`  varchar(30) NOT NULL DEFAULT '' COMMENT '证件号码' ,
`studentid`  varchar(50) NOT NULL DEFAULT '' COMMENT '学号' ,
`grade`  varchar(10) NOT NULL DEFAULT '' COMMENT '班级' ,
`address`  varchar(255) NOT NULL DEFAULT '' COMMENT '邮寄地址' ,
`zipcode`  varchar(10) NOT NULL DEFAULT '' COMMENT '邮编' ,
`nationality`  varchar(30) NOT NULL DEFAULT '' COMMENT '国籍' ,
`resideprovince`  varchar(30) NOT NULL DEFAULT '' COMMENT '居住省份' ,
`residecity`  varchar(30) NOT NULL DEFAULT '' COMMENT '居住城市' ,
`residedist`  varchar(30) NOT NULL DEFAULT '' COMMENT '居住行政区/县' ,
`graduateschool`  varchar(50) NOT NULL DEFAULT '' COMMENT '毕业学校' ,
`company`  varchar(50) NOT NULL DEFAULT '' COMMENT '公司' ,
`education`  varchar(10) NOT NULL DEFAULT '' COMMENT '学历' ,
`occupation`  varchar(30) NOT NULL DEFAULT '' COMMENT '职业' ,
`position`  varchar(30) NOT NULL DEFAULT '' COMMENT '职位' ,
`revenue`  varchar(10) NOT NULL DEFAULT '' COMMENT '年收入' ,
`affectivestatus`  varchar(30) NOT NULL DEFAULT '' COMMENT '情感状态' ,
`lookingfor`  varchar(255) NOT NULL DEFAULT '' COMMENT ' 交友目的' ,
`bloodtype`  varchar(5) NOT NULL DEFAULT '' COMMENT '血型' ,
`height`  varchar(5) NOT NULL DEFAULT '' COMMENT '身高' ,
`weight`  varchar(5) NOT NULL DEFAULT '' COMMENT '体重' ,
`alipay`  varchar(30) NOT NULL DEFAULT '' COMMENT '支付宝帐号' ,
`msn`  varchar(30) NOT NULL DEFAULT '' COMMENT 'MSN' ,
`email`  varchar(50) NOT NULL DEFAULT '' COMMENT '电子邮箱' ,
`taobao`  varchar(30) NOT NULL DEFAULT '' COMMENT '阿里旺旺' ,
`site`  varchar(30) NOT NULL DEFAULT '' COMMENT '主页' ,
`bio`  text NOT NULL COMMENT '自我介绍' ,
`interest`  text NOT NULL COMMENT '兴趣爱好' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_modules` MODIFY COLUMN `issystem`  tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否是系统模块' AFTER `isrulefields`;

CREATE TABLE `ims_modules_bindings` (
`eid`  int(11) NOT NULL AUTO_INCREMENT ,
`module`  varchar(30) NOT NULL DEFAULT '' ,
`entry`  varchar(10) NOT NULL DEFAULT '' ,
`call`  varchar(50) NOT NULL DEFAULT '' ,
`title`  varchar(50) NOT NULL ,
`do`  varchar(30) NOT NULL ,
`state`  varchar(200) NOT NULL ,
`direct`  int(11) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`eid`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_paylog` ADD COLUMN `module`  varchar(50) NOT NULL DEFAULT '' AFTER `status`;

CREATE TABLE `ims_profile_fields` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`field`  varchar(255) NOT NULL ,
`available`  tinyint(1) NOT NULL DEFAULT 1 ,
`title`  varchar(255) NOT NULL ,
`description`  varchar(255) NOT NULL ,
`displayorder`  smallint(6) NOT NULL DEFAULT 0 ,
`required`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否必填' ,
`unchangeable`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否不可修改' ,
`showinregister`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否显示在注册表单' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;


CREATE TABLE `ims_scratchcard_award` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL COMMENT '规则ID' ,
`title`  varchar(50) NOT NULL COMMENT '奖品名称' ,
`total`  int(11) NOT NULL COMMENT '数量' ,
`probalilty`  varchar(5) NOT NULL COMMENT '概率单位%' ,
`description`  varchar(100) NOT NULL DEFAULT '' COMMENT '描述' ,
`inkind`  tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否是实物' ,
`activation_code`  varchar(2000) NOT NULL COMMENT '激活码' ,
`activation_url`  varchar(200) NOT NULL COMMENT '激活地址' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_scratchcard_reply` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL COMMENT '规则ID' ,
`picture`  varchar(100) NOT NULL COMMENT '活动图片' ,
`description`  varchar(100) NOT NULL COMMENT '活动描述' ,
`rule`  varchar(1000) NOT NULL COMMENT '规则' ,
`periodlottery`  smallint(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '0为无周期' ,
`maxlottery`  tinyint(3) UNSIGNED NOT NULL COMMENT '最大抽奖数' ,
`hitcredit`  int(11) NOT NULL COMMENT '中奖奖励积分' ,
`misscredit`  int(11) NOT NULL COMMENT '未中奖奖励积分' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE `ims_scratchcard_winner` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL COMMENT '规则ID' ,
`aid`  int(10) UNSIGNED NOT NULL COMMENT '奖品ID' ,
`award`  varchar(100) NOT NULL DEFAULT '' COMMENT '奖品名称' ,
`description`  varchar(500) NOT NULL DEFAULT '' COMMENT '中奖信息描述' ,
`from_user`  varchar(50) NOT NULL COMMENT '用户唯一身份ID' ,
`status`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '0未领奖，1不需要领奖，2已领奖' ,
`createtime`  int(10) UNSIGNED NOT NULL COMMENT '获奖日期' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_site_nav` ADD COLUMN `module`  varchar(50) NOT NULL DEFAULT '' AFTER `weid`;

ALTER TABLE `ims_site_nav` MODIFY COLUMN `displayorder`  smallint(5) UNSIGNED NOT NULL COMMENT '排序' AFTER `module`;

ALTER TABLE `ims_site_nav` MODIFY COLUMN `status`  tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '0为隐藏，1为显示' AFTER `css`;

ALTER TABLE `ims_site_nav` DROP COLUMN `issystem`;

ALTER TABLE `ims_site_styles` MODIFY COLUMN `weid`  int(10) UNSIGNED NOT NULL DEFAULT 0 AFTER `id`;

ALTER TABLE `ims_site_styles` MODIFY COLUMN `templateid`  int(10) UNSIGNED NOT NULL COMMENT '风格ID' AFTER `weid`;

ALTER TABLE `ims_site_styles` MODIFY COLUMN `content`  text NOT NULL COMMENT '变量值' AFTER `variable`;


ALTER TABLE `ims_wechats` MODIFY COLUMN `default_message`  varchar(500) NOT NULL DEFAULT '' COMMENT '其他消息类型默认处理器' AFTER `default`;

ALTER TABLE `ims_wechats` MODIFY COLUMN `default_period`  tinyint(3) UNSIGNED NOT NULL COMMENT '回复周期时间' AFTER `default_message`;

ALTER TABLE `ims_wechats` MODIFY COLUMN `payment`  varchar(1000) NOT NULL DEFAULT '' AFTER `styleid`;

ALTER TABLE `ims_wechats_modules` MODIFY COLUMN `settings`  varchar(1000) NOT NULL DEFAULT '' AFTER `enabled`;

ALTER TABLE `ims_wechats_modules` DROP COLUMN `displayorder`;

ALTER TABLE `ims_wxwall_members` MODIFY COLUMN `rid`  int(10) UNSIGNED NOT NULL COMMENT '用户当前所在的微信墙话题' AFTER `from_user`;

#活动墙缩略图 现网已添加
ALTER TABLE `ims_wxwall_message` ADD COLUMN `thumb` varchar(1000) DEFAULT NULL;

#更新活动入口
#update ims_menu set m='site' where m='index' and a='module' and d is not null and n is not null;
#更新活动入口为原有的规则列表方式 by fangyq 
update ims_menu set m='rule',a='display',`data`=concat('activity=1&module=',name) where `name` in ('egg','lotery','scratch','vote','wxwall','album');

#微相册目录
INSERT INTO `ims_menu` VALUES ('', '', 0, 'setting', 'menu', 'add', '', 11, '1', NULL, '微相册', 'icon-smile', '', 0, 1);
#微相册目录记录更新后，请取其ID，变成下列记录中的'parentid'
INSERT INTO `ims_menu` VALUES ('', '', 'parentid', 'rule', 'cover', '', 'eid=48', 0, '1', NULL, '设置微相册入口', '', '', 0, 1);
INSERT INTO `ims_menu` VALUES ('', 'album', 'parentid', 'rule', 'display', 'customlist', 'activity=1&module=album', 0, '1', NULL, '相册入口列表', '', 'album', 0, 1);
update `ims_menu` set parentid='parentid' where ch_name = '相册管理';

#渠道商关系表
CREATE TABLE `ims_members_channel` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `parentid` int(10) DEFAULT NULL,
  `childid` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8

#微相册 album表 添加字段
ALTER TABLE `ims_album` ADD COLUMN `type` tinyint(1) DEFAULT NULL;

#微喜帖新增表
CREATE TABLE IF NOT EXISTS `ims_lxy_marry_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(11) unsigned DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `art_pic` varchar(255) DEFAULT NULL,
  `donghua_pic` varchar(255) DEFAULT NULL,
  `suolue_pic` varchar(255) DEFAULT NULL COMMENT '缩略图',
  `xl_name` varchar(255) DEFAULT NULL,
  `xn_name` varchar(255) DEFAULT NULL,
  `is_front` varchar(255) DEFAULT '1' COMMENT '1:新郎名字在前 2:新娘名字在前',
  `tel` varchar(25) DEFAULT NULL,
  `hy_time` datetime DEFAULT NULL COMMENT '婚宴日期',
  `dist` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `hy_addr` varchar(255) DEFAULT NULL COMMENT '婚宴地址',
  `jw_addr` varchar(255) DEFAULT NULL COMMENT '经纬地址',
  `lng` varchar(12) DEFAULT '116.403694',
  `lat` varchar(12) DEFAULT '39.916042',
  `video` varchar(255) DEFAULT '/res/weiXiTie/mp4.mp4',
  `music` varchar(255) DEFAULT '/res/weiXiTie/youGotMe.mp3',
  `hs_pic` text COMMENT '婚纱图片',
  `pwd` varchar(255) DEFAULT NULL,
  `word` varchar(500) DEFAULT NULL,
  `erweima_pic` varchar(255) DEFAULT NULL COMMENT '二维码图片',
  `copyright` varchar(60) DEFAULT NULL,
  `createtime` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='微喜帖设置' AUTO_INCREMENT=1 ;

#系统帮助 文档表
CREATE TABLE `ims_systemhelp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL,
  `type` varchar(30) NOT NULL DEFAULT '',
  `pcate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '一级分类',
  `ccate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '二级分类',
  `title` varchar(100) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `thumb` varchar(100) NOT NULL DEFAULT '' COMMENT '缩略图',
  `source` varchar(50) NOT NULL DEFAULT '' COMMENT '来源',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_type` (`type`)
) ENGINE=MyISAM AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

#系统帮助 文档类型表
CREATE TABLE `ims_systemhelp_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID,0为第一级',
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否开启',
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;


### 2014-3-14 fangyq 商业版更新

ALTER TABLE `ims_album` ADD COLUMN `type`  tinyint(1) NOT NULL AFTER `createtime`;

ALTER TABLE `ims_article` ADD COLUMN `iscommend`  tinyint(1) NOT NULL DEFAULT 0 AFTER `weid`;

ALTER TABLE `ims_article` ADD COLUMN `ishot`  tinyint(1) UNSIGNED NOT NULL DEFAULT 0 AFTER `iscommend`;

ALTER TABLE `ims_article` ADD COLUMN `description`  varchar(1000) NOT NULL DEFAULT '' AFTER `title`;

CREATE INDEX `idx_lat_lng` ON `ims_business`(`lng`, `lat`) USING BTREE ;

CREATE TABLE IF NOT EXISTS `ims_heka_list` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(11) NULL DEFAULT NULL ,
`rid`  int(10) UNSIGNED NOT NULL COMMENT '规则ID' ,
`title`  varchar(50) NULL DEFAULT NULL ,
`card`  varchar(20) NOT NULL COMMENT '活动图片' ,
`author`  varchar(20) NULL DEFAULT NULL ,
`content`  varchar(500) NOT NULL COMMENT '活动描述' ,
`cardName`  varchar(50) NULL DEFAULT NULL ,
`from_user`  varchar(50) NULL DEFAULT NULL ,
`hits`  int(11) NULL DEFAULT NULL ,
`share`  int(11) NULL DEFAULT NULL ,
`create_time`  int(10) NOT NULL COMMENT '规则' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE IF NOT EXISTS `ims_heka_reply` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL COMMENT '规则ID' ,
`title`  varchar(50) NULL DEFAULT NULL ,
`picture`  varchar(100) NOT NULL COMMENT '活动图片' ,
`description`  varchar(200) NOT NULL COMMENT '活动描述' ,
`create_time`  int(10) NOT NULL COMMENT '规则' ,
PRIMARY KEY (`id`),
INDEX `idx_rid` (`rid`) USING BTREE 
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE IF NOT EXISTS `ims_lxy_marry_info` (
`id`  bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  bigint(20) UNSIGNED NULL DEFAULT NULL ,
`fromuser`  varchar(32) NULL DEFAULT NULL ,
`sid`  bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT 'micro_xitie_set id' ,
`name`  varchar(25) NULL DEFAULT NULL ,
`tel`  varchar(25) NULL DEFAULT NULL ,
`rs`  smallint(1) NULL DEFAULT NULL COMMENT '赴宴人数' ,
`zhufu`  varchar(255) NULL DEFAULT NULL COMMENT '收到祝福' ,
`ctime`  datetime NULL DEFAULT NULL ,
`type`  tinyint(1) NULL DEFAULT 1 COMMENT '1:赴宴 2：祝福' ,
PRIMARY KEY (`id`),
INDEX `idx_sid_openid` (`sid`, `fromuser`) USING BTREE ,
INDEX `idx_sid` (`sid`) USING BTREE 
)
ENGINE=MyISAM
COMMENT='微喜帖信息列表'
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_lxy_marry_list` (
`id`  int(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(11) UNSIGNED NULL DEFAULT NULL ,
`title`  varchar(50) NULL DEFAULT NULL ,
`art_pic`  varchar(255) NULL DEFAULT NULL ,
`donghua_pic`  varchar(255) NULL DEFAULT NULL ,
`suolue_pic`  varchar(255) NULL DEFAULT NULL COMMENT '缩略图' ,
`xl_name`  varchar(255) NULL DEFAULT NULL ,
`xn_name`  varchar(255) NULL DEFAULT NULL ,
`is_front`  varchar(255) NULL DEFAULT '1' COMMENT '1:新郎名字在前 2:新娘名字在前' ,
`tel`  varchar(25) NULL DEFAULT NULL ,
`hy_time`  datetime NULL DEFAULT NULL COMMENT '婚宴日期' ,
`dist`  varchar(20) NULL DEFAULT NULL ,
`city`  varchar(20) NULL DEFAULT NULL ,
`province`  varchar(20) NULL DEFAULT NULL ,
`hy_addr`  varchar(255) NULL DEFAULT NULL COMMENT '婚宴地址' ,
`jw_addr`  varchar(255) NULL DEFAULT NULL COMMENT '经纬地址' ,
`lng`  varchar(12) NULL DEFAULT '116.403694' ,
`lat`  varchar(12) NULL DEFAULT '39.916042' ,
`video`  varchar(255) NULL DEFAULT '/res/weiXiTie/mp4.mp4' ,
`music`  varchar(255) NULL DEFAULT '/res/weiXiTie/youGotMe.mp3' ,
`hs_pic`  text NULL DEFAULT NULL COMMENT '婚纱图片' ,
`pwd`  varchar(255) NULL DEFAULT NULL ,
`word`  varchar(500) NULL DEFAULT NULL ,
`erweima_pic`  varchar(255) NULL DEFAULT NULL COMMENT '二维码图片' ,
`copyright`  varchar(60) NULL DEFAULT NULL ,
`createtime`  int(11) UNSIGNED NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
COMMENT='微喜帖设置'
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_lxy_marry_reply` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
`marryid`  int(10) UNSIGNED NOT NULL ,
PRIMARY KEY (`id`),
INDEX `idx_rid` (`rid`) USING BTREE 
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Fixed
DELAY_KEY_WRITE=0
;

CREATE INDEX `idx_uid` ON `ims_members_permission`(`uid`) USING BTREE ;

ALTER TABLE `ims_modules` DROP COLUMN `isrulesingle`;

ALTER TABLE `ims_modules` DROP COLUMN `home`;

ALTER TABLE `ims_modules` DROP COLUMN `options`;

ALTER TABLE `ims_modules` DROP COLUMN `profile`;

ALTER TABLE `ims_modules` DROP COLUMN `site_menus`;

ALTER TABLE `ims_modules` DROP COLUMN `platform_menus`;

ALTER TABLE `ims_research` ADD COLUMN `content`  text NOT NULL AFTER `description`;

ALTER TABLE `ims_research` ADD COLUMN `endtime`  int(10) NOT NULL DEFAULT 0 AFTER `status`;

ALTER TABLE `ims_research` ADD COLUMN `noticeemail`  varchar(50) NOT NULL DEFAULT '' AFTER `endtime`;

ALTER TABLE `ims_research` ADD COLUMN `pretotal`  int(10) UNSIGNED NOT NULL DEFAULT 1 AFTER `noticeemail`;

CREATE INDEX `idx_content` ON `ims_rule_keyword`(`content`) USING BTREE ;

CREATE TABLE  IF NOT EXISTS `ims_shake_member` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL ,
`openid`  varchar(50) NOT NULL ,
`shakecount`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
`remark`  varchar(500) NOT NULL DEFAULT '' ,
`lastupdate`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
`createtime`  int(10) UNSIGNED NOT NULL ,
PRIMARY KEY (`id`),
INDEX `idx_openid_replyid` (`openid`, `rid`) USING BTREE ,
INDEX `idx_replyid` (`rid`) USING BTREE ,
INDEX `idx_shakecount` (`rid`, `shakecount`) USING BTREE 
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_shake_reply` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL ,
`cover`  varchar(255) NOT NULL DEFAULT '' ,
`background`  varchar(255) NOT NULL DEFAULT '' ,
`logo`  varchar(255) NOT NULL DEFAULT '' ,
`description`  varchar(1000) NOT NULL DEFAULT '' ,
`rule`  text NOT NULL ,
`speed`  int(10) UNSIGNED NOT NULL DEFAULT 3000 ,
`interval`  int(10) UNSIGNED NOT NULL DEFAULT 100 ,
`countdown`  tinyint(1) UNSIGNED NOT NULL DEFAULT 10 ,
`maxshake`  int(10) UNSIGNED NOT NULL DEFAULT 100 ,
`maxwinner`  int(10) UNSIGNED NOT NULL DEFAULT 1 ,
`status`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '0为未开始，1为进行中，2为已结束' ,
PRIMARY KEY (`id`),
INDEX `idx_rid` (`rid`) USING BTREE 
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_site_nav` ADD COLUMN `description`  varchar(1000) NOT NULL DEFAULT '' AFTER `name`;

CREATE TABLE  IF NOT EXISTS `ims_site_slide` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`title`  varchar(255) NOT NULL ,
`url`  varchar(255) NOT NULL DEFAULT '' ,
`thumb`  varchar(255) NOT NULL DEFAULT '' ,
`displayorder`  tinyint(4) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`id`),
INDEX `weid` (`weid`) USING BTREE 
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_userapi_cache` MODIFY COLUMN `content`  text NOT NULL COMMENT '回复内容' AFTER `key`;

ALTER TABLE `ims_wechats` ADD COLUMN `payment`  varchar(1000) NOT NULL DEFAULT '' AFTER `styleid`;

ALTER TABLE `ims_wechats` ADD COLUMN `shortcuts`  varchar(2000) NOT NULL DEFAULT '' AFTER `payment`;

ALTER TABLE `ims_wechats` ADD COLUMN `quickmenu`  varchar(2000) NOT NULL DEFAULT '' AFTER `shortcuts`;

ALTER TABLE `ims_wechats_modules` DROP COLUMN `displayorder`;

CREATE TABLE  IF NOT EXISTS `ims_weicar_brand` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`weid`  int(11) NULL DEFAULT NULL ,
`listorder`  int(11) NOT NULL ,
`title`  varchar(50) NOT NULL ,
`officialweb`  varchar(100) NOT NULL ,
`logo`  varchar(200) NOT NULL ,
`description`  text NOT NULL ,
`createtime`  int(10) NOT NULL ,
`status`  tinyint(4) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_category` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) NOT NULL DEFAULT 0 ,
`title`  varchar(50) NOT NULL COMMENT '分类名称' ,
`listorder`  tinyint(3) NOT NULL DEFAULT 0 COMMENT '排序' ,
`enabled`  tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否开启' ,
`icon`  varchar(100) NOT NULL DEFAULT '' COMMENT '分类图标' ,
`type`  tinyint(4) NOT NULL ,
`param`  int(11) NOT NULL ,
`jumpurl`  varchar(500) NOT NULL ,
`description`  varchar(100) NOT NULL DEFAULT '' COMMENT '分类描述' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_flash` (
`rid`  int(11) NOT NULL ,
`thumbs`  text NOT NULL ,
UNIQUE INDEX `rid` (`rid`) USING BTREE 
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_guan` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`weid`  int(11) NOT NULL ,
`from_user`  varchar(50) NOT NULL ,
`car_model`  varchar(50) NOT NULL ,
`car_series`  varchar(50) NOT NULL ,
`car_type`  varchar(50) NOT NULL ,
`car_no`  varchar(50) NOT NULL ,
`car_userName`  varchar(50) NOT NULL ,
`car_startTime`  varchar(50) NOT NULL ,
`car_photo`  varchar(100) NOT NULL ,
`car_insurance_lastDate`  varchar(20) NOT NULL ,
`car_insurance_lastCost`  int(11) NOT NULL ,
`car_care_mileage`  int(11) NOT NULL ,
`car_care_lastDate`  varchar(20) NOT NULL ,
`car_care_lastCost`  varchar(20) NOT NULL ,
`createtime`  int(10) NOT NULL ,
`isshow`  tinyint(1) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_kefu` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`weid`  int(11) NOT NULL ,
`listorder`  int(11) NOT NULL ,
`kefuname`  varchar(50) NOT NULL ,
`headthumb`  varchar(200) NOT NULL ,
`kefutel`  varchar(20) NOT NULL ,
`pre_sales`  tinyint(2) NOT NULL ,
`aft_sales`  tinyint(2) NOT NULL ,
`description`  text NOT NULL ,
`createtime`  int(10) NOT NULL ,
`status`  tinyint(4) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_message_list` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`weid`  int(11) NOT NULL ,
`nickname`  varchar(30) NULL DEFAULT NULL ,
`info`  varchar(200) NULL DEFAULT NULL ,
`fid`  int(11) NULL DEFAULT 0 ,
`isshow`  tinyint(1) NULL DEFAULT 0 ,
`create_time`  int(11) NULL DEFAULT NULL ,
`from_user`  varchar(50) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_message_set` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`title`  varchar(50) NOT NULL ,
`thumb`  varchar(200) NOT NULL ,
`status`  int(1) NOT NULL ,
`isshow`  tinyint(1) NOT NULL ,
`create_time`  int(10) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_relate` (
`rid`  int(11) NOT NULL ,
`aboutid`  int(11) NULL DEFAULT NULL ,
`xinshangid`  int(11) NULL DEFAULT NULL ,
`zixunid`  int(11) NULL DEFAULT NULL ,
`youhuiid`  int(11) NULL DEFAULT NULL ,
`ershouid`  int(11) NULL DEFAULT NULL ,
`xiangceid`  int(11) NOT NULL ,
`newsid`  int(11) NOT NULL ,
`yuyueid`  int(11) NOT NULL ,
`cardid`  int(11) NOT NULL ,
`hometel`  varchar(30) NOT NULL ,
`logo`  varchar(100) NULL DEFAULT NULL ,
PRIMARY KEY (`rid`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_reply` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`rid`  int(10) UNSIGNED NOT NULL ,
`title`  varchar(50) NOT NULL ,
`description`  varchar(255) NOT NULL ,
`thumb`  varchar(60) NOT NULL ,
`url`  varchar(200) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_series` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`weid`  int(11) NOT NULL ,
`bid`  int(11) NOT NULL ,
`listorder`  int(11) NOT NULL ,
`title`  varchar(50) NOT NULL ,
`subtitle`  varchar(20) NOT NULL ,
`thumb`  varchar(200) NOT NULL ,
`description`  text NOT NULL ,
`createtime`  int(10) NOT NULL ,
`status`  tinyint(4) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_set` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`title`  varchar(50) NOT NULL ,
`wecar_logo`  varchar(200) NOT NULL ,
`guanhuai_thumb`  varchar(200) NOT NULL ,
`status`  int(1) NOT NULL ,
`isshow`  tinyint(1) NOT NULL ,
`tools`  varchar(50) NOT NULL ,
`create_time`  int(10) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_type` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`listorder`  int(11) NOT NULL ,
`title`  varchar(50) NOT NULL ,
`weid`  int(11) NOT NULL ,
`bid`  int(11) NOT NULL ,
`sid`  int(11) NOT NULL ,
`pyear`  varchar(10) NOT NULL ,
`price1`  varchar(50) NOT NULL ,
`price2`  varchar(50) NOT NULL ,
`thumb`  varchar(100) NOT NULL ,
`thumbArr`  varchar(500) NOT NULL ,
`output`  varchar(10) NOT NULL ,
`gearnum`  varchar(10) NOT NULL ,
`gear_box`  varchar(30) NOT NULL ,
`xiangceid`  int(11) NOT NULL ,
`createtime`  int(10) NOT NULL ,
`status`  tinyint(4) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_yuyue_list` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL ,
`yytype`  tinyint(11) NOT NULL ,
`from_user`  varchar(50) NOT NULL DEFAULT '' ,
`contact`  varchar(50) NOT NULL ,
`dateline`  varchar(50) NOT NULL ,
`timepart`  varchar(50) NOT NULL ,
`remark`  varchar(50) NOT NULL ,
`contacttel`  varchar(50) NOT NULL ,
`fieldsigle`  varchar(500) NOT NULL ,
`fielddownload`  varchar(500) NOT NULL ,
`ip`  varchar(50) NOT NULL ,
`createtime`  int(10) NOT NULL ,
`status`  tinyint(4) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

CREATE TABLE  IF NOT EXISTS `ims_weicar_yuyue_set` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`weid`  int(10) UNSIGNED NOT NULL DEFAULT 0 ,
`title`  varchar(50) NOT NULL ,
`yytype`  tinyint(2) NOT NULL ,
`description`  varchar(500) NOT NULL ,
`thumb`  varchar(60) NOT NULL ,
`start_time`  int(10) UNSIGNED NOT NULL ,
`end_time`  int(10) UNSIGNED NOT NULL ,
`address`  varchar(200) NOT NULL ,
`mobile`  varchar(30) NOT NULL ,
`location_x`  float NOT NULL ,
`location_y`  float NOT NULL ,
`topbanner`  varchar(150) NULL DEFAULT NULL ,
`typename1`  varchar(20) NULL DEFAULT NULL ,
`typename2`  varchar(20) NULL DEFAULT NULL ,
`typename3`  varchar(20) NULL DEFAULT NULL ,
`name_show`  tinyint(4) NULL DEFAULT NULL ,
`tel_show`  tinyint(4) NULL DEFAULT NULL ,
`date_show`  tinyint(4) NULL DEFAULT NULL ,
`time_show`  tinyint(4) NULL DEFAULT NULL ,
`trtxt`  text NOT NULL ,
`strtxt`  text NOT NULL ,
`txt1`  varchar(20) NULL DEFAULT NULL ,
`txt2`  varchar(20) NULL DEFAULT NULL ,
`txt3`  varchar(20) NULL DEFAULT NULL ,
`txt4`  varchar(20) NULL DEFAULT NULL ,
`txt5`  varchar(20) NULL DEFAULT NULL ,
`txt6`  varchar(20) NOT NULL ,
`txt7`  varchar(20) NOT NULL ,
`txt8`  varchar(20) NOT NULL ,
`txt9`  varchar(20) NOT NULL ,
`value1`  varchar(50) NULL DEFAULT NULL ,
`value2`  varchar(50) NULL DEFAULT NULL ,
`value3`  varchar(50) NULL DEFAULT NULL ,
`value4`  varchar(50) NULL DEFAULT NULL ,
`value5`  varchar(50) NULL DEFAULT NULL ,
`value6`  varchar(50) NOT NULL ,
`value7`  varchar(50) NOT NULL ,
`value8`  varchar(50) NOT NULL ,
`value9`  varchar(50) NOT NULL ,
`select1`  varchar(20) NULL DEFAULT NULL ,
`select2`  varchar(20) NULL DEFAULT NULL ,
`select3`  varchar(20) NULL DEFAULT NULL ,
`select4`  varchar(20) NULL DEFAULT NULL ,
`select5`  varchar(20) NULL DEFAULT NULL ,
`svalue1`  varchar(200) NULL DEFAULT NULL ,
`svalue2`  varchar(200) NULL DEFAULT NULL ,
`svalue3`  varchar(200) NULL DEFAULT NULL ,
`svalue4`  varchar(200) NULL DEFAULT NULL ,
`svalue5`  varchar(200) NULL DEFAULT NULL ,
`datename`  varchar(20) NULL DEFAULT NULL ,
`copyright`  varchar(20) NOT NULL ,
`isshow`  tinyint(3) UNSIGNED NOT NULL DEFAULT 1 ,
`shareurl`  varchar(300) NOT NULL COMMENT '分享地址' ,
PRIMARY KEY (`id`)
)
ENGINE=MyISAM
CHECKSUM=0
ROW_FORMAT=Dynamic
DELAY_KEY_WRITE=0
;

ALTER TABLE `ims_wxwall_reply` ADD COLUMN `logo`  varchar(255) NOT NULL DEFAULT '' AFTER `isshow`;

ALTER TABLE `ims_wxwall_reply` ADD COLUMN `background`  varchar(255) NOT NULL DEFAULT '' AFTER `logo`;

