
jQuery.fn.extend({
    loading: function () {
        $(this).append('<div style="text-align:center; clear:both; display:block; line-height:100px; height:100px;" class="loading">&nbsp;<img src="/images/loading.gif" /></div>');
    },
    bindTabClass: function (clsname) {
        $(this).parent().children().each(function () {
            if ($(this).hasClass(clsname)) {
                $(this).removeClass(clsname);
            }
        });
        $(this).addClass(clsname);
    }
});

var uid; //user id
var infoType;//personal type

var namecardinfo; //personal name card
var baseinfo; // personal basic info/// <reference path="home_calendar.js" />

var educationinfo; //personal education info
var workinfo; //personal work info
var interestinfo; //personal interest info
var contactinfo; //personal contact info

var zodiac;
var countryList = [];

var tab_index = 1; //show tab index
var edit_state = false; //edit state
var max_work_count = 15;
var degreeList;//
/** on load **/
$(function () {
    degreeList = wanerdaoLangTip('common_00031')
    zodiac = wanerdaoLangTip('common_00018');
    uid = getQueryString('uid');
    infoType = getQueryString('infoType');
    if (!uid) uid = '';
    bindPTab(uid);
    
    $('.datum_hobby').loading();

    // alert(self);
    /* set right personal info */
    getPersonalNameCard(
        function () {
            /*get personal basic info*/
            getBaseInfo(function () {
                setPersonalInfo();
                chooseTab();
            });
        }
    ); /*get personal name card*/

    if (self) {
        $('.user_card').append('<span><a href="javascript:;" id="upavatar">上传头像</a></span>');

        //上传头像
        $('#upavatar').click(function () {
            $.personAvatarUpload({
                callback: function (data) {
                    $('.user_card_img').html($wd.format('<img src="{0}" width="200" height="200px"/>', data));
                    $('#userInfo').find('img').attr('src', data.replace(/[0-9A-Za-z]{32}/, function ($0) { return 'small-' + $0; }));
                },
                overlayopts: {
                    // custom top position
                    top: 10,
                    // some mask tweaks suitable for facebox-looking dialogs
                    mask: {

                        // you might also consider a "transparent" color for the mask
                        color: '#fff',

                        // load mask a little faster
                        loadSpeed: 200,

                        // very transparent
                        opacity: 0.5
                    },

                    // disable this for modal dialog-type of overlays
                    closeOnClick: false,

                    // load it immediately after the construction
                    load: true

                }
            });

        });
    }

    /*update visible*/
    $('#is_available,#is_display_contellation,#is_display_home,#is_display_current_place,#is_display_school,#is_display_work').change(function () {
        $.ajax({
            url: "../wanerdao_personal.axd",
            type: "post",
            dataType: "json",
            cache: false,
            data: "{opertype:'update_" + $(this).attr('id') + "'," + $(this).attr('id') + ":'" + $(this).val() + "'}",
            error: function (data) {
            },
            success: function (data) {
            }
        });
    });
    /* set right personal info end*/


    /*personal info tab*/
    $('#show_basic').click(function () {
        if (tab_index != 1) {
            tab_index = 1;
            edit_state = false;
            $(this).bindTabClass('current01');
            showBasic();
        }
    });

    $('#show_edubg').click(function () {
        if (tab_index != 2) {
            tab_index = 2;
            edit_state = false;
            $(this).bindTabClass('current01');
            getEducationInfo();
        }
    });

    $('#show_workbg').click(function () {
        if (tab_index != 3) {
            tab_index = 3;
            edit_state = false;
            $(this).bindTabClass('current01');
            getWorkInfo();
        }
    });

    $('#show_interest').click(function () {
        if (tab_index != 4) {
            tab_index = 4;
            edit_state = false;
            $(this).bindTabClass('current01');
            getInterestInfo();
        }
    });

    $('#show_contacts').click(function () {
        if (tab_index != 5) {
            tab_index = 5;
            edit_state = false;
            $(this).bindTabClass('current01');
            getContactInfo();
        }
    });
});

/* baseinfo */
function chooseTab() {
    switch (infoType) {
        case 'edu':
            tab_index = 2;
            edit_state = false;
            $('#show_edubg').bindTabClass('current01');
            getEducationInfo();
            break;
        case 'work':
            tab_index = 3;
            edit_state = false;
            $('#show_workbg').bindTabClass('current01');
            getWorkInfo();
            break;
        case 'interest':
            tab_index = 4;
            edit_state = false;
            $('#show_interest').bindTabClass('current01');
            getInterestInfo();
            break;
        case 'contact':
            tab_index = 5;
            edit_state = false;
            $('#show_contacts').bindTabClass('current01');
            getContactInfo();
            break;
        default: //base
            tab_index = 1;
            edit_state = false;
            $('#show_basic').bindTabClass('current01');
            showBasic();      
            break;
    }
}

/************************************************basic********************************************/
function showBasic() {
    setBaseInfo();
}

/*Get Current PersonalNameCard */
function getPersonalNameCard(callback) {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalnamecard',uid:'" + uid + "'}",
        error: function (data) {
            alert('load namecard fail');
        },
        success: function (data) {
            if (data.result) {
                namecardinfo = data.obj;
                if (namecardinfo.is_available) {
                    $('#is_available option[value="1"]').attr('selected', true);
                } else {
                    $('#is_available option[value="0"]').attr('selected', true);
                }

                $('#is_display_contellation option[value="1"]').text(namecardinfo.contellation || wanerdaoLangTip('personal_00014'));
                if (namecardinfo.is_display_contellation) {
                    $('#is_display_contellation option[value="1"]').attr('selected', true);
                } else {
                    $('#is_display_contellation option[value="0"]').attr('selected', true);
                }

                $('#is_display_home option[value="1"]').text(namecardinfo.home || wanerdaoLangTip('personal_00014'));
                if (namecardinfo.is_display_home) {
                    $('#is_display_home option[value="1"]').attr('selected', true);
                } else {
                    $('#is_display_home option[value="0"]').attr('selected', true);
                }

                $('#is_display_current_place option[value="1"]').text(namecardinfo.current_place || wanerdaoLangTip('personal_00014'));
                if (namecardinfo.is_display_current_place) {
                    $('#is_display_current_place option[value="1"]').attr('selected', true);
                } else {
                    $('#is_display_current_place option[value="0"]').attr('selected', true);
                }
                $('#is_display_school option[value="1"]').text(namecardinfo.school || wanerdaoLangTip('personal_00014'));
                if (namecardinfo.is_display_school) {
                    $('#is_display_school option[value="1"]').attr('selected', true);
                } else {
                    $('#is_display_school option[value="0"]').attr('selected', true);
                }
                $('#is_display_work option[value="1"]').text(namecardinfo.work_place || wanerdaoLangTip('personal_00014'));
                if (namecardinfo.is_display_work) {
                    $('#is_display_work option[value="1"]').attr('selected', true);
                } else {
                    $('#is_display_work option[value="0"]').attr('selected', true);
                }
            }
            else {
            }
            if (callback) callback();
        }
    });
}

/*Get personalprofile Info*/
function getBaseInfo(callback) {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalprofile',uid:'" + uid + "'}",
        error: function (data) {
            alert('load baseinfo fail');
        },
        success: function (data) {
            if (data.result) {
                baseinfo = data.obj;
                if (callback) callback();
            } else {
                alert(data.msg);
            }
        }
    });
}

/***set personal avatar and percent of info **/
function setPersonalInfo() {
    if (baseinfo.logo_path) {
        $('.user_card_img').html($wd.format('<img src="{0}" width="200" height="200px"/>', baseinfo.logo_path));
    }
    // info integrity degree
    var i_integrity = jQuery('<i></i>').css('width', baseinfo.integrity_score).appendTo($('#integrity').empty());
    i_integrity.html(baseinfo.integrity_score + '%');
    // activity degree
    var i_activity = jQuery('<i></i>').css('width', baseinfo.activity_score).appendTo($('#activity').empty());
    i_activity.html(baseinfo.activity_score + '%');

    var i_follow = jQuery('<i></i>').css('width', baseinfo.follow_score).appendTo($('#follow').empty());
    i_follow.html(baseinfo.follow_score + '%');

    var i_share = jQuery('<i></i>').css('width', baseinfo.share_score).appendTo($('#share').empty());
    i_share.html(baseinfo.share_score + '%');

    var i_exp = jQuery('<i></i>').css('width', baseinfo.experience).appendTo($('#experience').empty());
    i_exp.html(baseinfo.experience + '%');
}


