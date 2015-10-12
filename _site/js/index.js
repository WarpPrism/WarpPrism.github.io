/**
 * Created by zhoujihao on 15-10-12.
 */
var stop = 0;

$(function() {
    $(window).scroll(scrollAnimation);
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