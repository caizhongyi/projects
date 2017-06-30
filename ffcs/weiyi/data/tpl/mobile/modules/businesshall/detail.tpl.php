<?php defined('IN_IA') or exit('Access Denied');?><?php  include $this->template('header', TEMPLATE_INCLUDEPATH);?>

<link type="text/css" rel="stylesheet" href="./source/modules/businesshall/images/common.css">
<script type="text/javascript" src="./source/modules/businesshall/images/jquery.spinner.min.js"></script>

<div class="header clearfix">
    <a class="go_link" onclick="history.go(-1);" href="###"><b></b></a>
    <a class="go_home" href="<?php  echo $this->createMobileUrl('list');?>"></a>
</div>
<form action="" method="post">
    <input type="hidden" name="id" value="<?php  echo $goodsid;?>" />

    <div id="banner_box" class="box_swipe">
        <ul>
            <li> <?php  if(!empty($goods['thumb'])) { ?><img src="<?php  echo $_W['attachurl'];?><?php  echo $goods['thumb'];?>" /><?php  } ?></li>
            <li> <?php  if(!empty($goods['thumb'])) { ?><img src="<?php  echo $_W['attachurl'];?><?php  echo $goods['thumb'];?>" /><?php  } ?></li>
        </ul>
        <ol>
            <li class="on"></li>
            <li></li>
        </ol>
    </div>
    <script>
        $(function(){
            new Swipe(document.getElementById('banner_box'), {
                speed:500,
                auto:3000,
                callback: function(){
                    var lis = $(this.element).next("ol").children();
                    lis.removeClass("on").eq(this.index).addClass("on");
                }
            });
        });
    </script>


    <div class="container">
        <h1><?php  echo $goods['title'];?></h1>
        <div class="form ">
            <div class="form-group">
                <span class="form-label">售价:</span>￥<span class="price" data-unitprice="<?php  echo $goods['marketprice'];?>"><?php  echo $goods['marketprice'];?></span>
            </div>
            <div class="form-group">
                <span class="form-label">简介:</span><?php  echo $goods['description'];?></span>
            </div>
            <div class="form-group">
                <span class="form-label">购买数量:</span>
                <?php  if($goods['total']!=0) { ?>
                <span class="input-group input-spinner spinner-large">
                    <a class="add-on spinner-down" href="javascript:;">-</a><input type="text" name="count"   data-max="<?php  if($goods['total'] == -1) { ?>100000000<?php  } else { ?><?php  echo $goods['total'];?><?php  } ?>" data-min="1"  value="1"/><a class="add-on spinner-up"  href="javascript:;">+</a>
                </span>&nbsp;
                <?php  } ?>
                <?php  if($goods['total'] != -1) { ?>
                    剩余<strong><?php  echo $goods['total'];?></strong>件
                <?php  } ?>
                <script type="text/javascript">
                    function accMul(arg1,arg2)
                    {
                        var m=0,s1=arg1.toString(),s2=arg2.toString();
                        try{m+=s1.split(".")[1].length}catch(e){}
                        try{m+=s2.split(".")[1].length}catch(e){}
                        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
                    }
                    //给Number类型增加一个mul方法，调用起来更加方便。
                    Number.prototype.mul = function (arg){
                        return accMul(arg, this);
                    };
                    $(function(){
                        $('.input-spinner').spinner().on('changed',function( e , val ,  increate ){
                            var $price = $('.price');
                            $price.html(parseFloat($price.attr('data-unitprice')).mul(val));
                        }).trigger('changed',parseFloat($('.input-spinner input').val()))
                    })
                </script>
            </div>
            <div class="form-group">
                <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
                <?php  if($goods['total']!=0) { ?>
                <input class="btn btn-buy" type="button" id="joincard" value="加入购物车" name="submit">
                <input class="btn btn-addcard" id="buy" type="button" value="立即购买" >
                <input class="btn btn-default" type="button" id="mycard" value="我的购物车" >
                <?php  } else { ?>
                <a class="btn  btn-default " href="<?php  echo $this->createMobileUrl('list');?>"><i class="icon-plus"></i> 再逛逛</a>
                <?php  } ?>
                <script type="text/javascript">
                    $(function(){
                        $('#mycard').click(function(){
                            window.location.href="<?php  echo $this->createMobileUrl('mycart')?>";
                        })
                        var timer ;
                        $('#joincard').click(function(){
                            $.post( window.location.href ,{
                                count : $('[name=count]').val(),
                                id :$('[name=id]').val(),
                                submit : $(this).val(),
                                token : $('[name=token]').val()
                            },function(data){
                                var html = "";
                                if( data.type = "success"){
                                    html += '<div class="text-center tipbox-footer"><a  href="<?php  echo $this->createMobileUrl('list');?>">再逛逛</a>&nbsp;<a href="<?php  echo $this->createMobileUrl('mycart')?>">去结算</a></div>';
                                }
                                $('.tipbox').html(data.message + html).show();
                            }, 'json');
                        })

                        $('#buy').click(function(){
                            $.post( window.location.href ,{
                                count : $('[name=count]').val(),
                                id :$('[name=id]').val(),
                                submit : $(this).val(),
                                token : $('[name=token]').val()
                            },function(data){
                                if(data.type == 'success'){
                                   window.location.href= "<?php  echo $this->createMobileUrl('mycart')?>" ;
                                }
                                else{
                                    $('.tipbox').html(data.message).show();
                                }
                            }, 'json');
                        })
                    })
                    $('.tipbox').click(function(e){e.stopPropagation();})
                    $(window).click(function(){ $('.tipbox').hide(); })
                </script>
        </div>
    </div>

    <div class="mobile-div img-rounded">
        <div class="mobile-hd">商品详细描述</div>
        <div class="mobile-content">
            <?php  echo $goods['content'];?>
        </div>
    </div>
</form>
 <div class="tipbox"></div>
<?php  include $this->template('footer', TEMPLATE_INCLUDEPATH);?>