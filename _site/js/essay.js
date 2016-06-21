/**
 * Created by zhoujihao on 15-12-26.
 */
$(function() {
    var i = 0;
    var essay_items = $("#essay-left").find(".row");
    var tag_btns = $("#right-tag-div").find(".tag-btn");
    doPaginate();

    for (var j = 0; j < tag_btns.length; j++) {

        $(tag_btns[j]).click(function() {
            var data_tag = $(this).attr("data-tag");

            for (var jj = 0; jj < tag_btns.length; jj++) {
                var temp = $(tag_btns[jj]);
                if (temp.hasClass("active-btn")) {
                    temp.removeClass("active-btn");
                }
            }

            $(this).addClass("active-btn");

            for (var k = 0; k < essay_items.length; k++) {
                var item = $(essay_items[k]);
                var item_data_tag = item.attr("data-tag");
                /*console.log(typeof(data_tag));*/

                if (item_data_tag.indexOf(data_tag) != -1) {
                    // Tag Match!
                    item.show();
                } else {
                    // Tag Not Match.
                    item.hide();
                }
            }
            doPaginate();
        });
    }

    $("#all-tag").click(function() {
        for (var k = 0; k < essay_items.length; k++) {
            var item = $(essay_items[k]);
            item.show();
        }
        doPaginate();
    });

    handleDuplicateTags();
}());

function handleDuplicateTags() {

    var allTags = $(".tag-btn.btn");
    var tagsArr = [];
    for (var i = 0; i < allTags.length; i++) {
        var value = allTags[i].innerHTML;
        if (tagsArr.indexOf(value, 0) == -1) {
            tagsArr.push(value);
        } else {
            allTags[i].style.display = "none";
        }
    }
}


// 手工实现分页功能
function doPaginate() {
    // 首先清空分页兰
    $("#paginate-div").empty();
    // 得到所有贴子数
    var essay_items = $("#essay-left").find(".row");
    // 计算当前的post数目
    var current_es_items = [];

    for (var j = 0; j < essay_items.length; j++) {
        var post = essay_items[j];
        if ($(post).css("display") != "none") {
            current_es_items.push(post);
        }
    }

    // 计算分页数，并生成分页按钮
    var oNum = 7; // 定义每页有 7 篇文章
    current_es_items.slice(7).forEach(function(post) {
        $(post).css("display", "none");
    });

    var paginateNum = Math.ceil(current_es_items.length / oNum);
    if (paginateNum <= 1) return;
    for (i = 0; i < paginateNum; i++) {
        var item = $('<div>' + (i+1) + '</div>');

        var closure =  function(i) {
            item.click(function(e) {
                $(this).siblings().css({
                    "border-radius": "0"
                });

                $(this).css({
                    "transform": "skew(-20deg)",
                    "border-radius": "50%"
                });

                var range = [i * oNum, i * oNum + 6]; //定义当前页面范围

                for (var j = 0; j < current_es_items.length; j++) {
                    if (j <= range[1] && j >= range[0]) {
                        $(current_es_items[j]).show();
                    } else {
                        $(current_es_items[j]).hide();
                    }
                }
            });
        }(i);
        item.css({
            "display": "inline-block",
            "padding": "5px 15px",
            "margin-left": "5px",
            "background": "#999",
            "color": "#fff",
            "font-weight": "bold",
            "cursor": "pointer",
            "transform": "skew(-20deg)",
            "transition": "all 0.2s linear"
        });
        item.mouseover(function() {
            $(this).css({"background": "#00a1ea"});
        });
        item.mouseleave(function() {
            $(this).css({"background": "#999"});
        });
        $("#paginate-div").append(item);
    }
}
