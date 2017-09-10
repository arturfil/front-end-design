$(document).ready(function(){
  'use strict';
  $(window).scroll(function() {
    'use strict';
    if($(window).scrollTop() < 80) {
      $('.navbar').css({
        'margin-top': '-100px',
        'opacity': '0'
      });

      $('.navbar-default').css({
        'background-color': 'rgba(59, 59, 59, 0)'
      });

    } else {
      $('.navbar').css({
        'margin-top': '0px',
        'opacity': '1'
      });
      $('.navbar-default').css({
        'background-color': 'rgba(59, 59, 59, 0.7)',
        'border-color': '#444'
      });
      $('.navbar-brand').css({
        'height': '35px',
        'padding-top': '0px'
      });
      $('.navbar-nav > li > a').css({
        'padding-top': '15px'
      })
    }
  });
});

//add smooth scrolling
$(document).ready(function() {
  'use strict';

  $('.nav-item')
  // Remove links that don't actually link to anything

  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
});

// active menu on click
$(document).ready(function(){
  'use strict';
  $('.navbar-nav li a').click(function(){
    'use strict';
    $('.navbar-nav li a').parent().removeClass('active');
    $(this).parent().addClass('active');
  })
});

$(document).ready(function(){
  'use strict';
  $(window).scroll(function(){
    'use strict';
    $('section').each(function(){
      'use strict';
      var bb = $(this).attr('id');
      var hei = $(this).outerHeight();
      var grttop = $(this).offset().top - 70;
      if($(window).scrollTop() > grttop && $(window).scrollTop() < grttop + hei) {
        $(".navbar-nav li a[href='#']" + bb + "']").parent().addClass("active");
      } else {
        $(".navbar-nav li a[href='#']" + bb + "']").parent().removeClass("active");
      }
    })
  })
});

//Add counter

// $(document).ready(function() {
//   $('.counter-num').counterUp({
//     delay: 10,
//     time: 2000,
//   })
// })

//Add a wow.js object
$(document).ready(function(){
  'use strict'
  new WOW().init();
});
