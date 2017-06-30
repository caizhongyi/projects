//100番代以降用
//2012.12/13Thu
//  Season3 時間の扉
//2012.04/25Wed
//  Season2 Act.8 革新
//  QP対応，SPクエ削除
var is_debug_mode_ = /localhost/.test(location.href);
var REQUEST_PARAM = is_debug_mode_?"?" + new Date().getTime():getJsParam();

var MAX_PLV_ = 80;//最大プレイヤーLV
var CONTRACT_EXPERT_DLV = 5


//スキルコードの先頭に基本職-上級職-男女-バージョンを追加する
//"KWm030"とか
var JOBCODES = [
	"KXm",
	"KWm",//ghost Knight
	"KSm",
	"KBm",
	"KAm",
	
	"FXf",
	"FNf",
	"FSf",
	"FBf",//Brawler
	"FGf",

	"FXm",
	"FNm",
	"FSm",
	"FBm",//Brawler
	"FGm",
	
	"GXm",
	"GRm",
	"GLm",
	"GMm",
	"GSm",
	
	"GXf",
	"GRf",
	"GLf",
	"GMf",
	"GSf",
	
	"MXf",
	"MEf",
	"MSf",
	"MWf",//Witch
	"MBf",
	
	"MXm",
	"MEm",//Elemental Bomber
	"MIm",//Ice
	
	"PXm",
	"PCm",
	"PIm",
	"PEm",//Exocist
	"PAm",
	
	"TXf",
	"TRf",
	"TNf"
];

var sptable_ = [
	   0, //
	   0, //Lv1
	  30,
	  60,
	  90,
	 120,
	 150,
	 180,
	 210,
	 240,
	 270,
	 330,
	 390,
	 450,
	 510,
	 570,
	 630,
	 690,
	 750,
	 810,
	 870,
	 960,
	1050,
	1140,
	1230,
	1320,
	1410,
	1500,
	1590,
	1680,
	1770,
	1890,
	2010,
	2130,
	2250,
	2370,
	2490,
	2610,
	2730,
	2850,
	2970,
	3090,
	3210,
	3330,
	3450,
	3570,
	3690,
	3810,
	3930,
	4050,
	4170,
	4320,
	4470,
	4620,
	4770,
	4920,
	5070,
	5220,
	5370,
	5520,
	5670,
	5850,
	6030,
	6210,
	6390,
	6570,
	6750,
	6930,
	7110,
	7290,
	7470,//Lv70
	7680,
	7890,
	8100,
	8310,
	8520,
	8730,
	8940,
	9150,
	9360,
	9570 //Lv80
];
var need_shim_ = false;
var is_ie_ = /*@cc_on!@*/false;

//GUIのヒント．
//idとして有効なものは自動でonmouseoverとonmouseoutを設定している．
//複数箇所で使用するものは直接onHint(e, tag)でtagを指定すること．
var hints_ = {
	//asps_common.htmlt
	minus10btn : "プレイヤーのLVを-10します．<br>自動習得設定のスキルは自動でスキルLVが下降します．",
	minus1btn  : "プレイヤーのLVを- 1します．<br>自動習得設定のスキルは自動でスキルLVが下降します．",
	plus1btn   : "プレイヤーのLVを+ 1します．<br>自動習得設定のスキルは自動でスキルLVが上昇します．",
	plus10btn  : "プレイヤーのLVを+10します．<br>自動習得設定のスキルは自動でスキルLVが上昇します．",
	plv        : "現在のプレイヤーLVを表示/設定します．",
	contract_chk : "達人の契約を使用するとプレイヤーLv+5で取得可能なスキルを習得出来ます．",
	fairpvp_chk  : "公正決闘では最大SP量が変わります(-375SP)．",
	level_sp   : "現在のプレイヤーLvによって得られるSP量を表示します．",
	dsp        : "直接入力によるSPの差分を入力できます(正値のみ)．",
	used_sp    : "現在のスキル設定に必要なSPの合計を表示します．",
	rest_sp    : "余剰SPを表示します．",
	level_tp   : "現在のプレイヤーLvによって得られるTP量を表示します．",
	dtp        : "直接入力によるTPの差分を入力できます(正値のみ)．",
	used_tp    : "現在のスキル設定に必要なTPの合計を表示します．",
	rest_tp    : "余剰TPを表示します．",
	level_qp   : "現在のプレイヤーLvによって得られる最大QP量を表示します．",
	used_qp    : "現在のスキル設定に必要なQPの合計を表示します．",
	rest_qp    : "余剰QPを表示します．",
	hint_chk   : "ヒントの表示/非表示を切り替えます．",
	requirements_chk : "前提スキルのLV表示/非表示を切り替えます．",
	nowrap_chk : "ラベルの折り返しを禁止します．",
	slotnumber : "現在の設定を保存するスロットを指定します．",
	load_btn      : "指定スロットのデータを読み込みます．<br>現在表示されている設定は破棄されます．",
	save_btn      : "指定スロットに現在の設定を保存します．",
	reset_btn     : "現在表示されている設定を初期化します．<br>保存されている設定には影響しません．",
	del_cookie_btn: "クッキーを削除します．<br>全ての保存している設定が削除されます．",
	skillcode     : "スキルコード(現在の設定を文字列化したもの)が表示されます．<br>表示するには「生成」ボタンを，<br>スキルコードから復元する場合はここに入力してから「復元」ボタンを押します．",
	decode_btn    : "スキルコードから設定を復元します．<br>現在の設定は破棄されます．",
	encode_btn    : "現在の設定からスキルコードを生成します．",
	shortcode_chk : "スキルコードの見た目を短縮します．<br>プロポーショナルフォントを利用しないと長さは変化しません．",
	url_chk       : "スキルコードにURLを付けます．",
	dump_btn      : "現在の設定を元に貼り付け用のダンプを出力します．<br>ダンプは画面下部に表示されます．",
	//asps.js 
	spq_check_btn : "全てのクエストをチェックします．",
	spq_clear_btn : "全てのクエストのチェックを解除します．",
	spq_chkbtn    : "チェックすると対象クエストのSPが加算されます．",
	spq_auto_chk  : "プレイヤーLVに応じて遂行可能なSPクエストに自動でチェックをいれます．",
	am : "自動習得の使用を切り替えます．<br>チェックするとスキルLVをプレイヤーLVに応じて<br>自動で最大まで取得します．",
	emp_skill : "前提条件によって背景の色が変化します．<br>"
	           +"<span class=target_skill>選択スキルはこの色</span>，<br>"
	           +"<span class=prereq_skill>前提スキルはこの色</span>，<br>"
	           +"<span class=target_skill>選択スキル</span>を前提とする<span class=concl_skill>上位スキルはこの色</span>で表示されます．",
	skill_select : "スキルLVを選択します．<br>前提条件により必要なスキルは自動で取得し，<br>前提が足りなくなった上位スキルは自動で0になります．",
	output_sel_btn : "スキルダンプを選択します．",
	chk_fixedfont  : "固定長フォントの使用/不使用を切り替えます．<br>テンプレート使用時は強制的にプロポーショナルフォントとなります．",
	chk_template   : "したらばアラドスレ用のテンプレートを使用します．<br>対応していない職は表示されません．",
	hideoutput_btn : "スキルダンプエリアを非表示にします．",
	dumped_text    : "スキルダンプを表示します．"
	
};
//new Array();してhints_["hoge"]="moke";式の初期化はIEだと処理が走らない．

