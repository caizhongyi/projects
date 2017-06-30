<div class="mod-form">
    <div class="bd-tit">举报原因</div>
    <div class="line"></div>
    <ul class="checkbox-list" id="js_items">
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="1">车源已售</li>
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="2">电话空号、错号</li>
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="3">价格与实际不符</li>
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="4">服务态度差</li>
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="5">车源信息不符</li>
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="6">索要订金</li>
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="7">图片和车源不符</li>
        <li class="checkbox-list-item"><input type="checkbox" class="checkbox1" value="8">其他</li>
    </ul>
    <div class="mod-form-item">
        <textarea class="textarea1" placeholder="请输入补充说明" id="js_note"></textarea>
    </div>
    <div class="mod-form-item">
        <input class="input1 input-short" placeholder="输入验证码" id="js_code"><span class="code"><img src="/ajax/captcha/get?<%=random%>" id="js_code_change"></span>
        <i class="i-must-cgb"></i>
    </div>
    <div class="mod-form-item">
        <div class="btn-box"><button class="b-r red" id="js_luck_ok">提交</button><button id="js_luck_close">取消</button></div>
    </div>
</div>