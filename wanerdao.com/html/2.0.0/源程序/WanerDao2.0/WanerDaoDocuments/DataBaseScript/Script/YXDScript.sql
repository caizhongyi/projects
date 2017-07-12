
-- ----------------------------
-- Procedure structure for `p_GetExistsGiftOfSelf` 2012年4月13日1:12:11
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetExistsGiftOfSelf`;
DELIMITER ;;
CREATE DEFINER = `root`@`localhost` PROCEDURE `p_GetExistsGiftOfSelf`(In_user_id varchar(40),In_is_received varchar(2),In_pagecurrent VARCHAR(1024),In_pageSize  VARCHAR(1024))
    COMMENT '关系礼物-过去礼物自己的列表(发送|接收)'
BEGIN

drop table if exists tem_mytab;
create TEMPORARY TABLE tem_mytab(
	id VARCHAR(40),gift_logo_path varchar(100),is_receive tinyint,gift_name varchar(60),
	category_name varchar(60),action_name varchar(50),
	content VARCHAR(500),action_date datetime	
);

#返回 
if In_is_received="-1" then #收到的和发送出去的礼物
	insert into tem_mytab 
	select pg.id,gm.gift_logo_path,gm.gift_name,pg.is_receive,gc.category_name,
	GetUserNameById(pg.user_id) as action_name,pg.content,pg.action_date
  from PersonalGift pg inner join GiftsMarket gm on pg.gift_id=gm.id 
	inner join GiftCategory gc on gc.id=gm.category_id 
	where pg.user_id=In_user_id and pg.active=true;
ELSEIF In_is_received="0" then #发送出去的礼物,并且好友已经收到的
	insert into tem_mytab 
	select pg.id,gm.gift_logo_path,gm.gift_name,pg.is_receive,gc.category_name,
	GetUserNameById(pg.user_id) as action_name,pg.content,pg.action_date
  from PersonalGift pg inner join GiftsMarket gm on pg.gift_id=gm.id inner join GiftCategory gc
	on gc.id=gm.category_id where pg.user_id=In_user_id and pg.active=true and pg.is_receive=0;
ELSEIF In_is_received="2" then #发送出去的礼物但是别人还未接收到的
	insert into tem_mytab 
	select pg.id,gm.gift_logo_path,gm.gift_name,pg.is_receive,gc.category_name,
	GetUserNameById(pg.user_id) as action_name,pg.content,pg.action_date
  from PersonalGift pg inner join GiftsMarket gm on pg.gift_id=gm.id inner join GiftCategory gc
	on gc.id=gm.category_id where pg.user_id=In_user_id and pg.active=true and pg.is_receive=2;
else #收到的礼物
	insert into tem_mytab 
	select pg.id,gm.gift_logo_path,gm.gift_name,pg.is_receive,gc.category_name,
	GetUserNameById(pg.user_id) as action_name,pg.content,pg.action_date
  from PersonalGift pg inner join GiftsMarket gm on pg.gift_id=gm.id inner join GiftCategory gc
	on gc.id=gm.category_id where pg.user_id=In_user_id and pg.active=true and pg.is_receive=1;
end if;
	CALL p_wanerdaopages('tem_mytab','*','','action_date','1',In_pagecurrent,In_pageSize);
	drop table tem_mytab;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_DeleteBatchImages`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_DeleteBatchImages`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_DeleteBatchImages`(In_image_id varchar(1000), In_isShard tinyint)
BEGIN
DECLARE SQL1 varchar(1000);
DECLARE SQL2 varchar(1000);

if LENGTH(COMPRESS(In_image_id))>0 THEN
	if In_isShard=true THEN
		SET @temp_activeSQL=CONCAT("delete from activityimage where id in(",In_image_id,")");
	ELSE
	SET @temp_activeSQL='';
end if;
/******************/
SET @temp_SQL=CONCAT("delete from PersonalImage where id in (",In_image_id,")");

BEGIN

START TRANSACTION;

	PREPARE SQL2 from @temp_SQL;
	if LENGTH(COMPRESS(@temp_activeSQL))>0 then
		PREPARE SQL1 from @temp_activeSQL;
		execute SQL1;
	end if;
		execute SQL2;

COMMIT;  

END;

end if;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetAllImageFolder`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetAllImageFolder`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetAllImageFolder`(In_where varchar(1000),In_pageCurrent varchar(1024),In_pageSize varchar(1024),In_defaultPath varchar(250))
    COMMENT '获取个人相册列表'
BEGIN 
 CALL p_wanerdaopages( 
'imagefolder',
CONCAT("imagefolder.id,
imagefolder.user_id,
imagefolder.folder_name,
imagefolder.share_key_id,
imagefolder.create_date,
imagefolder.description,
imagefolder.is_system,
imagefolder.permission,
imagefolder.active,
(select count(*) from personalimage where fold_id=imagefolder.id and active=true) as count,
GetImageFolderCover(imagefolder.id,'",In_defaultPath,"') as cover_path"),
In_where,
'imagefolder.create_date',
'1',
In_pageCurrent,
In_pageSize
);
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetBaseTableModelList`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetBaseTableModelList`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetBaseTableModelList`(In_user_id varchar(50),In_currentPage varchar(100),In_pageSize varchar(100),In_whereCategory varchar(100))
    COMMENT '主页-获取主要个人动态基本列表'
