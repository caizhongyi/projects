<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="activity_blog.aspx.cs" Inherits="activity_myhistory_blog" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="../css/activity_myhistory.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" />
    <link href="../css/personal.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/jquery.core.js" type="text/javascript"></script>
    <script src="../scripts/jquery.ui.tabs.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="activityMain layout">
        <div id="container" class="activity_myhistory w_1004 pBgC">
            <div class="myhistroyTitle">
                <div class="black10">
                </div>
                <div class="black10">
                </div>
                <div class="mes_com_box_Tab">
                    <a href="javascript:void(0);">活动信息</a> <a href="javascript:void(0);" class="active">
                        我的活动</a>
                </div>
            </div>
            <!-- myhistroyTitle -->
            <div class="myhistoryMenu">
                <ul>
                    <li>活动信息及评论</li>
                    <li><a href="activity_myhistory_album_view.html">浏览上传管理相册</a></li>
                    <li><b><a href="javascript:void(0);">浏览发表管理感想</a></b></li>
                </ul>
            </div>
            <!-- myhistoryMenu -->
            <div class="AMBlog">
                <h4 class="tBgb AMBlog">
                    <b class="icon32 fCblue fSize-12">发表感想</b></h4>
                <div class="AMBlog_Main">
                    <dl>
                        <dd>
                            <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="发布感想" />
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                    <dl>
                        <dd class="formTitle">
                            标题：</dd>
                        <dd class="formMain">
                            <input type="text" name="" id="" class="text" />
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                    <dl>
                        <dd class="formTitle">
                            内容：</dd>
                        <dd class="formMain">
                            <textarea name="" id="" cols="69" rows="4"></textarea>
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                    <dl>
                        <div class="tips-panel f_right">
                            <div class="tips fCred" style="padding: 3px 3px;">
                                内容临时保存于：2011/12/12 00:37:32&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="close-3"></a></div>
                        </div>
                        <dd class="formTitle">
                            &nbsp;</dd>
                        <dd class="formMain">
                            <label for="">
                                <input type="checkbox" name="" id="" />
                                &nbsp;保存一份到草稿</label>
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                    <dl>
                        <dd class="formTitle">
                            &nbsp;</dd>
                        <dd class="formMain">
                            <label for="">
                                <input type="checkbox" name="" id="" />
                                &nbsp;显示天气</label>
                            &nbsp;&nbsp;<img src="../images/defucult/weather2.jpg" alt="" />&nbsp;<img src="../images/defucult/weather1.jpg"
                                alt="" />&nbsp;&nbsp;多云转晴 21℃-25℃&nbsp;&nbsp;&nbsp;&nbsp;
                            <label for="">
                                <input type="checkbox" name="" id="" />
                                &nbsp;显示发表地&nbsp;</label>
                            <input type="text" name="" id="" class="text" />
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                    <dl>
                        <dd class="formTitle">
                            &nbsp;</dd>
                        <dd class="formMain">
                            权限：
                            <select name="" id="">
                                <option value="选择权限">选择权限</option>
                            </select>
                            &nbsp;&nbsp;&nbsp;&nbsp;分类：
                            <select name="" id="">
                                <option value="默认分类">默认分类</option>
                            </select>
                            &nbsp;
                            <input type="text" name="" id="" class="text" />
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                    <dl>
                        <dd class="formTitle">
                            &nbsp;</dd>
                        <dd class="formMain">
                            <div class="shareAddress f_left">
                                共享到其他地方</div>
                            <div class="recoverShare f_left">
                                <ul>
                                    <li class="recoverTitle">收回共享</li>
                                    <li>
                                        <label for="">
                                            <input type="checkbox" name="" id="" />
                                            &nbsp;共享到日志&nbsp;</label>
                                        &nbsp;
                                        <select name="" id="">
                                            <option value="选择分类">选择分类</option>
                                        </select>
                                        &nbsp;
                                        <input type="text" name="" id="" class="text" value="足球" />
                                    </li>
                                    <li>
                                        <label for="">
                                            <input type="checkbox" name="" id="" />
                                            &nbsp;共享到日志&nbsp;</label>
                                        &nbsp;
                                        <select name="" id="">
                                            <option value="选择分类">选择分类</option>
                                        </select>
                                        &nbsp;
                                        <input type="text" name="" id="" class="text" value="洪兴俱乐部" />
                                    </li>
                                    <li>
                                        <label for="">
                                            <input type="checkbox" name="" id="" />
                                            &nbsp;共享到日志&nbsp;</label>
                                        &nbsp;
                                        <select name="" id="">
                                            <option value="选择分类">选择分类</option>
                                        </select>
                                        &nbsp;
                                        <input type="text" name="" id="" class="text" value="北海足疗" />
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                    <dl>
                        <dd class="formTitle">
                            &nbsp;</dd>
                        <dd class="formMain">
                            <input type="submit" class="saveBtn" value="保存" />
                            &nbsp;&nbsp;
                            <input type="submit" class="cancelBtn" value="取消" />
                        </dd>
                    </dl>
                    <dl class="clear2">
                    </dl>
                </div>
                <!--photoList main -->
                <div class="clear">
                </div>
                <h4 class="tBgb AMBlog" style="border-top: 1px solid #1581a5;">
                    <b class="icon32 fCblue fSize-12">评价该活动</b>&nbsp;
                    <label for="" class=" fSize-12">
                        <input type="radio" name="11" id="" />
                        喜欢&nbsp;</label>
                    <label for="" class=" fSize-12">
                        <input type="radio" name="11" id="" />
                        不喜欢&nbsp;</label>
                    <label for="" class=" fSize-12">
                        <input type="radio" name="11" id="" />
                        一般般&nbsp;</label>
                    <a href="#" class=" fSize-12">查看结果</a>&nbsp;&nbsp;<strong class="fCred2 fSize-12"
                        style="font-weight: normal;">对于自己发布感想，可以到个人模块日志分页中进行相应的维护</strong></h4>
                <div class="AMBlog fCgray3" style="height: 34px; line-height: 33px; border-bottom: 1px dotted #d7d7d7;">
                    <div class="pageList">
                        <ul>
                            <li>活动感想<span class="fCblue">（23）</span></li>
                            <li>首页</li>
                            <li>上一页</li>
                            <li>01<span class="fCblue">/20</span></li>
                            <li><span class="fCred3">下一页</span></li>
                            <li>末页</li>
                        </ul>
                    </div>
                </div>
                <div class="AMBlog commentsActivity fCgray3">
                    <ul>
                        <li class="selected">
                            <img class="photo mbUseravatar" alt="" src="../images/photos/img_51x51.png" />
                            <div class="mbUsername fCblue">
                                Jackson <span class="fSize-14 fCgray">中国人那么努力学习英语是为了什么中国人那么努力学习英语是为了什么</span> <span
                                    class="fCred3">[已读]</span></div>
                            <div class="mbMain">
                                <p>
                                    放弃一个人并不痛苦，痛苦的是放弃心中的爱。因为放弃，我们在挣扎中回想最真的昨天，在绝望里删除密密的回忆。昨天虽已走远，但回忆的某些环节， 越删除越清晰，它会牢牢盘踞在我们的精神深处。如果放弃，那就彻底，就算再痛；如果缘未尽，那就好好把握，毕竟我们不奢求还有来生。</p>
                                <p class="mbTime">
                                    <span class="f_right replayBtn"><a class="icon icon-talk" href="javascript:void(0);">
                                        (36)</a><a href="javascript:void(0);" class="icon icon-file2"></a><a href="javascript:void(0);"
                                            class="icon icon-files"></a><a href="javascript:void(0);" class="icon icon-news"></a><a
                                                href="javascript:void(0);" class="icon icon-disable"></a></span>30分钟前</p>
                                <div class="replay-content">
                                    <img class="arrowhead" src="../images/home/ico_17x9.png" />
                                    <input type="text" class="text" />
                                    <input type="submit" class="button button2" value="回复" />
                                    <input type="submit" class="button btn_w56 btnGary_56 btn_h28" value="取消" />
                                    <ul>
                                        <li class="clear2fix">
                                            <img class="photo" alt="" src="../images/photos/img_51x51.png" />
                                            <div class="overflow">
                                                <p>
                                                    资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道</p>
                                                <div class="time">
                                                    1210-21</div>
                                                <div class="replay">
                                                    <a href="javascript:void(0);">删除</a><a href="javascript:void(0);">回复</a></div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="photo" alt="" src="../images/photos/img_51x51.png" />
                                            <div class="overflow">
                                                <p>
                                                    资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道</p>
                                                <div class="time">
                                                    1210-21</div>
                                                <div class="replay">
                                                    <a href="javascript:void(0);">回复</a></div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="photo" alt="" src="../images/photos/img_51x51.png" />
                                            <div class="overflow">
                                                <p>
                                                    资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道资道</p>
                                                <div class="time">
                                                    1210-21</div>
                                                <div class="replay">
                                                    <a href="javascript:void(0);">回复</a></div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="showall">
                                        <a href="javascript:void(0);" class="replayshow">更多回复</a>&nbsp;<a href="javascript:void(0);"
                                            class="replaypackup">收起</a></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <img class="photo mbUseravatar" alt="" src="../images/photos/img_51x51.png" />
                            <div class="mbUsername fCblue">
                                Jackson <span class="fSize-14 fCgray">中国人那么努力学习英语是为了什么中国人那么努力学习英语是为了什么</span> <span
                                    class="fCred3">[已读]</span></div>
                            <div class="mbMain">
                                <p>
                                    放弃一个人并不痛苦，痛苦的是放弃心中的爱。因为放弃，我们在挣扎中回想最真的昨天，在绝望里删除密密的回忆。昨天虽已走远，但回忆的某些环节， 越删除越清晰，它会牢牢盘踞在我们的精神深处。如果放弃，那就彻底，就算再痛；如果缘未尽，那就好好把握，毕竟我们不奢求还有来生。</p>
                                <p class="mbTime">
                                    <span class="f_right replayBtn"><a class="icon icon-talk" href="javascript:void(0);">
                                        (36)</a><a href="javascript:void(0);" class="icon icon-file2"></a><a href="javascript:void(0);"
                                            class="icon icon-files"></a><a href="javascript:void(0);" class="icon icon-news"></a><a
                                                href="javascript:void(0);" class="icon icon-disable"></a></span>30分钟前</p>
                            </div>
                        </li>
                        <li>
                            <img class="photo mbUseravatar" alt="" src="../images/photos/img_51x51.png" />
                            <div class="mbUsername fCblue">
                                Jackson <span class="fSize-14 fCgray">中国人那么努力学习英语是为了什么中国人那么努力学习英语是为了什么</span> <span
                                    class="fCred3">[已读]</span></div>
                            <div class="mbMain">
                                <p>
                                    放弃一个人并不痛苦，痛苦的是放弃心中的爱。因为放弃，我们在挣扎中回想最真的昨天，在绝望里删除密密的回忆。昨天虽已走远，但回忆的某些环节， 越删除越清晰，它会牢牢盘踞在我们的精神深处。如果放弃，那就彻底，就算再痛；如果缘未尽，那就好好把握，毕竟我们不奢求还有来生。</p>
                                <p class="mbTime">
                                    <span class="f_right replayBtn"><a class="icon icon-talk" href="javascript:void(0);">
                                        (36)</a><a href="javascript:void(0);" class="icon icon-file2"></a><a href="javascript:void(0);"
                                            class="icon icon-files"></a><a href="javascript:void(0);" class="icon icon-news"></a><a
                                                href="javascript:void(0);" class="icon icon-disable"></a></span>30分钟前</p>
                            </div>
                        </li>
                        <li>
                            <img class="photo mbUseravatar" alt="" src="../images/photos/img_51x51.png" />
                            <div class="mbUsername fCblue">
                                Jackson <span class="fSize-14 fCgray">中国人那么努力学习英语是为了什么中国人那么努力学习英语是为了什么</span> <span
                                    class="fCred3">[已读]</span></div>
                            <div class="mbMain">
                                <p>
                                    放弃一个人并不痛苦，痛苦的是放弃心中的爱。因为放弃，我们在挣扎中回想最真的昨天，在绝望里删除密密的回忆。昨天虽已走远，但回忆的某些环节， 越删除越清晰，它会牢牢盘踞在我们的精神深处。如果放弃，那就彻底，就算再痛；如果缘未尽，那就好好把握，毕竟我们不奢求还有来生。</p>
                                <p class="mbTime">
                                    <span class="f_right replayBtn"><a class="icon icon-talk" href="javascript:void(0);">
                                        (36)</a><a href="javascript:void(0);" class="icon icon-file2"></a><a href="javascript:void(0);"
                                            class="icon icon-files"></a><a href="javascript:void(0);" class="icon icon-news"></a><a
                                                href="javascript:void(0);" class="icon icon-disable"></a></span>30分钟前</p>
                            </div>
                        </li>
                        <li>
                            <img class="photo mbUseravatar" alt="" src="../images/photos/img_51x51.png" />
                            <div class="mbUsername fCblue">
                                Jackson <span class="fSize-14 fCgray">中国人那么努力学习英语是为了什么中国人那么努力学习英语是为了什么</span> <span
                                    class="fCred3">[已读]</span></div>
                            <div class="mbMain">
                                <p>
                                    放弃一个人并不痛苦，痛苦的是放弃心中的爱。因为放弃，我们在挣扎中回想最真的昨天，在绝望里删除密密的回忆。昨天虽已走远，但回忆的某些环节， 越删除越清晰，它会牢牢盘踞在我们的精神深处。如果放弃，那就彻底，就算再痛；如果缘未尽，那就好好把握，毕竟我们不奢求还有来生。</p>
                                <p class="mbTime">
                                    <span class="f_right replayBtn"><a class="icon icon-talk" href="javascript:void(0);">
                                        (36)</a><a href="javascript:void(0);" class="icon icon-file2"></a><a href="javascript:void(0);"
                                            class="icon icon-files"></a><a href="javascript:void(0);" class="icon icon-news"></a><a
                                                href="javascript:void(0);" class="icon icon-disable"></a></span>30分钟前</p>
                            </div>
                        </li>
                        <li>
                            <img class="photo mbUseravatar" alt="" src="../images/photos/img_51x51.png" />
                            <div class="mbUsername fCblue">
                                Jackson <span class="fSize-14 fCgray">中国人那么努力学习英语是为了什么中国人那么努力学习英语是为了什么</span> <span
                                    class="fCred3">[已读]</span></div>
                            <div class="mbMain">
                                <p>
                                    放弃一个人并不痛苦，痛苦的是放弃心中的爱。因为放弃，我们在挣扎中回想最真的昨天，在绝望里删除密密的回忆。昨天虽已走远，但回忆的某些环节， 越删除越清晰，它会牢牢盘踞在我们的精神深处。如果放弃，那就彻底，就算再痛；如果缘未尽，那就好好把握，毕竟我们不奢求还有来生。</p>
                                <p class="mbTime">
                                    <span class="f_right replayBtn"><a class="icon icon-talk" href="javascript:void(0);">
                                        (36)</a><a href="javascript:void(0);" class="icon icon-file2"></a><a href="javascript:void(0);"
                                            class="icon icon-files"></a><a href="javascript:void(0);" class="icon icon-news"></a><a
                                                href="javascript:void(0);" class="icon icon-disable"></a></span>30分钟前</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="AMBlog fCgray3" style="height: 34px; line-height: 33px; border-bottom: 1px dotted #d7d7d7;">
                    <div class="pageList f_right">
                        <ul>
                            <li>首页</li>
                            <li>上一页</li>
                            <li>01/20</li>
                            <li>下一页</li>
                            <li>末页</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- AM_photoEditWarp -->
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/activity/activity_myhistory_photo_view.js" type="text/javascript"></script>
</asp:Content>
