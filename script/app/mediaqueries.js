//
// MEDIA QUERIES -- via Harvey.js
//

var fn_media_querie = function () {

	var body = $('body');

	// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
	//
	// On ajoute la class w1200 sur body pour gérer le menu
	// Toujours mettre min-width avant max-width
	//
	// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 

    // > 1200px
	Harvey.attach('screen and (min-width:75em)', {
		on: function () {
			body.removeClass('w1200');
		}
    });
  
    // < 1199px
	Harvey.attach('screen and (max-width:74.938em)', {
		on: function () {
			body.addClass('w1200');
		}
    });

};