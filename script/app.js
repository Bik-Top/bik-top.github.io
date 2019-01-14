

jQuery(document).ready(function($){
  $.fn.extend({
    animateCss: function (animationName, callback) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
        if (callback) {
          callback();
        }
      });
      return this;
    }
  });


  //open/close lateral navigation
  $('.cd-nav-trigger').on('click', function(event){
    event.preventDefault();
    $('body').toggleClass('navigation-is-open');
    $('#header').toggleClass('animated fadeOutUpp')
  /*  $('#header').animateCss('fadeOutLeft', function () {
      $('#header').toggleClass('fadeInLeft');
    })*/
  });
});



$(function() {
  var demo1 = $("#slider").slippry({
    transition: 'kenburns',
    useCSS: true,
    speed: 5000,
    pause: 9000,
    auto: true,
    controls: false,
    preload: 'visible',
    autoHover: false
  });

});