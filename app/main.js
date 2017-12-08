document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('spinner').classList.remove('spinner');
    document.getElementById('preloader').classList.remove('preloader');
});
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 500) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    $('.scrollToTop').click(function(event){
        $('html, body').animate({scrollTop : 0},800);
        event.preventDefault();
    });
    $('.nav_item__link').on('click', function (event) {
        var anchor = $(this);
        $('html, body').animate({
            scrollTop:($(anchor.attr('href')).offset().top - 50)
        }, 1250);
        event.preventDefault();
    });
});
