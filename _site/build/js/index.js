function handleRecent(){var e=0,n=$(".post-list1").find("li");if(n.length>7)for(e=7;e<n.length;e++)n[e].parentNode.removeChild(n[e]);var l=$(".post-list2").find("li");if(l.length>7)for(e=7;e<l.length;e++)l[e].parentNode.removeChild(l[e])}window.onload=function(){$("#loader-mask").fadeOut()||(document.getElementById("loader-mask").style.display="none"),$("#myCarousel").carousel({interval:3e3}),handleRecent()};