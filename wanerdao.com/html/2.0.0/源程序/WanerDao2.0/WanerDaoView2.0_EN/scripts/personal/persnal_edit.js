
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
var infoType; //info type

var namecardinfo; //personal name card
var baseinfo; // personal basic info/// <reference path="home_calendar.js" />

var educationinfo; //personal education info
var workinfo; //personal work info
var interestinfo; //personal interest info
var contactinfo; //personal contact info

var zodiac; //生肖

var tab_index = 1; //显示的选项卡索引
var edit_state = false; //edit state
var max_work_count = 15;
var degreeList; //

var self; //是否访问自己

/** on load **/
$(function () {
    degreeList = wanerdaoLangTip('common_00031')
    zodiac = wanerdaoLangTip('common_00018');
    uid = getQueryString('uid');
    infoType = getQueryString('infoType');
    if (!uid) uid = '';

    if (uid == '' || uid == wd_B.uin.uid) { self = true; }
    else { self = false }
    bindPTab(uid);

    $('.datum_hobby').loading();

    /* set right personal info */
    getPersonalNameCard(
        function () {
            /*get personal basic info*/
            getBaseInfo(function () {
                setPersonalInfo();
                if (tab_index == 1) {
                    chooseTab();
                }
            });

        }
    ); /*get personal name card*/

    if (self) {
        $('.user_card').append('<span><a href="javascript:;" id="upavatar">' + wanerdaoLangTip('personal_00028') + '</a></span>');

        //上传头像
        $('#upavatar').click(function () {
            $.personAvatarUpload({
                callback: function (data) {
                    $('.user_card_img').html($wd.format('<img src="{0}" width="200" height="200px"/>', data));
                    $('#userInfo').find('img').attr('src', data.replace(/[0-9A-Za-z]{32}/, function ($0) { return 'small-' + $0; }));
                }
            });

        });

        $('.user_card').find('h1').append('<select id="is_available" style="width:100px; display:none;"><option value="1">' + wanerdaoLangTip('personal_00085')[0] + '</option><option value="0">' + wanerdaoLangTip('personal_00085')[1] + '</option></select>');
        $('#is_display_contellation_text').after('<select id="is_display_contellation" style="width:110px;"><option value="1"></option><option value="0">' + wanerdaoLangTip('personal_00085')[1] + '</option></select>');
        $('#is_display_home_text').after('<select id="is_display_home" style="width:110px"><option value="1"></option><option value="0">' + wanerdaoLangTip('personal_00085')[1] + '</option></select>');
        $('#is_display_current_place_text').after('<select id="is_display_current_place" style="width:110px"><option value="1"></option><option value="0">' + wanerdaoLangTip('personal_00085')[1] + '</option></select>');
        $('#is_display_school_text').after('<select id="is_display_school" style="width:110px"><option value="1"></option><option value="0">' + wanerdaoLangTip('personal_00085')[1] + '</option></select>');
        $('#is_display_work_text').after('<select id="is_display_work" style="width:110px"><option value="1"></option><option value="0">' + wanerdaoLangTip('personal_00085')[1] + '</option></select>');

        /*update visible*/
        $('#is_available,#is_display_contellation,#is_display_home,#is_display_current_place,#is_display_school,#is_display_work').change(function () {
            var $obj_modify_per = $(this);
            var sel_value = $(this).val();
            $.ajax({
                url: "../wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: "{opertype:'update_" + $(this).attr('id') + "'," + $(this).attr('id') + ":'" + $(this).val() + "'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result) {
                        $obj_modify_per.children().each(function () {
                            if ($(this).val() == sel_value) {
                                $obj_modify_per.val($(this).val());
                                $obj_modify_per.chosen();
                            }
                        });
                    }
                }
            });
        }).show();
    }
    /* set right personal info end*/


    /*personal info tab*/
    $('#show_basic').click(function () {
        if (tab_index != 1) {
            tab_index = 1;
            edit_state = false;
            $(this).bindTabClass('current');
            showBasic();
        }
    });

    $('#show_edubg').click(function () {
        if (tab_index != 2) {
            tab_index = 2;
            edit_state = false;
            $(this).bindTabClass('current');
            getEducationInfo();
        }
    });

    $('#show_workbg').click(function () {
        if (tab_index != 3) {
            tab_index = 3;
            edit_state = false;
            $(this).bindTabClass('current');
            getWorkInfo();
        }
    });

    $('#show_interest').click(function () {
        if (tab_index != 4) {
            tab_index = 4;
            edit_state = false;
            $(this).bindTabClass('current');
            getInterestInfo();
        }
    });

    $('#show_contacts').click(function () {
        if (tab_index != 5) {
            tab_index = 5;
            edit_state = false;
            $(this).bindTabClass('current');
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
            $('#show_edubg').bindTabClass('current');
            getEducationInfo();
            break;
        case 'work':
            tab_index = 3;
            edit_state = false;
            $('#show_workbg').bindTabClass('current');
            getWorkInfo();
            break;
        case 'interest':
            tab_index = 4;
            edit_state = false;
            $('#show_interest').bindTabClass('current');
            getInterestInfo();
            break;
        case 'contact':
            tab_index = 5;
            edit_state = false;
            $('#show_contacts').bindTabClass('current');
            getContactInfo();
            break;
        default: //base
            tab_index = 1;
            edit_state = false;
            $('#show_basic').bindTabClass('current');
            showBasic();
            break;
    }
}

/************************************************basic********************************************/
function showBasic() {
    if (baseinfo)
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
            // alert('load namecard fail');
        },
        success: function (data) {
            if (data.result) {
                namecardinfo = data.obj;
                if (self) {
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

                    $('select').chosen();
                } else {
                    $('#is_display_contellation_text').html(namecardinfo.is_display_contellation ? namecardinfo.contellation : '');
                    $('#is_display_home_text').html(namecardinfo.is_display_home ? namecardinfo.home : '');
                    $('#is_display_current_place_text').html(namecardinfo.is_display_current_place ? namecardinfo.current_place : '');
                    $('#is_display_school_text').html(namecardinfo.is_display_school ? namecardinfo.school : '');
                    $('#is_display_work_text').html(namecardinfo.is_display_work ? namecardinfo.work_place : '');
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
            //alert('load baseinfo fail');
        },
        success: function (data) {
            if (data.result) {
                baseinfo = data.obj;
                if (callback) callback();
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
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
    i_follow.html(baseinfo.follow_score * 100 + '%');

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
    ul_baisc.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00029') + '：</label> {0}</li>', baseinfo.name));
    ul_baisc.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00030') + '：</label> {0}</li>', baseinfo.second_name));
    ul_baisc.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00031') + '：</label> {0}</li>', (baseinfo.gender == true ? wanerdaoLangTip('personal_00020')[0] : wanerdaoLangTip('personal_00020')[1])));
    ul_baisc.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00032') + '：</label> {0}-{1}-{2} <span class="hobby-wrap"><b class="hobby_sx"><a class="m0">{4}</a></b></span></li>', baseinfo.birthday_year, baseinfo.birthday_month, baseinfo.birthday_day, zodiac[(baseinfo.birthday_year - 3) % 12], (initConselaction()))); //baseinfo.constellation || 
    ul_baisc.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00027') + '：</label> {0}</li>', namecardinfo.home));
    ul_baisc.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00026') + '：</label> {0}</li>', namecardinfo.current_place));
    if (self) {
        ul_baisc.append($wd.format('<li class="m0"><label>' + wanerdaoLangTip('personal_00035') + '：</label> {0}</li><li><i class=""><label>' + wanerdaoLangTip('personal_00036') + '：</label> {1}</i></li>', baseinfo.current_address, baseinfo.current_zip));
    }

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(basic_info_box);
        var update_per_link = jQuery('<a href="javascript:void(0);" class="inp_setting">' + wanerdaoLangTip('personal_00037') + '</a>').appendTo(edit_handler);
        update_per_link.click(function () {
            setCustomPermission(updateBasePer);
            return false;
        });

        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);
        link_edit.click(function () {
            if (basic_box.find('.hobby_listB').length == 0) {
                var edit_box = jQuery('<div class="hobby_listB"></div>').appendTo(basic_box);
                edit_box.append('<div class="hobby_tagT"></div>');
                edit_box.append('<div class="hobby_tagC"></div>');

                var ul_edit_item = jQuery('<ul></ul>').appendTo(edit_box.find('.hobby_tagC'));
                // name 
                var li_name = jQuery('<li><label>' + wanerdaoLangTip('personal_00029') + '：</label></li>').appendTo(ul_edit_item);
                var personal_name = jQuery('<input type="text" class="text" style="width:180px" id="personal_name" maxlength="60"/>').appendTo(li_name);
                personal_name.val(baseinfo.name);

                //second name
                var li_second_name = jQuery('<li><label>' + wanerdaoLangTip('personal_00030') + '：</label></li>').appendTo(ul_edit_item);
                var personal_en_name = jQuery('<input type="text" class="text" style="width:180px" id="personal_en_name" maxlength="60"/>').appendTo(li_second_name);
                personal_en_name.val(baseinfo.second_name);

                //gender
                var li_sex = jQuery('<li><label>' + wanerdaoLangTip('personal_00031') + '：</label></li>').appendTo(ul_edit_item);
                var personal_gender = jQuery('<select name="personal_gender" id="personal_gender" style="width:62px"><option value="1">' + wanerdaoLangTip('personal_00020')[0] + '</option><option value="0">' + wanerdaoLangTip('personal_00020')[1] + '</option></select>').appendTo(li_sex);
                personal_gender.val(baseinfo.gender ? 1 : 0).chosen();

                //birthday
                var li_birthday = jQuery('<li><label>' + wanerdaoLangTip('personal_00032') + '：</label></li>').appendTo(ul_edit_item);
                var personal_birth_year = jQuery('<select id="personal_birth_year" style="width:62px"></select>').appendTo(li_birthday);
                li_birthday.append('&nbsp;');
                var personal_birth_month = jQuery('<select id="personal_birth_month" style="width:62px"></select>').appendTo(li_birthday);
                li_birthday.append('&nbsp;');
                var personal_birth_day = jQuery('<select id="personal_birth_day" style="width:62px"></select>').appendTo(li_birthday);
                li_birthday.append('<span class="hobby-wrap"><b class="hobby_sx"><a class="m0" id="personal_constellation"></a></b></span>');

                //bind birthday
                bindDateSelect(personal_birth_year, personal_birth_month, personal_birth_day);
                personal_birth_year.val(baseinfo.birthday_year);
                personal_birth_month.val(baseinfo.birthday_month);
                personal_birth_day.val(baseinfo.birthday_day);
               

                calcConselaction();
         


                $('#personal_birth_year,#personal_birth_month,#personal_birth_day').change(function () {
                    calcConselaction();
                });

                var birth_place = jQuery('<li><label>' + wanerdaoLangTip('personal_00027') + '：</label></li>').appendTo(ul_edit_item);
                var personal_birth_render = jQuery('<input id="personal_birth_area" name="personal_birth_area" class="text" type="text" maxlength="60" inputdefault="' + wanerdaoLangTip('common_00048') + '" value="' + wanerdaoLangTip('common_00048') + '" style="width:150px;" readonly="readonly"/>').appendTo(birth_place);
                if (baseinfo.birth_country_id) {
                    personal_birth_render.attr('ids', baseinfo.birth_country_id + ',' + baseinfo.birth_state_id + ',' + baseinfo.birth_city_id);
                    personal_birth_render.val(namecardinfo.home)
                }

                //                $('#personal_birth_areaareaplugin').remove();
                personal_birth_render.unbind('click').bind('click', function (event) {
                    event.stopPropagation();
                    new wanerdaoArea({ comopts: { elementid: "#personal_birth_area", callback: function (data) {
                        personal_birth_render.attr('ids', data.country.id + ',' + data.state.id + ',' + data.city.id);
                    }
                    }
                    });
                });

                // current palce
                var current_place = jQuery('<li><label>' + wanerdaoLangTip('personal_00026') + '：</label></li>').appendTo(ul_edit_item);
                var personal_location_render = jQuery('<input id="personal_location_area"  name="personal_location_area" class="text" type="text" maxlength="60"  inputdefault="' + wanerdaoLangTip('common_00083') + '" value="' + wanerdaoLangTip('common_00083') + '" style="width:150px;" readonly="readonly"/>').appendTo(current_place);
                if (baseinfo.current_country_id) {
                    personal_location_render.attr('ids', baseinfo.current_country_id + ',' + baseinfo.current_state_id + ',' + baseinfo.current_city_id);
                    personal_location_render.val(namecardinfo.current_place)
                }
                //                $('#personal_location_areaareaplugin').remove();
                personal_location_render.unbind('click').bind('click', function (event) {
                    event.stopPropagation();
                    new wanerdaoArea({ comopts: { elementid: "#personal_location_area", callback: function (data) {
                        personal_location_render.attr('ids', data.country.id + ',' + data.state.id + ',' + data.city.id);
                    }
                    }
                    });
                });

                //address
                var detail_address = jQuery('<li><br/><label>' + wanerdaoLangTip('personal_00035') + '：</label></li>').appendTo(ul_edit_item);
                var personal_address = jQuery('<input type="text" class="text" style="width:280px" id="personal_address"  maxlength="60" />').appendTo(detail_address);
                personal_address.val(baseinfo.current_address);

                //zip
                var current_place_zip = jQuery('<li><label>' + wanerdaoLangTip('personal_00036') + '：</label></li>').appendTo(ul_edit_item);
                var personal_zip = jQuery('<input type="text" class="text" style="width:80px" id="personal_zip" name="personal_zip" maxlength="60" />').appendTo(current_place_zip);
                personal_zip.val(baseinfo.current_zip);
                personal_zip.unbind('keyup');
                personal_zip.bind('keyup', function (e) {
                    if (e.keyCode != 8) {
                        $(this).val($(this).val().replace(/[^\d]/g, ''));
                    }
                });

                //explain
                ul_edit_item.append('<li class="txt_sm">' + wanerdaoLangTip('personal_00022') + '</li>');

                //button
                var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_edit_item);
                var btn_save = jQuery('<input name="p_save" id="p_save" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + '" />').appendTo(operate_btn);
                operate_btn.append('&nbsp;');
                var btn_cancel = jQuery('<input name="p_cancel" id="p_cancel" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + '" />').appendTo(operate_btn);

                //bind save click event
                btn_save.click(function () {
                    var $this = $(this);
                    if (!personal_name.val()) {
                        new pop({ typename: 'error',
                            msginfo: wanerdaoLangTip('personal_00007')
                        });
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

                        $this.attr('disabled', true);
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
                                        if (tab_index == 1) {
                                            setBaseInfo();
                                        }
                                    });
                                } else {
                                    new pop({ typename: 'error',
                                        msginfo: data.msg
                                    });
                                    $this.removeAttr('disabled');
                                }
                            }
                        });
                    }
                    return false;
                });

                //bind cancel click event
                btn_cancel.click(function () {
                    //                    $('#personal_birth_areaareaplugin').remove();
                    //                    $('#personal_location_areaareaplugin').remove();
                    edit_box.remove();
                });

                $('select').chosen();
                ul_edit_item.after('<div class="marked"></div>');
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
            //  alert("load education fail");
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
            //   alert("load education fail");
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
            //alert("load education fail");
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
            //  alert("load education fail");
        },
        success: function (data) {
            if (data.result) {
                educationinfo = data.rows;
                if (tab_index == 2) {
                    setEducationInfo();
                }
            }
        }
    });
}

