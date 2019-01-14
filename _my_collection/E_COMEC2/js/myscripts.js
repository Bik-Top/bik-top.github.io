/*
$(document).ready(function(){
	$(function(){
		$('.bottum_switch').click(function(){
			$('.bottum_switch').removeClass('bottum_switch_aktiv');		
			 $(this).addClass('bottum_switch_aktiv');
			var index = $('.bottum_switch').index(this);
			$('.accept_payments1').hide().eq(index).show();
		});
	}); 



});// конец ready