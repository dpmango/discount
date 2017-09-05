$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  var _mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // HAMBURGER TOGGLER

  $('.hamburger').on('click', function(event) {
    event.preventDefault();
        if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('body').removeClass('locked').find('.mobile-navi').removeClass('active');
        }
        else {
            $(this).addClass('is-active').closest('body').addClass('locked').find('.mobile-navi').addClass('active');
        }
  });

  $(document).on('click', function(e) {
      if($(e.target).closest('.hamburger, .mobile-navi').length == 0) {
         $('body, .hamburger, .mobile-navi').removeClass('is-active locked active');
      }
  });

  // SEARCH


  $('.header__search-open').on('click', function(event) {
    event.preventDefault();
    $('body').addClass('is-searchOpen');
  });

  $('.header__search-close').on('click', function(event) {
    event.preventDefault();
    $('body').removeClass('is-searchOpen');
  });


  $('.catalog-aside__trigger').on('click', function(event) {
    event.preventDefault();
        if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').next('.catalog-aside__content').slideUp('fast');
        }
        else {
            $(this).addClass('is-active').next('.catalog-aside__content').slideDown('fast');
        }
  });

  // $(document).on('click', function(e) {
  //     if($(e.target).closest('.hamburger, .mobile-navi').length == 0) {
  //        $('body, .hamburger, .mobile-navi').removeClass('is-active locked active');
  //     }
  // });

  // $('.hamburger').on('click', function(){
  //   $('.hamburger').toggleClass('is-active');
  //   $('.mobile-navi').toggleClass('active');
  //   $('body').toggleClass('locked');
  // });

  // $(document).mouseup(function (e) {
  // 		var elem = $('.mobile-navi');
  // 		if (elem.is('.active') && e.target != elem[0] && !elem.has(e.target).length) {
  //       $('.hamburger').removeClass('is-active');
  //       $('.mobile-navi').removeClass('active');
  //       $('body').removeClass('locked');
  // 		}
  // 	});

  //////////
  // SLIDERS
  //////////

  $('.hero-slider').on('init', function(event, slick){
    $('.hero-slide[data-slide=' + 1 + ']').addClass('showing');
  });

  $('.hero-slider').slick({
    autoplay: false,
    autoplaySpeed: 4000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    cssEase: 'ease-in',
    pauseOnFocus: false,
    pauseOnHover: false,
    slidesToShow: 1,
    vertical: true,
    adaptiveHeight: false
  });

  // set active class
  $('.hero-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var slideNumber = currentSlide + 1
    console.log(slideNumber)
    $('.hero-slide[data-slide=' + slideNumber + ']').addClass('removing');
  });
  $('.hero-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    $('.hero-slide').removeClass('removing');
    $('.hero-slide').removeClass('showing');
    var slideNumber = currentSlide + 1;
    $('.hero-slide[data-slide=' + slideNumber + ']').addClass('showing');
  });

  // -----

  $('.catalog-slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  });


  // Card Slider


  $('.card-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    accessibility: false
  });

  $('.card-thumbs-item').on('click', function(){
    var slideId = $(this).data('slide') - 1;
    $('.card-slider').slick('goTo', slideId);
  })

  $('.card-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.card-thumbs-item').siblings().removeClass('active');
    var slideId = nextSlide + 1
    $('.card-thumbs-item[data-slide='+ slideId +']').addClass('active')
  });

  ////////////
  // UI
  ////////////

  // numeric input
  $('.ui-number span').on('click', function(e){
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if( $(this).data('action') == 'minus' ){
      if(currentValue <= 1){
        return false;
      }else{
        element.val( currentValue - 1 );
      }
    } else if( $(this).data('action') == 'plus' ){
      if(currentValue >= 99){
        return false;
      } else{
        element.val( currentValue + 1 );
      }
    }
  });


  // Masked input
  $(".js-dateMask").mask("99.99.9999",{placeholder:"__ __ ____"});
  $(".js-dateMask2").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  $(".js-indexMask").mask("999 999",{placeholder:"000 000"});

  $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});


  // Formstyler
  $('.ui-select, .ui-number').styler();

});
