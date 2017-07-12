function fileQueueError(file, errorCode, message) {
    try {
        var imageName = "error.gif";
        var errorName = "";
        if (errorCode == SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
            errorName = "You have attempted to queue too many files.";
        }

        if (errorName !== "") {
            alert(errorName);
            return;
        }

        if (errorCode == SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            showInformation("", false, "上传数量过多！");
            return;
        }

        if (errorCode == SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT) {
            showInformation("", false, "上传文件太大！");
            return;
        }

        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                imageName = "zerobyte.gif";
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                imageName = "toobig.gif";
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
            default:
                alert(message);
                break;
        }

        //addImage("images/" + imageName,"","");

    } catch (ex) {
        this.debug(ex);
    }

}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
    try {
        if (numFilesQueued > 0) {
            this.startUpload();
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadProgress(file, bytesLoaded) {
    try {

        // alert(file+":::"+byteloaded)



        //        if ($("#divUploadMessage") != null) {
        //            var percent = Math.ceil((bytesLoaded / file.size) * 100);
        //            $("#divUploadMessage").show();
        //            $("#labUploadFile").html(file.name);
        //            $("#spanProgress").css({ width: percent + "%" }).html(percent + "%");
        //        }
        //		var progress = new FileProgress(file,  this.customSettings.upload_target);
        //		progress.setProgress(percent);
        //		if (percent === 100) {
        //			progress.setStatus("Creating thumbnail...");
        //			progress.toggleCancel(false, this);
        //		} else {
        //			progress.setStatus("Uploading...");
        //			progress.toggleCancel(true, this);
        //		}
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadSuccess(file, serverData) {
    try {
        if (serverData != "no Space!") {
            $("#message").html("");
            var sdata = serverData.split("-,-")
            //addImage("thumbnail.aspx?id=" + sdata[0], sdata[0], sdata[1]);
            addImage(sdata[0], sdata[1], sdata[2], sdata[3]);
            var progress = new FileProgress(file, this.customSettings.upload_target);

            progress.setStatus("Thumbnail Created.");
            progress.toggleCancel(false);
        } else {
            $("#message").html("照片空间已满！");
        }

    } catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
    try {
        $("#divUploadMessage").hide();
        /*  I want the next upload to continue automatically so I'll call startUpload here */
        if (this.getStats().files_queued > 0) {
            this.startUpload();
        } else {
            if (hasFolder == 1) {
                $("#grayButton").hide();
                $("#submitButton").show();

            }

            var progress = new FileProgress(file, this.customSettings.upload_target);
            progress.setComplete();
            progress.setStatus("All images received.");
            progress.toggleCancel(false);
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadError(file, errorCode, message) {
    var imageName = "error.gif";
    var progress;
    try {
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                try {
                    progress = new FileProgress(file, this.customSettings.upload_target);
                    progress.setCancelled();
                    progress.setStatus("Cancelled");
                    progress.toggleCancel(false);
                }
                catch (ex1) {
                    this.debug(ex1);
                }
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                try {
                    progress = new FileProgress(file, this.customSettings.upload_target);
                    progress.setCancelled();
                    progress.setStatus("Stopped");
                    progress.toggleCancel(true);
                }
                catch (ex2) {
                    this.debug(ex2);
                }
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                imageName = "uploadlimit.gif";
                break;
            default:
                alert("上传失败" + message);
                break;
        }

        //   addImage("images/" + imageName, "", "", "");

    } catch (ex3) {
        this.debug(ex3);
    }

}


function addImage(src, id, name, type) {

    //胥鑫注释，不知道谁加的这段代码，会引起我这边功能出错，变量allUploadImageId未声明，如有问题请联系胥鑫
    // allUploadImageId = allUploadImageId + id + ",";

    var html;
    if (type == "Groupfile") {

        html = "<i id='" + id + "' lang='" + src + "'>" + name + " <a href=\"javascript:delFile('" + src + "','" + id + "')\"><img src='../images/list/set_icon06.jpg'></a></i>";

        $("#thumbnails").append(html);
    } else if (type == "GroupUpload") {
        html = "<img src='../" + src + "' id='groupImage' title='" + name + "'><a href=\"javascript:dellogo()\"><img src='../images/del_pep.png'></a>";

        $("#thumbnails").empty().append(html);
    } else if (type == "information") {

        html = "<li class='subLink' id='" + id + "'><img src='../" + src + "' class='bor'><br /><a class='orangecolorLink' onclick=\"deleteTempImg(this,'" + id + "')\">删除</a></li>";
        $("#imglist").append(html);
        if ($("#inforimgEdit").html() != null) {
            addTempImdID(id);
            addinforimgEdit(html);
        }
    } else {
        //html = "<div class='upload_pic'><div class='upload_pic_close'><img src='../../images/PluginImages/Album/close.gif' width='18' style='cursor:pointer' height='18' onclick=\"deleteTempPhoto(this,'" + id + "')\"></div>";
        //html += "<div class='upload_pic_t'> </div> <div class='upload_pic_m'> <img src='" + src + "' width='164' height='116' class='marginB10'>";
        //html += "<h3>" + name + "</h3> </div> <div class='upload_pic_b'> </div> </div>";

        html = ("<li>");
        html += ("<div class=\"pic\"><a href=\"#\"><img  src='" + src + "' width='130' height='106' alt=\"\"></a></div>");
        html += ("<div class=\"info\"><a href=\"#\">" + name + "</a></div>");
        html += ("<a href=\"###\" class=\"delete\" onclick=\"deleteTempPhoto(this,'" + id + "')\"></a>");
        html += ("</li>");
        $("#thumbnails").append(html);
    }


}

function fadeIn(element, opacity) {
    var reduceOpacityBy = 5;
    var rate = 30; // 15 fps


    if (opacity < 100) {
        opacity += reduceOpacityBy;
        if (opacity > 100) {
            opacity = 100;
        }

        if (element.filters) {
            try {
                element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
            } catch (e) {
                // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
                element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
            }
        } else {
            element.style.opacity = opacity / 100;
        }
    }

    if (opacity < 100) {
        setTimeout(function () {
            fadeIn(element, opacity);
        }, rate);
    }
}



/* ******************************************
*	FileProgress Object
*	Control object for displaying file info
* ****************************************** */

function FileProgress(file, targetID) {
    this.fileProgressID = "divFileProgress";

    this.fileProgressWrapper = document.getElementById(this.fileProgressID);
    if (!this.fileProgressWrapper) {
        this.fileProgressWrapper = document.createElement("div");
        this.fileProgressWrapper.className = "progressWrapper";
        this.fileProgressWrapper.id = this.fileProgressID;

        this.fileProgressElement = document.createElement("div");
        this.fileProgressElement.className = "progressContainer";

        var progressCancel = document.createElement("a");
        progressCancel.className = "progressCancel";
        progressCancel.href = "#";
        progressCancel.style.visibility = "hidden";
        progressCancel.appendChild(document.createTextNode(" "));

        var progressText = document.createElement("div");
        progressText.className = "progressName";
        progressText.appendChild(document.createTextNode(file.name));

        var progressBar = document.createElement("div");
        progressBar.className = "progressBarInProgress";

        var progressStatus = document.createElement("div");
        progressStatus.className = "progressBarStatus";
        progressStatus.innerHTML = "&nbsp;";

        this.fileProgressElement.appendChild(progressCancel);
        this.fileProgressElement.appendChild(progressText);
        this.fileProgressElement.appendChild(progressStatus);
        this.fileProgressElement.appendChild(progressBar);

        this.fileProgressWrapper.appendChild(this.fileProgressElement);

        document.getElementById(targetID).appendChild(this.fileProgressWrapper);
        fadeIn(this.fileProgressWrapper, 0);

    } else {
        this.fileProgressElement = this.fileProgressWrapper.firstChild;
        this.fileProgressElement.childNodes[1].firstChild.nodeValue = file.name;
    }

    this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
    this.fileProgressElement.className = "progressContainer blue";
    this.fileProgressElement.childNodes[3].className = "progressBarComplete";
    this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setError = function () {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
    this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
    if (swfuploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function () {
            swfuploadInstance.cancelUpload(fileID);
            return false;
        };
    }
};