/*set Education Info*/
function setEducationInfo() {
    var education_box = $('.datum_hobby').empty();
    showEducationItem(1, education_box);
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
            var update_per_link = jQuery('<a href="javascript:void(0);" class="inp_setting">' + wanerdaoLangTip('personal_00037') + '</a>').appendTo(add_hanlder_box);
            update_per_link.click(function () {
                setCustomPermission(updateEduPer);
                return false;
            });

            var add_link = jQuery('<a href="javascript:void(0);" class="inp_add">' + wanerdaoLangTip('common_00013') + '</a>').appendTo(add_hanlder_box);
            add_link.click(function () {
                if (add_education_box.find('.hobby_listB').length == 0) {
                    if (edit_state == false) {
                        edit_state = true;
                        var add_education_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(add_education_box);
                        add_education_input_box.append('<div class="hobby_tagT"></div>')
                        var education_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(add_education_input_box);
                        var ul_edu_detail = jQuery('<ul></ul>').appendTo(education_detail);
                        var education_type_box = jQuery('<li><label>' + wanerdaoLangTip('personal_00039') + '：</label><select  name="select" style="width:100px" id="edu_type"></select></li>').appendTo(ul_edu_detail);
                        var select_edu_type = $('#edu_type');
                        select_edu_type.html(wanerdaoLangTip('common_00032'));

                        addEducationItem(select_edu_type.val(), ul_edu_detail);
                        select_edu_type.change(function () {
                            addEducationItem($(this).val(), ul_edu_detail);
                        });

                        add_education_input_box.append('<div class="hobby_tagB"></div>');
                    } else {
                        new pop({ typename: 'error',
                            msginfo: wanerdaoLangTip('personal_00005')
                        });
                    }
                } else {
                    add_education_box.find('.hobby_listB').remove();
                    edit_state = false;
                }
            });

        }
    }
}

