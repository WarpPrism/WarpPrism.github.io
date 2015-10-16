$(function() {
   $(".open").click(function(e) {
       var t = this.parentNode;
       console.log(t);
       t.style.top = "-500px";
       t.style.opacity = 0;
       t.style.zIndex = -2;
   })
});