<div class="mod-form mod-form-ex">
    <div class="mod-form-item mod-form-item-ex">
        <label class="tit">将左侧信息免费发送到手机</label>
        <input class="input1" placeholder="请填写您的手机号码" id="js_mobile">
        <i class="i-must-cgb"></i>
    </div>
    <div class="mod-form-item">
        <input class="input1 input-short" placeholder="输入验证码" id="js_code"><span class="code"><img src="/ajax/captcha/get?<%=random%>" id="js_code_change"></span>
        <i class="i-must-cgb"></i>
    </div>
    <div class="mod-form-item">
        <div class="btn-box"><button class="b-r red" id="js_luck_ok">免费发送</button><button id="js_luck_close">取消</button></div>
    </div>
    <div class="remind">273二手车交易网承诺保障您的隐私，不会泄露您的手机号码。</div>
</div>
<div class="left-info">
    <p><%=title%></p>
    <p><%=price%>万</p>
    <p><%=card_time%>上牌</p>
    <p><%=kilometer%>万公里</p>
    <p>信息编号：<%=car_id%></p>
    <p>电话：</p>
    <p><%=telephone%></p>
</div>
