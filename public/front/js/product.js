/**
 * Created by 54721 on 2018/12/21.
 */
$(function() {

  // 获取地址栏传递过来的参数 productId
  var productId = getSearch("productId");

  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      console.log( info )
      var htmlStr = template("productTpl", info);
      $('.lt_main .mui-scroll').html( htmlStr );

      // 在轮播图动态渲染完成后, 需要手动初始化
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 数字框手动初始化
      mui('.mui-numbox').numbox()
    }
  });



})
