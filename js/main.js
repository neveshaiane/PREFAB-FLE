;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Go to next section
	var gotToNextSection = function(){
		var el = $('.fh5co-learn-more'),
			w = el.width(),
			divide = -w/2;
		el.css('margin-left', divide);
	};

	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	// FullHeight
	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height() - 49);
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height() - 49);
			})
		}
	};

	// Scroll Next
	var ScrollNext = function() {
		$('body').on('click', '.scroll-btn', function(e){
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $(this).closest('[data-next="yes"]').next()).offset().top
			}, 1000, 'easeInOutExpo');
			return false;
		});
	};

	var testimonialFlexslider = function() {
		var $flexslider = $('.flexslider');
		$flexslider.flexslider({
		  animation: "fade",
		  manualControls: ".flex-control-nav li",
		  directionNav: false,
		  smoothHeight: true,
		  useCSS: false /* Chrome fix*/
		});
	}


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};



	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	
	

	// Document on load.
	$(function(){
		gotToNextSection();
		loaderPage();
		fullHeight();
		ScrollNext();
		testimonialFlexslider();
		goToTop();

		// Animate
		contentWayPoint();

	});


}());

(function () {
	'use strict';

	var header = document.getElementById('fh5co-header');
	if (!header || document.getElementById('menu-toggle')) {
		return;
	}

	header.insertAdjacentHTML('afterbegin',
		'<button id="menu-toggle" type="button" aria-controls="menu-compact" aria-expanded="false">' +
			'<span class="menu-icon" aria-hidden="true">&#9776;</span> Menu' +
		'</button>' +
		'<div id="menu-overlay" aria-hidden="true"></div>' +
		'<aside id="menu-compact" aria-hidden="true" aria-label="Menu principal">' +
			'<div class="menu-compact-header">' +
				'<h1></h1>' +
				'<button class="menu-close" type="button" aria-label="Fermer le menu">&times;</button>' +
			'</div>' +
			'<div class="menu-tabs" role="tablist" aria-label="Rubriques principales">' +
				'<button class="menu-tab is-active" type="button" role="tab" aria-selected="true" data-menu-panel="fonctions-panel">Fonctions langagi&egrave;res</button>' +
				'<button class="menu-tab" type="button" role="tab" aria-selected="false" data-menu-panel="aspects-panel">Aspects linguistiques</button>' +
			'</div>' +
			'<div id="fonctions-panel" class="menu-panel is-active" role="tabpanel">' +
				'<div class="menu-group">' +
					'<button class="menu-group-toggle" type="button" aria-expanded="true">Rituels sociaux</button>' +
					'<div class="menu-group-links">' +
						'<a href="module1.html">Saluer</a>' +
						'<a href="module2.html">Remercier</a>' +
						'<a href="module3.html">S’excuser</a>' +
					'</div>' +
				'</div>' +
				'<div class="menu-group">' +
					'<button class="menu-group-toggle" type="button" aria-expanded="false">Indiquer son accord</button>' +
					'<div class="menu-group-links"><span>&Agrave; venir</span></div>' +
				'</div>' +
				'<div class="menu-group">' +
					'<button class="menu-group-toggle" type="button" aria-expanded="false">Exprimer ses &eacute;motions</button>' +
					'<div class="menu-group-links"><span>&Agrave; venir</span></div>' +
				'</div>' +
			'</div>' +
			'<div id="aspects-panel" class="menu-panel menu-aspects" role="tabpanel">' +
				'<a href="aspects1.html">Registres et conditions d&rsquo;emplois</a>' +
				'<a href="aspects2.html">Combinatoire des PPI</a>' +
				'<a href="aspects4.html">Constructions syntaxiques</a>' +
			'</div>' +
		'</aside>'
	);

	var rightMenu = header.querySelector('.right-menu.align-right');
	if (rightMenu) {
		header.appendChild(rightMenu);
	}

	var legacyNav = header.querySelector('nav');
	if (legacyNav) {
		legacyNav.style.display = 'none';
	}

	var menuToggle = document.getElementById('menu-toggle');
	var menuCompact = document.getElementById('menu-compact');
	var menuOverlay = document.getElementById('menu-overlay');
	var menuClose = menuCompact.querySelector('.menu-close');

	function setMenuOpen(isOpen) {
		menuCompact.classList.toggle('is-open', isOpen);
		menuOverlay.classList.toggle('is-visible', isOpen);
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuCompact.setAttribute('aria-hidden', String(!isOpen));
		menuOverlay.setAttribute('aria-hidden', String(!isOpen));
		document.body.style.overflow = isOpen ? 'hidden' : '';
	}

	menuToggle.addEventListener('click', function () {
		setMenuOpen(!menuCompact.classList.contains('is-open'));
	});
	menuClose.addEventListener('click', function () {
		setMenuOpen(false);
	});
	menuOverlay.addEventListener('click', function () {
		setMenuOpen(false);
	});
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			setMenuOpen(false);
		}
	});

	menuCompact.querySelectorAll('.menu-tab').forEach(function (tab) {
		tab.addEventListener('click', function () {
			menuCompact.querySelectorAll('.menu-tab').forEach(function (otherTab) {
				otherTab.classList.remove('is-active');
				otherTab.setAttribute('aria-selected', 'false');
			});
			menuCompact.querySelectorAll('.menu-panel').forEach(function (panel) {
				panel.classList.remove('is-active');
			});
			tab.classList.add('is-active');
			tab.setAttribute('aria-selected', 'true');
			document.getElementById(tab.dataset.menuPanel).classList.add('is-active');
		});
	});

	menuCompact.querySelectorAll('.menu-group-toggle').forEach(function (toggle) {
		toggle.addEventListener('click', function () {
			var group = toggle.parentElement;
			var isOpen = group.classList.toggle('is-open');
			toggle.setAttribute('aria-expanded', String(isOpen));
		});
	});
}());