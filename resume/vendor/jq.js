$(document).ready(function () {
/*  $('.gallery li').css({
    display: 'none'
  });*/
  $(function(){
    $('#slider2') // Demo 2 code, using FX full control
      .anythingSlider({
        resizeContents      : false,
        navigationFormatter : function(i, panel){
          return ['1', '2', '3', '4', '5', '6', '7', '8', '9'][i - 1];
        }
      })
  });

});

