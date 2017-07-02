

var MLottery = function(selector , options){
    this.init.call(this,selector , options)
}

MLottery.prototype = {
    init : function( selector , options ){
        var _this = this;
        this.options = $.extend( {} , {
            result : 4,
            callback : null
        }  , options)
        this.$ = $(selector);
        this.index = 0 ;//当前亮区位置
        this.prevIndex = 0 ; //前一位置
        this.speed = 300 ;//初始速度
        this.endIndex=0,           //决定在哪一格变慢
        this.tb = $('[data-tb]', this.$)[0];    //获取tb对象
        var row =  $(this.tb).find('tr:eq(0)').find('td').length ;
        var col =  $(this.tb).find('tr').length ;
        this.arr = this.getSide( col ,row); //初始化数组
        this.cycle=0,           //转动圈数
        this.endCycle=0,           //计算圈数
        this.flag=false,           //结束转动标志
        this.quick=0;           //加速
        this.btn = $('[data-play]', this.$).off('click.MLottery').on('click.MLottery',function(){
            if( $(this).hasClass('btn-disabled')){
                return ;
            }
            $(this).prop('disabled', true).addClass('btn-disabled')
            _this.start();
        })
        return this;
    },
    getSide : function( m,n ){
        //初始化数组
        var arr = [];
        for(var i=0;i<m;i++){
            arr.push([]);
            for(var j=0;j<n;j++){
                arr[i][j]=i*n+j;
            }
        }
        //获取数组最外圈
        var resultArr=[];
        var tempX=0,
            tempY=0,
            direction="Along",
            count=0;
        while(tempX>=0 && tempX<n && tempY>=0 && tempY<m && count<m*n)
        {
            count++;
            resultArr.push([tempY,tempX]);
            if(direction=="Along"){
                if(tempX==n-1)
                    tempY++;
                else
                    tempX++;
                if(tempX==n-1 && tempY==m-1)
                    direction="Inverse"
            }
            else{
                if(tempX==0)
                    tempY--;
                else
                    tempX--;
                if(tempX==0&&tempY==0)
                    break;
            }
        }
        return resultArr;
    },
    start : function(){
        var _this = this;
        clearInterval(this.time);
        this.cycle=0;
        this.flag=false;
        this.endIndex=Math.floor(Math.random()*16);
        //EndCycle=Math.floor(Math.random()*4);
        this.endCycle=1;
        this.time=setInterval(function(){
            _this._star();
        },this.speed);
        return this;
    },
    _star : function(){
        //跑马灯变速
        var _this = this;
        if(this.flag==false){
            //走五格开始加速
            if(this.quick==5){
                clearInterval(this.time);
                this.speed=50;
                this.time=setInterval(function(){
                    _this._star();
                },this.speed);
            }
            //跑N圈减速
            if(this.cycle==this.endCycle+1 && this.index==parseInt(this.endIndex)){
                clearInterval(this.time);
                this.speed=300;
                this.flag=true;       //触发结束
                this.time=setInterval(function(){
                    _this._star();
                },this.speed);
            }
        }

        if(this.index>=this.arr.length){
            this.index = 0;
            this.cycle++;
        }

        //结束转动并选中号码
        //trim里改成数字就可以减速，变成Endindex的话就没有减速效果了
        if(this.flag==true && this.index==parseInt($.trim( this.options.result ))-1){
            this.quick=0;
            clearInterval(this.time);
            this.options.callback && this.options.callback.call( this );
            this.btn.removeClass('btn-disabled').prop('disabled', false);
        }
        this.tb.rows[this.arr[this.index][0]].cells[this.arr[this.index][1]].className="playcurr";
        if(this.index>0)
            this.prevIndex = this.index-1;
        else{
            this.prevIndex = this.arr.length-1;
        }
        this.tb.rows[this.arr[this.prevIndex][0]].cells[this.arr[this.prevIndex][1]].className="playnormal";
        this.index++;
        this.quick++;
        return this;
    }
}
