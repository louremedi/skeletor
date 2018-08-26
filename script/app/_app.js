(function($) {
    // * * * * * * * * * * * * * * * * * * * * 
    //
    // On donne le focus à la fenetre du site et non au navigateur
    //
    // * * * * * * * * * * * * * * * * * * * * 
    $(window).focus();

    // * * * * * * * * * * * * * * * * * * * * 
    //
    // DOM READY : init function
    //
    // * * * * * * * * * * * * * * * * * * * * 
    $(document).ready( function () {

        fn_scroll_top();
        fn_cover();

    });

})(jQuery);