/**
 * Created by zhoujihao on 15-10-7.
 */
$(document).ready(function() {
    menuAnimation();
    goToTop();

    $("#logo").click(function() {
        window.location = "\\";
    });

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
        });
    }
}

function goToTop() {
    $("#top").click(function(event) {
        event = event || window.event;
        event.preventDefault();
        $("body").animate({
            scrollTop: 0
        }, '1000');
    })
}
