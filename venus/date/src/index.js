/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-11-1
 * Time: 上午9:33
 * To change this template use File | Settings | File Templates.
 * http://www.alienjs.net
 */
;(function ( Date ) {

    //注：时间格式中日期中月份开始是从0开始的。。

    /***
     * 语言
     * @module Date
     * @namespace Date
     * @type {{week: string[]}}
     */
    Date.lang = {
        week : ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d']
    }

    Date.prototype.toDate = function () {
        return this;
    };

    /***
     * json 字符转化为时间类型
     * @module window
     * @namespace Date
     * @method parseDate
     * @params {string} json 格式
     */
    Date.parseDate = function ( jsonString ) {
        var obj = jsonString;
        var date = eval( obj.replace( /\/Date\((\d+)\)\//gi , "new Date($1)" ) );
        return date;
    };
    /**
     * 取得当前日期所在月的最大天数
     * @module Date
     * @class Date
     * @method maxDay
     * @return {number} 最大天数
     * @example
     * */
    Date.prototype.maxDay = function () {
        var myDate = this;
        var ary = myDate.toArray();
        var date = (new Date( ary[0] , ary[1] + 1 , 1 ));
        return date.addDay( - 1 ).getDate();
    };
    /**
     * 取得当前日期所在周是一年中的第几周
     * @module Date
     * @class Date
     * @method getYearWeek
     * @return {number} 周数
     * @example
     * */
    Date.prototype.getYearWeek = function () {
        var date1 = this, date2 = new Date(a, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil(
            (d + ((date2.getDay() + 1) - 1)) / 7
        );
    };
    /**
     * 取得当前日期所在周是一月中的第几周
     * @method getMonthWeek
     * @for Date
     * @return {number} 周数
     * @example
     * */
    Date.prototype.getMonthWeek = function () {
        /*
         a = d = 当前日期
         b = 6 - w = 当前周的还有几天过完（不算今天）
         a + b 的和在除以7 就是当天是当前月份的第几周
         */
        var date = this, w = date.getDay(), d = date.getDate();
        return Math.ceil(
            (d + 6 - w) / 7
        );
    };
    /**
     * 日期格式化
     * @method format
     * @param {string} format 格式 YYYY/yyyy/YY/yy 表示年份,MM/M 月份,W/w 星期,dd/DD/d/D 日期,hh/HH/h/H 时间,mm/m 分钟,ss/SS/s/S 秒
     * @for Date
     * @return {date} this
     * @example
     * */
    Date.prototype.format = function ( format ) {
        if ( ! format ) return this.toString();
        var str = format;
        var Week = Date.lang.week;
        var date = this;
        str = str.replace( /yyyy|YYYY/ , date.getFullYear() );
        str = str.replace( /yy|YY/ , (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100) );
        var month = date.getMonth() + 1;
        str = str.replace( /MM/ , month > 9 ? month.toString() : '0' + month );
        str = str.replace( /M/g , month );
        str = str.replace( /w|W/g , Week[date.getDay()] );
        str = str.replace( /dd|DD/ , date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate() );
        str = str.replace( /d|D/g , date.getDate() );
        str = str.replace( /hh|HH/ , date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours() );
        str = str.replace( /h|H/g , date.getHours() );
        str = str.replace( /mm/ , date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes() );
        str = str.replace( /m/g , date.getMinutes() );
        str = str.replace( /ss|SS/ , date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds() );
        str = str.replace( /s|S/g , date.getSeconds() );
        return str;
    };
    /**
     * 是否是周末
     * @method isWeedEnd
     * @return {boolean} true|false
     * @example
     * */
    Date.prototype.isWeedEnd = function () {
        if ( this.getDay() == 0 || this.getDay() == 6 ) {
            return true
        }
        ;
        return false;
    };

    /**
     * 判断闰年
     * @method isLeapYear
     * @return {boolean} true|false
     * @example
     * */
    Date.prototype.isLeapYear = function () {
        return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
    };
    /**
     * 增加时间
     * @method add
     * @param {string} [type=d] s|m|h|d|w|q|M|y
     * @param {string} number 增加的数量
     * @return {date} this
     * @example
     * */
    Date.prototype.add = function ( type , number ) {
        var dtTmp = this;
        switch ( type ) {
            case 's' :
            case 'S' :
                return new Date( Date.parse( dtTmp ) + (1000 * number) );
            case 'm' :
                return new Date( Date.parse( dtTmp ) + (60000 * number) );
            case 'h' :
            case 'H' :
                return new Date( Date.parse( dtTmp ) + (3600000 * number) );
            case 'd' :
            case 'D' :
                return new Date( Date.parse( dtTmp ) + (86400000 * number) );
            case 'w' :
            case 'W' :
                return new Date( Date.parse( dtTmp ) + ((86400000 * 7) * number) );
            case 'q' :
            case 'Q' :
                return new Date( dtTmp.getFullYear() , (dtTmp.getMonth()) + number * 3 , dtTmp.getDate() , dtTmp.getHours() , dtTmp.getMinutes() , dtTmp.getSeconds() );
            case 'M' :
            case 'M' :
                return new Date( dtTmp.getFullYear() , (dtTmp.getMonth()) + number , dtTmp.getDate() , dtTmp.getHours() , dtTmp.getMinutes() , dtTmp.getSeconds() );
            case 'y' :
            case 'Y' :
                return new Date( (dtTmp.getFullYear() + number) , dtTmp.getMonth() , dtTmp.getDate() , dtTmp.getHours() , dtTmp.getMinutes() , dtTmp.getSeconds() );
            default :
                return new Date( Date.parse( dtTmp ) + (86400000 * number) );
        }
    };
    /**
     * 加上天
     * @method addDay
     * @return {date} this
     * @example
     * */
    Date.prototype.addDay = function ( num ) {
        return this.add( 'd' , num );
    };
    /**
     * 加上月
     * @method addMonth
     * @return {date} this
     * @example
     * */
    Date.prototype.addMonth = function ( num ) {
        return this.add( 'm' , num );
    };
    /**
     * 加上年
     * @method addYear
     * @return {date} this
     * @example
     * */
    Date.prototype.addYear = function ( num ) {
        return this.add( 'y' , num );
    };
    /**
     * 时间差
     * @method diff
     * @use  String.js
     * @param {string} [type=d] s|m|h|d|w|M|y
     * @param {string|object|number} dtEnd
     * @return {number | object} 差值
     * @example
     * */
    Date.prototype.diff = function ( dtEnd , type ) {
        var dtStart = this.toDate();

        if(typeof dtEnd == 'string'){
            dtEnd = dtEnd.toDate();
        }
        else if(typeof dtEnd == 'number'){
            if(dtEnd.toString().length == 10){
                dtEnd = parseInt(dtEnd) * 1000
            }
            dtEnd = new Date( dtEnd );
        }

        switch ( type ) {
            case 's' :
            case 'S' :
                return parseInt( (dtEnd - dtStart) / 1000 );
            case 'm' :
                return parseInt( (dtEnd - dtStart) / 60000 );
            case 'h' :
            case 'H' :
                return parseInt( (dtEnd - dtStart) / 3600000 );
            case 'd' :
            case 'D' :
                return parseInt( (dtEnd - dtStart) / 86400000 );
            case 'w' :
            case 'W' :
                return parseInt( (dtEnd - dtStart) / (86400000 * 7) );
            case 'M' :
                return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
            case 'y' :
            case 'Y' :
                return dtEnd.getFullYear() - dtStart.getFullYear();
            default :
                var chaTime = (dtEnd.getTime() - dtStart.getTime()),
                    res = {};
                var Day_Param = 1000 * 60 * 60 * 24;//一天等于毫秒数
                var Hour_Param = 1000 * 60 * 60;//一小时等于毫秒数
                var Minu_Param = 1000 * 60;//一小时等于毫秒数
                var Sec_Param = 1000;//一小时等于毫秒数
                res.day = Math.floor( chaTime / Day_Param );//
                chaTime = chaTime - res.day * Day_Param;//减去天的毫秒数。再求小时个数
                res.hour = Math.floor( chaTime / (Hour_Param) );
                chaTime = chaTime - res.hour * Hour_Param;
                res.minu = Math.floor( chaTime / (Minu_Param) );
                chaTime = chaTime - res.minu * Minu_Param;
                res.sec = Math.floor( chaTime / (Sec_Param) );
                //chaTime = chaTime - res.sec * Sec_Param;
                return res;
        }
        ;
    };
    /**
     * 时间差，天数
     * @method diffDay
     * @return {string} 天数
     * @example
     * */
    Date.prototype.diffDay = function ( dtEnd  ) {
        return this.diff( dtEnd , 'd' );
    };
    /**
     * 时间差，小时
     * @method diffHour
     * @return {string} 小时数
     * @example
     * */
    Date.prototype.diffHour = function ( dtEnd  ) {
        return this.diff( dtEnd ,  'h' );
    };
    /**
     * 时间差，分
     * @method diffMinu
     * @return {string} 分钟数
     * @example
     * */
    Date.prototype.diffMinu = function ( dtEnd  ) {
        return this.diff( dtEnd ,'m' );
    };
    /**
     * 时间差，秒
     * @method diffSec
     * @return {string} 秒钟数
     * @example
     * */
    Date.prototype.diffSec = function ( dtEnd  ) {
        return this.diff(  dtEnd , 's' );
    };
    /**
     * 获取周
     * @method week
     * @return {string} 周
     * @example
     * */
    Date.prototype.week = function ( ) {
        var str = '';//this.toLocaleDateString();
        var Week = Date.lang.week;
        str += ' \u661f\u671f' + Week[this.getDay()];
        return str;
    };
    /**
     * 把日期分割成数组
     * @method toArray
     * @return {array} 数组格式的时间
     * @example
     * */
    Date.prototype.toArray = function () {
        var myDate = this;
        var myArray = Array();
        myArray[0] = myDate.getFullYear();
        myArray[1] = myDate.getMonth();
        myArray[2] = myDate.getDate();
        myArray[3] = myDate.getHours();
        myArray[4] = myDate.getMinutes();
        myArray[5] = myDate.getSeconds();
        return myArray;
    };
    /**
     * 返回当前时间的星座
     * @method star
     * @return {string} 星座名称
     * @example
     * */
    Date.prototype.star = function () {
        var stars = [
            {"name" : "\u6c34\u74f6\u5ea7" , timeArea : "1-20&2-19"},
            {"name" : "\u53cc\u9c7c\u5ea7" , timeArea : "2-20&3-20"},
            {"name" : "\u767d\u7f8a\u5ea7" , timeArea : "3-21&4-20"},
            {"name" : "\u91d1\u725b\u5ea7" , timeArea : "4-21&5-20"},
            {"name" : "\u53cc\u5b50\u5ea7" , timeArea : "5-21&6-21"},
            {"name" : "\u5de8\u87f9\u5ea7" , timeArea : "6-21&7-22"},
            {"name" : "\u72ee\u5b50\u5ea7" , timeArea : "7-23&8-22"},
            {"name" : "\u72ee\u5b50\u5ea7" , timeArea : "8-23&9-22"},
            {"name" : "\u5929\u79e4\u5ea7" , timeArea : "9-23&10-22"},
            {"name" : "\u5929\u874e\u5ea7" , timeArea : "10-23&11-21"},
            {"name" : "\u5c04\u624b\u5ea7" , timeArea : "11-21&12-21"},
            {"name" : "\u9b54\u7faf\u5ea7" , timeArea : "12-22|1-19"}
        ];
        var d = this,
            year = this.getYear(),
            month = this.getMonth() + 1,
            day = this.getDate();
        for ( var i = 0 ; i < stars.length ; i ++ ) {
            var area = stars[i].timeArea.split( '&' );
            if ( area.length > 1 ) {
                var start = area[0].split( '-' );
                var end = area[1].split( '-' );
                var currentDate = new Date( year , month , day );
                var startDate = new Date( year , start[0] , start[1] );
                var endDate = new Date( year , end[0] , end[1] );
                if ( currentDate - startDate > 0 && currentDate - endDate < 0 ) {
                    return stars[i].name;
                }
            }
            else {
                area = stars[i].timeArea.split( '|' );
                var start = area[0].split( '-' );
                var end = area[1].split( '-' );
                var currentDate = new Date( year , month , day );
                var startDate = new Date( year , start[0] , start[1] );
                var endDate = new Date( year , end[0] , end[1] );
                if ( currentDate - startDate > 0 || currentDate - endDate < 0 ) {
                    return stars[i].name;
                }
            }
        }
    };

})( window.Date );