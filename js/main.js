$(document).ready(function () {
    $('.fixed-action-btn').floatingActionButton();
    $('.carousel.carousel-slider').carousel({
        fullWidth:true,
        indicators:false,
      });
    // setInterval(function(){
    //  $('.carousel').carousel('next');
    // },3000);
   
    //slideshow
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);
        $('html, body').animate({
            'scrollTop': $target.offset().top,

        }, 1000, 'swing');
        
    });

});





