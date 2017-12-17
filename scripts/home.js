$(document).ready(function () {
  
  $(".more").click(function() {
    if($(".list-wrapper").hasClass("show-all")) {
      $(".list-wrapper").removeClass("show-all");
    } else {
      $(".list-wrapper").addClass("show-all")
    };
  });
  
});