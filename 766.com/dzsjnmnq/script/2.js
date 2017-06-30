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
				"id": "2",
				"icon": "images\/role_icon4.png",
				"name": "\u795e\u5c06"
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
				"4": {
					"id": "4",
					"icon": "sj_ys",
					"name": "\u5143\u7d20\u67aa\u7cfb",
					"description": "\u5143\u7d20\u67aa\u4e13\u7cbe\uff1a\u589e\u52a0\u653b\u51fb\u901f\u5ea640\u70b9\uff0c\u589e\u52a0\u7b4b\u9aa830%\u3002\u5207\u6362\u6210\u67aa\u65f6\uff0c\u4e0b\u4e00\u6b21\u653b\u51fb\u4f24\u5bb3\u989d\u5916\u589e\u52a0120%\u3002\u5207\u6362\u6210\u5251\u65f6\uff0c\u589e\u52a020%\u79fb\u52a8\u901f\u5ea6\uff0c\u6301\u7eed10\u79d2\u3002\u5207\u6362\u6210\u70ae\u65f6\uff0c\u56de\u590d\u5929\u795e\u76fe500\u70b9\uff0c\u6bcf\u6b21\u5207\u6362\u6b66\u5668\u90fd\u4f1a\u6dfb\u52a0\u589e\u52a0\u653b\u51fb\u901f\u5ea63%\u7684\u72b6\u6001\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"5": {
					"id": "5",
					"icon": "sj_zq",
					"name": "\u91cd\u67aa\u7cfb",
					"description": "\u91cd\u67aa\u4e13\u7cbe\uff1a\u589e\u52a0\u795e\u5c06\u547d\u4e2d\u738750%\uff0c\u66b4\u51fb\u4f24\u5bb350%.\u5207\u6362\u6210\u67aa\u65f6\uff0c\u4e0b\u4e00\u6b21\u653b\u51fb\u9020\u6210\u76ee\u6807\u7729\u6655\uff0c\u6301\u7eed3\u79d2\u3002\u5207\u6362\u6210\u5251\u65f6\uff0c\u4e0b\u4e00\u6b21\u653b\u51fb\u9020\u6210\u76ee\u6807\u65ad\u7b4b\uff0c\u51cf\u5c1120%\u79fb\u52a8\u901f\u5ea6\u6301\u7eed5\u79d2\u3002\u5207\u6362\u6210\u70ae\u65f6\uff0c\u56de\u590d\u5929\u795e\u76fe500\u70b9\u3002\u6bcf\u6b21\u5207\u6b66\u5668\u90fd\u4f1a\u6dfb\u52a0\u514d\u4f24\u73875%\u7684\u72b6\u6001\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
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
				"25": {
					"id": "25",
					"preSpell": "0",
					"name": "\u94f6\u94a9\u94c1\u753b",
					"pic": "sj_RoleSkill_0174",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff08128%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08426%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002",
					"effect": {
						"1": "103",
						"18": "3291",
						"17": "3290",
						"16": "3289",
						"15": "3288",
						"14": "3287",
						"13": "3286",
						"12": "3285",
						"11": "3284",
						"10": "3283",
						"9": "3282",
						"8": "3281",
						"7": "3280",
						"6": "3279",
						"5": "3278",
						"4": "3277",
						"3": "3276",
						"2": "3275",
						"19": "3292",
						"20": "3293"
					},
					"upgrade": ["15", "16", "17", "19", "22"]
				},
				"27": {
					"id": "27",
					"preSpell": "0",
					"name": "\u6a2a\u626b\u516b\u65b9",
					"pic": "sj_RoleSkill_0237",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(294%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(203%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(566%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(566%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002",
					"effect": {
						"1": "201",
						"2": "3294",
						"3": "3295",
						"4": "3296",
						"5": "3297",
						"6": "3298",
						"7": "3299",
						"8": "3300",
						"9": "3301",
						"10": "3302",
						"11": "3303",
						"12": "3304",
						"13": "3305",
						"14": "3306",
						"15": "3307",
						"16": "3308",
						"17": "3309",
						"19": "3311",
						"18": "3310",
						"20": "3312"
					},
					"upgrade": ["27", "28", "29", "30", "32"]
				},
				"31": {
					"id": "31",
					"preSpell": "0",
					"name": "\u866c\u9f99\u66b4",
					"pic": "sj_RoleSkill_0177",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "0",
					"needSpellBook": "0",
					"description": " \t\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0855%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0859%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08208%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0857%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0861%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08212%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002",
					"effect": {
						"1": "341",
						"2": "3313",
						"3": "3314",
						"4": "3315",
						"5": "3316",
						"6": "3317",
						"7": "3318",
						"8": "3319",
						"9": "3320",
						"10": "3321",
						"11": "3322",
						"19": "3330",
						"18": "3329",
						"17": "3328",
						"16": "3327",
						"15": "3326",
						"14": "3325",
						"13": "3324",
						"12": "3323",
						"20": "3331"
					},
					"upgrade": ["39", "40", "41", "42", "44"]
				},
				"35": {
					"id": "35",
					"preSpell": "0",
					"name": "\u7834\u706d\u795e\u67aa",
					"pic": "sj_RoleSkill_0243",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08480%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(1296%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002",
					"effect": {
						"1": "481",
						"18": "3348",
						"17": "3347",
						"16": "3346",
						"15": "3345",
						"14": "3344",
						"13": "3343",
						"12": "3342",
						"11": "3341",
						"10": "3340",
						"9": "3339",
						"8": "3338",
						"7": "3337",
						"6": "3336",
						"5": "3335",
						"4": "3334",
						"3": "3333",
						"2": "3332",
						"19": "3349",
						"20": "3350"
					},
					"upgrade": ["48", "49", "50", "51", "53"]
				},
				"40": {
					"id": "40",
					"preSpell": "0",
					"name": "\u9501\u5589\u67aa",
					"pic": "sj_RoleSkill_0180",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(402%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002",
					"effect": {
						"1": "681",
						"2": "3351",
						"3": "3352",
						"4": "3353",
						"5": "3354",
						"6": "3355",
						"17": "3366",
						"16": "3365",
						"15": "3364",
						"14": "3363",
						"13": "3362",
						"12": "3361",
						"11": "3360",
						"10": "3359",
						"9": "3358",
						"8": "3357",
						"7": "3356",
						"18": "3367",
						"19": "3368",
						"20": "3369"
					},
					"upgrade": ["58", "59", "60", "61", "62"]
				},
				"51": {
					"id": "51",
					"preSpell": "0",
					"name": "\u51a0\u5802\u817f",
					"pic": "sj_RoleSkill_131",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210714%\u7684\u4f24\u5bb3\u3002",
					"effect": {
						"1": "781",
						"2": "3370",
						"3": "3371",
						"15": "3383",
						"14": "3382",
						"13": "3381",
						"12": "3380",
						"11": "3379",
						"10": "3378",
						"9": "3377",
						"8": "3376",
						"7": "3375",
						"6": "3374",
						"5": "3373",
						"4": "3372",
						"16": "3384",
						"17": "3385",
						"18": "3386",
						"19": "3387",
						"20": "3388"
					},
					"upgrade": ["63", "64", "65", "66", "67"]
				},
				"57": {
					"id": "57",
					"preSpell": "0",
					"name": "\u96f7\u9f99\u5165\u5730",
					"pic": "sj_RoleSkill_0234",
					"maxStep": "20",
					"masteryId": "4",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08609%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002",
					"effect": {
						"1": "881",
						"2": "3389",
						"3": "3390",
						"4": "3391",
						"5": "3392",
						"17": "3404",
						"16": "3403",
						"15": "3402",
						"14": "3401",
						"13": "3400",
						"12": "3399",
						"11": "3398",
						"10": "3397",
						"9": "3396",
						"8": "3395",
						"7": "3394",
						"6": "3393",
						"18": "3405",
						"19": "3406",
						"20": "3407"
					},
					"upgrade": ["73", "75", "79", "82", "86"]
				},
				"61": {
					"id": "61",
					"preSpell": "0",
					"name": "\u94c1\u5c71\u67aa",
					"pic": "sj_RoleSkill_0239",
					"maxStep": "20",
					"masteryId": "5",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u5347261\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u53473658\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%",
					"effect": {
						"1": "981",
						"2": "3408",
						"3": "3409",
						"4": "3410",
						"5": "3411",
						"6": "3412",
						"7": "3413",
						"8": "3414",
						"9": "3415",
						"10": "3416",
						"11": "3417",
						"12": "3418",
						"13": "3419",
						"14": "3420",
						"15": "3421",
						"16": "3422",
						"17": "3423",
						"18": "3424",
						"19": "3425",
						"20": "3426"
					},
					"upgrade": ["118", "121", "125", "126", "128"]
				},
				"65": {
					"id": "65",
					"preSpell": "0",
					"name": "\u5929\u773c\u00b7\u7834",
					"pic": "sj_RoleSkill_0235",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210369%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1062",
						"2": "3427",
						"3": "3428",
						"4": "3429",
						"16": "3441",
						"15": "3440",
						"14": "3439",
						"13": "3438",
						"12": "3437",
						"11": "3436",
						"10": "3435",
						"9": "3434",
						"8": "3433",
						"7": "3432",
						"6": "3431",
						"5": "3430",
						"17": "3442",
						"18": "3443",
						"19": "3444",
						"20": "3445"
					},
					"upgrade": ["167", "171", "174", "179", "189"]
				},
				"68": {
					"id": "68",
					"preSpell": "0",
					"name": "\u5929\u773c\u00b7\u7f1a",
					"pic": "sj_RoleSkill_135",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230560%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002",
					"effect": {
						"1": "1082",
						"2": "3446",
						"3": "3447",
						"4": "3448",
						"5": "3449",
						"6": "3450",
						"17": "3461",
						"16": "3460",
						"15": "3459",
						"14": "3458",
						"13": "3457",
						"12": "3456",
						"11": "3455",
						"10": "3454",
						"9": "3453",
						"8": "3452",
						"7": "3451",
						"18": "3462",
						"19": "3463",
						"20": "3464"
					},
					"upgrade": ["199", "201", "215", "217", "223"]
				},
				"71": {
					"id": "71",
					"preSpell": "0",
					"name": "\u5954\u96f7\u67aa",
					"pic": "sj_RoleSkill_0236",
					"maxStep": "20",
					"masteryId": "4",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff081053%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff081209%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08464%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08468%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff081131%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c",
					"effect": {
						"1": "1122",
						"2": "3465",
						"3": "3466",
						"4": "3467",
						"5": "3468",
						"6": "3469",
						"7": "3470",
						"8": "3471",
						"9": "3472",
						"10": "3473",
						"11": "3474",
						"12": "3475",
						"19": "3482",
						"18": "3481",
						"17": "3480",
						"16": "3479",
						"15": "3478",
						"14": "3477",
						"13": "3476",
						"20": "3483"
					},
					"upgrade": ["236", "241", "249", "251", "254"]
				},
				"75": {
					"id": "75",
					"preSpell": "0",
					"name": "\u4e71\u661f\u795e\u67aa",
					"pic": "sj_RoleSkill_0240",
					"maxStep": "20",
					"masteryId": "5",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff081134%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff082551%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002",
					"effect": {
						"1": "1162",
						"2": "3484",
						"3": "3485",
						"4": "3486",
						"5": "3487",
						"6": "3488",
						"7": "3489",
						"8": "3490",
						"9": "3491",
						"10": "3492",
						"11": "3493",
						"19": "3501",
						"18": "3500",
						"17": "3499",
						"16": "3498",
						"15": "3497",
						"14": "3496",
						"13": "3495",
						"12": "3494",
						"20": "3502"
					},
					"upgrade": ["274", "277", "280", "283", "287"]
				},
				"78": {
					"id": "78",
					"preSpell": "0",
					"name": "\u54ee\u5929\u795e\u72ac",
					"pic": "sj_RoleSkill_0182",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210178%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2144.5%\u7684\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1202",
						"2": "3560",
						"3": "3561",
						"4": "3562",
						"5": "3563",
						"6": "3564",
						"17": "3575",
						"16": "3574",
						"15": "3573",
						"14": "3572",
						"13": "3571",
						"12": "3570",
						"11": "3569",
						"10": "3568",
						"9": "3567",
						"8": "3566",
						"7": "3565",
						"18": "3576",
						"19": "3577",
						"20": "3578"
					},
					"upgrade": ["295", "297", "299", "301", "302"]
				},
				"81": {
					"id": "81",
					"preSpell": "0",
					"name": "\u795e\u72ac\u5420",
					"pic": "sj_RoleSkill_0241",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210166%\u7684\u4f24\u5bb3\u3002",
					"effect": {
						"15": "3516",
						"14": "3515",
						"13": "3514",
						"12": "3513",
						"11": "3512",
						"10": "3511",
						"9": "3510",
						"8": "3509",
						"7": "3508",
						"6": "3507",
						"5": "3506",
						"4": "3505",
						"3": "3504",
						"1": "1262",
						"2": "3503",
						"16": "3517",
						"17": "3518",
						"18": "3519",
						"19": "3520",
						"20": "3521"
					},
					"upgrade": ["309", "310", "311", "313", "315"]
				},
				"83": {
					"id": "83",
					"preSpell": "0",
					"name": "\u75be\u5f71\u523a",
					"pic": "sj_RoleSkill_0242",
					"maxStep": "20",
					"masteryId": "4",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(2206%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002",
					"effect": {
						"1": "1302",
						"2": "3522",
						"3": "3523",
						"4": "3524",
						"5": "3525",
						"6": "3526",
						"17": "3537",
						"16": "3536",
						"15": "3535",
						"14": "3534",
						"13": "3533",
						"12": "3532",
						"11": "3531",
						"10": "3530",
						"9": "3529",
						"8": "3528",
						"7": "3527",
						"18": "3538",
						"19": "3539",
						"20": "3540"
					},
					"upgrade": ["319", "320", "321", "322", "323"]
				},
				"87": {
					"id": "87",
					"preSpell": "0",
					"name": "\u6e38\u9f99\u67aa",
					"pic": "sj_RoleSkill_0238",
					"maxStep": "20",
					"masteryId": "5",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff081304%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff084563%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1322",
						"2": "3541",
						"3": "3542",
						"4": "3543",
						"5": "3544",
						"6": "3545",
						"17": "3556",
						"16": "3555",
						"15": "3554",
						"14": "3553",
						"13": "3552",
						"12": "3551",
						"11": "3550",
						"10": "3549",
						"9": "3548",
						"8": "3547",
						"7": "3546",
						"18": "3557",
						"19": "3558",
						"20": "3559"
					},
					"upgrade": ["334", "335", "336", "337", "338"]
				}
			},
			"specializationSpellEffect": {
				"103": {
					"id": "103",
					"specializationId": "25",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0884%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08280%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3291": {
					"id": "3291",
					"specializationId": "25",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0884%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08280%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3290": {
					"id": "3290",
					"specializationId": "25",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0884%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08280%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3289": {
					"id": "3289",
					"specializationId": "25",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff08114%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08382%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3288": {
					"id": "3288",
					"specializationId": "25",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff08111%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08372%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3287": {
					"id": "3287",
					"specializationId": "25",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff08108%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08362%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3286": {
					"id": "3286",
					"specializationId": "25",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff08105%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08352%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3285": {
					"id": "3285",
					"specializationId": "25",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff08102%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08341%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3284": {
					"id": "3284",
					"specializationId": "25",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0899%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08330%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3283": {
					"id": "3283",
					"specializationId": "25",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0896%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08320%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3282": {
					"id": "3282",
					"specializationId": "25",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0892%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08309%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3281": {
					"id": "3281",
					"specializationId": "25",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0891%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08305%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3280": {
					"id": "3280",
					"specializationId": "25",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "28",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0890%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08302%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3279": {
					"id": "3279",
					"specializationId": "25",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0889%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08298%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3278": {
					"id": "3278",
					"specializationId": "25",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0889%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08296%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3277": {
					"id": "3277",
					"specializationId": "25",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0887%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08291%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3276": {
					"id": "3276",
					"specializationId": "25",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0886%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08288%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3275": {
					"id": "3275",
					"specializationId": "25",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0885%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08284%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"201": {
					"id": "201",
					"specializationId": "27",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(193%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(133%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(372%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(372%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3294": {
					"id": "3294",
					"specializationId": "27",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(195%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(135%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(378%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(378%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3295": {
					"id": "3295",
					"specializationId": "27",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(199%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(137%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(382%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(382%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3296": {
					"id": "3296",
					"specializationId": "27",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(201%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(138%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(386%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(386%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3297": {
					"id": "3297",
					"specializationId": "27",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(204%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(141%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(394%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(394%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3298": {
					"id": "3298",
					"specializationId": "27",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(205%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(141%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(395%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(372%\u653b\u51fb\u529b+395%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3299": {
					"id": "3299",
					"specializationId": "27",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "28",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(208%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(143%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(401%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(401%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3300": {
					"id": "3300",
					"specializationId": "27",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08211%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(145%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(406%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08406%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3301": {
					"id": "3301",
					"specializationId": "27",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(211%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(145%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(406%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(406%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3302": {
					"id": "3302",
					"specializationId": "27",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(220%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(152%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(424%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(424%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3303": {
					"id": "3303",
					"specializationId": "27",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(228%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(157%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(439%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(439%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3304": {
					"id": "3304",
					"specializationId": "27",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(235%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(162%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(453%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(453%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3305": {
					"id": "3305",
					"specializationId": "27",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(243%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(167%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(467%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(467%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3306": {
					"id": "3306",
					"specializationId": "27",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(250%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(172%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(481%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(481\r\n%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3307": {
					"id": "3307",
					"specializationId": "27",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",

					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(257%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(177%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(495%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(495\r\n %\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3308": {
					"id": "3308",
					"specializationId": "27",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(261%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(184%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(509%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(509%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3309": {
					"id": "3309",
					"specializationId": "27",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(193%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(133%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(372%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(372%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3311": {
					"id": "3311",
					"specializationId": "27",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(193%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(133%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(372%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(372%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3310": {
					"id": "3310",
					"specializationId": "27",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(193%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(133%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(372%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(372%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"341": {
					"id": "341",
					"specializationId": "31",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "0",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0836%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08138%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08142%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3313": {
					"id": "3313",
					"specializationId": "31",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "10",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0836%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08139%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08143%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3314": {
					"id": "3314",
					"specializationId": "31",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0837%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0841%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08141%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0839%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0843%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08145%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3315": {
					"id": "3315",
					"specializationId": "31",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08142%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0844%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08146%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3316": {
					"id": "3316",
					"specializationId": "31",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08145%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0844%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08149%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3317": {
					"id": "3317",
					"specializationId": "31",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08146%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0844%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08150%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3318": {
					"id": "3318",
					"specializationId": "31",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0839%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0843%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08147%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0841%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0845%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08151%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3319": {
					"id": "3319",
					"specializationId": "31",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0839%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0843%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08150%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0841%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0845%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08154%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3320": {
					"id": "3320",
					"specializationId": "31",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0844%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08151%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0846%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08155%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3321": {
					"id": "3321",
					"specializationId": "31",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0846%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08156%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0844%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0848%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08160%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3322": {
					"id": "3322",
					"specializationId": "31",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0846%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08156%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0844%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0848%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08160%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3330": {
					"id": "3330",
					"specializationId": "31",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0836%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08138%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08142%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3329": {
					"id": "3329",
					"specializationId": "31",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0836%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08138%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08142%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3328": {
					"id": "3328",
					"specializationId": "31",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0836%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08138%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08142%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3327": {
					"id": "3327",
					"specializationId": "31",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0836%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08138%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08142%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3326": {
					"id": "3326",
					"specializationId": "31",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0848%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0852%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08180%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0850%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0854%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08184%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3325": {
					"id": "3325",
					"specializationId": "31",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0847%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0851%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08176%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0849%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0853%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08180%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3324": {
					"id": "3324",
					"specializationId": "31",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0846%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0850%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08172%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0848%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0852%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08176%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3323": {
					"id": "3323",
					"specializationId": "31",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0844%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0848%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08167%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0846%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0850%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08171%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"481": {
					"id": "481",
					"specializationId": "35",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "0",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08315%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(850%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3348": {
					"id": "3348",
					"specializationId": "35",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08315%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(850%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3347": {
					"id": "3347",
					"specializationId": "35",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08315%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(850%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3346": {
					"id": "3346",
					"specializationId": "35",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08315%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(850%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3345": {
					"id": "3345",
					"specializationId": "35",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08420%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(1134%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3344": {
					"id": "3344",
					"specializationId": "35",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08408%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(1101%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3343": {
					"id": "3343",
					"specializationId": "35",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08396%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(1068%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3342": {
					"id": "3342",
					"specializationId": "35",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08384%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(1036%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3341": {
					"id": "3341",
					"specializationId": "35",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08372%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(1004%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3340": {
					"id": "3340",
					"specializationId": "35",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08360%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(972%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3339": {
					"id": "3339",
					"specializationId": "35",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08348%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(939%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3338": {
					"id": "3338",
					"specializationId": "35",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08344%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(929%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3337": {
					"id": "3337",
					"specializationId": "35",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08340%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(918%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3336": {
					"id": "3336",
					"specializationId": "35",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08335%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(905%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3335": {
					"id": "3335",
					"specializationId": "35",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08333%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(901%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3334": {
					"id": "3334",
					"specializationId": "35",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08327%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(884%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3333": {
					"id": "3333",
					"specializationId": "35",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08324%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(876%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3332": {
					"id": "3332",
					"specializationId": "35",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "10",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08320%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(864%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"681": {
					"id": "681",
					"specializationId": "40",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(266%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3351": {
					"id": "3351",
					"specializationId": "40",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(269%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3352": {
					"id": "3352",
					"specializationId": "40",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(273%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3353": {
					"id": "3353",
					"specializationId": "40",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(275%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3354": {
					"id": "3354",
					"specializationId": "40",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(281%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3355": {
					"id": "3355",
					"specializationId": "40",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(282%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3366": {
					"id": "3366",
					"specializationId": "40",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(266%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3365": {
					"id": "3365",
					"specializationId": "40",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(266%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3364": {
					"id": "3364",
					"specializationId": "40",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(354%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3363": {
					"id": "3363",
					"specializationId": "40",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(342%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3362": {
					"id": "3362",
					"specializationId": "40",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(332%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3361": {
					"id": "3361",
					"specializationId": "40",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(322%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3360": {
					"id": "3360",
					"specializationId": "40",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(312%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3359": {
					"id": "3359",
					"specializationId": "40",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(302%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3358": {
					"id": "3358",
					"specializationId": "40",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(292%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3357": {
					"id": "3357",
					"specializationId": "40",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(289%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3356": {
					"id": "3356",
					"specializationId": "40",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(286%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"781": {
					"id": "781",
					"specializationId": "51",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210377%\u7684\u4f24\u5bb3\u3002"
				},
				"3370": {
					"id": "3370",
					"specializationId": "51",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210395%\u7684\u4f24\u5bb3\u3002"
				},
				"3371": {
					"id": "3371",
					"specializationId": "51",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210412%\u7684\u4f24\u5bb3\u3002"
				},
				"3383": {
					"id": "3383",
					"specializationId": "51",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "24\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210634%\u7684\u4f24\u5bb3\u3002"
				},
				"3382": {
					"id": "3382",
					"specializationId": "51",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "22\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210607%\u7684\u4f24\u5bb3\u3002"
				},
				"3381": {
					"id": "3381",
					"specializationId": "51",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "20\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210590%\u7684\u4f24\u5bb3\u3002"
				},
				"3380": {
					"id": "3380",
					"specializationId": "51",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "19\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210572%\u7684\u4f24\u5bb3\u3002"
				},
				"3379": {
					"id": "3379",
					"specializationId": "51",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "17\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210554%\u7684\u4f24\u5bb3\u3002"
				},
				"3378": {
					"id": "3378",
					"specializationId": "51",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210536%\u7684\u4f24\u5bb3\u3002"
				},
				"3377": {
					"id": "3377",
					"specializationId": "51",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "14\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210519%\u7684\u4f24\u5bb3\u3002"
				},
				"3376": {
					"id": "3376",
					"specializationId": "51",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "12\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210501%\u7684\u4f24\u5bb3\u3002"
				},
				"3375": {
					"id": "3375",
					"specializationId": "51",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "11\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210483%\u7684\u4f24\u5bb3\u3002"
				},
				"3374": {
					"id": "3374",
					"specializationId": "51",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210465%\u7684\u4f24\u5bb3\u3002"
				},
				"3373": {
					"id": "3373",
					"specializationId": "51",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210448%\u7684\u4f24\u5bb3\u3002"
				},
				"3372": {
					"id": "3372",
					"specializationId": "51",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210430%\u7684\u4f24\u5bb3\u3002"
				},
				"881": {
					"id": "881",
					"specializationId": "57",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08325%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3389": {
					"id": "3389",
					"specializationId": "57",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "5\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08340%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3390": {
					"id": "3390",
					"specializationId": "57",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "8\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08355%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3391": {
					"id": "3391",
					"specializationId": "57",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "10\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08370%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3392": {
					"id": "3392",
					"specializationId": "57",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "13\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "23",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08385%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3404": {
					"id": "3404",
					"specializationId": "57",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08325%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3403": {
					"id": "3403",
					"specializationId": "57",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08325%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3402": {
					"id": "3402",
					"specializationId": "57",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "41\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08534%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3401": {
					"id": "3401",
					"specializationId": "57",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "38\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08519%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3400": {
					"id": "3400",
					"specializationId": "57",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "35\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08504%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3399": {
					"id": "3399",
					"specializationId": "57",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "32\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08489%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3398": {
					"id": "3398",
					"specializationId": "57",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "29\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08474%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3397": {
					"id": "3397",
					"specializationId": "57",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "27\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08459%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3396": {
					"id": "3396",
					"specializationId": "57",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "24\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08444%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3395": {
					"id": "3395",
					"specializationId": "57",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "21\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08429%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3394": {
					"id": "3394",
					"specializationId": "57",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "19\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08414%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3393": {
					"id": "3393",
					"specializationId": "57",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "16\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08399%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"981": {
					"id": "981",
					"specializationId": "61",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534721\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347126\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"1062": {
					"id": "1062",
					"specializationId": "65",
					"step": "1",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "0",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210194%\u4f24\u5bb3\u3002"
				},
				"3427": {
					"id": "3427",
					"specializationId": "65",
					"step": "2",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "7\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210203%\u4f24\u5bb3\u3002"
				},
				"3428": {
					"id": "3428",
					"specializationId": "65",
					"step": "3",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "10\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210212%\u4f24\u5bb3\u3002"
				},
				"3429": {
					"id": "3429",
					"specializationId": "65",
					"step": "4",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "17\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210231%\u4f24\u5bb3\u3002"
				},
				"3441": {
					"id": "3441",
					"specializationId": "65",
					"step": "16",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "53\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210332%\u4f24\u5bb3\u3002"
				},
				"3440": {
					"id": "3440",
					"specializationId": "65",
					"step": "15",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "50\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210323%\u4f24\u5bb3\u3002"
				},
				"3439": {
					"id": "3439",
					"specializationId": "65",
					"step": "14",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "47\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210314%\u4f24\u5bb3\u3002"
				},
				"3438": {
					"id": "3438",
					"specializationId": "65",
					"step": "13",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "44\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210305%\u4f24\u5bb3\u3002"
				},
				"3437": {
					"id": "3437",
					"specializationId": "65",
					"step": "12",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "40\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210295%\u4f24\u5bb3\u3002"
				},
				"3436": {
					"id": "3436",
					"specializationId": "65",
					"step": "11",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "37\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210286%\u4f24\u5bb3\u3002"
				},
				"3435": {
					"id": "3435",
					"specializationId": "65",
					"step": "10",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "33\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210277%\u4f24\u5bb3\u3002"
				},
				"3434": {
					"id": "3434",
					"specializationId": "65",
					"step": "9",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "30\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210268%\u4f24\u5bb3\u3002"
				},
				"3433": {
					"id": "3433",
					"specializationId": "65",
					"step": "8",
					"castTime": "\u5f15\u5bfc",

					"castRange": "",
					"castCost": "26\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210258%\u4f24\u5bb3\u3002"
				},
				"3432": {
					"id": "3432",
					"specializationId": "65",
					"step": "7",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "22\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210249%\u4f24\u5bb3\u3002"
				},
				"3431": {
					"id": "3431",
					"specializationId": "65",
					"step": "6",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "19\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210240%\u4f24\u5bb3\u3002"
				},
				"3430": {
					"id": "3430",
					"specializationId": "65",
					"step": "5",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "17\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210231%\u4f24\u5bb3\u3002"
				},
				"1082": {
					"id": "1082",
					"specializationId": "68",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "0",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230294%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3446": {
					"id": "3446",
					"specializationId": "68",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "7\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230308%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3447": {
					"id": "3447",
					"specializationId": "68",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "10\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230322%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3448": {
					"id": "3448",
					"specializationId": "68",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "14\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230336%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3449": {
					"id": "3449",
					"specializationId": "68",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "17\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230350%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3450": {
					"id": "3450",
					"specializationId": "68",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "21\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230364%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3461": {
					"id": "3461",
					"specializationId": "68",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230294%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3460": {
					"id": "3460",
					"specializationId": "68",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "57\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230504%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3459": {
					"id": "3459",
					"specializationId": "68",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "53\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230490%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3458": {
					"id": "3458",
					"specializationId": "68",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "49\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230476%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3457": {
					"id": "3457",
					"specializationId": "68",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "45\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230462%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3456": {
					"id": "3456",
					"specializationId": "68",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "42\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230448%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3455": {
					"id": "3455",
					"specializationId": "68",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "38\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230434%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3454": {
					"id": "3454",
					"specializationId": "68",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "35\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230420%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3453": {
					"id": "3453",
					"specializationId": "68",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "31\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230406%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3452": {
					"id": "3452",
					"specializationId": "68",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "28\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230392%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3451": {
					"id": "3451",
					"specializationId": "68",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "24\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230378%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"1122": {
					"id": "1122",
					"specializationId": "71",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08559%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08642%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08245%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08249%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08600%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3465": {
					"id": "3465",
					"specializationId": "71",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "6\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08585%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08672%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08257%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08261%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08628%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3466": {
					"id": "3466",
					"specializationId": "71",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "9\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08610%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08702%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08268%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08272%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08656%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3467": {
					"id": "3467",
					"specializationId": "71",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "12\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08559%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08642%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08245%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08249%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08600%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3468": {
					"id": "3468",
					"specializationId": "71",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "16\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08663%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08762%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08292%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08296%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08712%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3469": {
					"id": "3469",
					"specializationId": "71",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "19\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08688%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08792%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08304%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08308%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08740%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3470": {
					"id": "3470",
					"specializationId": "71",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "22\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08715%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08822%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08314%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08318%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08768%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3471": {
					"id": "3471",
					"specializationId": "71",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08741%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08852%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08326%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08330%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08796%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3472": {
					"id": "3472",
					"specializationId": "71",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "28\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08766%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08880%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08338%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08342%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08823%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3473": {
					"id": "3473",
					"specializationId": "71",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "31\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08793%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08910%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08349%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08353%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08852%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3474": {
					"id": "3474",
					"specializationId": "71",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "34\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08819%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08940%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08361%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08365%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08879%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3475": {
					"id": "3475",
					"specializationId": "71",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "37\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08844%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08970%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08373%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08377%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08907%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3482": {
					"id": "3482",
					"specializationId": "71",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08559%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08642%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08245%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08249%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08600%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3481": {
					"id": "3481",
					"specializationId": "71",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08559%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08642%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08245%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08249%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08600%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3480": {
					"id": "3480",
					"specializationId": "71",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08559%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08642%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08245%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08249%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08600%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3479": {
					"id": "3479",
					"specializationId": "71",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08559%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08642%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08245%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08249%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08600%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3478": {
					"id": "3478",
					"specializationId": "71",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "46\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08923%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff081060%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08407%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08411%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08990%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3477": {
					"id": "3477",
					"specializationId": "71",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "43\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08897%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff081030%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08395%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08399%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08963%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3476": {
					"id": "3476",
					"specializationId": "71",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08871%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff081000%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08383%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08387%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08936%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"1162": {
					"id": "1162",
					"specializationId": "75",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08601%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081354%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3484": {
					"id": "3484",
					"specializationId": "75",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "7\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08630%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081417%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3485": {
					"id": "3485",
					"specializationId": "75",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "10\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08658%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081480%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3486": {
					"id": "3486",
					"specializationId": "75",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "14\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08685%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081543%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3487": {
					"id": "3487",
					"specializationId": "75",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "19\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08714%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081606%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3488": {
					"id": "3488",
					"specializationId": "75",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "23\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08742%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081669%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3489": {
					"id": "3489",
					"specializationId": "75",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "27\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08769%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081732%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3490": {
					"id": "3490",
					"specializationId": "75",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "30\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08798%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081795%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3491": {
					"id": "3491",
					"specializationId": "75",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "34\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08826%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081858%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3492": {
					"id": "3492",
					"specializationId": "75",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "37\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08853%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081921%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3493": {
					"id": "3493",
					"specializationId": "75",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "41\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08882%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081984%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3501": {
					"id": "3501",
					"specializationId": "75",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08601%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081354%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3500": {
					"id": "3500",
					"specializationId": "75",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08601%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081354%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3499": {
					"id": "3499",
					"specializationId": "75",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08601%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081354%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3498": {
					"id": "3498",
					"specializationId": "75",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08601%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081354%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3497": {
					"id": "3497",
					"specializationId": "75",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "56\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08995%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff082236%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3496": {
					"id": "3496",
					"specializationId": "75",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "52\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08966%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff082173%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3495": {
					"id": "3495",
					"specializationId": "75",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "48\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08937%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff082110%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3494": {
					"id": "3494",
					"specializationId": "75",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "45\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08910%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff082047%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"1202": {
					"id": "1202",
					"specializationId": "78",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210178%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2144.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3560": {
					"id": "3560",
					"specializationId": "78",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "7\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210187%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2146.75%\u7684\u4f24\u5bb3\u3002"
				},
				"3561": {
					"id": "3561",
					"specializationId": "78",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "11\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210195%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2148.75%\u7684\u4f24\u5bb3\u3002"
				},
				"3562": {
					"id": "3562",
					"specializationId": "78",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "15\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210204%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2151%\u7684\u4f24\u5bb3\u3002"
				},
				"3563": {
					"id": "3563",
					"specializationId": "78",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "20\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210212%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2153%\u7684\u4f24\u5bb3\u3002"
				},
				"3564": {
					"id": "3564",
					"specializationId": "78",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "24\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210220%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2155%\u7684\u4f24\u5bb3\u3002"
				},
				"3575": {
					"id": "3575",
					"specializationId": "78",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210178%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2144.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3574": {
					"id": "3574",
					"specializationId": "78",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210178%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2144.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3573": {
					"id": "3573",
					"specializationId": "78",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "60\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210295%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2173.75%\u7684\u4f24\u5bb3\u3002"
				},
				"3572": {
					"id": "3572",
					"specializationId": "78",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "56\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210287%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2171.75%\u7684\u4f24\u5bb3\u3002"
				},
				"3571": {
					"id": "3571",
					"specializationId": "78",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "52\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210279%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2169.75%\u7684\u4f24\u5bb3\u3002"
				},
				"3570": {
					"id": "3570",
					"specializationId": "78",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "48\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210271%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2167.75%\u7684\u4f24\u5bb3\u3002"
				},
				"3569": {
					"id": "3569",
					"specializationId": "78",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "44\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210262%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2165.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3568": {
					"id": "3568",
					"specializationId": "78",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "40\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210254%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2163.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3567": {
					"id": "3567",
					"specializationId": "78",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "36\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210246%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2161.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3566": {
					"id": "3566",
					"specializationId": "78",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "32\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210237%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2159.25%\u7684\u4f24\u5bb3\u3002"
				},
				"3565": {
					"id": "3565",
					"specializationId": "78",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "28\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210229%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2157.25%\u7684\u4f24\u5bb3\u3002"
				},
				"3516": {
					"id": "3516",
					"specializationId": "81",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "54\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210144%\u7684\u4f24\u5bb3\u3002"
				},
				"3515": {
					"id": "3515",
					"specializationId": "81",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "51\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210141%\u7684\u4f24\u5bb3\u3002"
				},
				"3514": {
					"id": "3514",
					"specializationId": "81",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "48\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210138%\u7684\u4f24\u5bb3\u3002"
				},
				"3513": {
					"id": "3513",
					"specializationId": "81",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "44\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210132%\u7684\u4f24\u5bb3\u3002"
				},
				"3512": {
					"id": "3512",
					"specializationId": "81",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210127%\u7684\u4f24\u5bb3\u3002"
				},
				"3511": {
					"id": "3511",
					"specializationId": "81",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "37\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210123%\u7684\u4f24\u5bb3\u3002"
				},
				"3510": {
					"id": "3510",
					"specializationId": "81",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "33\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210118%\u7684\u4f24\u5bb3\u3002"
				},
				"3509": {
					"id": "3509",
					"specializationId": "81",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210115%\u7684\u4f24\u5bb3\u3002"
				},
				"3508": {
					"id": "3508",
					"specializationId": "81",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "26\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210114%\u7684\u4f24\u5bb3\u3002"
				},
				"3507": {
					"id": "3507",
					"specializationId": "81",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "22\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210108%\u7684\u4f24\u5bb3\u3002"
				},
				"3506": {
					"id": "3506",
					"specializationId": "81",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "19\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210105%\u7684\u4f24\u5bb3\u3002"
				},
				"3505": {
					"id": "3505",
					"specializationId": "81",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "14\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u6210100%\u7684\u4f24\u5bb3\u3002"
				},
				"3504": {
					"id": "3504",
					"specializationId": "81",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "10\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621094%\u7684\u4f24\u5bb3\u3002"
				},
				"1262": {
					"id": "1262",
					"specializationId": "81",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621088%\u7684\u4f24\u5bb3\u3002"
				},
				"3503": {
					"id": "3503",
					"specializationId": "81",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621093%\u7684\u4f24\u5bb3\u3002"
				},
				"1302": {
					"id": "1302",
					"specializationId": "83",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "0",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1178%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3522": {
					"id": "3522",
					"specializationId": "83",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "7\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1232%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3523": {
					"id": "3523",
					"specializationId": "83",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "10\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1286%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3524": {
					"id": "3524",
					"specializationId": "83",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "14\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1340%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3525": {
					"id": "3525",
					"specializationId": "83",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "20\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1394%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3526": {
					"id": "3526",
					"specializationId": "83",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "23\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1448%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3537": {
					"id": "3537",
					"specializationId": "83",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1178%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3536": {
					"id": "3536",
					"specializationId": "83",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1178%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3535": {
					"id": "3535",
					"specializationId": "83",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "56\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1934%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3534": {
					"id": "3534",
					"specializationId": "83",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "52\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1880%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3533": {
					"id": "3533",
					"specializationId": "83",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "48\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1826%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3532": {
					"id": "3532",
					"specializationId": "83",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "44\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1772%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3531": {
					"id": "3531",
					"specializationId": "83",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "41\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1718%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3530": {
					"id": "3530",
					"specializationId": "83",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "37\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1664%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3529": {
					"id": "3529",
					"specializationId": "83",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "34\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1610%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3528": {
					"id": "3528",
					"specializationId": "83",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "30\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1556%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3527": {
					"id": "3527",
					"specializationId": "83",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "27\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1502%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"1322": {
					"id": "1322",
					"specializationId": "87",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "0",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08870%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083044%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3541": {
					"id": "3541",
					"specializationId": "87",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "7\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08882%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083088%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3542": {
					"id": "3542",
					"specializationId": "87",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "11\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08893%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083126%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3543": {
					"id": "3543",
					"specializationId": "87",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "14\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08900%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083152%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3544": {
					"id": "3544",
					"specializationId": "87",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "21\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08916%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083207%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3545": {
					"id": "3545",
					"specializationId": "87",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "24\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08920%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083221%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3556": {
					"id": "3556",
					"specializationId": "87",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08870%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083044%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3555": {
					"id": "3555",
					"specializationId": "87",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08870%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083044%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3554": {
					"id": "3554",
					"specializationId": "87",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "58\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff081160%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff084003%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3553": {
					"id": "3553",
					"specializationId": "87",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "54\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff081120%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083891%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3552": {
					"id": "3552",
					"specializationId": "87",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "50\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff081080%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083779%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3551": {
					"id": "3551",
					"specializationId": "87",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "46\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff081048%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083667%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3550": {
					"id": "3550",
					"specializationId": "87",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "43\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff081016%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083555%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3549": {
					"id": "3549",
					"specializationId": "87",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "39\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08984%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083443%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3548": {
					"id": "3548",
					"specializationId": "87",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "35\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08952%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083331%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3547": {
					"id": "3547",
					"specializationId": "87",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "32\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08943%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083299%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3546": {
					"id": "3546",
					"specializationId": "87",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "28\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08932%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083262%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3292": {
					"id": "3292",
					"specializationId": "25",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0884%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08280%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3293": {
					"id": "3293",
					"specializationId": "25",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "1\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u67aa\u82b1\u95ea\u8000\uff0c\u67aa\u67aa\u593a\u547d,\u5bf9\u9f20\u6807\u65b9\u5411\u6247\u5f62\u533a\u57df\u9020\u621015\u6b21\uff0884%\u653b\u51fb\u529b+44%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u53d1\u51fa\u84c4\u529b\u4e00\u51fb\uff0c\u5bf9\u524d\u9762\u6247\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210\uff08280%\u653b\u51fb\u529b+148%\u7b4b\u9aa8\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u654c\u4eba\u3002"
				},
				"3312": {
					"id": "3312",
					"specializationId": "27",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u56db\u6bb5\u3002\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u9f20\u6807\u9009\u62e9\u65b9\u5411\u5219\u795e\u5c06\u5411\u5f53\u524d\u53d1\u8d77\u6a2a\u626b\uff0c\u653b\u51fb\u524d\u9762\u524d\u65b94\u7c73\u6247\u5f62150\u5ea6\u533a\u57df\u7684\u654c\u4eba\uff0c\u9020\u6210(193%\u653b\u51fb\u529b+102%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u795e\u5c06\u626b\u51fb\u81ea\u8eab\u8303\u56f4\u51854\u7c73\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(133%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e09\u6bb5\uff0c\u7ee7\u7eed\u626b\u51fb\u5468\u56f44\u7c73\u5185\u7684\u654c\u4eba\uff0c\u9020\u62102\u6b21(372%\u653b\u51fb\u529b+84%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3,\u91ca\u653e\u6309\u952e\u540e\u6216\u6a2a\u626b2\u6b21\u4ee5\u540e\uff0c\u9a6c\u4e0a\u91ca\u653e\u7b2c\u56db\u6bb5\uff0c\u4f7f\u7528\u795e\u67aa\u91cd\u7838\u5f53\u524d\u65b9\u5411\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210(372%\u653b\u51fb\u529b+197%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u5347\u7ea7\u88ab\u52a8\u6280\u80fd\u53ef\u589e\u52a0\u7b2c\u4e09\u6bb5\u6a2a\u626b\u3002"
				},
				"3331": {
					"id": "3331",
					"specializationId": "31",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u94f6\u67aa\u6a2a\u626b\uff0c\u5f53\u8005\u62ab\u9761\uff0c\u5171\u5206\u4e24\u6bb5\u3002\u7b2c\u4e00\u6bb5\uff0c\u8fde\u7eed\u795e\u5c06\u626b\u67aa\u4e09\u5708\uff0c\u5206\u522b\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0836%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0840%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08138%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7b2c\u4e8c\u6bb5\uff0c\u626b\u67aa\u4e09\u5708\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210\uff0838%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff0842%\u653b\u51fb\u529b+19%\u7b4b\u9aa8\u503c\uff09\u3001\uff08142%\u653b\u51fb\u529b+70%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u5e76\u51fb\u9000\u9762\u524d\u7684\u654c\u4eba\u3002"
				},
				"3349": {
					"id": "3349",
					"specializationId": "35",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08315%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(850%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3350": {
					"id": "3350",
					"specializationId": "35",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "18\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u9009\u62e9\u4e00\u4e2a\u91ca\u653e\u7684\u65b9\u5411\u540e\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\uff0c\u795e\u5c06\u98de\u901f\u51b2\u5411\u6240\u9009\u62e9\u7684\u65b9\u5411\uff0c\u653b\u51fb\u843d\u5730\u70b9\u4e3a\u4e2d\u5fc3\u76843\u7c73\u5185\u5706\u5f62\u533a\u57df\u7684\u654c\u4eba\uff0c\u5e76\u9020\u6210\uff08315%\u653b\u51fb\u529b+444%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\uff0c\u84c4\u529b\u6ee1\u65f6\u53ef\u8fbe\u5230(850%\u653b\u51fb\u529b+1555%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u7834\u706d\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3367": {
					"id": "3367",
					"specializationId": "40",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(266%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3368": {
					"id": "3368",
					"specializationId": "40",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(266%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3369": {
					"id": "3369",
					"specializationId": "40",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "4\u7075\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u67aa\u67aa\u4e0d\u79bb\u8981\u5bb3\uff0c\u653b\u52bf\u5982\u6f6e\uff0c\u51b2\u523a\u524d\u65b98\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u88ab\u653b\u51fb\u5230\u7684\u654c\u4eba\u5c06\u88ab\u51fb\u9000\u5e76\u9644\u7740\u5728\u795e\u67aa\u524d\uff0c\u5e76\u9020\u6210(266%\u653b\u51fb\u529b+138%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3384": {
					"id": "3384",
					"specializationId": "51",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210395%\u7684\u4f24\u5bb3\u3002"
				},
				"3385": {
					"id": "3385",
					"specializationId": "51",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210395%\u7684\u4f24\u5bb3\u3002"
				},
				"3386": {
					"id": "3386",
					"specializationId": "51",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210395%\u7684\u4f24\u5bb3\u3002"
				},
				"3387": {
					"id": "3387",
					"specializationId": "51",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210395%\u7684\u4f24\u5bb3\u3002"
				},
				"3388": {
					"id": "3388",
					"specializationId": "51",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "1\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u501f\u52a9\u67aa\u529b,\u98de\u817f\u5411\u524d\u51b2\u523a,\u653b\u51fb\u9047\u5230\u7684\u654c\u4eba,\u5e76\u9020\u6210395%\u7684\u4f24\u5bb3\u3002"
				},
				"3405": {
					"id": "3405",
					"specializationId": "57",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08325%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3406": {
					"id": "3406",
					"specializationId": "57",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08325%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3407": {
					"id": "3407",
					"specializationId": "57",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "2\u7075\u6c14",
					"cooldown": "18.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u8df3\u8d77\uff0c\u5e76\u5c06\u624b\u4e2d\u795e\u67aa\u6295\u51fa\uff0c\u795e\u67aa\u5316\u4e3a\u95ea\u7535\u653b\u51fb\u6240\u9009\u62e9\u5706\u5f624\u7c73\u533a\u57df\u5185\u7684\u654c\u4eba\uff0c\u9020\u6210\uff08325%\u653b\u51fb\u529b+164%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u3002"
				},
				"3408": {
					"id": "3408",
					"specializationId": "61",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "6\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534729\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347194\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3409": {
					"id": "3409",
					"specializationId": "61",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "9\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534738\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347272\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3410": {
					"id": "3410",
					"specializationId": "61",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "12\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534746\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347360\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3411": {
					"id": "3411",
					"specializationId": "61",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "18\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534755\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347462\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3412": {
					"id": "3412",
					"specializationId": "61",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "21\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534765\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347574\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3413": {
					"id": "3413",
					"specializationId": "61",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "24\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534775\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347700\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3414": {
					"id": "3414",
					"specializationId": "61",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "28\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534786\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347838\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3415": {
					"id": "3415",
					"specializationId": "61",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "31\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534797\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347990\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3416": {
					"id": "3416",
					"specializationId": "61",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "34\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u5347108\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u53471154\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3417": {
					"id": "3417",
					"specializationId": "61",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "37\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u5347121\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u53471334\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3418": {
					"id": "3418",
					"specializationId": "61",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u5347133\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u53471526\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3419": {
					"id": "3419",
					"specializationId": "61",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "44\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u5347147\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u53471736\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3420": {
					"id": "3420",
					"specializationId": "61",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "48\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u5347161\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u53471846\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3421": {
					"id": "3421",
					"specializationId": "61",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "52\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u5347175\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u53471956\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3422": {
					"id": "3422",
					"specializationId": "61",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534721\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347126\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3423": {
					"id": "3423",
					"specializationId": "61",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534721\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347126\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3424": {
					"id": "3424",
					"specializationId": "61",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534721\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347126\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3425": {
					"id": "3425",
					"specializationId": "61",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534721\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347126\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3426": {
					"id": "3426",
					"specializationId": "61",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "50.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u5c06\u529b\u91cf\u704c\u6ce8\u4e8e\u6b66\u5668\u4e4b\u4e0a\uff0c\u653b\u51fb\u529b\u63d0\u534721\u70b9\uff0c\u9632\u5fa1\u529b\u63d0\u5347126\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u964d\u4f4e10%"
				},
				"3442": {
					"id": "3442",
					"specializationId": "65",
					"step": "17",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210194%\u4f24\u5bb3\u3002"
				},
				"3443": {
					"id": "3443",
					"specializationId": "65",
					"step": "18",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210194%\u4f24\u5bb3\u3002"
				},
				"3444": {
					"id": "3444",
					"specializationId": "65",
					"step": "19",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210194%\u4f24\u5bb3\u3002"
				},
				"3445": {
					"id": "3445",
					"specializationId": "65",
					"step": "20",
					"castTime": "\u5f15\u5bfc",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "23.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u8fde\u7eed\u4e94\u9053\u6247\u5f62\u7684\u653b\u51fb\u6ce2,\u6bcf\u4e2a\u653b\u51fb\u6ce2\u90fd\u5bf9\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210194%\u4f24\u5bb3\u3002"
				},
				"3462": {
					"id": "3462",
					"specializationId": "68",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230294%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3463": {
					"id": "3463",
					"specializationId": "68",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230294%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3464": {
					"id": "3464",
					"specializationId": "68",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u4f7f\u7528\u5929\u773c\u53d1\u51fa\u4e00\u9053\u72ed\u5c0f\u5bc6\u96c6\u7684\u5149\u675f,\u653b\u51fb\u9762\u524d30\u00b0\u6247\u5f62\u8303\u56f48\u7c73\u5185\u7684\u654c\u4eba\uff0c\u5149\u675f\u7167\u5c04\u5230\u7684\u654c\u4eba\u5c06\u53d7\u5230294%\u7684\u4f24\u5bb3\u3002\u5929\u773c\u7f1a\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3483": {
					"id": "3483",
					"specializationId": "71",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u6309\u952e3\u6b21\u91ca\u653e\uff0c\u7b2c\u4e00\u6bb5\u5bf9\u9762\u524d3\u7c73\u6247\u5f62\u533a\u57df\u5185\u7684\u654c\u4eba\u9020\u6210\uff08559%\u653b\u51fb\u529b+286%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e8c\u6bb5\u52a0\u5f3a\u626b\u51fb\u529b\u5ea6\u5bf94\u7c73\u6247\u5f62\u533a\u57df\u5185\u9020\u6210\uff08642%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u7b2c\u4e09\u4e0b\u5171\u5206\u4e09\u6bb5\uff0c\u524d\u4e24\u6bb5\u9020\u6210\u4e24\u6b21\uff08245%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u548c\uff08249%\u653b\u51fb\u529b+126%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u6700\u540e\u51fa\u73b0\u865a\u5f71\u795e\u5c06\u8f85\u52a9\u8fdb\u884c\u653b\u51fb\uff0c\u9020\u6210\uff08600%\u653b\u51fb\u529b+329%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\u5e76\u9020\u6210\u51fb\u9000\u6548\u679c"
				},
				"3502": {
					"id": "3502",
					"specializationId": "75",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u63d2\u67aa\u5165\u5730\uff0c\u6309\u4f4f\u6280\u80fd\u5feb\u6377\u952e\u540e\u4e0d\u65ad\u84c4\u529b\uff0c\u84c4\u529b\u671f\u95f4\u53ef\u9009\u653b\u51fb\u8303\u56f4\u9010\u6e10\u589e\u5927\u52306\u7c73\u3002\u5728\u84c4\u529b\u671f\u95f4\u53ef\u901a\u8fc7\u9f20\u6807\u9009\u62e9\u8303\u56f4\u5185\u7684\u4e00\u4e2a\u653b\u51fb\u533a\u57df\u9020\u6210\uff08601%\u653b\u51fb\u529b+308%\u7b4b\u9aa8\u503c\uff09\uff0c\u82e5\u84c4\u529b\u5b8c\u6210\u540e\u4ecd\u672a\u9009\u62e9\u7684\u8bdd\uff0c\u5219\u653b\u51fb\u539f\u5730\uff0c\u9020\u6210\u534a\u5f843\u7c73\u7684\u8303\u56f4\u4f24\u5bb3\uff0c\u6839\u636e\u84c4\u529b\u7684\u957f\u77ed\uff0c\u6700\u9ad8\u4f24\u5bb3\u53ef\u8fbe\u5230\uff081354%\u653b\u51fb\u529b+694%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u84c4\u529b\u6ee1\u65f6\uff0c\u8303\u56f4\u589e\u52a0\u52305\u7c73\u3002\u4e71\u661f\u795e\u67aa\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"3517": {
					"id": "3517",
					"specializationId": "81",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621088%\u7684\u4f24\u5bb3\u3002"
				},
				"3518": {
					"id": "3518",
					"specializationId": "81",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621088%\u7684\u4f24\u5bb3\u3002"
				},
				"3519": {
					"id": "3519",
					"specializationId": "81",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621088%\u7684\u4f24\u5bb3\u3002"
				},
				"3520": {
					"id": "3520",
					"specializationId": "81",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621088%\u7684\u4f24\u5bb3\u3002"
				},
				"3521": {
					"id": "3521",
					"specializationId": "81",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "3\u7075\u6c14",
					"cooldown": "28.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u54ee\u5929\u72ac\u4ee5\u81ea\u6211\u4e3a\u4e2d\u5fc3\uff0c\u53d1\u51fa5\u6b21\u9e23\u53eb\uff0c\u6bcf\u6b21\u90fd\u4f7f\u5468\u56f4\u8303\u56f46\u7c73\u5185\u7684\u654c\u4eba\u9020\u621088%\u7684\u4f24\u5bb3\u3002"
				},
				"3538": {
					"id": "3538",
					"specializationId": "83",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1178%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3539": {
					"id": "3539",
					"specializationId": "83",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1178%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3540": {
					"id": "3540",
					"specializationId": "83",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "10\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u795e\u5c06\u9009\u62e9\u4e00\u4e2a\u65b9\u5411\u51b2\u950b\uff0c\u51b2\u523a\u540e\u795e\u5c06\u6d88\u5931\uff0c\u5728\u8def\u5f84\u4e2d\u7684\u6bcf\u4e2a\u654c\u4eba\u90fd\u4f1a\u53d7\u5230\u865a\u5f71\u5929\u795e\u653b\u51fb\uff0c\u9020\u6210(1178%\u653b\u51fb\u529b+595%\u7b4b\u9aa8\u503c\uff09\u7684\u7535\u5c5e\u6027\u4f24\u5bb3\uff0c\u653b\u51fb\u7ed3\u675f\u540e\uff0c\u795e\u5c06\u51fa\u73b0\u5728\u51b2\u950b\u540e\u5230\u8fbe\u7684\u5730\u70b9\uff0c\u5728\u6b64\u671f\u95f4\u795e\u5c06\u5904\u4e8e\u65e0\u654c\u72b6\u6001\u3002"
				},
				"3557": {
					"id": "3557",
					"specializationId": "87",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08870%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083044%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3558": {
					"id": "3558",
					"specializationId": "87",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08870%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083044%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3559": {
					"id": "3559",
					"specializationId": "87",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "6\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5,\u795e\u5c06\u5c06\u67aa\u538b\u5728\u5730\u4e0a,\u4ece\u53f3\u5230\u5de6\u753b\u5f27,\u5f53\u6309\u952e\u677e\u5f00\u540e\u91ca\u653e\u7b2c\u4e8c\u6bb5\u3002\u7b2c\u4e8c\u6bb5,\u795e\u5c06\u8df3\u8d77\u91cd\u5288\u6240\u5212\u5230\u7684\u4f4d\u7f6e\uff0c\u5bf9\u5f53\u524d\u77e9\u5f62\u533a\u57df\u51853\u7c73\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210\uff08870%\u653b\u51fb\u529b+160%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002\u82e5\u84c4\u529b\u6ee1\uff0c\u5219\u9020\u6210\uff083044%\u653b\u51fb\u529b+434%\u7b4b\u9aa8\u503c\uff09\u7684\u4f24\u5bb3\u3002"
				},
				"3576": {
					"id": "3576",
					"specializationId": "78",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210178%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2144.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3577": {
					"id": "3577",
					"specializationId": "78",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210178%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2144.5%\u7684\u4f24\u5bb3\u3002"
				},
				"3578": {
					"id": "3578",
					"specializationId": "78",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "3\u7075\u6c14",
					"cooldown": "32.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6e90\u81ea\u4e0a\u53e4\u5f02\u517d\uff0c\u5fe0\u8d1e\u4e0d\u4e8c\uff0c\u54ee\u5929\u72ac\u5e7b\u5316\u4e3a\u8fdc\u53e4\u5de8\u517d\uff0c\u6251\u5411\u524d\u9762\u5706\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210178%\u7684\u4f24\u5bb3\u5e76\u4f7f\u5176\u6d6e\u7a7a\uff0c\u968f\u540e\u53d1\u8d7712\u6b21\u5e7b\u5f71\u653b\u51fb\uff0c\u9020\u6210\u6bcf\u6b2144.5%\u7684\u4f24\u5bb3\u3002"
				}
			},
			"specializationSpellUpgrade": {
				"15": {
					"id": "15",
					"specializationId": "25",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u5f00\u542f\u94f6\u94a9\u94c1\u753b\u7b2c\u4e8c\u6bb5",
					"effect": {
						"1": "74"
					}
				},
				"16": {
					"id": "16",
					"specializationId": "25",
					"name": "\u8fde\u51fb",
					"description": "\u6bcf\u6b21\u94f6\u94a9\u94c1\u753b\u66b4\u51fb\uff0c\u589e\u52a0\u81ea\u8eab\u653b\u51fb\u901f\u5ea630\u70b9\uff0c\u79fb\u52a8\u901f\u5ea63%\uff0c\u6301\u7eed10\u79d2\uff0c\u8fd9\u4e2a\u6548\u679c\u6700\u591a\u5806\u53e04\u5c42\u3002",
					"effect": {
						"1": "98"
					}
				},
				"17": {
					"id": "17",
					"specializationId": "25",
					"name": "\u6210\u6548 \t",
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u94f6\u94a9\u94c1\u753b\u589e\u52a0\u653b\u51fb\u6b21\u65705\u6b21\u3002",
					"effect": {
						"1": "107"
					}
				},
				"19": {
					"id": "19",
					"specializationId": "25",
					"name": "\u5343\u75ae\u767e\u5b54",
					"description": "\u94f6\u94a9\u94c1\u753b\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a05\u5c42\u3002",
					"effect": {
						"1": "115",
						"2": "2136",
						"3": "2137",
						"4": "2138",
						"5": "2139",
						"6": "2140",
						"7": "2141"
					}
				},
				"22": {
					"id": "22",
					"specializationId": "25",
					"name": "\u4f24\u5bb3\u63d0\u5347",
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65705\u4e2a\u3002",
					"effect": {
						"1": "123",
						"2": "2142",
						"3": "2143",
						"4": "2144",
						"5": "2145",
						"6": "2146",
						"7": "2147"
					}
				},
				"27": {
					"id": "27",
					"specializationId": "27",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u5f00\u542f\u6a2a\u626b\u516b\u65b9\u7b2c\u4e00\u6bb5\u7684\u7b2c\u4e09\u62db",
					"effect": {
						"1": "140"
					}
				},
				"28": {
					"id": "28",
					"specializationId": "27",
					"name": "\u4f24\u5bb3\u63d0\u5347 \t",
					"description": "\u91ca\u653e\u6a2a\u626b\u516b\u65b9\u7b2c\u4e09\u62db\u540e\uff0c\u7b2c\u4e8c\u6bb5\u4f24\u5bb3\u63d0\u534720%",
					"effect": {
						"1": "150"
					}
				},
				"29": {
					"id": "29",
					"specializationId": "27",
					"name": "\u7729\u6655",
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u6a2a\u626b\u516b\u65b9\u7b2c\u4e8c\u6bb5\u9020\u6210\u7729\u6655\uff0c\u6301\u7eed2.5\u79d2\u3002",
					"effect": {
						"1": "152"
					}
				},
				"30": {
					"id": "30",
					"specializationId": "27",
					"name": "\u7729\u6655\u52a0\u6210",
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a090%",
					"effect": {
						"1": "202",
						"2": "2148",
						"3": "2149",
						"4": "2150",
						"5": "2151",
						"6": "2152",
						"7": "2153"
					}
				},
				"32": {
					"id": "32",
					"specializationId": "27",
					"name": "\u4f24\u5bb3\u63d0\u5347 \t",
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b945%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "163",
						"2": "2154",
						"3": "2155",
						"4": "2156",
						"5": "2157",
						"6": "2158",
						"7": "2159"
					}
				},
				"39": {
					"id": "39",
					"specializationId": "31",
					"name": "\u66b4\u623e",
					"description": "\u866c\u9f99\u66b4\u6bcf\u6b21\u66b4\u51fb\u65f6\uff0c\u589e\u52a0\u81ea\u8eab3%\u4f24\u5bb3\uff0c\u51cf\u5c111%\u547d\u4e2d\u503c\uff0c\u72b6\u6001\u53ef\u53e0\u52a010\u5c42\uff0c\u6301\u7eed10\u79d2\u3002",
					"effect": {
						"1": "248"
					}
				},
				"40": {
					"id": "40",
					"specializationId": "31",
					"name": "\u65ad\u7b4b \t",
					"description": "\u866c\u9f99\u66b4\u7b2c\u4e8c\u6bb5\u9020\u6210\u76ee\u6807\u65ad\u7b4b\uff0c\u51cf\u901f20%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "257"
					}
				},
				"41": {
					"id": "41",
					"specializationId": "31",
					"name": "\u65ad\u7b4b\u589e\u4f24",
					"description": "\u866c\u9f99\u66b4\u5bf9\u65ad\u7b4b\u7684\u76ee\u6807\u589e\u52a040%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "279"
					}
				},
				"42": {
					"id": "42",
					"specializationId": "31",
					"name": "\u51b7\u5374\u51cf\u5c11",
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f5.8\u79d2",
					"effect": {
						"1": "294",
						"2": "296",
						"3": "297",
						"4": "298",
						"5": "299",
						"6": "300",
						"7": "301"
					}
				},
				"44": {
					"id": "44",
					"specializationId": "31",
					"name": "\u4f24\u5bb3\u63d0\u5347",
					"description": "\u589e\u52a0\u866c\u9f99\u66b445%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "302",
						"2": "305",
						"3": "306",
						"4": "307",
						"5": "308",
						"6": "309",
						"7": "310"
					}
				},
				"48": {
					"id": "48",
					"specializationId": "35",
					"name": "\u65ad\u7b4b",
					"description": "\u7834\u706d\u795e\u67aa\u9020\u6210\u65ad\u7b4b\u6548\u679c\uff0c\u51cf\u901f30%\uff0c\u6301\u7eed5\u79d2",
					"effect": {
						"1": "342"
					}
				},
				"49": {
					"id": "49",
					"specializationId": "35",
					"name": "\u51b7\u5374\u51cf\u5c11",
					"description": "\u7834\u706d\u795e\u67aa\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f4.8\u79d2",
					"effect": {
						"1": "351"
					}
				},
				"50": {
					"id": "50",
					"specializationId": "35",
					"name": "\u4f1a\u5fc3",
					"description": "\u7834\u706d\u795e\u67aa\u7684\u4f1a\u5fc3\u503c\u63d0\u9ad810%\uff0c\u4f1a\u5fc3\u4f24\u5bb3\u63d0\u9ad835%\u3002",
					"effect": {
						"1": "360"
					}
				},
				"51": {
					"id": "51",
					"specializationId": "35",
					"name": "\u4f24\u5bb3\u63d0\u5347",
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "370",
						"2": "371",
						"3": "372",
						"4": "373",
						"5": "374",
						"6": "375",
						"7": "376"
					}
				},
				"53": {
					"id": "53",
					"specializationId": "35",
					"name": "\u653b\u901f\u63d0\u5347 \t",
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u534745\u70b9\uff0c\u6301\u7eed10\u79d2\u3002",
					"effect": {
						"1": "386",
						"2": "387",
						"3": "388",
						"4": "389",
						"5": "390",
						"6": "391",
						"7": "392"
					}
				},
				"58": {
					"id": "58",
					"specializationId": "40",
					"name": "\u62db\u5f0f\u8ffd\u52a0",
					"description": "\u5f00\u542f\u9501\u5589\u67aa\u7b2c\u4e8c\u6bb5",
					"effect": {
						"14": "428"
					}
				},
				"59": {
					"id": "59",
					"specializationId": "40",
					"name": "\u9b3c\u9b45\u8eab\u5f62 \t",
					"description": "\u4f7f\u795e\u5c06\u5728\u91ca\u653e\u9501\u5589\u67aa\u671f\u95f4\uff0c\u5904\u4e8e\u9738\u4f53\u72b6\u6001",
					"effect": {
						"1": "429"
					}
				},
				"60": {
					"id": "60",
					"specializationId": "40",
					"name": "\u65ad\u7b4b\u52a0\u6210",
					"description": "\u9501\u5589\u67aa\u5bf9\u65ad\u7b4b\u76ee\u6807\u589e\u52a040%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "431"
					}
				},
				"61": {
					"id": "61",
					"specializationId": "40",
					"name": "\u51b7\u5374\u51cf\u5c11 \t",
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.4\u79d2",
					"effect": {
						"1": "433",
						"2": "434",
						"3": "435",
						"4": "436",
						"5": "437",
						"6": "438",
						"7": "439"
					}
				},
				"62": {
					"id": "62",
					"specializationId": "40",
					"name": "\u5c01\u8109",
					"description": "\u9501\u5589\u67aa90%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002",
					"effect": {
						"1": "442",
						"2": "449",
						"3": "450",
						"4": "451",
						"5": "452",
						"6": "453",
						"7": "454"
					}
				},
				"63": {
					"id": "63",
					"specializationId": "51",
					"name": "\u6467\u7b4b\u65ad\u9aa8",
					"description": "\u51a0\u5802\u817f\u9020\u6210\u76ee\u6807\u65ad\u7b4b\uff0c\u51cf\u901f10%\uff0c\u6301\u7eed3\u79d2\u3002",
					"effect": {
						"1": "462"
					}
				},
				"64": {
					"id": "64",
					"specializationId": "51",
					"name": "\u51b7\u5374\u51cf\u5c11",
					"description": "\u51a0\u5802\u817f\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u77ed4.2\u79d2\u3002",
					"effect": {
						"1": "463"
					}
				},
				"65": {
					"id": "65",
					"specializationId": "51",
					"name": "\u7729\u6655\u52a0\u6210",
					"description": "\u51a0\u5802\u817f\u5bf9\u7729\u6655\u7684\u76ee\u6807\u589e\u52a040%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "465"
					}
				},
				"66": {
					"id": "66",
					"specializationId": "51",
					"name": "\u4f24\u5bb3",
					"description": "\u51a0\u5802\u817f\u589e\u52a045%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002",
					"effect": {
						"1": "468",
						"2": "469",
						"3": "470",
						"4": "471",
						"5": "472",
						"6": "473",
						"7": "474"
					}
				},
				"67": {
					"id": "67",
					"specializationId": "51",
					"name": "\u706b\u7130\u8def\u5f84 \t",
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u621072%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "477",
						"2": "479",
						"3": "480",
						"4": "481",
						"5": "482",
						"6": "483",
						"7": "484"
					}
				},
				"73": {
					"id": "73",
					"specializationId": "57",
					"name": "\u7834\u5929\u00b7\u5251\u9635 \t",
					"description": "\u5f00\u542f\u5143\u7d20\u7cfb\u7684\u5207\u5251\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6",
					"effect": {
						"1": "501"
					}
				},
				"75": {
					"id": "75",
					"specializationId": "57",
					"name": "\u7275\u5f15",
					"description": "\u96f7\u9f99\u5165\u5730\u9020\u6210\u5468\u56f45M\u5185\u5f3a\u5236\u7275\u5f15\u7684\u6548\u679c",
					"effect": {
						"1": "508"
					}
				},
				"79": {
					"id": "79",
					"specializationId": "57",
					"name": "\u96f7\u9f99\u9644\u4f53",
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u96f7\u9f99\u5165\u5730\u547d\u4e2d\u7684\u76ee\u6807\uff0c\u6bcf\u6b21\u53d7\u5230\u653b\u51fb\u6062\u590d\u795e\u5c06\u7684\u751f\u547d\u503c1%\uff0c\u6301\u7eed10\u79d2\u3002",
					"effect": {
						"1": "518"
					}
				},
				"82": {
					"id": "82",
					"specializationId": "57",
					"name": "\u964d\u4f4e\u6d88\u8017",
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-67.5%",
					"effect": {
						"1": "526",
						"2": "527",
						"3": "528",
						"4": "529",
						"5": "530",
						"6": "531",
						"7": "532"
					}
				},
				"86": {
					"id": "86",
					"specializationId": "57",
					"name": "\u7f34\u68b0",
					"description": "\u96f7\u9f99\u5165\u5730\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed10\u79d2\u3002",
					"effect": {
						"1": "540",
						"2": "541",
						"3": "542",
						"4": "543",
						"5": "544",
						"6": "545",
						"7": "546"
					}
				},
				"118": {
					"id": "118",
					"specializationId": "61",
					"name": "\u60ca\u5929\u00b7\u5251",
					"description": "\u5f00\u542f\u84c4\u529b\u7cfb\u7684\u5207\u5251\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6",
					"effect": {
						"1": "566"
					}
				},
				"121": {
					"id": "121",
					"specializationId": "61",
					"name": "\u51b7\u5374\u51cf\u5c11",
					"description": "\u94c1\u5c71\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f9.7\u79d2",
					"effect": {
						"1": "576"
					}
				},
				"125": {
					"id": "125",
					"specializationId": "61",
					"name": "\u84c4\u529b\u77ac\u53d1",
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u94c1\u5c71\u67aa\uff0c\u5728\u6548\u679c\u671f\u95f4\u6bcf\u91ca\u653e5\u6b21\u6280\u80fd\uff0c\u4e0b\u4e00\u6b21\u84c4\u529b\u6280\u80fd\u5c06\u53d8\u6210\u77ac\u53d1\u3002",
					"effect": {
						"1": "585"
					}
				},
				"126": {
					"id": "126",
					"specializationId": "61",
					"name": "\u589e\u52a0\u7075\u6c14",
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad830\u70b9",
					"effect": {
						"1": "608",
						"2": "610",
						"3": "611",
						"4": "612",
						"5": "613",
						"6": "614",
						"7": "615"
					}
				},
				"128": {
					"id": "128",
					"specializationId": "61",
					"name": "\u51fb\u6740\u56de\u7075\u6c14 \t",
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c1415\u70b9\u3002",
					"effect": {
						"1": "618",
						"2": "619",
						"3": "620",
						"4": "621",
						"5": "622",
						"6": "623",
						"7": "624"
					}
				},
				"167": {
					"id": "167",
					"specializationId": "65",
					"name": "\u589e\u52a0\u89d2\u5ea6",
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7834\u653b\u51fb\u89d2\u5ea620\u00b0",
					"effect": {
						"1": "655"
					}
				},
				"171": {
					"id": "171",
					"specializationId": "65",
					"name": "\u8bc6\u7834",
					"description": "\u5929\u773c\u7834\u6bcf\u6b21\u547d\u4e2d\u4f1a\u9020\u6210\u4e0b\u6b21\u4f24\u5bb3\u63d0\u534720%\u3002",
					"effect": {
						"1": "670"
					}
				},
				"174": {
					"id": "174",
					"specializationId": "65",
					"name": "\u4f24\u5bb3\u63d0\u5347",
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u783420%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "675"
					}
				},
				"179": {
					"id": "179",
					"specializationId": "65",
					"name": "\u51b7\u5374\u51cf\u5c11",
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f8\u79d2",
					"effect": {
						"1": "678",
						"2": "680",
						"3": "681",
						"4": "682",
						"5": "683",
						"6": "684",
						"7": "685"
					}
				},
				"189": {
					"id": "189",
					"specializationId": "65",
					"name": "\u7834\u7532",
					"description": "\u5929\u773c\u783450%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "701",
						"2": "702",
						"3": "703",
						"4": "704",
						"5": "705",
						"6": "706",
						"7": "707"
					}
				},
				"199": {
					"id": "199",
					"specializationId": "68",
					"name": "\u675f\u7f1a \t",
					"description": "\u5929\u773c\u00b7\u7f1a\u9020\u6210\u76ee\u6807\u675f\u7f1a\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "725"
					}
				},
				"201": {
					"id": "201",
					"specializationId": "68",
					"name": "\u89d2\u5ea6\t",
					"description": "\u5929\u773c\u00b7\u7f1a\u7075\u89d2\u5ea6\u589e\u52a015\u5ea6\uff0c\u7075\u6c14\u6d88\u8017\u964d\u4f4e20%",
					"effect": {
						"1": "747"
					}
				},
				"215": {
					"id": "215",
					"specializationId": "68",
					"name": "\u7f1a\u7075",
					"description": "\u5929\u773c\u00b7\u7f1a\u91ca\u653e\u540e\u4f1a\u7ed9\u76ee\u6807\u6dfb\u52a0\u7f1a\u7075\u72b6\u6001\uff0c\u6bcf\u6b21\u91ca\u653e\u6280\u80fd\u5c06\u53d7\u523050%\u4f24\u5bb3\uff0c\u4e0e\u91ca\u653e\u8005\u8d8a\u8fdc\uff0c\u4f24\u5bb3\u8d8a\u9ad8\uff0c\u6301\u7eed10\u79d2\u3002",
					"effect": {
						"1": "748"
					}
				},
				"217": {
					"id": "217",
					"specializationId": "68",
					"name": "\u51b7\u5374\u51cf\u5c11",
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f9.7\u79d2",
					"effect": {
						"1": "759",
						"2": "761",
						"3": "762",
						"4": "763",
						"5": "764",
						"6": "765",
						"7": "766"
					}
				},
				"223": {
					"id": "223",
					"specializationId": "68",
					"name": "\u4f24\u5bb3\u63d0\u5347 \t",
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "774",
						"2": "776",
						"3": "777",
						"4": "778",
						"5": "779",
						"6": "780",
						"7": "781"
					}
				},
				"236": {
					"id": "236",
					"specializationId": "71",
					"name": "\u7834\u5929\u00b7\u8f70",
					"description": "\u5f00\u542f\u5143\u7d20\u7cfb\u7684\u5207\u70ae\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6",
					"effect": {
						"1": "790"
					}
				},
				"241": {
					"id": "241",
					"specializationId": "71",
					"name": "\u96f7\u9f99\u52a0\u6210",
					"description": "\u5954\u96f7\u67aa\u5bf9\u96f7\u9f99\u9644\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u4f24\u5bb3\u63d0\u534740%",
					"effect": {
						"1": "793"
					}
				},
				"249": {
					"id": "249",
					"specializationId": "71",
					"name": "\u75be\u96f7",
					"description": "\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb5\u91ca\u653e\u540e\uff0c\u6bcf\u91ca\u653e\u4e00\u4e2a\u6280\u80fd\u589e\u52a0\u653b\u51fb\u901f\u5ea61.5%\uff0c\u6700\u591a\u53e0\u52a03\u5c42\uff0c\u6301\u7eed10\u79d2\u3002",
					"effect": {
						"1": "804"
					}
				},
				"251": {
					"id": "251",
					"specializationId": "71",
					"name": "\u611f\u7535",
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb590%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed12\u79d2\u3002",
					"effect": {
						"1": "812",
						"2": "814",
						"3": "815",
						"4": "816",
						"5": "817",
						"6": "818",
						"7": "819"
					}
				},
				"254": {
					"id": "254",
					"specializationId": "71",
					"name": "\u4f24\u5bb3\u63d0\u5347",
					"description": "\u589e\u52a0\u5954\u96f7\u67aa45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "829",
						"2": "830",
						"3": "831",
						"4": "832",
						"5": "833",
						"6": "834",
						"7": "835"
					}
				},
				"274": {
					"id": "274",
					"specializationId": "75",
					"name": "\u60ca\u5929\u00b7\u7206",
					"description": "\u5f00\u542f\u84c4\u529b\u7cfb\u7684\u5207\u70ae\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6",
					"effect": {
						"1": "857"
					}
				},
				"277": {
					"id": "277",
					"specializationId": "75",
					"name": "\u4f24\u5bb3",
					"description": "\u589e\u52a0\u4e71\u661f\u795e\u67aa20%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002",
					"effect": {
						"1": "860"
					}
				},
				"280": {
					"id": "280",
					"specializationId": "75",
					"name": "\u7275\u5f15",
					"description": "\u4e71\u661f\u795e\u67aa\u843d\u5730\u540e\u9020\u6210\u5468\u56f45M\u5185\u5f3a\u5236\u7275\u5f15\u7684\u6548\u679c",
					"effect": {
						"1": "877"
					}
				},
				"283": {
					"id": "283",
					"specializationId": "75",
					"name": "\u6253\u4f53",
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u680730\u70b9\u4f53\u529b\u3002",
					"effect": {
						"1": "878",
						"2": "879",
						"3": "880",
						"4": "881",
						"5": "882",
						"6": "883",
						"7": "884"
					}
				},
				"287": {
					"id": "287",
					"specializationId": "75",
					"name": "\u518d\u6b21\u91ca\u653e",
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u670945%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f675%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09",
					"effect": {
						"1": "886",
						"2": "887",
						"3": "888",
						"4": "889",
						"5": "890",
						"6": "891",
						"7": "892"
					}
				},
				"295": {
					"id": "295",
					"specializationId": "78",
					"name": "\u7729\u6655",
					"description": "\u54ee\u5929\u795e\u72ac\u7838\u4e0b\u53bb\u540e\u5c06\u9020\u6210\u76ee\u6807\u7729\u66553\u79d2\u3002",
					"effect": {
						"1": "915"
					}
				},
				"297": {
					"id": "297",
					"specializationId": "78",
					"name": "\u964d\u4f4e\u6d88\u8017 \t",
					"description": "\u54ee\u5929\u795e\u72ac\u7075\u6c14\u6d88\u8017\u964d\u4f4e20%",
					"effect": {
						"1": "917"
					}
				},
				"299": {
					"id": "299",
					"specializationId": "78",
					"name": "\u4f24\u5bb3\u63d0\u5347",
					"description": "\u589e\u52a0\u54ee\u5929\u795e\u72ac20%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "926"
					}
				},
				"301": {
					"id": "301",
					"specializationId": "78",
					"name": "\u51b7\u5374\u51cf\u5c11 \t",
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f11.9\u79d2",
					"effect": {
						"1": "941",
						"2": "942",
						"3": "943",
						"4": "944",
						"5": "945",
						"6": "946",
						"7": "947"
					}
				},
				"302": {
					"id": "302",
					"specializationId": "78",
					"name": "\u7834\u7532\u52a0\u6210 \t",
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534790%",
					"effect": {
						"1": "956",
						"2": "957",
						"3": "958",
						"4": "959",
						"5": "960",
						"6": "961",
						"7": "962"
					}
				},
				"309": {
					"id": "309",
					"specializationId": "81",
					"name": "\u6050\u60e7",
					"description": "\u795e\u72ac\u5420\u9020\u6210\u6050\u60e7\u6548\u679c\uff0c\u6301\u7eed2.5\u79d2",
					"effect": {
						"1": "987"
					}
				},
				"310": {
					"id": "310",
					"specializationId": "81",
					"name": "\u72d7\u4ed7\u4eba\u52bf",
					"description": "\u795e\u72ac\u5420\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\uff0c\u54ee\u5929\u72ac\u7684\u653b\u51fb\u529b\u63d0\u534710%\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a010\u5c42\uff0c\u6301\u7eed20\u79d2\u3002",
					"effect": {
						"1": "996"
					}
				},
				"311": {
					"id": "311",
					"specializationId": "81",
					"name": "\u6548\u679c \t",
					"description": "\u589e\u52a0\u795e\u72ac\u5420\u653b\u51fb\u6b21\u65702\u6b21\uff0c\u4f24\u5bb3\u964d\u4f4e15%\u3002",
					"effect": {
						"1": "1005"
					}
				},
				"313": {
					"id": "313",
					"specializationId": "81",
					"name": "\u51b7\u5374\u51cf\u5c11 \t",
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f10.6\u79d2",
					"effect": {
						"1": "1014",
						"2": "1017",
						"3": "1018",
						"4": "1019",
						"5": "1020",
						"6": "1021",
						"7": "1022"
					}
				},
				"315": {
					"id": "315",
					"specializationId": "81",
					"name": "\u4f24\u5bb3\u63d0\u5347",
					"description": "\u589e\u52a0\u795e\u72ac\u542045%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "1037",
						"2": "1038",
						"3": "1039",
						"4": "1040",
						"5": "1041",
						"6": "1042",
						"7": "1043"
					}
				},
				"319": {
					"id": "319",
					"specializationId": "83",
					"name": "\u7834\u5929\u00b7\u67aa\u821e",
					"description": "\u5f00\u542f\u5143\u7d20\u7cfb\u7684\u5207\u67aa\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6",
					"effect": {
						"1": "1060"
					}
				},
				"320": {
					"id": "320",
					"specializationId": "83",
					"name": "\u6563\u653b \t",
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u653b\u51fb\u529b\u964d\u4f4e10%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "1064"
					}
				},
				"321": {
					"id": "321",
					"specializationId": "83",
					"name": "\u96f7\u9f99\u52a0\u6210 \t",
					"description": " \t\u75be\u5f71\u523a\u5bf9\u5904\u4e8e\u96f7\u9f99\u9644\u4f53\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534740%",
					"effect": {
						"1": "1081"
					}
				},
				"322": {
					"id": "322",
					"specializationId": "83",
					"name": "\u5c01\u8109",
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed4.5\u79d2\u3002",
					"effect": {
						"1": "1095",
						"2": "1096",
						"3": "1097",
						"4": "1098",
						"5": "1099",
						"6": "1100",
						"7": "1101"
					}
				},
				"323": {
					"id": "323",
					"specializationId": "83",
					"name": "\u96f7\u9f99\u62a4\u4e3b \t",
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d45%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002",
					"effect": {
						"1": "1102",
						"2": "1103",
						"3": "1104",
						"4": "1105",
						"5": "1106",
						"6": "1107",
						"7": "1108"
					}
				},
				"334": {
					"id": "334",
					"specializationId": "87",
					"name": "\u60ca\u5929\u00b7\u67aa",
					"description": "\u5f00\u542f\u84c4\u529b\u7cfb\u7684\u5207\u67aa\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6",
					"effect": {
						"1": "1147"
					}
				},
				"335": {
					"id": "335",
					"specializationId": "87",
					"name": "\u66b4\u51fb\u6df7\u4e71 \t",
					"description": "\u6e38\u9f99\u67aa\u84c4\u6ee1\u65f6\u66b4\u51fb\u80fd\u9020\u6210\u76ee\u6807\u6df7\u4e71\uff0c\u6301\u7eed4\u79d2\u3002",
					"effect": {
						"1": "1161"
					}
				},
				"336": {
					"id": "336",
					"specializationId": "87",
					"name": "\u4f1a\u5fc3\u653b\u51fb \t",
					"description": "\u6e38\u9f99\u67aa\u84c4\u529b\u6ee1\u65f6\u7684\u4f1a\u5fc3\u7387\u63d0\u534720%",
					"effect": {
						"1": "1162"
					}
				},
				"337": {
					"id": "337",
					"specializationId": "87",
					"name": "\u4f24\u5bb3 \t",
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002",
					"effect": {
						"1": "1164",
						"2": "1165",
						"3": "1166",
						"4": "1167",
						"5": "1168",
						"6": "1169",
						"7": "1170"
					}
				},
				"338": {
					"id": "338",
					"specializationId": "87",
					"name": "\u5168\u6280\u80fd\u51b7\u5374 \t",
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537415\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537430\u79d2\u3002",
					"effect": {
						"1": "1179",
						"2": "1180",
						"3": "1181",
						"4": "1182",
						"5": "1183",
						"6": "1184",
						"7": "1185"
					}
				}
			},
			"specializationSpellUpgradeEffect": {
				"74": {
					"id": "74",
					"upgradeId": "15",
					"index": "0",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "25",
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
					"description": "\u5f00\u542f\u94f6\u94a9\u94c1\u753b\u7b2c\u4e8c\u6bb5"
				},
				"98": {
					"id": "98",
					"upgradeId": "16",
					"index": "0",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "25",
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
					"description": "\u6bcf\u6b21\u94f6\u94a9\u94c1\u753b\u66b4\u51fb\uff0c\u589e\u52a0\u81ea\u8eab\u653b\u51fb\u901f\u5ea630\u70b9\uff0c\u79fb\u52a8\u901f\u5ea63%\uff0c\u6301\u7eed10\u79d2\uff0c\u8fd9\u4e2a\u6548\u679c\u6700\u591a\u5806\u53e04\u5c42\u3002"
				},
				"107": {
					"id": "107",
					"upgradeId": "17",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "25",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u94f6\u94a9\u94c1\u753b\u589e\u52a0\u653b\u51fb\u6b21\u65705\u6b21\u3002"
				},
				"115": {
					"id": "115",
					"upgradeId": "19",
					"index": "0",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "25",
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
					"description": "\u94f6\u94a9\u94c1\u753b\u67095%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"123": {
					"id": "123",
					"upgradeId": "22",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "25",
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
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b3%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"140": {
					"id": "140",
					"upgradeId": "27",
					"index": "0",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "27",
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
					"description": "\u5f00\u542f\u6a2a\u626b\u516b\u65b9\u7b2c\u4e00\u6bb5\u7684\u7b2c\u4e09\u62db"
				},
				"152": {
					"id": "152",
					"upgradeId": "29",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "27",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u6a2a\u626b\u516b\u65b9\u7b2c\u4e8c\u6bb5\u9020\u6210\u7729\u6655\uff0c\u6301\u7eed2.5\u79d2\u3002"
				},
				"150": {
					"id": "150",
					"upgradeId": "28",
					"index": "0",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "27",
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
					"description": "\u91ca\u653e\u6a2a\u626b\u516b\u65b9\u7b2c\u4e09\u62db\u540e\uff0c\u7b2c\u4e8c\u6bb5\u4f24\u5bb3\u63d0\u534720%"
				},
				"163": {
					"id": "163",
					"upgradeId": "32",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "27",
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
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b93%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"202": {
					"id": "202",
					"upgradeId": "30",
					"index": "0",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "27",
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
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a06%"
				},
				"248": {
					"id": "248",
					"upgradeId": "39",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u6bcf\u6b21\u66b4\u51fb\u65f6\uff0c\u589e\u52a0\u81ea\u8eab3%\u4f24\u5bb3\uff0c\u51cf\u5c111%\u547d\u4e2d\u503c\uff0c\u72b6\u6001\u53ef\u53e0\u52a010\u5c42\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"257": {
					"id": "257",
					"upgradeId": "40",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7b2c\u4e8c\u6bb5\u9020\u6210\u76ee\u6807\u65ad\u7b4b\uff0c\u51cf\u901f20%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"279": {
					"id": "279",
					"upgradeId": "41",
					"index": "0",
					"requireLevel": "27",
					"step": "1",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u5bf9\u65ad\u7b4b\u7684\u76ee\u6807\u589e\u52a040%\u4f24\u5bb3\u3002"
				},
				"294": {
					"id": "294",
					"upgradeId": "42",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f0.6\u79d2"
				},
				"302": {
					"id": "302",
					"upgradeId": "44",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "31",
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
					"description": "\u589e\u52a0\u866c\u9f99\u66b43%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"342": {
					"id": "342",
					"upgradeId": "48",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u9020\u6210\u65ad\u7b4b\u6548\u679c\uff0c\u51cf\u901f30%\uff0c\u6301\u7eed5\u79d2"
				},
				"351": {
					"id": "351",
					"upgradeId": "49",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f4.8\u79d2"
				},
				"360": {
					"id": "360",
					"upgradeId": "50",
					"index": "0",
					"requireLevel": "27",
					"step": "1",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u7684\u4f1a\u5fc3\u503c\u63d0\u9ad810%\uff0c\u4f1a\u5fc3\u4f24\u5bb3\u63d0\u9ad835%\u3002"
				},
				"370": {
					"id": "370",
					"upgradeId": "51",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "35",
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
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa3%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"386": {
					"id": "386",
					"upgradeId": "53",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u53473\u70b9\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"429": {
					"id": "429",
					"upgradeId": "59",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "40",
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
					"description": "\u4f7f\u795e\u5c06\u5728\u91ca\u653e\u9501\u5589\u67aa\u671f\u95f4\uff0c\u5904\u4e8e\u9738\u4f53\u72b6\u6001"
				},
				"431": {
					"id": "431",
					"upgradeId": "60",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u5bf9\u65ad\u7b4b\u76ee\u6807\u589e\u52a040%\u4f24\u5bb3\u3002"
				},
				"433": {
					"id": "433",
					"upgradeId": "61",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f0.7\u79d2"
				},
				"442": {
					"id": "442",
					"upgradeId": "62",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "40",

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
					"description": "\u9501\u5589\u67aa6%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002"
				},
				"462": {
					"id": "462",
					"upgradeId": "63",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u9020\u6210\u76ee\u6807\u65ad\u7b4b\uff0c\u51cf\u901f10%\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"463": {
					"id": "463",
					"upgradeId": "64",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "0",
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
					"description": "\u51a0\u5802\u817f\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u77ed4.2\u79d2\u3002"
				},
				"465": {
					"id": "465",
					"upgradeId": "65",
					"index": "1",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u5bf9\u7729\u6655\u7684\u76ee\u6807\u589e\u52a040%\u4f24\u5bb3\u3002"
				},
				"468": {
					"id": "468",
					"upgradeId": "66",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u589e\u52a03%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"477": {
					"id": "477",
					"upgradeId": "67",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u62105%\u4f24\u5bb3\u3002"
				},
				"501": {
					"id": "501",
					"upgradeId": "73",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "57",
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
					"description": "\u5f00\u542f\u5143\u7d20\u7cfb\u7684\u5207\u5251\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6"
				},
				"508": {
					"id": "508",
					"upgradeId": "75",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u9020\u6210\u5468\u56f45M\u5185\u5f3a\u5236\u7275\u5f15\u7684\u6548\u679c"
				},
				"518": {
					"id": "518",
					"upgradeId": "79",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "57",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u96f7\u9f99\u5165\u5730\u547d\u4e2d\u7684\u76ee\u6807\uff0c\u6bcf\u6b21\u53d7\u5230\u653b\u51fb\u6062\u590d\u795e\u5c06\u7684\u751f\u547d\u503c1%\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"526": {
					"id": "526",
					"upgradeId": "82",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-4.5%"
				},
				"540": {
					"id": "540",
					"upgradeId": "86",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed0.3\u79d2\u3002"
				},
				"566": {
					"id": "566",
					"upgradeId": "118",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "61",
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
					"description": "\u5f00\u542f\u84c4\u529b\u7cfb\u7684\u5207\u5251\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6"
				},
				"576": {
					"id": "576",
					"upgradeId": "121",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f9.7\u79d2"
				},
				"585": {
					"id": "585",
					"upgradeId": "125",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "61",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u94c1\u5c71\u67aa\uff0c\u5728\u6548\u679c\u671f\u95f4\u6bcf\u91ca\u653e5\u6b21\u6280\u80fd\uff0c\u4e0b\u4e00\u6b21\u84c4\u529b\u6280\u80fd\u5c06\u53d8\u6210\u77ac\u53d1\u3002"
				},
				"608": {
					"id": "608",
					"upgradeId": "126",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad82\u70b9"
				},
				"618": {
					"id": "618",
					"upgradeId": "128",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c141\u70b9\u3002"
				},
				"655": {
					"id": "655",
					"upgradeId": "167",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "65",
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
					"description": "\u52a0\u5929\u773c\u00b7\u7834\u653b\u51fb\u89d2\u5ea620\u00b0"
				},
				"670": {
					"id": "670",
					"upgradeId": "171",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u7834\u6bcf\u6b21\u547d\u4e2d\u4f1a\u9020\u6210\u4e0b\u6b21\u4f24\u5bb3\u63d0\u534720%\u3002"
				},
				"675": {
					"id": "675",
					"upgradeId": "174",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "65",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u783420%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"678": {
					"id": "678",
					"upgradeId": "179",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f0.8\u79d2"
				},
				"701": {
					"id": "701",
					"upgradeId": "189",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u78345%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"725": {
					"id": "725",
					"upgradeId": "199",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u9020\u6210\u76ee\u6807\u675f\u7f1a\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"747": {
					"id": "747",
					"upgradeId": "201",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7075\u6c14\u89d2\u5ea6\u589e\u52a015\u5ea6\uff0c\u7075\u6c14\u6d88\u8017\u964d\u4f4e20%"
				},
				"748": {
					"id": "748",
					"upgradeId": "215",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u91ca\u653e\u540e\u4f1a\u7ed9\u76ee\u6807\u6dfb\u52a0\u7f1a\u7075\u72b6\u6001\uff0c\u6bcf\u6b21\u91ca\u653e\u6280\u80fd\u5c06\u53d7\u523050%\u4f24\u5bb3\uff0c\u4e0e\u91ca\u653e\u8005\u8d8a\u8fdc\uff0c\u4f24\u5bb3\u8d8a\u9ad8\uff0c\u6301\u7eed15\u79d2\u3002"
				},
				"759": {
					"id": "759",
					"upgradeId": "217",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f1\u79d2"
				},
				"774": {
					"id": "774",
					"upgradeId": "223",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "68",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a3%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"790": {
					"id": "790",
					"upgradeId": "236",
					"index": "0",
					"requireLevel": "36",
					"step": "1",
					"requireSpecialization1": "71",
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
					"description": "\u5f00\u542f\u5143\u7d20\u7cfb\u7684\u5207\u70ae\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6"
				},
				"793": {
					"id": "793",
					"upgradeId": "241",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "71",
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
					"description": "\u5954\u96f7\u67aa\u5bf9\u96f7\u9f99\u9644\u4f53\u72b6\u6001\u4e0b\u7684\u654c\u4eba\u9020\u6210\u4f24\u5bb3\u63d0\u534740%"
				},
				"804": {
					"id": "804",
					"upgradeId": "249",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "71",
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
					"description": "\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb5\u91ca\u653e\u540e\uff0c\u6bcf\u91ca\u653e\u4e00\u4e2a\u6280\u80fd\u589e\u52a0\u653b\u51fb\u901f\u5ea62%\uff0c\u6700\u591a\u53e0\u52a03\u5c42\uff0c\u6301\u7eed15\u79d2\u3002"
				},
				"812": {
					"id": "812",
					"upgradeId": "251",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "71",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb545%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed1.6\u79d2\u3002"
				},
				"829": {
					"id": "829",
					"upgradeId": "254",
					"index": "0",
					"requireLevel": "38",
					"step": "1",
					"requireSpecialization1": "71",
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
					"description": "\u589e\u52a0\u5954\u96f7\u67aa3%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"857": {
					"id": "857",
					"upgradeId": "274",
					"index": "0",
					"requireLevel": "36",
					"step": "1",
					"requireSpecialization1": "75",
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
					"description": "\u5f00\u542f\u84c4\u529b\u7cfb\u7684\u5207\u70ae\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6"
				},
				"860": {
					"id": "860",
					"upgradeId": "277",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "75",
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
					"description": "\u589e\u52a0\u4e71\u661f\u795e\u67aa20%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"877": {
					"id": "877",
					"upgradeId": "280",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u843d\u5730\u540e\u9020\u6210\u5468\u56f45M\u5185\u5f3a\u5236\u7275\u5f15\u7684\u6548\u679c"
				},
				"878": {
					"id": "878",
					"upgradeId": "283",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u68072\u70b9\u4f53\u529b\u3002"
				},
				"886": {
					"id": "886",
					"upgradeId": "287",
					"index": "0",
					"requireLevel": "38",
					"step": "1",
					"requireSpecialization1": "75",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u67093%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f65%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09"
				},
				"915": {
					"id": "915",
					"upgradeId": "295",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7838\u4e0b\u53bb\u540e\u5c06\u9020\u6210\u76ee\u6807\u7729\u66553\u79d2\u3002"
				},
				"917": {
					"id": "917",
					"upgradeId": "297",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7075\u6c14\u6d88\u8017\u964d\u4f4e20%"
				},
				"926": {
					"id": "926",
					"upgradeId": "299",
					"index": "0",
					"requireLevel": "40",
					"step": "1",
					"requireSpecialization1": "0",
					"requireLevel1": "0",
					"requireSpecialization2": "0",
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
					"description": "\u589e\u52a0\u54ee\u5929\u795e\u72ac20%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"941": {
					"id": "941",
					"upgradeId": "301",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f1.2\u79d2"
				},
				"956": {
					"id": "956",
					"upgradeId": "302",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u53476%"
				},
				"987": {
					"id": "987",
					"upgradeId": "309",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u9020\u6210\u6050\u60e7\u6548\u679c\uff0c\u6301\u7eed2.5\u79d2"
				},
				"996": {
					"id": "996",
					"upgradeId": "310",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\uff0c\u54ee\u5929\u72ac\u7684\u653b\u51fb\u529b\u63d0\u534710%\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a010\u5c42\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1005": {
					"id": "1005",
					"upgradeId": "311",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u5420\u653b\u51fb\u6b21\u65702\u6b21\uff0c\u4f24\u5bb3\u964d\u4f4e15%\u3002"
				},
				"1014": {
					"id": "1014",
					"upgradeId": "313",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f1.1\u79d2"
				},
				"1037": {
					"id": "1037",
					"upgradeId": "315",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u54203%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"1060": {
					"id": "1060",
					"upgradeId": "319",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "83",
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
					"description": "\u5f00\u542f\u5143\u7d20\u7cfb\u7684\u5207\u67aa\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6"
				},
				"1064": {
					"id": "1064",
					"upgradeId": "320",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u653b\u51fb\u529b\u964d\u4f4e10%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1081": {
					"id": "1081",
					"upgradeId": "321",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u5bf9\u5904\u4e8e\u96f7\u9f99\u9644\u4f53\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534740%"
				},
				"1095": {
					"id": "1095",
					"upgradeId": "322",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed0.3\u79d2\u3002"
				},
				"1102": {
					"id": "1102",
					"upgradeId": "323",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "83",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d3%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1147": {
					"id": "1147",
					"upgradeId": "334",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "87",
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
					"description": "\u5f00\u542f\u84c4\u529b\u7cfb\u7684\u5207\u67aa\u6280\uff0c\u5b66\u4e60\u540e\u53ef\u5728\u4e00\u822c\u6280\u80fd\u4e2d\u67e5\u770b\u91ca\u653e\u6761\u4ef6"
				},
				"1161": {
					"id": "1161",
					"upgradeId": "335",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "87",
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
					"description": "\u6e38\u9f99\u67aa\u84c4\u6ee1\u65f6\u66b4\u51fb\u80fd\u9020\u6210\u76ee\u6807\u6df7\u4e71\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1162": {
					"id": "1162",
					"upgradeId": "336",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "87",
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
					"description": "\u6e38\u9f99\u67aa\u84c4\u529b\u6ee1\u65f6\u7684\u4f1a\u5fc3\u7387\u63d0\u534720%"
				},
				"1164": {
					"id": "1164",
					"upgradeId": "337",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "87",
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
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa3%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"1179": {
					"id": "1179",
					"upgradeId": "338",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "87",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u53741\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u53742\u79d2\u3002"
				},
				"2136": {
					"id": "2136",
					"upgradeId": "19",
					"index": "1",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "25",
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
					"description": "\u94f6\u94a9\u94c1\u753b\u670910%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"2142": {
					"id": "2142",
					"upgradeId": "22",
					"index": "1",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "25",
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
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b6%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"2148": {
					"id": "2148",
					"upgradeId": "30",
					"index": "1",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "27",
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
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a012%"
				},
				"296": {
					"id": "296",
					"upgradeId": "42",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f1.2\u79d2"
				},
				"305": {
					"id": "305",
					"upgradeId": "44",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "31",
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
					"description": "\u589e\u52a0\u866c\u9f99\u66b46%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"371": {
					"id": "371",
					"upgradeId": "51",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "35",
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
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa6%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"387": {
					"id": "387",
					"upgradeId": "53",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u53476\u70b9\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"434": {
					"id": "434",
					"upgradeId": "61",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f1.4\u79d2"
				},
				"449": {
					"id": "449",
					"upgradeId": "62",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa12%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002"
				},
				"469": {
					"id": "469",
					"upgradeId": "66",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u589e\u52a06%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"479": {
					"id": "479",
					"upgradeId": "67",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u621010%\u4f24\u5bb3\u3002"
				},
				"527": {
					"id": "527",
					"upgradeId": "82",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-9%"
				},
				"541": {
					"id": "541",
					"upgradeId": "86",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed0.6\u79d2\u3002"
				},
				"610": {
					"id": "610",
					"upgradeId": "126",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad84\u70b9"
				},
				"619": {
					"id": "619",
					"upgradeId": "128",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c142\u70b9\u3002"
				},
				"680": {
					"id": "680",
					"upgradeId": "179",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f1.5\u79d2"
				},
				"702": {
					"id": "702",
					"upgradeId": "189",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u783410%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"761": {
					"id": "761",
					"upgradeId": "217",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f1.9\u79d2"
				},
				"776": {
					"id": "776",
					"upgradeId": "223",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "68",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a6%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"814": {
					"id": "814",
					"upgradeId": "251",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "71",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb545%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed3.2\u79d2\u3002"
				},
				"830": {
					"id": "830",
					"upgradeId": "254",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "71",
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
					"description": "\u589e\u52a0\u5954\u96f7\u67aa6%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"879": {
					"id": "879",
					"upgradeId": "283",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u68074\u70b9\u4f53\u529b\u3002"
				},
				"887": {
					"id": "887",
					"upgradeId": "287",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "75",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u67096%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f610%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09"
				},
				"942": {
					"id": "942",
					"upgradeId": "301",
					"index": "1",
					"requireLevel": "43",
					"step": "2",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f2.4\u79d2"
				},
				"957": {
					"id": "957",
					"upgradeId": "302",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534712%"
				},
				"1017": {
					"id": "1017",
					"upgradeId": "313",
					"index": "1",
					"requireLevel": "43",
					"step": "2",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f2.1\u79d2"
				},
				"1038": {
					"id": "1038",
					"upgradeId": "315",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u54206%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"1096": {
					"id": "1096",
					"upgradeId": "322",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed0.6\u79d2\u3002"
				},
				"1103": {
					"id": "1103",
					"upgradeId": "323",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "83",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d6%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1165": {
					"id": "1165",
					"upgradeId": "337",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "87",
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
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa6%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"1180": {
					"id": "1180",
					"upgradeId": "338",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "87",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u53742\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u53744\u79d2\u3002"
				},
				"2154": {
					"id": "2154",
					"upgradeId": "32",
					"index": "1",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "27",
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
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b96%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"2137": {
					"id": "2137",
					"upgradeId": "19",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "25",
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
					"description": "\u94f6\u94a9\u94c1\u753b\u670920%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a04\u5c42\u3002"
				},
				"2143": {
					"id": "2143",
					"upgradeId": "22",
					"index": "2",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "25",
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
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b18%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"2149": {
					"id": "2149",
					"upgradeId": "30",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "27",
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
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a036%"
				},
				"297": {
					"id": "297",
					"upgradeId": "42",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f3.1\u79d2"
				},
				"306": {
					"id": "306",
					"upgradeId": "44",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "31",
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
					"description": "\u589e\u52a0\u866c\u9f99\u66b418%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"372": {
					"id": "372",
					"upgradeId": "51",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "35",
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
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa18%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"388": {
					"id": "388",
					"upgradeId": "53",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u534718\u70b9\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"435": {
					"id": "435",
					"upgradeId": "61",
					"index": "2",
					"requireLevel": "31",
					"step": "3",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f3.5\u79d2"
				},
				"450": {
					"id": "450",
					"upgradeId": "62",
					"index": "2",
					"requireLevel": "32",
					"step": "3",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa36%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002"
				},
				"470": {
					"id": "470",
					"upgradeId": "66",
					"index": "2",
					"requireLevel": "31",
					"step": "3",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u589e\u52a018%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"480": {
					"id": "480",
					"upgradeId": "67",
					"index": "2",
					"requireLevel": "32",
					"step": "3",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u621029%\u4f24\u5bb3\u3002"
				},
				"528": {
					"id": "528",
					"upgradeId": "82",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-27%"
				},
				"542": {
					"id": "542",
					"upgradeId": "86",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed1.8\u79d2\u3002"
				},
				"611": {
					"id": "611",
					"upgradeId": "126",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad812\u70b9"
				},
				"620": {
					"id": "620",
					"upgradeId": "128",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c146\u70b9\u3002"
				},
				"681": {
					"id": "681",
					"upgradeId": "179",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f4\u79d2"
				},
				"703": {
					"id": "703",
					"upgradeId": "189",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u783420%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"762": {
					"id": "762",
					"upgradeId": "217",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f5\u79d2"
				},
				"777": {
					"id": "777",
					"upgradeId": "223",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "68",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a18%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"815": {
					"id": "815",
					"upgradeId": "251",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "71",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb545%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed9.6\u79d2\u3002"
				},
				"831": {
					"id": "831",
					"upgradeId": "254",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "71",
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
					"description": "\u589e\u52a0\u5954\u96f7\u67aa18%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"880": {
					"id": "880",
					"upgradeId": "283",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u680712\u70b9\u4f53\u529b\u3002"
				},
				"888": {
					"id": "888",
					"upgradeId": "287",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "75",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u670918%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f630%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09"
				},
				"943": {
					"id": "943",
					"upgradeId": "301",
					"index": "2",
					"requireLevel": "44",
					"step": "3",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.1\u79d2"
				},
				"958": {
					"id": "958",
					"upgradeId": "302",
					"index": "2",
					"requireLevel": "45",
					"step": "3",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534736%"
				},
				"1018": {
					"id": "1018",
					"upgradeId": "313",
					"index": "2",
					"requireLevel": "44",
					"step": "3",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f5.5\u79d2"
				},
				"1039": {
					"id": "1039",
					"upgradeId": "315",
					"index": "2",
					"requireLevel": "45",
					"step": "3",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u542018%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1097": {
					"id": "1097",
					"upgradeId": "322",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed1.8\u79d2\u3002"
				},
				"1104": {
					"id": "1104",
					"upgradeId": "323",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "83",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d18%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1166": {
					"id": "1166",
					"upgradeId": "337",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "87",
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
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa18%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1181": {
					"id": "1181",
					"upgradeId": "338",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "87",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u53746\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537412\u79d2\u3002"
				},
				"2155": {
					"id": "2155",
					"upgradeId": "32",
					"index": "2",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "27",
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
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b918%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"2138": {
					"id": "2138",
					"upgradeId": "19",
					"index": "3",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "25",
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
					"description": "\u94f6\u94a9\u94c1\u753b\u670925%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a04\u5c42\u3002"
				},
				"2144": {
					"id": "2144",
					"upgradeId": "22",
					"index": "3",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "25",
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
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b21%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"2150": {
					"id": "2150",
					"upgradeId": "30",
					"index": "3",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "27",
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
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a042%"
				},
				"298": {
					"id": "298",
					"upgradeId": "42",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f3.5\u79d2"
				},
				"307": {
					"id": "307",
					"upgradeId": "44",
					"index": "4",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "31",
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
					"description": "\u589e\u52a0\u866c\u9f99\u66b421%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"373": {
					"id": "373",
					"upgradeId": "51",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "35",
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
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa21%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"389": {
					"id": "389",
					"upgradeId": "53",
					"index": "3",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u534721\u70b9\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"436": {
					"id": "436",
					"upgradeId": "61",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f3.9\u79d2"
				},
				"451": {
					"id": "451",
					"upgradeId": "62",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa42%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002"
				},
				"471": {
					"id": "471",
					"upgradeId": "66",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u589e\u52a021%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"481": {
					"id": "481",
					"upgradeId": "67",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u621033%\u4f24\u5bb3\u3002"
				},
				"529": {
					"id": "529",
					"upgradeId": "82",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-31.5%"
				},
				"543": {
					"id": "543",
					"upgradeId": "86",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u67092.1%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"612": {
					"id": "612",
					"upgradeId": "126",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad814\u70b9"
				},
				"621": {
					"id": "621",
					"upgradeId": "128",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c147\u70b9\u3002"
				},
				"682": {
					"id": "682",
					"upgradeId": "179",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f4.6\u79d2"
				},
				"704": {
					"id": "704",
					"upgradeId": "189",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u783425%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"763": {
					"id": "763",
					"upgradeId": "217",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f5.7\u79d2"
				},
				"778": {
					"id": "778",
					"upgradeId": "223",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "68",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a21%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"816": {
					"id": "816",
					"upgradeId": "251",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "71",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb590%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed11.2\u79d2\u3002"
				},
				"832": {
					"id": "832",
					"upgradeId": "254",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "71",
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
					"description": "\u589e\u52a0\u5954\u96f7\u67aa21%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"881": {
					"id": "881",
					"upgradeId": "283",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u680714\u70b9\u4f53\u529b\u3002"
				},
				"889": {
					"id": "889",
					"upgradeId": "287",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "75",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u670921%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f635%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09"
				},
				"944": {
					"id": "944",
					"upgradeId": "301",
					"index": "3",
					"requireLevel": "45",
					"step": "4",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.9\u79d2"
				},
				"959": {
					"id": "959",
					"upgradeId": "302",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534742%"
				},
				"1019": {
					"id": "1019",
					"upgradeId": "313",
					"index": "3",
					"requireLevel": "45",
					"step": "4",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.2\u79d2"
				},
				"1040": {
					"id": "1040",
					"upgradeId": "315",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u542021%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1098": {
					"id": "1098",
					"upgradeId": "322",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed2.1\u79d2\u3002"
				},
				"1105": {
					"id": "1105",
					"upgradeId": "323",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "83",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d21%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1167": {
					"id": "1167",
					"upgradeId": "337",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "87",
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
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa21%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1182": {
					"id": "1182",
					"upgradeId": "338",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "87",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u53748\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537414\u79d2\u3002"
				},
				"2156": {
					"id": "2156",
					"upgradeId": "32",
					"index": "3",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "27",
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
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b921%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"2139": {
					"id": "2139",
					"upgradeId": "19",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "25",
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
					"description": "\u94f6\u94a9\u94c1\u753b\u670930%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a04\u5c42\u3002"
				},
				"2145": {
					"id": "2145",
					"upgradeId": "22",
					"index": "4",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "25",
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
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b24%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"2151": {
					"id": "2151",
					"upgradeId": "30",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "27",
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
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a048%"
				},
				"299": {
					"id": "299",
					"upgradeId": "42",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f3.9\u79d2"
				},
				"308": {
					"id": "308",
					"upgradeId": "44",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "31",
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
					"description": "\u589e\u52a0\u866c\u9f99\u66b424%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"374": {
					"id": "374",
					"upgradeId": "51",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "35",
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
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa24%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"390": {
					"id": "390",
					"upgradeId": "53",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u534724\u70b9\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"437": {
					"id": "437",
					"upgradeId": "61",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f4.3\u79d2"
				},
				"452": {
					"id": "452",
					"upgradeId": "62",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa48%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002"
				},
				"472": {
					"id": "472",
					"upgradeId": "66",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u589e\u52a024%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"482": {
					"id": "482",
					"upgradeId": "67",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u621038%\u4f24\u5bb3\u3002"
				},
				"530": {
					"id": "530",
					"upgradeId": "82",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-36%"
				},
				"544": {
					"id": "544",
					"upgradeId": "86",
					"index": "4",
					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed2.4\u79d2\u3002"
				},
				"613": {
					"id": "613",
					"upgradeId": "126",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad816\u70b9"
				},
				"622": {
					"id": "622",
					"upgradeId": "128",
					"index": "4",
					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c148\u70b9\u3002"
				},
				"683": {
					"id": "683",
					"upgradeId": "179",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f5.1\u79d2"
				},
				"705": {
					"id": "705",
					"upgradeId": "189",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u783430%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"764": {
					"id": "764",
					"upgradeId": "217",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.3\u79d2"
				},
				"779": {
					"id": "779",
					"upgradeId": "223",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "68",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a24%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"817": {
					"id": "817",
					"upgradeId": "251",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "71",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb550%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed12\u79d2\u3002"
				},
				"833": {
					"id": "833",
					"upgradeId": "254",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "71",
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
					"description": "\u589e\u52a0\u5954\u96f7\u67aa24%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"882": {
					"id": "882",
					"upgradeId": "283",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u680716\u70b9\u4f53\u529b\u3002"
				},
				"890": {
					"id": "890",
					"upgradeId": "287",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "75",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u670924%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f640%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09"
				},
				"945": {
					"id": "945",
					"upgradeId": "301",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f7.7\u79d2"
				},
				"960": {
					"id": "960",
					"upgradeId": "302",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534748%"
				},
				"1020": {
					"id": "1020",
					"upgradeId": "313",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.8\u79d2"
				},
				"1041": {
					"id": "1041",
					"upgradeId": "315",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u542024%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1099": {
					"id": "1099",
					"upgradeId": "322",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed2.4\u79d2\u3002"
				},
				"1106": {
					"id": "1106",
					"upgradeId": "323",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "83",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d24%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1168": {
					"id": "1168",
					"upgradeId": "337",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "87",
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
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa24%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1183": {
					"id": "1183",
					"upgradeId": "338",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "87",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u53748\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537416\u79d2\u3002"
				},
				"2157": {
					"id": "2157",
					"upgradeId": "32",
					"index": "4",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "27",
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
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b924%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"2140": {
					"id": "2140",
					"upgradeId": "19",
					"index": "5",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "25",
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
					"description": "\u94f6\u94a9\u94c1\u753b\u670935%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a04\u5c42\u3002"
				},
				"300": {
					"id": "300",
					"upgradeId": "42",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f4.2\u79d2"
				},
				"309": {
					"id": "309",
					"upgradeId": "44",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "31",
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
					"description": "\u589e\u52a0\u866c\u9f99\u66b427%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"375": {
					"id": "375",
					"upgradeId": "51",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "35",
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
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa27%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"391": {
					"id": "391",
					"upgradeId": "53",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u534727\u70b9\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"438": {
					"id": "438",
					"upgradeId": "61",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f4.6\u79d2"
				},
				"453": {
					"id": "453",
					"upgradeId": "62",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa54%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002"
				},
				"473": {
					"id": "473",
					"upgradeId": "66",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u589e\u52a027%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"483": {
					"id": "483",
					"upgradeId": "67",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u621043%\u4f24\u5bb3\u3002"
				},
				"531": {
					"id": "531",
					"upgradeId": "82",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-40.5%"
				},
				"545": {
					"id": "545",
					"upgradeId": "86",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed2.7\u79d2\u3002"
				},
				"614": {
					"id": "614",
					"upgradeId": "126",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad818\u70b9"
				},
				"623": {
					"id": "623",
					"upgradeId": "128",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c149\u70b9\u3002"
				},
				"684": {
					"id": "684",
					"upgradeId": "179",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f5.6\u79d2"
				},
				"706": {
					"id": "706",
					"upgradeId": "189",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u783435%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"765": {
					"id": "765",
					"upgradeId": "217",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.9\u79d2"
				},
				"780": {
					"id": "780",
					"upgradeId": "223",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "68",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a27%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"818": {
					"id": "818",
					"upgradeId": "251",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "71",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb560%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed12\u79d2\u3002"
				},
				"834": {
					"id": "834",
					"upgradeId": "254",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "71",
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
					"description": "\u589e\u52a0\u5954\u96f7\u67aa27%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"883": {
					"id": "883",
					"upgradeId": "283",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u680718\u70b9\u4f53\u529b\u3002"
				},
				"891": {
					"id": "891",
					"upgradeId": "287",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "75",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u670927%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f645%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09"
				},
				"946": {
					"id": "946",
					"upgradeId": "301",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f8.4\u79d2"
				},
				"961": {
					"id": "961",
					"upgradeId": "302",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534754%"
				},
				"1021": {
					"id": "1021",
					"upgradeId": "313",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f7.5\u79d2"
				},
				"1042": {
					"id": "1042",
					"upgradeId": "315",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u542027%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1100": {
					"id": "1100",
					"upgradeId": "322",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed2.7\u79d2\u3002"
				},
				"1107": {
					"id": "1107",
					"upgradeId": "323",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "83",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d27%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1169": {
					"id": "1169",
					"upgradeId": "337",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "87",
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
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa27%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1184": {
					"id": "1184",
					"upgradeId": "338",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "87",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537410\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537418\u79d2\u3002"
				},
				"2146": {
					"id": "2146",
					"upgradeId": "22",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "25",
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
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b27%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"2152": {
					"id": "2152",
					"upgradeId": "30",
					"index": "5",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "27",
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
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a054%"
				},
				"2158": {
					"id": "2158",
					"upgradeId": "32",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "27",
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
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b927%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"301": {
					"id": "301",
					"upgradeId": "42",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "31",
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
					"description": "\u866c\u9f99\u66b4\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f5.8\u79d2"
				},
				"310": {
					"id": "310",
					"upgradeId": "44",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "31",
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
					"description": "\u589e\u52a0\u866c\u9f99\u66b445%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"376": {
					"id": "376",
					"upgradeId": "51",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "35",
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
					"description": "\u589e\u52a0\u7834\u706d\u795e\u67aa45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"392": {
					"id": "392",
					"upgradeId": "53",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "35",
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
					"description": "\u7834\u706d\u795e\u67aa\u91ca\u653e\u540e\uff0c\u795e\u5c06\u653b\u51fb\u901f\u5ea6\u63d0\u534745\u70b9\uff0c\u6301\u7eed10\u79d2\u3002"
				},
				"439": {
					"id": "439",
					"upgradeId": "61",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f6.4\u79d2"
				},
				"454": {
					"id": "454",
					"upgradeId": "62",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "40",
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
					"description": "\u9501\u5589\u67aa90%\u51e0\u7387\u9020\u6210\u76ee\u6807\u5c01\u81093\u79d2\u3002"
				},
				"474": {
					"id": "474",
					"upgradeId": "66",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u589e\u52a045%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"484": {
					"id": "484",
					"upgradeId": "67",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "51",
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
					"description": "\u51a0\u5802\u817f\u91ca\u653e\u8def\u5f84\u4e0b\u7559\u4e0b\u706b\u7130\uff0c\u5bf9\u654c\u4eba\u9020\u621072%\u4f24\u5bb3\u3002"
				},
				"532": {
					"id": "532",
					"upgradeId": "82",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u7075\u6c14\u6d88\u8017-67.5%"
				},
				"546": {
					"id": "546",
					"upgradeId": "86",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "57",
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
					"description": "\u96f7\u9f99\u5165\u5730\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u7f34\u68b0\uff0c\u6301\u7eed4.5\u79d2\u3002"
				},
				"615": {
					"id": "615",
					"upgradeId": "126",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u67aa\u7684\u7075\u6c14\u4e0a\u9650\u63d0\u9ad830\u70b9"
				},
				"624": {
					"id": "624",
					"upgradeId": "128",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "61",
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
					"description": "\u94c1\u5c71\u67aa\u72b6\u6001\u4e0b\uff0c\u6bcf\u51fb\u6740\u4e00\u4e2a\u602a\u7269\u56de\u590d\u7075\u6c1415\u70b9\u3002"
				},
				"685": {
					"id": "685",
					"upgradeId": "179",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u00b7\u7834\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f8\u79d2"
				},
				"707": {
					"id": "707",
					"upgradeId": "189",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "65",
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
					"description": "\u5929\u773c\u783450%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u964d\u4f4e30%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"766": {
					"id": "766",
					"upgradeId": "217",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "68",
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
					"description": "\u5929\u773c\u00b7\u7f1a\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f9.7\u79d2"
				},
				"781": {
					"id": "781",
					"upgradeId": "223",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "68",
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
					"description": "\u589e\u52a0\u5929\u773c\u00b7\u7f1a45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"819": {
					"id": "819",
					"upgradeId": "251",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "71",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u5954\u96f7\u67aa\u7b2c\u4e09\u6bb590%\u51e0\u7387\u9020\u6210\u76ee\u6807\u611f\u7535\uff0c\u589e\u52a0\u4f24\u5bb340%\uff0c\u6301\u7eed12\u79d2\u3002"
				},
				"835": {
					"id": "835",
					"upgradeId": "254",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "71",
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
					"description": "\u589e\u52a0\u5954\u96f7\u67aa45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"884": {
					"id": "884",
					"upgradeId": "283",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "75",
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
					"description": "\u4e71\u661f\u795e\u67aa\u51cf\u5c11\u76ee\u680730\u70b9\u4f53\u529b\u3002"
				},
				"892": {
					"id": "892",
					"upgradeId": "287",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "75",
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
					"description": "\u5728\u7075\u6c14\u503c\u7eff\u8272\u6216\u7eff\u8272\u9636\u6bb5\u4ee5\u4e0a\u4f7f\u7528\u4e71\u661f\u795e\u67aa\uff0c\u670945%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff08\u84c4\u6ee1\u65f675%\u51e0\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u3002\uff09"
				},
				"947": {
					"id": "947",
					"upgradeId": "301",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f11.9\u79d2"
				},
				"962": {
					"id": "962",
					"upgradeId": "302",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "78",
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
					"description": "\u54ee\u5929\u795e\u72ac\u5bf9\u5904\u4e8e\u7834\u7532\u72b6\u6001\u7684\u76ee\u6807\u4f24\u5bb3\u63d0\u534790%"
				},
				"1022": {
					"id": "1022",
					"upgradeId": "313",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "81",
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
					"description": "\u795e\u72ac\u5420\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u5c0f10.6\u79d2"
				},
				"1043": {
					"id": "1043",
					"upgradeId": "315",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "81",
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
					"description": "\u589e\u52a0\u795e\u72ac\u542045%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"1101": {
					"id": "1101",
					"upgradeId": "322",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "83",
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
					"description": "\u75be\u5f71\u523a\u9020\u6210\u76ee\u6807\u5c01\u8109\uff0c\u6301\u7eed4.5\u79d2\u3002"
				},
				"1108": {
					"id": "1108",
					"upgradeId": "323",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "83",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u75be\u5f71\u523a\u540e\u83b7\u5f97\u96f7\u9f99\u62a4\u4e3b\u72b6\u6001\uff0c\u5438\u6536\u6700\u5927\u751f\u547d45%\u4f24\u5bb3\uff0c\u6301\u7eed20\u79d2\u3002"
				},
				"1170": {
					"id": "1170",
					"upgradeId": "337",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "87",
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
					"description": "\u589e\u52a0\u6e38\u9f99\u67aa45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"1185": {
					"id": "1185",
					"upgradeId": "338",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "87",
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
					"description": "\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537415\u79d2\uff0c\u84c4\u6ee1\u5728\u7075\u6c14\u503c\u84dd\u8272\u6216\u84dd\u8272\u9636\u6bb5\u4ee5\u4e0a\u91ca\u653e\u6e38\u9f99\u67aa50%\u51e0\u7387\u51cf\u5c11\u6240\u6709\u6280\u80fd\u51b7\u537430\u79d2\u3002"
				},
				"2141": {
					"id": "2141",
					"upgradeId": "19",
					"index": "6",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "25",
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
					"description": "\u94f6\u94a9\u94c1\u753b\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u9632\u5fa1\u529b\u51cf\u5c113%\uff0c\u6301\u7eed10\u79d2\uff0c\u6700\u591a\u53ef\u4ee5\u53e0\u52a05\u5c42\u3002"
				},
				"2147": {
					"id": "2147",
					"upgradeId": "22",
					"index": "6",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "25",
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
					"description": "\u589e\u52a0\u94f6\u94a9\u94c1\u753b45%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65705\u4e2a\u3002"
				},
				"2153": {
					"id": "2153",
					"upgradeId": "30",
					"index": "6",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "27",
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
					"description": "\u6a2a\u626b\u516b\u65b9\u5bf9\u7729\u6655\u76ee\u6807\u7684\u4f24\u5bb3\u589e\u52a090%"
				},
				"2159": {
					"id": "2159",
					"upgradeId": "32",
					"index": "6",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "27",
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
					"description": "\u589e\u52a0\u6a2a\u626b\u516b\u65b945%\u4f24\u5bb3\uff0c\u589e\u52a0\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"428": {
					"id": "428",
					"upgradeId": "58",
					"index": "0",
					"requireLevel": "16",
					"step": "14",
					"requireSpecialization1": "40",
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
					"description": "\u5f00\u542f\u9501\u5589\u67aa\u7b2c\u4e8c\u6bb5"
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