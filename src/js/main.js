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

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ( $('.header-static').length == 0 ){
    _window.scrolled(10, function() { // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.hero').outerHeight() - headerHeight;

      if ( vScroll > headerHeight ){
        header.addClass('header--transformed');
      } else {
        header.removeClass('header--transformed');
      }

      if ( vScroll > heroHeight ){
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
      }
    });
  }

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

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__menu li').each(function(i,val){
    if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
      $(val).addClass('active');
    } else {
      $(val).removeClass('active')
    }
  });


  // VIDEO PLAY
  $('.promo-video .icon').on('click', function(){
    $(this).closest('.promo-video').toggleClass('playing');
    $(this).closest('.promo-video').find('iframe').attr("src", $("iframe").attr("src").replace("autoplay=0", "autoplay=1"));
  });


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

  $('.card-slider').fotorama({
    width: '100%',
    margin: 0,
    loop: true,
    arrows: false,
    nav: 'thumbs',
    thumbwidth: 109,
    thumbheight: 99,
    thumbmargin: 10,
    thumbborderwidth: 1
  });

  var fotorama = $('.card-slider').data('fotorama');

  $('.card-slider-prev').on('click', function(event) {
    event.preventDefault();
    fotorama.show('<')
  });
  $('.card-slider-next').on('click', function(event) {
    event.preventDefault();
    fotorama.show('>')
  });

  // $('.gallery-slider').slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true,
  //   fade: true,
  //   asNavFor: '.gallery-thumbs'
  // });

  // $('.gallery-thumbs').slick({
  //   // slidesToShow: 3,
  //   infinite: false,
  //   slidesToScroll: 1,
  //   asNavFor: '.gallery-slide',
  //   dots: true,
  //   centerMode: false,
  //   focusOnSelect: true,
  //   variableWidth: true
  // });

  //////////
  // MODALS
  //////////
  // Custom modals
  // $('*[data-modal]').on('click', function(){
  //   // remove all active first
  //   $('.modal').removeClass('opened');
  //
  //   // find by id
  //   var target = $(this).data('modal');
  //   $('#'+target).addClass('opened');
  //
  //   window.location.hash = target;
  // });
  //
  // $('.modal__close').on('click', function(){
  //   $(this).closest('.modal').removeClass('opened');
  //   window.location.hash = "";
  // });
  //
  // // CHECK SAVED STATE
  // if(window.location.hash) {
  //   var hash = window.location.hash.substring(1);
  //   $('#'+hash).addClass('opened');
  // }
  //


  // Magnific Popup
  // var startWindowScroll = 0;
  // $('.js-popup').magnificPopup({
  //   type: 'inline',
  //   fixedContentPos: true,
  //   fixedBgPos: true,
  //   overflowY: 'auto',
  //   closeBtnInside: true,
  //   preloader: false,
  //   midClick: true,
  //   removalDelay: 300,
  //   mainClass: 'popup-buble',
  //   callbacks: {
  //     beforeOpen: function() {
  //       // startWindowScroll = _window.scrollTop();
  //       // $('html').addClass('mfp-helper');
  //     },
  //     close: function() {
  //       // $('html').removeClass('mfp-helper');
  //       // _window.scrollTop(startWindowScroll);
  //     }
  //   }
  // });


  // $('.popup-with-move-anim').magnificPopup({
  //   type: 'inline',
  //   fixedContentPos: false,
  //   fixedBgPos: true,
  //   overflowY: 'auto',
  //   closeBtnInside: true,
  //   preloader: false,
  //   midClick: true,
  //   removalDelay: 300,
  //   mainClass: 'my-mfp-slide-bottom'
  // });
  //
  // $('.popup-gallery').magnificPopup({
	// 	delegate: 'a',
	// 	type: 'image',
	// 	tLoading: 'Loading image #%curr%...',
	// 	mainClass: 'mfp-img-mobile',
	// 	gallery: {
	// 		enabled: true,
	// 		navigateByImgClick: true,
	// 		preload: [0,1]
	// 	},
	// 	image: {
	// 		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
	// 	}
	// });


  ////////////
  // UI
  ////////////

  // custom selects
  $('.ui-select__visible').on('click', function(e){
    var that = this
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function(i,val){
      if ( !$(val).is($(that)) ){
        $(val).parent().removeClass('active')
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function(){
    // parse value and toggle active
    var value = $(this).data('val');
    if (value){
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      // set visible
      $(this).closest('.ui-select').removeClass('active');
      $(this).closest('.ui-select').find('input').val(value);

      $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
    }

  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });

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
