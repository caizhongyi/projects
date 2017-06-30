#清空该表再导入数据 或先备份该表
CREATE TABLE `ims_modules_bindings` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(30) NOT NULL DEFAULT '',
  `entry` varchar(10) NOT NULL DEFAULT '',
  `call` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(50) NOT NULL,
  `do` varchar(30) NOT NULL,
  `state` varchar(200) NOT NULL,
  `direct` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`eid`)
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ims_modules_bindings
-- ----------------------------
INSERT INTO `ims_modules_bindings` VALUES ('1', 'fans', 'menu', '', '粉丝管理选项', 'settings', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('2', 'fans', 'menu', '', '地理位置分布', 'location', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('3', 'fans', 'menu', '', '粉丝分组', 'group', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('4', 'fans', 'menu', '', '粉丝列表', 'display', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('5', 'fans', 'profile', '', '我的资料', 'profile', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('6', 'member', 'menu', '', '消费密码管理', 'password', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('7', 'member', 'profile', '', '我的会员卡', 'mycard', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('8', 'member', 'menu', '', '优惠券管理', 'coupon', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('9', 'member', 'menu', '', '商家设置', 'store', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('10', 'member', 'menu', '', '会员管理', 'member', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('11', 'member', 'menu', '', '会员卡设置', 'card', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('12', 'member', 'cover', '', '优惠券入口设置', 'entrycoupon', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('13', 'member', 'cover', '', '会员卡入口设置', 'card', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('14', 'member', 'profile', '', '我的充值记录', 'mycredit', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('15', 'member', 'profile', '', '我的优惠券', 'entrycoupon', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('16', 'scratch', 'rule', '', '中奖名单', 'awardlist', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('17', 'scratch', 'home', 'gethometiles', '', '', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('18', 'album', 'cover', '', '相册列表入口设置', 'list', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('19', 'album', 'menu', '', '相册列表', 'list', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('20', 'album', 'home', 'getAlbumTiles', '', '', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('21', 'album', 'home', '', '相册首页', 'list', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('22', 'site', 'menu', '', '文章管理', 'article', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('23', 'site', 'menu', '', '文章分类', 'category', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('24', 'site', 'home', 'getCategoryTiles', '', '', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('25', 'wxwall', 'rule', '', '查看内容', 'detail', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('26', 'wxwall', 'rule', '', '审核内容', 'manage', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('27', 'wxwall', 'rule', '', '中奖名单', 'awardlist', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('28', 'wxwall', 'rule', '', '黑名单', 'blacklist', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('29', 'business', 'menu', '', '商户列表', 'display', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('30', 'business', 'menu', '', '添加商户', 'post', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('31', 'stat', 'menu', '', '聊天记录', 'history', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('32', 'stat', 'menu', '', '规则使用率', 'rule', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('33', 'stat', 'menu', '', '关键字命中率', 'keyword', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('50', 'research', 'home', 'gethometiles', '', '', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('49', 'research', 'menu', '', '新建预约活动', 'post', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('34', 'research', 'menu', '', '预约活动列表', 'display', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('37', 'egg', 'rule', '', '中奖名单', 'awardlist', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('38', 'egg', 'home', 'gethometiles', '', '', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('39', 'shopping', 'cover', '', '商城入口设置', 'list', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('40', 'shopping', 'menu', '', '订单管理', 'order', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('41', 'shopping', 'menu', '', '商品管理', 'goods', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('42', 'shopping', 'menu', '', '商品分类', 'category', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('43', 'shopping', 'home', '', '商城', 'list', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('44', 'shopping', 'profile', '', '我的订单', 'myorder', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('45', 'heka', 'menu', '', '贺卡管理', 'list', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('47', 'lxymarry', 'menu', '', '喜帖管理', 'Manager', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('55', 'shake', 'rule', '', '查看活动', 'detail', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('54', 'heka', 'home', 'gethometiles', '', '', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('51', 'research', 'profile', '', '我的预约', 'myresearch', '', '0');
INSERT INTO `ims_modules_bindings` VALUES ('52', 'shake', 'rule', '', '管理用户', 'manage', '', '0');
