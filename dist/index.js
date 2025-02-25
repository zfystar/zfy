//切换搜索栏
$('.search-tab span').click(function (e) {
    if ($(this).addClass("active").siblings(".active").removeClass("active"),
        $(".search-hidden").remove(),
        $(this).hasClass("baidu"))
        $(".search-form").attr("action", "https://www.baidu.com/s"),
            $(".search-keyword").attr({
                name: "word",
                placeholder: "百度一下，你就知道"
            })
    else if ($(this).hasClass("google"))
        $(".search-form").attr("action", "https://www.google.com/search"),
            $(".search-keyword").attr({
                name: "q",
                placeholder: "Google 搜索"
            })
    else if ($(this).hasClass("my"))
        $(".search-form").attr("action", "https://zfy-search.vercel.app/search"),
            $(".search-keyword").attr({
                name: "q",
                placeholder: "简单搜索"
            })
    else if ($(this).hasClass("bing"))
        $(".search-form").attr("action", "https://cn.bing.com/search"),
            $(".search-keyword").attr({
                name: "q",
                placeholder: "微软 Bing 搜索"
            })
    else if ($(this).hasClass("zhihu"))
        $(".search-form").attr("action", "https://www.zhihu.com/search"),
            $(".search-keyword").attr({
                name: "q",
                placeholder: "知乎 有问题，就会有答案"
            })
    else if ($(this).hasClass("segmentfault"))
        $(".search-form").attr("action", "https://segmentfault.com/search"),
            $(".search-keyword").attr({
                name: "q",
                placeholder: "SegmentFault 提问"
            })
    else if ($(this).hasClass("image")) {
        $(".search-form").attr("action", "https://cn.bing.com/images/search"),
            $(".search-keyword").attr({
                name: "q",
                placeholder: "海量图片搜索"
            })
        var i = new Image
        i.src = "https://images.google.com/favicon.ico?" + Date.now(),
            i.onload = function () {
                $(".search-form").attr("action", "https://www.google.com/search"),
                    $(".search-form").prepend('<input class="search-hidden" type="hidden" name="tbm" value="isch">')
            }
    } else if ($(this).hasClass("wiki")) {
        $(".search-form").attr("action", "https://baike.baidu.com/search"),
            $(".search-keyword").attr({
                name: "word",
                placeholder: "自由的百科全书"
            })
        var i = new Image
        i.src = "https://zh.wikipedia.org/favicon.ico?" + Date.now(),
            i.onload = function () {
                $(".search-form").attr("action", "https://zh.wikipedia.org/w/index.php"),
                    $(".search-keyword").attr("name", "search")
            }
    } else if ($(this).hasClass("torrent"))
        $(".search-form").attr("action", "https://cilisousuo.co/search"),
            $(".search-keyword").attr({
                name: "q",
                placeholder: "磁力搜索"
            })
    else if ($(this).hasClass("scholar")) {
        $(".search-form").attr("action", "https://xueshu.baidu.com/s"),
            $(".search-keyword").attr({
                name: "wd",
                placeholder: "中英文文献检索"
            })
        var i = new Image
        i.src = "https://scholar.google.com/favicon.ico?" + Date.now(),
            i.onload = function () {
                $(".search-form").attr("action", "https://scholar.google.com/scholar"),
                    $(".search-keyword").attr({
                        name: "q"
                    }),
                    $(".search-form").prepend('<input class="search-hidden" type="hidden" name="hl" value="zh-CN">')
            }
    }
    $(".search-keyword").focus()
});

//点击工具按钮
$("#setting-icon").on("click", function () {
    $('.work-link .info').hide();
    $("#tool").fadeIn(300);
})

//切换分类
$('.work-link .tab span').on('click', function () {
    var index = $(this).index();
    $(this).addClass("active").siblings(".active").removeClass("active");
    $('.work-link .info').hide().eq(index).fadeIn(300);
})

 //链接点击
 $('.work-link .info ul li a').on('click', function () {
    $.ajax({
        type: "PUT",
        url: "/api/click",
        data: { id: $(this).data('id') },
        dataType: "json",
        success: function (data) {
        },
        error: function (error) {
            if (error.responseJSON.code == 422) {
                layer.msg(error.responseJSON.msg)
            }
        }
    });
})

//切换背景
$("#setting-bkgd select").change(function () {
    $("body").css("background", $(this).val());
})

//添加链接
$("#url-add").on('click', function () {
    $.ajax({
        type: "POST",
        url: "/api/create",
        data: $("#urlfrom").serialize(),
        dataType: "json",
        success: function (data) {
            layer.msg(data.msg)
            $("#urlfrom input[type='text'] ").val('');
        },
        error: function (error) {
            if (error.responseJSON.code == 422) {
                layer.msg(error.responseJSON.msg)
            }
        }
    });
})

//保存设置
$("#setting-save").on('click', function () {
    $.ajax({
        type: "PUT",
        url: "/api/setting",
        data: $("#bgfrom").serialize(),
        dataType: "json",
        success: function (data) {
            layer.msg(data.msg)
            window.location.reload();
        },
        error: function (error) {
            if (error.responseJSON.code == 422) {
                layer.msg(error.responseJSON.msg)
            }
        }
    });
})

//根据链接提取标题
$('#url-url').blur(function (e) {
    var url = $(this).val();
    if (url.length > 0) {
        $.ajax({
            type: "GET",
            url: "/api/title",
            data: { url: url },
            dataType: "json",
            success: function (data) {
                $('#url-name').val(data.data);
            },
            error: function (error) {
                if (error.responseJSON.code == 422) {
                    layer.msg(error.responseJSON.msg)
                }
            }
        });
    }
});

// $(function(){
//     $.ajax({
//         type: "GET",
//         url: "/api/links",
//         data:{},
//         dataType: "json",
//         success: function (data) {
//             data.data.forEach(element => {
//                 var html = '<div class="info"><ul>';
//                 element.link.forEach(e => {
//                     html += '<li><a href="'+e.url+'" target="_blank" data-id="'+e.id+'"> <img src="'+e.icon+'"><span>'+e.name+'</span></a></li>';
//                 });
//                 html += '</ul></div>';
//                 $("#tool").before(html)
//             }); 
//         }
//     });
// });