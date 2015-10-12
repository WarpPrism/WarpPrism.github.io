/**
 * Created by zhoujihao on 15-10-7.
 */
$(document).ready(function() {
    menuAnimation();
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
