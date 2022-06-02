let AKCOMMON = (function() {
    let _public = {};
    let _private = {};
    let scrollVal = 0;
    let fixScVal = 0;
    _public.topEffect = false
    _public.init = function () {
        _private.eventHandler();
        _private.headerTopEffect()
    }
    _private.eventHandler = function () {
        // Navigation
        $('#btnShowMenu').on('click', function () {
            const H = $('header');
            if (H.is('.show-menu')) H.removeClass('show-menu').removeClass('menu0').removeClass('menu1').removeClass('menu2').removeClass('menu3')
            if ($('header').is('.expand')) {
                H.removeClass('expand');
                _public.bodyunFixed()
            } else {
                H.addClass('expand');
                _public.bodyFixed()
            }
        });
        $('header .head .quick-menu ul li').on('mouseenter', function (e) {
            $('header').removeClass('expand').removeClass('menu0').removeClass('menu1').removeClass('menu2').removeClass('menu3').addClass('show-menu').addClass('menu' + $(this).index())
        });
        $('header').on('mouseleave', function (e) {
            $('header').removeClass('show-menu').removeClass('menu0').removeClass('menu1').removeClass('menu2').removeClass('menu3');
        });
        $('nav ul li h3 a').on('click', function (e) {
            const _parent = $(this).parent().parent();
            console.log(_parent)
            if (_parent.is('.active')) {
                _parent.removeClass('active');
            } else {
                _parent.addClass('active');
                _parent.siblings().removeClass('active');
            }
        });
        // Select custom
        $('.bbs_sort .bbs_button').on('click', function () {
            const _this = $(this);
            if (_this.is('.on')) {
                _this.removeClass('on');
            } else {
                _this.addClass('on');
            }
        });
        // Top tab custom
        $('.top-tab ul li:first').on('click', function () {
            const _this = $(this).offsetParent('.top-tab');
            if (_this.is('.on')) {
                _this.removeClass('on');
            } else {
                _this.addClass('on');
            }
        });
        // Drag notice
        if ($('.tbl-scrollable .drag-noti').length) {
            $('.tbl-scrollable').on('scroll', function () {
                console.log($(this).find('.drag-noti').length)
                if ($(this).find('.drag-noti').length) $(this).find('.drag-noti').hide('slow');
            })
        }
    }
    _private.headerTopEffect = function () {
        window.addEventListener('scroll', function () {
            scrollVal = document.documentElement.scrollTop || document.body.scrollTop
            if (_public.topEffect) {
                if (scrollVal > 0) {
                    $('header').removeClass('top');
                } else {
                    $('header').addClass('top');
                }
            }
        })
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