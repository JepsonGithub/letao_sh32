/**
 * Created by 54721 on 2018/12/17.
 */
$(function() {

  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页条数

  // 一进入页面, 发送ajax请求, 完成渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("firstTpl", info);
        $('tbody').html( htmlStr );

        // 根据返回数据, 完成初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 添加点击事件
          onPageClicked: function( a, b, c, page ) {
            console.log( page );
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }


})
