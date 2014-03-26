$(function(){
	$( '#example' ).photobooth().on( "image", function( event, dataUrl ){
		if($('.blind').css('visibility') == 'visible'){
			//hide the camera viewport
			$(".photobooth canvas, .blind, #view_set_menu").css("visibility", "hidden");
	    // Flash effect
	    $(document.body).hide
	    setTimeout(function() {$(document.body).show()}, 50);
	    setTimeout(function() {$(document.body).hide()}, 125);
	    setTimeout(function() {$(document.body).show()}, 175);

			// Put the div + the image into the Gallery
			$("#gallery").append('<div id="new-selfie"></div>');
			$('#new-selfie').html( '<img src="' + dataUrl + '" >');
			$("#gallery").show();

			// Create the animation
			$("#gallery").animate({ top: "+=328px" }, 10000);
			$("#pic-fade").animate({ top: "+=328px" }, {duration: 10000, queue: false});
			$("#pic-fade").animate({ opacity: 0 }, {duration: 15000, queue: false});
		} else {
			//Reset everything in case we're running this a 2nd or nth time
			$(".photobooth canvas, .blind, #view_set_menu").css("visibility", "visible");
			$("#gallery").css("top","329px");
			$("#gallery").empty();
			$("#pic-fade").css("top","107px");
			$("#pic-fade").css("opacity","1");

		};

	});
//shows and hides the camera slideout with the camera tab
$('#tab').click(function(){
	if($('#slideout_inner').position().left == -613 ){
		$('#slideout_inner').css('left', '-60px');
	} else if($('#slideout_inner').position().left == -60) {
		$('#slideout_inner').css('left', '-613px');
	}
});

//hides the camera tab upon selfie submission
$('#selfie-submit').click(function(){
	$('#slideout_inner').css('left', '-613px');
});



	/**
	* Tab boxes
	*/
	$( '.tab_container' ).each(function( i, elem ){
		$( elem ).find( ".tabs li" ).click(function(){
			$( elem ).find( ".tabs li.selected" ).removeClass( "selected" );
			$( this ).addClass( "selected" );
			$( elem ).find( ".tab_content" ).hide();
			$( elem ).find( ".tab_content." + $(this).attr( "calls" ) ).show();
		});
	});

	/**
	* Link highlighting
	*/
	$( "a" ).click(function(){
		$( "#nav a.selected" ).removeClass( "selected" );
		$( "#nav a[href=" + $(this).attr( "href" ) + "]" ).addClass( "selected" );
	});
});