var wiki_url_ = "http://dnf.wikiwiki.jp/";
var jobcode_ = ""; //クッキーのラベルにもこれを使用．
//jobはJOB_INITIALSのキーを，genderは"MALE"or"FEMALE"を指定
var T_LANG; //ja, en
var T_CLASS, T_MAINCLASS, T_SUBCLASS, T_GENDER;
var update_hash_ = false;//初期化時はハッシュを更新しない
var disable_hash_update_ = false;//sLv変更などによるハッシュ更新を無効化
function initAsps(){
	//var h = location.hash;
    var h = '#KAm090GliiiiiiiiiiiiiiiiiiiiiiiiiiiiiIiiiiIiiiiiiiiIiiiiiiliiIiIiiIiiiiIiiiiiiiiiiiiiiiiiiiiiiiIiiii';
    if(!h){
		h = "";
	}

	T_LANG = getLanguage();

	var version;
	if(!isJobCode(h.substr(1, 3))){//職の指定がない場合はインデックスのみを表示
		if(location.search=="?disable_hash_update"){
			localStorage.setItem("disable_hash_update", true);
			displayDebug("disable_hash_update has set to true.");
		}else if(location.search=="?enable_hash_update"){
			localStorage.removeItem("disable_hash_update");
			displayDebug("disable_hash_update has set to false.");
		}
			
		//インデックスを表示
		initForm(true);
		return;
	}
	//hash例:#FNm080, #FNm, #FNm080....
	T_CLASS     = h.substr(1,3);//FNm
	T_MAINCLASS = h.substr(1,1);//F
	T_SUBCLASS  = h.substr(2,1);//N
	T_GENDER = h.substr(3,1);//m
	version = parseInt(h.substr(4, 3), 10);//080→80 or NaN
	displayDebug(T_CLASS + ", " + T_MAINCLASS + ", " + T_SUBCLASS + ", " + T_GENDER + ", " + version);


	//最新バージョン，クエストのバージョンを読み込む
	r = new Ajax.Request("versions.json" + REQUEST_PARAM, {method:"get", asynchronous:false});
	var vi;//version info
	try{
		vi = eval("(" + r.transport.responseText + ")");
	}catch(e){
		displayError("@eval of versions.json : " + e);
		return;
	}
	if(version){//バージョン指定有り
		jobcode_ = h.substr(1, 6);//FNm080
	}else{//バージョン指定なし
		version = vi[T_LANG][T_CLASS]?vi[T_LANG][T_CLASS][0]:vi[T_LANG]["default"];//職指定があればそれ，なければdefault
		displayDebug("use version=" + version);
		var s = T_CLASS;
		if(version<10) s = s + "0";
		if(version<100)s = s + "0";
		s = s + version;
		jobcode_ = s;
		location.hash = jobcode_;//ハッシュにバージョンを足す
	}
	//バージョン配列
	var versions;
	if(vi[T_LANG][T_CLASS]){
		versions = vi[T_LANG][T_CLASS];
	}else{
		versions = [version];
	}
		
	TT = "";

	//GUI関連，必須
	r = new Ajax.Request("lang_gui_"+T_LANG+".js" + REQUEST_PARAM, {method:'get', asynchronous:false});
	TT = TT + r.transport.responseText;

	//共通スキル，日本語版なら必要なし
	r = new Ajax.Request("lang_common_"+T_LANG+".js" + REQUEST_PARAM, {method:'get', asynchronous: false});
	TT = TT + r.transport.responseText;

	//メインクラス翻訳情報
	r = new Ajax.Request("lang_"+T_MAINCLASS+ "_"+T_GENDER + "_" + T_LANG + ".js" + REQUEST_PARAM, {method:'get', asynchronous:false});//一時スキル 例:男鬼=lang_K_m_en.js, 女ガンナー=lang_G_f_en.js
	if(r.transport.status>0&&r.transport.status<400){
		TT = TT + r.transport.responseText;
	}
	//サブクラス翻訳情報
	r = new Ajax.Request("lang_"+T_CLASS +                   "_" + T_LANG + ".js" + REQUEST_PARAM, {method:'get', asynchronous:false});//二次スキル 例:ポンマス=lang_KWm_en.js, 女メカ=lang_GMf_en.js JOBCODESの値と同一
	if(r.transport.status>0&&r.transport.status<400){
		TT = TT + r.transport.responseText;
	}

	//スキル情報
	r = new Ajax.Request("skills_" + jobcode_ + ".json" + REQUEST_PARAM, {method:'get', asynchronous:false});
	if(r.transport.status==0||r.transport.status>=400){
		displayError(r.transport.status + " " + r.transport.statusText + " : " + r.url);
		return;
	}
	
	var skills;
	try{
		TT = eval("({" + TT + "\n_dummy:''})"); //連想配列化 IE対策に最終要素追加．
		//クラスを使ってるから正式なJSONでは無い．JSON.parseじゃなくてevalする必要がある．
		skills = eval("(" + r.transport.responseText + ")");//スキルの初期化時にTTの翻訳情報を使用する．
	}catch(e){
		displayError(e + "[@eval of skills_json]");
		return;
	}
	common_skills_     = skills.GENERAL_SKILLS;
	common_skills_.each(function(i){i.tier=0;});
	first_job_skills_  = skills.MAINCLASS_SKILLS;
	first_job_skills_.each(function(i){i.tier=1;});
	second_job_skills_ = skills.SUBCLASS_SKILLS;
	second_job_skills_.each(function(i){i.tier=2;});
	id_skill_template_ = skills.SKILL_TEMPLATE;
	abbrevs_           = skills.ABBREVS;
	
	if(!("skill_requirements_" in window)){
		buildRequirements();
	}
	//タイトルの変更
	if(TT["_title"]){
		document.title = TT["_title"] + "[asps]";
	}else if(skills._title){
		document.title = skills._title + "[asps]";//デフォルトの日本語名用に
	}

	disable_hash_update_ = localStorage.getItem("disable_hash_update")!=null;

	//画面を構築
	initForm(false, versions);
	//以下操作可能
}
function initForm(is_index_page, versions){
	//フォームの翻訳情報を読み込む
	var r = new Ajax.Request("lang_form_" + T_LANG + ".json" + REQUEST_PARAM, {method:'get', asynchronous:false});
	var fld;//form lang data.
	try{
		 fld = eval("(" + r.transport.responseText + ")");
	}catch(e){
		displayError(e);
		return;
	}
	//フォーム本体を読み込む．
	r = new Ajax.Request("form.htmlt" + REQUEST_PARAM, {method:'get', asynchronous:false});//テンプレはID埋め込み
	$("divform").innerHTML = new Template(r.transport.responseText).evaluate(fld);

	//IE6のselect z-indexバグへの対応
	need_shim_ = (typeof document.body.style.maxHeight == "undefined");//IE6 or older
	//console.log(need_shim_);
	$("hint_area").hide();
	$("shim").hide();
	$("output_area").hide();
	//wikiのリンクを設定
	//$("wiki_link").setAttribute("href", wiki_url_);
	
	//インデックスページ
	if(is_index_page){
		$("mainform").hide();
		window.onhashchange = onHashChanged;//ハッシュ変更の監視を開始
		displayDebug("show only index");
		return;
	}
	//属性追加
	common_skills_.each(function(s){
		if(s.type==undefined)s.type="common_skill";
	});
	first_job_skills_.each(function(s){
		if(s.type==undefined)s.type="first_skill";
	});
	second_job_skills_.each(function(s){
		if(s.type==undefined)s.type="second_skill";
	});
	//列に均等に割り振る
	var n_cols = getNumberOfColumns();
	var skills = common_skills_.concat(first_job_skills_, second_job_skills_);
	var n_each_col = Math.ceil(skills.length/n_cols);
	for(var col=0;col<n_cols;col++){
		var aa = new Array();
		for(var i=0;i<n_each_col;i++){
			var j = col*n_each_col+i;
			if(j>=skills.length)break;
			aa.push(skills[j]);
		}
		printSkills("skill_table" + col, aa);
	}
	if(getIconSize()<=0){
		hideIconTd();
	}

	loadSlots(0, true);
	//var i = location.href.search(/\?/)
	//var sc = (i!=-1);
	//if(sc){
	//	var scode = location.href.substring(i+1);
	//	$("skillcode").value = scode;
	//}
	//ハッシュを利用するように変更
	var sc = false;
	if(location.hash && location.hash.length>"#FNm080".length){//#FNm080
		sc = true;
		$("skillcode").value = location.hash.substr(1);
	}
	old_hash_ = location.hash;
	//ヒント用のイベントハンドラを設定
	for(var i in hints_){//for inは配列の列挙ではなくオブジェクトのプロパティの列挙．
		if($(i)==undefined)continue;//idとして無効なものははじく
		//var e = $(i);
		//e.addEventListener("mousemove", onHint, false);//IEが対応してない
		Event.observe(i, "mousemove", onHint, false);//prototype.jsを利用
		Event.observe(i, "mouseout", hideHint, false);
	}

	//言語セレクト設定
	var s = $("lang_select");
	for(var i=0;i<s.length;i++){
		if(s[i].value == T_LANG){
			s.selectedIndex = i;
			break;
		}
	}
	//アイコンサイズ設定
	s = $("icon_size_select");
	var icon_size = getIconSize();
	for(var i=0;i<s.length;i++){
		if(s[i].value == icon_size){
			s.selectedIndex = i;
			break;
		}
	}
	//バージョンセレクト設定
	s = $("version_select");
	var v = parseInt(location.hash.substr("#MSf".length, 3), 10);
	for(var i=0;i<versions.length;i++){
		s.options[i] = new Option(versions[i], versions[i]);
		if(versions[i]==v)s.selectedIndex = i;
	}
	if(s.selectedIndex!=0){//最新版でないならば
		var m = $("version_memo");
		m.textContent = TT["_newer_msg"];
	}
	//inputのサイズ指定
	if(is_ie_){
		var f = function(ww, ex_text){
			var w = getAaTextWidth(ex_text);
			ww.each(function(v){
				$(v).style.width=w;
			});
		};
		f(["plv", "level_tp", "used_tp", "rest_tp"], "00");
		f(["dsp"], "000");
		f(["level_sp", "used_sp", "rest_sp", "level_qp", "used_qp", "rest_qp"], "0000");
	}

	//前提条件表示spanを非表示にする．IEだとtextが""でも背景色が出てしまうので．
	//var ss = $A(document.getElementsByClassName("reqspan")); //deprecated @ prototype.js ver1.6 
	//ss.each(function(s){s.hide();});
	$$(".reqspan").each(function(s){s.hide();});
	
	if(sc){//スキルコード付きなら
		doDecode(true);
	}
	update_hash_ = true;//ハッシュの更新を有効にする
	if(!sc)updateHashCode();//クッキーからロードした場合に必要
	window.onhashchange = onHashChanged;//ハッシュ変更の監視を開始
}

