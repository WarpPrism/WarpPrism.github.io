/**
 * Created by zhoujihao on 15-10-7.
 */
$(document).ready(function() {
    menuAnimation();

    $("#top").click(function(event) {
        event = event || window.event;
        event.preventDefault();
        $("body").animate({
            scrollTop: 0
        }, '800');
    });

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

// typewriter effect
function dynamicAppendText(mystr, target, callback) {
    var len = mystr.length;
    var colors = ['#d00', '#00d', '#0d0', '#cc0', '#c0c', '#0cc', '#000'];
    var progress = 0;
    
    var timer = setInterval(function() {
        if (progress <= len) {
            target.innerHTML = mystr.substring(0, progress)
                + '<span id="cursor">' + ((progress & 1)?'_':'') + '</span>';
            
            var random = Math.floor(Math.random() * colors.length);
            document.getElementById('cursor').style.color = colors[random] + '';
            progress++;
        } else {
            target.innerHTML += '<br />';
            target.removeChild(document.getElementById('cursor'));
            window.clearInterval(timer);
            if (callback) {
                callback();
            }
        }
    }, 200);
}