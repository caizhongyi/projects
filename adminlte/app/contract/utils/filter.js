/**
 * Created by Administrator on 2015/8/5.
 */
angular.module('contract.utils.filter', [])
    .filter('cartType' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var name = ''
            switch(val){
                case 1 : name =  "身份证"; break;
                case 2 : name =  "组织机构代码证"; break;
                case 3 : name =  "护照"; break;
                case 4 : name =  "士官证"; break;
                case 5 : name =  "港奥通行证"; break;
                case 6 : name =  "'其它（手填）"; break;
                default : name =  "身份证"; break;
            }
            return  name;
        }
    }])
    .filter('upDigit' ,[ "$filter" ,function( $filter ){
        return function( val ){
            var n = val ;
            /** 数字金额大写转换(可以处理整数,小数,负数) */
            var fraction = ['角', '分'];
            var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
            var head = n < 0? '欠': '';
            n = Math.abs(n);

            var s = '';

            for (var i = 0; i < fraction.length; i++)
            {
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
            }
            s = s || '整';
            n = Math.floor(n);

            for (var i = 0; i < unit[0].length && n > 0; i++)
            {
                var p = '';
                for (var j = 0; j < unit[1].length && n > 0; j++)
                {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
            }
            return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
        }
    }])
