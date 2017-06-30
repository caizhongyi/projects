(function( $ ){
	var DotA = {};
	// 分类筛选;
	DotA.Select = function(){
		var Label = $("#Select-label li"), List = $("#Hero-list li");
		Label.click(function(){
			var thas = $(this), Aarr = [];
			Label.eq(0).removeClass("select");
			if( thas.hasClass("select") ){
				thas.removeClass("select");
			}else{
				thas.addClass("select");
			}
			// 串连标签;
			var A_label = $("#Select-label .select");
			A_label.each(function(){
				Aarr.push($.trim( $(this).text() ));
			});
			// 显示所有;
			if(thas.text() == "所有酒馆" || Aarr.length == 0){
				List.removeClass("notype");
				Label.removeClass("select").eq(0).addClass('select');
				return ;
			};
			// 筛选英雄;
			List.each(function(){
				var obj = $(this), T_label = obj.attr("data-type"), k = true;
				for(var i = 0; i < Aarr.length; i++){
					if(T_label.indexOf(Aarr[i]) == -1){
						k = false;
						continue;
					}
				}
				if(k){
					obj.removeClass("notype");
				}else{
					obj.addClass("notype");
				}
			});
			//console.log(Aarr);
			
		});
		
	};
	
	DotA.Select();
	
		
	var list = $("#Hero-list img");
	list.attr("alt", function(){
		var thas = $(this);
		thas.attr("data-alt", thas.attr("alt"));
		thas.removeAttr("alt");
	});
	
	// 移入;
	list.mouseover(function(){
		var thas = $(this).parent().parent();
		list.data.heroPic = $(this).attr('src').replace('_sb.png','_hphover.png');
		if(!$(".DotA2-Pop").length){
			$("body").append('<div class="DotA2-Pop"></div>');
		}
		$(".DotA2-Pop").html($(this).attr("data-alt") + "：数据加载中...");
		list.ajax( thas.attr("data-heroid") );
	});
	
	// 移动时;
	list.mousemove(function(e){
		//console.log(e);
		var thas = $(this), Pop = $(".DotA2-Pop");
		var arr = [], box_w = Pop.innerWidth(), win_w = $(window).width();
		if((box_w + e.pageX + 20) > win_w){
			arr[0] = e.pageX - ((box_w + e.pageX + 20) - win_w);
		}else{
			arr[0] = e.pageX + 20;
		}
		Pop.show().css({"left":arr[0],"top":e.pageY + 20});
	});
	
	// 移开;
	list.mouseout(function(){
		$(".DotA2-Pop").hide();
	});
	
	list.data = {};
	//显示英雄信息;
	list.ajax = function( id ){
		var hid = "hero" + id;
		if(list.data[hid] != undefined){
			list.Pop(hid);
		}else{
			/* $.ajax({
					url: "",
					data:"heroID=" + id,
					dataType: "json",
					success: function( data ){
						list.data[hid] = data;
						list.Pop(hid);
					},
					error: function( e ){
						console.log( e );
					}
				});*/
			var dotaData = {"heroData":{"ChangeHeroId":3,"TheFight":7,"Specialty":"辅助英雄,Gank,先手,中单,线上","HeroAttr":null,"EnName":"Bane","HeroAttribute":"","OrderID":0,"Version":"","HeroID":78,"ColumnID":11,"Name":"痛苦之源","HeroSuoXie":"Bane,be","HeroIcon":"http://dota2.replays.net/hero/images/c73b7b15-dedc-4ddc-b361-9fa34bf42a42.jpg","Summary":"如果神做了噩梦，那一定是祸乱之源带来的。被称为阿特洛波斯的祸乱之源诞生自夜之女神妮塔莎午夜的恐惧。永生的女神在漫长的时间中孕育了过强的恐惧，已经无法用睡眠抑制，于是，祸乱之源从女神的躯体中逃脱了，他雾状的身形源自女神墨色的鲜血。他的存在就是恐惧本身。听见他声音的凡人会感觉他们心中最阴暗的秘密在耳边低语。他呼唤着所有英雄内心隐藏的恐惧。就算不眠亦无济于事，因为祸乱之源会用它不停滴落的黑色血液把敌人困在噩梦中。只要祸乱之源一出现，所有英雄心中都会想那可怖的黑暗。","HeroCode":"","Dps":2,"Push":2,"Gank":8,"Assistant":3,"Rd":3,"CallArticleCode":"2745","CallVideoCode":"2575","PlayerReg":"痛苦之源","OccupationReg":"DOTA2中的痛苦之源T住的人会飞起来看上去，而且身上有被睡的BUFF。而被削弱攻击的单位头上会有标志显示。至于大招当然也会有BUFF提示还有多久，让你知道自己下一个技能的使用时间。"},"heroSkill":[{"ChangeSkillId":0,"SkillID":299,"HeroID":78,"SouXie":"E","Summary":"<div class=\"H_SkillIntro\">虚弱一个敌方单位，降低它的物理攻击力，持续20秒。施法距离：1000虚弱效果将无法被驱散（幻影斧，黑皇杖等物品也无法驱散）</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">等级1</span> - 减少30的攻击力，降低1点/秒的生命回复速度。<br />\n<span class=\"stxt1\">等级2</span> - 减少60的攻击力，降低2点/秒的生命回复速度。<br />\n<span class=\"stxt1\">等级3</span> - 减少90的攻击力，降低3点/秒的生命回复速度。<br />\n<span class=\"stxt1\">等级4</span> - 减少120的攻击力，降低4点/秒的生命回复速度。</div>\n<div class=\"H_SkillAdd\">等级1: 魔法消耗125点，施法间隔10秒。<br />\n等级2: 魔法消耗125点，施法间隔10秒。<br />\n等级3: 魔法消耗125点，施法间隔10秒。<br />\n等级4: 魔法消耗125点，施法间隔10秒。</div>","SkillIcon":"http://dota2.replays.net/hero/images/82f4cb30-cc95-4de8-b3cb-e306167beba7.jpg","OrderID":0,"Name":"虚弱"},{"ChangeSkillId":0,"SkillID":300,"HeroID":78,"SouXie":"B","Summary":"<div class=\"H_SkillIntro\">暴食一个敌方单位的生命能量，造成伤害并回复自身等量生命值。施法距离：600 英雄攻击 魔法伤害</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">等级1</span> - 瞬间汲取90点的生命。<br />\n<span class=\"stxt1\">等级2</span> - 瞬间汲取160点的生命。<br />\n<span class=\"stxt1\">等级3</span> - 瞬间汲取230点的生命。<br />\n<span class=\"stxt1\">等级4</span> - 瞬间汲取300点的生命。<br />\n</div>\n<div class=\"H_SkillAdd\">等级1: 魔法消耗125点，施法间隔14秒。<br />\n等级2: 魔法消耗150点，施法间隔14秒。<br />\n等级3: 魔法消耗175点，施法间隔14秒。<br />\n等级4: 魔法消耗200点，施法间隔14秒。</div>","SkillIcon":"http://dota2.replays.net/hero/images/87f3a8e7-3341-420f-8abe-9e571a3951a6.jpg","OrderID":0,"Name":"蚀脑"},{"ChangeSkillId":0,"SkillID":301,"HeroID":78,"SouXie":"T","Summary":"<div class=\"H_SkillIntro\">让目标敌方或者友方英雄进入沉睡并每秒造成伤害。睡着的单位受到攻击便会醒来，但噩梦将转移到攻击者身上。施法距离：500/550/600/650&nbsp; 祸乱之源现在有一个附属技能可以将自己从噩梦中唤醒</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">等级1</span> - 使目标（也可以是友方）进入突发性的睡眠，目标受到20点/秒的伤害。如果目标单位在噩梦期间被普通攻击唤醒，那么对其进行普通攻击的单位将因此受到噩梦的影响。持续4秒。<br />\n<span class=\"stxt1\">等级2</span> - 使目标（也可以是友方）进入突发性的睡眠，目标受到20点/秒的伤害。如果目标单位在噩梦期间被普通攻击唤醒，那么对其进行普通攻击的单位将因此受到噩梦的影响。持续5秒。<br />\n<span class=\"stxt1\">等级3</span> - 使目标（也可以是友方）进入突发性的睡眠，目标受到20点/秒的伤害。如果目标单位在噩梦期间被普通攻击唤醒，那么对其进行普通攻击的单位将因此受到噩梦的影响。持续6秒。<br />\n<span class=\"stxt1\">等级4</span> - 使目标（也可以是友方）进入突发性的睡眠，目标受到20点/秒的伤害。如果目标单位在噩梦期间被普通攻击唤醒，那么对其进行普通攻击的单位将因此受到噩梦的影响。持续7秒。<br />\n</div>\n<div class=\"H_SkillAdd\">等级1: 魔法消耗165点，施法间隔15秒。<br />\n等级2: 魔法消耗165点，施法间隔15秒。<br />\n等级3: 魔法消耗165点，施法间隔15秒。<br />\n等级4: 魔法消耗165点，施法间隔15秒。<br />\n</div>","SkillIcon":"http://dota2.replays.net/hero/images/9ae3cab4-a2dd-4197-bb36-229c8486cf4e.jpg","OrderID":0,"Name":"噩梦"},{"ChangeSkillId":0,"SkillID":302,"HeroID":78,"SouXie":"F","Summary":"<div class=\"H_SkillIntro\">持续施法-使用噩梦支配一个敌方单位，使其是去行动能力并持续受到大量伤害，同时每秒按照目标最大魔法比例吸取魔法值。持续5秒。神杖可以使大招时间增加为7秒。<br />\n神杖升级：提高每秒伤害，法力吸收量加倍，增加1秒持续时间。需要持续施法 牵制效果无视魔法免疫 施法距离：625</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">等级1</span> - 造成100点/秒的伤害。持续时间5(6)秒，同时吸收目标最大魔法值5%(10%)/秒的魔法。<br />\n<span class=\"stxt1\">等级2</span> - 造成155点/秒的伤害。持续时间5(6)秒，同时吸收目标最大魔法值5%(10%)/秒的魔法。<br />\n<span class=\"stxt1\">等级3</span> - 造成215点/秒的伤害。持续时间5(6)秒，同时吸收目标最大魔法值5%(10%)/秒的魔法。<br />\n</div>\n<div class=\"H_SkillAdd\">等级1: 魔法消耗200点，施法间隔100秒。<br />\n等级2: 魔法消耗300点，施法间隔100秒。<br />\n等级3: 魔法消耗400点，施法间隔100秒。</div>","SkillIcon":"http://dota2.replays.net/hero/images/1b129539-df4a-4d11-a61d-934fe6cdbe72.jpg","OrderID":0,"Name":"恶魔之握"}]}
			list.data[hid] = dotaData;
			list.Pop(hid);
		}
	};
	
	list.Pop = function(hid){
		var arr = ['<div class="Hero-home-pop">'], obj = list.data[hid].heroData;
		arr.push('<div class="Hero-home-pop-top Clear"><img class="fl" src="' + list.data.heroPic + '" alt="' + obj.Name + '">');
		arr.push('<dl><dt>'+ obj.Name + ' - <em>'+ obj.EnName +'</em></dt><dd><strong>英雄统称：</strong>('+ obj.HeroSuoXie +')</dd><dd><strong>英雄定位：</strong>' + obj.Specialty + '</dd></dl></div>');
		arr.push('<div class="Hero-home-pop-index Clear">');
		arr.push('<dl><dt>DPS指数：</dt><dd class="exp-1"><span><i style="width:' + obj.Dps + '0%;">DPS指数：' + obj.Dps + '</i></span></dd></dl>');
		arr.push('<dl><dt>Push指数：</dt><dd class="exp-2"><span><i style="width:' + obj.Push + '0%;">Push指数：' + obj.Push + '</i></span></dd></dl>');
		arr.push('<dl><dt>Gank指数：</dt><dd class="exp-3"><span><i style="width:' + obj.Gank + '0%;">Gank指数：' + obj.Gank + '</i></span></dd></dl>');
		arr.push('<dl><dt>辅助指数：</dt><dd class="exp-4"><span><i style="width:' + obj.Assistant + '0%;">辅助指数：' + obj.Assistant + '</i></span></dd></dl>');
		arr.push('<dl><dt>肉盾指数：</dt><dd class="exp-5"><span><i style="width:' + obj.Rd + '0%;">肉盾指数：' + obj.Rd + '</i></span></dd></dl>');
		arr.push('<dl><dt>团战指数：</dt><dd class="exp-6"><span><i style="width:' + obj.TheFight + '0%;">团战指数：' + obj.TheFight + '</i></span></dd></dl>');
		arr.push('</div><div class="DotA2-copyright">HTTP://DotA2.<em>766</em>.com/</div></div>');
		$(".DotA2-Pop").html(arr.join(''));
		//console.log( obj );
	};
})( jQuery );