BEGIN
	DECLARE	m_begin_row INT ;
	DECLARE m_page_size int;

	set m_begin_row=(In_currentPage-1)*In_pageSize;
	set m_page_size=In_pageSize;

	select uo.id,uo.user_id,uo.action_category_id,uo.object_id,uo.permission,uo.ope_date,ac.table_id,ua.description as action_name,
	uc.category_name,uo.active from UserOperation uo inner join ActionCategory ac on uo.action_category_id=ac.id
	inner JOIN UserAction ua on ac.action_id=ua.id  inner join UserOperateCategory uc on ac.category_id=uc.id
	where uo.user_id in
	(SELECT DISTINCT user_id from personalprofile join(
	SELECT personalfriends.relation_from_id FROM personalprofile
	INNER JOIN personalfriends ON personalprofile.user_id = personalfriends.relation_to_id
	WHERE personalprofile.user_id=In_user_id) as c
	on personalprofile.user_id=c.relation_from_id) and uo.option_id=In_whereCategory   #option_id(new,message,group,activity,posts)分别对应主页的几个选项卡
	and uo.active=true ORDER BY uo.ope_date desc limit m_begin_row,m_page_size;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetDetailedMessage`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetDetailedMessage`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetDetailedMessage`(In_id varchar(40),form_where int)
    COMMENT '获取消息详情--站内信'
BEGIN
/*1收件箱  2发件箱  3草稿箱*/
IF form_where=1 THEN
	 select id,from_id,getusernamebyid(from_id) as from_username,content,receive_date from InboxMessage where id=In_id and active=1;
ELSEIF form_where=2 THEN
   select sendmessage.id,send_id as from_id,getusernamebyid(send_id) as from_username,content,send_date as receive_date 
   from sendmessage	join SendMessageReceiverList on sendmessage.id=SendMessageReceiverList.message_id 
   where sendmessage.id=In_id and sendmessage.active=1;
ELSE
   select id,send_id as from_id,getusernamebyid(send_id) as from_username,content,draft_date as receive_date from DraftMessage where id=In_id 
   and (is_system=0 or is_system is null) and active=1;
END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetInboxInviteList`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetInboxInviteList`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetInboxInviteList`(In_userid varchar(40),In_option int,In_currentPage varchar(100),In_pageSize varchar(100),In_groupConfig double)
    COMMENT '获取收件邀请--站内消息'
BEGIN

drop table if exists tem_table;/*临时表*/

drop table if exists tem_listtable;/*临时输出表*/

CREATE TEMPORARY TABLE tem_table(
	id varchar(40),msg_type int,msg_id varchar(40),
  from_where int,send_username varchar(40),send_date datetime
); 

CREATE TEMPORARY TABLE tem_listtable(
	id varchar(40),from_where int,msg_type INT,json varchar(4000),
  send_username varchar(40),send_date datetime
); 
/*from_where 1w为发件箱  2为收件箱*/
IF In_option=0 THEN/*全部*/

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date)
		select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,send_date from InboxInviteMessage
		where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid;

ELSEIF In_option=1 THEN/*个人邀请*/

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date) 
		select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,send_date from InboxInviteMessage
		where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid  and msg_type=3;

ELSEIF In_option=2 THEN/*活动邀请*/

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date)
		select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,send_date from InboxInviteMessage
		where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid and msg_type=2;

ELSE/*圈子邀请*/

	insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date) 
  select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,send_date from InboxInviteMessage
	where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid and msg_type=1;

