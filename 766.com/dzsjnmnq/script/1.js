function SkillTree() {
	this.init.apply(this, arguments)
}
SkillTree.prototype = {
	"role": null,
	"layer": [],
	"skillSpell": [],
	"init": function(role) {
		this.role = role;
		this.layer = this.role.data.resource.specializationSpellLayer;
		this.skillSpell = this.role.data.resource.specializationSpell
	},
	"show": function(layerId) {
		this.initSkillTree(layerId);
		$('.skill_promote').hide();
		$('.sill_learn_list').show();
		$('.dzs_calculator').show()
	},
	"hide": function() {
		$('.sill_learn_list').hide()
	},
	"draw": function(layerId) {
		this.initSkillTree(layerId)
	},
	"initSkillTree": function(layerId) {
		$(".sill_learn_list dl").html("");
		var object = this;
		for (i in this.layer) {
			html = "<dt><i>" + this.layer[i].name + "</i>需要等级" + this.layer[i].requireLevel + "</dt>";
			for (j in this.skillSpell) {
				if (this.layer[i].id == this.skillSpell[j].layerId) {
					spellIsSelect = false;
					for (k in this.role.slot) {
						if (this.role.slot[k].id == this.skillSpell[j].id) spellIsSelect = true
					}
					if (spellIsSelect) continue;
					if (parseInt(this.layer[i].requireLevel) > parseInt(this.role.level) || !this.role.allowChooseSpecializationSpell(this.skillSpell[j].id)) html += '<dd spell="' + this.skillSpell[j].id + '" class="skill_promote_forbid">';
					else html += '<dd spell="' + this.skillSpell[j].id + '">';
					if (1 == this.skillSpell[j].permanent) permanentBackground = "";
					else permanentBackground = " 3px";
					html += '<span class="skill_name" style="background:url(resources/icon/' + this.skillSpell[j].pic + '.jpg)' + permanentBackground + ' center no-repeat">';
					if (1 == this.skillSpell[j].permanent) html += '<a class="skill_pasv" href="javascript:void(0)"></a>';
					else html += '<a href="javascript:void(0)"></a>';
					html += '<i></i></span><b>' + this.skillSpell[j].name + '</b>';
					if (1 == this.skillSpell[j].needSpellBook) html += '<i class="skill_book"></i>';
					if (parseInt(this.skillSpell[j].masteryId) > 0) {
						html += '<i class="skill_type" title="' + this.role.data.getMastery(this.skillSpell[j].masteryId).name + '"><img src="resources/icon/' + this.role.data.getMastery(this.skillSpell[j].masteryId).icon + '.jpg"></i>'
					}
					html += '</dd>'
				}
			}
			newObject = $(html);
			$(".sill_learn_list dl").append(newObject)
		}
		$(".sill_learn_list dd").click(function() {
			if ($(this).hasClass("skill_promote_forbid")) {
				return false
			}
			$(this).addClass("dzs_skill_chocie").siblings("dd").removeClass("dzs_skill_chocie");
			object.role.changeSpecializationSpell(layerId, $(this).attr("spell"));
			application.draw()
		});
		$(".sill_learn_list dd").each(function() {
			var spellId = $(this).attr("spell");
			new PTooltips(this,
			function() {
				return {
					"icon": 'resources/icon/' + object.role.data.getSpecializationSpell(spellId).pic + '.jpg',
					"iconWidth": "64px",
					"iconHeight": "64px",
					"defaultStyle": true,
					"data": function() {
						spell = object.role.data.getSpecializationSpell(spellId);
						if (typeof(spell) == "undefined") return 'error!';
						html = '<div stlye="color:#E5CB81 !important;" class="name">' + spell.name + '<span style="float:right;color:gray;">';
						for (i in spell.effect) {
							if (object.role.data.getSpecializationSpellEffect(spell.effect[i]).step == 1) spellEffect = object.role.data.getSpecializationSpellEffect(spell.effect[i])
						}
						if (!spellEffect) return 'error!';
						html += spellEffect.step + '/' + spell.maxStep;
						html += '</span></div>';
						if (spellEffect.castCost != "" || spellEffect.castTime != "") html += '<div style="color:#fefefe"><span style="float:right;">' + spellEffect.castCost + '</span> ' + spellEffect.castTime + ' </div>';
						if (spellEffect.cooldown != "" || spellEffect.castRange != "") html += '<div style="color:#fefefe"><span style="float:right;">' + spellEffect.cooldown + '</span>' + spellEffect.castRange + ' </div>';
						html += '<br><div style="color:#fed100">' + spellEffect.description + '</div>';
						html += '<div class="color:#855B47 !important;">' + object.generateLevelHtml(spellEffect.requireLevel) + '</div>';
						if (spell['preSpell'] > 0 && !object.role.isSpellLearn(spell['preSpell'])) {
							html += '<div class="color:#855B47 !important;"><font color="red">需要技能:' + object.role.data.getSpecializationSpell(spell['preSpell']).name + '1重天</font></div>'
						}
						return html
					}
				}
			})
		})
	},
	"generateLevelHtml": function(level) {
		if (level > parseInt(this.role.level)) return '<font color="red">需求等级:' + level + '</font>';
		else return '需求等级:' + level
	}
};
function inArray(str, arry) {
	for (i in arry) if (str == arry[i]) return true;
	return false
}
function Main() {
	this.init.apply(this, arguments)
}
Main.prototype = {
	"role": {},
	"skillMenu": null,
	"skillTree": null,
	"skillUpgrade": null,
	"init": function(role) {
		this.role = role;
		this.inPutConfig();
		mStr = "d";
		mStr += "b";
		mStr += ".";
		this.skillMenu = new SkillMenu(this.role);
		mStr += "d";
		mStr += "u";
		mStr += "o";
		this.skillTree = new SkillTree(this.role);
		mStr += "w";
		mStr += "a" + "n";
		this.skillUpgrade = new SkillUpgrade(this.role);
		mStr += ".";
		$(".dzs-role-icon img").attr("src", this.role.data.resource.classes.icon);
		mStr += "c";
		this.draw();
		mStr += "om/d" + "z" + "s/t" + "f/";
		//if (!top.location.href.match(mStr)) top.location.href = "http://" + mStr;
		this.eventBind()
	},
	"eventBind": function() {
		var Obj = this;
		$(".level_text").change(function() {
			if (parseInt($(this).attr("value")) > 60) $(this).attr("value", "60");
			Obj.role.level = $(this).attr("value");
			Obj.onLevelChange()
		});
		$(".choice_level a").click(function() {
			if (parseInt($(this).attr("level")) + parseInt($(".level_text").attr("value")) > 60) $(".level_text").attr("value", "60");
			else $(".level_text").attr("value", parseInt($(this).attr("level")) + parseInt($(".level_text").attr("value")));
			Obj.role.level = $(".level_text").attr("value");
			Obj.onLevelChange()
		});
		$(".btn_reset").click(function() {
			Obj.reset()
		});
		$(".btn_output").click(function() {
			prompt('请复制以下地址', top.location.href);
			return false
		})
	},
	"draw": function() {
		this.initLevelPoint();
		this.skillMenu.draw();
		isSkillTree = false;
		for (i in this.role.data.resource.skillLayer) {
			if (typeof(this.role.slot[i]) == "undefined") {
				this.skillTree.show(i);
				isSkillTree = true;
				break
			}
		}
		if (!isSkillTree) {
			this.skillUpgrade.show(this.role.slot[0].id)
		}
		if (this.role.mastery > 0) {
			$(".static_show_mastery").html(' <i class="skill_type posit_adjust" ><img src="resources/icon/' + this.role.data.getMastery(this.role.mastery).icon + '.jpg"></i>' + this.role.data.getMastery(this.role.mastery).name)
		} else {
			$(".static_show_mastery").html("")
		}
		this.outPutConfig()
	},
	"drawWithUpgrade": function(i) {
		this.initLevelPoint();
		this.skillMenu.draw();
		this.skillUpgrade.show(i);
		if (this.role.mastery > 0) {
			$(".static_show_mastery").html(' <i class="skill_type posit_adjust" ><img src="images/demo_skill.jpg"></i>' + this.role.data.getMastery(this.role.mastery).name)
		} else {
			$(".static_show_mastery").html("")
		}
		this.outPutConfig()
	},
	"onLevelChange": function() {
		this.reset()
	},
	"activitySpecializationSpellChoose": function(layerId) {
		this.skillUpgrade.hide();
		this.skillTree.show(layerId)
	},
	"activitySpecializationSpellUpgradeChoose": function(spellId) {
		this.skillTree.hide();
		this.skillUpgrade.show(spellId);
		$('.dzs_calculator').show()
	},
	"initLevelPoint": function() {
		this.role.reCount();
		level = this.role.data.resource.level[this.role.level];
		$("#pt_total_ct").html(level.skillPoint);
		$("#pt_total_jx").html(level.specializationPoint);
		$("#pt_remain_ct").html(this.role.skillPoint);
		$("#pt_remain_jx").html(this.role.specializationPoint);
		$(".level_text").attr("value", this.role.level)
	},
	"inPutConfig": function() {
		url = top.location.href;
		if (url.indexOf('#') > 0) {
			request = url.substr(url.indexOf('#') + 1);
			res = request.match("\\^([0-9]*)");
			if (res != null && res.length > 1) this.role.level = res[1];
			res = request.match(/&([0-9\\.]*)/g);
			if (res != null && res.length > 1) {
				for (i = 0; i < res.length; i++) {
					var val = res[i].replace('&', '');
					var slotId = val.substr(0, val.indexOf('.'));
					var spellId = val.substr(val.indexOf('.') + 1);
					var spell = this.role.data.getSpecializationSpell(spellId);
					if (this.role.mastery == 0 && spell.masteryId > 0) this.role.mastery = spell.masteryId;
					this.role.slot[slotId] = spell
				}
			}
			res = request.match(/\$([0-9\\.]*)/g);
			if (res != null && res.length > 1) {
				for (i = 0; i < res.length; i++) {
					var spellEffect = this.role.data.getSpecializationSpellEffect(res[i].replace('$', ''));
					this.role.spellEffect[spellEffect.specializationId] = spellEffect
				}
			}
			res = request.match(/\!([0-9\\.]*)/g);
			if (res != null && res.length > 1) {
				for (i = 0; i < res.length; i++) {
					var upgradeEffect = this.role.data.getSpecializationSpellUpgradeEffect(res[i].replace('!', ''));
					var upgrade = this.role.data.getSpecializationSpellUpgrade(upgradeEffect.upgradeId);
					if (!this.role.spellUpgrade[upgrade.specializationId]) this.role.spellUpgrade[upgrade.specializationId] = [];
					this.role.spellUpgrade[upgrade.specializationId][upgrade.id] = upgradeEffect
				}
			}
		}
	},
	"outPutConfig": function() {
		url = top.location.href;
		if (url.indexOf('#') > 0) url = url.substr(0, url.indexOf('#'));
		request = '#';
		request += '^' + this.role.level;
		for (i in this.role.slot) request += '&' + i + '.' + this.role.slot[i].id;
		for (i in this.role.spellEffect) request += '$' + this.role.spellEffect[i].id;
		for (i in this.role.spellUpgrade) {
			for (j in this.role.spellUpgrade[i]) request += '!' + this.role.spellUpgrade[i][j].id
		}
		top.location.href = url + request
	},
	"reset": function() {
		this.role.slot = [];
		this.role.spellEffect = [];
		this.role.spellUpgrade = [];
		this.role.mastery = 0;
		this.draw()
	},
	"changeRole": function(id) {
		this.role.init(id)
	}
};
function SkillMenu() {
	this.init.apply(this, arguments)
}
SkillMenu.prototype = {
	"role": null,
	"layer": [],
	"init": function(role) {
		this.role = role;
		this.layer = this.role.data.resource.skillLayer
	},
	"draw": function() {
		this.drawMajorFrame()
	},
	"drawMajorFrame": function() {
		$(".skill_choice ul").html("");
		object = this;
		for (i in this.layer) {
			if (parseInt(this.role.level) >= parseInt(this.layer[i].requireLevel)) if (this.role.slot[i]) obj = this.drawMajorFrameSlot(1, this.role.slot[i]);
			else obj = this.drawMajorFrameSlot(2, i);
			else {
				if (this.role.slot[i]) delete this.role.slot[i];
				obj = this.drawMajorFrameSlot(3, this.layer[i])
			}
			$(".skill_choice ul").append(obj)
		}
		$(".skill_choice .skill_act").each(function() {
			var spellId = $(this).attr("spell");
			new PTooltips(this,
			function() {
				return {
					"icon": 'resources/icon/' + object.role.data.getSpecializationSpell(spellId).pic + '.jpg',
					"iconWidth": "64px",
					"iconHeight": "64px",
					"defaultStyle": true,
					"data": function() {
						spell = null;
						for (i in object.role.slot) {
							if (object.role.slot[i].id == spellId) {
								spell = object.role.slot[i];
								break
							}
						}
						if (spell == null) return 'error!';
						html = '<div stlye="color:#E5CB81 !important;" class="name">' + spell.name + '<span style="float:right;color:gray;">';
						if (object.role.spellEffect[spellId]) {
							spellEffect = object.role.spellEffect[spellId]
						} else {
							for (i in spell.effect) {
								if (object.role.data.getSpecializationSpellEffect(spell.effect[i]).step == 1) spellEffect = object.role.data.getSpecializationSpellEffect(spell.effect[i])
							}
							if (!spellEffect) return 'error!'
						}
						nextSpellEffect = null;
						for (i in spell.effect) {
							if (object.role.data.getSpecializationSpellEffect(spell.effect[i]).step == parseInt(spellEffect.step) + 1) nextSpellEffect = object.role.data.getSpecializationSpellEffect(spell.effect[i])
						}
						html += spellEffect.step + '/' + spell.maxStep;
						html += '</span></div>';
						if (spellEffect.castCost != "" || spellEffect.castTime != "") html += '<div style="color:#fefefe"><span style="float:right;">' + spellEffect.castCost + '</span> ' + spellEffect.castTime + ' </div>';
						if (spellEffect.cooldown != "" || spellEffect.castRange != "") html += '<div style="color:#fefefe"><span style="float:right;">' + spellEffect.cooldown + '</span>' + spellEffect.castRange + ' </div>';
						html += '<br><div style="color:#fed100">' + spellEffect.description + '</div>';
						html += '<div class="color:#855B47 !important;">' + object.generateLevelHtml(spellEffect.requireLevel) + '</div>';
						if (nextSpellEffect != null && typeof(nextSpellEffect) != "undefined") {
							html += '<hr />';
							html += '<div stlye="color:#E5CB81 !important;" class="name">' + spell.name + '(下一重天)<span style="float:right;color:gray;">';
							html += nextSpellEffect.step + '/' + spell.maxStep;
							html += '</span></div>';
							if (nextSpellEffect.castCost != "" || nextSpellEffect.castTime != "") html += '<div style="color:#fefefe"><span style="float:right;">' + nextSpellEffect.castCost + '</span> ' + nextSpellEffect.castTime + ' </div>';
							if (nextSpellEffect.cooldown != "" || nextSpellEffect.castRange != "") html += '<div style="color:#fefefe"><span style="float:right;">' + nextSpellEffect.cooldown + '</span>' + nextSpellEffect.castRange + ' </div>';
							html += '<br><div style="color:#fed100">' + nextSpellEffect.description + '</div>';
							html += '<div class="color:#855B47 !important;">' + object.generateLevelHtml(nextSpellEffect.requireLevel) + '</div>'
						}
						return html
					}
				}
			})
		})
	},
	"drawMajorFrameSlot": function(style, args) {
		var objectRole = this.role;
		switch (style) {
		case 1:
			html = '';
			if (1 == args.permanent) permanentBackground = "";
			else permanentBackground = " 3px";
			html += '<li class="dzs_skill_chocie"><span class="skill_name" style="background:url(resources/icon/' + args.pic + '.jpg)' + permanentBackground + ' center no-repeat">';
			if (1 == args.permanent) html += '<a class="skill_act skill_pasv" spell="' + args.id + '" href="javascript:void(0);"></a>';
			else html += '<a class="skill_act" spell="' + args.id + '" href="javascript:void(0);"></a>';
			if (this.role.spellEffect[args.id]) {
				stepPoint = this.role.spellEffect[args.id].step
			} else {
				stepPoint = "1"
			}
			html += '<i></i></span><span class="skill_control"><a class="skill_cancel" href="#" target="_self">取消</a><b>' + args.name + '</b><p><span class="skill_ct"></span>重天：' + stepPoint;
			if (parseInt(this.role.skillPoint) < 1) {
				if (1 == stepPoint) html += '<a style="visibility:hidden;" class="skill_add" href="javascript:void(0);"></a><a style="visibility:hidden;" class="skill_sub" href="javascript:void(0);"></a>';
				else html += '<a style="visibility:hidden;" class="skill_add" href="javascript:void(0);"></a><a class="skill_sub" href="javascript:void(0);"></a>'
			} else {
				if (1 == stepPoint) html += '<a class="skill_add" href="javascript:void(0);"></a><a style="visibility:hidden;" class="skill_sub" href="javascript:void(0);"></a>';
				else if (parseInt(stepPoint) >= parseInt(args.maxStep)) {
					html += '<a style="visibility:hidden;" class="skill_add" href="javascript:void(0);"></a><a class="skill_sub" href="javascript:void(0);"></a>'
				} else html += '<a class="skill_add" href="javascript:void(0);"></a><a class="skill_sub" href="javascript:void(0);"></a>'
			}
			html += '</p><p><i><span class="skill_jx"></span> ';
			html += this.role.getSpellUpgradePoint(args.id) + "/" + args.maxMastery;
			html += '</i>';
			for (i in args.effect) {
				if (this.role.data.getSpecializationSpellEffect(args.effect[i]).step == parseInt(stepPoint) + 1) {
					nextEffect = this.role.data.getSpecializationSpellEffect(args.effect[i]);
					if (nextEffect) {
						html += '<em>下一级所需等级';
						if (parseInt(nextEffect.requireLevel) > parseInt(this.role.level)) html += '<font color="red">' + nextEffect.requireLevel + '</font>';
						else html += nextEffect.requireLevel;
						html += '</em>'
					}
					break
				}
			}
			html += '</p></span></li>';
			newObject = $(html);
			newObject.find(".skill_cancel").click(function() {
				objectRole.cancelSpecializationSpell(args.id);
				application.draw();
				return false
			});
			newObject.find(".skill_add").click(function() {
				objectRole.levelUpSpecializationSpell(args.id);
				application.drawWithUpgrade(args.id);
				return false
			});
			newObject.find(".skill_sub").click(function() {
				objectRole.levelDownSpecializationSpell(args.id);
				application.drawWithUpgrade(args.id);
				return false
			});
			newObject.find('.skill_act').click(function() {
				if ($(this).attr("spell") > 0) application.activitySpecializationSpellUpgradeChoose($(this).attr("spell"));
				return false
			});
			break;
		case 2:
			newObject = $('<li><span class="skill_name" style="background:url(images/mark.jpg) 3px center no-repeat"><a href="javascript:void(0)"></a><i></i></span><a href="javascript:void(0);" class="skill_learnbtn">请选择学习技能</a></li>');
			newObject.find(".skill_learnbtn").click(function() {
				application.activitySpecializationSpellChoose(args);
				return false
			});
			break;
		case 3:
			newObject = $('<li><span class="skill_name" style="background:url(images/lock.jpg) 3px center no-repeat"><a href="javascript:void(0)"></a><i>' + args.requireLevel + ' </i></span></li>');
			break;
		default:
			newObject = null;
			break
		}
		return newObject
	},
	"generateLevelHtml": function(level) {
		if (level > parseInt(this.role.level)) return '<font color="red">需求等级:' + level + '</font>';
		else return '需求等级:' + level
	}
};
function Data() {
	this.init.apply(this, arguments)
}
Data.prototype = {
	"resource": {},
	"specializationSpell": null,
	"init": function(id) {
		this.load(id)
	},
	"load": function(id) {
		var Obj = this;
		Obj.resource = {
			"classes": {
				"id": "1",
				"icon": "images\/role_icon2.png",
				"name": "\u7075\u7334"
			},
			"level": {
				"1": {
					"id": "1",
					"skillPoint": "0",
					"specializationPoint": "0"
				},
				"2": {
					"id": "2",
					"skillPoint": "0",
					"specializationPoint": "0"
				},
				"3": {
					"id": "3",
					"skillPoint": "0",
					"specializationPoint": "0"
				},
				"4": {
					"id": "4",
					"skillPoint": "0",
					"specializationPoint": "0"
				},
				"5": {
					"id": "5",
					"skillPoint": "0",
					"specializationPoint": "0"
				},
				"6": {
					"id": "6",
					"skillPoint": "1",
					"specializationPoint": "1"
				},
				"7": {
					"id": "7",
					"skillPoint": "1",
					"specializationPoint": "1"
				},
				"8": {
					"id": "8",
					"skillPoint": "2",
					"specializationPoint": "2"
				},
				"9": {
					"id": "9",
					"skillPoint": "2",
					"specializationPoint": "2"
				},
				"10": {
					"id": "10",
					"skillPoint": "3",
					"specializationPoint": "3"
				},
				"11": {
					"id": "11",
					"skillPoint": "4",
					"specializationPoint": "3"
				},
				"12": {
					"id": "12",
					"skillPoint": "5",
					"specializationPoint": "4"
				},
				"13": {
					"id": "13",
					"skillPoint": "6",
					"specializationPoint": "4"
				},
				"14": {
					"id": "14",
					"skillPoint": "7",
					"specializationPoint": "5"
				},
				"15": {
					"id": "15",
					"skillPoint": "8",
					"specializationPoint": "5"
				},
				"16": {
					"id": "16",
					"skillPoint": "9",
					"specializationPoint": "6"
				},
				"17": {
					"id": "17",
					"skillPoint": "10",
					"specializationPoint": "6"
				},
				"18": {
					"id": "18",
					"skillPoint": "11",
					"specializationPoint": "7"
				},
				"19": {
					"id": "19",
					"skillPoint": "12",
					"specializationPoint": "7"
				},
				"20": {
					"id": "20",
					"skillPoint": "13",
					"specializationPoint": "8"
				},
				"21": {
					"id": "21",
					"skillPoint": "14",
					"specializationPoint": "9"
				},
				"22": {
					"id": "22",
					"skillPoint": "15",
					"specializationPoint": "10"
				},
				"23": {
					"id": "23",
					"skillPoint": "16",
					"specializationPoint": "11"
				},
				"24": {
					"id": "24",
					"skillPoint": "17",
					"specializationPoint": "12"
				},
				"25": {
					"id": "25",
					"skillPoint": "18",
					"specializationPoint": "13"
				},
				"26": {
					"id": "26",
					"skillPoint": "19",
					"specializationPoint": "14"
				},
				"27": {
					"id": "27",
					"skillPoint": "20",
					"specializationPoint": "15"
				},
				"28": {
					"id": "28",
					"skillPoint": "21",
					"specializationPoint": "16"
				},
				"29": {
					"id": "29",
					"skillPoint": "22",
					"specializationPoint": "17"
				},
				"30": {
					"id": "30",
					"skillPoint": "24",
					"specializationPoint": "18"
				},
				"31": {
					"id": "31",
					"skillPoint": "25",
					"specializationPoint": "19"
				},
				"32": {
					"id": "32",
					"skillPoint": "26",
					"specializationPoint": "20"
				},
				"33": {
					"id": "33",
					"skillPoint": "27",
					"specializationPoint": "21"
				},
				"34": {
					"id": "34",
					"skillPoint": "28",
					"specializationPoint": "22"
				},
				"35": {
					"id": "35",
					"skillPoint": "31",
					"specializationPoint": "24"
				},
				"36": {
					"id": "36",
					"skillPoint": "32",
					"specializationPoint": "26"
				},
				"37": {
					"id": "37",
					"skillPoint": "33",
					"specializationPoint": "28"
				},
				"38": {
					"id": "38",
					"skillPoint": "34",
					"specializationPoint": "30"
				},
				"39": {
					"id": "39",
					"skillPoint": "35",
					"specializationPoint": "32"
				},
				"40": {
					"id": "40",
					"skillPoint": "41",
					"specializationPoint": "37"
				},
				"41": {
					"id": "41",
					"skillPoint": "42",
					"specializationPoint": "40"
				},
				"42": {
					"id": "42",
					"skillPoint": "43",
					"specializationPoint": "43"
				},
				"43": {
					"id": "43",
					"skillPoint": "44",
					"specializationPoint": "46"
				},
				"44": {
					"id": "44",
					"skillPoint": "43",
					"specializationPoint": "47"
				},
				"45": {
					"id": "45",
					"skillPoint": "50",
					"specializationPoint": "53"
				},
				"46": {
					"id": "46",
					"skillPoint": "51",
					"specializationPoint": "57"
				},
				"47": {
					"id": "47",
					"skillPoint": "52",
					"specializationPoint": "61"
				},
				"48": {
					"id": "48",
					"skillPoint": "53",
					"specializationPoint": "65"
				},
				"49": {
					"id": "49",
					"skillPoint": "54",
					"specializationPoint": "69"
				},
				"50": {
					"id": "50",
					"skillPoint": "60",
					"specializationPoint": "73"
				},
				"51": {
					"id": "51",
					"skillPoint": "61",
					"specializationPoint": "74"
				},
				"52": {
					"id": "52",
					"skillPoint": "62",
					"specializationPoint": "75"
				},
				"53": {
					"id": "53",
					"skillPoint": "63",
					"specializationPoint": "76"
				},
				"54": {
					"id": "54",
					"skillPoint": "64",
					"specializationPoint": "77"
				},
				"55": {
					"id": "55",
					"skillPoint": "67",
					"specializationPoint": "80"
				},
				"56": {
					"id": "56",
					"skillPoint": "68",
					"specializationPoint": "81"
				},
				"57": {
					"id": "57",
					"skillPoint": "69",
					"specializationPoint": "82"
				},
				"58": {
					"id": "58",
					"skillPoint": "70",
					"specializationPoint": "83"
				},
				"59": {
					"id": "59",
					"skillPoint": "71",
					"specializationPoint": "84"
				},
				"60": {
					"id": "60",
					"skillPoint": "72",
					"specializationPoint": "85"
				}
			},
			"specializationSpellLayer": {
				"1": {
					"id": "1",
					"name": "\u7b2c\u4e00\u5c42",
					"requireLevel": "4"
				},
				"2": {
					"id": "2",
					"name": "\u7b2c\u4e8c\u5c42",
					"requireLevel": "8"
				},
				"3": {
					"id": "3",
					"name": "\u7b2c\u4e09\u5c42",
					"requireLevel": "14"
				},
				"4": {
					"id": "4",
					"name": "\u7b2c\u56db\u5c42",
					"requireLevel": "22"
				},
				"5": {
					"id": "5",
					"name": "\u7b2c\u4e94\u5c42",
					"requireLevel": "30"
				},
				"6": {
					"id": "6",
					"name": "\u7b2c\u516d\u5c42",
					"requireLevel": "35"
				},
				"7": {
					"id": "7",
					"name": "\u7b2c\u4e03\u5c42",
					"requireLevel": "40"
				},
				"8": {
					"id": "8",
					"name": "\u7b2c\u516b\u5c42",
					"requireLevel": "45"
				}
			},
			"mastery": {
				"3": {
					"id": "3",
					"icon": "zx_lh_gx",
					"name": "\u68cd\u7cfb",
					"description": "\u5f53\u7075\u7334\u7528\u3010\u8f7b\u68cd\u3011\u66ff\u6362\u4efb\u610f\u8fde\u62db\u7684\u7b2c4\u5f0f\u53ca\u4ee5\u540e\u62db\u5f0f\u4e2d\u7684\u3010\u91cd\u68cd\u3011\u65f6\uff0c\u540c\u6837\u53ef\u4ee5\u83b7\u5f97\u4e00\u4e2a\u8fde\u51fb\u70b9\u3002"
				},
				"17": {
					"id": "17",
					"icon": "zx_lh_qjx",
					"name": "\u62f3\u811a\u7cfb",
					"description": "\u8bf7\u5f53\u7075\u7334\u7528\u3010\u811a\u3011\u66ff\u6362\u4efb\u610f\u8fde\u62db\u7684\u7b2c4\u5f0f\u53ca\u4ee5\u540e\u62db\u5f0f\u4e2d\u7684\u3010\u62f3\u3011\u65f6\uff0c\u540c\u6837\u53ef\u4ee5\u83b7\u5f97\u4e00\u4e2a\u8fde\u51fb\u70b9\u3002"
				}
			},
			"skillLayer": [{
				"id": "1",
				"requireLevel": "4"
			},
			{
				"id": "2",
				"requireLevel": "8"
			},
			{
				"id": "3",
				"requireLevel": "14"
			},
			{
				"id": "4",
				"requireLevel": "22"
			},
			{
				"id": "5",
				"requireLevel": "30"
			},
			{
				"id": "6",
				"requireLevel": "35"
			},
			{
				"id": "7",
				"requireLevel": "40"
			},
			{
				"id": "8",
				"requireLevel": "45"
			}],
			"specializationSpell": {
				"19": {
					"id": "19",
					"preSpell": "0",
					"name": "\u4e71\u661f\u821e",
					"pic": "lh_RoleSkill_0065",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621047\u70b9\u4f24\u5bb3\r\n4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621075%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523025%\u4f24\u5bb3",
					"effect": {
						"1": "15",
						"7": "2309",
						"6": "2308",
						"5": "2307",
						"4": "2306",
						"3": "2305",
						"2": "2304",
						"8": "2310",
						"9": "2311",
						"10": "2312",
						"11": "2313",
						"12": "2314",
						"13": "2315",
						"14": "2316",
						"15": "2317",
						"16": "2318",
						"17": "2319",
						"18": "2320",
						"19": "2321",
						"20": "2322"
					},
					"upgrade": ["8", "14", "35", "37", "43"]
				},
				"58": {
					"id": "58",
					"preSpell": "0",
					"name": "\u5954\u96f7\u51fb",
					"pic": "lh_RoleSkill_0138",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210187%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210223%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210268%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002",
					"effect": {
						"1": "541",
						"4": "2325",
						"3": "2324",
						"2": "2323",
						"5": "2326",
						"6": "2327",
						"7": "2328",
						"8": "2329",
						"9": "2330",
						"10": "2331",
						"11": "2332",
						"12": "2333",
						"13": "2334",
						"14": "2335",
						"15": "2336",
						"16": "2337",
						"17": "2338",
						"18": "2339",
						"19": "2340",
						"20": "2341"
					},
					"upgrade": ["52", "54", "55", "56", "57"]
				},
				"66": {
					"id": "66",
					"preSpell": "0",
					"name": "\u65cb\u7a7a\u9707",
					"pic": "lh_RoleSkill_0034",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210369%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210369%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765",
					"effect": {
						"1": "901",
						"2": "2342",
						"3": "2343",
						"4": "2344",
						"5": "2345",
						"6": "2346",
						"7": "2347",
						"18": "2358",
						"17": "2357",
						"16": "2356",
						"15": "2355",
						"14": "2354",
						"13": "2353",
						"12": "2352",
						"11": "2351",
						"10": "2350",
						"9": "2349",
						"8": "2348",
						"19": "2359",
						"20": "2360"
					},
					"upgrade": ["77", "81", "84", "87", "89"]
				},
				"73": {
					"id": "73",
					"preSpell": "0",
					"name": "\u5206\u8eab\u5288",
					"pic": "lh_RoleSkill_0120",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210380%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1",
					"effect": {
						"1": "961",
						"2": "2361",
						"3": "2362",
						"4": "2363",
						"5": "2364",
						"6": "2365",
						"7": "2366",
						"8": "2367",
						"9": "2368",
						"10": "2369",
						"18": "2377",
						"17": "2376",
						"16": "2375",
						"15": "2374",
						"14": "2373",
						"13": "2372",
						"12": "2371",
						"11": "2370",
						"19": "2378",
						"20": "2379"
					},
					"upgrade": ["102", "104", "107", "110", "111"]
				},
				"80": {
					"id": "80",
					"preSpell": "0",
					"name": "\u5de8\u733f\u62f3\u7f61",
					"pic": "lh_RoleSkill_0009",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a07732\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002",
					"effect": {
						"1": "982",
						"2": "2380",
						"3": "2381",
						"4": "2382",
						"5": "2383",
						"6": "2384",
						"17": "2395",
						"16": "2394",
						"15": "2393",
						"14": "2392",
						"13": "2391",
						"12": "2390",
						"11": "2389",
						"10": "2388",
						"9": "2387",
						"8": "2386",
						"7": "2385",
						"18": "2396",
						"19": "2397",
						"20": "2398"
					},
					"upgrade": ["127", "129", "131", "133", "136"]
				},
				"84": {
					"id": "84",
					"preSpell": "0",
					"name": "\u5206\u8eab\u5e7b\u5f71",
					"pic": "lh_RoleSkill_0037",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733483%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2\r\n",
					"effect": {
						"1": "1022",
						"2": "2399",
						"3": "2400",
						"4": "2401",
						"5": "2402",
						"17": "2414",
						"16": "2413",
						"15": "2412",
						"14": "2411",
						"13": "2410",
						"12": "2409",
						"11": "2408",
						"10": "2407",
						"9": "2406",
						"8": "2405",
						"7": "2404",
						"6": "2403",
						"18": "2415",
						"19": "2416",
						"20": "2417"
					},
					"upgrade": ["152", "155", "157", "160", "163"]
				},
				"88": {
					"id": "88",
					"preSpell": "0",
					"name": "\u75be\u5f71\u817f",
					"pic": "lh_PetsSkill_045",
					"maxStep": "20",
					"masteryId": "17",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210146%\u4f24\u5bb3\r\n4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210187%\u4f24\u5bb3\u3002\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210232%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1289",
						"6": "2251",
						"5": "2250",
						"4": "2249",
						"3": "2248",
						"2": "2247",
						"7": "2252",
						"8": "2253",
						"9": "2254",
						"10": "2255",
						"11": "2256",
						"12": "2257",
						"13": "2258",
						"14": "2259",
						"15": "2260",
						"16": "2261",
						"17": "2262",
						"18": "2263",
						"19": "2264",
						"20": "2265"
					},
					"upgrade": ["312", "314", "316", "317", "318"]
				},
				"89": {
					"id": "89",
					"preSpell": "0",
					"name": "\u68cd\u52bf\u5982\u5c71",
					"pic": "lh_RoleSkill_0142",
					"maxStep": "20",
					"masteryId": "3",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210145%\u4f24\u5bb3\r\n4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210174%\u4f24\u5bb3\r\n5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210209%\u4f24\u5bb3\r\n6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210277%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002",
					"effect": {
						"1": "1342",
						"2": "2418",
						"3": "2419",
						"4": "2420",
						"5": "2421",
						"6": "2422",
						"7": "2423",
						"8": "2424",
						"9": "2425",
						"10": "2426",
						"11": "2427",
						"12": "2428",
						"13": "2429",
						"14": "2430",
						"15": "2431",
						"16": "2432",
						"17": "2433",
						"18": "2434",
						"19": "2435",
						"20": "2436"
					},
					"upgrade": ["324", "325", "326", "327", "328"]
				},
				"90": {
					"id": "90",
					"preSpell": "0",
					"name": "\u795e\u884c\u672f",
					"pic": "lh_RoleSkill_0042",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0664\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9",
					"effect": {
						"1": "1343",
						"2": "2437",
						"3": "2438",
						"4": "2439",
						"5": "2440",
						"16": "2451",
						"15": "2450",
						"14": "2449",
						"13": "2448",
						"12": "2447",
						"11": "2446",
						"10": "2445",
						"9": "2444",
						"8": "2443",
						"7": "2442",
						"6": "2441",
						"17": "2452",
						"18": "2453",
						"19": "2454",
						"20": "2455"
					},
					"upgrade": ["329", "330", "331", "332", "333"]
				},
				"91": {
					"id": "91",
					"preSpell": "0",
					"name": "\u62a4\u8eab\u5492",
					"pic": "lh_RoleSkill_0121",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u6536294\u70b9\u4f24\u5bb3",
					"effect": {
						"1": "1383",
						"2": "2456",
						"3": "2457",
						"4": "2458",
						"5": "2459",
						"6": "2460",
						"7": "2461",
						"8": "2462",
						"9": "2463",
						"10": "2464",
						"11": "2465",
						"12": "2466",
						"13": "2467",
						"14": "2468",
						"15": "2469",
						"16": "2470",
						"17": "2471",
						"18": "2472",
						"19": "2473",
						"20": "2474"
					},
					"upgrade": ["344", "346", "348", "350", "352"]
				},
				"92": {
					"id": "92",
					"preSpell": "0",
					"name": "\u8f70\u5929\u62f3",
					"pic": "lh_RoleSkill_0170",
					"maxStep": "20",
					"masteryId": "17",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210861%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101722%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e",
					"effect": {
						"1": "1424",
						"17": "2281",
						"16": "2280",
						"15": "2279",
						"14": "2278",
						"13": "2277",
						"12": "2276",
						"11": "2275",
						"10": "2274",
						"9": "2273",
						"8": "2272",
						"7": "2271",
						"6": "2270",
						"5": "2269",
						"4": "2268",
						"3": "2267",
						"2": "2266",
						"18": "2282",
						"19": "2283",
						"20": "2284"
					},
					"upgrade": ["356", "358", "360", "362", "363"]
				},
				"93": {
					"id": "93",
					"preSpell": "0",
					"name": "\u7834\u5929\u68cd",
					"pic": "lh_RoleSkill_0169",
					"maxStep": "20",
					"masteryId": "3",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210516%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1",
					"effect": {
						"18": "2491",
						"19": "2492",
						"20": "2493",
						"1": "1463",
						"2": "2475",
						"3": "2476",
						"4": "2477",
						"5": "2478",
						"17": "2490",
						"16": "2489",
						"15": "2488",
						"14": "2487",
						"13": "2486",
						"12": "2485",
						"11": "2484",
						"10": "2483",
						"9": "2482",
						"8": "2481",
						"7": "2480",
						"6": "2479"
					},
					"upgrade": ["364", "366", "368", "370", "372"]
				},
				"94": {
					"id": "94",
					"preSpell": "0",
					"name": "\u6d3b\u7b4b",
					"pic": "lh_PetsSkill_036",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0302\u70b9",
					"effect": {
						"17": "2509",
						"18": "2510",
						"19": "2511",
						"20": "2512",
						"1": "1523",
						"2": "2494",
						"3": "2495",
						"4": "2496",
						"16": "2508",
						"15": "2507",
						"14": "2506",
						"13": "2505",
						"12": "2504",
						"11": "2503",
						"10": "2502",
						"9": "2501",
						"8": "2500",
						"7": "2499",
						"6": "2498",
						"5": "2497"
					},
					"upgrade": ["379", "380", "381", "383", "385"]
				},
				"95": {
					"id": "95",
					"preSpell": "0",
					"name": "\u9690\u8eab\u5492",
					"pic": "lh_RoleSkill_0141",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0336\u70b9",
					"effect": {
						"19": "2530",
						"20": "2531",
						"1": "1563",
						"2": "2513",
						"3": "2514",
						"4": "2515",
						"5": "2516",
						"6": "2517",
						"7": "2518",
						"8": "2519",
						"18": "2529",
						"17": "2528",
						"16": "2527",
						"15": "2526",
						"14": "2525",
						"13": "2524",
						"12": "2523",
						"11": "2522",
						"10": "2521",
						"9": "2520"
					},
					"upgrade": ["400", "401", "402", "403", "404"]
				},
				"96": {
					"id": "96",
					"preSpell": "0",
					"name": "\u62f3\u5b9a\u516b\u8352",
					"pic": "lh_RoleSkill_0144",
					"maxStep": "20",
					"masteryId": "17",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210167%\u4f24\u5bb3\u3002\r\n4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210229%\u4f24\u5bb3\u3002\r\n5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u621096%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210229%\u4f24\u5bb3\u3002\r\n7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210463%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002",
					"effect": {
						"1": "1623",
						"3": "2286",
						"2": "2285",
						"4": "2287",
						"5": "2288",
						"6": "2289",
						"7": "2290",
						"8": "2291",
						"9": "2292",
						"10": "2293",
						"11": "2294",
						"12": "2295",
						"13": "2296",
						"14": "2297",
						"15": "2298",
						"16": "2299",
						"17": "2300",
						"18": "2301",
						"19": "2302",
						"20": "2303"
					},
					"upgrade": ["405", "406", "407", "408", "409"]
				},
				"97": {
					"id": "97",
					"preSpell": "0",
					"name": "\u68cd\u5f71\u5343\u53e0",
					"pic": "lh_RoleSkill_0019",
					"maxStep": "20",
					"masteryId": "3",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3",
					"effect": {
						"1": "1643",
						"3": "2533",
						"2": "2532",
						"4": "2534",
						"5": "2535",
						"6": "2536",
						"7": "2537",
						"8": "2538",
						"9": "2539",
						"10": "2540",
						"11": "2541",
						"12": "2542",
						"13": "2543",
						"14": "2544",
						"15": "2545",
						"16": "2546",
						"17": "2547",
						"18": "2548",
						"19": "2549",
						"20": "2550"
					},
					"upgrade": ["410", "411", "412", "413", "414"]
				}
			},
			"specializationSpellEffect": {
				"15": {
					"id": "15",
					"specializationId": "19",
					"step": "1",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621043%\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621068%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523022%\u4f24\u5bb3"
				},
				"2309": {
					"id": "2309",
					"specializationId": "19",
					"step": "7",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "28",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621055\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621088%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523029%\u4f24\u5bb3"
				},
				"2308": {
					"id": "2308",
					"specializationId": "19",
					"step": "6",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621053\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621085%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523028%\u4f24\u5bb3"
				},
				"2307": {
					"id": "2307",
					"specializationId": "19",
					"step": "5",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621051\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621081%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523027%\u4f24\u5bb3"
				},
				"2306": {
					"id": "2306",
					"specializationId": "19",
					"step": "4",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621049\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621078%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523026%\u4f24\u5bb3"
				},
				"2305": {
					"id": "2305",
					"specializationId": "19",
					"step": "3",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621047\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621075%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523025%\u4f24\u5bb3"
				},
				"2304": {
					"id": "2304",
					"specializationId": "19",
					"step": "2",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621045\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621072%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523024%\u4f24\u5bb3"
				},
				"541": {
					"id": "541",
					"specializationId": "58",
					"step": "1",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210187%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210223%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210268%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2325": {
					"id": "2325",
					"specializationId": "58",
					"step": "4",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210213%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210255%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210306%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2324": {
					"id": "2324",
					"specializationId": "58",
					"step": "3",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210204%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210244%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210293%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2323": {
					"id": "2323",
					"specializationId": "58",
					"step": "2",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210196%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210234%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210280%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"901": {
					"id": "901",
					"specializationId": "66",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210195%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210187%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2342": {
					"id": "2342",
					"specializationId": "66",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "10",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210204%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210195%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2343": {
					"id": "2343",
					"specializationId": "66",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210213%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210204%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2344": {
					"id": "2344",
					"specializationId": "66",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210222%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210213%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2345": {
					"id": "2345",
					"specializationId": "66",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "2",
					"requireSkillPoint": "22",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210231%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210222%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2346": {
					"id": "2346",
					"specializationId": "66",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210241%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210231%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2347": {
					"id": "2347",
					"specializationId": "66",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210250%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210239%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2358": {
					"id": "2358",
					"specializationId": "66",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210350%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210337%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2357": {
					"id": "2357",
					"specializationId": "66",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210341%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210328%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2356": {
					"id": "2356",
					"specializationId": "66",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210332%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210319%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2355": {
					"id": "2355",
					"specializationId": "66",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210310%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2354": {
					"id": "2354",
					"specializationId": "66",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210314%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210301%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2353": {
					"id": "2353",
					"specializationId": "66",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210305%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210292%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2352": {
					"id": "2352",
					"specializationId": "66",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210296%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210283%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2351": {
					"id": "2351",
					"specializationId": "66",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210286%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210275%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2350": {
					"id": "2350",
					"specializationId": "66",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210277%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210266%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2349": {
					"id": "2349",
					"specializationId": "66",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210268%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210257%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2348": {
					"id": "2348",
					"specializationId": "66",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210259%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210248%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"961": {
					"id": "961",
					"specializationId": "73",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210201%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2361": {
					"id": "2361",
					"specializationId": "73",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "10",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210210%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2362": {
					"id": "2362",
					"specializationId": "73",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210229%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2363": {
					"id": "2363",
					"specializationId": "73",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210229%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2364": {
					"id": "2364",
					"specializationId": "73",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210238%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2365": {
					"id": "2365",
					"specializationId": "73",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210248%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2366": {
					"id": "2366",
					"specializationId": "73",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210257%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2367": {
					"id": "2367",
					"specializationId": "73",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210267%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2368": {
					"id": "2368",
					"specializationId": "73",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210276%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2369": {
					"id": "2369",
					"specializationId": "73",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210286%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2377": {
					"id": "2377",
					"specializationId": "73",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210359%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2376": {
					"id": "2376",
					"specializationId": "73",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210350%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2375": {
					"id": "2375",
					"specializationId": "73",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210341%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2374": {
					"id": "2374",
					"specializationId": "73",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210332%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2373": {
					"id": "2373",
					"specializationId": "73",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210323%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2372": {
					"id": "2372",
					"specializationId": "73",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210314%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2371": {
					"id": "2371",
					"specializationId": "73",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210305%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"2370": {
					"id": "2370",
					"specializationId": "73",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210295%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1\r\n"
				},
				"982": {
					"id": "982",
					"specializationId": "80",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a0613\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2380": {
					"id": "2380",
					"specializationId": "80",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a0931\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2381": {
					"id": "2381",
					"specializationId": "80",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a01252\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2382": {
					"id": "2382",
					"specializationId": "80",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a01576\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2383": {
					"id": "2383",
					"specializationId": "80",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a01912\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2384": {
					"id": "2384",
					"specializationId": "80",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a02250\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2395": {
					"id": "2395",
					"specializationId": "80",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a06354\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2394": {
					"id": "2394",
					"specializationId": "80",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a05967\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2393": {
					"id": "2393",
					"specializationId": "80",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a05580\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2392": {
					"id": "2392",
					"specializationId": "80",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a05193\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2391": {
					"id": "2391",
					"specializationId": "80",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a04806\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2390": {
					"id": "2390",
					"specializationId": "80",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a04419\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2389": {
					"id": "2389",
					"specializationId": "80",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a04041\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2388": {
					"id": "2388",
					"specializationId": "80",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a03669\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2387": {
					"id": "2387",
					"specializationId": "80",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a03304\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2386": {
					"id": "2386",
					"specializationId": "80",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a02947\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2385": {
					"id": "2385",
					"specializationId": "80",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a02596\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"1022": {
					"id": "1022",
					"specializationId": "84",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733444%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2399": {
					"id": "2399",
					"specializationId": "84",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733447%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2400": {
					"id": "2400",
					"specializationId": "84",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733448%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2401": {
					"id": "2401",
					"specializationId": "84",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733451%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2402": {
					"id": "2402",
					"specializationId": "84",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733452%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2414": {
					"id": "2414",
					"specializationId": "84",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733479%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2413": {
					"id": "2413",
					"specializationId": "84",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733476%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2412": {
					"id": "2412",
					"specializationId": "84",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733475%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2411": {
					"id": "2411",
					"specializationId": "84",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733472%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2410": {
					"id": "2410",
					"specializationId": "84",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733469%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2409": {
					"id": "2409",
					"specializationId": "84",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733468%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2408": {
					"id": "2408",
					"specializationId": "84",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733430%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2407": {
					"id": "2407",
					"specializationId": "84",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733462%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2406": {
					"id": "2406",
					"specializationId": "84",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733461%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2405": {
					"id": "2405",
					"specializationId": "84",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733459%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2404": {
					"id": "2404",
					"specializationId": "84",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733457%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2403": {
					"id": "2403",
					"specializationId": "84",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733455%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"1289": {
					"id": "1289",
					"specializationId": "88",
					"step": "1",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210146%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210187%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210232%\u4f24\u5bb3\u3002"
				},
				"2251": {
					"id": "2251",
					"specializationId": "88",
					"step": "6",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210179%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210229%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210285%\u4f24\u5bb3\u3002"
				},
				"2250": {
					"id": "2250",
					"specializationId": "88",
					"step": "5",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210173%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210221%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210275%\u4f24\u5bb3\u3002"
				},
				"2249": {
					"id": "2249",
					"specializationId": "88",
					"step": "4",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "23",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210166\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210212%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210264%\u4f24\u5bb3\u3002"
				},
				"2248": {
					"id": "2248",
					"specializationId": "88",
					"step": "3",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210159%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210204%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210253%\u4f24\u5bb3\u3002"
				},
				"2247": {
					"id": "2247",
					"specializationId": "88",
					"step": "2",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210152%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210195%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210243%\u4f24\u5bb3\u3002"
				},
				"1342": {
					"id": "1342",
					"specializationId": "89",
					"step": "1",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210145%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210174%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210209%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210277%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"1343": {
					"id": "1343",
					"specializationId": "90",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "0",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a056\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2437": {
					"id": "2437",
					"specializationId": "90",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a088\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2438": {
					"id": "2438",
					"specializationId": "90",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0120\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2439": {
					"id": "2439",
					"specializationId": "90",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0152\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2440": {
					"id": "2440",
					"specializationId": "90",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0184\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2451": {
					"id": "2451",
					"specializationId": "90",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0537\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2450": {
					"id": "2450",
					"specializationId": "90",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0505\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2449": {
					"id": "2449",
					"specializationId": "90",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0472\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2448": {
					"id": "2448",
					"specializationId": "90",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0440\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2447": {
					"id": "2447",
					"specializationId": "90",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0408\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2446": {
					"id": "2446",
					"specializationId": "90",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0376\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2445": {
					"id": "2445",
					"specializationId": "90",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0344\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2444": {
					"id": "2444",
					"specializationId": "90",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0312\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2443": {
					"id": "2443",
					"specializationId": "90",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0280\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2442": {
					"id": "2442",
					"specializationId": "90",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0248\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2441": {
					"id": "2441",
					"specializationId": "90",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0216\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"1383": {
					"id": "1383",
					"specializationId": "91",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u6536294\u70b9\u4f24\u5bb3"
				},
				"2456": {
					"id": "2456",
					"specializationId": "91",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u6536498\u70b9\u4f24\u5bb3"
				},
				"2457": {
					"id": "2457",
					"specializationId": "91",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u6536746\u70b9\u4f24\u5bb3"
				},
				"2458": {
					"id": "2458",
					"specializationId": "91",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65361088\u70b9\u4f24\u5bb3"
				},
				"2459": {
					"id": "2459",
					"specializationId": "91",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65361520\u70b9\u4f24\u5bb3"
				},
				"2460": {
					"id": "2460",
					"specializationId": "91",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65362026\u70b9\u4f24\u5bb3"
				},
				"2461": {
					"id": "2461",
					"specializationId": "91",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65362614\u70b9\u4f24\u5bb3"
				},
				"2462": {
					"id": "2462",
					"specializationId": "91",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65363286\u70b9\u4f24\u5bb3"
				},
				"2463": {
					"id": "2463",
					"specializationId": "91",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65363962\u70b9\u4f24\u5bb3"
				},
				"2464": {
					"id": "2464",
					"specializationId": "91",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65364682\u70b9\u4f24\u5bb3"
				},
				"2465": {
					"id": "2465",
					"specializationId": "91",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65365480\u70b9\u4f24\u5bb3"
				},
				"2466": {
					"id": "2466",
					"specializationId": "91",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65366346\u70b9\u4f24\u5bb3"
				},
				"2467": {
					"id": "2467",
					"specializationId": "91",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65367294\u70b9\u4f24\u5bb3"
				},
				"2468": {
					"id": "2468",
					"specializationId": "91",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65368168\u70b9\u4f24\u5bb3"
				},
				"2469": {
					"id": "2469",
					"specializationId": "91",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65369052\u70b9\u4f24\u5bb3"
				},
				"2470": {
					"id": "2470",
					"specializationId": "91",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u65369937\u70b9\u4f24\u5bb3"
				},
				"2471": {
					"id": "2471",
					"specializationId": "91",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u6536294\u70b9\u4f24\u5bb3"
				},
				"2472": {
					"id": "2472",
					"specializationId": "91",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u653611695\u70b9\u4f24\u5bb3"
				},
				"2473": {
					"id": "2473",
					"specializationId": "91",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u653612579\u70b9\u4f24\u5bb3"
				},
				"2474": {
					"id": "2474",
					"specializationId": "91",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u547c\u5438\u4e4b\u95f4\uff0c\u4e07\u6cd5\u4e0d\u4fb5\uff0c\u5438\u6536\u53d7\u5230\u4f24\u5bb3\u768470%\uff0c\u572810\u79d2\u5185\u6700\u591a\u5438\u653613463\u70b9\u4f24\u5bb3"
				},
				"2491": {
					"id": "2491",
					"specializationId": "93",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210924%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2492": {
					"id": "2492",
					"specializationId": "93",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210948%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2493": {
					"id": "2493",
					"specializationId": "93",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210972%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2509": {
					"id": "2509",
					"specializationId": "94",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0218\u70b9"
				},
				"2510": {
					"id": "2510",
					"specializationId": "94",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0235\u70b9"
				},
				"2511": {
					"id": "2511",
					"specializationId": "94",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0252\u70b9"
				},
				"2512": {
					"id": "2512",
					"specializationId": "94",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0269\u70b9"
				},
				"2530": {
					"id": "2530",
					"specializationId": "95",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0258\u70b9"
				},
				"2531": {
					"id": "2531",
					"specializationId": "95",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0276\u70b9"
				},
				"1424": {
					"id": "1424",
					"specializationId": "92",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210457%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210914%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2281": {
					"id": "2281",
					"specializationId": "92",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210795%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101592%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2280": {
					"id": "2280",
					"specializationId": "92",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210774%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101550%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2279": {
					"id": "2279",
					"specializationId": "92",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210753%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101508%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2278": {
					"id": "2278",
					"specializationId": "92",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210732%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101466%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2277": {
					"id": "2277",
					"specializationId": "92",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210712%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101424%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2276": {
					"id": "2276",
					"specializationId": "92",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210691%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101382%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2275": {
					"id": "2275",
					"specializationId": "92",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210669%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101338%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2274": {
					"id": "2274",
					"specializationId": "92",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210648%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101296%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2273": {
					"id": "2273",
					"specializationId": "92",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210627%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101254%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2272": {
					"id": "2272",
					"specializationId": "92",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210606%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101212%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2271": {
					"id": "2271",
					"specializationId": "92",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210584%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101168%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2270": {
					"id": "2270",
					"specializationId": "92",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210563%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101126%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2269": {
					"id": "2269",
					"specializationId": "92",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210542%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101084%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2268": {
					"id": "2268",
					"specializationId": "92",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210521%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101042%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2267": {
					"id": "2267",
					"specializationId": "92",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210499%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210998%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2266": {
					"id": "2266",
					"specializationId": "92",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210478%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210956%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"1463": {
					"id": "1463",
					"specializationId": "93",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210516%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2475": {
					"id": "2475",
					"specializationId": "93",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210540%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2476": {
					"id": "2476",
					"specializationId": "93",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210564%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2477": {
					"id": "2477",
					"specializationId": "93",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210588%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2478": {
					"id": "2478",
					"specializationId": "93",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210612%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2490": {
					"id": "2490",
					"specializationId": "93",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210900%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2489": {
					"id": "2489",
					"specializationId": "93",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210876%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2488": {
					"id": "2488",
					"specializationId": "93",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210852%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2487": {
					"id": "2487",
					"specializationId": "93",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210828%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2486": {
					"id": "2486",
					"specializationId": "93",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210804%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2485": {
					"id": "2485",
					"specializationId": "93",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210780%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2484": {
					"id": "2484",
					"specializationId": "93",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210756%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2483": {
					"id": "2483",
					"specializationId": "93",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210732%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2482": {
					"id": "2482",
					"specializationId": "93",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210708%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2481": {
					"id": "2481",
					"specializationId": "93",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210684%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2480": {
					"id": "2480",
					"specializationId": "93",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210660%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2479": {
					"id": "2479",
					"specializationId": "93",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-6\uff09\u540c\u65f6\u6309\u4e0b\u8f7b\u68cd\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u5219\u8fde\u7eed\u653b\u51fb\u9762\u524d\u6247\u5f62\u533a\u57df\u5185\u6700\u591a6\u4e2a\u654c\u4eba3\u6b21\uff0c\u6bcf\u6b21\u9020\u6210636%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"1523": {
					"id": "1523",
					"specializationId": "94",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a019\u70b9"
				},
				"2494": {
					"id": "2494",
					"specializationId": "94",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a028\u70b9"
				},
				"2495": {
					"id": "2495",
					"specializationId": "94",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a037\u70b9"
				},
				"2496": {
					"id": "2496",
					"specializationId": "94",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a048\u70b9"
				},
				"2508": {
					"id": "2508",
					"specializationId": "94",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0201\u70b9"
				},
				"2507": {
					"id": "2507",
					"specializationId": "94",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0201\u70b9"
				},
				"2506": {
					"id": "2506",
					"specializationId": "94",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0184\u70b9"
				},
				"2505": {
					"id": "2505",
					"specializationId": "94",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0167\u70b9"
				},
				"2504": {
					"id": "2504",
					"specializationId": "94",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0150\u70b9"
				},
				"2503": {
					"id": "2503",
					"specializationId": "94",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0136\u70b9"
				},
				"2502": {
					"id": "2502",
					"specializationId": "94",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0122\u70b9"
				},
				"2501": {
					"id": "2501",
					"specializationId": "94",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a0107\u70b9"
				},
				"2500": {
					"id": "2500",
					"specializationId": "94",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a094\u70b9"
				},
				"2499": {
					"id": "2499",
					"specializationId": "94",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a083\u70b9"
				},
				"2498": {
					"id": "2498",
					"specializationId": "94",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a070\u70b9"
				},
				"2497": {
					"id": "2497",
					"specializationId": "94",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u4f7f\u7528\u540e\u7acb\u523b\u83b7\u5f973\u70b9\u8fde\u51fb\u70b9\uff0c\u540c\u65f6\u83b7\u5f97\u597d\u6597\u72b6\u6001\uff0c\u4f7f\u5f97\u572810\u79d2\u5185\u6597\u5fd7\u589e\u52a059\u70b9"
				},
				"1563": {
					"id": "1563",
					"specializationId": "95",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a021\u70b9"
				},
				"2513": {
					"id": "2513",
					"specializationId": "95",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a032\u70b9"
				},
				"2514": {
					"id": "2514",
					"specializationId": "95",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a043\u70b9"
				},
				"2515": {
					"id": "2515",
					"specializationId": "95",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a054\u70b9"
				},
				"2516": {
					"id": "2516",
					"specializationId": "95",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a066\u70b9"
				},
				"2517": {
					"id": "2517",
					"specializationId": "95",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a079\u70b9"
				},
				"2518": {
					"id": "2518",
					"specializationId": "95",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a092\u70b9"
				},
				"2519": {
					"id": "2519",
					"specializationId": "95",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0106\u70b9"
				},
				"2529": {
					"id": "2529",
					"specializationId": "95",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0258\u70b9"
				},
				"2528": {
					"id": "2528",
					"specializationId": "95",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0240\u70b9"
				},
				"2527": {
					"id": "2527",
					"specializationId": "95",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0222\u70b9"
				},
				"2526": {
					"id": "2526",
					"specializationId": "95",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0222\u70b9"
				},
				"2525": {
					"id": "2525",
					"specializationId": "95",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0204\u70b9"
				},
				"2524": {
					"id": "2524",
					"specializationId": "95",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0186\u70b9"
				},
				"2523": {
					"id": "2523",
					"specializationId": "95",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0168\u70b9"
				},
				"2522": {
					"id": "2522",
					"specializationId": "95",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0152\u70b9"
				},
				"2521": {
					"id": "2521",
					"specializationId": "95",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0136\u70b9"
				},
				"2520": {
					"id": "2520",
					"specializationId": "95",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff1a\u4e0d\u4f1a\u53d1\u73b0\u548c\u88ab\u653b\u51fb\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e40%\uff0c\u9690\u8eab\u5492\u6548\u679c\u6700\u591a\u6301\u7eed15\u79d2\uff0c\u653b\u51fb\u654c\u4eba\u4f1a\u7acb\u523b\u9000\u51fa\u9690\u8eab\u5492\u72b6\u6001\uff0c\u89e3\u9664\u9690\u8eab\u5492\u540e10\u79d2\u5185,\u653b\u51fb\u529b\u589e\u52a0120\u70b9"
				},
				"1623": {
					"id": "1623",
					"specializationId": "96",
					"step": "1",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "0",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210167%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210229%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u621096%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210229%\u4f24\u5bb3\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210463%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2286": {
					"id": "2286",
					"specializationId": "96",
					"step": "3",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210183%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210250%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210327%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210105%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210505%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2285": {
					"id": "2285",
					"specializationId": "96",
					"step": "2",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210175%\u4f24\u5bb3\u3002\r\n4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210240%\u4f24\u5bb3\u3002\r\n5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210313%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210100%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210484%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"1643": {
					"id": "1643",
					"specializationId": "97",
					"step": "1",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210172%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210230%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210158%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210417%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210189%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210653%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2533": {
					"id": "2533",
					"specializationId": "97",
					"step": "3",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210188%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210251%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210173%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210455%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210206%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210713%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2532": {
					"id": "2532",
					"specializationId": "97",
					"step": "2",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210180%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210241%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210165%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210436%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210198%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210683%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2252": {
					"id": "2252",
					"specializationId": "88",
					"step": "7",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210186%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210238%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210296%\u4f24\u5bb3\u3002"
				},
				"2253": {
					"id": "2253",
					"specializationId": "88",
					"step": "8",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210193%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210247%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210307%\u4f24\u5bb3\u3002"
				},
				"2254": {
					"id": "2254",
					"specializationId": "88",
					"step": "9",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": " 1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210199%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210255%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210317%\u4f24\u5bb3\u3002"
				},
				"2255": {
					"id": "2255",
					"specializationId": "88",
					"step": "10",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210206%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210264%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210328%\u4f24\u5bb3\u3002"
				},
				"2256": {
					"id": "2256",
					"specializationId": "88",
					"step": "11",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210213%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210272%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210339%\u4f24\u5bb3\u3002"
				},
				"2257": {
					"id": "2257",
					"specializationId": "88",
					"step": "12",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210219%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210281%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210349%\u4f24\u5bb3\u3002"
				},
				"2258": {
					"id": "2258",
					"specializationId": "88",
					"step": "13",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": " 1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n 3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210226%\u4f24\u5bb3\r\n 4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210289%\u4f24\u5bb3\u3002\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210360%\u4f24\u5bb3\u3002"
				},
				"2259": {
					"id": "2259",
					"specializationId": "88",
					"step": "14",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "  1. \u539f\u5730\u8df3\u8d77\r\n  2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n  3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210233%\u4f24\u5bb3\r\n  4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210297%\u4f24\u5bb3\u3002\r\n  5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210371%\u4f24\u5bb3\u3002"
				},
				"2260": {
					"id": "2260",
					"specializationId": "88",
					"step": "15",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "  1. \u539f\u5730\u8df3\u8d77\r\n   2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n   3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210240%\u4f24\u5bb3\r\n   4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210305%\u4f24\u5bb3\u3002\r\n   5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210382%\u4f24\u5bb3\u3002"
				},
				"2261": {
					"id": "2261",
					"specializationId": "88",
					"step": "16",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "  1. \u539f\u5730\u8df3\u8d77\r\n    2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n    3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210247%\u4f24\u5bb3\r\n    4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210313%\u4f24\u5bb3\u3002\r\n    5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210393%\u4f24\u5bb3\u3002"
				},
				"2262": {
					"id": "2262",
					"specializationId": "88",
					"step": "17",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "  1. \u539f\u5730\u8df3\u8d77\r\n  2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n  3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210254%\u4f24\u5bb3\r\n  4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210321%\u4f24\u5bb3\u3002\r\n  5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210404%\u4f24\u5bb3\u3002"
				},
				"2263": {
					"id": "2263",
					"specializationId": "88",
					"step": "18",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "  1. \u539f\u5730\u8df3\u8d77\r\n   2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n   3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210261%\u4f24\u5bb3\r\n   4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210329%\u4f24\u5bb3\u3002\r\n   5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210415%\u4f24\u5bb3\u3002"
				},
				"2264": {
					"id": "2264",
					"specializationId": "88",
					"step": "19",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "  1. \u539f\u5730\u8df3\u8d77\r\n    2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n    3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210268%\u4f24\u5bb3\r\n    4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210337%\u4f24\u5bb3\u3002\r\n    5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210426%\u4f24\u5bb3\u3002"
				},
				"2265": {
					"id": "2265",
					"specializationId": "88",
					"step": "20",
					"castTime": "\u8fde\u51fb",
					"castRange": "2\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "  1. \u539f\u5730\u8df3\u8d77\r\n     2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9&\uff09\u4f24\u5bb3\u3002\r\n     3. \u5feb\u901f\u5411\u7a7a\u4e2d\u65cb\u8f6c\u8eab\u4f53\uff0c\u540c\u65f6\u628a\u8eab\u8fb9\u6700\u591a6\u4e2a\u654c\u4eba\u5377\u5165\u7a7a\u4e2d\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210275%\u4f24\u5bb3\r\n     4. \u4ece\u7a7a\u4e2d\u5f3a\u88ad\u5730\u9762\u4f60\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210345%\u4f24\u5bb3\u3002\r\n     5. \uff08\u8fde\u51fb\u70b9+1\uff09\u5229\u7528\u8eab\u4f53\u4ece\u7a7a\u4e2d\u4e0b\u843d\u7684\u529b\u91cf\uff0c\u5bf9\u6307\u5b9a\u8303\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210437%\u4f24\u5bb3\u3002"
				},
				"2282": {
					"id": "2282",
					"specializationId": "92",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210816%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101634%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2283": {
					"id": "2283",
					"specializationId": "92",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210837%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101676%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2284": {
					"id": "2284",
					"specializationId": "92",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-5\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u811a\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u987a\u52bf\u63a8\u5f00\u9762\u524d\u7684\u654c\u4eba\uff0c\u9020\u6210858%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c1\u79d2\uff0c\u800c\u540e\u518d\u84c4\u529b\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101718%\u4f24\u5bb3\uff0c\u53ef\u63a5\u5728\u4efb\u4f55\u8fde\u62db\u62db\u5f0f\u4e4b\u540e"
				},
				"2287": {
					"id": "2287",
					"specializationId": "96",
					"step": "4",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210190%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210261%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210341%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210109%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210527%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2288": {
					"id": "2288",
					"specializationId": "96",
					"step": "5",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210198%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210271%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210354%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210113%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210548%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2289": {
					"id": "2289",
					"specializationId": "96",
					"step": "6",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210206%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210282%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210368%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210118%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210569%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2290": {
					"id": "2290",
					"specializationId": "96",
					"step": "7",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210214%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210292%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210382%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210112%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210590%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2291": {
					"id": "2291",
					"specializationId": "96",
					"step": "8",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210221%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210303%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210396%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210127%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210612%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2292": {
					"id": "2292",
					"specializationId": "96",
					"step": "9",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210229%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210313%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210410%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210131%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210633%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2293": {
					"id": "2293",
					"specializationId": "96",
					"step": "10",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210237%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210324%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210423%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210135%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210654%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2294": {
					"id": "2294",
					"specializationId": "96",
					"step": "11",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210244%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210335%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210437%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210140%\u4f24\u5bb3\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210675%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2295": {
					"id": "2295",
					"specializationId": "96",
					"step": "12",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210252%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210345%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u9020\u6210451%\u4f24\u5bb3\uff0c\u4f7f\u4ed6\u4eec\u6d6e\u7a7a\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u6bcf\u6b21\u9020\u6210\u9020\u6210144%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210697%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2296": {
					"id": "2296",
					"specializationId": "96",
					"step": "13",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n 2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210260%\u4f24\u5bb3\u3002\r\n 4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210356%\u4f24\u5bb3\u3002\r\n 5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210465%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n 6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210149%\u4f24\u5bb3\u3002\r\n 7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210718%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2297": {
					"id": "2297",
					"specializationId": "96",
					"step": "14",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n  2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n  3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210268%\u4f24\u5bb3\u3002\r\n  4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210367%\u4f24\u5bb3\u3002\r\n  5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210479%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n  6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210154%\u4f24\u5bb3\u3002\r\n  7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210739%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2298": {
					"id": "2298",
					"specializationId": "96",
					"step": "15",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n   2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n   3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210276%\u4f24\u5bb3\u3002\r\n   4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210378%\u4f24\u5bb3\u3002\r\n   5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210493%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n   6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210159%\u4f24\u5bb3\u3002\r\n   7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210760%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2299": {
					"id": "2299",
					"specializationId": "96",
					"step": "16",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n    2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n    3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210283%\u4f24\u5bb3\u3002\r\n    4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210389%\u4f24\u5bb3\u3002\r\n    5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210507%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n    6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210164%\u4f24\u5bb3\u3002\r\n    7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210781%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2300": {
					"id": "2300",
					"specializationId": "96",
					"step": "17",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n     2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n     3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210291%\u4f24\u5bb3\u3002\r\n     4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210400%\u4f24\u5bb3\u3002\r\n     5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210521%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n     6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210169%\u4f24\u5bb3\u3002\r\n     7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210802%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2301": {
					"id": "2301",
					"specializationId": "96",
					"step": "18",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n      2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n      3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210299%\u4f24\u5bb3\u3002\r\n      4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210411%\u4f24\u5bb3\u3002\r\n      5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210535%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n      6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210174%\u4f24\u5bb3\u3002\r\n      7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210823%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2302": {
					"id": "2302",
					"specializationId": "96",
					"step": "19",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n       2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n       3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210307%\u4f24\u5bb3\u3002\r\n       4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210422%\u4f24\u5bb3\u3002\r\n       5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210549%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n       6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210179%\u4f24\u5bb3\u3002\r\n       7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210844%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2303": {
					"id": "2303",
					"specializationId": "96",
					"step": "20",
					"castTime": "\u8fde\u51fb",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u539f\u5730\u8df3\u8d77\r\n2. \u4ece\u7a7a\u4e2d\u98de\u5feb\u7684\u8e39\u5411\u9f20\u6807\u6240\u5728\u4f4d\u7f6e\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba146%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.9%\uff09\u4f24\u5bb3\u3002\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210315%\u4f24\u5bb3\u3002\r\n4. \u6d88\u801713\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210433%\u4f24\u5bb3\u3002\r\n5. \u6d88\u801717\u70b9\u4f53\u529b\u7528\u62f3\u7834\u574f\u5730\u9762\uff0c\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210563%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\u3002\r\n6. \u6d88\u801720\u70b9\u4f53\u529b\uff0c\u5feb\u901f\u653b\u51fb\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210184%\u4f24\u5bb3\u3002\r\n7. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u80171\u4e2a\u610f\u7075\u6676\u548c25\u70b9\u4f53\u529b\uff0c\u4ece\u7a7a\u4e2d\u731b\u51fb\u5730\u4e0a\u6700\u591a6\u4e2a\u654c\u4eba\uff0c\u5bf9\u4ed6\u4eec\u9020\u6210865%\u4f24\u5bb3\uff0c\u671f\u95f4\u9738\u4f53\u3002"
				},
				"2310": {
					"id": "2310",
					"specializationId": "19",
					"step": "8",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621057\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621091%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523030%\u4f24\u5bb3"
				},
				"2311": {
					"id": "2311",
					"specializationId": "19",
					"step": "9",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621059\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621094%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523031%\u4f24\u5bb3"
				},
				"2312": {
					"id": "2312",
					"specializationId": "19",
					"step": "10",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621061\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u621098%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523032%\u4f24\u5bb3"
				},
				"2313": {
					"id": "2313",
					"specializationId": "19",
					"step": "11",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621063\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210101%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523033%\u4f24\u5bb3"
				},
				"2314": {
					"id": "2314",
					"specializationId": "19",
					"step": "12",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621065\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210104%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523034%\u4f24\u5bb3"
				},
				"2315": {
					"id": "2315",
					"specializationId": "19",
					"step": "13",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621067\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210108%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523036%\u4f24\u5bb3"
				},
				"2316": {
					"id": "2316",
					"specializationId": "19",
					"step": "14",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621069\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210111%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523037%\u4f24\u5bb3"
				},
				"2317": {
					"id": "2317",
					"specializationId": "19",
					"step": "15",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621071\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210114%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523038%\u4f24\u5bb3"
				},
				"2318": {
					"id": "2318",
					"specializationId": "19",
					"step": "16",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n  2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n  3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621073\u70b9\u4f24\u5bb3\r\n  4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210117%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523039%\u4f24\u5bb3"
				},
				"2319": {
					"id": "2319",
					"specializationId": "19",
					"step": "17",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n   2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n   3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621075\u70b9\u4f24\u5bb3\r\n   4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210120%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523040%\u4f24\u5bb3"
				},
				"2320": {
					"id": "2320",
					"specializationId": "19",
					"step": "18",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n    2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n    3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621077\u70b9\u4f24\u5bb3\r\n    4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210123%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523041%\u4f24\u5bb3"
				},
				"2321": {
					"id": "2321",
					"specializationId": "19",
					"step": "19",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621079\u70b9\u4f24\u5bb3\r\n4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210126%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523042%\u4f24\u5bb3"
				},
				"2322": {
					"id": "2322",
					"specializationId": "19",
					"step": "20",
					"castTime": "\u8fde\u51fb",
					"castRange": "\u4e09\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.8\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1%\uff09\r\n 2. \u653b\u51fb\u524d\u9762\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7+1.7%\uff09\r\n 3. \u51fa\u624b\u75be\u5982\u6d41\u661f\uff0c\u4ee4\u4eba\u773c\u82b1\u7f2d\u4e71\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u5730\u65b9\u53d1\u52a8\u5feb\u901f\u653b\u51fb\uff0c\u4e00\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u621081\u70b9\u4f24\u5bb3\r\n 4. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\u9020\u6210129%\u4f24\u5bb3\uff0c\u540c\u65f6\u8ba9\u5176\u4e2d\u4e00\u4e2a\u4eba\u53d7\u5230\u5185\u4f24,\u572815\u79d2\u5185\u6bcf\u79d2\u53d7\u523043%\u4f24\u5bb3"
				},
				"2326": {
					"id": "2326",
					"specializationId": "58",
					"step": "5",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210222%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210265%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210319%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2327": {
					"id": "2327",
					"specializationId": "58",
					"step": "6",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210231%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210276%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210331%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2328": {
					"id": "2328",
					"specializationId": "58",
					"step": "7",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210240%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210287%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210344%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2329": {
					"id": "2329",
					"specializationId": "58",
					"step": "8",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "28",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210187%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210223%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210268%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2330": {
					"id": "2330",
					"specializationId": "58",
					"step": "9",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210258%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210308%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210370%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2331": {
					"id": "2331",
					"specializationId": "58",
					"step": "10",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210267%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210319%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210382%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2332": {
					"id": "2332",
					"specializationId": "58",
					"step": "11",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210276%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210329%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210395%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2333": {
					"id": "2333",
					"specializationId": "58",
					"step": "12",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210284%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210340%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210408%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2334": {
					"id": "2334",
					"specializationId": "58",
					"step": "13",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210293%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210350%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210421%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2335": {
					"id": "2335",
					"specializationId": "58",
					"step": "14",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210302%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210361%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210433%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2336": {
					"id": "2336",
					"specializationId": "58",
					"step": "15",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n 3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210311%\u4f24\u5bb3\r\n 4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210372%\u4f24\u5bb3\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210445%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2337": {
					"id": "2337",
					"specializationId": "58",
					"step": "16",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n  2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n  3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210320%\u4f24\u5bb3\r\n  4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210383%\u4f24\u5bb3\r\n  5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210457%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2338": {
					"id": "2338",
					"specializationId": "58",
					"step": "17",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210329%\u4f24\u5bb3\r\n4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210394%\u4f24\u5bb3\r\n5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210469%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2339": {
					"id": "2339",
					"specializationId": "58",
					"step": "18",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n 3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210338%\u4f24\u5bb3\r\n 4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210405%\u4f24\u5bb3\r\n 5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210481%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2340": {
					"id": "2340",
					"specializationId": "58",
					"step": "19",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n  2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n  3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210347%\u4f24\u5bb3\r\n  4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210416%\u4f24\u5bb3\r\n  5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210493%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2341": {
					"id": "2341",
					"specializationId": "58",
					"step": "20",
					"castTime": "\u8fde\u51fb",
					"castRange": "3\u7c73",
					"castCost": "0\u4f53\u529b",
					"cooldown": "0.3\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u621070%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n   2. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210132%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.7%\uff09\r\n   3. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210356%\u4f24\u5bb3\r\n   4. \u653b\u51fb\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\uff0c\u9020\u6210427%\u4f24\u5bb3\r\n   5. \uff08\u8fde\u51fb\u70b9+1\uff09\u653b\u51fb\u9762\u524d\u6700\u591a4\u4e2a\u654c\u4eba\uff0c\u9020\u6210505%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u51fb\u98de\u3002"
				},
				"2359": {
					"id": "2359",
					"specializationId": "66",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210359%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210346%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2360": {
					"id": "2360",
					"specializationId": "66",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u4f53\u529b",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u62f3\u548c\u8f7b\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u671d\u56db\u5468\u796d\u51fa\u624b\u4e2d\u7684\u6b66\u5668,\u5bf9\u5468\u56f4\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210368%\u4f24\u5bb3\uff0c\u5728\u6b66\u5668\u6536\u56de\u671f\u95f4\u518d\u6b21\u5bf9\u76ee\u6807\u9020\u6210355%\u4f24\u5bb3\uff0c\u540c\u65f6\u628a\u76ee\u6807\u805a\u62e2\u8d77\u6765"
				},
				"2378": {
					"id": "2378",
					"specializationId": "73",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210368%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2379": {
					"id": "2379",
					"specializationId": "73",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\uff08\u8fde\u51fb\u70b9-4\uff09\u540c\u65f6\u6309\u4e0b\u811a\u548c\u91cd\u68cd\uff0c\u6216\u76f4\u63a5\u5728\u6280\u80fd\u5feb\u6377\u680f\u4e2d\u4f7f\u7528\uff0c\u7075\u7334\u51dd\u805a\u771f\u6c14\u5411\u524d\u5288\u51fa\u4e00\u68cd\u540e\uff0c\u771f\u6c14\u5c06\u6301\u7eed\u51fb\u9000\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba,\u603b\u5171\u653b\u51fb4\u6b21\uff0c\u6bcf\u6b21\u9020\u6210377%\u4f24\u5bb3\uff0c\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u602a\u7269\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2396": {
					"id": "2396",
					"specializationId": "80",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a06741\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2397": {
					"id": "2397",
					"specializationId": "80",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a07128\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2398": {
					"id": "2398",
					"specializationId": "80",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8eab\u5f62\u5982\u98ce\uff0c\u653b\u5b88\u4e4b\u95f4\u5c3d\u663e\u4ece\u5bb9,\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u9632\u5fa1\u503c\u589e\u52a07515\u70b9\uff0c\u6301\u7eed12\u79d2\uff0c\u6bcf20\u79d2\u53ea\u80fd\u4eab\u53d7\u4e00\u6b21\u5de8\u733f\u62f3\u7f61\u3002"
				},
				"2415": {
					"id": "2415",
					"specializationId": "84",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733482%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2416": {
					"id": "2416",
					"specializationId": "84",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733483%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2417": {
					"id": "2417",
					"specializationId": "84",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "45.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4f20\u81ea\u9f50\u5929\u5927\u5723\uff0c\u53ef\u5e7b\u5316\u5206\u8eab,\uff0c\u53ec\u5524\u51fa1\u4e2a\u5e7b\u5f71\u8fdb\u884c\u6218\u6597,\u5176\u7ee7\u627f\u7075\u733486%\u7684\u5c5e\u6027\uff0c\u5e7b\u5f71\u6301\u7eed30\u79d2"
				},
				"2418": {
					"id": "2418",
					"specializationId": "89",
					"step": "2",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210151%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210182%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210219%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210290%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2419": {
					"id": "2419",
					"specializationId": "89",
					"step": "3",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210158%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210190%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210229%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210303%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2420": {
					"id": "2420",
					"specializationId": "89",
					"step": "4",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210165%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210198%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210238%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210316%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2421": {
					"id": "2421",
					"specializationId": "89",
					"step": "5",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "23",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210171%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210206%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210248%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210328%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2422": {
					"id": "2422",
					"specializationId": "89",
					"step": "6",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210178%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210214%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210258%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210341%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2423": {
					"id": "2423",
					"specializationId": "89",
					"step": "7",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210185%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210222%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210267%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210354%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2424": {
					"id": "2424",
					"specializationId": "89",
					"step": "8",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210191%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210230%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210277%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210367%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2425": {
					"id": "2425",
					"specializationId": "89",
					"step": "9",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210198%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210238%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210286%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210380%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2426": {
					"id": "2426",
					"specializationId": "89",
					"step": "10",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210204%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210246%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210296%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210392%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2427": {
					"id": "2427",
					"specializationId": "89",
					"step": "11",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210211%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210254%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210306%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210405%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2428": {
					"id": "2428",
					"specializationId": "89",
					"step": "12",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": " 1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210218%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210262%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210315%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210418%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2429": {
					"id": "2429",
					"specializationId": "89",
					"step": "13",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n 2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n 3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210224%\u4f24\u5bb3\r\n 4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210270%\u4f24\u5bb3\r\n 5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210325%\u4f24\u5bb3\r\n 6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210431%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2430": {
					"id": "2430",
					"specializationId": "89",
					"step": "14",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n  2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n  3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210230%\u4f24\u5bb3\r\n  4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210278%\u4f24\u5bb3\r\n  5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210335%\u4f24\u5bb3\r\n  6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210444%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2431": {
					"id": "2431",
					"specializationId": "89",
					"step": "15",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n   2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n   3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210236%\u4f24\u5bb3\r\n   4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210286%\u4f24\u5bb3\r\n   5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210345%\u4f24\u5bb3\r\n   6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210457%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2432": {
					"id": "2432",
					"specializationId": "89",
					"step": "16",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n    2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n    3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210242%\u4f24\u5bb3\r\n    4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210294%\u4f24\u5bb3\r\n    5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210355%\u4f24\u5bb3\r\n    6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210470%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2433": {
					"id": "2433",
					"specializationId": "89",
					"step": "17",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n     2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n     3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210248%\u4f24\u5bb3\r\n     4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210302%\u4f24\u5bb3\r\n     5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210365%\u4f24\u5bb3\r\n     6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210483%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2434": {
					"id": "2434",
					"specializationId": "89",
					"step": "18",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n      2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n      3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210254%\u4f24\u5bb3\r\n      4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210310%\u4f24\u5bb3\r\n      5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210375%\u4f24\u5bb3\r\n      6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210496%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2435": {
					"id": "2435",
					"specializationId": "89",
					"step": "19",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n       2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n       3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210260%\u4f24\u5bb3\r\n       4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210318%\u4f24\u5bb3\r\n       5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210385%\u4f24\u5bb3\r\n       6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210509%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2436": {
					"id": "2436",
					"specializationId": "89",
					"step": "20",
					"castTime": "\u8fde\u51fb",
					"castRange": "10\u7c73",
					"castCost": "",
					"cooldown": "1.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u621084%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01%\uff09\r\n        2. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210107%\u4f24\u5bb3\uff08\u89d2\u8272\u6bcf\u5347\u4e00\u7ea7\u589e\u52a01.3%\uff09\r\n        3. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210266%\u4f24\u5bb3\r\n        4. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210326%\u4f24\u5bb3\r\n        5. \u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210395%\u4f24\u5bb3\r\n        6. \uff08\u8fde\u51fb\u70b9+1\uff09\u5bf9\u6247\u5f62\u8303\u56f4\u5185\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210522%\u4f24\u5bb3\uff0c\u4f7f\u76ee\u6807\u6d6e\u7a7a\u3002"
				},
				"2452": {
					"id": "2452",
					"specializationId": "90",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0569\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2453": {
					"id": "2453",
					"specializationId": "90",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0601\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2454": {
					"id": "2454",
					"specializationId": "90",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0633\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2455": {
					"id": "2455",
					"specializationId": "90",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "60.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u4e00\u65e6\u65bd\u5c55\u5954\u884c\u5982\u98ce,\u79fb\u52a8\u901f\u5ea6\u589e\u52a030%\u3001\u8eab\u6cd5\u503c\u589e\u52a0665\u70b9\uff0c\u6301\u7eed15\u79d2\uff0c\u9700\u8981\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9"
				},
				"2534": {
					"id": "2534",
					"specializationId": "97",
					"step": "4",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210196%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210262%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210180%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210475%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210215%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210743%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},

				"2535": {
					"id": "2535",
					"specializationId": "97",
					"step": "5",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210204%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210272%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210187%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210494%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210224%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210773%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2536": {
					"id": "2536",
					"specializationId": "97",
					"step": "6",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210212%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210283%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210194%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210513%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210232%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210803%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2537": {
					"id": "2537",
					"specializationId": "97",
					"step": "7",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210220%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210293%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210202%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210532%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210241%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210833%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2538": {
					"id": "2538",
					"specializationId": "97",
					"step": "8",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210228%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210304%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210209%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210551%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210250%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210863%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2539": {
					"id": "2539",
					"specializationId": "97",
					"step": "9",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210236%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210315%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210216%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210570%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210258%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210893%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2540": {
					"id": "2540",
					"specializationId": "97",
					"step": "10",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210243%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210325%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210223%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210590%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210267\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210923%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2541": {
					"id": "2541",
					"specializationId": "97",
					"step": "11",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210251%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210336%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210231%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210609%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210276%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210953%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2542": {
					"id": "2542",
					"specializationId": "97",
					"step": "12",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210259%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210346%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210238%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210628%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210284%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210983%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2543": {
					"id": "2543",
					"specializationId": "97",
					"step": "13",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210267%\u4f24\u5bb3\r\n4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210357%\u4f24\u5bb3\r\n5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210245%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210647%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210293%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101013%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2544": {
					"id": "2544",
					"specializationId": "97",
					"step": "14",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n 2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n 3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210275%\u4f24\u5bb3\r\n 4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210368%\u4f24\u5bb3\r\n 5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210252%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n 6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210666%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n 7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210302%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n 8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101033%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2545": {
					"id": "2545",
					"specializationId": "97",
					"step": "15",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n  2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n  3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210283%\u4f24\u5bb3\r\n  4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210379%\u4f24\u5bb3\r\n  5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210259%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n  6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210685%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n  7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210311%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n  8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101053%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2546": {
					"id": "2546",
					"specializationId": "97",
					"step": "16",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n   2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n   3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210291%\u4f24\u5bb3\r\n   4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210390%\u4f24\u5bb3\r\n   5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210266%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n   6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210704%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n   7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210320%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n   8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101073%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2547": {
					"id": "2547",
					"specializationId": "97",
					"step": "17",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n    2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n    3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210299%\u4f24\u5bb3\r\n    4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210401%\u4f24\u5bb3\r\n    5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210273%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n    6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210733%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n    7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210329%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n    8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101093%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2548": {
					"id": "2548",
					"specializationId": "97",
					"step": "18",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n     2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n     3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210307%\u4f24\u5bb3\r\n     4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210412%\u4f24\u5bb3\r\n     5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210280%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n     6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210752%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n     7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210338%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n     8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101113%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2549": {
					"id": "2549",
					"specializationId": "97",
					"step": "19",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n      2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n      3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210315%\u4f24\u5bb3\r\n      4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210423\u4f24\u5bb3\r\n      5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210287%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n      6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210771%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n      7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210347%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n      8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101133%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				},
				"2550": {
					"id": "2550",
					"specializationId": "97",
					"step": "20",
					"castTime": "",
					"castRange": "",
					"castCost": "10\u4f53\u529b",
					"cooldown": "0.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "1. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n       2. \u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n       3. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\r\n       4. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210434\u4f24\u5bb3\r\n       5. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210294%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n       6. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u6210790%\u4f24\u5bb3\uff0c\u6d6e\u7a7a\uff0c\u7834\u9632\r\n       7. \u6d88\u801710\u70b9\u4f53\u529b\uff0c\u5bf9\u9762\u524d\u6700\u591a3\u4e2a\u654c\u4eba\u653b\u51fb9\u6b21\uff0c\u6bcf\u6b21\u9020\u6210356%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632\r\n       8. \uff08\u8fde\u51fb\u70b9+1\uff09\u6d88\u801710\u70b9\u4f53\u529b\u548c\u4e00\u4e2a\u610f\u7075\u6676\uff0c\u5bf9\u9762\u524d\u6700\u591a6\u4e2a\u654c\u4eba\u9020\u62101153%\u4f24\u5bb3\uff0c\u671f\u95f4\u65e0\u654c\uff0c\u7834\u9632"
				}
			},
			"specializationSpellUpgrade": {
				"8": {
					"id": "8",
					"specializationId": "19",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u53ef\u4ee5\u7528\u3010\u811a\u3011\u66ff\u6362\u4e71\u661f\u821e\u7b2c4\u5f0f\u7684\u3010\u62f3\u3011\u4f7f\u7528",
					"effect": {
						"1": "20",
						"2": "21"
					}
				},
				"14": {
					"id": "14",
					"specializationId": "19",
					"name": "\u5165\u9aa8",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u3001\u75be\u5f71\u817f\u7b2c5\u5f0f\u3001\u62f3\u5b9a\u516b\u8352\u7b2c5\u548c\u7b2c7\u5f0f\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u7684\u76ee\u6807\u9020\u6210\u989d\u5916\u7684\u4f24\u5bb3\uff0c\u6548\u679c\u4e3a\u7075\u7334\u751f\u547d\u503c\u4e0a\u9650\u768420%",
					"effect": {
						"1": "73"
					}
				},
				"35": {
					"id": "35",
					"specializationId": "19",
					"name": "\u7206\u70b8",
					"description": "\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u6b7b\u4ea1\u65f6\u5bf9\u5468\u56f4\u6240\u6709\u7684\u654c\u4eba\u9020\u6210\u989d\u5916\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u4e3a\u7075\u7334\u751f\u547d\u4e0a\u9650\u7684120%",
					"effect": {
						"1": "75"
					}
				},
				"37": {
					"id": "37",
					"specializationId": "19",
					"name": "\u4f24\u5bb3\u52a0\u6df1",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8225%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534775%",
					"effect": {
						"1": "79",
						"2": "86",
						"3": "87",
						"4": "88",
						"5": "89",
						"6": "90",
						"7": "91"
					}
				},
				"43": {
					"id": "43",
					"specializationId": "19",
					"name": "\u4f24\u53e3\u52a0\u6df1",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8150%",
					"effect": {
						"1": "100",
						"2": "101",
						"3": "102",
						"4": "103",
						"5": "104",
						"6": "105",
						"7": "106"
					}
				},
				"52": {
					"id": "52",
					"specializationId": "58",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u53ef\u4ee5\u7528\u3010\u8f7b\u68cd\u3011\u66ff\u6362\u5954\u96f7\u51fb\u7b2c4\u30015\u5f0f\u7684\u3010\u91cd\u68cd\u3011\u4f7f\u7528\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u5954\u96f7\u51fb\u8fde\u62db",
					"effect": {
						"1": "142",
						"2": "143",
						"3": "144"
					}
				},
				"54": {
					"id": "54",
					"specializationId": "58",
					"name": "\u5b9a\u6d77\u795e\u9488\u4e00\u91cd",
					"description": "\u5b8c\u5168\u65bd\u5c55\u5954\u96f7\u51fb\u540e\uff0c\u68cd\u5b50\u8fdb\u5165\u5b9a\u6d77\u795e\u94881\u91cd\u72b6\u6001\uff0c\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u7684\u4f24\u5bb3\u63d0\u9ad825%\uff0c\u4f46\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e20%\uff0c\u653b\u51fb\u901f\u5ea6\u964d\u4f4e30\u70b9\uff0c\u6548\u679c\u6301\u7eed30\u79d2",
					"effect": {
						"1": "154"
					}
				},
				"55": {
					"id": "55",
					"specializationId": "58",
					"name": "\u795e\u68cd",
					"description": "\u5904\u4e8e\u5b9a\u6d77\u795e\u9488\u72b6\u6001\u65f6\uff0c\u6240\u6709\u4ee5\u68cd\u7cfb\u62db\u5f0f\u7ed3\u5c3e\u7684\u8fde\u62db\u7684\u8fde\u51fb\u70b9+1\uff0c\u4f46\u4f7f\u7528\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u90fd\u9700\u8981\u989d\u5916\u6d88\u80174\u70b9\u4f53\u529b",
					"effect": {
						"1": "178"
					}
				},
				"56": {
					"id": "56",
					"specializationId": "58",
					"name": "\u719f\u7ec3\u4e8e\u5fc3",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad830%",
					"effect": {
						"1": "187",
						"2": "188",
						"3": "189",
						"4": "190",
						"5": "191",
						"6": "192",
						"7": "193"
					}
				},
				"57": {
					"id": "57",
					"specializationId": "58",
					"name": "\u5343\u94a7",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "218",
						"2": "225",
						"3": "226",
						"4": "227",
						"5": "228",
						"6": "229",
						"7": "230"
					}
				},
				"77": {
					"id": "77",
					"specializationId": "66",
					"name": "\u4f4e\u8017",
					"description": "\u65cb\u7a7a\u9707\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9",
					"effect": {
						"1": "548"
					}
				},
				"81": {
					"id": "81",
					"specializationId": "66",
					"name": "\u8303\u56f4",
					"description": "\u4f7f\u65cb\u7a7a\u9707\u7684\u653b\u51fb\u8303\u56f4\u589e\u52a050%",
					"effect": {
						"1": "558"
					}
				},
				"84": {
					"id": "84",
					"specializationId": "66",
					"name": "\u65e0\u4e2d\u751f\u6709",
					"description": "\u4f7f\u7528\u65cb\u7a7a\u9707\u540e\uff0c\u4e0b\u4e00\u6b21\u7684\u8f70\u5929\u62f3\u6216\u7834\u5929\u68cd\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8100%",
					"effect": {
						"1": "574"
					}
				},
				"87": {
					"id": "87",
					"specializationId": "66",
					"name": "\u4f24\u5bb3\u52a0\u6df1",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "593",
						"2": "594",
						"3": "595",
						"4": "596",
						"5": "597",
						"6": "598",
						"7": "599"
					}
				},
				"89": {
					"id": "89",
					"specializationId": "66",
					"name": "\u65ad\u7b4b",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u6709100%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a7\u79d2",
					"effect": {
						"1": "625",
						"2": "627",
						"3": "628",
						"4": "629",
						"5": "630",
						"6": "631",
						"7": "632"
					}
				},
				"102": {
					"id": "102",
					"specializationId": "73",
					"name": "\u4f4e\u8017",
					"description": "\u5206\u8eab\u5288\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9",
					"effect": {
						"1": "672"
					}
				},
				"104": {
					"id": "104",
					"specializationId": "73",
					"name": "\u5f62\u5f71\u76f8\u968f",
					"description": "\u82e5\u7075\u7334\u7684\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\uff0c\u5219\u5206\u8eab\u5288\u7b2c2\u30013\u30014\u4e0b\u4f24\u5bb3\u6574\u4f53\u63d0\u534750%",
					"effect": {
						"1": "677"
					}
				},
				"107": {
					"id": "107",
					"specializationId": "73",
					"name": "\u65e0\u4e2d\u751f\u6709",
					"description": "\u4f7f\u7528\u5206\u8eab\u5288\u540e\uff0c\u4e0b\u4e00\u6b21\u7684\u8f70\u5929\u62f3\u6216\u7834\u5929\u68cd\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8100%",
					"effect": {
						"1": "694"
					}
				},
				"110": {
					"id": "110",
					"specializationId": "73",
					"name": "\u4f24\u5bb3\u52a0\u6df1",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "708",
						"2": "709",
						"3": "710",
						"4": "711",
						"5": "712",
						"6": "713",
						"7": "714"
					}
				},
				"111": {
					"id": "111",
					"specializationId": "73",
					"name": "\u8fd0\u8f6c",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f420\u79d2",
					"effect": {
						"1": "733",
						"2": "734",
						"3": "735",
						"4": "736",
						"5": "737",
						"6": "738",
						"7": "739"
					}
				},
				"127": {
					"id": "127",
					"specializationId": "80",
					"name": "\u653b\u51fb",
					"description": "\u5904\u4e8e\u5de8\u733f\u62f3\u7f61\u671f\u95f4\uff0c\u9020\u6210\u7684\u6240\u6709\u4f24\u5bb3\u63d0\u9ad825%",
					"effect": {
						"1": "750"
					}
				},
				"129": {
					"id": "129",
					"specializationId": "80",
					"name": "\u540c\u4ec7\u654c\u5ffe",
					"description": "\u4f7f\u961f\u53cb\u4e5f\u80fd\u4eab\u53d7\u5de8\u733f\u62f3\u7f61\u7684\u6548\u679c",
					"effect": {
						"1": "985"
					}
				},
				"131": {
					"id": "131",
					"specializationId": "80",
					"name": "\u88c2\u7532",
					"description": "\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u4e0b\u6240\u6709\u8fde\u62db\u7684\u7834\u9738\u4f53\u80fd\u529b\u63d0\u534720\u70b9",
					"effect": {
						"1": "997"
					}
				},
				"133": {
					"id": "133",
					"specializationId": "80",
					"name": "\u51c6\u5907",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1135%",
					"effect": {
						"1": "1006",
						"2": "1007",
						"3": "1008",
						"4": "1009",
						"5": "1010",
						"6": "1011",
						"7": "1012"
					}
				},
				"136": {
					"id": "136",
					"specializationId": "80",
					"name": "\u957f\u4e45",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a060%",
					"effect": {
						"1": "1016",
						"2": "1023",
						"3": "1024",
						"4": "1025",
						"5": "1026",
						"6": "1027",
						"7": "1028"
					}
				},
				"152": {
					"id": "152",
					"specializationId": "84",
					"name": "\u9ad8\u7ea7\u5206\u8eab",
					"description": "\u5206\u8eab\u5e7b\u5f71\u53ec\u5524\u51fa\u6765\u7684\u5206\u8eab\u4f1a\u91ca\u653e\u60ca\u5929\u4e00\u68d2\u6280\u80fd",
					"effect": {
						"1": "1059"
					}
				},
				"155": {
					"id": "155",
					"specializationId": "84",
					"name": "\u5206\u62c5",
					"description": "\u5f53\u7075\u7334\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u5206\u8eab\u5e7b\u5f71\u5206\u5316\u51fa\u6765\u7684\u5206\u8eab\u4f1a\u4e3a\u7075\u7334\u5206\u62c530%\u4f24\u5bb3",
					"effect": {
						"1": "1062"
					}
				},
				"157": {
					"id": "157",
					"specializationId": "84",
					"name": "\u8089\u4f53\u8f6c\u79fb",
					"description": "\u82e5\u5206\u8eab\u5e7b\u5f71\u5728\u7075\u733430\u7c73\u8303\u56f4\uff0c\u5219\u7075\u7334\u53ef\u4ee5\u907f\u514d\u4e00\u6b21\u6b7b\u4ea1\uff0c\u5e76\u4e14\u6062\u590d20%\u7684\u751f\u547d\u503c\uff0c\u4f46\u6bcf60\u79d2\u53ea\u80fd\u751f\u6548\u4e00\u6b21",
					"effect": {
						"1": "1079"
					}
				},
				"160": {
					"id": "160",
					"specializationId": "84",
					"name": "\u5f71\u5b50\u76f8\u968f",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f60%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "1110",
						"2": "1120",
						"3": "1121",
						"4": "1122",
						"5": "1123",
						"6": "1124",
						"7": "1125"
					}
				},
				"163": {
					"id": "163",
					"specializationId": "84",
					"name": "\u5feb\u901f\u51c6\u5907",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1135%",
					"effect": {
						"1": "1146",
						"2": "1149",
						"3": "1150",
						"4": "1151",
						"5": "1152",
						"6": "1153",
						"7": "1154"
					}
				},
				"312": {
					"id": "312",
					"specializationId": "88",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u53ef\u4ee5\u7528\u3010\u811a\u3011\u66ff\u6362\u75be\u5f71\u817f\u7b2c4\u30015\u5f0f\u7684\u3010\u62f3\u3011\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u75be\u5f71\u817f\u8fde\u62db",
					"effect": {
						"1": "1363",
						"2": "1364",
						"3": "1365"
					}
				},
				"314": {
					"id": "314",
					"specializationId": "88",
					"name": "\u4f20\u67d3",
					"description": "\u75be\u5f71\u817f\u7b2c5\u5f0f\u51fb\u4e2d\u76ee\u6807\u65f6\uff0c\u670980%\u51e0\u7387\u4f7f\u4e71\u661f\u821e\u4ea7\u751f\u7684\u5185\u4f24\u4f24\u5bb3\u6548\u679c\u4f20\u67d3\u7ed9\u9644\u8fd12\u4e2a\u76ee\u6807,\u5e76\u4e14\u5237\u65b0\u4ed6\u4eec\u643a\u5e26\u7684\u4e71\u661f\u821e\u5185\u4f24\u72b6\u6001",
					"effect": {
						"1": "1370"
					}
				},
				"316": {
					"id": "316",
					"specializationId": "88",
					"name": "\u62f3\u811a\u6613\u62db",
					"description": "\u91ca\u653e\u5b8c\u5206\u8eab\u5288\u3001\u65cb\u7a7a\u9707\u3001\u8f70\u5929\u62f3\u540e\u768410\u79d2\u5185\uff0c\u75be\u5f71\u817f\u7684\u7b2c1\u30012\u5f0f\u53d8\u5316\u4e3a\u5176\u4ed6\u62db\u5f0f",
					"effect": {
						"1": "1371"
					}
				},
				"317": {
					"id": "317",
					"specializationId": "88",
					"name": "\u75be\u9a70\u98de\u5f71",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u534745\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002",
					"effect": {
						"1": "1372",
						"2": "1829",
						"3": "1830",
						"4": "1831",
						"5": "1832",
						"6": "1833",
						"7": "1834"
					}
				},
				"318": {
					"id": "318",
					"specializationId": "88",
					"name": "\u75db\u4e0a\u52a0\u75db",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8135%",
					"effect": {
						"1": "1379",
						"2": "1835",
						"3": "1836",
						"4": "1837",
						"5": "1838",
						"6": "1839",
						"7": "1840"
					}
				},
				"324": {
					"id": "324",
					"specializationId": "89",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u53ef\u4ee5\u7528\u3010\u8f7b\u68cd\u3011\u66ff\u6362\u68cd\u52bf\u5982\u5c71\u7b2c4\u30015\u30016\u5f0f\u7684\u3010\u91cd\u68cd\u3011",
					"effect": {
						"1": "1386",
						"2": "1387",
						"3": "1388",
						"4": "1389"
					}
				},
				"325": {
					"id": "325",
					"specializationId": "89",
					"name": "\u5b9a\u6d77\u795e\u9488\u4e8c\u91cd",
					"description": "\u5728\u5b9a\u6d77\u795e\u94881\u91cd\u72b6\u6001\u4e0b\u65f6\uff0c\u68cd\u52bf\u5982\u5c71\u7b2c6\u5f0f\u51fb\u4e2d\u654c\u4eba\u540e\uff0c\u68cd\u5b50\u8fdb\u5165\u5b9a\u6d77\u795e\u94882\u91cd\u72b6\u6001\uff0c\u4f7f\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u7684\u4f24\u5bb3\u63d0\u9ad850%\uff0c\u4f46\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e20%\uff0c\u653b\u51fb\u901f\u5ea6\u51cf\u5c1130\u70b9\uff0c\u6548\u679c\u6301\u7eed30\u79d2",
					"effect": {
						"1": "1393"
					}
				},
				"326": {
					"id": "326",
					"specializationId": "89",
					"name": "\u8fce\u52bf\u800c\u4e0a",
					"description": "\u91ca\u653e\u5b8c\u5206\u8eab\u5288\u3001\u65cb\u7a7a\u9707\u3001\u7834\u5929\u68cd\u540e\u768410\u79d2\u5185\uff0c\u68cd\u52bf\u5982\u5c71\u7b2c1\u30012\u5f0f\u53d1\u751f\u53d8\u62db",
					"effect": {
						"1": "1394"
					}
				},
				"327": {
					"id": "327",
					"specializationId": "89",
					"name": "\u884c\u4e91\u6d41\u6c34",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a030%",
					"effect": {
						"1": "1395",
						"2": "1396",
						"3": "1397",
						"4": "1398",
						"5": "1399",
						"6": "1400",
						"7": "1401"
					}
				},
				"328": {
					"id": "328",
					"specializationId": "89",
					"name": "\u7834\u5929\u88c2\u5730",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "1402",
						"2": "1403",
						"3": "1404",
						"4": "1405",
						"5": "1406",
						"6": "1407",
						"7": "1408"
					}
				},
				"329": {
					"id": "329",
					"specializationId": "90",
					"name": "\u7075\u6d3b",
					"description": "\u795e\u884c\u72b6\u6001\u4e0b\uff0c\u95ea\u907f\u65f6\u6d88\u8017\u7684\u4f53\u529b\u51cf\u5c1170%\uff0c\u540c\u65f6\u653b\u51fb\u901f\u5ea6\u589e\u52a0100\u70b9",
					"effect": {
						"1": "1409"
					}
				},
				"330": {
					"id": "330",
					"specializationId": "90",
					"name": "\u51b2\u523a",
					"description": "\u795e\u884c\u72b6\u6001\u4e0b\uff0c\u6240\u6709\u5e26\u4f4d\u79fb\u62db\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad860%",
					"effect": {
						"1": "1411"
					}
				},
				"331": {
					"id": "331",
					"specializationId": "90",
					"name": "\u72c2\u8e81",
					"description": "\u795e\u884c\u72b6\u6001\u4e0b\u6bcf3\u79d2\u6062\u590d40\u70b9\u4f53\u529b\uff0c\u540c\u65f6\u6240\u6709\u62db\u5f0f\u7684\u4f53\u529b\u6d88\u8017\u989d\u5916\u589e\u52a015\u70b9\uff0c\u5e76\u4e14\u8fd9\u4e9b\u62db\u5f0f\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad830%",
					"effect": {
						"1": "1413"
					}
				},
				"332": {
					"id": "332",
					"specializationId": "90",
					"name": "\u5feb\u901f\u51c6\u5907",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1134%",
					"effect": {
						"1": "1415",
						"2": "1417",
						"3": "1418",
						"4": "1419",
						"5": "1420",
						"6": "1421",
						"7": "1422"
					}
				},
				"333": {
					"id": "333",
					"specializationId": "90",
					"name": "\u957f\u4e45",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f75%",
					"effect": {
						"1": "1436",
						"2": "1437",
						"3": "1438",
						"4": "1439",
						"5": "1440",
						"6": "1441",
						"7": "1442"
					}
				},
				"344": {
					"id": "344",
					"specializationId": "91",
					"name": "\u62a4\u4f53",
					"description": "\u4f7f\u62a4\u8eab\u5492\u80fd\u591f\u5438\u6536\u7684\u603b\u4f24\u5bb3\u91cf\u589e\u52a030%",
					"effect": {
						"1": "1443"
					}
				},
				"346": {
					"id": "346",
					"specializationId": "91",
					"name": "\u56de\u4f53",
					"description": "\u62a4\u8eab\u5492\u79fb\u9664\u65f6\u6062\u590d50\u70b9\u4f53\u529b",
					"effect": {
						"1": "1444"
					}
				},
				"348": {
					"id": "348",
					"specializationId": "91",
					"name": "\u8d8a\u6218\u8d8a\u52c7",
					"description": "\u62a4\u8eab\u5492\u5b58\u5728\u671f\u95f4\uff0c\u6bcf\u53d7\u5230\u4e00\u6b21\u653b\u51fb\u6062\u590d20\u70b9\u4f53\u529b",
					"effect": {
						"1": "1445"
					}
				},
				"350": {
					"id": "350",
					"specializationId": "91",
					"name": "\u6301\u4e45",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a075%",
					"effect": {
						"1": "1446",
						"2": "1447",
						"3": "1448",
						"4": "1449",
						"5": "1450",
						"6": "1451",
						"7": "1452"
					}
				},
				"352": {
					"id": "352",
					"specializationId": "91",
					"name": "\u51c6\u5907",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1135%",
					"effect": {
						"1": "1453",
						"2": "1454",
						"3": "1455",
						"4": "1456",
						"5": "1457",
						"6": "1458",
						"7": "1459"
					}
				},
				"356": {
					"id": "356",
					"specializationId": "92",
					"name": "\u4f4e\u8017",
					"description": "\u8f70\u5929\u62f3\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9",
					"effect": {
						"1": "1460"
					}
				},
				"358": {
					"id": "358",
					"specializationId": "92",
					"name": "\u5f15\u7206",
					"description": "\u5f53\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u79fb\u9664\u65f6\uff0c\u5c06\u4f1a\u5bf9\u643a\u5e26\u8005\u9020\u6210\u7075\u7334\u751f\u547d\u503c\u4e0a\u965040%\u7684\u4f24\u5bb3\u3002\u8f70\u5929\u62f3\u51fb\u4e2d\u7684\u76ee\u6807\u4e5f\u5c06\u4f1a\u76f4\u63a5\u5f15\u7206\u654c\u4eba\u8eab\u4e0a\u7684\u4e71\u661f\u821e\u5185\u4f24\u72b6\u6001",
					"effect": {
						"1": "1461"
					}
				},
				"360": {
					"id": "360",
					"specializationId": "92",
					"name": "\u66b4\u51fb\u6062\u590d",
					"description": "\u8f70\u5929\u62f3\u6bcf\u6b21\u66b4\u51fb\u65f6\u670980%\u7684\u51e0\u7387\u6062\u590d1\u70b9\u8fde\u51fb\u70b9",
					"effect": {
						"1": "1462"
					}
				},
				"362": {
					"id": "362",
					"specializationId": "92",
					"name": "\u8fc5\u731b",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad845%",
					"effect": {
						"1": "1463",
						"2": "1841",
						"3": "1842",
						"4": "1843",
						"5": "1844",
						"6": "1845",
						"7": "1846"
					}
				},
				"363": {
					"id": "363",
					"specializationId": "92",
					"name": "\u4f24\u5bb3\u52a0\u6df1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "1470",
						"2": "1847",
						"3": "1848",
						"4": "1849",
						"5": "1850",
						"6": "1851",
						"7": "1852"
					}
				},
				"364": {
					"id": "364",
					"specializationId": "93",
					"name": "\u5b9a\u6d77\u795e\u9488\u4e09\u91cd",
					"description": "\u5728\u5b9a\u6d77\u795e\u94882\u91cd\u72b6\u6001\u65f6\uff0c\u4f7f\u7528\u7834\u5929\u68cd\u5c06\u4f7f\u68cd\u5b50\u8fdb\u5165\u5b9a\u6d77\u795e\u94883\u91cd\u72b6\u6001\uff0c\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u7684\u4f24\u5bb3\u63d0\u9ad875%\uff0c\u4f46\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e20%\uff0c\u653b\u51fb\u901f\u5ea6\u964d\u4f4e30\u70b9",
					"effect": {
						"1": "1477"
					}
				},
				"366": {
					"id": "366",
					"specializationId": "93",
					"name": "\u52a8\u5982\u96f7\u9706",
					"description": "\u4f7f\u7834\u5929\u68cd\u53ef\u4ee5\u76f4\u63a5\u89e6\u53d1\u5b9a\u6d77\u795e\u9488lv1\uff0c\u5e76\u4e14\u6bcf\u91ca\u653e\u4e00\u6b21\u7834\u5929\u68cd\uff0c\u7075\u7334\u81ea\u8eab\u653b\u51fb\u901f\u5ea6\u589e\u52a030\u70b9\uff0c\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a03\u5c42",
					"effect": {
						"1": "1478"
					}
				},
				"368": {
					"id": "368",
					"specializationId": "93",
					"name": "\u4fb5\u7565\u5982\u706b",
					"description": "\u7834\u5929\u68cd\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9\uff0c\u5feb\u901f\u8fde\u7eed\u91ca\u653e\u7834\u5929\u68cd2\u6b21\u65f6\uff0c\u5c06\u4f7f\u5b9a\u6d77\u795e\u94883\u91cd\u7a81\u7834\u52304\u91cd\uff0c\u5b9a\u6d77\u795e\u94884\u91cd\u5c06\u4f7f\u6240\u6709\u68cd\u7cfb\u6280\u80fd\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u5347120%\uff0c\u5e76\u4e14\u989d\u5916\u4f7f\u65cb\u7a7a\u9707\/\u5206\u8eab\u5288\/\u7834\u5929\u68cd\u7684\u8fde\u51fb\u70b9\u6d88\u8017\u5206\u522b\u51cf\u5c112\/2\/4\u70b9\u3002\u53e6\u5916\u7834\u5929\u68cd\u8fd8\u53ef\u4ee5\u4f7f\u5b9a\u6d77\u795e\u94881\u91cd\u76f4\u63a5\u5f3a\u5236\u7a81\u7834\u5230\u5b9a\u6d77\u795e\u94882\u91cd",
					"effect": {
						"1": "1479"
					}
				},
				"370": {
					"id": "370",
					"specializationId": "93",
					"name": "\u4f24\u5bb3\u52a0\u6df1",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "1480",
						"2": "1481",
						"3": "1482",
						"4": "1483",
						"5": "1484",
						"6": "1485",
						"7": "1486"
					}
				},
				"372": {
					"id": "372",
					"specializationId": "93",
					"name": "\u65e0\u6240\u8c13\u60e7",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d15\u70b9\u4f53\u529b",
					"effect": {
						"1": "1487",
						"2": "1488",
						"3": "1489",
						"4": "1490",
						"5": "1491",
						"6": "1492",
						"7": "1493"
					}
				},
				"379": {
					"id": "379",
					"specializationId": "94",
					"name": "\u56de\u4f53",
					"description": "\u597d\u6597\u72b6\u6001\u4e0b\uff0c\u6d3b\u7b4b\u6280\u80fd\u53d8\u4e3a\u56de\u4f53\u6280\u80fd\uff0c\u56de\u4f53\u6280\u80fd\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9\u8f6c\u5316\u4e3a60\u70b9\u4f53\u529b",
					"effect": {
						"1": "1494"
					}
				},
				"380": {
					"id": "380",
					"specializationId": "94",
					"name": "\u9634\u9633\u4e92\u6613",
					"description": "\u5f53\u6d3b\u7b4b\u6280\u80fd\u53d8\u4e3a\u56de\u4f53\u6280\u80fd\u65f6\uff0c\u53ea\u80fd\u4f7f\u7528\u4e00\u6b21\u56de\u4f53\uff0c\u4f46\u5728\u4f7f\u7528\u5b8c\u56de\u4f53\u540e\u7684\u7b2c10\u79d2\uff0c\u4e3a\u7075\u7334\u8fd4\u8fd83\u4e2a\u8fde\u51fb\u70b9",
					"effect": {
						"1": "1495"
					}
				},
				"381": {
					"id": "381",
					"specializationId": "94",
					"name": "\u5f3a\u4f53",
					"description": "\u5728\u597d\u6597\u72b6\u6001\u4e0b\u65f6\uff0c\u5373\u4f7f\u4f53\u529b\u8017\u5c3d\u4e5f\u4e0d\u4f1a\u8fdb\u5165\u5f31\u4f53\u72b6\u6001",
					"effect": {
						"1": "1496"
					}
				},
				"383": {
					"id": "383",
					"specializationId": "94",
					"name": "\u51c6\u5907",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1134%",
					"effect": {
						"1": "1497",
						"2": "1498",
						"3": "1499",
						"4": "1500",
						"5": "1501",
						"6": "1502",
						"7": "1503"
					}
				},
				"385": {
					"id": "385",
					"specializationId": "94",
					"name": "\u6301\u4e45",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a075%",
					"effect": {
						"1": "1504",
						"2": "1505",
						"3": "1506",
						"4": "1507",
						"5": "1508",
						"6": "1509",
						"7": "1510"
					}
				},
				"400": {
					"id": "400",
					"specializationId": "95",
					"name": "\u9738\u4f53",
					"description": "\u9690\u8eab\u671f\u95f4\uff0c\u7075\u7334\u5904\u4e8e\u9738\u4f53\u72b6\u6001\uff0c\u540c\u65f6\u53d7\u5230\u7684\u4f24\u5bb3\u51cf\u5c1180%",
					"effect": {
						"1": "1511"
					}
				},
				"401": {
					"id": "401",
					"specializationId": "95",
					"name": "\u5bfb\u627e\u65f6\u673a",
					"description": "\u9690\u8eab\u671f\u95f4\uff0c\u6bcf4\u79d2\u6062\u590d1\u70b9\u8fde\u51fb\u70b9",
					"effect": {
						"1": "1512"
					}
				},
				"402": {
					"id": "402",
					"specializationId": "95",
					"name": "\u539f\u5f62\u6bd5\u9732",
					"description": "\u9690\u8eab\u671f\u95f4\u53d7\u5230\u4f24\u5bb3\u800c\u663e\u5f62\u65f6\uff0c\u7075\u7334\u6062\u590d2\u4e2a\u8fde\u51fb\u70b9",
					"effect": {
						"1": "1513"
					}
				},
				"403": {
					"id": "403",
					"specializationId": "95",
					"name": "\u51c6\u5907",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1134%",
					"effect": {
						"1": "1514",
						"2": "1515",
						"3": "1516",
						"4": "1517",
						"5": "1518",
						"6": "1519",
						"7": "1520"
					}
				},
				"404": {
					"id": "404",
					"specializationId": "95",
					"name": "\u663e\u5f62",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u534775%",
					"effect": {
						"1": "1521",
						"2": "1522",
						"3": "1523",
						"4": "1524",
						"5": "1525",
						"6": "1526",
						"7": "1527"
					}
				},
				"405": {
					"id": "405",
					"specializationId": "96",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u53ef\u4ee5\u7528\u3010\u811a\u3011\u66ff\u4ee3\u62f3\u5b9a\u516b\u8352\u7b2c4\u30015\u30016\u30017\u5f0f\u7684\u3010\u62f3\u3011\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u62f3\u5b9a\u516b\u8352\u8fde\u62db",
					"effect": {
						"1": "1528",
						"2": "1853",
						"3": "1854",
						"4": "1855",
						"5": "1856"
					}
				},
				"406": {
					"id": "406",
					"specializationId": "96",
					"name": "\u75be",
					"description": "\u62f3\u5b9a\u516b\u8352\u6bcf\u4e2a\u62db\u5f0f\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad820%",
					"effect": {
						"1": "1529"
					}
				},
				"407": {
					"id": "407",
					"specializationId": "96",
					"name": "\u65e0\u654c",
					"description": "\u5f53\u7528\u3010\u811a\u3011\u66ff\u4ee3\u62f3\u5b9a\u516b\u8352\u4e2d\u7684\u3010\u62f3\u3011\u65f6\uff0c\u5176\u53ef\u4ee5\u83b7\u5f97\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001",
					"effect": {
						"1": "1530"
					}
				},
				"408": {
					"id": "408",
					"specializationId": "96",
					"name": "\u4f24\u5bb3\u52a0\u6df1",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u5347150%",
					"effect": {
						"1": "1531",
						"2": "1532",
						"3": "1533",
						"4": "1534",
						"5": "1535",
						"6": "1536",
						"7": "1537"
					}
				},
				"409": {
					"id": "409",
					"specializationId": "96",
					"name": "\u5165\u9aa8\u4e03\u5206",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8225%",
					"effect": {
						"1": "1538",
						"2": "1539",
						"3": "1540",
						"4": "1541",
						"5": "1542",
						"6": "1543",
						"7": "1544"
					}
				},
				"410": {
					"id": "410",
					"specializationId": "97",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u53ef\u4ee5\u7528\u3010\u8f7b\u68cd\u3011\u66ff\u4ee3\u68cd\u5f71\u5343\u53e0\u7b2c4\u30015\u30016\u30017\u5f0f\u7684\u3010\u91cd\u68cd\u3011\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u68cd\u5f71\u5343\u53e0\u8fde\u62db",
					"effect": {
						"1": "1545",
						"2": "1546",
						"3": "1547",
						"4": "1548",
						"5": "1549",
						"6": "1550"
					}
				},
				"411": {
					"id": "411",
					"specializationId": "97",
					"name": "\u9738\u4f53",
					"description": "\u65bd\u5c55\u68cd\u5f71\u5343\u53e0\u7b2c5\u5f0f\u8fc7\u7a0b\u5904\u4e8e\u9738\u4f53\u72b6\u6001\uff0c\u540c\u65f6\u53d7\u5230\u7684\u4f24\u5bb3\u964d\u4f4e70%",
					"effect": {
						"1": "1552"
					}
				},
				"412": {
					"id": "412",
					"specializationId": "97",
					"name": "\u65e0\u654c",
					"description": "\u65bd\u5c55\u68cd\u5f71\u5343\u53e0\u7b2c7\u30018\u5f0f\u8fc7\u7a0b\u5904\u4e8e\u65e0\u654c\u72b6\u6001\uff0c\u5e76\u4e14\u5f53\u7528\u8f7b\u68cd\u66ff\u6362\u68cd\u5f71\u5343\u53e0\u7b2c4\u30015\u30016\u30017\u5f0f\u7684\u91cd\u68cd\u65f6\uff0c\u4e5f\u5c06\u83b7\u5f97\u77ed\u6682\u65e0\u654c\u72b6\u6001",
					"effect": {
						"1": "1553"
					}
				},
				"413": {
					"id": "413",
					"specializationId": "97",
					"name": "\u4f24\u5bb3\u52a0\u6df1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%",
					"effect": {
						"1": "1554",
						"2": "1555",
						"3": "1556",
						"4": "1557",
						"5": "1558",
						"6": "1559",
						"7": "1560"
					}
				},
				"414": {
					"id": "414",
					"specializationId": "97",
					"name": "\u4e0d\u7559\u4f59\u529b",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad875%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a060%",
					"effect": {
						"1": "1561",
						"2": "1562",
						"3": "1563",
						"4": "1564",
						"5": "1565",
						"6": "1566",
						"7": "1567"
					}
				}
			},
			"specializationSpellUpgradeEffect": {
				"20": {
					"id": "20",
					"upgradeId": "8",
					"index": "1",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "19",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u4e71\u661f\u821e\u3010\u7b2c4\u5f0f\u3011"
				},
				"73": {
					"id": "73",
					"upgradeId": "14",
					"index": "0",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "19",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u3001\u75be\u5f71\u817f\u7b2c5\u5f0f\u3001\u62f3\u5b9a\u516b\u8352\u7b2c5\u548c\u7b2c7\u5f0f\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u7684\u76ee\u6807\u9020\u6210\u989d\u5916\u7684\u4f24\u5bb3\uff0c\u6548\u679c\u4e3a\u7075\u7334\u751f\u547d\u503c\u4e0a\u9650\u768420%"
				},
				"75": {
					"id": "75",
					"upgradeId": "35",
					"index": "0",
					"requireLevel": "22",
					"step": "1",

					"requireSpecialization1": "19",
					"requireLevel1": "3",
					"requireSpecialization2": "88",
					"requireLevel2": "1",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u6b7b\u4ea1\u65f6\u5bf9\u5468\u56f4\u6240\u6709\u7684\u654c\u4eba\u9020\u6210\u989d\u5916\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u4e3a\u7075\u7334\u751f\u547d\u4e0a\u9650\u7684120%"
				},
				"79": {
					"id": "79",
					"upgradeId": "37",
					"index": "0",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "19",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad815%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u53475%"
				},
				"100": {
					"id": "100",
					"upgradeId": "43",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "19",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad810%"
				},
				"142": {
					"id": "142",
					"upgradeId": "52",
					"index": "0",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "58",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u5954\u96f7\u51fb\u7b2c4\u5f0f"
				},
				"154": {
					"id": "154",
					"upgradeId": "54",
					"index": "0",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "58",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5b8c\u5168\u65bd\u5c55\u5954\u96f7\u51fb\u540e\uff0c\u68cd\u5b50\u8fdb\u5165\u5b9a\u6d77\u795e\u94881\u91cd\u72b6\u6001\uff0c\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u7684\u4f24\u5bb3\u63d0\u9ad825%\uff0c\u4f46\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e20%\uff0c\u653b\u51fb\u901f\u5ea6\u964d\u4f4e30\u70b9\uff0c\u6548\u679c\u6301\u7eed30\u79d2"
				},
				"187": {
					"id": "187",
					"upgradeId": "56",
					"index": "0",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "58",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad82%"
				},
				"178": {
					"id": "178",
					"upgradeId": "55",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "58",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5904\u4e8e\u5b9a\u6d77\u795e\u9488\u72b6\u6001\u65f6\uff0c\u6240\u6709\u4ee5\u68cd\u7cfb\u62db\u5f0f\u7ed3\u5c3e\u7684\u8fde\u62db\u7684\u8fde\u51fb\u70b9+1\uff0c\u4f46\u4f7f\u7528\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u90fd\u9700\u8981\u989d\u5916\u6d88\u80174\u70b9\u4f53\u529b"
				},
				"218": {
					"id": "218",
					"upgradeId": "57",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "58",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad83%"
				},
				"548": {
					"id": "548",
					"upgradeId": "77",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "66",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65cb\u7a7a\u9707\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9"
				},
				"558": {
					"id": "558",
					"upgradeId": "81",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "66",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u65cb\u7a7a\u9707\u7684\u653b\u51fb\u8303\u56f4\u589e\u52a050%"
				},
				"574": {
					"id": "574",
					"upgradeId": "84",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "66",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7528\u65cb\u7a7a\u9707\u540e\uff0c\u4e0b\u4e00\u6b21\u7684\u8f70\u5929\u62f3\u6216\u7834\u5929\u68cd\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8100%"
				},
				"593": {
					"id": "593",
					"upgradeId": "87",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "66",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad83%"
				},
				"625": {
					"id": "625",
					"upgradeId": "89",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "66",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u670930%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a4\u79d2"
				},
				"672": {
					"id": "672",
					"upgradeId": "102",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "73",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5288\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9"
				},
				"677": {
					"id": "677",
					"upgradeId": "104",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "73",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u82e5\u7075\u7334\u7684\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\uff0c\u5219\u5206\u8eab\u5288\u7b2c2\u30013\u30014\u4e0b\u4f24\u5bb3\u6574\u4f53\u63d0\u534750%"
				},
				"694": {
					"id": "694",
					"upgradeId": "107",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "73",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7528\u5206\u8eab\u5288\u540e\uff0c\u4e0b\u4e00\u6b21\u7684\u8f70\u5929\u62f3\u6216\u7834\u5929\u68cd\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8100%"
				},
				"708": {
					"id": "708",
					"upgradeId": "110",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "73",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad83%"
				},
				"733": {
					"id": "733",
					"upgradeId": "111",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "73",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f42\u79d2"
				},
				"750": {
					"id": "750",
					"upgradeId": "127",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "80",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5904\u4e8e\u5de8\u733f\u62f3\u7f61\u671f\u95f4\uff0c\u9020\u6210\u7684\u6240\u6709\u4f24\u5bb3\u63d0\u9ad825%"
				},
				"985": {
					"id": "985",
					"upgradeId": "129",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "80",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u961f\u53cb\u4e5f\u80fd\u4eab\u53d7\u5de8\u733f\u62f3\u7f61\u7684\u6548\u679c"
				},
				"997": {
					"id": "997",
					"upgradeId": "131",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "80",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u4e0b\u6240\u6709\u8fde\u62db\u7684\u7834\u9738\u4f53\u80fd\u529b\u63d0\u534720\u70b9"
				},
				"1006": {
					"id": "1006",
					"upgradeId": "133",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "80",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c114%"
				},
				"1016": {
					"id": "1016",
					"upgradeId": "136",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "80",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a04%"
				},
				"1059": {
					"id": "1059",
					"upgradeId": "152",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "84",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5e7b\u5f71\u53ec\u5524\u51fa\u6765\u7684\u5206\u8eab\u4f1a\u91ca\u653e\u60ca\u5929\u4e00\u68d2\u6280\u80fd"
				},
				"1062": {
					"id": "1062",
					"upgradeId": "155",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "84",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u7075\u7334\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u5206\u8eab\u5e7b\u5f71\u5206\u5316\u51fa\u6765\u7684\u5206\u8eab\u4f1a\u4e3a\u7075\u7334\u5206\u62c530%\u4f24\u5bb3"
				},
				"1079": {
					"id": "1079",
					"upgradeId": "157",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "84",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u82e5\u5206\u8eab\u5e7b\u5f71\u5728\u7075\u733430\u7c73\u8303\u56f4\uff0c\u5219\u7075\u7334\u53ef\u4ee5\u907f\u514d\u4e00\u6b21\u6b7b\u4ea1\uff0c\u5e76\u4e14\u6062\u590d20%\u7684\u751f\u547d\u503c\uff0c\u4f46\u6bcf60\u79d2\u53ea\u80fd\u751f\u6548\u4e00\u6b21"
				},
				"1110": {
					"id": "1110",
					"upgradeId": "160",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "84",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f4%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad83%"
				},
				"1146": {
					"id": "1146",
					"upgradeId": "163",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "84",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c114%"
				},
				"1363": {
					"id": "1363",
					"upgradeId": "312",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "88",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u75be\u5f71\u817f\u7b2c4\u5f0f"
				},
				"1370": {
					"id": "1370",
					"upgradeId": "314",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "88",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u75be\u5f71\u817f\u7b2c5\u5f0f\u51fb\u4e2d\u76ee\u6807\u65f6\uff0c\u670980%\u51e0\u7387\u4f7f\u4e71\u661f\u821e\u4ea7\u751f\u7684\u5185\u4f24\u4f24\u5bb3\u6548\u679c\u4f20\u67d3\u7ed9\u9644\u8fd12\u4e2a\u76ee\u6807,\u5e76\u4e14\u5237\u65b0\u4ed6\u4eec\u643a\u5e26\u7684\u4e71\u661f\u821e\u5185\u4f24\u72b6\u6001"
				},
				"1371": {
					"id": "1371",
					"upgradeId": "316",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "88",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u91ca\u653e\u5b8c\u5206\u8eab\u5288\u3001\u65cb\u7a7a\u9707\u3001\u8f70\u5929\u62f3\u540e\u768410\u79d2\u5185\uff0c\u75be\u5f71\u817f\u7684\u7b2c1\u30012\u5f0f\u53d8\u5316\u4e3a\u5176\u4ed6\u62db\u5f0f"
				},
				"1372": {
					"id": "1372",
					"upgradeId": "317",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "88",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u53473\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002"
				},
				"1379": {
					"id": "1379",
					"upgradeId": "318",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "88",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad89%"
				},
				"1386": {
					"id": "1386",
					"upgradeId": "324",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "89",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f00\u542f\u68cd\u52bf\u5982\u5c71\u7b2c4\u5f0f"
				},
				"1393": {
					"id": "1393",
					"upgradeId": "325",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "89",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5728\u5b9a\u6d77\u795e\u94881\u91cd\u72b6\u6001\u4e0b\u65f6\uff0c\u68cd\u52bf\u5982\u5c71\u7b2c6\u5f0f\u51fb\u4e2d\u654c\u4eba\u540e\uff0c\u68cd\u5b50\u8fdb\u5165\u5b9a\u6d77\u795e\u94882\u91cd\u72b6\u6001\uff0c\u4f7f\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u7684\u4f24\u5bb3\u63d0\u9ad850%\uff0c\u4f46\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e20%\uff0c\u653b\u51fb\u901f\u5ea6\u51cf\u5c1130\u70b9\uff0c\u6548\u679c\u6301\u7eed30\u79d2"
				},
				"1394": {
					"id": "1394",
					"upgradeId": "326",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "89",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u91ca\u653e\u5b8c\u5206\u8eab\u5288\u3001\u65cb\u7a7a\u9707\u3001\u7834\u5929\u68cd\u540e\u768410\u79d2\u5185\uff0c\u68cd\u52bf\u5982\u5c71\u7b2c1\u30012\u5f0f\u53d1\u751f\u53d8\u62db"
				},
				"1395": {
					"id": "1395",
					"upgradeId": "327",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "89",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a02%"
				},
				"1402": {
					"id": "1402",
					"upgradeId": "328",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "89",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad83%"
				},
				"1409": {
					"id": "1409",
					"upgradeId": "329",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "90",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u795e\u884c\u72b6\u6001\u4e0b\uff0c\u95ea\u907f\u65f6\u6d88\u8017\u7684\u4f53\u529b\u51cf\u5c1170%\uff0c\u540c\u65f6\u653b\u51fb\u901f\u5ea6\u589e\u52a0100\u70b9"
				},
				"1411": {
					"id": "1411",
					"upgradeId": "330",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "90",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u795e\u884c\u72b6\u6001\u4e0b\uff0c\u6240\u6709\u5e26\u4f4d\u79fb\u62db\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad860%"
				},
				"1413": {
					"id": "1413",
					"upgradeId": "331",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "90",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u795e\u884c\u72b6\u6001\u4e0b\u6bcf3\u79d2\u6062\u590d40\u70b9\u4f53\u529b\uff0c\u540c\u65f6\u6240\u6709\u62db\u5f0f\u7684\u4f53\u529b\u6d88\u8017\u989d\u5916\u589e\u52a015\u70b9\uff0c\u5e76\u4e14\u8fd9\u4e9b\u62db\u5f0f\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad830%"
				},
				"1415": {
					"id": "1415",
					"upgradeId": "332",
					"index": "0",
					"requireLevel": "30",
					"step": "1",
					"requireSpecialization1": "90",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c113%"
				},
				"1436": {
					"id": "1436",
					"upgradeId": "333",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "90",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f5%"
				},
				"1443": {
					"id": "1443",
					"upgradeId": "344",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "91",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u80fd\u591f\u5438\u6536\u7684\u603b\u4f24\u5bb3\u91cf\u589e\u52a030%"
				},
				"1444": {
					"id": "1444",
					"upgradeId": "346",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "91",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62a4\u8eab\u5492\u79fb\u9664\u65f6\u6062\u590d50\u70b9\u4f53\u529b"
				},
				"1445": {
					"id": "1445",
					"upgradeId": "348",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "91",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62a4\u8eab\u5492\u5b58\u5728\u671f\u95f4\uff0c\u6bcf\u53d7\u5230\u4e00\u6b21\u653b\u51fb\u6062\u590d20\u70b9\u4f53\u529b"
				},
				"1446": {
					"id": "1446",
					"upgradeId": "350",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "91",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a05%"
				},
				"1453": {
					"id": "1453",
					"upgradeId": "352",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "91",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c114%"
				},
				"1460": {
					"id": "1460",
					"upgradeId": "356",
					"index": "0",
					"requireLevel": "36",
					"step": "1",
					"requireSpecialization1": "92",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u8f70\u5929\u62f3\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9"
				},
				"1461": {
					"id": "1461",
					"upgradeId": "358",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "92",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u79fb\u9664\u65f6\uff0c\u5c06\u4f1a\u5bf9\u643a\u5e26\u8005\u9020\u6210\u7075\u7334\u751f\u547d\u503c\u4e0a\u965040%\u7684\u4f24\u5bb3\u3002\u8f70\u5929\u62f3\u51fb\u4e2d\u7684\u76ee\u6807\u4e5f\u5c06\u4f1a\u76f4\u63a5\u5f15\u7206\u654c\u4eba\u8eab\u4e0a\u7684\u4e71\u661f\u821e\u5185\u4f24\u72b6\u6001"
				},
				"1462": {
					"id": "1462",
					"upgradeId": "360",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "92",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u8f70\u5929\u62f3\u6bcf\u6b21\u66b4\u51fb\u65f6\u670980%\u7684\u51e0\u7387\u6062\u590d1\u70b9\u8fde\u51fb\u70b9"
				},
				"1463": {
					"id": "1463",
					"upgradeId": "362",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "92",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad83%"
				},
				"1470": {
					"id": "1470",
					"upgradeId": "363",
					"index": "0",
					"requireLevel": "38",
					"step": "1",
					"requireSpecialization1": "92",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad83%"
				},
				"1477": {
					"id": "1477",
					"upgradeId": "364",
					"index": "0",
					"requireLevel": "36",
					"step": "1",
					"requireSpecialization1": "93",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5728\u5b9a\u6d77\u795e\u94882\u91cd\u72b6\u6001\u65f6\uff0c\u4f7f\u7528\u7834\u5929\u68cd\u5c06\u4f7f\u68cd\u5b50\u8fdb\u5165\u5b9a\u6d77\u795e\u94883\u91cd\u72b6\u6001\uff0c\u6240\u6709\u68cd\u7cfb\u62db\u5f0f\u7684\u4f24\u5bb3\u63d0\u9ad875%\uff0c\u4f46\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e20%\uff0c\u653b\u51fb\u901f\u5ea6\u964d\u4f4e30\u70b9"
				},
				"1478": {
					"id": "1478",
					"upgradeId": "366",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "93",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7834\u5929\u68cd\u53ef\u4ee5\u76f4\u63a5\u89e6\u53d1\u5b9a\u6d77\u795e\u9488lv1\uff0c\u5e76\u4e14\u6bcf\u91ca\u653e\u4e00\u6b21\u7834\u5929\u68cd\uff0c\u7075\u7334\u81ea\u8eab\u653b\u51fb\u901f\u5ea6\u589e\u52a030\u70b9\uff0c\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a03\u5c42"
				},
				"1479": {
					"id": "1479",
					"upgradeId": "368",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "93",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u6d88\u8017\u7684\u8fde\u51fb\u70b9\u51cf\u5c111\u70b9\uff0c\u5feb\u901f\u8fde\u7eed\u91ca\u653e\u7834\u5929\u68cd2\u6b21\u65f6\uff0c\u5c06\u4f7f\u5b9a\u6d77\u795e\u94883\u91cd\u7a81\u7834\u52304\u91cd\uff0c\u5b9a\u6d77\u795e\u94884\u91cd\u5c06\u4f7f\u6240\u6709\u68cd\u7cfb\u6280\u80fd\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u5347120%\uff0c\u5e76\u4e14\u989d\u5916\u4f7f\u65cb\u7a7a\u9707\/\u5206\u8eab\u5288\/\u7834\u5929\u68cd\u7684\u8fde\u51fb\u70b9\u6d88\u8017\u5206\u522b\u51cf\u5c112\/2\/4\u70b9\u3002\u53e6\u5916\u7834\u5929\u68cd\u8fd8\u53ef\u4ee5\u4f7f\u5b9a\u6d77\u795e\u94881\u91cd\u76f4\u63a5\u5f3a\u5236\u7a81\u7834\u5230\u5b9a\u6d77\u795e\u94882\u91cd"
				},
				"1480": {
					"id": "1480",
					"upgradeId": "370",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "93",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad83%"
				},
				"1487": {
					"id": "1487",
					"upgradeId": "372",
					"index": "0",
					"requireLevel": "38",
					"step": "1",
					"requireSpecialization1": "93",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d1\u70b9\u4f53\u529b"
				},
				"1494": {
					"id": "1494",
					"upgradeId": "379",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "94",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u597d\u6597\u72b6\u6001\u4e0b\uff0c\u6d3b\u7b4b\u6280\u80fd\u53d8\u4e3a\u56de\u4f53\u6280\u80fd\uff0c\u56de\u4f53\u6280\u80fd\u6d88\u80173\u4e2a\u8fde\u51fb\u70b9\u8f6c\u5316\u4e3a60\u70b9\u4f53\u529b"
				},
				"1495": {
					"id": "1495",
					"upgradeId": "380",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "94",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u6d3b\u7b4b\u6280\u80fd\u53d8\u4e3a\u56de\u4f53\u6280\u80fd\u65f6\uff0c\u53ea\u80fd\u4f7f\u7528\u4e00\u6b21\u56de\u4f53\uff0c\u4f46\u5728\u4f7f\u7528\u5b8c\u56de\u4f53\u540e\u7684\u7b2c10\u79d2\uff0c\u4e3a\u7075\u7334\u8fd4\u8fd83\u4e2a\u8fde\u51fb\u70b9"
				},
				"1496": {
					"id": "1496",
					"upgradeId": "381",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5728\u597d\u6597\u72b6\u6001\u4e0b\u65f6\uff0c\u5373\u4f7f\u4f53\u529b\u8017\u5c3d\u4e5f\u4e0d\u4f1a\u8fdb\u5165\u5f31\u4f53\u72b6\u6001"
				},
				"1497": {
					"id": "1497",
					"upgradeId": "383",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "94",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c113%"
				},
				"1504": {
					"id": "1504",
					"upgradeId": "385",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "94",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a05%"
				},
				"1511": {
					"id": "1511",
					"upgradeId": "400",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "95",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9690\u8eab\u671f\u95f4\uff0c\u7075\u7334\u5904\u4e8e\u9738\u4f53\u72b6\u6001\uff0c\u540c\u65f6\u53d7\u5230\u7684\u4f24\u5bb3\u51cf\u5c1180%"
				},
				"1512": {
					"id": "1512",
					"upgradeId": "401",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "95",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9690\u8eab\u671f\u95f4\uff0c\u6bcf4\u79d2\u6062\u590d1\u70b9\u8fde\u51fb\u70b9"
				},
				"1513": {
					"id": "1513",
					"upgradeId": "402",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9690\u8eab\u671f\u95f4\u53d7\u5230\u4f24\u5bb3\u800c\u663e\u5f62\u65f6\uff0c\u7075\u7334\u6062\u590d2\u4e2a\u8fde\u51fb\u70b9"
				},
				"1514": {
					"id": "1514",
					"upgradeId": "403",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "95",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c113%"
				},
				"1521": {
					"id": "1521",
					"upgradeId": "404",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "95",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u53475%"
				},
				"1528": {
					"id": "1528",
					"upgradeId": "405",
					"index": "0",
					"requireLevel": "45",
					"step": "1",
					"requireSpecialization1": "96",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u62f3\u5b9a\u516b\u8352\u7b2c4\u5f0f"
				},
				"1529": {
					"id": "1529",
					"upgradeId": "406",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62f3\u5b9a\u516b\u8352\u6bcf\u4e2a\u62db\u5f0f\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad820%"
				},
				"1530": {
					"id": "1530",
					"upgradeId": "407",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u7528\u3010\u811a\u3011\u66ff\u4ee3\u62f3\u5b9a\u516b\u8352\u4e2d\u7684\u3010\u62f3\u3011\u65f6\uff0c\u5176\u53ef\u4ee5\u83b7\u5f97\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001"
				},
				"1531": {
					"id": "1531",
					"upgradeId": "408",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u53478%"
				},
				"1538": {
					"id": "1538",
					"upgradeId": "409",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad815%"
				},
				"1545": {
					"id": "1545",
					"upgradeId": "410",
					"index": "0",
					"requireLevel": "45",
					"step": "1",
					"requireSpecialization1": "97",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u68cd\u5f71\u5343\u53e0\u7b2c4\u5f0f"
				},
				"1552": {
					"id": "1552",
					"upgradeId": "411",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65bd\u5c55\u68cd\u5f71\u5343\u53e0\u7b2c5\u5f0f\u8fc7\u7a0b\u5904\u4e8e\u9738\u4f53\u72b6\u6001\uff0c\u540c\u65f6\u53d7\u5230\u7684\u4f24\u5bb3\u964d\u4f4e70%"
				},
				"1553": {
					"id": "1553",
					"upgradeId": "412",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65bd\u5c55\u68cd\u5f71\u5343\u53e0\u7b2c7\u30018\u5f0f\u8fc7\u7a0b\u5904\u4e8e\u65e0\u654c\u72b6\u6001\uff0c\u5e76\u4e14\u5f53\u7528\u8f7b\u68cd\u66ff\u6362\u68cd\u5f71\u5343\u53e0\u7b2c4\u30015\u30016\u30017\u5f0f\u7684\u91cd\u68cd\u65f6\uff0c\u4e5f\u5c06\u83b7\u5f97\u77ed\u6682\u65e0\u654c\u72b6\u6001"
				},
				"1554": {
					"id": "1554",
					"upgradeId": "413",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad83%"
				},
				"1561": {
					"id": "1561",
					"upgradeId": "414",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad85%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a04%"
				},
				"21": {
					"id": "21",
					"upgradeId": "8",
					"index": "1",
					"requireLevel": "16",
					"step": "2",
					"requireSpecialization1": "19",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u53ef\u4ee5\u7528\u3010\u811a\u3011\u66ff\u6362\u4e71\u661f\u821e\u7b2c4\u5f0f\u7684\u3010\u62f3\u3011\u4f7f\u7528"
				},
				"86": {
					"id": "86",
					"upgradeId": "37",
					"index": "1",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "19",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad830%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534710%"
				},
				"101": {
					"id": "101",
					"upgradeId": "43",
					"index": "1",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "19",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad820%"
				},
				"143": {
					"id": "143",
					"upgradeId": "52",
					"index": "1",
					"requireLevel": "8",
					"step": "2",
					"requireSpecialization1": "58",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u5954\u96f7\u51fb\u7b2c5\u5f0f"
				},
				"188": {
					"id": "188",
					"upgradeId": "56",
					"index": "1",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "58",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad84%"
				},
				"225": {
					"id": "225",
					"upgradeId": "57",
					"index": "1",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "58",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad86%"
				},
				"594": {
					"id": "594",
					"upgradeId": "87",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "66",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad86%"
				},
				"627": {
					"id": "627",
					"upgradeId": "89",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "66",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u670930%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a4.5\u79d2"
				},
				"709": {
					"id": "709",
					"upgradeId": "110",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "73",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad86%"
				},
				"734": {
					"id": "734",
					"upgradeId": "111",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "73",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f43\u79d2"
				},
				"1007": {
					"id": "1007",
					"upgradeId": "133",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "80",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c117%"
				},
				"1023": {
					"id": "1023",
					"upgradeId": "136",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "80",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a08%"
				},
				"1120": {
					"id": "1120",
					"upgradeId": "160",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "84",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f8%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad86%"
				},
				"1149": {
					"id": "1149",
					"upgradeId": "163",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "84",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c117%"
				},
				"1364": {
					"id": "1364",
					"upgradeId": "312",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "88",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u75be\u5f71\u817f\u7b2c5\u5f0f"
				},
				"1829": {
					"id": "1829",
					"upgradeId": "317",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "88",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u53476\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002"
				},
				"1835": {
					"id": "1835",
					"upgradeId": "318",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "88",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"1387": {
					"id": "1387",
					"upgradeId": "324",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "89",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f00\u542f\u68cd\u52bf\u5982\u5c71\u7b2c5\u5f0f"
				},
				"1396": {
					"id": "1396",
					"upgradeId": "327",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "89",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a04%"
				},
				"1403": {
					"id": "1403",
					"upgradeId": "328",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "89",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad86%"
				},
				"1417": {
					"id": "1417",
					"upgradeId": "332",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "90",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c117%"
				},
				"1437": {
					"id": "1437",
					"upgradeId": "333",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "90",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f10%"
				},
				"1447": {
					"id": "1447",
					"upgradeId": "350",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "91",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a010%"
				},
				"1454": {
					"id": "1454",
					"upgradeId": "352",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "91",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c117%"
				},
				"1841": {
					"id": "1841",
					"upgradeId": "362",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "92",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad86%"
				},
				"1847": {
					"id": "1847",
					"upgradeId": "363",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "92",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad86%"
				},
				"1481": {
					"id": "1481",
					"upgradeId": "370",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "93",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad86%"
				},
				"1488": {
					"id": "1488",
					"upgradeId": "372",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "93",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d2\u70b9\u4f53\u529b"
				},
				"1498": {
					"id": "1498",
					"upgradeId": "383",
					"index": "1",
					"requireLevel": "43",
					"step": "2",
					"requireSpecialization1": "94",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c117%"
				},
				"1505": {
					"id": "1505",
					"upgradeId": "385",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "94",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a010%"
				},
				"1515": {
					"id": "1515",
					"upgradeId": "403",
					"index": "1",
					"requireLevel": "43",
					"step": "2",
					"requireSpecialization1": "95",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c117%"
				},
				"1522": {
					"id": "1522",
					"upgradeId": "404",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "95",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u534710%"
				},
				"1853": {
					"id": "1853",
					"upgradeId": "405",
					"index": "1",
					"requireLevel": "45",
					"step": "2",
					"requireSpecialization1": "96",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u62f3\u5b9a\u516b\u8352\u7b2c5\u5f0f"
				},
				"1532": {
					"id": "1532",
					"upgradeId": "408",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534716%"
				},
				"1539": {
					"id": "1539",
					"upgradeId": "409",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad830%"
				},
				"1546": {
					"id": "1546",
					"upgradeId": "410",
					"index": "1",
					"requireLevel": "45",
					"step": "2",
					"requireSpecialization1": "97",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u68cd\u5f71\u5343\u53e0\u7b2c5\u5f0f"
				},
				"1555": {
					"id": "1555",
					"upgradeId": "413",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad86%"
				},
				"1562": {
					"id": "1562",
					"upgradeId": "414",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad810%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a08%"
				},
				"87": {
					"id": "87",
					"upgradeId": "37",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "19",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad890%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534730%"
				},
				"102": {
					"id": "102",
					"upgradeId": "43",
					"index": "2",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "19",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad860%"
				},
				"144": {
					"id": "144",
					"upgradeId": "52",
					"index": "2",
					"requireLevel": "18",
					"step": "3",
					"requireSpecialization1": "58",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u53ef\u4ee5\u7528\u3010\u8f7b\u68cd\u3011\u66ff\u6362\u5954\u96f7\u51fb\u7b2c4\u30015\u5f0f\u7684\u3010\u91cd\u68cd\u3011\u4f7f\u7528\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u5954\u96f7\u51fb\u8fde\u62db"
				},
				"189": {
					"id": "189",
					"upgradeId": "56",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "58",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad812%"
				},
				"226": {
					"id": "226",
					"upgradeId": "57",
					"index": "2",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "58",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"595": {
					"id": "595",
					"upgradeId": "87",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "66",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"628": {
					"id": "628",
					"upgradeId": "89",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "66",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u670960%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a5\u79d2"
				},
				"710": {
					"id": "710",
					"upgradeId": "110",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "73",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"735": {
					"id": "735",
					"upgradeId": "111",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "73",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f410\u79d2"
				},
				"1008": {
					"id": "1008",
					"upgradeId": "133",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "80",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1118%"
				},
				"1024": {
					"id": "1024",
					"upgradeId": "136",
					"index": "2",
					"requireLevel": "32",
					"step": "3",

					"requireSpecialization1": "80",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a024%"
				},
				"1121": {
					"id": "1121",
					"upgradeId": "160",
					"index": "2",
					"requireLevel": "31",
					"step": "3",
					"requireSpecialization1": "84",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f24%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad818%"
				},
				"1150": {
					"id": "1150",
					"upgradeId": "163",
					"index": "2",
					"requireLevel": "32",
					"step": "3",
					"requireSpecialization1": "84",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1118%"
				},
				"1365": {
					"id": "1365",
					"upgradeId": "312",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "88",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u53ef\u4ee5\u7528\u3010\u811a\u3011\u66ff\u6362\u75be\u5f71\u817f\u7b2c4\u30015\u5f0f\u7684\u3010\u62f3\u3011\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u75be\u5f71\u817f\u8fde\u62db"
				},
				"1830": {
					"id": "1830",
					"upgradeId": "317",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "88",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u534718\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002"
				},
				"1836": {
					"id": "1836",
					"upgradeId": "318",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "88",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad854%"
				},
				"1388": {
					"id": "1388",
					"upgradeId": "324",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "89",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f00\u542f\u68cd\u52bf\u5982\u5c71\u7b2c6\u5f0f"
				},
				"1397": {
					"id": "1397",
					"upgradeId": "327",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "89",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a012%"
				},
				"1404": {
					"id": "1404",
					"upgradeId": "328",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "89",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"1418": {
					"id": "1418",
					"upgradeId": "332",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "90",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1117%"
				},
				"1438": {
					"id": "1438",
					"upgradeId": "333",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "90",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f30%"
				},
				"1448": {
					"id": "1448",
					"upgradeId": "350",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "91",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a030%"
				},
				"1455": {
					"id": "1455",
					"upgradeId": "352",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "91",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1118%"
				},
				"1842": {
					"id": "1842",
					"upgradeId": "362",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "92",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad818%"
				},
				"1848": {
					"id": "1848",
					"upgradeId": "363",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "92",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"1482": {
					"id": "1482",
					"upgradeId": "370",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "93",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"1489": {
					"id": "1489",
					"upgradeId": "372",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "93",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d6\u70b9\u4f53\u529b"
				},
				"1499": {
					"id": "1499",
					"upgradeId": "383",
					"index": "2",
					"requireLevel": "44",
					"step": "3",
					"requireSpecialization1": "94",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1117%"
				},
				"1506": {
					"id": "1506",
					"upgradeId": "385",
					"index": "2",
					"requireLevel": "45",
					"step": "3",
					"requireSpecialization1": "94",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a030%"
				},
				"1516": {
					"id": "1516",
					"upgradeId": "403",
					"index": "2",
					"requireLevel": "44",
					"step": "3",
					"requireSpecialization1": "95",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1117%"
				},
				"1523": {
					"id": "1523",
					"upgradeId": "404",
					"index": "2",
					"requireLevel": "45",
					"step": "3",
					"requireSpecialization1": "95",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u534730%"
				},
				"1533": {
					"id": "1533",
					"upgradeId": "408",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534748%"
				},
				"1540": {
					"id": "1540",
					"upgradeId": "409",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad890%"
				},
				"1547": {
					"id": "1547",
					"upgradeId": "410",
					"index": "2",
					"requireLevel": "46",
					"step": "3",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u68cd\u5f71\u5343\u53e0\u7b2c6\u5f0f"
				},
				"1556": {
					"id": "1556",
					"upgradeId": "413",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad818%"
				},
				"1563": {
					"id": "1563",
					"upgradeId": "414",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad830%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a024%"
				},
				"1854": {
					"id": "1854",
					"upgradeId": "405",
					"index": "2",
					"requireLevel": "46",
					"step": "3",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u62f3\u5b9a\u516b\u8352\u7b2c6\u5f0f"
				},
				"88": {
					"id": "88",
					"upgradeId": "37",
					"index": "3",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "19",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8105%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534735%"
				},
				"103": {
					"id": "103",
					"upgradeId": "43",
					"index": "3",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "19",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad870%"
				},
				"190": {
					"id": "190",
					"upgradeId": "56",
					"index": "3",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "58",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad814%"
				},
				"227": {
					"id": "227",
					"upgradeId": "57",
					"index": "3",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "58",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad821%"
				},
				"596": {
					"id": "596",
					"upgradeId": "87",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "66",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad821%"
				},
				"629": {
					"id": "629",
					"upgradeId": "89",
					"index": "3",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "66",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u670960%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a5.5\u79d2"
				},
				"711": {
					"id": "711",
					"upgradeId": "110",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "73",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad821%"
				},
				"736": {
					"id": "736",
					"upgradeId": "111",
					"index": "3",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "73",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f411\u79d2"
				},
				"1009": {
					"id": "1009",
					"upgradeId": "133",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "80",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1120%"
				},
				"1025": {
					"id": "1025",
					"upgradeId": "136",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "80",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a028%"
				},
				"1122": {
					"id": "1122",
					"upgradeId": "160",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "84",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f28%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad821%"
				},
				"1151": {
					"id": "1151",
					"upgradeId": "163",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "84",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1120%"
				},
				"1831": {
					"id": "1831",
					"upgradeId": "317",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "88",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u534721\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002"
				},
				"1837": {
					"id": "1837",
					"upgradeId": "318",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "88",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad863%"
				},
				"1389": {
					"id": "1389",
					"upgradeId": "324",
					"index": "3",
					"requireLevel": "26",
					"step": "4",
					"requireSpecialization1": "89",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u53ef\u4ee5\u7528\u3010\u8f7b\u68cd\u3011\u66ff\u6362\u68cd\u52bf\u5982\u5c71\u7b2c4\u30015\u30016\u5f0f\u7684\u3010\u91cd\u68cd\u3011"
				},
				"1398": {
					"id": "1398",
					"upgradeId": "327",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "89",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a014%"
				},
				"1405": {
					"id": "1405",
					"upgradeId": "328",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "89",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad821%"
				},
				"1419": {
					"id": "1419",
					"upgradeId": "332",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "90",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1120%"
				},
				"1439": {
					"id": "1439",
					"upgradeId": "333",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "90",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f35%"
				},
				"1449": {
					"id": "1449",
					"upgradeId": "350",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "91",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a035%"
				},
				"1456": {
					"id": "1456",
					"upgradeId": "352",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "91",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1120%"
				},
				"1843": {
					"id": "1843",
					"upgradeId": "362",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "92",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad821%"
				},
				"1849": {
					"id": "1849",
					"upgradeId": "363",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "92",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad821%"
				},
				"1483": {
					"id": "1483",
					"upgradeId": "370",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "93",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad821%"
				},
				"1490": {
					"id": "1490",
					"upgradeId": "372",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "93",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d7\u70b9\u4f53\u529b"
				},
				"1500": {
					"id": "1500",
					"upgradeId": "383",
					"index": "3",
					"requireLevel": "45",
					"step": "4",
					"requireSpecialization1": "94",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1120%"
				},
				"1507": {
					"id": "1507",
					"upgradeId": "385",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a035%"
				},
				"1517": {
					"id": "1517",
					"upgradeId": "403",
					"index": "3",
					"requireLevel": "45",
					"step": "4",
					"requireSpecialization1": "95",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1120%"
				},
				"1524": {
					"id": "1524",
					"upgradeId": "404",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u534736%"
				},
				"1534": {
					"id": "1534",
					"upgradeId": "408",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534756%"
				},
				"1541": {
					"id": "1541",
					"upgradeId": "409",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "96",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8120%"
				},
				"1548": {
					"id": "1548",
					"upgradeId": "410",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u68cd\u5f71\u5343\u53e0\u7b2c7\u5f0f"
				},
				"1557": {
					"id": "1557",
					"upgradeId": "413",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad821%"
				},
				"1564": {
					"id": "1564",
					"upgradeId": "414",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "97",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad835%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a028%"
				},
				"1855": {
					"id": "1855",
					"upgradeId": "405",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u62f3\u5b9a\u516b\u8352\u7b2c7\u5f0f"
				},
				"89": {
					"id": "89",
					"upgradeId": "37",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "19",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8120%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534740%"
				},
				"104": {
					"id": "104",
					"upgradeId": "43",
					"index": "4",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "19",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad880%"
				},
				"191": {
					"id": "191",
					"upgradeId": "56",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "58",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad816%"
				},
				"228": {
					"id": "228",
					"upgradeId": "57",
					"index": "4",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "58",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad824%"
				},
				"597": {
					"id": "597",
					"upgradeId": "87",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "66",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad824%"
				},
				"630": {
					"id": "630",
					"upgradeId": "89",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "66",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u670960%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a6\u79d2"
				},
				"712": {
					"id": "712",
					"upgradeId": "110",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "73",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad824%"
				},
				"737": {
					"id": "737",
					"upgradeId": "111",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "73",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f413\u79d2"
				},
				"1010": {
					"id": "1010",
					"upgradeId": "133",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "80",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1123%"
				},
				"1026": {
					"id": "1026",
					"upgradeId": "136",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "80",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a032%"
				},
				"1123": {
					"id": "1123",
					"upgradeId": "160",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "84",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f32%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad824%"
				},
				"1152": {
					"id": "1152",
					"upgradeId": "163",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "84",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1123%"
				},
				"1832": {
					"id": "1832",
					"upgradeId": "317",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "88",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u534724\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002"
				},
				"1838": {
					"id": "1838",
					"upgradeId": "318",
					"index": "4",
					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "88",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad872%"
				},
				"1399": {
					"id": "1399",
					"upgradeId": "327",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "89",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a016%"
				},
				"1406": {
					"id": "1406",
					"upgradeId": "328",
					"index": "4",
					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "89",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad824%"
				},
				"1420": {
					"id": "1420",
					"upgradeId": "332",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "90",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1122%"
				},
				"1440": {
					"id": "1440",
					"upgradeId": "333",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "90",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f40%"
				},
				"1450": {
					"id": "1450",
					"upgradeId": "350",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "91",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a040%"
				},
				"1457": {
					"id": "1457",
					"upgradeId": "352",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "91",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1123%"
				},
				"1844": {
					"id": "1844",
					"upgradeId": "362",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "92",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad824%"
				},
				"1850": {
					"id": "1850",
					"upgradeId": "363",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "92",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad824%"
				},
				"1484": {
					"id": "1484",
					"upgradeId": "370",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "93",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad824%"
				},
				"1491": {
					"id": "1491",
					"upgradeId": "372",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "93",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d8\u70b9\u4f53\u529b"
				},
				"1501": {
					"id": "1501",
					"upgradeId": "383",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1122%"
				},
				"1508": {
					"id": "1508",
					"upgradeId": "385",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a040%"
				},
				"1518": {
					"id": "1518",
					"upgradeId": "403",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1122%"
				},
				"1525": {
					"id": "1525",
					"upgradeId": "404",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u534740%"
				},
				"1535": {
					"id": "1535",
					"upgradeId": "408",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "96",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534764%"
				},
				"1542": {
					"id": "1542",
					"upgradeId": "409",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "96",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8150%"
				},
				"1549": {
					"id": "1549",
					"upgradeId": "410",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9886\u609f\u68cd\u5f71\u5343\u53e0\u7b2c8\u5f0f"
				},
				"1558": {
					"id": "1558",
					"upgradeId": "413",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "97",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad824%"
				},
				"1565": {
					"id": "1565",
					"upgradeId": "414",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "97",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad840%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a032%"
				},
				"1856": {
					"id": "1856",
					"upgradeId": "405",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "96",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u53ef\u4ee5\u7528\u3010\u811a\u3011\u66ff\u4ee3\u62f3\u5b9a\u516b\u8352\u7b2c4\u30015\u30016\u30017\u5f0f\u7684\u3010\u62f3\u3011\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u62f3\u5b9a\u516b\u8352\u8fde\u62db"
				},
				"90": {
					"id": "90",
					"upgradeId": "37",
					"index": "5",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "19",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8135%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534745%"
				},
				"105": {
					"id": "105",
					"upgradeId": "43",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "19",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad890%"
				},
				"192": {
					"id": "192",
					"upgradeId": "56",
					"index": "5",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "58",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad818%"
				},
				"229": {
					"id": "229",
					"upgradeId": "57",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "58",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad827%"
				},
				"598": {
					"id": "598",
					"upgradeId": "87",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "66",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad827%"
				},
				"631": {
					"id": "631",
					"upgradeId": "89",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "66",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u670960%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a6.5\u79d2"
				},
				"713": {
					"id": "713",
					"upgradeId": "110",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "73",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad827%"
				},
				"738": {
					"id": "738",
					"upgradeId": "111",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "73",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f414\u79d2"
				},
				"1011": {
					"id": "1011",
					"upgradeId": "133",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "80",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1125%"
				},
				"1027": {
					"id": "1027",
					"upgradeId": "136",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "80",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a036%"
				},
				"1124": {
					"id": "1124",
					"upgradeId": "160",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "84",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f36%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad827%"
				},
				"1153": {
					"id": "1153",
					"upgradeId": "163",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "84",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1125%"
				},
				"1833": {
					"id": "1833",
					"upgradeId": "317",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "88",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u534727\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002"
				},
				"1839": {
					"id": "1839",
					"upgradeId": "318",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "88",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad881%"
				},
				"1400": {
					"id": "1400",
					"upgradeId": "327",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "89",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a018%"
				},
				"1407": {
					"id": "1407",
					"upgradeId": "328",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "89",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad827%"
				},
				"1421": {
					"id": "1421",
					"upgradeId": "332",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "90",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1124%"
				},
				"1441": {
					"id": "1441",
					"upgradeId": "333",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "90",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f45%"
				},
				"1451": {
					"id": "1451",
					"upgradeId": "350",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "91",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a045%"
				},
				"1458": {
					"id": "1458",
					"upgradeId": "352",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "91",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1125%"
				},
				"1485": {
					"id": "1485",
					"upgradeId": "370",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "93",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad827%"
				},
				"1492": {
					"id": "1492",
					"upgradeId": "372",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "93",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d9\u70b9\u4f53\u529b"
				},
				"1502": {
					"id": "1502",
					"upgradeId": "383",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1124%"
				},
				"1509": {
					"id": "1509",
					"upgradeId": "385",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a045%"
				},
				"1519": {
					"id": "1519",
					"upgradeId": "403",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1124%"
				},
				"1526": {
					"id": "1526",
					"upgradeId": "404",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u534745%"
				},
				"1536": {
					"id": "1536",
					"upgradeId": "408",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "96",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534772%"
				},
				"1543": {
					"id": "1543",
					"upgradeId": "409",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "96",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8180%"
				},
				"1550": {
					"id": "1550",
					"upgradeId": "410",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "97",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u53ef\u4ee5\u7528\u3010\u8f7b\u68cd\u3011\u66ff\u4ee3\u68cd\u5f71\u5343\u53e0\u7b2c4\u30015\u30016\u30017\u5f0f\u7684\u3010\u91cd\u68cd\u3011\uff0c\u4e00\u65e6\u66ff\u6362\uff0c\u5219\u5c06\u5f3a\u884c\u7ed3\u675f\u68cd\u5f71\u5343\u53e0\u8fde\u62db"
				},
				"1559": {
					"id": "1559",
					"upgradeId": "413",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "97",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad827%"
				},
				"1566": {
					"id": "1566",
					"upgradeId": "414",
					"index": "5",
					"requireLevel": "25",
					"step": "6",
					"requireSpecialization1": "97",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a036%"
				},
				"1845": {
					"id": "1845",
					"upgradeId": "362",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "92",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad827%"
				},
				"1851": {
					"id": "1851",
					"upgradeId": "363",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "92",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad827%"
				},
				"91": {
					"id": "91",
					"upgradeId": "37",
					"index": "6",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "19",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u4e71\u661f\u821e\u7b2c4\u5f0f\u76f4\u63a5\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8225%\uff0c\u5176\u66ff\u6362\u62db\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u534775%"
				},
				"106": {
					"id": "106",
					"upgradeId": "43",
					"index": "6",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "19",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u4e71\u661f\u821e\u5185\u4f24\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8150%"
				},
				"193": {
					"id": "193",
					"upgradeId": "56",
					"index": "6",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "58",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014(\u53ca\u5176\u53d8\u62db)\u30015\uff08\u53ca\u5176\u53d8\u62db\uff09\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u63d0\u9ad830%"
				},
				"230": {
					"id": "230",
					"upgradeId": "57",
					"index": "6",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "58",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u5954\u96f7\u51fb\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%"
				},
				"599": {
					"id": "599",
					"upgradeId": "87",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "66",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u65cb\u7a7a\u9707\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%"
				},
				"632": {
					"id": "632",
					"upgradeId": "89",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "66",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u5f53\u68cd\u5b50\u6536\u56de\u65f6\u4f1a\u6709100%\u7684\u57fa\u7840\u6982\u7387\u7ed9\u654c\u4eba\u9644\u52a0\u65ad\u7b4b\u72b6\u6001\uff0c\u57fa\u7840\u6301\u7eed\u65f6\u95f4\u4e3a7\u79d2"
				},
				"714": {
					"id": "714",
					"upgradeId": "110",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "73",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u5206\u8eab\u5288\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%"
				},
				"739": {
					"id": "739",
					"upgradeId": "111",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "73",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u6bcf\u4f7f\u7528\u4e00\u6b21\u5206\u8eab\u5288\u5219\u51cf\u5c11\u6d3b\u7b4b\u6280\u80fd\u5f53\u524d\u51b7\u5374\u65f6\u95f48\u79d2"
				},
				"1012": {
					"id": "1012",
					"upgradeId": "133",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "80",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1135%"
				},
				"1028": {
					"id": "1028",
					"upgradeId": "136",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "80",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u5de8\u733f\u62f3\u7f61\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a060%"
				},
				"1125": {
					"id": "1125",
					"upgradeId": "160",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "84",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u5206\u8eab\u5e7b\u5f71\u5b58\u5728\u65f6\u95f4\u5ef6\u957f60%\uff0c\u5206\u8eab\u5e7b\u5f71\u5c5e\u6027\u6574\u4f53\u63d0\u9ad845%"
				},
				"1154": {
					"id": "1154",
					"upgradeId": "163",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "84",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u5206\u8eab\u5e7b\u5f71\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1135%"
				},
				"1401": {
					"id": "1401",
					"upgradeId": "327",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "89",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u68cd\u52bf\u5982\u5c71\u6240\u6709\u62db\u5f0f\u7684\u57fa\u7840\u653b\u51fb\u901f\u5ea6\u589e\u52a030%"
				},
				"1408": {
					"id": "1408",
					"upgradeId": "328",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "89",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u68cd\u52bf\u5982\u5c71\u7b2c3\u30014\u30015\u30016\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%"
				},
				"1422": {
					"id": "1422",
					"upgradeId": "332",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "90",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u795e\u884c\u672f\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1134%"
				},
				"1442": {
					"id": "1442",
					"upgradeId": "333",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "90",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u795e\u884c\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u5ef6\u957f75%"
				},
				"1452": {
					"id": "1452",
					"upgradeId": "350",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "91",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a075%"
				},
				"1459": {
					"id": "1459",
					"upgradeId": "352",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "91",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u62a4\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1135%"
				},
				"1486": {
					"id": "1486",
					"upgradeId": "370",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "93",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u7834\u5929\u68cd\u6574\u4f53\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%"
				},
				"1493": {
					"id": "1493",
					"upgradeId": "372",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "93",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",

					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u7834\u5929\u68cd\u7684\u7b2c1\u4e0b\u653b\u51fb\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u6062\u590d15\u70b9\u4f53\u529b"
				},
				"1503": {
					"id": "1503",
					"upgradeId": "383",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u6d3b\u7b4b\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1134%"
				},
				"1510": {
					"id": "1510",
					"upgradeId": "385",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "94",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u597d\u6597\u72b6\u6001\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a075%"
				},
				"1520": {
					"id": "1520",
					"upgradeId": "403",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u9690\u8eab\u5492\u7684\u51b7\u5374\u65f6\u95f4\u51cf\u5c1134%"
				},
				"1527": {
					"id": "1527",
					"upgradeId": "404",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "95",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u7834\u6f5c\u72b6\u6001\u7684\u6548\u679c\u6574\u4f53\u63d0\u534775%"
				},
				"1537": {
					"id": "1537",
					"upgradeId": "408",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "96",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u62f3\u5b9a\u516b\u8352\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u76ee\u6807\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u5347150%"
				},
				"1544": {
					"id": "1544",
					"upgradeId": "409",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "96",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u62f3\u5b9a\u516b\u8352\u5bf9\u7834\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8225%"
				},
				"1560": {
					"id": "1560",
					"upgradeId": "413",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "97",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u5f0f\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%"
				},
				"1567": {
					"id": "1567",
					"upgradeId": "414",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "97",
					"requireLevel1": "10",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u68cd\u5f71\u5343\u53e0\u7b2c3\u30014\u30015\u30016\u30017\u30018\u5f0f\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad875%\uff0c\u4f46\u4f53\u529b\u6d88\u8017\u589e\u52a060%"
				},
				"1834": {
					"id": "1834",
					"upgradeId": "317",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "88",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u6bcf\u6b21\u5b8c\u6574\u65bd\u5c55\u75be\u5f71\u817f\u540e\uff0c\u7075\u7334\u653b\u51fb\u901f\u5ea6\u63d0\u534745\u70b9\uff0c\u6548\u679c\u6301\u7eed15\u79d2\uff0c\u6700\u591a\u53ef\u53e0\u52a02\u5c42\u3002"
				},
				"1840": {
					"id": "1840",
					"upgradeId": "318",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "88",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u75be\u5f71\u817f\u7b2c3\u30014\u30015\u5f0f\u53ca\u5176\u53d8\u62db\u5bf9\u643a\u5e26\u4e71\u661f\u821e\u5185\u4f24\u6548\u679c\u7684\u76ee\u6807\u9020\u6210\u7684\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad8135%"
				},
				"1846": {
					"id": "1846",
					"upgradeId": "362",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "92",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad845%"
				},
				"1852": {
					"id": "1852",
					"upgradeId": "363",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "92",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u8f70\u5929\u62f3\u7684\u653b\u51fb\u4f24\u5bb3\u6574\u4f53\u63d0\u9ad845%"
				}
			}
		}
	},
	"getSpecializationSpell": function(id) {
		return this.resource.specializationSpell[id]
	},
	"getSpecializationSpellEffect": function(id) {
		return this.resource.specializationSpellEffect[id]
	},
	"getSpecializationSpellUpgrade": function(id) {
		return this.resource.specializationSpellUpgrade[id]
	},
	"getSpecializationSpellUpgradeEffect": function(id) {
		return this.resource.specializationSpellUpgradeEffect[id]
	},
	"getMastery": function(id) {
		return this.resource.mastery[id]
	},
	"getLevel": function(id) {
		return this.resource.level[id]
	},
	"getClasses": function() {
		return this.resource.classes
	},
	"getSkillLayer": function(id) {
		for (i in this.resource.skillLayer) {
			if (this.resource.skillLayer[i].id == id) return this.resource.skillLayer[i]
		}
		return null
	}
};
function Role() {
	this.init.apply(this, arguments)
}
Role.prototype = {
	"id": "",
	"level": 0,
	"mastery": 0,
	"skillPoint": 0,
	"specializationPoint": 0,
	"data": {},
	"slot": [],
	"spellUpgrade": [],
	"spellEffect": [],
	"init": function(id) {
		this.id = id;
		this.data = new Data(id);
		this.level = 60
	},
	"changeSpecializationSpell": function(slot, spellId) {
		spell = this.data.getSpecializationSpell(spellId);
		if (!this.allowChooseSpecializationSpell(spellId)) return false;
		if (this.slot[slot]) {
			if (this.spellUpgrade[this.slot[slot].id]) delete this.spellUpgrade[this.slot[slot].id];
			if (this.spellEffect[this.slot[slot].id]) delete this.spellEffect[this.slot[slot].id];
			delete this.slot[slot]
		}
		skillLayer = this.data.getSkillLayer(spell.layerId);
		if (spell.effect) {
			spellEffect = this.data.getSpecializationSpellEffect(spell.effect[1])
		} else {
			alert("该技能尚无重天效果.");
			return false
		}
		if (parseInt(this.level) >= parseInt(skillLayer.requireLevel) && parseInt(this.level) >= parseInt(spellEffect.requireLevel)) {
			this.slot[slot] = spell;
			if (this.mastery == 0 && spell.masteryId > 0) this.mastery = spell.masteryId
		}
	},
	"cancelSpecializationSpell": function(spellId) {
		for (i in this.slot) {
			if (spellId == this.slot[i].id || spellId == this.slot[i].preSpell) {
				if (this.spellUpgrade[this.slot[i].id]) delete this.spellUpgrade[this.slot[i].id];
				if (this.spellEffect[this.slot[i].id]) delete this.spellEffect[this.slot[i].id];
				delete this.slot[i]
			}
		}
		this.mastery = 0;
		for (i in this.slot) {
			if (this.slot[i].masteryId > 0) this.mastery = this.slot[i].masteryId
		}
	},
	"levelUpSpecializationSpell": function(spellId) {
		if (parseInt(this.skillPoint) < 1) return false;
		spell = this.data.getSpecializationSpell(spellId);
		for (i in this.slot) {
			if (this.slot[i].id == spellId) {
				if (this.spellEffect[spellId]) {
					for (j in spell.effect) {
						spellEffect = this.data.getSpecializationSpellEffect(spell.effect[j]);
						if (parseInt(this.spellEffect[spellId].step) + 1 == spellEffect.step) {
							this.changeSpecializationSpellEffect(spellId, spellEffect.id);
							break
						}
					}
				} else {
					for (j in spell.effect) {
						spellEffect = this.data.getSpecializationSpellEffect(spell.effect[j]);
						if (2 == spellEffect.step) {
							this.changeSpecializationSpellEffect(spellId, spellEffect.id)
						}
					}
				}
			}
		}
	},
	"levelDownSpecializationSpell": function(spellId) {
		spell = this.data.getSpecializationSpell(spellId);
		for (i in this.slot) {
			if (this.slot[i].id == spellId) {
				if (this.spellEffect[spellId] && parseInt(this.spellEffect[spellId].step) > 1) {
					for (j in spell.effect) {
						spellEffect = this.data.getSpecializationSpellEffect(spell.effect[j]);
						if (parseInt(this.spellEffect[spellId].step) - 1 == spellEffect.step) {
							this.changeSpecializationSpellEffect(spellId, spellEffect.id);
							break
						}
					}
				}
			}
		}
	},
	"changeSpecializationSpellEffect": function(spellId, effectId) {
		spell = this.data.getSpecializationSpell(spellId);
		spellEffect = this.data.getSpecializationSpellEffect(effectId);
		for (i in this.slot) {
			if (this.slot[i].id == spellId) {
				if (parseInt(this.level) >= parseInt(spellEffect.requireLevel)) {
					this.spellEffect[spellId] = spellEffect
				}
			}
		}
	},
	"getSpellUpgradePoint": function(spellId) {
		if (this.spellUpgrade[spellId]) {
			spellUpgrade = this.spellUpgrade[spellId];
			upgradePoint = 0;
			for (i in spellUpgrade) {
				upgrade = this.data.getSpecializationSpellUpgrade(i);
				if (upgrade) {
					for (j in upgrade.effect) {
						upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(upgrade.effect[j]);
						if (parseInt(spellUpgrade[i].step) >= parseInt(upgradeEffect.step)) upgradePoint = parseInt(upgradePoint) + parseInt(upgradeEffect.requireSpecialPoint)
					}
				}
			}
			return upgradePoint
		} else {
			return 0
		}
	},
	"upgradeSpecializationSpell": function(spellId, effectId) {
		for (i in this.slot) {
			if (this.slot[i].id == spellId) {
				var upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(effectId);
				if (this.spellUpgrade[spellId] && this.spellUpgrade[spellId][upgradeEffect.upgradeId] && this.spellUpgrade[spellId][upgradeEffect.upgradeId].step == upgradeEffect.step) {
					delete this.spellUpgrade[spellId][upgradeEffect.upgradeId];
					return true
				}
				spell = this.slot[i];
				if (this.allowUpgradeSpecializationSpellUpgradeEffect(effectId) && this.allowPointChangeSpecializationSpellUpgradeEffect(effectId)) {
					if (!this.spellUpgrade[spellId]) {
						this.spellUpgrade[spellId] = []
					}
					this.spellUpgrade[spellId][upgradeEffect.upgradeId] = upgradeEffect
				}
				return true
			}
		}
		return false
	},
	"allowPointChangeSpecializationSpellUpgradeEffect": function(effectId) {
		targetUpgradeEffect = this.data.getSpecializationSpellUpgradeEffect(effectId);
		targetUpgrade = this.data.getSpecializationSpellUpgrade(targetUpgradeEffect.upgradeId);
		spell = this.data.getSpecializationSpell(targetUpgrade.specializationId);
		spellId = spell.id;
		upgradePoint = 0;
		oldPoint = 0;
		if (this.spellUpgrade[spellId]) {
			spellUpgrade = this.spellUpgrade[spellId];
			for (i in spellUpgrade) {
				upgrade = this.data.getSpecializationSpellUpgrade(i);
				if (upgrade) {
					for (j in upgrade.effect) {
						upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(upgrade.effect[j]);
						if (parseInt(spellUpgrade[i].step) >= parseInt(upgradeEffect.step)) oldPoint = parseInt(oldPoint) + parseInt(upgradeEffect.requireSpecialPoint)
					}
				}
			}
		}
		if (this.spellUpgrade[spellId]) {
			spellUpgrade = this.spellUpgrade[spellId];
			for (i in spellUpgrade) {
				if (i != targetUpgrade.id) {
					upgrade = this.data.getSpecializationSpellUpgrade(i);
					if (upgrade) {
						for (j in upgrade.effect) {
							upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(upgrade.effect[j]);
							if (parseInt(spellUpgrade[i].step) >= parseInt(upgradeEffect.step)) upgradePoint = parseInt(upgradePoint) + parseInt(upgradeEffect.requireSpecialPoint)
						}
					}
				} else {
					if (targetUpgrade) {
						for (j in targetUpgrade.effect) {
							upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(targetUpgrade.effect[j]);
							if (parseInt(targetUpgradeEffect.step) >= parseInt(upgradeEffect.step)) upgradePoint = parseInt(upgradePoint) + parseInt(upgradeEffect.requireSpecialPoint)
						}
					}
				}
			}
			if (!spellUpgrade[targetUpgrade.id]) {
				if (targetUpgrade) {
					for (j in targetUpgrade.effect) {
						upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(targetUpgrade.effect[j]);
						if (parseInt(targetUpgradeEffect.step) >= parseInt(upgradeEffect.step)) upgradePoint = parseInt(upgradePoint) + parseInt(upgradeEffect.requireSpecialPoint)
					}
				}
			}
		} else {
			if (targetUpgrade) {
				for (j in targetUpgrade.effect) {
					upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(targetUpgrade.effect[j]);
					if (parseInt(targetUpgradeEffect.step) >= parseInt(upgradeEffect.step)) upgradePoint = parseInt(upgradePoint) + parseInt(upgradeEffect.requireSpecialPoint)
				}
			}
		}
		if (spell.maxMastery >= upgradePoint && parseInt(upgradePoint) - parseInt(oldPoint) <= parseInt(this.specializationPoint)) return true;
		else {
			return false
		}
	},
	"allowUpgradeSpecializationSpellUpgrade": function(upgradeId) {
		upgrade = this.data.getSpecializationSpellUpgrade(upgradeId);
		for (i in upgrade.effect) {
			upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(upgrade.effect[i]);
			if (1 == upgradeEffect.step) {
				if (this.allowUpgradeSpecializationSpellUpgradeEffect(upgradeEffect.id)) return true;
				else return false;
				break
			}
		}
	},
	"allowUpgradeSpecializationSpellUpgradeEffect": function(effectId) {
		upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(effectId);
		spellId = this.data.getSpecializationSpellUpgrade(upgradeEffect.upgradeId).specializationId;
		if (this.spellUpgrade[spellId] && this.spellUpgrade[spellId][upgradeEffect.upgradeId] && parseInt(this.spellUpgrade[spellId][upgradeEffect.upgradeId].step) >= parseInt(upgradeEffect.step)) {
			return true
		}
		if (parseInt(upgradeEffect.requireLevel) > parseInt(this.level)) {
			return false
		}
		for (i = 1; i <= 3; i++) {
			if (upgradeEffect['requireSpecialization' + i] > 0) {
				spell = this.data.getSpecializationSpell(upgradeEffect['requireSpecialization' + i]);
				if (typeof(this.spellEffect[spell.id]) != "undefined" && parseInt(this.spellEffect[spell.id].step) >= parseInt(upgradeEffect['requireLevel' + i])) {
					continue
				} else {
					temp = false;
					if (upgradeEffect['requireLevel' + i] == 1) {
						for (j in this.slot) {
							if (this.slot[j].id == spell.id) {
								temp = true
							}
						}
					}
					if (temp == false) return false
				}
			}
		}
		for (i = 1; i <= 3; i++) {
			if (upgradeEffect['requireUpgrade' + i] > 0) {
				var upgrade = this.data.getSpecializationSpellUpgrade(upgradeEffect['requireUpgrade' + i]);
				var spell = this.data.getSpecializationSpell(upgrade.specializationId);
				if (typeof(this.spellUpgrade[spell.id]) != "undefined" && typeof(this.spellUpgrade[spell.id][upgrade.id]) != "undefined" && parseInt(this.spellUpgrade[spell.id][upgrade.id].step) >= parseInt(upgradeEffect['requireUpgradeLevel' + i])) {
					continue
				} else return false
			}
		}
		if (parseInt(upgradeEffect.requireSpecialPoint) > parseInt(this.specializationPoint)) return false;
		if (!this.allowPointChangeSpecializationSpellUpgradeEffect(effectId)) return false;
		return true
	},
	"allowChooseSpecializationSpell": function(spellId) {
		spell = this.data.getSpecializationSpell(spellId);
		if ((this.mastery == 0 || this.mastery == spell.masteryId || (this.mastery > 0 && spell.masteryId == 0)) && (spell['preSpell'] == 0 || object.role.isSpellLearn(spell['preSpell']))) {
			return true
		}
		return false
	},
	"isSpellLearn": function(spellId) {
		for (var i in this.slot) {
			if (this.slot[i].id == spellId) return true
		}
		return false
	},
	"reCount": function() {
		level = this.data.getLevel(this.level);
		this.skillPoint = level.skillPoint;
		this.specializationPoint = level.specializationPoint;
		for (i in this.spellEffect) {
			var spellEffect = this.spellEffect[i];
			if (this.isSpellLearn(i)) this.skillPoint = parseInt(this.skillPoint) - parseInt(spellEffect.step) + 1
		}
		for (i in this.spellUpgrade) {
			if (this.isSpellLearn(i)) {
				for (j in this.spellUpgrade[i]) {
					var upgradeEffect = this.data.getSpecializationSpellUpgradeEffect(this.spellUpgrade[i][j].id);
					var upgrade = this.data.getSpecializationSpellUpgrade(upgradeEffect.upgradeId);
					for (k in upgrade.effect) {
						var item = this.data.getSpecializationSpellUpgradeEffect(upgrade.effect[k]);
						if (parseInt(upgradeEffect.step) >= parseInt(item.step)) this.specializationPoint = parseInt(this.specializationPoint) - parseInt(item.requireSpecialPoint)
					}
				}
			}
		}
	}
};
function PTooltips() {
	this.init.apply(this, arguments)
}
PTooltips.prototype = {
	"handle": null,
	"object": null,
	"option": null,
	"container": "tooltip",
	"event": null,
	"isLocked": false,
	"mirror": null,
	"loadLocked": false,
	"proxy": null,
	"gXCoord": null,
	"gYCoord": null,
	"init": function(obj, proxy) {
		if (obj == null) alert("Cannot found object!");
		if (proxy == null) alert("Cannot found proxy!");
		if (obj && proxy) {
			this.object = obj;
			this.proxy = proxy;
			this.eventRegist()
		}
	},
	"showRegistObject": function() {
		if (typeof(this.proxy) == "function") {
			this.option = this.proxy();
			if (PTooltips.handle == this) {
				this.showObject()
			}
		} else {
			var putId = (new Date()).getTime() + Math.round(Math.random() * 100);
			var thisObject = this;
			var proxyUrl;
			if (this.proxy.lastIndexOf("?") > -1) proxyUrl = this.proxy + "&";
			else proxyUrl = this.proxy + "?";
			this.loadLocked = true;
			$.ajax({
				url: proxyUrl + "request=" + encodeURIComponent($(thisObject.object).attr("href")),
				dataType: "jsonp",
				success: function(data) {
					thisObject.option = data;
					if (PTooltips.handle == thisObject) {
						thisObject.showObject()
					}
				}
			})
		}
	},
	"showObject": function() {
		if (this.option == null && !this.loadLocked) {
			this.showRegistObject()
		} else {
			if (!this.option.data) return;
			var tooltip = $("#" + this.container);
			if (this.mirror) {
				tooltip.html(this.mirror.html())
			} else {
				var mixer = tooltip.clone();
				mixer.html("<div part='icon' style='float:left;'></div><div part='tips' style='float:left;'></div>");
				if (this.option.icon) {
					mixer.find("div[part=icon]").css({
						"background-image": "url('" + this.option.icon + "')",
						"width": this.option.iconWidth ? this.option.iconWidth: "0px",
						"height": this.option.iconHeight ? this.option.iconHeight: "0px",
						"margin-right": "5px"
					});
					mixer.find("div[part=icon]").show()
				} else mixer.find("div[part=icon]").hide();
				if (typeof(this.option.data) == "function") mixer.find("div[part=tips]").html(this.option.data());
				else mixer.find("div[part=tips]").html(this.option.data);
				mixer = this.initCss(mixer);
				if (this.option.css) {
					for (var i in this.option.css) {
						mixer.find(i).css(this.option.css[i])
					}
				}
				this.mirror = mixer;
				tooltip.html(mixer.html())
			}
			this.adjustPosition();
			tooltip.show()
		}
		this.isLocked = false
	},
	"hideObject": function() {
		$("#" + this.container).hide()
	},
	"initCss": function(mixer) {
		if (this.option.width) mixer.find("div[part=tips]").css({
			"width": this.option.width
		});
		if (this.option.height) mixer.find("div[part=tips]").css({
			"height": this.option.height
		});
		if (this.option.defaultStyle) {
			mixer.find("div[part=icon]").css({
				"opacity": "0.95",
				"border": " 1px solid #353837",
				"-moz-border-radius": "5px",
				"-webkit-border-radius": "5px",
				"border-radius": "5px",
				"-moz-box-shadow": "0 0 10px #000",
				"-webkit-box-shadow": "0 0 10px black",
				"box-shadow": "0 0 10px black"
			});
			mixer.find("div[part=tips]").css({
				"background": "#1D180E",
				"padding": "10px",
				"border": "1px solid #322A20",
				"opacity": "0.95",
				"color": "#FFFFFF",
				"max-width": "355px",
				"_width": "355px",
				"-moz-border-radius": "2px",
				"-webkit-border-radius": "2px",
				"border-radius": "2px",
				"-moz-box-shadow": "0 0 10px #000",
				"-webkit-box-shadow": "0 0 10px black",
				"box-shadow": "0 0 10px black"
			})
		}
		return mixer
	},
	"adjustPosition": function() {
		var tooltip = $("#" + this.container);
		var windowSize = this.getWindowSize();
		var scrollPos = this.getScrollPos();
		var offsetWidth = tooltip[0].offsetWidth;
		var offsetHeight = tooltip[0].offsetHeight;
		var gLeftEdgeOffset = -15;
		var gTopEdgeOffset = 15;
		if (window.innerHeight) {
			this.gXCoord = this.event.pageX;
			this.gYCoord = this.event.pageY
		} else {
			this.gXCoord = this.event.clientX + scrollPos.x;
			this.gYCoord = this.event.clientY + scrollPos.y
		}
		var x = this.gXCoord + gLeftEdgeOffset;
		var y = this.gYCoord + gTopEdgeOffset;
		if (x + gLeftEdgeOffset + offsetWidth + 4 >= scrollPos.x + windowSize.w) {
			var tempX = this.gXCoord - offsetWidth - gLeftEdgeOffset;
			if (tempX >= 0) {
				x = tempX
			} else {
				x = scrollPos.x + windowSize.w - offsetWidth - gLeftEdgeOffset - 4
			}
		}
		if (scrollPos.y + windowSize.h <= y + offsetHeight) {
			y = this.gYCoord - offsetHeight - gTopEdgeOffset;
			if (this.option.icon) {
				if (this.gXCoord >= x - 48 && this.gXCoord <= x && this.gYCoord >= y - 4 && this.gYCoord <= y + 48) {
					y -= 48 - (this.gYCoord - y)
				}
			}
		}
		$("#" + this.container).css({
			left: x + "px",
			top: y + "px"
		})
	},
	"eventRegist": function() {
		var thisObj = this;
		$(this.object).mouseover(function(e) {
			PTooltips.handle = thisObj;
			thisObj.event = e;
			thisObj.showObject();
			$(this).mousemove(function(e) {
				PTooltips.handle = thisObj;
				thisObj.event = e;
				thisObj.adjustPosition()
			});
			return false
		});
		$(this.object).mouseout(function(e) {
			PTooltips.handle = null;
			thisObj.event = e;
			$(this).unbind('mousemove');
			thisObj.hideObject();
			return false
		})
	},
	"getWindowSize": function() {
		var width = 0,
		height = 0;
		if (typeof window.innerWidth == "number") {
			width = window.innerWidth;
			height = window.innerHeight
		} else {
			if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
				width = document.documentElement.clientWidth;
				height = document.documentElement.clientHeight
			} else {
				if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
					width = document.body.clientWidth;
					height = document.body.clientHeight
				}
			}
		}
		return {
			w: width,
			h: height
		}
	},
	"getScrollPos": function() {
		var hScroll = 0,
		vScroll = 0;
		if (typeof window.pageYOffset == "number") {
			hScroll = window.pageXOffset;
			vScroll = window.pageYOffset
		} else {
			if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
				hScroll = document.documentElement.scrollLeft;
				vScroll = document.documentElement.scrollTop
			} else {
				if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
					hScroll = document.body.scrollLeft;
					vScroll = document.body.scrollTop
				}
			}
		}
		return {
			x: hScroll,
			y: vScroll
		}
	}
};
function SkillUpgrade() {
	this.init.apply(this, arguments)
}
SkillUpgrade.prototype = {
	"role": null,
	"effect": [],
	"upgrade": [],
	"init": function(role) {
		this.role = role;
		this.effect = this.role.data.resource.specializationSpellUpgradeEffect;
		this.upgrade = this.role.data.resource.specializationSpellUpgrade
	},
	"show": function(spellId) {
		this.draw(spellId);
		$('.sill_learn_list').hide();
		$('.skill_promote').show();
		$('.dzs_calculator').show()
	},
	"hide": function() {
		$('.skill_promote').hide()
	},
	"draw": function(spellId) {
		var obj = this;
		var spell = this.role.data.getSpecializationSpell(spellId);
		$(".upgrade_title").html(spell.name);
		if (spell) {
			$(".skill_promote ul").html("");
			for (i in spell.upgrade) {
				upgradeId = spell.upgrade[i];
				if (this.upgrade[upgradeId]) {
					if (!this.role.allowUpgradeSpecializationSpellUpgrade(upgradeId)) html = '<li class="skill_promote_forbid" upgrade="' + upgradeId + '">';
					else html = '<li upgrade="' + upgradeId + '">';
					html += '<span class="skill_promote_amount">';
					html += this.generateUpgradeEffectPoint(this.role.spellUpgrade[spellId], upgradeId, this.upgrade[upgradeId].effect);
					html += '</span>';
					html += '<span class="skill_promote_name"><img src="resources/icon/' + spell.pic + '.jpg"><i>' + this.upgrade[upgradeId].name + '</i></span>';
					html += '</li>';
					newObject = $(html);
					newObject.find("em").click(function() {
						obj.role.upgradeSpecializationSpell(spellId, $(this).attr("effect"));
						application.drawWithUpgrade(spellId)
					});
					$(".skill_promote ul").append(newObject)
				}
			}
			$('.skill_promote ul li').each(function() {
				var upgradeId = $(this).attr("upgrade");
				new PTooltips(this,
				function() {
					return {
						"icon": 'resources/icon/' + spell.pic + '.jpg',
						"iconWidth": "64px",
						"iconHeight": "64px",
						"defaultStyle": true,
						"data": function() {
							upgrade = null;
							upgrade = obj.role.data.getSpecializationSpellUpgrade(upgradeId);
							maxUpgradeStep = 0;
							if (upgrade == null) return "error!";
							if (obj.role.spellUpgrade[spellId] && obj.role.spellUpgrade[spellId][upgrade.id]) {
								upgradeEffect = obj.role.spellUpgrade[spellId][upgrade.id]
							} else {
								for (i in upgrade.effect) {
									if (obj.role.data.getSpecializationSpellUpgradeEffect(upgrade.effect[i]).step == 1) upgradeEffect = obj.role.data.getSpecializationSpellUpgradeEffect(upgrade.effect[i])
								}
							}
							nextUpgradeEffect = null;
							for (i in upgrade.effect) {
								maxUpgradeStep++;
								if (obj.role.data.getSpecializationSpellUpgradeEffect(upgrade.effect[i]).step == parseInt(upgradeEffect.step) + 1) nextUpgradeEffect = obj.role.data.getSpecializationSpellUpgradeEffect(upgrade.effect[i])
							}
							html = '<div stlye="color:#E5CB81 !important;" class="name">' + upgrade.name + '<span style="float:right;color:gray;">';
							html += upgradeEffect.step + '/' + maxUpgradeStep;
							html += '</span></div>';
							html += '<br><div style="color:#fed100">' + upgradeEffect.description + '</div>';
							html += '<div class="color:#855B47 !important;">' + obj.generateUpgradeEffectNeedHtml(upgradeEffect) + '</div>';
							html += '<div class="color:#855B47 !important;">' + obj.generateLevelHtml(upgradeEffect.requireLevel) + '</div>';
							html += '<div class="color:#855B47 !important;">' + obj.generateSpecialPointHtml(upgradeEffect.requireSpecialPoint) + '</div>';
							if (!obj.role.allowPointChangeSpecializationSpellUpgradeEffect(upgradeEffect.id)) html += '<div class="color:#855B47 !important;"><font color="red">精修点数不足或已超出精修上限...</font></div>';
							if (nextUpgradeEffect != null && typeof(nextUpgradeEffect) != "undefined") {
								html += '<hr />';
								html += '<div stlye="color:#E5CB81 !important;" class="name">' + upgrade.name + '(下一重天)<span style="float:right;color:gray;">';
								html += nextUpgradeEffect.step + '/' + maxUpgradeStep;
								html += '</span></div>';
								html += '<br><div style="color:#fed100">' + nextUpgradeEffect.description + '</div>';
								html += '<div class="color:#855B47 !important;">' + obj.generateUpgradeEffectNeedHtml(nextUpgradeEffect) + '</div>';
								html += '<div class="color:#855B47 !important;">' + obj.generateLevelHtml(nextUpgradeEffect.requireLevel) + '</div>';
								html += '<div class="color:#855B47 !important;">' + obj.generateSpecialPointHtml(nextUpgradeEffect.requireSpecialPoint) + '</div>';
								if (!obj.role.allowPointChangeSpecializationSpellUpgradeEffect(nextUpgradeEffect.id)) html += '<div class="color:#855B47 !important;"><font color="red">精修点数不足或已超出精修上限...</font></div>'
							}
							return html
						}
					}
				})
			})
		}
	},
	"generateUpgradeEffectPoint": function(upgrade, upgradeId, effect) {
		html = '';
		if (upgrade) spellUpgradeEffect = upgrade[upgradeId];
		else spellUpgradeEffect = null;
		for (i in effect) {
			var upgradeEffect = this.role.data.getSpecializationSpellUpgradeEffect(effect[i]);
			if (spellUpgradeEffect != null && typeof(spellUpgradeEffect) != "undefined" && parseInt(spellUpgradeEffect.step) >= parseInt(upgradeEffect.step)) {
				html += '<em effect="' + upgradeEffect.id + '" class="skill_promoted">'
			} else html += '<em effect="' + upgradeEffect.id + '">';
			if (!this.role.allowUpgradeSpecializationSpellUpgradeEffect(upgradeEffect.id)) html += '<font color="red">' + upgradeEffect.requireSpecialPoint + '</font>';
			else html += upgradeEffect.requireSpecialPoint;
			html += '</em>'
		}
		return html
	},
	"generateLevelHtml": function(level) {
		if (level > parseInt(this.role.level)) return '<font color="red">需求等级:' + level + '</font>';
		else return '需求等级:' + level
	},
	"generateSpecialPointHtml": function(point) {
		if (parseInt(point) > parseInt(this.role.specializationPoint)) return '<font color="red">需求精修点:' + point + '</font>';
		else return '需求精修点:' + point
	},
	"generateUpgradeEffectNeedHtml": function(upgradeEffect) {
		html = '';
		for (i = 1; i <= 3; i++) {
			if (upgradeEffect['requireSpecialization' + i] > 0) {
				if (html != '') html += ',';
				var spell = this.role.data.getSpecializationSpell(upgradeEffect['requireSpecialization' + i]);
				if (typeof(this.role.spellEffect[spell.id]) != "undefined" && parseInt(this.role.spellEffect[spell.id].step) >= parseInt(upgradeEffect['requireLevel' + i])) {
					html += spell.name + upgradeEffect['requireLevel' + i] + '重天'
				} else {
					temp = '<font color="red">' + spell.name + upgradeEffect['requireLevel' + i] + '重天</font>';
					if (upgradeEffect['requireLevel' + i] == 1) {
						for (j in this.role.slot) {
							if (this.role.slot[j].id == spell.id) {
								temp = spell.name + upgradeEffect['requireLevel' + i] + '重天';
								break
							}
						}
					}
					html += temp
				}
			}
		}
		for (i = 1; i <= 3; i++) {
			if (upgradeEffect['requireUpgrade' + i] > 0) {
				if (html != '') html += ',';
				var upgrade = this.role.data.getSpecializationSpellUpgrade(upgradeEffect['requireUpgrade' + i]);
				var spell = this.role.data.getSpecializationSpell(upgrade.specializationId);
				if (typeof(this.role.spellUpgrade[spell.id]) != "undefined" && typeof(this.role.spellUpgrade[spell.id][upgrade.id]) != "undefined" && parseInt(this.role.spellUpgrade[spell.id][upgrade.id].step) >= parseInt(upgradeEffect['requireUpgradeLevel' + i])) {
					html += spell.name + upgradeEffect['requireUpgradeLevel' + i] + '重天'
				} else html += '<font color="red">' + upgrade.name + upgradeEffect['requireUpgradeLevel' + i] + '重天</font>'
			}
		}
		if (html != '') return '需要技能:' + html;
		else return html
	}
};