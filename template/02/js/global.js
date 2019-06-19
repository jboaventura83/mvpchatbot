
	(function($){
		$(document).ready(function(){	

			$(".bgAjuda").show(200);
			
			$( ".boxChatIcone figure" ).hover(function() {
			  $(".boxConversa").addClass('bC-On', {duration:1500});
			  $(".bgAjuda").hide(100);
			});
			
			
			$( ".closeChat" ).click(function() {
			  $(".boxConversa").removeClass('bC-On', {duration:1500});
			  $(".footerBC textarea").val('');
			  $(".bgAjuda").show(200);
			});
					
			
			var tela = $(window).height(); 		
			$("#frame").css("height", tela); 
			
		});
	})(jQuery);

	
	