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
				"id": "6",
				"icon": "images\/role_icon1.png",
				"name": "\u9f99\u5973"
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
				"2": {
					"id": "2",
					"icon": "zx_ln_lrx",
					"name": "\u94fe\u5203\u7cfb",
					"description": "\u94fe\u5203\u6280\u80fd\u7684\u4f24\u5bb3\u8f93\u51fa\u63d0\u534720%"
				},
				"8": {
					"id": "8",
					"icon": "zx_ln_csx",
					"name": "\u523a\u6740\u7cfb",
					"description": "\u9f99\u8840\u5370\u8bb0\u5728\u76ee\u6807\u8eab\u4e0a\u53ef\u53e0\u52a0\u81f33\u5c42\u3002\r\n\u8fdb\u5165\u6218\u6597\u540e\uff0c\u9f99\u5973\u6bcf\u79fb\u52a85\u7c73\u5c06\u83b7\u5f97\u4e00\u5c42\u653b\u51fb\u529b\u63d0\u534740%\u6548\u679c\uff0c\u53ef\u53e0\u52a02\u5c42\u3002\u800c\u6bcf\u653b\u51fb\u654c\u4eba\u4e00\u6b21\u6216\u6536\u5230\u4e00\u6b21\u4f24\u5bb3\u5c06\u79fb\u9664\u4e00\u5c42\u8be5\u6548\u679c\u3002"
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
				"3": {
					"id": "3",
					"preSpell": "0",
					"name": "\u6c14\u5143\u65a9",
					"pic": "ln_qyz",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "1",
					"needSpellBook": "0",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621060%\uff08\u4e3b\u624b\uff09\u3001151%\uff08\u526f\u624b\uff09\u3001175%\uff08\u526f\u624b\uff09\u3001198%\uff08\u4e3b\u624b\uff09\u3001223%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002",
					"effect": {
						"2": "3",
						"3": "4",
						"4": "5",
						"5": "6",
						"6": "7",
						"7": "8",
						"8": "9",
						"9": "10",
						"10": "11",
						"11": "12",
						"12": "13",
						"1": "14",
						"13": "72",
						"14": "73",
						"15": "74",
						"16": "75",
						"17": "76",
						"18": "77",
						"19": "78",
						"20": "79"
					},
					"upgrade": ["3", "4", "5", "6", "7"]
				},
				"4": {
					"id": "4",
					"preSpell": "0",
					"name": "\u8f7b\u5203",
					"pic": "ln_qr",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "1",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621096%\u3001112%\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210130%\u3001154%\u4f24\u5bb3\u3002\r\n",
					"effect": {
						"1": "16",
						"2": "42",
						"3": "43",
						"4": "44",
						"5": "45",
						"6": "46",
						"7": "47",
						"8": "48",
						"9": "49",
						"10": "50",
						"11": "51",
						"12": "52",
						"13": "53",
						"14": "54",
						"15": "55",
						"16": "56",
						"17": "57",
						"18": "58",
						"19": "59",
						"20": "60"
					},
					"upgrade": ["9", "10", "11", "12", "13"]
				},
				"5": {
					"id": "5",
					"preSpell": "0",
					"name": "\u56de\u5203",
					"pic": "ln_hr",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621075%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002",
					"effect": {
						"1": "921",
						"2": "922",
						"3": "923",
						"4": "924",
						"5": "925",
						"6": "926",
						"7": "927",
						"8": "928",
						"9": "929",
						"10": "930",
						"11": "931",
						"12": "932",
						"13": "933",
						"14": "934",
						"15": "935",
						"16": "936",
						"17": "937",
						"18": "938",
						"19": "939",
						"20": "940"
					},
					"upgrade": ["262", "275", "291", "300", "394"]
				},
				"6": {
					"id": "6",
					"preSpell": "0",
					"name": "\u98de\u661f",
					"pic": "ln_fx",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "2",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210802%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n",
					"effect": {
						"1": "1904",
						"2": "1905",
						"3": "1906",
						"4": "1907",
						"5": "1908",
						"6": "1909",
						"7": "1910",
						"8": "1911",
						"9": "1912",
						"10": "1913",
						"11": "1914",
						"12": "1915",
						"13": "1916",
						"14": "1917",
						"15": "1918",
						"16": "1919",
						"17": "1920",
						"18": "1921",
						"19": "1922",
						"20": "1923"
					},
					"upgrade": ["473", "474", "475", "476", "479"]
				},
				"7": {
					"id": "7",
					"preSpell": "0",
					"name": "\u91cd\u5203",
					"pic": "ln_zr",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210235%(\u4e3b\u624b)\u3001269%(\u526f\u624b)\u3001300%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n",
					"effect": {
						"1": "1703",
						"2": "1704",
						"3": "1705",
						"4": "1706",
						"5": "1707",
						"6": "1708",
						"7": "1709",
						"8": "1710",
						"9": "1711",
						"10": "1712",
						"11": "1713",
						"12": "1714",
						"13": "1715",
						"14": "1716",
						"15": "1717",
						"16": "1718",
						"17": "1719",
						"18": "1720",
						"19": "1721",
						"20": "1722"
					},
					"upgrade": ["425", "426", "427", "428", "429"]
				},
				"8": {
					"id": "8",
					"preSpell": "0",
					"name": "\u95ea\u51fb",
					"pic": "ln_sj",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "3",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210517%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n",
					"effect": {
						"1": "1723",
						"2": "1725",
						"3": "1726",
						"4": "1727",
						"5": "1728",
						"6": "1729",
						"7": "1730",
						"8": "1731",
						"9": "1732",
						"10": "1733",
						"11": "1734",
						"12": "1735",
						"13": "1736",
						"14": "1737",
						"15": "1738",
						"16": "1739",
						"17": "1740",
						"18": "1741",
						"19": "1742",
						"20": "1743"
					},
					"upgrade": ["430", "431", "432", "433", "434"]
				},
				"9": {
					"id": "9",
					"preSpell": "0",
					"name": "\u5f15\u7206",
					"pic": "ln_yb",
					"maxStep": "20",
					"masteryId": "8",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210408%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n",
					"effect": {
						"1": "1683",
						"2": "1684",
						"3": "1685",
						"4": "1686",
						"5": "1687",
						"6": "1688",
						"7": "1689",
						"8": "1690",
						"9": "1691",
						"10": "1692",
						"11": "1693",
						"12": "1694",
						"13": "1695",
						"14": "1696",
						"15": "1697",
						"16": "1698",
						"17": "1699",
						"18": "1700",
						"19": "1701",
						"20": "1702"
					},
					"upgrade": ["420", "421", "422", "423", "424"]
				},
				"10": {
					"id": "10",
					"preSpell": "0",
					"name": "\u5200\u9635",
					"pic": "ln_dz",
					"maxStep": "20",
					"masteryId": "2",
					"maxMastery": "20",
					"layerId": "4",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210190%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210252%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf6\u3002\r\n",
					"effect": {
						"1": "1663",
						"2": "1664",
						"3": "1665",
						"4": "1666",
						"5": "1667",
						"6": "1668",
						"7": "1669",
						"8": "1670",
						"9": "1671",
						"10": "1672",
						"11": "1673",
						"12": "1674",
						"13": "1675",
						"14": "1676",
						"15": "1677",
						"16": "1678",
						"17": "1679",
						"18": "1680",
						"19": "1681",
						"20": "1682"
					},
					"upgrade": ["415", "416", "417", "418", "419"]
				},
				"11": {
					"id": "11",
					"preSpell": "0",
					"name": "\u62c9\u5203",
					"pic": "ln_lr",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210320%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210832%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n",
					"effect": {
						"1": "1744",
						"2": "1745",
						"3": "1746",
						"4": "1747",
						"5": "1748",
						"6": "1749",
						"7": "1750",
						"8": "1751",
						"9": "1752",
						"10": "1753",
						"11": "1754",
						"12": "1755",
						"13": "1756",
						"14": "1757",
						"15": "1758",
						"16": "1759",
						"17": "1760",
						"18": "1761",
						"19": "1762",
						"20": "1763"
					},
					"upgrade": ["435", "436", "437", "438", "439"]
				},
				"12": {
					"id": "12",
					"preSpell": "0",
					"name": "\u60ca\u843d",
					"pic": "ln_jl",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597343%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52305\u79d2\u540e\u6d88\u5931\u3002",
					"effect": {
						"1": "1764",
						"2": "1765",
						"3": "1766",
						"4": "1767",
						"5": "1768",
						"6": "1769",
						"7": "1770",
						"8": "1771",
						"9": "1772",
						"10": "1773",
						"11": "1774",
						"12": "1775",
						"13": "1776",
						"14": "1777",
						"15": "1778",
						"16": "1779",
						"17": "1780",
						"18": "1781",
						"19": "1782",
						"20": "1783"
					},
					"upgrade": ["440", "441", "442", "443", "444"]
				},
				"13": {
					"id": "13",
					"preSpell": "0",
					"name": "\u533f\u8e2a",
					"pic": "ln_nz",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "5",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9796\u70b9\u63d0\u5347\u3002",
					"effect": {
						"1": "1784",
						"2": "1785",
						"3": "1786",
						"4": "1787",
						"5": "1788",
						"6": "1789",
						"7": "1790",
						"8": "1791",
						"9": "1792",
						"10": "1793",
						"11": "1794",
						"12": "1795",
						"13": "1796",
						"14": "1797",
						"15": "1798",
						"16": "1799",
						"17": "1800",
						"18": "1801",
						"19": "1802",
						"20": "1803"
					},
					"upgrade": ["445", "446", "447", "448", "449"]
				},
				"14": {
					"id": "14",
					"preSpell": "0",
					"name": "\u56de\u65cb\u6740",
					"pic": "ln_hxs",
					"maxStep": "20",
					"masteryId": "8",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a153%(\u4e3b\u624b)\u3001171%(\u526f\u624b)\u3001189%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n",
					"effect": {
						"1": "1804",
						"2": "1805",
						"3": "1806",
						"4": "1807",
						"5": "1808",
						"6": "1809",
						"7": "1810",
						"8": "1811",
						"9": "1812",
						"10": "1813",
						"11": "1814",
						"12": "1815",
						"13": "1816",
						"14": "1817",
						"15": "1818",
						"16": "1819",
						"17": "1820",
						"18": "1821",
						"19": "1822",
						"20": "1823"
					},
					"upgrade": ["450", "451", "452", "453", "454"]
				},
				"15": {
					"id": "15",
					"preSpell": "0",
					"name": "\u65cb\u5203",
					"pic": "ln_xr",
					"maxStep": "20",
					"masteryId": "2",
					"maxMastery": "20",
					"layerId": "6",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210331%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210601%(\u53cc\u624b)\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1824",
						"2": "1825",
						"3": "1826",
						"4": "1827",
						"5": "1828",
						"6": "1829",
						"7": "1830",
						"8": "1831",
						"9": "1832",
						"10": "1833",
						"11": "1834",
						"12": "1835",
						"13": "1836",
						"14": "1837",
						"15": "1838",
						"16": "1839",
						"17": "1840",
						"18": "1841",
						"19": "1842",
						"20": "1843"
					},
					"upgrade": ["455", "456", "457", "458", "459"]
				},
				"16": {
					"id": "16",
					"preSpell": "0",
					"name": "\u9489\u523a",
					"pic": "ln_dc",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210724%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "1844",
						"2": "1845",
						"3": "1846",
						"4": "1847",
						"5": "1848",
						"6": "1849",
						"7": "1850",
						"8": "1851",
						"9": "1852",
						"10": "1853",
						"11": "1854",
						"12": "1855",
						"13": "1856",
						"14": "1857",
						"15": "1858",
						"16": "1859",
						"17": "1860",
						"18": "1861",
						"19": "1862",
						"20": "1863"
					},
					"upgrade": ["460", "461", "462", "463", "464"]
				},
				"17": {
					"id": "17",
					"preSpell": "0",
					"name": "\u5200\u5203\u62a4\u76fe",
					"pic": "ln_drhd",
					"maxStep": "20",
					"masteryId": "8",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u62101071%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n",
					"effect": {
						"1": "1864",
						"2": "1865",
						"3": "1866",
						"4": "1867",
						"5": "1868",
						"6": "1869",
						"7": "1870",
						"8": "1871",
						"9": "1872",
						"10": "1873",
						"11": "1874",
						"12": "1875",
						"13": "1876",
						"14": "1877",
						"15": "1878",
						"16": "1879",
						"17": "1880",
						"18": "1881",
						"19": "1882",
						"20": "1883"
					},
					"upgrade": ["465", "466", "467", "468", "469"]
				},
				"18": {
					"id": "18",
					"preSpell": "0",
					"name": "\u63d0\u5203",
					"pic": "ln_tr",
					"maxStep": "20",
					"masteryId": "2",
					"maxMastery": "20",
					"layerId": "8",
					"permanent": "0",
					"needSpellBook": "0",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210537%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210611%\u3001684%\u3001757%\u3001837%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002",
					"effect": {
						"1": "1884",
						"2": "1885",
						"3": "1886",
						"4": "1887",
						"5": "1888",
						"6": "1889",
						"7": "1890",
						"8": "1891",
						"9": "1892",
						"10": "1893",
						"11": "1894",
						"12": "1895",
						"13": "1896",
						"14": "1897",
						"15": "1898",
						"16": "1899",
						"17": "1900",
						"18": "1901",
						"19": "1902",
						"20": "1903"
					},
					"upgrade": ["470", "471", "472", "477", "478"]
				},
				"102": {
					"id": "102",
					"preSpell": "0",
					"name": "\u4fa7\u5203",
					"pic": "ln_cr",
					"maxStep": "20",
					"masteryId": "0",
					"maxMastery": "20",
					"layerId": "7",
					"permanent": "0",
					"needSpellBook": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621093%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n\u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u621099%\uff08\u4f24\u5bb3\uff09",
					"effect": {
						"1": "2631",
						"2": "2632",
						"3": "2633",
						"4": "2634",
						"5": "2635",
						"6": "2636",
						"7": "2637",
						"8": "2638",
						"9": "2639",
						"10": "2640",
						"11": "2641",
						"12": "2642",
						"13": "2643",
						"14": "2644",
						"15": "2645",
						"16": "2646",
						"17": "2647",
						"18": "2648",
						"19": "2649",
						"20": "2650"
					},
					"upgrade": ["502", "503", "504", "505", "506"]
				}
			},
			"specializationSpellEffect": {
				"3": {
					"id": "3",
					"specializationId": "3",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621072%\uff08\u4e3b\u624b\uff09\u3001159%\uff08\u526f\u624b\uff09\u3001183%\uff08\u526f\u624b\uff09\u3001208.5%\uff08\u4e3b\u624b\uff09\u3001234%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"4": {
					"id": "4",
					"specializationId": "3",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621076%\uff08\u4e3b\u624b\uff09\u3001166%\uff08\u526f\u624b\uff09\u3001192%\uff08\u526f\u624b\uff09\u3001217.5%\uff08\u4e3b\u624b\uff09\u3001244%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"5": {
					"id": "5",
					"specializationId": "3",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621079%\uff08\u4e3b\u624b\uff09\u3001172%\uff08\u526f\u624b\uff09\u3001199%\uff08\u526f\u624b\uff09\u3001226.5%\uff08\u4e3b\u624b\uff09\u3001255%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"6": {
					"id": "6",
					"specializationId": "3",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "4",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621082%\uff08\u4e3b\u624b\uff09\u3001180%\uff08\u526f\u624b\uff09\u3001208%\uff08\u526f\u624b\uff09\u3001237%\uff08\u4e3b\u624b\uff09\u3001265%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"7": {
					"id": "7",
					"specializationId": "3",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "5",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621085%\uff08\u4e3b\u624b\uff09\u3001187%\uff08\u526f\u624b\uff09\u3001216%\uff08\u526f\u624b\uff09\u3001246%\uff08\u4e3b\u624b\uff09\u3001276%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"8": {
					"id": "8",
					"specializationId": "3",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "6",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621088%\uff08\u4e3b\u624b\uff09\u3001195%\uff08\u526f\u624b\uff09\u3001225%\uff08\u526f\u624b\uff09\u3001255%\uff08\u4e3b\u624b\uff09\u3001288%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"9": {
					"id": "9",
					"specializationId": "3",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "13",
					"requireSkillPoint": "7",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621093%\uff08\u4e3b\u624b\uff09\u3001202%\uff08\u526f\u624b\uff09\u3001232%\uff08\u526f\u624b\uff09\u3001264%\uff08\u4e3b\u624b\uff09\u3001298%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"10": {
					"id": "10",
					"specializationId": "3",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "8",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621096%\uff08\u4e3b\u624b\uff09\u3001208%\uff08\u526f\u624b\uff09\u3001241%\uff08\u526f\u624b\uff09\u3001274.5%\uff08\u4e3b\u624b\uff09\u3001309%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"11": {
					"id": "11",
					"specializationId": "3",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "15",
					"requireSkillPoint": "9",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621099%\uff08\u4e3b\u624b\uff09\u3001216%\uff08\u526f\u624b\uff09\u3001250%\uff08\u526f\u624b\uff09\u3001283.5%\uff08\u4e3b\u624b\uff09\u3001319%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"12": {
					"id": "12",
					"specializationId": "3",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "10",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210102%\uff08\u4e3b\u624b\uff09\u3001223%\uff08\u526f\u624b\uff09\u3001258%\uff08\u526f\u624b\uff09\u3001292.5%\uff08\u4e3b\u624b\uff09\u3001330%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"13": {
					"id": "13",
					"specializationId": "3",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "11",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210105%\uff08\u4e3b\u624b\uff09\u3001231%\uff08\u526f\u624b\uff09\u3001267%\uff08\u526f\u624b\uff09\u3001303%\uff08\u4e3b\u624b\uff09\u3001340%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"14": {
					"id": "14",
					"specializationId": "3",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u621069%\uff08\u4e3b\u624b\uff09\u3001151%\uff08\u526f\u624b\uff09\u3001175%\uff08\u526f\u624b\uff09\u3001198%\uff08\u4e3b\u624b\uff09\u3001223%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"16": {
					"id": "16",
					"specializationId": "4",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "4",
					"requireSkillPoint": "0",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621050%\uff08\u4e3b\u624b\uff09\u300158%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621069%\uff08\u4e3b\u624b\uff09\u300181%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"42": {
					"id": "42",
					"specializationId": "4",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621053%\uff08\u4e3b\u624b\uff09\u300161%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621072%\uff08\u4e3b\u624b\uff09\u300185%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"43": {
					"id": "43",
					"specializationId": "4",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "12",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621055%\uff08\u4e3b\u624b\uff09\u300164%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621075%\uff08\u4e3b\u624b\uff09\u300189%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"44": {
					"id": "44",
					"specializationId": "4",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "16",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621058%\uff08\u4e3b\u624b\uff09\u300167%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621079%\uff08\u4e3b\u624b\uff09\u300193%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"45": {
					"id": "45",
					"specializationId": "4",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "20",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621060%\uff08\u4e3b\u624b\uff09\u300170%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621082%\uff08\u4e3b\u624b\uff09\u300197%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"46": {
					"id": "46",
					"specializationId": "4",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "24",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621062%\uff08\u4e3b\u624b\uff09\u300173%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621085%\uff08\u4e3b\u624b\uff09\u3001101%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"47": {
					"id": "47",
					"specializationId": "4",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "28",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621065%\uff08\u4e3b\u624b\uff09\u300175%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621089%\uff08\u4e3b\u624b\uff09\u3001105%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"48": {
					"id": "48",
					"specializationId": "4",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621067%\uff08\u4e3b\u624b\uff09\u300178%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621092%\uff08\u4e3b\u624b\uff09\u3001108%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"49": {
					"id": "49",
					"specializationId": "4",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621070%\uff08\u4e3b\u624b\uff09\u300181%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621095%\uff08\u4e3b\u624b\uff09\u3001112%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"50": {
					"id": "50",
					"specializationId": "4",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621072%\uff08\u4e3b\u624b\uff09\u300184%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u621098%\uff08\u4e3b\u624b\uff09\u3001116%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"51": {
					"id": "51",
					"specializationId": "4",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621074%\uff08\u4e3b\u624b\uff09\u300187%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210101%\uff08\u4e3b\u624b\uff09\u3001120%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"52": {
					"id": "52",
					"specializationId": "4",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621077%\uff08\u4e3b\u624b\uff09\u300190%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210105%\uff08\u4e3b\u624b\uff09\u3001124%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"53": {
					"id": "53",
					"specializationId": "4",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621080%\uff08\u4e3b\u624b\uff09\u300193%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210108%\uff08\u4e3b\u624b\uff09\u3001128%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"54": {
					"id": "54",
					"specializationId": "4",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621082%\uff08\u4e3b\u624b\uff09\u300195%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210111%\uff08\u4e3b\u624b\uff09\u3001131%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"55": {
					"id": "55",
					"specializationId": "4",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621088%\uff08\u4e3b\u624b\uff09\u3001101%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210106%\uff08\u4e3b\u624b\uff09\u3001139%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"56": {
					"id": "56",
					"specializationId": "4",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621089%\uff08\u4e3b\u624b\uff09\u3001103%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210108%\uff08\u4e3b\u624b\uff09\u3001141%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"57": {
					"id": "57",
					"specializationId": "4",
					"step": "17",
					"castTime": "",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621091%\uff08\u4e3b\u624b\uff09\u3001105%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210110%\uff08\u4e3b\u624b\uff09\u3001144%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"58": {
					"id": "58",
					"specializationId": "4",
					"step": "18",
					"castTime": "",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621092%\uff08\u4e3b\u624b\uff09\u3001107%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210112%\uff08\u4e3b\u624b\uff09\u3001147%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"59": {
					"id": "59",
					"specializationId": "4",
					"step": "19",
					"castTime": "",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621094%\uff08\u4e3b\u624b\uff09\u3001110%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210125%\uff08\u4e3b\u624b\uff09\u3001150%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"60": {
					"id": "60",
					"specializationId": "4",
					"step": "20",
					"castTime": "",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e24\u6b21\u6325\u821e\u94fe\u5203\u6a2a\u626b\u654c\u4eba\uff0c\u9020\u621096%\uff08\u4e3b\u624b\uff09\u3001112%\uff08\u526f\u624b\uff09\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u53ef\u5f00\u542f\u7b2c\u4e09\u3001\u56db\u5f0f\uff0c\u9020\u6210130%\uff08\u4e3b\u624b\uff09\u3001154%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n"
				},
				"72": {
					"id": "72",
					"specializationId": "3",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210108%\uff08\u4e3b\u624b\uff09\u3001239%\uff08\u526f\u624b\uff09\u3001276%\uff08\u526f\u624b\uff09\u3001313%\uff08\u4e3b\u624b\uff09\u3001350%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"73": {
					"id": "73",
					"specializationId": "3",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210111%\uff08\u4e3b\u624b\uff09\u3001247%\uff08\u526f\u624b\uff09\u3001285%\uff08\u526f\u624b\uff09\u3001323%\uff08\u4e3b\u624b\uff09\u3001360%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"74": {
					"id": "74",
					"specializationId": "3",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210114%\uff08\u4e3b\u624b\uff09\u3001255%\uff08\u526f\u624b\uff09\u3001294%\uff08\u526f\u624b\uff09\u3001333%\uff08\u4e3b\u624b\uff09\u3001370%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"75": {
					"id": "75",
					"specializationId": "3",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210117%\uff08\u4e3b\u624b\uff09\u3001263%\uff08\u526f\u624b\uff09\u3001303%\uff08\u526f\u624b\uff09\u3001343%\uff08\u4e3b\u624b\uff09\u3001380%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"76": {
					"id": "76",
					"specializationId": "3",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210120%\uff08\u4e3b\u624b\uff09\u3001271%\uff08\u526f\u624b\uff09\u3001312%\uff08\u526f\u624b\uff09\u3001353%\uff08\u4e3b\u624b\uff09\u3001390%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"77": {
					"id": "77",
					"specializationId": "3",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210123%\uff08\u4e3b\u624b\uff09\u3001278%\uff08\u526f\u624b\uff09\u3001321%\uff08\u526f\u624b\uff09\u3001363%\uff08\u4e3b\u624b\uff09\u3001400%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"78": {
					"id": "78",
					"specializationId": "3",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210126%\uff08\u4e3b\u624b\uff09\u3001286%\uff08\u526f\u624b\uff09\u3001330%\uff08\u526f\u624b\uff09\u3001373%\uff08\u4e3b\u624b\uff09\u3001410%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"79": {
					"id": "79",
					"specializationId": "3",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u663e\u8457\u63d0\u5347\u6c14\u5143\u65a9\u524d\u4e09\u5f0f\u6548\u679c\u5e76\u5f00\u542f\u6c14\u5143\u65a9\u7b2c\u56db\u5f0f\u3002\u6c14\u5143\u65a9\u4f9d\u6b21\u9020\u6210129%\uff08\u4e3b\u624b\uff09\u3001290%\uff08\u526f\u624b\uff09\u3001334.5%\uff08\u526f\u624b\uff09\u3001378%\uff08\u4e3b\u624b\uff09\u3001415%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u5e76\u9644\u5e26\u51fb\u9000\u6548\u679c\u3002"
				},
				"921": {
					"id": "921",
					"specializationId": "5",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621075%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"922": {
					"id": "922",
					"specializationId": "5",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "10",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621079%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"923": {
					"id": "923",
					"specializationId": "5",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621082%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"924": {
					"id": "924",
					"specializationId": "5",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621086%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"925": {
					"id": "925",
					"specializationId": "5",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621089%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"926": {
					"id": "926",
					"specializationId": "5",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621093%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"927": {
					"id": "927",
					"specializationId": "5",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u621096%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"928": {
					"id": "928",
					"specializationId": "5",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210100%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"929": {
					"id": "929",
					"specializationId": "5",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210103%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"930": {
					"id": "930",
					"specializationId": "5",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210107%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"931": {
					"id": "931",
					"specializationId": "5",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210111%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"932": {
					"id": "932",
					"specializationId": "5",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210115%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"933": {
					"id": "933",
					"specializationId": "5",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210119%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"934": {
					"id": "934",
					"specializationId": "5",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210123%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"935": {
					"id": "935",
					"specializationId": "5",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210130%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"936": {
					"id": "936",
					"specializationId": "5",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210132%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"937": {
					"id": "937",
					"specializationId": "5",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210134%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"938": {
					"id": "938",
					"specializationId": "5",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210136%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"939": {
					"id": "939",
					"specializationId": "5",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210139%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"940": {
					"id": "940",
					"specializationId": "5",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "6.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u65b9\u5411\u5c04\u51fa\u94fe\u5203\uff0c\u5bf9\u4f24\u5bb3\u76f4\u7ebf\u4e0a\u7684\u654c\u4eba\u9020\u6210142%(\u4e3b\u624b)\u4f24\u5bb3\uff0c\u540c\u65f6\u81ea\u8eab\u540e\u9000\u3002"
				},
				"1663": {
					"id": "1663",
					"specializationId": "10",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1664": {
					"id": "1664",
					"specializationId": "10",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1665": {
					"id": "1665",
					"specializationId": "10",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1666": {
					"id": "1666",
					"specializationId": "10",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1667": {
					"id": "1667",
					"specializationId": "10",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "23",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1668": {
					"id": "1668",
					"specializationId": "10",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1669": {
					"id": "1669",
					"specializationId": "10",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1670": {
					"id": "1670",
					"specializationId": "10",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1671": {
					"id": "1671",
					"specializationId": "10",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1672": {
					"id": "1672",
					"specializationId": "10",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1673": {
					"id": "1673",
					"specializationId": "10",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1674": {
					"id": "1674",
					"specializationId": "10",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1675": {
					"id": "1675",
					"specializationId": "10",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1676": {
					"id": "1676",
					"specializationId": "10",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1677": {
					"id": "1677",
					"specializationId": "10",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1678": {
					"id": "1678",
					"specializationId": "10",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1679": {
					"id": "1679",
					"specializationId": "10",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1680": {
					"id": "1680",
					"specializationId": "10",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1681": {
					"id": "1681",
					"specializationId": "10",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1682": {
					"id": "1682",
					"specializationId": "10",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "30.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5c06\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\u8f6c\u5316\u4e3a\u4e00\u679a\u6697\u5668\uff0c\u7ede\u6740\u5468\u56f4\u654c\u4eba\uff0c\u6bcf\u79d2\u9020\u6210102%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u518d\u6b21\u65bd\u653e\u6280\u80fd\u673a\u5173\u5c06\u56de\u6536\u5230\u9f99\u5973\u8eab\u4e0a\uff0c\u5bf9\u56de\u6536\u8def\u5f84\u4e0a\u7684\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u6700\u5927\u7a7f\u900f\u6570\u91cf4\u3002\r\n"
				},
				"1683": {
					"id": "1683",
					"specializationId": "9",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "0",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1684": {
					"id": "1684",
					"specializationId": "9",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1685": {
					"id": "1685",
					"specializationId": "9",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1686": {
					"id": "1686",
					"specializationId": "9",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1687": {
					"id": "1687",
					"specializationId": "9",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "23",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1688": {
					"id": "1688",
					"specializationId": "9",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "27",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1689": {
					"id": "1689",
					"specializationId": "9",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "31",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1690": {
					"id": "1690",
					"specializationId": "9",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1691": {
					"id": "1691",
					"specializationId": "9",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "39",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1692": {
					"id": "1692",
					"specializationId": "9",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "43",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1693": {
					"id": "1693",
					"specializationId": "9",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1694": {
					"id": "1694",
					"specializationId": "9",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1695": {
					"id": "1695",
					"specializationId": "9",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1696": {
					"id": "1696",
					"specializationId": "9",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1697": {
					"id": "1697",
					"specializationId": "9",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1698": {
					"id": "1698",
					"specializationId": "9",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1699": {
					"id": "1699",
					"specializationId": "9",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1700": {
					"id": "1700",
					"specializationId": "9",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1701": {
					"id": "1701",
					"specializationId": "9",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1702": {
					"id": "1702",
					"specializationId": "9",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u5f15\u7206\u5468\u56f4\u654c\u4eba\u8eab\u4e0a\u7684\u9f99\u8840\u5370\u8bb0\uff0c\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u5c06\u5bf9\u643a\u5e26\u8005\u9020\u6210218%(\u53cc\u624b)\u4f24\u5bb3\u3002\u82e5\u654c\u4eba\u643a\u5e263\u5c42\u5370\u8bb0\uff0c\u5f15\u7206\u5c06\u4f7f\u5176\u8fdb\u5165\u6655\u7729\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\u3002\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1703": {
					"id": "1703",
					"specializationId": "7",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210124%(\u4e3b\u624b)\u3001142%(\u526f\u624b)\u3001158%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1704": {
					"id": "1704",
					"specializationId": "7",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210130%(\u4e3b\u624b)\u3001149%(\u526f\u624b)\u3001166%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1705": {
					"id": "1705",
					"specializationId": "7",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210136%(\u4e3b\u624b)\u3001155%(\u526f\u624b)\u3001173%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1706": {
					"id": "1706",
					"specializationId": "7",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210142%(\u4e3b\u624b)\u3001162%(\u526f\u624b)\u3001180%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1707": {
					"id": "1707",
					"specializationId": "7",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210147%(\u4e3b\u624b)\u3001169%(\u526f\u624b)\u3001188%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1708": {
					"id": "1708",
					"specializationId": "7",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210154%(\u4e3b\u624b)\u3001176%(\u526f\u624b)\u3001195%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1709": {
					"id": "1709",
					"specializationId": "7",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210160%(\u4e3b\u624b)\u3001182%(\u526f\u624b)\u3001203%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1710": {
					"id": "1710",
					"specializationId": "7",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210165%(\u4e3b\u624b)\u3001189%(\u526f\u624b)\u3001210%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1711": {
					"id": "1711",
					"specializationId": "7",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210171%(\u4e3b\u624b)\u3001159%(\u526f\u624b)\u3001218%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1712": {
					"id": "1712",
					"specializationId": "7",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210177%(\u4e3b\u624b)\u3001202%(\u526f\u624b)\u3001225%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1713": {
					"id": "1713",
					"specializationId": "7",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210183%(\u4e3b\u624b)\u3001209%(\u526f\u624b)\u3001233%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1714": {
					"id": "1714",
					"specializationId": "7",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210189%(\u4e3b\u624b)\u3001216%(\u526f\u624b)\u3001240%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1715": {
					"id": "1715",
					"specializationId": "7",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210195%(\u4e3b\u624b)\u3001223%(\u526f\u624b)\u3001247%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1716": {
					"id": "1716",
					"specializationId": "7",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210201%(\u4e3b\u624b)\u3001230%(\u526f\u624b)\u3001254%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1717": {
					"id": "1717",
					"specializationId": "7",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210207%(\u4e3b\u624b)\u3001237%(\u526f\u624b)\u3001261%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1718": {
					"id": "1718",
					"specializationId": "7",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210213%(\u4e3b\u624b)\u3001243%(\u526f\u624b)\u3001267%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1719": {
					"id": "1719",
					"specializationId": "7",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210219%(\u4e3b\u624b)\u3001250%(\u526f\u624b)\u3001274%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1720": {
					"id": "1720",
					"specializationId": "7",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210225%(\u4e3b\u624b)\u3001257%(\u526f\u624b)\u3001281%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1721": {
					"id": "1721",
					"specializationId": "7",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210230%(\u4e3b\u624b)\u3001262%(\u526f\u624b)\u3001291%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1722": {
					"id": "1722",
					"specializationId": "7",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u8fde\u7eed\u4e09\u6b21\u671d\u6307\u5b9a\u65b9\u5411\u7838\u4e0b\u94fe\u5203\uff0c\u5bf9\u5c0f\u8303\u56f4\u4f9d\u6b21\u9020\u6210235%(\u4e3b\u624b)\u3001269%(\u526f\u624b)\u3001300%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u65bd\u653e\u8fc7\u7a0b\u4e2d\u4e0d\u53ef\u6539\u53d8\u65b9\u5411\u3002\u7b2c\u4e8c\u3001\u4e09\u5f0f\u9700\u8981\u901a\u8fc7\u7cbe\u4fee\u6280\u80fd\u5f00\u542f\u3002\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u6655\u7729\u6548\u679c\uff0c\u5e76\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1723": {
					"id": "1723",
					"specializationId": "8",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "0",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210517%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1725": {
					"id": "1725",
					"specializationId": "8",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210543%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1726": {
					"id": "1726",
					"specializationId": "8",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210567%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1727": {
					"id": "1727",
					"specializationId": "8",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "17",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210591%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1728": {
					"id": "1728",
					"specializationId": "8",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "21",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210615%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1729": {
					"id": "1729",
					"specializationId": "8",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "25",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210640%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1730": {
					"id": "1730",
					"specializationId": "8",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "29",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210664%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1731": {
					"id": "1731",
					"specializationId": "8",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "33",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210688%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1732": {
					"id": "1732",
					"specializationId": "8",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "37",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210712%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1733": {
					"id": "1733",
					"specializationId": "8",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210738%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1734": {
					"id": "1734",
					"specializationId": "8",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210762%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1735": {
					"id": "1735",
					"specializationId": "8",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210786%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1736": {
					"id": "1736",
					"specializationId": "8",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210810%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1737": {
					"id": "1737",
					"specializationId": "8",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210834%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1738": {
					"id": "1738",
					"specializationId": "8",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210858%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002"
				},
				"1739": {
					"id": "1739",
					"specializationId": "8",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210882%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1740": {
					"id": "1740",
					"specializationId": "8",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210906%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1741": {
					"id": "1741",
					"specializationId": "8",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210930%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1742": {
					"id": "1742",
					"specializationId": "8",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210958%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1743": {
					"id": "1743",
					"specializationId": "8",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "15\u9f99\u8840",
					"cooldown": "15.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u671d\u6307\u5b9a\u4f4d\u7f6e\u51b2\u523a\u3002\u82e5\u6307\u5b9a\u4f4d\u7f6e\u9644\u8fd1\u6709\u654c\u4eba\uff0c\u9f99\u5973\u5c06\u51b2\u523a\u5230\u654c\u4eba\u8eab\u540e\uff0c\u5272\u4f24\u76ee\u6807\u9020\u6210981%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u7f29\u51cf\u95ea\u51fb\u7684\u51b7\u5374\u65f6\u95f45\u79d2\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\u82e5\u95ea\u51fb\u81f4\u6b7b\u76ee\u6807\u5219\u65e0\u6cd5\u89e6\u53d1\u6b64\u6548\u679c\u3002\r\n\r\n\u8be5\u6280\u80fd\u53ef\u4ee5\u6709\u6548\u51fb\u7834\u76ee\u6807\u9738\u4f53\u9632\u5fa1\u3002\r\n"
				},
				"1744": {
					"id": "1744",
					"specializationId": "11",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "0",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210168%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210437%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1745": {
					"id": "1745",
					"specializationId": "11",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210176%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210458%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1746": {
					"id": "1746",
					"specializationId": "11",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210184%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210478%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1747": {
					"id": "1747",
					"specializationId": "11",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210192%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210499%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1748": {
					"id": "1748",
					"specializationId": "11",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210200%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210520%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1749": {
					"id": "1749",
					"specializationId": "11",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210208%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210541%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1750": {
					"id": "1750",
					"specializationId": "11",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210216%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210562%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1751": {
					"id": "1751",
					"specializationId": "11",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210224%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210582%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1752": {
					"id": "1752",
					"specializationId": "11",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210232%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210603%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1753": {
					"id": "1753",
					"specializationId": "11",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210240%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210624%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1754": {
					"id": "1754",
					"specializationId": "11",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210248%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210645%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1755": {
					"id": "1755",
					"specializationId": "11",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210256%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210666%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1756": {
					"id": "1756",
					"specializationId": "11",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210264%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210687%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\r\n"
				},
				"1757": {
					"id": "1757",
					"specializationId": "11",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210272%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210708%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0"
				},
				"1758": {
					"id": "1758",
					"specializationId": "11",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210280%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210729%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0"
				},
				"1759": {
					"id": "1759",
					"specializationId": "11",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210288%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210750%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0"
				},
				"1760": {
					"id": "1760",
					"specializationId": "11",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210296%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210771%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0"
				},
				"1761": {
					"id": "1761",
					"specializationId": "11",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210304%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210792%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0"
				},
				"1762": {
					"id": "1762",
					"specializationId": "11",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210312%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210813%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0"
				},
				"1763": {
					"id": "1763",
					"specializationId": "11",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "20\u7c73",
					"castCost": "20\u9f99\u8840",
					"cooldown": "10.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u6cbf\u76f4\u7ebf\u629b\u51fa\u94fe\u5203\uff0c\u5c06\u547d\u4e2d\u7684\u654c\u4eba\u62c9\u5230\u8eab\u8fb9\uff0c\u9020\u6210320%(\u53cc\u624b)\u3002\u82e5\u84c4\u529b\u6ee1\u540e\u65bd\u653e\uff0c\u9f99\u5973\u5c06\u501f\u62c9\u62fd\u4e4b\u529b\u51b2\u649e\u524d\u65b9\u7684\u654c\u4eba\u9020\u6210832%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\u5bf9\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u6709\u51e0\u7387\u89e6\u53d1\u8bc5\u5492\u6548\u679c\uff0c\u5e76\u79fb\u9664\u4e00\u5c42\u5370\u8bb0"
				},
				"1764": {
					"id": "1764",
					"specializationId": "12",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "0",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u59735%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52305\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1765": {
					"id": "1765",
					"specializationId": "12",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u59737%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52305\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1766": {
					"id": "1766",
					"specializationId": "12",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u59739%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52305\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1767": {
					"id": "1767",
					"specializationId": "12",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597311%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52305\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1768": {
					"id": "1768",
					"specializationId": "12",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597313%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52305\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1769": {
					"id": "1769",
					"specializationId": "12",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597315%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1770": {
					"id": "1770",
					"specializationId": "12",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597317%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1771": {
					"id": "1771",
					"specializationId": "12",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597319%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1772": {
					"id": "1772",
					"specializationId": "12",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597321%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1773": {
					"id": "1773",
					"specializationId": "12",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597323%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1774": {
					"id": "1774",
					"specializationId": "12",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597325%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1775": {
					"id": "1775",
					"specializationId": "12",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597327%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1776": {
					"id": "1776",
					"specializationId": "12",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597329%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1777": {
					"id": "1777",
					"specializationId": "12",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597331%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1778": {
					"id": "1778",
					"specializationId": "12",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597333%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1779": {
					"id": "1779",
					"specializationId": "12",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597335%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1780": {
					"id": "1780",
					"specializationId": "12",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597337%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1781": {
					"id": "1781",
					"specializationId": "12",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597339%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1782": {
					"id": "1782",
					"specializationId": "12",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597341%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1783": {
					"id": "1783",
					"specializationId": "12",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "25\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u5728\u5f53\u524d\u4f4d\u7f6e\u53ec\u5524\u4e00\u4e2a\u6301\u7eed\u5632\u8bbd\u5468\u56f4\u654c\u4eba\u7684\u5047\u8eab\uff0c\u4e14\u81ea\u8eab\u7acb\u5373\u671d\u6307\u5b9a\u65b9\u5411\u8df3\u8dc3\u3002\u5047\u8eab\u7ee7\u627f\u9f99\u597343%\u7684\u5c5e\u6027\uff0c\u5047\u8eab\u5728\u8840\u91cf\u8017\u5c3d\u6216\u5b58\u5728\u65f6\u95f4\u8fbe\u52308\u79d2\u540e\u6d88\u5931\u3002"
				},
				"1784": {
					"id": "1784",
					"specializationId": "13",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "0",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9720\u70b9\u63d0\u5347\u3002"
				},
				"1785": {
					"id": "1785",
					"specializationId": "13",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9724\u70b9\u63d0\u5347\u3002"
				},
				"1786": {
					"id": "1786",
					"specializationId": "13",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9728\u70b9\u63d0\u5347\u3002"
				},
				"1787": {
					"id": "1787",
					"specializationId": "13",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9732\u70b9\u63d0\u5347\u3002"
				},
				"1788": {
					"id": "1788",
					"specializationId": "13",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9736\u70b9\u63d0\u5347\u3002"
				},
				"1789": {
					"id": "1789",
					"specializationId": "13",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9740\u70b9\u63d0\u5347\u3002"
				},
				"1790": {
					"id": "1790",
					"specializationId": "13",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9744\u70b9\u63d0\u5347\u3002"
				},
				"1791": {
					"id": "1791",
					"specializationId": "13",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "32",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9748\u70b9\u63d0\u5347\u3002"
				},
				"1792": {
					"id": "1792",
					"specializationId": "13",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "36",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9752\u70b9\u63d0\u5347\u3002"
				},
				"1793": {
					"id": "1793",
					"specializationId": "13",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9756\u70b9\u63d0\u5347\u3002"
				},
				"1794": {
					"id": "1794",
					"specializationId": "13",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "44",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9760\u70b9\u63d0\u5347\u3002"
				},
				"1795": {
					"id": "1795",
					"specializationId": "13",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "48",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9764\u70b9\u63d0\u5347\u3002"
				},
				"1796": {
					"id": "1796",
					"specializationId": "13",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "52",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9768\u70b9\u63d0\u5347\u3002"
				},
				"1797": {
					"id": "1797",
					"specializationId": "13",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "56",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9772\u70b9\u63d0\u5347\u3002"
				},
				"1798": {
					"id": "1798",
					"specializationId": "13",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "60",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9776\u70b9\u63d0\u5347\u3002"
				},
				"1799": {
					"id": "1799",
					"specializationId": "13",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9780\u70b9\u63d0\u5347\u3002"
				},
				"1800": {
					"id": "1800",
					"specializationId": "13",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9784\u70b9\u63d0\u5347\u3002"
				},
				"1801": {
					"id": "1801",
					"specializationId": "13",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9788\u70b9\u63d0\u5347\u3002"
				},
				"1802": {
					"id": "1802",
					"specializationId": "13",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9792\u70b9\u63d0\u5347\u3002"
				},
				"1803": {
					"id": "1803",
					"specializationId": "13",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65bd\u653e\u70df\u5e55\u7b3c\u7f69\u5730\u9762\uff0c\u9f99\u5973\u8eab\u5904\u5176\u4e2d\u65f6\u653b\u901f\u83b7\u5f9796\u70b9\u63d0\u5347\u3002"
				},
				"1804": {
					"id": "1804",
					"specializationId": "14",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1805": {
					"id": "1805",
					"specializationId": "14",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1806": {
					"id": "1806",
					"specializationId": "14",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1807": {
					"id": "1807",
					"specializationId": "14",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1808": {
					"id": "1808",
					"specializationId": "14",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1809": {
					"id": "1809",
					"specializationId": "14",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1810": {
					"id": "1810",
					"specializationId": "14",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1811": {
					"id": "1811",
					"specializationId": "14",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1812": {
					"id": "1812",
					"specializationId": "14",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1813": {
					"id": "1813",
					"specializationId": "14",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1814": {
					"id": "1814",
					"specializationId": "14",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1815": {
					"id": "1815",
					"specializationId": "14",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1816": {
					"id": "1816",
					"specializationId": "14",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1817": {
					"id": "1817",
					"specializationId": "14",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1818": {
					"id": "1818",
					"specializationId": "14",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1819": {
					"id": "1819",
					"specializationId": "14",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1820": {
					"id": "1820",
					"specializationId": "14",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1821": {
					"id": "1821",
					"specializationId": "14",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1822": {
					"id": "1822",
					"specializationId": "14",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1823": {
					"id": "1823",
					"specializationId": "14",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "15\u9f99\u8840",
					"cooldown": "8.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u624b\u4e2d\u7684\u5200\u5203\u591a\u6b21\u7ede\u6740\u8eab\u524d\u7684\u654c\u4eba\uff0c\u62db\u5f0f\u6210\u957f\u540e\u53ef\u8fde\u7eed\u4e09\u6bb5\u65bd\u653e\uff0c\u6bcf\u6bb5\u7684\u5355\u6b21\u4f24\u5bb3\u4f9d\u6b21\u4e3a81%(\u4e3b\u624b)\u300190%(\u526f\u624b)\u300199%(\u53cc\u624b)\u4f24\u5bb3\u3002\r\n\r\n\u6bcf\u547d\u4e2d\u4e00\u4e2a\u5e26\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u90fd\u5c06\u56de\u590d\u9f99\u5973\u4e00\u5b9a\u751f\u547d\u503c\uff1a\u6bcf\u4e2a\u76ee\u6807\u8eab\u4e0a\u7684\u6bcf\u5c42\u9f99\u8840\u5370\u8bb0\u56de\u590d\u9f99\u5973\u6700\u5927\u751f\u547d\u503c\u76841%\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u8eab\u4e0a\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1824": {
					"id": "1824",
					"specializationId": "15",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "0",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210122%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210319%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1825": {
					"id": "1825",
					"specializationId": "15",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210127%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210334%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1826": {
					"id": "1826",
					"specializationId": "15",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210132%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210348%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1827": {
					"id": "1827",
					"specializationId": "15",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210138%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210363%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1828": {
					"id": "1828",
					"specializationId": "15",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210144%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210378%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1829": {
					"id": "1829",
					"specializationId": "15",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210150%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210393%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1830": {
					"id": "1830",
					"specializationId": "15",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210155%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210408%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1831": {
					"id": "1831",
					"specializationId": "15",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "35",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210161%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210423%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1832": {
					"id": "1832",
					"specializationId": "15",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210166%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210438%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1833": {
					"id": "1833",
					"specializationId": "15",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210172%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210452%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1834": {
					"id": "1834",
					"specializationId": "15",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210178%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210467%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1835": {
					"id": "1835",
					"specializationId": "15",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210183%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210471%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1836": {
					"id": "1836",
					"specializationId": "15",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210189%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210486%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1837": {
					"id": "1837",
					"specializationId": "15",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210204%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210500%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1838": {
					"id": "1838",
					"specializationId": "15",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210210%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210515%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1839": {
					"id": "1839",
					"specializationId": "15",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210215%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210529%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1840": {
					"id": "1840",
					"specializationId": "15",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210221%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210544%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1841": {
					"id": "1841",
					"specializationId": "15",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210226%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210558%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1842": {
					"id": "1842",
					"specializationId": "15",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210232%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210573%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1843": {
					"id": "1843",
					"specializationId": "15",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "45.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "1",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u65cb\u8f6c\u94fe\u5203\uff0c\u6bcf\u79d2\u5bf9\u5468\u56f4\u654c\u4eba\u9020\u6210331%(\u53cc\u624b)\u4f24\u5bb3\u3002\u901a\u8fc7\u7cbe\u4fee\u70b9\u52a0\u6210\uff0c\u53ef\u5728\u6b64\u671f\u95f4\u518d\u6b21\u89e6\u53d1\u8be5\u6280\u80fd\uff0c\u9f99\u5973\u4f1a\u5411\u6307\u5b9a\u65b9\u5411\u53d1\u51fa\u5a01\u529b\u5de8\u5927\u7684\u4f9d\u6b21\u6325\u51fb\uff0c\u9020\u6210601%(\u53cc\u624b)\u4f24\u5bb3\u3002"
				},
				"1844": {
					"id": "1844",
					"specializationId": "16",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210382%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1845": {
					"id": "1845",
					"specializationId": "16",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210400%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1846": {
					"id": "1846",
					"specializationId": "16",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210418%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1847": {
					"id": "1847",
					"specializationId": "16",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210436%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1848": {
					"id": "1848",
					"specializationId": "16",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210454%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1849": {
					"id": "1849",
					"specializationId": "16",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210472%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1850": {
					"id": "1850",
					"specializationId": "16",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210490%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1851": {
					"id": "1851",
					"specializationId": "16",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210508%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1852": {
					"id": "1852",
					"specializationId": "16",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210526%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1853": {
					"id": "1853",
					"specializationId": "16",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210544%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1854": {
					"id": "1854",
					"specializationId": "16",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210562%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1855": {
					"id": "1855",
					"specializationId": "16",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210580%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1856": {
					"id": "1856",
					"specializationId": "16",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210598%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1857": {
					"id": "1857",
					"specializationId": "16",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210616%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1858": {
					"id": "1858",
					"specializationId": "16",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210634%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1859": {
					"id": "1859",
					"specializationId": "16",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210652%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1860": {
					"id": "1860",
					"specializationId": "16",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210670%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1861": {
					"id": "1861",
					"specializationId": "16",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210688%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1862": {
					"id": "1862",
					"specializationId": "16",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210706%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1863": {
					"id": "1863",
					"specializationId": "16",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "12\u7c73",
					"castCost": "",
					"cooldown": "19.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u7a7f\u5730\u800c\u51fa\uff0c\u5bf9\u7eb5\u5411\u654c\u4eba\u9020\u6210724%(\u53cc\u624b)\u4f24\u5bb3\uff0c\u5e76\u5bf9\u5176\u6253\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1864": {
					"id": "1864",
					"specializationId": "17",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "0",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210489%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1865": {
					"id": "1865",
					"specializationId": "17",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210513%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1866": {
					"id": "1866",
					"specializationId": "17",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210534%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1867": {
					"id": "1867",
					"specializationId": "17",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210558%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1868": {
					"id": "1868",
					"specializationId": "17",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210579%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1869": {
					"id": "1869",
					"specializationId": "17",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210603%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1870": {
					"id": "1870",
					"specializationId": "17",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210624%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1871": {
					"id": "1871",
					"specializationId": "17",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210648%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1872": {
					"id": "1872",
					"specializationId": "17",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210669%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1873": {
					"id": "1873",
					"specializationId": "17",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210693%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1874": {
					"id": "1874",
					"specializationId": "17",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n\u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210714%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n\r\n\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n"
				},
				"1875": {
					"id": "1875",
					"specializationId": "17",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210738%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n \r\n \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n "
				},
				"1876": {
					"id": "1876",
					"specializationId": "17",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n  \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210759%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n  \r\n  \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n  "
				},
				"1877": {
					"id": "1877",
					"specializationId": "17",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n   \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210783%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n   \r\n   \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n   "
				},
				"1878": {
					"id": "1878",
					"specializationId": "17",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n    \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210804%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n    \r\n    \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n    "
				},
				"1879": {
					"id": "1879",
					"specializationId": "17",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n     \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210828%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n     \r\n     \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n     "
				},
				"1880": {
					"id": "1880",
					"specializationId": "17",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n      \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210849%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n      \r\n      \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n      "
				},
				"1881": {
					"id": "1881",
					"specializationId": "17",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n       \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210873%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n       \r\n       \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n       "
				},
				"1882": {
					"id": "1882",
					"specializationId": "17",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n        \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210894%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n        \r\n        \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n        "
				},
				"1883": {
					"id": "1883",
					"specializationId": "17",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "40\u9f99\u8840",
					"cooldown": "55.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u7b2c\u4e00\u6bb5\uff0c\u9f99\u5973\u6bcf\u4f24\u5bb3\u4e00\u4e2a\u654c\u4eba\u4e00\u6b21\uff0c\u4fbf\u4f1a\u79ef\u6512\u4e00\u628a\u5200\u5203\u73af\u8eab\u3002\r\n         \u7b2c\u4e8c\u6bb5\uff0c\u79ef\u6512\u7684\u5200\u5203\u5c06\u4f9d\u6b21\u523a\u5411\u654c\u4eba\uff0c\u9020\u6210918%(\u526f\u624b)\u4f24\u5bb3\u5e76\u5728\u654c\u4eba\u4e4b\u95f4\u5f39\u5c042\u6b21\uff0c\u65bd\u653e\u671f\u95f4\u9f99\u5973\u4e0d\u53ef\u79fb\u52a8\u3002\r\n         \r\n         \u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65bd\u653e\u65f6\uff0c\u6bcf\u5c42\u5370\u8bb0\u5c06\u63d0\u4f9b20%\u7684\u4f24\u5bb3\u52a0\u6210\u3002\u4e14\u6bcf\u6b21\u65bd\u653e\u4ece\u76ee\u6807\u79fb\u9664\u4e00\u5c42\u5370\u8bb0\u3002\r\n         "
				},
				"1884": {
					"id": "1884",
					"specializationId": "18",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "0",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210287%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210326%\u3001365%\u3001404%\u3001446%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1885": {
					"id": "1885",
					"specializationId": "18",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210300%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210342%\u3001381%\u3001422%\u3001467%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1886": {
					"id": "1886",
					"specializationId": "18",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210313%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210356%\u3001398%\u3001441%\u3001487%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1887": {
					"id": "1887",
					"specializationId": "18",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210326%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210371%\u3001415%\u3001459%\u3001508%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1888": {
					"id": "1888",
					"specializationId": "18",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210339%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210386%\u3001432%\u3001478%\u3001529%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1889": {
					"id": "1889",
					"specializationId": "18",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210353%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210401%\u3001448%\u3001497%\u3001548%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1890": {
					"id": "1890",
					"specializationId": "18",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210366%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210416%\u3001465%\u3001515%\u3001569%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1891": {
					"id": "1891",
					"specializationId": "18",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210379%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210431%\u3001482%\u3001534%\u3001590%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1892": {
					"id": "1892",
					"specializationId": "18",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",

					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210392%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210446%\u3001499%\u3001553%\u3001610%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1893": {
					"id": "1893",
					"specializationId": "18",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210405%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210462%\u3001515%\u3001572%\u3001631%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1894": {
					"id": "1894",
					"specializationId": "18",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "47",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210419%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210476%\u3001533%\u3001590%\u3001652%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1895": {
					"id": "1895",
					"specializationId": "18",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "51",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210433%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210490%\u3001571%\u3001608%\u3001673%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1896": {
					"id": "1896",
					"specializationId": "18",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "55",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210447%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210504%\u3001589%\u3001626%\u3001694%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1897": {
					"id": "1897",
					"specializationId": "18",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "59",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210461%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210518%\u3001607%\u3001644%\u3001715%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1898": {
					"id": "1898",
					"specializationId": "18",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210475%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210532%\u3001625%\u3001662%\u3001736%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1899": {
					"id": "1899",
					"specializationId": "18",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210489%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210546%\u3001643%\u3001680%\u3001757%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1900": {
					"id": "1900",
					"specializationId": "18",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210503%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210560%\u3001661%\u3001698%\u3001778%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1901": {
					"id": "1901",
					"specializationId": "18",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210517%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210574%\u3001679%\u3001716%\u3001799%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1902": {
					"id": "1902",
					"specializationId": "18",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210531%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210587%\u3001697%\u3001734%\u3001820%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1903": {
					"id": "1903",
					"specializationId": "18",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "30\u9f99\u8840",
					"cooldown": "20.0\u79d2",
					"itemNeed": "\u610f\u7075\u6676",
					"needItemNum": "2",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u94fe\u5203\u6325\u51fb\u8eab\u524d\u7684\u654c\u4eba\u9020\u6210545%\u4f24\u5bb3\u5e76\u4f7f\u654c\u4eba\u6d6e\u7a7a\uff0c\u968f\u540e\u81ea\u5df1\u9ad8\u9ad8\u8dc3\u8d77\u3002\u8dc3\u8d77\u540e\u53ef\u518d\u8fde\u7eed4\u6b21\u4f7f\u7528\u63d0\u5203\uff0c\u653b\u51fb\u7a7a\u4e2d\u7684\u654c\u4eba,\u5206\u522b\u9020\u6210601%\u3001715%\u3001752%\u3001841%\u4f24\u5bb3\uff0c\u6700\u540e\u4e00\u6bb5\u9700\u8981\u7cbe\u4fee\u70b9\u5f00\u542f\u3002"
				},
				"1904": {
					"id": "1904",
					"specializationId": "6",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "8",
					"requireSkillPoint": "0",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210426%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1905": {
					"id": "1905",
					"specializationId": "6",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "10",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210445%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1906": {
					"id": "1906",
					"specializationId": "6",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "14",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210465%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1907": {
					"id": "1907",
					"specializationId": "6",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "18",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210484%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1908": {
					"id": "1908",
					"specializationId": "6",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "22",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210505%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1909": {
					"id": "1909",
					"specializationId": "6",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "26",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210525%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1910": {
					"id": "1910",
					"specializationId": "6",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "30",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210544%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1911": {
					"id": "1911",
					"specializationId": "6",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "34",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210564%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1912": {
					"id": "1912",
					"specializationId": "6",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "38",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210583%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1913": {
					"id": "1913",
					"specializationId": "6",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "42",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210604%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1914": {
					"id": "1914",
					"specializationId": "6",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "46",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210624%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1915": {
					"id": "1915",
					"specializationId": "6",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "50",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210644%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n "
				},
				"1916": {
					"id": "1916",
					"specializationId": "6",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "54",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210664%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n  "
				},
				"1917": {
					"id": "1917",
					"specializationId": "6",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "58",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210684%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n   \r\n "
				},
				"1918": {
					"id": "1918",
					"specializationId": "6",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210703%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n    \r\n  "
				},
				"1919": {
					"id": "1919",
					"specializationId": "6",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210723%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n     "
				},
				"1920": {
					"id": "1920",
					"specializationId": "6",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210743%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n      "
				},
				"1921": {
					"id": "1921",
					"specializationId": "6",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210763%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n       "
				},
				"1922": {
					"id": "1922",
					"specializationId": "6",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210783%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n        "
				},
				"1923": {
					"id": "1923",
					"specializationId": "6",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "15\u7c73",
					"castCost": "5\u9f99\u8840",
					"cooldown": "13.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u629b\u51fa\u98de\u5203\uff0c\u5bf9\u5355\u4e2a\u76ee\u6807\u9020\u6210802%(\u526f\u624b)\u4f24\u5bb3\u76ee\u6807\u5e76\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002\r\n \r\n "
				},
				"2631": {
					"id": "2631",
					"specializationId": "102",
					"step": "1",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "0",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621093%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u621099%\uff08\u4f24\u5bb3\uff09"
				},
				"2632": {
					"id": "2632",
					"specializationId": "102",
					"step": "2",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621097%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210104%\uff08\u4f24\u5bb3\uff09"
				},
				"2633": {
					"id": "2633",
					"specializationId": "102",
					"step": "3",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210102%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210108%\uff08\u4f24\u5bb3\uff09"
				},
				"2634": {
					"id": "2634",
					"specializationId": "102",
					"step": "4",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210106%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210113%\uff08\u4f24\u5bb3\uff09"
				},
				"2635": {
					"id": "2635",
					"specializationId": "102",
					"step": "5",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210110%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210118%\uff08\u4f24\u5bb3\uff09"
				},
				"2636": {
					"id": "2636",
					"specializationId": "102",
					"step": "6",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210115%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210122%\uff08\u4f24\u5bb3\uff09"
				},
				"2637": {
					"id": "2637",
					"specializationId": "102",
					"step": "7",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210119%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210127%\uff08\u4f24\u5bb3\uff09"
				},
				"2638": {
					"id": "2638",
					"specializationId": "102",
					"step": "8",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210124%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210132%\uff08\u4f24\u5bb3\uff09"
				},
				"2639": {
					"id": "2639",
					"specializationId": "102",
					"step": "9",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210128%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210136%\uff08\u4f24\u5bb3\uff09"
				},
				"2640": {
					"id": "2640",
					"specializationId": "102",
					"step": "10",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "41",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210132%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210141%\uff08\u4f24\u5bb3\uff09"
				},
				"2641": {
					"id": "2641",
					"specializationId": "102",
					"step": "11",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "45",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210137%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210146%\uff08\u4f24\u5bb3\uff09"
				},
				"2642": {
					"id": "2642",
					"specializationId": "102",
					"step": "12",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "49",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210141%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210150%\uff08\u4f24\u5bb3\uff09"
				},
				"2643": {
					"id": "2643",
					"specializationId": "102",
					"step": "13",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "53",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210145%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n  \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210154%\uff08\u4f24\u5bb3\uff09"
				},
				"2644": {
					"id": "2644",
					"specializationId": "102",
					"step": "14",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "57",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210145%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n   \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210154%\uff08\u4f24\u5bb3\uff09"
				},
				"2645": {
					"id": "2645",
					"specializationId": "102",
					"step": "15",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "99",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u6210149%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n    \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u6210158%\uff08\u4f24\u5bb3\uff09"
				},
				"2646": {
					"id": "2646",
					"specializationId": "102",
					"step": "16",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621093%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u621099%\uff08\u4f24\u5bb3\uff09"
				},
				"2647": {
					"id": "2647",
					"specializationId": "102",
					"step": "17",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621093%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u621099%\uff08\u4f24\u5bb3\uff09"
				},
				"2648": {
					"id": "2648",
					"specializationId": "102",
					"step": "18",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621093%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u621099%\uff08\u4f24\u5bb3\uff09"
				},
				"2649": {
					"id": "2649",
					"specializationId": "102",
					"step": "19",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621093%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u621099%\uff08\u4f24\u5bb3\uff09"
				},
				"2650": {
					"id": "2650",
					"specializationId": "102",
					"step": "20",
					"castTime": "\u77ac\u53d1",
					"castRange": "",
					"castCost": "",
					"cooldown": "25.0\u79d2",
					"itemNeed": "",
					"needItemNum": "0",
					"requireLevel": "40",
					"requireSkillPoint": "1",
					"description": "\u539f\u5730\u8fde\u7eed\u7ffb\u6eda\uff0c\u5bf9\u5468\u56f4\u76ee\u6807\u591a\u6b21\u9020\u621093%\uff08\u53cc\u624b\uff09\u4f24\u5bb3\u3002\r\n \u62db\u5f0f\u8fdb\u5316\u540e\u53ef\u63a5\u7b2c\u4e8c\u6bb5\uff1a\u671d\u6307\u5b9a\u65b9\u5411\u7ffb\u6eda\u524d\u8fdb\uff0c\u5bf9\u8def\u5f84\u4e0a\u654c\u4eba\u591a\u6b21\u9020\u621099%\uff08\u4f24\u5bb3\uff09"
				}
			},
			"specializationSpellUpgrade": {
				"3": {
					"id": "3",
					"specializationId": "3",
					"name": "\u7834",
					"description": "\u5f00\u542f\u5143\u6c14\u65a9\u7b2c\u4e94\u5f0f\uff0c\u9020\u6210\u4f24\u5bb3\u7684\u540c\u65f6\u5bf9\u547d\u4e2d\u76ee\u6807\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "10"
					}
				},
				"4": {
					"id": "4",
					"specializationId": "3",
					"name": "\u5f3a",
					"description": "\u5143\u6c14\u65a9\uff0c\u4e09\u5f0f\u3001\u56db\u5f0f\u3001\u4e94\u5f0f\u66b4\u51fb\u65f6\uff0c\u9f99\u5973\u56de\u590d3%\u751f\u547d\u503c\u3002",
					"effect": {
						"1": "11"
					}
				},
				"5": {
					"id": "5",
					"specializationId": "3",
					"name": "\u4f53",
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u82e5\u9020\u6210\u66b4\u51fb\uff0c\u5219\u56de\u590d\u9f99\u59735\u70b9\u4f53\u529b\u3002",
					"effect": {
						"1": "12"
					}
				},
				"6": {
					"id": "6",
					"specializationId": "3",
					"name": "\u88c2",
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb33%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002",
					"effect": {
						"1": "3",
						"2": "4",
						"3": "5",
						"4": "6",
						"5": "7",
						"6": "8",
						"7": "9"
					}
				},
				"7": {
					"id": "7",
					"specializationId": "3",
					"name": "\u8fde",
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad84%\u3002",
					"effect": {
						"1": "13",
						"2": "14",
						"3": "15",
						"4": "16",
						"5": "17",
						"6": "18",
						"7": "19"
					}
				},
				"9": {
					"id": "9",
					"specializationId": "4",
					"name": "\u8fde",
					"description": "\u5f00\u542f\u8f7b\u5203\u7b2c\u56db\u5f0f\uff0c\u7b2c\u56db\u5f0f\u5728\u4f24\u5bb3\u76ee\u6807\u7684\u540c\u65f6\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "34",
						"2": "35"
					}
				},
				"10": {
					"id": "10",
					"specializationId": "4",
					"name": "\u9000\u6563",
					"description": "\u8f7b\u5203\u53ef\u4ee5\u51fb\u9000\u54c1\u7ea7\u8f83\u4f4e\u7684\u654c\u4eba\u3002",
					"effect": {
						"1": "36"
					}
				},
				"11": {
					"id": "11",
					"specializationId": "4",
					"name": "\u653b\u51fb\u901f\u5ea6",
					"description": "\u5f53\u9f99\u8840\u4f4e\u4e8e40\u65f6\uff0c\u589e\u52a020%\u8f7b\u5203\u653b\u51fb\u901f\u5ea6\u3002",
					"effect": {
						"1": "37"
					}
				},
				"12": {
					"id": "12",
					"specializationId": "4",
					"name": "\u4f24\u5bb3",
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb33%,\u6700\u5927\u76ee\u6807\u65701\u4e2a",
					"effect": {
						"1": "38",
						"2": "39",
						"3": "40",
						"4": "41",
						"5": "42",
						"6": "43",
						"7": "44"
					}
				},
				"13": {
					"id": "13",
					"specializationId": "4",
					"name": "\u8fde\u7eed\u547d\u4e2d",
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad84%",
					"effect": {
						"1": "45",
						"2": "47",
						"3": "48",
						"4": "49",
						"5": "50",
						"6": "51",
						"7": "52"
					}
				},
				"262": {
					"id": "262",
					"specializationId": "5",
					"name": "\u79fb\u52a8\u901f\u5ea6",
					"description": "\u91ca\u653e\u540e\u589e\u52a0\u81ea\u8eab\u79fb\u52a8\u901f\u5ea650%\uff0c\u6301\u7eed3\u79d2\u3002",
					"effect": {
						"1": "53"
					}
				},
				"275": {
					"id": "275",
					"specializationId": "5",
					"name": "\u65ad\u7b4b",
					"description": "\u6709\u51e0\u7387\u9020\u6210\u76ee\u6807\u65ad\u7b4b",
					"effect": {
						"1": "54"
					}
				},
				"291": {
					"id": "291",
					"specializationId": "5",
					"name": "\u9f99\u8840\u5370\u8bb0",
					"description": "\u5bf9\u51fb\u4e2d\u76ee\u6807\u6dfb\u52a0\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "55"
					}
				},
				"300": {
					"id": "300",
					"specializationId": "5",
					"name": "\u4f24\u5bb3",
					"description": "\u63d0\u9ad8\u4f24\u5bb33%,\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002",
					"effect": {
						"1": "56",
						"2": "57",
						"3": "58",
						"4": "59",
						"5": "60",
						"6": "61",
						"7": "62"
					}
				},
				"415": {
					"id": "415",
					"specializationId": "10",
					"name": "\u65f6",
					"description": "\u6697\u5668\u5b58\u5728\u7684\u65f6\u95f4\u589e\u52a01.2\u79d2",
					"effect": {
						"1": "1568"
					}
				},
				"416": {
					"id": "416",
					"specializationId": "10",
					"name": "\u4f24\u5bb3",
					"description": "\u589e\u52a0\u673a\u5173\u5b58\u7559\u548c\u6536\u56de\u65f6\u4f24\u5bb320%\u3002",
					"effect": {
						"1": "1569"
					}
				},
				"394": {
					"id": "394",
					"specializationId": "5",
					"name": "\u4f1a\u5fc3\u4f24\u5bb3",
					"description": "\u589e\u52a0\u4f1a\u5fc3\u73875%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb310%\u3002",
					"effect": {
						"1": "63",
						"2": "64",
						"3": "65",
						"4": "66",
						"5": "67",
						"6": "68",
						"7": "69"
					}
				},
				"417": {
					"id": "417",
					"specializationId": "10",
					"name": "\u7206",
					"description": "\u5200\u9635\u72b6\u6001\u81ea\u8eab\u66b4\u51fb\u7387\u63d0\u534710%",
					"effect": {
						"1": "1570"
					}
				},
				"418": {
					"id": "418",
					"specializationId": "10",
					"name": "\u66b4\u51fb\u6d41\u8840",
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a10%\u4f24\u5bb3",
					"effect": {
						"1": "1571",
						"2": "1572",
						"3": "1573",
						"4": "1574",
						"5": "1575",
						"6": "1576",
						"7": "1577"
					}
				},
				"419": {
					"id": "419",
					"specializationId": "10",
					"name": "\u51b7\u5374\u65f6\u95f4",
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f41.15\u79d2",
					"effect": {
						"1": "1578",
						"2": "1579",
						"3": "1580",
						"4": "1581",
						"5": "1582",
						"6": "1583",
						"7": "1584"
					}
				},
				"420": {
					"id": "420",
					"specializationId": "9",
					"name": "\u901f",
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed2\u79d2\u3002",
					"effect": {
						"1": "1585"
					}
				},
				"421": {
					"id": "421",
					"specializationId": "9",
					"name": "\u6655",
					"description": "\u6700\u5927\u751f\u6548\u76ee\u6807\u589e\u52a03\uff0c\u4e14\u4e00\u5b9a\u51e0\u7387\u5bf9\u751f\u6548\u76ee\u6807\u89e6\u53d1\u6655\u7729\u72b6\u6001",
					"effect": {
						"1": "1586"
					}
				},
				"422": {
					"id": "422",
					"specializationId": "9",
					"name": "\u5370",
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u670950%\u7684\u6982\u7387\u5728\u76ee\u6807\u4e0a\u7559\u4e0b\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "1587"
					}
				},
				"423": {
					"id": "423",
					"specializationId": "9",
					"name": "\u7206",
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u621030%\u5f15\u7206\u4f24\u5bb3",
					"effect": {
						"1": "1588",
						"2": "1589",
						"3": "1590",
						"4": "1591",
						"5": "1592",
						"6": "1593",
						"7": "1594"
					}
				},
				"424": {
					"id": "424",
					"specializationId": "9",
					"name": "\u72c2",
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad875%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad875%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "1595",
						"2": "1596",
						"3": "1597",
						"4": "1598",
						"5": "1599",
						"6": "1600",
						"7": "1601"
					}
				},
				"425": {
					"id": "425",
					"specializationId": "7",
					"name": "\u8fde",
					"description": "\u5f00\u542f\u91cd\u5203\u7b2c\u4e09\u5f0f\u3002",
					"effect": {
						"1": "1602",
						"2": "1603"
					}
				},
				"426": {
					"id": "426",
					"specializationId": "7",
					"name": "\u8fde\u51fb\u589e\u4f24",
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad820%\u3002",
					"effect": {
						"1": "1609"
					}
				},
				"427": {
					"id": "427",
					"specializationId": "7",
					"name": "\u529b",
					"description": "\u751f\u547d\u4f4e\u4e8e50%\u65f6\u91cd\u5203\u4f24\u5bb3\u63d0\u534730%",
					"effect": {
						"1": "1610"
					}
				},
				"428": {
					"id": "428",
					"specializationId": "7",
					"name": "\u4f24\u5bb3",
					"description": "\u63d0\u9ad8\u4f24\u5bb33%,\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002",
					"effect": {
						"1": "1611",
						"2": "1612",
						"3": "1613",
						"4": "1614",
						"5": "1615",
						"6": "1616",
						"7": "1617"
					}
				},
				"429": {
					"id": "429",
					"specializationId": "7",
					"name": "\u51b7\u5374\u65f6\u95f4",
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c114.5\u79d2\u3002",
					"effect": {
						"1": "1618",
						"2": "1619",
						"3": "1620",
						"4": "1621",
						"5": "1622",
						"6": "1623",
						"7": "1624"
					}
				},
				"430": {
					"id": "430",
					"specializationId": "8",
					"name": "\u5c01",
					"description": "\u6709\u51e0\u7387\u4f7f\u76ee\u6807\u8fdb\u5165\u5c01\u8109\u72b6\u6001\u3002",
					"effect": {
						"1": "1625"
					}
				},
				"431": {
					"id": "431",
					"specializationId": "8",
					"name": "\u589e",
					"description": "\u6700\u5927\u547d\u4e2d\u76ee\u6807\u6570\u91cf\u63d0\u9ad82\u4e2a\uff0c\u6d88\u8017\u964d\u4f4e50%\u3002",
					"effect": {
						"1": "1626"
					}
				},
				"432": {
					"id": "432",
					"specializationId": "8",
					"name": "\u51b2",
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u9f99\u5973\u7684\u653b\u51fb\u63d0\u9ad810%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "1627"
					}
				},
				"433": {
					"id": "433",
					"specializationId": "8",
					"name": "\u4f53",
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d30\u70b9\u4f53\u529b\u3002",
					"effect": {
						"1": "1628",

						"2": "1629",
						"3": "1630",
						"4": "1631",
						"5": "1632",
						"6": "1633",
						"7": "1634"
					}
				},
				"434": {
					"id": "434",
					"specializationId": "8",
					"name": "\u88c2",
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u52301%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002",
					"effect": {
						"1": "1635",
						"2": "1636",
						"3": "1637",
						"4": "1638",
						"5": "1639",
						"6": "1640",
						"7": "1641"
					}
				},
				"435": {
					"id": "435",
					"specializationId": "11",
					"name": "\u4f24\u5bb3",
					"description": "\u63d0\u5347\u4f24\u5bb320%\u3002",
					"effect": {
						"1": "1642"
					}
				},
				"436": {
					"id": "436",
					"specializationId": "11",
					"name": "\u675f\u7f1a",
					"description": "\u3010\u62c9\u5203\u3011\uff1a\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u675f\u7f1a3\u79d2\u3002",
					"effect": {
						"1": "1643"
					}
				},
				"437": {
					"id": "437",
					"specializationId": "11",
					"name": "\u84c4\u6ee1\u62a4\u76fe",
					"description": "\u91ca\u653e\u84c4\u6ee1\u62c9\u65f6\uff0c\u83b7\u5f97\u4e00\u4e2a\u5438\u653620%\u4f24\u5bb3\u7684\u62a4\u76fe\uff0c\u6301\u7eed8\u79d2\u3002",
					"effect": {
						"1": "1644"
					}
				},
				"438": {
					"id": "438",
					"specializationId": "11",
					"name": "\u77ac\u95f4\u51b7\u5374",
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670930%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670990%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002",
					"effect": {
						"1": "1645",
						"2": "1646",
						"3": "1647",
						"4": "1648",
						"5": "1649",
						"6": "1650",
						"7": "1651"
					}
				},
				"439": {
					"id": "439",
					"specializationId": "11",
					"name": "\u9f99\u8840\u52a0\u6210",
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621090%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1652",
						"2": "1653",
						"3": "1654",
						"4": "1655",
						"5": "1656",
						"6": "1657",
						"7": "1658"
					}
				},
				"440": {
					"id": "440",
					"specializationId": "12",
					"name": "\u7f13",
					"description": "\u5047\u8eab\u6301\u7eed\u65f6\u95f4\u5ef6\u957f5\u79d2\uff0c\u4e14\u5468\u56f4\u7684\u76ee\u6807\u53d7\u523050%\u7684\u51cf\u901f\u6548\u679c\u3002",
					"effect": {
						"1": "1659"
					}
				},
				"441": {
					"id": "441",
					"specializationId": "12",
					"name": "\u901f",
					"description": "\u5047\u8eab\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u77ed6\u79d2\uff0c\u4e14\u6d88\u8017\u964d\u4f4e50%\u3002",
					"effect": {
						"1": "1660"
					}
				},
				"442": {
					"id": "442",
					"specializationId": "12",
					"name": "\u9690",
					"description": "\u91ca\u653e\u540e\uff0c\u9f99\u5973\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff0c\u6301\u7eed5\u79d2\uff0c\u5728\u9690\u8eab\u7ed3\u675f\u540e\uff0c\u4f1a\u5fc3\u503c\u63d0\u9ad820%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "1661"
					}
				},
				"443": {
					"id": "443",
					"specializationId": "12",
					"name": "\u7206",
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u6210300%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1662",
						"2": "1663",
						"3": "1664",
						"4": "1665",
						"5": "1666",
						"6": "1667",
						"7": "1668"
					}
				},
				"444": {
					"id": "444",
					"specializationId": "12",
					"name": "\u72c2",
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad875\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad875%\u3002",
					"effect": {
						"1": "1669",
						"2": "1670",
						"3": "1671",
						"4": "1672",
						"5": "1673",
						"6": "1674",
						"7": "1675"
					}
				},
				"445": {
					"id": "445",
					"specializationId": "13",
					"name": "\u901f",
					"description": "\u6280\u80fd\u51b7\u5374\u65f6\u95f4\u7f29\u77ed10\u79d2\u3002",
					"effect": {
						"1": "1676"
					}
				},
				"446": {
					"id": "446",
					"specializationId": "13",
					"name": "\u75be",
					"description": "\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad850%\uff0c\u4e14\u5728\u70df\u5e55\u4e2d\u7684\u654c\u4eba\u4ea7\u751f\u65ad\u7b4b\u6548\u679c\u3002",
					"effect": {
						"1": "1677"
					}
				},
				"447": {
					"id": "447",
					"specializationId": "13",
					"name": "\u95ea",
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9720%\u7684\u514d\u4f24\u6548\u679c\u3002",
					"effect": {
						"1": "1678"
					}
				},
				"448": {
					"id": "448",
					"specializationId": "13",
					"name": "\u653b",
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9730%\u653b\u51fb\u52a0\u6210\u3002",
					"effect": {
						"1": "1679",
						"2": "1680",
						"3": "1681",
						"4": "1682",
						"5": "1683",
						"6": "1684",
						"7": "1685"
					}
				},
				"449": {
					"id": "449",
					"specializationId": "13",
					"name": "\u6bd2",
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d2150%\u7684\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1686",
						"2": "1687",
						"3": "1688",
						"4": "1689",
						"5": "1690",
						"6": "1691",
						"7": "1692"
					}
				},
				"450": {
					"id": "450",
					"specializationId": "14",
					"name": "\u9f99",
					"description": "\u56de\u65cb\u6740\u5f00\u542f\u7b2c\u4e09\u5f0f\u3002",
					"effect": {
						"1": "1693",
						"2": "1694"
					}
				},
				"451": {
					"id": "451",
					"specializationId": "14",
					"name": "\u589e",
					"description": "\u6700\u5927\u751f\u6548\u76ee\u6807\u589e\u52a02\uff0c\u6d88\u8017\u964d\u4f4e50%\u3002",
					"effect": {
						"1": "1700"
					}
				},
				"452": {
					"id": "452",
					"specializationId": "14",
					"name": "\u65e0",
					"description": "\u653b\u51fb\u76ee\u6807\u65f6\uff0c\u670920%\u7684\u6982\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u56de\u65cb\u6740\u3002",
					"effect": {
						"1": "1701"
					}
				},
				"453": {
					"id": "453",
					"specializationId": "14",
					"name": "\u95ea",
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad845%\u3002",
					"effect": {
						"1": "1702",
						"2": "1703",
						"3": "1704",
						"4": "1705",
						"5": "1706",
						"6": "1707",
						"7": "1708"
					}
				},
				"454": {
					"id": "454",
					"specializationId": "14",
					"name": "\u88c2",
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u674022.5%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002",
					"effect": {
						"1": "1709",
						"2": "1710",
						"3": "1711",
						"4": "1712",
						"5": "1713",
						"6": "1714",
						"7": "1715"
					}
				},
				"455": {
					"id": "455",
					"specializationId": "15",
					"name": "\u79fb\u52a8",
					"description": "\u65cb\u8f6c\u671f\u95f4\u62e5\u67093000\u7684\u79fb\u52a8\u901f\u5ea6\u3002",
					"effect": {
						"1": "1716"
					}
				},
				"456": {
					"id": "456",
					"specializationId": "15",
					"name": "\u9000\u654c",
					"description": "\u65cb\u8f6c\u671f\u95f4\u5bf9\u654c\u4eba\u4ea7\u751f\u51fb\u9000\u6548\u679c\u3002",
					"effect": {
						"1": "1717"
					}
				},
				"457": {
					"id": "457",
					"specializationId": "15",
					"name": "\u7ec8",
					"description": "\u5f00\u542f\u7b2c\u4e8c\u5f0f",
					"effect": {
						"1": "1718"
					}
				},
				"458": {
					"id": "458",
					"specializationId": "15",
					"name": "\u72c2",
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u657010\u6b21\u3002",
					"effect": {
						"1": "1719",
						"2": "1720",
						"3": "1721",
						"4": "1722",
						"5": "1723",
						"6": "1724",
						"7": "1725"
					}
				},
				"459": {
					"id": "459",
					"specializationId": "15",
					"name": "\u9f99\u8840\u52a0\u6210",
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621090%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1726",
						"2": "1727",
						"3": "1728",
						"4": "1729",
						"5": "1730",
						"6": "1731",
						"7": "1732"
					}
				},
				"460": {
					"id": "460",
					"specializationId": "16",
					"name": "\u7834",
					"description": "\u6709\u51e0\u7387\u4f7f\u76ee\u6807\u8fdb\u5165\u8bc5\u5492\u72b6\u6001\u3002",
					"effect": {
						"1": "1733"
					}
				},
				"461": {
					"id": "461",
					"specializationId": "16",
					"name": "\u907f",
					"description": "\u4f7f\u7528\u9489\u523a\u540e\u95ea\u907f\u7387\u63d0\u534740%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "1734"
					}
				},
				"462": {
					"id": "462",
					"specializationId": "16",
					"name": "\u9f99\u8840\u6d8c\u6cc9",
					"description": "\u9489\u523a\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u5c06\u89e6\u53d1\u9f99\u8840\u6d8c\u6cc9\u6548\u679c\uff0c\u5bfc\u81f4\u5728\u4e00\u5b9a\u65f6\u95f4\u5185\u5728\u5176\u8eab\u4e0a\u81ea\u52a8\u751f\u6210\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "1735"
					}
				},
				"463": {
					"id": "463",
					"specializationId": "16",
					"name": "\u57df",
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a04\u7c73\u3002",
					"effect": {
						"1": "1736",
						"2": "1737",
						"3": "1738",
						"4": "1739",
						"5": "1740",
						"6": "1741",
						"7": "1742"
					}
				},
				"464": {
					"id": "464",
					"specializationId": "16",
					"name": "\u901f",
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f45\u79d2\u3002",
					"effect": {
						"1": "1743",
						"2": "1744",
						"3": "1745",
						"4": "1746",
						"5": "1747",
						"6": "1748",
						"7": "1749"
					}
				},
				"465": {
					"id": "465",
					"specializationId": "17",
					"name": "\u901f",
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed5\u79d2",
					"effect": {
						"1": "1750"
					}
				},
				"466": {
					"id": "466",
					"specializationId": "17",
					"name": "\u9f99",
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u6b21\u53d7\u5230\u653b\u51fb\u670950%\u7684\u51e0\u7387\u7ed9\u653b\u51fb\u8005\u6dfb\u52a01\u5c42\u9f99\u8840\u5370\u8bb0\uff0c2\u9636\u6bb5\u4f1a\u7ed9\u547d\u4e2d\u7684\u76ee\u6807\u6dfb\u52a0\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "1751"
					}
				},
				"467": {
					"id": "467",
					"specializationId": "17",
					"name": "\u8840",
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u6b21\u53d7\u5230\u653b\u51fb\u6062\u590d\u9f99\u59731%\u7684\u751f\u547d\u503c\uff0c2\u9636\u6bb5\uff0c\u6bcf\u547d\u4e2d\u4e00\u4e2a\u76ee\u6807\u83b7\u5f971%\u7684\u751f\u547d\u503c\u3002",
					"effect": {
						"1": "1752"
					}
				},
				"468": {
					"id": "468",
					"specializationId": "17",
					"name": "\u88c2",
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe60%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002",
					"effect": {
						"1": "1753",
						"2": "1754",
						"3": "1755",
						"4": "1756",
						"5": "1757",
						"6": "1758",
						"7": "1759"
					}
				},
				"469": {
					"id": "469",
					"specializationId": "17",
					"name": "\u5200",
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad830\u70b9\u3002",
					"effect": {
						"1": "1760",
						"2": "1761",
						"3": "1762",
						"4": "1763",
						"5": "1764",
						"6": "1765",
						"7": "1766"
					}
				},
				"470": {
					"id": "470",
					"specializationId": "18",
					"name": "\u7ec8",
					"description": "\u5f00\u542f\u63d0\u5203\u7b2c\u4e94\u4e0b\u3002",
					"effect": {
						"1": "1767"
					}
				},
				"471": {
					"id": "471",
					"specializationId": "18",
					"name": "\u9f99\u8840\u52a0\u6210",
					"description": "\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u63d0\u534720%\u4f24\u5bb3\u3002",
					"effect": {
						"1": "1768"
					}
				},
				"472": {
					"id": "472",
					"specializationId": "18",
					"name": "\u6050\u60e7",
					"description": "\u6bcf\u4e00\u4e0b\u90fd\u6709\u53ef\u80fd\u9020\u6210\u76ee\u6807\u6050\u60e7\uff0c\u6301\u7eed2\u79d2\u3002",
					"effect": {
						"1": "1769"
					}
				},
				"473": {
					"id": "473",
					"specializationId": "6",
					"name": "\u7834",
					"description": "\u964d\u4f4e\u76ee\u6807\u62a4\u753220%\uff0c\u6301\u7eed3\u79d2\u3002",
					"effect": {
						"1": "1770"
					}
				},
				"474": {
					"id": "474",
					"specializationId": "6",
					"name": "\u89e6",
					"description": "\u98de\u661f\u547d\u4e2d\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65f6\uff0c\u4f1a\u5bf9\u5468\u56f4\u5c0f\u8303\u56f4\u5185\u5176\u4ed6\u76ee\u6807\u4e5f\u52a0\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002",
					"effect": {
						"1": "1771"
					}
				},
				"475": {
					"id": "475",
					"specializationId": "6",
					"name": "\u4f53",
					"description": "\u4f7f\u7528\u98de\u661f\u5c06\u56de\u590d10\u70b9\u4f53\u529b\u3002",
					"effect": {
						"1": "1772"
					}
				},
				"476": {
					"id": "476",
					"specializationId": "6",
					"name": "\u901f",
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed5\u79d2\u3002",
					"effect": {
						"1": "1773",
						"2": "1774",
						"3": "1775",
						"4": "1776",
						"5": "1777",
						"6": "1778",
						"7": "1779"
					}
				},
				"477": {
					"id": "477",
					"specializationId": "18",
					"name": "\u4f24\u5bb3",
					"description": "\u63d0\u9ad8\u4f24\u5bb345%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002",
					"effect": {
						"1": "1859",
						"2": "1860",
						"3": "1861",
						"4": "1862",
						"5": "1863",
						"6": "1864",
						"7": "1865"
					}
				},
				"478": {
					"id": "478",
					"specializationId": "18",
					"name": "\u8fde\u7eed\u547d\u4e2d",
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad860%\u3002",
					"effect": {
						"1": "1866",
						"2": "1867",
						"3": "1868",
						"4": "1869",
						"5": "1870",
						"6": "1871",
						"7": "1872"
					}
				},
				"479": {
					"id": "479",
					"specializationId": "6",
					"name": "\u907f",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534760%\uff0c\u6301\u7eed5\u79d2\u3002",
					"effect": {
						"1": "1941",
						"2": "1942",
						"3": "1943",
						"4": "1944",
						"5": "1945",
						"6": "1946",
						"7": "1947"
					}
				},
				"502": {
					"id": "502",
					"specializationId": "102",
					"name": "\u8fde",
					"description": "\u5f00\u542f\u7b2c\u4e8c\u5f0f",
					"effect": {
						"1": "1948"
					}
				},
				"503": {
					"id": "503",
					"specializationId": "102",
					"name": "\u907f",
					"description": "\u4fa7\u5203\u7b2c\u4e00\u5f0f\u671f\u95f4\uff0c\u95ea\u907f\u7387\u63d0\u534740%",
					"effect": {
						"1": "1949"
					}
				},
				"504": {
					"id": "504",
					"specializationId": "102",
					"name": "\u84c4",
					"description": "\u7b2c\u4e00\u5f0f\u91ca\u653e\u671f\u95f4\u6bcf0.4\u79d2\u4f7f\u7b2c\u4e8c\u5f0f\u7684\u653b\u51fb\u529b\u63d0\u53475%",
					"effect": {
						"1": "1950"
					}
				},
				"505": {
					"id": "505",
					"specializationId": "102",
					"name": "\u51b7\u5374\u65f6\u95f4",
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c111\u79d2",
					"effect": {
						"1": "1951",
						"2": "1952",
						"3": "1953",
						"4": "1954",
						"5": "1955",
						"6": "1956",
						"7": "1957"
					}
				},
				"506": {
					"id": "506",
					"specializationId": "102",
					"name": "\u9f99\u8840\u52a0\u6210",
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u62106%\u4f24\u5bb3",
					"effect": {
						"1": "1958",
						"2": "1959",
						"3": "1960",
						"4": "1961",
						"5": "1962",
						"6": "1963",
						"7": "1964"
					}
				}
			},
			"specializationSpellUpgradeEffect": {
				"3": {
					"id": "3",
					"upgradeId": "6",
					"index": "4",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "3",
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
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb33%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"10": {
					"id": "10",
					"upgradeId": "3",
					"index": "1",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "3",
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
					"description": "\u5f00\u542f\u7b2c\u4e94\u5f0f\uff0c\u9020\u6210\u4f24\u5bb3\u7684\u540c\u65f6\u5bf9\u547d\u4e2d\u76ee\u6807\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"11": {
					"id": "11",
					"upgradeId": "4",
					"index": "2",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\uff0c\u4e09\u5f0f\u3001\u56db\u5f0f\u3001\u4e94\u5f0f\u66b4\u51fb\u65f6\uff0c\u9f99\u5973\u56de\u590d3%\u751f\u547d\u503c\u3002"
				},
				"12": {
					"id": "12",
					"upgradeId": "5",
					"index": "3",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u6bcf\u5f0f\u82e5\u9020\u6210\u66b4\u51fb\uff0c\u5c06\u56de\u590d\u9f99\u59735\u70b9\u4f53\u529b\u3002 "
				},
				"13": {
					"id": "13",
					"upgradeId": "7",
					"index": "5",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad84%\u3002"
				},
				"53": {
					"id": "53",
					"upgradeId": "262",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "5",
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
					"description": "\u91ca\u653e\u540e\u589e\u52a0\u81ea\u8eab\u79fb\u52a8\u901f\u5ea650%\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"38": {
					"id": "38",
					"upgradeId": "12",
					"index": "0",
					"requireLevel": "17",
					"step": "1",
					"requireSpecialization1": "4",
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
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb33%,\u6700\u5927\u76ee\u6807\u65701\u4e2a"
				},
				"37": {
					"id": "37",
					"upgradeId": "11",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "4",
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
					"description": "\u5f53\u9f99\u8840\u4f4e\u4e8e40\u65f6\uff0c\u589e\u52a020%\u8f7b\u5203\u653b\u51fb\u901f\u5ea6\u3002"
				},
				"36": {
					"id": "36",
					"upgradeId": "10",
					"index": "0",
					"requireLevel": "12",
					"step": "1",
					"requireSpecialization1": "4",
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
					"description": "\u8f7b\u5203\u53ef\u4ee5\u51fb\u9000\u54c1\u7ea7\u8f83\u4f4e\u7684\u654c\u4eba\u3002"
				},
				"34": {
					"id": "34",
					"upgradeId": "9",
					"index": "1",
					"requireLevel": "6",
					"step": "1",
					"requireSpecialization1": "4",
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
					"description": "\u5f00\u542f\u8f7b\u5203\u7b2c\u4e09\u5f0f"
				},
				"45": {
					"id": "45",
					"upgradeId": "13",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "4",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad84%"
				},
				"54": {
					"id": "54",
					"upgradeId": "275",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "5",
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
					"description": "\u6709\u51e0\u7387\u9020\u6210\u76ee\u6807\u65ad\u7b4b"
				},
				"55": {
					"id": "55",
					"upgradeId": "291",
					"index": "0",
					"requireLevel": "27",
					"step": "1",
					"requireSpecialization1": "5",
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
					"description": "\u5bf9\u51fb\u4e2d\u76ee\u6807\u6dfb\u52a0\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"56": {
					"id": "56",
					"upgradeId": "300",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "5",
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
					"description": "\u3010\u56de\u5203\u3011\uff1a\u4f24\u5bb3\u63d0\u9ad83%\uff0c\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"63": {
					"id": "63",
					"upgradeId": "394",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "5",
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
					"description": "\u589e\u52a0\u4f1a\u5fc3\u73875%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb310%\u3002"
				},
				"1568": {
					"id": "1568",
					"upgradeId": "415",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "10",
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
					"description": "\u6697\u5668\u5b58\u5728\u7684\u65f6\u95f4\u589e\u52a01.2\u79d2"
				},
				"1569": {
					"id": "1569",
					"upgradeId": "416",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "10",
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
					"description": "\u589e\u52a0\u673a\u5173\u5b58\u7559\u548c\u6536\u56de\u65f6\u4f24\u5bb320%\u3002"
				},
				"1570": {
					"id": "1570",
					"upgradeId": "417",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u81ea\u8eab\u66b4\u51fb\u7387\u63d0\u534710%"
				},
				"1571": {
					"id": "1571",
					"upgradeId": "418",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a10%\u4f24\u5bb3"
				},
				"1578": {
					"id": "1578",
					"upgradeId": "419",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "10",
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
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f41.15\u79d2"
				},
				"1585": {
					"id": "1585",
					"upgradeId": "420",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "9",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed2\u79d2\u3002"
				},
				"1586": {
					"id": "1586",
					"upgradeId": "421",
					"index": "0",
					"requireLevel": "26",
					"step": "1",
					"requireSpecialization1": "9",
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
					"description": "\u6700\u5927\u751f\u6548\u76ee\u6807\u589e\u52a03\uff0c\u4e14\u4e00\u5b9a\u51e0\u7387\u5bf9\u751f\u6548\u76ee\u6807\u89e6\u53d1\u6655\u7729\u72b6\u6001"
				},
				"1587": {
					"id": "1587",
					"upgradeId": "422",
					"index": "0",
					"requireLevel": "33",
					"step": "1",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u670950%\u7684\u6982\u7387\u5728\u76ee\u6807\u4e0a\u7559\u4e0b\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1588": {
					"id": "1588",
					"upgradeId": "423",
					"index": "0",
					"requireLevel": "28",
					"step": "1",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u62102%\u5f15\u7206\u4f24\u5bb3"
				},
				"1595": {
					"id": "1595",
					"upgradeId": "424",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad85%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad85%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1602": {
					"id": "1602",
					"upgradeId": "425",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "7",
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
					"description": "\u5f00\u542f\u91cd\u5203\u7b2c\u4e8c\u5f0f\u3002"
				},
				"1611": {
					"id": "1611",
					"upgradeId": "428",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "7",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb33%,\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"1610": {
					"id": "1610",
					"upgradeId": "427",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "7",
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
					"description": "\u751f\u547d\u4f4e\u4e8e50%\u65f6\u91cd\u5203\u4f24\u5bb3\u63d0\u534730%"
				},
				"1609": {
					"id": "1609",
					"upgradeId": "426",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "0",
					"requireLevel1": "0",
					"requireSpecialization2": "7",
					"requireLevel2": "2",
					"requireSpecialization3": "0",
					"requireLevel3": "0",
					"requireUpgrade1": "0",
					"requireUpgradeLevel1": "0",
					"requireUpgrade2": "0",
					"requireUpgradeLevel2": "0",
					"requireUpgrade3": "0",
					"requireUpgradeLevel3": "0",
					"requireSpecialPoint": "1",
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad820%\u3002"
				},
				"1618": {
					"id": "1618",
					"upgradeId": "429",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "7",
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
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c110.3\u79d2\u3002"
				},
				"1625": {
					"id": "1625",
					"upgradeId": "430",
					"index": "0",
					"requireLevel": "16",
					"step": "1",
					"requireSpecialization1": "8",
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
					"description": "\u6709\u51e0\u7387\u4f7f\u76ee\u6807\u8fdb\u5165\u5c01\u8109\u72b6\u6001\u3002"
				},
				"1626": {
					"id": "1626",
					"upgradeId": "431",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "8",
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
					"description": "\u6700\u5927\u547d\u4e2d\u76ee\u6807\u6570\u91cf\u63d0\u9ad82\u4e2a\uff0c\u6d88\u8017\u964d\u4f4e50%\u3002"
				},
				"1627": {
					"id": "1627",
					"upgradeId": "432",
					"index": "0",
					"requireLevel": "29",
					"step": "1",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u9f99\u5973\u7684\u653b\u51fb\u63d0\u9ad810%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1628": {
					"id": "1628",
					"upgradeId": "433",
					"index": "0",
					"requireLevel": "23",
					"step": "1",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d2\u70b9\u4f53\u529b\u3002"
				},
				"1635": {
					"id": "1635",
					"upgradeId": "434",
					"index": "0",
					"requireLevel": "24",
					"step": "1",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u52301%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"1642": {
					"id": "1642",
					"upgradeId": "435",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "11",
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
					"description": "\u3010\u62c9\u5203\u3011\uff1a\u63d0\u5347\u4f24\u5bb320%\u3002"
				},
				"1643": {
					"id": "1643",
					"upgradeId": "436",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "11",
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
					"description": "\u3010\u62c9\u5203\u3011\uff1a\u670950%\u51e0\u7387\u9020\u6210\u76ee\u6807\u675f\u7f1a3\u79d2\u3002"
				},
				"1644": {
					"id": "1644",
					"upgradeId": "437",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "11",
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
					"description": "\u91ca\u653e\u84c4\u6ee1\u62c9\u65f6\uff0c\u83b7\u5f97\u4e00\u4e2a\u5438\u653620%\u4f24\u5bb3\u7684\u62a4\u76fe\uff0c\u6301\u7eed8\u79d2\u3002"
				},
				"1645": {
					"id": "1645",
					"upgradeId": "438",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u67092%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u67096%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002"
				},
				"1652": {
					"id": "1652",
					"upgradeId": "439",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u62106%\u4f24\u5bb3\u3002"
				},
				"1659": {
					"id": "1659",
					"upgradeId": "440",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u6301\u7eed\u65f6\u95f4\u5ef6\u957f5\u79d2\uff0c\u4e14\u5468\u56f4\u7684\u76ee\u6807\u53d7\u523050%\u7684\u51cf\u901f\u6548\u679c\u3002"
				},
				"1660": {
					"id": "1660",
					"upgradeId": "441",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u7684\u51b7\u5374\u65f6\u95f4\u7f29\u77ed6\u79d2\uff0c\u4e14\u6d88\u8017\u964d\u4f4e50%\u3002"
				},
				"1661": {
					"id": "1661",
					"upgradeId": "442",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "12",
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
					"description": "\u91ca\u653e\u540e\uff0c\u9f99\u5973\u8fdb\u5165\u9690\u8eab\u72b6\u6001\uff0c\u6301\u7eed5\u79d2\uff0c\u5728\u9690\u8eab\u7ed3\u675f\u540e\uff0c\u4f1a\u5fc3\u503c\u63d0\u9ad820%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1662": {
					"id": "1662",
					"upgradeId": "443",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u621020%\u4f24\u5bb3\u3002"
				},
				"1669": {
					"id": "1669",
					"upgradeId": "444",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad85\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad85%\u3002"
				},
				"1676": {
					"id": "1676",
					"upgradeId": "445",
					"index": "0",
					"requireLevel": "31",
					"step": "1",
					"requireSpecialization1": "13",
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
					"description": "\u6280\u80fd\u51b7\u5374\u65f6\u95f4\u7f29\u77ed10\u79d2\u3002"
				},
				"1677": {
					"id": "1677",
					"upgradeId": "446",
					"index": "0",
					"requireLevel": "32",
					"step": "1",
					"requireSpecialization1": "13",
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
					"description": "\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad850%\uff0c\u4e14\u5728\u70df\u5e55\u4e2d\u7684\u654c\u4eba\u4ea7\u751f\u65ad\u7b4b\u6548\u679c\u3002"
				},
				"1678": {
					"id": "1678",
					"upgradeId": "447",
					"index": "0",
					"requireLevel": "39",
					"step": "1",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9720%\u7684\u514d\u4f24\u6548\u679c\u3002"
				},
				"1679": {
					"id": "1679",
					"upgradeId": "448",
					"index": "0",
					"requireLevel": "34",
					"step": "1",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f973%\u653b\u51fb\u52a0\u6210\u3002"
				},
				"1686": {
					"id": "1686",
					"upgradeId": "449",
					"index": "0",
					"requireLevel": "35",
					"step": "1",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d210%\u7684\u4f24\u5bb3\u3002"
				},
				"1693": {
					"id": "1693",
					"upgradeId": "450",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u5f00\u542f\u7b2c\u4e8c\u5f0f\u3002"
				},
				"1702": {
					"id": "1702",
					"upgradeId": "453",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad83%\u3002"
				},
				"1701": {
					"id": "1701",
					"upgradeId": "452",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "14",
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
					"description": "\u653b\u51fb\u76ee\u6807\u65f6\uff0c\u670920%\u7684\u6982\u7387\u53ef\u4ee5\u518d\u6b21\u91ca\u653e\u56de\u65cb\u6740\u3002"
				},
				"1700": {
					"id": "1700",
					"upgradeId": "451",
					"index": "0",
					"requireLevel": "36",
					"step": "1",
					"requireSpecialization1": "14",
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
					"description": "\u6700\u5927\u751f\u6548\u76ee\u6807\u589e\u52a02\uff0c\u6d88\u8017\u964d\u4f4e50%\u3002"
				},
				"1709": {
					"id": "1709",
					"upgradeId": "454",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "14",
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
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u67401.5%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002"
				},
				"1716": {
					"id": "1716",
					"upgradeId": "455",
					"index": "0",
					"requireLevel": "36",
					"step": "1",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u8f6c\u671f\u95f4\u62e5\u67093000\u7684\u79fb\u52a8\u901f\u5ea6\u3002"
				},
				"1717": {
					"id": "1717",
					"upgradeId": "456",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u8f6c\u671f\u95f4\u5bf9\u654c\u4eba\u4ea7\u751f\u51fb\u9000\u6548\u679c\u3002"
				},
				"1718": {
					"id": "1718",
					"upgradeId": "457",
					"index": "0",
					"requireLevel": "43",
					"step": "1",
					"requireSpecialization1": "15",
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
					"description": "\u5f00\u542f\u7b2c\u4e8c\u5f0f"
				},
				"1719": {
					"id": "1719",
					"upgradeId": "458",
					"index": "0",
					"requireLevel": "37",
					"step": "1",
					"requireSpecialization1": "15",
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
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u65701\u6b21\u3002"
				},
				"1726": {
					"id": "1726",
					"upgradeId": "459",
					"index": "0",
					"requireLevel": "38",
					"step": "1",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u62106%\u4f24\u5bb3\u3002"
				},
				"1733": {
					"id": "1733",
					"upgradeId": "460",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "16",
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
					"description": "\u6709\u51e0\u7387\u4f7f\u76ee\u6807\u8fdb\u5165\u8bc5\u5492\u72b6\u6001\u3002"
				},
				"1734": {
					"id": "1734",
					"upgradeId": "461",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "16",
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
					"description": "\u4f7f\u7528\u9489\u523a\u540e\u95ea\u907f\u7387\u63d0\u534740%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1735": {
					"id": "1735",
					"upgradeId": "462",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u5bf9\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u5c06\u89e6\u53d1\u9f99\u8840\u6d8c\u6cc9\u6548\u679c\uff0c\u5bfc\u81f4\u5728\u4e00\u5b9a\u65f6\u95f4\u5185\u5728\u5176\u8eab\u4e0a\u81ea\u52a8\u751f\u6210\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1736": {
					"id": "1736",
					"upgradeId": "463",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a00.5\u7c73\u3002"
				},
				"1743": {
					"id": "1743",
					"upgradeId": "464",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "16",
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
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f41\u79d2\u3002"
				},
				"1750": {
					"id": "1750",
					"upgradeId": "465",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "17",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed5\u79d2"
				},
				"1751": {
					"id": "1751",
					"upgradeId": "466",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u6b21\u53d7\u5230\u653b\u51fb\u670950%\u7684\u51e0\u7387\u7ed9\u653b\u51fb\u8005\u6dfb\u52a01\u5c42\u9f99\u8840\u5370\u8bb0\uff0c2\u9636\u6bb5\u4f1a\u7ed9\u547d\u4e2d\u7684\u76ee\u6807\u6dfb\u52a0\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1752": {
					"id": "1752",
					"upgradeId": "467",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u6b21\u53d7\u5230\u653b\u51fb\u6062\u590d\u9f99\u59731%\u7684\u751f\u547d\u503c\uff0c2\u9636\u6bb5\uff0c\u6bcf\u547d\u4e2d\u4e00\u4e2a\u76ee\u6807\u83b7\u5f971%\u7684\u751f\u547d\u503c\u3002"
				},
				"1753": {
					"id": "1753",
					"upgradeId": "468",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "17",
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
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe4%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1760": {
					"id": "1760",
					"upgradeId": "469",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad82\u70b9\u3002"
				},
				"1767": {
					"id": "1767",
					"upgradeId": "470",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "18",
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
					"description": "\u5f00\u542f\u63d0\u5203\u7b2c\u4e94\u4e0b\u3002"
				},
				"1768": {
					"id": "1768",
					"upgradeId": "471",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "18",
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
					"description": "\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u63d0\u534720%\u4f24\u5bb3\u3002"
				},
				"1769": {
					"id": "1769",
					"upgradeId": "472",
					"index": "0",
					"requireLevel": "48",
					"step": "1",
					"requireSpecialization1": "18",
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
					"description": "\u6bcf\u4e00\u4e0b\u90fd\u6709\u53ef\u80fd\u9020\u6210\u76ee\u6807\u6050\u60e7\uff0c\u6301\u7eed2\u79d2\u3002"
				},
				"1770": {
					"id": "1770",
					"upgradeId": "473",
					"index": "0",
					"requireLevel": "10",
					"step": "1",
					"requireSpecialization1": "6",
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
					"description": "\u964d\u4f4e\u76ee\u6807\u62a4\u753220%\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1771": {
					"id": "1771",
					"upgradeId": "474",
					"index": "0",
					"requireLevel": "18",
					"step": "1",
					"requireSpecialization1": "6",
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
					"description": "\u98de\u661f\u547d\u4e2d\u5e26\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u65f6\uff0c\u4f1a\u5bf9\u5468\u56f4\u5c0f\u8303\u56f4\u5185\u5176\u4ed6\u76ee\u6807\u4e5f\u52a0\u4e0a\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"1772": {
					"id": "1772",
					"upgradeId": "475",
					"index": "0",
					"requireLevel": "27",
					"step": "1",
					"requireSpecialization1": "6",
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
					"description": "\u4f7f\u7528\u98de\u661f\u5c06\u56de\u590d10\u70b9\u4f53\u529b\u3002"
				},
				"1773": {
					"id": "1773",
					"upgradeId": "476",
					"index": "0",
					"requireLevel": "20",
					"step": "1",
					"requireSpecialization1": "6",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed1\u79d2\u3002"
				},
				"1859": {
					"id": "1859",
					"upgradeId": "477",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "18",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb33%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1866": {
					"id": "1866",
					"upgradeId": "478",
					"index": "0",
					"requireLevel": "47",
					"step": "1",
					"requireSpecialization1": "18",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad84%\u3002"
				},
				"1941": {
					"id": "1941",
					"upgradeId": "479",
					"index": "0",
					"requireLevel": "21",
					"step": "1",
					"requireSpecialization1": "6",
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
					"requireUpgradeLevel3": null,
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534720%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1948": {
					"id": "1948",
					"upgradeId": "502",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "102",
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
					"description": "\u5f00\u542f\u7b2c\u4e8c\u5f0f"
				},
				"1949": {
					"id": "1949",
					"upgradeId": "503",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u7b2c\u4e00\u5f0f\u671f\u95f4\uff0c\u95ea\u907f\u7387\u63d0\u534740%"
				},
				"1950": {
					"id": "1950",
					"upgradeId": "504",
					"index": "0",
					"requireLevel": "46",
					"step": "1",
					"requireSpecialization1": "102",
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
					"description": "\u7b2c\u4e00\u5f0f\u91ca\u653e\u671f\u95f4\u6bcf0.4\u79d2\u4f7f\u7b2c\u4e8c\u5f0f\u7684\u653b\u51fb\u529b\u63d0\u53475%"
				},
				"1951": {
					"id": "1951",
					"upgradeId": "505",
					"index": "0",
					"requireLevel": "41",
					"step": "1",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c111\u79d2"
				},
				"1958": {
					"id": "1958",
					"upgradeId": "506",
					"index": "0",
					"requireLevel": "42",
					"step": "1",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u62106%\u4f24\u5bb3"
				},
				"4": {
					"id": "4",
					"upgradeId": "6",
					"index": "4",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "3",
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
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb36%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"14": {
					"id": "14",
					"upgradeId": "7",
					"index": "5",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad88%\u3002"
				},
				"35": {
					"id": "35",
					"upgradeId": "9",
					"index": "0",
					"requireLevel": "30",
					"step": "2",
					"requireSpecialization1": "4",
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
					"description": "\u5f00\u542f\u8f7b\u5203\u7b2c\u56db\u5f0f\u3002\u7b2c\u56db\u5f0f\u5728\u4f24\u5bb3\u76ee\u6807\u7684\u540c\u65f6\u53e0\u52a0\u4e00\u5c42\u9f99\u8840\u5370\u8bb0\u3002"
				},
				"39": {
					"id": "39",
					"upgradeId": "12",
					"index": "1",
					"requireLevel": "21",
					"step": "2",
					"requireSpecialization1": "4",
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
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb36%,\u6700\u5927\u76ee\u6807\u65701\u4e2a"
				},
				"47": {
					"id": "47",
					"upgradeId": "13",
					"index": "1",
					"requireLevel": "22",
					"step": "2",
					"requireSpecialization1": "4",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad88%"
				},
				"57": {
					"id": "57",
					"upgradeId": "300",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "5",
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
					"description": "\u3010\u56de\u5203\u3011\uff1a\u4f24\u5bb3\u63d0\u9ad86%\uff0c\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"64": {
					"id": "64",
					"upgradeId": "394",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "5",
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
					"description": "\u589e\u52a0\u4f1a\u5fc3\u738710%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb315%\u3002"
				},
				"1572": {
					"id": "1572",
					"upgradeId": "418",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a20%\u4f24\u5bb3"
				},
				"1579": {
					"id": "1579",
					"upgradeId": "419",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "10",
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
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f42.22\u79d2"
				},
				"1589": {
					"id": "1589",
					"upgradeId": "423",
					"index": "1",
					"requireLevel": "31",
					"step": "2",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u62104%\u5f15\u7206\u4f24\u5bb3"
				},
				"1596": {
					"id": "1596",
					"upgradeId": "424",
					"index": "1",
					"requireLevel": "32",
					"step": "2",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad810%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad810%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1603": {
					"id": "1603",
					"upgradeId": "425",
					"index": "1",
					"requireLevel": "35",
					"step": "2",
					"requireSpecialization1": "7",
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
					"description": "\u5f00\u542f\u91cd\u5203\u7b2c\u4e09\u5f0f\u3002"
				},
				"1612": {
					"id": "1612",
					"upgradeId": "428",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "7",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb36%,\u6700\u5927\u76ee\u6807\u65701\u4e2a\u3002"
				},
				"1619": {
					"id": "1619",
					"upgradeId": "429",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "7",
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
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c110.6\u79d2\u3002"
				},
				"1629": {
					"id": "1629",
					"upgradeId": "433",
					"index": "1",
					"requireLevel": "27",
					"step": "2",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d4\u70b9\u4f53\u529b\u3002"
				},
				"1636": {
					"id": "1636",
					"upgradeId": "434",
					"index": "1",
					"requireLevel": "28",
					"step": "2",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u52302%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"1646": {
					"id": "1646",
					"upgradeId": "438",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u67094%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670912%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002"
				},
				"1653": {
					"id": "1653",
					"upgradeId": "439",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621012%\u4f24\u5bb3\u3002"
				},
				"1663": {
					"id": "1663",
					"upgradeId": "443",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u621040%\u4f24\u5bb3\u3002"
				},
				"1670": {
					"id": "1670",
					"upgradeId": "444",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad810\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad810%\u3002"
				},
				"1680": {
					"id": "1680",
					"upgradeId": "448",
					"index": "1",
					"requireLevel": "36",
					"step": "2",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f976%\u653b\u51fb\u52a0\u6210\u3002"
				},
				"1687": {
					"id": "1687",
					"upgradeId": "449",
					"index": "1",
					"requireLevel": "37",
					"step": "2",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d220%\u7684\u4f24\u5bb3\u3002"
				},
				"1694": {
					"id": "1694",
					"upgradeId": "450",
					"index": "1",
					"requireLevel": "42",
					"step": "2",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u5f00\u542f\u7b2c\u4e09\u5f0f\u3002"
				},
				"1703": {
					"id": "1703",
					"upgradeId": "453",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad86%\u3002"
				},
				"1710": {
					"id": "1710",
					"upgradeId": "454",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "14",
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
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u67403%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002"
				},
				"1720": {
					"id": "1720",
					"upgradeId": "458",
					"index": "1",
					"requireLevel": "39",
					"step": "2",
					"requireSpecialization1": "15",
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
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u65702\u6b21\u3002"
				},
				"1727": {
					"id": "1727",
					"upgradeId": "459",
					"index": "1",
					"requireLevel": "40",
					"step": "2",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621012%\u4f24\u5bb3\u3002"
				},
				"1737": {
					"id": "1737",
					"upgradeId": "463",
					"index": "1",
					"requireLevel": "43",
					"step": "2",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a01\u7c73\u3002"
				},
				"1744": {
					"id": "1744",
					"upgradeId": "464",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "16",
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
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f41.5\u79d2\u3002"
				},
				"1754": {
					"id": "1754",
					"upgradeId": "468",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "17",
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
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe8%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1761": {
					"id": "1761",
					"upgradeId": "469",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad84\u70b9\u3002"
				},
				"1774": {
					"id": "1774",
					"upgradeId": "476",
					"index": "1",
					"requireLevel": "24",
					"step": "2",
					"requireSpecialization1": "6",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed1.5\u79d2\u3002"
				},
				"1860": {
					"id": "1860",
					"upgradeId": "477",
					"index": "1",
					"requireLevel": "47",
					"step": "2",
					"requireSpecialization1": "18",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb36%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1867": {
					"id": "1867",
					"upgradeId": "478",
					"index": "1",
					"requireLevel": "48",
					"step": "2",
					"requireSpecialization1": "18",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad88%\u3002"
				},
				"1942": {
					"id": "1942",
					"upgradeId": "479",
					"index": "1",
					"requireLevel": "25",
					"step": "2",
					"requireSpecialization1": "6",
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
					"requireUpgradeLevel3": null,
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534725%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1952": {
					"id": "1952",
					"upgradeId": "505",
					"index": "1",
					"requireLevel": "43",
					"step": "2",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c111.5\u79d2"
				},
				"1959": {
					"id": "1959",
					"upgradeId": "506",
					"index": "1",
					"requireLevel": "44",
					"step": "2",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u621012%\u4f24\u5bb3"
				},
				"5": {
					"id": "5",
					"upgradeId": "6",
					"index": "4",
					"requireLevel": "24",
					"step": "3",
					"requireSpecialization1": "3",
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
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb318%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"15": {
					"id": "15",
					"upgradeId": "7",
					"index": "5",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad824%\u3002"
				},
				"40": {
					"id": "40",
					"upgradeId": "12",
					"index": "2",
					"requireLevel": "25",
					"step": "3",
					"requireSpecialization1": "4",
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
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb318%,\u6700\u5927\u76ee\u6807\u65702\u4e2a"
				},
				"48": {
					"id": "48",
					"upgradeId": "13",
					"index": "2",
					"requireLevel": "26",
					"step": "3",
					"requireSpecialization1": "4",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad824%"
				},
				"58": {
					"id": "58",
					"upgradeId": "300",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "5",
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
					"description": "\u3010\u56de\u5203\u3011\uff1a\u4f24\u5bb3\u63d0\u9ad818%\uff0c\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"65": {
					"id": "65",
					"upgradeId": "394",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "5",
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
					"description": "\u589e\u52a0\u4f1a\u5fc3\u738715%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb320%\u3002"
				},
				"1573": {
					"id": "1573",
					"upgradeId": "418",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a60%\u4f24\u5bb3"
				},
				"1580": {
					"id": "1580",
					"upgradeId": "419",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "10",
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
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f45.8\u79d2"
				},
				"1590": {
					"id": "1590",
					"upgradeId": "423",
					"index": "2",
					"requireLevel": "34",
					"step": "3",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u621012%\u5f15\u7206\u4f24\u5bb3"
				},
				"1597": {
					"id": "1597",
					"upgradeId": "424",
					"index": "2",
					"requireLevel": "35",
					"step": "3",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad830%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad830%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1613": {
					"id": "1613",
					"upgradeId": "428",
					"index": "2",
					"requireLevel": "31",
					"step": "3",
					"requireSpecialization1": "7",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb318%,\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1620": {
					"id": "1620",
					"upgradeId": "429",
					"index": "2",
					"requireLevel": "33",
					"step": "3",
					"requireSpecialization1": "7",
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
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c111.8\u79d2\u3002"
				},
				"1630": {
					"id": "1630",
					"upgradeId": "433",
					"index": "2",
					"requireLevel": "31",
					"step": "3",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d12\u70b9\u4f53\u529b\u3002"
				},
				"1637": {
					"id": "1637",
					"upgradeId": "434",
					"index": "2",
					"requireLevel": "32",
					"step": "3",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u52306%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"1647": {
					"id": "1647",
					"upgradeId": "438",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "11",
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
					"requireSpecialPoint": "3",
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670912%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670936%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002"
				},
				"1654": {
					"id": "1654",
					"upgradeId": "439",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621036%\u4f24\u5bb3\u3002"
				},
				"1664": {
					"id": "1664",
					"upgradeId": "443",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u6210120%\u4f24\u5bb3\u3002"
				},
				"1671": {
					"id": "1671",
					"upgradeId": "444",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad830\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad830%\u3002"
				},
				"1681": {
					"id": "1681",
					"upgradeId": "448",
					"index": "2",
					"requireLevel": "38",
					"step": "3",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9712%\u653b\u51fb\u52a0\u6210\u3002"
				},
				"1688": {
					"id": "1688",
					"upgradeId": "449",
					"index": "2",
					"requireLevel": "39",
					"step": "3",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d260%\u7684\u4f24\u5bb3\u3002"
				},
				"1704": {
					"id": "1704",
					"upgradeId": "453",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad818%\u3002"
				},
				"1711": {
					"id": "1711",
					"upgradeId": "454",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "14",
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
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u67409%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002"
				},
				"1721": {
					"id": "1721",
					"upgradeId": "458",
					"index": "2",
					"requireLevel": "41",
					"step": "3",
					"requireSpecialization1": "15",
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
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u65704\u6b21\u3002"
				},
				"1728": {
					"id": "1728",
					"upgradeId": "459",
					"index": "2",
					"requireLevel": "42",
					"step": "3",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621036%\u4f24\u5bb3\u3002"
				},
				"1738": {
					"id": "1738",
					"upgradeId": "463",
					"index": "2",
					"requireLevel": "44",
					"step": "3",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a01.5\u7c73\u3002"
				},
				"1745": {
					"id": "1745",
					"upgradeId": "464",
					"index": "2",
					"requireLevel": "45",
					"step": "3",
					"requireSpecialization1": "16",
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
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f42\u79d2\u3002"
				},
				"1755": {
					"id": "1755",
					"upgradeId": "468",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "17",
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
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe24%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1762": {
					"id": "1762",
					"upgradeId": "469",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad812\u70b9\u3002"
				},
				"1775": {
					"id": "1775",
					"upgradeId": "476",
					"index": "2",
					"requireLevel": "28",
					"step": "3",
					"requireSpecialization1": "6",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed2\u79d2\u3002"
				},
				"1861": {
					"id": "1861",
					"upgradeId": "477",
					"index": "2",
					"requireLevel": "48",
					"step": "3",
					"requireSpecialization1": "18",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb318%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1868": {
					"id": "1868",
					"upgradeId": "478",
					"index": "2",
					"requireLevel": "49",
					"step": "3",
					"requireSpecialization1": "18",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad824%\u3002"
				},
				"1943": {
					"id": "1943",
					"upgradeId": "479",
					"index": "2",
					"requireLevel": "29",
					"step": "3",
					"requireSpecialization1": "6",
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
					"requireUpgradeLevel3": null,
					"requireSpecialPoint": "3",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534730%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1953": {
					"id": "1953",
					"upgradeId": "505",
					"index": "2",
					"requireLevel": "44",
					"step": "3",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c112\u79d2"
				},
				"1960": {
					"id": "1960",
					"upgradeId": "506",
					"index": "2",
					"requireLevel": "45",
					"step": "3",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u621036%\u4f24\u5bb3"
				},
				"6": {
					"id": "6",
					"upgradeId": "6",
					"index": "4",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "3",
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
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb321%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"16": {
					"id": "16",
					"upgradeId": "7",
					"index": "5",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad828%\u3002"
				},
				"41": {
					"id": "41",
					"upgradeId": "12",
					"index": "3",
					"requireLevel": "29",
					"step": "4",
					"requireSpecialization1": "4",
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
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb321%,\u6700\u5927\u76ee\u6807\u65702\u4e2a"
				},
				"49": {
					"id": "49",
					"upgradeId": "13",
					"index": "3",
					"requireLevel": "30",
					"step": "4",
					"requireSpecialization1": "4",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad828%"
				},
				"59": {
					"id": "59",
					"upgradeId": "300",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "5",
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
					"description": "\u3010\u56de\u5203\u3011\uff1a\u4f24\u5bb3\u63d0\u9ad821%\uff0c\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"66": {
					"id": "66",
					"upgradeId": "394",
					"index": "3",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "5",
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
					"description": "\u589e\u52a0\u4f1a\u5fc3\u738720%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb325%\u3002"
				},
				"1574": {
					"id": "1574",
					"upgradeId": "418",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a70%\u4f24\u5bb3"
				},
				"1581": {
					"id": "1581",
					"upgradeId": "419",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "10",
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
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f46.56\u79d2"
				},
				"1591": {
					"id": "1591",
					"upgradeId": "423",
					"index": "3",
					"requireLevel": "37",
					"step": "4",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u621014%\u5f15\u7206\u4f24\u5bb3"
				},
				"1598": {
					"id": "1598",
					"upgradeId": "424",
					"index": "3",
					"requireLevel": "38",
					"step": "4",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad835%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad835%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1614": {
					"id": "1614",
					"upgradeId": "428",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "7",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb321%,\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1621": {
					"id": "1621",
					"upgradeId": "429",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "7",
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
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c112.1\u79d2\u3002"
				},
				"1631": {
					"id": "1631",
					"upgradeId": "433",
					"index": "3",
					"requireLevel": "35",
					"step": "4",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d14\u70b9\u4f53\u529b\u3002"
				},
				"1638": {
					"id": "1638",
					"upgradeId": "434",
					"index": "3",
					"requireLevel": "36",
					"step": "4",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u52307%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"1648": {
					"id": "1648",
					"upgradeId": "438",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670914%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670942%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002"
				},
				"1655": {
					"id": "1655",
					"upgradeId": "439",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621042%\u4f24\u5bb3\u3002"
				},
				"1665": {
					"id": "1665",
					"upgradeId": "443",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u6210140%\u4f24\u5bb3\u3002"
				},
				"1672": {
					"id": "1672",
					"upgradeId": "444",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad835\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad835%\u3002"
				},
				"1682": {
					"id": "1682",
					"upgradeId": "448",
					"index": "3",
					"requireLevel": "40",
					"step": "4",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9714%\u653b\u51fb\u52a0\u6210\u3002"
				},
				"1689": {
					"id": "1689",
					"upgradeId": "449",
					"index": "3",
					"requireLevel": "41",
					"step": "4",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d270%\u7684\u4f24\u5bb3\u3002"
				},
				"1705": {
					"id": "1705",
					"upgradeId": "453",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad821%\u3002"
				},
				"1712": {
					"id": "1712",
					"upgradeId": "454",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "14",
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
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u674010.5%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002"
				},
				"1722": {
					"id": "1722",
					"upgradeId": "458",
					"index": "3",
					"requireLevel": "43",
					"step": "4",
					"requireSpecialization1": "15",
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
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u65705\u6b21\u3002"
				},
				"1729": {
					"id": "1729",
					"upgradeId": "459",
					"index": "3",
					"requireLevel": "44",
					"step": "4",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621042%\u4f24\u5bb3\u3002"
				},
				"1739": {
					"id": "1739",
					"upgradeId": "463",
					"index": "3",
					"requireLevel": "45",
					"step": "4",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a02\u7c73\u3002"
				},
				"1746": {
					"id": "1746",
					"upgradeId": "464",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "16",
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
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f42.5\u79d2\u3002"
				},
				"1756": {
					"id": "1756",
					"upgradeId": "468",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "17",
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
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe28%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1763": {
					"id": "1763",
					"upgradeId": "469",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad814\u70b9\u3002"
				},
				"1776": {
					"id": "1776",
					"upgradeId": "476",
					"index": "3",
					"requireLevel": "32",
					"step": "4",
					"requireSpecialization1": "6",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed2.5\u79d2\u3002"
				},
				"1862": {
					"id": "1862",
					"upgradeId": "477",
					"index": "3",
					"requireLevel": "49",
					"step": "4",
					"requireSpecialization1": "18",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb321%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1869": {
					"id": "1869",
					"upgradeId": "478",
					"index": "3",
					"requireLevel": "50",
					"step": "4",
					"requireSpecialization1": "18",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad828%\u3002"
				},
				"1944": {
					"id": "1944",
					"upgradeId": "479",
					"index": "3",
					"requireLevel": "33",
					"step": "4",
					"requireSpecialization1": "6",
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
					"requireUpgradeLevel3": null,
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534735%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1954": {
					"id": "1954",
					"upgradeId": "505",
					"index": "3",
					"requireLevel": "45",
					"step": "4",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c112.5\u79d2"
				},
				"1961": {
					"id": "1961",
					"upgradeId": "506",
					"index": "3",
					"requireLevel": "46",
					"step": "4",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u621032%\u4f24\u5bb3"
				},
				"7": {
					"id": "7",
					"upgradeId": "6",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "3",
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
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb324%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"17": {
					"id": "17",
					"upgradeId": "7",
					"index": "5",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad832%\u3002"
				},
				"42": {
					"id": "42",
					"upgradeId": "12",
					"index": "4",
					"requireLevel": "33",
					"step": "5",
					"requireSpecialization1": "4",
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
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb324%,\u6700\u5927\u76ee\u6807\u65703\u4e2a"
				},
				"50": {
					"id": "50",
					"upgradeId": "13",
					"index": "4",
					"requireLevel": "34",
					"step": "5",
					"requireSpecialization1": "4",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad832%"
				},
				"60": {
					"id": "60",
					"upgradeId": "300",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "5",
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
					"description": "\u3010\u56de\u5203\u3011\uff1a\u4f24\u5bb3\u63d0\u9ad824%\uff0c\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"67": {
					"id": "67",
					"upgradeId": "394",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "5",
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
					"description": "\u589e\u52a0\u4f1a\u5fc3\u738725%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb330%\u3002"
				},
				"1575": {
					"id": "1575",
					"upgradeId": "418",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a80%\u4f24\u5bb3"
				},
				"1582": {
					"id": "1582",
					"upgradeId": "419",
					"index": "4",
					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "10",
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
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f47.27\u79d2"
				},
				"1592": {
					"id": "1592",
					"upgradeId": "423",
					"index": "4",
					"requireLevel": "40",
					"step": "5",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u621016%\u5f15\u7206\u4f24\u5bb3"
				},
				"1599": {
					"id": "1599",
					"upgradeId": "424",
					"index": "4",

					"requireLevel": "41",
					"step": "5",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad840%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1615": {
					"id": "1615",
					"upgradeId": "428",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "7",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb324%,\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1622": {
					"id": "1622",
					"upgradeId": "429",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "7",
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
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c112.4\u79d2\u3002"
				},
				"1632": {
					"id": "1632",
					"upgradeId": "433",
					"index": "4",
					"requireLevel": "38",
					"step": "5",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d16\u70b9\u4f53\u529b\u3002"
				},
				"1639": {
					"id": "1639",
					"upgradeId": "434",
					"index": "4",
					"requireLevel": "39",
					"step": "5",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u52308%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"1649": {
					"id": "1649",
					"upgradeId": "438",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670916%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670948%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002"
				},
				"1656": {
					"id": "1656",
					"upgradeId": "439",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621048%\u4f24\u5bb3\u3002"
				},
				"1666": {
					"id": "1666",
					"upgradeId": "443",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u6210160%\u4f24\u5bb3\u3002"
				},
				"1673": {
					"id": "1673",
					"upgradeId": "444",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad840\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad840%\u3002"
				},
				"1683": {
					"id": "1683",
					"upgradeId": "448",
					"index": "4",
					"requireLevel": "42",
					"step": "5",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9716%\u653b\u51fb\u52a0\u6210\u3002"
				},
				"1690": {
					"id": "1690",
					"upgradeId": "449",
					"index": "4",
					"requireLevel": "43",
					"step": "5",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d280%\u7684\u4f24\u5bb3\u3002"
				},
				"1706": {
					"id": "1706",
					"upgradeId": "453",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad824%\u3002"
				},
				"1713": {
					"id": "1713",
					"upgradeId": "454",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "14",
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
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u674012%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002"
				},
				"1723": {
					"id": "1723",
					"upgradeId": "458",
					"index": "4",
					"requireLevel": "45",
					"step": "5",
					"requireSpecialization1": "15",
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
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u65706\u6b21\u3002"
				},
				"1730": {
					"id": "1730",
					"upgradeId": "459",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621048%\u4f24\u5bb3\u3002"
				},
				"1740": {
					"id": "1740",
					"upgradeId": "463",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a02.5\u7c73\u3002"
				},
				"1747": {
					"id": "1747",
					"upgradeId": "464",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "16",
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
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f43\u79d2\u3002"
				},
				"1757": {
					"id": "1757",
					"upgradeId": "468",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "17",
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
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe32%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1764": {
					"id": "1764",
					"upgradeId": "469",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad816\u70b9\u3002"
				},
				"1777": {
					"id": "1777",
					"upgradeId": "476",
					"index": "4",
					"requireLevel": "36",
					"step": "5",
					"requireSpecialization1": "6",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed3\u79d2\u3002"
				},
				"1863": {
					"id": "1863",
					"upgradeId": "477",
					"index": "4",
					"requireLevel": "50",
					"step": "5",
					"requireSpecialization1": "18",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb324%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1870": {
					"id": "1870",
					"upgradeId": "478",
					"index": "4",
					"requireLevel": "51",
					"step": "5",
					"requireSpecialization1": "18",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad832%\u3002"
				},
				"1945": {
					"id": "1945",
					"upgradeId": "479",
					"index": "4",
					"requireLevel": "37",
					"step": "5",
					"requireSpecialization1": "6",
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
					"requireUpgradeLevel3": null,
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534740%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1955": {
					"id": "1955",
					"upgradeId": "505",
					"index": "4",
					"requireLevel": "46",
					"step": "5",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c113\u79d2"
				},
				"1962": {
					"id": "1962",
					"upgradeId": "506",
					"index": "4",
					"requireLevel": "47",
					"step": "5",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u621048%\u4f24\u5bb3"
				},
				"8": {
					"id": "8",
					"upgradeId": "6",
					"index": "4",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "3",
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
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb327%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"18": {
					"id": "18",
					"upgradeId": "7",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad836%\u3002"
				},
				"43": {
					"id": "43",
					"upgradeId": "12",
					"index": "5",
					"requireLevel": "37",
					"step": "6",
					"requireSpecialization1": "4",
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
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb327%,\u6700\u5927\u76ee\u6807\u65703\u4e2a"
				},
				"51": {
					"id": "51",
					"upgradeId": "13",
					"index": "5",
					"requireLevel": "38",
					"step": "6",
					"requireSpecialization1": "4",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad836%"
				},
				"61": {
					"id": "61",
					"upgradeId": "300",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "5",
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
					"description": "\u3010\u56de\u5203\u3011\uff1a\u4f24\u5bb3\u63d0\u9ad827%\uff0c\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"68": {
					"id": "68",
					"upgradeId": "394",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "5",
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
					"description": "\u589e\u52a0\u4f1a\u5fc3\u738730%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb335%\u3002"
				},
				"1576": {
					"id": "1576",
					"upgradeId": "418",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a90%\u4f24\u5bb3"
				},
				"1583": {
					"id": "1583",
					"upgradeId": "419",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "10",
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
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f47.94\u79d2"
				},
				"1593": {
					"id": "1593",
					"upgradeId": "423",
					"index": "5",
					"requireLevel": "43",
					"step": "6",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u621018%\u5f15\u7206\u4f24\u5bb3"
				},
				"1600": {
					"id": "1600",
					"upgradeId": "424",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad845%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad845%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1616": {
					"id": "1616",
					"upgradeId": "428",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "7",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb327%,\u6700\u5927\u76ee\u6807\u65702\u4e2a\u3002"
				},
				"1623": {
					"id": "1623",
					"upgradeId": "429",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "7",
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
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c112.7\u79d2\u3002"
				},
				"1633": {
					"id": "1633",
					"upgradeId": "433",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d18\u70b9\u4f53\u529b\u3002"
				},
				"1640": {
					"id": "1640",
					"upgradeId": "434",
					"index": "5",
					"requireLevel": "42",
					"step": "6",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u52309%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"1650": {
					"id": "1650",
					"upgradeId": "438",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670918%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670954%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002"
				},
				"1657": {
					"id": "1657",
					"upgradeId": "439",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621054%\u4f24\u5bb3\u3002"
				},
				"1667": {
					"id": "1667",
					"upgradeId": "443",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u6210180%\u4f24\u5bb3\u3002"
				},
				"1674": {
					"id": "1674",
					"upgradeId": "444",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad845\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad845%\u3002"
				},
				"1684": {
					"id": "1684",
					"upgradeId": "448",
					"index": "5",
					"requireLevel": "44",
					"step": "6",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9718%\u653b\u51fb\u52a0\u6210\u3002"
				},
				"1691": {
					"id": "1691",
					"upgradeId": "449",
					"index": "5",
					"requireLevel": "45",
					"step": "6",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d290%\u7684\u4f24\u5bb3\u3002"
				},
				"1707": {
					"id": "1707",
					"upgradeId": "453",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad827%\u3002"
				},
				"1714": {
					"id": "1714",
					"upgradeId": "454",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "14",
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
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u674013.5%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002"
				},
				"1724": {
					"id": "1724",
					"upgradeId": "458",
					"index": "5",
					"requireLevel": "46",
					"step": "6",
					"requireSpecialization1": "15",
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
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u65707\u6b21\u3002"
				},
				"1731": {
					"id": "1731",
					"upgradeId": "459",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621054%\u4f24\u5bb3\u3002"
				},
				"1741": {
					"id": "1741",
					"upgradeId": "463",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a03\u7c73\u3002"
				},
				"1748": {
					"id": "1748",
					"upgradeId": "464",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "16",
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
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f43.5\u79d2\u3002"
				},
				"1758": {
					"id": "1758",
					"upgradeId": "468",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "17",
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
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe36%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1765": {
					"id": "1765",
					"upgradeId": "469",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad818\u70b9\u3002"
				},
				"1778": {
					"id": "1778",
					"upgradeId": "476",
					"index": "5",
					"requireLevel": "40",
					"step": "6",
					"requireSpecialization1": "6",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed3.5\u79d2\u3002"
				},
				"1864": {
					"id": "1864",
					"upgradeId": "477",
					"index": "5",
					"requireLevel": "51",
					"step": "6",
					"requireSpecialization1": "18",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb327%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1871": {
					"id": "1871",
					"upgradeId": "478",
					"index": "5",
					"requireLevel": "52",
					"step": "6",
					"requireSpecialization1": "18",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad836%\u3002"
				},
				"1946": {
					"id": "1946",
					"upgradeId": "479",
					"index": "5",
					"requireLevel": "41",
					"step": "6",
					"requireSpecialization1": "6",
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
					"requireUpgradeLevel3": null,
					"requireSpecialPoint": "1",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534745%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1956": {
					"id": "1956",
					"upgradeId": "505",
					"index": "5",
					"requireLevel": "47",
					"step": "6",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c113.5\u79d2"
				},
				"1963": {
					"id": "1963",
					"upgradeId": "506",
					"index": "5",
					"requireLevel": "48",
					"step": "6",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u621054%\u4f24\u5bb3"
				},
				"9": {
					"id": "9",
					"upgradeId": "6",
					"index": "4",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "3",
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
					"description": "\u5143\u6c14\u65a9\u6bcf\u5f0f\u4f1a\u5fc3\u65f6\u90fd\u4f1a\u4f7f\u76ee\u6807\u6d41\u8840\uff0c\u9020\u6210\u7b2c\u4e00\u5f0f\u4f24\u5bb345%\u7684\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u6700\u591a\u53e0\u52a03\u5c42\u3002"
				},
				"19": {
					"id": "19",
					"upgradeId": "7",
					"index": "5",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "3",
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
					"description": "\u6c14\u5143\u65a9\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad860%\u3002"
				},
				"44": {
					"id": "44",
					"upgradeId": "12",
					"index": "6",
					"requireLevel": "40",
					"step": "7",
					"requireSpecialization1": "4",
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
					"description": "\u63d0\u9ad8\u8f7b\u5203\u4f24\u5bb345%,\u6700\u5927\u76ee\u6807\u65704\u4e2a"
				},
				"52": {
					"id": "52",
					"upgradeId": "13",
					"index": "6",
					"requireLevel": "41",
					"step": "7",
					"requireSpecialization1": "4",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad860%"
				},
				"62": {
					"id": "62",
					"upgradeId": "300",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "5",
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
					"description": "\u3010\u56de\u5203\u3011\uff1a\u4f24\u5bb3\u63d0\u9ad845%\uff0c\u6700\u5927\u76ee\u6807\u65704\u4e2a\u3002"
				},
				"69": {
					"id": "69",
					"upgradeId": "394",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "5",
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
					"description": "\u589e\u52a0\u4f1a\u5fc3\u738735%\uff0c\u589e\u52a0\u4f1a\u5fc3\u4f24\u5bb350%\u3002"
				},
				"1577": {
					"id": "1577",
					"upgradeId": "418",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "10",
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
					"description": "\u5200\u9635\u72b6\u6001\u66b4\u51fb\u9020\u6210\u76ee\u6807\u6d41\u88405\u79d2\uff0c\u6548\u679c\u4e3a150%\u4f24\u5bb3"
				},
				"1584": {
					"id": "1584",
					"upgradeId": "419",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "10",
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
					"description": "\u51cf\u5c11\u3010\u5200\u9635\u3011\u51b7\u5374\u65f6\u95f411.25\u79d2"
				},
				"1594": {
					"id": "1594",
					"upgradeId": "423",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u6280\u80fd\u80fd\u5bf9\u76ee\u6807\u548c\u5468\u56f42\u7c73\u8303\u56f4\u7684\u654c\u4eba\u9020\u621030%\u5f15\u7206\u4f24\u5bb3"
				},
				"1601": {
					"id": "1601",
					"upgradeId": "424",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "9",
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
					"description": "\u5f15\u7206\u76ee\u6807\u540e\uff0c\u81ea\u8eab\u83b7\u5f97\u55dc\u8840\u6548\u679c\uff0c\u4f7f\u5f97\u523a\u6740\u7cfb\u6280\u80fd\u653b\u51fb\u901f\u5ea6\u63d0\u9ad875%\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad875%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1617": {
					"id": "1617",
					"upgradeId": "428",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "7",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb345%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1624": {
					"id": "1624",
					"upgradeId": "429",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "7",
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
					"description": "\u91cd\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c114.5\u79d2\u3002"
				},
				"1634": {
					"id": "1634",
					"upgradeId": "433",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u91ca\u653e\u540e\u6062\u590d30\u70b9\u4f53\u529b\u3002"
				},
				"1641": {
					"id": "1641",
					"upgradeId": "434",
					"index": "6",
					"requireLevel": "45",
					"step": "7",
					"requireSpecialization1": "8",
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
					"description": "\u95ea\u51fb\u5bf9\u76ee\u6807\u9020\u6210\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u5c06\u8fdb\u5165\u6d41\u8840\u72b6\u6001\uff0c\u6301\u7eed3\u79d2\uff0c\u6bcf\u79d2\u53d7\u523015%\u95ea\u51fb\u4f24\u5bb3\uff0c\u8be5\u6548\u679c\u53ef\u4ee5\u53e0\u52a03\u5c42\u3002"
				},
				"1651": {
					"id": "1651",
					"upgradeId": "438",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "11",
					"requireLevel1": "11",
					"requireSpecialization2": "0",
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
					"description": "\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670930%\u51e0\u7387\u53ef\u4ee5\u77ac\u95f4\u51b7\u5374\uff0c\u84c4\u6ee1\u62c9\u5203\u547d\u4e2d\u76ee\u6807\u670990%\u51e0\u7387\u77ac\u95f4\u51b7\u5374\u3002"
				},
				"1658": {
					"id": "1658",
					"upgradeId": "439",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "11",
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
					"description": "\u62c9\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621090%\u4f24\u5bb3\u3002"
				},
				"1668": {
					"id": "1668",
					"upgradeId": "443",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u88ab\u51fb\u7834\u540e\uff0c\u5bf92\u7c73\u8303\u56f4\u5185\u7684\u76ee\u6807\u9020\u6210300%\u4f24\u5bb3\u3002"
				},
				"1675": {
					"id": "1675",
					"upgradeId": "444",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "12",
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
					"description": "\u5047\u8eab\u5b58\u5728\u671f\u95f4\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad875\u70b9\uff0c\u79fb\u52a8\u901f\u5ea6\u63d0\u9ad875%\u3002"
				},
				"1685": {
					"id": "1685",
					"upgradeId": "448",
					"index": "6",
					"requireLevel": "46",
					"step": "7",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u9f99\u5973\u83b7\u5f9730%\u653b\u51fb\u52a0\u6210\u3002"
				},
				"1692": {
					"id": "1692",
					"upgradeId": "449",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "13",
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
					"description": "\u8eab\u5904\u70df\u5e55\u4e2d\uff0c\u654c\u5bf9\u76ee\u6807\u53d7\u5230\u6bcf\u79d2150%\u7684\u4f24\u5bb3\u3002"
				},
				"1708": {
					"id": "1708",
					"upgradeId": "453",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "14",
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
					"description": "\u56de\u65cb\u6740\u7ed3\u675f\u76843\u79d2\u5185\uff0c\u9f99\u5973\u95ea\u907f\u7387\u63d0\u5347100%\uff0c\u4e14\u5728\u6b64\u671f\u95f4\uff0c\u6c14\u5143\u65a9\u4f24\u5bb3\u63d0\u9ad845%\u3002"
				},
				"1715": {
					"id": "1715",
					"upgradeId": "454",
					"index": "6",
					"requireLevel": "47",
					"step": "7",
					"requireSpecialization1": "14",
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
					"description": "\u66b4\u51fb\u65f6\uff0c\u76ee\u6807\u643a\u5e26\u56de\u65cb\u674022.5%\u4f24\u5bb3\u7684\u6d41\u8840\u6548\u679c\uff0c\u6301\u7eed5\u79d2\uff0c\u8be5\u6548\u679c\u6700\u5927\u53e0\u52a03\u5c42\u3002"
				},
				"1725": {
					"id": "1725",
					"upgradeId": "458",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "15",
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
					"description": "\u589e\u52a0\u65cb\u5203\u653b\u51fb\u6b21\u657010\u6b21\u3002"
				},
				"1732": {
					"id": "1732",
					"upgradeId": "459",
					"index": "6",
					"requireLevel": "50",
					"step": "7",
					"requireSpecialization1": "15",
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
					"description": "\u65cb\u5203\u5bf9\u6709\u9f99\u8840\u5370\u8bb0\u7684\u76ee\u6807\u989d\u5916\u9020\u621090%\u4f24\u5bb3\u3002"
				},
				"1742": {
					"id": "1742",
					"upgradeId": "463",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "16",
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
					"description": "\u9489\u523a\u7684\u653b\u51fb\u8ddd\u79bb\u589e\u52a04\u7c73\u3002"
				},
				"1749": {
					"id": "1749",
					"upgradeId": "464",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "16",
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
					"description": "\u51cf\u5c11\u51b7\u5374\u65f6\u95f45\u79d2\u3002"
				},
				"1759": {
					"id": "1759",
					"upgradeId": "468",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "17",
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
					"description": "2\u9636\u6bb5\uff0c\u88ab\u66b4\u51fb\u7684\u76ee\u6807\u53d7\u5230\u6bcf\u79d2\u5200\u5203\u62a4\u76fe60%\u7684\u4f24\u5bb3\uff0c\u6301\u7eed3\u79d2\u3002"
				},
				"1766": {
					"id": "1766",
					"upgradeId": "469",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "17",
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
					"description": "1\u9636\u6bb5\uff0c\u6bcf\u4ea7\u751f\u4e00\u628a\u5200\u5203\uff0c\u9f99\u5973\u653b\u51fb\u63d0\u9ad830\u70b9\u3002"
				},
				"1779": {
					"id": "1779",
					"upgradeId": "476",
					"index": "6",
					"requireLevel": "43",
					"step": "7",
					"requireSpecialization1": "6",
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
					"description": "\u51b7\u5374\u65f6\u95f4\u7f29\u77ed5\u79d2\u3002"
				},
				"1865": {
					"id": "1865",
					"upgradeId": "477",
					"index": "6",
					"requireLevel": "52",
					"step": "7",
					"requireSpecialization1": "18",
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
					"description": "\u63d0\u9ad8\u4f24\u5bb345%,\u6700\u5927\u76ee\u6807\u65703\u4e2a\u3002"
				},
				"1872": {
					"id": "1872",
					"upgradeId": "478",
					"index": "6",
					"requireLevel": "53",
					"step": "7",
					"requireSpecialization1": "18",
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
					"description": "\u524d\u4e00\u5f0f\u547d\u4e2d\u76ee\u6807\u4f7f\u540e\u4e00\u5f0f\u4f24\u5bb3\u63d0\u9ad860%\u3002"
				},
				"1947": {
					"id": "1947",
					"upgradeId": "479",
					"index": "6",
					"requireLevel": "44",
					"step": "7",
					"requireSpecialization1": "6",
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
					"requireUpgradeLevel3": null,
					"requireSpecialPoint": "4",
					"description": "\u4f7f\u7528\u98de\u661f\u540e\u95ea\u907f\u7387\u63d0\u534760%\uff0c\u6301\u7eed5\u79d2\u3002"
				},
				"1957": {
					"id": "1957",
					"upgradeId": "505",
					"index": "6",
					"requireLevel": "48",
					"step": "7",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u51b7\u5374\u65f6\u95f4\u51cf\u5c115\u79d2"
				},
				"1964": {
					"id": "1964",
					"upgradeId": "506",
					"index": "6",
					"requireLevel": "49",
					"step": "7",
					"requireSpecialization1": "102",
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
					"description": "\u4fa7\u5203\u5bf9\u6709\u9f99\u8840\u52a0\u6210\u7684\u76ee\u6807\u989d\u5916\u9020\u621090%\u4f24\u5bb3"
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