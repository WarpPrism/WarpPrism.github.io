/**
 * Created by zhoujihao on 15-10-12.
 */

function handleRecent() {
    // 主也显示 7 篇最近发布的文章
    var i = 0;
    var post_list1 = $(".post-list1").find("li");
    if (post_list1.length > 7) {
        for (i = 7; i < post_list1.length; i++) {
            post_list1[i].parentNode.removeChild(post_list1[i]);
        }
    }
    var post_list2 = $(".post-list2").find("li");
    if (post_list2.length > 7) {
        for (i = 7; i < post_list2.length; i++) {
            post_list2[i].parentNode.removeChild(post_list2[i]);
        }
    }
}
window.onload = function() {
    if ($('#loader-mask').fadeOut()) {} else {
        document.getElementById('loader-mask').style.display="none";
    }

    $("#myCarousel").carousel({
        interval: 3000
    });

    handleRecent();

    dynamicAppendText("Jihao's Blog", $('#site-name')[0], null);
};