let AKCOMMON = (function() {
    let _public = {};
    let _private = {};
    let scrollVal = 0;
    let fixScVal = 0;
    _public.topEffect = false;
    _public.historyEffect = false;
    _public.historyEffectSpot = [];
    _public.WIDTH = 0;
    _public.HEIGHT = 0;
    _public.init = function () {
        _private.eventHandler();
        _private.headerTopEffect();
        // $('header').addClass('top');
    }
    _private.eventHandler = function () {
        // Resize
        $(window).on('resize', function () {
            _public.WIDTH = $(window).width();
            _public.HEIGHT = $(window).height();
            console.log(_public.WIDTH, _public.HEIGHT)
        }).trigger('resize');

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
                let h = 0;
                if ($('nav').length) {
                    $('nav > ul > li').each(function (idx, t) {
                        h = Math.max(h, $(t).outerHeight());
                    });
                }
                $('nav > ul').css('height', h);
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
        // History
        $('.selected-tab').on('click', function (e) {
            if ($('.history-tab').is('.active')) {
                $('.history-tab').removeClass('active');
            } else {
                $('.history-tab').addClass('active');
            }
        });
        if ($('.history-cont').length) {
            $('.select-tab li, .selected-tab li').on('click', function (e) {
                if (_public.WIDTH > 960 || $('.history-tab').is('.active')) {
                    const _this = $(this);
                    _this.siblings().removeClass('active');
                    _this.addClass('active');
                    _public.scrollTo(_this.attr('data-btn-year'));
                    if ($('.history-tab').is('.active')) $('.history-tab').removeClass('active');
                }
            });
        }
    }
    _private.headerTopEffect = function () {
        window.addEventListener('scroll', function () {
            scrollVal = document.documentElement.scrollTop || document.body.scrollTop;
            // header
            if (scrollVal > 0) {
                if (_public.topEffect) $('header').removeClass('main-top');
                else $('header').removeClass('top');
            } else {
                if (_public.topEffect) $('header').addClass('main-top');
                else $('header').addClass('top');
            }
            // history
            if (_public.historyEffect) {
                _public.historyEffectSpot = [];
                $('.history-wrap .year-wrap.spot').each(function (idx, itm) {
                    _public.historyEffectSpot.push($(itm).offset().top - 100);
                });
                for (let i = 0; i < _public.historyEffectSpot.length; i++) {
                    if (scrollVal > _public.historyEffectSpot[i]) {
                        $('.select-tab li.active').removeClass('active');
                        $('.select-tab li').eq(i).addClass('active');
                        $('.selected-tab li.active').removeClass('active');
                        $('.selected-tab li').eq(i).addClass('active');
                    }
                }
                // Tab navi fix
                if (scrollVal > $('.content').offset().top) {
                    $('.select-tab').addClass('fix');
                } else {
                    $('.select-tab').removeClass('fix');
                }
                // mo
                if (_public.WIDTH < 961) {
                    if (scrollVal + $('header').height() > $('.content').offset().top) {
                        $('.history-cont').addClass('fix');
                        console.log($('.history-tab').offset().top)
                        // if (parseInt($('.history-tab').css('top').replace('px', '')) > 0) {
                        //     console.log((scrollVal + parseInt($('.history-tab').css('top'))) - scrollVal + 'px')
                        //     $('.history-tab').css('top', (scrollVal + $('.history-tab').offset().top) - scrollVal + 'px');
                        // }
                    } else {
                        $('.history-cont').removeClass('fix');
                        // $('.history-tab').css('top', '0px');
                    }
                    if ($('.history-tab').is('.active')) $('.history-tab').removeClass('active');

                }
            }
        })
    }
    // Scroll effect
    _public.scrollTo = function (o) {
        if ($(o).offset().top > 0) {
            setTimeout(function () {
                if (_public.WIDTH < 961) {
                    window.scrollTo(0, $(o).offset().top - $('header').height() - $('.history-tab').height());
                } else {
                    window.scrollTo(0, $(o).offset().top - 92);
                }
            });
        }
    }
    _public.bodyFixed = function () {
        fixScVal = scrollVal
        $('body').addClass('fixed').css('top', '-' + scrollVal + 'px');
        $('body').attr('sc', fixScVal);
        setTimeout(function () {
            $('header').removeClass('top');
        });
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