END IF;

	BEGIN

		DECLARE did varchar(40);
	  DECLARE dfrom_where int;
		DECLARE dmsg_type INT;
		DECLARE dmsg_id varchar(40);
		DECLARE dsend_username  varchar(40);
		DECLARE dsend_date datetime;
		DECLARE no_more_departments INT;

		DECLARE ordernumbers CURSOR
		FOR SELECT id,msg_type,msg_id,from_where,send_username,send_date FROM tem_table;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET no_more_departments=1;
		SET no_more_departments=0;
		OPEN ordernumbers;

		ordernumbers:LOOP
					/*REPEAT*/
						 FETCH ordernumbers INTO did,dmsg_type,dmsg_id,dfrom_where,dsend_username,dsend_date; 
							IF no_more_departments THEN
								LEAVE ordernumbers;
							END IF;
			 
							IF dmsg_type=1 THEN/*圈子*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,send_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"logo_path":"',IFNULL(p.logo_path,''),
									'","group_name":"',IFNULL(p.group_name,''),
									'","summary":"',IFNULL(p.summary,''),
									'","member_nbr":"',IFNULL(p.member_nbr,''),
									'","activity_score":"',IFNULL(p.activity_score,''),
									'","followspend":"',IFNULL(followspend,''),
									'"}') as json,dsend_username,dsend_date
									from  GroupInfo p left join (select (count(*) * In_groupConfig )
									as followspend,attention_id from PersonalGroupFollow 
									where attention_id = dmsg_id and active = 1) as f 
									on p.id = f.attention_id where p.id = dmsg_id;

								
							ELSEIF dmsg_type=2 THEN/*活动*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,send_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"active_name":"',IFNULL(p.active_name,''),
									'","address":"',IFNULL(p.address,''),
									'","begin_datetime":"',IFNULL(p.begin_datetime,''),
									'","report_datetime":"',IFNULL(p.report_datetime,''),
									'","member_count":"',IFNULL(p.join_member_nbr,''),
									'","prepay_nbr":"',IFNULL(p.prepay_nbr,''),
									'"}') as json,dsend_username,dsend_date from Activity p where p.id=dmsg_id;

							ELSE/*好友*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,send_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"logo_path":"',IFNULL(p.logo_small_path,''),
									'","name":"',IFNULL(p.name,''),
								  '","contellation":"',IFNULL(n.contellation,''),
									'","place":"',IFNULL(n.current_place,''),
									'","home":"',IFNULL(n.home,''),
									'","school":"',IFNULL(n.school,''),
									'","work_place":"',IFNULL(n.work_place,''),
									'"}') as json,dsend_username,dsend_date
									from PersonalProfile p join PersonalNameCard n
									ON p.user_id=n.user_id where p.user_id=dmsg_id;
								
							END IF;
			END LOOP ordernumbers;
				/*UNTIL no_more_departments
					END REPEAT;*/
		CLOSE ordernumbers;

	END;

	BEGIN

	CALL p_wanerdaopages('tem_listtable','*','','send_date','1',In_currentPage,In_pageSize);

	END;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetInvitRubbishList`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetInvitRubbishList`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetInvitRubbishList`(In_userid varchar(40),In_option int,In_currentPage varchar(100),In_pageSize varchar(100),In_groupConfig double)
    COMMENT '站内消息  邀请垃圾箱列表'
BEGIN

drop table if exists tem_table;/*临时表*/

drop table if exists tem_listtable;/*临时输出表*/

CREATE TEMPORARY TABLE tem_table(
	id varchar(40),msg_type int,msg_id varchar(40),
  from_where int,send_username varchar(40),delete_date datetime
); 

CREATE TEMPORARY TABLE tem_listtable(
	id varchar(40),from_where int,msg_type INT,json varchar(4000),
  send_username varchar(40),delete_date datetime
); 
/*from_where 1为发件箱  2为收件箱*/
IF In_option=0 THEN/*全部*/
		insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date)
		select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,delete_date from sendinvitemessage
		where is_delete=true and active=true and user_id=In_userid;

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date)
		select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,delete_date from InboxInviteMessage
		where is_delete=true and active=true and user_id=In_userid;

ELSEIF In_option=1 THEN/*个人邀请*/
		insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date) 
		select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,delete_date from sendinvitemessage
		where is_delete=true and active=true and user_id=In_userid  and msg_type=3;

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date) 
		select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,delete_date from InboxInviteMessage
		where is_delete=true and active=true and user_id=In_userid  and msg_type=3;

ELSEIF In_option=2 THEN/*活动邀请*/

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date)
		select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,delete_date from sendinvitemessage
		where is_delete=true and active=true and user_id=In_userid and msg_type=2;

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date)
		select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,delete_date from InboxInviteMessage
		where is_delete=true and active=true and user_id=In_userid and msg_type=2;


ELSE/*圈子邀请*/

	insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date)
  select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,delete_date from sendinvitemessage
	where is_delete=true and active=true and user_id=In_userid and msg_type=1;

	insert into tem_table(id,msg_type,msg_id,from_where,send_username,delete_date) 
  select id,msg_type,msg_id,2 as from_where,getusernamebyid(from_id) as from_username,delete_date from InboxInviteMessage
	where is_delete=true and active=true and user_id=In_userid and msg_type=1;

END IF;

	BEGIN

		DECLARE did varchar(40);
	  DECLARE dfrom_where int;
		DECLARE dmsg_type INT;
		DECLARE dmsg_id varchar(40);
		DECLARE dsend_username  varchar(40);
		DECLARE ddelete_date datetime;
		DECLARE no_more_departments INT;

		DECLARE ordernumbers CURSOR
		FOR SELECT id,msg_type,msg_id,from_where,send_username,delete_date FROM tem_table;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET no_more_departments=1;

		OPEN ordernumbers;

			ordernumbers:LOOP
				/*	REPEAT*/
						 FETCH ordernumbers INTO did,dmsg_type,dmsg_id,dfrom_where,dsend_username,ddelete_date; 
							IF no_more_departments THEN
								LEAVE ordernumbers;
							END IF;
			 
							IF dmsg_type=1 THEN/*圈子*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,delete_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"logo_path":"',IFNULL(p.logo_path,''),
									'","group_name":"',IFNULL(p.group_name,''),
									'","summary":"',IFNULL(p.summary,''),
									'","member_nbr":"',IFNULL(p.member_nbr,''),
									'","activity_score":"',IFNULL(p.activity_score,''),
									'","followspend":"',IFNULL(followspend,''),
									'"}') as json,dsend_username,ddelete_date
									from  GroupInfo p left join (select (count(*) * In_groupConfig )
									as followspend,attention_id from PersonalGroupFollow 
									where attention_id = dmsg_id and active = 1) as f 
									on p.id = f.attention_id where p.id = dmsg_id;

								
							ELSEIF dmsg_type=2 THEN/*活动*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,delete_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"active_name":"',IFNULL(p.active_name,''),
									'","address":"',IFNULL(p.address,''),
									'","begin_datetime":"',IFNULL(p.begin_datetime,''),
									'","report_datetime":"',IFNULL(p.report_datetime,''),
									'","member_count":"',IFNULL(p.join_member_nbr,''),
									'","prepay_nbr":"',IFNULL(p.prepay_nbr,''),
									'"}') as json,dsend_username,ddelete_date from Activity p where p.id=dmsg_id;

							ELSE/*好友*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,delete_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"logo_path":"',IFNULL(p.logo_small_path,''),
									'","name":"',IFNULL(p.name,''),
									'","contellation":"',IFNULL(n.contellation,''),
									'","place":"',IFNULL(n.current_place,''),
									'","home":"',IFNULL(n.home,''),
									'","school":"',IFNULL(n.school,''),
									'","work_place":"',IFNULL(n.work_place,''),
									'"}') as json,dsend_username,ddelete_date
									from PersonalProfile p join PersonalNameCard n
									ON p.user_id=n.user_id where p.user_id=dmsg_id;
								
							END IF;
			END LOOP ordernumbers;

		CLOSE ordernumbers;

	END;

	BEGIN

	CALL p_wanerdaopages('tem_listtable','*','','delete_date','1',In_currentPage,In_pageSize);

	END;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetMayKnowFrieds`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetMayKnowFrieds`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetMayKnowFrieds`(In_user_id varchar(50))
    COMMENT '主页--获取可能认识的好友'
BEGIN
#第一类 根据学校背景 专业背景
DECLARE m_school varchar(50);
DECLARE m_discipline varchar(50);

#第二类 根据现在居住地 
DECLARE m_current_place varchar(100);

#第三类 根据来源地
DECLARE m_home varchar(100);

#第四类 根据兴趣爱好
DECLARE m_hobby varchar(100);


#赋值
SELECT school_name,major into m_school,m_discipline from PersonalEducation 
where use_id=In_user_id and active=true limit 1; 

select current_place,home into m_current_place,m_home from PersonalNameCard where user_id=In_user_id   
and active=true limit 1;    

select hobby into m_hobby from PersonalInterests where user_id=In_user_id and active=true limit 1;  # 4类

#查询

