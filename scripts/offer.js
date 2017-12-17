$(document).ready(function(){

  var Offer = new Object({
    $_steps: $(".steps").children("li"),
    $_progress: $(".progress"),
    $_progress_bar: $(".progress-line"),
    active_step: 0
  });
  Offer.process  = new Object({
    step1: {                                    // brand is selected in dropdown or "logo section"
      reveal: ["#selection, #config"],
      e: function() {
        $(".model").removeClass("disabled");    // enable model dropdown
        $(".logos").addClass("closed");         // close logos
        $(".logos").removeClass("opened");
        $('.select-styled.model').text("Izberite model");
        setTimeout(function() {
          $('html, body').animate({
          scrollTop: $("#selection").offset().top - 100
        }, 1000);
        }, 500);
      }
    },
    step2: {                                      // model in dropdown is selected
      reveal: ["#selection, #config"],
      scroll: "#selection",
      e: function() {
        $(".logos").addClass("closed");         // close logos
        $(".logos").removeClass("opened");
      }
    },
    step3: {                                          // "karoserija" is  selected from cars list
      reveal: ["#line"],
      scroll: "#line",
      e: function() {
        $('.side-menu ul').removeClass("visible");    // if visible, hide side menu
        $('.side-menu ul li').removeClass("active");  // if visible, hide side menu
        $("#engineList").addClass("fade");          
        $(".selectModel").removeClass("active");      // mark selected item as active

        setTimeout(function() {                       // show side menu
          $('.side-menu').find("ul").addClass("visible");
        }, 800);
        
        setTimeout(function() {
          if($(".side-menu .active").length == 0)
            $($('.side-menu li')[0]).addClass("active");
          $("#engineList").removeClass("fade");
           Offer.proceed(4);
        }, 500 + $('.side-menu').find("li").length * 200); 
      }
    },
    step4: {                                        // equipment is selected in side menu
      reveal: [],
      e: function() {      
      }
    },
    step5: {                                        // engine is selected from table
      reveal: ["#offer"],
      scroll: "#offer",
      e: function() {
        $("#offer .animate-number").removeClass('prevent-animation');
      }
    }
  });
  Offer.proceed = function(step) {
    Offer.$_steps.removeClass("active");
    Offer.$_steps.toArray().forEach(function(item, i) {
      if(i < step) {
        $(item).addClass("active");
      }
    });
    if($(Offer.$_steps[step]).length > 0) {
       Offer.$_progress_bar.css("width", $(Offer.$_steps[step]).offset().left + "px");
    } else {
      Offer.$_progress_bar.css("width", "100%");
    }

    var _active_step = Offer.process["step" + step];
    _active_step.reveal.forEach(function(el) {
      $(el).addClass("reveal");
    });
    if(_active_step.scroll) {
      $('html, body').animate({
        scrollTop: $(_active_step.scroll).offset().top - 100
      }, 1000);
    }
    _active_step.e();
  }

  var $Model = $(".select-styled.model");
  var $Model_options = $(".select-styled.model").next("ul").children("li");
  var $Brand = $(".select-styled.brand");
  var $Brand_options = $(".select-styled.brand").next("ul").children("li");

  var query = $(location).attr('href').split("?")[1];
  var urlAttr = {}
  
  // collect data from query
  if(query) {     
    query.split("&").forEach(function(item) {
      var tmp = item.split('=');
      urlAttr[tmp[0]] = tmp[1];
    });  
  }

  // brand is preselected
  if(urlAttr.brand && urlAttr.brand != "") {
    Offer.proceed(1);
    $Brand_options.toArray().forEach(function(item) {
      if($(item).attr("rel") == urlAttr.brand) {
        $Brand.text($(item).text());
      }
    });
  }
  else {
    $(".logos").removeClass('closed');
    $(".logos").addClass('opened');
  }

  // model is preselected
  if(urlAttr.brand && urlAttr.brand != "" && urlAttr.model && urlAttr.model != "") {
    $Model_options.toArray().forEach(function(item) {
      if($(item).attr("rel") == urlAttr.model) {
        $Model.text($(item).text());
      }
    });
    Offer.proceed(2);
  } 

  // manipulating select click events
  $(".select-styled").click(function(e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function(){
          $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
  });
  $(".select-options li").click(function(e) {
      e.stopPropagation();
      $(".select-options").hide();
      var parent = $(e.target).parent().prev(".select-styled");
      $(parent).text($(this).text()).removeClass('active');
  });
  $(document).click(function() {
    $(".select-styled").removeClass('active');
    $(".select-options").hide();
  });


  $(document).on('click', '[data-toggle="openLogos"]', function(event) {
    if($('#logos').hasClass('opened')) {
      $('#logos').removeClass('opened');
      $('#logos').addClass('closed');
    } else {
      $('#logos').removeClass('closed');
      $('#logos').addClass('opened');
    }
  });


  /*
   * STEP #1
   */
  $Brand_options.click(function(e){
    Offer.proceed(1);
  });
  
  $('img').click(function(e) {
    // display selected item in brand dropdown
    $('.select-styled.brand').text($($(".brand").next(".select-options").children('[rel="' + ($(e.target).data("id")) + '"]')).text());

    Offer.proceed(1);
  });

  /*
   * STEP #2
   */
  $Model_options.click(function(e){
    if($("#selection").hasClass("reveal")) {
      $("#selection").removeClass("reveal");
      setTimeout(function() {
        Offer.proceed(2);
      }, 500)
    } else 
      Offer.proceed(2);
    
  });

  // filter is changed
  $('.check').change(function() {
    $("#selection").removeClass("reveal");

    setTimeout(function() {
      $("#selection").addClass("reveal");
    }, 500);
  })


  /*
   * STEP #3 --> also call STEP #4
   */
  $(".selectModel").click(function(event) {
    $(event.target).addClass("active");
    Offer.proceed(3);
  });


  /*
   * STEP #5
   */
  $("#engineList button").click(function(e) {
    $("#engineList").find("button").removeClass("active");
    $(e.target).addClass("active");  
    $("tbody").removeClass("selected");
    $(e.target).closest("tbody").addClass("selected");
    Offer.proceed(5);
  });

  // side menu click event
  $('.side-menu').find('li').click(function(e) {
    $('.side-menu').find('li.active').removeClass("active");
    $(e.target).addClass("active");

    $("#engineList").addClass("fade");

    setTimeout(function() {
      $("#engineList").removeClass("fade");
    }, 1000);
  });


  // move footer down if progress bar is present
  if($(".progress").length > 0) {
    $("footer").css("margin-top", "7.5rem");
  }

  $(document).on('scroll', function() {
    if($('footer').innerHeight() + $(window).innerHeight() + $(document).scrollTop() > $(document).innerHeight() && 
       !$(".progress").hasClass("sticky")) {
      $(".progress").addClass("sticky");
    } else if($('footer').innerHeight() + $(window).innerHeight() + $(document).scrollTop() <=  $(document).innerHeight() && 
             $(".progress").hasClass("sticky"))
      $(".progress").removeClass("sticky")
  })
  $('.mobile-toggle').click(function() {
    if($("body").hasClass("mobile-menu-opened")) {
      $("body").removeClass("mobile-menu-opened");
    } else {
      $("body").addClass("mobile-menu-opened")
    }
  });
})
function initMap() {
  var address = {lat: 46.553099, lng: 15.665233};
  var sloCenter = {lat: 46.119536, lng: 14.941406};
  
  
  
  if($("#map").hasClass("wide")) {      // big map with all locations
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center:{lat: 46.119536, lng: 14.941406}
    });
    var locations = [
      new google.maps.LatLng(46.553099, 15.665233),   // Maribor
      new google.maps.LatLng(46.043331, 14.496460)    // Ljubljana
    ]
  } else {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 46.553099, lng: 15.665233}
    });
    var locations = [
      new google.maps.LatLng(46.553099, 15.665233)
    ]
  }
 

  locations.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature,
      labelOrigin: new google.maps.Point(9, 9),
      animation: google.maps.Animation.DROP,
      icon: "../pin.png",
      map: map
    });
  });
}

// open/close accordation
$(".accordation .trigger").click(function(e) {
  var $parent = $(e.target).parent().parent(".accordation");
  if($parent.hasClass("opened")) {
    $parent.removeClass("opened");
  } else {
    $parent.addClass("opened");
  }
});


// open/close step "more" tab
$(".step .trigger").click(function(e) {
  var $tab = $(e.target).prev(".more");
  console.log($tab);
  if($tab.hasClass("opened")) {
    $tab.removeClass("opened");
    $(e.target).removeClass("close-tab");
  } else {
    $tab.addClass("opened");
    $(e.target).addClass("close-tab");
  }
});





// google maps key
// AIzaSyDh0mPIMq4TSY3V9e7LYxoKHcnws56qTLs

// AIzaSyCXmrVI0IXbapujjibXBzhN06yyzu2xWJc