//スキルについて
//c1. スキルLV1から最大スキルレベルまで固定プレイヤーLV, 固定SPで上昇するもの ex.古代の記憶
//c2. スキルLV1のみSP0で取得出来，それ以外はc1と同じ． ex.ミューズアッパー
//c3. スキルLV1のみ取得SP量が違い，それ以外はc1と同じ．ex.三段切り
//c4. スキルLV1と2の取得SP量が違い，それ以外はc1と同じ． ex. アッシュ，スラスト，鬼切り，ウェーブ
//c5. スキルLV1のみ取得可能なもの
//c6. 取得可能LVで1無料取得出来，さらにLV2に上げられる． ex.覚醒パッシブスキル
//cx. 上昇パターンがそれ以外のもの
//職情報
var id_name_table_ = new Array();
var id_obj_table_ = new Array();
var prev_id_ = "";
var cur_id_  = "";
var SkillInfo = Class.create();
SkillInfo.prototype = {
	//id, 日本語名
	initialize : function(id, name){
		this.id      = id;
		//this.name    = name;
		if(!TT[id]){
			this.name = name;
		}else{
			this.name = TT[id];
		}
		this.can_learn_and_raise = false;

		//this.option_zero = '<option slv=0 llv=0 value=0>'+TT['_skill_zero']+'</option>';
		this.option_zero = '<option slv=0 llv=0 value=0>'+TT['_skill_zero']+'</option>';
		this.option_template = new Template('<option slv=#{slv} llv=#{llv} value=#{sum}>#{slv}) LV#{llv} [#{sum}]');
		this.options = "";
		this.ex = 0;
		this.pre = new Object();//前提条件の連想配列
		this.registToIdNameTable();
		prev_id_ = cur_id_;
		cur_id_  = id;
	},
	registToIdNameTable : function(){
		if(this.name!=undefined&&this.name!=""){
			id_name_table_[this.id] = this.name;
			id_obj_table_[this.id] = this;
		}
	},
	//習得してMなスキル 習得可能LV, 消費SP
	setAsOneOnly : function(learn_from, sp_cost){
		return this.setAsBasic(learn_from, sp_cost, 0, 1, false);
	},
	//基本的なタイプのスキル 習得開始LV，消費SP，次スキルLVに上げるのに必要なプレイヤーLV，最大スキルLV
	//最大スキルLVを-1指定or指定しないすることでMAX_PLV_で取得できるLVまで上げられる．
	//最大スキルLVが現状のLVキャップで取得できない場合は切り詰める．
	//習得可能プレイヤーLVでスキルLVを2にあげられる場合は最後にtrueを指定．
	//また，その場合は自動的にfirst_sp_costを0にしている．
	setAsBasic : function(learn_from, sp_cost, lv_cost, max_slv, can_learn_and_raise){
		this.learn_from   = learn_from;
		this.lv_cost      = lv_cost;
		this.sp_cost      = sp_cost;
		this.can_learn_and_raise = can_learn_and_raise;
this.max_slv_tmp = max_slv;//コード変換のための作業用
		if(max_slv==undefined || max_slv==-1 || learn_from+(max_slv-1)*lv_cost > MAX_PLV_+CONTRACT_EXPERT_DLV){
			this.max_slv = Math.floor((MAX_PLV_+CONTRACT_EXPERT_DLV-learn_from)/lv_cost) + 1;
			if(this.can_learn_and_raise){
				this.max_slv += 1;
			}
		}else{
			this.max_slv = max_slv;
		}
		if(this.max_slv>50)this.max_slv = 50;//LV50を最大値とする．
		
		this.first_sp_cost = can_learn_and_raise?0:sp_cost;
		this.second_sp_cost = sp_cost;
		
		if(this.name==undefined||this.name==""){
			if(this.id.substring(0,2)=="c_"){
				if(id_name_table_[this.id.substring(2)]!=undefined){
					this.name = TT["_pre_cancel"] + id_name_table_[this.id.substring(2)];
				}else{
					this.name = TT["_unnamed_cancel_skill"];
				}
			}
			if(this.id.substring(0,3)=="ex_"){
				if(id_name_table_[this.id.substring(3)]!=undefined){//基本スキルが有るなら
					this.name = id_name_table_[this.id.substring(3)] + TT["_post_ex"];
				}else{
					this.name = TT["_unnamed_ex"];
				}
			}
			if(this.name==undefined||this.name==""){
				this.name = TT["_unnamed"];
			}
			this.registToIdNameTable();
		}
		return this;
	},
	//初回消費SPのみ変更する
	setFirstCost : function(fcost, scost){
		this.first_sp_cost = fcost;
		if(scost!=undefined){
			this.second_sp_cost = scost;
		}
		return this;
	},
	//覚醒パッシブテンプレ
	setAsAp : function(){
		//本当はLv50習得，Lv51でLv2，Lv54でLv3…
		return this.setAsBasic(48, 45, 3).setFirstCost(0);
	},
	//覚醒アクティブテンプレ
	setAsAa : function(){
		return this.setAsBasic(50, 200, 5);
	},
	//60Exアクティブテンプレ
	setAsEx60 : function(){
		return this.setAsBasic(60, 60, 2);
	},
	//70Exアクティブテンプレ
	setAsEx70 : function(max_slv){
		return this.setAsBasic(70, 70, 2, max_slv);
	},
	//スキルLV，習得可能プレイヤーLV，消費SPの配列を指定する
	setAsRandom : function(ss){
		this.options = "";
		var i = 0;
		if(ss[0]==0){//スキルLV0設定がある場合
			this.options += this.option_zero;
			i += 3;
		}
		for(;i<ss.length;i+=3){
			this.options += this.option_template.evaluate(
				{slv : ss[i], llv : ss[i+1], sum : ss[i+2]});
		}
		this.max_slv = ss[i-3];
		//2次元配列だとうまくいかんなぁ
		//ss.each(function(s){
		//	this.options += this.option_template.evaluate(
		//		{slv : s[0], llv : s[1], sum : s[2]});
		//});
		return this;
	},
	//Exスキルとして設定する．
	//デフォルトでパッシブに設定する
	//引数を指定しない場合のデフォルトはLv50 1TP 5LvごとLv3まで
	//ただし，TPが5の場合は最大Lv1
	//setAsEx(learn_from=50, tp_cost=1, lv_cost=5, max_slv=5, can_learn_and_raise=false)
	setAsEx : function(learn_from, tp_cost, lv_cost, max_slv, can_learn_and_raise){
		this.type = "ex_skill";
		this.activity = "p";
		if(learn_from==undefined){
			learn_from = 50;
		}
		if(is_debug_mode_){
			if(learn_from%5!=0){
				displayDebug("invalid "+ this.name + ".learn_from(5n)=" + learn_from);
			}
		}
		if(tp_cost==undefined){
			tp_cost = 1;
		}
		if(lv_cost==undefined||lv_cost==-1){
			lv_cost = 5;
		}
		if(max_slv==-1 || max_slv==undefined){
			if(tp_cost==4){
				max_slv = 1;
			}else if(tp_cost==5){
				max_slv = 1; //TP5ならデフォルトMAX1
			}else{
				max_slv = 5; //TP1-3ならデフォルト5
			}
		}
		return this.setAsBasic(learn_from, tp_cost, lv_cost, max_slv, can_learn_and_raise);
	},
	//アクティブかパッシブか
	//"a" or "p"
	//革新でTP使用のExスキルは全部パッシブ化
	setActivity : function(flag){
		this.activity = flag;
		return this;
	},
	getActivity : function(){
		return this.activity;
	},
	isExSkill : function(){
		return this.type == "ex_skill";
	},
	//QPスキル
	setAsQp : function(learn_from, qp_cost, lv_cost, max_slv){
		this.type = "qp_skill";
		if(learn_from==undefined){
			learn_from = 20;
		}
		if(qp_cost==undefined){
			qp_cost = 20;
		}
		if(lv_cost==undefined){
			lv_cost = 2;
		}
		return this.setAsBasic(learn_from, qp_cost, lv_cost, max_slv, false);
	},
	isQpSkill : function(){
		return this.type=="qp_skill";
	},
	//前提条件を追加する
	//addPre(id, num=1) IDと前提Lvを指定
	//addPre(num)
	//  キャンセルスキルとEXスキルはならその前提スキルをIDとし，
	//  それ以外のスキルで引数を数字ひとつだけ指定した場合は，直前に生成したスキルを前提とする．
	addPre : function(id_or_slv, slv){//(id) or (id, num) or (num)
		if(typeof id_or_slv == "number"){
			if(slv==undefined){
				if(this.id.substring(0,2)=="c_" && id_name_table_[this.id.substring(2)]!=undefined){//キャンセルスキルなら
					this.pre[this.id.substring(2)] = id_or_slv;
					return this;
				}
				if(this.id.substring(0,3)=="ex_" && id_name_table_[this.id.substring(3)]!=undefined){//Exスキルなら
					this.pre[this.id.substring(3)] = id_or_slv;
					return this;
				}
			}
			//一つ前のスキルを前提とする
			this.pre[prev_id_] = id_or_slv;
			return this;
		}
		//else if(typeof id_or_slv=="string"){
		if(slv==undefined)slv=1;//デフォルトは前提1
		this.pre[id_or_slv] = slv;
		return this;
	},
	makeOptionsHTML : function(){
		if(this.options != "")return;
		if(this.first_sp_cost != 0)
			this.options = this.option_zero;
		var base = this.learn_from;
		//LV1と2は特別扱い．鬼いやらしいです(　＾ω＾)
		//LV1
		this.options += this.option_template.evaluate(
			{slv : 1,
			 llv : base,
			 sum : this.first_sp_cost});
		if(this.can_learn_and_raise){
			base -= this.lv_cost;
		}
		//LV2～
		for(var i=1;i<this.max_slv;i++){
			this.options += this.option_template.evaluate(
				{slv : (i+1),
				 llv : base                                     +     i*this.lv_cost,
				 sum : this.first_sp_cost + this.second_sp_cost + (i-1)*this.sp_cost});
		}
	}
};

//前提条件を生成する
function buildRequirements(){
	var ss = new Array();
	function obj2array(oo){
		for(var i=0;i<oo.length;i++){
			for(var key in oo[i].pre){
				ss.push(key, oo[i].id, oo[i].pre[key]);
			}
		}
	}
	obj2array(common_skills_);
	obj2array(first_job_skills_);
	obj2array(second_job_skills_);
	skill_requirements_ = ss;
}


//レコード単位で前提関係の強調，ラベル/selectで不正取得の強調をする．
var record_template_ = new Template(
'<tr id="record_#{id}" class="#{type}">'+
	//background-imageを使うタイプ
	//'<td id="icon_#{id}" class="skill_icon" style="background-image:url(icons/{tier}/#{id}.png);"><img src="t_dot.png" class=spacing_icon width={icon_width}>'+
	//imgで直接貼り付け，tdのpaddingを0に
	'<td id="icon_#{id}" class="skill_icon" style="padding:0px 0px 0px 0px"><img src="icons/{tier}/#{id}.png" class=spacing_icon width={icon_width}>'+
	
	'<td id="label_#{id}" class="skill_label nowrap_label" onmouseover="emphasizeRequirements(event, \'#{id}\');" onmouseout="hideHint()"><div class="skill_label_div">#{name}<span id="reqspan_#{id}" class="reqspan"></span></div></td>'+
'<td id="masterbox_#{id}" class="num" onmouseover="emphasizeRequirements(event, \'#{id}\');" onmouseout="hideHint()"><input type="checkbox" name="automaster" id="am_#{id}" onclick="am(this,\'#{id}\');" onmouseover="onHint(event, \'am\');" onmouseout="hideHint();"></td>'+
//'<td><input type="edit" name="ammax" size=2></td>'+
'<td class="td_sel_skills" onmouseover="emphasizeRequirements(event, \'#{id}\');" onmouseout="hideHint()"><select name="skills" type="#{type}" id="#{id}" onchange="checkRequirements(\'#{id}\',true);updateUsedPointSum(this.form);" onmouseover="onHint(event, \'skill_select\')" onmouseout="hideHint()">'+
'#{options}'+
'</select></td></tr>');

function getRecordOf(id){
	return $("record_" + id);
}
function getLabelOf(id){
	return $("label_" + id);
}
function getMasterBoxOf(id){
	return $("masterbox_" + id)
}

function printSkills(target, skills){
	var ih = "<table class=" + target + ">";
	var tt = ["general", jobcode_.substr(0,1)+"_"+jobcode_.substr(2,1), jobcode_.substr(0,3)];
	var icon_size = getIconSize();
	var replace_from = /{icon_width}/;
	var replace_to   = icon_size;
	if(icon_size<=0){//アイコン非表示
		replace_from = /img src=/;//srcを無効にしてロードさせない
		replace_to   = "img dummy_attr=";
	}
	skills.each(function(si){
		si.makeOptionsHTML();
		ih += record_template_.evaluate(si).replace(/{tier}/, tt[si.tier]).replace(replace_from, replace_to);
	});
	ih += "</table>";
	$(target).innerHTML = ih;
}
function getCurrentSkillAttribute(id, attr){
	var sel = $(id);
	return parseInt(sel.options[sel.selectedIndex].getAttribute(attr));
}
	
function getCurrentSkillLearnLevel(id){
	return getCurrentSkillAttribute(id, "llv");
}

function getCurrentSkillLevel(id){
	return getCurrentSkillAttribute(id, "slv");
}

function isMasterdSkill(id){
	if(getCurrentSkillLearnLevel(id)==0)return false;//スキル取ってない
	var plv = getPlayerLvContracted();
	if(getCurrentSkillLearnLevel(id)>plv)return false;//契約適応Lv以上なら取り過ぎ
	var sel = $(id);
	if(!sel.options[sel.selectedIndex+1])return true;//+1のスキルが存在しないならOK
	if(parseInt(sel.options[sel.selectedIndex+1].getAttribute("llv"))<=plv)return false;//+1のスキルを取得可能ならMasterではない．
	return true;
}

