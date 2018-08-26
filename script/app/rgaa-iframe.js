// * * * * * * * * * * * * * * * * *
//
// A11Y : RGAA : iframe
//
// * * * * * * * * * * * * * * * * * 
var rgaa_iframe = function () {
    // Ticket RGAA : iframe
    // Ajoute la classe embed-responsive-item sur tous les iframes
    // Les styles en inline sur les iframe doivent être déportés en CSS
    $('iframe').addClass('embed-responsive-item').removeAttr('style').removeAttr('width').removeAttr('height').removeAttr('frameborder').removeAttr('allowfullscreen');

    // Ticket RGAA : Les iframe doivent toujours avoir un title (même simple)
    // Ici, on cible si y a un reCaptcha de Google
    $('.g-recaptcha iframe').attr('title', 'Captcha');
}