/**  render add-box by school type **/
function addEducationItem(type, box) {
    box.find('li:gt(0)').remove();
    if (type == 1) {//University
        var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00040') + '：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name"  maxlength="60" />').appendTo(li_sname);
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
        var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        li_graduation.append('&nbsp;');
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //degree
        li_degree = jQuery('<li><label>' + wanerdaoLangTip('personal_00042') + '：</label></li>').appendTo(box);
        var degree = jQuery('<select id="degree"></select>').appendTo(li_degree);
        degree.append(degreeList);
        //specialty
        var li_specialty = jQuery('<li><label>' + wanerdaoLangTip('personal_00043') + '：</label></li>').appendTo(box);
        var specialty = jQuery('<input type="text" class="text" style="width:180px" id="specialty" maxlength="60"  />').appendTo(li_specialty);
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
        var btn_add = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00013') + ' " />').appendTo(operate_btn);
        operate_btn.append('&nbsp;');
        var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var eduDegree = degree.val();
            var eduSpecialty = $.trim(specialty.val());
            var d = new Date();

            if (!schoolName) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00010')
                });
                school_name.val('');
                school_name.focus();
            } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00088')
                });
                return false;
            } else if (!eduSpecialty) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00011')
                });
                specialty.val('');
                specialty.focus();
            } else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:1,school_name:"' + schoolName + '",end_year:' + endY
                 + ',end_month:' + endM + ',degree:"' + eduDegree + '",major:"' + eduSpecialty + '"}', function (data) {
                     if (data.result) {
                         getEducationInfo();
                         getCurSchool();
                     } else {
                         new pop({ typename: 'error',
                             msginfo: data.msg
                         });
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
        var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00044') + '：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"  />').appendTo(li_sname);
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
        var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        li_graduation.append('&nbsp;');
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //class
        li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label><p>' + wanerdaoLangTip('personal_00046') + '</p></li>').appendTo(box);
        var s_class1 = jQuery('<input type="text" class="text mr250" style="width:110px" maxlength="60"/>').appendTo(li_class);
        li_class.append('<p class="ml60">' + wanerdaoLangTip('personal_00047') + '</p>');
        var s_class2 = jQuery('<input type="text" class="text mr250" style="width:110px" maxlength="60"/>').appendTo(li_class);
        li_class.append('<p class="ml60">' + wanerdaoLangTip('personal_00048') + '</p>');
        var s_class3 = jQuery('<input type="text" class="text mr250" style="width:110px" maxlength="60"/>').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00013') + ' " />').appendTo(operate_btn);
        operate_btn.append('&nbsp;');
        var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var class1 = $.trim(s_class1.val());
            var class2 = $.trim(s_class2.val());
            var class3 = $.trim(s_class3.val());
            var d = new Date();

            if (!schoolName) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00010')
                });
                school_name.val('');
                school_name.focus();
            } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00088')
                });
                return false;
            } else if (!(class1 && class2 && class3)) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('personal_00012')
                });
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
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
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
        var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00049') + '：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"  />').appendTo(li_sname);
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
        var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        li_graduation.append('&nbsp;');
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //class
        li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="text" style="width:180px" maxlength="60"  />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00013') + ' " />').appendTo(operate_btn);
        operate_btn.append('&nbsp;');
        var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var hclass = $.trim(s_class.val());
            var d = new Date();

            if (!schoolName) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00010')
                });
                school_name.val('');
                school_name.focus();
            } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00088')
                });
                return false;
            } else if (!hclass) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('personal_00012')
                });
                s_class.focus();
            } else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:3,school_name:"' + schoolName + '",end_year:' + endY
                    + ',end_month:' + endM + ',class:"' + hclass + '"}', function (data) {
                        if (data.result) {
                            getEducationInfo();
                            getCurSchool();
                        } else {
                            new pop({ typename: 'error',
                                msginfo: data.msg
                            });
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
        var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00050') + '：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"/>').appendTo(li_sname);
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
        var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        li_graduation.append('&nbsp;');
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);
        //class
        li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="text mr250" maxlength="60"  style="width:110px"/>').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00013') + ' " />').appendTo(operate_btn);
        operate_btn.append('&nbsp;');
        var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var hclass = s_class.val();
            var d = new Date();

            if (!schoolName) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00010')
                });
                school_name.val('');
                school_name.focus();
            } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00088')
                });
                return false;
            } else if (!hclass) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('personal_00012')
                });
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
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
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
        var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00051') + '：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"  />').appendTo(li_sname);
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
        var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year"></select>').appendTo(li_graduation);
        li_graduation.append('&nbsp;');
        var graduation_month = jQuery('<select id="graduation_month"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);

        var li_specialty = jQuery('<li><label>' + wanerdaoLangTip('personal_00043') + '：</label>').appendTo(box);
        var specialty = jQuery('<input type="text" class="text" style="width:180px" maxlength="60" />').appendTo(li_specialty);
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
        var li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="text" style="width:180px"  maxlength="60" />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00013') + ' " />').appendTo(operate_btn);
        operate_btn.append('&nbsp;');
        var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var s_specialty = specialty.val();
            var hclass = s_class.val();
            var d = new Date();

            if (!schoolName) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00010')
                });
                school_name.val('');
                school_name.focus();
            } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00088')
                });
                return false;
            }
            else if (!hclass) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('personal_00012')
                });
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
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
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
        var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00052') + '：</label></li>').appendTo(box);
        var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"/>').appendTo(li_sname);
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
        var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(box);
        var graduation_year = jQuery('<select id="graduation_year" style=" width: 62px;"></select>').appendTo(li_graduation);
        li_graduation.append('&nbsp;');
        var graduation_month = jQuery('<select id="graduation_month" style=" width: 62px;"></select>').appendTo(li_graduation);
        BindDateYM(graduation_year, graduation_month);

        //class
        var li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(box);
        var s_class = jQuery('<input type="text" class="text" style="width:180px" maxlength="60"  />').appendTo(li_class);

        //operate
        var operate_btn = jQuery('<li></li>').appendTo(box);
        var btn_add = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00013') + ' " />').appendTo(operate_btn);
        operate_btn.append('&nbsp;');
        var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);

        btn_add.click(function () {
            var schoolName = $.trim(school_name.val());
            var endY = graduation_year.val();
            var endM = graduation_month.val();
            var hclass = s_class.val();
            var d = new Date();

            if (!schoolName) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00010')
                });
                school_name.val('');
                school_name.focus();
            } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('personal_00088')
                });
                return false;
            } else if (!hclass) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('personal_00012')
                });
                s_class.focus();
            } else {
                box.parent().parent().remove();
                doEducationPost('addpersonaleducation', '{school_type:6,school_name:"' + schoolName + '",end_year:' + endY
                + ',end_month:' + endM + ',class:"' + hclass + '"}', function (data) {
                    if (data.result) {
                        getEducationInfo();
                        getCurSchool();
                    } else {
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
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
    box.find('select').chosen();
}

function doEducationPost(opertype, json, callback) {
    $.ajax({
        url: "../wanerdao_personal.axd",
        type: "post",
        dataType: "json",
        cache: false,
        data: "{opertype:'" + opertype + "',json:{model:" + json + "}}",
        error: function (data) {
            //  alert('load education info fail');
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
            if (type == 1 && v.school_type == 1) {//大学
                SchoolType1(box, v);
            } else if (type == 2 && v.school_type == 2) {//高中
                AddSchoolTypeAndDownNav(box);
                SchoolType2(box, v);
            } else if (type == 3 && v.school_type == 3) {//职高
                AddSchoolTypeAndDownNav(box);
                SchoolType3(box, v);
            } else if (type == 4 && v.school_type == 4) {//初中
                AddSchoolTypeAndDownNav(box);
                SchoolType4(box, v);
            } else if (type == 5 && v.school_type == 5) {//中专
                AddSchoolTypeAndDownNav(box);
                SchoolType5(box, v);
            } else if (type == 6 && v.school_type == 6) {//小学
                AddSchoolTypeAndDownNav(box);
                SchoolType6(box, v);
            }
        });
    }
}

function AddSchoolTypeAndDownNav($box) {
    if ($box.find('.gz_tit').length == 0) {
        $box.append('<div class="gz_tit">' + wanerdaoLangTip('personal_00038') + '</div>');
    }
}

/* show school type 1*/
function SchoolType1(box, v) {
    var edu_item_box = jQuery('<div class="hobby_list"></div').appendTo(box);
    var edu_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(edu_item_box);
    var ul_edu_item = jQuery('<ul></ul>').appendTo(edu_info_box);
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00040') + '：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00042') + '：</label> {0}</li>', v.degree));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00043') + '：</label> {0}</li>', v.major));
    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(edu_info_box);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);

        link_del.click(function () {
            new pop({ typename: 'confirm',
                msginfo: wanerdaoLangTip('personal_00087'),
                callback: function () {
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
                                if ($('.gz_tit~.hobby_list').length == 1) {
                                    $('.gz_tit').remove();
                                }
                            } else {
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                },
                cancelcallback: function () {

                }
            });
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);

                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);
                    var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00040') + '：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60" />').appendTo(li_sname);
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
                    var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year" style="width:62px"></select>').appendTo(li_graduation);
                    li_graduation.append('&nbsp;');
                    var graduation_month = jQuery('<select id="graduation_month" style="width:62px"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //degree
                    li_degree = jQuery('<li><label>' + wanerdaoLangTip('personal_00042') + '：</label></li>').appendTo(ul_edu_detail);
                    var degree = jQuery('<select name="select" style="width:62px" id="degree"></select>').appendTo(li_degree);
                    degree.append(degreeList);
                    degree.val(v.degree);
                    //specialty
                    var li_specialty = jQuery('<li><label>' + wanerdaoLangTip('personal_00043') + '：</label></li>').appendTo(ul_edu_detail);
                    var specialty = jQuery('<input type="text" class="text" style="width:180px" id="specialty" maxlength="60"  />').appendTo(li_specialty);
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

                    ul_edu_detail.find('select').chosen();

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " />').appendTo(operate_btn);
                    operate_btn.append('&nbsp;');
                    var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var eduDegree = degree.val();
                        var eduSpecialty = specialty.val();
                        var d = new Date();

                        if (!schoolName) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00010')
                            });
                            school_name.val('');
                            school_name.focus();
                        } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00088')
                            });
                            return false;
                        } else if (!eduSpecialty) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00011')
                            });
                            specialty.val('');
                            specialty.focus();
                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:' + v.school_type + ',school_name:"' + schoolName + '",end_year:' + endY
                                        + ',end_month:' + endM + ',degree:"' + eduDegree + '",major:"' + eduSpecialty + '"}', function (data) {
                                            if (data.result) {
                                                getEducationInfo();
                                                getCurSchool();
                                            } else {
                                                new pop({ typename: 'error',
                                                    msginfo: data.msg
                                                });
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
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('personal_00005')
                    });
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

    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00044') + '：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label><p class="lh20">' + wanerdaoLangTip('personal_00046') + ' {0}<br />' + wanerdaoLangTip('personal_00047') + ' {1}<br />' + wanerdaoLangTip('personal_00048') + ' {2}</p></li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(edu_info_box);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);

        link_del.click(function () {
            new pop({ typename: 'confirm',
                msginfo: wanerdaoLangTip('personal_00087'),
                callback: function () {
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
                                if ($('.gz_tit~.hobby_list').length == 1) {
                                    $('.gz_tit').remove();
                                }
                            } else {
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                },
                cancelcallback: function () {

                }
            });
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);
                    var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00044') + '：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"  />').appendTo(li_sname);
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
                    var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year" style="width:62px"></select>').appendTo(li_graduation);
                    li_graduation.append('&nbsp;');
                    var graduation_month = jQuery('<select id="graduation_month" style="width:62px"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label><p>' + wanerdaoLangTip('personal_00046') + '</p></li>').appendTo(ul_edu_detail);
                    var s_class1 = jQuery('<input type="text" class="text mr250" style="width:110px" maxlength="60" />').appendTo(li_class);
                    li_class.append('<p class="ml60">' + wanerdaoLangTip('personal_00047') + '</p>');
                    var s_class2 = jQuery('<input type="text" class="text mr250" style="width:110px" maxlength="60" />').appendTo(li_class);
                    li_class.append('<p class="ml60">' + wanerdaoLangTip('personal_00048') + '</p>');
                    var s_class3 = jQuery('<input type="text" class="text mr250" style="width:110px" maxlength="60" />').appendTo(li_class);
                    s_class1.val(v.Class);
                    s_class2.val(v.class2);
                    s_class3.val(v.class3);

                    ul_edu_detail.find('select').chosen();

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " />').appendTo(operate_btn);
                    operate_btn.append('&nbsp;');
                    var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class1 = s_class1.val();
                        var class2 = s_class2.val();
                        var class3 = s_class3.val();
                        var d = new Date();

                        if (!schoolName) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00010')
                            });
                            school_name.val('');
                            school_name.focus();
                        } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00088')
                            });
                            return false;
                        } else if (!(class1 && class2 && class3)) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00012')
                            });
                            if (!class1) { s_class1.focus(); }
                            else if (!class2) { s_class2.focus(); }
                            else { s_class3.focus(); }
                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:2,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class1 + '",class2:"' + class2 + '",class3:"' + class3 + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    new pop({ typename: 'error',
                                        msginfo: data.msg
                                    });
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
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('personal_00005')
                    });
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
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00049') + '：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label> {0}</li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(edu_info_box);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);

        link_del.click(function () {
            new pop({ typename: 'confirm',
                msginfo: wanerdaoLangTip('personal_00087'),
                callback: function () {
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
                                if ($('.gz_tit~.hobby_list').length == 1) {
                                    $('.gz_tit').remove();
                                }
                            } else {
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                },
                cancelcallback: function () {

                }
            });
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);

                    var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00049') + '：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60" />').appendTo(li_sname);
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
                    var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year" style="width:62px"></select>').appendTo(li_graduation);
                    li_graduation.append('&nbsp;');
                    var graduation_month = jQuery('<select id="graduation_month" style="width:62px"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="text" style="width:180px" maxlength="60"  />').appendTo(li_class);
                    s_class.val(v.Class);
                    ul_edu_detail.find('select').chosen();

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " />').appendTo(operate_btn);
                    operate_btn.append('&nbsp;');
                    var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class_s = s_class.val();
                        var d = new Date();

                        if (!schoolName) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00010')
                            });
                            school_name.val('');
                            school_name.focus();
                        } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00088')
                            });
                            return false;
                        } else if (!hclass) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00012')
                            });
                            s_class.focus();
                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:3,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    new pop({ typename: 'error',
                                        msginfo: data.msg
                                    });
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
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('personal_00005')
                    });
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
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00050') + '：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label> {0}</li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(edu_info_box);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);

        link_del.click(function () {
            new pop({ typename: 'confirm',
                msginfo: wanerdaoLangTip('personal_00087'),
                callback: function () {
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
                                if ($('.gz_tit~.hobby_list').length == 1) {
                                    $('.gz_tit').remove();
                                }
                            } else {
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                },
                cancelcallback: function () {

                }
            });
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);

                    var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00050') + '：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('><input type="text" class="text" style="width:180px" id="school_name" maxlength="60"  />').appendTo(li_sname);
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
                    var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year" style="width:62px"></select>').appendTo(li_graduation);
                    li_graduation.append('&nbsp;');
                    var graduation_month = jQuery('<select id="graduation_month" style="width:62px"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="text" style="width:180px" id="className" maxlength="60"  />').appendTo(li_class);
                    s_class.val(v.Class);
                    ul_edu_detail.find('select').chosen();

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " />').appendTo(operate_btn);
                    operate_btn.append('&nbsp;');
                    var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class_s = s_class.val();
                        var d = new Date();

                        if (!schoolName) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00010')
                            });
                            school_name.val('');
                            school_name.focus();
                        } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00088')
                            });
                            return false;
                        } else if (!hclass) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00012')
                            });
                            s_class.focus();
                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:4,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    new pop({ typename: 'error',
                                        msginfo: data.msg
                                    });
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
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('personal_00005')
                    });
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
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00051') + '：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00043') + '：</label> {0}</li>', v.major));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label> {0}</li>', v.Class, v.class2, v.class3));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(edu_info_box);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);

        link_del.click(function () {
            new pop({ typename: 'confirm',
                msginfo: wanerdaoLangTip('personal_00087'),
                callback: function () {
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
                                if ($('.gz_tit~.hobby_list').length == 1) {
                                    $('.gz_tit').remove();
                                }
                            } else {
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                },
                cancelcallback: function () {

                }
            });
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);

                    var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00051') + '：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"  />').appendTo(li_sname);
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
                    var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year" style=" width:62px;"></select>').appendTo(li_graduation);
                    li_graduation.append('&nbsp;');
                    var graduation_month = jQuery('<select id="graduation_month" style=" width:62px;"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //specialty
                    var li_specialty = jQuery('<li><label>' + wanerdaoLangTip('personal_00043') + '：</label>').appendTo(ul_edu_detail);
                    var specialty = jQuery('<input type="text" class="text" style="width:180px" maxlength="60"  />').appendTo(li_specialty);
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
                    li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="text" style="width:180px" maxlength="60"  />').appendTo(li_class);
                    s_class.val(v.Class);
                    ul_edu_detail.find('select').chosen();

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " />').appendTo(operate_btn);
                    operate_btn.append('&nbsp;');
                    var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var s_specialty = specialty.val();
                        var class_s = s_class.val();
                        var d = new Date();

                        if (!schoolName) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00010')
                            });
                            school_name.val('');
                            school_name.focus();
                        } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00088')
                            });
                            return false;
                        }
                        else if (!hclass) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00012')
                            });
                            s_class.focus();
                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:5,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '",major:"' + s_specialty + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    new pop({ typename: 'error',
                                        msginfo: data.msg
                                    });
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
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('personal_00005')
                    });
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
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00052') + '：</label> {0}</li>', v.school_name));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label> {0}-{1}</li>', v.end_year, v.end_month));
    ul_edu_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label> {0}</li>', v.Class));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(edu_info_box);
        var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(edit_handler);
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);

        link_del.click(function () {
            new pop({ typename: 'confirm',
                msginfo: wanerdaoLangTip('personal_00087'),
                callback: function () {
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
                                if ($('.gz_tit~.hobby_list').length == 1) {
                                    $('.gz_tit').remove();
                                }
                            } else {
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                },
                cancelcallback: function () {

                }
            });
        });

        link_edit.click(function () {
            if (edu_item_box.find('.hobby_listB').length == 0) {
                if (!edit_state) {
                    edit_state = true;
                    var edit_edu_input_box = jQuery('<div class="hobby_listB" ></div>').appendTo(edu_item_box);
                    edit_edu_input_box.append('<div class="hobby_tagT"></div>');
                    var edu_detail = jQuery('<div class="hobby_tagC"></div>').appendTo(edit_edu_input_box);
                    var ul_edu_detail = jQuery('<ul></ul>').appendTo(edu_detail);
                    var li_sname = jQuery('<li><label>' + wanerdaoLangTip('personal_00052') + '：</label></li>').appendTo(ul_edu_detail);
                    var school_name = jQuery('<input type="text" class="text" style="width:180px" id="school_name" maxlength="60"  />').appendTo(li_sname);
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
                    var li_graduation = jQuery('<li><label>' + wanerdaoLangTip('personal_00041') + '：</label></li>').appendTo(ul_edu_detail);
                    var graduation_year = jQuery('<select id="graduation_year" style="width: 62px;"></select>').appendTo(li_graduation);
                    li_graduation.append('&nbsp;');
                    var graduation_month = jQuery('<select id="graduation_month" style=" width: 62px;"></select>').appendTo(li_graduation);
                    BindDateYM(graduation_year, graduation_month);
                    graduation_year.val(v.end_year);
                    graduation_month.val(v.end_month);
                    //class
                    li_class = jQuery('<li><label>' + wanerdaoLangTip('personal_00045') + '：</label></li>').appendTo(ul_edu_detail);
                    var s_class = jQuery('<input type="text" class="text" style="width:180px" id="className" maxlength="60" />').appendTo(li_class);
                    s_class.val(v.Class);
                    ul_edu_detail.find('select').chosen();

                    //operate
                    var operate_btn = jQuery('<li></li>').appendTo(ul_edu_detail);
                    var btn_edit = jQuery('<input name="" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " />').appendTo(operate_btn);
                    operate_btn.append('&nbsp;');
                    var btn_cancel = jQuery('<input name="" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' " />').appendTo(operate_btn);
                    //save education
                    btn_edit.click(function () {
                        var schoolName = $.trim(school_name.val());
                        var endY = graduation_year.val();
                        var endM = graduation_month.val();
                        var class_s = s_class.val();
                        var d = new Date();

                        if (!schoolName) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00010')
                            });
                            school_name.val('');
                            school_name.focus();
                        } else if (endY == d.getFullYear() && endM > d.getMonth() + 1) {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('personal_00088')
                            });
                            return false;
                        } else if (!hclass) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00012')
                            });
                            s_class.focus();
                        } else {
                            btn_edit.attr('disabled', true);
                            edu_item_box.find('.hobby_listB').remove();
                            doEducationPost('updatepersonaleducation', '{id:"' + v.id + '",school_type:6,school_name:"' + schoolName + '",end_year:' + endY
                            + ',end_month:' + endM + ',class:"' + class_s + '"}', function (data) {
                                if (data.result) {
                                    getEducationInfo();
                                    getCurSchool();
                                } else {
                                    new pop({ typename: 'error',
                                        msginfo: data.msg
                                    });
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
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('personal_00005')
                    });
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
            // alert('load workinfo fail');
        },
        success: function (data) {
            if (data.result) {
                workinfo = data.rows;
                if (tab_index == 3) {
                    setWorkInfo();
                }
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
            ul_work_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00053') + '：</label> {0}</li>', v.company_name));
            ul_work_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00054') + '：</label> <span class="pCategory"></span></li>'));
            ul_work_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00055') + '：</label> <span class="pName"></span></li>'));
            ul_work_item.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00056') + '：</label> {0} ' + wanerdaoLangTip('personal_00057') + ' {1}</li>', (beginTime.getFullYear() + '/' + (beginTime.getMonth() + 1)), (v.is_present ? '' + wanerdaoLangTip('personal_00058') + '' : (endTime.getFullYear() + '/' + (endTime.getMonth() + 1)))));

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
                var link_del = jQuery('<a href="javascript:void(0);" class="inp_dele">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(edit_handler);
                var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler);

                link_del.click(function () {
                    new pop({ typename: 'confirm',
                        msginfo: wanerdaoLangTip('personal_00006'),
                        callback: function () {
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
                                        new pop({ typename: 'error',
                                            msginfo: data.msg
                                        });
                                    }
                                }
                            });
                        },
                        cancelcallback: function () {

                        }
                    });
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
                            var li_unit = jQuery('<li><label>' + wanerdaoLangTip('personal_00053') + '：</label></li>').appendTo(ul_work_detail);
                            var unit_name = jQuery('<input type="text" class="text" style="width:180px" id="unit_name" maxlength="60"  />').appendTo(li_unit);
                            unit_name.val(v.company_name);
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
                            var li_industry = jQuery('<li><label>' + wanerdaoLangTip('personal_00054') + '：</label></li>').appendTo(ul_work_detail);
                            var work_industry = jQuery('<select name="work_industry" id="work_industry"  style="width:190px"></select>').appendTo(li_industry);
                            work_industry.append('<option value="">-' + wanerdaoLangTip('personal_00059') + '-</option>');

                            /* office */
                            var li_office = jQuery('<li><label>' + wanerdaoLangTip('personal_00055') + '：</label></li>').appendTo(ul_work_detail);
                            var work_office = jQuery('<select name="work_office" id="work_office" style="width:190px"></select>').appendTo(li_office);
                            work_office.append('<option value="">-' + wanerdaoLangTip('personal_00060') + '-</option>');

                            getPositionCategory(function (data) {
                                $.each(data, function (i, o) {
                                    if (o.id == v.position_category) {
                                        work_industry.append($wd.format('<option value="{0}" selected="selected">{1}</option>', o.id, o.category_name));
                                    } else {
                                        work_industry.append($wd.format('<option value="{0}">{1}</option>', o.id, o.category_name));
                                    }
                                });
                                work_industry.chosen();

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
                            var li_work_time = jQuery('<li><label>' + wanerdaoLangTip('personal_00056') + '：</label></li>').appendTo(ul_work_detail);
                            var begin_year = jQuery('<select name="begin_year" style="width:62px" id="begin_year"></select>').appendTo(li_work_time);
                            li_work_time.append('&nbsp;');
                            var begin_month = jQuery('<select name="begin_month" style="width:62px" id="begin_month"></select>').appendTo(li_work_time);
                            BindDateYM(begin_year, begin_month);
                            begin_year.val(beginTime.getFullYear());
                            begin_month.val(beginTime.getMonth() + 1);
                            li_work_time.append('&nbsp;' + wanerdaoLangTip('personal_00057') + '&nbsp;');
                            var end_year = jQuery('<select name="end_year" id="end_year" style="width:62px"></select>').appendTo(li_work_time);
                            li_work_time.append('&nbsp;');
                            var end_month = jQuery('<select name="end_month" id="end_month" style="width:62px"></select>').appendTo(li_work_time);
                            BindDateYM(end_year, end_month);
                            end_year.val(endTime.getFullYear());
                            end_month.val(endTime.getMonth() + 1);
                            li_work_time.append('&nbsp;');
                            var now_work = jQuery('<input name="now_work" type="checkbox" id="now_work" maxlength="60" />').appendTo(li_work_time);
                            li_work_time.append('' + wanerdaoLangTip('personal_00058') + '');

                            ul_work_detail.find('select').chosen();
                            now_work.click(function () {
                                if (now_work.attr('checked')) {
                                    end_year.next().hide();
                                    end_month.next().hide();
                                } else {
                                    end_year.next().show();
                                    end_month.next().show();
                                }
                            });
                            if (v.is_present) {
                                now_work.attr('checked', 'checked');
                                if (now_work.attr('checked')) {
                                    end_year.next().hide();
                                    end_month.next().hide();
                                } else {
                                    end_year.next().show();
                                    end_month.next().show();
                                }
                            }

                            //button
                            var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_work_detail);
                            var btn_modify = jQuery('<input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + '" />').appendTo(operate_btn);
                            operate_btn.append('&nbsp;');
                            var btn_cancel = jQuery('<input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + '" />').appendTo(operate_btn);

                            btn_modify.click(function () {
                                if (!$.trim(unit_name.val())) {
                                    new pop({ typename: 'error',
                                        msginfo: wanerdaoLangTip('personal_00001')
                                    });
                                    return false;
                                } else if (!work_industry.val()) {
                                    new pop({ typename: 'error',
                                        msginfo: wanerdaoLangTip('personal_00002')
                                    });
                                    return false;
                                } else if (!work_office.val()) {
                                    new pop({ typename: 'error',
                                        msginfo: wanerdaoLangTip('personal_00003')
                                    });
                                    return false;
                                } else if (hasNow && !v.is_present && now_work.attr('checked')) {
                                    new pop({ typename: 'error',
                                        msginfo: wanerdaoLangTip('personal_00004')
                                    });
                                    return false;
                                }
                                else {
                                    var present = now_work.attr('checked') ? true : false; //是否工作至今

                                    var bYear = parseInt(begin_year.val());
                                    var bMonth = parseInt(begin_month.val());
                                    var eYear = parseInt(end_year.val());
                                    var eMonth = parseInt(end_month.val());

                                    if (!present && (bYear > eYear || (bYear == eYear && bMonth > eMonth))) {
                                        new pop({ typename: 'error',
                                            msginfo: wanerdaoLangTip('personal_00083')
                                        });
                                        return false;
                                    }

                                    var beginT = bYear + "-" + bMonth + "-1";
                                    var endT = '';
                                    if (!now_work.attr('checked')) {
                                        endT = eYear + "-" + eMonth + "-1";
                                    }

                                    btn_modify.attr('disabled', true);

                                    $.ajax({
                                        url: "../wanerdao_personal.axd",
                                        type: "post",
                                        dataType: "json",
                                        cache: false,
                                        data: "{opertype:'updatepersonalwork',id:'" + v.id + "',cname:'" + unit_name.val() + "',pcat:'" + work_industry.val() + "',pname:'" + work_office.val()
                        + "',begindate:'" + beginT + "',enddate:'" + endT + "',present:'" + present + "',desc:''}",
                                        error: function (data) {
                                            btn_modify.removeAttr('disabled');
                                        },
                                        success: function (data) {
                                            if (data.result) {
                                                edit_work_input_box.remove();
                                                getWorkInfo();
                                                getCurWork();
                                                edit_state = false;
                                            } else {
                                                new pop({ typename: 'error',
                                                    msginfo: data.msg
                                                });
                                                btn_modify.removeAttr('disabled');
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
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00005')
                            });
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
        var update_per_link = jQuery('<a href="javascript:void(0);" class="inp_setting">' + wanerdaoLangTip('personal_00037') + '</a>').appendTo(add_hanlder_box);
        var add_link = jQuery('<a href="javascript:void(0);" class="inp_add">' + wanerdaoLangTip('common_00013') + '</a>').appendTo(add_hanlder_box);

        update_per_link.click(function () {
            setCustomPermission(updateWorkPer);
            return false;
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
                    var li_unit = jQuery('<li><label>' + wanerdaoLangTip('personal_00053') + '：</label></li>').appendTo(ul_work_detail);
                    var unit_name = jQuery('<input type="text" class="text" style="width:180px" id="unit_name" maxlength="60"  />').appendTo(li_unit);
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
                    var li_industry = jQuery('<li><label>' + wanerdaoLangTip('personal_00054') + '：</label></li>').appendTo(ul_work_detail);
                    var work_industry = jQuery('<select name="work_industry" id="work_industry" style="width:190px"></select>').appendTo(li_industry);
                    work_industry.append('<option value="">-' + wanerdaoLangTip('personal_00059') + '-</option>');

                    /* office */
                    var li_office = jQuery('<li><label>' + wanerdaoLangTip('personal_00055') + '：</label></li>').appendTo(ul_work_detail);
                    var work_office = jQuery('<select name="work_office" id="work_office" style="width:190px"></select>').appendTo(li_office);
                    work_office.append('<option value="">-' + wanerdaoLangTip('personal_00060') + '-</option>');

                    getPositionCategory(function (data) {
                        $.each(data, function (i, o) {
                            work_industry.append($wd.format('<option value="{0}">{1}</option>', o.id, o.category_name));
                        });
                        work_industry.chosen();
                    });

                    work_industry.change(function () {
                        if ($(this).val()) {
                            getPosition(work_office, '', $(this).val());
                        }
                    });

                    /* work time */
                    var li_work_time = jQuery('<li><label>' + wanerdaoLangTip('personal_00056') + '：</label></li>').appendTo(ul_work_detail);
                    var begin_year = jQuery('<select name="begin_time" id="begin_year" style="width:62px"></select>').appendTo(li_work_time);
                    li_work_time.append('&nbsp;');
                    var begin_month = jQuery('<select name="begin_month" id="begin_month" style="width:62px"></select>').appendTo(li_work_time);
                    BindDateYM(begin_year, begin_month);
                    li_work_time.append('&nbsp;' + wanerdaoLangTip('personal_00057') + '&nbsp;');
                    var end_year = jQuery('<select name="end_year" id="end_year" style="width:62px"></select>').appendTo(li_work_time);
                    li_work_time.append('&nbsp;');
                    var end_month = jQuery('<select name="end_month" id="end_month" style="width:62px"></select>').appendTo(li_work_time);
                    BindDateYM(end_year, end_month);
                    li_work_time.append('&nbsp;');
                    var now_work = jQuery('<input name="now_work" type="checkbox" id="now_work" maxlength="60" />').appendTo(li_work_time);
                    li_work_time.append('' + wanerdaoLangTip('personal_00058') + '');

                    ul_work_detail.find('select').chosen();
                    now_work.click(function () {
                        if (now_work.attr('checked')) {
                            end_year.next().hide();
                            end_month.next().hide();
                        } else {
                            end_year.next().show();
                            end_month.next().show();
                        }
                    });

                    //button
                    var operate_btn = jQuery('<li class=""></li>').appendTo(ul_work_detail);
                    var btn_add = jQuery('<input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00013') + '" />').appendTo(operate_btn);
                    operate_btn.append('&nbsp;');
                    var btn_cancel = jQuery('<input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + '" />').appendTo(operate_btn);

                    btn_add.click(function () {
                        if (!$.trim(unit_name.val())) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00001')
                            });
                            return false;
                        } else if (!work_industry.val()) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00002')
                            });
                            return false;
                        } else if (!work_office.val()) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00003')
                            });
                            return false;
                        } else if (hasNow && now_work.attr('checked')) {
                            new pop({ typename: 'error',
                                msginfo: wanerdaoLangTip('personal_00004')
                            });
                            return false;
                        }
                        else {
                            var present = now_work.attr('checked') ? true : false; //是否工作至今

                            var bYear = parseInt(begin_year.val());
                            var bMonth = parseInt(begin_month.val());
                            var eYear = parseInt(end_year.val());
                            var eMonth = parseInt(end_month.val());

                            if (!present && (bYear > eYear || (bYear == eYear && bMonth > eMonth))) {
                                new pop({ typename: 'error',
                                    msginfo: wanerdaoLangTip('personal_00083')
                                });
                                return false;
                            }

                            var beginT = bYear + "-" + bMonth + "-1";
                            var endT = '';
                            if (!now_work.attr('checked')) {
                                endT = eYear + "-" + eMonth + "-1";
                            }

                            btn_add.attr('disabled', true);
                            $.ajax({
                                url: "../wanerdao_personal.axd",
                                type: "post",
                                dataType: "json",
                                cache: false,
                                data: "{opertype:'addpersonalwork',cname:'" + unit_name.val() + "',pcat:'" + work_industry.val() + "',pname:'" + work_office.val()
                                                    + "',begindate:'" + beginT + "',enddate:'" + endT + "',present:'" + present + "',desc:''}",
                                error: function (data) {
                                    btn_add.removeAttr('disabled');
                                },
                                success: function (data) {
                                    if (data.result) {
                                        add_work_input_box.remove();
                                        getWorkInfo();
                                        getCurWork();
                                        edit_state = false;
                                    } else {
                                        btn_add.removeAttr('disabled');
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
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('personal_00005')
                    });
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
            //alert('load interestinfo fail');
        },
        success: function (data) {
            if (data.result) {
                interestinfo = data.obj;
                if (tab_index == 4) {
                    setInterestInfo();
                }
            } else {
            }
        }
    });
}

function setInterestInfo() {
    var interest_box = jQuery('<div class="hobby_list"></div').appendTo($('.datum_hobby').empty());
    var interest_info_box = jQuery('<div class="hobby_listT"></div>').appendTo(interest_box);

    var ul_interest = jQuery('<ul></ul>').appendTo(interest_info_box);
    ul_interest.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00061') + '：</label> {0}</li>', interestinfo.music));
    ul_interest.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00062') + '：</label> {0}</li>', interestinfo.movie));
    ul_interest.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00063') + '：</label> {0}</li>', interestinfo.game));
    ul_interest.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00064') + '：</label> {0}</li>', interestinfo.cartoon));
    ul_interest.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00065') + '：</label> {0}</li>', interestinfo.book));
    ul_interest.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00066') + '：</label> {0}</li>', interestinfo.sport));

    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(interest_info_box);
        var update_per_link = jQuery('<a href="javascript:void(0);" class="inp_setting">' + wanerdaoLangTip('personal_00037') + '</a>').appendTo(edit_handler);
        update_per_link.click(function () {
            setCustomPermission(updateInterestsPer);
            return false;
        });

        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler)
        link_edit.click(function () {
            if (interest_box.find('.hobby_listB').length == 0) {
                var edit_box = jQuery('<div class="hobby_listB"></div>').appendTo(interest_box);
                edit_box.append('<div class="hobby_tagT"></div>');
                edit_box.append('<div class="hobby_tagC"></div>');

                var ul_edit_item = jQuery('<ul></ul>').appendTo(edit_box.find('.hobby_tagC'));
                ul_edit_item.append('<li>Note: multiple content input with a comma "," separated</li>');
                var li_music = jQuery('<li><label>' + wanerdaoLangTip('personal_00061') + '：</label></li>').appendTo(ul_edit_item);
                var interest_music = jQuery('<input type="text" class="text" style="width:300px" id="interest_music" maxlength="60"  />').appendTo(li_music);
                interest_music.val(interestinfo.music);

                var li_movie = jQuery('<li><label>' + wanerdaoLangTip('personal_00062') + '：</label></li>').appendTo(ul_edit_item);
                var interest_movie = jQuery('<input type="text" class="text" style="width:300px" id="interest_movie" maxlength="60"  />').appendTo(li_movie);
                interest_movie.val(interestinfo.movie);

                var li_game = jQuery('<li><label>' + wanerdaoLangTip('personal_00063') + '：</label></li>').appendTo(ul_edit_item);
                var interest_game = jQuery('<input type="text" class="text" style="width:300px" id="interest_game" maxlength="60"  />').appendTo(li_game);
                interest_game.val(interestinfo.game);

                var li_cartoon = jQuery('<li><label>' + wanerdaoLangTip('personal_00064') + '：</label></li>').appendTo(ul_edit_item);
                var interest_cartoon = jQuery('<input type="text" class="text" style="width:300px" id="interest_cartoon" maxlength="60"  />').appendTo(li_cartoon);
                interest_cartoon.val(interestinfo.cartoon);

                var li_book = jQuery('<li><label>' + wanerdaoLangTip('personal_00065') + '：</label></li>').appendTo(ul_edit_item);
                var interest_book = jQuery('<input type="text" class="text" style="width:300px" id="interest_book" maxlength="60"  />').appendTo(li_book);
                interest_book.val(interestinfo.book);

                var li_sport = jQuery('<li><label>' + wanerdaoLangTip('personal_00066') + '：</label></li>').appendTo(ul_edit_item);
                var interest_sport = jQuery('<input type="text" class="text" style="width:300px" id="interest_sport" maxlength="60"  />').appendTo(li_sport);
                interest_sport.val(interestinfo.sport);

                //button
                var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_edit_item);
                var btn_save = jQuery('<input name="interest_save" id="interest_save" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " >').appendTo(operate_btn);
                operate_btn.append('&nbsp;');
                var btn_cancel = jQuery('<input name="interest_cancel" id="interest_cancel" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' ">').appendTo(operate_btn);

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
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                });

                //bind cancel click event
                btn_cancel.click(function () {
                    edit_box.remove();
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
            //alert('load contact fail');
        },
        success: function (data) {
            if (data.result) {
                contactinfo = data.obj;
                if (tab_index == 5) {
                    setContactInfo();
                }
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
    ul_contact.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00067') + '：</label> {0}</li>', contactinfo.cell));
    ul_contact.append($wd.format('<li><label>' + wanerdaoLangTip('personal_00068') + '：</label> <a href="http://{0}" target="_blank">{1}</a></li>', contactinfo.web_website.replace(/http\:\/\//, ''), contactinfo.web_website));


    if (self) {
        var edit_handler = jQuery('<div class="fdbox"></div>').appendTo(contact_info_box);
        var update_per_link = jQuery('<a href="javascript:void(0);" class="inp_setting">' + wanerdaoLangTip('personal_00037') + '</a>').appendTo(edit_handler);
        update_per_link.click(function () {
            setCustomPermission(updateContactPer);
            return false;
        });
        var link_edit = jQuery('<a href="javascript:void(0);" class="inp_modify">' + wanerdaoLangTip('common_00046') + '</a>').appendTo(edit_handler)

        link_edit.click(function () {
            if (contact_box.find('.hobby_listB').length == 0) {
                var edit_box = jQuery('<div class="hobby_listB"></div>').appendTo(contact_box);
                edit_box.append('<div class="hobby_tagT"></div>');
                edit_box.append('<div class="hobby_tagC"></div>');

                var ul_edit_item = jQuery('<ul></ul>').appendTo(edit_box.find('.hobby_tagC'));
                //email
                var li_email = jQuery('<li><label>E-mail：</label></li>').appendTo(ul_edit_item);
                var contact_email = jQuery('<input type="text" class="text f_left" style="width:200px" id="contact_email" maxlength="60"  readonly="readonly"/>').appendTo(li_email);
                if (contactinfo.is_bond_email)
                    contact_email.attr("readonly", "readonly");
                contact_email.val(contactinfo.email);
                li_email.append('<span><a id="bind_email"></a></span>');
                //skype
                var li_skype = jQuery('<li><label>skype：</label></li>').appendTo(ul_edit_item);
                var contact_skype = jQuery('<input type="text" class="text f_left" style="width:200px" id="contact_skype" maxlength="60"  />').appendTo(li_skype);
                if (contactinfo.is_bond_skype)
                    contact_skype.attr("readonly", "readonly");
                contact_skype.val(contactinfo.skype);
                li_skype.append('<span><a id="bind_skype"></a></span>');
                //msn
                var li_msn = jQuery('<li><label>MSN：</label></li>').appendTo(ul_edit_item);
                var contact_msn = jQuery('<input type="text" class="text f_left" style="width:200px" id="contact_msn"  maxlength="60" />').appendTo(li_msn);
                if (contactinfo.is_bond_msn)
                    contact_msn.attr("readonly", "readonly");
                contact_msn.val(contactinfo.msn);
                li_msn.append('<span><a id="bind_msn"></a></span>');
                //cell
                var li_cell = jQuery('<li><label>' + wanerdaoLangTip('personal_00067') + '：</label></li>').appendTo(ul_edit_item);
                var contact_cell = jQuery('<input type="text" class="text f_left" style="width:200px" id="contact_cell" maxlength="60"  />').appendTo(li_cell);
                if (contactinfo.is_bond_cell)
                    contact_cell.attr("readonly", "readonly");
                contact_msn.val(contactinfo.msn);
                contact_cell.val(contactinfo.cell);
                li_cell.append('<span><a id="bind_cell"></a></span>');

                //web site
                var li_website = jQuery('<li><label>' + wanerdaoLangTip('personal_00068') + '：</label></li>').appendTo(ul_edit_item);
                var contact_website = jQuery('<input type="text" class="text f_left" style="width:200px" id="contact_website" maxlength="60"  />').appendTo(li_website);
                contact_website.val(contactinfo.web_website);

                $('#contact_skype,#contact_msn,#contact_cell').unbind('keyup');
                $('#contact_skype').bind('keyup', function (e) {
                    if (e.keyCode != 8) {
                        $(this).val($(this).val().replace(/[^\w]/g, ''));
                    }
                });
                $('#contact_msn,#contact_cell').bind('keyup', function (e) {
                    if (e.keyCode != 8) {
                        $(this).val($(this).val().replace(/[^\d]/g, ''));
                    }
                });

                //button
                var operate_btn = jQuery('<li class="pt12"></li>').appendTo(ul_edit_item);
                var btn_save = jQuery('<input name="contact_save" id="contact_save" type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="' + wanerdaoLangTip('common_00049') + ' " />').appendTo(operate_btn);
                operate_btn.append('&nbsp;');
                var btn_cancel = jQuery('<input name="interest_cancel" id="interest_cancel" type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="' + wanerdaoLangTip('common_00016') + ' ">').appendTo(operate_btn);

                setAccBind();

                //bind edit click event
                btn_save.click(function () {
                    if (!/^(http|https\:\/\/)/.test(contact_website.val())) {
                        contact_website.val('');
                    }
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
                                new pop({ typename: 'error',
                                    msginfo: data.msg
                                });
                            }
                        }
                    });
                });

                //bind cancel click event
                btn_cancel.click(function () {
                    edit_box.remove();
                });

                edit_box.append('<div class="hobby_tagB"></div>');
            } else {
                contact_box.find('.hobby_listB').remove();
            }
        });
    }

}

function setAccBind() {
    $('#bind_email').unbind('click');
    $('#bind_skype').unbind('click');
    $('#bind_msn').unbind('click');
    $('#bind_cell').unbind('click');

    if (contactinfo.is_bond_email) {
        $('#bind_email').removeAttr('href');
        $('#bind_email').text('' + wanerdaoLangTip('personal_00069') + '');
        if ($('#bind_email').parent().hasClass('off')) {
            $('#bind_email').parent().removeClass('off');
        }
        $('#bind_email').parent().addClass('on');
    } else {
        if ($('#bind_email').parent().hasClass('on')) {
            $('#bind_email').parent().removeClass('on');
        }
        $('#bind_email').parent().addClass('off');
        $('#bind_email').attr('href', 'javascript:;');
        $('#bind_email').text('' + wanerdaoLangTip('personal_00070') + '');
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
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
                    }
                }
            });
        });
    }

    if (contactinfo.is_bond_skype) {
        $('#bind_skype').removeAttr('href');
        $('#bind_skype').text('' + wanerdaoLangTip('personal_00069') + '');
        if ($('#bind_skype').parent().hasClass('off')) {
            $('#bind_skype').parent().removeClass('off');
        }
        $('#bind_skype').parent().addClass('on');
    } else {
        if ($('#bind_skype').parent().hasClass('on')) {
            $('#bind_skype').parent().removeClass('on');
        }
        $('#bind_skype').parent().addClass('off');
        $('#bind_skype').attr('href', 'javascript:;');
        $('#bind_skype').text('' + wanerdaoLangTip('personal_00070') + '');
        $('#bind_skype').click(function (evt) {
            $.ajax({
                url: "../wanerdao_personal.axd",
                type: "post",
                dataType: "json",
                cache: false,
                data: "{opertype:'setskypeasacc',acc:'" + $('#bind_skype').val() + "'}",
                error: function (data) {
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('common_00001')
                    });
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
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
                    }
                }
            });
        });
    }

    if (contactinfo.is_bond_msn) {
        $('#bind_msn').removeAttr('href');
        $('#bind_msn').text('' + wanerdaoLangTip('personal_00069') + '');
        if ($('#bind_msn').parent().hasClass('off')) {
            $('#bind_msn').parent().removeClass('off');
        }
        $('#bind_msn').parent().addClass('on');
    } else {
        if ($('#bind_msn').parent().hasClass('on')) {
            $('#bind_msn').parent().removeClass('on');
        }
        $('#bind_msn').parent().addClass('off');
        $('#bind_msn').attr('href', 'javascript:;');
        $('#bind_msn').text('' + wanerdaoLangTip('personal_00070') + '');
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
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });

                    }
                }
            });
        });
    }

    if (contactinfo.is_bond_cell) {
        $('#bind_cell').removeAttr('href');
        $('#bind_cell').text('' + wanerdaoLangTip('personal_00069') + '');
        if ($('#bind_cell').parent().hasClass('off')) {
            $('#bind_cell').parent().removeClass('off');
        }
        $('#bind_cell').parent().addClass('on');
    } else {
        if ($('#bind_cell').parent().hasClass('on')) {
            $('#bind_cell').parent().removeClass('on');
        }
        $('#bind_cell').parent().addClass('off');
        $('#bind_cell').attr('href', 'javascript:;');
        $('#bind_cell').text('' + wanerdaoLangTip('personal_00070') + '');
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
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
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
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
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
                $('#is_display_school option[value="1"]').text(data.msg || wanerdaoLangTip('personal_00014'));
                $('#is_display_school').chosen();
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
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
                $('#is_display_work option[value="1"]').text(data.msg || wanerdaoLangTip('personal_00014'));
                $('#is_display_work').chosen();
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
            }
        }
    });
}
/**************************************************** tools ****************************************************/