function setSkillLevel(id, slv){
	//console.log("setSkillLeve(id=%s, slv=%d)", id, slv);
	//スキルLV自体は0か1からしか始まらない
	return setSkillLevelOf($(id), slv);
}
function setSkillLevelAt(idx, slv){
	return setSkillLevelOf($("mainform").skills[idx], slv);
}
function setSkillLevelOf(sel, slv){
	var first_slv = parseInt(sel.options[0].getAttribute("slv"));
	if(sel.selectedIndex == slv-first_slv){
		return false;//変化無し
	}
	//グラで転職時取得のスプクラがLV2以降取得にスプ5を要求するようになった
	//そのため前提切りのためにslv=0を入れようとするとselectedIndexが-1になる
	var ni = slv-first_slv;
	if(ni<0)ni=0;//LV1になるためスプ4以下に下げられなくなるな…
	if(ni>=sel.length)ni=sel.length-1;//最大値以上に設定出来ないようにする
	//設定可能な最大値に切り詰める
	var plv = getPlayerLvContracted();//契約込の現在Lv
	for(var i=ni;i>0;i--){
		if(sel.options[i].getAttribute("llv")<=plv)break;
		ni--;
	}
	sel.selectedIndex = ni;
	return true;//変更
}

var targeted_skill_id_ = null;
var emphasized_skills_ = new Array();//idの配列
var prev_req_hint_ = "";
var req_hint_ = "";
function emphasizeRequirements(e, id){
	if(targeted_skill_id_==id){
		if(show_hint_){
			req_hint_ = prev_req_hint_;
			onHint(e, "emp_skill");
		}
		return;
	}
	if(targeted_skill_id_!=null){
		emphasized_skills_.each(function(i){
			var tr = getRecordOf(i);
			//if(i.substr(0, 3)=="ex_"){
			//	tr.className = "ex_skill";
			//}else{
			//	tr.className = "";
			//}
			tr.className = id_obj_table_[i].type;
			$("reqspan_" + i).hide();
		});
		emphasized_skills_.clear();
		targeted_skill_id_ = null;
	}
	var ss = skill_requirements_;
	var pre_hint = "";
	var concl_hint = "";
	for(var i=0;i<ss.length;i+=3){
		if(ss[i] == id){//前提
			//var tr = $(ss[i+1]).parentNode.parentNode; // <select>→<td>→<tr>
			var tr = getRecordOf(ss[i+1]);
			tr.className = "concl_skill";
			emphasized_skills_.push(ss[i+1]);
			//ややこしいので前提だけ表示
			//concl_hint += "<tr><td class=num>" + ss[i+2] + "<td class=concl_skill>" + id_name_table_[ss[i+1]];
			$("reqspan_" + ss[i+1]).textContent = ss[i+2];
			$("reqspan_" + ss[i+1]).innerText   = ss[i+2];
			$("reqspan_" + ss[i+1]).show();
		}else if(ss[i+1] == id){//前提が必要なスキル
			//var tr = $(ss[i]).parentNode.parentNode; // <select>→<td>→<tr>
			var tr = getRecordOf(ss[i]);
			tr.className = "prereq_skill";
			emphasized_skills_.push(ss[i]);
			pre_hint += "<tr><td class=prereq_skill>" + id_name_table_[ss[i]] + "<td class=num>" + ss[i+2]
			$("reqspan_" + ss[i]).textContent = ss[i+2];
			$("reqspan_" + ss[i]).innerText   = ss[i+2];
			$("reqspan_" + ss[i]).show();
		}
	}
	if(emphasized_skills_.length!=0){
		var tr = getRecordOf(id);
		tr.className = "target_skill";
		emphasized_skills_.push(id);
		targeted_skill_id_ = id;
	}
	req_hint_ = "";
	if(pre_hint!=""){
		req_hint_ += "<table class=prereq_hint_table><tr><th>前提スキル<th>必要LV" + pre_hint + "</table>";
	}
	//ややこしいから前提だけ表示することにする
	//if(concl_hint!=""){
	//	req_hint_ += "<table class=concl_hint_table><th>必要LV<th>上位スキル" + concl_hint + "</table>";
	//}
	prev_req_hint_ = req_hint_;
	onHint(e, "emp_skill");
}

//問題なければtrueを返す．
function checkSkillLearnLevel(id){
	getLabelOf(id).removeClassName("skill_overlevel");
	$(id).removeClassName("skill_overlevel");
	getLabelOf(id).removeClassName("skill_contracted");
	$(id).removeClassName("skill_contracted");
	//getLabelOf(id).removeClassName("skill_mastered");
	//$(id).removeClassName("skill_mastered");
	getMasterBoxOf(id).removeClassName("skill_mastered");
	
	//M振りかチェック
	if(isMasterdSkill(id)){
		//getLabelOf(id).addClassName("skill_mastered");//ちょっと見た目がウルサイなぁ
		//$(id).addClassName("skill_mastered");
		getMasterBoxOf(id).addClassName("skill_mastered");
	}

	var cur = getCurrentSkillLearnLevel(id);
	if(cur<=getPlayerLv())return true;

	//達人の契約範囲
	if(cur<=getPlayerLvContracted()){
		getLabelOf(id).addClassName("skill_contracted");//レコード単位だけだとselectの文字色が変わらない
		$(id).addClassName("skill_contracted");
		return true;//問題は，無い
	}
	
	//プレイヤーLVが足りない
	getLabelOf(id).addClassName("skill_overlevel");
	$(id).addClassName("skill_overlevel");
	return false;
}
function checkRequirements(id, is_first){
	var slv = getCurrentSkillLevel(id);
	checkSkillLearnLevel(id);
	//console.log("checkRequirements(id=%s) slv=%d", id, slv);
	var ss = skill_requirements_;
	for(var i=0;i<ss.length;i+=3){
		if(ss[i] == id){//前提
			if(getCurrentSkillLevel(ss[i+1])!=0){//前提を必要としているスキルを習得しているが
				if(slv<ss[i+2]){//必要条件に足りなくなったら
					if(setSkillLevel(ss[i+1], 0)){//習得をやめる
						checkRequirements(ss[i+1]);//変化があれば再帰．ループってこわくね？
					}
				}
			}
		}else if(slv!=0 && (ss[i+1] == id)){//前提が必要なスキル
			if(getCurrentSkillLevel(ss[i])<ss[i+2]){//前提が足りてなかったら
				if(setSkillLevel(ss[i], ss[i+2])){//取得する
					checkRequirements(ss[i]);
				}
			}
		}
	}
	if(is_first){
		if(slv!=getCurrentSkillLevel(id)){
			setSkillLevel(id, slv)
		}
	}
}

function calcRestPoints(){
	//SP
	var rest = getSpSum()-getUsedSp();
	if(rest<0){
		Element.addClassName("rest_sp", "sp_minus");
	}else{
		//f.re.removeClassName("sp_minus");//なぜかbokunenjin鯖だけでエラーが出る？
		Element.removeClassName("rest_sp", "sp_minus");//こっちの書き方なら問題ないっぽい
		//$("rest_sp").removeClassName("sp_minus");//これでもOK
	}
	$("rest_sp").setValue(rest);
	$("level_sp").setValue(getSpByLV());
	
	//TP
	rest = getTpSum()-getUsedTp();
	if(rest<0){
		Element.addClassName("rest_tp", "sp_minus");
	}else{
		Element.removeClassName("rest_tp", "sp_minus");
	}
	$("rest_tp").setValue(rest);
	$("level_tp").setValue(getTpByLV());
	
	//QP
	rest = getQpSum()-getUsedQp();
	if(rest<0){
		Element.addClassName("rest_qp", "sp_minus");
	}else{
		Element.removeClassName("rest_qp", "sp_minus");
	}
	$("rest_qp").setValue(rest);
	$("level_qp").setValue(getQpByLV());
	
	
	updateHashCode();
}

function getPlayerLv(){
	return parseInt($F("plv"));
}
function getPlayerLvContracted(){
	return getPlayerLv()+(is_contract_?CONTRACT_EXPERT_DLV:0);
}
function getSpSum(){
	return parseInt(getSpByLV()) + parseInt(getInputSp());
}
function getSpByLV(){
	var plv = getPlayerLv()
	if(plv>MAX_PLV_){
		plv = MAX_PLV_;
	}
	return is_fairpvp_?sptable_[plv]-375:sptable_[plv];//公正決闘はSPが少ない
}
function getInputSp(){
	return $F("dsp");
}
function getUsedSp(){
	return $F("used_sp");
}
function getRestSp(){
	return $F("rest_sp");
}
//tp
function getTpSum(){
	return parseInt(getTpByLV());
}
function getTpByLV(){
	var plv = getPlayerLv()
	if(plv>MAX_PLV_){
		plv = MAX_PLV_;
	}
	var tp = plv-49;
	if(tp<0)tp=0;
	return tp;
}
function getInputTp(){
	return $F("dtp");
}
function getUsedTp(){
	return $F("used_tp");
}
function getRestTp(){
	return $F("rest_tp");
}
//QP
function getQpSum(){
	return parseInt(getQpByLV());
}
function getQpByLV(){
	var plv = getPlayerLv()
	if(plv>MAX_PLV_){
		plv = MAX_PLV_;
	}
	return 3688;
}
function getUsedQp(){
	return $F("used_qp");
}
function getRestQp(){
	return $F("rest_qp");
}

function clearCookie(){
	if(!confirm(TT._clear_cookie_msg))return;
	var expires = "=hoge;expires=Fri, 31-Dec-1999 23:59:59 GMT;";
	document.cookie = jobcode_ + "data" + expires;
	alert("Cookie cleared!");
}

function save(){
	var cdata = "";

	var mf = document.getElementById("mainform");

	var slot = parseInt(mf.slotnumber.value);
	var memo = prompt(new Template(TT._save_slot_msg).evaluate({slot_no:slot}), mf.slotnumber.options[slot].text.substr(3));
	if(memo == null)return;
	if(memo.length>30){
		memo = memo.substring(0, 30);
	}
	//update slot options memo
	var opt = mf.slotnumber.options[slot];
	opt.text = slot + ") " + memo;

	cdata += escape(memo) + ",";
	cdata += getSkillCode(0);//non-lazy encode

	//いったんロードして他のデータを拾う
	var olddata = loadDataFromCookie();
	var newdata = jobcode_ + "data=";
	var slots = olddata.split(",");
	for(var i=0;i<10;i++){//スロット数は10
		if(i==slot){
			newdata += cdata + ",";
		}else{
			if(slots[i*2] != undefined && slots[i*2+1]!=undefined){
				newdata += slots[i*2] + "," + slots[i*2+1] + ",";
			}else{
				newdata += ",,";
			}
		}
	}
	
	var exp = new Date();
	exp.setTime(exp.getTime()+30*24*60*60*1000);//30日保存
	var exp_str = "; expires=" + exp.toGMTString();
	newdata += exp_str;
	
	document.cookie = newdata;
	
}
function load(){
	var mf = document.getElementById("mainform");
	var slot = mf.slotnumber.value;
	if(!confirm(new Template(TT._load_slot_msg).evaluate({slot_no:slot})))return;
	clearForm();
	loadSlots(slot, false);
}

