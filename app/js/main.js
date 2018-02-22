$(function () {
    $('#menu__hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('#menu').toggleClass('menu-active');
    });
});

$(document).ready(function() {
    $(window).resize(function(){
        var windowWidth = $(window).width();
        if(windowWidth > 769)$("#menu").removeClass("menu-active");
        if (windowWidth > 769)$("#menu__hamburger").removeClass("active");
    });
});

$(function() {
    $('a').click(function() {
        var href = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 1000);
        return false;
    });
});