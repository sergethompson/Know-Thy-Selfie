$( ".snap" ).click(function(){
    $('#flash').css('background-color','white');
    setTimeout(function() {
    $('#flash').css('background-color','')
}, 50);
    setTimeout(function() {
        $('#flash').css('background-color','white')}, 125);
    setTimeout(function() {
    $('#flash').css('background-color','')
}, 175);
    $( "#snoop" ).animate({ top: "+=300px" }, 4000);
    $( "#pic-fade" ).animate({ top: "+=300px" }, 4000);
    $( "#pic-fade").delay(2000).fadeTo(3000, 0);

});