function loadDataFromCookie(){
	//hoge=moke; b=c; d=g
	var cc = document.cookie;
	//データ部分の切り出し
	var ll = cc.split(";");
	var data = "";
	var varname = jobcode_ + "data=";
	for(var i=0;i<ll.length;i++){
		if(ll[i].strip().indexOf(varname)==0){
			data = ll[i].strip().substring(varname.length);
			break;
		}
	}
	return data;
}
function loadSlots(slot, load_all){
	var mf = document.getElementById("mainform");
	mf.slotnumber.selectedIndex = slot;
	var data = loadDataFromCookie();
	if(data==""){
		//no saved data
		return;
	}
	var slots = data.split(",");
	for(var i=0;i<10;i++){
		if(!load_all && i!=slot)continue;//単品読み込みなら指定スロット以外は飛ばす
		if(load_all){
			if(i*2<slots.length){
				memo = unescape(slots[i*2]);
			}else{
				memo = "";
			}
			if(memo==""){
				memo = "untitled";
			}
			mf.slotnumber.options[i].text =  i + ") " + memo;
		}
		if(i!=slot)continue;//指定スロット以外はメモ以外を読む必要は無い
		if(i*2+1<slots.length){
			decodeAndApply(slots[i*2+1]);
		}
		if(!load_all)break;//スロット単品読み込みなら終了
	}
}

function onSlotChange(sel){
	
}

function updateUsedPointSum(){
	var ss = document.getElementsByName("skills");
	var sp = 0;
	var qp = 0;
	var tp = 0;
	for(var i=0;i<ss.length;i++){
		var type = ss[i].getAttribute("type");
		var v    = parseInt(ss[i].value);
		if(type=="ex_skill"){
			tp += v;
		}else if(type=="qp_skill"){
			qp += v;
		}else{
			sp += v;
		}
	}
	$("used_sp").setValue(sp);
	$("used_tp").setValue(tp);
	$("used_qp").setValue(qp);
	calcRestPoints();
}
function addLevel(dlv){
	var mf = $("mainform");
	var lv = getPlayerLv() + dlv;
	if(lv<1)lv=1;
	else if(lv>MAX_PLV_)lv=MAX_PLV_;
	$("plv").value = lv;
	if(checkSkillLevels()){
		updateUsedPointSum();
	}else{
		calcRestPoints();
	}
	
}
var is_contract_ = false;
function setContractExpert(b){
	$("contract_chk").checked = b;
	is_contract_ = b;
}
function toggleContractExpert(){
	is_contract_ = !is_contract_;
	addLevel(0);//再計算手抜き
}

function isAutoMaster(id){
	var chk = $("am_" + id);
	return chk.checked;
}

//plvの変化によるスキルレベルの変化をチェック
//Automasterなら上下，そうで無いならば下降のみする．
function checkSkillLevels(){
	var mf = $("mainform");
	var plv = getPlayerLvContracted();//player lv
	var changed = false;
	for(var i=0;i<mf.automaster.length;i++){//全てのスキルに対して
		if(mf.automaster[i].checked){
			if(applyAutomaster(plv, mf.skills[i]))changed = true;
		}else{
			if(cutOverskill(plv, mf.skills[i]))changed = true;
		}
		checkSkillLearnLevel(mf.skills[i].id);
	}
	return changed;
}

//要求pLV以下のスキルを足切りする
function cutOverskill(plv, skill_select){
	var opts = skill_select.options;//対応スキルのオプションリスト
	var cand = skill_select.selectedIndex;
	var i;
	for(i=1;i<=skill_select.selectedIndex;i++){
		var llv = opts[i].getAttribute("llv");
		//console.log("i=" + i + ", llv=" + llv + ", plv=" + plv);
		if(llv>plv){
			break;
		}
	}
	if(i==skill_select.selectedIndex+1)return false;
	skill_select.selectedIndex = i-1;
	return true;
}

function applyAutomaster(plv, skill_select){
	var opts = skill_select.options;//対応スキルのオプションリスト
	for(var j=opts.length-1;j>=0;j--){
		var llv = opts[j].getAttribute("llv");//習得可能LVを拾う
		if(llv <= plv){
			if(skill_select.selectedIndex == j){//変化なし
				return false;
			}
			var prev = skill_select.selectedIndex;
			skill_select.selectedIndex = j;//選択
			if(prev<j){//スキルレベルが上昇するなら
				checkRequirements(skill_select.getAttribute("id"), true);//前提条件をチェック
			}
			return true;//スキルレベル変化
		}
	}
	//習得LVが2以上で自動習得スキル対策
	if(skill_select.selectedIndex == 0)return false;
	skill_select.selectedIndex = 0;
	return true;
}
function am(cb, sel_id){//automaster
	if(!cb.checked){
		updateHashCode();
		return false;
	}
	var select = $(sel_id);
	if(!applyAutomaster(getPlayerLvContracted(), select)){
		updateHashCode();
		return false;
	}
	update_hash_ = false;//スキルの変更がなくてもハッシュは更新
	select.onchange();
	update_hash_ = true;
	updateHashCode();
	return true;
}

function clearForm(need_confirm){
	if(need_confirm && !confirm(TT._clear_form_msg))return;
	var def_lv = MAX_PLV_;
	$("plv").value = def_lv;
	$("dsp").value = 0;
	//setContractExpert(false); //必要ないかな
	var mf = $("mainform");
	for(var i=0;i<mf.automaster.length;i++){
		mf.automaster[i].checked = false;
	}
	for(var i=0;i<mf.skills.length;i++){
		mf.skills[i].selectedIndex = 0;
	}
	updateUsedPointSum();
	
	checkSkillLevels();//スキル取得条件系の表示をリセット．
}

//位置の調整
//01/10 M : hoge
//05/04 . . : moke
//　　　　M : nyo
// . 1/. 5 . . : moke
//　 　　　1 : hoge
var use_fixed_font_ = false;
var use_template_ = true;
var merge_cancel_ = true;//切り替え出来るようにするべきかな?
var merge_ex_ = true;
function doDump(){
	$("output_area").show();
	var text = "";
	//LV SP
	text += "LV" + getPlayerLv()
	if(is_contract_){
		text += "("+TT._contracted+")";
	}
	text += ", ";
	text += TT._rested_sp+":" + getRestSp() + "=" 
	     + getSpSum() + "-" + getUsedSp() + ", ";
	text += TT._rested_tp+":" + getRestTp() + "=" 
	     + getTpSum() + "-" + getUsedTp() + "\n";
	
	//URL
	text += getRootUrl().substring(1);// ttp://に
	//var i = location.href.search(/\?/);
	//if(i==-1){
	//	text += location.href.substring(1);//ttp://に
	//}else{
	//	text += location.href.substring(1, i-1);//codeをはずす
	//}
	text += "#" + jobcode_ + getSkillCode(use_shortcode_) + "\n";
	var cr_len = 50;
	if(use_fixed_font_)cr_len = 30;
	if(!use_template_){
		text += "--------[一般スキル]--------\n";
		text += getSkillDumpHTML(common_skills_, true, true, cr_len);
		text += "--------[一次職スキル]--------\n";
		text += getSkillDumpHTML(first_job_skills_, true, true, cr_len);
		text += "--------[二次職スキル/アルベルトスキル]--------\n";
		text += getSkillDumpHTML(second_job_skills_, true, true, cr_len);
	}else{
		var tmp = "";
		if(("skill_template_" in window) && skill_template_!=""){
			tmp = skill_template_;
		}else if("id_skill_template_" in window){
			var n_cols = 2;
			if("n_skill_template_cols_" in window){
				n_cols = n_skill_template_cols_;
			}
			//使用SPが0ならカラのテンプレを出力
			if(use_fixed_font_){
				tmp = createSkillTemplateFixed(id_skill_template_, ids2names(id_skill_template_, merge_cancel_, merge_ex_), n_cols, 50, getUsedSp()!=0, merge_cancel_);
			}else{
				tmp = createSkillTemplate(id_skill_template_, ids2names(id_skill_template_, merge_cancel_, merge_ex_), n_cols, 50, getUsedSp()!=0, merge_cancel_);
			}
		}
		if(tmp==""){
			text += "テンプレ未対応";
		}else{
			tmp = getSkillDumpHTMLusingTemplate(tmp,     common_skills_, use_fixed_font_, merge_cancel_);
			tmp = getSkillDumpHTMLusingTemplate(tmp,  first_job_skills_, use_fixed_font_, merge_cancel_);
			tmp = getSkillDumpHTMLusingTemplate(tmp, second_job_skills_, use_fixed_font_, merge_cancel_);
			text += tmp;
		}
	}
	$("dumped_text").value = text;
	
	$("chk_fixedfont").checked = use_fixed_font_;
	$("chk_template").checked  = use_template_;
}

