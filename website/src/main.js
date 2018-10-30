function playVideo(ele) {
  if ($(ele).hasClass('pause')) {
    $(ele).trigger("play");
    $(ele).removeClass('pause');
    $(ele).addClass('play');
  } else {
    $(ele).trigger("pause");
    $(ele).removeClass('play');
    $(ele).addClass('pause');
  }
}

function openVideo(num) {
  if (num === 1) {
    $('.modal-video').fadeIn();
    $('.modal-video>div>video').hide();
    $('.modal-video>div>.video1').fadeIn();
    $('video').trigger('pause');
    $(".video1").trigger("play");
  } else {
    $('.modal-video').fadeIn();
    $('.modal-video>div>video').hide();
    $('.modal-video>div>.video2').fadeIn();
    $('video').trigger('pause');
    $(".video2").trigger("play");
  }
}

//登录
function login() {
  if ($("#account").val() === "") {
    $(".modal-login .content>.tip").text("请输入账号").fadeIn();
  } else if ($("#psw").val() === "") {
    $(".modal-login .content>.tip").text("请输入密码").fadeIn();
  } else {
    var url = common.ApiPath + api.Login;
    var postdata = {
      "UserName": $("#account").val(),
      "Password": $("#psw").val(),
    }
    postdata = $.extend(common.postdata, postdata);
    console.log(postdata);
    if ($("#psw").val().length < 6 || $("#psw").val().length > 30) {
      $(".modal-login .content>.tip").text("请输入6-30位非汉字密码").fadeIn();
    } else {
      common.DoAjax(url, postdata, function (data) {
        console.log(data);
        if (data.ResCode === 1000) {
          localStorage.setItem("token", data.Token);
          window.location.href = common.PsbPath + "#/?token=" + data.Token;
        } else {
          $(".modal-login .content>.tip").text(data.Msg).fadeIn();
        }
      })
    }
  }
}

// 显示x号
function showClose(ele) {
  if ($(ele).val()) {
    $(ele).next().fadeIn();
  } else {
    $(ele).next().fadeOut();
  }
}

// 进入我的票税宝
function enterPsb() {
  window.location.href = common.PsbPath + "#/?token=" + localStorage.getItem("token");
}

// 退出
function logout() {
  localStorage.setItem("token", "");
  var url = common.ApiPath + api.LoginOut;
  common.DoAjax(url, common.postdata, function (data) {
    console.log(data);
    if (data.ResCode === 1000) {
      location.reload();
    } else {
      jToast().showToastWithClose(data.Msg);
    }
  })
}

$(function () {
  //判断是否已经登录
  common.postdata.Token = localStorage.getItem("token");
  var url = common.ApiPath + api.GetMemberDetail;
  if (common.postdata.Token) {
    common.DoAjax(url, common.postdata, function (data) {
      console.log(data);
      if (data.ResCode === 1000) {
        $(".login").hide();
        $(".logined>#name").text(data.Data.NickName);
        $(".logined").show();
      }
    })
  } else {
    $(".logined").hide();
    $(".login").show();
  }

  // 获取视频地址
  var getVideoUrl = common.ApiPath + api.getVideo;
  common.DoAjax(getVideoUrl, common.postdata, function (data) {
    console.log(data);
    if (data.ResCode === 1000) {
      common.video1 = data.Data.DataList[0].Video.VideoUrl;
      common.video2 = data.Data.DataList[1].Video.VideoUrl;
      common.image1 = data.Data.DataList[0].Video.Thumbnail;
      common.image2 = data.Data.DataList[1].Video.Thumbnail;
      $("#video1").attr("src", common.video1);
      $("#video2").attr("src", common.video2);
      $(".video1:eq(0)").css("background-image", "url(" + common.image1 + ")");
      $(".video2:eq(0)").css("background-image", "url(" + common.image2 + ")");
    }
  })
})