/*Set personalprofile Info*/
function setBaseInfo() {
    var basic_box = jQuery('<div class="hobby_list"></div').appendTo($('.datum_hobby').empty());
    var basic_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(basic_box);

    var ul_baisc = jQuery('<ul></ul>').appendTo(basic_info_box);
    ul_baisc.append($wd.format('<li><label>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</label>{0}</li>', baseinfo.name));
    ul_baisc.append($wd.format('<li><label>第二姓名：</label> {0}</li>', baseinfo.second_name));
    ul_baisc.append($wd.format('<li><label>性&nbsp;&nbsp;&nbsp;&nbsp;别：</label> {0}</li>', (baseinfo.gender == true ? '男' : '女')));
    ul_baisc.append($wd.format('<li><label style=" margin-top:5px">生&nbsp;&nbsp;&nbsp;&nbsp;日：</label> {0}-{1}-{2}<b class="hobby_sx">生肖：<a>{3}</a>星座：<a class="m0">{4}</a></b></li>', baseinfo.birthday_year, baseinfo.birthday_month, baseinfo.birthday_day, zodiac[(baseinfo.birthday_year - 3) % 12], (baseinfo.constellation||initConselaction())));
    ul_baisc.append($wd.format('<li><label>家&nbsp;&nbsp;&nbsp;&nbsp;乡：</label> {0}</li>', namecardinfo.home));
    ul_baisc.append($wd.format('<li><label>所&nbsp;在&nbsp;地：</label> {0}</li>', namecardinfo.current_place));
    ul_baisc.append($wd.format('<li class="m0"><label>详细地址：</label> {0}<i class="ml35">邮编： {1}</i></li>', baseinfo.current_address, baseinfo.current_zip));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(basic_info_box);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

        link_edit.click(function () {
            if (basic_box.find('.hobby_listB').length == 0) {
                var edit_box = jQuery('<div class="hobby_listB"></div>').appendTo(basic_box);
                edit_box.append('<div class="hobby_tagT"></div>');
                edit_box.append('<div class="hobby_tagC"></div>');

                var ul_edit_item = jQuery('<ul></ul>').appendTo(edit_box.find('.hobby_tagC'));

                // name
                var li_name = jQuery('<li><label>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</label></li>').appendTo(ul_edit_item);
                var personal_name = jQuery('<input type="text" class="w170" id="personal_name"/>').appendTo(li_name);
                personal_name.val(baseinfo.name);

                //enlish name
                var li_en_name = jQuery('<li><label>英&nbsp;文&nbsp;名：</label></li>').appendTo(ul_edit_item);
                var personal_en_name = jQuery('<input type="text" class="w170" id="personal_en_name" />').appendTo(li_en_name);
                personal_en_name.val(baseinfo.second_name);

                //gender
                var li_sex = jQuery('<li><label>性&nbsp;&nbsp;&nbsp;&nbsp;别：</label></li>').appendTo(ul_edit_item);
                var personal_gender = jQuery('<select name="personal_gender" id="personal_gender"><option value="1">男</option><option value="0">女</option></select>').appendTo(li_sex);
                personal_gender.val(baseinfo.gender);

                //birthday
                var li_birthday = jQuery('<li><label>生&nbsp;&nbsp;&nbsp;&nbsp;日：</label></li>').appendTo(ul_edit_item);
                var personal_birth_year = jQuery('<select id="personal_birth_year"></select>').appendTo(li_birthday);
                var personal_birth_month = jQuery('<select id="personal_birth_month"></select>').appendTo(li_birthday);
                var personal_birth_day = jQuery('<select id="personal_birth_day"></select>').appendTo(li_birthday);
                li_birthday.append('<b class="hobby_sx">生肖：<a id="personal_zodiac"></a>星座：<a class="m0" id="personal_constellation"></a></b>');
                //bind birthday
                bindDateSelect(personal_birth_year, personal_birth_month, personal_birth_day);
                personal_birth_year.val(baseinfo.birthday_year);
                personal_birth_month.val(baseinfo.birthday_month);
                personal_birth_day.val(baseinfo.birthday_day);
                $('#personal_zodiac').html(zodiac[(baseinfo.birthday_year - 3) % 12]);
                calcConselaction();
                personal_birth_year.change(function () {
                    $('#personal_zodiac').html(zodiac[($(this).val() - 3) % 12]);
                });
                $('#personal_birth_year,#personal_birth_month,#personal_birth_day').change(function () {
                    calcConselaction();
                });

                var birth_place = jQuery('<li><label>家&nbsp;&nbsp;&nbsp;&nbsp;乡：</label></li>').appendTo(ul_edit_item);
                var personal_birth_render = jQuery('<address id="personal_birth_area" style=" float:left;"></address>').appendTo(birth_place);
                var personal_birth_btn = jQuery('<input type="button" value="选择" style="width:50px;"  id="personal_birth_btn" rel="#tt"/>').appendTo(birth_place);
                personal_birth_btn.click(function () {
                    wanerdaoArea({
                        alphopts: { title: '选择家乡', id: 'tt', elementid: 'personal_birth_btn', callback: function (data) {
                            personal_birth_render.html(data.country.name + ',' + data.state.name + ',' + data.city.name);
                            personal_birth_render.attr('ids', data.country.id + ',' + data.state.id + ',' + data.city.id);
                        }

                        }
                    });
                });
                personal_birth_btn.overlay();

                // current palce
                var current_place = jQuery('<li><label>所&nbsp;在&nbsp;地：</label></li>').appendTo(ul_edit_item);
                var personal_location_render = jQuery('<address id="personal_location_area" style=" float:left;"></address>').appendTo(current_place);
                var personal_location_btn = jQuery('<input type="button" value="选择" style="width:50px;"  id="personal_location_btn" rel="#tt"/>').appendTo(current_place);
                personal_location_btn.click(function () {
                    wanerdaoArea({
                        alphopts: { title: '选择所在地', id: 'tt', elementid: 'personal_location_btn', callback: function (data) {
                            personal_birth_render.html(data.country.name + ',' + data.state.name + ',' + data.city.name);
                            personal_birth_render.attr('ids', data.country.id + ',' + data.state.id + ',' + data.city.id);
                        }

                        }
                    });
                });
                personal_location_btn.overlay();

                //address
                var detail_address = jQuery('<li><label>详细地址：</label></li>').appendTo(ul_edit_item);
                var personal_address = jQuery('<input type="text" class="w264" id="personal_address" />').appendTo(detail_address);
                personal_address.val(baseinfo.current_address);

                //zip
                var current_place_zip = jQuery('<li><label>邮编：</label></li>').appendTo(ul_edit_item);
                var personal_zip = jQuery('<input type="text" class="w82" id="personal_zip" />').appendTo(current_place_zip);
                personal_zip.val(baseinfo.current_zip);

                //explain
                ul_edit_item.append('<li class="txt_sm">申明：详细内容地址内容是保密内容。不会对任何人公开，<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;精确填写内容为了更快更好的为你组织活动</li>');

                //button
                var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_edit_item);
                var btn_save = jQuery('<input name="p_save" id="p_save" type="button" class="hobby_but" value="保存" />').appendTo(operate_btn);
                var btn_cancel = jQuery('<input name="p_cancel" id="p_cancel" type="button" class="hobby_but01 cancel_modify" value="取消" />').appendTo(operate_btn);
                var btn_set_permission = jQuery('<input name="p_set_permission" id="p_set_permission" type="button" class="hobby_but02" value="修改隐私设置" />').appendTo(operate_btn);

                //bind save click event
                btn_save.click(function () {
                    if (!personal_name.val()) {
                        alert(wanerdaoLangTip('personal_00007'));
                        return false;
                    } else {

                        var birth_country = '';
                        var birth_state = '';
                        var birth_city = '';

                        var location_country = '';
                        var location_state = '';
                        var location_city = '';

                        if (personal_birth_render.attr('ids')) {
                            var birth_area_info = personal_birth_render.attr('ids');
                            birth_country = birth_area_info.split(',')[0];
                            birth_state = birth_area_info.split(',')[1];
                            birth_city = birth_area_info.split(',')[2];
                        }
                        if (personal_location_render.attr('ids')) {
                            var location_area_info = personal_location_render.attr('ids');
                            location_country = location_area_info.split(',')[0];
                            location_state = location_area_info.split(',')[1];
                            location_city = location_area_info.split(',')[2];
                        }


                        $(this).attr('disabled', true);
                        var constel = $('#personal_constellation').html();
                        $.ajax({
                            url: "../wanerdao_personal.axd",
                            type: "post",
                            dataType: "json",
                            cache: false,
                            data: "{opertype:'updatepersonalprofile',name:'" + personal_name.val() + "',enname:'" + personal_en_name.val()
                                    + "',sex:'" + personal_gender.val() + "',biryear:'" + personal_birth_year.val() + "',birmonth:'" + personal_birth_month.val()
                                    + "',birday:'" + personal_birth_day.val() + "',constellation:'" + constel + "',bircountry:'" + birth_country
                                    + "',birstate:'" + birth_state + "',bircity:'" + birth_city + "',curcountry:'" + location_country
                                    + "',curstate:'" + location_state + "',curcity:'" + location_city + "',curaddress:'" + personal_address.val()
                                    + "',curzip:'" + personal_zip.val() + "'}",
                            error: function (data) {
                                btn_save.removeAttr('disabled');
                            },
                            success: function (data) {
                                if (data.result) {
                                    getPersonalNameCard();
                                    getBaseInfo(function () {
                                        setPersonalInfo();
                                        setBaseInfo();
                                    });
                                } else {
                                    alert(data.msg);
                                }
                            }
                        });

                    }
                    return false;
                });

                //bind cancel click event
                btn_cancel.click(function () {
                    edit_box.remove();
                });

                //bind private setting click event
                btn_set_permission.click(function () {
                    setCustomPermission(updateBasePer);
                });

                edit_box.append('<div class="hobby_tagB"></div>');
            } else {
                basic_box.find('.hobby_listB').remove();
            }
            return false;
        });
    }

}

