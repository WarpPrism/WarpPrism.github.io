/**
 * Created by zhoujihao on 15-12-26.
 */
$(function() {

    var essay_items = $("#essay-left").find(".row");

    var tag_btns = $("#right-tag-div").find(".tag-btn");

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
        });
    }

    $("#all-tag").click(function() {
        for (var k = 0; k < essay_items.length; k++) {
            var item = $(essay_items[k]);
            item.show();
        }
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
