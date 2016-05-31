/**
 * Created by zhoujihao on 15-12-26.
 */
$(function() {
    var wrapper = $("#tn-wrapper");
    var init_height = wrapper.css("height");

    var tn_items = $("#tn-left").find(".row");
    for (var i = 0; i < tn_items.length; i++) {
        if (i % 2 == 0) {
            if (!$(tn_items[i]).hasClass("slideInLeft")) {
                $(tn_items[i]).addClass("slideInLeft");
            }
        } else {
            if (!$(tn_items[i]).hasClass("slideInRight")) {
                $(tn_items[i]).addClass("slideInRight");
            }
        }
    }

    var tag_btns = $("#tag-div").find(".tag-btn");

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

            for (var k = 0; k < tn_items.length; k++) {
                var item = $(tn_items[k]);
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

            if (wrapper.css("height") < screen.height + "px") {
                wrapper.css("height", screen.height + "px");
            }
        });
    }

    $("#all-tag").click(function() {
        for (var k = 0; k < tn_items.length; k++) {
            var item = $(tn_items[k]);
            item.show();
        }
        wrapper.css("height", init_height);
    });

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
    handleDuplicateTags();
}());