//country
function getCountry(callback) {
    $.ajax({
        url: "../area_common.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'country'}",
        error: function (data) {
            alert("load education fail");
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//state
function getState(id, callback) {
    $.ajax({
        url: "../area_common.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'state',id:'" + id + "'}",
        error: function (data) {
            alert("load education fail");
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//state
function getCity(id, callback) {
    $.ajax({
        url: "../area_common.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'city',id:'" + id + "'}",
        error: function (data) {
            alert("load education fail");
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}
/************************************basic end******************************************/


/*************************************** education ***************************************/

/*Get Education Info*/
function getEducationInfo() {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonaleducation',uid:'" + uid + "'}",
        error: function (data) {
            alert("load education fail");
        },
        success: function (data) {
            if (data.result) {
                educationinfo = data.rows;
                setEducationInfo();
            }
        }
    });
}

/*set Education Info*/
function setEducationInfo() {
    var education_box = $('.datum_hobby').empty();
    showEducationItem(1, education_box);
    education_box.append('<div class="gz_tit">高中及以前学历</div>');
    showEducationItem(2, education_box);
    showEducationItem(3, education_box);
    showEducationItem(4, education_box);
    showEducationItem(5, education_box);
    showEducationItem(6, education_box);

    if (educationinfo.length < 10) {
        var add_education_box = jQuery('<div class="hobby_list" id="add_education_box"></div>').appendTo(education_box);
        var add_inner_box = jQuery('<div class="hobby_listT"></div>').appendTo(add_education_box);
        add_inner_box.append('<ul><li>&nbsp;</li></ul>');

        var add_hanlder_box = jQuery('<div class="fdbox"></div>').appendTo(add_inner_box);

        if (self) {
            var update_per_link = jQuery('<a href="javascript:void(0);" class="inp_but">修改个人设置</a>').appendTo(add_hanlder_box);
            var add_link = jQuery('<a href="javascript:void(0);" class="inp_add">添加</a>').appendTo(add_hanlder_box);
            add_link.click(function () {
                if (add_education_box.find('.hobby_listB').length == 0) {
                    if (edit_state == false) {
                        edit_state = true;
                        var add_education_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(add_education_box);
                        add_education_input_box.append('<div class="hobby_tagT"></div>');
                        var education_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(add_education_input_box);
                        var education_type_box = jQuery('<div class="">教育程度：</div>').appendTo(education_detail);
                        var select_edu_type = jQuery('<select id="edu_type"></select>').appendTo(education_type_box);
                        select_edu_type.html(wanerdaoLangTip('common_00032'));
                        var ul_edu_detail = jQuery('<ul></ul>').appendTo(education_detail);
                        addEducationItem(select_edu_type.val(), ul_edu_detail);

                        select_edu_type.change(function () {
                            addEducationItem($(this).val(), ul_edu_detail);
                        });

                        add_education_input_box.append('<div class="hobby_tagB"></div>');
                    } else {
                        alert(wanerdaoLangTip('personal_00005'));
                    }
                } else {
                    add_education_box.find('.hobby_listB').remove();
                    edit_state = false;
                }

            });

            update_per_link.click(function () {
                setCustomPermission(updateEduPer);
            });
        }
    }
}

/**  render add-box by school type **/
function addEducationItem(type, box) {
    box.empty();
    if (type == 1) {//University
        var li_sname = jQuery('<li><label>大&nbsp;&nbsp;&nbsp;&nbsp;学：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
        school_name.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'school_name',
            operType: 'ajaxgetbasicschool',
            url: 'school_personal.axd',
            params: "school_typeid:" + 1,
            callback: function (obj) {
                school_name.val(obj.text);
            }
        }, school_name);

        //graduation date
        var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //degree
        li_degree = jQuery('<li><label>学&nbsp;&nbsp;&nbsp;&nbsp;位：</label></li>').appendTo(box);
        var degree = jQuery('<select id="degree"></select>').appendTo(li_degree);
        degree.append(degreeList);
        //specialty
        var li_specialty = jQuery('<li><label>专&nbsp;&nbsp;&nbsp;&nbsp;业：</label></li>').appendTo(box);
        var specialty = jQuery('<input type="text" class="w170" id="specialty" />').appendTo(li_specialty);
        specialty.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'major_name',
            operType: 'ajaxgetbasicmajor',
            url: 'major_personal.axd',
            callback: function (obj) {
                specialty.val(obj.text);
            }
        }, specialty);
        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="hobby_but" value="添加 " />').appendTo(operate_btn);
        var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var eduDegree = degree.val();
            var eduSpecialty = $.trim(specialty.val())

            if (!schoolName) {
                alert(wanerdaoLangTip('personal_00010'));
                school_name.val('');
                school_name.focus();
            } else if (!eduSpecialty) {
                alert(wanerdaoLangTip('personal_00011'));
                eduSpecialty.val('');
                eduSpecialty.focus();
            } else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:1,school_name:"' + schoolName + '",end_year:' + endY
                 + ',end_month:' + endM + ',degree:"' + eduDegree + '",major:"' + eduSpecialty + '"}', function (data) {
                     if (data.result) {
                         getEducationInfo();
                         getCurSchool();
                     } else {
                         alert(data.msg);
                     }
                     edit_state = false;
                 });
            }
            return false;
        });

        btn_cancel.click(function () {
            box.parent().parent().remove();
            edit_state = false;
        });
    } else if (type == 2) { //high school
        var li_sname = jQuery('<li><label>高&nbsp;&nbsp;&nbsp;&nbsp;中：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
        school_name.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'school_name',
            operType: 'ajaxgetbasicschool',
            url: 'school_personal.axd',
            params: "school_typeid:" + 2,
            callback: function (obj) {
                school_name.val(obj.text);
            }
        }, school_name);
        //graduation date
        var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //class
        li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label><p>高一</p></li>').appendTo(box);
        var s_class1 = jQuery('<input type="text" class="w110 mr250" />').appendTo(li_class);
        li_class.append('<p class="ml60">高二</p>');
        var s_class2 = jQuery('<input type="text" class="w110 mr250" />').appendTo(li_class);
        li_class.append('<p class="ml60">高三</p>');
        var s_class3 = jQuery('<input type="text" class="w110" />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="hobby_but" value="添加 " />').appendTo(operate_btn);
        var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var class1 = $.trim(s_class1.val());
            var class2 = $.trim(s_class2.val());
            var class3 = $.trim(s_class3.val());

            if (!schoolName) {
                alert(wanerdaoLangTip('personal_00010'));
                school_name.val('');
                school_name.focus();
            } else if (!(class1 && class2 && class3)) {
                alert(wanerdaoLangTip('personal_00012'));
                if (!class1) { s_class1.focus(); }
                else if (!class2) { s_class2.focus(); }
                else { s_class3.focus(); }
            }
            else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:2,school_name:"' + schoolName + '",end_year:' + endY
                + ',end_month:' + endM + ',class:"' + class1 + '",class2:"' + class2 + '",class3:"' + class3 + '"}', function (data) {
                    if (data.result) {
                        getEducationInfo();
                        getCurSchool();
                    } else {
                        alert(data.msg);
                    }
                    edit_state = false;
                });
            }
            return false;
        });

        btn_cancel.click(function () {
            box.parent().parent().remove();
        });
    } else if (type == 3) {//vocational high
        var li_sname = jQuery('<li><label>职&nbsp;&nbsp;&nbsp;&nbsp;高：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
        school_name.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'school_name',
            operType: 'ajaxgetbasicschool',
            url: 'school_personal.axd',
            params: "school_typeid:" + 3,
            callback: function (obj) {
                school_name.val(obj.text);
            }
        }, school_name);
        //graduation date
        var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //class
        li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="w110 " />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="hobby_but" value="添加 " />').appendTo(operate_btn);
        var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var hclass = $.trim(s_class.val());

            if (!schoolName) {
                alert(wanerdaoLangTip('personal_00010'));
                school_name.val('');
                school_name.focus();
            } else if (!hclass) {
                alert(wanerdaoLangTip('personal_00012'));
                s_class.focus();
            } else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:3,school_name:"' + schoolName + '",end_year:' + endY
                    + ',end_month:' + endM + ',class:"' + hclass + '"}', function (data) {
                        if (data.result) {
                            getEducationInfo();
                            getCurSchool();
                        } else {
                            alert(data.msg);
                        }
                        edit_state = false;
                    });
            }
            return false;
        });

        btn_cancel.click(function () {
            box.parent().parent().remove();
            edit_state = false;
        });
    } else if (type == 4) {//
        var li_sname = jQuery('<li><label>初&nbsp;&nbsp;&nbsp;&nbsp;中：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
        school_name.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'school_name',
            operType: 'ajaxgetbasicschool',
            url: 'school_personal.axd',
            params: "school_typeid:" + 4,
            callback: function (obj) {
                school_name.val(obj.text);
            }
        }, school_name);
        //graduation date
        var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //class
        li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="w110 mr250" />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="hobby_but" value="添加 " />').appendTo(operate_btn);
        var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var hclass = s_class.val();

            if (!schoolName) {
                alert(wanerdaoLangTip('personal_00010'));
                school_name.val('');
                school_name.focus();
            } else if (!hclass) {
                alert(wanerdaoLangTip('personal_00012'));
                s_class.focus();
            }
            else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:4,school_name:"' + schoolName + '",end_year:' + endY
                + ',end_month:' + endM + ',class:"' + hclass + '"}', function (data) {
                    if (data.result) {
                        getEducationInfo();
                        getCurSchool();
                    } else {
                        alert(data.msg);
                    }
                    edit_state = false;
                });
            }
        });

        btn_cancel.click(function () {
            box.parent().parent().remove();
            edit_state = false;
        });
    } else if (type == 5) {
        var li_sname = jQuery('<li><label>中&nbsp;&nbsp;&nbsp;&nbsp;专：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
        school_name.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'school_name',
            operType: 'ajaxgetbasicschool',
            url: 'school_personal.axd',
            params: "school_typeid:" + 5,
            callback: function (obj) {
                school_name.val(obj.text);
            }
        }, school_name);
        //graduation date
        var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);

        var li_specialty = jQuery('<li><label>专&nbsp;&nbsp;&nbsp;&nbsp;业：</label>').appendTo(box);
        var specialty = jQuery('<input type="text" class="w110" />').appendTo(li_specialty);
        specialty.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'major_name',
            operType: 'ajaxgetbasicmajor',
            url: 'major_personal.axd',
            callback: function (obj) {
                specialty.val(obj.text);
            }
        }, specialty);
        //class
        var li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="w110" />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="hobby_but" value="添加 " />').appendTo(operate_btn);
        var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var s_specialty = specialty.val();
            var hclass = s_class.val();

            if (!schoolName) {
                alert(wanerdaoLangTip('personal_00010'));
                school_name.val('');
                school_name.focus();
            }
            else if (!hclass) {
                alert(wanerdaoLangTip('personal_00012'));
                s_class.focus();
            }
            else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:5,school_name:"' + schoolName + '",end_year:' + endY
                + ',end_month:' + endM + ',class:"' + hclass + '",major:"' + s_specialty + '"}', function (data) {
                    if (data.result) {
                        getEducationInfo();
                        getCurSchool();
                    } else {
                        alert(data.msg);
                    }
                    edit_state = false;
                });
            }
            return false;
        });

        btn_cancel.click(function () {
            box.parent().parent().remove();
            edit_state = false;
        });
    } else if (type == 6) {
        var li_sname = jQuery('<li><label>小&nbsp;&nbsp;&nbsp;&nbsp;学：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
        school_name.AutoCompelteSimple({
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: 'id',
            displayTextField: 'school_name',
            operType: 'ajaxgetbasicschool',
            url: 'school_personal.axd',
            params: "school_typeid:" + 6,
            callback: function (obj) {
                school_name.val(obj.text);
            }
        }, school_name);
        //graduation date
        var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);

        //class
        var li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="w110" />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="hobby_but" value="添加 " />').appendTo(operate_btn);
        var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var hclass = s_class.val();

            if (!schoolName) {
                alert(wanerdaoLangTip('personal_00010'));
                school_name.val('');
                school_name.focus();
            } else if (!hclass) {
                alert(wanerdaoLangTip('personal_00012'));
                s_class.focus();
            } else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:6,school_name:"' + schoolName + '",end_year:' + endY
                + ',end_month:' + endM + ',class:"' + hclass + '"}', function (data) {
                    if (data.result) {
                        getEducationInfo();
                        getCurSchool();
                    } else {
                        alert(data.msg);
                    }
                    edit_state = false;
                });
            }
            return false;
        });

        btn_cancel.click(function () {
            box.parent().parent().remove();
            edit_state = false;
        });
    }
}

