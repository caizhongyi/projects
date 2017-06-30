
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
  `ch_name` varchar(60) DEFAULT NULL COMMENT '菜单中文名',
  `icon` varchar(100) DEFAULT NULL COMMENT '一级菜单图标',
  `n` char(20) DEFAULT NULL COMMENT 'name参数',
  `plink` tinyint(1) DEFAULT NULL COMMENT '一级菜单是否为可点击链接',
  `ispublic` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listorder` (`listorder`) USING BTREE,
  KEY `parentid` (`parentid`) USING BTREE,
  KEY `module` (`m`,`a`,`d`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=193 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ims_menu
-- ----------------------------
INSERT INTO `ims_menu` VALUES ('1', 'basic_service', '0', 'setting', 'menu', 'add', '', '2', '1', '基础服务', 'icon-bell', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('2', 'keyword_rules', '180', 'rule', 'display', '', '', '7', '0', '自动回复操作', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('3', 'default_rules', '180', 'rule', 'system', '', '', '5', '1', '欢迎与默认回复设置', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('4', 'common_rules', '0', 'site', 'module', 'switch', '', '9', '1', '微服务', 'icon-bookmark', 'userapi', '1', '1');
INSERT INTO `ims_menu` VALUES ('5', 'statistics', '0', 'setting', 'module', 'pu', '', '10', '1', '微统计', 'icon-cogs', 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('6', 'pu_statistics', '5', 'site', 'module', 'pu', '', '1', '1', '访问量统计', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('7', 'fans_statistics', '5', 'site', 'module', 'display', '', '2', '1', '粉丝统计', null, 'fans', null, '1');
INSERT INTO `ims_menu` VALUES ('8', 'chat_statistics', '5', 'site', 'module', 'history', '', '3', '1', '聊天记录', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('9', 'rule_statistics', '5', 'site', 'module', 'rule', '', '4', '1', '规则使用率', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('10', 'keword_statistics', '5', 'site', 'module', 'keyword', '', '5', '1', '关键字使用率', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('12', 'account_list', '1', 'account', 'display', '', 'type=1', '1', '1', '公众号管理', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('13', 'module_setting', '1', 'member', 'module', '', '', '2', '1', '模块功能设置', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('14', 'customize_menus', '180', 'menu', '', '', '', '6', '1', '自定义菜单', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('15', 'official_website', '0', 'setting', 'menu', 'add', '', '3', '1', '微官网', 'icon-eye-open', null, null, '1');
INSERT INTO `ims_menu` VALUES ('16', 'style_setting', '15', 'site', 'style', '', '', '3', '1', '风格设置', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('17', 'navigation_manage', '15', 'site', 'nav', '', '', '4', '1', '导航管理', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('18', 'sort_manage', '15', 'site', 'entry', '', 'eid=23', '2', '1', '分类管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('19', 'article_manage', '15', 'site', 'entry', '', 'eid=22', '1', '1', '文章管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('20', 'album_manage', '169', 'site', 'entry', '', 'eid=19', '0', '1', '相册管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('21', 'website_entry', '15', 'site', 'cover', '', '', '5', '1', '设置微官网入口', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('22', 'member', '0', 'setting', 'menu', 'add', '', '4', '1', '微会员', 'icon-group', null, null, '1');
INSERT INTO `ims_menu` VALUES ('24', 'right_manage', '22', 'micromember', 'cardright', '', '', '32', '0', '特权管理', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('25', 'card_setting', '22', 'micromember', 'setcard', '', '', '33', '0', '会员卡设置0', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('26', 'member_manage', '22', 'micromember', 'member', '', '', '34', '0', '会员管理0', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('27', 'point', '22', 'micromember', 'pointset', '', '', '35', '0', '积分策略', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('28', 'member_notify', '22', 'micromember', 'notify', '', '', '36', '0', '会员通知', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('31', 'member_entry', '22', 'micromember', 'rule', '', '', '38', '0', '设置微会员入口', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('32', 'activities', '0', 'setting', 'menu', 'add', '', '5', '1', '微活动', 'icon-coffee', null, null, '1');
INSERT INTO `ims_menu` VALUES ('33', 'egg', '32', 'rule', 'display', 'customlist', 'activity=1&module=egg', '1', '1', '砸蛋', null, 'egg', null, '1');
INSERT INTO `ims_menu` VALUES ('34', 'lotery', '32', 'rule', 'display', 'customlist', 'activity=1&module=lotery', '2', '1', '大转盘', null, 'lotery', null, '1');
INSERT INTO `ims_menu` VALUES ('35', 'scratch', '32', 'rule', 'display', 'customlist', 'activity=1&module=scratch', '3', '1', '刮刮卡', null, 'scratch', null, '1');
INSERT INTO `ims_menu` VALUES ('36', 'vote', '32', 'rule', 'display', 'customlist', 'activity=1&module=vote', '4', '1', '投票', null, 'vote', null, '1');
INSERT INTO `ims_menu` VALUES ('37', 'wxwall', '32', 'rule', 'display', 'customlist', 'activity=1&module=wxwall', '5', '1', '微信墙', null, 'wxwall', null, '1');
INSERT INTO `ims_menu` VALUES ('38', 'system_user_manage', '0', 'setting', 'menu', 'add', '', '12', '1', '系统用户管理', 'icon-user', null, null, '1');
INSERT INTO `ims_menu` VALUES ('39', 'user_manage', '38', 'member', 'display', '', '', '1', '1', '用户管理', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('40', 'user_group_manage', '38', 'member', 'group', '', '', '2', '1', '用户组管理', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('41', 'register', '38', 'setting', 'register', '', '', '3', '1', '注册设置', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('42', 'system_manage', '0', 'setting', 'menu', 'add', '', '13', '1', '系统管理', 'icon-wrench', null, null, '1');
INSERT INTO `ims_menu` VALUES ('43', 'module_manage', '42', 'setting', 'module', '', '', '1', '1', '模块管理', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('44', 'common_rules_manage', '42', 'site', 'module', 'switchmanage', '', '3', '1', '微服务管理', '', 'userapi', null, '1');
INSERT INTO `ims_menu` VALUES ('45', 'other_setting', '42', 'setting', 'common', '', '', '4', '1', '其他设置', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('46', 'personal_profile', '42', 'setting', 'profile', '', '', '5', '1', '个人资料', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('47', 'update_cache', '42', 'setting', 'updatecache', '', '', '6', '1', '更新缓存', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('48', 'menu_manage', '42', 'setting', 'menu', '', '', '7', '1', '菜单管理', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('49', 'sub_module_manage', '43', 'setting', 'module', '', '', '0', '1', '模块管理', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('50', 'sub_new_module', '43', 'setting', 'designer', '', '', '0', '1', '设计新模块', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('51', 'add_user_group', '40', 'member', 'group', 'post', '', '0', '1', '添加用户组', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('52', 'member_group_list', '40', 'member', 'group', 'display', '', '0', '1', '用户组列表', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('53', 'add_member', '39', 'member', 'create', '', '', '0', '1', '添加用户', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('54', 'member_list', '39', 'member', 'display', '', '', '0', '1', '用户列表', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('55', 'audit_member', '39', 'member', 'display', '', 'status=-1', '0', '1', '审核用户', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('56', 'sub_right_manage', '24', 'micromember', 'cardright', '', 'type=list', '0', '1', '管理特权', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('57', 'sub_add_right', '24', 'micromember', 'cardright', '', 'type=edit', '0', '1', '添加特权', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('58', 'sub_add_card', '179', 'micromember', 'setcard', '', 'type=edit', '0', '1', '添加会员卡', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('59', 'sub_card_manage', '179', 'micromember', 'setcard', '', 'type=list', '0', '1', '管理会员卡', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('60', 'sub_pointset_setting', '27', 'micromember', 'pointset', '', 'type=pointset', '0', '1', '积分设置', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('61', 'sub_pointlevel_setting', '27', 'micromember', 'pointset', '', 'type=pointlevel', '0', '1', '等级设置', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('62', 'sub_add_notice', '28', 'micromember', 'notify', '', 'type=add', '0', '1', '添加会员通知', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('63', 'sub_member_notice_manage', '28', 'micromember', 'notify', '', 'type=list', '0', '1', '管理会员通知', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('64', 'sub_install_style', '16', 'site', 'style', '', '', '0', '1', '已安装风格', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('65', 'sub_uninstall_style', '16', 'site', 'style', 'uninstalltemplates', '', '0', '1', '未安装风格', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('66', 'sub_wechat_account', '12', 'account', 'display', '', 'type=1', '0', '1', '微信公众号', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('67', 'sub_yichat_account', '12', 'account', 'display', '', 'type=2', '0', '1', '易信公众号', null, null, null, '1');
INSERT INTO `ims_menu` VALUES ('68', 'sub_exist_rules_reply', '8', 'site', 'module', 'history', 'searchtype=rule', '0', '1', '已有规则回复', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('69', 'sub_default_rules_reply', '8', 'site', 'module', 'history', 'searchtype=default', '0', '1', '默认规则回复', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('70', 'sub_triggered_rules', '9', 'site', 'module', 'rule', '', '0', '1', '已触发规则', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('71', 'sub_untriggered_rules', '9', 'site', 'module', 'rule', 'foo=miss', '0', '1', '未触发规则', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('72', 'sub_triggered_kewords', '10', 'site', 'module', 'keyword', '', '0', '1', '已触发关键字', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('73', 'sub_untriggered_keywords', '10', 'site', 'module', 'keyword', 'foo=miss', '0', '1', '未触发关键字', null, 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('74', 'other_operation', '0', 'setting', 'menu', 'add', '', '120', '0', '其他操作', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('75', 'navigation_other', '74', 'setting', 'menu', 'add', '', '0', '0', '导航菜单', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('76', 'navigation_index', '75', 'index', 'frame', '', '', '0', '0', '导航首页按钮', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('77', 'fans_list', '75', 'site', 'module', 'display', '', '0', '0', '粉丝列表', '', 'fans', null, '1');
INSERT INTO `ims_menu` VALUES ('78', 'member_profile', '75', 'setting', 'profile', '', '', '0', '0', '用户个人资料', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('79', 'account_list', '75', 'account', 'display', '', 'type=1', '0', '0', '公众号列表', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('80', 'account_setting', '75', 'account', 'post', '', 'id=current', '0', '0', '设置公众号', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('81', 'member_navigation', '74', 'setting', 'menu', 'add', '', '0', '0', '用户导航', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('82', 'keyword_test', '81', 'test', '', '', '', '0', '0', '关键字测试', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('83', 'member_help', '81', 'index', 'help', '', '', '0', '0', '帮助', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('84', 'account_switch', '81', 'account', 'switch', '', '', '0', '0', '公众号切换', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('85', 'account_menu', '81', 'setting', 'menu', 'add', '', '0', '0', '公众号菜单', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('86', 'logout', '81', 'member', 'logout', '', '', '0', '0', '用户退出', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('87', 'welcome_page', '81', 'index', 'welcome', '', '', '0', '0', '欢迎页面', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('88', 'add_rule', '2', 'rule', 'post', '', '', '0', '0', '添加规则', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('89', 'rule_usage_trend', '9', 'site', 'module', 'trend', '', '0', '0', '使用率走势', '', 'stat', null, '1');
INSERT INTO `ims_menu` VALUES ('90', 'add_account', '66', 'account', 'post', '', '', '0', '0', '添加公众号', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('91', 'account_delete', '66', 'account', 'delete', '', '', '0', '0', '公众号删除', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('92', 'account_edit', '66', 'account', 'post', '', '', '0', '0', '公众号编辑', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('93', 'account_switch2', '66', 'account', 'switch', '', '', '0', '0', '公众号切换', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('94', 'btn_forbidden', '13', 'member', 'module', 'enable', '', '0', '0', '禁用', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('95', 'btn_set', '13', 'member', 'module', 'setting', '', '0', '0', '设置', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('96', 'site', '64', 'style', 'default', '', '', '0', '0', '设为默认', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('97', 'style_design', '64', 'site', 'style', 'designer', '', '0', '0', '设计风格', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('98', 'btn_install', '65', 'site', 'style', 'install', '', '0', '0', '安装', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('99', 'btn_add_nav', '17', 'site', 'nav', 'post', '', '0', '0', '添加导航', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('100', 'btn_nav_edit', '17', 'site', 'nav', 'post', '', '0', '0', '编辑', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('101', 'btn_nav_delete', '17', 'site', 'nav', 'delete', '', '0', '0', '删除', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('102', 'btn_add_category', '18', 'setting', 'category', 'post', '', '0', '0', '添加分类', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('103', 'btn_delete_category', '18', 'setting', 'category', 'delete', '', '0', '0', '删除', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('104', 'btn_edit_category', '18', 'setting', 'category', 'post', '', '0', '0', '编辑', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('105', 'btn_add_article', '19', 'site', 'article', 'post', '', '0', '0', '添加文章', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('106', 'btn_add_album', '20', 'site', 'album', 'create', '', '0', '0', '添加相册', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('107', 'btn_edit_article', '19', 'site', 'article', 'post', '', '0', '0', '编辑', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('108', 'btn_delete_article', '19', 'site', 'article', 'delete', '', '0', '0', '删除', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('109', 'btn_add_album_photo', '20', 'site', 'album', 'photo', '', '0', '0', '上传照片', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('110', 'btn_edit_album', '20', 'site', 'album', 'create', '', '0', '0', '编辑', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('111', 'btn_delete_album', '20', 'site', 'album', 'delete', '', '0', '0', '删除', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('112', 'btn_welcome_info', '2', 'rule', 'system', 'set', 'type=welcome', '0', '0', '设为欢迎信息', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('113', 'btn_default_info', '2', 'rule', 'system', 'set', 'type=default', '0', '0', ' 设为默认回复', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('114', 'btn_trend', '2', 'stat', 'trend', 'rule', '', '0', '0', '使用率走势', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('115', 'btn_rule_delete', '2', 'rule', 'delete', '', 'type=rule', '0', '0', '删除', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('116', 'btn_rule_edit', '2', 'rule', 'post', '', 'id=', '0', '0', '编辑', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('117', 'btn_export_article', '19', 'site', 'news', 'all', '', '0', '0', '导入文章', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('118', 'btn_style_delete', '64', 'site', 'style', 'uninstall', '', '0', '0', '删除', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('119', 'group_buying', '0', 'site', 'module', 'customlist', '', '15', '0', '微团购', 'icon-gift', 'groupbuying', '1', '1');
INSERT INTO `ims_menu` VALUES ('120', 'btn_groupbuying_add', '119', 'groupbuying', 'create', '', '', '0', '0', '添加团购活动', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('121', 'market', '0', 'setting', 'menu', '', '', '8', '0', '微商城', 'icon-home', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('122', 'order_manage', '121', 'site', 'entry', '', 'eid=40', '1', '1', '订单管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('123', 'goods_manage', '121', 'site', 'entry', '', 'eid=41', '2', '1', '商品管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('124', 'goods_category', '121', 'site', 'entry', '', 'eid=42', '3', '1', '商品分类', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('125', 'market_entry', '121', 'rule', 'cover', '', 'eid=39', '4', '0', '设置微商城入口', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('126', 'btn_set_privilage', '54', 'member', 'edit', '', '', '0', '0', '设置操作权限', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('127', 'btn_set_member_status', '54', 'member', 'edit', 'deny', '', '0', '0', '启用/禁用用户', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('128', 'btn_delete_member', '54', 'member', 'edit', 'delete', '', '0', '0', '删除用户', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('129', 'btn_member_group_edit', '52', 'member', 'group', 'post', '', '0', '0', '编辑', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('130', 'btn_set_member_group_privilege', '52', 'member', 'group', 'priv', '', '0', '0', '设置用户组权限', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('131', 'payment_manage', '42', 'pay', 'payment', '', '', '2', '1', '支付管理', '', null, null, '1');
INSERT INTO `ims_menu` VALUES ('133', 'edit_menu', '48', 'setting', 'menu', 'edit', '', '0', '0', '修改', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('132', 'add_menu', '48', 'setting', 'menu', 'add', '', '0', '0', '添加菜单', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('134', 'delete_menu', '48', 'setting', 'menu', 'delete', '', '0', '0', '删除', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('135', 'add_subbusiness', '23', 'micromember', 'setsubbusiness', '', 'type=edit', '0', '0', '添加分店', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('136', 'register_blind', '81', 'account', 'blind', '', '', '0', '0', '注册入口', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('137', 'register_blind2', '81', 'account', '#', '', '', '0', '0', '注册入口2', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('138', 'mobile_internet', '0', 'mobile_internet', '', '', '', '11', '1', '移动互联网活动', 'icon-bullhorn', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('139', 'bainian', '138', 'mobile_internet', 'bainian', '', '', '1', '1', '拜年活动', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('140', '', '54', 'member', 'edit', '', '', '0', '0', '编辑用户', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('141', '', '140', 'member', 'select', 'account', '', '0', '0', '选择所属的公众号', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('142', '', '140', 'member', 'select', 'module', '', '0', '0', '选择允许访问的模块', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('143', '', '140', 'member', 'edit', 'auth', '', '0', '0', '授权此用户管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('144', '', '140', 'member', 'edit', 'revo', '', '0', '0', '回收管理权限', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('145', '', '140', 'member', 'edit', 'revos', '', '0', '0', '回收管理权限2', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('146', '', '122', 'site', 'module', 'order', 'op=detail', '0', '0', '查看订单', '', 'shopping', '0', '1');
INSERT INTO `ims_menu` VALUES ('147', '', '122', 'site', 'module', 'goods', 'op=post', '0', '0', '编辑订单', '', 'shopping', '0', '1');
INSERT INTO `ims_menu` VALUES ('148', '', '122', 'site', 'module', 'goods', 'op=delete', '0', '0', '删除订单', '', 'shopping', '0', '1');
INSERT INTO `ims_menu` VALUES ('149', '', '123', 'site', 'module', 'goods', 'op=post', '0', '0', '添加商品', '', 'shopping', '0', '1');
INSERT INTO `ims_menu` VALUES ('150', '', '123', 'site', 'module', 'goods', 'op=delete', '0', '0', '删除商品', '', 'shopping', '0', '1');
INSERT INTO `ims_menu` VALUES ('151', '', '124', 'site', 'module', 'category', 'op=post', '0', '0', '添加分类', '', 'shopping', '0', '1');
INSERT INTO `ims_menu` VALUES ('152', '', '124', 'site', 'module', 'category', 'op=delete', '0', '0', '删除分类', '', 'shopping', '0', '1');
INSERT INTO `ims_menu` VALUES ('153', '', '32', 'activity_handle', 'handles', '', '', '7', '0', '活动操作', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('154', '', '74', '', '', '', '', '0', '0', '用户登录注册', '', '', '0', '0');
INSERT INTO `ims_menu` VALUES ('155', '', '33', 'rule', 'post', '', 'module=egg&activity=1', '0', '0', '添加砸蛋', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('156', '', '33', 'site', 'module', 'awardlist', '', '0', '0', '查看中奖名单', '', 'egg', '0', '1');
INSERT INTO `ims_menu` VALUES ('157', '', '34', 'rule', 'post', '', 'module=lotery&activity=1', '0', '0', '添加大转盘', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('158', '', '34', 'site', 'module', 'awardlist', '', '0', '0', '查看中奖名单', '', 'lotery', '0', '1');
INSERT INTO `ims_menu` VALUES ('159', '', '35', 'rule', 'post', '', 'module=scratch&activity=1', '0', '0', '添加刮刮卡', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('160', '', '35', 'site', 'module', 'awardlist', '', '0', '0', '查看中奖名单', '', 'scratch', '0', '1');
INSERT INTO `ims_menu` VALUES ('161', '', '36', 'rule', 'post', '', 'module=vote&activity=1', '0', '0', '添加投票', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('162', '', '37', 'rule', 'post', '', 'module=wxwall&activity=1', '0', '0', '添加微信墙', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('163', '', '153', 'rule', 'delete', '', 'type=rule', '0', '0', '删除', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('164', '', '154', 'member', 'login', '', '', '0', '0', '用户登录', '', '', '0', '0');
INSERT INTO `ims_menu` VALUES ('165', '', '154', 'member', 'register', '', '', '0', '0', '用户注册页面', '', '', '0', '0');
INSERT INTO `ims_menu` VALUES ('166', '', '154', 'member', 'blind', '', '', '0', '0', '用户注册步骤', '', '', '0', '0');
INSERT INTO `ims_menu` VALUES ('167', '', '74', 'site', 'icon', '', '', '0', '0', '选择图标', '', '', '0', '0');
INSERT INTO `ims_menu` VALUES ('168', '', '154', 'index', 'attachment', '', '', '0', '0', '上传', '', '', '0', '0');
INSERT INTO `ims_menu` VALUES ('169', '', '0', 'setting', 'menu', 'add', '', '14', '0', '微相册', 'icon-smile', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('170', '', '169', 'rule', 'cover', '', 'eid=18', '0', '1', '设置微相册入口', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('171', 'album', '169', 'rule', 'display', 'customlist', 'activity=1&module=album', '0', '1', '相册入口列表', '', 'album', '0', '1');
INSERT INTO `ims_menu` VALUES ('172', '', '22', 'rule', 'cover', '', 'eid=12', '1', '1', '优惠劵入口设置', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('173', '', '22', 'rule', 'cover', '', 'eid=13', '2', '1', '会员卡入口设置', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('174', '', '22', 'site', 'nav', '', '', '3', '1', '微站导航设置', '', 'member', '0', '1');
INSERT INTO `ims_menu` VALUES ('175', '', '22', 'site', 'entry', '', 'eid=6', '4', '1', '消费密码管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('176', '', '22', 'site', 'entry', '', 'eid=8', '5', '1', '优惠劵管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('177', '', '22', 'site', 'entry', '', 'eid=9', '6', '1', '商家设置', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('178', '', '22', 'site', 'entry', '', 'eid=10', '7', '1', '会员管理', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('179', '', '22', 'site', 'entry', '', 'eid=11', '8', '1', '会员卡设置', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('180', '', '0', 'setting', 'menu', 'add', '', '1', '1', '自动回复', 'icon-comments', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('181', '', '180', 'rule', 'display', '', 'module=basic', '1', '1', '文字回复', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('182', '', '180', 'rule', 'display', '', 'module=news', '2', '1', '图文回复', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('183', '', '180', 'rule', 'display', '', 'module=music', '3', '1', '语音回复', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('184', '', '180', 'rule', 'display', '', 'module=userapi', '4', '1', '自定义接口回复', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('185', '', '32', 'rule', 'display', 'customlist', 'activity=1&module=shake', '6', '1', '摇一摇', '', 'shake', '0', '1');
INSERT INTO `ims_menu` VALUES ('186', '', '0', 'setting', 'menu', 'add', '', '7', '1', '微生活', 'icon-male', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('187', '', '186', 'site', 'entry', '', 'eid=47', '2', '1', '微喜帖', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('188', '', '186', 'site', 'entry', '', 'eid=45', '3', '1', '送卡', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('189', '', '186', 'site', 'entry', '', 'eid=19', '1', '1', '微相册', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('190', '', '0', 'setting', 'menu', 'add', '', '6', '1', '微营销', 'icon-suitcase', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('191', '', '190', 'site', 'entry', '', 'eid=29', '1', '1', '商户列表', '', '', '0', '1');
INSERT INTO `ims_menu` VALUES ('192', '', '190', 'site', 'entry', '', 'eid=34', '2', '1', '预约与调查', '', '', '0', '1');
