(function($, window){

	var Layout = function(){
		this.Init = function(){
			this.setEvents();
		};

		this.setEvents = function(){
			$(document).ready(function(){
			    $('.collapsible').collapsible({
			      accordion : false 
			    });

			    $('.menu-item').on('click',function(){
			    	var parent = $(this).parent();
			    	$('.menu-item',parent).removeClass('active');

			    	$(this).addClass('active');
			    });
		    });
		};

	}



	window.Layout = Layout;

})($, window)