function doEducationPost(opertype, json, callback) {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'" + opertype + "',json:{model:" + json + "}}",
        error: function (data) {
            alert('load workinfo fail');
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/* show education item */
function showEducationItem(type, box) {
    if (educationinfo.length > 0) {
        $.each(educationinfo, function (i, v) {
            if (type == 1 && v.school_type == 1) {
                SchoolType1(box, v);
            } else if (type == 2 && v.school_type == 2) {
                SchoolType2(box, v);
            } else if (type == 3 && v.school_type == 3) {
                SchoolType3(box, v);
            } else if (type == 4 && v.school_type == 4) {
                SchoolType4(box, v);
            } else if (type == 5 && v.school_type == 5) {
                SchoolType5(box, v);
            } else if (type == 6 && v.school_type == 6) {
                SchoolType6(box, v);
            }
        });
    }
}

/* show school type 1*/
function SchoolType1(box, v) {
    var edu_item_box = jQuery('<div class="hobby_list"></div').appendTo(box);
    var edu_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(edu_item_box);
    var ul_edu_item = jQuery('<ul></ul>').appendTo(edu_info_box);
    ul_edu_item.append($wd.format('<li><label>大&nbsp;&nbsp;&nbsp;&nbsp;学：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>毕业时间：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>学&nbsp;&nbsp;&nbsp;&nbsp;位：</label> {0}</li>', v.degree));
    ul_edu_item.append($wd.format('<li class="m0"><label>专&nbsp;&nbsp;&nbsp;&nbsp;业：</label> {0}</li>', v.major));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(ul_edu_item);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">删除</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

        link_del.click(function () {
            if (confirm(wanerdaoLangTip('personal_00006'))) {
                $.ajax({
                    url: "../wanerdao_personal.axd",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'deletepersonaleducation',id:'" + v.id + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            edu_item_box.remove();
                            getCurSchool();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);

                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);
                    var li_sname = jQuery('<li><label>大&nbsp;&nbsp;&nbsp;&nbsp;学：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
                    school_name.val(v.school_name);
                    school_name.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'school_name',
                        operType: 'ajaxgetbasicschool',
                        url: 'school_personal.axd',
                        params: "school_typeid:" + 1,
                        callback: function (obj) {
                            school_name.val(obj.text);
                        }
                    }, school_name);
                    //graduation date
                    var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
                    var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //degree
                    li_degree = jQuery('<li><label>学&nbsp;&nbsp;&nbsp;&nbsp;位：</label></li>').appendTo(ul_edu_detail);
                    var degree = jQuery('<select id="degree"></select>').appendTo(li_degree);
                    degree.append(degreeList);
                    degree.val(v.degree);
                    //specialty
                    var li_specialty = jQuery('<li><label>专&nbsp;&nbsp;&nbsp;&nbsp;业：</label></li>').appendTo(ul_edu_detail);
                    var specialty = jQuery('<input type="text" class="w170" id="specialty" />').appendTo(li_specialty);
                    specialty.val(v.major);
                    specialty.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'major_name',
                        operType: 'ajaxgetbasicmajor',
                        url: 'major_personal.axd',
                        callback: function (obj) {
                            specialty.val(obj.text);
                        }
                    }, specialty);
                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="hobby_but" value="保存 " />').appendTo(operate_btn);
                    var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var eduDegree = degree.val();
                        var eduSpecialty = specialty.val();

                        if (!schoolName) {
                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:' + v.school_type + ',school_name:"' + schoolName + '",end_year:' + endY
                                        + ',end_month:' + endM + ',degree:"' + eduDegree + '",major:"' + eduSpecialty + '"}', function (data) {
                                            if (data.result) {
                                                getEducationInfo();
                                                getCurSchool();
                                            } else {
                                                alert(data.msg);
                                                btn_edit.removeAttr('disabled');
                                            }
                                            edit_state = false;
                                        });
                        }
                    });

                    //cancel
                    btn_cancel.click(function () {
                        edu_item_box.find('.hobby_listB').remove();
                        edit_state = false;
                    });

                    edit_edu_input_box.append('<div class="hobby_tagB"></div>');
                } else {
                    alert(wanerdaoLangTip('personal_00005'));
                }
            } else {
                edu_item_box.find('.hobby_listB').remove();
                edit_state = false;
            }
        });

    }
}

/* show school type 2*/
function SchoolType2(box, v) {
    var edu_item_box = jQuery('<div class="hobby_list"></div').appendTo(box);
    var edu_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(edu_item_box);
    var ul_edu_item = jQuery('<ul></ul>').appendTo(edu_info_box);
    ul_edu_item.append($wd.format('<li><label>高&nbsp;&nbsp;&nbsp;&nbsp;中：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>毕业时间：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li class="m0 lh20"><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label><p class="lh20">高一 {0}<br />高二 {1}<br />高三 {2}</p></li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(ul_edu_item);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">删除</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

        link_del.click(function () {
            if (confirm(wanerdaoLangTip('personal_00006'))) {
                $.ajax({
                    url: "../wanerdao_personal.axd",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'deletepersonaleducation',id:'" + v.id + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            edu_item_box.remove();
                            getCurSchool();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);
                    var li_sname = jQuery('<li><label>高&nbsp;&nbsp;&nbsp;&nbsp;中：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
                    school_name.val(v.school_name);
                    school_name.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'school_name',
                        operType: 'ajaxgetbasicschool',
                        url: 'school_personal.axd',
                        params: "school_typeid:" + 2,
                        callback: function (obj) {
                            school_name.val(obj.text);
                        }
                    }, school_name);
                    //graduation date
                    var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
                    var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label><p>高一</p></li>').appendTo(ul_edu_detail);
                    var s_class1 = jQuery('<input type="text" class="w110 mr250" />').appendTo(li_class);
                    li_class.append('<p class="ml60">高二</p>');
                    var s_class2 = jQuery('<input type="text" class="w110 mr250" />').appendTo(li_class);
                    li_class.append('<p class="ml60">高三</p>');
                    var s_class3 = jQuery('<input type="text" class="w110" />').appendTo(li_class);
                    s_class1.val(v.Class);
                    s_class2.val(v.class2);
                    s_class3.val(v.class3);

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="hobby_but" value="保存 " />').appendTo(operate_btn);
                    var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class1 = s_class1.val();
                        var class2 = s_class2.val();
                        var class3 = s_class3.val();

                        if (!schoolName) {

                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:2,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class1 + '",class2:"' + class2 + '",class3:"' + class3 + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    alert(data.msg);
                                    btn_edit.removeAttr('disabled');
                                }
                                edit_state = false;
                            });
                        }
                    });

                    //cancel
                    btn_cancel.click(function () {
                        edu_item_box.find('.hobby_listB').remove();
                        edit_state = false;
                    });

                    edit_edu_input_box.append('<div class="hobby_tagB"></div>');
                } else {
                    alert(wanerdaoLangTip('personal_00005'));
                }
            } else {
                edu_item_box.find('.hobby_listB').remove();
                edit_state = false;
            }
        });

    }
}

/* show school type 3*/
function SchoolType3(box, v) {
    var edu_item_box = jQuery('<div class="hobby_list"></div').appendTo(box);
    var edu_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(edu_item_box);
    var ul_edu_item = jQuery('<ul></ul>').appendTo(edu_info_box);
    ul_edu_item.append($wd.format('<li><label>职&nbsp;&nbsp;&nbsp;&nbsp;高：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>毕业时间：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li class="m0"><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label> {0}</li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(ul_edu_item);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">删除</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

        link_del.click(function () {
            if (confirm(wanerdaoLangTip('personal_00006'))) {
                $.ajax({
                    url: "../wanerdao_personal.axd",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'deletepersonaleducation',id:'" + v.id + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            edu_item_box.remove();
                            getCurSchool();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);

                    var li_sname = jQuery('<li><label>职&nbsp;&nbsp;&nbsp;&nbsp;高：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
                    school_name.val(v.school_name);
                    school_name.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'school_name',
                        operType: 'ajaxgetbasicschool',
                        url: 'school_personal.axd',
                        params: "school_typeid:" + 3,
                        callback: function (obj) {
                            school_name.val(obj.text);
                        }
                    }, school_name);
                    //graduation date
                    var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
                    var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="w110 " />').appendTo(li_class);
                    s_class.val(v.Class);

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="hobby_but" value="保存 " />').appendTo(operate_btn);
                    var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class_s = s_class.val();

                        if (!schoolName) {

                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:3,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    alert(data.msg);
                                    btn_edit.removeAttr('disabled');
                                }
                                edit_state = false;
                            });
                        }
                    });

                    //cancel
                    btn_cancel.click(function () {
                        edu_item_box.find('.hobby_listB').remove();
                        edit_state = false;
                    });

                    edit_edu_input_box.append('<div class="hobby_tagB"></div>');
                } else {
                    alert(wanerdaoLangTip('personal_00005'));
                }
            } else {
                edu_item_box.find('.hobby_listB').remove();
                edit_state = false;
            }
        });

    }
}

/* show school type 4*/
function SchoolType4(box, v) {
    var edu_item_box = jQuery('<div class="hobby_list"></div').appendTo(box);
    var edu_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(edu_item_box);
    var ul_edu_item = jQuery('<ul></ul>').appendTo(edu_info_box);
    ul_edu_item.append($wd.format('<li><label>初&nbsp;&nbsp;&nbsp;&nbsp;中：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>毕业时间：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li class="m0"><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label> {0}</li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(ul_edu_item);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">删除</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

        link_del.click(function () {
            if (confirm(wanerdaoLangTip('personal_00006'))) {
                $.ajax({
                    url: "../wanerdao_personal.axd",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'deletepersonaleducation',id:'" + v.id + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            edu_item_box.remove();
                            getCurSchool();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);

                    var li_sname = jQuery('<li><label>初&nbsp;&nbsp;&nbsp;&nbsp;中：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
                    school_name.val(v.school_name);
                    school_name.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'school_name',
                        operType: 'ajaxgetbasicschool',
                        url: 'school_personal.axd',
                        params: "school_typeid:" + 4,
                        callback: function (obj) {
                            school_name.val(obj.text);
                        }
                    }, school_name);
                    //graduation date
                    var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
                    var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="w110 " />').appendTo(li_class);
                    s_class.val(v.Class);

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="hobby_but" value="保存 " />').appendTo(operate_btn);
                    var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class_s = s_class.val();

                        if (!schoolName) {

                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:4,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    alert(data.msg)
                                    btn_edit.removeAttr('disabled'); ;
                                }
                                edit_state = false;
                            });
                        }
                    });

                    //cancel
                    btn_cancel.click(function () {
                        edu_item_box.find('.hobby_listB').remove();
                        edit_state = false;
                    });

                    edit_edu_input_box.append('<div class="hobby_tagB"></div>');
                } else {
                    alert(wanerdaoLangTip('personal_00005'));
                }
            } else {
                edu_item_box.find('.hobby_listB').remove();
                edit_state = false;
            }
        });

    }
}