(select pp.user_id,pp.logo_small_path,pp.name from personalprofile pp inner join PersonalEducation pe
on pp.user_id=pe.use_id where pe.school_name like CONCAT("'%",m_school,"%'") and pe.major like CONCAT('%',m_discipline,'%')
and pe.permission=GetPublicPermission() and pp.active=true and pe.active=true limit 4)
UNION
(select pp.user_id,pp.logo_small_path,pp.name from personalprofile pp inner join PersonalNameCard pc
on pp.user_id=pc.user_id where pc.current_place like CONCAT("'%",m_current_place,"%'")
and pc.is_available=true and pp.active=true limit 4)
UNION
(select pp.user_id,pp.logo_small_path,pp.name from personalprofile pp inner join PersonalNameCard pc
on pp.user_id=pc.user_id where pc.home like CONCAT("'%",m_home,"%'")
and pc.is_available=true and pp.active=true limit 4)
UNION
(select pp.user_id,pp.logo_small_path,pp.name from personalprofile pp inner join PersonalInterests pi
on pp.user_id=pi.user_id where pi.hobby like CONCAT("'%",m_hobby,"%'")
and pi.permission=GetPublicPermission() and pi.active=true limit 4);

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_getMsgRubbishList`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_getMsgRubbishList`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_getMsgRubbishList`(In_optionid int,In_userid varchar(40),IN_pagecurrent VARCHAR(1024),IN_pageSize  VARCHAR(1024))
    COMMENT '站内信息  获取信息垃圾箱列表数据  带分页'
BEGIN
/*from_where  1发件箱 2收件箱 3草稿箱 */
drop table if exists tem_mytab;
create TEMPORARY TABLE tem_mytab(
	id VARCHAR(40),mailstate INT,from_where INT,
	is_mark TINYINT,send_username varchar(40),content VARCHAR(40),delete_date datetime
);
	BEGIN 
/*	DECLARE mysql VARCHAR(200); 
	SET mysql='select id, from inboxmessage';
	set @mysql='sds';*/
	IF In_optionid = 0 THEN/*全部*/
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,2 as from_where,is_mark,getusernamebyid(from_id) as from_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from inboxmessage where active=1 and is_delete=TRUE and user_id=In_userid;
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,4 as mailstate,1 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from sendmessage where active=1 and is_delete=TRUE and user_id=In_userid;
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,3 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from DraftMessage where active=1 and is_delete=TRUE and user_id=In_userid;

	ELSEIF In_optionid = 1 then /*标记*/
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,2 as from_where,is_mark,getusernamebyid(from_id) as from_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from inboxmessage where active=1 and is_delete=TRUE and user_id=In_userid and is_mark=TRUE;
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,4 as mailstate,1 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from sendmessage where active=1 and is_delete=TRUE and user_id=In_userid and is_mark=TRUE;
	   insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,3 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from DraftMessage where active=1 and is_delete=TRUE and user_id=In_userid and is_mark=TRUE;

	ELSEIF In_optionid = 2 then/*未标记*/
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,2 as from_where,is_mark,getusernamebyid(from_id) as from_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from inboxmessage where active=1 and is_delete=TRUE and user_id=In_userid and (is_mark=FALSE or is_mark is NULL);
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,4 as mailstate,1 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from sendmessage where active=1 and is_delete=TRUE and user_id=In_userid and (is_mark=FALSE or is_mark is NULL);	 
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,3 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from DraftMessage where active=1 and is_delete=TRUE and user_id=In_userid and (is_mark=FALSE or is_mark is NULL);
ELSEIF In_optionid = 3 then/*来自发件箱*/
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,4 as mailstate,1 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from sendmessage where active=1 and is_delete=TRUE and user_id=In_userid;

ELSEIF In_optionid = 4 then/*来自已读收件箱*/
	   insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,2 as from_where,is_mark,getusernamebyid(from_id) as from_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from inboxmessage where active=1 and is_delete=TRUE and user_id=In_userid and is_read=TRUE;

ELSEIF In_optionid = 5 then/*来自未读收件箱*/
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,IFNULL(is_read,0) as is_read,2 as from_where,is_mark,getusernamebyid(from_id) as from_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from inboxmessage where active=1 and is_delete=TRUE and user_id=In_userid and (is_read=false or is_read is NULL);

else/*来自草稿箱*/
		 insert into tem_mytab(id,mailstate,from_where,is_mark,send_username,content,delete_date)
		 select id,3,3 as from_where,is_mark,getusernamebyid(send_id) as send_username,SUBSTR(content FROM 1 FOR 12) as content,delete_date from draftmessage where active=1 and is_delete=TRUE and (is_system=FALSE or is_system is null) and user_id=In_userid ;
 
end IF; 
CALL p_wanerdaopages('tem_mytab','*','','delete_date','1',IN_pagecurrent,IN_pageSize);
/*select * from tem_mytab;*/

drop table tem_mytab;
	END;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetSendInvitList`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetSendInvitList`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetSendInvitList`(In_userid varchar(40),In_option int,In_currentPage varchar(100),In_pageSize varchar(100),In_groupConfig double)
    COMMENT '获取发送的邀请列表 带分页  -- 站内消息'
BEGIN

drop table if exists tem_table;/*临时表*/

drop table if exists tem_listtable;/*临时输出表*/

CREATE TEMPORARY TABLE tem_table(
	id varchar(40),msg_type int,msg_id varchar(40),
  from_where int,send_username varchar(40),send_date datetime
); 

CREATE TEMPORARY TABLE tem_listtable(
	id varchar(40),from_where int,msg_type INT,json varchar(4000),
  send_username varchar(40),send_date datetime
); 
/*from_where 1w为发件箱  2为收件箱*/
IF In_option=0 THEN/*全部*/

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date)
		select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,send_date from sendinvitemessage
		where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid;

ELSEIF In_option=1 THEN/*个人邀请*/

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date) 
		select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,send_date from sendinvitemessage
		where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid  and msg_type=3;

ELSEIF In_option=2 THEN/*活动邀请*/

		insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date)
		select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,send_date from sendinvitemessage
		where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid and msg_type=2;

ELSE/*圈子邀请*/

	insert into tem_table(id,msg_type,msg_id,from_where,send_username,send_date) 
  select id,msg_type,msg_id,1 as from_where,getusernamebyid(send_id) as send_username,send_date from sendinvitemessage
	where (is_delete=FALSE or is_delete is null) and active=true and user_id=In_userid and msg_type=1;

