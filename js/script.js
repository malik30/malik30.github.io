Number.prototype.between = function(a, b) {
  return this >= a && this <= b;
};
function getScrollTop(){
  if (typeof pageYOffset!= 'undefined') {
    //most browsers except IE before #9
    return pageYOffset;
  } else {
    var B= document.body; //IE 'quirks'
    var D= document.documentElement; //IE with doctype
    D= (D.clientHeight)? D: B;
    return D.scrollTop;
  }
}
function close_window() {
  window.close();
}
function resetModalBodyHeight(modal) {
  var window_h = $(window).height();
  var header_h = $(".modal-header", modal)[0].clientHeight;
  var footer_h = $(".modal-footer", modal)[0].clientHeight;
  var body_h = window_h-32-header_h-footer_h;
  $(".modal-body", modal).height(body_h);
}
jQuery(document).ready(function($){
  /* DropDown Function Start */
  $('.dropdown').on("click", "ul li", function(e) {
    if ($(e.currentTarget).hasClass("disabled")) return false;
    $(e.delegateTarget).trigger("clear");
    $(e.currentTarget).addClass('chosen');
    $('button .dropValue', e.delegateTarget).text($(this).text());
    $(e.delegateTarget).trigger("change");
  }).on("clear", function(e){
    $('li.chosen', e.delegateTarget).removeClass('chosen');
  });

  $(".dropdown-editable").on("change", ".dropdown", function(e){
    var cur_value = $(".btn-dropdown .dropValue", e.currentTarget).text();
    console.log(cur_value);
    $("> input", e.delegateTarget).val(cur_value);
  }).on("clear", ".dropdown", function(e){
    $("> input", e.delegateTarget).val("");
  }).on("focus", "> input", function(e){
    setTimeout(function(){
      $(".dropdown", e.delegateTarget).addClass("open");
    }, 100);
  }).on("blur", "> input", function(e){
    var cur_val = $("> input", e.delegateTarget).val();
    var chosen = $(".dropdown .dropdown-menu .chosen", e.delegateTarget);
    if (cur_val!=chosen.text().trim()) {
      chosen.removeClass("chosen");
    } else {

    }
    setTimeout(function(){
      $(".dropdown", e.delegateTarget).removeClass("open");
    }, 300);
  });
  /* DropDown Function End */
  /* Scroll Start */
  $(".scroll-to-element").on("click", function(e){
    var id = $(e.target).attr("data-target");
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 500);
  });
  /* Scroll End */
  /* input number start */
  jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>').insertAfter('.quantity input');
  jQuery('.quantity').each(function() {
    var spinner = jQuery(this),
    input = spinner.find('input'),
    btnUp = spinner.find('.quantity-up'),
    btnDown = spinner.find('.quantity-down'),
    min = input.attr('min'),
    max = input.attr('max');
    btnUp.click(function() {
      if (input.val()=="") {
        var newVal = min;
      } else {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });
    btnDown.click(function() {
      if (input.val()=="") {
        var newVal = min;
      } else {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });
  });
  /* input number end */
  /* modal toggle start */
  $(".vz-modal").on("click", "[data-toggle='vz-modal']", function(e){
    var target = $(this).attr("data-target");
    $(e.delegateTarget).modal("hide");
    setTimeout(function(){
      $(target).modal("show");
    }, 500);
  })
  /* modal toggle end */
  /* fixed bottom modal start */
  $(".vz-modal-fixed-bottom").on("shown.bs.modal", function(e){
    resetModalBodyHeight(e.delegateTarget);
  });
  $(window).resize(function(){
    var modal = $(".vz-modal-fixed-bottom.in");
    if (modal.length>0) {
      resetModalBodyHeight(modal[0]);
    }
  });
  /* fixed bottom modal end */
  /* number input start */
  $(".vz-number-input").on("keydown", function(e){
    if (e.which!=8 && !e.which.between(48, 57) && !e.which.between(96, 105) ) {
      return false;
    }
  });
  /* number input end */
  /* input addon start */
  $(".vz-input-group").on("click", ".input-group-addon", function(e){
    $("input", e.delegateTarget).focus();
  });
  /* input addon end */
});



// questions page start
var countVa;
$(document).ready(function() {
  countVa = 0;
  $('.go_right').on("click",moveRight);
  function moveRight() {
    if ($('.go_right').hasClass("disabledLeftRight")) return;

    $('.go_right').unbind('click',moveRight);
    $('.go_right').addClass("disabledLeftRight");
    setTimeout(function() {
      $('.go_right').bind('click',moveRight);
      checkQArrows();
    }, 1300);

    $('.go_left').removeClass("disabledLeftRight");
    if (countVa>4) {return}
    if($('.go_right').hasClass('leftClicked')) {
      $(".slideIt .questions").eq(countVa).addClass("prev");
      $(".slideIt .questions").eq(countVa+1).addClass("active");
      if ($(window).width()<=1019) {
        var new_height = $(".slideIt .questions").eq(countVa+1).height();
        console.log(new_height);
        $(".allSliderWrapper").height(new_height+360);
      } else {
        var new_height = $(".slideIt .questions").eq(countVa+1).height();
        console.log(new_height);
        $(".sliderContent").height(new_height+40);
      }
      setTimeout(function(){
        $(".slideIt .questions").eq(countVa).removeClass("active");
        checkQArrows();
      }, 1000)

      if (countVa==4) {
        $('.go_right').addClass('disabledLeftRight');
      }
      currentValQuestion = parseInt($('.questionNumber').html());
      currentValQuestion = currentValQuestion + 1;
      $('.questionNumber').html(currentValQuestion);
      setTimeout(function(){
        countVa++;
      },1200)
    } else {
      return;
    }
  }

  $('.go_left').on("click",moveLeft)
  function moveLeft(){
    if ($('.go_left').hasClass("disabledLeftRight")) return;

    $('.go_left').unbind('click',moveLeft);
    $('.go_left').addClass("disabledLeftRight");
    setTimeout(function() {
      $('.go_left').bind('click',moveLeft);
      checkQArrows();
    }, 1300);

    $('.go_right').addClass('leftClicked').removeClass("disabledLeftRight");
    if (countVa<1) { return }
    $(".slideIt .questions").eq(countVa).addClass("next");
    $(".slideIt .questions").eq(countVa-1).addClass("active back-click");
    if ($(window).width()<=1019) {
      var new_height = $(".slideIt .questions").eq(countVa-1).height();
      console.log(new_height);
      $(".allSliderWrapper").height(new_height+360);
    } else {
      var new_height = $(".slideIt .questions").eq(countVa-1).height();
      console.log(new_height);
      $(".sliderContent").height(new_height+40);
    }
    setTimeout(function(){
      $(".slideIt .questions").eq(countVa).removeClass("active next");
      $(".slideIt .questions").eq(countVa-1).removeClass("prev back-click");
      checkQArrows();
    }, 1000)

    if (countVa==1) {$('.go_left').addClass('disabledLeftRight');}

    currentValQuestion = parseInt($('.questionNumber').html());
    currentValQuestion = currentValQuestion - 1;
    $('.questionNumber').html(currentValQuestion);

    setTimeout(function(){
      countVa--;
      }, 1200)
  }

  $(".slideIt .questions").on("vz-selected", function(e){
    $(this).addClass("vz-qcompleted");
  })

  $(".vz-question-select").on("click", ".dropdown-menu .vz-action-select", function(e) {
    var value = $(this).text();
    $(".vz-content .vz-value", e.delegateTarget).text(value);
    $(e.delegateTarget).trigger("vz-selected");
    $(".go_left").removeClass("disabledLeftRight");
    if (!$(e.delegateTarget).hasClass("questions-multi-cont")) {
      $(".dropdown-menu .vz-action-select", e.delegateTarget).removeClass("vz-selected");
      $(e.currentTarget).addClass("vz-selected");
    }
  });

  $(document).on('click', '.vz-questions-multi .vz-questions-multi-item', function(e) {
    e.stopPropagation();
  });

  $(".vz-questions-multi-cont").on("hide.bs.dropdown", function(e) {
    var output_text = "";
    var checked = $("input:checked", e.delegateTarget);
    if (checked.length > 0) {
      var length = checked.length;
      checked.each(function(i, v) {
        var cur_text = $(v).next().text();
        if (i == 0) {
          output_text += cur_text;
        } else if (i == length - 1) { //n=last
          output_text += " and <br>" + cur_text;
        } else if (output_text != "") { //n>1
          output_text += ", <br>" + cur_text;
        } else {
          output_text += cur_text;
        }
      });
      $(".vz-content .vz-value", e.delegateTarget).html(output_text);
      $(e.delegateTarget).trigger("vz-selected");
      if ($(window).width()<=1019) {
        var new_height = $(".slideIt .questions.active").height();
        console.log(new_height);
        $(".allSliderWrapper").height(new_height+360);
      } else {
        var new_height = $(".slideIt .questions.active").height();
        console.log(new_height);
        $(".sliderContent").height(new_height+40);
      }
    } else {
      $(".vz-content .vz-value", e.delegateTarget).text(" ");
    }
  });


  $('.questions .dropdown-menu').on("click", function() {
    if (countVa>=3) { return; }
    if ($(this).prev().eq(0).hasClass("multiplQ")) { return; }

    $(".slideIt .questions").eq(countVa).addClass("prev");
    $(".slideIt .questions").eq(countVa+1).addClass("active");
    if ($(window).width()<=1019) {
      var new_height = $(".slideIt .questions").eq(countVa+1).height();
      console.log(new_height);
      $(".allSliderWrapper").height(new_height+360);
    } else {
      var new_height = $(".slideIt .questions").eq(countVa+1).height();
      console.log(new_height);
      $(".sliderContent").height(new_height+40);
    }
    setTimeout(function(){
      $(".slideIt .questions").eq(countVa).removeClass("active");
      checkQArrows();
    }, 1000)

    currentValQuestion = parseInt($('.questionNumber').html());
    currentValQuestion = currentValQuestion + 1;
    $('.questionNumber').html(currentValQuestion++);
    $('.headFirstQuestion').slideUp();
    $('.persoPlan').slideDown();
    setTimeout(function(){
      countVa++;
    },1200)
  });

  $('.okBtn').on("click", function() {
    showCurr = "."+$(this)[0].classList[5];
    if (showCurr === ".feature_6") {
      $('.finishAnswer').fadeIn().css("display","inline-block");
      $(".question_5 > a").hide();
    }
    if (countVa>4) { return; }
    $(".slideIt .questions").eq(countVa).addClass("prev");
    $(".slideIt .questions").eq(countVa+1).addClass("active");
    if ($(window).width()<=1019) {
      var new_height = $(".slideIt .questions").eq(countVa+1).height();
      console.log(new_height);
      $(".allSliderWrapper").height(new_height+360);
    } else {
      var new_height = $(".slideIt .questions").eq(countVa+1).height();
      console.log(new_height);
      $(".sliderContent").height(new_height+40);
    }
    setTimeout(function(){
      $(".slideIt .questions").eq(countVa).removeClass("active");
      checkQArrows();
    }, 1000);
    currentValQuestion = parseInt($('.questionNumber').html());
    currentValQuestion = currentValQuestion + 1;
    $('.questionNumber').html(currentValQuestion);
    setTimeout(function(){
      countVa++;
    }, 1200)
  });

  $(window).resize(function(){
    if ($(window).width()<=1019) {
      var new_height = $(".slideIt .questions.active").height();
      $(".allSliderWrapper").height(new_height+360);
    } else {
      var new_height = $(".slideIt .questions.active").height();
      $(".sliderContent").height(new_height+40);
    }
  });
});


marginTop = 0;
countVaNumber = 0;
$('.moveTop').on("click",function() {
  if (countVaNumber >2) {return}
    marginTop = marginTop -138;
    $(this).parent().find('.sliderNumber').animate({"marginTop": marginTop},600);
    countVaNumber++;
});

$('.moveBottom').on("click",function() {
  if (countVaNumber<1) { return}
  marginTop = marginTop +138;
  $(this).parent().find('.sliderNumber').animate({"marginTop": marginTop},600);
  countVaNumber--;
});


marginTop1 = 0;
countVaNumber1 = 0;
$('.moveTop1').on("click",function() {
  if (countVaNumber1 >2) {return}
  marginTop1 = marginTop1 -138;
  $(this).parent().find('.sliderNumber').animate({"marginTop": marginTop1},600);
  countVaNumber1++;
});

$('.moveBottom1').on("click",function() {
  if (countVaNumber1<1) { return}
  marginTop1 = marginTop1 +138;
  $(this).parent().find('.sliderNumber').animate({"marginTop": marginTop1},600);
  countVaNumber1--;
});

marginTop2 = 0;
countVaNumber2 = 0;
$('.moveTop2').on("click",function() {
  if (countVaNumber2 >2) {return}
  marginTop2 = marginTop2 -138;
  $(this).parent().find('.sliderNumber').animate({"marginTop": marginTop2},600);
  countVaNumber2++;
});

$('.moveBottom2').on("click",function() {
  if (countVaNumber2<1) { return}
  marginTop2 = marginTop2 +138;
  $(this).parent().find('.sliderNumber').animate({"marginTop": marginTop2},600);
  countVaNumber2--;
});
// questions page end
