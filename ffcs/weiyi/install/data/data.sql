INSERT INTO `ims_modules` (`mid`, `name`, `title`, `ability`, `description`, `rulefields`, `settings`, `issettings`, `issystem`, `author`, `version`, `menus`) VALUES
(1, 'basic', '基本文字回复', '和您进行简单对话', '一问一答得简单对话. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的回复内容.', 1, '0', 0, 1, 'WeEngine Team', '1.0', ''),
(2, 'news', '基本混合图文回复', '为你提供生动的图文资讯', '一问一答得简单对话, 但是回复内容包括图片文字等更生动的媒体内容. 当访客的对话语句中包含指定关键字, 或对话语句完全等于特定关键字, 或符合某些特定的格式时. 系统自动应答设定好的图文回复内容.', 1, '0', 0, 1, 'WeEngine Team', '1.0', ''),
(4, 'music', '基本语音回复', '提供语音、音乐等音频类回复', '在回复规则中可选择具有语音、音乐等音频类的回复内容，并根据用户所设置的特定关键字精准的返回给粉丝，实现一问一答得简单对话。', 1, '0', 0, 1, 'WeEngine Team', '1.0', ''),
(6, 'userapi', '自定义接口回复', '更方便的第三方接口设置', '自定义接口又称第三方接口，可以让开发者更方便的接入微擎系统，高效的与微信公众平台进行对接整合。', 1, '', 0, 1, 'WeEngine Team', '1.1', '');

INSERT INTO `ims_rule` (`id`, `weid`, `name`, `module`) VALUES(1, 1, '默认文字回复', 'basic');
INSERT INTO `ims_rule` (`id`, `weid`, `name`, `module`) VALUES(2, 1, '默认图文回复', 'news');
INSERT INTO `ims_rule_keyword` (`id`, `rid`, `weid`, `module`, `content`, `type`) VALUES
(1, 1, 1, 'basic', '文字', 2),
(2, 2, 1, 'news', '图文', 2);
INSERT INTO `ims_basic_reply` (`id`, `rid`, `content`) VALUES(1, 1, '这里是默认文字回复');
INSERT INTO `ims_news_reply` (`id`, `rid`, `parentid`, `title`, `description`, `thumb`, `content`, `url`) VALUES(1, 2, 0, '这里是默认图文回复', '这里是默认图文描述', 'images/2013/01/d090d8e61995e971bb1f8c0772377d.png', '这里是默认图文原文这里是默认图文原文这里是默认图文原文', '');
INSERT INTO `ims_news_reply` (`id`, `rid`, `parentid`, `title`, `description`, `thumb`, `content`, `url`) VALUES(2, 2, 1, '这里是默认图文回复内容', '', 'images/2013/01/112487e19d03eaecc5a9ac87537595.jpg', '这里是默认图文回复原文这里是默认图文回复原文<br />', '');
INSERT INTO `ims_settings` (`key`, `value`) VALUES
('stat', 'a:3:{s:11:"msg_history";s:1:"1";s:10:"msg_maxday";s:1:"0";s:9:"use_ratio";s:1:"1";}');
