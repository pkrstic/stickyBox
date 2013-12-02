/**
 * 
 * Sticky Box
 * 
 * @author Predrag Krstic
 * @version 1.0
 * @requires jQuery.dimensions plugin (jQuery.dimensions is part of jQuery core
 *           since 1.2.3 version)
 * 
 * Parameters:
 * @param heightElement -
 *            (selector) dom element that wraps details
 * @param options.marginTop -
 *            (optional) sticky element distance from window top
 * 
 * sticky element must be wraped with something like: <div style="height:100%;
 * position:relative;">
 * 
 * @example of usage:
 * 
 * HTML <div id="content"> <div class="column1">...</div> <div class="column2">
 * <div id="stickyBox" data-stickyboxbounds="#content"> STICKY BOX CONTENT
 * </div> </div> </div>
 * 
 * CALL $('#stickyBox').stickyBox({bounds: '#content', marginTop: 10 });
 * 
 */

(function($) {
	$.fn.stickyBox = function(options) {

		var defaults = {
			bounds : '.stickyBoxBounds',
			marginTop : 0
		};

		return this.each(function() {

			var sticky = this;
			var stickyHeight = $(sticky).height();

			var o = $.extend(defaults, options);
			
			o.bounds = $(sticky).data('stickyboxbounds') || o.bounds;
			o.marginTop = $(sticky).data('stickyboxmargintop') || o.marginTop;

			var bounds = $(sticky).parents(o.bounds).first();
			
			$(sticky).parent().css({
				position : 'relative',
				height : '100%'
			});

			$(sticky).css({
				position : 'absolute'
			});

			var stickyFormPos = function() {
				
				var boundsW = $(bounds).width();

				var top = $(bounds).offset().top;
				var bottom = $(bounds).height() + top;

				var left = $(sticky).parent().offset().left;
				var stickyCurrH = $(sticky).height();
				var stickyCurrHTemp = stickyCurrH;

				var posTop = $(window).scrollTop();
				var posLeft = $(window).scrollLeft();

				var winW = $(window).width();
				var winH = $(window).height();

				if (stickyCurrH > stickyHeight) {
					stickyCurrH = stickyHeight;
				}

				if (top - o.marginTop > posTop || stickyCurrH + o.marginTop > winH) {
					$(sticky).css({
						"position" : "static",
						"left" : null,
						"top" : null
					});
				} else {
					var stickyBottom = posTop + stickyCurrH + o.marginTop;

					if (stickyCurrHTemp > stickyHeight) {
						stickyBottom = stickyBottom + (stickyCurrHTemp - stickyHeight);
					}

					var d = o.marginTop;
					if (stickyBottom > bottom) {
						d = o.marginTop + (bottom - stickyBottom);
					}

					var l = 'auto';
					if (boundsW > winW) {
						l = left - posLeft;
					}

					$(sticky).css({
						"position" : "fixed",
						"top" : d + "px",
						"left" : l
					});
				}
			};

			$(window).on('scroll resize', stickyFormPos);
		});
	};
})(jQuery);
