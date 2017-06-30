(function( $ ){
	var DotA = {};
	// ����ɸѡ;
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
			// ������ǩ;
			var A_label = $("#Select-label .select");
			A_label.each(function(){
				Aarr.push($.trim( $(this).text() ));
			});
			// ��ʾ����;
			if(thas.text() == "���оƹ�" || Aarr.length == 0){
				List.removeClass("notype");
				Label.removeClass("select").eq(0).addClass('select');
				return ;
			};
			// ɸѡӢ��;
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
	
	// ����;
	list.mouseover(function(){
		var thas = $(this).parent().parent();
		list.data.heroPic = $(this).attr('src').replace('_sb.png','_hphover.png');
		if(!$(".DotA2-Pop").length){
			$("body").append('<div class="DotA2-Pop"></div>');
		}
		$(".DotA2-Pop").html($(this).attr("data-alt") + "�����ݼ�����...");
		list.ajax( thas.attr("data-heroid") );
	});
	
	// �ƶ�ʱ;
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
	
	// �ƿ�;
	list.mouseout(function(){
		$(".DotA2-Pop").hide();
	});
	
	list.data = {};
	//��ʾӢ����Ϣ;
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
			var dotaData = {"heroData":{"ChangeHeroId":3,"TheFight":7,"Specialty":"����Ӣ��,Gank,����,�е�,����","HeroAttr":null,"EnName":"Bane","HeroAttribute":"","OrderID":0,"Version":"","HeroID":78,"ColumnID":11,"Name":"ʹ��֮Դ","HeroSuoXie":"Bane,be","HeroIcon":"http://dota2.replays.net/hero/images/c73b7b15-dedc-4ddc-b361-9fa34bf42a42.jpg","Summary":"���������ج�Σ���һ���ǻ���֮Դ�����ġ�����Ϊ�����岨˹�Ļ���֮Դ������ҹ֮Ů������ɯ��ҹ�Ŀ־塣������Ů����������ʱ���������˹�ǿ�Ŀ־壬�Ѿ��޷���˯�����ƣ����ǣ�����֮Դ��Ů��������������ˣ�����״������Դ��Ů��īɫ����Ѫ�����Ĵ��ھ��ǿ־屾�������������ķ��˻�о����������������������ڶ��ߵ��������������Ӣ���������صĿ־塣���㲻�����޼����£���Ϊ����֮Դ��������ͣ����ĺ�ɫѪҺ�ѵ�������ج���С�ֻҪ����֮Դһ���֣�����Ӣ�����ж������ǿɲ��ĺڰ���","HeroCode":"","Dps":2,"Push":2,"Gank":8,"Assistant":3,"Rd":3,"CallArticleCode":"2745","CallVideoCode":"2575","PlayerReg":"ʹ��֮Դ","OccupationReg":"DOTA2�е�ʹ��֮ԴTס���˻����������ȥ�����������б�˯��BUFF���������������ĵ�λͷ�ϻ��б�־��ʾ�����ڴ��е�ȻҲ����BUFF��ʾ���ж�ã�����֪���Լ���һ�����ܵ�ʹ��ʱ�䡣"},"heroSkill":[{"ChangeSkillId":0,"SkillID":299,"HeroID":78,"SouXie":"E","Summary":"<div class=\"H_SkillIntro\">����һ���з���λ������������������������20�롣ʩ�����룺1000����Ч�����޷�����ɢ����Ӱ�����ڻ��ȵ���ƷҲ�޷���ɢ��</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">�ȼ�1</span> - ����30�Ĺ�����������1��/��������ظ��ٶȡ�<br />\n<span class=\"stxt1\">�ȼ�2</span> - ����60�Ĺ�����������2��/��������ظ��ٶȡ�<br />\n<span class=\"stxt1\">�ȼ�3</span> - ����90�Ĺ�����������3��/��������ظ��ٶȡ�<br />\n<span class=\"stxt1\">�ȼ�4</span> - ����120�Ĺ�����������4��/��������ظ��ٶȡ�</div>\n<div class=\"H_SkillAdd\">�ȼ�1: ħ������125�㣬ʩ�����10�롣<br />\n�ȼ�2: ħ������125�㣬ʩ�����10�롣<br />\n�ȼ�3: ħ������125�㣬ʩ�����10�롣<br />\n�ȼ�4: ħ������125�㣬ʩ�����10�롣</div>","SkillIcon":"http://dota2.replays.net/hero/images/82f4cb30-cc95-4de8-b3cb-e306167beba7.jpg","OrderID":0,"Name":"����"},{"ChangeSkillId":0,"SkillID":300,"HeroID":78,"SouXie":"B","Summary":"<div class=\"H_SkillIntro\">��ʳһ���з���λ����������������˺����ظ������������ֵ��ʩ�����룺600 Ӣ�۹��� ħ���˺�</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">�ȼ�1</span> - ˲�伳ȡ90���������<br />\n<span class=\"stxt1\">�ȼ�2</span> - ˲�伳ȡ160���������<br />\n<span class=\"stxt1\">�ȼ�3</span> - ˲�伳ȡ230���������<br />\n<span class=\"stxt1\">�ȼ�4</span> - ˲�伳ȡ300���������<br />\n</div>\n<div class=\"H_SkillAdd\">�ȼ�1: ħ������125�㣬ʩ�����14�롣<br />\n�ȼ�2: ħ������150�㣬ʩ�����14�롣<br />\n�ȼ�3: ħ������175�㣬ʩ�����14�롣<br />\n�ȼ�4: ħ������200�㣬ʩ�����14�롣</div>","SkillIcon":"http://dota2.replays.net/hero/images/87f3a8e7-3341-420f-8abe-9e571a3951a6.jpg","OrderID":0,"Name":"ʴ��"},{"ChangeSkillId":0,"SkillID":301,"HeroID":78,"SouXie":"T","Summary":"<div class=\"H_SkillIntro\">��Ŀ��з������ѷ�Ӣ�۽����˯��ÿ������˺���˯�ŵĵ�λ�ܵ����������������ج�ν�ת�Ƶ����������ϡ�ʩ�����룺500/550/600/650&nbsp; ����֮Դ������һ���������ܿ��Խ��Լ���ج���л���</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">�ȼ�1</span> - ʹĿ�꣨Ҳ�������ѷ�������ͻ���Ե�˯�ߣ�Ŀ���ܵ�20��/����˺������Ŀ�굥λ��ج���ڼ䱻��ͨ�������ѣ���ô���������ͨ�����ĵ�λ������ܵ�ج�ε�Ӱ�졣����4�롣<br />\n<span class=\"stxt1\">�ȼ�2</span> - ʹĿ�꣨Ҳ�������ѷ�������ͻ���Ե�˯�ߣ�Ŀ���ܵ�20��/����˺������Ŀ�굥λ��ج���ڼ䱻��ͨ�������ѣ���ô���������ͨ�����ĵ�λ������ܵ�ج�ε�Ӱ�졣����5�롣<br />\n<span class=\"stxt1\">�ȼ�3</span> - ʹĿ�꣨Ҳ�������ѷ�������ͻ���Ե�˯�ߣ�Ŀ���ܵ�20��/����˺������Ŀ�굥λ��ج���ڼ䱻��ͨ�������ѣ���ô���������ͨ�����ĵ�λ������ܵ�ج�ε�Ӱ�졣����6�롣<br />\n<span class=\"stxt1\">�ȼ�4</span> - ʹĿ�꣨Ҳ�������ѷ�������ͻ���Ե�˯�ߣ�Ŀ���ܵ�20��/����˺������Ŀ�굥λ��ج���ڼ䱻��ͨ�������ѣ���ô���������ͨ�����ĵ�λ������ܵ�ج�ε�Ӱ�졣����7�롣<br />\n</div>\n<div class=\"H_SkillAdd\">�ȼ�1: ħ������165�㣬ʩ�����15�롣<br />\n�ȼ�2: ħ������165�㣬ʩ�����15�롣<br />\n�ȼ�3: ħ������165�㣬ʩ�����15�롣<br />\n�ȼ�4: ħ������165�㣬ʩ�����15�롣<br />\n</div>","SkillIcon":"http://dota2.replays.net/hero/images/9ae3cab4-a2dd-4197-bb36-229c8486cf4e.jpg","OrderID":0,"Name":"ج��"},{"ChangeSkillId":0,"SkillID":302,"HeroID":78,"SouXie":"F","Summary":"<div class=\"H_SkillIntro\">����ʩ��-ʹ��ج��֧��һ���з���λ��ʹ����ȥ�ж������������ܵ������˺���ͬʱÿ�밴��Ŀ�����ħ��������ȡħ��ֵ������5�롣���ȿ���ʹ����ʱ������Ϊ7�롣<br />\n�������������ÿ���˺��������������ӱ�������1�����ʱ�䡣��Ҫ����ʩ�� ǣ��Ч������ħ������ ʩ�����룺625</div>\n<div class=\"H_SkillLevel\"><span class=\"stxt1\">�ȼ�1</span> - ���100��/����˺�������ʱ��5(6)�룬ͬʱ����Ŀ�����ħ��ֵ5%(10%)/���ħ����<br />\n<span class=\"stxt1\">�ȼ�2</span> - ���155��/����˺�������ʱ��5(6)�룬ͬʱ����Ŀ�����ħ��ֵ5%(10%)/���ħ����<br />\n<span class=\"stxt1\">�ȼ�3</span> - ���215��/����˺�������ʱ��5(6)�룬ͬʱ����Ŀ�����ħ��ֵ5%(10%)/���ħ����<br />\n</div>\n<div class=\"H_SkillAdd\">�ȼ�1: ħ������200�㣬ʩ�����100�롣<br />\n�ȼ�2: ħ������300�㣬ʩ�����100�롣<br />\n�ȼ�3: ħ������400�㣬ʩ�����100�롣</div>","SkillIcon":"http://dota2.replays.net/hero/images/1b129539-df4a-4d11-a61d-934fe6cdbe72.jpg","OrderID":0,"Name":"��ħ֮��"}]}
			list.data[hid] = dotaData;
			list.Pop(hid);
		}
	};
	
	list.Pop = function(hid){
		var arr = ['<div class="Hero-home-pop">'], obj = list.data[hid].heroData;
		arr.push('<div class="Hero-home-pop-top Clear"><img class="fl" src="' + list.data.heroPic + '" alt="' + obj.Name + '">');
		arr.push('<dl><dt>'+ obj.Name + ' - <em>'+ obj.EnName +'</em></dt><dd><strong>Ӣ��ͳ�ƣ�</strong>('+ obj.HeroSuoXie +')</dd><dd><strong>Ӣ�۶�λ��</strong>' + obj.Specialty + '</dd></dl></div>');
		arr.push('<div class="Hero-home-pop-index Clear">');
		arr.push('<dl><dt>DPSָ����</dt><dd class="exp-1"><span><i style="width:' + obj.Dps + '0%;">DPSָ����' + obj.Dps + '</i></span></dd></dl>');
		arr.push('<dl><dt>Pushָ����</dt><dd class="exp-2"><span><i style="width:' + obj.Push + '0%;">Pushָ����' + obj.Push + '</i></span></dd></dl>');
		arr.push('<dl><dt>Gankָ����</dt><dd class="exp-3"><span><i style="width:' + obj.Gank + '0%;">Gankָ����' + obj.Gank + '</i></span></dd></dl>');
		arr.push('<dl><dt>����ָ����</dt><dd class="exp-4"><span><i style="width:' + obj.Assistant + '0%;">����ָ����' + obj.Assistant + '</i></span></dd></dl>');
		arr.push('<dl><dt>���ָ����</dt><dd class="exp-5"><span><i style="width:' + obj.Rd + '0%;">���ָ����' + obj.Rd + '</i></span></dd></dl>');
		arr.push('<dl><dt>��սָ����</dt><dd class="exp-6"><span><i style="width:' + obj.TheFight + '0%;">��սָ����' + obj.TheFight + '</i></span></dd></dl>');
		arr.push('</div><div class="DotA2-copyright">HTTP://DotA2.<em>766</em>.com/</div></div>');
		$(".DotA2-Pop").html(arr.join(''));
		//console.log( obj );
	};
})( jQuery );