/* bind date selelct */
function bindDateSelect(select_y, select_m, select_d) {
    var date = new Date();
    for (i = date.getFullYear(); i > date.getFullYear() - 100; i--) {
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
        select_d.chosen();
    });

    select_m.change(function () {
        select_d.empty();
        var lastDay = new Date(select_y.val(), select_m.val(), 0).getDate();
        for (i = 1; i <= lastDay; i++) {
            select_d.append($wd.format('<option value="{0}">{0}</option>', i));
        }
        select_d.chosen();
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
    ajaxfunc('permission_personal.axd', "{opertype:'updatepersonaleduationpermission',permission:'" + data.id + "'}", null, function (data) {
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
    new CustomPermission({
        callback: _callback,
        chooseOrEdit: 'choose'
    });
}

var positionCategory = [];
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
            $input.append('<option value="">-' + wanerdaoLangTip('personal_00060') + '-</option>');
            $.each(data.rows, function (i, v) {
                if (v.id == value) {
                    $input.append($wd.format('<option value="{0}" selected="selected">{1}</option>', v.id, v.category_name));
                } else {
                    $input.append($wd.format('<option value="{0}">{1}</option>', v.id, v.category_name));
                }
            });
            $input.chosen();
        }
    });

}

function setPosition(categoryId, value, $obj) {
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
