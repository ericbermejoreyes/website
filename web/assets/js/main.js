(($) => {

	$.stickyMenu = function () {
		var scrollValue = 0;
		$(window).scroll(function () {
			let scroll = $(this).scrollTop();
			let trigger = $('#brand');
			let point = trigger.position().top + trigger.height();

			let scrolled = scroll - scrollValue;
			scrollValue = scroll;

			if (scroll >= point && !$('#sticky-menu').hasClass('sticky-menu-show')) {
				if (scrolled < 0) $('#sticky-menu').addClass('sticky-menu-show');
			} else if (scroll >= point && $('#sticky-menu').hasClass('sticky-menu-show') && scrolled > 0) {
				$('#sticky-menu').removeClass('sticky-menu-show');
			} else if (scroll < point && $('#sticky-menu').hasClass('sticky-menu-show')) {
				$('#sticky-menu').removeClass('sticky-menu-show');
			}
		});
	};

	/*
	Plugin: jQuery Parallax
	Version 1.1.3
	Author: Ian Lunn
	Twitter: @IanLunn
	Author URL: http://www.ianlunn.co.uk/
	Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

	Dual licensed under the MIT and GPL licenses:
	http://www.opensource.org/licenses/mit-license.php
	http://www.gnu.org/licenses/gpl.html
	*/
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = ($this.offset().top - ($this.height() / 2));
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);
				var halfHeight = height * 0.5;

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};

})(jQuery);

$(window).on('load', function () {
	var $root = $('html, body');

	$('a[href^="#"]').click(function () {
	    $root.animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);

	    return false;
	});
});

$('html').easeScroll();

$.stickyMenu();

$('#design, #development').parallax("0%", 0.1);