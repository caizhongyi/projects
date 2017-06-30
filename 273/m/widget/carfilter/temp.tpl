
<div class="shaixuan">
    <!--<div class="shaixuan-left">-->
    <!--<span class="back">>></span>-->
    <!--</div>-->
    <div class="shaixuan-right" style="right: -100%;">
        <div id="main_page" class="shaixuan-page show" data-widget="app/wap_v2/js/sale/filter.js#filter" data-plateform="<?php echo $this->plateForm?>">
            <div class="shaixuan-header">
                <span class="reback"><a href="javascript:void(0);">返回</a></span>
                <span id="clear" class="del" data-273-click-log="/wap/list/choice@etype=click@choice=clear">清空条件</span>
            </div>
            <div id="main_wrap">
                <div class="shaixuan-list">
                    <ul class="row">

                        <li id="district">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=place">
                                <span class="shaixuan-type-name">地区</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>


                        <li id="type">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=type">
                                <span class="shaixuan-type-name">级别</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>
                        <li id="brand">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=brand">
                                <span class="shaixuan-type-name">品牌</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                        </li>
                        <li id="price">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=price">
                                <span class="shaixuan-type-name">价格</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                                <span data-273-click-log="/wap/list/choice@etype=click@choice=price_default" class="select">不限</span>
                                <span data-value="1" data-273-click-log="/wap/list/choice@etype=click@choice=price_1" class="select">3万以下</span>
                                <span data-value="2" data-273-click-log="/wap/list/choice@etype=click@choice=price_2" class="select">3-5万</span>
                                <span data-value="3" data-273-click-log="/wap/list/choice@etype=click@choice=price_3" class="select">5-10万</span>
                                <span data-value="4" data-273-click-log="/wap/list/choice@etype=click@choice=price_4" class="select">10-20万</span>
                                <span data-value="5" data-273-click-log="/wap/list/choice@etype=click@choice=price_5" class="select">20-30万</span>
                                <span data-value="6" data-273-click-log="/wap/list/choice@etype=click@choice=price_6" class="select">30-40万</span>
                                <span data-value="7" data-273-click-log="/wap/list/choice@etype=click@choice=price_7" class="select">40万以上</span>

                                <span data-273-click-log="/wap/list/choice@etype=click@choice=price_user_define" class="selected shaixuan_user-define">0-10万</span>
                                <style>
                                    .shaixuan-box{ position:relative ;}
                                    .shaixuan-box input{ position:absolute; left:0 ; bottom: 0 ; opacity:0; width:100%;height: 32px;}
                                </style>
                                <input type="text" readonly="" placeholder="选择价格" class="" value="" id="shaixuan_user-define_dummy"><ul style="display: none;" id="shaixuan_user-define">
                                    <li data-val="0">0                                                <ul>
                                            <li data-val="1">1</li>
                                            <li data-val="2">2</li>
                                            <li data-val="3">3</li>
                                            <li data-val="4">4</li>
                                            <li data-val="5">5</li>
                                            <li data-val="6">6</li>
                                            <li data-val="7">7</li>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="1">1                                                <ul>
                                            <li data-val="2">2</li>
                                            <li data-val="3">3</li>
                                            <li data-val="4">4</li>
                                            <li data-val="5">5</li>
                                            <li data-val="6">6</li>
                                            <li data-val="7">7</li>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="2">2                                                <ul>
                                            <li data-val="3">3</li>
                                            <li data-val="4">4</li>
                                            <li data-val="5">5</li>
                                            <li data-val="6">6</li>
                                            <li data-val="7">7</li>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="3">3                                                <ul>
                                            <li data-val="4">4</li>
                                            <li data-val="5">5</li>
                                            <li data-val="6">6</li>
                                            <li data-val="7">7</li>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="4">4                                                <ul>
                                            <li data-val="5">5</li>
                                            <li data-val="6">6</li>
                                            <li data-val="7">7</li>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="5">5                                                <ul>
                                            <li data-val="6">6</li>
                                            <li data-val="7">7</li>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="6">6                                                <ul>
                                            <li data-val="7">7</li>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="7">7                                                <ul>
                                            <li data-val="8">8</li>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="8">8                                                <ul>
                                            <li data-val="9">9</li>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="9">9                                                <ul>
                                            <li data-val="10">10</li>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="10">10                                                <ul>
                                            <li data-val="11">11</li>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="11">11                                                <ul>
                                            <li data-val="12">12</li>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="12">12                                                <ul>
                                            <li data-val="13">13</li>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="13">13                                                <ul>
                                            <li data-val="14">14</li>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="14">14                                                <ul>
                                            <li data-val="15">15</li>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="15">15                                                <ul>
                                            <li data-val="20">20</li>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="20">20                                                <ul>
                                            <li data-val="30">30</li>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="30">30                                                <ul>
                                            <li data-val="40">40</li>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="40">40                                                <ul>
                                            <li data-val="50">50</li>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="50">50                                                <ul>
                                            <li data-val="60">60</li>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="60">60                                                <ul>
                                            <li data-val="70">70</li>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="70">70                                                <ul>
                                            <li data-val="80">80</li>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="80">80                                                <ul>
                                            <li data-val="90">90</li>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="90">90                                                <ul>
                                            <li data-val="100">100</li>
                                        </ul>
                                    </li>
                                    <li data-val="100">&gt;=100<ul><li data-val="10000"></li>&gt;</ul></li>
                                </ul>
                            </div>
                        </li>
                        <li id="years">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=age">
                                <span class="shaixuan-type-name">车龄</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>
                        <li id="gearbox">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=gearbox">
                                <span class="shaixuan-type-name">变速箱</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>
                        <li id="structure">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=structure">
                                <span class="shaixuan-type-name">车身结构</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>
                        <li id="kilometer">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=kilometer">
                                <span class="shaixuan-type-name">表显里程</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>
                        <li id="free_warranty">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=free_warranty">
                                <span class="shaixuan-type-name">是否免费保修</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>

                        <li id="is_checked">
                            <div class="shaixuan-type" data-273-click-log="/wap/list/choice@etype=click@choice=is_checked">
                                <span class="shaixuan-type-name">是否已检</span>
                                <span class="select"><label>不限</label><em class="arrow-close"></em></span>
                            </div>
                            <div class="shaixuan-box">
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="bottom-btn">

                <div class="shange2">
                    <!--<div class="left"><span class="btn js_cancel" data-273-click-log="/wap/list/choice@etype=click@choice=cancel">取消</span></div>-->
                    <!--<div class="right"><span class="btn btn-green js_submit" data-273-click-log="/wap/list/choice@etype=click@choice=submit">确定</span></div>-->
                    <span class="btn btn-green js_submit" data-273-click-log="/wap/list/choice@etype=click@choice=submit">确定</span>
                </div>
            </div>

        </div><!-- / -->
    </div>
</div>

