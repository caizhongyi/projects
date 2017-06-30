<ul class="mod-car-list">
    <% for (var i = 0, l = car_list.length; i < l; i++) { var item = car_list[i]; %>
    <li class="item">
        <div class="pic">
            <a href="<%= item['detail_url']%>" target="_blank">
                <img src="<%= item['cover_photo']%>" alt="<%= item['title']%>">
            </a>
        </div>
        <div class="con">
            <h4><%= item['title'] + item['ad_note']%></h4>
            <div class="price1"><strong><%= item['price']%></strong><em>万</em></div>
            <div class="price2">当前款新车价格　<del>¥<%= item['buy_price']%>万</del>(含税)</div>
            <div class="info">
                <span class="info-l"><span class="t">上牌</span><%= item['card_time']%></span>
                <span class="info-r"><span class="t">里程</span><%= item['kilometer']%>万公里</span>
            </div>
        </div>
    </li>
    <% } %>
</ul>
<% if (car_list.length >= 4) { %>
<div class="mod-full-btn"><a href="/<%= more_line['url']%>/" class="btn">查看更多<%= more_line['text']%><i class="i-arrow-right"></i></a></div>
<% } %>
