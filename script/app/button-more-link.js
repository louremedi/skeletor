// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  //
  // FOOTER BUTTON MORE LINK
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  var button_more_link = function () {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    //
    // #1
    // On compte le nombre de <li> dans chaque <ul> pour chaque .region-footer
    //
    // #2
    // S'il y a plus de n <li> 
    //
    // #3
    // Alors on ajoute une class .hidden sur les <li> à partir du Nième <li>
    // 
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    var region_footer__button = '<button class="btn-menu-toggle"><span class="txt-1">Voir</span> <span class="txt-2">plus</span> <span class="txt-2">moins</span> <span class="txt-3"></span></button>';
    
    function region_footer_more_link () {
      
      var increment = 1;
      
      $('.region-footer ul.menu, .region-footer .block-views .item-list ul').each( function () {

        var thisUL = $(this);
        var nbr_child = $(this).children('li').length;
        var region_footer__title_text = $(thisUL).parent().parent().find('h2').text();
        
        if ( nbr_child > 5 ) {
          
          $(thisUL).after(document.createElement("ul"));
          var newUL = $(thisUL).next('ul').addClass("menu-expanded");

          $(this).children('li:nth-child(n+6)').appendTo(newUL);

          newUL.before(region_footer__button);
          var newBtn = $(thisUL).next('button.btn-menu-toggle');

          newBtn.attr('id', 'a11y-menu-toggle-' + increment).attr('aria-controls', 'menu-toggle-target-' + increment).attr('aria-expanded','false');

          newUL.attr('aria-labelledby', 'a11y-menu-toggle-' + increment).attr('id', 'menu-toggle-target-' + increment).attr("aria-hidden", "true");
          
          newBtn.children('.txt-3').html('sur : ' + region_footer__title_text);
        }

        increment++;

      });

      $('.btn-menu-toggle').on('click', function (e) {
        e.preventDefault();

        if ( $(this).hasClass('open') ) {
          $(this).removeClass('open').attr('aria-expanded','false').next('.menu-expanded').attr('aria-hidden', 'true');
        } else {
          $(this).addClass('open').attr('aria-expanded','true').next('.menu-expanded').attr('aria-hidden', 'false');
        }
        
      });
    
    }
    region_footer_more_link();

  };