/* show school type 5*/
function SchoolType5(box, v) {
    var edu_item_box = jQuery('<div class="hobby_list"></div').appendTo(box);
    var edu_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(edu_item_box);
    var ul_edu_item = jQuery('<ul></ul>').appendTo(edu_info_box);
    ul_edu_item.append($wd.format('<li><label>中&nbsp;&nbsp;&nbsp;&nbsp;专：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>毕业时间：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>专&nbsp;&nbsp;&nbsp;&nbsp;业：</label> {0}</li>', v.major));
    ul_edu_item.append($wd.format('<li class="m0"><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label> {0}</li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(ul_edu_item);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">删除</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

        link_del.click(function () {
            if (confirm(wanerdaoLangTip('personal_00006'))) {
                $.ajax({
                    url: "../wanerdao_personal.axd",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'deletepersonaleducation',id:'" + v.id + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            edu_item_box.remove();
                            getCurSchool();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);

                    var li_sname = jQuery('<li><label>中&nbsp;&nbsp;&nbsp;&nbsp;专：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
                    school_name.val(v.school_name);
                    school_name.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'school_name',
                        operType: 'ajaxgetbasicschool',
                        url: 'school_personal.axd',
                        params: "school_typeid:" + 5,
                        callback: function (obj) {
                            school_name.val(obj.text);
                        }
                    }, school_name);
                    //graduation date
                    var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
                    var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //specialty
                    var li_specialty = jQuery('<li><label>专&nbsp;&nbsp;&nbsp;&nbsp;业：</label>').appendTo(ul_edu_detail);
                    var specialty = jQuery('<input type="text" class="w110" />').appendTo(li_specialty);
                    specialty.val(v.major);
                    specialty.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'major_name',
                        operType: 'ajaxgetbasicmajor',
                        url: 'major_personal.axd',
                        callback: function (obj) {
                            specialty.val(obj.text);
                        }
                    }, specialty);
                    //class
                    li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="w110 " />').appendTo(li_class);
                    s_class.val(v.Class);

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="hobby_but" value="保存 " />').appendTo(operate_btn);
                    var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var s_specialty = specialty.val();
                        var class_s = s_class.val();

                        if (!schoolName) {

                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:5,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '",major:"' + s_specialty + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    alert(data.msg);
                                    btn_edit.removeAttr('disabled');
                                }
                                edit_state = false;
                            });
                        }
                    });

                    //cancel
                    btn_cancel.click(function () {
                        edu_item_box.find('.hobby_listB').remove();
                        edit_state = false;
                    });

                    edit_edu_input_box.append('<div class="hobby_tagB"></div>');
                } else {
                    alert(wanerdaoLangTip('personal_00005'));
                }
            } else {
                edu_item_box.find('.hobby_listB').remove();
                edit_state = false;
            }
        });

    }
}

/* show school type 6*/
function SchoolType6(box, v) {
    var edu_item_box = jQuery('<div class="hobby_list"></div').appendTo(box);
    var edu_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(edu_item_box);
    var ul_edu_item = jQuery('<ul></ul>').appendTo(edu_info_box);
    ul_edu_item.append($wd.format('<li><label>小&nbsp;&nbsp;&nbsp;&nbsp;学：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>毕业时间：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li class="m0"><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label> {0}</li>', v.Class));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(ul_edu_item);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">删除</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

        link_del.click(function () {
            if (confirm(wanerdaoLangTip('personal_00006'))) {
                $.ajax({
                    url: "../wanerdao_personal.axd",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'deletepersonaleducation',id:'" + v.id + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            edu_item_box.remove();
                            getCurSchool();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);
                    var li_sname = jQuery('<li><label>小&nbsp;&nbsp;&nbsp;&nbsp;学：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="w170" id="school_name" />').appendTo(li_sname);
                    school_name.val(v.school_name);
                    school_name.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'school_name',
                        operType: 'ajaxgetbasicschool',
                        url: 'school_personal.axd',
                        params: "school_typeid:" + 6,
                        callback: function (obj) {
                            school_name.val(obj.text);
                        }
                    }, school_name);
                    //graduation date
                    var li_graduation = jQuery('<li><label>毕业时间：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
                    var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>班&nbsp;&nbsp;&nbsp;&nbsp;级：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="w110 " />').appendTo(li_class);
                    s_class.val(v.Class);

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="hobby_but" value="保存 " />').appendTo(operate_btn);
                    var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01 cancel_modify" value="取消 " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class_s = s_class.val();

                        if (!schoolName) {

                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:6,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    alert(data.msg);
                                    btn_edit.removeAttr('disabled');
                                }
                                edit_state = false;
                            });
                        }
                    });

                    //cancel
                    btn_cancel.click(function () {
                        edu_item_box.find('.hobby_listB').remove();
                        edit_state = false;
                    });

                    edit_edu_input_box.append('<div class="hobby_tagB"></div>');
                } else {
                    alert(wanerdaoLangTip('personal_00005'));
                }
            } else {
                edu_item_box.find('.hobby_listB').remove();
                edit_state = false;
            }
        });

    }
}

/************************************************* education end********************************************/

/************************************************* work info ********************************************/

/*Get work Info*/
function getWorkInfo() {
    $('.datum_hobby').empty().loading();
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalwork',uid:'" + uid + "'}",
        error: function (data) {
            alert('load workinfo fail');
        },
        success: function (data) {
            if (data.result) {
                workinfo = data.rows;
                setWorkInfo();
            }
        }
    });
}


