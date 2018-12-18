/**
 * Created by 54721 on 2018/12/18.
 */


$(function() {

  var currentPage = 1;  // 当前页
  var pageSize = 3; // 每页条数
  var picArr = []; // 图片数组, 存放所有用于提交的图片对象


  // 1. 一进入页面, 进行渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("productTpl", info);
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ),
          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }


  // 2. 点击添加商品, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 发送ajax请求, 渲染下拉列表, 获取全部的二级分类
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template( "dropdownTpl", info );
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });



  // 3. 给所有的下拉框的 a 添加点击事件
  $('.dropdown-menu').on("click", "a", function() {
    // 获取 a 的文本, 设置给 按钮
    var txt = $(this).text();
    $('#dropdownText').text( txt );

    // 获取存储的 id, 设置给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );
  });


  // 4. 进行文件上传初始化
  $('#fileupload').fileupload({
    // 返回的数据类型
    dataType: 'json',
    // 图片上传完成的回调函数
    done: function( e, data ) {
      console.log( data );
      var picObj = data.result; // 后台返回的结果对象  图片名称 和 图片地址
      // push pop  shift  unshift
      // 添加到数组最前面
      picArr.unshift( picObj );

      var picUrl = picObj.picAddr;
      // 将新得到的图片, 添加到结构最前面
      $('#imgBox').prepend('<img src="'+ picUrl +'" style="width: 100px" alt="">');

      if ( picArr.length > 3 ) {  // 4
        // 移除数组的最后一项
        picArr.pop();
        // 同时页面结构要更新, 找到最后一个 img 类型的元素, 并且删除
        $('#imgBox img:last-of-type').remove();
      }
      console.log( picArr );

    }
  })



})