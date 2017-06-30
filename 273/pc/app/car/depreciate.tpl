<div class="mod-form">
    <div class="mod-form-item">
        <input class="input1" placeholder="我要砍价" id="js_price">
        <span class="unit">万元</span>
        <i class="i-must-cgb"></i>
    </div>
    <div class="mod-form-item">
        <input class="input1" placeholder="请填写您的手机号码" id="js_mobile">
        <i class="i-must-cgb"></i>
    </div>
    <div class="mod-form-item" data-item="captcha">
        <input class="input1 input-short" placeholder="输入验证码" id="js_code"><span class="code"><img src="/ajax/captcha/get?<%=random%>" id="js_code_change"></span>
        <i class="i-must-cgb"></i>
    </div>
    <div class="mod-form-item">
        <div class="btn-box"><button class="b-r <%=btn_color%> " id="js_luck_ok">提交</button><button id="js_luck_close">取消</button></div>
    </div>
</div>

