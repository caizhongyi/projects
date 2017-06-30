<?php defined('IN_IA') or exit('Access Denied');?><?php  include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="main">
      <div id="recent-box" class="widget-box transparent">
              <div class="page-header">
                  <h1><i class="icon-dashboard"></i> 数据汇总</h1>
              </div>

                <div class="widget-body">
                    <div class="widget-main padding-4">
                        <div class="alert alert-warning alert-mini">
                            <a  class="alert-enter">
                                <i class="icon-cog"></i>管理 ＞
                            </a>
                            <h4><?php  echo $_W['account']['name'];?><small><?php  if($_W['account']['type'] ==1) { ?>（微信公众号）<?php  } else if($_W['account']['type']==2) { ?>（易信公众号）<?php  } ?></small></h4>
                        </div>

                        <div class="infobox-container">
                            <div class="infobox infobox-master infobox-dark">
                                <div class="infobox-icon btn-success">
                                    <i class="icon-comment"></i>
                                </div>

                                <div class="infobox-data">
                                    <div class="infobox-content">新消息</div>
                                    <div class="infobox-content"><a href="<?php  echo create_url('site/module/history',array('name'=>'stat'))?>"><?php  echo $current_wechats['response']['today'];?></a></div>
                                </div>
                            </div>

                            <div class="infobox infobox-master infobox-dark">
                                <div class="infobox-icon btn-warning">
                                    <i class="icon-user"></i>
                                </div>

                                <div class="infobox-data">
                                    <div class="infobox-content">新增用户数</div>
                                    <div class="infobox-content"><a href="<?php  echo create_url('site/module/display',array('name'=>'fans'))?>"><?php  echo $current_wechats['fans']['todayjoin'];?></a></div>
                                </div>
                            </div>

                            <div class="infobox infobox-master infobox-dark">
                                <div class="infobox-icon btn-info">
                                    <i class="icon-rocket"></i>
                                </div>

                                <div class="infobox-data">
                                    <div class="infobox-content">活跃用户数</div>
                                    <div class="infobox-content"><a href="<?php  echo create_url('site/module/display',array('name'=>'fans'))?>"><?php  echo $current_wechats['fans']['total'];?></a></div>
                                </div>
                            </div>
                        </div>

                        <div class="text-right slider-option"><a href="javascript:;">展开趋势分析 ＞</a></div>


            <div class="slider-panel" >
                           <div  class="widget-box transparent">
                            <div class="widget-header">
                                <div class="widget-toolbar no-border">
                                    <ul id="recent-tab" class="nav nav-tabs">
                                        <li class="active">
                                            <a href="#task-tab" data-toggle="tab">新消息</a>
                                        </li>

                                        <li>
                                            <a href="#newfans-tab" data-toggle="tab">新增用户数</a>
                                        </li>

                                          <li>
                                                <a href="#member-tab" data-toggle="tab">活跃用户数</a>
                                           </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                           <div class="tab-content padding-8 overflow-visible">
                            <div class="tab-pane active" id="task-tab">
                                <div class="sub-item">
                                    <h4 class="sub-title">用户消息趋势图</h4>
                                    <div class="sub-content" id="pv-trend"></div>
                                </div>
                            </div>

                            <div class="tab-pane" id="newfans-tab" style="display: block">
                                <div class="sub-item">
                                    <h4 class="sub-title">新增用户趋势图</h4>
                                    <div class="sub-content" id="newfans-trend"></div>
                                </div>
                            </div>
                           <div class="tab-pane" id="member-tab" style="display: block">
                               <div class="sub-item">
                                   <h4 class="sub-title">活跃用户趋势图</h4>
                                   <div class="sub-content" id="uv-trend"></div>
                               </div>
                           </div>
                               <script type="text/javascript">
                                   var day = ['<?php  echo implode('\',\'', $day)?>'];
                                   function initchart(id, options) {
                                       var defaults = {
                                           chart: {
                                               renderTo:id,
                                               zoomType:'xy',
                                               type:'areaspline',
                                               backgroundColor:'#F3F3F3'
                                           },
                                           title: {
                                               text: ""
                                           },
                                           credits:{
                                               enabled:false
                                           },
                                           yAxis: [{ // Secondary yAxis
                                               title: {
                                                   text: ""
                                               },
                                               labels: {
                                                   formatter: function() {
                                                       return this.value + '个';
                                                   },
                                                   style: {
                                                       color: '#666',
                                                       fontFamily:'Microsoft yahei'
                                                   }
                                               },
                                               gridLineColor:"#D2D1D1",
                                               allowDecimals:false
                                           }],
                                           xAxis: [{
                                               labels:{
                                                   formatter: function() {
                                                       return this.value;
                                                   },
                                                   style: {
                                                       color: '#000'
                                                   }
                                               },
                                               title: {
                                                   text: '',
                                                   style: {
                                                       color: '#7eafdd'
                                                   }
                                               },
                                               lineColor: "#8E8E8F",
                                               lineWidth: 2
                                           }],
                                           legend: {
                                               enabled:false
                                           },
                                           labels: {
                                               style: {
                                                   color: '#CCC'
                                               }
                                           },
                                           tooltip:{
                                               backgroundColor:'#525253',
                                               borderColor:"#000",
                                               style:{
                                                   color: "#fff"
                                               },
                                               headerFormat:'',
                                               pointFormat: '<b style="font-family:Microsoft yahei">{point.y}个</b>'
                                           },
                                           plotOptions: {
                                               areaspline: {
                                                   fillColor: "rgba(190,216,240,0.7)"
                                               }
                                           },
                                           exporting: {
                                               enabled: false
                                           },
                                           series: [{
                                               name: '触发次数'
                                           }]
                                       };
                                       var config = $.extend({}, defaults, options);
                                       return new Highcharts.Chart(config);
                                   }
                                   $(function(){

                                       new initchart('pv-trend', {
                                           series: [{
                                               data: [<?php  echo $hit_series;?>]
                                           }],
                                           xAxis: [{
                                               categories: day
                                           }]
                                       });
                                       new initchart('newfans-trend', {
                                           series: [{
                                               data: [<?php  echo $newfans_series;?>]
                                           }],
                                           xAxis: [{
                                               categories: day
                                           }]
                                       });
                                       new initchart('uv-trend', {
                                           series: [{
                                               data: [<?php  echo $users_series;?>]
                                           }],
                                           xAxis: [{
                                               categories: day
                                           }]
                                       });
                                       $('#member-tab').css('display','');
                                       $('#newfans-tab').css('display','');
                                   });
                               </script>
                               <script type="text/javascript" src="./resource/script/highcharts.js"></script>
                        </div>
                        </div>

                        <script type="text/javascript">
                            $(function(){
                                $('.slider-option').click(function(){
                                    $(this).next().stop(true,true).slideToggle();
                                })
                            })
                        </script>
                    </div><!-- /widget-main -->
                </div><!-- /widget-body -->
            </div><!-- /widget-box -->
        <!--<div class="col-sm-4">
            <div class="widget-box transparent">
                <div class="widget-header widget-header-flat">
                    <h4 class="lighter">
                        二维码及头像
                    </h4>

                    <div class="widget-toolbar">
                        <a data-action="collapse" href="#">
                            <i class="icon-chevron-up"></i>
                        </a>
                    </div>
                </div>

                <div class="widget-body"><div class="widget-body-inner" >
                    <div class="widget-main padding-20 center">
                        <img src="./resource/image/code.jpg" alt=""/><br><br>
                        <img src="./resource/image/card.jpg" alt=""/>
                    </div>&lt;!&ndash; /widget-main &ndash;&gt;
                </div></div>&lt;!&ndash; /widget-body &ndash;&gt;
            </div>&lt;!&ndash; /widget-box &ndash;&gt;

            <div class="widget-box transparent">
                <div class="widget-header widget-header-flat">
                    <h4 class="lighter">
                        系统公告
                    </h4>

                    <div class="widget-toolbar">
                        <a data-action="collapse" href="#">
                            <i class="icon-chevron-up"></i>
                        </a>
                    </div>
                </div>

                <div class="widget-body"><div class="widget-body-inner" >
                    <div class="widget-main padding-4">
                        <ul class="list nav-list list-striped">
                            <li><span class="pull-right">5.633</span><span class="list-info">文字内容文字……</span></li>
                            <li><span class="pull-right">5.633</span><span class="list-info">文字内容文字……</span></li>
                            <li><span class="pull-right">5.633</span><span class="list-info">文字内容文字……</span></li>
                            <li><span class="pull-right">5.633</span><span class="list-info">文字内容文字……</span></li>
                            <li><span class="pull-right">5.633</span><span class="list-info">文字内容文字……</span></li>
                            <li><span class="pull-right">5.633</span><span class="list-info">文字内容文字……</span></li>
                            <li><span class="pull-right">5.633</span><span class="list-info">文字内容文字……</span></li>
                        </ul>
                    </div>&lt;!&ndash; /widget-main &ndash;&gt;
                </div></div>&lt;!&ndash; /widget-body &ndash;&gt;
            </div>&lt;!&ndash; /widget-box &ndash;&gt;
        </div>-->
    </div>
    <br>
    <div class="alert alert-mini alert-warning">
        <h4>快捷操作</h4>
    </div>

    <div class="btn-infobox">
        <a href="<?php  echo create_url('rule/system');?>" class="btn btn-sm btn-grey"> 首次关注欢迎语 </a>
        <a href="<?php  echo create_url('rule/post');?>" class="btn btn-sm btn-info"> 关键字回复 </a>
        <a href="<?php  echo create_url('menu');?>" class="btn btn-sm btn-primary"> 自定义菜单 </a>
        <a href="<?php  echo create_url('rule/post');?>" class="btn btn-sm btn-danger"> 规则设置 </a>
        <a href="<?php  echo create_url('index/module', array('name' => 'lotery','do'=>'customlist'))?>" class="btn btn-sm btn-light"> 幸运大转盘 </a>
        <a href="<?php  echo  create_url('index/module', array('name' => 'egg','do'=>'customlist'))?>" class="btn btn-sm btn-lighter"> 砸蛋 </a>
        <a href="<?php  echo  create_url('site/rule')?>" class="btn btn-sm btn-pink"> 微官网 </a>
        <a href="<?php  echo create_url('micromember/rule')?>" class="btn btn-sm btn-purple"> 微会员 </a>
    </div>

</div>

<?php  include template('common/footer', TEMPLATE_INCLUDEPATH);?>