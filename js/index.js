/**
 * Created by zhoujihao on 15-10-12.
 */
var stop = 0;

$(function() {
    $(window).scroll(scrollAnimation);
    handleRecent();
});

function scrollAnimation() {
    if (stop != 1) {
        var scrollTop = $(document).scrollTop();
        var columns = $("#index-main-content").find('.content-column');
        if (scrollTop >= $(columns[0]).offset().top - 400) {
            for (var i = 0; i < columns.length; i++) {
                $(columns[i]).animate({
                    opacity: 1,
                    top: 0
                }, 'slow');
            }
            stop = 1;
        }
    }
}

function handleRecent() {
    var i = 0;
    var post_list1 = $(".post-list1").find("li");
    if (post_list1.length > 5) {
        for (i = 5; i < post_list1.length; i++) {
            post_list1[i].parentNode.removeChild(post_list1[i]);
        }
    }
    var post_list2 = $(".post-list2").find("li");
    if (post_list2.length > 5) {
        for (i = 5; i < post_list2.length; i++) {
            post_list2[i].parentNode.removeChild(post_list2[i]);
        }
    }
}