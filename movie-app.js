"use strict";



$(document).ready(function () {
    const serverURL = 'sordid-psychedelic-nylon';


//fadeout loading message, removing div to give space for movies
    $('#main').load("body", function(e) {
        $('#load-icon').fadeOut(5000, function() {
            $('#div').remove();
        });

    });





})