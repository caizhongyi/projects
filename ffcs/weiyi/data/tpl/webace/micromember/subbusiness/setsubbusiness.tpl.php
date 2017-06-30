<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微会员'),array('title'=>'管理分店'),array('title'=>'分店设置'))?>
<?php $load_js=array('map');?>
<?php $load_css=array('resource');?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 分店设置
    </h1>
</div>
<ul class="nav nav-tabs">
    <li class="active"><a href="<?php echo create_url('micromember/setsubbusiness',array('type'=>'edit'))?>">添加分店</a></li>
    <li ><a href="<?php echo create_url('micromember/setsubbusiness',array('type'=>'list'))?>">管理分店</a></li>
</ul>

<div class="main">
    <form action="" method="post" class="form-horizontal form" style="margin-top: 20px;">
        <input name="type" type="hidden" value="post"/>
        <input name="id" type="hidden" value="<?php echo $subbusiness_setting['id'];?>"/>
        <table id="form"
               class="tb reply-news-edit">
            <tr>
                <th>分店名称</th>
                <td><input type="text" id="" class="span7" placeholder=""
                           name="name" value="<?php echo $subbusiness_setting['name'];?>"></td>
            </tr>
            <tr>
                <th>图文消息封面</th>
                <td>
                    <div id="" class="uneditable-input reply-edit-cover">
                        <div class="detail">
                            <span class="pull-right">大图片建议尺寸：700像素 * 300像素</span>
                            <input
                                    type="button" id="frontcover"
                                    fieldname="frontcover"
                                    class="btn btn-sm btn-primary reply-edit-cover-upload"
                                    value="<i class='icon-upload-alt'></i> 上传" style="" />
                            <button type="button" class="btn btn-sm"
                                    id="upload-delete" onclick="doDeleteItemImage(this, 'frontcover')"
                                    style="<?php if(empty($business_setting['frontcover'])) { ?> display:none;<?php } ?>">
                                <i class="icon-remove"></i> 删除</button>
                        </div>
                        <?php if(!empty($subbusiness_setting)) { ?> <input type="hidden"
                                                              name="frontcover" value="<?php echo $subbusiness_setting['frontcover'];?>">
                        <div id="upload-file-view" class="upload-view">
                            <img width="100" src="<?php echo $_W['attachurl'];?><?php echo $subbusiness_setting['frontcover'];?>">&nbsp;&nbsp;
                        </div>
                        <?php } else { ?>
                        <div id="upload-file-view"></div>
                        <?php } ?>
                    </div>
                </td>
            </tr>
            <script type="text/javascript">
                kindeditorUploadBtn($('#frontcover'));
            </script>
            <tr>
                <th>描述</th>
                <td><textarea style="height: 80px;" class="span7" cols="70" id="description"
                              name="description"><?php echo $subbusiness_setting['description'];?></textarea>
                </td>
            </tr>
            <script type="text/javascript">
                kindeditor($('#description'));
            </script>
            <tr>
                <th>分店所在地区</th>
                <td><select name="area_p" id="area_p">
                </select>
                    <select name="area_c" id="area_c">
                    </select>
                    <select name="area_a" id="area_a">
                    </select>
                    <script src="./resource/script/region_select.js"></script>
                    <script type="text/javascript">
                        new PCAS("area_p", "area_c", "area_a", '<?php echo $subbusiness_setting['area_p'];?>', '<?php echo $subbusiness_setting['area_c'];?>', '<?php echo $subbusiness_setting['area_a'];?>');
                    </script>
                </td>
            </tr>
            <tr>
                <th>商家类别</th>
                <td><select name="category_f" id="category_f">
                </select><select name="category_s" id="category_s"></select>
                </td>
            </tr>
            <script src="./resource/script/category.js"></script>
            <script type="text/javascript">
                new CS("category_f", "category_s", '<?php echo $category_f;?>',  '<?php echo $category_s;?>', '美食-美食$本帮江浙菜-本帮江浙菜,川菜-川菜,粤菜-粤菜,湘菜-湘菜,贵州菜-贵州菜,东北菜-东北菜,台湾菜-台湾菜,新疆/清真菜-新疆/清真菜,西北菜-西北菜,素菜-素菜,火锅-火锅,自助餐-自助餐,小吃快餐-小吃快餐,日本-日本,韩国料理-韩国料理,东南亚菜-东南亚菜,西餐-西餐,面包甜点-面包甜点,其他-其他#休闲娱乐-休闲娱乐$密室-密室,咖啡厅-咖啡厅,酒吧-酒吧,茶馆-茶馆,KTV-KTV,电影院-电影院,文化艺术-文化艺术,景点/郊游-景点/郊游,公园-公园,足疗按摩-足疗按摩,洗浴-洗浴,游乐游艺-游乐游艺,桌球-桌球,桌面游戏-桌面游戏,DIY手工坊-DIY手工坊,其他-其他#购物-购物$综合商场-综合商场,食品茶酒-食品茶酒,服饰鞋包-服饰鞋包,珠宝饰品-珠宝饰品,化妆品-化妆品,运动户外-运动户外,亲子购物-亲子购物,品牌折扣店-品牌折扣店,数码家电-数码家电,家居建材-家居建材,特色集市-特色集市,书店-书店,花店-花店,眼镜店-眼镜店,超市/便利店-超市/便利店,药店-药店,其他-其他#丽人-丽人$美发-美发,美容/SPA-美容/SPA,化妆品-化妆品,瘦身纤体-瘦身纤体,美甲-美甲,瑜伽-瑜伽,舞蹈-舞蹈,个性写真-个性写真,整形-整形,齿科-齿科,其他-其他#结婚-结婚$婚纱摄影-婚纱摄影,婚宴-婚宴,婚戒首饰-婚戒首饰,婚纱礼服-婚纱礼服,婚庆公司-婚庆公司,彩妆造型-彩妆造型,司仪主持-司仪主持,婚礼跟拍-婚礼跟拍,婚车租赁-婚车租赁,婚礼小商品-婚礼小商品,婚房装修-婚房装修,其他-其他#亲子-亲子$幼儿教育-幼儿教育,亲子摄影-亲子摄影,亲子游乐-亲子游乐,亲子购物-亲子购物,孕产护理-孕产护理,其他-其他#运动健身-运动健身$游泳馆-游泳馆,羽毛球馆-羽毛球馆,健身中心-健身中心,瑜伽-瑜伽,舞蹈-舞蹈,篮球场-篮球场,网球场-网球场,足球场-足球场,高尔夫场-高尔夫场,保龄球馆-保龄球馆,桌球馆-桌球馆,乒乓球馆-乒乓球馆,武术场馆-武术场馆,体育场馆-体育场馆,其他-其他#酒店-酒店$五星级酒店-五星级酒店,四星级酒店-四星级酒店,三星级酒店-三星级酒店,经济型酒店-经济型酒店,公寓式酒店-公寓式酒店,精品酒店-精品酒店,青年旅舍-青年旅舍,度假村-度假村,其他-其他#爱车-爱车$4S店/汽车销售-4S店/汽车销售,汽车保险-汽车保险,维修保养-维修保养,配件/车饰-配件/车饰,驾校-驾校,汽车租赁-汽车租赁,停车场-停车场,加油站-加油站,其他-其他#生活服务-生活服务$旅行社-旅行社,培训-培训,室内装潢-室内装潢,宠物-宠物,齿科-齿科,快照/冲印-快照/冲印,家政-家政,银行-银行,学校-学校,团购网站-团购网站,其他-其他#其他-其他$其他-其他');
            </script>
            <tr>
                <th>分店详细地址</th>
                <td><input type="text" id="" class="span7" placeholder=""
                           name="address" value="<?php echo $subbusiness_setting['address'];?>"></td>
            </tr>
            <tr>
                <th>分店联系方式</th>
                <td><input type="text" id="" class="span7" placeholder=""
                           name="phonenum" value="<?php echo $subbusiness_setting['phonenum'];?>"></td>
            </tr>
            <script src="http://api.map.baidu.com/api?key=549717558167eff9640bd18067ec919a&v=1.1&services=true" type="text/javascript" type="text/javascript"></script>
            <tr>
                <th>经纬度</th>
                <td>
                    <div class="input-append">
                        <input type="text" id="suggestId" class="input-xlarge" name="place" value="<?php echo $subbusiness_setting['place'];?>" data-rule-required="true" />
                        <button class="btn btn-sm btn-primary" type="button" id="positioning">搜索</button>
                    </div>

                    <span class="maroon">注意：这个只是模糊定位，准确位置请地图上标注!</span>
                    <div id="l-map">
                        <i class="icon-spinner icon-spin icon-large"></i>地图加载中...
                    </div>
                    <div id="r-result">
                        <input type="text" id="lng" name="lng" value="<?php echo $subbusiness_setting['lng'];?>" /><input type="text" id="lat" name="lat" value="<?php echo $subbusiness_setting['place'];?>" />
                    </div>
                </td>
            </tr>
            <script type="text/javascript">
                $(function () {
                    var lat = "<?php echo $subbusiness_setting['lat'];?>";
                    var lng = "<?php echo $subbusiness_setting['lng'];?>";
                    var place = "<?php echo $subbusiness_setting['place'];?>";
                    if(lat=="0.00000000000" || lat == ""){
                        lat = "26.117184192871";
                    }
                    if(lng=="0.00000000000" || lng == ""){
                        lng = "119.27552212129";
                    }
                    if(place==""){
                        place = "福建省福州市鼓楼区软件大道";
                    }
                    var op = {
                        lat: lat,
                        lng: lng,
                        adr: place
                    }
                    baidu_map(op);
                })
            </script>
            <tr>
                <th></th>
                <td>
                    <input name="submit" type="submit" value="提交" class="btn btn-sm btn-primary" />
                    <input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
                </td>
            </tr>
        </table>
    </form>
</div>

<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