function selectOutputArea(){
	$("dumped_text").select();
}
function hideOutputArea(){
	var dest = $("output_area");
	dest.hide();
}
//マスター済みのスキル，1しか取らないスキルをまとめるほうがいいかもしれない
//まったく覚えてないスキルでもM予定なら描画
function getSkillDumpHTML(skills, unite_mastered, unite_oneonly, cr_len){
	var text = "";
	var mastered = new Array();
	var oneonly  = new Array();
	skills.each(function(s){
		var slv = getCurrentSkillLevel(s.id);
		var am  = isAutoMaster(s.id);
		if(slv==0 && !am)return;//描画の必要なし
		
		if(slv==s.max_slv){
			if(unite_mastered){
				mastered.push(s);
			}else{
				if(use_fixed_font_){
					text += "      M : ";
				}else{
					text += "　　　　M : ";
				}
				text += s.name + "\n";
			}
		}else{
			if(unite_oneonly && slv==1 && !am){
				oneonly.push(s);
			}else{
				if(use_fixed_font_){
					text += "  ";//right align
				}else{
					text += "..";
				}
				if(slv<10){
					if(use_fixed_font_){
						text += " ";
					}else{
						text += ". ";
					}
				}
				if(!use_fixed_font_)text += "　";
				text += slv + "/";
				if(s.max_slv<10){
					if(use_fixed_font_){
						text += " ";
					}else{
						text += ". ";
					}
				}
				text += s.max_slv;
				if(am){
					text += " M : ";
				}else{
					text += " : ";
				}
				text += s.name + "\n";
			}
		}
	});
	if(unite_oneonly && oneonly.length !=0){
		var mt = "";
		if(use_fixed_font_){
			mt = "      1 : ";
		}else{
			mt = "　 　　　1 : ";
		}
		var len = 6;
		oneonly.each(function(s){
			if(len<cr_len){
				mt += s.name + ", ";
				len+= s.name.length + 1;
			}else{
				if(use_fixed_font_){
					mt += "\n      1 : ";
				}else{
					mt += "\n　 　　　1 : ";
				}
				mt += s.name + ", ";
				len = 6 + s.name.length + 1;
			}
		});
		mt = mt.slice(0, -2); // ", "を消す
		mt += "\n";
		text = mt + text;
	}
	if(unite_mastered && mastered.length!=0){
		var mt = "";
		if(use_fixed_font_){
			mt = "      M : ";
		}else{
			mt = "　　　　M : ";
		}
		var len = 6;//半角全角のサイズの差は面倒なので全角単位で
		mastered.each(function(s){
			if(len<cr_len){
				mt += s.name + ", ";
				len+= s.name.length + 1;
			}else{
				if(use_fixed_font_){
					mt += "\n      M : ";
				}else{
					mt += "\n　　　　M : ";
				}
				mt += s.name + ", ";
				len = 6 + s.name.length + 1;
			}
		});
		mt = mt.slice(0, -2); // ", "を消す
		mt += "\n";
		text = mt + text;
	}
	return text;
}

function setDumpTextFont(){
	$("dumped_text").className = use_fixed_font_?"fixed_font":"aa";;
}

function toggleFixedFont(){
	use_fixed_font_ = !use_fixed_font_;
	$("chk_fixedfont").checked = use_fixed_font_;
	setDumpTextFont();
	doDump();
}
function toggleUseTemplate(){
	use_template_ = !use_template_;
	$("chk_template").checked = use_template_;
	setDumpTextFont();
	doDump();
}

//テンプレの置換を行う
// temp : テンプレ
// skill : 置換対象スキル名
// text  : 置換後テキスト
// closr : スキルLVをはさむ後続括弧．】とか
// need_adj : trueなら後続の　　を 　 に置換することで1dotずらす
// returns : 置換後のテンプレ
function replaceSkillTemplate(temp, skill, text, need_adj){
	if(need_adj && temp.search("{" + skill + "}" + "　　")!=-1){
		//調整が必要で閉じ括弧のあとに全角スペースが二つ続いた場合
		return temp.replace("{" + skill + "}　　", text + " 　 ");//-1dot
	}
	return temp.replace("{" + skill + "}", text);
}

//テンプレを利用してスキルダンプする
//tmp : テンプレート．"{id}"がスキルLVに置換される．
//skills : スキルの配列．
//is_ff : 固定長フォントを使用するか否か．
//merge_cancel : キャンセルスキルをマージして表示するか否か．
//returns : 置換されたテンプレート．
function getSkillDumpHTMLusingTemplate(tmp, skills, is_ff, merge_cancel, merge_ex){
	var replace_texts_fixed_w_merge = {//固定長キャンセルマージ
		empty     : "[   ", //【   】
		mc        : "[ Mc", //【 Mc】
		m         : "[ M ", //【 M 】
		pre_gett  : "[",    //【10 】
		pre_ltt   : "[ ",   //【 9 】
		post_w_c  :    "c", //【 9c】
		post_wo_c :    " "  //【10 】
	};
	var ex_replace_text_fixed ={
		empty     :     "]  ",
		zero      :     "/ ]",
		m         :     "/M]",
		pre_ltt   :     "/",
		post_ltt  :       "]"
	};
	var ex_fixed = {
		empty     : "    [ ]",
		m         : "    [M]",
		pre       : "    [",
		post      :       "]"
	};

	var replace_texts_fixed_wo_merge = {//固定長キャンセルマージ無し
		empty     : "[  ", //【  】
		mc        : "[ M", //【 M】
		m         : "[ M", //【 M】
		pre_gett  : "[",   //【10】
		pre_ltt   : "[ ",  //【 9】
		post_w_c  : "",   //必要なし
		post_wo_c : ""    //必要なし
	};
	var replace_texts_prop_w_merge = {//プロポーショナルキャンセルマージ
		empty     : "[. 　　",//【. 　　】
		mc        : "[ Mc ",  //【 Mc 】
		m         : "[ M . ", //【 M . 】
		pre_gett  : "[.",     //【.10　】
		pre_ltt   : "[　",    //【　9c.】
		post_w_c  :    "c.",  //【.10c.】
		post_wo_c :    "　"   //【.10　】
	};
	var ex_replace_text_prop ={
		empty     :     "].　 　",
		zero      :     "/　　]",
		m         :     "/ M ]",
		pre_ltt   :     "/　",
		post_ltt  :          ".]"
	};
	var ex_prop = {
		empty     : "　　　 [　　]",
		m         : "　　　 [ M ]",
		pre       : "　　　 [　",
		post      :            ".]"
	};
	var replace_texts_prop_wo_merge = {//プロポーショナルキャンセルマージ無し
		//【Ｍ】以外で左列の場合はスペースの「　　」を調整して1dot減らす．
		empty     : "[ 　", //【 　】
		mc        : "[Ｍ",  //【Ｍ】
		m         : "[Ｍ",  //【Ｍ】
		pre_gett  : "[",    //【10】
		pre_ltt   : "[ ",  //【 9.】
		post_w_c  : ".",    // 
		post_wo_c : "."     // 
	};
	
	
	var replace_text = null;
	if(is_ff){
		replace_text = merge_cancel?replace_texts_fixed_w_merge:replace_texts_fixed_wo_merge;
	}else{
		replace_text = merge_cancel?replace_texts_prop_w_merge :replace_texts_prop_wo_merge;
	}
	var ex_replace_text = is_ff?ex_fixed:ex_prop;

	skills.each(function(s){
		var slv = getCurrentSkillLevel(s.id);
		var am  = isAutoMaster(s.id);
		var has_cancel = (getAbbrevName("c_"  + s.id)!=null)&&getCurrentSkillLevel("c_"  + s.id);
		var text = "";
		var need_adj = false;
		if(merge_ex_ && s.isExSkill()){//ExマージでExスキル単体のとき
			if(slv==0 && !am){
				text = ex_replace_text["empty"];
			}else if(am || slv==s.max_slv){
				text = ex_replace_text["m"];
			}else{
				text = ex_replace_text["pre"] + slv + ex_replace_text["post"];
			}
		}else{
			if(slv==0 && !am){//0でAutoMasterでない
				//tmp = replaceSkillTemplate(tmp, s.id, replace_text["empty"], closer, !is_ff&&!merge_cancel);//空白
				text = replace_text["empty"];
				need_adj = !is_ff&&!merge_cancel_;
			}else if(am || slv==s.max_slv){//M表示
				if(has_cancel){
					//tmp = replaceSkillTemplate(tmp, s.id, replace_text["mc"], closer, false);
					text = replace_text["mc"];
				}else{
					//tmp = replaceSkillTemplate(tmp, s.id, replace_text["m"], closer, false);
					text = replace_text["m"];
				}
			}else{
				if(slv<10){//一桁
					text = replace_text["pre_ltt"] + slv;
				}else{//二桁
					text = replace_text["pre_gett"] + slv;
				}
				if(has_cancel){
					text = text + replace_text["post_w_c"];
				}else{
					text = text + replace_text["post_wo_c"];
				}
				//tmp = replaceSkillTemplate(tmp, s.id, text, closer, !is_ff&&!merge_cancel);
				need_adj = !is_ff&&!merge_cancel;
			}
			if(!merge_ex_){//マージしない
				text = text + "]";
			}else{
				var ex_text = is_ff?ex_replace_text_fixed:ex_replace_text_prop;
				var exs = id_obj_table_["ex_" + s.id];
				if(exs && exs.getActivity()=="p"){//Exパッシブスキルが存在する
					var exlv = getCurrentSkillLevel(exs.id);
					var exam = isAutoMaster(exs.id);
					if(exlv==0 && !exam){
						text = text + ex_text["zero"]
					}else if(exam || exlv==exs.max_slv){//M表記
						text = text + ex_text["m"];
					}else{
						text = text + ex_text["pre_ltt"] + exlv + ex_text["post_ltt"];
					}
				}else{//Exパッシブスキルが無い
					text = text + ex_text["empty"];
				}
			}
		}
		tmp = replaceSkillTemplate(tmp, s.id, text, need_adj);
	});
	return tmp;
}

var show_hint_ = false;
function toggleHint(){
	if(show_hint_ && !show_requirements_){
		hideHint();
	}
	show_hint_ = !show_hint_;
}
var hint_shown_ = false;
//ヒントを表示
//idによってユニークなものはeventからidを抽出，
//複数箇所で使用するものはtagで指定する．
function onHint(e, tag){
	if(!show_hint_ && !show_requirements_)return;
	if(hint_shown_)return;
	var a = $("hint_area");
	var obj = Event.element(e);
	var id = obj.id;
	if(tag!=undefined){
		id = tag;
	}
	a.innerHTML = ""
		+ (show_hint_?hints_[id]:"")
		+ (show_hint_&&show_requirements_?"<br>":"")
		+ (show_requirements_?req_hint_:"");
	if(a.innerHTML=="")return;//中身が無いなら表示しない
	req_hint_ = "";//クリア
	var x = Event.pointerX(e);
	var y = Event.pointerY(e);
	var cx = e.clientX;
	var cy = e.clientY;
	var w = a.getWidth();
	var h = a.getHeight();
	if(cx+w+30>document.body.clientWidth){
		x = x - 60 - w;
	}
	if(cy+h+30>document.body.clientHeight){
		y = y - 40 - h;
	}
	a.style.left = x + 30 + "px";
	a.style.top  = y + 20 + "px";
	a.show();

	if(need_shim_){//IE6とかはselectのz-indexが効かない
		var s = $("shim");
		s.style.width  = a.getWidth();
		s.style.height = a.getHeight();
		s.style.left   = a.style.left;
		s.style.top    = a.style.top;
		s.show();
	}
	hint_shown_ = true;
	Event.stop(e);
	return true;
}

function hideHint(){
	if(!show_hint_&&!show_requirements_)return;
	hint_shown_ = false;
	var a = $("hint_area");
	a.hide();
	if(need_shim_){
		var s = $("shim");
		s.hide();
	}
	return true;
}
var use_shortcode_ = true;
function toggleShortcode(){
	use_shortcode_ = !use_shortcode_;
}

function getSkillCode(sc){
	return encode(sc, 
	              $F("plv"),
	              $F("dsp"),
	              is_contract_,
	              is_fairpvp_,
	              checksToBooleanArray(document.getElementsByName("automaster")),
	              skillsToIntArray(document.getElementsByName("skills")));
}

