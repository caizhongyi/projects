/*

 *	添加搜索标签栏

 */

$.like_tag_new = {
    limit_count : 9, //
    /**
     * @type int
     * @description 显示的最大标签个数
     * */
    taglimt : 4,
    /**
     * @description 缓存
     * */
    cache : [],
    tags : ['地下城与勇士','穿越火线','时空裂痕'],
    $ : $(function(){ return $('.recom-news')}),
    /**
     * @description : 初始化
     * */
    init : function(){
        //  var defaultTags = ['植物大战僵尸','穿越火线','剑灵'];

        if(!this.get_cookie('user_all_tags')){
            this.set_cookie('user_all_tags',this.tags);
        }
        else{
            this.tags = this.get_cookie('user_all_tags').split(',');
        }

        for(var i = 0 ; i < this.tags.length; i ++){
            this.add(this.tags[i],true);
        }

        return this.ui();
    },
    getTagItems : function(){
        return $('#tag_content .hd-item',this.$).not('[data-removed]');
    },
    getSubTagItems : function(){
        return $('.tag-more li',this.$).not('.arrow,[data-removed]');
    },
    /**
     * @description : 初始化ui
     * */
    ui : function(){
        var _this = this;

        $('.tag-more',this.$).off('click.tag-more').on('click.tag-more',function(e){

            console.log(1)
            if(e.target.tagName == 'LI'){
                if(!$(this).hasClass('.arrow')){
                    var first = _this.getTagItems().eq(1);
                    _this.swap($(e.target),first)
                        .page(first);
                }
            }

        }).off('mouseenter.tagmore').on('mouseenter.tagmore','li',function(){
                $(this).find('.delete').show();
            }).off('mouseleave.tagmore').on('mouseleave.tagmore','li',function(){
                $(this).find('.delete').hide();
            });

        $('#tag_content', this.$).off('mouseenter.recom-news').on('mouseenter.recom-news','.hd-item',function(){
            _this.page($(this));
        }).off('click.close').on('click.close','.close,.delete',function(e){

                console.log(1)
                _this.remove($(this));
                return false;
            });

        $('#tag-search-btn' , this.$).off('click.search-add').on('click.search-add',function(){
            console.log(1)
            var val = $('#like_tag',_this.$).val();
            _this.add(val);
        });

        return this;
    },
    /**
     * @description : 翻页
     * */
    page : function(index){

        var item = index,
            items = this.getTagItems();
        if(typeof index == 'number'){
            item = items.eq(index);
        }

        items.removeClass('active');
        var keyword = item.addClass('active').text();

        var $daodu = $('#daodu');
        var $tag_contianer =  $('#tag_contianer');

        if(item.hasClass('daodu')){
            $daodu.stop(true,true).fadeIn();
            $tag_contianer.hide();
        }
        else{
            $tag_contianer.stop(true,true).fadeIn();
            $daodu.hide();
            this.getData(keyword);
        }
        return this;
    },
    /**
     * @description :获取数据
     * */
    getData : function(keyword){
        var _this = this;

        for(var i = 0 ; i < this.cache.length; i ++ ){
            if(this.cache[i]['key'] == keyword){
                $("#tag_contianer").hide().html(this.cache[i]['content']).stop(true,true).fadeIn();
                return;
            }
        };

        $.ajax({
            url:'http://search.766.com/search_api.php',
            dataType:'json',
            type:'get',
            data:'Keywords=' + keyword + '&callback=?',
            success:function (data) {
                if (data != "") {
                    $("#tag_contianer").hide().html(data).stop(true,true).fadeIn();
                    _this.cache.push({
                        key : keyword,
                        content : data
                    });

                } else {
                    var tag = $(".recom-news-tip").stop(true,true).fadeIn();
                    $("#tag_contianer").html('');
                    _this.cache.push({
                        key : keyword,
                        content : ''
                    });
                    setTimeout(function(){
                        tag.stop(true,true).hide();
                    }, 2000);//3秒
                }

            }
        });
        return this;
    },
    add : function(val,notsave){
        var _this = this;

        /* if (this.limit_count == 9) {
         cookie_tag_arr.shift();	//移除数组第一个元素
         }*/

        var like_tag = val || $("#like_tag",this.$).val();
        if (like_tag.length > 8) {
            alert('标签字数限制');
            return this;
        }

        if(like_tag == '' || like_tag == null){
            alert('请输入标签内容');
            return this;
        }

        if (isEnglish(like_tag)) {
            if (like_tag.length <= 2) {
                alert('请输入大于两个字符的标签内容');
                return this;
            }
        }

        if (isChinese(like_tag)) {
            if (like_tag.length > 8) {
                alert('请输入小于八个字符的汉字内容');
                return this;
            }
        }

        var item = $('<li class="hd-item"  title="'+ val +'">'+ val +'<em></em></li>').hide().append($('<a  class="close" target="_self" href="javascript:void(0)"></a>')).insertAfter($('.daodu',this.$)).animate({ width : 'show'});

        var items = this.getTagItems();
        if(items.length > this.taglimt){
            this.addsub(items.last().text());
            items.last().remove();
            $('#more').show();
        }

        if(!notsave){
            this.tags.push(val);
            this.save_tags_cookie();
            this.page(item);
        }


        return this;
    },
    remove : function(tag){
        var _this = this;
        var val = tag.closest('li').text();

        tag.closest('li').attr('data-removed','true').stop(true).fadeOut(function(){
            $(this).remove();
        });
        var len = this.getTagItems().length ;

        for(var i = 0 ; i < this.tags.length ; i ++ ){
            if(val.replace(/^\s+|\s+$/g, '') == this.tags[i]){
                this.tags.splice(i,1);
            }
        };

        if(len < this.taglimt){
            this.moveToMain();
        }

        if(!this.getSubTagItems().length){
            $('#more').hide();
        }

        if(!tag.closest('.tag-more').length && !this.getTagItems().filter('.active').length){
            this.page($('#tag_content .daodu'));
        }
        this.save_tags_cookie();
        return this;
    },

    moveToMain : function(){
        var last =  this.getSubTagItems().last();
        if(last.length){
            var val = last.text();
            this.addmain(val);
            last.remove();
        }
        return this;
    },
    moveToSub : function(){
        var last =  this.getTagItems().last();
        if(last.length){
            var val = last.text();
            this.addsub(val);
            last.remove();
        }
        return this;
    },
    addmain : function(val){
        $('<li class="hd-item" title="'+ val +'">'+val +'<em></em><a class="close" target="_self" href="javascript:void(0)"></a></li>').insertBefore($('#more'));
        return this;
    },
    addsub : function(val){
        $('#more .tag-more').append('<li  title="'+ val +'">'+ val +'<input class="delete" value="" title="移除该标签" type="submit"></li>');
        return this;
    },
    swap : function(item1,item2){
        var val = item1.text();
        item1.text(item2.text()).append('<input class="delete" value="" title="移除该标签" type="submit">').attr('title',item2.text());
        item2.text(val).append('<em></em><a class="close" target="_self" href="javascript:void(0)"></a>').attr('title',val);
        return this;
    },
    //cookies
    save_tags_cookie:function (val) {
        this.set_cookie('user_all_tags',val||this.tags);
        return this;
    },
    set_cookie : function(name,val){
        delCookie(name);
        addCookie(name, val);
        return this;
    },
    get_cookie : function(name){
        return getCookie(name);
    },
    /*
     *	重置cookies
     */
    reset_cookie : function(cookie, replace_tag) {
        /*   delCookie('all_tag_cookie_new');
         addCookie('all_tag_cookie_new', cookie);
         delCookie('replace_tag');
         addCookie('replace_tag', replace_tag);*/
        return this;
    }
}


function isEnglish(name) {
    if (name.length == 0)
        return false;
    for (i = 0; i < name.length; i++) {
        if (name.charCodeAt(i) > 128)
            return false;
    }
    return true;
}

function isChinese(name) {
    if (name.length == 0)
        return false;
    for (i = 0; i < name.length; i++) {
        if (name.charCodeAt(i) > 128)
            return true;
    }
    return false;
}


// JavaScript Document

function strlen_s(s, n) {//获得截取字符串的最后一个字符位置 s为字符串  n截取位数
    var len = 0;
    var flag = 0;
    var a = s.split("");
    if (a.length == 0)flag = 0;

    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            len++;
        } else {
            len += 2;
        }
        if (len > n) {
            flag = i;
            break;
        }
    }
    if (flag > 0) { //说明字符长度大于n=12位
        str = s.substring(0, flag); //截取
        return str + '..';
    } else {
        str = s;
        return str;
    }
}