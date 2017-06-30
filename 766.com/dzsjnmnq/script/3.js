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
				"id": "3",
				"icon": "images\/role_icon6.png",
				"name": "\u725b\u9b54"
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
				"6": {
					"id": "6",
					"icon": "zx_nm_sxx",
					"name": "\u55dc\u8840\u7cfb",
					"description": "\u55dc\u8840\u4e13\u7cbe\uff1a\u6bcf\u70b9\u751f\u547d\u503c\u8f6c\u5316\u4e3a0.01\u653b\u51fb\u529b"
				},
				"7": {
					"id": "7",
					"icon": "zx_nm_qgx",
					"name": "\u6c14\u529f\u7cfb",
					"description": "\u6c14\u529f\u4e13\u7cbe\uff1a\u6bcf\u70b9\u7cbe\u51c6\u8f6c\u5316\u4e3a0.1\u653b\u51fb\u529b"
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
				"24": {
					"id": "24",
					"preSpell": "0",
					"name": "\u64bc\u5730\u9524",
					"pic": "nm_RoleSkill_0154",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210305%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14",
					"effect": {
						"1": "102",
						"18": "1940",
						"17": "1939",
						"16": "1938",
						"15": "1937",
						"14": "1936",
						"13": "1935",
						"12": "1934",
						"11": "1933",
						"10": "1932",
						"9": "1931",
						"8": "1930",
						"7": "1929",
						"6": "1928",
						"5": "1927",
						"4": "1926",
						"3": "1925",
						"2": "1924",
						"19": "1941",
						"20": "1942"
					},
					"upgrade": ["25", "26", "31", "33", "34"]
				},
				"28": {
					"id": "28",
					"preSpell": "0",
					"name": "\u9739\u96f3\u638c",
					"pic": "nm_RoleSkill_0247",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210156%+25\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210156%+25\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14",
					"effect": {
						"1": "161",
						"2": "1943",
						"3": "1944",
						"4": "1945",
						"5": "1946",
						"6": "1947",
						"7": "1948",
						"8": "1949",
						"9": "1950",
						"10": "1951",
						"11": "1952",
						"18": "1959",
						"17": "1958",
						"16": "1957",
						"15": "1956",
						"14": "1955",
						"13": "1954",
						"12": "1953",
						"19": "1960",
						"20": "1961"
					},
					"upgrade": ["36", "38", "45", "46", "47"]
				},
				"30": {
					"id": "30",
					"preSpell": "0",
					"name": "\u70c8\u8840\u65a9\u4e94\u91cd",
					"pic": "nm_RoleSkill_0081",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "1",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210300%+125\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f355%+125\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347",
					"effect": {
						"1": "941",
						"2": "1962",
						"3": "1963",
						"4": "1964",
						"5": "1965",
						"6": "1966",
						"7": "1967",
						"8": "1968",
						"9": "1969",
						"10": "1970",
						"11": "1971",
						"12": "1972",
						"13": "1973",
						"19": "1979",
						"18": "1978",
						"17": "1977",
						"16": "1976",
						"15": "1975",
						"14": "1974",
						"20": "1980"
					},
					"upgrade": ["112", "114", "116", "120", "123"]
				},
				"33": {
					"id": "33",
					"preSpell": "0",
					"name": "\u9b54\u624b\u6444\u654c",
					"pic": "nm_RoleSkill_0068",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210557%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d",
					"effect": {
						"1": "1002",
						"2": "1981",
						"3": "1982",
						"4": "1983",
						"5": "1984",
						"6": "1985",
						"7": "1986",
						"8": "1987",
						"9": "1988",
						"10": "1989",
						"11": "1990",
						"18": "1997",
						"17": "1996",
						"16": "1995",
						"15": "1994",
						"14": "1993",
						"13": "1992",
						"12": "1991",
						"19": "1998",
						"20": "1999"
					},
					"upgrade": ["134", "140", "142", "145", "148"]
				},
				"34": {
					"id": "34",
					"preSpell": "0",
					"name": "\u8840\u6708\u65a9",
					"pic": "nm_RoleSkill_0046",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a342%\/342%",
					"effect": {
						"1": "1042",
						"2": "2000",
						"3": "2001",
						"4": "2002",
						"5": "2003",
						"17": "2015",
						"16": "2014",
						"15": "2013",
						"14": "2012",
						"13": "2011",
						"12": "2010",
						"11": "2009",
						"10": "2008",
						"9": "2007",
						"8": "2006",
						"7": "2005",
						"6": "2004",
						"18": "2016",
						"19": "2017",
						"20": "2018"
					},
					"upgrade": ["161", "164", "166", "169", "173"]
				},
				"37": {
					"id": "37",
					"preSpell": "0",
					"name": "\u5d29\u5c71\u9707",
					"pic": "nm_RoleSkill_0003",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210623%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b",
					"effect": {
						"1": "1102",
						"2": "2019",
						"3": "2020",
						"14": "2031",
						"13": "2030",
						"12": "2029",
						"11": "2028",
						"10": "2027",
						"9": "2026",
						"8": "2025",
						"7": "2024",
						"6": "2023",
						"5": "2022",
						"4": "2021",
						"15": "2032",
						"16": "2033",
						"17": "2034",
						"18": "2035",
						"19": "2036",
						"20": "2037"
					},
					"upgrade": ["230", "232", "234", "238", "240"]
				},
				"38": {
					"id": "38",
					"preSpell": "0",
					"name": "\u75be\u98ce\u4e09\u91cd",
					"pic": "nm_RoleSkill_0070",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7316%\/386%\/410%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f",
					"effect": {
						"1": "1142",
						"2": "2038",
						"3": "2039",
						"4": "2040",
						"16": "2052",
						"15": "2051",
						"14": "2050",
						"13": "2049",
						"12": "2048",
						"11": "2047",
						"10": "2046",
						"9": "2045",
						"8": "2044",
						"7": "2043",
						"6": "2042",
						"5": "2041",
						"17": "2053",
						"18": "2054",
						"19": "2055",
						"20": "2056"
					},
					"upgrade": ["246", "279", "281", "285", "288"]
				},
				"41": {
					"id": "41",
					"preSpell": "0",
					"name": "\u55dc\u8840\u72c2\u6740",
					"pic": "nm_RoleSkill_0055",
					"maxStep": "20",
					"masteryId": "6",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a499\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a3.4%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001",
					"effect": {
						"1": "1182",
						"2": "2057",
						"3": "2058",
						"4": "2059",
						"5": "2060",
						"6": "2061",
						"7": "2062",
						"8": "2063",
						"18": "2073",
						"17": "2072",
						"16": "2071",
						"15": "2070",
						"14": "2069",
						"13": "2068",
						"12": "2067",
						"11": "2066",
						"10": "2065",
						"9": "2064",
						"19": "2074",
						"20": "2075"
					},
					"upgrade": ["292", "293", "294", "296", "298"]
				},
				"42": {
					"id": "42",
					"preSpell": "0",
					"name": "\u5316\u65a7\u62f3\u7f61",
					"pic": "nm_RoleSkill_0250",
					"maxStep": "20",
					"masteryId": "7",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21262%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002",
					"effect": {
						"1": "1222",
						"2": "2076",
						"3": "2077",
						"4": "2078",
						"5": "2079",
						"6": "2080",
						"7": "2081",
						"8": "2082",
						"9": "2083",
						"10": "2084",
						"11": "2085",
						"12": "2086",
						"13": "2087",
						"14": "2088",
						"15": "2089",
						"19": "2093",
						"18": "2092",
						"17": "2091",
						"16": "2090",
						"20": "2094"
					},
					"upgrade": ["303", "304", "305", "306", "307"]
				},
				"44": {
					"id": "44",
					"preSpell": "0",
					"name": "\u6311\u6740",
					"pic": "nm_RoleSkill_0152",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210507%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14",
					"effect": {
						"1": "1363",
						"2": "2095",
						"3": "2096",
						"4": "2097",
						"5": "2098",
						"17": "2110",
						"16": "2109",
						"15": "2108",
						"14": "2107",
						"13": "2106",
						"12": "2105",
						"11": "2104",
						"10": "2103",
						"9": "2102",
						"8": "2101",
						"7": "2100",
						"6": "2099",
						"18": "2111",
						"19": "2112",
						"20": "2113"
					},
					"upgrade": ["339", "340", "341", "342", "343"]
				},
				"46": {
					"id": "46",
					"preSpell": "0",
					"name": "\u6012\u5578\u957f\u5929",
					"pic": "nm_RoleSkill_0040",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d145\u70b9\u6012\u6c14",
					"effect": {
						"1": "1403",
						"2": "2114",
						"3": "2115",
						"14": "2126",
						"13": "2125",
						"12": "2124",
						"11": "2123",
						"10": "2122",
						"9": "2121",
						"8": "2120",
						"7": "2119",
						"6": "2118",
						"5": "2117",
						"4": "2116",
						"15": "2127",
						"16": "2128",
						"17": "2129",
						"18": "2130",
						"19": "2131",
						"20": "2132"
					},
					"upgrade": ["345", "347", "349", "351", "353"]
				},
				"47": {
					"id": "47",
					"preSpell": "0",
					"name": "\u65cb\u9f99\u6740",
					"pic": "nm_RoleSkill_0035",
					"maxStep": "20",
					"masteryId": "6",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210500%\u4f24\u5bb3",
					"effect": {
						"1": "1423",
						"14": "2145",
						"13": "2144",
						"12": "2143",
						"11": "2142",
						"10": "2141",
						"9": "2140",
						"8": "2139",
						"7": "2138",
						"6": "2137",
						"5": "2136",
						"4": "2135",
						"3": "2134",
						"2": "2133",
						"15": "2146",
						"16": "2147",
						"17": "2148",
						"18": "2149",
						"19": "2150",
						"20": "2151"
					},
					"upgrade": ["354", "355", "357", "359", "361"]
				},
				"49": {
					"id": "49",
					"preSpell": "0",
					"name": "\u60ac\u70bd\u73e0",
					"pic": "nm_RoleSkill_0251",
					"maxStep": "20",
					"masteryId": "7",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210160%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3",
					"effect": {
						"1": "1483",
						"2": "2152",
						"3": "2153",
						"4": "2154",
						"5": "2155",
						"6": "2156",
						"17": "2167",
						"16": "2166",
						"15": "2165",
						"14": "2164",
						"13": "2163",
						"12": "2162",
						"11": "2161",
						"10": "2160",
						"9": "2159",
						"8": "2158",
						"7": "2157",
						"18": "2168",
						"19": "2169",
						"20": "2170"
					},
					"upgrade": ["365", "367", "369", "371", "373"]
				},
				"50": {
					"id": "50",
					"preSpell": "0",
					"name": "\u4e71\u98ce\u62f3",
					"pic": "nm_RoleSkill_0170",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210108%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u62101338%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002",
					"effect": {
						"1": "1503",
						"2": "2171",
						"3": "2172",
						"4": "2173",
						"5": "2174",
						"6": "2175",
						"7": "2176",
						"8": "2177",
						"18": "2187",
						"17": "2186",
						"16": "2185",
						"15": "2184",
						"14": "2183",
						"13": "2182",
						"12": "2181",
						"11": "2180",
						"10": "2179",
						"9": "2178",
						"19": "2188",
						"20": "2189"
					},
					"upgrade": ["374", "375", "376", "377", "378"]
				},
				"52": {
					"id": "52",
					"preSpell": "0",
					"name": "\u5de8\u65cb\u98ce",
					"pic": "nm_RoleSkill_0220",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621091%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653648%\u7684\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1543",
						"2": "2228",
						"3": "2229",
						"4": "2230",
						"5": "2231",
						"6": "2232",
						"7": "2233",
						"8": "2234",
						"18": "2244",
						"17": "2243",
						"16": "2242",
						"15": "2241",
						"14": "2240",
						"13": "2239",
						"12": "2238",
						"11": "2237",
						"10": "2236",
						"9": "2235",
						"19": "2245",
						"20": "2246"
					},
					"upgrade": ["382", "384", "386", "387", "388"]
				},
				"54": {
					"id": "54",
					"preSpell": "0",
					"name": "\u88c2\u5730\u8bc0",
					"pic": "nm_RoleSkill_0156",
					"maxStep": "20",
					"masteryId": "6",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102771%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2678%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1",
					"effect": {
						"1": "1583",
						"2": "2190",
						"3": "2191",
						"4": "2192",
						"5": "2193",
						"6": "2194",
						"17": "2205",
						"16": "2204",
						"15": "2203",
						"14": "2202",
						"13": "2201",
						"12": "2200",
						"11": "2199",
						"10": "2198",
						"9": "2197",
						"8": "2196",
						"7": "2195",
						"18": "2206",
						"19": "2207",
						"20": "2208"
					},
					"upgrade": ["389", "390", "391", "392", "393"]
				},
				"56": {
					"id": "56",
					"preSpell": "0",
					"name": "\u88c2\u9b54\u7206",
					"pic": "nm_RoleSkill_0248",
					"maxStep": "20",
					"masteryId": "7",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210191%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002",
					"effect": {
						"1": "1603",
						"2": "2209",
						"3": "2210",
						"4": "2211",
						"5": "2212",
						"17": "2224",
						"16": "2223",
						"15": "2222",
						"14": "2221",
						"13": "2220",
						"12": "2219",
						"11": "2218",
						"10": "2217",
						"9": "2216",
						"8": "2215",
						"7": "2214",
						"6": "2213",
						"18": "2225",
						"19": "2226",
						"20": "2227"
					},
					"upgrade": ["395", "396", "397", "398", "399"]
				}
			},
			"specializationSpellEffect": {
				"102": {
					"id": "102",
					"specializationId": "24",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210305%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1940": {
					"id": "1940",
					"specializationId": "24",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210550%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1939": {
					"id": "1939",
					"specializationId": "24",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210535%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1938": {
					"id": "1938",
					"specializationId": "24",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210520%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n   \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1937": {
					"id": "1937",
					"specializationId": "24",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210505%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n  \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1936": {
					"id": "1936",
					"specializationId": "24",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210490%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1935": {
					"id": "1935",
					"specializationId": "24",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210475%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1934": {
					"id": "1934",
					"specializationId": "24",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210460%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1933": {
					"id": "1933",
					"specializationId": "24",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210446%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1932": {
					"id": "1932",
					"specializationId": "24",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210432%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1931": {
					"id": "1931",
					"specializationId": "24",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210418%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1930": {
					"id": "1930",
					"specializationId": "24",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210404%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1929": {
					"id": "1929",
					"specializationId": "24",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "28",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210390%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1928": {
					"id": "1928",
					"specializationId": "24",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210375%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1927": {
					"id": "1927",
					"specializationId": "24",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210361%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1926": {
					"id": "1926",
					"specializationId": "24",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210347%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1925": {
					"id": "1925",
					"specializationId": "24",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210333%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1924": {
					"id": "1924",
					"specializationId": "24",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210319%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"161": {
					"id": "161",
					"specializationId": "28",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210156%+25\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210156%+25\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1943": {
					"id": "1943",
					"specializationId": "28",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210164%+41\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210164%+41\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1944": {
					"id": "1944",
					"specializationId": "28",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210171%+56\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210171%+56\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1945": {
					"id": "1945",
					"specializationId": "28",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210179%+71\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210179%+71\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1946": {
					"id": "1946",
					"specializationId": "28",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210186%+84\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210186%+84\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1947": {
					"id": "1947",
					"specializationId": "28",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210193%+96\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210193%+96\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1948": {
					"id": "1948",
					"specializationId": "28",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "28",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210201%+107\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210201%+107\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1949": {
					"id": "1949",
					"specializationId": "28",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210209%+118\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210209%+118\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1950": {
					"id": "1950",
					"specializationId": "28",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210216%+127\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210216%+127\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1951": {
					"id": "1951",
					"specializationId": "28",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210224%+136\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210224%+136\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1952": {
					"id": "1952",
					"specializationId": "28",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210231%+144\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210231%+144\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1959": {
					"id": "1959",
					"specializationId": "28",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210286%+197\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210286%+197\u4f24\u5bb3\u3002\r\n  \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1958": {
					"id": "1958",
					"specializationId": "28",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210278%+189\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210278%+189\u4f24\u5bb3\u3002\r\n \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1957": {
					"id": "1957",
					"specializationId": "28",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210270%+181\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210270%+181\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1956": {
					"id": "1956",
					"specializationId": "28",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210262%+173\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210262%+173\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1955": {
					"id": "1955",
					"specializationId": "28",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210254%+165\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210254%+165\u4f24\u5bb3\u3002\r\n \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1954": {
					"id": "1954",
					"specializationId": "28",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210246%+157\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210246%+157\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1953": {
					"id": "1953",
					"specializationId": "28",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210238%+151\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210238%+151\u4f24\u5bb3\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"941": {
					"id": "941",
					"specializationId": "30",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210224%+27\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f286%+27\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1962": {
					"id": "1962",
					"specializationId": "30",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "10",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210236%+44\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f300%+44\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1963": {
					"id": "1963",
					"specializationId": "30",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210246%+60\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f313%+60\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1964": {
					"id": "1964",
					"specializationId": "30",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210256%+75\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f327%+75\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1965": {
					"id": "1965",
					"specializationId": "30",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210268%+89\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f340%+89\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1966": {
					"id": "1966",
					"specializationId": "30",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210278%+102\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f354%+102\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1967": {
					"id": "1967",
					"specializationId": "30",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210289%+114\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f368%+114\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1968": {
					"id": "1968",
					"specializationId": "30",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210300%+126\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f381%+126\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1969": {
					"id": "1969",
					"specializationId": "30",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210310%+136\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f395%+136\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1970": {
					"id": "1970",
					"specializationId": "30",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210321%+145\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f409%+145\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1971": {
					"id": "1971",
					"specializationId": "30",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",

					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210332%+153\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f423%+153\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1972": {
					"id": "1972",
					"specializationId": "30",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210343%+161\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f436%+161\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1973": {
					"id": "1973",
					"specializationId": "30",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210353%+167\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f450%+167\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1979": {
					"id": "1979",
					"specializationId": "30",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210413%+215\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f534%+215\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1978": {
					"id": "1978",
					"specializationId": "30",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210403%+207\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f520%+207\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1977": {
					"id": "1977",
					"specializationId": "30",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210393%+199\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f506%+199\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1976": {
					"id": "1976",
					"specializationId": "30",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210383%+191\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f492%+191\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1975": {
					"id": "1975",
					"specializationId": "30",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210373%+183\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f478%+183\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1974": {
					"id": "1974",
					"specializationId": "30",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210363%+175\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f464%+175\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1002": {
					"id": "1002",
					"specializationId": "33",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210403%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1981": {
					"id": "1981",
					"specializationId": "33",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210403%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1982": {
					"id": "1982",
					"specializationId": "33",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210403%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1983": {
					"id": "1983",
					"specializationId": "33",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210403%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1984": {
					"id": "1984",
					"specializationId": "33",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210403%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1985": {
					"id": "1985",
					"specializationId": "33",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210419%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1986": {
					"id": "1986",
					"specializationId": "33",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210436%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1987": {
					"id": "1987",
					"specializationId": "33",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210452%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1988": {
					"id": "1988",
					"specializationId": "33",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210468%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1989": {
					"id": "1989",
					"specializationId": "33",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210484%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1990": {
					"id": "1990",
					"specializationId": "33",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210500%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1997": {
					"id": "1997",
					"specializationId": "33",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210612%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1996": {
					"id": "1996",
					"specializationId": "33",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210596%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1995": {
					"id": "1995",
					"specializationId": "33",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210580%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1994": {
					"id": "1994",
					"specializationId": "33",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210564%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1993": {
					"id": "1993",
					"specializationId": "33",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210548%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1992": {
					"id": "1992",
					"specializationId": "33",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210532%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1991": {
					"id": "1991",
					"specializationId": "33",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210516%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1042": {
					"id": "1042",
					"specializationId": "34",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a186%\/186%"
				},
				"2000": {
					"id": "2000",
					"specializationId": "34",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a195%\/195%"
				},
				"2001": {
					"id": "2001",
					"specializationId": "34",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a203%\/203%"
				},
				"2002": {
					"id": "2002",
					"specializationId": "34",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a212%\/212%"
				},
				"2003": {
					"id": "2003",
					"specializationId": "34",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a221%\/221%"
				},
				"2015": {
					"id": "2015",
					"specializationId": "34",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a326%\/326%"
				},
				"2014": {
					"id": "2014",
					"specializationId": "34",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a317%\/317%"
				},
				"2013": {
					"id": "2013",
					"specializationId": "34",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a308%\/308%"
				},
				"2012": {
					"id": "2012",
					"specializationId": "34",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a300%\/300%"
				},
				"2011": {
					"id": "2011",
					"specializationId": "34",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a291%\/291%"
				},
				"2010": {
					"id": "2010",
					"specializationId": "34",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a282%\/282%"
				},
				"2009": {
					"id": "2009",
					"specializationId": "34",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a273%\/273%"
				},
				"2008": {
					"id": "2008",
					"specializationId": "34",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a265%\/265%"
				},
				"2007": {
					"id": "2007",
					"specializationId": "34",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a256%\/256%"
				},
				"2006": {
					"id": "2006",
					"specializationId": "34",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a247%\/247%"
				},
				"2005": {
					"id": "2005",
					"specializationId": "34",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a238%\/238%"
				},
				"2004": {
					"id": "2004",
					"specializationId": "34",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a230%\/230%"
				},
				"1102": {
					"id": "1102",
					"specializationId": "37",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210327%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2019": {
					"id": "2019",
					"specializationId": "37",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210343%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2020": {
					"id": "2020",
					"specializationId": "37",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210358%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2031": {
					"id": "2031",
					"specializationId": "37",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210528%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2030": {
					"id": "2030",
					"specializationId": "37",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210512%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2029": {
					"id": "2029",
					"specializationId": "37",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210497%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2028": {
					"id": "2028",
					"specializationId": "37",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210481%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2027": {
					"id": "2027",
					"specializationId": "37",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210466%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2026": {
					"id": "2026",
					"specializationId": "37",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210450%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2025": {
					"id": "2025",
					"specializationId": "37",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210435%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2024": {
					"id": "2024",
					"specializationId": "37",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210420%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2023": {
					"id": "2023",
					"specializationId": "37",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210404%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2022": {
					"id": "2022",
					"specializationId": "37",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210389%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2021": {
					"id": "2021",
					"specializationId": "37",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210373%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"1142": {
					"id": "1142",
					"specializationId": "38",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7263%\/296%\/329%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2038": {
					"id": "2038",
					"specializationId": "38",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7276%\/310%\/345%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2039": {
					"id": "2039",
					"specializationId": "38",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7288%\/324%\/360%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2040": {
					"id": "2040",
					"specializationId": "38",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7301%\/338%\/376%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2052": {
					"id": "2052",
					"specializationId": "38",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7453%\/507%\/565%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2051": {
					"id": "2051",
					"specializationId": "38",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7440%\/493%\/549%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2050": {
					"id": "2050",
					"specializationId": "38",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7427%\/479%\/533%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2049": {
					"id": "2049",
					"specializationId": "38",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7414%\/465%\/517%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2048": {
					"id": "2048",
					"specializationId": "38",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7401%\/451%\/501%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2047": {
					"id": "2047",
					"specializationId": "38",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7389%\/437%\/486%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2046": {
					"id": "2046",
					"specializationId": "38",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7376%\/423%\/470%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2045": {
					"id": "2045",
					"specializationId": "38",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7363%\/409%\/454%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2044": {
					"id": "2044",
					"specializationId": "38",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7351%\/395%\/439%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2043": {
					"id": "2043",
					"specializationId": "38",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7338%\/381%\/423%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2042": {
					"id": "2042",
					"specializationId": "38",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7326%\/367%\/407%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2041": {
					"id": "2041",
					"specializationId": "38",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7313%\/352%\/392%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"1182": {
					"id": "1182",
					"specializationId": "41",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a114\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a10%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2057": {
					"id": "2057",
					"specializationId": "41",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a124\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a10.2%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2058": {
					"id": "2058",
					"specializationId": "41",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a141\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a10.4%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2059": {
					"id": "2059",
					"specializationId": "41",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a156\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a10.6%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2060": {
					"id": "2060",
					"specializationId": "41",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "23",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a172\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a10.8%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2061": {
					"id": "2061",
					"specializationId": "41",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a187\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a11%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2062": {
					"id": "2062",
					"specializationId": "41",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a201\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a11.2%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2063": {
					"id": "2063",
					"specializationId": "41",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a213\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a11.4%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2073": {
					"id": "2073",
					"specializationId": "41",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a405\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a13.4%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2072": {
					"id": "2072",
					"specializationId": "41",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a381\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a13.2%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2071": {
					"id": "2071",
					"specializationId": "41",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a357\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a13%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2070": {
					"id": "2070",
					"specializationId": "41",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a333\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a12.8%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2069": {
					"id": "2069",
					"specializationId": "41",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a319\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a12.6%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2068": {
					"id": "2068",
					"specializationId": "41",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a295\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a12.4%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2067": {
					"id": "2067",
					"specializationId": "41",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a271\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a12.2%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2066": {
					"id": "2066",
					"specializationId": "41",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a249\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a12%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2065": {
					"id": "2065",
					"specializationId": "41",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a238\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a11.8%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2064": {
					"id": "2064",
					"specializationId": "41",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a226\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a11.6%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"1222": {
					"id": "1222",
					"specializationId": "42",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21139%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2076": {
					"id": "2076",
					"specializationId": "42",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21146%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2077": {
					"id": "2077",
					"specializationId": "42",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21152%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2078": {
					"id": "2078",
					"specializationId": "42",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21158%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2079": {
					"id": "2079",
					"specializationId": "42",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "23",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21165%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2080": {
					"id": "2080",
					"specializationId": "42",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21171%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2081": {
					"id": "2081",
					"specializationId": "42",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21178%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2082": {
					"id": "2082",
					"specializationId": "42",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21184%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2083": {
					"id": "2083",
					"specializationId": "42",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21191%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2084": {
					"id": "2084",
					"specializationId": "42",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21197%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2085": {
					"id": "2085",
					"specializationId": "42",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21204%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2086": {
					"id": "2086",
					"specializationId": "42",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21210%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2087": {
					"id": "2087",
					"specializationId": "42",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21217%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2088": {
					"id": "2088",
					"specializationId": "42",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21223%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2089": {
					"id": "2089",
					"specializationId": "42",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21230%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2093": {
					"id": "2093",
					"specializationId": "42",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21256%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2092": {
					"id": "2092",
					"specializationId": "42",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21249%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2091": {
					"id": "2091",
					"specializationId": "42",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21243%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2090": {
					"id": "2090",
					"specializationId": "42",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21236%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"1363": {
					"id": "1363",
					"specializationId": "44",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210266%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2095": {
					"id": "2095",
					"specializationId": "44",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210279%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2096": {
					"id": "2096",
					"specializationId": "44",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210291%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2097": {
					"id": "2097",
					"specializationId": "44",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210304%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2098": {
					"id": "2098",
					"specializationId": "44",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210317%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2110": {
					"id": "2110",
					"specializationId": "44",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210470%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n   \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2109": {
					"id": "2109",
					"specializationId": "44",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210457%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n  \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2108": {
					"id": "2108",
					"specializationId": "44",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210444%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2107": {
					"id": "2107",
					"specializationId": "44",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210431%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2106": {
					"id": "2106",
					"specializationId": "44",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210418%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2105": {
					"id": "2105",
					"specializationId": "44",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210405%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2104": {
					"id": "2104",
					"specializationId": "44",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210393%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2103": {
					"id": "2103",
					"specializationId": "44",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210380%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2102": {
					"id": "2102",
					"specializationId": "44",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210367%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2101": {
					"id": "2101",
					"specializationId": "44",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210355%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2100": {
					"id": "2100",
					"specializationId": "44",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210342%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2099": {
					"id": "2099",
					"specializationId": "44",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210329%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"1403": {
					"id": "1403",
					"specializationId": "46",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d50\u70b9\u6012\u6c14"
				},
				"2114": {
					"id": "2114",
					"specializationId": "46",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d55\u70b9\u6012\u6c14"
				},
				"2115": {
					"id": "2115",
					"specializationId": "46",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d60\u70b9\u6012\u6c14"
				},
				"2126": {
					"id": "2126",
					"specializationId": "46",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d115\u70b9\u6012\u6c14"
				},
				"2125": {
					"id": "2125",
					"specializationId": "46",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d50\u70b9\u6012\u6c14"
				},
				"2124": {
					"id": "2124",
					"specializationId": "46",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d105\u70b9\u6012\u6c14"
				},
				"2123": {
					"id": "2123",
					"specializationId": "46",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d100\u70b9\u6012\u6c14"
				},
				"2122": {
					"id": "2122",
					"specializationId": "46",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d95\u70b9\u6012\u6c14"
				},
				"2121": {
					"id": "2121",
					"specializationId": "46",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d90\u70b9\u6012\u6c14"
				},
				"2120": {
					"id": "2120",
					"specializationId": "46",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d85\u70b9\u6012\u6c14"
				},
				"2119": {
					"id": "2119",
					"specializationId": "46",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d80\u70b9\u6012\u6c14"
				},
				"2118": {
					"id": "2118",
					"specializationId": "46",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d75\u70b9\u6012\u6c14"
				},
				"2117": {
					"id": "2117",
					"specializationId": "46",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d70\u70b9\u6012\u6c14"
				},
				"2116": {
					"id": "2116",
					"specializationId": "46",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d65\u70b9\u6012\u6c14"
				},
				"1423": {
					"id": "1423",
					"specializationId": "47",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210134%\u4f24\u5bb3"
				},
				"2145": {
					"id": "2145",
					"specializationId": "47",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210216%\u4f24\u5bb3"
				},
				"2144": {
					"id": "2144",
					"specializationId": "47",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210134%\u4f24\u5bb3"
				},
				"2143": {
					"id": "2143",
					"specializationId": "47",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210202%\u4f24\u5bb3"
				},
				"2142": {
					"id": "2142",
					"specializationId": "47",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210192%\u4f24\u5bb3"
				},
				"2141": {
					"id": "2141",
					"specializationId": "47",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210190%\u4f24\u5bb3"
				},
				"2140": {
					"id": "2140",
					"specializationId": "47",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210184%\u4f24\u5bb3"
				},
				"2139": {
					"id": "2139",
					"specializationId": "47",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210178%\u4f24\u5bb3"
				},
				"2138": {
					"id": "2138",
					"specializationId": "47",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210171%\u4f24\u5bb3"
				},
				"2137": {
					"id": "2137",
					"specializationId": "47",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210165%\u4f24\u5bb3"
				},
				"2136": {
					"id": "2136",
					"specializationId": "47",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210159%\u4f24\u5bb3"
				},
				"2135": {
					"id": "2135",
					"specializationId": "47",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210153%\u4f24\u5bb3"
				},
				"2134": {
					"id": "2134",
					"specializationId": "47",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210146%\u4f24\u5bb3"
				},
				"2133": {
					"id": "2133",
					"specializationId": "47",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210140%\u4f24\u5bb3"
				},
				"1483": {
					"id": "1483",
					"specializationId": "49",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u621084%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2152": {
					"id": "2152",
					"specializationId": "49",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u621088%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2153": {
					"id": "2153",
					"specializationId": "49",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u621092%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2154": {
					"id": "2154",
					"specializationId": "49",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u621096%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2155": {
					"id": "2155",
					"specializationId": "49",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210100%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2156": {
					"id": "2156",
					"specializationId": "49",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210104%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2167": {
					"id": "2167",
					"specializationId": "49",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210148%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2166": {
					"id": "2166",
					"specializationId": "49",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210144%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2165": {
					"id": "2165",
					"specializationId": "49",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210140%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2164": {
					"id": "2164",
					"specializationId": "49",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210136%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2163": {
					"id": "2163",
					"specializationId": "49",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210132%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2162": {
					"id": "2162",
					"specializationId": "49",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210128%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2161": {
					"id": "2161",
					"specializationId": "49",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210124%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2160": {
					"id": "2160",
					"specializationId": "49",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210120%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2159": {
					"id": "2159",
					"specializationId": "49",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210116%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2158": {
					"id": "2158",
					"specializationId": "49",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210112%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2157": {
					"id": "2157",
					"specializationId": "49",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210108%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"1503": {
					"id": "1503",
					"specializationId": "50",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621080%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210595%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2171": {
					"id": "2171",
					"specializationId": "50",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621083%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210623%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2172": {
					"id": "2172",
					"specializationId": "50",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621087%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210651%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2173": {
					"id": "2173",
					"specializationId": "50",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621091%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210379%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2174": {
					"id": "2174",
					"specializationId": "50",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621095%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210707%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2175": {
					"id": "2175",
					"specializationId": "50",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621098%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210735%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2176": {
					"id": "2176",
					"specializationId": "50",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210102%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210763%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2177": {
					"id": "2177",
					"specializationId": "50",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210106%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210791%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2187": {
					"id": "2187",
					"specializationId": "50",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210145%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u62101051%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2186": {
					"id": "2186",
					"specializationId": "50",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210141%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u62101033%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2185": {
					"id": "2185",
					"specializationId": "50",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621080%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210595%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2184": {
					"id": "2184",
					"specializationId": "50",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210133%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210987%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2183": {
					"id": "2183",
					"specializationId": "50",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u621080%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210595%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2182": {
					"id": "2182",
					"specializationId": "50",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210125%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210931%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2181": {
					"id": "2181",
					"specializationId": "50",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210121%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210903%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2180": {
					"id": "2180",
					"specializationId": "50",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210117%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210875%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2179": {
					"id": "2179",
					"specializationId": "50",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210113%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210847%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2178": {
					"id": "2178",
					"specializationId": "50",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210110%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u6210819%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"1543": {
					"id": "1543",
					"specializationId": "52",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621046%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653610%\u7684\u4f24\u5bb3\u3002"
				},
				"2228": {
					"id": "2228",
					"specializationId": "52",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621048%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653614%\u7684\u4f24\u5bb3\u3002"
				},
				"2229": {
					"id": "2229",
					"specializationId": "52",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621051\u63a9\u62a4\u4f60\uff0c\u5438\u653618%\u7684\u4f24\u5bb3\u3002"
				},
				"2230": {
					"id": "2230",
					"specializationId": "52",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621053%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653622%\u7684\u4f24\u5bb3\u3002"
				},
				"2231": {
					"id": "2231",
					"specializationId": "52",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621055%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653625%\u7684\u4f24\u5bb3\u3002"
				},
				"2232": {
					"id": "2232",
					"specializationId": "52",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621057%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653628%\u7684\u4f24\u5bb3\u3002"
				},
				"2233": {
					"id": "2233",
					"specializationId": "52",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621059%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653631%\u7684\u4f24\u5bb3\u3002"
				},
				"2234": {
					"id": "2234",
					"specializationId": "52",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621062%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653633%\u7684\u4f24\u5bb3\u3002"
				},
				"2244": {
					"id": "2244",
					"specializationId": "52",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621082%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653652%\u7684\u4f24\u5bb3\u3002"
				},
				"2243": {
					"id": "2243",
					"specializationId": "52",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621080%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653650%\u7684\u4f24\u5bb3\u3002"
				},
				"2242": {
					"id": "2242",
					"specializationId": "52",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621078%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653648%\u7684\u4f24\u5bb3\u3002"
				},
				"2241": {
					"id": "2241",
					"specializationId": "52",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621076%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653646%\u7684\u4f24\u5bb3\u3002"
				},
				"2240": {
					"id": "2240",
					"specializationId": "52",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621074%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653644%\u7684\u4f24\u5bb3\u3002"
				},
				"2239": {
					"id": "2239",
					"specializationId": "52",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621072%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653642%\u7684\u4f24\u5bb3\u3002"
				},
				"2238": {
					"id": "2238",
					"specializationId": "52",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621070%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653640%\u7684\u4f24\u5bb3\u3002"
				},
				"2237": {
					"id": "2237",
					"specializationId": "52",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621068%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653639%\u7684\u4f24\u5bb3\u3002"
				},
				"2236": {
					"id": "2236",
					"specializationId": "52",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621066%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653637%\u7684\u4f24\u5bb3\u3002"
				},
				"2235": {
					"id": "2235",
					"specializationId": "52",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621064%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653635%\u7684\u4f24\u5bb3\u3002"
				},
				"1583": {
					"id": "1583",
					"specializationId": "54",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "0",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62101515%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2379%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2190": {
					"id": "2190",
					"specializationId": "54",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62101585%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2396%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2191": {
					"id": "2191",
					"specializationId": "54",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62101655%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2414%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2192": {
					"id": "2192",
					"specializationId": "54",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62101720%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2431%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2193": {
					"id": "2193",
					"specializationId": "54",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62101794%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2448%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2194": {
					"id": "2194",
					"specializationId": "54",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62101864%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2466%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2205": {
					"id": "2205",
					"specializationId": "54",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102629%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2658%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2204": {
					"id": "2204",
					"specializationId": "54",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102560%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2640%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2203": {
					"id": "2203",
					"specializationId": "54",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102490%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2623%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2202": {
					"id": "2202",
					"specializationId": "54",

					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102421%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2605%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2201": {
					"id": "2201",
					"specializationId": "54",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102351%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2588%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2200": {
					"id": "2200",
					"specializationId": "54",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102282%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2570%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2199": {
					"id": "2199",
					"specializationId": "54",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102212%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2553%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2198": {
					"id": "2198",
					"specializationId": "54",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102142%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2538%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2197": {
					"id": "2197",
					"specializationId": "54",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102073%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2518%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2196": {
					"id": "2196",
					"specializationId": "54",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102003%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2501%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2195": {
					"id": "2195",
					"specializationId": "54",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62101933%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2483%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"1603": {
					"id": "1603",
					"specializationId": "56",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "0",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210111%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2209": {
					"id": "2209",
					"specializationId": "56",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210116%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2210": {
					"id": "2210",
					"specializationId": "56",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210121%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2211": {
					"id": "2211",
					"specializationId": "56",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210126%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2212": {
					"id": "2212",
					"specializationId": "56",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210131%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2224": {
					"id": "2224",
					"specializationId": "56",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210194%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2223": {
					"id": "2223",
					"specializationId": "56",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210189%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2222": {
					"id": "2222",
					"specializationId": "56",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210184%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2221": {
					"id": "2221",
					"specializationId": "56",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210179%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2220": {
					"id": "2220",
					"specializationId": "56",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210172%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2219": {
					"id": "2219",
					"specializationId": "56",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210167%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2218": {
					"id": "2218",
					"specializationId": "56",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210162%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2217": {
					"id": "2217",
					"specializationId": "56",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210157%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2216": {
					"id": "2216",
					"specializationId": "56",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",

					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210151%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2215": {
					"id": "2215",
					"specializationId": "56",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210146%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2214": {
					"id": "2214",
					"specializationId": "56",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210141%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2213": {
					"id": "2213",
					"specializationId": "56",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210136%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"1941": {
					"id": "1941",
					"specializationId": "24",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210550%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n  \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1942": {
					"id": "1942",
					"specializationId": "24",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "7.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u5411\u524d\u77ed\u8ddd\u79bb\u8df3\u8dc3\u5e76\u7528\u6b66\u5668\u7838\u5f00\u5730\u9762\uff0c\u5bf9\u5706\u5f62\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210559%\u4f24\u5bb3\u3002\u540c\u65f6\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u9738\u4f53\u72b6\u6001\u3002\u64bc\u5730\u9524\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a4\u6012\u6c14"
				},
				"1960": {
					"id": "1960",
					"specializationId": "28",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210290%+201\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210290%+201\u4f24\u5bb3\u3002\r\n   \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1961": {
					"id": "1961",
					"specializationId": "28",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "4\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u805a\u6c14\u4e8e\u638c\u4e0a\u6253\u51fa\u4e00\u9897\u6c14\u529f\u5f39\uff0c\u5bf9\u654c\u4eba\u9020\u6210298%+206\u4f24\u5bb3\uff0c\u540c\u65f6\u725b\u9b54\u63a5\u4e0b\u6765\u76845\u79d2\u4f1a\u7528\u66f4\u8fc5\u6377\u7684\u62f3\u672f\u53d1\u52a8\u6c14\u529f\u5f39\uff0c\u6bcf\u51fb\u9020\u6210298%+206\u4f24\u5bb3\u3002\r\n    \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a3\u6012\u6c14"
				},
				"1980": {
					"id": "1980",
					"specializationId": "30",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "2\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7684\u666e\u901a\u653b\u51fb\u6280\u80fd\u70c8\u8840\u4e09\u5f0f\u8ffd\u52a0\u70c8\u8840\u5203\u7b2c4\/5\u5f0f\uff0c\u7b2c4\u5f0f\u5bf9\u524d\u65b9\u6247\u5f62\u533a\u57df\u654c\u4eba\u9020\u6210423%+223\u4f24\u5bb3\uff0c\u7b2c5\u5f0f\u5bf9\u66f4\u5927\u8303\u56f4\u7684\u654c\u4eba\u4ea7\u751f548%+223\u4f24\u5bb3\u5e76\u5c06\u654c\u4eba\u51fb\u9000\u3002\u540c\u65f6\u4f60\u7684\u70c8\u8840\u65a9\u7b2c1\/2\/3\u5f0f\u4f24\u5bb3\u4f1a\u63d0\u5347"
				},
				"1998": {
					"id": "1998",
					"specializationId": "33",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210628%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"1999": {
					"id": "1999",
					"specializationId": "33",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u9b54\u624b\u6293\u53d6\u524d\u65b9\u7684\u654c\u4eba\uff0c\u6293\u4e2d\u654c\u4eba\u540e\u9b54\u624b\u5e7b\u5316\u4e3a\u9b54\u9635\u5e76\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5438\u5230\u9635\u4e2d\u5fc3\uff0c\u5e76\u9020\u6210644%\u7684\u4f24\u5bb3\u3002\u84c4\u6ee1\u529b\u540e\u6280\u80fd\u7684\u5f62\u6001\u6539\u53d8\uff0c\u53d8\u4e3a\u76f4\u63a5\u6293\u53d6\u6b63\u524d\u65b9\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u5e76\u5438\u5f15\u5230\u81ea\u8eab\u8eab\u524d"
				},
				"2016": {
					"id": "2016",
					"specializationId": "34",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a335%\/335%"
				},
				"2017": {
					"id": "2017",
					"specializationId": "34",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a344%\/344%"
				},
				"2018": {
					"id": "2018",
					"specializationId": "34",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8f6c\u8eab\u5e76\u6325\u821e\u6b66\u5668\u4ea7\u751f\u4e00\u4e2a\u534a\u6708\u5f62\u6c14\u6d6a\uff0c\u6c14\u6d6a\u5411\u524d\u63a8\u8fdb\u5e76\u51fb\u9000\u654c\u4eba\uff0c\u6700\u591a\u9020\u6210\u4e24\u6b21\u4f24\u5bb3\uff0c\u4f24\u5bb3\u503c\u5206\u522b\u4e3a353%\/353%"
				},
				"2032": {
					"id": "2032",
					"specializationId": "37",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210543%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2033": {
					"id": "2033",
					"specializationId": "37",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210559%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2034": {
					"id": "2034",
					"specializationId": "37",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210574%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2035": {
					"id": "2035",
					"specializationId": "37",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210590%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2036": {
					"id": "2036",
					"specializationId": "37",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210605%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2037": {
					"id": "2037",
					"specializationId": "37",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "12.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5bf9\u9762\u524d\u77e9\u5f62\u8303\u56f4\u5185\u7684\u654c\u4eba\u9020\u6210621%\u4f24\u5bb3\uff0c\u5e76\u670940%\u6982\u7387\u5bfc\u81f4\u65ad\u7b4b"
				},
				"2053": {
					"id": "2053",
					"specializationId": "38",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7466%\/521%\/581%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2054": {
					"id": "2054",
					"specializationId": "38",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7479%\/535%\/597%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2055": {
					"id": "2055",
					"specializationId": "38",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7492%\/549%\/613%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2056": {
					"id": "2056",
					"specializationId": "38",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "8\u7c73",
					"castCost": "",
					"cooldown": "13.5\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53d1\u52a8\u591a\u6b21\u8fde\u7eed\u5f3a\u529b\u51b2\u950b\uff0c\u88ab\u649e\u51fb\u7684\u654c\u4eba\u5c06\u627f\u53d7505%\/554%\/629%\u4f24\u5bb3\uff0c\u7b2c2\/3\u51fb\u9700\u8981\u88ab\u52a8\u6280\u80fd\u5f00\u542f"
				},
				"2074": {
					"id": "2074",
					"specializationId": "41",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",
					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a429\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a13.6%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2075": {
					"id": "2075",
					"specializationId": "41",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "200\u6012\u6c14",

					"cooldown": "20.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fdb\u5165\u72c2\u66b4\u7684\u55dc\u8840\u72b6\u6001\uff0c\u653b\u51fb\u529b\u63d0\u9ad8\u6700\u591a453\u70b9\uff0c\u6bcf\u6b21\u653b\u51fb\u9020\u6210\u7684\u4f24\u5bb3\u503c\u4f1a\u6709\u6700\u591a13.8%\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\uff0c\u542f\u52a8\u6280\u80fd\u7684\u77ac\u95f4\u751f\u547d\u503c\u8d8a\u4f4e\uff0c\u5219\u6548\u679c\u8d8a\u597d\u3002\u6548\u679c\u6301\u7eed20\u79d2\uff0c\u53ef\u4ee5\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u5173\u95ed\u566c\u8840\u72c2\u6740\u72b6\u6001"
				},
				"2094": {
					"id": "2094",
					"specializationId": "42",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "0.1\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8fd0\u8f6c\u6c14\u529f\uff0c\u5c06\u624b\u4e2d\u6b66\u5668\u5316\u4e3a\u5f3a\u5927\u62f3\u6c14\u3002\u4f60\u7684\u9739\u96f3\u638c\u53d8\u4e3a\u9694\u7a7a\u5bf9\u5355\u4e2a\u654c\u4eba\u53d1\u52a8\u9ad8\u4f24\u5bb3\u8fde\u73af\u8f70\u51fb\uff0c\u6bcf\u79d2\u5bf9\u654c\u4eba\u9020\u62105\u6b21262%\u7684\u4f24\u5bb3\uff0c\u540c\u65f6\u6bcf\u79d2\u6d88\u801720\u70b9\u6012\u6c14\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u5b66\u4e60\u88ab\u52a8\u6280\u80fd\u83b7\u5f97\u66f4\u591a\u9739\u96f3\u638c\u6cd5\u7684\u5965\u4e49\uff0c\u5e76\u4e14\u6bcf\u6309\u4e00\u6b21\u8fd9\u4e2a\u6280\u80fd\u5219\u4f1a\u5728\u8fd9\u4e9b\u638c\u6cd5\u4e2d\u5207\u6362\u3002"
				},
				"2111": {
					"id": "2111",
					"specializationId": "44",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210483%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2112": {
					"id": "2112",
					"specializationId": "44",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210496%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n\u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2113": {
					"id": "2113",
					"specializationId": "44",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "5\u7c73",
					"castCost": "",
					"cooldown": "9.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6325\u821e\u6b66\u5668\u5c06\u524d\u65b9\u654c\u4eba\u626b\u5230\u5929\u4e0a\u5e76\u9020\u6210509%\u4f24\u5bb3\uff0c\u53d1\u52a8\u6311\u6740\u65f6\uff0c\u725b\u9b54\u4f1a\u8fdb\u5165\u77ed\u6682\u7684\u65e0\u654c\u72b6\u6001\u3002\r\n \u51fb\u4e2d\u654c\u4eba\u56de\u590d\uff1a15\u6012\u6c14"
				},
				"2127": {
					"id": "2127",
					"specializationId": "46",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d120\u70b9\u6012\u6c14"
				},
				"2128": {
					"id": "2128",
					"specializationId": "46",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d125\u70b9\u6012\u6c14"
				},
				"2129": {
					"id": "2129",
					"specializationId": "46",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d130\u70b9\u6012\u6c14"
				},
				"2130": {
					"id": "2130",
					"specializationId": "46",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d135\u70b9\u6012\u6c14"
				},
				"2131": {
					"id": "2131",
					"specializationId": "46",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d140\u70b9\u6012\u6c14"
				},
				"2132": {
					"id": "2132",
					"specializationId": "46",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15%\u8840\u91cf",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u7115\u53d1\u9b54\u529b\uff0c\u53d1\u51fa\u6b8b\u5fcd\u7684\u543c\u53eb\uff0c\u725b\u9b54\u6d88\u8017\u751f\u547d\u503c\u5e76\u56de\u590d145\u70b9\u6012\u6c14"
				},
				"2146": {
					"id": "2146",
					"specializationId": "47",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210223%\u4f24\u5bb3"
				},
				"2147": {
					"id": "2147",
					"specializationId": "47",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210230%\u4f24\u5bb3"
				},
				"2148": {
					"id": "2148",
					"specializationId": "47",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210237%\u4f24\u5bb3"
				},
				"2149": {
					"id": "2149",
					"specializationId": "47",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210241%\u4f24\u5bb3"
				},
				"2150": {
					"id": "2150",
					"specializationId": "47",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210248%\u4f24\u5bb3"
				},
				"2151": {
					"id": "2151",
					"specializationId": "47",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "60\u6012\u6c14",
					"cooldown": "15.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6325\u821e\u624b\u4e2d\u7684\u6b66\u5668\uff0c\u7ede\u6740\u5468\u56f4\u7684\u654c\u4eba10\u6b21\uff0c\u6bcf\u6b21\u9020\u6210255%\u4f24\u5bb3"
				},
				"2168": {
					"id": "2168",
					"specializationId": "49",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210152%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2169": {
					"id": "2169",
					"specializationId": "49",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210156%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2170": {
					"id": "2170",
					"specializationId": "49",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "0\u6012\u6c14",
					"cooldown": "25.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u6253\u51fa\u4e00\u9897\u5de8\u5927\u6c14\u529f\u5f39\uff0c\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u6bcf0.5\u79d2\u9020\u6210160%\u4f24\u5bb3\uff0c\u5728\u98de\u884c\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6c14\u529f\u5f39\u4f1a\u5c06\u5468\u56f4\u7684\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u53d1\u52a8\u60ac\u70bd\u73e0\u4f1a\u56de\u6536\u6c14\u5143\u73e0\uff0c\u5e76\u4e14\u6bcf\u56de\u6536\u4e00\u9897\u589e\u52a0\u4e00\u500d\u4f24\u5bb3"
				},
				"2188": {
					"id": "2188",
					"specializationId": "50",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210149%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u62101079%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2189": {
					"id": "2189",
					"specializationId": "50",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "7\u7c73",
					"castCost": "0\u6012\u6c14",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u4f7f\u7528\u66b4\u98ce\u822c\u7684\u62f3\u52b2\u8d2f\u7a7f\u7a7a\u6c14\u8f70\u51fb\u654c\u4eba\uff0c\u5bf9\u524d\u65b9\u654c\u4eba\u6bcf0.25\u79d2\u9020\u6210153%\u4f24\u5bb3\u3002\u5fc5\u987b\u957f\u6309\u6280\u80fd\u952e\u91ca\u653e\u3002\u677e\u5f00\u6280\u80fd\u952e\u6216\u6301\u7eed5\u79d2\u540e\uff0c\u725b\u9b54\u6253\u51fa\u5a01\u529b\u5f3a\u5927\u7684\u7ec8\u7ed3\u62f3\u51fb\uff0c\u9020\u62101107%\u4f24\u5bb3\u3002\u6700\u540e\u4e00\u51fb\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1\u3002"
				},
				"2206": {
					"id": "2206",
					"specializationId": "54",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102699%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2675%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2207": {
					"id": "2207",
					"specializationId": "54",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102768%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2693%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2208": {
					"id": "2208",
					"specializationId": "54",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "80\u6012\u6c14",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u8df3\u8d77\u5e76\u5c06\u5de8\u5927\u7684\u6b66\u5668\u63d2\u5165\u5730\u9762\uff0c\u5730\u9762\u4f1a\u7834\u88c2\u5e76\u5f00\u59cb\u7206\u70b8\uff0c\u6301\u7eed\u5730\u4f24\u5bb3\u8303\u56f4\u5185\u7684\u654c\u4eba\u3002\u6b66\u5668\u63d2\u5165\u5730\u9762\u9020\u62102838%\u4f24\u5bb3\uff0c\u5e76\u4ea7\u751f4\u6ce2\u5730\u9707\uff0c\u6bcf\u6ce2710%\u4f24\u5bb3\u3002\u88c2\u5730\u8bc0\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u654c\u4eba\u7684\u9738\u4f53\u9632\u5fa1"
				},
				"2225": {
					"id": "2225",
					"specializationId": "56",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210199%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2226": {
					"id": "2226",
					"specializationId": "56",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210204%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2227": {
					"id": "2227",
					"specializationId": "56",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "50.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "3",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u56de\u6536\u6c14\u5143\u73e0\uff0c\u8f6c\u5316\u4e3a\u5f3a\u5927\u7684\u6c14\u529f\u6ce2\u52a8\uff0c\u6bcf0.25\u79d2\u5bf9\u524d\u65b9\u654c\u4eba\u9020\u6210209%\u4f24\u5bb3\uff0c\u5e76\u5c06\u9644\u8fd15\u7c73\u5185\u76845\u4e2a\u654c\u4eba\u5377\u5165\u5176\u4e2d\u3002\u6bcf\u56de\u6536\u4e00\u4e2a\u6c14\u5143\u73e0\uff0c\u4f24\u5bb3\u63d0\u5347\u4e00\u500d\u3002"
				},
				"2245": {
					"id": "2245",
					"specializationId": "52",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621084%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653654%\u7684\u4f24\u5bb3\u3002"
				},
				"2246": {
					"id": "2246",
					"specializationId": "52",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u725b\u9b54\u53ec\u5524\u5e76\u6254\u51fa\u4e00\u628a\u5de8\u65a7\uff0c\u5de8\u65a7\u7f13\u6162\u79fb\u52a8\u5e76\u5bf9\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u6bcf\u79d2\u9020\u621086%\u4f24\u5bb3\u3002\u5f53\u4f60\u7ad9\u5728\u5de8\u65a7\u9644\u8fd1\u65f6\uff0c\u5de8\u65a7\u5377\u8d77\u7684\u5f3a\u529b\u65cb\u98ce\u53ef\u4ee5\u63a9\u62a4\u4f60\uff0c\u5438\u653656%\u7684\u4f24\u5bb3\u3002"
				}
			},
			"specializationSpellUpgrade": {
				"25": {
					"id": "25",
					"specializationId": "24",
					"name": "\u9707",
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u7684\u72b6\u6001\u4e0b\u53d1\u52a8\uff0c\u670970%\u57fa\u7840\u6982\u7387\u5bfc\u81f4\u654c\u4eba\u7729\u6655",
					"effect": {
						"1": "70"
					}
				},
				"26": {
					"id": "26",
					"specializationId": "24",
					"name": "\u6ce2",
					"description": "\u64bc\u5730\u9524\u7684\u4f24\u5bb3\u8303\u56f4\u589e\u59271\u7c73",
					"effect": {
						"1": "71"
					}
				},
				"31": {
					"id": "31",
					"specializationId": "24",
					"name": "\u52a8",
					"description": "\u64bc\u5730\u9524\u786c\u76f4\u7b49\u7ea7\u589e\u52a05\uff0c\u53ef\u4f7f\u88ab\u51fb\u4e2d\u7684\u654c\u4eba\u6d6e\u7a7a",
					"effect": {
						"1": "72"
					}
				},
				"33": {
					"id": "33",
					"specializationId": "24",
					"name": "\u7edd\u547d\u8bc0",
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad830\u70b9\uff0c\u5e76\u62db\u67b630%\u4f24\u5bb3",
					"effect": {
						"1": "78",
						"2": "80",
						"3": "81",
						"4": "82",
						"5": "83",
						"6": "84",
						"7": "85"
					}
				},
				"34": {
					"id": "34",
					"specializationId": "24",
					"name": "\u996e\u6068\u8bc0",
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%",
					"effect": {
						"1": "122",
						"2": "1780",
						"3": "1781",
						"4": "1782",
						"5": "1783",
						"6": "1784",
						"7": "1785"
					}
				},
				"36": {
					"id": "36",
					"specializationId": "28",
					"name": "\u6c14\u5143\u73e0",
					"description": "\u53d1\u52a8\u9739\u96f3\u638c\u540e\u4f1a\u5728\u76ee\u6807\u70b9\u7559\u4e0b\u4e00\u9897\u6c14\u5143\u73e0\uff0c\u6c14\u5143\u73e0\u53ef\u4ee5\u88ab\u60ac\u70bd\u73e0\u3001\u70c8\u9b54\u7206\u6280\u80fd\u5438\u6536\uff0c\u4f7f\u8fd9\u4e9b\u6280\u80fd\u83b7\u5f97\u5927\u5e45\u5ea6\u589e\u5f3a\u3002",
					"effect": {
						"1": "124"
					}
				},
				"38": {
					"id": "38",
					"specializationId": "28",
					"name": "\u88c2\u9aa8",
					"description": "\u725b\u9b54\u9886\u609f\u6c14\u529f\u7684\u5965\u4e49\uff0c\u5f53\u5c06\u9886\u602a\u53ca\u4ee5\u4e0a\u7ea7\u522b\u654c\u4eba\u53d7\u5230\u8fde\u7eed\u4e09\u6b21\u9739\u96f3\u638c\u7684\u653b\u51fb\u540e\u4f1a\u8eab\u4e0a\u7559\u4e0b\u88c2\u9aa8\u638c\u5370\uff0c\u88c2\u9aa8\u638c\u5370\u4f1a\u6301\u7eed\u5730\u4e3a\u725b\u9b54\u62bd\u53d6\u6012\u6c14\uff0c\u6bcf3\u79d2\u62bd\u53d618\u70b9\u6012\u6c14\u3002",
					"effect": {
						"1": "138"
					}
				},
				"45": {
					"id": "45",
					"specializationId": "28",
					"name": "\u9707\u51fb",
					"description": "\u9739\u96f3\u638c\u547d\u4e2d\u654c\u4eba\u540e\u4f1a\u6301\u7eed\u7206\u7834\uff0c\u5bfc\u81f4\u654c\u4eba\u786c\u76f4\u5e76\u53d7\u5230\u8f83\u4f4e\u7684\u4f24\u5bb3",
					"effect": {
						"1": "139"
					}
				},
				"46": {
					"id": "46",
					"specializationId": "28",
					"name": "\u75be\u98ce\u5f0f",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a015\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a06",
					"effect": {
						"1": "141",
						"2": "1786",
						"3": "1787",
						"4": "1788",
						"5": "1789",
						"6": "1790",
						"7": "1791"
					}
				},
				"47": {
					"id": "47",
					"specializationId": "28",
					"name": "\u7834\u6d6a\u5f0f",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u53475%",
					"effect": {
						"1": "149",
						"2": "1792",
						"3": "1793",
						"4": "1794",
						"5": "1795",
						"6": "1796",
						"7": "1797"
					}
				},
				"112": {
					"id": "112",
					"specializationId": "30",
					"name": "\u5f11",
					"description": "\u70c8\u8840\u65a9\u5bf9\u5c06\u9886\u602a\u53ca\u4ee5\u4e0a\u7ea7\u522b\u654c\u4eba\u670925%\u989d\u5916\u4f24\u5bb3",
					"effect": {
						"1": "162"
					}
				},
				"114": {
					"id": "114",
					"specializationId": "30",
					"name": "\u5fa1",
					"description": "\u70c8\u8840\u65a9\u653b\u51fb\u901f\u5ea6\u63d0\u534715%",
					"effect": {
						"1": "177"
					}
				},
				"116": {
					"id": "116",
					"specializationId": "30",
					"name": "\u70c8",
					"description": "\u70c8\u8840\u65a9\u6700\u540e\u4e00\u5f0f\u547d\u4e2d\u654c\u4eba\u65f6\u56de\u590d3%\u751f\u547d\u503c",
					"effect": {
						"1": "186"
					}
				},
				"120": {
					"id": "120",
					"specializationId": "30",
					"name": "\u7edd\u547d\u8bc0",
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b660%\u4f24\u5bb3",
					"effect": {
						"1": "194",
						"2": "1798",
						"3": "1799",
						"4": "1800",
						"5": "1801",
						"6": "1802",
						"7": "1803"
					}
				},
				"123": {
					"id": "123",
					"specializationId": "30",
					"name": "\u996e\u6068\u8bc0",
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534775%",
					"effect": {
						"1": "201",
						"2": "1804",
						"3": "1805",
						"4": "1806",
						"5": "1807",
						"6": "1808",
						"7": "1809"
					}
				},
				"134": {
					"id": "134",
					"specializationId": "33",
					"name": "\u75be\u901f",
					"description": "\u51b7\u5374\u65f6\u95f4\u51cf\u5c111\u79d2",
					"effect": {
						"1": "231"
					}
				},
				"140": {
					"id": "140",
					"specializationId": "33",
					"name": "\u9707\u8361",
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u670940%\u6982\u7387\u89e6\u53d13\u79d2\u7729\u6655",
					"effect": {
						"1": "246"
					}
				},
				"142": {
					"id": "142",
					"specializationId": "33",
					"name": "\u64d2\u62ff",
					"description": "\u53ef\u4ee5\u989d\u5916\u6293\u53d61\u4e2a\u654c\u4eba",
					"effect": {
						"1": "247"
					}
				},
				"145": {
					"id": "145",
					"specializationId": "33",
					"name": "\u75be\u98ce\u5f0f",
					"description": "\u589e\u52a050%\u4f24\u5bb3\uff0c\u5e76\u670970%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b",
					"effect": {
						"1": "256",
						"2": "273",
						"3": "274",
						"4": "275",
						"5": "276",
						"6": "277",
						"7": "278"
					}
				},
				"148": {
					"id": "148",
					"specializationId": "33",
					"name": "\u7834\u6d6a\u5f0f",
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f155\u4e2a\u654c\u4eba\uff0c\u8303\u56f4\u589e\u52a05\u7c73",
					"effect": {
						"1": "265",
						"2": "266",
						"3": "267",
						"4": "268",
						"5": "269",
						"6": "270",
						"7": "271"
					}
				},
				"161": {
					"id": "161",
					"specializationId": "34",
					"name": "\u4f24",
					"description": "\u8840\u6708\u65a9\u589e\u52a0\u7b2c\u4e09\u6b21\u4f24\u5bb3",
					"effect": {
						"1": "295"
					}
				},
				"164": {
					"id": "164",
					"specializationId": "34",
					"name": "\u75be",
					"description": "\u51b7\u5374\u51cf\u5c113\u79d2",
					"effect": {
						"1": "304"
					}
				},
				"166": {
					"id": "166",
					"specializationId": "34",
					"name": "\u8840\u6708",
					"description": "\u8840\u6708\u65a9\u6495\u88c2\u5bf9\u624b\uff0c\u725b\u9b54\u7684\u8fd1\u8eab\u653b\u51fb\u4f1a\u5bf9\u5904\u4e8e\u6495\u88c2\u72b6\u6001\u4e0b\u4ea7\u751f\u989d\u5916\u7684\u4f24\u5bb3\uff0c\u6570\u503c\u76f8\u5f53\u4e8e\u8840\u6708\u65a9\u7b2c\u4e00\u51fb\u4f24\u5bb3\u76840.25\u500d",
					"effect": {
						"1": "311"
					}
				},
				"169": {
					"id": "169",
					"specializationId": "34",
					"name": "\u7edd\u547d\u8bc0",
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c1130%",
					"effect": {
						"1": "315",
						"2": "322",
						"3": "323",
						"4": "324",
						"5": "325",
						"6": "326",
						"7": "327"
					}
				},
				"173": {
					"id": "173",
					"specializationId": "34",
					"name": "\u996e\u6068\u8bc0",
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%",
					"effect": {
						"1": "335",
						"2": "336",
						"3": "337",
						"4": "338",
						"5": "339",
						"6": "340",
						"7": "341"
					}
				},
				"230": {
					"id": "230",
					"specializationId": "37",
					"name": "\u4f24",
					"description": "\u53ef\u4ee5\u989d\u5916\u4f24\u5bb32\u4e2a\u654c\u4eba",
					"effect": {
						"1": "362"
					}
				},
				"232": {
					"id": "232",
					"specializationId": "37",
					"name": "\u52a8",
					"description": "\u786c\u76f4\u7b49\u7ea7\u589e\u52a0",
					"effect": {
						"1": "369"
					}
				},
				"234": {
					"id": "234",
					"specializationId": "37",
					"name": "\u5b81",
					"description": "\u51b7\u5374\u51cf\u5c111\u79d2",
					"effect": {
						"1": "378"
					}
				},
				"238": {
					"id": "238",
					"specializationId": "37",
					"name": "\u4f24\u5bb3\u589e\u5f3a",
					"description": "\u4f24\u5bb3\u589e\u52a045%",
					"effect": {
						"1": "400",
						"2": "401",
						"3": "402",
						"4": "403",
						"5": "404",
						"6": "405",
						"7": "406"
					}
				},
				"240": {
					"id": "240",
					"specializationId": "37",
					"name": "\u65ad\u7b4b",
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u7387105%\uff0c\u589e\u52a0\u5c04\u7a0b3\u7c73",
					"effect": {
						"1": "415",
						"2": "422",
						"3": "423",
						"4": "424",
						"5": "425",
						"6": "426",
						"7": "427"
					}
				},
				"246": {
					"id": "246",
					"specializationId": "38",
					"name": "\u52a8",
					"description": "\u75be\u98ce\u4e09\u91cd\u6d6a\u53ef\u4ee5\u51fb\u98de\u654c\u4eba",
					"effect": {
						"1": "430"
					}
				},
				"279": {
					"id": "279",
					"specializationId": "38",
					"name": "\u4e8c\u91cd",
					"description": "\u5f00\u542f\u7b2c\u4e8c\u5f0f",
					"effect": {
						"1": "432"
					}
				},
				"281": {
					"id": "281",
					"specializationId": "38",
					"name": "\u4e09\u91cd",
					"description": "\u5f00\u542f\u7b2c\u4e09\u5f0f",
					"effect": {
						"1": "440"
					}
				},
				"285": {
					"id": "285",
					"specializationId": "38",
					"name": "\u4f24\u5bb3\u589e\u5f3a",
					"description": "\u4f24\u5bb3\u589e\u52a045%",
					"effect": {
						"1": "441",
						"2": "443",
						"3": "444",
						"4": "445",
						"5": "446",
						"6": "447",
						"7": "448"
					}
				},
				"288": {
					"id": "288",
					"specializationId": "38",
					"name": "\u7834\u51fb",
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u6709100%\u51e0\u7387\u56de\u590d5\u70b9\u6012\u6c14",
					"effect": {
						"1": "455",
						"2": "456",
						"3": "457",
						"4": "458",
						"5": "459",
						"6": "460",
						"7": "461"
					}
				},
				"292": {
					"id": "292",
					"specializationId": "41",
					"name": "\u51dd",
					"description": "\u51b7\u5374\u51cf\u5c115\u79d2",
					"effect": {
						"1": "467"
					}
				},
				"293": {
					"id": "293",
					"specializationId": "41",
					"name": "\u66b4",
					"description": "\u5728\u566c\u8840\u72c2\u6740\u72b6\u6001\u4e0b\uff0c\u725b\u9b54\u53d7\u5230\u4f24\u5bb3\u65f6\u6240\u56de\u590d\u7684\u6012\u6c14\u5927\u5e45\u589e\u52a0",
					"effect": {
						"1": "476"
					}
				},
				"294": {
					"id": "294",
					"specializationId": "41",
					"name": "\u654c",
					"description": "\u725b\u9b54\u65f6\u523b\u611f\u5e94\u5468\u56f4\u654c\u4eba\u7684\u6740\u610f\u3002\u5f53\u81ea\u8eab\u5468\u56f42\u7c73\u5185\u6709\u654c\u4eba\u65f6\u6bcf\u79d2\u56de\u590d\u6012\u6c147\u70b9\u3002",
					"effect": {
						"1": "486"
					}
				},
				"296": {
					"id": "296",
					"specializationId": "41",
					"name": "\u7edd\u547d\u8bc0",
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u534715~75\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c1110%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad850%",
					"effect": {
						"1": "494",
						"2": "495",
						"3": "496",
						"4": "497",
						"5": "498",
						"6": "499",
						"7": "500"
					}
				},
				"298": {
					"id": "298",
					"specializationId": "41",
					"name": "\u996e\u6068\u8bc0",
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u5347100%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a05\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u801725\u6012\u6c14",
					"effect": {
						"1": "509",
						"2": "511",
						"3": "512",
						"4": "513",
						"5": "514",
						"6": "515",
						"7": "516"
					}
				},
				"303": {
					"id": "303",
					"specializationId": "42",
					"name": "\u6781\u610f\u00b7\u901f",
					"description": "\u4f60\u9886\u609f\u4e00\u5957\u65b0\u7684\u62f3\u6cd5\uff0c\u901a\u8fc7\u5316\u65a7\u62f3\u7f61\u5207\u6362\u5230\u201c\u901f\u201d\u5883\u754c\u4e4b\u540e\uff0c\u4f60\u53d8\u4e3a\u4f7f\u7528\u66f4\u8fc5\u6377\u7684\u56db\u5f0f\u9739\u96f3\u638c\u3002\u540c\u65f6\u4f60\u7684\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad830%\u3002",
					"effect": {
						"1": "525"
					}
				},
				"304": {
					"id": "304",
					"specializationId": "42",
					"name": "\u6781\u610f\u00b7\u865a",
					"description": "\u865a\u5219\u5b9e\u4e4b\uff0c\u5b9e\u5219\u865a\u4e4b\uff0c\u4f60\u5c06\u4f60\u7684\u5404\u8def\u638c\u6cd5\u878d\u6c47\u8d2f\u901a\u3002\u4f60\u6bcf\u6b21\u5207\u6362\u5f62\u6001\u540e\uff0c\u57287\u79d2\u5185\u6c14\u529f\u7cfb\u6280\u80fd\u653b\u901f\u63d0\u9ad850%\uff0c\u8fd9\u4e2a\u6548\u679c\u6bcf10\u79d2\u53ea\u80fd\u89e6\u53d1\u4e00\u6b21\u3002",
					"effect": {
						"1": "539"
					}
				},
				"305": {
					"id": "305",
					"specializationId": "42",
					"name": "\u6781\u610f\u00b7\u6012",
					"description": "\u4f60\u9886\u609f\u9739\u96f3\u638c\u7684\u66f4\u9ad8\u5883\u754c\uff0c\u4f7f\u7528\u5316\u65a7\u62f3\u7f61\u53ef\u4ee5\u5207\u6362\u5230\u201c\u6012\u201d\u5883\u754c\uff0c\u6b64\u65f6\u4f7f\u7528\u9739\u96f3\u638c\u53ef\u4ee5\u6253\u51fa\u5f3a\u52b2\u7684\u5730\u88c2\u6ce2\u52a8\uff0c\u547d\u4e2d\u654c\u4eba\u65f6\u4ea7\u751f\u5de8\u5927\u7684\u7206\u70b8\uff0c\u5bf9\u4e00\u7247\u8303\u56f4\u5185\u7684\u654c\u4eba\u4ea7\u751f\u76f8\u5f53\u4e8e\u201c\u72c2\u201d\u5883\u754c\u9739\u96f3\u638c\u76846.8\u500d\u4f24\u5bb3\u3002\u9739\u96f3\u638c\u4f1a\u6bcf\u79d2\u6d88\u801735\u70b9\u6012\u6c14\u3002",
					"effect": {
						"1": "550"
					}
				},
				"306": {
					"id": "306",
					"specializationId": "42",
					"name": "\u75be\u98ce\u5f0f",
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad850%",
					"effect": {
						"1": "565",
						"2": "567",
						"3": "568",
						"4": "569",
						"5": "570",
						"6": "571",
						"46": "572"
					}
				},
				"307": {
					"id": "307",
					"specializationId": "42",
					"name": "\u7834\u6d6a\u5f0f",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c1115\u70b9",
					"effect": {
						"1": "575",
						"2": "1810",
						"3": "1811",
						"4": "1812",
						"5": "1813",
						"6": "1814",
						"7": "1815"
					}
				},
				"339": {
					"id": "339",
					"specializationId": "44",
					"name": "\u51dd",
					"description": "\u52a0\u901f\u548c\u95ea\u907f\u63d0\u5347\u7684\u6548\u679c\u5ef6\u957f\u52305\u79d2",
					"effect": {
						"1": "600"
					}
				},
				"340": {
					"id": "340",
					"specializationId": "44",
					"name": "\u77ac",
					"description": "\u4f7f\u7528\u6311\u6740\u540e3\u79d2\u5185\u63d0\u5347\u79fb\u52a8\u901f\u5ea620%",
					"effect": {
						"1": "609"
					}
				},
				"341": {
					"id": "341",
					"specializationId": "44",
					"name": "\u95ea",
					"description": "\u4f7f\u7528\u6311\u6740\u540e3\u79d2\u5185\u63d0\u9ad8\u95ea\u907f100%",
					"effect": {
						"1": "616"
					}
				},
				"342": {
					"id": "342",
					"specializationId": "44",
					"name": "\u7edd\u547d\u8bc0",
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c4.5%",
					"effect": {
						"1": "626",
						"2": "634",
						"3": "635",
						"4": "636",
						"5": "637",
						"6": "638",
						"7": "639"
					}
				},
				"343": {
					"id": "343",
					"specializationId": "44",
					"name": "\u996e\u6068\u8bc0",
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%",
					"effect": {
						"1": "647",
						"2": "648",
						"3": "649",
						"4": "650",
						"5": "651",
						"6": "652",
						"7": "653"
					}
				},
				"345": {
					"id": "345",
					"specializationId": "46",
					"name": "\u51dd",
					"description": "\u63d0\u5347\u653b\u901f\u7684\u6548\u679c\u589e\u52a020\u70b9",
					"effect": {
						"1": "669"
					}
				},
				"347": {
					"id": "347",
					"specializationId": "46",
					"name": "\u547d",
					"description": "\u6012\u5578\u957f\u5929\u7684\u751f\u547d\u6d88\u8017\u51cf\u5c115%",
					"effect": {
						"1": "673"
					}
				},
				"349": {
					"id": "349",
					"specializationId": "46",
					"name": "\u901f",
					"description": "\u5728\u4f7f\u7528\u6012\u5578\u957f\u5929\u540e\uff0c5\u79d2\u5185\u63d0\u5347\u653b\u901f30\u70b9",
					"effect": {
						"1": "692"
					}
				},
				"351": {
					"id": "351",
					"specializationId": "46",
					"name": "\u6012\u543c",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c4.5\u79d2",
					"effect": {
						"1": "717",
						"2": "1816",
						"3": "1817",
						"4": "1818",
						"5": "1819",
						"6": "1820",
						"7": "1821"
					}
				},
				"353": {
					"id": "353",
					"specializationId": "46",
					"name": "\u7729\u6655",
					"description": "\u6012\u5578\u957f\u5929\u670975%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c",
					"effect": {
						"1": "751",
						"2": "752",
						"3": "753",
						"4": "754",
						"5": "755",
						"6": "756",
						"7": "757"
					}
				},
				"354": {
					"id": "354",
					"specializationId": "47",
					"name": "\u77ac",
					"description": "\u79fb\u52a8\u589e\u52a070%",
					"effect": {
						"1": "791"
					}
				},
				"355": {
					"id": "355",
					"specializationId": "47",
					"name": "\u9707",
					"description": "\u653b\u51fb\u529b\u63d0\u534720%",
					"effect": {
						"1": "795"
					}
				},
				"357": {
					"id": "357",
					"specializationId": "47",
					"name": "\u66b4",
					"description": "\u5728\u566c\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u65cb\u9f99\u6740\u4f1a\u9644\u5e26\u5438\u5f15\u654c\u4eba\u7684\u6548\u679c",
					"effect": {
						"1": "797"
					}
				},
				"359": {
					"id": "359",
					"specializationId": "47",
					"name": "\u7edd\u547d\u8bc0",
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed30%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad836%",
					"effect": {
						"1": "821",
						"2": "822",
						"3": "823",
						"4": "824",
						"5": "825",
						"6": "826",
						"7": "827"
					}
				},
				"361": {
					"id": "361",
					"specializationId": "47",
					"name": "\u996e\u6068\u8bc0",
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%",
					"effect": {
						"1": "843",
						"2": "844",
						"3": "845",
						"4": "846",
						"5": "847",
						"6": "848",
						"7": "849"
					}
				},
				"365": {
					"id": "365",
					"specializationId": "49",
					"name": "\u6f29\u6da1",
					"description": "\u5728\u542f\u52a8\u60ac\u70bd\u73e0\u4e8c\u6bb5\u540e\uff0c\u60ac\u70bd\u73e0\u4f1a\u518d\u6b21\u62e5\u6709\u5438\u9644\u6548\u679c\uff0c\u6301\u7eed4\u79d2",
					"effect": {
						"1": "1030"
					}
				},
				"367": {
					"id": "367",
					"specializationId": "49",
					"name": "\u805a\u6c14",
					"description": "\u5ef6\u957f\u6301\u7eed\u65f6\u95f45\u79d2",
					"effect": {
						"1": "1044"
					}
				},
				"369": {
					"id": "369",
					"specializationId": "49",
					"name": "\u4e8c\u91cd\uff1a\u5bfc",
					"description": "\u4f60\u7684\u60ac\u70bd\u73e0\u83b7\u5f97\u4e8c\u6bb5\u6548\u679c\uff1a\u5728\u53d1\u5c04\u60ac\u70bd\u73e0\u540e\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u540e\uff0c\u6bcf\u6b21\u751f\u6210\u4e00\u9897\u65b0\u7684\u6c14\u5143\u73e0\uff0c\u60ac\u70bd\u73e0\u90fd\u4f1a\u79fb\u52a8\u5230\u8fd9\u9897\u6c14\u5143\u73e0\u4e0a\uff0c\u53d1\u52a8\u8fd9\u4e2a\u6280\u80fd\u6d88\u801730\u70b9\u6012\u6c14",
					"effect": {
						"1": "1072"
					}
				},
				"371": {
					"id": "371",
					"specializationId": "49",
					"name": "\u75be\u98ce\u5f0f",
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534790%\u4f24\u5bb3",
					"effect": {
						"1": "1133",
						"2": "1140",
						"3": "1141",
						"4": "1142",
						"5": "1143",
						"6": "1144",
						"7": "1145"
					}
				},
				"373": {
					"id": "373",
					"specializationId": "49",
					"name": "\u7834\u6d6a\u5f0f",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u534745%",
					"effect": {
						"1": "1148",
						"2": "1822",
						"3": "1823",
						"4": "1824",
						"5": "1825",
						"6": "1826",
						"7": "1827"
					}
				},
				"374": {
					"id": "374",
					"specializationId": "50",
					"name": "\u75be\u901f",
					"description": "\u4e71\u62f3\u6253\u51fb\u65f6\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad830%",
					"effect": {
						"1": "1311"
					}
				},
				"375": {
					"id": "375",
					"specializationId": "50",
					"name": "\u65e0\u6211",
					"description": "\u75af\u72c2\u7684\u62f3\u51fb\u4f7f\u4f60\u5fd8\u5374\u4e00\u5207\u3002\u4e71\u98ce\u62f3\u6700\u540e\u4e00\u51fb\u547d\u4e2d\u654c\u4eba\u540e\uff0c\u4f60\u67093\u79d2\u65f6\u95f4\u4f7f\u7528\u6280\u80fd\u4e0d\u6d88\u8017\u6012\u6c14\uff08\u4e0d\u5305\u62ec\u72c2\u66b4\u9886\u57df\u3001\u6012\u6c14\u51b2\u5929\uff09\uff0c\u8fd9\u4e2a\u6548\u679c\u6bcf25\u79d2\u6700\u591a\u89e6\u53d1\u4e00\u6b21",
					"effect": {
						"1": "1313"
					}
				},
				"376": {
					"id": "376",
					"specializationId": "50",
					"name": "\u9694\u5c71",
					"description": "\u653b\u51fb\u989d\u59162\u4e2a\u654c\u4eba",
					"effect": {
						"1": "1312"
					}
				},
				"377": {
					"id": "377",
					"specializationId": "50",
					"name": "\u75be\u98ce\u5f0f",
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e26144%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1170%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801730\u70b9",
					"effect": {
						"1": "1314",
						"2": "1315",
						"3": "1316",
						"4": "1317",
						"5": "1318",
						"6": "1319",
						"7": "1320"
					}
				},
				"378": {
					"id": "378",
					"specializationId": "50",
					"name": "\u7834\u6d6a\u5f0f",
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad830%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14",
					"effect": {
						"1": "1321",
						"2": "1322",
						"3": "1828",
						"4": "1324",
						"5": "1325",
						"6": "1326",
						"7": "1327"
					}
				},
				"382": {
					"id": "382",
					"specializationId": "52",
					"name": "\u62a4",
					"description": "\u65cb\u98ce\u5de8\u65a7\u7684\u4fdd\u62a4\u6548\u679c\u53ef\u4ee5\u8986\u76d6\u961f\u53cb",
					"effect": {
						"1": "1328"
					}
				},
				"384": {
					"id": "384",
					"specializationId": "52",
					"name": "\u52a8",
					"description": "\u65cb\u98ce\u5de8\u65a7\u53ef\u4ee5\u9886\u654c\u4eba\u8fdb\u5165\u786c\u76f4\u72b6\u6001",
					"effect": {
						"1": "1329"
					}
				},
				"386": {
					"id": "386",
					"specializationId": "52",
					"name": "\u63a7",
					"description": "\u51fb\u4e2d\u654c\u4eba\u65f6\uff0c\u65cb\u98ce\u5de8\u65a7\u4f1a\u505c\u4e0b\uff0c\u4ee5\u4fbf\u80fd\u6301\u7eed\u5730\u4f24\u5bb3\u654c\u4eba",
					"effect": {
						"1": "1330"
					}
				},
				"387": {
					"id": "387",
					"specializationId": "52",
					"name": "\u4f24\u5bb3\u5438\u6536",
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a020%",
					"effect": {
						"1": "1331",
						"2": "1332",
						"3": "1333",
						"4": "1334",
						"5": "1335",
						"6": "1336",
						"7": "1337"
					}
				},
				"388": {
					"id": "388",
					"specializationId": "52",
					"name": "\u4f24\u5bb3\u589e\u5f3a",
					"description": "\u4f24\u5bb3\u589e\u52a045%",
					"effect": {
						"1": "1338",
						"2": "1339",
						"3": "1340",
						"4": "1341",
						"5": "1342",
						"6": "1343",
						"7": "1344"
					}
				},
				"389": {
					"id": "389",
					"specializationId": "54",
					"name": "\u66b4",
					"description": "\u5728\u566c\u8840\u72c2\u6740\u72b6\u6001\u4e0b\u53d1\u52a8\u88c2\u5730\u8bc0\uff0c\u4f1a\u6709150%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c",
					"effect": {
						"1": "1345"
					}
				},
				"390": {
					"id": "390",
					"specializationId": "54",
					"name": "\u51dd",
					"description": "\u88c2\u5730\u8bc0\u51b7\u5374\u51cf\u5c1110\u79d2",
					"effect": {
						"1": "1346"
					}
				},
				"391": {
					"id": "391",
					"specializationId": "54",
					"name": "\u52a8",
					"description": "\u654c\u4eba\u8fdb\u5165\u88c2\u5730\u8bc0\u7559\u4e0b\u7684\u5730\u88c2\u533a\u57df\u4f1a\u53d7\u5230\u6d6e\u7a7a\u6548\u679c",
					"effect": {
						"1": "1348"
					}
				},
				"392": {
					"id": "392",
					"specializationId": "54",
					"name": "\u7edd\u547d\u8bc0",
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d45\u70b9",
					"effect": {
						"1": "1349",
						"2": "1350",
						"3": "1351",
						"4": "1352",
						"5": "1353",
						"6": "1354",
						"7": "1355"
					}
				},
				"393": {
					"id": "393",
					"specializationId": "54",
					"name": "\u996e\u6068\u8bc0",
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f47\u79d2",
					"effect": {
						"1": "1356",
						"2": "1357",
						"3": "1358",
						"4": "1359",
						"5": "1360",
						"6": "1361",
						"7": "1362"
					}
				},
				"395": {
					"id": "395",
					"specializationId": "56",
					"name": "\u6c14\u62a4",
					"description": "\u5f15\u5bfc\u70c8\u9b54\u7206\u65f6\uff0c\u62db\u67b650%\u7684\u4f24\u5bb3",
					"effect": {
						"1": "1410"
					}
				},
				"396": {
					"id": "396",
					"specializationId": "56",
					"name": "\u72c2\u91ce",
					"description": "\u70c8\u9b54\u7206\u589e\u52a020%\u4f24\u5bb3",
					"effect": {
						"1": "1412"
					}
				},
				"397": {
					"id": "397",
					"specializationId": "56",
					"name": "\u4e8c\u91cd\uff1a\u6ce8",
					"description": "\u6c14\u529f\u6ce8\u5165\uff1a\u53d1\u52a8\u70c8\u9b54\u7206\u4e8c\u6bb5\u65f6\uff0c\u5982\u679c\u60ac\u70bd\u73e0\u5728\u653b\u51fb\u8303\u56f4\u5185\uff0c\u4f60\u53ef\u4ee5\u4e3a\u4f60\u7684\u60ac\u70bd\u73e0\u6ce8\u5165\u5185\u529b\u4f7f\u5176\u53d8\u5927\uff0c\u5e76\u5bfc\u81f4\u5176\u6700\u7ec8\u7206\u7834\u65f6\u62e5\u6709\u5de8\u5927\u7684\u4f24\u5bb3\uff0c\u6570\u503c\u76f8\u5f53\u4e8e\u5f53\u524d\u7b49\u7ea7\u70c8\u9b54\u7206\u6bcf\u51fb\u4f24\u5bb3\u768413.5\u500d",
					"effect": {
						"1": "1414"
					}
				},
				"398": {
					"id": "398",
					"specializationId": "56",
					"name": "\u75be\u98ce\u5f0f",
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534790%\u4f24\u5bb3",
					"effect": {
						"1": "1416",
						"2": "1423",
						"3": "1424",
						"4": "1425",
						"5": "1426",
						"6": "1427",
						"7": "1428"
					}
				},
				"399": {
					"id": "399",
					"specializationId": "56",
					"name": "\u7834\u6d6a\u5f0f",
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u534745%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba",
					"effect": {
						"1": "1429",
						"2": "1430",
						"3": "1431",
						"4": "1432",
						"5": "1433",
						"6": "1434",
						"7": "1435"
					}
				}
			},
			"specializationSpellUpgradeEffect": {
				"70": {
					"id": "70",
					"upgradeId": "25",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u7684\u72b6\u6001\u4e0b\u53d1\u52a8\uff0c\u670970%\u57fa\u7840\u6982\u7387\u5bfc\u81f4\u654c\u4eba\u7729\u6655"
				},
				"71": {
					"id": "71",
					"upgradeId": "26",
					"index": "0",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "24",
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
					"description": "\u64bc\u5730\u9524\u7684\u4f24\u5bb3\u8303\u56f4\u589e\u59271\u7c73"
				},
				"72": {
					"id": "72",
					"upgradeId": "31",
					"index": "0",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "24",
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
					"description": "\u64bc\u5730\u9524\u786c\u76f4\u7b49\u7ea7\u589e\u52a05\uff0c\u53ef\u4f7f\u88ab\u51fb\u4e2d\u7684\u654c\u4eba\u6d6e\u7a7a"
				},
				"78": {
					"id": "78",
					"upgradeId": "33",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "24",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad82\u70b9\uff0c\u5e76\u62db\u67b62%\u4f24\u5bb3"
				},
				"122": {
					"id": "122",
					"upgradeId": "34",
					"index": "0",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u53476%"
				},
				"124": {
					"id": "124",
					"upgradeId": "36",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "28",
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
					"description": "\u53d1\u52a8\u9739\u96f3\u638c\u540e\u4f1a\u5728\u76ee\u6807\u70b9\u7559\u4e0b\u4e00\u9897\u6c14\u5143\u73e0\uff0c\u6c14\u5143\u73e0\u53ef\u4ee5\u88ab\u60ac\u70bd\u73e0\u3001\u70c8\u9b54\u7206\u6280\u80fd\u5438\u6536\uff0c\u4f7f\u8fd9\u4e9b\u6280\u80fd\u83b7\u5f97\u5927\u5e45\u5ea6\u589e\u5f3a\u3002"
				},
				"138": {
					"id": "138",
					"upgradeId": "38",
					"index": "0",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "28",
					"requireLevel1": "1",
					"requireSpecialization2": "42",
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
					"description": "\u725b\u9b54\u9886\u609f\u6c14\u529f\u7684\u5965\u4e49\uff0c\u5f53\u5c06\u9886\u602a\u53ca\u4ee5\u4e0a\u7ea7\u522b\u654c\u4eba\u53d7\u5230\u8fde\u7eed\u4e09\u6b21\u9739\u96f3\u638c\u7684\u653b\u51fb\u540e\u4f1a\u8eab\u4e0a\u7559\u4e0b\u88c2\u9aa8\u638c\u5370\uff0c\u88c2\u9aa8\u638c\u5370\u4f1a\u6301\u7eed\u5730\u4e3a\u725b\u9b54\u62bd\u53d6\u6012\u6c14\uff0c\u6bcf3\u79d2\u62bd\u53d618\u70b9\u6012\u6c14\u3002"
				},
				"139": {
					"id": "139",
					"upgradeId": "45",
					"index": "0",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "28",
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
					"description": "\u9739\u96f3\u638c\u547d\u4e2d\u654c\u4eba\u540e\u4f1a\u6301\u7eed\u7206\u7834\uff0c\u5bfc\u81f4\u654c\u4eba\u786c\u76f4\u5e76\u53d7\u5230\u8f83\u4f4e\u7684\u4f24\u5bb3"
				},
				"141": {
					"id": "141",
					"upgradeId": "46",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "28",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a01\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a01"
				},
				"149": {
					"id": "149",
					"upgradeId": "47",
					"index": "0",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "28",
					"requireLevel1": "1",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u53475%"
				},
				"162": {
					"id": "162",
					"upgradeId": "112",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "30",
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
					"description": "\u70c8\u8840\u65a9\u5bf9\u5c06\u9886\u602a\u53ca\u4ee5\u4e0a\u7ea7\u522b\u654c\u4eba\u670925%\u989d\u5916\u4f24\u5bb3"
				},
				"186": {
					"id": "186",
					"upgradeId": "116",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "30",
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
					"description": "\u70c8\u8840\u65a9\u6700\u540e\u4e00\u5f0f\u547d\u4e2d\u654c\u4eba\u65f6\u56de\u590d3%\u751f\u547d\u503c"
				},
				"177": {
					"id": "177",
					"upgradeId": "114",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "30",
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
					"description": "\u70c8\u8840\u65a9\u653b\u51fb\u901f\u5ea6\u63d0\u534715%"
				},
				"194": {
					"id": "194",
					"upgradeId": "120",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "30",
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
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b610%\u4f24\u5bb3"
				},
				"201": {
					"id": "201",
					"upgradeId": "123",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "30",
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
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u53475%"
				},
				"231": {
					"id": "231",
					"upgradeId": "134",
					"index": "0",
					"requireLevel": "27",
					"step": "1",
					"requireSpecialization1": "33",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u51cf\u5c111\u79d2"
				},
				"246": {
					"id": "246",
					"upgradeId": "140",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u670940%\u6982\u7387\u89e6\u53d13\u79d2\u7729\u6655"
				},
				"247": {
					"id": "247",
					"upgradeId": "142",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "33",
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
					"description": "\u53ef\u4ee5\u989d\u5916\u6293\u53d61\u4e2a\u654c\u4eba"
				},
				"256": {
					"id": "256",
					"upgradeId": "145",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "33",
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
					"description": "\u589e\u52a03%\u4f24\u5bb3\uff0c\u5e76\u67095%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b"
				},
				"265": {
					"id": "265",
					"upgradeId": "148",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f151\u4e2a\u654c\u4eba"
				},
				"295": {
					"id": "295",
					"upgradeId": "161",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u6708\u65a9\u589e\u52a0\u7b2c\u4e09\u6b21\u4f24\u5bb3"
				},
				"304": {
					"id": "304",
					"upgradeId": "164",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "34",
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
					"description": "\u51b7\u5374\u51cf\u5c113\u79d2"
				},
				"311": {
					"id": "311",
					"upgradeId": "166",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u6708\u65a9\u6495\u88c2\u5bf9\u624b\uff0c\u725b\u9b54\u7684\u8fd1\u8eab\u653b\u51fb\u4f1a\u5bf9\u5904\u4e8e\u6495\u88c2\u72b6\u6001\u4e0b\u4ea7\u751f\u989d\u5916\u7684\u4f24\u5bb3\uff0c\u6570\u503c\u76f8\u5f53\u4e8e\u8840\u6708\u65a9\u7b2c\u4e00\u51fb\u4f24\u5bb3\u76840.25\u500d"
				},
				"315": {
					"id": "315",
					"upgradeId": "169",
					"index": "0",
					"requireLevel": "27",
					"step": "1",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c113%"
				},
				"335": {
					"id": "335",
					"upgradeId": "173",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "34",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u53476%"
				},
				"362": {
					"id": "362",
					"upgradeId": "230",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "37",
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
					"description": "\u53ef\u4ee5\u989d\u5916\u4f24\u5bb32\u4e2a\u654c\u4eba"
				},
				"369": {
					"id": "369",
					"upgradeId": "232",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "37",
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
					"description": "\u786c\u76f4\u7b49\u7ea7\u589e\u52a0"
				},
				"378": {
					"id": "378",
					"upgradeId": "234",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "37",
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
					"description": "\u51b7\u5374\u51cf\u5c111\u79d2"
				},
				"400": {
					"id": "400",
					"upgradeId": "238",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "37",
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
					"description": "\u4f24\u5bb3\u589e\u52a03%"
				},
				"415": {
					"id": "415",
					"upgradeId": "240",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "37",
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
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u73877%\uff0c\u589e\u52a0\u5c04\u7a0b0.5\u7c73"
				},
				"430": {
					"id": "430",
					"upgradeId": "246",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "38",
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
					"description": "\u75be\u98ce\u4e09\u91cd\u6d6a\u53ef\u4ee5\u51fb\u98de\u654c\u4eba"
				},
				"432": {
					"id": "432",
					"upgradeId": "279",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "38",
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
					"description": "\u5f00\u542f\u7b2c\u4e8c\u5f0f"
				},
				"440": {
					"id": "440",
					"upgradeId": "281",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "38",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "279",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5f00\u542f\u7b2c\u4e09\u5f0f"
				},
				"441": {
					"id": "441",
					"upgradeId": "285",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "38",
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
					"description": "\u4f24\u5bb3\u589e\u52a03%"
				},
				"455": {
					"id": "455",
					"upgradeId": "288",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "38",
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
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u670915%\u51e0\u7387\u56de\u590d1\u70b9\u6012\u6c14"
				},
				"467": {
					"id": "467",
					"upgradeId": "292",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "41",
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
					"description": "\u51b7\u5374\u51cf\u5c115\u79d2"
				},
				"476": {
					"id": "476",
					"upgradeId": "293",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "41",
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
					"description": "\u5728\u566c\u8840\u72c2\u6740\u72b6\u6001\u4e0b\uff0c\u725b\u9b54\u53d7\u5230\u4f24\u5bb3\u65f6\u6240\u56de\u590d\u7684\u6012\u6c14\u5927\u5e45\u589e\u52a0"
				},
				"486": {
					"id": "486",
					"upgradeId": "294",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "41",
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
					"description": "\u725b\u9b54\u65f6\u523b\u611f\u5e94\u5468\u56f4\u654c\u4eba\u7684\u6740\u610f\u3002\u5f53\u81ea\u8eab\u5468\u56f42\u7c73\u5185\u6709\u654c\u4eba\u65f6\u6bcf\u79d2\u56de\u590d\u6012\u6c147\u70b9\u3002"
				},
				"494": {
					"id": "494",
					"upgradeId": "296",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u53471~5\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c111%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad83%"
				},
				"509": {
					"id": "509",
					"upgradeId": "298",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "41",
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
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u53473%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a00.5\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u80175\u6012\u6c14"
				},
				"525": {
					"id": "525",
					"upgradeId": "303",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "42",
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
					"description": "\u4f60\u9886\u609f\u4e00\u5957\u65b0\u7684\u62f3\u6cd5\uff0c\u901a\u8fc7\u5316\u65a7\u62f3\u7f61\u5207\u6362\u5230\u201c\u901f\u201d\u5883\u754c\u4e4b\u540e\uff0c\u4f60\u53d8\u4e3a\u4f7f\u7528\u66f4\u8fc5\u6377\u7684\u56db\u5f0f\u9739\u96f3\u638c\u3002\u540c\u65f6\u4f60\u7684\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad830%\u3002"
				},
				"539": {
					"id": "539",
					"upgradeId": "304",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "42",
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
					"description": "\u865a\u5219\u5b9e\u4e4b\uff0c\u5b9e\u5219\u865a\u4e4b\uff0c\u4f60\u5c06\u4f60\u7684\u5404\u8def\u638c\u6cd5\u878d\u6c47\u8d2f\u901a\u3002\u4f60\u6bcf\u6b21\u5207\u6362\u5f62\u6001\u540e\uff0c\u57287\u79d2\u5185\u6c14\u529f\u7cfb\u6280\u80fd\u653b\u901f\u63d0\u9ad850%\uff0c\u8fd9\u4e2a\u6548\u679c\u6bcf10\u79d2\u53ea\u80fd\u89e6\u53d1\u4e00\u6b21\u3002"
				},
				"550": {
					"id": "550",
					"upgradeId": "305",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "42",
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
					"description": "\u4f60\u9886\u609f\u9739\u96f3\u638c\u7684\u66f4\u9ad8\u5883\u754c\uff0c\u4f7f\u7528\u5316\u65a7\u62f3\u7f61\u53ef\u4ee5\u5207\u6362\u5230\u201c\u6012\u201d\u5883\u754c\uff0c\u6b64\u65f6\u4f7f\u7528\u9739\u96f3\u638c\u53ef\u4ee5\u6253\u51fa\u5f3a\u52b2\u7684\u5730\u88c2\u6ce2\u52a8\uff0c\u547d\u4e2d\u654c\u4eba\u65f6\u4ea7\u751f\u5de8\u5927\u7684\u7206\u70b8\uff0c\u5bf9\u4e00\u7247\u8303\u56f4\u5185\u7684\u654c\u4eba\u4ea7\u751f\u76f8\u5f53\u4e8e\u201c\u72c2\u201d\u5883\u754c\u9739\u96f3\u638c\u76846.8\u500d\u4f24\u5bb3\u3002\u9739\u96f3\u638c\u4f1a\u6bcf\u79d2\u6d88\u801735\u70b9\u6012\u6c14\u3002"
				},
				"565": {
					"id": "565",
					"upgradeId": "306",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "42",
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
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad85%"
				},
				"575": {
					"id": "575",
					"upgradeId": "307",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "42",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "305",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c111\u70b9"
				},
				"600": {
					"id": "600",
					"upgradeId": "339",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "44",
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
					"description": "\u52a0\u901f\u548c\u95ea\u907f\u63d0\u5347\u7684\u6548\u679c\u5ef6\u957f\u52305\u79d2"
				},
				"609": {
					"id": "609",
					"upgradeId": "340",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "44",
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
					"description": "\u4f7f\u7528\u6311\u6740\u540e3\u79d2\u5185\u63d0\u5347\u79fb\u52a8\u901f\u5ea620%"
				},
				"616": {
					"id": "616",
					"upgradeId": "341",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "44",
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
					"description": "\u4f7f\u7528\u6311\u6740\u540e3\u79d2\u5185\u63d0\u9ad8\u95ea\u907f100%"
				},
				"626": {
					"id": "626",
					"upgradeId": "342",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "44",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c0.3%"
				},
				"647": {
					"id": "647",
					"upgradeId": "343",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "44",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u53476%"
				},
				"669": {
					"id": "669",
					"upgradeId": "345",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "46",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u63d0\u5347\u653b\u901f\u7684\u6548\u679c\u589e\u52a020\u70b9"
				},
				"673": {
					"id": "673",
					"upgradeId": "347",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u7684\u751f\u547d\u6d88\u8017\u51cf\u5c115%"
				},
				"692": {
					"id": "692",
					"upgradeId": "349",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "46",
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
					"description": "\u5728\u4f7f\u7528\u6012\u5578\u957f\u5929\u540e\uff0c5\u79d2\u5185\u63d0\u5347\u653b\u901f30\u70b9"
				},
				"717": {
					"id": "717",
					"upgradeId": "351",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "46",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c0.3\u79d2"
				},
				"751": {
					"id": "751",
					"upgradeId": "353",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u67095%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"791": {
					"id": "791",
					"upgradeId": "354",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "47",
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
					"description": "\u79fb\u52a8\u589e\u52a070%"
				},
				"795": {
					"id": "795",
					"upgradeId": "355",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "47",
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
					"description": "\u653b\u51fb\u529b\u63d0\u534720%"
				},
				"797": {
					"id": "797",
					"upgradeId": "357",
					"index": "0",
					"requireLevel": "36",
					"step": "1",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u566c\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u65cb\u9f99\u6740\u4f1a\u9644\u5e26\u5438\u5f15\u654c\u4eba\u7684\u6548\u679c"
				},
				"821": {
					"id": "821",
					"upgradeId": "359",
					"index": "0",
					"requireLevel": "38",
					"step": "1",
					"requireSpecialization1": "47",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed2%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad82%"
				},
				"843": {
					"id": "843",
					"upgradeId": "361",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u53476%"
				},
				"1030": {
					"id": "1030",
					"upgradeId": "365",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "49",
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
					"description": "\u5728\u542f\u52a8\u60ac\u70bd\u73e0\u4e8c\u6bb5\u540e\uff0c\u60ac\u70bd\u73e0\u4f1a\u518d\u6b21\u62e5\u6709\u5438\u9644\u6548\u679c\uff0c\u6301\u7eed4\u79d2"
				},
				"1044": {
					"id": "1044",
					"upgradeId": "367",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "49",
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
					"description": "\u5ef6\u957f\u6301\u7eed\u65f6\u95f45\u79d2"
				},
				"1072": {
					"id": "1072",
					"upgradeId": "369",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "49",
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
					"description": "\u4f60\u7684\u60ac\u70bd\u73e0\u83b7\u5f97\u4e8c\u6bb5\u6548\u679c\uff1a\u5728\u53d1\u5c04\u60ac\u70bd\u73e0\u540e\u518d\u6b21\u6309\u4e0b\u6280\u80fd\u540e\uff0c\u6bcf\u6b21\u751f\u6210\u4e00\u9897\u65b0\u7684\u6c14\u5143\u73e0\uff0c\u60ac\u70bd\u73e0\u90fd\u4f1a\u79fb\u52a8\u5230\u8fd9\u9897\u6c14\u5143\u73e0\u4e0a\uff0c\u53d1\u52a8\u8fd9\u4e2a\u6280\u80fd\u6d88\u801730\u70b9\u6012\u6c14"
				},
				"1133": {
					"id": "1133",
					"upgradeId": "371",
					"index": "0",
					"requireLevel": "38",
					"step": "1",
					"requireSpecialization1": "49",
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
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u53476%\u4f24\u5bb3"
				},
				"1148": {
					"id": "1148",
					"upgradeId": "373",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "49",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "369",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u53473%"
				},
				"1311": {
					"id": "1311",
					"upgradeId": "374",
					"index": "0",
					"requireLevel": "50",
					"step": "1",
					"requireSpecialization1": "50",
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
					"description": "\u4e71\u62f3\u6253\u51fb\u65f6\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u9ad830%"
				},
				"1312": {
					"id": "1312",
					"upgradeId": "376",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "50",
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
					"description": "\u653b\u51fb\u989d\u59162\u4e2a\u654c\u4eba"
				},
				"1313": {
					"id": "1313",
					"upgradeId": "375",
					"index": "0",
					"requireLevel": "44",
					"step": "1",
					"requireSpecialization1": "50",
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
					"description": "\u75af\u72c2\u7684\u62f3\u51fb\u4f7f\u4f60\u5fd8\u5374\u4e00\u5207\u3002\u4e71\u98ce\u62f3\u6700\u540e\u4e00\u51fb\u547d\u4e2d\u654c\u4eba\u540e\uff0c\u4f60\u67093\u79d2\u65f6\u95f4\u4f7f\u7528\u6280\u80fd\u4e0d\u6d88\u8017\u6012\u6c14\uff08\u4e0d\u5305\u62ec\u72c2\u66b4\u9886\u57df\u3001\u6012\u6c14\u51b2\u5929\uff09\uff0c\u8fd9\u4e2a\u6548\u679c\u6bcf25\u79d2\u6700\u591a\u89e6\u53d1\u4e00\u6b21"
				},
				"1314": {
					"id": "1314",
					"upgradeId": "377",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "50",
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
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e2612%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1130%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801730\u70b9"
				},
				"1321": {
					"id": "1321",
					"upgradeId": "378",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "50",
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
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad82%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14"
				},
				"1328": {
					"id": "1328",
					"upgradeId": "382",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "52",
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
					"description": "\u65cb\u98ce\u5de8\u65a7\u7684\u4fdd\u62a4\u6548\u679c\u53ef\u4ee5\u8986\u76d6\u961f\u53cb"
				},
				"1329": {
					"id": "1329",
					"upgradeId": "384",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "52",
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
					"description": "\u65cb\u98ce\u5de8\u65a7\u53ef\u4ee5\u9886\u654c\u4eba\u8fdb\u5165\u786c\u76f4\u72b6\u6001"
				},
				"1330": {
					"id": "1330",
					"upgradeId": "386",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "52",
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
					"description": "\u51fb\u4e2d\u654c\u4eba\u65f6\uff0c\u65cb\u98ce\u5de8\u65a7\u4f1a\u505c\u4e0b\uff0c\u4ee5\u4fbf\u80fd\u6301\u7eed\u5730\u4f24\u5bb3\u654c\u4eba"
				},
				"1331": {
					"id": "1331",
					"upgradeId": "387",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "52",
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
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a02%"
				},
				"1338": {
					"id": "1338",
					"upgradeId": "388",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "52",
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
					"description": "\u4f24\u5bb3\u589e\u52a03%"
				},
				"1345": {
					"id": "1345",
					"upgradeId": "389",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u566c\u8840\u72c2\u6740\u72b6\u6001\u4e0b\u53d1\u52a8\u88c2\u5730\u8bc0\uff0c\u4f1a\u6709150%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"1346": {
					"id": "1346",
					"upgradeId": "390",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "54",
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
					"description": "\u88c2\u5730\u8bc0\u51b7\u5374\u51cf\u5c1110\u79d2"
				},
				"1348": {
					"id": "1348",
					"upgradeId": "391",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "54",
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
					"description": "\u654c\u4eba\u8fdb\u5165\u88c2\u5730\u8bc0\u7559\u4e0b\u7684\u5730\u88c2\u533a\u57df\u4f1a\u53d7\u5230\u6d6e\u7a7a\u6548\u679c"
				},
				"1349": {
					"id": "1349",
					"upgradeId": "392",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "54",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d3\u70b9"
				},
				"1356": {
					"id": "1356",
					"upgradeId": "393",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f41\u79d2"
				},
				"1410": {
					"id": "1410",
					"upgradeId": "395",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "56",
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
					"description": "\u5f15\u5bfc\u70c8\u9b54\u7206\u65f6\uff0c\u62db\u67b650%\u7684\u4f24\u5bb3"
				},
				"1412": {
					"id": "1412",
					"upgradeId": "396",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u589e\u52a020%\u4f24\u5bb3"
				},
				"1414": {
					"id": "1414",
					"upgradeId": "397",
					"index": "0",
					"requireLevel": "49",
					"step": "1",
					"requireSpecialization1": "56",
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
					"description": "\u6c14\u529f\u6ce8\u5165\uff1a\u53d1\u52a8\u70c8\u9b54\u7206\u4e8c\u6bb5\u65f6\uff0c\u5982\u679c\u60ac\u70bd\u73e0\u5728\u653b\u51fb\u8303\u56f4\u5185\uff0c\u4f60\u53ef\u4ee5\u4e3a\u4f60\u7684\u60ac\u70bd\u73e0\u6ce8\u5165\u5185\u529b\u4f7f\u5176\u53d8\u5927\uff0c\u5e76\u5bfc\u81f4\u5176\u6700\u7ec8\u7206\u7834\u65f6\u62e5\u6709\u5de8\u5927\u7684\u4f24\u5bb3\uff0c\u6570\u503c\u76f8\u5f53\u4e8e\u5f53\u524d\u7b49\u7ea7\u70c8\u9b54\u7206\u6bcf\u51fb\u4f24\u5bb3\u768413.5\u500d"
				},
				"1416": {
					"id": "1416",
					"upgradeId": "398",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u53476%\u4f24\u5bb3"
				},
				"1429": {
					"id": "1429",
					"upgradeId": "399",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "56",
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
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u53473%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba"
				},
				"80": {
					"id": "80",
					"upgradeId": "33",
					"index": "1",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "24",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad84\u70b9\uff0c\u5e76\u62db\u67b64%\u4f24\u5bb3"
				},
				"1798": {
					"id": "1798",
					"upgradeId": "120",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "30",
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
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b615%\u4f24\u5bb3"
				},
				"266": {
					"id": "266",
					"upgradeId": "148",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f152\u4e2a\u654c\u4eba"
				},
				"273": {
					"id": "273",
					"upgradeId": "145",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "33",
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
					"description": "\u589e\u52a06%\u4f24\u5bb3\uff0c\u5e76\u670910%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b"
				},
				"322": {
					"id": "322",
					"upgradeId": "169",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c116%"
				},
				"336": {
					"id": "336",
					"upgradeId": "173",
					"index": "1",
					"requireLevel": "30",
					"step": "2",
					"requireSpecialization1": "34",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534712%"
				},
				"401": {
					"id": "401",
					"upgradeId": "238",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "37",
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
					"description": "\u4f24\u5bb3\u589e\u52a06%"
				},
				"422": {
					"id": "422",
					"upgradeId": "240",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "37",
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
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u738714%\uff0c\u589e\u52a0\u5c04\u7a0b0.5\u7c73"
				},
				"443": {
					"id": "443",
					"upgradeId": "285",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "38",
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
					"description": "\u4f24\u5bb3\u589e\u52a06%"
				},
				"456": {
					"id": "456",
					"upgradeId": "288",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "38",
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
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u670925%\u51e0\u7387\u56de\u590d1\u70b9\u6012\u6c14"
				},
				"495": {
					"id": "495",
					"upgradeId": "296",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u53472~10\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c112%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad89%"
				},
				"511": {
					"id": "511",
					"upgradeId": "298",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "41",
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
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u53476%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a01\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u80177\u6012\u6c14"
				},
				"567": {
					"id": "567",
					"upgradeId": "306",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "42",
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
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad810%"
				},
				"1810": {
					"id": "1810",
					"upgradeId": "307",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "42",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "305",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c112\u70b9"
				},
				"634": {
					"id": "634",
					"upgradeId": "342",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "44",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c0.6%"
				},
				"648": {
					"id": "648",
					"upgradeId": "343",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "44",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534712%"
				},
				"1816": {
					"id": "1816",
					"upgradeId": "351",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "46",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c0.6\u79d2"
				},
				"752": {
					"id": "752",
					"upgradeId": "353",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u670910%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"822": {
					"id": "822",
					"upgradeId": "359",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "47",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed4%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad84%"
				},
				"844": {
					"id": "844",
					"upgradeId": "361",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534712%"
				},
				"1140": {
					"id": "1140",
					"upgradeId": "371",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "49",
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
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534712%\u4f24\u5bb3"
				},
				"1822": {
					"id": "1822",
					"upgradeId": "373",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "49",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "369",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u53476%"
				},
				"1315": {
					"id": "1315",
					"upgradeId": "377",
					"index": "1",
					"requireLevel": "45",
					"step": "2",
					"requireSpecialization1": "50",
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
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e2624%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1135%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801730\u70b9"
				},
				"1322": {
					"id": "1322",
					"upgradeId": "378",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "50",
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
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad84%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14"
				},
				"1332": {
					"id": "1332",
					"upgradeId": "387",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "52",
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
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a04%"
				},
				"1339": {
					"id": "1339",
					"upgradeId": "388",
					"index": "1",
					"requireLevel": "43",
					"step": "2",
					"requireSpecialization1": "52",
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
					"description": "\u4f24\u5bb3\u589e\u52a06%"
				},
				"1350": {
					"id": "1350",
					"upgradeId": "392",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "54",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d6\u70b9"
				},
				"1357": {
					"id": "1357",
					"upgradeId": "393",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f42\u79d2"
				},
				"1423": {
					"id": "1423",
					"upgradeId": "398",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534712%\u4f24\u5bb3"
				},
				"1430": {
					"id": "1430",
					"upgradeId": "399",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "56",
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
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u53476%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba"
				},
				"1780": {
					"id": "1780",
					"upgradeId": "34",
					"index": "1",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534712%"
				},
				"1786": {
					"id": "1786",
					"upgradeId": "46",
					"index": "1",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "28",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a02\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a01"
				},
				"1792": {
					"id": "1792",
					"upgradeId": "47",
					"index": "1",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "28",
					"requireLevel1": "2",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534710%"
				},
				"1804": {
					"id": "1804",
					"upgradeId": "123",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "30",
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
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534710%"
				},
				"81": {
					"id": "81",
					"upgradeId": "33",
					"index": "2",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "24",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad812\u70b9\uff0c\u5e76\u62db\u67b612%\u4f24\u5bb3"
				},
				"1799": {
					"id": "1799",
					"upgradeId": "120",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "30",
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
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b635%\u4f24\u5bb3"
				},
				"267": {
					"id": "267",
					"upgradeId": "148",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f153\u4e2a\u654c\u4eba\uff0c\u8303\u56f4\u589e\u52a01\u7c73"
				},
				"274": {
					"id": "274",
					"upgradeId": "145",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "33",
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
					"description": "\u589e\u52a018%\u4f24\u5bb3\uff0c\u5e76\u670930%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b"
				},
				"323": {
					"id": "323",
					"upgradeId": "169",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c1118%"
				},
				"337": {
					"id": "337",
					"upgradeId": "173",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "34",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534736%"
				},
				"402": {
					"id": "402",
					"upgradeId": "238",
					"index": "2",
					"requireLevel": "32",
					"step": "3",
					"requireSpecialization1": "37",
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
					"description": "\u4f24\u5bb3\u589e\u52a018%"
				},
				"423": {
					"id": "423",
					"upgradeId": "240",
					"index": "2",
					"requireLevel": "31",
					"step": "3",
					"requireSpecialization1": "37",
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
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u738742%\uff0c\u589e\u52a0\u5c04\u7a0b1.5\u7c73"
				},
				"444": {
					"id": "444",
					"upgradeId": "285",
					"index": "2",
					"requireLevel": "32",
					"step": "3",
					"requireSpecialization1": "38",
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
					"description": "\u4f24\u5bb3\u589e\u52a018%"
				},
				"457": {
					"id": "457",
					"upgradeId": "288",
					"index": "2",
					"requireLevel": "31",
					"step": "3",
					"requireSpecialization1": "38",
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
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u670930%\u51e0\u7387\u56de\u590d2\u70b9\u6012\u6c14"
				},
				"496": {
					"id": "496",
					"upgradeId": "296",
					"index": "2",
					"requireLevel": "36",
					"step": "3",
					"requireSpecialization1": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u53476~30\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c115%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad815%"
				},
				"512": {
					"id": "512",
					"upgradeId": "298",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "41",
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
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u534715%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a01.5\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u801710\u6012\u6c14"
				},
				"568": {
					"id": "568",
					"upgradeId": "306",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "42",
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
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad820%"
				},
				"1811": {
					"id": "1811",
					"upgradeId": "307",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "42",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "305",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c115\u70b9"
				},
				"635": {
					"id": "635",
					"upgradeId": "342",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "44",
					"requireLevel1": "7",
					"requireSpecialization2": "41",
					"requireLevel2": "1",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c1.8%"
				},
				"649": {
					"id": "649",
					"upgradeId": "343",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "44",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534736%"
				},
				"1817": {
					"id": "1817",
					"upgradeId": "351",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "46",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c1.8\u79d2"
				},
				"753": {
					"id": "753",
					"upgradeId": "353",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u670930%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"823": {
					"id": "823",
					"upgradeId": "359",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "47",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed12%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad812%"
				},
				"845": {
					"id": "845",
					"upgradeId": "361",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534736%"
				},
				"1141": {
					"id": "1141",
					"upgradeId": "371",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "49",
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
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534736%\u4f24\u5bb3"
				},
				"1823": {
					"id": "1823",
					"upgradeId": "373",
					"index": "2",
					"requireLevel": "14",
					"step": "3",
					"requireSpecialization1": "49",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "369",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u534718%"
				},
				"1316": {
					"id": "1316",
					"upgradeId": "377",
					"index": "2",
					"requireLevel": "47",
					"step": "3",
					"requireSpecialization1": "50",
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
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e2660%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1150%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801730\u70b9"
				},
				"1333": {
					"id": "1333",
					"upgradeId": "387",
					"index": "2",
					"requireLevel": "45",
					"step": "3",
					"requireSpecialization1": "52",
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
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a08%"
				},
				"1340": {
					"id": "1340",
					"upgradeId": "388",
					"index": "2",
					"requireLevel": "44",
					"step": "3",
					"requireSpecialization1": "52",
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
					"description": "\u4f24\u5bb3\u589e\u52a018%"
				},
				"1351": {
					"id": "1351",
					"upgradeId": "392",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "54",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d18\u70b9"
				},
				"1358": {
					"id": "1358",
					"upgradeId": "393",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f43\u79d2"
				},
				"1424": {
					"id": "1424",
					"upgradeId": "398",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534736%\u4f24\u5bb3"
				},
				"1431": {
					"id": "1431",
					"upgradeId": "399",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "56",
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
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u534718%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba"
				},
				"1781": {
					"id": "1781",
					"upgradeId": "34",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534736%"
				},
				"1787": {
					"id": "1787",
					"upgradeId": "46",
					"index": "2",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "28",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a05\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a03"
				},
				"1793": {
					"id": "1793",
					"upgradeId": "47",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "28",
					"requireLevel1": "3",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "3",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534715%\uff0c\u6bcf\u6b21\u51fb\u4e2d\u989d\u5916\u56de\u590d1\u6012\u6c14\u3002"
				},
				"1805": {
					"id": "1805",
					"upgradeId": "123",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "30",
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
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534730%"
				},
				"1828": {
					"id": "1828",
					"upgradeId": "378",
					"index": "2",
					"requireLevel": "46",
					"step": "3",
					"requireSpecialization1": "50",
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
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad812%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14"
				},
				"82": {
					"id": "82",
					"upgradeId": "33",
					"index": "3",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "24",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad814\u70b9\uff0c\u5e76\u62db\u67b614%\u4f24\u5bb3"
				},
				"1800": {
					"id": "1800",
					"upgradeId": "120",
					"index": "3",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "30",
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
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b640%\u4f24\u5bb3"
				},
				"268": {
					"id": "268",
					"upgradeId": "148",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f154\u4e2a\u654c\u4eba\uff0c\u8303\u56f4\u589e\u52a02\u7c73"
				},
				"275": {
					"id": "275",
					"upgradeId": "145",
					"index": "3",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "33",
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
					"description": "\u589e\u52a021%\u4f24\u5bb3\uff0c\u5e76\u670935%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b"
				},
				"324": {
					"id": "324",
					"upgradeId": "169",
					"index": "3",
					"requireLevel": "39",
					"step": "4",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c1120%"
				},
				"338": {
					"id": "338",
					"upgradeId": "173",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "34",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534742%"
				},
				"403": {
					"id": "403",
					"upgradeId": "238",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "37",
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
					"description": "\u4f24\u5bb3\u589e\u52a021%"
				},
				"424": {
					"id": "424",
					"upgradeId": "240",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "37",
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
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u738749%\uff0c\u589e\u52a0\u5c04\u7a0b1.5\u7c73"
				},
				"445": {
					"id": "445",
					"upgradeId": "285",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "38",
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
					"description": "\u4f24\u5bb3\u589e\u52a021%"
				},
				"458": {
					"id": "458",
					"upgradeId": "288",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "38",
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
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u670945%\u51e0\u7387\u56de\u590d2\u70b9\u6012\u6c14"
				},
				"497": {
					"id": "497",
					"upgradeId": "296",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u53477~35\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c116%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad820%"
				},
				"513": {
					"id": "513",
					"upgradeId": "298",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "41",
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
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u534720%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a02\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u801713\u6012\u6c14"
				},
				"569": {
					"id": "569",
					"upgradeId": "306",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "42",
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
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad825%"
				},
				"1812": {
					"id": "1812",
					"upgradeId": "307",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "42",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "305",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c116\u70b9"
				},
				"636": {
					"id": "636",
					"upgradeId": "342",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "44",
					"requireLevel1": "7",
					"requireSpecialization2": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c2.1%"
				},
				"650": {
					"id": "650",
					"upgradeId": "343",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "44",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534742%"
				},
				"1818": {
					"id": "1818",
					"upgradeId": "351",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "46",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c2.1\u79d2"
				},
				"754": {
					"id": "754",
					"upgradeId": "353",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u670935%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"824": {
					"id": "824",
					"upgradeId": "359",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "47",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed14%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad814%"
				},
				"846": {
					"id": "846",
					"upgradeId": "361",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534742%"
				},
				"1142": {
					"id": "1142",
					"upgradeId": "371",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "49",
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
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534742%\u4f24\u5bb3"
				},
				"1824": {
					"id": "1824",
					"upgradeId": "373",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "49",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "369",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u534721%"
				},
				"1317": {
					"id": "1317",
					"upgradeId": "377",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "50",
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
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e2672%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1153%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801730\u70b9"
				},
				"1324": {
					"id": "1324",
					"upgradeId": "378",
					"index": "3",
					"requireLevel": "48",
					"step": "4",
					"requireSpecialization1": "50",
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
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad814%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14"
				},
				"1334": {
					"id": "1334",
					"upgradeId": "387",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "52",
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
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a010%"
				},
				"1341": {
					"id": "1341",
					"upgradeId": "388",
					"index": "3",
					"requireLevel": "45",
					"step": "4",
					"requireSpecialization1": "52",
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
					"description": "\u4f24\u5bb3\u589e\u52a021%"
				},
				"1352": {
					"id": "1352",
					"upgradeId": "392",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "54",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d21\u70b9"
				},
				"1359": {
					"id": "1359",
					"upgradeId": "393",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f44\u79d2"
				},
				"1425": {
					"id": "1425",
					"upgradeId": "398",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534742%\u4f24\u5bb3"
				},
				"1432": {
					"id": "1432",
					"upgradeId": "399",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "56",
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
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u534721%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba"
				},
				"1782": {
					"id": "1782",
					"upgradeId": "34",
					"index": "3",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534742%"
				},
				"1788": {
					"id": "1788",
					"upgradeId": "46",
					"index": "3",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "28",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a07\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a03"
				},
				"1794": {
					"id": "1794",
					"upgradeId": "47",
					"index": "3",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "28",
					"requireLevel1": "4",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534720%\uff0c\u6bcf\u6b21\u51fb\u4e2d\u989d\u5916\u56de\u590d1\u6012\u6c14\u3002"
				},
				"1806": {
					"id": "1806",
					"upgradeId": "123",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "30",
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
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534735%"
				},
				"83": {
					"id": "83",
					"upgradeId": "33",
					"index": "4",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "24",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad816\u70b9\uff0c\u5e76\u62db\u67b616%\u4f24\u5bb3"
				},
				"1801": {
					"id": "1801",
					"upgradeId": "120",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "30",
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
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b645%\u4f24\u5bb3"
				},
				"269": {
					"id": "269",
					"upgradeId": "148",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f154\u4e2a\u654c\u4eba\uff0c\u8303\u56f4\u589e\u52a03\u7c73"
				},
				"276": {
					"id": "276",
					"upgradeId": "145",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "33",
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
					"description": "\u589e\u52a024%\u4f24\u5bb3\uff0c\u5e76\u670940%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b"
				},
				"325": {
					"id": "325",
					"upgradeId": "169",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c1122%"
				},
				"339": {
					"id": "339",
					"upgradeId": "173",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "34",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534748%"
				},
				"404": {
					"id": "404",
					"upgradeId": "238",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "37",
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
					"description": "\u4f24\u5bb3\u589e\u52a024%"
				},
				"425": {
					"id": "425",
					"upgradeId": "240",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "37",
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
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u738756%\uff0c\u589e\u52a0\u5c04\u7a0b15.\u7c73"
				},
				"446": {
					"id": "446",
					"upgradeId": "285",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "38",
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
					"description": "\u4f24\u5bb3\u589e\u52a024%"
				},
				"459": {
					"id": "459",
					"upgradeId": "288",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "38",
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
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u670960%\u51e0\u7387\u56de\u590d3\u70b9\u6012\u6c14"
				},
				"498": {
					"id": "498",
					"upgradeId": "296",
					"index": "4",
					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u53478~40\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c117%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad830%"
				},
				"514": {
					"id": "514",
					"upgradeId": "298",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "41",
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
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u534740%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a02.5\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u801715\u6012\u6c14"
				},
				"570": {
					"id": "570",
					"upgradeId": "306",
					"index": "4",
					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "42",
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
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad830%"
				},
				"1813": {
					"id": "1813",
					"upgradeId": "307",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "42",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "305",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c117\u70b9"
				},
				"637": {
					"id": "637",
					"upgradeId": "342",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "44",
					"requireLevel1": "8",
					"requireSpecialization2": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c2.4%"
				},
				"651": {
					"id": "651",
					"upgradeId": "343",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "44",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534748%"
				},
				"755": {
					"id": "755",
					"upgradeId": "353",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u670940%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"825": {
					"id": "825",
					"upgradeId": "359",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "47",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed16%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad816%"
				},
				"847": {
					"id": "847",
					"upgradeId": "361",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534748%"
				},
				"1143": {
					"id": "1143",
					"upgradeId": "371",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "49",
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
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534748%\u4f24\u5bb3"
				},
				"1825": {
					"id": "1825",
					"upgradeId": "373",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "49",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "369",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u534724%"
				},
				"1318": {
					"id": "1318",
					"upgradeId": "377",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "50",
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
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e2684%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1156%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801730\u70b9"
				},
				"1325": {
					"id": "1325",
					"upgradeId": "378",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "50",
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
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad816%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14"
				},
				"1335": {
					"id": "1335",
					"upgradeId": "387",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "52",
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
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a012%"
				},
				"1342": {
					"id": "1342",
					"upgradeId": "388",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "52",
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
					"description": "\u4f24\u5bb3\u589e\u52a024%"
				},
				"1353": {
					"id": "1353",
					"upgradeId": "392",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "54",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d24\u70b9"
				},
				"1360": {
					"id": "1360",
					"upgradeId": "393",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f45\u79d2"
				},
				"1426": {
					"id": "1426",
					"upgradeId": "398",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534748%\u4f24\u5bb3"
				},
				"1433": {
					"id": "1433",
					"upgradeId": "399",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "56",
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
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u534724%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba"
				},
				"1783": {
					"id": "1783",
					"upgradeId": "34",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534748%"
				},
				"1789": {
					"id": "1789",
					"upgradeId": "46",
					"index": "4",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "28",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a09\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a04"
				},
				"1795": {
					"id": "1795",
					"upgradeId": "47",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "28",
					"requireLevel1": "5",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534725%\uff0c\u6bcf\u6b21\u51fb\u4e2d\u989d\u5916\u56de\u590d1\u6012\u6c14\u3002"
				},
				"1807": {
					"id": "1807",
					"upgradeId": "123",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "30",
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
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534740%"
				},
				"1819": {
					"id": "1819",
					"upgradeId": "351",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "46",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c2.4\u79d2"
				},
				"84": {
					"id": "84",
					"upgradeId": "33",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "24",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad818\u70b9\uff0c\u5e76\u62db\u67b618%\u4f24\u5bb3"
				},
				"1802": {
					"id": "1802",
					"upgradeId": "120",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "30",
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
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b650%\u4f24\u5bb3"
				},
				"270": {
					"id": "270",
					"upgradeId": "148",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f154\u4e2a\u654c\u4eba\uff0c\u8303\u56f4\u589e\u52a04\u7c73"
				},
				"277": {
					"id": "277",
					"upgradeId": "145",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "33",
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
					"description": "\u589e\u52a027%\u4f24\u5bb3\uff0c\u5e76\u670945%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b"
				},
				"326": {
					"id": "326",
					"upgradeId": "169",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c1124%"
				},
				"340": {
					"id": "340",
					"upgradeId": "173",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "34",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534756%"
				},
				"405": {
					"id": "405",
					"upgradeId": "238",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "37",
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
					"description": "\u4f24\u5bb3\u589e\u52a027%"
				},
				"426": {
					"id": "426",
					"upgradeId": "240",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "37",
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
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u738763%\uff0c\u589e\u52a0\u5c04\u7a0b1.5\u7c73"
				},
				"447": {
					"id": "447",
					"upgradeId": "285",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "38",
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
					"description": "\u4f24\u5bb3\u589e\u52a027%"
				},
				"460": {
					"id": "460",
					"upgradeId": "288",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "38",
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
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u670960%\u51e0\u7387\u56de\u590d4\u70b9\u6012\u6c14"
				},
				"499": {
					"id": "499",
					"upgradeId": "296",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u53479~45\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c118%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad840%"
				},
				"515": {
					"id": "515",
					"upgradeId": "298",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "41",
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
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u534760%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a03\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u801720\u6012\u6c14"
				},
				"571": {
					"id": "571",
					"upgradeId": "306",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "42",
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
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad835%"
				},
				"638": {
					"id": "638",
					"upgradeId": "342",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "44",
					"requireLevel1": "8",
					"requireSpecialization2": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c2.7%"
				},
				"652": {
					"id": "652",
					"upgradeId": "343",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "44",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534756%"
				},
				"756": {
					"id": "756",
					"upgradeId": "353",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u670945%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"826": {
					"id": "826",
					"upgradeId": "359",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "47",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed18%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad818%"
				},
				"848": {
					"id": "848",
					"upgradeId": "361",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534756%"
				},
				"1144": {
					"id": "1144",
					"upgradeId": "371",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "49",
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
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534754%\u4f24\u5bb3"
				},
				"1319": {
					"id": "1319",
					"upgradeId": "377",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "50",
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
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e2696%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1160%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801760\u70b9"
				},
				"1326": {
					"id": "1326",
					"upgradeId": "378",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "50",
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
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad818%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14"
				},
				"1336": {
					"id": "1336",
					"upgradeId": "387",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "52",
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
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a014%"
				},
				"1343": {
					"id": "1343",
					"upgradeId": "388",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "52",
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
					"description": "\u4f24\u5bb3\u589e\u52a027%"
				},
				"1354": {
					"id": "1354",
					"upgradeId": "392",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "54",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d27\u70b9"
				},
				"1361": {
					"id": "1361",
					"upgradeId": "393",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f46\u79d2"
				},
				"1427": {
					"id": "1427",
					"upgradeId": "398",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534754%\u4f24\u5bb3"
				},
				"1434": {
					"id": "1434",
					"upgradeId": "399",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "56",
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
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u534727%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba"
				},
				"1784": {
					"id": "1784",
					"upgradeId": "34",
					"index": "5",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534756%"
				},
				"1790": {
					"id": "1790",
					"upgradeId": "46",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "28",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a011\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a04"
				},
				"1796": {
					"id": "1796",
					"upgradeId": "47",
					"index": "5",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "28",
					"requireLevel1": "6",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534730%\uff0c\u6bcf\u6b21\u51fb\u4e2d\u989d\u5916\u56de\u590d1\u6012\u6c14\u3002"
				},
				"1808": {
					"id": "1808",
					"upgradeId": "123",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "30",
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
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534745%"
				},
				"1814": {
					"id": "1814",
					"upgradeId": "307",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "42",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "305",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c118\u70b9"
				},
				"1820": {
					"id": "1820",
					"upgradeId": "351",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "46",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c2.7\u79d2"
				},
				"1826": {
					"id": "1826",
					"upgradeId": "373",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "49",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "369",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u534727%"
				},
				"85": {
					"id": "85",
					"upgradeId": "33",
					"index": "6",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "24",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\u53d1\u52a8\u64bc\u5730\u9524\uff0c\u4f1a\u89e6\u53d1\u9707\u5929\u6218\u543c\uff0c4\u79d2\u5185\u653b\u51fb\u901f\u5ea6\u63d0\u9ad830\u70b9\uff0c\u5e76\u62db\u67b630%\u4f24\u5bb3"
				},
				"271": {
					"id": "271",
					"upgradeId": "148",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "33",
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
					"description": "\u9b54\u624b\u6444\u654c\u84c4\u529b\u6ee1\u540e\u53ef\u4ee5\u989d\u5916\u7275\u5f155\u4e2a\u654c\u4eba\uff0c\u8303\u56f4\u589e\u52a05\u7c73"
				},
				"278": {
					"id": "278",
					"upgradeId": "145",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "33",
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
					"description": "\u589e\u52a050%\u4f24\u5bb3\uff0c\u5e76\u670970%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u65ad\u7b4b"
				},
				"327": {
					"id": "327",
					"upgradeId": "169",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "34",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u51cf\u5c1130%"
				},
				"341": {
					"id": "341",
					"upgradeId": "173",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "34",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%"
				},
				"406": {
					"id": "406",
					"upgradeId": "238",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "37",
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
					"description": "\u4f24\u5bb3\u589e\u52a045%"
				},
				"427": {
					"id": "427",
					"upgradeId": "240",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "37",
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
					"description": "\u589e\u52a0\u65ad\u7b4b\u7684\u57fa\u7840\u6982\u7387105%\uff0c\u589e\u52a0\u5c04\u7a0b3\u7c73"
				},
				"448": {
					"id": "448",
					"upgradeId": "285",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "38",
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
					"description": "\u4f24\u5bb3\u589e\u52a045%"
				},
				"461": {
					"id": "461",
					"upgradeId": "288",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "38",
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
					"description": "\u6bcf\u649e\u51fb\u4e00\u4e2a\u654c\u4eba\uff0c\u6709100%\u51e0\u7387\u56de\u590d5\u70b9\u6012\u6c14"
				},
				"500": {
					"id": "500",
					"upgradeId": "296",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "41",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u653b\u901f\u63d0\u534715~75\uff0c\u751f\u547d\u503c\u8d8a\u4f4e\u6548\u679c\u8d8a\u5f3a\uff0c\u5e76\u4e14\u55dc\u8840\u7cfb\u6280\u80fd\u5168\u90e8\u51cf\u5c1110%\u7684\u51b7\u5374\u65f6\u95f4\uff0c\u5728\u6b64\u72b6\u6001\u4e0b\u5f00\u542f\u566c\u8840\u72c2\u6740\u4f1a\u4f7f\u5438\u8840\u6548\u679c\u63d0\u9ad850%"
				},
				"516": {
					"id": "516",
					"upgradeId": "298",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "41",
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
					"description": "\u566c\u8840\u72c2\u6740\u7684\u5438\u8840\u6548\u679c\u63d0\u5347100%\uff0c\u6700\u5927\u6301\u7eed\u65f6\u95f4\u589e\u52a05\u79d2\uff0c\u4f46\u662f\u6bcf\u79d2\u989d\u5916\u6d88\u801725\u6012\u6c14"
				},
				"639": {
					"id": "639",
					"upgradeId": "342",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "44",
					"requireLevel1": "9",
					"requireSpecialization2": "41",
					"requireLevel2": "1",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u6311\u6740\u62e5\u6709\u5438\u8840\u6548\u679c\uff0c\u6bcf\u51fb\u4e2d\u4e00\u4e2a\u654c\u4eba\u56de\u590d\u725b\u9b54\u603b\u751f\u547d\u503c4.5%"
				},
				"653": {
					"id": "653",
					"upgradeId": "343",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "44",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%"
				},
				"757": {
					"id": "757",
					"upgradeId": "353",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "46",
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
					"description": "\u6012\u5578\u957f\u5929\u670975%\u57fa\u7840\u6982\u7387\u89e6\u53d1\u7729\u6655\u6548\u679c"
				},
				"827": {
					"id": "827",
					"upgradeId": "359",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "47",
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
					"description": "\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u65f6\u95f4\u7f29\u77ed30%\uff0c\u4e14\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad836%"
				},
				"849": {
					"id": "849",
					"upgradeId": "361",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "47",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%"
				},
				"1145": {
					"id": "1145",
					"upgradeId": "371",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "49",
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
					"description": "\u60ac\u70bd\u73e0\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534790%\u4f24\u5bb3"
				},
				"1320": {
					"id": "1320",
					"upgradeId": "377",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "50",
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
					"description": "\u6700\u540e\u4e00\u51fb\u9644\u5e26144%\u57fa\u7840\u6982\u7387\u7684\u7729\u6655\u6548\u679c\uff0c\u4e71\u98ce\u62f3\u51b7\u5374\u65f6\u95f4\u51cf\u5c1170%\uff0c\u4f46\u662f\u589e\u52a0\u6012\u6c14\u6d88\u801730\u70b9"
				},
				"1327": {
					"id": "1327",
					"upgradeId": "378",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "50",
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
					"description": "\u91ca\u653e\u65f6\u95f4\u6bcf\u589e\u52a0\u4e00\u79d2\uff0c\u6700\u540e\u4e00\u62f3\u7684\u653b\u51fb\u529b\u90fd\u4f1a\u63d0\u9ad830%\uff0c\u4f46\u662f\u6bcf\u4e00\u79d2\u4e71\u62f3\u6253\u51fb\u6d88\u80175\u70b9\u6012\u6c14"
				},
				"1337": {
					"id": "1337",
					"upgradeId": "387",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "52",
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
					"description": "\u5de8\u65cb\u98ce\u5438\u6536\u4f24\u5bb3\u7684\u6548\u679c\u589e\u52a020%"
				},
				"1344": {
					"id": "1344",
					"upgradeId": "388",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "52",
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
					"description": "\u4f24\u5bb3\u589e\u52a045%"
				},
				"1355": {
					"id": "1355",
					"upgradeId": "392",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "54",
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
					"description": "\u5f53\u8840\u91cf\u4f4e\u4e8e50%\u65f6\uff0c\u51b7\u5374\u56fa\u5b9a\u51cf\u5c1150%\uff0c\u6012\u6c14\u6d88\u8017\u4e0b\u964d45\u70b9"
				},
				"1362": {
					"id": "1362",
					"upgradeId": "393",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "54",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u5ef6\u957f\u5730\u9762\u71c3\u70e7\u65f6\u95f47\u79d2"
				},
				"1428": {
					"id": "1428",
					"upgradeId": "398",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "56",
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
					"description": "\u70c8\u9b54\u7206\u5bf9\u88c2\u9aa8\u638c\u5370\u7684\u654c\u4eba\u63d0\u534790%\u4f24\u5bb3"
				},
				"1435": {
					"id": "1435",
					"upgradeId": "399",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "56",
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
					"description": "\u5f3a\u5316\u70c8\u9b54\u7206\u5bf9\u60ac\u70bd\u73e0\u7684\u6c14\u529f\u6ce8\u5165\u7684\u6548\u679c\uff0c\u60ac\u70bd\u73e0\u5728\u7206\u70b8\u65f6\u4f24\u5bb3\u63d0\u534745%\uff0c\u6ce2\u53ca\u7684\u4eba\u6570\u589e\u52a01\u4eba"
				},
				"1785": {
					"id": "1785",
					"upgradeId": "34",
					"index": "6",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "24",
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
					"description": "\u5728\u55dc\u8840\u72c2\u6740\u4e0b\u53d1\u52a8\uff0c\u653b\u51fb\u529b\u63d0\u534790%"
				},
				"1791": {
					"id": "1791",
					"upgradeId": "46",
					"index": "6",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "28",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u88c2\u9aa8\u638c\u5370\u7684\u6301\u7eed\u65f6\u95f4\u589e\u52a015\u79d2\uff0c\u6bcf\u79d2\u56de\u590d\u6012\u6c14\u589e\u52a06"
				},
				"1797": {
					"id": "1797",
					"upgradeId": "47",
					"index": "6",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "28",
					"requireLevel1": "7",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "38",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u9739\u96f3\u638c\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534735%\uff0c\u6bcf\u6b21\u51fb\u4e2d\u989d\u5916\u56de\u590d2\u6012\u6c14\u3002"
				},
				"1803": {
					"id": "1803",
					"upgradeId": "120",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "30",
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
					"description": "\u5f53\u751f\u547d\u503c\u4f4e\u4e8e50%\u65f6\uff0c\u70c8\u8840\u65a9\u62db\u67b660%\u4f24\u5bb3"
				},
				"1809": {
					"id": "1809",
					"upgradeId": "123",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "30",
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
					"description": "\u5728\u53d1\u52a8\u566c\u8840\u72c2\u6740\u540e\uff0c\u70c8\u8840\u65a9\u7684\u653b\u51fb\u901f\u5ea6\u63d0\u534775%"
				},
				"1815": {
					"id": "1815",
					"upgradeId": "307",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "42",
					"requireLevel1": "8",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "305",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u589e\u5f3a\u201c\u6012\u201d\u5883\u754c\uff0c\u6012\u5883\u754c\u4e0b\u9739\u96f3\u638c\u6bcf\u79d2\u6d88\u8017\u7684\u6012\u6c14\u51cf\u5c1115\u70b9"
				},
				"1821": {
					"id": "1821",
					"upgradeId": "351",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "46",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "349",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u5ef6\u957f\u653b\u901f\u63d0\u5347\u6548\u679c4.5\u79d2"
				},
				"1827": {
					"id": "1827",
					"upgradeId": "373",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "49",
					"requireLevel1": "9",
					"requireSpecialization2": "0",
					"requireLevel2": "0",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "369",
					"requireUpgradeLevel1": "1",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "4",
					"description": "\u60ac\u70bd\u73e0\u5f39\u5c04\u72b6\u6001\u4e0b\u4f24\u5bb3\u63d0\u534745%"
				},
				"572": {
					"id": "572",
					"upgradeId": "306",
					"index": "6",
					"requireLevel": "22",
					"step": "46",
					"requireSpecialization1": "42",
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
					"description": "\u589e\u5f3a\u201c\u72c2\u201d\u5883\u754c\uff0c\u72c2\u5883\u754c\u4e0b\u9739\u96f3\u638c\u7684\u653b\u51fb\u529b\u989d\u5916\u63d0\u9ad850%"
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