END IF;

	BEGIN

		DECLARE did varchar(40);
	  DECLARE dfrom_where int;
		DECLARE dmsg_type INT;
		DECLARE dmsg_id varchar(40);
		DECLARE dsend_username  varchar(40);
		DECLARE dsend_date datetime;
		DECLARE no_more_departments INT;

		DECLARE ordernumbers CURSOR
		FOR SELECT id,msg_type,msg_id,from_where,send_username,send_date FROM tem_table;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET no_more_departments=1;

		OPEN ordernumbers;

			ordernumbers:LOOP
				/*	REPEAT*/
						 FETCH ordernumbers INTO did,dmsg_type,dmsg_id,dfrom_where,dsend_username,dsend_date; 
							IF no_more_departments THEN
								LEAVE ordernumbers;
							END IF;
			 
							IF dmsg_type=1 THEN/*圈子*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,send_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"logo_path":"',IFNULL(p.logo_path,''),
									'","group_name":"',IFNULL(p.group_name,''),
									'","summary":"',IFNULL(p.summary,''),
									'","member_nbr":"',IFNULL(p.member_nbr,''),
									'","activity_score":"',IFNULL(p.activity_score,''),
									'","followspend":"',IFNULL(followspend,''),
									'"}') as json,dsend_username,dsend_date
									from  GroupInfo p left join (select (count(*) * In_groupConfig )
									as followspend,attention_id from PersonalGroupFollow 
									where attention_id = dmsg_id and active = 1) as f 
									on p.id = f.attention_id where p.id = dmsg_id;

								
							ELSEIF dmsg_type=2 THEN/*活动*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,send_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"active_name":"',IFNULL(p.active_name,''),
									'","address":"',IFNULL(p.address,''),
									'","begin_datetime":"',IFNULL(p.begin_datetime,''),
									'","report_datetime":"',IFNULL(p.report_datetime,''),
									'","member_count":"',IFNULL(p.join_member_nbr,''),
									'","prepay_nbr":"',IFNULL(p.prepay_nbr,''),
									'"}') as json,dsend_username,dsend_date from Activity p where p.id=dmsg_id;

							ELSE/*好友*/

									INSERT into tem_listtable(id,from_where,msg_type,json,send_username,send_date)
									select did,dfrom_where,dmsg_type,CONCAT('{',
									'"logo_path":"',IFNULL(p.logo_small_path,''),
									'","name":"',IFNULL(p.name,''),
									'","contellation":"',IFNULL(n.contellation,''),
									'","place":"',IFNULL(n.current_place,''),
									'","home":"',IFNULL(n.home,''),
									'","school":"',IFNULL(n.school,''),
									'","work_place":"',IFNULL(n.work_place,''),
									'"}') as json,dsend_username,dsend_date
									from PersonalProfile p join PersonalNameCard n
									ON p.user_id=n.user_id where p.user_id=dmsg_id;
								
							END IF;
			END LOOP ordernumbers;

		CLOSE ordernumbers;

	END;

	BEGIN

	CALL p_wanerdaopages('tem_listtable','*','','send_date','1',In_currentPage,In_pageSize);

	END;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_GetUserFirends`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_GetUserFirends`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_GetUserFirends`(In_user_id varchar(40),In_name varchar(40))
    COMMENT '根据姓名查询用户好友'
select p.`name`,p.user_id,c.relation_name from personalfriends f
JOIN personalprofile p ON (f.relation_to_id=p.user_id and f.relation_from_id=In_user_id) 
JOIN friendsclass c on f.class_id=c.class_id where f.decline_duration=0  and f.active=1
and p.`name` LIKE  CONCAT('%',In_name,'%')
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_ImageSortOrderOfClick`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_ImageSortOrderOfClick`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_ImageSortOrderOfClick`(In_image_id varchar(40),type int)
    COMMENT '个人相册-点击上下图片排序'
BEGIN
/*0为向上点击  1为向下点击*/
declare prev_image_id varchar(40);
declare next_image_id varchar(40); 
declare image_sequence int;

set image_sequence=(select sequence from personalimage where id=In_image_id and active=true);

if type=0 then 
	set prev_image_id=(select id from personalimage where sequence < image_sequence ORDER BY sequence desc LIMIT 1);
	call P_ImageSortOrderOfDrag(In_image_id,prev_image_id);
else
	set next_image_id=(select id from personalimage where sequence > image_sequence ORDER BY sequence LIMIT 1);
	call P_ImageSortOrderOfDrag(In_image_id,next_image_id);
end if;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `P_ImageSortOrderOfDrag`
-- ----------------------------
DROP PROCEDURE IF EXISTS `P_ImageSortOrderOfDrag`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_ImageSortOrderOfDrag`(In_image_id varchar(40),In_target_id varchar(40))
    COMMENT '个人相册-鼠标拖动照片排序'
BEGIN
DECLARE thisImage_sort_id INTEGER;
DECLARE targetIamge_sort_id INTEGER;
/*In_image_id 鼠标要拖动的图片id   In_target_id 鼠标停留的图片的id*/
if In_image_id<>In_target_id THEN

	SET thisImage_sort_id= (SELECT sequence from personalimage where id=In_image_id and active=true);
	SET targetIamge_sort_id=( SELECT sequence from personalimage where id=In_target_id and active=true);

	if thisImage_sort_id>targetIamge_sort_id then

		UPDATE personalimage SET sequence=(sequence+1) where sequence between targetIamge_sort_id AND thisImage_sort_id;
		UPDATE personalimage SET sequence=targetIamge_sort_id WHERE id= In_image_id;
	else

		UPDATE personalimage SET sequence=(sequence-1) where sequence between thisImage_sort_id AND targetIamge_sort_id ;
		UPDATE personalimage SET sequence=targetIamge_sort_id WHERE id= In_image_id;
	end if;

end if;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_ImageSortOrderOfInput`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_ImageSortOrderOfInput`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_ImageSortOrderOfInput`(In_image_id varchar(40),In_inputSort_id int)
    COMMENT '个人相册-相片输入排序号进行排序'
