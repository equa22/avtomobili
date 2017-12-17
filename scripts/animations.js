
 $(document).ready(function () {
 	// prepare pie chart
 	var $chart = $(".chart");
    var containerSize = 1140;
 	var svgSize = containerSize*375/1528, animatedSvg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="' + svgSize +'" height="' + svgSize +'" xmlns="http://www.w3.org/2000/svg"><circle class="circle-chart__background" stroke="#0f518a" stroke-width="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /><circle class="circle-chart__circle" stroke="#efefef" stroke-width="2" stroke-dasharray="' + $chart.data('value') + ',100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /><circle style="transform:rotate(-' + (3.6*(100 - $chart.data('value'))) + 'deg);" class="circle-chart__circle" stroke="#0f518a" stroke-width="2" stroke-dasharray="' + (100 - $chart.data('value')) + ',100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /></svg>';
   
  
 	var svgCircle = '<svg class="circle-chart first" viewbox="0 0 33.83098862 33.83098862" width="' + svgSize +'" height="' + svgSize +'" xmlns="http://www.w3.org/2000/svg"><circle class="circle-chart__background" stroke="#0f518a" stroke-width="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /></svg>';
   
   
   
    $chart.append("<div class='label " + ($chart.data('value') > 50 ? "top-left" : "bottom-left") + "'>" + $chart.data('value') + "%<label>" + $chart.data('white-label') + "</label></div>" + svgCircle + "<div class='label " + ($chart.data('value') < 50 ? "top-right" : "bottom-right") + "'>" + (100 - $chart.data('value')) + "%<label>" + $chart.data('blue-label') + "</label></div>");

 	

   
   
   /*
    * Set line charts
    */ 
   
   //$lineCharts.append("<label>do " + this.data("value") +  " %</label>")
   
   /*
    * Apply sliders
    */
   $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 2000,
     dots: false
  });
   
   
   $(document).scroll(function() {
     // line charts
     if(($(document).scrollTop() + window.innerHeight) >= ($(".chart-list .list-wrapper").offset().top) && !$(".chart-list").hasClass("animated")) {
       $(".chart-list").addClass("animated")
       var $lineCharts = $(".line-chart").toArray();
       $lineCharts.forEach(function(item) {
         $(item).children(".bar").append("<div class='label'>od " + $(item).data("value") + "%</div>")
         $(item).children(".bar").css("width", $(item).data("value") + "%");
       });
     };
     
     // doghnut chart
     if(($(document).scrollTop() + window.innerHeight) >= ($(".pie-chart").offset().top) && !$(".pie-chart").hasClass("animated")) {
       $(".pie-chart").addClass("animated");
       
       setTimeout(function() {
        $chart.children('.first').remove();
        

        //$chart.append(animatedSvg);
         $chart.html("<div class='label " + ($chart.data('value') > 50 ? "top-left" : "bottom-left") + "'>" + $chart.data('value') + "%<label>" + $chart.data('white-label') + "</label></div>" + animatedSvg + "<div class='label " + ($chart.data('value') < 50 ? "top-right" : "bottom-right") + "'>" + (100 - $chart.data('value')) + "%<label>" + $chart.data('blue-label') + "</label></div>");
        
        
      }, 500);
       setTimeout(function() {
         $chart.addClass("fade-labels-in");
       }, 1000);
     };
     
   });
 });


