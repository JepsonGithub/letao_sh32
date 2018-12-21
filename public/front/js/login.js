/**
 * Created by 54721 on 2018/12/21.
 */
$(function() {

  // 点击登录按钮, 发送登录请求, 完成用户登录
  $('#loginBtn').click(function() {

    // 获取用户名, 密码
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();

    if ( username === "" ) {
      mui.toast("请输入用户名");
      return;
    }
    if ( password === "" ) {
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 403 ) {
          mui.toast("用户名或者密码错误");
          return;
        }

        if ( info.success ) {
          // 成功, 跳转个人中心
          location.href = "user.html";
        }
      }
    })

  })


})
