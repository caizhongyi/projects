;
(function ($) {
    /**
     * @author caizhongyi
     * @website http://www.zerowfe.com
     * @description  分享
     * @requires  jquery.1.7.2
     * */
    zero.share = Class.get({
        websites: {
            sina: { width: 600, height: 500, title: '转发到sina微博', url: 'http://v.t.sina.com.cn/share/share.php?url={url}&title={title}&content={content}' },
            douban: { width: 600, height: 500, title: '转发到豆瓣', url: 'http://www.douban.com/recommend/?url={url}&title={title}&content={content}' },
            qq: { width: 600, height: 500, title: '转发到腾讯微博', url: 'http://v.t.qq.com/share/share.php?url={url}&title={title}&content={content}' },
            qzone: { width: 600, height: 500, title: '转发到QQ空间', url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&content={content}' },
            renren: { width: 600, height: 500, title: '转发到人人网', url: 'http://share.renren.com/share/buttonshare?link={url}&title={title}&content={content}' },
            kaixin: { width: 600, height: 500, title: '转发到开心网', url: 'http://www.kaixin001.com/repaste/share.php?url={url}&title={title}&content={content}' },
            itb: { width: 600, height: 500, title: '转发到百度贴吧', url: 'http://tieba.baidu.com/i/sys/share?link={url}&type=text&title={title}&content={content}' },
            sohu: { width: 600, height: 500, title: '转发到搜狐微博', url: 'http://t.sohu.com/third/post.jsp?link={url}&title={title}&content={content}' }
        },
        initialize: function (selector, setting) {
            this.$ = $(selector);

            this.opts = $.extend(true, {}, {}, setting);

            var that = this;

            this.$.off('click.share').on('click.share', 'a', function () {
                that.transmit(this);
            })
        },
        transmit: function (elem) {
            var $elem = $(elem, this.$);

            for (var i in this.websites) {
                if ($elem.hasClass(i)) {
                    var item = this.websites[i],
                        url = item.url,
                        content = $elem.attr('data-message') || '',
                        title = $elem.attr('title') || item.title ,
                        dataTitle = $elem.attr('data-title') || encodeURIComponent(document.title),
                        width = $elem.attr('data-width') || item.width ,
                        height = $elem.attr('data-height') || item.height;
                    return this.open(this.getURL(url, dataTitle, content), title, width, height)
                }
            }
        },
        open: function (url, title, width, height) {
            if (!window.open(url, title, ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=' + (screen.width - width) / 2 + ',top=' + (screen.height - height) / 2]))
                location.href = [url].join('');
            return this;
        },
        getURL: function (url, title, content) {
            return url.replace(/{url}/gi, encodeURIComponent(document.location.href))
                .replace(/{title}/gi, title)
                .replace(/{content}/gi, encodeURIComponent(content.replace(/<[^>].*?>/g, '').substr(0, 120) || ''))
        }
    });
    zero.share.setting = {};
})(jQuery);
