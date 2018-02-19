function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		if ( !$(this)[0].hasAttribute('data-self') ) {
			var t = $(this).find('.scale');
		} else {
			var t = $(this);
		}
		if ( !$(this)[0].hasAttribute('data-adaptive-ratio') ) {
			var r = $(this).attr('data-ratio');
		} else {
			if ( !Modernizr.mq('(max-width:759px)') ) {
				var r = $(this).attr('data-desktop-ratio');
			} else {
				var r = $(this).attr('data-mobile-ratio');
			}
		}
		t.outerHeight(t.outerWidth()*r);
	});
}
$(function() {
	
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:999px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}

	$('.customers-i__slider').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 500,
		responsive: [
			{
				breakpoint: 1599,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			}, {
				breakpoint: 719,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 599,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	});

	$('.gallery').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 500,
		responsive: [
			{
				breakpoint: 1599,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			}, {
				breakpoint: 1339,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 999,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 719,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	
	function openMenu() {
		$('.mobile-menu').addClass('is-opened');
		$('body').addClass('is-locked');
	}
	function closeMenu() {
		$('.mobile-menu').removeClass('is-opened');
		$('body').removeClass('is-locked');
	}
	$(document).on('click', '.menu-open', function() {
		openMenu();
	});
	$('.mobile-menu--close').on('click', function() {
		closeMenu();
	});
	$('.nav a').on('click', function() {
		if ( $(this).parents('.mobile-menu').length ) {
			closeMenu();
		}
	});
	
	function tableRebuild() {
		if ( isMobile ) {
			$('table').each(function() {
				var p = $(this);
				p.after('<div class="table-rebuild"></div>');
				var t = p.next('.table-rebuild');
				var size = p.find('tbody').find('tr').eq(0).find('td').size();
				for ( var i=0; i<size; i++ ) {
					t.append('<div class="table-rebuild__group">\
						<div class="table-rebuild__content">\
						</div>\
					</div>');
				}
				p.find('thead tr').each(function() {
					for ( var i=0; i<p.find('thead th').size(); i++ ) {
						var item = $(this).find('th').eq(i).text();
						$('<span class="table-rebuild--title">'+item+'</span>').prependTo(t.find('.table-rebuild__group').eq(i));
					}
				});
				p.find('tbody tr').each(function() {
					for ( var i=0; i<p.find('tbody tr').size(); i++ ) {
						var item = $(this).find('td').eq(i).text();
						$('<span class="table-rebuild--item">'+item+'</span>').appendTo(t.find('.table-rebuild__group').eq(i).find('.table-rebuild__content'));
					}
				});
			});
		} else {
			$('.table-rebuild').remove();
		}
	}

	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				$('.header__row').append('<span class="menu-open"><i></i></span>');
				$('.nav').detach().appendTo($('.mobile-menu__row'));
			} else {
				$('.menu-open').remove();
				$('.nav').detach().insertAfter($('.header__logo'));
			}
			closeMenu();
			if ( $('table').length > 0 ) {
				tableRebuild()
			}
		}
		if ( Modernizr.mq('(max-width:1339px)') && Modernizr.mq('(min-width:1000px)') ) {
			$('.contacts-i__map').detach().insertAfter($('.contacts-i__feedback'));
		} else {
			$('.contacts-i__map').detach().insertAfter($('.contacts-i__general'));
		}
		setRatio();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( !isMobile ) {
			var diff = 30;
		} else {
			var diff = 15;
		}
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	
	$('.item-catalog').on('click', function(e) {
		if ( isMobile && !$(this).parent('.catalog__item').hasClass('is-hovered') ) {
			e.preventDefault();
			$(this).parent('.catalog__item').addClass('is-hovered').siblings('.catalog__item').removeClass('is-hovered');
		}
	});

	$('.zoom').fancybox({
		padding: 0,
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
});