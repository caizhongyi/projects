var festival = function () {
	var nd = new Date(),
		year = nd.getFullYear(),
		getdate = function (t) {
			return new Date(Date.parse(t)).getTime();
		}
	//春节
	if (getdate(year + "/01/20 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/02/05 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/festival.css" type="text/css" rel="stylesheet" />');
	}
	//元宵节
	if (getdate(year + "/02/06 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/02/06 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/lantern.css" type="text/css" rel="stylesheet" />');
	}
	//情人节
	if (getdate(year + "/02/14 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/02/14 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/valentine.css" type="text/css" rel="stylesheet" />');
	}
	//妇女节
	if (getdate(year + "/03/08 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/03/08 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/womenday.css" type="text/css" rel="stylesheet" />');
	}
	//植树节
	if (getdate(year + "/03/12 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/03/12 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/arborday.css" type="text/css" rel="stylesheet" />');
	}
	//白色情人节
	/*if(getdate(year + "/03/14 00:00:00")<nd.getTime() && nd.getTime()<getdate(year + "/03/14 23:59:59")){
	 document.writeln('<link href="http://ue.766.com/styles/css/whitevalentine.css" type="text/css" rel="stylesheet" />');
	 }*/
	//愚人节
	if (getdate(year + "/4/1 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/4/1 23:59:59")) {
		document.writeln('<script src="http://js.olcdn.com/festival/fools/fools.js" type="text/javascript" ></script>');
	}
	//清明节
	if (getdate(year + "/04/04 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/04/04 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/tombsweeping.css" type="text/css" rel="stylesheet" />');
	}
	//劳动节
	if (getdate(year + "/04/29 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/05/01 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/laborday.css" type="text/css" rel="stylesheet" />');
	}
	//儿童节
	if (getdate(year + "/06/01 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/06/01 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/childermas.css" type="text/css" rel="stylesheet" />');
	}
	//父亲节
	if (getdate(year + "/06/17 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/06/17 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/fathersday.css" type="text/css" rel="stylesheet" />');
	}
	//端午节
	if (getdate(year + "/06/23 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/06/23 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/doanngo.css" type="text/css" rel="stylesheet" />');
	}
	//国庆节
	if (getdate(year + "/10/01 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/10/07 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/nationalday.css" type="text/css" rel="stylesheet" />');
	}
	//万圣节
	if (getdate(year + "/11/01 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/11/01 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/halloween.css" type="text/css" rel="stylesheet" />');
	}
	//圣诞节
	if (getdate(year + "/12/20 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/12/25 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/christmas.css" type="text/css" rel="stylesheet" />');
	}
	//元旦
	if (getdate(year + "/01/01 00:00:00") < nd.getTime() && nd.getTime() < getdate(year + "/01/03 23:59:59")) {
		document.writeln('<link href="http://ue.766.com/styles/css/newyear.css" type="text/css" rel="stylesheet" />');
	}

}
festival();