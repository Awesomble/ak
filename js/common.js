let AKCOMMON = (function() {
    let _public = {};
    let _private = {};
    let scrollVal = 0;
    let fixScVal = 0;
    _public.init = function () {
        _private.eventHandler();
    }
    _private.eventHandler = function () {
        // Header scroll effect
        window.addEventListener('scroll', function () {
            scrollVal = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollVal > 0) {
                $('header').removeClass('top');
            } else {
                $('header').addClass('top');
            }
        })
        // Navigation
        $('#btnShowMenu').on('click', function () {
            const H = $('header');
            if ($('header').is('.expand')) {
                H.removeClass('expand');
                _public.bodyunFixed()
            } else {
                H.addClass('expand');
                _public.bodyFixed()
            }
        });
    }
    _public.bodyFixed = function () {
        fixScVal = scrollVal
        $('body').addClass('fixed')//.css('top', '-' + scrollVal + 'px');
        $('body').attr('sc', fixScVal)//.css('top', '-' + scrollVal + 'px');

    }
    _public.bodyunFixed = function () {
        $('body').removeClass('fixed');
        setTimeout(function () {
            window.scrollTo(0, fixScVal)
        });

    }
    return _public;
})();

//init
$(function () {
    AKCOMMON.init();
});