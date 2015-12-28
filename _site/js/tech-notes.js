/**
 * Created by zhoujihao on 15-12-26.
 */
$(function() {
    var wrapper = $("#tn-wrapper");
    var init_height = wrapper.css("height");

    var tn_items = $("#tn-left").find(".row");
    for (var i = 0; i < tn_items.length; i++) {
        if (i % 2 == 0) {
            $(tn_items[i]).addClass("slideInLeft");
        } else {
            $(tn_items[i]).addClass("slideInRight");
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
                    if (wrapper.css("height") < screen.height + "px") {
                        wrapper.css("height", screen.height + "px");
                    }
                    item.hide();
                }
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
        var dups = $("span[data-tag=javascript]").toArray();
        /*console.log(dups);*/
        for (var ii = 1; ii < dups.length; ii++) {
            dups[ii].remove();
        }
    }
    handleDuplicateTags();
});