/*Set Work Info*/
function setWorkInfo() {
    var hasNow = false;
    var work_box = $('.datum_hobby').empty();
    if (workinfo.length > 0) {
        $.each(workinfo, function (i, v) {
            if (v.is_present) {
                hasNow = true;
            }
            var beginTime = eval('new ' + v.begin_date.substr(1, v.begin_date.length - 2));
            var endTime = eval('new ' + v.end_date.substr(1, v.end_date.length - 2));

            var work_item_box = jQuery('<div class="hobby_list"></div').appendTo(work_box);
            var work_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(work_item_box);

            var ul_work_item = jQuery('<ul></ul>').appendTo(work_info_box);
            ul_work_item.append($wd.format('<li><label>单&nbsp;位&nbsp;名：</label> {0}</li>', v.company_name));
            ul_work_item.append($wd.format('<li><label>行&nbsp;&nbsp;&nbsp;&nbsp;业：</label> <span class="pCategory"></span></li>'));
            ul_work_item.append($wd.format('<li><label>职&nbsp;&nbsp;&nbsp;&nbsp;位：</label> <span class="pName"></span></li>'));
            ul_work_item.append($wd.format('<li class="m0"><label>工作时间：</label> {0} 至 {1}</li>', (beginTime.getFullYear() + '/' + (beginTime.getMonth() + 1)), (v.is_present ? '现工作' : (endTime.getFullYear() + '/' + (endTime.getMonth() + 1)))));

            getPositionCategory(function (data) {
                $.each(data, function (i, industry) {
                    if (industry.id == v.position_category) {
                        ul_work_item.find('.pCategory').html(industry.category_name);
                    }
                });
            });

            setPosition(v.position_category, v.position_name, ul_work_item.find('.pName'));

            if (self) {
                var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(work_info_box);
                var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">删除</a>').appendTo(edit_handler);
                var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler);

                link_del.click(function () {
                    if (confirm(wanerdaoLangTip('personal_00006'))) {
                        $.ajax({
                            url: "../wanerdao_personal.axd",
                            type: "post",
                            dataType: "json",
                            cache: false,
                            data: "{opertype:'deletepersonalwork',id:'" + v.id + "'}",
                            error: function (data) {
                            },
                            success: function (data) {
                                if (data.result) {
                                    work_item_box.remove();
                                    getCurWork();
                                } else {
                                    alert(data.msg);
                                }
                            }
                        });
                    }
                });

                link_edit.click(function () {
                    if (work_item_box.find('.hobby_listB').length == 0) {
                        if (!edit_state) {
                            edit_state = true;
                            var edit_work_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(work_item_box);
                            edit_work_input_box.append('<div class="hobby_tagT"></div>');
                            var work_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_work_input_box);

                            var ul_work_detail = jQuery('<ul></ul>').appendTo(work_detail);
                            /* unit name*/
                            var li_unit = jQuery('<li><label>单&nbsp;位&nbsp;名：</label></li>').appendTo(ul_work_detail);
                            var unit_name = jQuery('<input type="text" class="w170" id="unit_name" />').appendTo(li_unit);
                            unit_name.val(v.company_name);

                            //ajaxgetcompanybasic
                            //ajaxgetcompanybasic
                            unit_name.AutoCompelteSimple({
                                nofind: null,
                                fingMsg: null, /*提示栏的信息*/
                                displayValueField: 'id',
                                displayTextField: 'company_name',
                                url: 'company_personal.axd',
                                operType: 'ajaxgetcompanybasic',
                                callback: function (obj) {
                                    unit_name.val(obj.text);
                                }
                            }, unit_name);

                            /* industry */
                            var li_industry = jQuery('<li><label>行&nbsp;&nbsp;&nbsp;&nbsp;业：</label></li>').appendTo(ul_work_detail);
                            var work_industry = jQuery('<select name="work_industry" id="work_industry"></select>').appendTo(li_industry);
                            work_industry.append('<option value="">-选择行业-</option>');

                            /* office */
                            var li_office = jQuery('<li><label>职&nbsp;&nbsp;&nbsp;&nbsp;位：</label></li>').appendTo(ul_work_detail);
                            var work_office = jQuery('<select name="work_office" id="work_office"></select>').appendTo(li_office);
                            work_office.append('<option value="">-选择职位-</option>');

                            getPositionCategory(function (data) {
                                $.each(data, function (i, o) {
                                    if (o.id == v.position_category) {
                                        work_industry.append($wd.format('<option value="{0}" selected="selected">{1}</option>', o.id, o.category_name));
                                    } else {
                                        work_industry.append($wd.format('<option value="{0}">{1}</option>', o.id, o.category_name));
                                    }
                                });

                                if (v.position_category) {
                                    var position_value = work_industry.find('option:selected').val();
                                    getPosition(work_office, v.position_name, position_value);
                                }
                            });

                            work_industry.change(function () {
                                if ($(this).val()) {
                                    getPosition(work_office, '', $(this).val());
                                }
                            });


                            /* work time */
                            var li_work_time = jQuery('<li><label>工作时间：</label></li>').appendTo(ul_work_detail);
                            var begin_year = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                            var begin_month = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                            BindDateYM(begin_year, begin_month);
                            begin_year.val(beginTime.getFullYear());
                            begin_month.val(beginTime.getMonth() + 1);

                            li_work_time.append('&nbsp;至&nbsp;');
                            var end_year = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                            var end_month = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                            BindDateYM(end_year, end_month);
                            end_year.val(endTime.getFullYear());
                            end_month.val(endTime.getMonth() + 1);

                            var now_work = jQuery('<input name="now_work" type="checkbox" class="inp_dx" value="" id="now_work">').appendTo(li_work_time);
                            li_work_time.append('<i onclick="checkbox2(\'now_work\')" >现工作</i>');

                            now_work.click(function () {
                                if (now_work.attr('checked')) {
                                    end_year.hide();
                                    end_month.hide();
                                } else {
                                    end_year.show();
                                    end_month.show();
                                }
                            });
                            if (v.is_present) {
                                now_work.click();
                                if (now_work.attr('checked')) {
                                    end_year.hide();
                                    end_month.hide();
                                } else {
                                    end_year.show();
                                    end_month.show();
                                }
                            }

                            //button
                            var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_work_detail);
                            var btn_add = jQuery('<input type="button" class="hobby_but" value="保存" />').appendTo(operate_btn);
                            var btn_cancel = jQuery('<input type="button" class="hobby_but01 cancel_modify" value="取消" />').appendTo(operate_btn);

                            btn_add.click(function () {
                                if (!$.trim(unit_name.val())) {
                                    alert(wanerdaoLangTip('personal_00001'));
                                    return false;
                                } else if (!work_industry.val()) {
                                    alert(wanerdaoLangTip('personal_00002'));
                                    return false;
                                } else if (!work_office.val()) {
                                    alert(wanerdaoLangTip('personal_00003'));
                                    return false;
                                } else if (hasNow && !v.is_present && now_work.attr('checked')) {
                                    alert(wanerdaoLangTip('personal_00004'));
                                    return false;
                                }
                                else {
                                    btn_add.attr('disabled', true);
                                    var beginT = begin_year.val() + "-" + begin_month.val() + "-1";
                                    var endT = '';
                                    if (!now_work.attr('checked')) {
                                        endT = end_year.val() + "-" + end_month.val() + "-1";
                                    }

                                    var present = now_work.attr('checked') ? true : false; ;

                                    $.ajax({
                                        url: "../wanerdao_personal.axd",
                                        type: "post",
                                        dataType: "json",
                                        cache: false,
                                        data: "{opertype:'updatepersonalwork',id:'" + v.id + "',cname:'" + unit_name.val() + "',pcat:'" + work_industry.val() + "',pname:'" + work_office.val()
                        + "',begindate:'" + beginT + "',enddate:'" + endT + "',present:'" + present + "',desc:''}",
                                        error: function (data) {
                                            btn_add.removeAttr('disabled');
                                        },
                                        success: function (data) {
                                            if (data.result) {
                                                edit_work_input_box.remove();
                                                getWorkInfo();
                                                getCurWork();
                                                edit_state = false;
                                            } else {
                                                alert(data.msg);
                                                btn_add.removeAttr('disabled');
                                            }
                                        }
                                    });
                                }
                            });

                            btn_cancel.click(function () {
                                work_item_box.find('.hobby_listB').remove();
                                edit_state = false;
                            });

                            edit_work_input_box.append('<div class="hobby_tagB"></div>');

                        } else {
                            alert(wanerdaoLangTip('personal_00005'));
                        }
                    } else {
                        work_item_box.find('.hobby_listB').remove();
                        edit_state = false;
                    }
                });
            }
        });
    }

    if (self && max_work_count > workinfo.length) {
        /* add work box  */
        var add_work_box = jQuery('<div class="hobby_list" id="add_work_box"></div>').appendTo(work_box);
        var add_inner_box = jQuery('<div class="hobby_listT"></div>').appendTo(add_work_box);
        add_inner_box.append('<ul><li>&nbsp;</li></ul>');

        var add_hanlder_box = jQuery('<div class="fdbox"></div>').appendTo(add_inner_box);
        var update_per_link = jQuery('<a href="javascript:void(0);" class="保存">修改个人设置</a>').appendTo(add_hanlder_box);
        var add_link = jQuery('<a href="javascript:void(0);" class="inp_add">添加</a>').appendTo(add_hanlder_box);

        update_per_link.click(function () {
            setCustomPermission(updateWorkPer);
        });

        add_link.click(function () {
            if (add_work_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var add_work_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(add_work_box);
                    add_work_input_box.append('<div class="hobby_tagT"></div>');
                    var work_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(add_work_input_box);

                    var ul_work_detail = jQuery('<ul></ul>').appendTo(work_detail);
                    /* unit name*/
                    var li_unit = jQuery('<li><label>单&nbsp;位&nbsp;名：</label></li>').appendTo(ul_work_detail);
                    var unit_name = jQuery('<input type="text" class="w170" id="unit_name" />').appendTo(li_unit);
                    //ajaxgetcompanybasic
                    unit_name.AutoCompelteSimple({
                        nofind: null,
                        fingMsg: null, /*提示栏的信息*/
                        displayValueField: 'id',
                        displayTextField: 'company_name',
                        url: 'company_personal.axd',
                        operType: 'ajaxgetcompanybasic',
                        callback: function (obj) {
                            unit_name.val(obj.text);
                        }
                    }, unit_name);


                    /* industry */
                    var li_industry = jQuery('<li><label>行&nbsp;&nbsp;&nbsp;&nbsp;业：</label></li>').appendTo(ul_work_detail);
                    var work_industry = jQuery('<select name="work_industry" id="work_industry"></select>').appendTo(li_industry);
                    work_industry.append('<option value="">-选择行业-</option>');

                    /* office */
                    var li_office = jQuery('<li><label>职&nbsp;&nbsp;&nbsp;&nbsp;位：</label></li>').appendTo(ul_work_detail);
                    var work_office = jQuery('<select name="work_office" id="work_office"></select>').appendTo(li_office);
                    work_office.append('<option value="">-选择职位-</option>');

                    getPositionCategory(work_industry, '', function () {
                    });

                    work_industry.change(function () {
                        if ($(this).val()) {
                            getPosition(work_office, '', $(this).val());
                        }
                    });

                    /* work time */
                    var li_work_time = jQuery('<li><label>工作时间：</label></li>').appendTo(ul_work_detail);
                    var begin_year = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                    var begin_month = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                    BindDateYM(begin_year, begin_month);
                    li_work_time.append('&nbsp;至&nbsp;');
                    var end_year = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                    var end_month = jQuery('<select name="begin_time" id="begin_time"></select>').appendTo(li_work_time);
                    BindDateYM(end_year, end_month);
                    var now_work = jQuery('<input name="now_work" type="checkbox" class="inp_dx" value="" id="now_work">').appendTo(li_work_time);
                    now_work.click(function () {
                        if (now_work.attr('checked') == true) {
                            end_year.hide();
                            end_month.hide();
                        } else {
                            end_year.show();
                            end_month.show();
                        }
                    });
                    li_work_time.append('<i onclick="checkbox2(\'now_work\')" >现工作</i>');

                    //button
                    var operate_btn = jQuery('<li class=""></li>').appendTo(ul_work_detail);
                    var btn_add = jQuery('<input name="" type="button" class="hobby_but" value="添加" />').appendTo(operate_btn);
                    var btn_cancel = jQuery('<input name="" type="button" class="hobby_but01" value="取消" />').appendTo(operate_btn);

                    btn_add.click(function () {
                        if (!$.trim(unit_name.val())) {
                            alert(wanerdaoLangTip('personal_00001'));
                            return false;
                        } else if (!work_industry.val()) {
                            alert(wanerdaoLangTip('personal_00002'));
                            return false;
                        } else if (!work_office.val()) {
                            alert(wanerdaoLangTip('personal_00003'));
                            return false;
                        } else if (hasNow && now_work.attr('checked')) {
                            alert(wanerdaoLangTip('personal_00004'));
                            return false;
                        }
                        else {
                            var beginT = begin_year.val() + "-" + begin_month.val() + "-1";
                            var endT = '';
                            if (!now_work.attr('checked')) {
                                endT = end_year.val() + "-" + end_month.val() + "-1";
                            }

                            var present = now_work.attr('checked') ? true : false;

                            $.ajax({
                                url: "../wanerdao_personal.axd",
                                type: "post",
                                dataType: "json",
                                cache: false,
                                data: "{opertype:'addpersonalwork',cname:'" + unit_name.val() + "',pcat:'" + work_industry.val() + "',pname:'" + work_office.val()
                        + "',begindate:'" + beginT + "',enddate:'" + endT + "',present:'" + present + "',desc:''}",
                                error: function (data) {
                                },
                                success: function (data) {
                                    if (data.result) {
                                        add_work_input_box.remove();
                                        getWorkInfo();
                                        getCurWork();
                                        edit_state = false;
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            });
                        }
                    });

                    btn_cancel.click(function () {
                        add_work_box.find('.hobby_listB').remove();
                        edit_state = false;
                    });

                    add_work_input_box.append('<div class="hobby_tagB"></div>');
                } else {
                    alert(wanerdaoLangTip('personal_00005'));
                }
            } else {
                add_work_box.find('.hobby_listB').remove();
                edit_state = false;
            }
        });
    }
}

/************************************************* work inf end ********************************************/

/************************************************* interest ********************************************/

/*Get interest Info*/
function getInterestInfo() {
    $('.datum_hobby').empty().loading();
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalinterests',uid:'" + uid + "'}",
        error: function (data) {
            alert('load interestinfo fail');
        },
        success: function (data) {
            if (data.result) {
                interestinfo = data.obj;
                setInterestInfo();
            } else {
            }
        }
    });
}

