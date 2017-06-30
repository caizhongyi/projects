"undefined" == typeof ArcheAge && (window.ArcheAge = {});
"undefined" == typeof ArcheAge.Web && (ArcheAge.Web = {});
ArcheAge.Web.AbilityCalculator = function(a) {
	this.levelMax_ = 50;
	this.points_ = {};
	this.abilities_ = [void 0, void 0, void 0];
	this.initData_ = {};
	this.data_ = {};
	this.cache_ = {};
	this.availablePoints_ = this.requireLevel_ = this.abilityPoints_ = 0;
	this.calculatorContainer_ = $(".skill_calc");
	this.abilitiesContainer_ = $(".wrap_skill_tree", this.calculatorContainer_);
	this.abilityContainer_ = $(".skill_tree", this.abilitiesContainer_);
	this.containerSelector_ = this.abilityContainer_ + " > div > .skill_container";
	void 0 != a && (this.initData_ = a, this.setData(a));
	this.bindForm()
};
ArcheAge.Web.AbilityCalculator.prototype.setData = function(a) {

	var b = this;
	null == a || void 0 == a || (b.reset(),
        b.data_ = JSON.parse(JSON.stringify(a)),
        void 0 == b.data_.abilities && (b.data_.abilities = []),
        void 0 != b.data_.points && (b.points_ = b.data_.points),
        void 0 != b.data_.levelMax && (b.levelMax_ = b.data_.levelMax),
        $.each(b.data_.abilities,
	function(a, d) {
		b.addAbility(d)
	}))
};
ArcheAge.Web.AbilityCalculator.prototype.bindForm = function() {
	var a = this,
	b = $(".choose_job", a.calculatorContainer_);
	"none" != b.css("display") ? $(".job", a.calculatorContainer_).addClass("open") : $(".job", a.calculatorContainer_).removeClass("open");
	$(".calculator-reset", a.calculatorContainer_).click(function(c) {
		a.reset();
		c.preventDefault()
	});
	a.calculatorContainer_.on("click", ".calculator-reset-skill",
	function(c) {
		var b = $(this).attr("data-ability");
		a.resetSkill(b);
		c.preventDefault()
	});
	$(".calculator-current", a.calculatorContainer_).focus(function() {
		$(this).blur()
	}).click(function(c) {
		a.setData(a.initData_);
		c.preventDefault()
	});
	$(".btnJobName", a.calculatorContainer_).focus(function() {
		$(this).blur()
	}).click(function(c) {
		a.reset();
		c.preventDefault();
		c = $(this).attr("data-ability").split("^");
		$.each(c,
		function(c, b) {
			a.addAbility(b)
		})
	});
	$(".job", a.calculatorContainer_).focus(function() {
		$(this).blur()
	}).click(function(a) {
		b.toggle();
		"none" != b.css("display") ? $(this).addClass("open") : $(this).removeClass("open");
		a.preventDefault()
	});
	$(".btn_sel", a.abilityContainer_).focus(function() {
		$(this).blur()
	}).click(function(b) {
		b.preventDefault();
		$(".btn_sel", a.abilityContainer_).unbind("clickoutside");
		$(this).bind("clickoutside",
		function() {
			var b = $(".layer_list", a.abilityContainer_);
			b.parent().removeClass("open");
			b.remove();
			$(this).unbind("clickoutside")
		});
		a.getAbilityChooser($(this))
	});
	$(document).on("click", "div.layer_list > ul.list > li > a,div.choose > ul.tf > li > a",
	function(b) {
		b.preventDefault();
		var b = $(this).parents("div.skill_tree").attr("data-index"),
		d = $(this).attr("data-ability");
		a.addAbility(d, b)
	})
};
ArcheAge.Web.AbilityCalculator.prototype.reset = function() {
	var a = this;
	a.data_ = {};
	a.abilities_ = [void 0, void 0, void 0];
	$(".btn_sel > span.txt", a.calculatorContainer_).text("天赋");
	$.each(a.abilities_,
	function() {
		$(".ability_container", a.abilityContainer_).html("")
	});
	$(".job_name", a.calculatorContainer_).html(a.getJobName());
	a.change_()
};
ArcheAge.Web.AbilityCalculator.prototype.resetSkill = function(a) {
	this.data_.skills = [];
	this.data_.pbuffs = [];
	for (var b = 0; b < this.abilities_.length; b++) {
		var c = this.abilities_[b];
		if (void 0 != c && !(void 0 != a && c.id != a)) {
			var d = $(".skill-detail");
			void 0 != a && (d = $(".skill-detail", $(".skill_tree[data-ability='" + a + "']", this.abilitiesContainer_)));
			if (void 0 != c.skills) {
				for (var f in c.skills) {
					var e = $(".st_skill_cover", d);
					void 0 != e && e.show()
				}
				c.skills = {}
			}
			d = $(".pbuff-detail");
			void 0 != a && (d = $(".pbuff-detail", $(".skill_tree[data-ability='" + a + "']", this.abilitiesContainer_)));
			if (void 0 != c.pbuffs) {
				for (f in c.pbuffs) {
					var e = $(".st_skill_cover", d),
					g = $(".st_skill_point", d);
					void 0 != e && e.show();
					void 0 != g && g.show()
				}
				c.pbuffs = {}
			}
		}
	}
	this.change_()
};
ArcheAge.Web.AbilityCalculator.prototype.getAbilities = function() {
	return this.abilities_
};
ArcheAge.Web.AbilityCalculator.prototype.getMaxPoints = function() {
	return this.getMaxPoints_(this.levelMax_)
};
ArcheAge.Web.AbilityCalculator.prototype.getAbilityPoints = function(a) {
	if (void 0 == a) return this.abilityPoints_;
	if (void 0 == a) return ! 1;
	for (var b = 0; b < this.abilities_.length; b++) {
		var c = this.abilities_[b];
		if (void 0 != c && c.id == a) {
			var a = 0,
			d;
			for (d in c.skills) a++;
			for (d in c.pbuffs) a++;
			return a
		}
	}
	return 0
};
ArcheAge.Web.AbilityCalculator.prototype.getRequireLevel = function() {
	return this.requireLevel_
};
ArcheAge.Web.AbilityCalculator.prototype.getJobName = function() {
	var a = [];
	for (i in this.getAbilities()) a[i] = void 0,
	void 0 != this.getAbilities()[i] && (a[i] = this.getAbilities()[i].id);
	a.sort(function(a, b) {
		a = Number(a);
		b = Number(b);
		return a < b ? -1 : a > b ? 1 : 0
	});
	var b = String(a[0]) + "^" + String(a[1]) + "^" + String(a[2]),
	c = "请选择天赋";
	$(".btnJobName").each(function() {
		if ($(this).attr("data-ability") == b) return c = $(this).html(),
		!1
	});
	return c
};
ArcheAge.Web.AbilityCalculator.prototype.addAbility = function(a, b,callback) {
	if (void 0 == b) {
		for (var c = -1,
		d = 0; d < this.abilities_.length; d++) if (void 0 == this.abilities_[d]) {
			c = d;
			break
		}
		if ( - 1 == c) return;
		b = c
	} else if (2 < b) return;
	if (void 0 != this.abilities_[b]) {
		c = this.abilities_[b];
		if (void 0 != c.skills) for (key in c.skills) if (void 0 != this.data_.skills) for (d = 0; d < this.data_.skills.length; d++) this.data_.skills[d] == key && this.data_.skills.splice(d, 1);
		if (void 0 != c.pbuffs) for (key in c.pbuffs) if (void 0 != this.data_.pbuffs) for (d = 0; d < this.data_.pbuffs.length; d++) this.data_.pbuffs[d] == key && this.data_.pbuffs.splice(d, 1)
	}
	this.abilities_[b] = {
		id: a,
		skills: {},
		pbuffs: {}
	};
	$(".job_name", this.calculatorContainer_).html(this.getJobName());
	c = $(".skill_tree[data-index='" + b + "']", this.abilitiesContainer_);
	$("a.btn_sel > span.txt", c).text(ArcheAge.Web.AbilityType.getName(a));
	this.getAbility_(a, b ,callback);
	this.change_()
};
ArcheAge.Web.AbilityCalculator.prototype.getAbility_ = function(a, b , callback) {
	var c = this,
	d = $(".skill_tree[data-index='" + b + "']", c.abilitiesContainer_);

	c.cache_[a] ? (d.attr("data-ability", a), $("div.ability_container", d).html(c.cache_[a]), c.bindButton_(a)) : $.ajax({
		url: "abilities/" + a + ".html",
		type: "GET",
		cache: !1,
		dataType: "html",
		error: function() {},
		success: function(b) {
			c.cache_[a] = b;
			d.attr("data-ability", a);
			$("div.ability_container", d).html(b);
			c.bindButton_(a);
            callback && $.proxy(callback,this)();
		}
	})
};
ArcheAge.Web.AbilityCalculator.prototype.hasAbility_ = function(a) {
	if (void 0 == a) return ! 1;
	for (var b = 0; b < this.abilities_.length; b++) {
		var c = this.abilities_[b];
		if (void 0 != c && c.id == a) return ! 0
	}
	return ! 1
};
ArcheAge.Web.AbilityCalculator.prototype.bindButton_ = function(a) {
	var b = this,
	a = $(".skill_tree[data-ability='" + a + "']", b.abilitiesContainer_);
	$(".skill-detail", a).unbind("mousedown").unbind("mouseover").bind("contextmenu",
	function() {
		return ! 1
	}).each(function() {
		if (! (null == b.data_ || void 0 == b.data_.skills)) {
			var a = $(this).attr("data-skill"),
			d = $(this).attr("data-ability"),
			f = $(this).attr("data-level"),
			e = $(".st_skill_cover", $(this));
			b.hasAbility_(d) && $.each(b.data_.skills,
			function(g, h) {
				a == h && (e.hide(), b.addSkill_({
					id: a,
					ability: d,
					level: f
				}))
			})
		}
	}).mousedown(function(a) {
		var d = $(this).attr("data-skill"),
		f = $(this).attr("data-ability"),
		e = $(this).attr("data-level"),
		g = $(".st_skill_cover", $(this)),
		h = "none" != g.css("display");
        a.which = a.which || 1;
		switch (a.which) {
		case 1:
			if (b.requireLevel_ == b.levelMax_ && 0 == b.availablePoints_) break;
			h && (g.hide(), b.addSkill_({
				id: d,
				ability: f,
				level: e
			}));
			break;
		case 3:
			h || (g.show(), b.removeSkill_({
				id: d,
				ability: f
			}))
		}
	}).mouseover(function() {
		try {
			ArcheAge.Web.SkillTooltip.show($(this))
		} catch(a) {}
	});
	$(".pbuff-detail", a).unbind("mousedown").unbind("mouseover").bind("contextmenu",
	function() {
		return ! 1
	}).each(function() {
		if (! (null == b.data_ || void 0 == b.data_.pbuffs)) {
			var a = $(this).attr("data-pbuff"),
			d = $(this).attr("data-ability"),
			f = $(this).attr("data-level"),
			e = $(".st_skill_cover", $(this)),
			g = $(".st_skill_point", $(this));
			b.hasAbility_(d) && $.each(b.data_.pbuffs,
			function(h, j) {
				a == j && (e.hide(), g.hide(), b.addPassiveBuff_({
					id: a,
					ability: d,
					level: f
				}))
			})
		}
	}).mousedown(function(a) {
		var d = $(this).attr("data-pbuff"),
		f = $(this).attr("data-ability"),
		e = $(this).attr("data-level"),
		g = $(this).attr("data-point"),
		h = $(".st_skill_cover", $(this)),
		j = $(".st_skill_point", $(this)),
		k = "none" != h.css("display");
		switch (a.which) {
		case 1:
			if (b.requireLevel_ == b.levelMax_ && 0 == b.availablePoints_) break;
			if (0 < g && b.getAbilityPoints(f) < g) break;
			k && (h.hide(), j.hide(), b.addPassiveBuff_({
				id: d,
				ability: f,
				level: e
			}));
			break;
		case 3:
			k || (h.show(), j.show(), b.removePassiveBuff_({
				id: d,
				ability: f
			}))
		}
	}).mouseover(function() {
		try {
			ArcheAge.Web.PassiveBuffTooltip.show($(this))
		} catch(a) {}
	})
};
ArcheAge.Web.AbilityCalculator.prototype.addSkill_ = function(a) {
	for (var b = a.id,
	c = 0; c < this.abilities_.length; c++) {
		var d = this.abilities_[c];
		void 0 != d && d.id == a.ability && (d.skills[b] = a)
	}
	this.change_()
};
ArcheAge.Web.AbilityCalculator.prototype.removeSkill_ = function(a) {
	for (var b = a.id,
	c = 0; c < this.abilities_.length; c++) {
		var d = this.abilities_[c];
		void 0 != d && d.id == a.ability && delete d.skills[b]
	}
	this.change_()
};
ArcheAge.Web.AbilityCalculator.prototype.addPassiveBuff_ = function(a) {
	for (var b = a.id,
	c = 0; c < this.abilities_.length; c++) {
		var d = this.abilities_[c];
		void 0 != d && d.id == a.ability && (d.pbuffs[b] = a)
	}
	this.change_()
};
ArcheAge.Web.AbilityCalculator.prototype.removePassiveBuff_ = function(a) {
	for (var b = a.id,
	c = 0; c < this.abilities_.length; c++) {
		var d = this.abilities_[c];
		void 0 != d && d.id == a.ability && delete d.pbuffs[b]
	}
	this.change_()
};
ArcheAge.Web.AbilityCalculator.prototype.change_ = function() {
	for (var a = 0,
	b = 0,
	c = 0; c < this.abilities_.length; c++) {
		var d = this.abilities_[c];
		if (void 0 != d) {
			for (var f in d.skills) {
				var e = Number(d.skills[f].level);
				b < e && (b = e);
				a++
			}
			for (f in d.pbuffs) e = Number(d.pbuffs[f].level),
			b < e && (b = e),
			a++
		}
	}
	this.abilityPoints_ = a;
	c = this.pointToLevel_(a);
	b < c && (b = c);
	this.availablePoints_ = this.getMaxPoints_(b) - a;
	this.requireLevel_ = b;
	$(".requireLevel", this.calculatorContainer_).text(this.requireLevel_);
	$(".abilityPoints", this.calculatorContainer_).text(this.abilityPoints_);
	$(".availablePoints", this.calculatorContainer_).text(this.availablePoints_)
};
ArcheAge.Web.AbilityCalculator.prototype.getMaxPoints_ = function(a) {
	return 0 == a || void 0 == this.points_ || 50 != this.points_.length ? 0 : this.points_[a - 1]
};
ArcheAge.Web.AbilityCalculator.prototype.pointToLevel_ = function(a) {
	for (var b = 0; b <= this.levelMax_; b++) if (this.getMaxPoints_(b) >= a) return b;
	return 0
};
ArcheAge.Web.AbilityCalculator.prototype.removeAbility = function(a) {
	void 0 != a ? this.abilities_[a] = void 0 : this.abilities_ = [void 0, void 0, void 0]
};
ArcheAge.Web.AbilityCalculator.prototype.getAbilityChooser = function(a) {
	var b = $(a).parents("div.skill_tree").attr("data-index"),
	c = $(".layer_list", this.abilitiesContainer_);
	if (0 < c.length) {
		var d = c.parents("div.skill_tree").attr("data-index");
		if (b == d) {
			c.remove();
			a.parent().removeClass("open");
			return
		}
		c.parent().removeClass("open");
		c.remove()
	}
	for (var d = ArcheAge.Web.AbilityType,
	f = this.getAbilities(), b = [], c = 0; c < d.length; c++) {
		for (var e = !0,
		g = 0; g < f.length; g++) void 0 != f[g] && f[g].id == d[c].id && (e = !1);
		e && b.push(d[c])
	}
	d = '<div class="layer_list"><ul class="list">';
	for (c = 0; c < b.length; c++) d += '<li><a href="#" data-ability="' + b[c].id + '">' + b[c].name + "</a></li>";
	a.parent().append(d + "</ul></div>");
	a.parent().addClass("open")
};
ArcheAge.Web.Ability = {
	FIGHT: {
		id: 1,
		name: "格斗"
	},
	ILLUSION: {
		id: 2,
		name: "幻术"
	},
	ADAMANT: {
		id: 3,
		name: "铁壁"
	},
	WILL: {
		id: 4,
		name: "意志"
	},
	DEATH: {
		id: 5,
		name: "死亡"
	},
	WILD: {
		id: 6,
		name: "野性"
	},
	MAGIC: {
		id: 7,
		name: "元素"
	},
	VOCATION: {
		id: 8,
		name: "暗杀"
	},
	ROMANCE: {
		id: 9,
		name: "吟游"
	},
	LOVE: {
		id: 10,
		name: "生命"
	}
};
ArcheAge.Web.AbilityType = [ArcheAge.Web.Ability.FIGHT, ArcheAge.Web.Ability.ILLUSION, ArcheAge.Web.Ability.ADAMANT, ArcheAge.Web.Ability.WILL, ArcheAge.Web.Ability.DEATH, ArcheAge.Web.Ability.WILD, ArcheAge.Web.Ability.MAGIC, ArcheAge.Web.Ability.VOCATION, ArcheAge.Web.Ability.ROMANCE, ArcheAge.Web.Ability.LOVE];
ArcheAge.Web.AbilityType.getType = function(a) {
	for (var b = 0; b < ArcheAge.Web.AbilityType.length; b++) if (ArcheAge.Web.AbilityType[b].id == a) return ArcheAge.Web.AbilityType[b];
	return null
};
ArcheAge.Web.AbilityType.getName = function(a) {
	var b = "天赋",
	a = ArcheAge.Web.AbilityType.getType(a);
	null != a && (b = a.name);
	return b
};