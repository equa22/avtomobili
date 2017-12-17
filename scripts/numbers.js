
//_____________________________________________________________________
/**                 ANIMATED NUMBERS SCRIPT

        * use "animate-number" class on any container
        * add needed parameters
             data-value   :_number for counting
             data-prefix  :_string before number
             data-char    :_string after number
             data-count   :_number of iterations
             
             
        // example
        <div class="number-wrapper animate-number"
             data-value="1.3" 
             data-prefix="€"
             data-char="million"
             data-counts="20"> 
        </div>
        
        (output: "€1.3million", with 20 iterations)
 **/
//_____________________________________________________________________

$(document).ready(function () {
    var animations = {
        numbers: [],
        animate: {
            css: function(item, property, value, time){
                setTimeout(function(){
                    $(item).css(property, value);  
                    console.log(item, property, value, time)
                }, time);

            },
            set: function (selectedItem, newClass, time) {
                setTimeout(function(){
                    if(selectedItem[0][0].length > 1) { // check if object is array
                       selectedItem.forEach(function(item){
                            $(item[0]).addClass(item[1]);
                        }); 
                    }
                    else
                        $(selectedItem).addClass(newClass)
                }, time);
            },
            remove: function(selectedItem, oldClass, time) {
            setTimeout(function(){
                if(selectedItem[0][0].length > 1) { // check if object is array
                   selectedItem.forEach(function(item){
                        $(item[0]).removeClass(item[1]);
                    }); 
                }
                else
                    $(selectedItem).removeClass(oldClass);
            }, time);
        }
        }
    };

    Number.prototype.countDecimals = function () {
        if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
        return this.toString().split(".")[1].length || 0; 
    }

    
    
    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };
    
    $('.animate-number').each(function() {
        var char = "", prefix = "", digits = 0, limit = 20;
        if($(this).data("char")) char = $(this).data("char");
        if($(this).data("prefix")) prefix = $(this).data("prefix");
        digits = Number($(this).data("value")).countDecimals();
      
        if($(this).data("value") != "") {
            $(this).text(prefix + "0"+ char);            
            
            animations.numbers.push(
                {item: $(this), 
                 offset: ($(this).offset().top -  $(window).height()/4*3) , 
                 set: false, 
                 trigger: function() {
                    var item = $(this);
                    var iterations = 1;
                    var speed = ($(item[0].item).data("speed") ? $(item[0].item).data("speed") : 30);
                    var interval = setInterval(countNumbers, speed);

                    if($(item[0].item).data("count")) {
                      limit = $(item[0].item).data("count");
                    } else {
                      if(Number($(item[0].item).data("value")) < 100) {
                          limit = 50;
                      }
                      else{
                          limit = 100;
                      }
                    };
                     
                    if(typeof $(item[0].item).data("value") == "string") {
                        char =".00" + char;
                    } 
                     
                    function countNumbers() {
                        if($(item[0].item).data("value") > 999.999) {
                           $(item[0].item).text(prefix + numberWithCommas((iterations * $(item[0].item).data("value") / limit).toFixed(digits)) + char); 
                        }
                        else 
                            $(item[0].item).text(prefix + (iterations * $(item[0].item).data("value") / limit).toFixed(digits) + char);

                        iterations++;
                        if(iterations == limit + 1)
                            clearInterval(interval);
                    };
                 }}
            );
        }
    });
    
    
    
   var startScroll = $(window).scrollTop();
    animations.numbers.forEach(function(item) {
        if(startScroll >= ($(item.item).offset().top - $(window).height()/5*3) && !item.set && !($(item.item).hasClass("prevent-animation"))){
            item.set = true;
            item.trigger();
        }
    });
    
    if($(window).scrollTop() > 0) {
        var scroll = $(window).scrollTop()+ 250;  
        animations.numbers.forEach(function(item) {
            if(scroll >= ($(item.item).offset().top- $(window).height()/5*3) && !item.set && !($(item.item).hasClass("prevent-animation"))){
                item.set = true;
                item.trigger();
            }
        });
    }
    
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop() + 250;  
        animations.numbers.forEach(function(item) {
            if(scroll >= ($(item.item).offset().top- $(window).height()/5*3) && !item.set && !($(item.item).hasClass("prevent-animation"))){
                item.set = true;
                item.trigger();
            }
        });
    });
});