function doEncode(){
	var scode = jobcode_ + getSkillCode(use_shortcode_);
	if(append_url_){
		scode = getRootUrl() + "#" + scode;
	}
	$("skillcode").value = scode;
}

function doDecode(no_confirm){
	if(!no_confirm){
		if(!confirm(TT._do_decode_msg))return;
	}
	var scode = $F("skillcode");
	var i = scode.search(/#/);
	if(i!=-1){
		scode = scode.substring(i+1);
		$("skillcode").value = scode;
	}
	clearForm();
	decodeAndApply(scode);
	hideOutputArea();
}
function decodeHash(){
	var scode = location.hash.substr(1);
	update_hash_ = false;//ハッシュの更新を停止
	clearForm();
	if(scode.length!="MSf000".length){//ジョブコードのみならクリアのみ
		decodeAndApply(scode);
	}
	update_hash_ = true;
}

function decodeAndApply(scode){
	if(scode==""){//空ならクリアのみ
		clearForm();
		return true;
	}
	var mf = $("mainform");
	var plv = new Array(1);//参照渡しのため．他に方法はあると思うけど．Numberは基本データ型で値渡しになる．
	var dsp = new Array(1);
	var con = new Array(1);
	var fair = new Array(1);
	var am = new Array(mf.automaster.length);
	var ss = new Array(mf.skills.length);
	if(isJobCode(scode))scode = removeJobCode(scode);//職コードを削る
	if(!decode(scode, plv, dsp, con, fair, am, ss))return false;//デコード失敗
	$("plv").value = plv[0];
	$("dsp").value = dsp[0];
	setContractExpert(con[0]);
	setFairPvp(fair[0]);
	
	for(var i=0;i<mf.automaster.length;i++){
		mf.automaster[i].checked = am[i];
	}
	for(var i=0;i<mf.skills.length;i++){
		setSkillLevelOf(mf.skills[i], ss[i]);
		checkSkillLearnLevel(mf.skills[i].id);
	}
	updateUsedPointSum();
	return true;
}

var show_requirements_ = false;
function toggleShowRequirements(){
	show_requirements_ = !show_requirements_;
}

var append_url_ = false;
function toggleUrlCode(){
	append_url_ = !append_url_;
	doEncode();
}

function getRootUrl(){
	return location.protocol + "//" + location.host + location.pathname;
}

function checksToBooleanArray(cc){
	var bb = new Array(cc.length);
	for(var i=0;i<cc.length;i++){
		bb[i] = cc[i].checked;
	}
	return bb;
}
function skillsToIntArray(ss){
	var dd = new Array(ss.length);
	for(var i=0;i<ss.length;i++){
		//dd[i] = ss[i].options[ss[i].selectedIndex].getAttribute("slv");
		dd[i] = isMasterdSkill(ss[i].id)?63:ss[i].options[ss[i].selectedIndex].getAttribute("slv");
	}
	return dd;
}

//IDの配列から短縮形を反映した名前の配列を生成する．
function ids2names(ids, merge_cancel, merge_ex){
	var names = new Array(ids.length);
	var cancel = ""
	ids.each(function(v, i){
		names[i] = getAbbrevName(v);
		if(names[i]==null){
			names[i] = "invalid id : " + v;
		}else{
			if(id_obj_table_[v] && id_obj_table_[v].isExSkill()){//Exスキルそのもの
				names[i] = names[i] + "[ex]";
			}else{
				if(merge_cancel){
					cancel = getAbbrevName("c_" + v);
					if(cancel){
							names[i] = names[i]+"(c)";
					}
				}
				if(merge_ex ){
					if(getAbbrevName("ex_" + v) && id_obj_table_["ex_" + v].getActivity()=="p"){//パッシブスキルなら
						if(cancel){//
							names[i] = names[i].slice(0, -1) + "/ex)";//最後の)を削って追加．
						}else{
							names[i] = names[i] + "(ex)";
						}
					}
				}
			}
		}
	});
	return names;
}

//IDから省略形を得る．
//設定は変数abbrevs_を用意することで行う．
//デフォルト名はid_name_table_で作ってある．
//var abbrevs_ = {
//	"tundere":"るいーず",
//	"targetit":"狙って",
//	"casillas":"メタボ",
//	"wisp":"ウィスプ",
//	//"hodor":"ホドル",
//	"agni":"アグニ"
//};
function getAbbrevName(id){
	if(id=="")return "";
	if(("abbrevs_" in window) && abbrevs_ && T_LANG=="ja" && abbrevs_[id] != undefined){//日本語以外は未対応
		return abbrevs_[id];
	}
	if(id_name_table_[id]==undefined){//id_name_table_はasps.js側で定義
		//console.error("No such id : " + id);
		return null;
	}
	return id_name_table_[id];
}
//AA設定の時の文字列幅を得る．
//指定spanを用意しておくこと．
function getAaTextWidth(text){
	if(text=="")return 0;
	var e = $("SpanForGetAaTextWidth");//<span id=SpanForGetAaTextWidth class=aa style="display:none"></span>
	e.innerHTML = text;
	return e.getWidth();
}

//指定幅(w)の空白文字列を生成できるかどうか．
//生成できない場合は空文字列""を返す．
//生成できた場合は生成した空白文字列．
//空白文字列は次の正規表現で構成される
// [.　][ 　.]*
function isSpacable(w){
	var a = Math.floor(w / 11);//全角空白11dotが基本
	var d = w % 11;//余りを調整する
	var b = 0;     //「　　　」11*3=33dots→「　 　 」11*2+5*2=32dotsに置換した回数．
	var s = ""; //最終的な余りを埋めるための文字列．
	var r = true; //リピートフラグ
	var pass = true;//表現できなければfalse
	while(r){
		r = false;
		switch(d){
		case 0:s = "";  break;
		case 3:s = "."; break;
		case 5:s = " "; break;
		case 6:s = "..";break;//3*2
		case 8:s = ". ";break;//3+5
		case 9:
			if(a>=3*2){ //2dot分置換できれば11dotで全角空白が使える
				a -= 3*2;
				d += 2;
				b += 2;
				r = true;
			}else{ //置換できないならしょうがないので半角ピリオド*3
				s = '...';
			}
			break;
		case 11://9or10からここに再突入する場合がある
			a++;//全角空白を一つ増やす．
			d = 0;
			break;
		default:
			if(a>=3){ //全角空白が3つ以上連続して余っているなら
				a -= 3; //3つけずり
				d++;
				b++; //[　 　 ]を一つ増やす
				r = true;//再突入
			}else{ //余りはあるけどもう調整できないなら
				pass = false; //埋められない
			}
			break;
		}
	}
	if(pass){ //通過なら最終的な文字列を作成
		for(var i=0;i<a;i++){
			s += "　";
		}
		for(var i=0;i<b;i++){
			s += "　 　 ";
		}
		return s;
	}
	return "";
}

//スキルテンプレートを生成する．
//string ids[] : IDの配列．
//string names[] : 表示名の配列．インデックスはidsとあわせること．
//int max_dw : 最大幅の文字列から+αするピクセル数．少なすぎると失敗する．
//bool implant_id : IDを埋め込むかどうか．
//bool merge_cancel : キャンセル表示をマージするかどうか．
//returns : 成功した場合はテンプレートを，失敗した場合は""を返す．
//仕様としては左詰必須ぐらいか．
//  "skilla", ""       //これはOK
//  ""      , "skillb" //これはNG
function createSkillTemplate(ids, names, n_cols, max_dw, implant_id, merge_cancel){
	var len = ids.length;
	var DW = max_dw;
	var maxwidth = 0;//最大幅
	var ww = new Array(len);//幅を保存
	names.each(function(v,i){
		ww[i] = getAaTextWidth(v);
		maxwidth = Math.max(maxwidth, ww[i]);
	});
	var spc = "";
	var align_w = 0;
	var pass = false;
	for(var w=maxwidth;w<maxwidth+DW;w++){
		pass = true;
		for(var i=0;i<len;i++){
			if(ww[i]==0)continue;
			spc = isSpacable(w-ww[i]);
			if(spc==""){
				pass = false;
				break;
			}
		}
		if(pass){
			align_w = w;
			break;
		}
	}
	//失敗
	if(!pass){
		//console.error("Failed to align.");
		return "";
	}
	//普通のテンプレを作成して，あとで置換する
	var temp = "";
	for(var i=0;i<len;){
		for(var col=0;col<n_cols&&i<len;col++,i++){
			if(ww[i]==0)continue;
			if(col!=0)temp+="　　";
			spc = isSpacable(align_w-ww[i]);
			temp += names[i] + spc;
			if(implant_id){
				//temp += "【{"+ids[i]+"}】";
				temp += "{"+ids[i]+"}";
			}else{
				//temp+= merge_cancel?"【 　　.】":"【　】";
				temp+= merge_cancel?"[ 　　.]":"[　]";
			}
		}
		temp += "\n";
	}
	return temp;
}

//文字列の半角ベースの長さを返す
//とほほからコピペ
function jstrlen(str,   len, i) {
   len = 0;
   str = escape(str);
   for (i = 0; i < str.length; i++, len++) {
      if (str.charAt(i) == "%") {
         if (str.charAt(++i) == "u") {
            i += 3;
            len++;
         }
         i++;
      }
   }
   return len;
}
function multStr(str, n){
	var ret = "";
	for(var i=0;i<n;i++){
		ret += str;
	}
	return ret;
}

//固定長文字列のスキルテンプレートを生成する．
//string ids[] : IDの配列．
//string names[] : 表示名の配列．インデックスはidsとあわせること．
//int n_cols : カラム=段組数
//int col_width : 各段組の幅．半角文字ベース．
//bool implant_id : IDを埋め込むかどうか．
//returns : 成功した場合はテンプレートを，失敗した場合は""を返す．
//仕様としては左詰必須ぐらいか．
//  "skilla", ""       //これはOK
//  ""      , "skillb" //これはNG
function createSkillTemplateFixed(ids, names, n_cols, col_width, implant_id, merge_cancel){
	//var W_PARENTHESIS = jstrlen(" 【  】");
	var W_PARENTHESIS = jstrlen(" [  ]");
	var len = ids.length;
	var maxwidth = 0;//最大幅
	var ww = new Array(len);//幅を保存
	names.each(function(v,i){
		ww[i] = jstrlen(v);
		maxwidth = Math.max(maxwidth, ww[i]);
	});
	//「スキル名 【  】」
	if(maxwidth+W_PARENTHESIS > col_width){//カラム幅が足りない
		//console.error("maxwidth=" + maxwidth + ", col_width=" + col_width);
		return "";
	}
	//普通のテンプレを作成して，あとで置換する
	var temp = "";
	for(var i=0;i<len;){
		for(var col=0;col<n_cols&&i<len;col++,i++){
			if(ww[i]==0)continue;
			if(col!=0)temp+=" ";
			spc = multStr(" " , maxwidth-ww[i]+1);
			temp += names[i] + spc;
			if(implant_id){
				//temp += "【{"+ids[i]+"}】";
				temp += "{"+ids[i]+"}";
			}else{
				//temp += merge_cancel?"【   】":"【  】";
				temp += merge_cancel?"[   ]":"[  ]";
			}
		}
		temp += "\n";
	}
	return temp;
}


function toggleNowrap(){
	//var sl = $A(document.getElementsByClassName("skill_label"));//$$()は重い? prototype.js ver.1.6で廃止
	var sl = $$(".skill_label");//$$()は重い? セレクタで検索範囲を絞るべきか
	var nowrap = "nowrap_label";
	if(sl[0].hasClassName(nowrap)){
		sl.each(function(v,i){
			v.removeClassName(nowrap);
		});
	}else{
		sl.each(function(v,i){
			v.addClassName(nowrap);
		});
	}
}

//MWf030
//||||
//|||+バージョン10進3桁．対応ページの～ddd.htmlのdddに対応．
//||| ただしバージョンが2桁の場合はURLを下二桁の～dd.htmlにすること．
//||+男女 man/female
//|+上級職 WitchとかRangerとか
//+基本職 M G K P
//職コードで始まる文字列か否か
function isJobCode(scode){
	var s = scode.substring(0, 3);
	for(var i=0;i<JOBCODES.length;i++){
		if(JOBCODES[i]==s)return true;
	}
	return false;
}
//職コードを削る
function removeJobCode(scode){
	return scode.substring(6);//KWm030
}

//ソースを生成．
function dumpSource(){
	function f(ss){
		var si = "";
		var s;
		for(var i=0;i<ss.length;i++){
			s = ss[i];
			var hasbase = (s.id.substring(0,2)=="c_"  && s.name==("キャンセル"+id_name_table_[s.id.substring(2)]))||
			              (s.id.substring(0,3)=="ex_" && s.name==(id_name_table_[s.id.substring(3)]+"強化"));
			si = 'new SkillInfo("' + s.id;
			if(!hasbase)si += '", "' + s.name;
			si += '")';
			if(s.isExSkill()){
				si += ".setAsEx(";
			}else if(s.max_slv==1){
				si += ".setAsOneOnly(";
			}else{
				si += ".setAsBasic(";
			}
			if(s.isExSkill()){
				if(s.max_slv!=3){
					si += s.learn_from + ", " + s.sp_cost + ", " + s.lv_cost + ", " + s.max_slv_tmp;
				}else if(s.lv_cost!=5){
					si += s.learn_from + ", " + s.sp_cost + ", " + s.lv_cost;
				}else if(s.sp_cost!=1){
					si += s.learn_from + ", " + s.sp_cost;
				}else if(s.learn_from!=50){
					si += s.learn_from;
				}else{
					
				}
			}else if(s.max_slv!=1||s.can_learn_and_raise){
				si += s.learn_from + ", " + s.sp_cost + ", " + s.lv_cost;
				if(s.learn_from+(s.max_slv+(s.can_learn_and_raise?-1:0))*s.lv_cost<75){
					si += ", " + s.max_slv_tmp;
				}else{
					si += ", -1";
				}
				if(s.can_learn_and_raise){
					si += ", true";
				}
			}else{
				si += s.learn_from + ", " + s.sp_cost;
			}
			si += ")";
			if(!s.can_learn_and_raise && s.first_sp_cost==0){
				si += ".setFirstCost(0)";
			}
			//前提
			var sr = skill_requirements_;
			for(var j=0;j<sr.length;j+=3){
				if(sr[j+1]==s.id){
					si += ".addPre(";
					if(hasbase){

					}else{
						si += '"' + sr[j] + '",';
					}
					si += sr[j+2] + ")";
				}
			}
			console.log((i+1<ss.length)?("\t"+si+","):("\t"+si));
		}
	}
	//console.log("var common_skills_ = [");
	//f(common_skills_);
	//console.log("];");
	console.log("var first_job_skills_ = [");
	f(first_job_skills_);
	console.log("];");
	console.log("var second_job_skills_ = [");
	f(second_job_skills_);
	console.log("];");
	
}

function makeDefaultIdSkillTemplate(){
	var temp = "";
	var j = 0;
	function f(ss){
		for(var i=0;i<ss.length;i++){
			var s = ss[i];
			if(s.id.substring(0,2)=="c_"   && id_name_table_[s.id.substring(2)] ||
			   s.id.substring(0,3)=="ex_"  && id_name_table_[s.id.substring(3)] && s.getActivity()!="a"){
				
			}else{
				//console.log(',"' + s.id + '"');
				j++;
					temp += '\t,"' + s.id + '"';
				if(j%2==0){
					temp += "\n";
				}
			}
		}
		if(j%2){
			temp += '\t,""\n';
			j++;
		}
	}
	//f(common_skills_);
	f(first_job_skills_);
	f(second_job_skills_);
	displayDebug("<pre>" + temp + "\n</pre>");
	return temp;
}

function onLangSelect(sel){
	document.cookie = "TLANG=" + $("lang_select").value;
	location.reload();
}

function displayDebug(msg){
	if(!is_debug_mode_)return;
	$("error_msg").innerHTML = $("error_msg").innerHTML + "Debug : " + msg + "<br>";
}
function displayError(msg){
	$("error_msg").innerHTML = $("error_msg").innerHTML + "Error : " + msg + "<br>";
}

function getLanguage(){
	var lang = "ja";//en

	//クッキー優先
	var i = document.cookie.search(/TLANG=/);
	if(i!=-1){
		lang = document.cookie.substr(i+6, 2);
	}else{
		//設定がなければブラウザの言語設定を見る．
		var l = null;
		if(navigator.browserLanguage)    { l = navigator.browserLanguage;}
		else if(navigator.userLanguage)  { l = navigator.userLanguage;}
		else if(navigator.language)      { l = navigator.language;}
		else if(navigator.systemLanguage){ l = navigator.systemLanguage;}
		if(l){
			lang = l.substr(0,2);//ja, ja-JPあたり
		}
	}
	if(lang!="ja"&&lang!="en"){//対応言語はja en
		lang = "ja";
	}
	//if(lang=="ja")lang="jp";
	return lang;
}

function updateHashCode(){
	if(update_hash_){
		//ハッシュのスキルコードを更新
		setIsWatchHash(false);
		if(disable_hash_update_){
			//history.replaceState(null, "", "#" + jobcode_ + getSkillCode(use_shortcode_));
			//displayDebug("using replaceState()");
			displayDebug("dont update hash");
		}else{
			location.hash = jobcode_ + getSkillCode(use_shortcode_);
		}
		
		displayDebug("hash update to : " + location.hash);
		setIsWatchHash(true);
	}
}

///ハッシュ変更の監視
var is_watch_hash_ = true;
function setIsWatchHash(b){
	is_watch_hash_ = b;
}
//ハッシュ変更イベントを処理する
var old_hash_ = "";
function onHashChanged(e){
	displayDebug("hash changed : " + location.hash);
	displayDebug("old_bash_=" + old_hash_);
	//displayDebug("oldURL=" + e.oldURL);//IE=8だと存在しない
	if(!is_watch_hash_){
		old_hash_ = location.hash;
		return;
	}
	var h = location.hash;
	//if((h.length=="#MSf080".length ||h.length=="#MSf".length)&& jobcode_!=h.substr(1)){//jobcodeのみで，変更があれば
	//var old = e.oldURL.match(/#...(...)?/);//["#MSf080", "080"]
	var old = old_hash_.match(/#...(...)?/);//["#MSf080", "080"]
	old_hash_ = location.hash;
	if(!old || h.substr(0, 7)!=old[0]){//職が変更されていたら
		location.reload();//リロード
	}else{
		decodeHash();//ハッシュに従い更新
	}
}


///アイコンパス変換用
function dumpIconBatch(){
	var s = "";
	
	//s = "mkdir general\n";
	//for(var i=0;i<common_skills_.length;i++){
	//	s += "move " + common_skills_[i].id + ".png general\n";
	//}
	//s+="\n";

	var msg = jobcode_.substr(0,3);//MainclassSubclassGender
	s += "mkdir " + msg + "\n";
	for(var i=0;i<second_job_skills_.length;i++){
		s += "move " + second_job_skills_[i].id + ".png " + msg + "\n";
	}
	s+="\n";
	
	var m_g = jobcode_.substr(0, 1) + "_" + jobcode_.substr(2, 1);//Mainclass_Gender
	s += "mkdir " + m_g + "\n";
	for(var i=0;i<first_job_skills_.length;i++){
		s += "move " + first_job_skills_[i].id + ".png " + m_g + "\n";
	}
	s+="\n";
	

	$("error_msg").innerHTML = "<pre>" + s + "</pre>";
	
}

function onIconSizeSelect(sel){
	var w = sel.value;
	var cur = getIconSize();
	setIconSize(w);
	if(cur<=0 && w>=1){
		location.reload();
		return;
	}
	if(w<=0){
		hideIconTd();
	}else{
		$$(".spacing_icon").each(function(i){i.width=w;});//IEだと動作が怪しい…
	}
}

function onVersionSelect(sel){
	var v = sel.value;
	var s = location.hash.substr(1, 3);
	if(v<10) s = s + "0";
	if(v<100)s = s + "0";
	s = s + v;
	location.hash = s;
}

function getNumberOfColumns(){
	var n_cols = 3;
	var v = localStorage.getItem("n_cols");
	if(v){
		n_cols = parseInt(v, 10);
	}
	return n_cols;
}

function shiftNumberOfColumns(){
	var n = getNumberOfColumns();
	n++;
	if(n>5)n=2;
	localStorage.setItem("n_cols", n);
	location.reload();
}

function getJsParam(){
	var v = localStorage.getItem("js_param");
	if(!v){
		return "";
	}
	return "? " + v;
}
function updateJsParam(){
	localStorage.setItem("js_param", new Date().getTime());
}

function getIconSize(){
	var v = localStorage.getItem("icon_size");
	if(!v)return 20;
	return parseInt(v, 10);
}
function setIconSize(size){
	localStorage.setItem("icon_size", size);
}
function hideIconTd(){
	$$(".skill_icon").each(function(td){
		td.hide();
	});
}
var is_fairpvp_ = false;
function setFairPvp(b){
	is_fairpvp_ = b;
	$("fairpvp_chk").checked = b;
}
function toggleFairPvp(){
	is_fairpvp_ = !is_fairpvp_;
	addLevel(0);
}