BEGIN

DECLARE currentImg_sortId INTEGER;

SET currentImg_sortId= (SELECT sequence from personalimage where id=In_image_id and active=true);

IF currentImg_sortId <> In_inputSort_id THEN
	IF currentImg_sortId > In_inputSort_id THEN
		UPDATE personalimage SET sequence=(sequence+1) where sequence between In_inputSort_id AND currentImg_sortId;
		UPDATE personalimage SET sequence=In_inputSort_id WHERE id= In_image_id;
	ELSE 
		UPDATE personalimage SET sequence=(sequence-1) where sequence between currentImg_sortId AND In_inputSort_id ;
		UPDATE personalimage SET sequence=In_inputSort_id WHERE id= In_image_id;
	END if;
END IF;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_ReplyMessage`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_ReplyMessage`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_ReplyMessage`(In_fromwhere int,In_parentid varchar(40),In_recPersonid varchar(40),In_reccontent varchar(3000))
BEGIN
	select "";
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_RepresentImageFolder`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_RepresentImageFolder`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_RepresentImageFolder`(In_guid varchar(40),In_user_id varchar(40)/*转发人id*/,In_imagefolder_id varchar(40)/*转发相册的id*/,In_isCreateNewFolder tinyint/*是否创建新相册*/,In_folderNameOrID varchar(40),In_permission varchar(400))
    COMMENT '个人相册-转发相册'
BEGIN
/*
	!!注意!!   
	
	In_folderNameOrID 如果 In_isCreateNewFolder 为 true(1) 代表新创建相册的名称,为false(0)表示转
	发到自己的那个相册的id

	In_isCreateNewFolder 代表转发的时候是否创建相册 如果为true(1)则代表创建新相册,那么In_folderNameOrID就是
	创建新相册的名称(新相册创建默认权限为公共(GetPublicPermission())),如果为false(0)则代表转发到
	已经存在的某个相册里面,那么In_folderNameOrID就是此相册的id
*/
DECLARE NewFolderGuid varchar(40);
/*DECLARE no_more_departments INT;

DECLARE temp_link_id VARCHAR(40);
DECLARE temp_image_path VARCHAR(200);
DECLARE temp_image_name VARCHAR(60);
DECLARE temp_image_small_path VARCHAR(200);
DECLARE temp_fileSize DOUBLE;
DECLARE temp_sequence INT;
DECLARE temp_description TEXT;
DECLARE temp_weather VARCHAR(20);
DECLARE temp_location VARCHAR(256);
DECLARE temp_upload_date DateTime;
DECLARE temp_permission VARCHAR(40);*/

DECLARE stmt VARCHAR(2000);


if In_isCreateNewFolder THEN/*创建新相册 */
set NewFolderGuid=In_guid;
insert into ImageFolder(id,user_id,folder_name,share_key_id,create_date,description,is_system,permission) 
values(NewFolderGuid,In_user_id,In_folderNameOrID,-1,now(),'转发建立的相册',false,GetPublicPermission());
set @temp_SQL =CONCAT('insert into personalimage(id,user_id,link_id,fold_id,image_path,image_name,
        image_small_path,fileSize,sequence,description,weather,
        location,upload_date,is_cover,is_submit,counter,permission)
				select \'',GetGuid(),'\' as id,\'',In_user_id,'\' as user_id,link_id,\'',NewFolderGuid,'\' as fold_id,
				image_path,image_name,image_small_path,fileSize,sequence,description,weather,
        location,upload_date,is_cover,is_submit,counter,\'GetPublicPermission()\' as permission
				from personalimage where fold_id=\'',In_imagefolder_id,'\' and active=true ',In_permission);

else /*不创建新相册*/

set @temp_SQL =CONCAT('set @i=(select max(IFNULL(sequence,0)) from PersonalImage where fold_id=\'',In_folderNameOrID,')\';',
				'insert into personalimage(id,user_id,link_id,fold_id,image_path,image_name,
        image_small_path,fileSize,sequence,description,weather,
        location,upload_date,is_cover,is_submit,counter,permission)
				select \'',GetGuid(),'\' as id,\'',In_user_id,'\' as user_id,link_id,\'',In_folderNameOrID,'\' as fold_id,
				image_path,image_name,image_small_path,fileSize,(@i:=@i+1) as sequence,description,weather,
        location,upload_date,is_cover,is_submit,counter,\'GetPublicPermission()\' as permission
				from personalimage where fold_id=\'',In_imagefolder_id,'\' and active=true ',In_permission);
