#清空该表再导入数据 或先备份该表
CREATE TABLE `ims_modules` (
  `mid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '标识',
  `type` varchar(20) NOT NULL DEFAULT '' COMMENT '类型',
  `title` varchar(100) NOT NULL COMMENT '名称',
  `version` varchar(10) NOT NULL DEFAULT '' COMMENT '版本',
  `ability` varchar(500) NOT NULL COMMENT '功能描述',
  `description` varchar(1000) NOT NULL COMMENT '介绍',
  `author` varchar(50) NOT NULL COMMENT '作者',
  `url` varchar(255) NOT NULL COMMENT '发布页面',
  `settings` tinyint(1) NOT NULL DEFAULT '0' COMMENT '扩展设置项',
  `subscribes` varchar(500) NOT NULL DEFAULT '' COMMENT '订阅的消息类型',
  `handles` varchar(500) NOT NULL DEFAULT '' COMMENT '能够直接处理的消息类型',
  `isrulefields` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否有规则嵌入项',
  `issystem` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否是系统模块',
  `isrulesingle` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否单入口模块',
  `home` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否微站首页嵌入',
  `options` varchar(1000) NOT NULL DEFAULT '' COMMENT '扩展功能导航项',
  `profile` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否个人中心嵌入',
  `site_menus` varchar(1000) NOT NULL DEFAULT '' COMMENT '微站功能扩展导航项',
  `platform_menus` varchar(1000) NOT NULL DEFAULT '' COMMENT '微站功能扩展导航项',
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ims_modules
-- ----------------------------
INSERT INTO `ims_modules` VALUES ('1', 'basic', '', '文字回复', '1.0', '和您进行简单对话', '一问一答得简单对话. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的回复内容.', 'WeEngine Team', '', '0', '', '', '1', '1', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('2', 'news', '', '图文回复', '1.0', '为你提供生动的图文资讯', '一问一答得简单对话, 但是回复内容包括图片文字等更生动的媒体内容. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的图文回复内容.', 'WeEngine Team', '', '0', '', '', '1', '1', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('4', 'music', '', '语音回复', '1.0', '提供语音、音乐等音频类回复', '在回复规则中可选择具有语音、音乐等音频类的回复内容，并根据用户所设置的特定关键字精准的返回给粉丝，实现一问一答得简单对话。', 'WeEngine Team', '', '0', '', '', '1', '1', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('6', 'userapi', '', '自定义接口回复', '1.1', '更方便的第三方接口设置', '自定义接口又称第三方接口，可以让开发者更方便的接入微擎系统，高效的与微信公众平台进行对接整合。', 'WeEngine Team', '', '0', '', '', '1', '1', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('7', 'egg', '', '砸蛋', '1.2', '趣味性抽奖类营销功能', '砸蛋抽奖可以增强粉丝与公众号的互动、提升公众号的黏性，让你在短时间内迅速引爆人气。', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&amp;fid=36&amp;filter=typeid&amp;typeid=1', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '1', 'a:1:{i:0;a:3:{s:5:\"title\";s:12:\"中奖名单\";s:2:\"do\";s:9:\"awardlist\";s:5:\"state\";s:0:\"\";}}', '0', '', '');
INSERT INTO `ims_modules` VALUES ('8', 'lotery', '', '大转盘', '1.0', '大转盘抽奖模块', '大转盘抽奖开启，中奖名单查看', 'Flink Team', '', '0', '', '', '1', '0', '0', '1', 'a:1:{i:0;a:3:{s:5:\"title\";s:12:\"中奖名单\";s:2:\"do\";s:9:\"awardlist\";s:5:\"state\";s:0:\"\";}}', '0', '', '');
INSERT INTO `ims_modules` VALUES ('9', 'fans', '', '粉丝管理', '1.0.3', '关注的粉丝管理', '', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&amp;fid=36&amp;filter=typeid&amp;typeid=1', '0', 'a:8:{i:0;s:4:\"text\";i:1;s:5:\"image\";i:2;s:5:\"voice\";i:3;s:5:\"video\";i:4;s:8:\"location\";i:5;s:4:\"link\";i:6;s:9:\"subscribe\";i:7;s:11:\"unsubscribe\";}', 'a:0:{}', '0', '0', '0', '0', 'a:0:{}', '1', 'a:0:{}', 'a:0:{}');
INSERT INTO `ims_modules` VALUES ('29', 'lxymarry', 'activity', '微喜帖', '0.5', '微喜帖', '结婚喜帖发送，赴宴人员登记，新郎新娘结婚照展示，收集祝福语', '大路货 &amp; WeEngine Team', '', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('10', 'stat', '', '数据统计', '1.0.3', '提供消息记录及分析统计功能', '能够提供按公众号码查询, 分析统计消息记录, 以及规则关键字命中情况统计', 'We7 Team', 'http://www.we7.cc', '1', 'a:7:{i:0;s:4:\"text\";i:1;s:5:\"image\";i:2;s:8:\"location\";i:3;s:4:\"link\";i:4;s:9:\"subscribe\";i:5;s:11:\"unsubscribe\";i:6;s:5:\"click\";}', 'a:0:{}', '0', '0', '0', '0', 'a:0:{}', '0', 'a:0:{}', 'a:0:{}');
INSERT INTO `ims_modules` VALUES ('28', 'research', 'customer', '预约与调查', '1.3', '可以快速生成调查表单或则预约记录', '', 'WeEngine Team', 'http://bbs.we7.cc', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('11', 'vote', '', '投票', '1.0', '投票模块', '投票系统，图片、文字，单选，多选', 'ffcsteam', '', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '1', 'a:2:{i:0;a:3:{s:5:\"title\";s:18:\"添加投票选项\";s:2:\"do\";s:6:\"option\";s:5:\"state\";s:0:\"\";}i:1;a:3:{s:5:\"title\";s:18:\"查看投票结果\";s:2:\"do\";s:6:\"result\";s:5:\"state\";s:0:\"\";}}', '0', 'a:0:{}', 'a:0:{}');
INSERT INTO `ims_modules` VALUES ('12', 'wxwall', '', '微信墙', '1.3', '可以实时同步显示现场参与者发送的微信', '微信墙又称微信大屏幕，是在展会、音乐会、婚礼现场等场所展示特定主题微信的大屏幕，大屏幕上可以同步显示现场参与者发送的微信，使场内外观众能够第一时间传递和获取现场信息。', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&amp;fid=36&amp;filter=typeid&amp;typeid=1', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '1', 'a:4:{i:0;a:3:{s:5:\"title\";s:12:\"查看内容\";s:2:\"do\";s:6:\"detail\";s:5:\"state\";s:0:\"\";}i:1;a:3:{s:5:\"title\";s:12:\"审核内容\";s:2:\"do\";s:6:\"manage\";s:5:\"state\";s:0:\"\";}i:2;a:3:{s:5:\"title\";s:12:\"中奖名单\";s:2:\"do\";s:9:\"awardlist\";s:5:\"state\";s:0:\"\";}i:3;a:3:{s:5:\"title\";s:9:\"黑名单\";s:2:\"do\";s:9:\"blacklist\";s:5:\"state\";s:0:\"\";}}', '0', '', '');
INSERT INTO `ims_modules` VALUES ('13', 'member', '', '微会员', '1.0', '微会员', '微会员', 'ffcsteam', '', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', 'a:0:{}', '0', 'a:0:{}', 'a:0:{}');
INSERT INTO `ims_modules` VALUES ('14', 'scratch', 'activity', '刮刮卡', '1.2', '趣味性抽奖类营销功能', '刮刮卡抽奖可以增强粉丝与公众号的互动、提升公众号的黏性，让你在短时间内迅速引爆人气。', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&amp;fid=36&amp;filter=typeid&amp;typeid=1', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '1', 'a:1:{i:0;a:3:{s:5:\"title\";s:12:\"中奖名单\";s:2:\"do\";s:9:\"awardlist\";s:5:\"state\";s:0:\"\";}}', '0', 'a:0:{}', 'a:0:{}');
INSERT INTO `ims_modules` VALUES ('15', 'site', '', '微官网', '1.0', '微官网', '微官网', 'ffcsteam', '', '0', '', '', '1', '1', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('16', 'shopping', 'business', '微商城', '1.3', '微商城', '微商城', 'WeEngine Team', '', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '1', '1', 'a:0:{}', '0', 'a:0:{}', 'a:3:{i:0;a:2:{s:5:\"title\";s:12:\"订单管理\";s:2:\"do\";s:5:\"order\";}i:1;a:2:{s:5:\"title\";s:12:\"商品管理\";s:2:\"do\";s:5:\"goods\";}i:2;a:2:{s:5:\"title\";s:12:\"商品分类\";s:2:\"do\";s:8:\"category\";}}');
INSERT INTO `ims_modules` VALUES ('17', 'groupbuying', '', '微团购', '1.2', '微团购', '微团购', 'ffcsteam', '', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('23', 'album', 'business', '微相册', '1.5', '展示一系列图片来介绍你的公众号', '', 'WeEngine Team', 'http://www.we7.cc', '1', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('24', 'business', 'business', '周边商户', '1.3', '提供商家信息的添加、聚合及LBS的查询。', '', 'WeEngine Team', 'http://bbs.we7.cc/forum.php?mod=forumdisplay&fid=36&filter=typeid&typeid=1', '1', 'a:0:{}', 'a:1:{i:0;s:8:\"location\";}', '0', '0', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('25', 'message', '', '留言墙', '1.1', '留言墙', '留言墙，带审核，审核以后可以前台查看，也可以免审核。', '超级无聊', '', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('30', 'heka', 'activity', '送贺卡', '1.0', '新年贺卡，生日贺卡，同窗贺卡', '新年贺卡，生日贺卡，同窗贺卡', '超级无聊 &amp; WeEngine Team', '', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', '', '0', '', '');
INSERT INTO `ims_modules` VALUES ('31', 'shake', 'activity', '摇一摇中奖', '1.2', '摇一摇中奖', '摇一摇中奖', 'WeEngine Team', 'http://we7.cc', '0', 'a:0:{}', 'a:1:{i:0;s:4:\"text\";}', '1', '0', '0', '0', '', '0', '', '');