function setInterestInfo() {
    var interest_box = jQuery('<div class="hobby_list"></div').appendTo($('.datum_hobby').empty());
    var interest_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(interest_box);

    var ul_interest = jQuery('<ul></ul>').appendTo(interest_info_box);
    ul_interest.append($wd.format('<li><label>爱听音乐：</label> {0}</li>', interestinfo.music));
    ul_interest.append($wd.format('<li><label>爱看电影：</label> {0}</li>', interestinfo.movie));
    ul_interest.append($wd.format('<li><label>爱玩游戏：</label> {0}</li>', interestinfo.game));
    ul_interest.append($wd.format('<li><label>喜欢漫画：</label> {0}</li>', interestinfo.cartoon));
    ul_interest.append($wd.format('<li><label>爱都书籍：</label> {0}</li>', interestinfo.book));
    ul_interest.append($wd.format('<li class="m0"><label>爱玩运动：</label> {0}</li>', interestinfo.sport));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(interest_info_box);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler)

        link_edit.click(function () {
            if (interest_box.find('.hobby_listB').length == 0) {
                var edit_box = jQuery('<div class="hobby_listB"></div>').appendTo(interest_box);
                edit_box.append('<div class="hobby_tagT"></div>');
                edit_box.append('<div class="hobby_tagC"></div>');

                var ul_edit_item = jQuery('<ul></ul>').appendTo(edit_box.find('.hobby_tagC'));
                var li_music = jQuery('<li><label>爱听音乐：</label></li>').appendTo(ul_edit_item);
                var interest_music = jQuery('<input type="text" id="interest_music" />').appendTo(li_music);
                interest_music.val(interestinfo.music);

                var li_movie = jQuery('<li><label>爱看电影：</label></li>').appendTo(ul_edit_item);
                var interest_movie = jQuery('<input type="text" id="interest_movie" />').appendTo(li_movie);
                interest_movie.val(interestinfo.movie);

                var li_game = jQuery('<li><label>爱玩游戏：</label></li>').appendTo(ul_edit_item);
                var interest_game = jQuery('<input type="text" id="interest_game" />').appendTo(li_game);
                interest_game.val(interestinfo.game);

                var li_cartoon = jQuery('<li><label>喜欢漫画：</label></li>').appendTo(ul_edit_item);
                var interest_cartoon = jQuery('<input type="text" id="interest_cartoon" />').appendTo(li_cartoon);
                interest_cartoon.val(interestinfo.cartoon);

                var li_book = jQuery('<li><label>爱都书籍：</label></li>').appendTo(ul_edit_item);
                var interest_book = jQuery('<input type="text" id="interest_book" />').appendTo(li_book);
                interest_book.val(interestinfo.book);

                var li_sport = jQuery('<li><label>爱玩运动：</label></li>').appendTo(ul_edit_item);
                var interest_sport = jQuery('<input type="text" id="interest_sport" />').appendTo(li_sport);
                interest_sport.val(interestinfo.sport);

                //button
                var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_edit_item);
                var btn_save = jQuery('<input name="interest_save" id="interest_save" type="button" class="hobby_but" value="保存 " >').appendTo(operate_btn);
                var btn_cancel = jQuery('<input name="interest_cancel" id="interest_cancel" type="button" class="hobby_but01 cancel_modify" value="取消 ">').appendTo(operate_btn);
                var btn_set_permission = jQuery('<input name="interest_set_permission" id="interest_set_permission" type="button"  class="hobby_but02" value="修改个人设置">').appendTo(operate_btn);

                //bind edit click event
                btn_save.click(function () {
                    btn_save.attr('disabled', true);
                    $.ajax({
                        url: "../wanerdao_personal.axd",
                        type: "post",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'updatepersonalinterests',music:'" + interest_music.val() + "',movie:'" + interest_movie.val()
            + "',game:'" + interest_game.val() + "',cartoon:'" + interest_cartoon.val() + "',book:'" + interest_book.val() + "',sport:'" + interest_sport.val() + "'}",
                        error: function (data) {
                        },
                        success: function (data) {
                            if (data.result) {
                                edit_box.remove();
                                getInterestInfo();
                                /*get personal basic info*/
                                getBaseInfo(function () {
                                    setPersonalInfo();
                                    getCurIntegrityScore();
                                });
                            } else {
                                alert(data.msg);
                            }
                        }
                    });
                });

                //bind cancel click event
                btn_cancel.click(function () {
                    edit_box.remove();
                });

                //bind private setting click event
                btn_set_permission.click(function () {
                    setCustomPermission(updateInterestsPer);
                });

                edit_box.append('<div class="hobby_tagB"></div>');
            } else {
                interest_box.find('.hobby_listB').remove();
            }
        });
    }
}


/************************************************* interest end ********************************************/


/************************************************* contact ********************************************/

/*Get Contact Info*/
function getContactInfo() {
    $('.datum_hobby').empty().loading();
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalcontact',uid:'" + uid + "'}",
        error: function (data) {
            alert('load contact fail');
        },
        success: function (data) {
            if (data.result) {
                contactinfo = data.obj;
                setContactInfo();
            } else {
            }
        }
    });
}

/*Set Contact Info*/
function setContactInfo() {
    var contact_box = jQuery('<div class="hobby_list"></div').appendTo($('.datum_hobby').empty());
    var contact_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(contact_box);

    var ul_contact = jQuery('<ul></ul>').appendTo(contact_info_box);
    ul_contact.append($wd.format('<li><label>E-mail：</label> {0}</li>', contactinfo.email));
    ul_contact.append($wd.format('<li><label>skype：</label> {0}</li>', contactinfo.skype));
    ul_contact.append($wd.format('<li><label>MSN：</label> {0}</li>', contactinfo.msn));
    ul_contact.append($wd.format('<li><label>手机号：</label> {0}</li>', contactinfo.cell));
    ul_contact.append($wd.format('<li class="m0"><label>个人网站：</label> {0}</li>', contactinfo.web_website));


    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(contact_info_box);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">修改</a>').appendTo(edit_handler)

        link_edit.click(function () {
            if (contact_box.find('.hobby_listB').length == 0) {
                var edit_box = jQuery('<div class="hobby_listB"></div>').appendTo(contact_box);
                edit_box.append('<div class="hobby_tagT"></div>');
                edit_box.append('<div class="hobby_tagC"></div>');

                var ul_edit_item = jQuery('<ul></ul>').appendTo(edit_box.find('.hobby_tagC'));
                //email
                var li_email = jQuery('<li><label>E-mail：</label></li>').appendTo(ul_edit_item);
                var contact_email = jQuery('<input type="text" class="w264" id="contact_email" readonly="readonly"/>').appendTo(li_email);
                contact_email.val(contactinfo.email);
                li_email.append('<span><a id="bind_email"></a></span>');
                //skype
                var li_skype = jQuery('<li><label>skype：</label></li>').appendTo(ul_edit_item);
                var contact_skype = jQuery('<input type="text" class="w264" id="contact_skype" />').appendTo(li_skype);
                contact_skype.val(contactinfo.skype);
                li_skype.append('<span><a id="bind_skype"></a></span>');
                //msn
                var li_msn = jQuery('<li><label>MSN：</label></li>').appendTo(ul_edit_item);
                var contact_msn = jQuery('<input type="text" class="w264" id="contact_msn" />').appendTo(li_msn);
                contact_msn.val(contactinfo.msn);
                li_msn.append('<span><a id="bind_msn"></a></span>');
                //cell
                var li_cell = jQuery('<li><label>手机号：</label></li>').appendTo(ul_edit_item);
                var contact_cell = jQuery('<input type="text" class="w264" id="contact_cell" />').appendTo(li_cell);
                contact_cell.val(contactinfo.cell);
                li_cell.append('<span><a id="bind_cell"></a></span>');

                //web site
                var li_website = jQuery('<li><label>个人网站：</label></li>').appendTo(ul_edit_item);
                var contact_website = jQuery('<input type="text" class="w264" id="contact_website" />').appendTo(li_website);
                contact_website.val(contactinfo.web_website);

                //button
                var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_edit_item);
                var btn_save = jQuery('<input name="contact_save" id="contact_save" type="button" class="hobby_but" value="保存 " />').appendTo(operate_btn);
                var btn_cancel = jQuery('<input name="interest_cancel" id="interest_cancel" type="button" class="hobby_but01 cancel_modify" value="取消 ">').appendTo(operate_btn);
                var btn_set_permission = jQuery('<input name="interest_set_permission" id="interest_set_permission" type="button"  class="hobby_but02" value="修改个人设置">').appendTo(operate_btn);

                setAccBind();

                //bind edit click event
                btn_save.click(function () {
                    $.ajax({
                        url: "../wanerdao_personal.axd",
                        type: "post",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'updatepersonalcontact',webemail:'" + contact_email.val() + "',skype:'" + contact_skype.val()
            + "',msn:'" + contact_msn.val() + "',tel:'" + contact_cell.val() + "',website:'" + contact_website.val() + "'}",
                        error: function (data) {
                        },
                        success: function (data) {
                            $('#div_contactinfo_2 .save').removeAttr('disabled');
                            $('#div_contactinfo_2').find('.wait').css('display', 'none');
                            if (data.result) {
                                contact_box.remove();
                                getContactInfo();
                                /*get personal basic info*/
                                getBaseInfo(function () {
                                    setPersonalInfo();
                                    getCurIntegrityScore();
                                });
                            } else {
                                alert(data.msg);
                            }
                        }
                    });
                });

                //bind cancel click event
                btn_cancel.click(function () {
                    edit_box.remove();
                });

                //bind private setting click event
                btn_set_permission.click(function () {
                    setCustomPermission(updateContactPer)
                });

                edit_box.append('<div class="hobby_tagB"></div>');
            } else {
                contact_box.find('.hobby_listB').remove();
            }
        });
    }

}

function setAccBind() {
    if (contactinfo.is_bond_email) {
        $('#bind_email').removeAttr('href');
        $('#bind_email').text('当前登录账号');
        $('#bind_email').parent().addClass('on');
    } else {
        if ($('#bind_email').parent().hasClass('on')) {
            $('#bind_email').parent().removeClass('on');
        }
        $('#bind_email').attr('href', 'javascript:;');
        $('#bind_email').text('设为当前账号');
        $('#bind_email').click(function (evt) {
            $.ajax({
                url: "../wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: "{opertype:'setemailasacc',acc:'" + $('#contact_email').val() + "'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result) {
                        $('#email_bond').unbind('click');
                        contactinfo.is_bond_email = true;
                        contactinfo.is_bond_skype = false;
                        contactinfo.is_bond_msn = false;
                        contactinfo.is_bond_cell = false;
                        setAccBind();
                    } else {
                        alert(data.msg + 'emaul');

                    }
                }
            });
        });
    }

    if (contactinfo.is_bond_skype) {
        $('#bind_skype').removeAttr('href');
        $('#bind_skype').text('当前登录账号');
        $('#bind_skype').parent().addClass('on');
    } else {
        if ($('#bind_skype').parent().hasClass('on')) {
            $('#bind_skype').parent().removeClass('on');
        }
        $('#bind_skype').attr('href', 'javascript:;');
        $('#bind_skype').text('设为当前账号');
        $('#bind_skype').click(function (evt) {
            $.ajax({
                url: "../wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: "{opertype:'setskypeasacc',acc:'" + $('#bind_skype').val() + "'}",
                error: function (data) {
                    alert('请求失败！');
                },
                success: function (data) {
                    if (data.result) {
                        $('#bind_skype').unbind('click');
                        contactinfo.is_bond_email = false;
                        contactinfo.is_bond_skype = true;
                        contactinfo.is_bond_msn = false;
                        contactinfo.is_bond_cell = false;
                        setAccBind();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        });
    }

    if (contactinfo.is_bond_msn) {
        $('#bind_msn').removeAttr('href');
        $('#bind_msn').text('当前登录账号');
        $('#bind_msn').parent().addClass('on');
    } else {
        if ($('#bind_msn').parent().hasClass('on')) {
            $('#bind_msn').parent().removeClass('on');
        }
        $('#bind_msn').attr('href', 'javascript:;');
        $('#bind_msn').text('设为当前账号');
        $('#bind_msn').click(function (evt) {
            $.ajax({
                url: "../wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: "{opertype:'setmsnasacc',acc:'" + $('#contact_msn').val() + "'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result) {
                        $('#msn_bond').unbind('click');
                        contactinfo.is_bond_email = false;
                        contactinfo.is_bond_skype = false;
                        contactinfo.is_bond_msn = true;
                        contactinfo.is_bond_cell = false;
                        setAccBind();
                    } else {
                        alert(data.msg);

                    }
                }
            });
        });
    }

    if (contactinfo.is_bond_cell) {
        $('#bind_cell').removeAttr('href');
        $('#bind_cell').text('当前登录账号');
        $('#bind_cell').parent().addClass('on');
    } else {
        if ($('#bind_cell').parent().hasClass('on')) {
            $('#bind_cell').parent().removeClass('on');
        }
        $('#bind_cell').attr('href', 'javascript:;');
        $('#bind_cell').text('设为当前账号');
        $('#bind_cell').click(function (evt) {
            $.ajax({
                url: "../wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: "{opertype:'settelasacc',acc:'" + $('#contact_cell').val() + "'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result) {
                        $('#tell_bond').unbind('click');
                        contactinfo.is_bond_email = false;
                        contactinfo.is_bond_skype = false;
                        contactinfo.is_bond_msn = false;
                        contactinfo.is_bond_cell = true;
                        setAccBind();
                    } else {
                        alert(data.msg);
                    }
                }
            });
        });
    }
}


/************************************************* contact end ********************************************/


/* get intergrity score*/
function getCurIntegrityScore() {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcurintegrityscore'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                // info integrity degree
                var i_integrity = jQuery('<i></i>').css('width', data.msg).appendTo($('#integrity').empty());
                i_integrity.html(data.msg + '%');
            } else {
                alert(data.msg);
            }
        }
    });
}

