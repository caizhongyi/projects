//HTMLエレメントとの分離をすすめること．

//1文字あたり6bit
var encode_chars_ = [
// 0123456789012345678901234567890123456789012345678901234567890123
// ******    *         *                                          * 使用頻度の高い数字
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!_",
	"liCDEIGHFJ1LMNOPQRST!VWXYZabcdefghB_kAmnopqrstuvwxyz0K23456789Uj",//to shoren skill code.
	"iItgkjsxzafbcdehnopqruvy0123456789EFJLTYZABDHKNPRSUVwXCGOQmMW!_l", //0-5, 10, 20, 63に幅の狭い文字をあてる
	"il!Ij_frtgksxz0123456789abcdehnopquvyEFJLTYZABDHKNPRSUVwXCGOQmMW" //最小幅順
];
var encode_delimiter_ = "=";

//先頭2文字=6*2=12bit
var BIT_LAZY      = 0x800;
var BIT_FAIRPVP   = 0x400; //公正決闘
var BIT_CONTRACT  = 0x200; //達人の契約
var BIT_LAZY2     = 0x100; //lazy[2]使用フラグ
var BIT_PLAYER_LV = 0x0FF;//下位8bit=最大LV256

function get64Strlen(max){
	var len = 1;
	if(max>Math.pow(2,18)){
		len = 4;
	}else if(max>Math.pow(2,12)){
		len = 3;
	}else if(max>Math.pow(2,6)){
		len = 2;
	}
	return len;
}
	
function n2s(n, max, lazy){
	var len = get64Strlen(max);
	var estr = "";
	for(var i=0;i<len;i++){
		var low = n&63;
		estr += encode_chars_[lazy].charAt(low);
		n >>>= 6;
	}
	return estr;
}
	
function numerTo64Str(n, lazy){
	//console.log("numerTo64Str(n=%d)", n);
	return n2s(n, n, lazy);
}
function toNumerFrom64Str(str, lazy){
	//console.log("toNumerFrom64Str(str=%s)", str);
	var n = 0;
	for(var i=0;i<str.length;i++){
		n += encode_chars_[lazy].indexOf(str.charAt(i))*Math.pow(2, 6*i);
	}
	return n;
}

//in
	//string scode スキルコード
//out
	//int oplv[1] : プレイヤーキャラクターLVを受け取る．
	//int odsp[1] : 直接入力SPを受け取る．
	//int ocon[1] : 達人の契約状況を受け取る．
	//bool oam[] : Automaster情報を受け取る．長さはスキルの数だけ用意すること．
	//int  oss[] : スキル値を受け取る．長さは(ry
function decode(scode, oplv, odsp, ocon, ofair, oam, oss){
	//console.log("decode(scode=%o)", scode);
	if(scode =="")return false;
	var plv = toNumerFrom64Str(scode.substring(0,2), 0);//先頭2バイトはnon-lazy
	//lazy 1bit
	var lazy = 0;
	if(plv&BIT_LAZY){//先頭ビットが立っていたら
		lazy = 1;
	}
	//lazy2
	if(plv&BIT_LAZY2){
		lazy = 2;
	}
	//公正決闘
	var fairpvp = false;
	if(plv&BIT_FAIRPVP){
		fairpvp = true;
	}
	ofair[0] = fairpvp;
	//達人の契約
	var con = false;
	if(plv&BIT_CONTRACT){
		con = true;
	}
	ocon[0] = con;

	//実際のプレイヤーLv
	oplv[0] = plv&BIT_PLAYER_LV;

	var dsp = toNumerFrom64Str(scode.substring(2,4), lazy);//2バイト
	odsp[0] = dsp;
	
	
	var idx = 4;
	var len = 0;
	//quests
	idx++;//既に無い，1文字だけ残ってる
	//automaster
	len = getBooleanArrayLength(scode.charAt(idx), lazy);
	if(len==0){//全部OFF
		idx++;
	}else if(len==-1){//全部ON
		for(var i=0;i<oam.length;i++){
			oam[i] = true;
		}
		idx++;
	}else{
		var aa = codeToBooleanArray(scode, idx+1, len, lazy);
		for(var i=0;i<oam.length&&i<aa.length;i++){
			oam[i] = aa[i];
		}
		idx+=len+1;
	}
	//skills
	var ss = new Array();
	for(var i=idx;i<scode.length;i++){
		ss.push(toNumerFrom64Str(scode.charAt(i), lazy));
	}
	for(var i=0;i<ss.length&&i<oss.length;i++){
		oss[i] = ss[i];
	}
	return true;
}
function getBooleanArrayLength(ch, lazy){
	//console.log("getBooleanArrayLength(ch=%s)", ch);
	var len = toNumerFrom64Str(ch, lazy);
	if(len==63)return -1;
	return len;
}
function codeToBooleanArray(scode, from, len, lazy){
	var str = scode.substring(from, from+len);
	var aa = new Array();
	for(var i=0;i<str.length;i++){
		var b64 = toNumerFrom64Str(str.charAt(i), lazy);
		var base = 1;
		for(var b=0;b<6;b++){
			aa[i*6+b] = (b64&base)!=0;
			base*=2;
		}
	}
	return aa;
}
//boolean lazy : lazy codeを使用するか否か．
//int     plv  : プレイヤーキャラクターLV．
//int     dsp  : 入力SP．
//boolean is_contract : 達人の契約
//boolean aa[] : automaster情報．
//int     ss[] : スキル値情報．
function encode(lazy, plv, dsp, is_contract, fairpvp, aa, ss){
	if(typeof lazy == "undefined"){
		lazy = 0;
	}else{
		lazy = lazy?2:0;//boolean->0/2
	}
	if(lazy){
		plv |= BIT_LAZY;
		plv |= BIT_LAZY2;
	}
	if(is_contract){
		plv |= BIT_CONTRACT;
	}
	if(fairpvp){
		plv |= BIT_FAIRPVP;
	}
	
	var pstr   = n2s(plv, 4096, 0);//先頭はnon-lazy
	var dspstr = n2s(dsp, 4096, lazy);
	var qstr   = encode_chars_[lazy].charAt(0);//常に0 古いコード用に残しておく
	var astr   = booleanArrayToCodeStr(aa, lazy);
	var sstr = "";
	for(var i=0;i<ss.length;i++){
		sstr += n2s(ss[i], 63, lazy);
	}
	
	return pstr + dspstr + qstr + astr + sstr;
}

function booleanArrayToCodeStr(bb, lazy){
	var ret="";
	//62セット=62*6bitまで対応
	//最初の一文字が0は全部OFF,63で全部ON，それ以外は文字列の長さ(6bit単位)
	if(bb.all(function(v, i){return v;})){
		return encode_chars_[lazy].charAt(63);
	}else if(bb.all(function(v,i){return !v;})){
		return  encode_chars_[lazy].charAt(0);
	}
	var len = 0;
	for(var i=0;i<bb.length;i+=6){//6bit単位で処理
		var v = 0;
		var base = 1;
		for(var j=i;j<i+6&&j<bb.length;j++){
			if(bb[j])v += base;
			base*=2;
		}
		ret += n2s(v, base, lazy);
		len++;
	}
	var zero_char = encode_chars_[lazy].charAt(0);
	for(var i=ret.length-1;i>=0;i--){
		if(ret[i] == zero_char){//0ならフラグはすべてOFF→設定の必要なし
			ret = ret.substring(0, ret.length-1);
			len--;
			continue;
		}
		break;
	}
	return encode_chars_[lazy].charAt(len) + ret;//長さを付ける
}

