(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .site-nav__item--' + currentPage).addClass('site-nav__item--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//    Generic modal
///////////////////////////////////////

  var modal          = $('.js-modal'),
      modalLaunchBtn = $('.js-open-modal'),
      modalCloseBtn  = $('.js-close-modal');

  modalLaunchBtn.click(function(){
    var place = $(this).attr('data-place');
    $('.place-modal__item-active').removeClass('place-modal__item-active');
    $('#place-modal__item-' + place ).addClass('place-modal__item-active');

    // disable scrolling on background content (doesn't work iOS)
    $('body').addClass('disable-scroll');
    // // open modal
    modal.fadeIn('250', function(){
      $(this).removeClass('is-closed').addClass('is-open');
    });

  });

  // closes modal
  function modalClose(event){
    event.preventDefault();
    // enable scrolling
    $('body').removeClass('disable-scroll');
    // close modal with fade
    modal.fadeOut('250', function(){
      $(this).removeClass('is-open').addClass('is-closed');
    });
  }

  // closes modal on close icon click
  modalCloseBtn.on('click', function(event) {
    modalClose(event);
  });

  // closes modal on background click
  modal.on('click', function(event) {
    if (event.target !== this){
      return;
    }
    modalClose(event);
  });

  // closes modal on escape key press
  $(document).keyup(function(event) {
     if (event.keyCode == 27) {
       modalClose(event);
      }
  });


///////////////////////////////////////
//      PAGE TRACK
//      icons on track to change state when scrolled to point
///////////////////////////////////////

function pageTrack( sectionClass, sectionOffset ){
  if($(sectionClass).length){
    var st = $(document).scrollTop();
    var scrollOffset = $(window).height() - sectionOffset;
    var section = $(sectionClass).offset();

    if( ( st + scrollOffset ) > section.top ){
      $(sectionClass).find('.page-track__icon').addClass('scrolled');
    }else{
      $(sectionClass).find('.page-track__icon').removeClass('scrolled');
    }
  }
};

$(document).scroll(function(){
  pageTrack('#food-and-drink',455);
  pageTrack('#culture',395);
  pageTrack('#attractions',335);
  pageTrack('#shopping',275);
  pageTrack('#flights',215);
});

// Separate function for first icon
$(document).scroll(function(){
  if($('#food-and-drink').length){
    var st = $(document).scrollTop();
    var scrollOffset = $(window).height() - 340;
    var sectionClass = '#food-and-drink';
    var section = $(sectionClass).offset();

    if( ( st + scrollOffset ) > section.top ){
      $(sectionClass).find('.page-track__icon-start').addClass('scrolled');
    }else{
      $(sectionClass).find('.page-track__icon-start').removeClass('scrolled');
    }
  }
});


///////////////////////////////////////
//      Size height to fullscreen window height
//      .js-fullscreen-section
///////////////////////////////////////

function overviewResize(){
  var width  = $(window).width();
  var height = width / 1.6666666667;
  $('.js-overview').css('height', height + 'px');
};

$(window).resize(function(){
  overviewResize();
});

$(document).ready(function(){
  overviewResize();
});


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end