/*getcurschool*/
function getCurSchool() {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcurschool'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $('#is_display_school option[value="1"]').text(data.msg);
            } else {
                alert(data.msg);
            }
        }
    });
}

/*getcurwork*/
function getCurWork() {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcurwork'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $('#is_display_work option[value="1"]').text(data.msg);
            } else {
                alert(data.msg);
            }
        }
    });
}
/**************************************************** tools ****************************************************/

/* bind date selelct */
function bindDateSelect(select_y, select_m, select_d) {
    var date = new Date();
    for (i = date.getFullYear() - 99; i <= date.getFullYear(); i++) {
        select_y.append($wd.format('<option value="{0}">{0}</option>', i));
    }
    for (i = 1; i <= 12; i++) {
        select_m.append($wd.format('<option value="{0}">{0}</option>', i));
    }

    var lastDay = new Date(select_y.val(), select_m.val(), 0).getDate();
    for (i = 1; i <= lastDay; i++) {
        select_d.append($wd.format('<option value="{0}">{0}</option>', i));
    }

    select_y.change(function () {
        select_d.empty();
        var lastDay = new Date(select_y.val(), select_m.val(), 0).getDate();
        for (i = 1; i <= lastDay; i++) {
            select_d.append($wd.format('<option value="{0}">{0}</option>', i));
        }
    });

    select_m.change(function () {
        select_d.empty();
        var lastDay = new Date(select_y.val(), select_m.val(), 0).getDate();
        for (i = 1; i <= lastDay; i++) {
            select_d.append($wd.format('<option value="{0}">{0}</option>', i));
        }
    });
}

/*
 calc user conselation by select
*/
function calcConselaction() {
var month = $('#personal_birth_month').val();
var date = $('#personal_birth_day').val();
if ((month == 1 && date >= 20 & date <= 31) || (month == 2 && date <= 18 && date > 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[0]); }
if ((month == 2 && date >= 19 && date <= 30) || (month == 3 && date <= 20 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[1]); }
if ((month == 3 && date >= 21 && date <= 31) || (month == 4 && date <= 19 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[2]); }
if ((month == 4 && date >= 20 && date <= 30) || (month == 5 && date <= 20 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[3]); }
if ((month == 5 && date >= 21 && date <= 31) || (month == 6 && date <= 21 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[4]); }
if ((month == 6 && date >= 22 && date <= 30) || (month == 7 && date <= 22 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[5]); }
if ((month == 7 && date >= 23 && date <= 31) || (month == 8 && date <= 22 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[6]); }
if ((month == 8 && date >= 23 && date <= 31) || (month == 9 && date <= 22 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[7]); }
if ((month == 9 && date >= 23 && date <= 30) || (month == 10 && date <= 22 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[8]); }
if ((month == 10 && date >= 23 && date <= 31) || (month == 11 && date <= 21 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[9]); }
if ((month == 11 && date >= 22 && date <= 30) || (month == 12 && date <= 21 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[10]); }
if ((month == 12 && date >= 22 && date <= 31) || (month == 1 && date <= 19 && date >= 1)) { $('#personal_constellation').html(wanerdaoLangTip('personal_00019')[11]); }
}

/*

calc user Conselaction 
 if user conselaction is null, be used on Init, 
*/
function initConselaction() {
    var month = baseinfo.birthday_month;
    var date = baseinfo.birthday_day;
    if ((month == 1 && date >= 20 & date <= 31) || (month == 2 && date <= 18 && date > 1)) { return wanerdaoLangTip('personal_00019')[0]; }
    if ((month == 2 && date >= 19 && date <= 30) || (month == 3 && date <= 20 && date >= 1)) { return wanerdaoLangTip('personal_00019')[1]; }
    if ((month == 3 && date >= 21 && date <= 31) || (month == 4 && date <= 19 && date >= 1)) { return wanerdaoLangTip('personal_00019')[2]; }
    if ((month == 4 && date >= 20 && date <= 30) || (month == 5 && date <= 20 && date >= 1)) { return wanerdaoLangTip('personal_00019')[3]; }
    if ((month == 5 && date >= 21 && date <= 31) || (month == 6 && date <= 21 && date >= 1)) { return wanerdaoLangTip('personal_00019')[4]; }
    if ((month == 6 && date >= 22 && date <= 30) || (month == 7 && date <= 22 && date >= 1)) { return wanerdaoLangTip('personal_00019')[5]; }
    if ((month == 7 && date >= 23 && date <= 31) || (month == 8 && date <= 22 && date >= 1)) { return wanerdaoLangTip('personal_00019')[6]; }
    if ((month == 8 && date >= 23 && date <= 31) || (month == 9 && date <= 22 && date >= 1)) { return wanerdaoLangTip('personal_00019')[7]; }
    if ((month == 9 && date >= 23 && date <= 30) || (month == 10 && date <= 22 && date >= 1)) { return wanerdaoLangTip('personal_00019')[8]; }
    if ((month == 10 && date >= 23 && date <= 31) || (month == 11 && date <= 21 && date >= 1)) { return wanerdaoLangTip('personal_00019')[9]; }
    if ((month == 11 && date >= 22 && date <= 30) || (month == 12 && date <= 21 && date >= 1)) { return wanerdaoLangTip('personal_00019')[10]; }
    if ((month == 12 && date >= 22 && date <= 31) || (month == 1 && date <= 19 && date >= 1)) { return wanerdaoLangTip('personal_00019')[11]; }
}


function BindDateYM(y, m) {
    var date = new Date();
    for (i = date.getFullYear(); i >= date.getFullYear() - 99; i--) {
        y.append($wd.format('<option value="{0}">{0}</option>', i));
    }

    for (i = 1; i <= 12; i++) {
        m.append($wd.format('<option value="{0}">{0}</option>', i));
    }
}

function checkbox2() {

}


//update base permssion
function updateBasePer(data) {
    //permission
    ajaxfunc('permission_personal.axd', "{opertype:'updatepersonalprofilepermission',permission:'" + data.id + "'}", null, function (data) {
        if (data.result) {
        } else {
          
        }
    });
}

function updateEduPer(data) {
    //permission
    ajaxfunc('permission_personal.axd', "{opertype:'updatepersonaleduationpermission',permission:'"+data.id+"'}", null, function (data) {
        if (data.result) {
        } else {
        }
    });
}

function updateWorkPer(data) {
    //permission
    ajaxfunc('position_personal.axd', "{opertype:'updatepersonalworkpermission',permission:'" + data.id + "'}", null, function (data) {
        if (data.result) {
        } else {
        }
    });
}

function updateInterestsPer(data) {
    //permission
    ajaxfunc('permission_personal.axd', "{opertype:'updatepersonalinterestspermission',permission:'" + data.id + "'}", null, function (data) {
        if (data.result) {
        } else {
        }
    });
}

function updateContactPer(data) {
    //permission
    ajaxfunc('permission_personal.axd', "{opertype:'updatepersonalcontactpermission',permission:'" + data.id + "'}", null, function (data) {
        if (data.result) {
        } else {
        }
    });
}

/*选择权限*/
function setCustomPermission(_callback) {
    CustomPermission({ callback: function (data) {
        _callback(data);
    },
        overlayopts: {
            // custom top position
            top: 10,

            // some mask tweaks suitable for facebox-looking dialogs
            mask: {

                // you might also consider a "transparent" color for the mask
                color: '#fff',

                // load mask a little faster
                loadSpeed: 200,

                // very transparent
                opacity: 0.5
            },

            // disable this for modal dialog-type of overlays
            closeOnClick: false,

            // load it immediately after the construction
            load: true

        }
    });
}

var positionCategory=[];
//获取职位分类
function getPositionCategory(callback) {
    if (positionCategory.length > 0) {
        callback(positionCategory);
    } else {
        ajaxfunc('position_personal.axd', "{opertype:'ajaxgetpositionbasic',keyword:'',parentid:'-1'}", null, function (data) {
            if (data.result) {
                positionCategory = data.rows;
                callback(positionCategory);
            }
        });
    }
}

//获取职位信息
function getPosition($input, value, categoryId) {
    ajaxfunc('position_personal.axd', "{opertype:'ajaxgetpositionbasic',keyword:'',parentid:'" + categoryId + "'}", null, function (data) {
        if (data.result) {
            $input.empty();
            $input.append('<option value="">-选择职位-</option>');
            $.each(data.rows, function (i, v) {
                if (v.id == value) {
                    $input.append($wd.format('<option value="{0}" selected="selected">{1}</option>', v.id, v.category_name));
                } else {
                    $input.append($wd.format('<option value="{0}">{1}</option>', v.id, v.category_name));
                }
            });

        }
    });

}

function setPosition(categoryId,value,$obj) {
    ajaxfunc('position_personal.axd', "{opertype:'ajaxgetpositionbasic',keyword:'',parentid:'" + categoryId + "'}", null, function (data) {
        if (data.result) {
            $.each(data.rows, function (i, v) {
                if (v.id == value) {
                    $obj.html(v.category_name);
                } else {
                }
            });

        }
    });
}