end if;
prepare stmt from @temp_SQL;
execute stmt;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_RepresentVideoFolder`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_RepresentVideoFolder`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_RepresentVideoFolder`(In_guid varchar(40),In_user_id varchar(40)/*转发人id*/,In_imagefolder_id varchar(40)/*转发视频册的id*/,In_isCreateNewFolder tinyint/*是否创建新视频册*/,In_folderNameOrID varchar(40),In_permission varchar(400))
    COMMENT '转发视频相册'
BEGIN
/*
	!!注意!!   
	
	In_folderNameOrID 如果 In_isCreateNewFolder 为 true(1) 代表新创建视频册的名称,为false(0)表示转
	发到自己的那个相册的id

	In_isCreateNewFolder 代表转发的时候是否创建视频册 如果为true(1)则代表创建新视频册,那么In_folderNameOrID就是
	创建新视频册的名称(新相册创建默认权限为公共(GetPublicPermission())),如果为false(0)则代表转发到
	已经存在的某个视频册里面,那么In_folderNameOrID就是此视频册的id
*/
DECLARE NewFolderGuid varchar(40);

DECLARE stmt VARCHAR(2000);


if In_isCreateNewFolder THEN/*创建新视频册 */
set NewFolderGuid=In_guid;
insert into VideoFolder(id,user_id,folder_name,create_date,description,is_system,permission) 
values(NewFolderGuid,In_user_id,In_folderNameOrID,now(),'转发建立的视频册',false,GetPublicPermission());
set @temp_SQL =CONCAT('insert into PersonalVideo(id,user_id,fold_id,source,video_name,video_link,video_path,
           video_code,sequence,description,weather,location,upload_date,counter,permission)
				select \'',GetGuid(),'\' as id,\'',In_user_id,'\' as user_id,\'',NewFolderGuid,'\' as fold_id,source,
				video_name,video_link,video_path,video_code,sequence,description,weather,
        location,upload_date,counter,\'GetPublicPermission()\' as permission
				from PersonalVideo where fold_id=\'',In_imagefolder_id,'\' and active=true ',In_permission);

else /*不创建新相册*/

set @temp_SQL =CONCAT('set @i=(select max(IFNULL(sequence,0)) from PersonalVideo where fold_id=\'',In_folderNameOrID,')\';',
				'insert into PersonalVideo(id,user_id,fold_id,source,video_name,video_link,video_path,
           video_code,sequence,description,weather,location,upload_date,counter,permission)
				select \'',GetGuid(),'\' as id,\'',In_user_id,'\' as user_id,\'',In_folderNameOrID,'\' as fold_id,source,
				video_name,video_link,video_path,video_code,(@i:=@i+1) as sequence,description,weather,
        location,upload_date,counter,\'GetPublicPermission()\' as permission
				from PersonalVideo where fold_id=\'',In_imagefolder_id,'\' and active=true ',In_permission);
end if;
prepare stmt from @temp_SQL;
execute stmt;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_SavaSysDrafMsg`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_SavaSysDrafMsg`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_SavaSysDrafMsg`(IN_id varchar(40),IN_user_id varchar(40),IN_draft_date datetime,IN_content varchar(2000),IN_is_system tinyint,IN_is_msg tinyint)
    COMMENT '站内消息 发送消息系统自动保存'
IF EXISTS(SELECT id FROM draftmessage WHERE user_id=IN_user_id AND
 is_system=TRUE) THEN 
BEGIN
set @myid=(SELECT id FROM draftmessage WHERE user_id=IN_user_id AND
 is_system=TRUE);
UPDATE draftmessage set content=IN_content where id=@myid;
END;
ELSE

BEGIN
INSERT INTO draftmessage(id,user_id,draft_date,content,is_system,is_msg) VALUES
(IN_id,IN_user_id,IN_draft_date,IN_content,IN_is_system,IN_is_msg);
END;

END IF
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_SendInviteMsg`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_SendInviteMsg`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_SendInviteMsg`(In_from_user_id varchar(40),In_user_id varchar(40),In_msg_type tinyint,In_msg_id varchar(40),In_send_date datetime)
    COMMENT '站内消息  发送邀请'
BEGIN
DECLARE uid varchar(40);
DECLARE no_more_departments INT;
DECLARE ordernumbers CURSOR
FOR SELECT user_id FROM groupmember where group_id=In_user_id;/*In_user_id存的为圈子id*/
DECLARE CONTINUE HANDLER FOR NOT FOUND SET no_more_departments=1;
SET no_more_departments=0; 
/*SET @In_user_Name=(select name from personalprofile where user_id=In_user_id);*/
OPEN ordernumbers;
REPEAT
	 FETCH ordernumbers INTO uid; 
	/* insert into SendInviteMessage(id,user_id,send_id,send_username,msg_type,msg_id,send_date)
   values(In_id,In_user_id,uid,uname,In_msg_type,In_msg_id,In_send_date);*/

	 insert into InboxInviteMessage(id,user_id,from_id,msg_type,msg_id,send_date)
   values((Replace(uuid(),'-','')),uid,In_from_user_id,In_msg_type,In_msg_id,In_send_date);
	/* INSERT into sendinvitemessagereceiverlist(message_id,send_type_id,send_id)
	 VALUES(In_id,In_msg_type,uid);*/
UNTIL no_more_departments
END REPEAT;
CLOSE ordernumbers;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_SysDrafBlog`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_SysDrafBlog`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_SysDrafBlog`(IN_user_id varchar(40),IN_title varchar(60),IN_content varchar(4000))
    COMMENT '保存日志系统草稿'
IF EXISTS(SELECT id FROM PersonalBlogDraft WHERE user_id=IN_user_id AND
 is_system=TRUE) THEN 
BEGIN
set @myid=(SELECT id FROM PersonalBlogDraft WHERE user_id=IN_user_id AND
 is_system=TRUE);
UPDATE PersonalBlogDraft set title=IN_title,content=IN_content,save_date=now() where id=@myid;
END;
ELSE

BEGIN
INSERT INTO PersonalBlogDraft(id,user_id,title,content,is_system,save_date) VALUES
(GetGuid(),IN_user_id,IN_title,IN_content,TRUE,now());
END;
END IF
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for `p_wanerdaopages`
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_wanerdaopages`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_wanerdaopages`(IN _tblName VARCHAR(1024),
	/*表名*/
	IN _fldName VARCHAR(1024),
	/*查询字段*/
	IN _where VARCHAR(1024),
	/*WHERE条件(包含WHERE关键字,可为空)*/
	IN _fldSortId VARCHAR(128),
	/*排序条件(包含ORDER关键字,可为空)*/
	IN _sort VARCHAR(128),
	/*0升序 1倒序*/
	IN _pagecurrent VARCHAR(1024),
	/*当前页*/
	IN _pageSize  VARCHAR(1024))
    COMMENT '分页存储过程'
