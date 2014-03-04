$(function(){
	$( '#example' ).photobooth().on( "image", function( event, dataUrl ){
		$(".photobooth canvas, .blind, ul").css("display", "none")
		    $(document.body).hide
		    setTimeout(function() {
		    $(document.body).show()
		}, 50);
		    setTimeout(function() {
		        $(document.body).hide()}, 125);
		    setTimeout(function() {
		    $(document.body).show()
		}, 175);
		$("#gallery").append('<div id="new-selfie"></div>');
		$('#new-selfie').html( '<img src="' + dataUrl + '" >');
		$( "#gallery" ).show();
		$("#gallery" ).animate({ top: "+=175px" }, 4000);
		$( "#pic-fade" ).animate({ top: "+=175px" }, 4000);
    $( "#pic-fade").delay(2000).fadeTo(3000, 0);
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