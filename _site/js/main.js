/**
 * Created by zhoujihao on 15-10-7.
 */
$(document).ready(function() {
    menuAnimation();
    goToTop();
});

function menuAnimation() {
    var navItems = $("#index-nav").find("a");
    var navIndicator = $("#nav-indicator");
    for (var i = 0; i < navItems.length; i++) {
        $(navItems[i]).mouseover(function(e) {
            var leftOff = this.getBoundingClientRect().left;
            var width = this.offsetWidth;
            /*console.log(leftOff);*/
            navIndicator.css("left", leftOff + width / 2.0);
        })
    }
}

function goToTop() {
    $(window).scroll(function() {
        if ($(document).scrollTop() <= 10) {
            $("#top").css("opacity", 0);
        } else {
            $("#top").css("opacity", 1);
        }
    });
    $("#top").click(function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, '1000');
    })
}