BEGIN
	/*定义变量*/
	DECLARE
		m_begin_row INT ; DECLARE
			m_limit_string VARCHAR(64); /*构造语句*/
			/*	确保索引正确	*/
		IF _pageSize <= 1 THEN

		SET _pageSize = 10 ;
		END
		IF ;
		IF _pagecurrent < 1 THEN

		SET _pagecurrent = 1 ;
		END
		IF ;
		SET m_begin_row =(_pagecurrent - 1)* _pageSize ;
		SET m_limit_string = CONCAT(
			' LIMIT ',
			m_begin_row,
			', ',
			_pageSize
		);
		IF _fldSortId <> '' THEN

		SET _fldSortId = CONCAT(' order by ', _fldSortId);
		IF _sort THEN

		SET _fldSortId = CONCAT(_fldSortId, ' asc');
		ELSE

		SET _fldSortId = CONCAT(_fldSortId, ' desc');
		END
		IF ;
		END
		IF ;
		IF _where <> '' THEN

		SET _where = CONCAT('WHERE 1=1 ', _where);
		END
		IF ;
		SET @COUNT_STRING = CONCAT(
			'SELECT COUNT(1) INTO @ROWS_TOTAL FROM ',
			_tblName,
			' ',
			_where
		);
		SET @MAIN_STRING = CONCAT(
			'SELECT ',
			_fldName,
			' FROM ',
			_tblName,
			' ',
			_where,
			' ',
			_fldSortId,
			m_limit_string
		); /*预处理 */

		PREPARE count_stmt
		FROM
			@COUNT_STRING ; EXECUTE count_stmt ; DEALLOCATE PREPARE count_stmt ;
		/*SET total = @ROWS_TOTAL ;*/SELECT @ROWS_TOTAL as ToTal;  PREPARE main_stmt
		FROM
			@MAIN_STRING ; EXECUTE main_stmt ; DEALLOCATE PREPARE main_stmt ;
 END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `GetFullCountryByid`
-- ----------------------------
DROP FUNCTION IF EXISTS `GetFullCountryByid`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetFullCountryByid`(homecountry varchar(150), homestate varchar(150), homecity varchar(150)) RETURNS varchar(100) CHARSET utf8
    COMMENT '根据国家,州,城市id 获取全称'
BEGIN
DECLARE home1 varchar(50);
DECLARE home2 varchar(50);
DECLARE home3 varchar(50);

set home1 = '';

if homecountry != '' THEN
	set home1=(select country_name from country where country_id=homecountry and language_id = languageId);
	if homestate != '' THEN
		SET home1=CONCAT(home1,' ', (SELECT state_name from state where  state_id=homestate and language_id = languageId)) ;
		if homecity != '' THEN
			set home1 = CONCAT(home1,' ',(SELECT city_name  from city where  city_id=homecity and language_id = languageId )) ;
		end if;
	end IF;
end IF;
return home1;
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `GetGuid`
-- ----------------------------
DROP FUNCTION IF EXISTS `GetGuid`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetGuid`() RETURNS varchar(40) CHARSET utf8
    COMMENT '获取不带"-"的GUID'
BEGIN
DECLARE id VARCHAR(40);
SET id=(SELECT Replace(uuid(),'-',''));
return id;
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `GetImageFolderCover`
-- ----------------------------
DROP FUNCTION IF EXISTS `GetImageFolderCover`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetImageFolderCover`(In_folder_id varchar(40),In_default_path varchar(500)) RETURNS varchar(500) CHARSET utf8
    COMMENT '个人相册-获取相册封面'
BEGIN
declare returnpath varchar(500);
declare count int;
set returnpath = (select image_small_path from personalimage where fold_id=In_folder_id and active=true and is_cover=true LIMIT 1);
if returnpath<>"" then 
return returnpath;
ELSE
begin
		set count=(select count(*) from personalimage where fold_id=In_folder_id and active=true);
		if count=0 then
			RETURN In_default_path;
		ELSE
			begin
			set returnpath= (select image_small_path from personalimage where fold_id=In_folder_id and active=true ORDER BY upload_date limit 1);
			return returnpath;
			end;
		end if;
end;
end if;
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `GetUserNameById`
-- ----------------------------
DROP FUNCTION IF EXISTS `GetUserNameById`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetUserNameById`(In_user_id varchar(40)) RETURNS varchar(50) CHARSET utf8
    COMMENT '根据用户id获取用户姓名'
begin
declare uname varchar(50);
select name into uname from personalprofile where user_id=In_user_id;
return uname;
end
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `User_Permission`
-- ----------------------------
DROP FUNCTION IF EXISTS `User_Permission`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `User_Permission`(user_id varchar(40),permission varchar(40),guest_id varchar(40)) RETURNS tinyint(4)
BEGIN
/*
	user_id 当前用户id, permission 当前用户设置的权限, guest_id 访客的id
*/
DECLARE RESULT TINYINT;

IF permission=GetPublicPermission() THEN
SET RESULT=TRUE;

ELSEIF permission = 'd52dedfa912111e0bae500210044b80f' AND
EXISTS(select id from PersonalFriends where active = 1
and relation_from_id = user_id and relation_to_id = guest_id ) THEN
SET RESULT=TRUE;

ELSEIF permission = 'd53c16fe912111e0bae500210044b80f' AND 
EXISTS(select id from PersonalFriends where  active = 1
and relation_from_id = user_id and relation_to_id = guest_id ) THEN
SET RESULT=TRUE;

ELSEIF permission = 'd53c16fe912111e0bae500210044b80f' AND
EXISTS(select id from PersonalFriends where active = 1
and relation_from_id = user_id and relation_to_id in
(select relation_from_id from PersonalFriends where active=1 and relation_to_id = guest_id)) THEN
SET RESULT=TRUE;

ELSEIF user_id=guest_id THEN
SET RESULT=TRUE;

ELSE
SET RESULT=FALSE;

END IF;

RETURN RESULT;
END
;;
DELIMITER ;
DELIMITER ;;
CREATE TRIGGER `DeleteInviteList` BEFORE DELETE ON `sendinvitemessage` FOR EACH ROW begin
set @id=old.id;
delete from sendinvitemessagereceiverlist where message_id=@id;
end
;;
DELIMITER ;
DELIMITER ;;
CREATE TRIGGER `DeleteSendMsgList` BEFORE DELETE ON `sendmessage` FOR EACH ROW begin
set @id=old.id;
delete from sendmessagereceiverlist where message_id=@id;
end
;;
DELIMITER ;


-- ----------------------------
-- Function structure for `GetPublicPermission`
-- ----------------------------
DROP FUNCTION IF EXISTS `GetPublicPermission`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `User_Permission`() RETURNS  varchar(40)
BEGIN
return "ce5e9318-a617-11e1-aa1f-101f74b66417";
END;;
DELIMITER ;