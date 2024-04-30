
(function ($) {
    $.facebox = function (data, klass) {
        $.facebox.loading()
        if (data.ajax) fillFaceboxFromAjax(data.ajax, klass)
        else if (data.image) fillFaceboxFromImage(data.image, klass)
        else if (data.div) fillFaceboxFromHref(data.div, klass)
        else if ($.isFunction(data)) data.call($)
        else $.facebox.reveal(data, klass)
    }
    $.extend($.facebox, {
        settings: {
            opacity: 0.2,
            overlay: !0,
            loadingImage: serverfullname + 'js/facebox/loading.gif',
            closeImage: serverfullname + 'js/facebox/closelabel.png',
            imageTypes: ['png', 'jpg', 'jpeg', 'gif'],
            faceboxHtml: '\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
        <div class="content"> \
        </div> \
        <a href="#" class="close"><img src="' + serverfullname + '/js/facebox/closelabel.png" title="close" class="close_image" /></a> \
      </div> \
    </div>'
        }, loading: function () {
            init()
            if ($('#facebox .loading').length == 1) return !0
            showOverlay()
            $('#facebox .content').empty()
            $('#facebox .body').children().hide().end().append('<div class="loading"><img src="' + $.facebox.settings.loadingImage + '"/></div>')
            $('#facebox').css({
                top: getPageScroll()[1] + (getPageHeight() / 10),
                left: $(window).width() / 2 - 205
            }).show()
            $(document).bind('keydown.facebox', function (e) {
                if (e.keyCode == 27) $.facebox.close()
                return !0
            })
            $(document).trigger('loading.facebox')
        }, reveal: function (data, klass) {
            $(document).trigger('beforeReveal.facebox')
            if (klass) $('#facebox .content').addClass(klass)
            $('#facebox .content').append(data)
            $('#facebox .loading').remove()
            $('#facebox .body').children().fadeIn('normal')
            $('#facebox').css('left', $(window).width() / 2 - ($('#facebox .popup').width() / 2))
            $(document).trigger('reveal.facebox').trigger('afterReveal.facebox')
        }, close: function () {
            $(document).trigger('close.facebox')
            return !1
        }
    })
    $.fn.facebox = function (settings) {
        if ($(this).length == 0) return
        $(this).unbind('click.facebox');
        init(settings)

        function clickHandler() {
            $.facebox.loading(!0)
            var klass = this.rel.match(/facebox\[?\.(\w+)\]?/)
            if (klass) klass = klass[1]
            fillFaceboxFromHref(this.href, klass)
            return !1
        }

        return this.bind('click.facebox', clickHandler)
    }

    function init(settings) {
        if ($.facebox.settings.inited) return !0
        else $.facebox.settings.inited = !0
        $(document).trigger('init.facebox')
        makeCompatible()
        var imageTypes = $.facebox.settings.imageTypes.join('|')
        $.facebox.settings.imageTypesRegexp = new RegExp('\.(' + imageTypes + ')$', 'i')
        if (settings) $.extend($.facebox.settings, settings)
        $('body').append($.facebox.settings.faceboxHtml)
        var preload = [new Image(), new Image()]
        preload[0].src = $.facebox.settings.closeImage
        preload[1].src = $.facebox.settings.loadingImage
        $('#facebox').find('.b:first, .bl').each(function () {
            preload.push(new Image())
            preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
        })
        $('#facebox .close').click($.facebox.close)
        $('#facebox .close_image').attr('src', $.facebox.settings.closeImage)
    }

    function getPageScroll() {
        var xScroll, yScroll;
        if (self.pageYOffset) {
            yScroll = self.pageYOffset;
            xScroll = self.pageXOffset
        } else if (document.documentElement && document.documentElement.scrollTop) {
            yScroll = document.documentElement.scrollTop;
            xScroll = document.documentElement.scrollLeft
        } else if (document.body) {
            yScroll = document.body.scrollTop;
            xScroll = document.body.scrollLeft
        }
        return new Array(xScroll, yScroll)
    }

    function getPageHeight() {
        var windowHeight
        if (self.innerHeight) {
            windowHeight = self.innerHeight
        } else if (document.documentElement && document.documentElement.clientHeight) {
            windowHeight = document.documentElement.clientHeight
        } else if (document.body) {
            windowHeight = document.body.clientHeight
        }
        return windowHeight
    }

    function makeCompatible() {
        var $s = $.facebox.settings
        $s.loadingImage = $s.loading_image || $s.loadingImage
        $s.closeImage = $s.close_image || $s.closeImage
        $s.imageTypes = $s.image_types || $s.imageTypes
        $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml
    }

    function fillFaceboxFromHref(href, klass) {
        if (href.match(/#/)) {
            var url = window.location.href.split('#')[0]
            var target = href.replace(url, '')
            if (target == '#') return
            $.facebox.reveal($(target).html(), klass)
        } else if (href.match($.facebox.settings.imageTypesRegexp)) {
            fillFaceboxFromImage(href, klass)
        } else {
            fillFaceboxFromAjax(href, klass)
        }
    }

    function fillFaceboxFromImage(href, klass) {
        var image = new Image()
        image.onload = function () {
            $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass)
        }
        image.src = href
    }

    function fillFaceboxFromAjax(href, klass) {
        $.get(href, function (data) {
            $.facebox.reveal(data, klass)
        })
    }

    function skipOverlay() {
        return $.facebox.settings.overlay == !1 || $.facebox.settings.opacity === null
    }

    function showOverlay() {
        if (skipOverlay()) return
        if ($('#facebox_overlay').length == 0)
            $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')
        $('#facebox_overlay').hide().addClass("facebox_overlayBG").css('opacity', $.facebox.settings.opacity).click(function () {
            $(document).trigger('close.facebox')
        }).fadeIn(200)
        return !1
    }

    function hideOverlay() {
        if (skipOverlay()) return
        $('#facebox_overlay').fadeOut(200, function () {
            $("#facebox_overlay").removeClass("facebox_overlayBG")
            $("#facebox_overlay").addClass("facebox_hide")
            $("#facebox_overlay").remove()
        })
        return !1
    }

    $(document).bind('close.facebox', function () {
        $(document).unbind('keydown.facebox')
        $('#facebox').fadeOut(function () {
            $('#facebox .content').removeClass().addClass('content')
            $('#facebox .loading').remove()
            $(document).trigger('afterClose.facebox')
        })
        hideOverlay()
    })
})(jQuery);
var isMobile = !1;

function setCookie(name, value, path, domain, secure) {
    document.cookie = name + "=" + escape(value) + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "")
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length
            }
            setStr = unescape(cookie.substring(offset, end))
        }
    }
    return (setStr)
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2')
    }
    return x1 + x2
}

$(document).ready(function () {
    var ll = new LazyLoad({
        class_applied: "lz-applied",
        class_loading: "lz-loading",
        class_loaded: "lz-loaded",
        class_error: "lz-error",
    });
    $(".catbtn").mouseover(function (event) {
        $(".menucontent").addClass('showme');
        event.stopPropagation();
        if ($(".menucontent").hasClass('showme')) {
            $('body').click(function () {
                $(".menucontent").removeClass('showme');
                $('body').off('click')
            })
        }
    })
    $(".menu_top2 a").mouseover(function () {
        $(".menucontent").removeClass('showme')
    })
    isMobile = $(window).width() < 1024;
    $(".catbtn").click(function () {
        if ($(".catalog_content").css('display') == "none")
            $(".catalog_content").show(); else $(".catalog_content").hide()
    })
    $(".abouttab").click(function () {
        $(".abouttab").removeClass('active');
        $(this).addClass('active');
        $(".tabcontainercontent .tcontent").removeClass('active');
        $(".tabcontainercontent ." + $(this).attr('rel')).addClass('active')
    })
    if ($("a.fancybox").length != 0) $("a.fancybox").fancybox();
    if ($('a[rel*=facebox]').length != 0) $('a[rel*=facebox]').facebox();
    inpp = $(".inputphone").inputmask("(999) 999-99-99");
    inpp.change(function () {
        $val = $(this).inputmask('unmaskedvalue');
        if ($val != "" && $val[0] != "9") {
            $(this).val('');
            pel = $(this).parent().find(".phonerror_local");
            pel.slideDown();
            setTimeout(function () {
                pel.slideUp()
            }, 2000)
        }
    })
    inpp.keyup(function () {
        $val = $(this).inputmask('unmaskedvalue');
        if ($val != "" && $val[0] != "9") {
            $(this).val('');
            pel = $(this).parent().find(".phonerror_local");
            pel.slideDown();
            setTimeout(function () {
                pel.slideUp()
            }, 2000)
        }
    })
    $("a[rel=fancybox]").fancybox();
    $('.dropdown').mouseover(function () {
        $(this).find(".dropdown-menu").show()
    })
    $('.dropdown').mouseout(function () {
        $(this).find(".dropdown-menu").hide()
    })
    $(".slideme").each(function () {
        c = $(this).find(".slider-params").data("count");
        addThumb = !1;
        dots = $(this).data("dots") != "" || dots;
        slideParams = $(this).find(".slider-params");
        if ($(window).width() < 768) {
            c = slideParams.data('countmobile');
            if (c == undefined) c = 1;
            addThumb = slideParams.data("thumb") != ""
        }
        if (addThumb) dots = !1;
        margin = 20;
        if ($(this).parents('.empl').length > 0) {
            margin = 0
        }
        parentCar = $(this).find(".owl-carousel").owlCarousel({
            items: c,
            autoplaySpeed: 1000,
            autoplay: slideParams.data("auto") != "",
            margin: margin,
            dots: dots,
            nav: !0,
            navText: ["", ""],
            responsive: {768: {items: 2}, 1280: {items: c}}
        });
        if (addThumb) {
            $(this).append('<div class="img_nav owl-carousel" style="max-width:800px;margin:auto;"></div>');
            img_nav = $(this).find(".img_nav");
            index = 0;
            $(this).find(".owl-carousel .owl-item img").each(function () {
                img_nav.append('<div style="text-align:center"><img data-index="' + index + '" style="max-width:150px;margin:auto;" src="' + $(this).attr('src') + '"></div>');
                index++
            })
            img_nav.owlCarousel({items: 4, dots: !1, nav: !0, navText: ["", ""]});
            img_nav.find('img').click(function () {
                parentCar.trigger('to.owl.carousel', [$(this).data('index') - 1]);
                img_nav.trigger('to.owl.carousel', [$(this).data('index') - 1])
            })
        }
    })
    $(".catwrapper").mouseover(function () {
        $(".fastcatalogue").show()
    })
    $(".catwrapper").mouseout(function () {
        $(".fastcatalogue").hide()
    })
    $(".question_wrapper .question").click(function () {
        $(this).parent().toggleClass('opened').find('.answer').slideToggle()
    })
})

function MaskPhone(c_class) {
    $("." + c_class).inputmask("+7 (999) 999-99-99")
}

function SendRequest(form) {
    if ($(form).find('.inputphone').length > 0) {
        if ($(form).find('.inputphone').val().replaceAll('_', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').length < 11) {
            alert("Неверно введен номер телефона, не менее 11 цифр");
            return !1
        }
    }
    $.post(serverfullname + "action/sendform/", $(form).serialize(), function (answer) {
        res = $.parseJSON(answer);
        if (res.success == 1) {
            $.facebox(res.msg);
            jsfeedback(form);
            form.reset()
        } else {
            alert("Что-то пошло не так")
        }
    });
    $.facebox.close();
    return !0
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement)
};

function numeric_format(val, thSep, dcSep) {
    if (!thSep) thSep = ' ';
    if (!dcSep) dcSep = ',';
    var res = val.toString();
    var lZero = (val < 0);
    var fLen = res.lastIndexOf('.');
    fLen = (fLen > -1) ? fLen : res.length;
    var tmpRes = res.substring(fLen);
    var cnt = -1;
    for (var ind = fLen; ind > 0; ind--) {
        cnt++;
        if (((cnt % 3) === 0) && (ind !== fLen) && (!lZero || (ind > 1))) {
            tmpRes = thSep + tmpRes
        }
        tmpRes = res.charAt(ind - 1) + tmpRes
    }
    return tmpRes.replace('.', dcSep)
}

function _showLoading() {
    $("body").append('<div class="ajax-loading" style="position:fixed;top:40%;left:50%;"><img src="' + serverfullname + '/include/_images/ajax-loader.gif">')
}

function _hideLoading() {
    $("body").find(".ajax-loading").html('')
}

function ShowFastCard(control) {
    $("#fast_detail").load(serverfullname + "action/detailforfast/", {model: $(control).val()}, function () {
        MakeClickable()
    });
    $("#fast_detail_car").load(serverfullname + "action/detailforfastcar/", {model: $(control).val()}, function () {
        MakeClickable()
    })
}

function GetGoodsForFast(control) {
    $("#fast_model_container select").attr("disabled", "disabled");
    $("#fast_detail_car").html('');
    $("#fast_detail").html('');
    $("#fast_model_container").load(serverfullname + "action/modelforfast/", {brand: $(control).val()}, function () {
    })
}

$(document).scroll(function () {
    if ($(document).scrollTop() > 200) {
        alert("test");
    } else {
        $(".toup").hide()
    }
})

function ToUp() {
    $('html, body').stop().animate({scrollTop: 0}, 800)
}

$(document).ready(function () {
    $('.fastorder_content').css("right", -$('.fastorder_content').width() - 5);
    $(".wrapper .close").click(function () {
        $('.fastorder_content').animate({'right': "-" + $(".fastorder_content").width() - 5}, 500, function () {
            $(this).hide();
            $('.fastorder_btn').show();
            $(".fastorder_wrapper").css({"display": "none"})
        })
    });
    $('.fastorder_btn').click(function () {
        toppos = $(".fastorder_btn").position().top - 250;
        $('.fastorder_content').css({"display": "block", "top": toppos});
        $(".fastorder_wrapper").css({"display": "block", "height": $('body').height(), "width": "100%"});
        $('.fastorder_content').animate({'right': 0}, 500);
        $('.fastorder_btn').hide()
    });
    $(".short_models li").click(function () {
        $(".short_models li").removeClass("active");
        if ($(this).attr("rel") != undefined) {
            $(".showmodel").hide(500);
            $("." + $(this).attr("rel")).show(500)
        } else {
            $(".showmodel").show(500)
        }
        $(this).addClass("active")
    })
    $(".iconmenumobail").click(function () {
        SwitchMenu(!0)
    })
    $(".iconcloset").click(function () {
        SwitchMenu(!1)
    })
    $(".itemwrapper").mouseover(function () {
        newImage = $(this).attr("rel");
        $(".changephone").css({"background": "url(" + newImage + ")  no-repeat center", "background-size": "cover"})
    })
});

function SwitchMenu(isopen) {
    if (isopen) {
        $('.logo-menu').css({"left": -$('.logo-menu').width(), "height": $('body').height(), "display": "block"});
        $('.logo-menu').animate({'left': 0}, 500);
        $(".fastorder_wrapper").css({"display": "block", "height": $('body').height(), "width": "100%"});
        $(".fastorder_wrapper").unbind('click');
        $(".fastorder_wrapper").click(function () {
            SwitchMenu(!1)
        })
    } else {
        $('.logo-menu').animate({'left': -$('.logo-menu').width() - 100}, 500, function () {
            $(".fastorder_wrapper").hide();
            $('.logo-menu').css({"display": "none"})
        })
    }
}

function _open(url, width, height) {
    window.open(url, '', 'width=' + width + ',height=' + height + ',left=' + ((window.innerWidth - width) / 2) + ',top=' + ((window.innerHeight - height) / 2))
}

function elementInViewport(el) {
    var bounds = el[0].getBoundingClientRect();
    return ((bounds.top + bounds.height > 0) && (window.innerHeight - bounds.top > 0) && (bounds.left + bounds.width > 0) && (window.innerWidth - bounds.left > 0))
}

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({url: url, dataType: 'script', success: callback, async: !0})
}

function __(el) {
    console.log(el)
};var basketItem = {price: 0};
var selector = '.showed .selected .islast, .option-block .showed.islast option:selected, .option-data.showed .selected .islast';
var addtobasket = Array();
var sumprice = 0;

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

function AddToBasket() {
    event_id = uuidv4();
    $(".order_button").attr('disabled', 'disabled');
    $(".order_button").html($(".order_button").data('wait'));
    var what = $(".mainphoto");
    if (what.length > 0) {
        var basket = $(".basketcontainer");
        what.clone().css({
            'position': 'absolute',
            'z-index': '11100',
            width: what.width(),
            height: what.height(),
            top: what.offset().top,
            left: what.offset().left
        }).appendTo("body").animate({
            opacity: 0.05,
            left: basket.offset().left,
            top: basket.offset().top,
            width: 20,
            height: 20
        }, 1000, function () {
            $(this).remove()
        })
    }
    if (typeof (preAddToBasket) === "function") {
        if (!preAddToBasket()) {
            $(".order_button").removeAttr('disabled');
            $(".order_button").html($(".order_button").data('title'));
            return
        }
    }
    if (basketItem.objects == undefined) {
        basketItem.objects = Array();
        basketItem.objects.push({good: $(".orderplate").data("good"), count: $(".orderplate").data("count")})
    }
    $.getJSON(serverfullname + "action/addtobasket/", {
        basketItem: basketItem,
        url: location.href,
        event_id: event_id
    }, function (answer) {
        $(".order_button").removeAttr('disabled');
        $(".order_button").html($(".order_button").data('title'));
        if (answer != "") $.facebox(answer.content);
        AddToBasketEvent(answer.objects);
        LoadBasket()
    })
}

function initOptions() {
    $(".option-block ul .option, .child-options ul .option").off('click');
    $(".option-block select").off('change');
    $(".option-block ul .option, .child-options ul .option").click(function () {
        var show = $(this).data("show");
        var container = $(this).data("container");
        $("." + container + ">li").removeClass("selected");
        $(this).parent().addClass("selected");
        closechildbyparent(container);
        openchildbyparent(show);
        try {
            OptionSet($(selector))
        } catch (ex) {
        }
        GetPrice()
    })
    $(".option-block select").change(function () {
        opt = $(this).find("option:selected");
        var show = opt.data("show");
        var container = opt.data("container");
        closechildbyparent(container);
        openchildbyparent(show);
        try {
            OptionSet($(selector))
        } catch (ex) {
        }
        GetPrice()
    })
    $(".option-block .option-data .selected .optionparent").each(function () {
        $(this).trigger('click')
    })
}

function closechildbyparent(container) {
    $("ul." + container + " .option").each(function () {
        hide = $(this).data("show");
        $(".child-options").each(function () {
            if ($(this).data("show") == hide) {
                closechildbyparent($(this).find(".option").data("container"));
                $(this).hide();
                $(this).removeClass("showed")
            }
        })
    })
}

function openchildbyparent(show) {
    $(".child-options").each(function () {
        if ($(this).data("show") == show) {
            $(this).show();
            $(this).addClass("showed");
            $(this).find("ul li").removeClass('selected');
            $(this).find("ul li:first-child").addClass('selected');
            var openchaildid = $(this).find(".selected .option").data("show");
            if (openchaildid != undefined) openchildbyparent(openchaildid)
        }
    })
}

function GetPrice() {
    addtobasket = Array();
    sumprice = 0;
    if ($(".full_block").length == 0) {
        sumprice = $(".orderplate").data("baseprice");
        count = $(".orderplate").data("count");
        sumprice = parseInt(sumprice) * parseInt(count)
    }
    if (typeof (preGetPrice) === "function") {
        preGetPrice()
    }
    var showprice = $("#showprice");
    var correctSum = 0;
    var options = Array();
    if ($(".option-block").length > 0) {
        $(selector).each(function () {
            options.push([$(this).data("param"), $(this).data("value")]);
            if ($(this).data("price") != undefined && $(this).data("price").price != null)
                correctSum += parseInt($(this).data("price").price) * parseInt(count)
        })
    }
    if ($(".full_block").length > 0 && $(".full_block .checkbox_active").length > 0) {
        $(".full_block .checkbox_active").each(function () {
            price = $(this).data("price").price;
            complect = $(this).data("price").id;
            count = $(this).data("count");
            sumprice += parseInt(price) * parseInt(count);
            addtobasket.push({
                name: $("h1").html(),
                price: parseInt(price),
                good: $(".orderplate").data("good"),
                count: count,
                complect: complect,
                options: options
            })
        })
    } else {
        addtobasket.push({
            name: $("h1").html(),
            price: parseInt($(".orderplate").data("price")),
            good: $(".orderplate").data("good"),
            count: count,
            options: options
        })
    }
    sumprice = correctSum + sumprice;
    basketItem.price = sumprice;
    basketItem.objects = addtobasket;
    showprice.html(numeric_format(basketItem.price));
    CollectOrderContent();
    if (typeof (postGetPrice) === "function") {
        postGetPrice()
    }
}

function CollectOrderContent() {
    orderdetail = "";
    $(".full_block .checkbox_site").each(function () {
        if ($(this).hasClass("checkbox_active")) {
            data = $(this).data("price");
            count = $(this).data("count");
            orderdetail += '<div>' + data.name + ' <strong>' + (parseInt(data.price) > 0 ? numeric_format(data.price) + " руб." : "") + count + " шт." + '</strong></div>'
        }
    })
    if ($(".full_block .checkbox_site").length == 0) {
        price = parseInt($(".orderplate").data("baseprice"));
        count = parseInt($(".orderplate").data("count"));
        orderdetail += '<div>' + $("h1").html() + ' <strong>' + (price > 0 ? numeric_format(price) + " руб." : "") + count + " шт." + '</strong></div>'
    }
    $(".conngoods .checkbox_site").each(function () {
        if ($(this).hasClass("checkbox_active")) {
            data = $(this).data("connected");
            if (data == "") return;
            count = $(this).data("count");
            orderdetail += '<div>' + data.name + ' <strong>' + (parseInt(data.price) > 0 ? numeric_format(data.price) + " руб." : "") + count + " шт." + '</strong></div>'
        }
    })
    $("#ordercontent").html(orderdetail)
}

function MakeClickable() {
    $(".plus,.minus, .checkbox_site").unbind('click');
    $(".plus,.minus").click(function () {
        if ($(this).attr("class") == "plus") {
            $(this).prev().find(".count").html(parseInt($(this).prev().find(".count").html()) + 1);
            if ($(this).parent().data("connect") != "") {
                $("." + $(this).parent().data("connect")).data("count", $(this).prev().find(".count").html())
            }
        } else {
            if (parseInt($(this).next().find(".count").html()) - 1 != 0)
                $(this).next().find(".count").html(parseInt($(this).next().find(".count").html()) - 1);
            if ($(this).parent().data("connect") != "") {
                $("." + $(this).parent().data("connect")).data("count", $(this).next().find(".count").html())
            }
        }
        GetPrice()
    })
    $(".checkbox_site").click(function () {
        if ($(this).hasClass('imaparent')) {
            $(this).parent().find(".item_parent .checkbox_site").removeClass('checkbox_active')
        } else {
            $("." + $(this).attr('rel')).removeClass('checkbox_active')
        }
        if ($(this).hasClass("checkbox_active")) {
            $(this).removeClass("checkbox_active");
            $(this).parent().find(".prc").removeClass("prcactive")
        } else {
            $(this).addClass("checkbox_active");
            $(this).parent().find(".prc").addClass("prcactive")
        }
        GetPrice()
    })
    if ($("#basketcontent").length > 0) {
        AddCountClick()
    }
    GetPrice()
}

function AddToBasketEvent(objects) {
    LoadBasket();
    jsaddtobasket(objects)
};

function jscallback(object) {
}

function jsoneclick(object) {
}

function jsaddtobasket(object) {
}

function jsstartorder(object) {
}

function jsaddadress(object) {
}

function jsorderdone(number, orderContent) {
};/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, e, h) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function l(r) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {}, e = Object.keys(o);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(o).filter(function (t) {
                return Object.getOwnPropertyDescriptor(o, t).enumerable
            }))), e.forEach(function (t) {
                var e, n, i;
                e = r, i = o[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            })
        }
        return r
    }

    e = e && e.hasOwnProperty("default") ? e.default : e, h = h && h.hasOwnProperty("default") ? h.default : h;
    var r, n, o, a, c, u, f, d, g, _, m, p, v, y, E, C, T, b, S, I, A, D, w, N, O, k, P, j, H, L, R, x, W, U, q, F, K,
        M, Q, B, V, Y, z, J, Z, G, $, X, tt, et, nt, it, rt, ot, st, at, lt, ct, ht, ut, ft, dt, gt, _t, mt, pt, vt, yt,
        Et, Ct, Tt, bt, St, It, At, Dt, wt, Nt, Ot, kt, Pt, jt, Ht, Lt, Rt, xt, Wt, Ut, qt, Ft, Kt, Mt, Qt, Bt, Vt, Yt,
        zt, Jt, Zt, Gt, $t, Xt, te, ee, ne, ie, re, oe, se, ae, le, ce, he, ue, fe, de, ge, _e, me, pe, ve, ye, Ee, Ce,
        Te, be, Se, Ie, Ae, De, we, Ne, Oe, ke, Pe, je, He, Le, Re, xe, We, Ue, qe, Fe, Ke, Me, Qe, Be, Ve, Ye, ze, Je,
        Ze, Ge, $e, Xe, tn, en, nn, rn, on, sn, an, ln, cn, hn, un, fn, dn, gn, _n, mn, pn, vn, yn, En, Cn, Tn, bn, Sn,
        In, An, Dn, wn, Nn, On, kn, Pn, jn, Hn, Ln, Rn, xn, Wn, Un, qn, Fn = function (i) {
            var e = "transitionend";

            function t(t) {
                var e = this, n = !1;
                return i(this).one(l.TRANSITION_END, function () {
                    n = !0
                }), setTimeout(function () {
                    n || l.triggerTransitionEnd(e)
                }, t), this
            }

            var l = {
                TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
                    for (; t += ~~(1e6 * Math.random()), document.getElementById(t);) ;
                    return t
                }, getSelectorFromElement: function (t) {
                    var e = t.getAttribute("data-target");
                    e && "#" !== e || (e = t.getAttribute("href") || "");
                    try {
                        return document.querySelector(e) ? e : null
                    } catch (t) {
                        return null
                    }
                }, getTransitionDurationFromElement: function (t) {
                    if (!t) return 0;
                    var e = i(t).css("transition-duration");
                    return parseFloat(e) ? (e = e.split(",")[0], 1e3 * parseFloat(e)) : 0
                }, reflow: function (t) {
                    return t.offsetHeight
                }, triggerTransitionEnd: function (t) {
                    i(t).trigger(e)
                }, supportsTransitionEnd: function () {
                    return Boolean(e)
                }, isElement: function (t) {
                    return (t[0] || t).nodeType
                }, typeCheckConfig: function (t, e, n) {
                    for (var i in n) if (Object.prototype.hasOwnProperty.call(n, i)) {
                        var r = n[i], o = e[i],
                            s = o && l.isElement(o) ? "element" : (a = o, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                        if (!new RegExp(r).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + r + '".')
                    }
                    var a
                }
            };
            return i.fn.emulateTransitionEnd = t, i.event.special[l.TRANSITION_END] = {
                bindType: e,
                delegateType: e,
                handle: function (t) {
                    if (i(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
                }
            }, l
        }(e), Kn = (n = "alert", a = "." + (o = "bs.alert"), c = (r = e).fn[n], u = {
            CLOSE: "close" + a,
            CLOSED: "closed" + a,
            CLICK_DATA_API: "click" + a + ".data-api"
        }, f = "alert", d = "fade", g = "show", _ = function () {
            function i(t) {
                this._element = t
            }

            var t = i.prototype;
            return t.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function () {
                r.removeData(this._element, o), this._element = null
            }, t._getRootElement = function (t) {
                var e = Fn.getSelectorFromElement(t), n = !1;
                return e && (n = document.querySelector(e)), n || (n = r(t).closest("." + f)[0]), n
            }, t._triggerCloseEvent = function (t) {
                var e = r.Event(u.CLOSE);
                return r(t).trigger(e), e
            }, t._removeElement = function (e) {
                var n = this;
                if (r(e).removeClass(g), r(e).hasClass(d)) {
                    var t = Fn.getTransitionDurationFromElement(e);
                    r(e).one(Fn.TRANSITION_END, function (t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(t)
                } else this._destroyElement(e)
            }, t._destroyElement = function (t) {
                r(t).detach().trigger(u.CLOSED).remove()
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = r(this), e = t.data(o);
                    e || (e = new i(this), t.data(o, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function (e) {
                return function (t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }]), i
        }(), r(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', _._handleDismiss(new _)), r.fn[n] = _._jQueryInterface, r.fn[n].Constructor = _, r.fn[n].noConflict = function () {
            return r.fn[n] = c, _._jQueryInterface
        }, _),
        Mn = (p = "button", y = "." + (v = "bs.button"), E = ".data-api", C = (m = e).fn[p], T = "active", b = "btn", I = '[data-toggle^="button"]', A = '[data-toggle="buttons"]', D = "input", w = ".active", N = ".btn", O = {
            CLICK_DATA_API: "click" + y + E,
            FOCUS_BLUR_DATA_API: (S = "focus") + y + E + " blur" + y + E
        }, k = function () {
            function n(t) {
                this._element = t
            }

            var t = n.prototype;
            return t.toggle = function () {
                var t = !0, e = !0, n = m(this._element).closest(A)[0];
                if (n) {
                    var i = this._element.querySelector(D);
                    if (i) {
                        if ("radio" === i.type) if (i.checked && this._element.classList.contains(T)) t = !1; else {
                            var r = n.querySelector(w);
                            r && m(r).removeClass(T)
                        }
                        if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(T), m(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(T)), t && m(this._element).toggleClass(T)
            }, t.dispose = function () {
                m.removeData(this._element, v), this._element = null
            }, n._jQueryInterface = function (e) {
                return this.each(function () {
                    var t = m(this).data(v);
                    t || (t = new n(this), m(this).data(v, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }]), n
        }(), m(document).on(O.CLICK_DATA_API, I, function (t) {
            t.preventDefault();
            var e = t.target;
            m(e).hasClass(b) || (e = m(e).closest(N)), k._jQueryInterface.call(m(e), "toggle")
        }).on(O.FOCUS_BLUR_DATA_API, I, function (t) {
            var e = m(t.target).closest(N)[0];
            m(e).toggleClass(S, /^focus(in)?$/.test(t.type))
        }), m.fn[p] = k._jQueryInterface, m.fn[p].Constructor = k, m.fn[p].noConflict = function () {
            return m.fn[p] = C, k._jQueryInterface
        }, k), Qn = (j = "carousel", L = "." + (H = "bs.carousel"), R = ".data-api", x = (P = e).fn[j], W = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
        }, U = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        }, q = "next", F = "prev", K = "left", M = "right", Q = {
            SLIDE: "slide" + L,
            SLID: "slid" + L,
            KEYDOWN: "keydown" + L,
            MOUSEENTER: "mouseenter" + L,
            MOUSELEAVE: "mouseleave" + L,
            TOUCHEND: "touchend" + L,
            LOAD_DATA_API: "load" + L + R,
            CLICK_DATA_API: "click" + L + R
        }, B = "carousel", V = "active", Y = "slide", z = "carousel-item-right", J = "carousel-item-left", Z = "carousel-item-next", G = "carousel-item-prev", $ = ".active", X = ".active.carousel-item", tt = ".carousel-item", et = ".carousel-item-next, .carousel-item-prev", nt = ".carousel-indicators", it = "[data-slide], [data-slide-to]", rt = '[data-ride="carousel"]', ot = function () {
            function o(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(e), this._element = P(t)[0], this._indicatorsElement = this._element.querySelector(nt), this._addEventListeners()
            }

            var t = o.prototype;
            return t.next = function () {
                this._isSliding || this._slide(q)
            }, t.nextWhenVisible = function () {
                !document.hidden && P(this._element).is(":visible") && "hidden" !== P(this._element).css("visibility") && this.next()
            }, t.prev = function () {
                this._isSliding || this._slide(F)
            }, t.pause = function (t) {
                t || (this._isPaused = !0), this._element.querySelector(et) && (Fn.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function (t) {
                var e = this;
                this._activeElement = this._element.querySelector(X);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) P(this._element).one(Q.SLID, function () {
                    return e.to(t)
                }); else {
                    if (n === t) return this.pause(), void this.cycle();
                    var i = n < t ? q : F;
                    this._slide(i, this._items[t])
                }
            }, t.dispose = function () {
                P(this._element).off(L), P.removeData(this._element, H), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function (t) {
                return t = l({}, W, t), Fn.typeCheckConfig(j, t, U), t
            }, t._addEventListeners = function () {
                var e = this;
                this._config.keyboard && P(this._element).on(Q.KEYDOWN, function (t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && (P(this._element).on(Q.MOUSEENTER, function (t) {
                    return e.pause(t)
                }).on(Q.MOUSELEAVE, function (t) {
                    return e.cycle(t)
                }), "ontouchstart" in document.documentElement && P(this._element).on(Q.TOUCHEND, function () {
                    e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
                        return e.cycle(t)
                    }, 500 + e._config.interval)
                }))
            }, t._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, t._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(tt)) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function (t, e) {
                var n = t === q, i = t === F, r = this._getItemIndex(e), o = this._items.length - 1;
                if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
                var s = (r + (t === F ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function (t, e) {
                var n = this._getItemIndex(t), i = this._getItemIndex(this._element.querySelector(X)),
                    r = P.Event(Q.SLIDE, {relatedTarget: t, direction: e, from: i, to: n});
                return P(this._element).trigger(r), r
            }, t._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                    var e = [].slice.call(this._indicatorsElement.querySelectorAll($));
                    P(e).removeClass(V);
                    var n = this._indicatorsElement.children[this._getItemIndex(t)];
                    n && P(n).addClass(V)
                }
            }, t._slide = function (t, e) {
                var n, i, r, o = this, s = this._element.querySelector(X), a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s), c = this._getItemIndex(l), h = Boolean(this._interval);
                if (t === q ? (n = J, i = Z, r = K) : (n = z, i = G, r = M), l && P(l).hasClass(V)) this._isSliding = !1; else if (!this._triggerSlideEvent(l, r).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
                    var u = P.Event(Q.SLID, {relatedTarget: l, direction: r, from: a, to: c});
                    if (P(this._element).hasClass(Y)) {
                        P(l).addClass(i), Fn.reflow(l), P(s).addClass(n), P(l).addClass(n);
                        var f = Fn.getTransitionDurationFromElement(s);
                        P(s).one(Fn.TRANSITION_END, function () {
                            P(l).removeClass(n + " " + i).addClass(V), P(s).removeClass(V + " " + i + " " + n), o._isSliding = !1, setTimeout(function () {
                                return P(o._element).trigger(u)
                            }, 0)
                        }).emulateTransitionEnd(f)
                    } else P(s).removeClass(V), P(l).addClass(V), this._isSliding = !1, P(this._element).trigger(u);
                    h && this.cycle()
                }
            }, o._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = P(this).data(H), e = l({}, W, P(this).data());
                    "object" == typeof i && (e = l({}, e, i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new o(this, e), P(this).data(H, t)), "number" == typeof i) t.to(i); else if ("string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else e.interval && (t.pause(), t.cycle())
                })
            }, o._dataApiClickHandler = function (t) {
                var e = Fn.getSelectorFromElement(this);
                if (e) {
                    var n = P(e)[0];
                    if (n && P(n).hasClass(B)) {
                        var i = l({}, P(n).data(), P(this).data()), r = this.getAttribute("data-slide-to");
                        r && (i.interval = !1), o._jQueryInterface.call(P(n), i), r && P(n).data(H).to(r), t.preventDefault()
                    }
                }
            }, s(o, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }, {
                key: "Default", get: function () {
                    return W
                }
            }]), o
        }(), P(document).on(Q.CLICK_DATA_API, it, ot._dataApiClickHandler), P(window).on(Q.LOAD_DATA_API, function () {
            for (var t = [].slice.call(document.querySelectorAll(rt)), e = 0, n = t.length; e < n; e++) {
                var i = P(t[e]);
                ot._jQueryInterface.call(i, i.data())
            }
        }), P.fn[j] = ot._jQueryInterface, P.fn[j].Constructor = ot, P.fn[j].noConflict = function () {
            return P.fn[j] = x, ot._jQueryInterface
        }, ot), Bn = (at = "collapse", ct = "." + (lt = "bs.collapse"), ht = (st = e).fn[at], ut = {
            toggle: !0,
            parent: ""
        }, ft = {toggle: "boolean", parent: "(string|element)"}, dt = {
            SHOW: "show" + ct,
            SHOWN: "shown" + ct,
            HIDE: "hide" + ct,
            HIDDEN: "hidden" + ct,
            CLICK_DATA_API: "click" + ct + ".data-api"
        }, gt = "show", _t = "collapse", mt = "collapsing", pt = "collapsed", vt = "width", yt = "height", Et = ".show, .collapsing", Ct = '[data-toggle="collapse"]', Tt = function () {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = st.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(Ct)), i = 0, r = n.length; i < r; i++) {
                    var o = n[i], s = Fn.getSelectorFromElement(o),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function (t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }

            var t = a.prototype;
            return t.toggle = function () {
                st(this._element).hasClass(gt) ? this.hide() : this.show()
            }, t.show = function () {
                var t, e, n = this;
                if (!this._isTransitioning && !st(this._element).hasClass(gt) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(Et)).filter(function (t) {
                    return t.getAttribute("data-parent") === n._config.parent
                })).length && (t = null), !(t && (e = st(t).not(this._selector).data(lt)) && e._isTransitioning))) {
                    var i = st.Event(dt.SHOW);
                    if (st(this._element).trigger(i), !i.isDefaultPrevented()) {
                        t && (a._jQueryInterface.call(st(t).not(this._selector), "hide"), e || st(t).data(lt, null));
                        var r = this._getDimension();
                        st(this._element).removeClass(_t).addClass(mt), this._element.style[r] = 0, this._triggerArray.length && st(this._triggerArray).removeClass(pt).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var o = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                            s = Fn.getTransitionDurationFromElement(this._element);
                        st(this._element).one(Fn.TRANSITION_END, function () {
                            st(n._element).removeClass(mt).addClass(_t).addClass(gt), n._element.style[r] = "", n.setTransitioning(!1), st(n._element).trigger(dt.SHOWN)
                        }).emulateTransitionEnd(s), this._element.style[r] = this._element[o] + "px"
                    }
                }
            }, t.hide = function () {
                var t = this;
                if (!this._isTransitioning && st(this._element).hasClass(gt)) {
                    var e = st.Event(dt.HIDE);
                    if (st(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", Fn.reflow(this._element), st(this._element).addClass(mt).removeClass(_t).removeClass(gt);
                        var i = this._triggerArray.length;
                        if (0 < i) for (var r = 0; r < i; r++) {
                            var o = this._triggerArray[r], s = Fn.getSelectorFromElement(o);
                            if (null !== s) st([].slice.call(document.querySelectorAll(s))).hasClass(gt) || st(o).addClass(pt).attr("aria-expanded", !1)
                        }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var a = Fn.getTransitionDurationFromElement(this._element);
                        st(this._element).one(Fn.TRANSITION_END, function () {
                            t.setTransitioning(!1), st(t._element).removeClass(mt).addClass(_t).trigger(dt.HIDDEN)
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function (t) {
                this._isTransitioning = t
            }, t.dispose = function () {
                st.removeData(this._element, lt), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function (t) {
                return (t = l({}, ut, t)).toggle = Boolean(t.toggle), Fn.typeCheckConfig(at, t, ft), t
            }, t._getDimension = function () {
                return st(this._element).hasClass(vt) ? vt : yt
            }, t._getParent = function () {
                var n = this, t = null;
                Fn.isElement(this._config.parent) ? (t = this._config.parent, "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return st(i).each(function (t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function (t, e) {
                if (t) {
                    var n = st(t).hasClass(gt);
                    e.length && st(e).toggleClass(pt, !n).attr("aria-expanded", n)
                }
            }, a._getTargetFromElement = function (t) {
                var e = Fn.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, a._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = st(this), e = t.data(lt), n = l({}, ut, t.data(), "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(lt, e)), "string" == typeof i) {
                        if ("undefined" == typeof e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }, {
                key: "Default", get: function () {
                    return ut
                }
            }]), a
        }(), st(document).on(dt.CLICK_DATA_API, Ct, function (t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var n = st(this), e = Fn.getSelectorFromElement(this), i = [].slice.call(document.querySelectorAll(e));
            st(i).each(function () {
                var t = st(this), e = t.data(lt) ? "toggle" : n.data();
                Tt._jQueryInterface.call(t, e)
            })
        }), st.fn[at] = Tt._jQueryInterface, st.fn[at].Constructor = Tt, st.fn[at].noConflict = function () {
            return st.fn[at] = ht, Tt._jQueryInterface
        }, Tt),
        Vn = (St = "dropdown", At = "." + (It = "bs.dropdown"), Dt = ".data-api", wt = (bt = e).fn[St], Nt = new RegExp("38|40|27"), Ot = {
            HIDE: "hide" + At,
            HIDDEN: "hidden" + At,
            SHOW: "show" + At,
            SHOWN: "shown" + At,
            CLICK: "click" + At,
            CLICK_DATA_API: "click" + At + Dt,
            KEYDOWN_DATA_API: "keydown" + At + Dt,
            KEYUP_DATA_API: "keyup" + At + Dt
        }, kt = "disabled", Pt = "show", jt = "dropup", Ht = "dropright", Lt = "dropleft", Rt = "dropdown-menu-right", xt = "position-static", Wt = '[data-toggle="dropdown"]', Ut = ".dropdown form", qt = ".dropdown-menu", Ft = ".navbar-nav", Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Mt = "top-start", Qt = "top-end", Bt = "bottom-start", Vt = "bottom-end", Yt = "right-start", zt = "left-start", Jt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        }, Zt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }, Gt = function () {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }

            var t = c.prototype;
            return t.toggle = function () {
                if (!this._element.disabled && !bt(this._element).hasClass(kt)) {
                    var t = c._getParentFromElement(this._element), e = bt(this._menu).hasClass(Pt);
                    if (c._clearMenus(), !e) {
                        var n = {relatedTarget: this._element}, i = bt.Event(Ot.SHOW, n);
                        if (bt(t).trigger(i), !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof h) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                var r = this._element;
                                "parent" === this._config.reference ? r = t : Fn.isElement(this._config.reference) && (r = this._config.reference, "undefined" != typeof this._config.reference.jquery && (r = this._config.reference[0])), "scrollParent" !== this._config.boundary && bt(t).addClass(xt), this._popper = new h(r, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === bt(t).closest(Ft).length && bt(document.body).children().on("mouseover", null, bt.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), bt(this._menu).toggleClass(Pt), bt(t).toggleClass(Pt).trigger(bt.Event(Ot.SHOWN, n))
                        }
                    }
                }
            }, t.dispose = function () {
                bt.removeData(this._element, It), bt(this._element).off(At), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function () {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function () {
                var e = this;
                bt(this._element).on(Ot.CLICK, function (t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function (t) {
                return t = l({}, this.constructor.Default, bt(this._element).data(), t), Fn.typeCheckConfig(St, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function () {
                if (!this._menu) {
                    var t = c._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(qt))
                }
                return this._menu
            }, t._getPlacement = function () {
                var t = bt(this._element.parentNode), e = Bt;
                return t.hasClass(jt) ? (e = Mt, bt(this._menu).hasClass(Rt) && (e = Qt)) : t.hasClass(Ht) ? e = Yt : t.hasClass(Lt) ? e = zt : bt(this._menu).hasClass(Rt) && (e = Vt), e
            }, t._detectNavbar = function () {
                return 0 < bt(this._element).closest(".navbar").length
            }, t._getPopperConfig = function () {
                var e = this, t = {};
                "function" == typeof this._config.offset ? t.fn = function (t) {
                    return t.offsets = l({}, t.offsets, e._config.offset(t.offsets) || {}), t
                } : t.offset = this._config.offset;
                var n = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: t,
                        flip: {enabled: this._config.flip},
                        preventOverflow: {boundariesElement: this._config.boundary}
                    }
                };
                return "static" === this._config.display && (n.modifiers.applyStyle = {enabled: !1}), n
            }, c._jQueryInterface = function (e) {
                return this.each(function () {
                    var t = bt(this).data(It);
                    if (t || (t = new c(this, "object" == typeof e ? e : null), bt(this).data(It, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, c._clearMenus = function (t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which)) for (var e = [].slice.call(document.querySelectorAll(Wt)), n = 0, i = e.length; n < i; n++) {
                    var r = c._getParentFromElement(e[n]), o = bt(e[n]).data(It), s = {relatedTarget: e[n]};
                    if (t && "click" === t.type && (s.clickEvent = t), o) {
                        var a = o._menu;
                        if (bt(r).hasClass(Pt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && bt.contains(r, t.target))) {
                            var l = bt.Event(Ot.HIDE, s);
                            bt(r).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && bt(document.body).children().off("mouseover", null, bt.noop), e[n].setAttribute("aria-expanded", "false"), bt(a).removeClass(Pt), bt(r).removeClass(Pt).trigger(bt.Event(Ot.HIDDEN, s)))
                        }
                    }
                }
            }, c._getParentFromElement = function (t) {
                var e, n = Fn.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, c._dataApiKeydownHandler = function (t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || bt(t.target).closest(qt).length)) : Nt.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !bt(this).hasClass(kt))) {
                    var e = c._getParentFromElement(this), n = bt(e).hasClass(Pt);
                    if ((n || 27 === t.which && 32 === t.which) && (!n || 27 !== t.which && 32 !== t.which)) {
                        var i = [].slice.call(e.querySelectorAll(Kt));
                        if (0 !== i.length) {
                            var r = i.indexOf(t.target);
                            38 === t.which && 0 < r && r--, 40 === t.which && r < i.length - 1 && r++, r < 0 && (r = 0), i[r].focus()
                        }
                    } else {
                        if (27 === t.which) {
                            var o = e.querySelector(Wt);
                            bt(o).trigger("focus")
                        }
                        bt(this).trigger("click")
                    }
                }
            }, s(c, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }, {
                key: "Default", get: function () {
                    return Jt
                }
            }, {
                key: "DefaultType", get: function () {
                    return Zt
                }
            }]), c
        }(), bt(document).on(Ot.KEYDOWN_DATA_API, Wt, Gt._dataApiKeydownHandler).on(Ot.KEYDOWN_DATA_API, qt, Gt._dataApiKeydownHandler).on(Ot.CLICK_DATA_API + " " + Ot.KEYUP_DATA_API, Gt._clearMenus).on(Ot.CLICK_DATA_API, Wt, function (t) {
            t.preventDefault(), t.stopPropagation(), Gt._jQueryInterface.call(bt(this), "toggle")
        }).on(Ot.CLICK_DATA_API, Ut, function (t) {
            t.stopPropagation()
        }), bt.fn[St] = Gt._jQueryInterface, bt.fn[St].Constructor = Gt, bt.fn[St].noConflict = function () {
            return bt.fn[St] = wt, Gt._jQueryInterface
        }, Gt), Yn = (Xt = "modal", ee = "." + (te = "bs.modal"), ne = ($t = e).fn[Xt], ie = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }, re = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }, oe = {
            HIDE: "hide" + ee,
            HIDDEN: "hidden" + ee,
            SHOW: "show" + ee,
            SHOWN: "shown" + ee,
            FOCUSIN: "focusin" + ee,
            RESIZE: "resize" + ee,
            CLICK_DISMISS: "click.dismiss" + ee,
            KEYDOWN_DISMISS: "keydown.dismiss" + ee,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
            CLICK_DATA_API: "click" + ee + ".data-api"
        }, se = "modal-scrollbar-measure", ae = "modal-backdrop", le = "modal-open", ce = "fade", he = "show", ue = ".modal-dialog", fe = '[data-toggle="modal"]', de = '[data-dismiss="modal"]', ge = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", _e = ".sticky-top", me = function () {
            function r(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(ue), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._scrollbarWidth = 0
            }

            var t = r.prototype;
            return t.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function (t) {
                var e = this;
                if (!this._isTransitioning && !this._isShown) {
                    $t(this._element).hasClass(ce) && (this._isTransitioning = !0);
                    var n = $t.Event(oe.SHOW, {relatedTarget: t});
                    $t(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), $t(document.body).addClass(le), this._setEscapeEvent(), this._setResizeEvent(), $t(this._element).on(oe.CLICK_DISMISS, de, function (t) {
                        return e.hide(t)
                    }), $t(this._dialog).on(oe.MOUSEDOWN_DISMISS, function () {
                        $t(e._element).one(oe.MOUSEUP_DISMISS, function (t) {
                            $t(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function () {
                        return e._showElement(t)
                    }))
                }
            }, t.hide = function (t) {
                var e = this;
                if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                    var n = $t.Event(oe.HIDE);
                    if ($t(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = $t(this._element).hasClass(ce);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), $t(document).off(oe.FOCUSIN), $t(this._element).removeClass(he), $t(this._element).off(oe.CLICK_DISMISS), $t(this._dialog).off(oe.MOUSEDOWN_DISMISS), i) {
                            var r = Fn.getTransitionDurationFromElement(this._element);
                            $t(this._element).one(Fn.TRANSITION_END, function (t) {
                                return e._hideModal(t)
                            }).emulateTransitionEnd(r)
                        } else this._hideModal()
                    }
                }
            }, t.dispose = function () {
                $t.removeData(this._element, te), $t(window, document, this._element, this._backdrop).off(ee), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
            }, t.handleUpdate = function () {
                this._adjustDialog()
            }, t._getConfig = function (t) {
                return t = l({}, ie, t), Fn.typeCheckConfig(Xt, t, re), t
            }, t._showElement = function (t) {
                var e = this, n = $t(this._element).hasClass(ce);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && Fn.reflow(this._element), $t(this._element).addClass(he), this._config.focus && this._enforceFocus();
                var i = $t.Event(oe.SHOWN, {relatedTarget: t}), r = function () {
                    e._config.focus && e._element.focus(), e._isTransitioning = !1, $t(e._element).trigger(i)
                };
                if (n) {
                    var o = Fn.getTransitionDurationFromElement(this._element);
                    $t(this._dialog).one(Fn.TRANSITION_END, r).emulateTransitionEnd(o)
                } else r()
            }, t._enforceFocus = function () {
                var e = this;
                $t(document).off(oe.FOCUSIN).on(oe.FOCUSIN, function (t) {
                    document !== t.target && e._element !== t.target && 0 === $t(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function () {
                var e = this;
                this._isShown && this._config.keyboard ? $t(this._element).on(oe.KEYDOWN_DISMISS, function (t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || $t(this._element).off(oe.KEYDOWN_DISMISS)
            }, t._setResizeEvent = function () {
                var e = this;
                this._isShown ? $t(window).on(oe.RESIZE, function (t) {
                    return e.handleUpdate(t)
                }) : $t(window).off(oe.RESIZE)
            }, t._hideModal = function () {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
                    $t(document.body).removeClass(le), t._resetAdjustments(), t._resetScrollbar(), $t(t._element).trigger(oe.HIDDEN)
                })
            }, t._removeBackdrop = function () {
                this._backdrop && ($t(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function (t) {
                var e = this, n = $t(this._element).hasClass(ce) ? ce : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = ae, n && this._backdrop.classList.add(n), $t(this._backdrop).appendTo(document.body), $t(this._element).on(oe.CLICK_DISMISS, function (t) {
                        e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                    }), n && Fn.reflow(this._backdrop), $t(this._backdrop).addClass(he), !t) return;
                    if (!n) return void t();
                    var i = Fn.getTransitionDurationFromElement(this._backdrop);
                    $t(this._backdrop).one(Fn.TRANSITION_END, t).emulateTransitionEnd(i)
                } else if (!this._isShown && this._backdrop) {
                    $t(this._backdrop).removeClass(he);
                    var r = function () {
                        e._removeBackdrop(), t && t()
                    };
                    if ($t(this._element).hasClass(ce)) {
                        var o = Fn.getTransitionDurationFromElement(this._backdrop);
                        $t(this._backdrop).one(Fn.TRANSITION_END, r).emulateTransitionEnd(o)
                    } else r()
                } else t && t()
            }, t._adjustDialog = function () {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function () {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function () {
                var r = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(ge)), e = [].slice.call(document.querySelectorAll(_e));
                    $t(t).each(function (t, e) {
                        var n = e.style.paddingRight, i = $t(e).css("padding-right");
                        $t(e).data("padding-right", n).css("padding-right", parseFloat(i) + r._scrollbarWidth + "px")
                    }), $t(e).each(function (t, e) {
                        var n = e.style.marginRight, i = $t(e).css("margin-right");
                        $t(e).data("margin-right", n).css("margin-right", parseFloat(i) - r._scrollbarWidth + "px")
                    });
                    var n = document.body.style.paddingRight, i = $t(document.body).css("padding-right");
                    $t(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                }
            }, t._resetScrollbar = function () {
                var t = [].slice.call(document.querySelectorAll(ge));
                $t(t).each(function (t, e) {
                    var n = $t(e).data("padding-right");
                    $t(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                var e = [].slice.call(document.querySelectorAll("" + _e));
                $t(e).each(function (t, e) {
                    var n = $t(e).data("margin-right");
                    "undefined" != typeof n && $t(e).css("margin-right", n).removeData("margin-right")
                });
                var n = $t(document.body).data("padding-right");
                $t(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function () {
                var t = document.createElement("div");
                t.className = se, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, r._jQueryInterface = function (n, i) {
                return this.each(function () {
                    var t = $t(this).data(te), e = l({}, ie, $t(this).data(), "object" == typeof n && n ? n : {});
                    if (t || (t = new r(this, e), $t(this).data(te, t)), "string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else e.show && t.show(i)
                })
            }, s(r, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }, {
                key: "Default", get: function () {
                    return ie
                }
            }]), r
        }(), $t(document).on(oe.CLICK_DATA_API, fe, function (t) {
            var e, n = this, i = Fn.getSelectorFromElement(this);
            i && (e = document.querySelector(i));
            var r = $t(e).data(te) ? "toggle" : l({}, $t(e).data(), $t(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
            var o = $t(e).one(oe.SHOW, function (t) {
                t.isDefaultPrevented() || o.one(oe.HIDDEN, function () {
                    $t(n).is(":visible") && n.focus()
                })
            });
            me._jQueryInterface.call($t(e), r, this)
        }), $t.fn[Xt] = me._jQueryInterface, $t.fn[Xt].Constructor = me, $t.fn[Xt].noConflict = function () {
            return $t.fn[Xt] = ne, me._jQueryInterface
        }, me),
        zn = (ve = "tooltip", Ee = "." + (ye = "bs.tooltip"), Ce = (pe = e).fn[ve], Te = "bs-tooltip", be = new RegExp("(^|\\s)" + Te + "\\S+", "g"), Ae = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !(Ie = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}),
            selector: !(Se = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "(number|string)",
                container: "(string|element|boolean)",
                fallbackPlacement: "(string|array)",
                boundary: "(string|element)"
            }),
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent"
        }, we = "out", Ne = {
            HIDE: "hide" + Ee,
            HIDDEN: "hidden" + Ee,
            SHOW: (De = "show") + Ee,
            SHOWN: "shown" + Ee,
            INSERTED: "inserted" + Ee,
            CLICK: "click" + Ee,
            FOCUSIN: "focusin" + Ee,
            FOCUSOUT: "focusout" + Ee,
            MOUSEENTER: "mouseenter" + Ee,
            MOUSELEAVE: "mouseleave" + Ee
        }, Oe = "fade", ke = "show", Pe = ".tooltip-inner", je = ".arrow", He = "hover", Le = "focus", Re = "click", xe = "manual", We = function () {
            function i(t, e) {
                if ("undefined" == typeof h) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }

            var t = i.prototype;
            return t.enable = function () {
                this._isEnabled = !0
            }, t.disable = function () {
                this._isEnabled = !1
            }, t.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function (t) {
                if (this._isEnabled) if (t) {
                    var e = this.constructor.DATA_KEY, n = pe(t.currentTarget).data(e);
                    n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), pe(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                } else {
                    if (pe(this.getTipElement()).hasClass(ke)) return void this._leave(null, this);
                    this._enter(null, this)
                }
            }, t.dispose = function () {
                clearTimeout(this._timeout), pe.removeData(this.element, this.constructor.DATA_KEY), pe(this.element).off(this.constructor.EVENT_KEY), pe(this.element).closest(".modal").off("hide.bs.modal"), this.tip && pe(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function () {
                var e = this;
                if ("none" === pe(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = pe.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    pe(this.element).trigger(t);
                    var n = pe.contains(this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !n) return;
                    var i = this.getTipElement(), r = Fn.getUID(this.constructor.NAME);
                    i.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && pe(i).addClass(Oe);
                    var o = "function" == typeof this.config.placement ? this.config.placement.call(this, i, this.element) : this.config.placement,
                        s = this._getAttachment(o);
                    this.addAttachmentClass(s);
                    var a = !1 === this.config.container ? document.body : pe(document).find(this.config.container);
                    pe(i).data(this.constructor.DATA_KEY, this), pe.contains(this.element.ownerDocument.documentElement, this.tip) || pe(i).appendTo(a), pe(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new h(this.element, i, {
                        placement: s,
                        modifiers: {
                            offset: {offset: this.config.offset},
                            flip: {behavior: this.config.fallbackPlacement},
                            arrow: {element: je},
                            preventOverflow: {boundariesElement: this.config.boundary}
                        },
                        onCreate: function (t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function (t) {
                            e._handlePopperPlacementChange(t)
                        }
                    }), pe(i).addClass(ke), "ontouchstart" in document.documentElement && pe(document.body).children().on("mouseover", null, pe.noop);
                    var l = function () {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, pe(e.element).trigger(e.constructor.Event.SHOWN), t === we && e._leave(null, e)
                    };
                    if (pe(this.tip).hasClass(Oe)) {
                        var c = Fn.getTransitionDurationFromElement(this.tip);
                        pe(this.tip).one(Fn.TRANSITION_END, l).emulateTransitionEnd(c)
                    } else l()
                }
            }, t.hide = function (t) {
                var e = this, n = this.getTipElement(), i = pe.Event(this.constructor.Event.HIDE), r = function () {
                    e._hoverState !== De && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), pe(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                };
                if (pe(this.element).trigger(i), !i.isDefaultPrevented()) {
                    if (pe(n).removeClass(ke), "ontouchstart" in document.documentElement && pe(document.body).children().off("mouseover", null, pe.noop), this._activeTrigger[Re] = !1, this._activeTrigger[Le] = !1, this._activeTrigger[He] = !1, pe(this.tip).hasClass(Oe)) {
                        var o = Fn.getTransitionDurationFromElement(n);
                        pe(n).one(Fn.TRANSITION_END, r).emulateTransitionEnd(o)
                    } else r();
                    this._hoverState = ""
                }
            }, t.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function () {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function (t) {
                pe(this.getTipElement()).addClass(Te + "-" + t)
            }, t.getTipElement = function () {
                return this.tip = this.tip || pe(this.config.template)[0], this.tip
            }, t.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(pe(t.querySelectorAll(Pe)), this.getTitle()), pe(t).removeClass(Oe + " " + ke)
            }, t.setElementContent = function (t, e) {
                var n = this.config.html;
                "object" == typeof e && (e.nodeType || e.jquery) ? n ? pe(e).parent().is(t) || t.empty().append(e) : t.text(pe(e).text()) : t[n ? "html" : "text"](e)
            }, t.getTitle = function () {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, t._getAttachment = function (t) {
                return Ie[t.toUpperCase()]
            }, t._setListeners = function () {
                var i = this;
                this.config.trigger.split(" ").forEach(function (t) {
                    if ("click" === t) pe(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (t) {
                        return i.toggle(t)
                    }); else if (t !== xe) {
                        var e = t === He ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                            n = t === He ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                        pe(i.element).on(e, i.config.selector, function (t) {
                            return i._enter(t)
                        }).on(n, i.config.selector, function (t) {
                            return i._leave(t)
                        })
                    }
                    pe(i.element).closest(".modal").on("hide.bs.modal", function () {
                        return i.hide()
                    })
                }), this.config.selector ? this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function () {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || pe(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), pe(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Le : He] = !0), pe(e.getTipElement()).hasClass(ke) || e._hoverState === De ? e._hoverState = De : (clearTimeout(e._timeout), e._hoverState = De, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
                    e._hoverState === De && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || pe(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), pe(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Le : He] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = we, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
                    e._hoverState === we && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function () {
                for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
                return !1
            }, t._getConfig = function (t) {
                return "number" == typeof (t = l({}, this.constructor.Default, pe(this.element).data(), "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), Fn.typeCheckConfig(ve, t, this.constructor.DefaultType), t
            }, t._getDelegateConfig = function () {
                var t = {};
                if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function () {
                var t = pe(this.getTipElement()), e = t.attr("class").match(be);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function (t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function () {
                var t = this.getTipElement(), e = this.config.animation;
                null === t.getAttribute("x-placement") && (pe(t).removeClass(Oe), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = pe(this).data(ye), e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), pe(this).data(ye, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }, {
                key: "Default", get: function () {
                    return Ae
                }
            }, {
                key: "NAME", get: function () {
                    return ve
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return ye
                }
            }, {
                key: "Event", get: function () {
                    return Ne
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return Ee
                }
            }, {
                key: "DefaultType", get: function () {
                    return Se
                }
            }]), i
        }(), pe.fn[ve] = We._jQueryInterface, pe.fn[ve].Constructor = We, pe.fn[ve].noConflict = function () {
            return pe.fn[ve] = Ce, We._jQueryInterface
        }, We),
        Jn = (qe = "popover", Ke = "." + (Fe = "bs.popover"), Me = (Ue = e).fn[qe], Qe = "bs-popover", Be = new RegExp("(^|\\s)" + Qe + "\\S+", "g"), Ve = l({}, zn.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), Ye = l({}, zn.DefaultType, {content: "(string|element|function)"}), ze = "fade", Ze = ".popover-header", Ge = ".popover-body", $e = {
            HIDE: "hide" + Ke,
            HIDDEN: "hidden" + Ke,
            SHOW: (Je = "show") + Ke,
            SHOWN: "shown" + Ke,
            INSERTED: "inserted" + Ke,
            CLICK: "click" + Ke,
            FOCUSIN: "focusin" + Ke,
            FOCUSOUT: "focusout" + Ke,
            MOUSEENTER: "mouseenter" + Ke,
            MOUSELEAVE: "mouseleave" + Ke
        }, Xe = function (t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this
            }

            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var r = i.prototype;
            return r.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, r.addAttachmentClass = function (t) {
                Ue(this.getTipElement()).addClass(Qe + "-" + t)
            }, r.getTipElement = function () {
                return this.tip = this.tip || Ue(this.config.template)[0], this.tip
            }, r.setContent = function () {
                var t = Ue(this.getTipElement());
                this.setElementContent(t.find(Ze), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(Ge), e), t.removeClass(ze + " " + Je)
            }, r._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function () {
                var t = Ue(this.getTipElement()), e = t.attr("class").match(Be);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = Ue(this).data(Fe), e = "object" == typeof n ? n : null;
                    if ((t || !/destroy|hide/.test(n)) && (t || (t = new i(this, e), Ue(this).data(Fe, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }, {
                key: "Default", get: function () {
                    return Ve
                }
            }, {
                key: "NAME", get: function () {
                    return qe
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return Fe
                }
            }, {
                key: "Event", get: function () {
                    return $e
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return Ke
                }
            }, {
                key: "DefaultType", get: function () {
                    return Ye
                }
            }]), i
        }(zn), Ue.fn[qe] = Xe._jQueryInterface, Ue.fn[qe].Constructor = Xe, Ue.fn[qe].noConflict = function () {
            return Ue.fn[qe] = Me, Xe._jQueryInterface
        }, Xe), Zn = (en = "scrollspy", rn = "." + (nn = "bs.scrollspy"), on = (tn = e).fn[en], sn = {
            offset: 10,
            method: "auto",
            target: ""
        }, an = {offset: "number", method: "string", target: "(string|element)"}, ln = {
            ACTIVATE: "activate" + rn,
            SCROLL: "scroll" + rn,
            LOAD_DATA_API: "load" + rn + ".data-api"
        }, cn = "dropdown-item", hn = "active", un = '[data-spy="scroll"]', fn = ".active", dn = ".nav, .list-group", gn = ".nav-link", _n = ".nav-item", mn = ".list-group-item", pn = ".dropdown", vn = ".dropdown-item", yn = ".dropdown-toggle", En = "offset", Cn = "position", Tn = function () {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + gn + "," + this._config.target + " " + mn + "," + this._config.target + " " + vn, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, tn(this._scrollElement).on(ln.SCROLL, function (t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }

            var t = n.prototype;
            return t.refresh = function () {
                var e = this, t = this._scrollElement === this._scrollElement.window ? En : Cn,
                    r = "auto" === this._config.method ? t : this._config.method, o = r === Cn ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                    var e, n = Fn.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [tn(e)[r]().top + o, n]
                    }
                    return null
                }).filter(function (t) {
                    return t
                }).sort(function (t, e) {
                    return t[0] - e[0]
                }).forEach(function (t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function () {
                tn.removeData(this._element, nn), tn(this._scrollElement).off(rn), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function (t) {
                if ("string" != typeof (t = l({}, sn, "object" == typeof t && t ? t : {})).target) {
                    var e = tn(t.target).attr("id");
                    e || (e = Fn.getUID(en), tn(t.target).attr("id", e)), t.target = "#" + e
                }
                return Fn.typeCheckConfig(en, t, an), t
            }, t._getScrollTop = function () {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function () {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function () {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function () {
                var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var r = this._offsets.length; r--;) {
                        this._activeTarget !== this._targets[r] && t >= this._offsets[r] && ("undefined" == typeof this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
                    }
                }
            }, t._activate = function (e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",");
                t = t.map(function (t) {
                    return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                });
                var n = tn([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass(cn) ? (n.closest(pn).find(yn).addClass(hn), n.addClass(hn)) : (n.addClass(hn), n.parents(dn).prev(gn + ", " + mn).addClass(hn), n.parents(dn).prev(_n).children(gn).addClass(hn)), tn(this._scrollElement).trigger(ln.ACTIVATE, {relatedTarget: e})
            }, t._clear = function () {
                var t = [].slice.call(document.querySelectorAll(this._selector));
                tn(t).filter(fn).removeClass(hn)
            }, n._jQueryInterface = function (e) {
                return this.each(function () {
                    var t = tn(this).data(nn);
                    if (t || (t = new n(this, "object" == typeof e && e), tn(this).data(nn, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }, {
                key: "Default", get: function () {
                    return sn
                }
            }]), n
        }(), tn(window).on(ln.LOAD_DATA_API, function () {
            for (var t = [].slice.call(document.querySelectorAll(un)), e = t.length; e--;) {
                var n = tn(t[e]);
                Tn._jQueryInterface.call(n, n.data())
            }
        }), tn.fn[en] = Tn._jQueryInterface, tn.fn[en].Constructor = Tn, tn.fn[en].noConflict = function () {
            return tn.fn[en] = on, Tn._jQueryInterface
        }, Tn), Gn = (In = "." + (Sn = "bs.tab"), An = (bn = e).fn.tab, Dn = {
            HIDE: "hide" + In,
            HIDDEN: "hidden" + In,
            SHOW: "show" + In,
            SHOWN: "shown" + In,
            CLICK_DATA_API: "click" + In + ".data-api"
        }, wn = "dropdown-menu", Nn = "active", On = "disabled", kn = "fade", Pn = "show", jn = ".dropdown", Hn = ".nav, .list-group", Ln = ".active", Rn = "> li > .active", xn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', Wn = ".dropdown-toggle", Un = "> .dropdown-menu .active", qn = function () {
            function i(t) {
                this._element = t
            }

            var t = i.prototype;
            return t.show = function () {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && bn(this._element).hasClass(Nn) || bn(this._element).hasClass(On))) {
                    var t, i, e = bn(this._element).closest(Hn)[0], r = Fn.getSelectorFromElement(this._element);
                    if (e) {
                        var o = "UL" === e.nodeName ? Rn : Ln;
                        i = (i = bn.makeArray(bn(e).find(o)))[i.length - 1]
                    }
                    var s = bn.Event(Dn.HIDE, {relatedTarget: this._element}), a = bn.Event(Dn.SHOW, {relatedTarget: i});
                    if (i && bn(i).trigger(s), bn(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        r && (t = document.querySelector(r)), this._activate(this._element, e);
                        var l = function () {
                            var t = bn.Event(Dn.HIDDEN, {relatedTarget: n._element}),
                                e = bn.Event(Dn.SHOWN, {relatedTarget: i});
                            bn(i).trigger(t), bn(n._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, t.dispose = function () {
                bn.removeData(this._element, Sn), this._element = null
            }, t._activate = function (t, e, n) {
                var i = this, r = ("UL" === e.nodeName ? bn(e).find(Rn) : bn(e).children(Ln))[0],
                    o = n && r && bn(r).hasClass(kn), s = function () {
                        return i._transitionComplete(t, r, n)
                    };
                if (r && o) {
                    var a = Fn.getTransitionDurationFromElement(r);
                    bn(r).one(Fn.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, t._transitionComplete = function (t, e, n) {
                if (e) {
                    bn(e).removeClass(Pn + " " + Nn);
                    var i = bn(e.parentNode).find(Un)[0];
                    i && bn(i).removeClass(Nn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (bn(t).addClass(Nn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), Fn.reflow(t), bn(t).addClass(Pn), t.parentNode && bn(t.parentNode).hasClass(wn)) {
                    var r = bn(t).closest(jn)[0];
                    if (r) {
                        var o = [].slice.call(r.querySelectorAll(Wn));
                        bn(o).addClass(Nn)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = bn(this), e = t.data(Sn);
                    if (e || (e = new i(this), t.data(Sn, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.1.3"
                }
            }]), i
        }(), bn(document).on(Dn.CLICK_DATA_API, xn, function (t) {
            t.preventDefault(), qn._jQueryInterface.call(bn(this), "show")
        }), bn.fn.tab = qn._jQueryInterface, bn.fn.tab.Constructor = qn, bn.fn.tab.noConflict = function () {
            return bn.fn.tab = An, qn._jQueryInterface
        }, qn);
    !function (t) {
        if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(e), t.Util = Fn, t.Alert = Kn, t.Button = Mn, t.Carousel = Qn, t.Collapse = Bn, t.Dropdown = Vn, t.Modal = Yn, t.Popover = Jn, t.Scrollspy = Zn, t.Tab = Gn, t.Tooltip = zn, Object.defineProperty(t, "__esModule", {value: !0})
});
!function (t, e, n, o) {
    "use strict";

    function a(t, e) {
        var o, a, i, s = [], r = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(), e = e || {}, t && t.data && (e = p(t.data.options, e)), o = e.$target || n(t.currentTarget).trigger("blur"), i = n.fancybox.getInstance(), i && i.$trigger && i.$trigger.is(o) || (e.selector ? s = n(e.selector) : (a = o.attr("data-fancybox") || "", a ? (s = t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + a + '"]') : n('[data-fancybox="' + a + '"]')) : s = [o]), r = n(s).index(o), r < 0 && (r = 0), i = n.fancybox.open(s, e, r), i.$trigger = o))
    }

    if (t.console = t.console || {
        info: function (t) {
        }
    }, n) {
        if (n.fn.fancybox) return void console.info("fancyBox already initialized");
        var i = {
            closeExisting: !1,
            loop: !1,
            gutter: 50,
            keyboard: !0,
            arrows: !0,
            infobar: !0,
            smallBtn: "auto",
            toolbar: "auto",
            buttons: ["zoom", "slideShow", "thumbs", "close"],
            idleTime: 3,
            protect: !1,
            modal: !1,
            image: {preload: !1},
            ajax: {settings: {data: {fancybox: !0}}},
            iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen allow="fullscreen autoplay" src=""></iframe>',
                preload: !0,
                css: {},
                attr: {scrolling: "auto"}
            },
            video: {
                tpl: '<video class="fancybox-video" controls controlsList="nodownload"><source src="{{src}}" type="{{format}}" />Your browser doesn\'t support HTML5 video</video>',
                format: "",
                autoStart: !0
            },
            defaultType: "image",
            animationEffect: "zoom",
            animationDuration: 366,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
            btnTpl: {
                download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
            },
            parentEl: "body",
            hideScrollbar: !0,
            autoFocus: !0,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: {autoStart: !1},
            touch: {vertical: !0, momentum: !0},
            hash: null,
            media: {},
            slideShow: {autoStart: !1, speed: 3e3},
            thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"},
            wheel: "auto",
            onInit: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop,
            onActivate: n.noop,
            onDeactivate: n.noop,
            clickContent: function (t, e) {
                return "image" === t.type && "zoom"
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
                idleTime: !1, clickContent: function (t, e) {
                    return "image" === t.type && "toggleControls"
                }, clickSlide: function (t, e) {
                    return "image" === t.type ? "toggleControls" : "close"
                }, dblclickContent: function (t, e) {
                    return "image" === t.type && "zoom"
                }, dblclickSlide: function (t, e) {
                    return "image" === t.type && "zoom"
                }
            },
            lang: "en",
            i18n: {
                en: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Full screen",
                    THUMBS: "Thumbnails",
                    DOWNLOAD: "Download",
                    SHARE: "Share",
                    ZOOM: "Zoom"
                },
                de: {
                    CLOSE: "Schliessen",
                    NEXT: "Weiter",
                    PREV: "Zurück",
                    ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                    PLAY_START: "Diaschau starten",
                    PLAY_STOP: "Diaschau beenden",
                    FULL_SCREEN: "Vollbild",
                    THUMBS: "Vorschaubilder",
                    DOWNLOAD: "Herunterladen",
                    SHARE: "Teilen",
                    ZOOM: "Maßstab"
                }
            }
        }, s = n(t), r = n(e), c = 0, l = function (t) {
            return t && t.hasOwnProperty && t instanceof n
        }, d = function () {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }(), u = function () {
            var t, n = e.createElement("fakeelement"), a = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in a) if (n.style[t] !== o) return a[t];
            return "transitionend"
        }(), f = function (t) {
            return t && t.length && t[0].offsetHeight
        }, p = function (t, e) {
            var o = n.extend(!0, {}, t, e);
            return n.each(e, function (t, e) {
                n.isArray(e) && (o[t] = e)
            }), o
        }, h = function (o) {
            for (var a, i = o[0], s = i.getBoundingClientRect(), r = [], c = n(t).height(), l = n(e).scrollTop(), d = s.top + l, u = l - d, f = d + s.height - (l + c); null !== i.parentElement;) "hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || r.push(i.parentElement.getBoundingClientRect()), i = i.parentElement;
            return a = r.every(function (t) {
                var e = Math.min(s.right, t.right) - Math.max(s.left, t.left),
                    n = Math.min(s.bottom, t.bottom) - Math.max(s.top, t.top);
                return e > 0 && n > 0
            }), !a || l > d + s.height || d > l + c ? 0 : u > 0 ? 100 - 100 * u / s.height : f > 0 ? 100 - 100 * f / s.height : 100
        }, g = function (t, e, o) {
            var a = this;
            a.opts = p({index: o}, n.fancybox.defaults), n.isPlainObject(e) && (a.opts = p(a.opts, e)), n.fancybox.isMobile && (a.opts = p(a.opts, a.opts.mobile)), a.id = a.opts.id || ++c, a.currIndex = parseInt(a.opts.index, 10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = !0, a.group = [], a.slides = {}, a.addContent(t), a.group.length && a.init()
        };
        n.extend(g.prototype, {
            init: function () {
                var o, a, i = this, s = i.group[i.currIndex], r = s.opts;
                r.closeExisting && n.fancybox.close(!0), n("body").addClass("fancybox-active"), !n.fancybox.getInstance() && r.hideScrollbar !== !1 && !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (t.innerWidth - e.documentElement.clientWidth) + "px;}</style>"), n("body").addClass("compensate-for-scrollbar")), a = "", n.each(r.buttons, function (t, e) {
                    a += r.btnTpl[e] || ""
                }), o = n(i.translate(i, r.baseTpl.replace("{{buttons}}", a).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight))).attr("id", "fancybox-container-" + i.id).addClass(r.baseClass).data("FancyBox", i).appendTo(r.parentEl), i.$refs = {container: o}, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (t) {
                    i.$refs[t] = o.find(".fancybox-" + t)
                }), i.trigger("onInit"), i.activate(), i.jumpTo(i.currIndex)
            }, translate: function (t, e) {
                var n = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                    var a = n[e];
                    return a === o ? t : a
                })
            }, addContent: function (t) {
                var e, a = this, i = n.makeArray(t);
                n.each(i, function (t, e) {
                    var i, s, r, c, l, d = {}, u = {};
                    n.isPlainObject(e) ? (d = e, u = e.opts || e) : "object" === n.type(e) && n(e).length ? (i = n(e), u = i.data() || {}, u = n.extend(!0, {}, u, u.options), u.$orig = i, d.src = a.opts.src || u.src || i.attr("href"), d.type || d.src || (d.type = "inline", d.src = e)) : d = {
                        type: "html",
                        src: e + ""
                    }, d.opts = n.extend(!0, {}, a.opts, u), n.isArray(u.buttons) && (d.opts.buttons = u.buttons), n.fancybox.isMobile && d.opts.mobile && (d.opts = p(d.opts, d.opts.mobile)), s = d.type || d.opts.type, c = d.src || "", !s && c && ((r = c.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (s = "video", d.opts.video.format || (d.opts.video.format = "video/" + ("ogv" === r[1] ? "ogg" : r[1]))) : c.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : c.match(/\.(pdf)((\?|#).*)?$/i) ? s = "iframe" : "#" === c.charAt(0) && (s = "inline")), s ? d.type = s : a.trigger("objectNeedsType", d), d.contentType || (d.contentType = n.inArray(d.type, ["html", "inline", "ajax"]) > -1 ? "html" : d.type), d.index = a.group.length, "auto" == d.opts.smallBtn && (d.opts.smallBtn = n.inArray(d.type, ["html", "inline", "ajax"]) > -1), "auto" === d.opts.toolbar && (d.opts.toolbar = !d.opts.smallBtn), d.opts.$trigger && d.index === a.opts.index && (d.opts.$thumb = d.opts.$trigger.find("img:first"), d.opts.$thumb.length && (d.opts.$orig = d.opts.$trigger)), d.opts.$thumb && d.opts.$thumb.length || !d.opts.$orig || (d.opts.$thumb = d.opts.$orig.find("img:first")), "function" === n.type(d.opts.caption) && (d.opts.caption = d.opts.caption.apply(e, [a, d])), "function" === n.type(a.opts.caption) && (d.opts.caption = a.opts.caption.apply(e, [a, d])), d.opts.caption instanceof n || (d.opts.caption = d.opts.caption === o ? "" : d.opts.caption + ""), "ajax" === d.type && (l = c.split(/\s+/, 2), l.length > 1 && (d.src = l.shift(), d.opts.filter = l.shift())), d.opts.modal && (d.opts = n.extend(!0, d.opts, {
                        trapFocus: !0,
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), a.group.push(d)
                }), Object.keys(a.slides).length && (a.updateControls(), e = a.Thumbs, e && e.isActive && (e.create(), e.focus()))
            }, addEvents: function () {
                var e = this;
                e.removeEvents(), e.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
                    t.stopPropagation(), t.preventDefault(), e.close(t)
                }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (t) {
                    t.stopPropagation(), t.preventDefault(), e.previous()
                }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (t) {
                    t.stopPropagation(), t.preventDefault(), e.next()
                }).on("click.fb", "[data-fancybox-zoom]", function (t) {
                    e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                }), s.on("orientationchange.fb resize.fb", function (t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? d(function () {
                        e.update()
                    }) : (e.current && "iframe" === e.current.type && e.$refs.stage.hide(), setTimeout(function () {
                        e.$refs.stage.show(), e.update()
                    }, n.fancybox.isMobile ? 600 : 250))
                }), r.on("keydown.fb", function (t) {
                    var o = n.fancybox ? n.fancybox.getInstance() : null, a = o.current, i = t.keyCode || t.which;
                    if (9 == i) return void (a.opts.trapFocus && e.focus(t));
                    if (!(!a.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input") || n(t.target).is("textarea"))) return 8 === i || 27 === i ? (t.preventDefault(), void e.close(t)) : 37 === i || 38 === i ? (t.preventDefault(), void e.previous()) : 39 === i || 40 === i ? (t.preventDefault(), void e.next()) : void e.trigger("afterKeydown", t, i)
                }), e.group[e.currIndex].opts.idleTime && (e.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (t) {
                    e.idleSecondsCounter = 0, e.isIdle && e.showControls(), e.isIdle = !1
                }), e.idleInterval = t.setInterval(function () {
                    e.idleSecondsCounter++, e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime && !e.isDragging && (e.isIdle = !0, e.idleSecondsCounter = 0, e.hideControls())
                }, 1e3))
            }, removeEvents: function () {
                var e = this;
                s.off("orientationchange.fb resize.fb"), r.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
            }, previous: function (t) {
                return this.jumpTo(this.currPos - 1, t)
            }, next: function (t) {
                return this.jumpTo(this.currPos + 1, t)
            }, jumpTo: function (t, e) {
                var a, i, s, r, c, l, u, p, h = this, g = h.group.length;
                if (!(h.isDragging || h.isClosing || h.isAnimating && h.firstRun)) {
                    if (t = parseInt(t, 10), s = h.current ? h.current.opts.loop : h.opts.loop, !s && (t < 0 || t >= g)) return !1;
                    if (a = h.firstRun = !Object.keys(h.slides).length, c = h.current, h.prevIndex = h.currIndex, h.prevPos = h.currPos, r = h.createSlide(t), g > 1 && ((s || r.index < g - 1) && h.createSlide(t + 1), (s || r.index > 0) && h.createSlide(t - 1)), h.current = r, h.currIndex = r.index, h.currPos = r.pos, h.trigger("beforeShow", a), h.updateControls(), r.forcedDuration = o, n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[a ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), i = h.isMoved(c), r.$slide.addClass("fancybox-slide--current"), a) return r.opts.animationEffect && e && h.$refs.container.css("transition-duration", e + "ms"), h.$refs.container.addClass("fancybox-is-open").trigger("focus"), h.loadSlide(r), void h.preload("image");
                    l = n.fancybox.getTranslate(c.$slide), u = n.fancybox.getTranslate(h.$refs.stage), n.each(h.slides, function (t, e) {
                        n.fancybox.stop(e.$slide, !0)
                    }), c.pos !== r.pos && (c.isComplete = !1, c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current")), i ? (p = l.left - (c.pos * l.width + c.pos * c.opts.gutter), n.each(h.slides, function (t, o) {
                        var a = o.pos * l.width + o.pos * o.opts.gutter;
                        n.fancybox.setTranslate(o.$slide, {
                            top: 0,
                            left: a + p - u.left
                        }), o.pos !== r.pos && o.$slide.addClass("fancybox-slide--" + (o.pos > r.pos ? "next" : "previous")), f(o.$slide), d(function () {
                            n.fancybox.animate(o.$slide, {
                                top: 0,
                                left: (o.pos - r.pos) * l.width + (o.pos - r.pos) * o.opts.gutter
                            }, e, function () {
                                o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === h.currPos && h.complete()
                            })
                        })
                    })) : (r.$slide.parent().children().removeAttr("style"), e && r.opts.transitionEffect && n.fancybox.animate(c.$slide, "fancybox-animated fancybox-slide--" + (c.pos > r.pos ? "next" : "previous") + " fancybox-fx-" + r.opts.transitionEffect, e, null, !1)), r.isLoaded ? h.revealContent(r) : h.loadSlide(r), h.preload("image")
                }
            }, createSlide: function (t) {
                var e, o, a = this;
                return o = t % a.group.length, o = o < 0 ? a.group.length + o : o, !a.slides[t] && a.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(a.$refs.stage), a.slides[t] = n.extend(!0, {}, a.group[o], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }), a.updateSlide(a.slides[t])), a.slides[t]
            }, scaleToActual: function (t, e, a) {
                var i, s, r, c, l, d = this, u = d.current, f = u.$content, p = n.fancybox.getTranslate(u.$slide).width,
                    h = n.fancybox.getTranslate(u.$slide).height, g = u.width, b = u.height;
                !d.isAnimating && f && "image" == u.type && u.isLoaded && !u.hasError && (n.fancybox.stop(f), d.isAnimating = !0, t = t === o ? .5 * p : t, e = e === o ? .5 * h : e, i = n.fancybox.getTranslate(f), i.top -= n.fancybox.getTranslate(u.$slide).top, i.left -= n.fancybox.getTranslate(u.$slide).left, c = g / i.width, l = b / i.height, s = .5 * p - .5 * g, r = .5 * h - .5 * b, g > p && (s = i.left * c - (t * c - t), s > 0 && (s = 0), s < p - g && (s = p - g)), b > h && (r = i.top * l - (e * l - e), r > 0 && (r = 0), r < h - b && (r = h - b)), d.updateCursor(g, b), n.fancybox.animate(f, {
                    top: r,
                    left: s,
                    scaleX: c,
                    scaleY: l
                }, a || 330, function () {
                    d.isAnimating = !1
                }), d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
            }, scaleToFit: function (t) {
                var e, o = this, a = o.current, i = a.$content;
                !o.isAnimating && i && "image" == a.type && a.isLoaded && !a.hasError && (n.fancybox.stop(i), o.isAnimating = !0, e = o.getFitPos(a), o.updateCursor(e.width, e.height), n.fancybox.animate(i, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / i.width(),
                    scaleY: e.height / i.height()
                }, t || 330, function () {
                    o.isAnimating = !1
                }))
            }, getFitPos: function (t) {
                var e, o, a, i, s = this, r = t.$content, c = t.$slide, l = t.width || t.opts.width,
                    d = t.height || t.opts.height, u = {};
                return !!(t.isLoaded && r && r.length) && (e = n.fancybox.getTranslate(s.$refs.stage).width, o = n.fancybox.getTranslate(s.$refs.stage).height, e -= parseFloat(c.css("paddingLeft")) + parseFloat(c.css("paddingRight")) + parseFloat(r.css("marginLeft")) + parseFloat(r.css("marginRight")), o -= parseFloat(c.css("paddingTop")) + parseFloat(c.css("paddingBottom")) + parseFloat(r.css("marginTop")) + parseFloat(r.css("marginBottom")), l && d || (l = e, d = o), a = Math.min(1, e / l, o / d), l = a * l, d = a * d, l > e - .5 && (l = e), d > o - .5 && (d = o), "image" === t.type ? (u.top = Math.floor(.5 * (o - d)) + parseFloat(c.css("paddingTop")), u.left = Math.floor(.5 * (e - l)) + parseFloat(c.css("paddingLeft"))) : "video" === t.contentType && (i = t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9, d > l / i ? d = l / i : l > d * i && (l = d * i)), u.width = l, u.height = d, u)
            }, update: function () {
                var t = this;
                n.each(t.slides, function (e, n) {
                    t.updateSlide(n)
                })
            }, updateSlide: function (t) {
                var e = this, o = t && t.$content, a = t.width || t.opts.width, i = t.height || t.opts.height,
                    s = t.$slide;
                o && (a || i || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(o), n.fancybox.setTranslate(o, e.getFitPos(t)), t.pos === e.currPos && (e.isAnimating = !1, e.updateCursor())), s.length && (s.trigger("refresh"), e.$refs.toolbar.toggleClass("compensate-for-scrollbar", s.get(0).scrollHeight > s.get(0).clientHeight)), e.trigger("onUpdate", t)
            }, centerSlide: function (t, e) {
                var a, i, s = this;
                s.current && (a = Math.round(t.$slide.width()), i = t.pos - s.current.pos, n.fancybox.animate(t.$slide, {
                    top: 0,
                    left: i * a + i * t.opts.gutter,
                    opacity: 1
                }, e === o ? 0 : e, function () {
                    t.$slide.siblings().removeAttr("style").removeClass("fancybox-slide--previous fancybox-slide--next"), t.isComplete || s.complete()
                }, !1))
            }, isMoved: function (t) {
                var e, o, a = t || this.current;
                return !!a && (o = n.fancybox.getTranslate(this.$refs.stage), e = n.fancybox.getTranslate(a.$slide), (Math.abs(e.top - o.top) > 0 || Math.abs(e.left - o.left) > 0) && !a.$slide.hasClass("fancybox-animated"))
            }, updateCursor: function (t, e) {
                var o, a = this, i = a.current, s = a.$refs.container;
                i && !a.isClosing && a.Guestures && (s.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = a.isZoomable(), s.toggleClass("fancybox-is-zoomable", o), n("[data-fancybox-zoom]").prop("disabled", !o), a.canPan(t, e) ? s.addClass("fancybox-can-pan") : o && ("zoom" === i.opts.clickContent || n.isFunction(i.opts.clickContent) && "zoom" == i.opts.clickContent(i)) ? s.addClass("fancybox-can-zoomIn") : i.opts.touch && (i.opts.touch.vertical || a.group.length > 1) && "video" !== i.contentType && s.addClass("fancybox-can-swipe"))
            }, isZoomable: function () {
                var t, e = this, n = e.current;
                if (n && !e.isClosing && "image" === n.type && !n.hasError) {
                    if (!n.isLoaded) return !0;
                    if (t = e.getFitPos(n), n.width > t.width || n.height > t.height) return !0
                }
                return !1
            }, isScaledDown: function (t, e) {
                var a = this, i = !1, s = a.current, r = s.$content;
                return t !== o && e !== o ? i = t < s.width && e < s.height : r && (i = n.fancybox.getTranslate(r), i = i.width < s.width && i.height < s.height), i
            }, canPan: function (t, e) {
                var a, i, s = this, r = !1, c = s.current;
                return "image" === c.type && (a = c.$content) && !c.hasError && (r = s.getFitPos(c), i = t !== o && e !== o ? {
                    width: t,
                    height: e
                } : n.fancybox.getTranslate(a), r = Math.abs(i.width - r.width) > 1.5 || Math.abs(i.height - r.height) > 1.5), r
            }, loadSlide: function (t) {
                var e, o, a, i = this;
                if (!t.isLoading && !t.isLoaded) {
                    if (t.isLoading = !0, i.trigger("beforeLoad", t) === !1) return t.isLoading = !1, !1;
                    switch (e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
                        case"image":
                            i.setImage(t);
                            break;
                        case"iframe":
                            i.setIframe(t);
                            break;
                        case"html":
                            i.setContent(t, t.src || t.content);
                            break;
                        case"video":
                            i.setContent(t, t.opts.video.tpl.replace("{{src}}", t.src).replace("{{format}}", t.opts.videoFormat || t.opts.video.format));
                            break;
                        case"inline":
                            n(t.src).length ? i.setContent(t, n(t.src)) : i.setError(t);
                            break;
                        case"ajax":
                            i.showLoading(t), a = n.ajax(n.extend({}, t.opts.ajax.settings, {
                                url: t.src,
                                success: function (e, n) {
                                    "success" === n && i.setContent(t, e)
                                },
                                error: function (e, n) {
                                    e && "abort" !== n && i.setError(t)
                                }
                            })), o.one("onReset", function () {
                                a.abort()
                            });
                            break;
                        default:
                            i.setError(t)
                    }
                    return !0
                }
            }, setImage: function (e) {
                var o, a, i, s, r, c = this, l = e.opts.srcset || e.opts.image.srcset;
                if (d(function () {
                    d(function () {
                        var t = e.$image;
                        c.isClosing || !e.isLoading || t && t.length && t[0].complete || e.hasError || c.showLoading(e)
                    })
                }), l) {
                    s = t.devicePixelRatio || 1, r = t.innerWidth * s, i = l.split(",").map(function (t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function (t, n) {
                            var o = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === n ? e.url = t : void (o && (e.value = o, e.postfix = t[t.length - 1]))
                        }), e
                    }), i.sort(function (t, e) {
                        return t.value - e.value
                    });
                    for (var u = 0; u < i.length; u++) {
                        var f = i[u];
                        if ("w" === f.postfix && f.value >= r || "x" === f.postfix && f.value >= s) {
                            a = f;
                            break
                        }
                    }
                    !a && i.length && (a = i[i.length - 1]), a && (e.src = a.url, e.width && e.height && "w" == a.postfix && (e.height = e.width / e.height * a.value, e.width = a.value), e.opts.srcset = l)
                }
                e.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")), o = e.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), e.opts.preload !== !1 && e.opts.width && e.opts.height && o && (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function () {
                    n(this).remove(), e.$ghost = null
                }).one("load", function () {
                    c.afterLoad(e)
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", o)), c.setBigImage(e)
            }, setBigImage: function (t) {
                var e = this, o = n("<img />");
                t.$image = o.one("error", function () {
                    e.setError(t)
                }).one("load", function () {
                    var n;
                    t.$ghost || (e.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight), e.afterLoad(t)), e.isClosing || (t.opts.srcset && (n = t.opts.sizes, n && "auto" !== n || (n = (t.width / t.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"), o.attr("sizes", n).attr("srcset", t.opts.srcset)), t.$ghost && setTimeout(function () {
                        t.$ghost && !e.isClosing && t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))), e.hideLoading(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (o[0].complete || "complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o.trigger("load") : o[0].error && o.trigger("error")
            }, resolveImageSlideSize: function (t, e, n) {
                var o = parseInt(t.opts.width, 10), a = parseInt(t.opts.height, 10);
                t.width = e, t.height = n, o > 0 && (t.width = o, t.height = Math.floor(o * n / e)), a > 0 && (t.width = Math.floor(a * e / n), t.height = a)
            }, setIframe: function (t) {
                var e, a = this, i = t.opts.iframe, s = t.$slide;
                t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(s), s.addClass("fancybox-slide--" + t.contentType), t.$iframe = e = n(i.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(i.attr).appendTo(t.$content), i.preload ? (a.showLoading(t), e.on("load.fb error.fb", function (e) {
                    this.isReady = 1, t.$slide.trigger("refresh"), a.afterLoad(t)
                }), s.on("refresh.fb", function () {
                    var n, a, r = t.$content, c = i.css.width, l = i.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            n = e.contents(), a = n.find("body")
                        } catch (t) {
                        }
                        a && a.length && a.children().length && (s.css("overflow", "visible"), r.css({
                            width: "100%",
                            "max-width": "100%",
                            height: "9999px"
                        }), c === o && (c = Math.ceil(Math.max(a[0].clientWidth, a.outerWidth(!0)))), r.css("width", c ? c : "").css("max-width", ""), l === o && (l = Math.ceil(Math.max(a[0].clientHeight, a.outerHeight(!0)))), r.css("height", l ? l : ""), s.css("overflow", "auto")), r.removeClass("fancybox-is-hidden")
                    }
                })) : this.afterLoad(t), e.attr("src", t.src), s.one("onReset", function () {
                    try {
                        n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                    } catch (t) {
                    }
                    n(this).off("refresh.fb").empty(), t.isLoaded = !1, t.isRevealed = !1
                })
            }, setContent: function (t, e) {
                var o = this;
                o.isClosing || (o.hideLoading(t), t.$content && n.fancybox.stop(t.$content), t.$slide.empty(), l(e) && e.parent().length ? (e.hasClass("fancybox-content") && e.parent(".fancybox-slide--html").trigger("onReset"), t.$placeholder = n("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents()), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
                    n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1, t.isRevealed = !1)
                }), n(e).appendTo(t.$slide), n(e).is("video,audio") && (n(e).addClass("fancybox-video"), n(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || n(e).attr("width"), t.opts.height = t.opts.height || n(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), t.$content.siblings().hide(), t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()), t.$content.addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), this.afterLoad(t))
            }, setError: function (t) {
                t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
            }, showLoading: function (t) {
                var e = this;
                t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn())
            }, hideLoading: function (t) {
                var e = this;
                t = t || e.current, t && t.$spinner && (t.$spinner.stop().remove(), delete t.$spinner)
            }, afterLoad: function (t) {
                var e = this;
                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.pos === e.currPos && e.updateCursor(), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
                    return 2 == t.button && t.preventDefault(), !0
                }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
            }, revealContent: function (t) {
                var e, a, i, s, r = this, c = t.$slide, l = !1, d = !1, u = r.isMoved(t), f = t.isRevealed;
                return t.isRevealed = !0, e = t.opts[r.firstRun ? "animationEffect" : "transitionEffect"], i = t.opts[r.firstRun ? "animationDuration" : "transitionDuration"], i = parseInt(t.forcedDuration === o ? i : t.forcedDuration, 10), t.pos === r.currPos && (t.isComplete || (r.isAnimating = !0)), !u && t.pos === r.currPos && i || (e = !1), "zoom" === e && (t.pos === r.currPos && i && "image" === t.type && !t.hasError && (d = r.getThumbPos(t)) ? l = r.getFitPos(t) : e = "fade"), "zoom" === e ? (l.scaleX = l.width / d.width, l.scaleY = l.height / d.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - d.width / d.height) > .1), s && (d.opacity = .1, l.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), d), void n.fancybox.animate(t.$content, l, i, function () {
                    r.isAnimating = !1, r.complete()
                })) : (r.updateSlide(t), e ? (n.fancybox.stop(c), a = "fancybox-animated fancybox-slide--" + (t.pos >= r.prevPos ? "next" : "previous") + " fancybox-fx-" + e, c.removeClass("fancybox-slide--current").addClass(a), t.$content.removeClass("fancybox-is-hidden"), c.hide().show(0), void n.fancybox.animate(c, "fancybox-slide--current", i, function () {
                    c.removeClass(a).removeAttr("style"), t.pos === r.currPos && r.complete()
                }, !0)) : (t.$content.removeClass("fancybox-is-hidden"), void (f || !u || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"))))
            }, getThumbPos: function (t) {
                var n, o = this, a = !1, i = t.opts.$thumb,
                    s = i && i.length && i[0].ownerDocument === e ? i.offset() : 0;
                return s && h(i) >= 10 && (n = o.$refs.stage.offset(), a = {
                    top: s.top - n.top + parseFloat(i.css("border-top-width") || 0),
                    left: s.left - n.left + parseFloat(i.css("border-left-width") || 0),
                    width: i.width(),
                    height: i.height(),
                    scaleX: 1,
                    scaleY: 1
                }), a
            }, complete: function () {
                var t, e = this, o = e.current, a = {};
                !e.isMoved() && o.isLoaded && (o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), e.preload("inline"), f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(e.slides, function (t, o) {
                    o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1 ? a[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
                }), e.slides = a), e.isAnimating = !1, e.updateCursor(), e.trigger("afterShow"), o.opts.video.autoStart && o.$slide.find("video,audio").filter(":visible:first").trigger("play").on("ended", n.proxy(e.next, e)), o.opts.autoFocus && "html" === o.contentType && (t = o.$content.find("input[autofocus]:enabled:visible:first"), t.length ? t.trigger("focus") : e.focus(null, !0)), o.$slide.scrollTop(0).scrollLeft(0))
            }, preload: function (t) {
                var e = this, n = e.slides[e.currPos + 1], o = e.slides[e.currPos - 1];
                o && o.type === t && e.loadSlide(o), n && n.type === t && e.loadSlide(n)
            }, focus: function (t, o) {
                var a, i, s = this,
                    r = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                s.isClosing || (a = !t && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (o ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible"), a = a.filter(r).filter(function () {
                    return "hidden" !== n(this).css("visibility") && !n(this).hasClass("disabled")
                }), a.length ? (i = a.index(e.activeElement), t && t.shiftKey ? (i < 0 || 0 == i) && (t.preventDefault(), a.eq(a.length - 1).trigger("focus")) : (i < 0 || i == a.length - 1) && (t && t.preventDefault(), a.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
            }, activate: function () {
                var t = this;
                n(".fancybox-container").each(function () {
                    var e = n(this).data("FancyBox");
                    e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
                }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
            }, close: function (t, e) {
                var o, a, i, s, r, c, l, p = this, h = p.current, g = function () {
                    p.cleanUp(t)
                };
                return !p.isClosing && (p.isClosing = !0, p.trigger("beforeClose", t) === !1 ? (p.isClosing = !1, d(function () {
                    p.update()
                }), !1) : (p.removeEvents(), i = h.$content, o = h.opts.animationEffect, a = n.isNumeric(e) ? e : o ? h.opts.animationDuration : 0, h.$slide.off(u).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), h.$slide.siblings().trigger("onReset").remove(), a && p.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), p.hideLoading(h), p.hideControls(), p.updateCursor(), "zoom" !== o || t !== !0 && i && a && "image" === h.type && !h.hasError && (l = p.getThumbPos(h)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(i), s = n.fancybox.getTranslate(i), c = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / l.width,
                    scaleY: s.height / l.height,
                    width: l.width,
                    height: l.height
                }, r = h.opts.zoomOpacity, "auto" == r && (r = Math.abs(h.width / h.height - l.width / l.height) > .1), r && (l.opacity = 0), n.fancybox.setTranslate(i, c), f(i), n.fancybox.animate(i, l, a, g), !0) : (o && a ? t === !0 ? setTimeout(g, a) : n.fancybox.animate(h.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, a, g) : g(), !0)))
            }, cleanUp: function (e) {
                var o, a, i, s = this, r = s.current.opts.$orig;
                s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", e), s.current.opts.backFocus && (r && r.length && r.is(":visible") || (r = s.$trigger), r && r.length && (a = t.scrollX, i = t.scrollY, r.trigger("focus"), n("html, body").scrollTop(i).scrollLeft(a))), s.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (n("body").removeClass("fancybox-active compensate-for-scrollbar"), n("#fancybox-style-noscroll").remove())
            }, trigger: function (t, e) {
                var o, a = Array.prototype.slice.call(arguments, 1), i = this, s = e && e.opts ? e : i.current;
                return s ? a.unshift(s) : s = i, a.unshift(i), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, a)), o === !1 ? o : void ("afterClose" !== t && i.$refs ? i.$refs.container.trigger(t + ".fb", a) : r.trigger(t + ".fb", a))
            }, updateControls: function () {
                var t = this, o = t.current, a = o.index, i = o.opts.caption, s = t.$refs.container,
                    r = t.$refs.caption;
                o.$slide.trigger("refresh"), t.$caption = i && i.length ? r.html(i) : null, t.isHiddenControls || t.isIdle || t.showControls(), s.find("[data-fancybox-count]").html(t.group.length), s.find("[data-fancybox-index]").html(a + 1), s.find("[data-fancybox-prev]").prop("disabled", !o.opts.loop && a <= 0), s.find("[data-fancybox-next]").prop("disabled", !o.opts.loop && a >= t.group.length - 1), "image" === o.type ? s.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", o.opts.image.src || o.src).show() : o.opts.toolbar && s.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), n(e.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
            }, hideControls: function () {
                this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            }, showControls: function () {
                var t = this, e = t.current ? t.current.opts : t.opts, n = t.$refs.container;
                t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-caption", !!t.$caption).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal)
            }, toggleControls: function () {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }), n.fancybox = {
            version: "3.4.2",
            defaults: i,
            getInstance: function (t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                    o = Array.prototype.slice.call(arguments, 1);
                return e instanceof g && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
            },
            open: function (t, e, n) {
                return new g(t, e, n)
            },
            close: function (t) {
                var e = this.getInstance();
                e && (e.close(), t === !0 && this.close(t))
            },
            destroy: function () {
                this.close(!0), r.add("body").off("click.fb-start", "**")
            },
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function () {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function (t) {
                var e;
                return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
                    top: e.top || 0,
                    left: e.left || 0,
                    width: e.width,
                    height: e.height,
                    opacity: parseFloat(t.css("opacity"))
                })
            },
            setTranslate: function (t, e) {
                var n = "", a = {};
                if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o ? n += " scale(" + e.scaleX + ", " + e.scaleY + ")" : e.scaleX !== o && (n += " scaleX(" + e.scaleX + ")"), n.length && (a.transform = n), e.opacity !== o && (a.opacity = e.opacity), e.width !== o && (a.width = e.width), e.height !== o && (a.height = e.height), t.css(a)
            },
            animate: function (t, e, a, i, s) {
                var r, c = this, l = !1;
                n.isFunction(a) && (i = a, a = null), n.isPlainObject(e) || t.removeAttr("style"), c.stop(t), t.on(u, function (o) {
                    (!o || !o.originalEvent || t.is(o.originalEvent.target) && "z-index" != o.originalEvent.propertyName) && (c.stop(t), l && c.setTranslate(t, l), n.isNumeric(a) && t.css("transition-duration", ""), n.isPlainObject(e) ? s === !1 && t.removeAttr("style") : s !== !0 && t.removeClass(e), n.isFunction(i) && i(o))
                }), n.isNumeric(a) && t.css("transition-duration", a + "ms"), n.isPlainObject(e) ? (e.scaleX !== o && e.scaleY !== o && (r = n.fancybox.getTranslate(t), l = n.extend({}, e, {
                    width: r.width * e.scaleX,
                    height: r.height * e.scaleY,
                    scaleX: 1,
                    scaleY: 1
                }), delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(t, e)) : t.addClass(e), t.data("timer", setTimeout(function () {
                    t.trigger("transitionend")
                }, a + 16))
            },
            stop: function (t, e) {
                t && t.length && (clearTimeout(t.data("timer")), e && t.trigger(u), t.off(u).css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
            }
        }, n.fn.fancybox = function (t) {
            var e;
            return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {options: t}, a) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, a), this
        }, r.on("click.fb-start", "[data-fancybox]", a), r.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
            n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]').eq(n(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {$trigger: n(this)})
        }), function () {
            var t = ".fancybox-button", e = "fancybox-focus", o = null;
            r.on("mousedown mouseup focus blur", t, function (a) {
                switch (a.type) {
                    case"mousedown":
                        o = n(this);
                        break;
                    case"mouseup":
                        o = null;
                        break;
                    case"focusin":
                        n(t).removeClass(e), n(this).is(o) || n(this).is("[disabled]") || n(this).addClass(e);
                        break;
                    case"focusout":
                        n(t).removeClass(e)
                }
            })
        }()
    }
}(window, document, jQuery), function (t) {
    "use strict";
    var e = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1},
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube-nocookie.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1},
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    }, n = function (e, n, o) {
        if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function (t, n) {
            e = e.replace("$" + t, n || "")
        }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
    };
    t(document).on("objectNeedsType.fb", function (o, a, i) {
        var s, r, c, l, d, u, f, p = i.src || "", h = !1;
        s = t.extend(!0, {}, e, i.opts.media), t.each(s, function (e, o) {
            if (c = p.match(o.matcher)) {
                if (h = o.type, f = e, u = {}, o.paramPlace && c[o.paramPlace]) {
                    d = c[o.paramPlace], "?" == d[0] && (d = d.substring(1)), d = d.split("&");
                    for (var a = 0; a < d.length; ++a) {
                        var s = d[a].split("=", 2);
                        2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return l = t.extend(!0, {}, o.params, i.opts[e], u), p = "function" === t.type(o.url) ? o.url.call(this, c, l, i) : n(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, i) : n(o.thumb, c), "youtube" === e ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, n, o) {
                    return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                }) : "vimeo" === e && (p = p.replace("&%23", "#")), !1
            }
        }), h ? (i.opts.thumb || i.opts.$thumb && i.opts.$thumb.length || (i.opts.thumb = r), "iframe" === h && (i.opts = t.extend(!0, i.opts, {
            iframe: {
                preload: !1,
                attr: {scrolling: "no"}
            }
        })), t.extend(i, {
            type: h,
            src: p,
            origSrc: i.src,
            contentSource: f,
            contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" : "video"
        })) : p && (i.type = i.opts.defaultType)
    });
    var o = {
        youtube: {src: "https://www.youtube.com/iframe_api", class: "YT", loading: !1, loaded: !1},
        vimeo: {src: "https://player.vimeo.com/api/player.js", class: "Vimeo", loading: !1, loaded: !1},
        load: function (t) {
            var e, n = this;
            return this[t].loaded ? void setTimeout(function () {
                n.done(t)
            }) : void (this[t].loading || (this[t].loading = !0, e = document.createElement("script"), e.type = "text/javascript", e.src = this[t].src, "youtube" === t ? window.onYouTubeIframeAPIReady = function () {
                n[t].loaded = !0, n.done(t)
            } : e.onload = function () {
                n[t].loaded = !0, n.done(t)
            }, document.body.appendChild(e)))
        },
        done: function (e) {
            var n, o, a;
            "youtube" === e && delete window.onYouTubeIframeAPIReady, n = t.fancybox.getInstance(), n && (o = n.current.$content.find("iframe"), "youtube" === e && void 0 !== YT && YT ? a = new YT.Player(o.attr("id"), {
                events: {
                    onStateChange: function (t) {
                        0 == t.data && n.next()
                    }
                }
            }) : "vimeo" === e && void 0 !== Vimeo && Vimeo && (a = new Vimeo.Player(o), a.on("ended", function () {
                n.next()
            })))
        }
    };
    t(document).on({
        "afterShow.fb": function (t, e, n) {
            e.group.length > 1 && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && o.load(n.contentSource)
        }
    })
}(jQuery), function (t, e, n) {
    "use strict";
    var o = function () {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
            return t.setTimeout(e, 1e3 / 60)
        }
    }(), a = function () {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) {
            t.clearTimeout(e)
        }
    }(), i = function (e) {
        var n = [];
        e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
        for (var o in e) e[o].pageX ? n.push({x: e[o].pageX, y: e[o].pageY}) : e[o].clientX && n.push({
            x: e[o].clientX,
            y: e[o].clientY
        });
        return n
    }, s = function (t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    }, r = function (t) {
        if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
        for (var e = 0, o = t[0].attributes, a = o.length; e < a; e++) if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
        return !1
    }, c = function (e) {
        var n = t.getComputedStyle(e)["overflow-y"], o = t.getComputedStyle(e)["overflow-x"],
            a = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
            i = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return a || i
    }, l = function (t) {
        for (var e = !1; ;) {
            if (e = c(t.get(0))) break;
            if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
        }
        return e
    }, d = function (t) {
        var e = this;
        e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
    d.prototype.destroy = function () {
        this.$container.off(".fb.touch")
    }, d.prototype.ontouchstart = function (o) {
        var a = this, c = n(o.target), d = a.instance, u = d.current, f = u.$slide, p = u.$content,
            h = "touchstart" == o.type;
        if (h && a.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && f.length && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
            if (!u || d.isAnimating || d.isClosing) return o.stopPropagation(), void o.preventDefault();
            if (a.realPoints = a.startPoints = i(o), a.startPoints.length) {
                if (u.touch && o.stopPropagation(), a.startEvent = o, a.canTap = !u.$slide.hasClass("fancybox-animated"), a.$target = c, a.$content = p, a.opts = u.opts.touch, a.isPanning = !1, a.isSwiping = !1, a.isZooming = !1, a.isScrolling = !1, a.canPan = d.canPan(), a.startTime = (new Date).getTime(), a.distanceX = a.distanceY = a.distance = 0, a.canvasWidth = Math.round(f[0].clientWidth), a.canvasHeight = Math.round(f[0].clientHeight), a.contentLastPos = null, a.contentStartPos = n.fancybox.getTranslate(a.$content) || {
                    top: 0,
                    left: 0
                }, a.sliderStartPos = a.sliderLastPos || n.fancybox.getTranslate(f), a.stagePos = n.fancybox.getTranslate(d.$refs.stage), a.sliderStartPos.top -= a.stagePos.top, a.sliderStartPos.left -= a.stagePos.left, a.contentStartPos.top -= a.stagePos.top, a.contentStartPos.left -= a.stagePos.left, n(e).off(".fb.touch").on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(a, "ontouchend")).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(a, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", a.onscroll, !0), !a.opts && !a.canPan || !c.is(a.$stage) && !a.$stage.find(c).length) return void (c.is(".fancybox-image") && o.preventDefault());
                a.isScrollable = l(c) || l(c.parent()), n.fancybox.isMobile && a.isScrollable || o.preventDefault(), (1 === a.startPoints.length || u.hasError) && (a.canPan ? (n.fancybox.stop(a.$content), a.isPanning = !0) : a.isSwiping = !0, a.$container.addClass("fancybox-is-grabbing")), 2 === a.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (a.canTap = !1, a.isSwiping = !1, a.isPanning = !1, a.isZooming = !0, n.fancybox.stop(a.$content), a.centerPointStartX = .5 * (a.startPoints[0].x + a.startPoints[1].x) - n(t).scrollLeft(), a.centerPointStartY = .5 * (a.startPoints[0].y + a.startPoints[1].y) - n(t).scrollTop(), a.percentageOfImageAtPinchPointX = (a.centerPointStartX - a.contentStartPos.left) / a.contentStartPos.width, a.percentageOfImageAtPinchPointY = (a.centerPointStartY - a.contentStartPos.top) / a.contentStartPos.height, a.startDistanceBetweenFingers = s(a.startPoints[0], a.startPoints[1]))
            }
        }
    }, d.prototype.onscroll = function (t) {
        var n = this;
        n.isScrolling = !0, e.removeEventListener("scroll", n.onscroll, !0)
    }, d.prototype.ontouchmove = function (t) {
        var e = this;
        return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling ? void (e.canTap = !1) : (e.newPoints = i(t), void ((e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && e.isSwiping === !0 || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }, d.prototype.onSwipe = function (e) {
        var i, s = this, r = s.instance, c = s.isSwiping, l = s.sliderStartPos.left || 0;
        if (c !== !0) "x" == c && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? l += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? l -= Math.pow(-s.distanceX, .8) : l += s.distanceX), s.sliderLastPos = {
            top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
            left: l
        }, s.requestId && (a(s.requestId), s.requestId = null), s.requestId = o(function () {
            s.sliderLastPos && (n.each(s.instance.slides, function (t, e) {
                var o = e.pos - s.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
                })
            }), s.$container.addClass("fancybox-is-sliding"))
        }); else if (Math.abs(s.distance) > 10) {
            if (s.canTap = !1, r.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : r.isDragging || s.opts.vertical === !1 || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (i = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = i > 45 && i < 135 ? "y" : "x"), "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable) return void (s.isScrolling = !0);
            r.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(r.slides, function (t, e) {
                var o, a;
                n.fancybox.stop(e.$slide), o = n.fancybox.getTranslate(e.$slide), a = n.fancybox.getTranslate(r.$refs.stage), e.$slide.removeAttr("style").removeClass("fancybox-animated").removeClass(function (t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                }), e.pos === r.current.pos && (s.sliderStartPos.left = o.left - a.left), n.fancybox.setTranslate(e.$slide, {
                    top: o.top - a.top,
                    left: o.left - a.left
                })
            }), r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
        }
    }, d.prototype.onPan = function () {
        var t = this;
        return s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5) ? void (t.startPoints = t.newPoints) : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && (a(t.requestId), t.requestId = null), void (t.requestId = o(function () {
            n.fancybox.setTranslate(t.$content, t.contentLastPos)
        })))
    }, d.prototype.limitMovement = function () {
        var t, e, n, o, a, i, s = this, r = s.canvasWidth, c = s.canvasHeight, l = s.distanceX, d = s.distanceY,
            u = s.contentStartPos, f = u.left, p = u.top, h = u.width, g = u.height;
        return a = h > r ? f + l : f, i = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), l > 0 && a > t && (a = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && a < n && (a = n + 1 - Math.pow(n - f - l, .8) || 0), d > 0 && i > e && (i = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && i < o && (i = o + 1 - Math.pow(o - p - d, .8) || 0), {
            top: i,
            left: a
        }
    }, d.prototype.limitPosition = function (t, e, n, o) {
        var a = this, i = a.canvasWidth, s = a.canvasHeight;
        return n > i ? (t = t > 0 ? 0 : t, t = t < i - n ? i - n : t) : t = Math.max(0, i / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
            top: e,
            left: t
        }
    }, d.prototype.onZoom = function () {
        var e = this, i = e.contentStartPos, r = i.width, c = i.height, l = i.left, d = i.top,
            u = s(e.newPoints[0], e.newPoints[1]), f = u / e.startDistanceBetweenFingers, p = Math.floor(r * f),
            h = Math.floor(c * f), g = (r - p) * e.percentageOfImageAtPinchPointX,
            b = (c - h) * e.percentageOfImageAtPinchPointY,
            m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
            v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(), y = m - e.centerPointStartX,
            x = v - e.centerPointStartY, w = l + (g + y), $ = d + (b + x), S = {top: $, left: w, scaleX: f, scaleY: f};
        e.canTap = !1, e.newWidth = p, e.newHeight = h, e.contentLastPos = S, e.requestId && (a(e.requestId), e.requestId = null), e.requestId = o(function () {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, d.prototype.ontouchend = function (t) {
        var o = this, s = o.isSwiping, r = o.isPanning, c = o.isZooming, l = o.isScrolling;
        return o.endPoints = i(t), o.dMs = Math.max((new Date).getTime() - o.startTime, 1), o.$container.removeClass("fancybox-is-grabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (a(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap ? o.onTap(t) : (o.speed = 100, o.velocityX = o.distanceX / o.dMs * .5, o.velocityY = o.distanceY / o.dMs * .5, void (r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l)))
    }, d.prototype.endSwiping = function (t, e) {
        var o = this, a = !1, i = o.instance.group.length, s = Math.abs(o.velocityX), r = Math.abs(o.distanceX),
            c = "x" == t && i > 1 && (o.dMs > 130 && r > 10 || r > 50),
            l = Math.abs(s * o.canvasWidth / o.canvasWidth) > .8 ? 366 : 500;
        o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
            top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
            opacity: 0
        }, 200), a = o.instance.close(!0, 200)) : c && o.distanceX > 0 ? a = o.instance.previous(l) : c && o.distanceX < 0 && (a = o.instance.next(l)), a !== !1 || "x" != t && "y" != t || o.instance.centerSlide(o.instance.current, 150), o.$container.removeClass("fancybox-is-sliding")
    }, d.prototype.endPanning = function () {
        var t, e, o, a = this;
        a.contentLastPos && (a.opts.momentum === !1 || a.dMs > 350 ? (t = a.contentLastPos.left, e = a.contentLastPos.top) : (t = a.contentLastPos.left + 500 * a.velocityX, e = a.contentLastPos.top + 500 * a.velocityY), o = a.limitPosition(t, e, a.contentStartPos.width, a.contentStartPos.height), o.width = a.contentStartPos.width, o.height = a.contentStartPos.height, n.fancybox.animate(a.$content, o, 330))
    }, d.prototype.endZooming = function () {
        var t, e, o, a, i = this, s = i.instance.current, r = i.newWidth, c = i.newHeight;
        i.contentLastPos && (t = i.contentLastPos.left, e = i.contentLastPos.top, a = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        }, n.fancybox.setTranslate(i.$content, a), r < i.canvasWidth && c < i.canvasHeight ? i.instance.scaleToFit(150) : r > s.width || c > s.height ? i.instance.scaleToActual(i.centerPointStartX, i.centerPointStartY, 150) : (o = i.limitPosition(t, e, r, c), n.fancybox.setTranslate(i.$content, n.fancybox.getTranslate(i.$content)), n.fancybox.animate(i.$content, o, 150)))
    }, d.prototype.onTap = function (e) {
        var o, a = this, s = n(e.target), r = a.instance, c = r.current, l = e && i(e) || a.startPoints,
            d = l[0] ? l[0].x - n(t).scrollLeft() - a.stagePos.left : 0,
            u = l[0] ? l[0].y - n(t).scrollTop() - a.stagePos.top : 0, f = function (t) {
                var o = c.opts[t];
                if (n.isFunction(o) && (o = o.apply(r, [c, e])), o) switch (o) {
                    case"close":
                        r.close(a.startEvent);
                        break;
                    case"toggleControls":
                        r.toggleControls(!0);
                        break;
                    case"next":
                        r.next();
                        break;
                    case"nextOrClose":
                        r.group.length > 1 ? r.next() : r.close(a.startEvent);
                        break;
                    case"zoom":
                        "image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(a.startEvent))
                }
            };
        if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset().left))) {
            if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) o = "Outside"; else if (s.is(".fancybox-slide")) o = "Slide"; else {
                if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
                o = "Content"
            }
            if (a.tapped) {
                if (clearTimeout(a.tapped), a.tapped = null, Math.abs(d - a.tapX) > 50 || Math.abs(u - a.tapY) > 50) return this;
                f("dblclick" + o)
            } else a.tapX = d, a.tapY = u, c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" + o] ? a.tapped = setTimeout(function () {
                a.tapped = null, f("click" + o)
            }, 500) : f("click" + o);
            return this
        }
    }, n(e).on("onActivate.fb", function (t, e) {
        e && !e.Guestures && (e.Guestures = new d(e))
    })
}(window, document, jQuery), function (t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'},
        slideShow: {autoStart: !1, speed: 3e3, progress: !0}
    });
    var n = function (t) {
        this.instance = t, this.init()
    };
    e.extend(n.prototype, {
        timer: null, isActive: !1, $button: null, init: function () {
            var t = this, n = t.instance, o = n.group[n.currIndex].opts.slideShow;
            t.$button = n.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                t.toggle()
            }), n.group.length < 2 || !o ? t.$button.hide() : o.progress && (t.$progress = e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))
        }, set: function (t) {
            var n = this, o = n.instance, a = o.current;
            a && (t === !0 || a.opts.loop || o.currIndex < o.group.length - 1) ? n.isActive && "video" !== a.contentType && (n.$progress && e.fancybox.animate(n.$progress.show(), {scaleX: 1}, a.opts.slideShow.speed), n.timer = setTimeout(function () {
                o.jumpTo((o.currIndex + 1) % o.group.length)
            }, a.opts.slideShow.speed)) : (n.stop(), o.idleSecondsCounter = 0, o.showControls())
        }, clear: function () {
            var t = this;
            clearTimeout(t.timer), t.timer = null, t.$progress && t.$progress.removeAttr("style").hide()
        }, start: function () {
            var t = this, e = t.instance.current;
            e && (t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.isActive = !0, e.isComplete && t.set(!0), t.instance.trigger("onSlideShowChange", !0))
        }, stop: function () {
            var t = this, e = t.instance.current;
            t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1, t.instance.trigger("onSlideShowChange", !1), t.$progress && t.$progress.removeAttr("style").hide()
        }, toggle: function () {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        }, "beforeShow.fb": function (t, e, n, o) {
            var a = e && e.SlideShow;
            o ? a && n.opts.slideShow.autoStart && a.start() : a && a.isActive && a.clear()
        }, "afterShow.fb": function (t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set()
        }, "afterKeydown.fb": function (n, o, a, i, s) {
            var r = o && o.SlideShow;
            !r || !a.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (i.preventDefault(), r.toggle())
        }, "beforeClose.fb onDeactivate.fb": function (t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }), e(t).on("visibilitychange", function () {
        var n = e.fancybox.getInstance(), o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
}(document, jQuery), function (t, e) {
    "use strict";
    var n = function () {
        for (var e = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], n = {}, o = 0; o < e.length; o++) {
            var a = e[o];
            if (a && a[1] in t) {
                for (var i = 0; i < a.length; i++) n[e[0][i]] = a[i];
                return n
            }
        }
        return !1
    }();
    if (n) {
        var o = {
            request: function (e) {
                e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
            }, exit: function () {
                t[n.exitFullscreen]()
            }, toggle: function (e) {
                e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
            }, isFullscreen: function () {
                return Boolean(t[n.fullscreenElement])
            }, enabled: function () {
                return Boolean(t[n.fullscreenEnabled])
            }
        };
        e.extend(!0, e.fancybox.defaults, {
            btnTpl: {fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'},
            fullScreen: {autoStart: !1}
        }), e(t).on(n.fullscreenchange, function () {
            var t = o.isFullscreen(), n = e.fancybox.getInstance();
            n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition", "none"), n.isAnimating = !1, n.update(!0, !0, 0)), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t), n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
        })
    }
    e(t).on({
        "onInit.fb": function (t, e) {
            var a;
            return n ? void (e && e.group[e.currIndex].opts.fullScreen ? (a = e.$refs.container, a.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
                t.stopPropagation(), t.preventDefault(), o.toggle()
            }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()) : void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove()
        }, "afterKeydown.fb": function (t, e, n, o, a) {
            e && e.FullScreen && 70 === a && (o.preventDefault(), e.FullScreen.toggle())
        }, "beforeClose.fb": function (t, e) {
            e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
        }
    })
}(document, jQuery), function (t, e) {
    "use strict";
    var n = "fancybox-thumbs", o = n + "-active";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'},
        thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"}
    }, e.fancybox.defaults);
    var a = function (t) {
        this.init(t)
    };
    e.extend(a.prototype, {
        $button: null, $grid: null, $list: null, isVisible: !1, isActive: !1, init: function (t) {
            var e, n, o = this;
            o.instance = t, t.Thumbs = o, o.opts = t.group[t.currIndex].opts.thumbs, e = t.group[0], e = e.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), t.group.length > 1 && (n = t.group[1], n = n.opts.thumb || !(!n.opts.$thumb || !n.opts.$thumb.length) && n.opts.$thumb.attr("src")), o.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), o.opts && e && n ? (o.$button.show().on("click", function () {
                o.toggle()
            }), o.isActive = !0) : o.$button.hide()
        }, create: function () {
            var t, o = this, a = o.instance, i = o.opts.parentEl, s = [];
            o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(a.$refs.container.find(i).addBack().filter(i)), o.$grid.on("click", "a", function () {
                a.jumpTo(e(this).attr("data-index"))
            })), o.$list || (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)), e.each(a.group, function (e, n) {
                t = n.opts.thumb || (n.opts.$thumb ? n.opts.$thumb.attr("src") : null), t || "image" !== n.type || (t = n.src), s.push('<a href="javascript:;" tabindex="0" data-index="' + e + '"' + (t && t.length ? ' style="background-image:url(' + t + ')"' : "") + "></a>")
            }), o.$list[0].innerHTML = s.join(""), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right"), 10) + a.group.length * o.$list.children().eq(0).outerWidth(!0))
        }, focus: function (t) {
            var e, n, a = this, i = a.$list, s = a.$grid;
            a.instance.current && (e = i.children().removeClass(o).filter('[data-index="' + a.instance.current.index + '"]').addClass(o), n = e.position(), "y" === a.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({scrollTop: i.scrollTop() + n.top}, t) : "x" === a.opts.axis && (n.left < s.scrollLeft() || n.left > s.scrollLeft() + (s.width() - e.outerWidth())) && i.parent().stop().animate({scrollLeft: n.left}, t))
        }, update: function () {
            var t = this;
            t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
        }, hide: function () {
            this.isVisible = !1, this.update()
        }, show: function () {
            this.isVisible = !0, this.update()
        }, toggle: function () {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            var n;
            e && !e.Thumbs && (n = new a(e), n.isActive && n.opts.autoStart === !0 && n.show())
        }, "beforeShow.fb": function (t, e, n, o) {
            var a = e && e.Thumbs;
            a && a.isVisible && a.focus(o ? 0 : 250)
        }, "afterKeydown.fb": function (t, e, n, o, a) {
            var i = e && e.Thumbs;
            i && i.isActive && 71 === a && (o.preventDefault(), i.toggle())
        }, "beforeClose.fb": function (t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && n.opts.hideOnClose !== !1 && n.$grid.hide()
        }
    })
}(document, jQuery), function (t, e) {
    "use strict";

    function n(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function (t) {
            return e[t]
        })
    }

    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'},
        share: {
            url: function (t, e) {
                return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }), e(t).on("click", "[data-fancybox-share]", function () {
        var t, o, a = e.fancybox.getInstance(), i = a.current || null;
        i && ("function" === e.type(i.opts.share.url) && (t = i.opts.share.url.apply(i, [a, i])), o = i.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === i.type ? encodeURIComponent(i.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, a.$caption ? encodeURIComponent(a.$caption.text()) : ""), e.fancybox.open({
            src: a.translate(a, o),
            type: "html",
            opts: {
                touch: !1, animationEffect: !1, afterLoad: function (t, e) {
                    a.$refs.container.one("beforeClose.fb", function () {
                        t.close(null, 0)
                    }), e.$content.find(".fancybox-share__button").click(function () {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    })
                }, mobile: {autoFocus: !1}
            }
        }))
    })
}(document, jQuery), function (t, e, n) {
    "use strict";

    function o() {
        var e = t.location.hash.substr(1), n = e.split("-"),
            o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1, a = n.join("-");
        return {hash: e, index: o < 1 ? 1 : o, gallery: a}
    }

    function a(t) {
        "" !== t.gallery && n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
    }

    function i(t) {
        var e, n;
        return !!t && (e = t.current ? t.current.opts : t.opts, n = e.hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : ""), "" !== n && n)
    }

    n.escapeSelector || (n.escapeSelector = function (t) {
        var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, n = function (t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        };
        return (t + "").replace(e, n)
    }), n(function () {
        n.fancybox.defaults.hash !== !1 && (n(e).on({
            "onInit.fb": function (t, e) {
                var n, a;
                e.group[e.currIndex].opts.hash !== !1 && (n = o(), a = i(e), a && n.gallery && a == n.gallery && (e.currIndex = n.index - 1))
            }, "beforeShow.fb": function (n, o, a, s) {
                var r;
                a && a.opts.hash !== !1 && (r = i(o), r && (o.currentHash = r + (o.group.length > 1 ? "-" + (a.index + 1) : ""), t.location.hash !== "#" + o.currentHash && (s && !o.origHash && (o.origHash = t.location.hash), o.hashTimer && clearTimeout(o.hashTimer), o.hashTimer = setTimeout(function () {
                    "replaceState" in t.history ? (t.history[s ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + o.currentHash), s && (o.hasCreatedHistory = !0)) : t.location.hash = o.currentHash, o.hashTimer = null
                }, 300))))
            }, "beforeClose.fb": function (n, o, a) {
                a.opts.hash !== !1 && (clearTimeout(o.hashTimer), o.currentHash && o.hasCreatedHistory ? t.history.back() : o.currentHash && ("replaceState" in t.history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + (o.origHash || "")) : t.location.hash = o.origHash), o.currentHash = null)
            }
        }), n(t).on("hashchange.fb", function () {
            var t = o(), e = null;
            n.each(n(".fancybox-container").get().reverse(), function (t, o) {
                var a = n(o).data("FancyBox");
                if (a && a.currentHash) return e = a, !1
            }), e ? e.currentHash === t.gallery + "-" + t.index || 1 === t.index && e.currentHash == t.gallery || (e.currentHash = null, e.close()) : "" !== t.gallery && a(t)
        }), setTimeout(function () {
            n.fancybox.getInstance() || a(o())
        }, 50))
    })
}(window, document, jQuery), function (t, e) {
    "use strict";
    var n = (new Date).getTime();
    e(t).on({
        "onInit.fb": function (t, e, o) {
            e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (t) {
                var o = e.current, a = (new Date).getTime();
                e.group.length < 2 || o.opts.wheel === !1 || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, a - n < 250 || (n = a, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, jQuery);/*!
 * dist/inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2019 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.264
 */
!function webpackUniversalModuleDefinition(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(); else if ("function" == typeof define && define.amd) define([], factory); else {
        var a = factory();
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i]
    }
}(window, function () {
    return modules = [function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(1), window = __webpack_require__(2), document = window.document,
            generateMaskSet = __webpack_require__(3).generateMaskSet, analyseMask = __webpack_require__(3).analyseMask,
            maskScope = __webpack_require__(6);

        function Inputmask(alias, options, internal) {
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.el = void 0, this.events = {}, this.maskset = void 0, this.refreshValue = !1, !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}, alias && (options.alias = alias)), this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts), this.isRTL = this.opts.numericInput)
        }

        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1)
        }

        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
                optionData = void 0 !== optionData ? optionData : npt.getAttribute(dataAttribute + "-" + option), null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData)
            }

            if (!0 === opts.importDataAttributes) {
                var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;
                if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, dataoptions) if ("alias" === p.toLowerCase()) {
                    optionData = dataoptions[p];
                    break
                }
                for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
                    if (dataoptions) for (p in optionData = void 0, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                        optionData = dataoptions[p];
                        break
                    }
                    importOption(option, optionData)
                }
            }
            return $.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), Object.keys(userOptions).length
        }

        Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: ["[", "]"],
                quantifiermarker: ["{", "}"],
                groupmarker: ["(", ")"],
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: !1,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: $.noop,
                onBeforeMask: null,
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: $.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                _radixDance: !1,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: ["text", "tel", "url", "password", "search"],
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                isComplete: null,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: void 0,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "verbatim",
                importDataAttributes: !0,
                shiftPositions: !0
            },
            definitions: {
                9: {validator: "[0-9\uff11-\uff19]", definitionSymbol: "*"},
                a: {validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", definitionSymbol: "*"},
                "*": {validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"}
            },
            aliases: {},
            masksCache: {},
            mask: function mask(elems) {
                var that = this;
                return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                    var scopedOpts = $.extend(!0, {}, that.opts);
                    if (importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                        void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {action: "mask"}))
                    }
                }), elems && elems[0] && elems[0].inputmask || this
            },
            option: function option(options, noremask) {
                return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? ($.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0
            },
            unmaskedvalue: function unmaskedvalue(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "unmaskedvalue",
                    value: value
                })
            },
            remove: function remove() {
                return maskScope.call(this, {action: "remove"})
            },
            getemptymask: function getemptymask() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "getemptymask"})
            },
            hasMaskedValue: function hasMaskedValue() {
                return !this.opts.autoUnmask
            },
            isComplete: function isComplete() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "isComplete"})
            },
            getmetadata: function getmetadata() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "getmetadata"})
            },
            isValid: function isValid(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "isValid",
                    value: value
                })
            },
            format: function format(value, metadata) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "format",
                    value: value,
                    metadata: metadata
                })
            },
            setValue: function setValue(value) {
                this.el && $(this.el).trigger("setvalue", [value])
            },
            analyseMask: analyseMask
        }, Inputmask.extendDefaults = function (options) {
            $.extend(!0, Inputmask.prototype.defaults, options)
        }, Inputmask.extendDefinitions = function (definition) {
            $.extend(!0, Inputmask.prototype.definitions, definition)
        }, Inputmask.extendAliases = function (alias) {
            $.extend(!0, Inputmask.prototype.aliases, alias)
        }, Inputmask.format = function (value, options, metadata) {
            return Inputmask(options).format(value, metadata)
        }, Inputmask.unmask = function (value, options) {
            return Inputmask(options).unmaskedvalue(value)
        }, Inputmask.isValid = function (value, options) {
            return Inputmask(options).isValid(value)
        }, Inputmask.remove = function (elems) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask && el.inputmask.remove()
            })
        }, Inputmask.setValue = function (elems, value) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask ? el.inputmask.setValue(value) : $(el).trigger("setvalue", [value])
            })
        };
        var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
        Inputmask.escapeRegex = function (str) {
            return str.replace(escapeRegexRegex, "\\$1")
        }, Inputmask.keyCode = {
            BACKSPACE: 8,
            BACKSPACE_SAFARI: 127,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            X: 88,
            CONTROL: 17
        }, Inputmask.dependencyLib = $, window.Inputmask = Inputmask, module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var window = __webpack_require__(2), document = window.document;

        function indexOf(list, elem) {
            for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
            return -1
        }

        function isWindow(obj) {
            return null != obj && obj === obj.window
        }

        function isArraylike(obj) {
            var length = "length" in obj && obj.length, ltype = _typeof(obj);
            return "function" !== ltype && !isWindow(obj) && (!(1 !== obj.nodeType || !length) || ("array" === ltype || 0 === length || "number" == typeof length && 0 < length && length - 1 in obj))
        }

        function isValidElement(elem) {
            return elem instanceof Element
        }

        function DependencyLib(elem) {
            return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void (null != elem && elem !== window && (this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : document.querySelector(elem), void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(elem)
        }

        DependencyLib.prototype = {
            on: function on(events, handler) {
                function addEvent(ev, namespace) {
                    elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler), eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], eventRegistry[ev][namespace].push(handler)
                }

                if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    addEvent(ev, namespace)
                }
                return this
            }, off: function off(events, handler) {
                var eventRegistry, elem;

                function removeEvent(ev, namespace, handler) {
                    if (ev in eventRegistry == !0) if (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler), "global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1); else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1)
                }

                function resolveNamespace(ev, namespace) {
                    var evts = [], hndx, hndL;
                    if (0 < ev.length) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
                        ev: ev,
                        namespace: namespace && 0 < namespace.length ? namespace : "global",
                        handler: eventRegistry[ev][namespace][hndx]
                    }); else evts.push({
                        ev: ev,
                        namespace: namespace && 0 < namespace.length ? namespace : "global",
                        handler: handler
                    }); else if (0 < namespace.length) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
                        ev: evNdx,
                        namespace: nmsp,
                        handler: eventRegistry[evNdx][nmsp][hndx]
                    }); else evts.push({ev: evNdx, namespace: nmsp, handler: handler});
                    return evts
                }

                if (isValidElement(this[0])) {
                    eventRegistry = this[0].eventRegistry, elem = this[0];
                    for (var _events = events.split(" "), endx = 0; endx < _events.length; endx++) for (var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; i < offEventsL; i++) removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler)
                }
                return this
            }, trigger: function trigger(events, argument_1) {
                if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = "string" == typeof events ? events.split(" ") : [events.type], endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    if (void 0 !== document && "global" === namespace) {
                        var evnt, i, params = {bubbles: !0, cancelable: !0, detail: argument_1};
                        if (document.createEvent) {
                            try {
                                evnt = new CustomEvent(ev, params)
                            } catch (e) {
                                evnt = document.createEvent("CustomEvent"), evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail)
                            }
                            events.type && DependencyLib.extend(evnt, events), elem.dispatchEvent(evnt)
                        } else evnt = document.createEventObject(), evnt.eventType = ev, evnt.detail = argument_1, events.type && DependencyLib.extend(evnt, events), elem.fireEvent("on" + evnt.eventType, evnt)
                    } else if (void 0 !== eventRegistry[ev]) if (events = events.type ? events : DependencyLib.Event(events), events.detail = arguments.slice(1), "global" === namespace) for (var nmsp in eventRegistry[ev]) for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments); else for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments)
                }
                return this
            }
        }, DependencyLib.isFunction = function (obj) {
            return "function" == typeof obj
        }, DependencyLib.noop = function () {
        }, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function (elem, arr, i) {
            return null == arr ? -1 : indexOf(arr, elem, i)
        }, DependencyLib.valHooks = void 0, DependencyLib.isPlainObject = function (obj) {
            return "object" === _typeof(obj) && !obj.nodeType && !isWindow(obj) && !(obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"))
        }, DependencyLib.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1,
                length = arguments.length, deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" === _typeof(target) || DependencyLib.isFunction(target) || (target = {}), i === length && (target = this, i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy))) ? (clone = copyIsArray ? (copyIsArray = !1, src && DependencyLib.isArray(src) ? src : []) : src && DependencyLib.isPlainObject(src) ? src : {}, target[name] = DependencyLib.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
            return target
        }, DependencyLib.each = function (obj, callback) {
            var value, i = 0;
            if (isArraylike(obj)) for (var length = obj.length; i < length && (value = callback.call(obj[i], i, obj[i]), !1 !== value); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), !1 === value) break;
            return obj
        }, DependencyLib.data = function (owner, key, value) {
            if (void 0 === value) return owner.__data ? owner.__data[key] : null;
            owner.__data = owner.__data || {}, owner.__data[key] = value
        }, "function" == typeof window.CustomEvent ? DependencyLib.Event = window.CustomEvent : (DependencyLib.Event = function (event, params) {
            params = params || {bubbles: !1, cancelable: !1, detail: void 0};
            var evt = document.createEvent("CustomEvent");
            return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), evt
        }, DependencyLib.Event.prototype = window.Event.prototype), module.exports = DependencyLib
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_AMD_DEFINE_RESULT__;

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window
        }.call(exports, __webpack_require__, exports, module), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(1);

        function generateMaskSet(opts, nocache) {
            var ms;

            function generateMask(mask, metadata, opts) {
                var regexMask = !1, masksetDefinition, maskdefKey;
                if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1]
                }
                return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    excludes: {},
                    metadata: metadata,
                    maskLength: void 0,
                    jitOffset: {}
                }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition
            }

            if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
                if (1 < opts.mask.length) {
                    if (null === opts.keepStatic) {
                        opts.keepStatic = "auto";
                        for (var i = 0; i < opts.mask.length; i++) if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                            opts.keepStatic = !0;
                            break
                        }
                    }
                    var altMask = opts.groupmarker[0];
                    return $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
                        1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), void 0 === msk.mask || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask
                    }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts)
                }
                opts.mask = opts.mask.pop()
            }
            return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), ms
        }

        function analyseMask(mask, regexMask, opts) {
            var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                escaped = !1, currentToken = new MaskToken, match, m, openenings = [], maskTokens = [], openingToken,
                currentOpeningToken, alternator, lastMatch, closeRegexGroup = !1;

            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
                    min: 1,
                    max: 1
                }
            }

            function insertTestDefinition(mtoken, element, position) {
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                    fn: new RegExp(element, opts.casing ? "i" : ""),
                    static: !1,
                    optionality: !1,
                    newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: void 0,
                    nativeDef: element
                }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function (ndx, lmnt) {
                    prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                        nativeDef: (escaped ? "'" : "") + lmnt
                    })
                })), escaped = !1; else {
                    var maskdef = (opts.definitions ? opts.definitions[element] : void 0) || Inputmask.prototype.definitions[element];
                    maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                            this.test = maskdef.validator
                        } : new RegExp("."),
                        static: !1,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        nativeDef: element
                    }) : (mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || element,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                        nativeDef: (escaped ? "'" : "") + element
                    }), escaped = !1)
                }
            }

            function verifyGroupMarker(maskToken) {
                maskToken && maskToken.matches && $.each(maskToken.matches, function (ndx, token) {
                    var nextToken = maskToken.matches[ndx + 1];
                    (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), verifyGroupMarker(token)
                })
            }

            function defaultCase() {
                if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
                    }
                } else insertTestDefinition(currentToken, m)
            }

            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), st
                }

                for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt)
                    }
                    void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match])
                }
                return maskToken
            }

            function groupify(matches) {
                var groupToken = new MaskToken(!0);
                return groupToken.openGroup = !1, groupToken.matches = matches, groupToken
            }

            function closeGroup() {
                if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
                    }
                } else currentToken.matches.push(openingToken); else defaultCase()
            }

            function groupQuantifier(matches) {
                var lastMatch = matches.pop();
                return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch
            }

            for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
                if (m = match[0], regexMask) switch (m.charAt(0)) {
                    case"?":
                        m = "{0,1}";
                        break;
                    case"+":
                    case"*":
                        m = "{" + m + "}";
                        break;
                    case"|":
                        if (0 === openenings.length) {
                            var altRegexGroup = groupify(currentToken.matches);
                            altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], closeRegexGroup = !0
                        }
                        break
                }
                if (escaped) defaultCase(); else switch (m.charAt(0)) {
                    case"(?=":
                        break;
                    case"(?!":
                        break;
                    case"(?<=":
                        break;
                    case"(?<!":
                        break;
                    case opts.escapeChar:
                        escaped = !0, regexMask && defaultCase();
                        break;
                    case opts.optionalmarker[1]:
                    case opts.groupmarker[1]:
                        closeGroup();
                        break;
                    case opts.optionalmarker[0]:
                        openenings.push(new MaskToken(!1, !0));
                        break;
                    case opts.groupmarker[0]:
                        openenings.push(new MaskToken(!0));
                        break;
                    case opts.quantifiermarker[0]:
                        var quantifier = new MaskToken(!1, !1, !0);
                        m = m.replace(/[{}]/g, "");
                        var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                            mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                        "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                            min: mq0,
                            max: mq1,
                            jit: mqj[1]
                        };
                        var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
                        if (match = matches.pop(), match.isAlternator) {
                            matches.push(match), matches = match.matches;
                            var groupToken = new MaskToken(!0), tmpMatch = matches.pop();
                            matches.push(groupToken), matches = groupToken.matches, match = tmpMatch
                        }
                        match.isGroup || (match = groupify([match])), matches.push(match), matches.push(quantifier);
                        break;
                    case opts.alternatormarker:
                        if (0 < openenings.length) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                            lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches)
                        } else lastMatch = groupQuantifier(currentToken.matches);
                        if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
                            lastMatch.openGroup = !1;
                            var alternatorGroup = new MaskToken(!0);
                            alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup)
                        }
                        break;
                    default:
                        defaultCase()
                }
            }
            for (closeRegexGroup && closeGroup(); 0 < openenings.length;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
            return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens
        }

        module.exports = {generateMaskSet: generateMaskSet, analyseMask: analyseMask}
    }, function (module, exports, __webpack_require__) {
        "use strict";
        __webpack_require__(5), __webpack_require__(7), __webpack_require__(8), module.exports = __webpack_require__(0)
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var Inputmask = __webpack_require__(0);
        Inputmask.extendDefinitions({
            A: {validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper"},
            "&": {validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper"},
            "#": {validator: "[0-9A-Fa-f]", casing: "upper"}
        });
        var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");

        function ipValidator(chrs, maskset, pos, strict, opts) {
            return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, ipValidatorRegex.test(chrs)
        }

        Inputmask.extendAliases({
            cssunit: {regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"},
            url: {regex: "(https?|ftp)//.*", autoUnmask: !1},
            ip: {
                mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                definitions: {
                    i: {validator: ipValidator},
                    j: {validator: ipValidator},
                    k: {validator: ipValidator},
                    l: {validator: ipValidator}
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                casing: "lower",
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "")
                },
                definitions: {
                    "*": {validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"},
                    "-": {validator: "[0-9A-Za-z-]"}
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue
                },
                inputmode: "email"
            },
            mac: {mask: "##:##:##:##:##:##"},
            vin: {
                mask: "V{13}9{4}",
                definitions: {V: {validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", casing: "upper"}},
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(1), window = __webpack_require__(2), document = window.document,
            ua = window.navigator && window.navigator.userAgent || "",
            ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"), mobile = "ontouchstart" in window,
            iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
        module.exports = function maskScope(actionObj, maskset, opts) {
            maskset = maskset || this.maskset, opts = opts || this.opts;
            var inputmask = this, el = this.el, isRTL = this.isRTL || (this.isRTL = opts.numericInput), undoValue, $el,
                skipKeyPressEvent = !1, skipInputEvent = !1, validationEvent = !1, ignorable = !1, maxLength,
                mouseEnter = !1, originalPlaceholder = void 0;

            function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
                var greedy = opts.greedy;
                clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
                var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos;
                do {
                    if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test)); else {
                        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice();
                        var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                        (!1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))
                    }
                    "auto" === opts.keepStatic && test.newBlockMarker && !0 !== test.static && (opts.keepStatic = pos - 1), pos++
                } while ((void 0 === maxLength || pos < maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
                return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), opts.greedy = greedy, maskTemplate
            }

            function resetMaskSet(soft) {
                maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0)
            }

            function getLastValidPosition(closestTo, strict, validPositions) {
                var before = -1, after = -1, valids = validPositions || maskset.validPositions;
                for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
                    var psNdx = parseInt(posNdx);
                    valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx))
                }
                return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after
            }

            function getDecisionTaker(tst) {
                var decisionTaker = tst.locator[tst.alternation];
                return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), void 0 !== decisionTaker ? decisionTaker.toString() : ""
            }

            function getLocator(tst, align) {
                var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
                if ("" !== locator) for (; locator.length < align;) locator += "0";
                return locator
            }

            function determineTestTemplate(pos, tests) {
                pos = 0 < pos ? pos - 1 : 0;
                for (var altTest = getTest(pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
                    var tst = tests[ndx];
                    tstLocator = getLocator(tst, targetLocator.length);
                    var distance = Math.abs(tstLocator - targetLocator);
                    (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, bestMatch = tst)
                }
                return bestMatch
            }

            function getTestTemplate(pos, ndxIntlzr, tstPs) {
                return maskset.validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs))
            }

            function getTest(pos, tests) {
                return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests(pos))[0]
            }

            function positionCanMatchDefinition(pos, testDefinition, opts) {
                for (var valid = !1, tests = getTests(pos), defProp = opts.shiftPositions ? "def" : "nativeDef", tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match[defProp] === testDefinition.match[defProp]) {
                    valid = !0;
                    break
                }
                return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition(pos + maskset.jitOffset[pos], testDefinition, opts)), valid
            }

            function getTests(pos, ndxIntlzr, tstPs) {
                var maskTokens = maskset.maskToken, testPos = ndxIntlzr ? tstPs : 0,
                    ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0], matches = [], insertStop = !1, latestMatch,
                    cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

                function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        function isFirstMatch(latestMatch, tokenGroup) {
                            var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                            return firstMatch || $.each(tokenGroup.matches, function (ndx, match) {
                                if (!0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), firstMatch) return !1
                            }), firstMatch
                        }

                        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                            var bestMatch, indexPos;
                            if ((maskset.tests[pos] || maskset.validPositions[pos]) && $.each(maskset.tests[pos] || [maskset.validPositions[pos]], function (ndx, lmnt) {
                                if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                                var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
                                    ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos)
                            }), bestMatch) {
                                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
                                    locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                                return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1)
                            }
                            return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0
                        }

                        function isSubsetOf(source, target) {
                            function expand(pattern) {
                                for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end;) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i), expanded.push(pattern.charAt(i));
                                return expanded.join("")
                            }

                            return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")))
                        }

                        function staticCanMatchDefinition(source, target) {
                            return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1)
                        }

                        function setMergeLocators(targetMatch, altMatch) {
                            if (void 0 === altMatch || targetMatch.alternation === altMatch.alternation && -1 === targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation])) {
                                targetMatch.mloc = targetMatch.mloc || {};
                                var locNdx = targetMatch.locator[targetMatch.alternation];
                                if (void 0 !== locNdx) {
                                    if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), void 0 !== altMatch) {
                                        for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                        targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",")
                                    }
                                    return !0
                                }
                                targetMatch.alternation = void 0
                            }
                            return !1
                        }

                        if (500 < testPos && void 0 !== quantifierRecurse) throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
                        if (testPos === pos && void 0 === match.matches) return matches.push({
                            match: match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency,
                            mloc: {}
                        }), !0;
                        if (void 0 !== match.matches) {
                            if (match.isGroup && quantifierRecurse !== match) {
                                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse), match) return !0
                            } else if (match.isOptional) {
                                var optionalToken = match, mtchsNdx = matches.length;
                                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) {
                                    if ($.each(matches, function (ndx, mtch) {
                                        mtchsNdx <= ndx && (mtch.match.optionality = !0)
                                    }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                                    insertStop = !0, testPos = pos
                                }
                            } else if (match.isAlternator) {
                                var alternateToken = match, malternateMatches = [], maltMatches,
                                    currentMatches = matches.slice(), loopNdxCnt = loopNdx.length,
                                    altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                                if (-1 === altIndex || "string" == typeof altIndex) {
                                    var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(),
                                        altIndexArr = [], amndx;
                                    if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                                    if (void 0 !== maskset.excludes[pos]) {
                                        for (var altIndexArrClone = altIndexArr.slice(), i = 0, el = maskset.excludes[pos].length; i < el; i++) altIndexArr.splice(altIndexArr.indexOf(maskset.excludes[pos][i].toString()), 1);
                                        0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone)
                                    }
                                    (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                                    for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                        amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                            var altMatch = maltMatches[ndx1], dropMatch = !1;
                                            altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);
                                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                var altMatch2 = malternateMatches[ndx2];
                                                if ("string" != typeof altIndex || void 0 !== altMatch.alternation && -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                        dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                                        break
                                                    }
                                                    if (isSubsetOf(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break
                                                    }
                                                    if (isSubsetOf(altMatch2, altMatch)) {
                                                        setMergeLocators(altMatch2, altMatch);
                                                        break
                                                    }
                                                    if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break
                                                    }
                                                }
                                            }
                                            dropMatch || malternateMatches.push(altMatch)
                                        }
                                    }
                                    matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice()
                                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                                if (match) return !0
                            } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup), match) {
                                    if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                        insertStop = !0, testPos = pos;
                                        break
                                    }
                                    return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), !0
                                }
                            } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) return !0
                        } else testPos++
                    }

                    for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                        var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                        if (match && testPos === pos) return match;
                        if (pos < testPos) break
                    }
                }

                function mergeLocators(pos, tests) {
                    var locator = [];
                    return $.isArray(tests) || (tests = [tests]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate(pos, tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : $.each(tests, function (ndx, tst) {
                        if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i])
                    })), locator
                }

                if (-1 < pos && (void 0 === maxLength || pos < maxLength)) {
                    if (void 0 === ndxIntlzr) {
                        for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos;) previousPos--;
                        void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos)
                    }
                    if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
                    for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                        var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
                        if (match && testPos === pos || pos < testPos) break
                    }
                }
                return 0 !== matches.length && !insertStop || matches.push({
                    match: {
                        fn: null,
                        static: !0,
                        optionality: !1,
                        casing: null,
                        def: "",
                        placeholder: ""
                    }, locator: [], mloc: {}, cd: cacheDependency
                }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), maskset.tests[pos])
            }

            function getBufferTemplate() {
                return void 0 === maskset._buffer && (maskset._buffer = getMaskTemplate(!1, 1), void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer
            }

            function getBuffer(noCache) {
                return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = getMaskTemplate(!0, getLastValidPosition(), !0), void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer
            }

            function refreshFromBuffer(start, end, buffer) {
                var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
                if (opts.skipOptionalPartCharacter = "", !0 === start) resetMaskSet(), maskset.tests = {}, start = 0, end = buffer.length; else for (i = start; i < end; i++) delete maskset.validPositions[i];
                for (p = start, i = start; i < end; i++) {
                    var valResult = isValid(p, buffer[i], !0, !0);
                    !1 !== valResult && (p = void 0 !== valResult.caret && valResult.caret > valResult.pos ? valResult.caret : valResult.pos + 1)
                }
                opts.skipOptionalPartCharacter = skipOptionalPartCharacter
            }

            function casing(elem, test, pos) {
                switch (opts.casing || test.casing) {
                    case"upper":
                        elem = elem.toUpperCase();
                        break;
                    case"lower":
                        elem = elem.toLowerCase();
                        break;
                    case"title":
                        var posBefore = maskset.validPositions[pos - 1];
                        elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                        break;
                    default:
                        if ($.isFunction(opts.casing)) {
                            var args = Array.prototype.slice.call(arguments);
                            args.push(maskset.validPositions), elem = opts.casing.apply(this, args)
                        }
                }
                return elem
            }

            function checkAlternationMatch(altArr1, altArr2, na) {
                for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                    isMatch = !0;
                    break
                }
                return isMatch
            }

            function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
                var validPsClone = $.extend(!0, {}, maskset.validPositions), tstClone = $.extend(!0, {}, maskset.tests),
                    lastAlt, alternation, isValidRslt = !1, returnRslt = !1, altPos, prevAltPos, i, validPos,
                    decisionPos, lAltPos = void 0 !== rAltPos ? rAltPos : getLastValidPosition(), nextPos, input, begin,
                    end;
                if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = getTest(lastAlt), alternation = prevAltPos.alternation; else for (; 0 <= lAltPos; lAltPos--) if (altPos = maskset.validPositions[lAltPos], altPos && void 0 !== altPos.alternation) {
                    if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                    lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos
                }
                if (void 0 !== alternation) {
                    decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], !0 !== maskPos && maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos));
                    var validInputs = [], resultPos = -1;
                    for (i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), delete maskset.validPositions[i];
                    for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;) {
                        for (maskset.tests[decisionPos] = void 0, resetMaskSet(!0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || getLastValidPosition(void 0, !0) + 1, input = validInputs[i], isValidRslt = isValid(nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt);
                        if (isValidRslt) break;
                        if (resetMaskSet(), prevAltPos = getTest(decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break
                        }
                        var decisionTaker = getDecisionTaker(prevAltPos);
                        if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker)) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break
                        }
                        for (maskset.excludes[decisionPos].push(decisionTaker), i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) delete maskset.validPositions[i]
                    }
                }
                return delete maskset.excludes[decisionPos], returnRslt
            }

            function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly) {
                function isSelection(posObj) {
                    return isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1
                }

                strict = !0 === strict;
                var maskPos = pos;

                function processCommandObject(commandObj) {
                    if (void 0 !== commandObj) {
                        if (void 0 !== commandObj.remove && ($.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]), $.each(commandObj.remove.sort(function (a, b) {
                            return b.pos - a.pos
                        }), function (ndx, lmnt) {
                            revalidateMask({begin: lmnt, end: lmnt + 1})
                        }), commandObj.remove = void 0), void 0 !== commandObj.insert && ($.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]), $.each(commandObj.insert.sort(function (a, b) {
                            return a.pos - b.pos
                        }), function (ndx, lmnt) {
                            "" !== lmnt.c && isValid(lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid)
                        }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
                            var refresh = commandObj.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), commandObj.refreshFromBuffer = void 0
                        }
                        void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, commandObj = !0)
                    }
                    return commandObj
                }

                function _isValid(position, c, strict) {
                    var rslt = !1;
                    return $.each(getTests(position), function (ndx, tst) {
                        var test = tst.match;
                        if (getBuffer(!0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                            c: getPlaceholder(position, test, !0) || test.def,
                            pos: position
                        }, !1 !== rslt) {
                            var elem = void 0 !== rslt.c ? rslt.c : c, validatedPos = position;
                            return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? getPlaceholder(position, test, !0) || test.def : elem, rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (!1 === revalidateMask(pos, $.extend({}, tst, {input: casing(elem, test, validatedPos)}), fromIsValid, validatedPos) && (rslt = !1), !1)
                        }
                    }), rslt
                }

                void 0 !== pos.begin && (maskPos = isRTL ? pos.end : pos.begin);
                var result = !0, positionsClone = $.extend(!0, {}, maskset.validPositions);
                if ($.isFunction(opts.preValidation) && !0 !== fromIsValid && !0 !== validateOnly && !0 !== fromAlternate && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, maskset, pos, strict), result = processCommandObject(result)), !0 === result) {
                    if (void 0 === maxLength || maskPos < maxLength) {
                        if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
                            var currentPosValid = maskset.validPositions[maskPos];
                            if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                                if (opts.insertMode || void 0 === maskset.validPositions[seekNext(maskPos)] || pos.end > maskPos) {
                                    var skip = !1;
                                    if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[seekNext(maskPos)] && (result = isValid(maskPos + maskset.jitOffset[maskPos], c, !0), !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), !1 !== result) {
                                        result = trackbackPositions(maskPos, void 0 !== result.pos ? result.pos : nPos) || result, maskPos = nPos;
                                        break
                                    }
                                }
                            } else result = {caret: seekNext(maskPos)}
                        }
                    } else result = !1;
                    !1 !== result || !1 !== opts.keepStatic && !isComplete(getBuffer()) && 0 !== maskPos || strict || !0 === fromAlternate || (result = alternate(maskPos, c, strict, fromIsValid, void 0, pos)), !0 === result && (result = {pos: maskPos})
                }
                if ($.isFunction(opts.postValidation) && !1 !== result && !0 !== fromIsValid && !0 !== validateOnly) {
                    var postResult = opts.postValidation(getBuffer(!0), void 0 !== pos.begin ? isRTL ? pos.end : pos.begin : pos, result, opts, maskset, strict);
                    void 0 !== postResult && (result = !0 === postResult ? result : postResult)
                }
                result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (resetMaskSet(!0), maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions(void 0, maskPos, !0);
                var endResult = processCommandObject(result);
                return endResult
            }

            function trackbackPositions(originalPos, newPos, fillOnly) {
                if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) ;
                for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !isMask(ps, !0)) {
                    var vp = 0 == ps ? getTest(ps) : maskset.validPositions[ps - 1];
                    if (vp) {
                        var tests = getTests(ps).slice();
                        "" === tests[tests.length - 1].match.def && tests.pop();
                        var bestMatch = determineTestTemplate(ps, tests), np;
                        if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def}), bestMatch.generatedInput = !0, revalidateMask(ps, bestMatch, !0), !0 !== fillOnly)) {
                            var cvpInput = maskset.validPositions[newPos].input;
                            return maskset.validPositions[newPos] = void 0, isValid(newPos, cvpInput, !0, !0)
                        }
                    }
                }
            }

            function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
                function IsEnclosedStatic(pos, valids, selection) {
                    var posMatch = valids[pos];
                    if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
                    var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1],
                        nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
                    return prevMatch && nextMatch
                }

                var offset = 0, begin = void 0 !== pos.begin ? pos.begin : pos,
                    end = void 0 !== pos.end ? pos.end : pos;
                if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), void 0 === validTest && !1 === opts.insertMode && end < maskset.maskLength && (0 === begin && 0 === end || (begin += 1, end += 1)), validatedPos = void 0 !== validatedPos ? validatedPos : begin, begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
                    var positionsClone = $.extend(!0, {}, maskset.validPositions),
                        lvp = void 0 === validTest && !1 === opts.insertMode ? 1 < end ? end - 1 : end : getLastValidPosition(void 0, !0),
                        i;
                    for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
                    var valid = !0, j = validatedPos, posMatch = j, t;
                    if (i = j, validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), posMatch++, j++, begin < end && i++), validTest || opts.insertMode) for (; i <= lvp; i++) {
                        if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
                            begin: begin,
                            end: end
                        }))) {
                            for (; "" !== getTest(posMatch).match.def;) {
                                if (positionCanMatchDefinition(posMatch, t, opts) || "+" === t.match.def) {
                                    "+" === t.match.def && getBuffer(!0);
                                    var result = isValid(posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                                    if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid) break
                                } else valid = !1;
                                if (valid) {
                                    void 0 === validTest && t.match.static && i === pos.begin && offset++;
                                    break
                                }
                                if (!valid && posMatch > maskset.maskLength) break;
                                posMatch++
                            }
                            "" == getTest(posMatch).match.def && (valid = !1), posMatch = j
                        }
                        if (!valid) break
                    }
                    if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), resetMaskSet(!0), !1
                } else validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
                return resetMaskSet(!0), offset
            }

            function isMask(pos, strict, fuzzy) {
                var test = getTestTemplate(pos).match;
                if ("" === test.def && (test = getTest(pos).match), !0 !== test.static) return test.fn;
                if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
                if (!0 !== strict && -1 < pos) {
                    var tests = getTests(pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)
                }
                return !1
            }

            function seekNext(pos, newBlock) {
                for (var position = pos + 1; "" !== getTest(position).match.def && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position, void 0, !0)) || !0 !== newBlock && !isMask(position, void 0, !0));) position++;
                return position
            }

            function seekPrevious(pos, newBlock) {
                var position = pos, tests;
                if (position <= 0) return 0;
                for (; 0 < --position && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position, void 0, !0) && (tests = getTests(position), tests.length < 2 || 2 === tests.length && "" === tests[1].match.def));) ;
                return position
            }

            function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
                if (event && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                    if (result) {
                        if (result.refreshFromBuffer) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = getBuffer(!0)
                        }
                        void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos)
                    }
                }
                if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), !0 === triggerEvents)) {
                    var $input = $(input), nptVal = input.inputmask._valueGet();
                    skipInputEvent = !0, $input.trigger("input"), setTimeout(function () {
                        nptVal === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(buffer) && $input.trigger("complete")
                    }, 0)
                }
            }

            function getPlaceholder(pos, test, returnPL) {
                if (test = test || getTest(pos).match, void 0 !== test.placeholder || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
                if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
                if (-1 < pos && void 0 === maskset.validPositions[pos]) {
                    var tests = getTests(pos), staticAlternations = [], prevTest;
                    if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length)
                }
                return test.def
            }

            function HandleNativePlaceholder(npt, value) {
                if (ie) {
                    if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
                        var buffer = getBuffer().slice(), nptValue = npt.inputmask._valueGet();
                        if (nptValue !== value) {
                            var lvp = getLastValidPosition();
                            -1 === lvp && nptValue === getBufferTemplate().join("") ? buffer = [] : -1 !== lvp && clearOptionalTail(buffer), writeBuffer(npt, buffer)
                        }
                    }
                } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"))
            }

            function determineNewCaretPosition(selectedCaret, tabbed) {
                function doRadixFocus(clickPos) {
                    if ("" !== opts.radixPoint && 0 !== opts.digits) {
                        var vps = maskset.validPositions;
                        if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
                            if (clickPos < seekNext(-1)) return !0;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (-1 !== radixPos) {
                                for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                return !0
                            }
                        }
                    }
                    return !1
                }

                if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                    case"none":
                        break;
                    case"select":
                        return {begin: 0, end: getBuffer().length};
                    case"ignore":
                        return seekNext(getLastValidPosition());
                    case"radixFocus":
                        if (doRadixFocus(selectedCaret.begin)) {
                            var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                            return opts.numericInput ? seekNext(radixPos) : radixPos
                        }
                    default:
                        var clickPosition = selectedCaret.begin,
                            lvclickPosition = getLastValidPosition(clickPosition, !0),
                            lastPosition = seekNext(-1 !== lvclickPosition || isMask(0) ? lvclickPosition : 0);
                        if (clickPosition < lastPosition) return isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition);
                        var lvp = maskset.validPositions[lvclickPosition],
                            tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : void 0, lvp),
                            placeholder = getPlaceholder(lastPosition, tt.match);
                        if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                            var newPos = seekNext(lastPosition);
                            (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos)
                        }
                        return lastPosition
                }
            }

            var EventRuler = {
                on: function on(input, eventName, eventHandler) {
                    var ev = function ev(e) {
                        var that = this, args;
                        if (void 0 === that.inputmask && "FORM" !== this.nodeName) {
                            var imOpts = $.data(that, "_inputmask_opts");
                            imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that)
                        } else {
                            if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                                switch (e.type) {
                                    case"input":
                                        if (!0 === skipInputEvent || e.originalEvent && "insertCompositionText" === e.originalEvent.inputType) return skipInputEvent = !1, e.preventDefault();
                                        if (mobile) return args = arguments, setTimeout(function () {
                                            eventHandler.apply(that, args), caret(that, that.inputmask.caretPos, void 0, !0)
                                        }, 0), !1;
                                        break;
                                    case"keydown":
                                        skipKeyPressEvent = !1, skipInputEvent = !1;
                                        break;
                                    case"keypress":
                                        if (!0 === skipKeyPressEvent) return e.preventDefault();
                                        skipKeyPressEvent = !0;
                                        break;
                                    case"click":
                                    case"focus":
                                        return validationEvent ? (validationEvent = !1, input.blur(), HandleNativePlaceholder(input, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("")), setTimeout(function () {
                                            input.focus()
                                        }, 3e3)) : (args = arguments, setTimeout(function () {
                                            eventHandler.apply(that, args)
                                        }, 0)), !1
                                }
                                var returnVal = eventHandler.apply(that, arguments);
                                return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal
                            }
                            e.preventDefault()
                        }
                    };
                    input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev)
                }, off: function off(input, event) {
                    var events;
                    input.inputmask && input.inputmask.events && (event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, $.each(events, function (eventName, evArr) {
                        for (; 0 < evArr.length;) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev)
                        }
                        delete input.inputmask.events[eventName]
                    }))
                }
            }, EventHandlers = {
                keydownEvent: function keydownEvent(e, fromInputFallback) {
                    var input = this, $input = $(input), k = e.keyCode, pos = caret(input),
                        kdResult = opts.onKeyDown.call(this, e, getBuffer(), pos, opts);
                    if (void 0 !== kdResult) return kdResult;
                    if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !("oncut" in input)) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), !0 === fromInputFallback && !1 === opts.insertMode ? seekPrevious(maskset.p) : maskset.p, e, input.inputmask._valueGet() !== getBuffer().join("")); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                        e.preventDefault();
                        var caretPos = seekNext(getLastValidPosition());
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0)
                    } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (!0 === getTest(pos.begin).match.static && (pos.begin = seekNext(pos.begin)), pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), pos.end = seekNext(pos.begin, !0), pos.end < maskset.maskLength && pos.end--), pos.begin < maskset.maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function () {
                        var caretPos = caret(input);
                        caret(input, caretPos.begin)
                    }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function () {
                        var caretPos_begin = translatePosition(input.inputmask.caretPos.begin),
                            caretPos_end = translatePosition(input.inputmask.caretPos.end);
                        caret(input, isRTL ? caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1) : caretPos_begin - (0 === caretPos_begin ? 0 : 1))
                    }, 0));
                    ignorable = -1 !== $.inArray(k, opts.ignorables)
                }, keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
                    var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
                    if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function () {
                        $input.trigger("change")
                    }, 0)), !0;
                    if (k) {
                        46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
                        var pos = checkval ? {begin: ndx, end: ndx} : caret(input), forwardPosition,
                            c = String.fromCharCode(k);
                        maskset.writeOutBuffer = !0;
                        var valResult = isValid(pos, c, strict);
                        if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos), maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, !1 !== writeOut && (setTimeout(function () {
                            opts.onKeyValidation.call(input, k, valResult, opts)
                        }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
                            var buffer = getBuffer();
                            writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval)
                        }
                        if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult
                    }
                }, pasteEvent: function pasteEvent(e) {
                    var input = this, ev = e.originalEvent || e, inputValue = this.inputmask._valueGet(!0),
                        caretPos = caret(this), tempValue;
                    isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                    var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
                        valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                    if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                        if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
                        inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret
                    }
                    var pasteValue = inputValue;
                    if ($.isFunction(opts.onBeforePaste)) {
                        if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
                        pasteValue = pasteValue || inputValue
                    }
                    return checkVal(this, !1, !1, pasteValue.toString().split("")), writeBuffer(this, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), e.preventDefault()
                }, inputFallBackEvent: function inputFallBackEvent(e) {
                    function radixPointHandler(input, inputValue, caretPos) {
                        return "." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && (inputValue = inputValue.split(""), inputValue[caretPos.begin - 1] = opts.radixPoint.charAt(0), inputValue = inputValue.join("")), inputValue
                    }

                    function ieMobileHandler(input, inputValue, caretPos) {
                        if (iemobile) {
                            var inputChar = inputValue.replace(getBuffer().join(""), "");
                            if (1 === inputChar.length) {
                                var iv = inputValue.split("");
                                iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("")
                            }
                        }
                        return inputValue
                    }

                    var input = this, inputValue = input.inputmask._valueGet();
                    if (getBuffer().join("") !== inputValue) {
                        var caretPos = caret(input);
                        if (inputValue = radixPointHandler(input, inputValue, caretPos), inputValue = ieMobileHandler(input, inputValue, caretPos), getBuffer().join("") !== inputValue) {
                            var buffer = getBuffer().join(""),
                                offset = !opts.numericInput && inputValue.length > buffer.length ? -1 : 0,
                                frontPart = inputValue.substr(0, caretPos.begin),
                                backPart = inputValue.substr(caretPos.begin),
                                frontBufferPart = buffer.substr(0, caretPos.begin + offset),
                                backBufferPart = buffer.substr(caretPos.begin + offset), selection = caretPos,
                                entries = "", isEntry = !1;
                            if (frontPart !== frontBufferPart) {
                                var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length,
                                    i;
                                for (i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) ;
                                isEntry && (selection.begin = i - offset, entries += frontPart.slice(i, selection.end))
                            }
                            if (backPart !== backBufferPart && (backPart.length > backBufferPart.length ? entries += backPart.slice(0, 1) : backPart.length < backBufferPart.length && (selection.end += backBufferPart.length - backPart.length, isEntry || "" === opts.radixPoint || "" !== backPart || frontPart.charAt(selection.begin + offset - 1) !== opts.radixPoint || (selection.begin--, entries = opts.radixPoint))), writeBuffer(input, getBuffer(), {
                                begin: selection.begin + offset,
                                end: selection.end + offset
                            }), 0 < entries.length) document.activeElement !== input && (input.focus(), caret(input, selection)), $.each(entries.split(""), function (ndx, entry) {
                                var keypress = new $.Event("keypress");
                                keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress)
                            }); else {
                                selection.begin === selection.end - 1 && (selection.begin = seekPrevious(selection.begin + 1), selection.begin === selection.end - 1 ? caret(input, selection.begin) : caret(input, selection.begin, selection.end));
                                var keydown = new $.Event("keydown");
                                keydown.keyCode = opts.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call(input, keydown, !0)
                            }
                            e.preventDefault()
                        }
                    }
                }, compositionendEvent: function compositionendEvent(e) {
                    $el.trigger("input")
                }, setValueEvent: function setValueEvent(e, argument_1, argument_2) {
                    var input = this, value = e && e.detail ? e.detail[0] : argument_1;
                    void 0 === value && (value = this.inputmask._valueGet(!0)), applyInputValue(this, value), (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && caret(this, e.detail ? e.detail[1] : argument_2)
                }, focusEvent: function focusEvent(e) {
                    var input = this, nptValue = this.inputmask._valueGet();
                    opts.showMaskOnFocus && nptValue !== getBuffer().join("") && writeBuffer(this, getBuffer(), seekNext(getLastValidPosition())), !0 !== opts.positionCaretOnTab || !1 !== mouseEnter || isComplete(getBuffer()) && -1 !== getLastValidPosition() || EventHandlers.clickEvent.apply(this, [e, !0]), undoValue = getBuffer().join("")
                }, invalidEvent: function invalidEvent(e) {
                    validationEvent = !0
                }, mouseleaveEvent: function mouseleaveEvent() {
                    var input = this;
                    mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== this && HandleNativePlaceholder(this, originalPlaceholder)
                }, clickEvent: function clickEvent(e, tabbed) {
                    var input = this;
                    if (document.activeElement === this) {
                        var newCaretPosition = determineNewCaretPosition(caret(this), tabbed);
                        void 0 !== newCaretPosition && caret(this, newCaretPosition)
                    }
                }, cutEvent: function cutEvent(e) {
                    var input = this, pos = caret(this), ev = e.originalEvent || e,
                        clipboardData = window.clipboardData || ev.clipboardData,
                        clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                    clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), handleRemove(this, Inputmask.keyCode.DELETE, pos), writeBuffer(this, getBuffer(), maskset.p, e, undoValue !== getBuffer().join(""))
                }, blurEvent: function blurEvent(e) {
                    var $input = $(this), input = this;
                    if (this.inputmask) {
                        HandleNativePlaceholder(this, originalPlaceholder);
                        var nptValue = this.inputmask._valueGet(), buffer = getBuffer().slice();
                        "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), !1 === isComplete(buffer) && (setTimeout(function () {
                            $input.trigger("incomplete")
                        }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(this, buffer, void 0, e)), undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), $input.trigger("change"))
                    }
                }, mouseenterEvent: function mouseenterEvent() {
                    var input = this;
                    mouseEnter = !0, document.activeElement !== this && (null == originalPlaceholder && this.placeholder !== originalPlaceholder && (originalPlaceholder = this.placeholder), opts.showMaskOnHover && HandleNativePlaceholder(this, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("")))
                }, submitEvent: function submitEvent() {
                    undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), opts.clearIncomplete && !1 === isComplete(getBuffer()) && el.inputmask._valueSet(""), opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), setTimeout(function () {
                        writeBuffer(el, getBuffer())
                    }, 0))
                }, resetEvent: function resetEvent() {
                    el.inputmask.refreshValue = !0, setTimeout(function () {
                        applyInputValue(el, el.inputmask._valueGet(!0))
                    }, 0)
                }
            }, valueBuffer;

            function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                var inputmask = this || input.inputmask, inputValue = nptvl.slice(), charCodes = "", initialNdx = -1,
                    result = void 0;

                function isTemplateMatch(ndx, charCodes) {
                    if (opts.regex) return !1;
                    for (var targetTemplate = getMaskTemplate(!0, 0, !1).slice(ndx, seekNext(ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];) charCodeNdx--;
                    var match = 0 === charCodeNdx && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx).match.static && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === getTest(ndx).match.nativeDef && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx + 1).match.static && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
                    return !match && 0 < charCodeNdx && (inputmask.caretPos = {begin: seekNext(charCodeNdx)}), match
                }

                resetMaskSet(), maskset.tests = {}, initialNdx = opts.radixPoint ? determineNewCaretPosition(0) : 0, maskset.p = initialNdx, inputmask.caretPos = {begin: initialNdx};
                var staticMatches = [], prevCaretPos = inputmask.caretPos, sndx, validPos, nextValid;
                if ($.each(inputValue, function (ndx, charCode) {
                    if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++; else {
                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
                        var lvp = getLastValidPosition(void 0, !0);
                        isTemplateMatch(initialNdx, charCodes) ? result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, lvp + 1) : (result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, inputmask.caretPos.begin), result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && (staticMatches.push(result.pos), isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer(void 0, getBuffer(), result.forwardPosition, keypress, !1), inputmask.caretPos = {
                            begin: result.forwardPosition,
                            end: result.forwardPosition
                        }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos
                    }
                }), 0 < staticMatches.length) if (!isComplete(getBuffer()) || staticMatches.length < seekNext(0)) {
                    for (; void 0 !== (sndx = staticMatches.pop());) if (sndx !== staticMatches.length) {
                        var keypress = new $.Event("_checkval"), nextSndx = sndx + 1;
                        for (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0); (nextValid = maskset.validPositions[nextSndx]) && nextValid.input === validPos.input;) nextSndx++;
                        result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && staticMatches.push(result.pos)
                    }
                } else for (; sndx = staticMatches.pop();) validPos = maskset.validPositions[sndx], validPos && (validPos.generatedInput = !0);
                writeOut && writeBuffer(input, getBuffer(), result ? result.forwardPosition : void 0, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type)
            }

            function unmaskedvalue(input) {
                if (input) {
                    if (void 0 === input.inputmask) return input.value;
                    input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0))
                }
                var umValue = [], vps = maskset.validPositions;
                for (var pndx in vps) vps[pndx] && vps[pndx].match && 1 != vps[pndx].match.static && umValue.push(vps[pndx].input);
                var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
                if ($.isFunction(opts.onUnMask)) {
                    var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts)
                }
                return unmaskedValue
            }

            function translatePosition(pos) {
                return !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = el.inputmask._valueGet().length - pos), pos
            }

            function caret(input, begin, end, notranslate) {
                var range;
                if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), !1 === opts.insertMode && begin === end - 1 && end--, {
                    begin: notranslate ? begin : translatePosition(begin),
                    end: notranslate ? end : translatePosition(end)
                };
                if ($.isArray(begin) && (end = isRTL ? begin[0] : begin[1], begin = isRTL ? begin[1] : begin[0]), void 0 !== begin.begin && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin), "number" == typeof begin) {
                    begin = notranslate ? begin : translatePosition(begin), end = notranslate ? end : translatePosition(end), end = "number" == typeof end ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
                        begin: begin,
                        end: end
                    }, !1 === opts.insertMode && begin === end && end++, input === document.activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end); else if (window.getSelection) {
                        if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode)
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
                        var sel = window.getSelection();
                        sel.removeAllRanges(), sel.addRange(range)
                    } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select())
                }
            }

            function determineLastRequiredPosition(returnDefinition) {
                var buffer = getMaskTemplate(!0, getLastValidPosition(), !0, !0), bl = buffer.length, pos,
                    lvp = getLastValidPosition(), positions = {}, lvTest = maskset.validPositions[lvp],
                    ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0, testPos;
                for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
                var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
                for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
                return returnDefinition ? {l: bl, def: positions[bl] ? positions[bl].match : void 0} : bl
            }

            function clearOptionalTail(buffer) {
                buffer.length = 0;
                for (var template = getMaskTemplate(!0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift());) buffer.push(lmnt);
                return buffer
            }

            function isComplete(buffer) {
                if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
                if ("*" !== opts.repeat) {
                    var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
                    if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                        complete = !0;
                        for (var i = 0; i <= aml; i++) {
                            var test = getTestTemplate(i).match;
                            if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== getPlaceholder(i, test)) {
                                complete = !1;
                                break
                            }
                        }
                    }
                    return complete
                }
            }

            function handleRemove(input, k, pos, strict, fromIsValid) {
                if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), isRTL)) {
                    var pend = pos.end;
                    pos.end = pos.begin, pos.begin = pend
                }
                var offset;
                if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE && !1 === opts.insertMode ? pos.end - pos.begin < 1 && (pos.begin = seekPrevious(pos.begin), void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0, !0) ? pos.end + 1 : seekNext(pos.end) + 1, void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.end++), !1 !== (offset = revalidateMask(pos))) {
                    if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== getTest(pos.begin).match.def.indexOf("|")) {
                        var result = alternate(!0);
                        if (result) {
                            var newPos = void 0 !== result.caret ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, !0);
                            (k !== Inputmask.keyCode.DELETE || pos.begin > newPos) && pos.begin
                        }
                    }
                    var lvp = getLastValidPosition(pos.end, !0);
                    lvp < pos.begin ? maskset.p = !1 === opts.insertMode ? seekPrevious(lvp + 1) : seekNext(lvp) : !0 !== strict && (maskset.p = k === Inputmask.keyCode.DELETE ? pos.begin + offset : pos.begin, !1 === opts.insertMode && k === Inputmask.keyCode.DELETE && (maskset.p = pos.end + 1, void 0 === maskset.validPositions[maskset.p] && getLastValidPosition(maskset.maskLength, !0) < maskset.p && (maskset.p = seekPrevious(lvp + 1))))
                }
            }

            function applyInputValue(input, value) {
                input.inputmask.refreshValue = !1, $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.toString().split(""), checkVal(input, !0, !1, value), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && -1 === getLastValidPosition() && input.inputmask._valueSet("")
            }

            function mask(elem) {
                function isElementTypeSupported(input, opts) {
                    function patchValueProperty(npt) {
                        var valueGet, valueSet;

                        function patchValhook(type) {
                            if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
                                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                                        return elem.value
                                    },
                                    valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                                        return elem.value = value, elem
                                    };
                                $.valHooks[type] = {
                                    get: function get(elem) {
                                        if (elem.inputmask) {
                                            if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                            var result = valhookGet(elem);
                                            return -1 !== getLastValidPosition(void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : ""
                                        }
                                        return valhookGet(elem)
                                    }, set: function set(elem, value) {
                                        var result = valhookSet(elem, value);
                                        return elem.inputmask && applyInputValue(elem, value), result
                                    }, inputmaskpatch: !0
                                }
                            }
                        }

                        function getter() {
                            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this)
                        }

                        function setter(value) {
                            valueSet.call(this, value), this.inputmask && applyInputValue(this, value)
                        }

                        function installNativeValueSetFallback(npt) {
                            EventRuler.on(npt, "mouseenter", function () {
                                var input = this, value = this.inputmask._valueGet(!0);
                                value !== (isRTL ? getBuffer().reverse() : getBuffer()).join("") && applyInputValue(this, value)
                            })
                        }

                        if (!npt.inputmask.__valueGet) {
                            if (!0 !== opts.noValuePatching) {
                                if (Object.getOwnPropertyDescriptor) {
                                    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function (object) {
                                        return object.__proto__
                                    } : function (object) {
                                        return object.constructor.prototype
                                    });
                                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                                    valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                                        return this.textContent
                                    }, valueSet = function valueSet(value) {
                                        this.textContent = value
                                    }, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    }))
                                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
                                npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet
                            }
                            npt.inputmask._valueGet = function (overruleRTL) {
                                return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el)
                            }, npt.inputmask._valueSet = function (value, overruleRTL) {
                                valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value)
                            }, void 0 === valueGet && (valueGet = function valueGet() {
                                return this.value
                            }, valueSet = function valueSet(value) {
                                this.value = value
                            }, patchValhook(npt.type), installNativeValueSetFallback(npt))
                        }
                    }

                    var elementType = input.getAttribute("type"),
                        isSupported = "input" === input.tagName.toLowerCase() && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
                    if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
                        var el = document.createElement("input");
                        el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null
                    } else isSupported = "partial";
                    return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, isSupported
                }

                EventRuler.off(elem);
                var isSupported = isElementTypeSupported(elem, opts);
                if (!1 !== isSupported && (el = elem, $el = $(el), originalPlaceholder = el.placeholder, maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0), "inputmode" in el && (el.inputmode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete), EventRuler.on(el, "submit", EventHandlers.submitEvent), EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), EventRuler.on(el, "invalid", EventHandlers.invalidEvent), EventRuler.on(el, "click", EventHandlers.clickEvent), EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                    applyInputValue(el, el.inputmask._valueGet(!0), opts);
                    var buffer = getBuffer().slice();
                    !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && document.activeElement === el || "" !== el.inputmask._valueGet(!0)) && writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()))
                }
            }

            if (void 0 !== actionObj) switch (actionObj.action) {
                case"isComplete":
                    return el = actionObj.el, isComplete(getBuffer());
                case"unmaskedvalue":
                    return void 0 !== el && void 0 === actionObj.value || (valueBuffer = actionObj.value, valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer).split(""), checkVal.call(this, void 0, !1, !1, valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, void 0, getBuffer(), 0, opts)), unmaskedvalue(el);
                case"mask":
                    mask(el);
                    break;
                case"format":
                    return valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer), actionObj.metadata ? {
                        value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                        metadata: maskScope.call(this, {action: "getmetadata"}, maskset, opts)
                    } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                case"isValid":
                    actionObj.value ? (valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer)) : actionObj.value = isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                    for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; rl < lmib && !isMask(lmib); lmib--) ;
                    return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === (isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""));
                case"getemptymask":
                    return getBufferTemplate().join("");
                case"remove":
                    if (el && el.inputmask) {
                        $.data(el, "_inputmask_opts", null), $el = $(el);
                        var cv = opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(opts.autoUnmask),
                            valueProperty;
                        cv !== getBufferTemplate().join("") ? el.inputmask._valueSet(cv, opts.autoUnmask) : el.inputmask._valueSet(""), EventRuler.off(el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                            get: el.inputmask.__valueGet,
                            set: el.inputmask.__valueSet,
                            configurable: !0
                        })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0
                    }
                    return el;
                case"getmetadata":
                    if ($.isArray(maskset.metadata)) {
                        var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                        return $.each(maskset.metadata, function (ndx, mtdt) {
                            if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1
                        }), maskTarget
                    }
                    return maskset.metadata
            }
        }
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var Inputmask = __webpack_require__(0), $ = Inputmask.dependencyLib, formatCode = {
            d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
            dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
                return pad(Date.prototype.getDate.call(this), 2)
            }],
            ddd: [""],
            dddd: [""],
            m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                return Date.prototype.getMonth.call(this) + 1
            }],
            mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                return pad(Date.prototype.getMonth.call(this) + 1, 2)
            }],
            mmm: [""],
            mmmm: [""],
            yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
                return pad(Date.prototype.getFullYear.call(this), 2)
            }],
            yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
                return pad(Date.prototype.getFullYear.call(this), 4)
            }],
            h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
            hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
                return pad(Date.prototype.getHours.call(this), 2)
            }],
            hhh: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
            H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
            HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
                return pad(Date.prototype.getHours.call(this), 2)
            }],
            HHH: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
            M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
            MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
                return pad(Date.prototype.getMinutes.call(this), 2)
            }],
            s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
            ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
                return pad(Date.prototype.getSeconds.call(this), 2)
            }],
            l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
                return pad(Date.prototype.getMilliseconds.call(this), 3)
            }],
            L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
                return pad(Date.prototype.getMilliseconds.call(this), 2)
            }],
            t: ["[ap]"],
            tt: ["[ap]m"],
            T: ["[AP]"],
            TT: ["[AP]M"],
            Z: [""],
            o: [""],
            S: [""]
        }, formatAlias = {
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        function getTokenizer(opts) {
            if (!opts.tokenizer) {
                var tokens = [];
                for (var ndx in formatCode) -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
                opts.tokenizer = "(" + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g")
            }
            return opts.tokenizer
        }

        function isValidDate(dateParts, currentResult) {
            return (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) && currentResult
        }

        function isDateInRange(dateParts, opts) {
            var result = !0;
            if (opts.min) {
                if (dateParts.rawyear) {
                    var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
                        minYear = opts.min.year.substr(0, rawYear.length);
                    result = minYear <= rawYear
                }
                dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime())
            }
            return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), result
        }

        function parse(format, dateObjValue, opts, raw) {
            var mask = "", match;
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) if (void 0 === dateObjValue) if (formatCode[match[0]]) mask += "(" + formatCode[match[0]][0] + ")"; else switch (match[0]) {
                case"[":
                    mask += "(";
                    break;
                case"]":
                    mask += ")?";
                    break;
                default:
                    mask += Inputmask.escapeRegex(match[0])
            } else if (formatCode[match[0]]) if (!0 !== raw && formatCode[match[0]][3]) {
                var getFn = formatCode[match[0]][3];
                mask += getFn.call(dateObjValue.date)
            } else formatCode[match[0]][2] ? mask += dateObjValue["raw" + formatCode[match[0]][2]] : mask += match[0]; else mask += match[0];
            return mask
        }

        function pad(val, len) {
            for (val = String(val), len = len || 2; val.length < len;) val = "0" + val;
            return val
        }

        function analyseMask(maskString, format, opts) {
            var dateObj = {date: new Date(1, 0, 1)}, targetProp, mask = maskString, match, dateOperation;

            function extendProperty(value) {
                var correctedValue = value.replace(/[^0-9]/g, "0");
                return correctedValue
            }

            function setValue(dateObj, value, opts) {
                dateObj[targetProp] = extendProperty(value), dateObj["raw" + targetProp] = value, void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp])
            }

            if ("string" == typeof mask) {
                for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
                    var value = mask.slice(0, match[0].length);
                    formatCode.hasOwnProperty(match[0]) && (targetProp = formatCode[match[0]][2], dateOperation = formatCode[match[0]][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length)
                }
                return dateObj
            }
            if (mask && "object" === _typeof(mask) && mask.hasOwnProperty("date")) return mask
        }

        Inputmask.extendAliases({
            datetime: {
                mask: function mask(opts) {
                    return formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), opts.regex = parse(opts.inputFormat, void 0, opts), null
                },
                placeholder: "",
                inputFormat: "isoDateTime",
                displayFormat: void 0,
                outputFormat: void 0,
                min: null,
                max: null,
                skipOptionalPartCharacter: "",
                i18n: {
                    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    ordinalSuffix: ["st", "nd", "rd", "th"]
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (strict) return !0;
                    var calcPos = 0, targetMatch, match;
                    if (isNaN(c) && buffer[pos] !== c) {
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) if (calcPos += match[0].length, pos <= calcPos) {
                            targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
                            break
                        }
                        if (match && match[0] === c && 1 < targetMatch[0].length) return buffer[pos] = buffer[pos - 1], buffer[pos - 1] = "0", {
                            fuzzy: !0,
                            buffer: buffer,
                            refreshFromBuffer: {start: pos - 1, end: pos + 1},
                            pos: pos + 1
                        }
                    }
                    return !0
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos);
                    var calcPos = 0, match;
                    for (getTokenizer(opts).lastIndex = 0; (match = getTokenizer(opts).exec(opts.inputFormat)) && (calcPos += match[0].length, !(pos < calcPos));) ;
                    if (match && match[0] && void 0 !== formatCode[match[0]]) {
                        var validator = formatCode[match[0]][0],
                            part = buffer.slice(match.index, match.index + match[0].length);
                        !1 === new RegExp(validator).test(part.join("")) && 2 === match[0].length && maskset.validPositions[match.index] && maskset.validPositions[match.index + 1] && (maskset.validPositions[match.index + 1].input = "0")
                    }
                    var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                    return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = isValidDate(dateParts, result), result = result && isDateInRange(dateParts, opts)), pos && result && currentResult.pos !== pos ? {
                        buffer: parse(opts.inputFormat, dateParts, opts).split(""),
                        refreshFromBuffer: {start: pos, end: currentResult.pos}
                    } : result
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var input = this;
                    if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                        var today = new Date, match, date = "";
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) "d" === match[0].charAt(0) ? date += pad(today.getDate(), match[0].length) : "m" === match[0].charAt(0) ? date += pad(today.getMonth() + 1, match[0].length) : "yyyy" === match[0] ? date += today.getFullYear().toString() : "y" === match[0].charAt(0) && (date += pad(today.getYear(), match[0].length));
                        this.inputmask._valueSet(date), $(this).trigger("setvalue")
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue
                },
                casing: function casing(elem, test, pos, validPositions) {
                    return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem
                },
                insertMode: !1,
                shiftPositions: !1,
                keepStatic: !1
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var Inputmask = __webpack_require__(0), $ = Inputmask.dependencyLib;

        function autoEscape(txt, opts) {
            for (var escapedTxt = "", i = 0; i < txt.length; i++) Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
            return escapedTxt
        }

        function alignDigits(buffer, digits, opts, force) {
            if (0 < digits && (!opts.digitsOptional || force)) {
                var radixPosition = $.inArray(opts.radixPoint, buffer);
                -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
                for (var i = 1; i <= digits; i++) buffer[radixPosition + i] = buffer[radixPosition + i] || "0"
            }
            return buffer
        }

        function findValidator(symbol, maskset) {
            var posNdx = 0;
            if ("+" === symbol) {
                for (posNdx in maskset.validPositions) ;
                posNdx = parseInt(posNdx)
            }
            for (var tstNdx in maskset.tests) if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
            return posNdx
        }

        function findValid(symbol, maskset) {
            var ret = -1;
            return $.each(maskset.validPositions, function (ndx, tst) {
                if (tst && tst.match.def === symbol) return ret = parseInt(ndx), !1
            }), ret
        }

        function parseMinMaxOptions(opts) {
            void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), opts.parseMinMaxOptions = "done")
        }

        function genMask(opts) {
            opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
            var decimalDef = "0";
            !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1) : (opts.__financeInput = !1, opts.numericInput = !0);
            var mask = "[+]", altMask;
            if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? mask += opts._mask(opts) : mask += "9{+}", void 0 !== opts.digits && 0 !== opts.digits) {
                var dq = opts.digits.toString().split(",");
                isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + opts.radixPoint + decimalDef + "{0," + opts.digits + "}", opts.keepStatic = !0) : mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}")
            }
            return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]), opts.greedy = !1, parseMinMaxOptions(opts), mask
        }

        function hanndleRadixDance(pos, c, radixPos, opts) {
            return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (pos -= 1), pos
        }

        function decimalValidator(chrs, maskset, pos, strict, opts) {
            var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
                result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
            return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
                insert: {
                    pos: radixPos === pos ? radixPos + 1 : radixPos,
                    c: opts.radixPoint
                }, pos: pos
            } : result
        }

        function checkForLeadingZeroes(buffer, opts) {
            try {
                var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
                    number = numberMatches ? numberMatches[2] : "", leadingzeroes = !1;
                return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes
            } catch (e) {
                console.log(buffer.slice().reverse().join(""))
            }
        }

        Inputmask.extendAliases({
            numeric: {
                mask: genMask,
                _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "999){+|1}"
                },
                placeholder: "0",
                greedy: !1,
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                _radixDance: !0,
                groupSeparator: "",
                allowMinus: !0,
                negationSymbol: {front: "-", back: ""},
                prefix: "",
                suffix: "",
                rightAlign: !0,
                min: null,
                max: null,
                step: 1,
                insertMode: !0,
                autoUnmask: !1,
                unmaskAsNumber: !1,
                inputmode: "numeric",
                skipOptionalPartCharacter: "",
                definitions: {
                    0: {validator: decimalValidator},
                    1: {validator: decimalValidator, definitionSymbol: "*"},
                    "+": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front)
                        }
                    },
                    "-": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && chrs === opts.negationSymbol.back
                        }
                    }
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
                    var radixPos = $.inArray(opts.radixPoint, buffer);
                    if (pos = hanndleRadixDance(pos, c, radixPos, opts), "-" !== c && c !== opts.negationSymbol.front) return !!strict || (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos ? {caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos} : {rewritePosition: isSelection && opts.digitsOptional ? caretPos.end : pos});
                    if (!0 !== opts.allowMinus) return !1;
                    var isNegative = !1, front = findValid("+", maskset), back = findValid("-", maskset);
                    return -1 !== front && (isNegative = [front, back]), !1 !== isNegative ? {
                        remove: isNegative,
                        caret: pos < radixPos ? pos + 1 : pos
                    } : {
                        insert: [{
                            pos: findValidator("+", maskset),
                            c: opts.negationSymbol.front,
                            fromIsValid: !0
                        }, {pos: findValidator("-", maskset), c: opts.negationSymbol.back, fromIsValid: void 0}],
                        caret: pos < radixPos ? pos + 1 : pos
                    }
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    if (null !== opts.min || null !== opts.max) {
                        var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {unmaskAsNumber: !0}));
                        if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length >= opts.min.toString().length || unmasked < 0)) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        };
                        if (null !== opts.max && unmasked > opts.max) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        }
                    }
                    return currentResult
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), Number(processValue)) : processValue
                },
                isComplete: function isComplete(buffer, opts) {
                    var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                    return maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === opts.radixPoint && (maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), isFinite(maskedValue)
                },
                onBeforeMask: function onBeforeMask(initialValue, opts) {
                    var radixPoint = opts.radixPoint || ",";
                    "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
                    var valueParts = initialValue.split(radixPoint),
                        integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
                        decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
                        forceDigits = 1 < valueParts.length;
                    initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
                    var digits = 0;
                    if ("" !== radixPoint && (digits = decimalPart.length, "" !== decimalPart)) {
                        var digitsFactor = Math.pow(10, digits || 1);
                        isFinite(opts.digits) && (digits = parseInt(opts.digits), digitsFactor = Math.pow(10, digits)), initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), "."), isFinite(initialValue) && (initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor), initialValue = initialValue.toString().replace(".", radixPoint)
                    }
                    if (0 === opts.digits && -1 !== initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) && (initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)))), null !== opts.min || null !== opts.max) {
                        var numberValue = initialValue.toString().replace(radixPoint, ".");
                        null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint))
                    }
                    return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("")
                },
                onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
                    function stripBuffer(buffer, stripRadix) {
                        if (!1 !== opts.__financeInput || stripRadix) {
                            var position = $.inArray(opts.radixPoint, buffer);
                            -1 !== position && buffer.splice(position, 1)
                        }
                        if ("" !== opts.groupSeparator) for (; -1 !== (position = buffer.indexOf(opts.groupSeparator));) buffer.splice(position, 1);
                        return buffer
                    }

                    var result, leadingzeroes = checkForLeadingZeroes(buffer, opts);
                    if (leadingzeroes) {
                        var buf = buffer.slice().reverse(), caretNdx = buf.join("").indexOf(leadingzeroes[0]);
                        buf.splice(caretNdx, leadingzeroes[0].length);
                        var newCaretPos = buf.length - caretNdx;
                        stripBuffer(buf), result = {
                            refreshFromBuffer: !0,
                            buffer: buf.reverse(),
                            caret: caretPos < newCaretPos ? caretPos : newCaretPos
                        }
                    }
                    if (e) switch (e.type) {
                        case"blur":
                        case"checkval":
                            if (null !== opts.min) {
                                var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {unmaskAsNumber: !0}));
                                if (null !== opts.min && unmasked < opts.min) return {
                                    refreshFromBuffer: !0,
                                    buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                                }
                            }
                            if ("" !== opts.radixPoint && buffer[0] === opts.radixPoint) result && result.buffer ? result.buffer.shift() : (buffer.shift(), result = {
                                refreshFromBuffer: !0,
                                buffer: stripBuffer(buffer)
                            }); else if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                                var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
                                    number = nmbrMtchs ? nmbrMtchs[2] : "";
                                0 == number && (result = {refreshFromBuffer: !0, buffer: [0]})
                            }
                    }
                    return result
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var $input = $(this), bffr;
                    if (e.ctrlKey) switch (e.keyCode) {
                        case Inputmask.keyCode.UP:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue"), !1;
                        case Inputmask.keyCode.DOWN:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue"), !1
                    }
                    if (!e.shiftKey && (e.keyCode === Inputmask.keyCode.DELETE || e.keyCode === Inputmask.keyCode.BACKSPACE || e.keyCode === Inputmask.keyCode.BACKSPACE_SAFARI)) {
                        if (buffer[e.keyCode === Inputmask.keyCode.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1;
                        if (!0 === opts._radixDance) {
                            var radixPos = $.inArray(opts.radixPoint, buffer);
                            if (opts.digitsOptional) {
                                if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1
                            } else if (-1 !== radixPos && (caretPos.begin < radixPos || e.keyCode === Inputmask.keyCode.DELETE && caretPos.begin === radixPos)) return e.keyCode !== Inputmask.keyCode.BACKSPACE && e.keyCode !== Inputmask.keyCode.BACKSPACE_SAFARI || caretPos.begin++, bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, 1), $input.trigger("setvalue", [alignDigits(bffr, opts.digits, opts).join(""), caretPos.begin]), !1
                        }
                    }
                }
            },
            currency: {prefix: "$ ", groupSeparator: ",", alias: "numeric", digits: 2, digitsOptional: !1},
            decimal: {alias: "numeric"},
            integer: {alias: "numeric", digits: 0},
            percentage: {alias: "numeric", min: 0, max: 100, suffix: " %", digits: 0, allowMinus: !1},
            indianns: {
                alias: "numeric", _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}"
                }, groupSeparator: ",", radixPoint: ".", placeholder: "0", digits: 2, digitsOptional: !1
            }
        }), module.exports = Inputmask
    }], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {enumerable: !0, get: getter})
    }, __webpack_require__.r = function (exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(exports, "__esModule", {value: !0})
    }, __webpack_require__.t = function (value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function (key) {
            return value[key]
        }.bind(null, key));
        return ns
    }, __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module.default
        } : function getModuleExports() {
            return module
        };
        return __webpack_require__.d(getter, "a", getter), getter
    }, __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 4);

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {i: moduleId, l: !1, exports: {}};
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
    }

    var modules, installedModules
});/*!
 * dist/jquery.inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2019 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.264
 */
!function webpackUniversalModuleDefinition(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(require("jquery")); else if ("function" == typeof define && define.amd) define(["jquery"], factory); else {
        var a = "object" == typeof exports ? factory(require("jquery")) : factory(root.jQuery);
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i]
    }
}(window, function (__WEBPACK_EXTERNAL_MODULE__2__) {
    return modules = [function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(1), window = __webpack_require__(3), document = window.document,
            generateMaskSet = __webpack_require__(4).generateMaskSet, analyseMask = __webpack_require__(4).analyseMask,
            maskScope = __webpack_require__(7);

        function Inputmask(alias, options, internal) {
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.el = void 0, this.events = {}, this.maskset = void 0, this.refreshValue = !1, !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}, alias && (options.alias = alias)), this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts), this.isRTL = this.opts.numericInput)
        }

        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1)
        }

        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
                optionData = void 0 !== optionData ? optionData : npt.getAttribute(dataAttribute + "-" + option), null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData)
            }

            if (!0 === opts.importDataAttributes) {
                var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;
                if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, dataoptions) if ("alias" === p.toLowerCase()) {
                    optionData = dataoptions[p];
                    break
                }
                for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
                    if (dataoptions) for (p in optionData = void 0, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                        optionData = dataoptions[p];
                        break
                    }
                    importOption(option, optionData)
                }
            }
            return $.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), Object.keys(userOptions).length
        }

        Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: ["[", "]"],
                quantifiermarker: ["{", "}"],
                groupmarker: ["(", ")"],
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: !1,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: $.noop,
                onBeforeMask: null,
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: $.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                _radixDance: !1,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: ["text", "tel", "url", "password", "search"],
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                isComplete: null,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: void 0,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "verbatim",
                importDataAttributes: !0,
                shiftPositions: !0
            },
            definitions: {
                9: {validator: "[0-9\uff11-\uff19]", definitionSymbol: "*"},
                a: {validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", definitionSymbol: "*"},
                "*": {validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"}
            },
            aliases: {},
            masksCache: {},
            mask: function mask(elems) {
                var that = this;
                return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                    var scopedOpts = $.extend(!0, {}, that.opts);
                    if (importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                        void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {action: "mask"}))
                    }
                }), elems && elems[0] && elems[0].inputmask || this
            },
            option: function option(options, noremask) {
                return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? ($.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0
            },
            unmaskedvalue: function unmaskedvalue(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "unmaskedvalue",
                    value: value
                })
            },
            remove: function remove() {
                return maskScope.call(this, {action: "remove"})
            },
            getemptymask: function getemptymask() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "getemptymask"})
            },
            hasMaskedValue: function hasMaskedValue() {
                return !this.opts.autoUnmask
            },
            isComplete: function isComplete() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "isComplete"})
            },
            getmetadata: function getmetadata() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "getmetadata"})
            },
            isValid: function isValid(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "isValid",
                    value: value
                })
            },
            format: function format(value, metadata) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "format",
                    value: value,
                    metadata: metadata
                })
            },
            setValue: function setValue(value) {
                this.el && $(this.el).trigger("setvalue", [value])
            },
            analyseMask: analyseMask
        }, Inputmask.extendDefaults = function (options) {
            $.extend(!0, Inputmask.prototype.defaults, options)
        }, Inputmask.extendDefinitions = function (definition) {
            $.extend(!0, Inputmask.prototype.definitions, definition)
        }, Inputmask.extendAliases = function (alias) {
            $.extend(!0, Inputmask.prototype.aliases, alias)
        }, Inputmask.format = function (value, options, metadata) {
            return Inputmask(options).format(value, metadata)
        }, Inputmask.unmask = function (value, options) {
            return Inputmask(options).unmaskedvalue(value)
        }, Inputmask.isValid = function (value, options) {
            return Inputmask(options).isValid(value)
        }, Inputmask.remove = function (elems) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask && el.inputmask.remove()
            })
        }, Inputmask.setValue = function (elems, value) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask ? el.inputmask.setValue(value) : $(el).trigger("setvalue", [value])
            })
        };
        var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
        Inputmask.escapeRegex = function (str) {
            return str.replace(escapeRegexRegex, "\\$1")
        }, Inputmask.keyCode = {
            BACKSPACE: 8,
            BACKSPACE_SAFARI: 127,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            X: 88,
            CONTROL: 17
        }, Inputmask.dependencyLib = $, window.Inputmask = Inputmask, module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var jquery = __webpack_require__(2);
        if (void 0 === jquery) throw"jQuery not loaded!";
        module.exports = jquery
    }, function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE__2__
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_AMD_DEFINE_RESULT__;

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window
        }.call(exports, __webpack_require__, exports, module), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(1);

        function generateMaskSet(opts, nocache) {
            var ms;

            function generateMask(mask, metadata, opts) {
                var regexMask = !1, masksetDefinition, maskdefKey;
                if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1]
                }
                return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    excludes: {},
                    metadata: metadata,
                    maskLength: void 0,
                    jitOffset: {}
                }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition
            }

            if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
                if (1 < opts.mask.length) {
                    if (null === opts.keepStatic) {
                        opts.keepStatic = "auto";
                        for (var i = 0; i < opts.mask.length; i++) if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                            opts.keepStatic = !0;
                            break
                        }
                    }
                    var altMask = opts.groupmarker[0];
                    return $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
                        1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), void 0 === msk.mask || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask
                    }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts)
                }
                opts.mask = opts.mask.pop()
            }
            return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), ms
        }

        function analyseMask(mask, regexMask, opts) {
            var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                escaped = !1, currentToken = new MaskToken, match, m, openenings = [], maskTokens = [], openingToken,
                currentOpeningToken, alternator, lastMatch, closeRegexGroup = !1;

            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
                    min: 1,
                    max: 1
                }
            }

            function insertTestDefinition(mtoken, element, position) {
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                    fn: new RegExp(element, opts.casing ? "i" : ""),
                    static: !1,
                    optionality: !1,
                    newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: void 0,
                    nativeDef: element
                }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function (ndx, lmnt) {
                    prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                        nativeDef: (escaped ? "'" : "") + lmnt
                    })
                })), escaped = !1; else {
                    var maskdef = (opts.definitions ? opts.definitions[element] : void 0) || Inputmask.prototype.definitions[element];
                    maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                            this.test = maskdef.validator
                        } : new RegExp("."),
                        static: !1,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        nativeDef: element
                    }) : (mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || element,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                        nativeDef: (escaped ? "'" : "") + element
                    }), escaped = !1)
                }
            }

            function verifyGroupMarker(maskToken) {
                maskToken && maskToken.matches && $.each(maskToken.matches, function (ndx, token) {
                    var nextToken = maskToken.matches[ndx + 1];
                    (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), verifyGroupMarker(token)
                })
            }

            function defaultCase() {
                if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
                    }
                } else insertTestDefinition(currentToken, m)
            }

            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), st
                }

                for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt)
                    }
                    void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match])
                }
                return maskToken
            }

            function groupify(matches) {
                var groupToken = new MaskToken(!0);
                return groupToken.openGroup = !1, groupToken.matches = matches, groupToken
            }

            function closeGroup() {
                if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
                    }
                } else currentToken.matches.push(openingToken); else defaultCase()
            }

            function groupQuantifier(matches) {
                var lastMatch = matches.pop();
                return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch
            }

            for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
                if (m = match[0], regexMask) switch (m.charAt(0)) {
                    case"?":
                        m = "{0,1}";
                        break;
                    case"+":
                    case"*":
                        m = "{" + m + "}";
                        break;
                    case"|":
                        if (0 === openenings.length) {
                            var altRegexGroup = groupify(currentToken.matches);
                            altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], closeRegexGroup = !0
                        }
                        break
                }
                if (escaped) defaultCase(); else switch (m.charAt(0)) {
                    case"(?=":
                        break;
                    case"(?!":
                        break;
                    case"(?<=":
                        break;
                    case"(?<!":
                        break;
                    case opts.escapeChar:
                        escaped = !0, regexMask && defaultCase();
                        break;
                    case opts.optionalmarker[1]:
                    case opts.groupmarker[1]:
                        closeGroup();
                        break;
                    case opts.optionalmarker[0]:
                        openenings.push(new MaskToken(!1, !0));
                        break;
                    case opts.groupmarker[0]:
                        openenings.push(new MaskToken(!0));
                        break;
                    case opts.quantifiermarker[0]:
                        var quantifier = new MaskToken(!1, !1, !0);
                        m = m.replace(/[{}]/g, "");
                        var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                            mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                        "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                            min: mq0,
                            max: mq1,
                            jit: mqj[1]
                        };
                        var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
                        if (match = matches.pop(), match.isAlternator) {
                            matches.push(match), matches = match.matches;
                            var groupToken = new MaskToken(!0), tmpMatch = matches.pop();
                            matches.push(groupToken), matches = groupToken.matches, match = tmpMatch
                        }
                        match.isGroup || (match = groupify([match])), matches.push(match), matches.push(quantifier);
                        break;
                    case opts.alternatormarker:
                        if (0 < openenings.length) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                            lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches)
                        } else lastMatch = groupQuantifier(currentToken.matches);
                        if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
                            lastMatch.openGroup = !1;
                            var alternatorGroup = new MaskToken(!0);
                            alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup)
                        }
                        break;
                    default:
                        defaultCase()
                }
            }
            for (closeRegexGroup && closeGroup(); 0 < openenings.length;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
            return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens
        }

        module.exports = {generateMaskSet: generateMaskSet, analyseMask: analyseMask}
    }, function (module, exports, __webpack_require__) {
        "use strict";
        __webpack_require__(6), __webpack_require__(8), __webpack_require__(9), module.exports = __webpack_require__(0)
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var Inputmask = __webpack_require__(0);
        Inputmask.extendDefinitions({
            A: {validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper"},
            "&": {validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper"},
            "#": {validator: "[0-9A-Fa-f]", casing: "upper"}
        });
        var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");

        function ipValidator(chrs, maskset, pos, strict, opts) {
            return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, ipValidatorRegex.test(chrs)
        }

        Inputmask.extendAliases({
            cssunit: {regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"},
            url: {regex: "(https?|ftp)//.*", autoUnmask: !1},
            ip: {
                mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                definitions: {
                    i: {validator: ipValidator},
                    j: {validator: ipValidator},
                    k: {validator: ipValidator},
                    l: {validator: ipValidator}
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                casing: "lower",
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "")
                },
                definitions: {
                    "*": {validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"},
                    "-": {validator: "[0-9A-Za-z-]"}
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue
                },
                inputmode: "email"
            },
            mac: {mask: "##:##:##:##:##:##"},
            vin: {
                mask: "V{13}9{4}",
                definitions: {V: {validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", casing: "upper"}},
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(1), window = __webpack_require__(3), document = window.document,
            ua = window.navigator && window.navigator.userAgent || "",
            ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"), mobile = "ontouchstart" in window,
            iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
        module.exports = function maskScope(actionObj, maskset, opts) {
            maskset = maskset || this.maskset, opts = opts || this.opts;
            var inputmask = this, el = this.el, isRTL = this.isRTL || (this.isRTL = opts.numericInput), undoValue, $el,
                skipKeyPressEvent = !1, skipInputEvent = !1, validationEvent = !1, ignorable = !1, maxLength,
                mouseEnter = !1, originalPlaceholder = void 0;

            function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
                var greedy = opts.greedy;
                clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
                var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos;
                do {
                    if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test)); else {
                        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice();
                        var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                        (!1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))
                    }
                    "auto" === opts.keepStatic && test.newBlockMarker && !0 !== test.static && (opts.keepStatic = pos - 1), pos++
                } while ((void 0 === maxLength || pos < maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
                return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), opts.greedy = greedy, maskTemplate
            }

            function resetMaskSet(soft) {
                maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0)
            }

            function getLastValidPosition(closestTo, strict, validPositions) {
                var before = -1, after = -1, valids = validPositions || maskset.validPositions;
                for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
                    var psNdx = parseInt(posNdx);
                    valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx))
                }
                return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after
            }

            function getDecisionTaker(tst) {
                var decisionTaker = tst.locator[tst.alternation];
                return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), void 0 !== decisionTaker ? decisionTaker.toString() : ""
            }

            function getLocator(tst, align) {
                var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
                if ("" !== locator) for (; locator.length < align;) locator += "0";
                return locator
            }

            function determineTestTemplate(pos, tests) {
                pos = 0 < pos ? pos - 1 : 0;
                for (var altTest = getTest(pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
                    var tst = tests[ndx];
                    tstLocator = getLocator(tst, targetLocator.length);
                    var distance = Math.abs(tstLocator - targetLocator);
                    (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, bestMatch = tst)
                }
                return bestMatch
            }

            function getTestTemplate(pos, ndxIntlzr, tstPs) {
                return maskset.validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs))
            }

            function getTest(pos, tests) {
                return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests(pos))[0]
            }

            function positionCanMatchDefinition(pos, testDefinition, opts) {
                for (var valid = !1, tests = getTests(pos), defProp = opts.shiftPositions ? "def" : "nativeDef", tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match[defProp] === testDefinition.match[defProp]) {
                    valid = !0;
                    break
                }
                return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition(pos + maskset.jitOffset[pos], testDefinition, opts)), valid
            }

            function getTests(pos, ndxIntlzr, tstPs) {
                var maskTokens = maskset.maskToken, testPos = ndxIntlzr ? tstPs : 0,
                    ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0], matches = [], insertStop = !1, latestMatch,
                    cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

                function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        function isFirstMatch(latestMatch, tokenGroup) {
                            var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                            return firstMatch || $.each(tokenGroup.matches, function (ndx, match) {
                                if (!0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), firstMatch) return !1
                            }), firstMatch
                        }

                        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                            var bestMatch, indexPos;
                            if ((maskset.tests[pos] || maskset.validPositions[pos]) && $.each(maskset.tests[pos] || [maskset.validPositions[pos]], function (ndx, lmnt) {
                                if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                                var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
                                    ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos)
                            }), bestMatch) {
                                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
                                    locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                                return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1)
                            }
                            return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0
                        }

                        function isSubsetOf(source, target) {
                            function expand(pattern) {
                                for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end;) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i), expanded.push(pattern.charAt(i));
                                return expanded.join("")
                            }

                            return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")))
                        }

                        function staticCanMatchDefinition(source, target) {
                            return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1)
                        }

                        function setMergeLocators(targetMatch, altMatch) {
                            if (void 0 === altMatch || targetMatch.alternation === altMatch.alternation && -1 === targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation])) {
                                targetMatch.mloc = targetMatch.mloc || {};
                                var locNdx = targetMatch.locator[targetMatch.alternation];
                                if (void 0 !== locNdx) {
                                    if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), void 0 !== altMatch) {
                                        for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                        targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",")
                                    }
                                    return !0
                                }
                                targetMatch.alternation = void 0
                            }
                            return !1
                        }

                        if (500 < testPos && void 0 !== quantifierRecurse) throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
                        if (testPos === pos && void 0 === match.matches) return matches.push({
                            match: match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency,
                            mloc: {}
                        }), !0;
                        if (void 0 !== match.matches) {
                            if (match.isGroup && quantifierRecurse !== match) {
                                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse), match) return !0
                            } else if (match.isOptional) {
                                var optionalToken = match, mtchsNdx = matches.length;
                                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) {
                                    if ($.each(matches, function (ndx, mtch) {
                                        mtchsNdx <= ndx && (mtch.match.optionality = !0)
                                    }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                                    insertStop = !0, testPos = pos
                                }
                            } else if (match.isAlternator) {
                                var alternateToken = match, malternateMatches = [], maltMatches,
                                    currentMatches = matches.slice(), loopNdxCnt = loopNdx.length,
                                    altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                                if (-1 === altIndex || "string" == typeof altIndex) {
                                    var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(),
                                        altIndexArr = [], amndx;
                                    if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                                    if (void 0 !== maskset.excludes[pos]) {
                                        for (var altIndexArrClone = altIndexArr.slice(), i = 0, el = maskset.excludes[pos].length; i < el; i++) altIndexArr.splice(altIndexArr.indexOf(maskset.excludes[pos][i].toString()), 1);
                                        0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone)
                                    }
                                    (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                                    for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                        amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                            var altMatch = maltMatches[ndx1], dropMatch = !1;
                                            altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);
                                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                var altMatch2 = malternateMatches[ndx2];
                                                if ("string" != typeof altIndex || void 0 !== altMatch.alternation && -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                        dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                                        break
                                                    }
                                                    if (isSubsetOf(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break
                                                    }
                                                    if (isSubsetOf(altMatch2, altMatch)) {
                                                        setMergeLocators(altMatch2, altMatch);
                                                        break
                                                    }
                                                    if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break
                                                    }
                                                }
                                            }
                                            dropMatch || malternateMatches.push(altMatch)
                                        }
                                    }
                                    matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice()
                                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                                if (match) return !0
                            } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup), match) {
                                    if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                        insertStop = !0, testPos = pos;
                                        break
                                    }
                                    return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), !0
                                }
                            } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) return !0
                        } else testPos++
                    }

                    for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                        var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                        if (match && testPos === pos) return match;
                        if (pos < testPos) break
                    }
                }

                function mergeLocators(pos, tests) {
                    var locator = [];
                    return $.isArray(tests) || (tests = [tests]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate(pos, tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : $.each(tests, function (ndx, tst) {
                        if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i])
                    })), locator
                }

                if (-1 < pos && (void 0 === maxLength || pos < maxLength)) {
                    if (void 0 === ndxIntlzr) {
                        for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos;) previousPos--;
                        void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos)
                    }
                    if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
                    for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                        var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
                        if (match && testPos === pos || pos < testPos) break
                    }
                }
                return 0 !== matches.length && !insertStop || matches.push({
                    match: {
                        fn: null,
                        static: !0,
                        optionality: !1,
                        casing: null,
                        def: "",
                        placeholder: ""
                    }, locator: [], mloc: {}, cd: cacheDependency
                }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), maskset.tests[pos])
            }

            function getBufferTemplate() {
                return void 0 === maskset._buffer && (maskset._buffer = getMaskTemplate(!1, 1), void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer
            }

            function getBuffer(noCache) {
                return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = getMaskTemplate(!0, getLastValidPosition(), !0), void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer
            }

            function refreshFromBuffer(start, end, buffer) {
                var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
                if (opts.skipOptionalPartCharacter = "", !0 === start) resetMaskSet(), maskset.tests = {}, start = 0, end = buffer.length; else for (i = start; i < end; i++) delete maskset.validPositions[i];
                for (p = start, i = start; i < end; i++) {
                    var valResult = isValid(p, buffer[i], !0, !0);
                    !1 !== valResult && (p = void 0 !== valResult.caret && valResult.caret > valResult.pos ? valResult.caret : valResult.pos + 1)
                }
                opts.skipOptionalPartCharacter = skipOptionalPartCharacter
            }

            function casing(elem, test, pos) {
                switch (opts.casing || test.casing) {
                    case"upper":
                        elem = elem.toUpperCase();
                        break;
                    case"lower":
                        elem = elem.toLowerCase();
                        break;
                    case"title":
                        var posBefore = maskset.validPositions[pos - 1];
                        elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                        break;
                    default:
                        if ($.isFunction(opts.casing)) {
                            var args = Array.prototype.slice.call(arguments);
                            args.push(maskset.validPositions), elem = opts.casing.apply(this, args)
                        }
                }
                return elem
            }

            function checkAlternationMatch(altArr1, altArr2, na) {
                for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                    isMatch = !0;
                    break
                }
                return isMatch
            }

            function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
                var validPsClone = $.extend(!0, {}, maskset.validPositions), tstClone = $.extend(!0, {}, maskset.tests),
                    lastAlt, alternation, isValidRslt = !1, returnRslt = !1, altPos, prevAltPos, i, validPos,
                    decisionPos, lAltPos = void 0 !== rAltPos ? rAltPos : getLastValidPosition(), nextPos, input, begin,
                    end;
                if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = getTest(lastAlt), alternation = prevAltPos.alternation; else for (; 0 <= lAltPos; lAltPos--) if (altPos = maskset.validPositions[lAltPos], altPos && void 0 !== altPos.alternation) {
                    if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                    lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos
                }
                if (void 0 !== alternation) {
                    decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], !0 !== maskPos && maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos));
                    var validInputs = [], resultPos = -1;
                    for (i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), delete maskset.validPositions[i];
                    for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;) {
                        for (maskset.tests[decisionPos] = void 0, resetMaskSet(!0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || getLastValidPosition(void 0, !0) + 1, input = validInputs[i], isValidRslt = isValid(nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt);
                        if (isValidRslt) break;
                        if (resetMaskSet(), prevAltPos = getTest(decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break
                        }
                        var decisionTaker = getDecisionTaker(prevAltPos);
                        if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker)) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break
                        }
                        for (maskset.excludes[decisionPos].push(decisionTaker), i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) delete maskset.validPositions[i]
                    }
                }
                return delete maskset.excludes[decisionPos], returnRslt
            }

            function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly) {
                function isSelection(posObj) {
                    return isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1
                }

                strict = !0 === strict;
                var maskPos = pos;

                function processCommandObject(commandObj) {
                    if (void 0 !== commandObj) {
                        if (void 0 !== commandObj.remove && ($.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]), $.each(commandObj.remove.sort(function (a, b) {
                            return b.pos - a.pos
                        }), function (ndx, lmnt) {
                            revalidateMask({begin: lmnt, end: lmnt + 1})
                        }), commandObj.remove = void 0), void 0 !== commandObj.insert && ($.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]), $.each(commandObj.insert.sort(function (a, b) {
                            return a.pos - b.pos
                        }), function (ndx, lmnt) {
                            "" !== lmnt.c && isValid(lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid)
                        }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
                            var refresh = commandObj.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), commandObj.refreshFromBuffer = void 0
                        }
                        void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, commandObj = !0)
                    }
                    return commandObj
                }

                function _isValid(position, c, strict) {
                    var rslt = !1;
                    return $.each(getTests(position), function (ndx, tst) {
                        var test = tst.match;
                        if (getBuffer(!0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                            c: getPlaceholder(position, test, !0) || test.def,
                            pos: position
                        }, !1 !== rslt) {
                            var elem = void 0 !== rslt.c ? rslt.c : c, validatedPos = position;
                            return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? getPlaceholder(position, test, !0) || test.def : elem, rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (!1 === revalidateMask(pos, $.extend({}, tst, {input: casing(elem, test, validatedPos)}), fromIsValid, validatedPos) && (rslt = !1), !1)
                        }
                    }), rslt
                }

                void 0 !== pos.begin && (maskPos = isRTL ? pos.end : pos.begin);
                var result = !0, positionsClone = $.extend(!0, {}, maskset.validPositions);
                if ($.isFunction(opts.preValidation) && !0 !== fromIsValid && !0 !== validateOnly && !0 !== fromAlternate && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, maskset, pos, strict), result = processCommandObject(result)), !0 === result) {
                    if (void 0 === maxLength || maskPos < maxLength) {
                        if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
                            var currentPosValid = maskset.validPositions[maskPos];
                            if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                                if (opts.insertMode || void 0 === maskset.validPositions[seekNext(maskPos)] || pos.end > maskPos) {
                                    var skip = !1;
                                    if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[seekNext(maskPos)] && (result = isValid(maskPos + maskset.jitOffset[maskPos], c, !0), !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), !1 !== result) {
                                        result = trackbackPositions(maskPos, void 0 !== result.pos ? result.pos : nPos) || result, maskPos = nPos;
                                        break
                                    }
                                }
                            } else result = {caret: seekNext(maskPos)}
                        }
                    } else result = !1;
                    !1 !== result || !1 !== opts.keepStatic && !isComplete(getBuffer()) && 0 !== maskPos || strict || !0 === fromAlternate || (result = alternate(maskPos, c, strict, fromIsValid, void 0, pos)), !0 === result && (result = {pos: maskPos})
                }
                if ($.isFunction(opts.postValidation) && !1 !== result && !0 !== fromIsValid && !0 !== validateOnly) {
                    var postResult = opts.postValidation(getBuffer(!0), void 0 !== pos.begin ? isRTL ? pos.end : pos.begin : pos, result, opts, maskset, strict);
                    void 0 !== postResult && (result = !0 === postResult ? result : postResult)
                }
                result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (resetMaskSet(!0), maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions(void 0, maskPos, !0);
                var endResult = processCommandObject(result);
                return endResult
            }

            function trackbackPositions(originalPos, newPos, fillOnly) {
                if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) ;
                for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !isMask(ps, !0)) {
                    var vp = 0 == ps ? getTest(ps) : maskset.validPositions[ps - 1];
                    if (vp) {
                        var tests = getTests(ps).slice();
                        "" === tests[tests.length - 1].match.def && tests.pop();
                        var bestMatch = determineTestTemplate(ps, tests), np;
                        if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def}), bestMatch.generatedInput = !0, revalidateMask(ps, bestMatch, !0), !0 !== fillOnly)) {
                            var cvpInput = maskset.validPositions[newPos].input;
                            return maskset.validPositions[newPos] = void 0, isValid(newPos, cvpInput, !0, !0)
                        }
                    }
                }
            }

            function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
                function IsEnclosedStatic(pos, valids, selection) {
                    var posMatch = valids[pos];
                    if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
                    var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1],
                        nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
                    return prevMatch && nextMatch
                }

                var offset = 0, begin = void 0 !== pos.begin ? pos.begin : pos,
                    end = void 0 !== pos.end ? pos.end : pos;
                if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), void 0 === validTest && !1 === opts.insertMode && end < maskset.maskLength && (0 === begin && 0 === end || (begin += 1, end += 1)), validatedPos = void 0 !== validatedPos ? validatedPos : begin, begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
                    var positionsClone = $.extend(!0, {}, maskset.validPositions),
                        lvp = void 0 === validTest && !1 === opts.insertMode ? 1 < end ? end - 1 : end : getLastValidPosition(void 0, !0),
                        i;
                    for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
                    var valid = !0, j = validatedPos, posMatch = j, t;
                    if (i = j, validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), posMatch++, j++, begin < end && i++), validTest || opts.insertMode) for (; i <= lvp; i++) {
                        if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
                            begin: begin,
                            end: end
                        }))) {
                            for (; "" !== getTest(posMatch).match.def;) {
                                if (positionCanMatchDefinition(posMatch, t, opts) || "+" === t.match.def) {
                                    "+" === t.match.def && getBuffer(!0);
                                    var result = isValid(posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                                    if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid) break
                                } else valid = !1;
                                if (valid) {
                                    void 0 === validTest && t.match.static && i === pos.begin && offset++;
                                    break
                                }
                                if (!valid && posMatch > maskset.maskLength) break;
                                posMatch++
                            }
                            "" == getTest(posMatch).match.def && (valid = !1), posMatch = j
                        }
                        if (!valid) break
                    }
                    if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), resetMaskSet(!0), !1
                } else validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
                return resetMaskSet(!0), offset
            }

            function isMask(pos, strict, fuzzy) {
                var test = getTestTemplate(pos).match;
                if ("" === test.def && (test = getTest(pos).match), !0 !== test.static) return test.fn;
                if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
                if (!0 !== strict && -1 < pos) {
                    var tests = getTests(pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)
                }
                return !1
            }

            function seekNext(pos, newBlock) {
                for (var position = pos + 1; "" !== getTest(position).match.def && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position, void 0, !0)) || !0 !== newBlock && !isMask(position, void 0, !0));) position++;
                return position
            }

            function seekPrevious(pos, newBlock) {
                var position = pos, tests;
                if (position <= 0) return 0;
                for (; 0 < --position && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position, void 0, !0) && (tests = getTests(position), tests.length < 2 || 2 === tests.length && "" === tests[1].match.def));) ;
                return position
            }

            function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
                if (event && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                    if (result) {
                        if (result.refreshFromBuffer) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = getBuffer(!0)
                        }
                        void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos)
                    }
                }
                if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), !0 === triggerEvents)) {
                    var $input = $(input), nptVal = input.inputmask._valueGet();
                    skipInputEvent = !0, $input.trigger("input"), setTimeout(function () {
                        nptVal === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(buffer) && $input.trigger("complete")
                    }, 0)
                }
            }

            function getPlaceholder(pos, test, returnPL) {
                if (test = test || getTest(pos).match, void 0 !== test.placeholder || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
                if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
                if (-1 < pos && void 0 === maskset.validPositions[pos]) {
                    var tests = getTests(pos), staticAlternations = [], prevTest;
                    if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length)
                }
                return test.def
            }

            function HandleNativePlaceholder(npt, value) {
                if (ie) {
                    if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
                        var buffer = getBuffer().slice(), nptValue = npt.inputmask._valueGet();
                        if (nptValue !== value) {
                            var lvp = getLastValidPosition();
                            -1 === lvp && nptValue === getBufferTemplate().join("") ? buffer = [] : -1 !== lvp && clearOptionalTail(buffer), writeBuffer(npt, buffer)
                        }
                    }
                } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"))
            }

            function determineNewCaretPosition(selectedCaret, tabbed) {
                function doRadixFocus(clickPos) {
                    if ("" !== opts.radixPoint && 0 !== opts.digits) {
                        var vps = maskset.validPositions;
                        if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
                            if (clickPos < seekNext(-1)) return !0;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (-1 !== radixPos) {
                                for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                return !0
                            }
                        }
                    }
                    return !1
                }

                if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                    case"none":
                        break;
                    case"select":
                        return {begin: 0, end: getBuffer().length};
                    case"ignore":
                        return seekNext(getLastValidPosition());
                    case"radixFocus":
                        if (doRadixFocus(selectedCaret.begin)) {
                            var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                            return opts.numericInput ? seekNext(radixPos) : radixPos
                        }
                    default:
                        var clickPosition = selectedCaret.begin,
                            lvclickPosition = getLastValidPosition(clickPosition, !0),
                            lastPosition = seekNext(-1 !== lvclickPosition || isMask(0) ? lvclickPosition : 0);
                        if (clickPosition < lastPosition) return isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition);
                        var lvp = maskset.validPositions[lvclickPosition],
                            tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : void 0, lvp),
                            placeholder = getPlaceholder(lastPosition, tt.match);
                        if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                            var newPos = seekNext(lastPosition);
                            (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos)
                        }
                        return lastPosition
                }
            }

            var EventRuler = {
                on: function on(input, eventName, eventHandler) {
                    var ev = function ev(e) {
                        var that = this, args;
                        if (void 0 === that.inputmask && "FORM" !== this.nodeName) {
                            var imOpts = $.data(that, "_inputmask_opts");
                            imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that)
                        } else {
                            if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                                switch (e.type) {
                                    case"input":
                                        if (!0 === skipInputEvent || e.originalEvent && "insertCompositionText" === e.originalEvent.inputType) return skipInputEvent = !1, e.preventDefault();
                                        if (mobile) return args = arguments, setTimeout(function () {
                                            eventHandler.apply(that, args), caret(that, that.inputmask.caretPos, void 0, !0)
                                        }, 0), !1;
                                        break;
                                    case"keydown":
                                        skipKeyPressEvent = !1, skipInputEvent = !1;
                                        break;
                                    case"keypress":
                                        if (!0 === skipKeyPressEvent) return e.preventDefault();
                                        skipKeyPressEvent = !0;
                                        break;
                                    case"click":
                                    case"focus":
                                        return validationEvent ? (validationEvent = !1, input.blur(), HandleNativePlaceholder(input, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("")), setTimeout(function () {
                                            input.focus()
                                        }, 3e3)) : (args = arguments, setTimeout(function () {
                                            eventHandler.apply(that, args)
                                        }, 0)), !1
                                }
                                var returnVal = eventHandler.apply(that, arguments);
                                return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal
                            }
                            e.preventDefault()
                        }
                    };
                    input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev)
                }, off: function off(input, event) {
                    var events;
                    input.inputmask && input.inputmask.events && (event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, $.each(events, function (eventName, evArr) {
                        for (; 0 < evArr.length;) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev)
                        }
                        delete input.inputmask.events[eventName]
                    }))
                }
            }, EventHandlers = {
                keydownEvent: function keydownEvent(e, fromInputFallback) {
                    var input = this, $input = $(input), k = e.keyCode, pos = caret(input),
                        kdResult = opts.onKeyDown.call(this, e, getBuffer(), pos, opts);
                    if (void 0 !== kdResult) return kdResult;
                    if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !("oncut" in input)) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), !0 === fromInputFallback && !1 === opts.insertMode ? seekPrevious(maskset.p) : maskset.p, e, input.inputmask._valueGet() !== getBuffer().join("")); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                        e.preventDefault();
                        var caretPos = seekNext(getLastValidPosition());
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0)
                    } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (!0 === getTest(pos.begin).match.static && (pos.begin = seekNext(pos.begin)), pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), pos.end = seekNext(pos.begin, !0), pos.end < maskset.maskLength && pos.end--), pos.begin < maskset.maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function () {
                        var caretPos = caret(input);
                        caret(input, caretPos.begin)
                    }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function () {
                        var caretPos_begin = translatePosition(input.inputmask.caretPos.begin),
                            caretPos_end = translatePosition(input.inputmask.caretPos.end);
                        caret(input, isRTL ? caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1) : caretPos_begin - (0 === caretPos_begin ? 0 : 1))
                    }, 0));
                    ignorable = -1 !== $.inArray(k, opts.ignorables)
                }, keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
                    var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
                    if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function () {
                        $input.trigger("change")
                    }, 0)), !0;
                    if (k) {
                        46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
                        var pos = checkval ? {begin: ndx, end: ndx} : caret(input), forwardPosition,
                            c = String.fromCharCode(k);
                        maskset.writeOutBuffer = !0;
                        var valResult = isValid(pos, c, strict);
                        if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos), maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, !1 !== writeOut && (setTimeout(function () {
                            opts.onKeyValidation.call(input, k, valResult, opts)
                        }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
                            var buffer = getBuffer();
                            writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval)
                        }
                        if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult
                    }
                }, pasteEvent: function pasteEvent(e) {
                    var input = this, ev = e.originalEvent || e, inputValue = this.inputmask._valueGet(!0),
                        caretPos = caret(this), tempValue;
                    isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                    var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
                        valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                    if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                        if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
                        inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret
                    }
                    var pasteValue = inputValue;
                    if ($.isFunction(opts.onBeforePaste)) {
                        if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
                        pasteValue = pasteValue || inputValue
                    }
                    return checkVal(this, !1, !1, pasteValue.toString().split("")), writeBuffer(this, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), e.preventDefault()
                }, inputFallBackEvent: function inputFallBackEvent(e) {
                    function radixPointHandler(input, inputValue, caretPos) {
                        return "." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && (inputValue = inputValue.split(""), inputValue[caretPos.begin - 1] = opts.radixPoint.charAt(0), inputValue = inputValue.join("")), inputValue
                    }

                    function ieMobileHandler(input, inputValue, caretPos) {
                        if (iemobile) {
                            var inputChar = inputValue.replace(getBuffer().join(""), "");
                            if (1 === inputChar.length) {
                                var iv = inputValue.split("");
                                iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("")
                            }
                        }
                        return inputValue
                    }

                    var input = this, inputValue = input.inputmask._valueGet();
                    if (getBuffer().join("") !== inputValue) {
                        var caretPos = caret(input);
                        if (inputValue = radixPointHandler(input, inputValue, caretPos), inputValue = ieMobileHandler(input, inputValue, caretPos), getBuffer().join("") !== inputValue) {
                            var buffer = getBuffer().join(""),
                                offset = !opts.numericInput && inputValue.length > buffer.length ? -1 : 0,
                                frontPart = inputValue.substr(0, caretPos.begin),
                                backPart = inputValue.substr(caretPos.begin),
                                frontBufferPart = buffer.substr(0, caretPos.begin + offset),
                                backBufferPart = buffer.substr(caretPos.begin + offset), selection = caretPos,
                                entries = "", isEntry = !1;
                            if (frontPart !== frontBufferPart) {
                                var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length,
                                    i;
                                for (i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) ;
                                isEntry && (selection.begin = i - offset, entries += frontPart.slice(i, selection.end))
                            }
                            if (backPart !== backBufferPart && (backPart.length > backBufferPart.length ? entries += backPart.slice(0, 1) : backPart.length < backBufferPart.length && (selection.end += backBufferPart.length - backPart.length, isEntry || "" === opts.radixPoint || "" !== backPart || frontPart.charAt(selection.begin + offset - 1) !== opts.radixPoint || (selection.begin--, entries = opts.radixPoint))), writeBuffer(input, getBuffer(), {
                                begin: selection.begin + offset,
                                end: selection.end + offset
                            }), 0 < entries.length) document.activeElement !== input && (input.focus(), caret(input, selection)), $.each(entries.split(""), function (ndx, entry) {
                                var keypress = new $.Event("keypress");
                                keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress)
                            }); else {
                                selection.begin === selection.end - 1 && (selection.begin = seekPrevious(selection.begin + 1), selection.begin === selection.end - 1 ? caret(input, selection.begin) : caret(input, selection.begin, selection.end));
                                var keydown = new $.Event("keydown");
                                keydown.keyCode = opts.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call(input, keydown, !0)
                            }
                            e.preventDefault()
                        }
                    }
                }, compositionendEvent: function compositionendEvent(e) {
                    $el.trigger("input")
                }, setValueEvent: function setValueEvent(e, argument_1, argument_2) {
                    var input = this, value = e && e.detail ? e.detail[0] : argument_1;
                    void 0 === value && (value = this.inputmask._valueGet(!0)), applyInputValue(this, value), (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && caret(this, e.detail ? e.detail[1] : argument_2)
                }, focusEvent: function focusEvent(e) {
                    var input = this, nptValue = this.inputmask._valueGet();
                    opts.showMaskOnFocus && nptValue !== getBuffer().join("") && writeBuffer(this, getBuffer(), seekNext(getLastValidPosition())), !0 !== opts.positionCaretOnTab || !1 !== mouseEnter || isComplete(getBuffer()) && -1 !== getLastValidPosition() || EventHandlers.clickEvent.apply(this, [e, !0]), undoValue = getBuffer().join("")
                }, invalidEvent: function invalidEvent(e) {
                    validationEvent = !0
                }, mouseleaveEvent: function mouseleaveEvent() {
                    var input = this;
                    mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== this && HandleNativePlaceholder(this, originalPlaceholder)
                }, clickEvent: function clickEvent(e, tabbed) {
                    var input = this;
                    if (document.activeElement === this) {
                        var newCaretPosition = determineNewCaretPosition(caret(this), tabbed);
                        void 0 !== newCaretPosition && caret(this, newCaretPosition)
                    }
                }, cutEvent: function cutEvent(e) {
                    var input = this, pos = caret(this), ev = e.originalEvent || e,
                        clipboardData = window.clipboardData || ev.clipboardData,
                        clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                    clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), handleRemove(this, Inputmask.keyCode.DELETE, pos), writeBuffer(this, getBuffer(), maskset.p, e, undoValue !== getBuffer().join(""))
                }, blurEvent: function blurEvent(e) {
                    var $input = $(this), input = this;
                    if (this.inputmask) {
                        HandleNativePlaceholder(this, originalPlaceholder);
                        var nptValue = this.inputmask._valueGet(), buffer = getBuffer().slice();
                        "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), !1 === isComplete(buffer) && (setTimeout(function () {
                            $input.trigger("incomplete")
                        }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(this, buffer, void 0, e)), undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), $input.trigger("change"))
                    }
                }, mouseenterEvent: function mouseenterEvent() {
                    var input = this;
                    mouseEnter = !0, document.activeElement !== this && (null == originalPlaceholder && this.placeholder !== originalPlaceholder && (originalPlaceholder = this.placeholder), opts.showMaskOnHover && HandleNativePlaceholder(this, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("")))
                }, submitEvent: function submitEvent() {
                    undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), opts.clearIncomplete && !1 === isComplete(getBuffer()) && el.inputmask._valueSet(""), opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), setTimeout(function () {
                        writeBuffer(el, getBuffer())
                    }, 0))
                }, resetEvent: function resetEvent() {
                    el.inputmask.refreshValue = !0, setTimeout(function () {
                        applyInputValue(el, el.inputmask._valueGet(!0))
                    }, 0)
                }
            }, valueBuffer;

            function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                var inputmask = this || input.inputmask, inputValue = nptvl.slice(), charCodes = "", initialNdx = -1,
                    result = void 0;

                function isTemplateMatch(ndx, charCodes) {
                    if (opts.regex) return !1;
                    for (var targetTemplate = getMaskTemplate(!0, 0, !1).slice(ndx, seekNext(ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];) charCodeNdx--;
                    var match = 0 === charCodeNdx && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx).match.static && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === getTest(ndx).match.nativeDef && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx + 1).match.static && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
                    return !match && 0 < charCodeNdx && (inputmask.caretPos = {begin: seekNext(charCodeNdx)}), match
                }

                resetMaskSet(), maskset.tests = {}, initialNdx = opts.radixPoint ? determineNewCaretPosition(0) : 0, maskset.p = initialNdx, inputmask.caretPos = {begin: initialNdx};
                var staticMatches = [], prevCaretPos = inputmask.caretPos, sndx, validPos, nextValid;
                if ($.each(inputValue, function (ndx, charCode) {
                    if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++; else {
                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
                        var lvp = getLastValidPosition(void 0, !0);
                        isTemplateMatch(initialNdx, charCodes) ? result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, lvp + 1) : (result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, inputmask.caretPos.begin), result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && (staticMatches.push(result.pos), isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer(void 0, getBuffer(), result.forwardPosition, keypress, !1), inputmask.caretPos = {
                            begin: result.forwardPosition,
                            end: result.forwardPosition
                        }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos
                    }
                }), 0 < staticMatches.length) if (!isComplete(getBuffer()) || staticMatches.length < seekNext(0)) {
                    for (; void 0 !== (sndx = staticMatches.pop());) if (sndx !== staticMatches.length) {
                        var keypress = new $.Event("_checkval"), nextSndx = sndx + 1;
                        for (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0); (nextValid = maskset.validPositions[nextSndx]) && nextValid.input === validPos.input;) nextSndx++;
                        result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && staticMatches.push(result.pos)
                    }
                } else for (; sndx = staticMatches.pop();) validPos = maskset.validPositions[sndx], validPos && (validPos.generatedInput = !0);
                writeOut && writeBuffer(input, getBuffer(), result ? result.forwardPosition : void 0, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type)
            }

            function unmaskedvalue(input) {
                if (input) {
                    if (void 0 === input.inputmask) return input.value;
                    input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0))
                }
                var umValue = [], vps = maskset.validPositions;
                for (var pndx in vps) vps[pndx] && vps[pndx].match && 1 != vps[pndx].match.static && umValue.push(vps[pndx].input);
                var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
                if ($.isFunction(opts.onUnMask)) {
                    var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts)
                }
                return unmaskedValue
            }

            function translatePosition(pos) {
                return !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = el.inputmask._valueGet().length - pos), pos
            }

            function caret(input, begin, end, notranslate) {
                var range;
                if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), !1 === opts.insertMode && begin === end - 1 && end--, {
                    begin: notranslate ? begin : translatePosition(begin),
                    end: notranslate ? end : translatePosition(end)
                };
                if ($.isArray(begin) && (end = isRTL ? begin[0] : begin[1], begin = isRTL ? begin[1] : begin[0]), void 0 !== begin.begin && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin), "number" == typeof begin) {
                    begin = notranslate ? begin : translatePosition(begin), end = notranslate ? end : translatePosition(end), end = "number" == typeof end ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
                        begin: begin,
                        end: end
                    }, !1 === opts.insertMode && begin === end && end++, input === document.activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end); else if (window.getSelection) {
                        if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode)
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
                        var sel = window.getSelection();
                        sel.removeAllRanges(), sel.addRange(range)
                    } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select())
                }
            }

            function determineLastRequiredPosition(returnDefinition) {
                var buffer = getMaskTemplate(!0, getLastValidPosition(), !0, !0), bl = buffer.length, pos,
                    lvp = getLastValidPosition(), positions = {}, lvTest = maskset.validPositions[lvp],
                    ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0, testPos;
                for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
                var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
                for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
                return returnDefinition ? {l: bl, def: positions[bl] ? positions[bl].match : void 0} : bl
            }

            function clearOptionalTail(buffer) {
                buffer.length = 0;
                for (var template = getMaskTemplate(!0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift());) buffer.push(lmnt);
                return buffer
            }

            function isComplete(buffer) {
                if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
                if ("*" !== opts.repeat) {
                    var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
                    if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                        complete = !0;
                        for (var i = 0; i <= aml; i++) {
                            var test = getTestTemplate(i).match;
                            if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== getPlaceholder(i, test)) {
                                complete = !1;
                                break
                            }
                        }
                    }
                    return complete
                }
            }

            function handleRemove(input, k, pos, strict, fromIsValid) {
                if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), isRTL)) {
                    var pend = pos.end;
                    pos.end = pos.begin, pos.begin = pend
                }
                var offset;
                if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE && !1 === opts.insertMode ? pos.end - pos.begin < 1 && (pos.begin = seekPrevious(pos.begin), void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0, !0) ? pos.end + 1 : seekNext(pos.end) + 1, void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.end++), !1 !== (offset = revalidateMask(pos))) {
                    if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== getTest(pos.begin).match.def.indexOf("|")) {
                        var result = alternate(!0);
                        if (result) {
                            var newPos = void 0 !== result.caret ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, !0);
                            (k !== Inputmask.keyCode.DELETE || pos.begin > newPos) && pos.begin
                        }
                    }
                    var lvp = getLastValidPosition(pos.end, !0);
                    lvp < pos.begin ? maskset.p = !1 === opts.insertMode ? seekPrevious(lvp + 1) : seekNext(lvp) : !0 !== strict && (maskset.p = k === Inputmask.keyCode.DELETE ? pos.begin + offset : pos.begin, !1 === opts.insertMode && k === Inputmask.keyCode.DELETE && (maskset.p = pos.end + 1, void 0 === maskset.validPositions[maskset.p] && getLastValidPosition(maskset.maskLength, !0) < maskset.p && (maskset.p = seekPrevious(lvp + 1))))
                }
            }

            function applyInputValue(input, value) {
                input.inputmask.refreshValue = !1, $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.toString().split(""), checkVal(input, !0, !1, value), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && -1 === getLastValidPosition() && input.inputmask._valueSet("")
            }

            function mask(elem) {
                function isElementTypeSupported(input, opts) {
                    function patchValueProperty(npt) {
                        var valueGet, valueSet;

                        function patchValhook(type) {
                            if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
                                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                                        return elem.value
                                    },
                                    valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                                        return elem.value = value, elem
                                    };
                                $.valHooks[type] = {
                                    get: function get(elem) {
                                        if (elem.inputmask) {
                                            if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                            var result = valhookGet(elem);
                                            return -1 !== getLastValidPosition(void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : ""
                                        }
                                        return valhookGet(elem)
                                    }, set: function set(elem, value) {
                                        var result = valhookSet(elem, value);
                                        return elem.inputmask && applyInputValue(elem, value), result
                                    }, inputmaskpatch: !0
                                }
                            }
                        }

                        function getter() {
                            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this)
                        }

                        function setter(value) {
                            valueSet.call(this, value), this.inputmask && applyInputValue(this, value)
                        }

                        function installNativeValueSetFallback(npt) {
                            EventRuler.on(npt, "mouseenter", function () {
                                var input = this, value = this.inputmask._valueGet(!0);
                                value !== (isRTL ? getBuffer().reverse() : getBuffer()).join("") && applyInputValue(this, value)
                            })
                        }

                        if (!npt.inputmask.__valueGet) {
                            if (!0 !== opts.noValuePatching) {
                                if (Object.getOwnPropertyDescriptor) {
                                    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function (object) {
                                        return object.__proto__
                                    } : function (object) {
                                        return object.constructor.prototype
                                    });
                                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                                    valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                                        return this.textContent
                                    }, valueSet = function valueSet(value) {
                                        this.textContent = value
                                    }, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    }))
                                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
                                npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet
                            }
                            npt.inputmask._valueGet = function (overruleRTL) {
                                return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el)
                            }, npt.inputmask._valueSet = function (value, overruleRTL) {
                                valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value)
                            }, void 0 === valueGet && (valueGet = function valueGet() {
                                return this.value
                            }, valueSet = function valueSet(value) {
                                this.value = value
                            }, patchValhook(npt.type), installNativeValueSetFallback(npt))
                        }
                    }

                    var elementType = input.getAttribute("type"),
                        isSupported = "input" === input.tagName.toLowerCase() && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
                    if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
                        var el = document.createElement("input");
                        el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null
                    } else isSupported = "partial";
                    return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, isSupported
                }

                EventRuler.off(elem);
                var isSupported = isElementTypeSupported(elem, opts);
                if (!1 !== isSupported && (el = elem, $el = $(el), originalPlaceholder = el.placeholder, maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0), "inputmode" in el && (el.inputmode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete), EventRuler.on(el, "submit", EventHandlers.submitEvent), EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), EventRuler.on(el, "invalid", EventHandlers.invalidEvent), EventRuler.on(el, "click", EventHandlers.clickEvent), EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                    applyInputValue(el, el.inputmask._valueGet(!0), opts);
                    var buffer = getBuffer().slice();
                    !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && document.activeElement === el || "" !== el.inputmask._valueGet(!0)) && writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()))
                }
            }

            if (void 0 !== actionObj) switch (actionObj.action) {
                case"isComplete":
                    return el = actionObj.el, isComplete(getBuffer());
                case"unmaskedvalue":
                    return void 0 !== el && void 0 === actionObj.value || (valueBuffer = actionObj.value, valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer).split(""), checkVal.call(this, void 0, !1, !1, valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, void 0, getBuffer(), 0, opts)), unmaskedvalue(el);
                case"mask":
                    mask(el);
                    break;
                case"format":
                    return valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer), actionObj.metadata ? {
                        value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                        metadata: maskScope.call(this, {action: "getmetadata"}, maskset, opts)
                    } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                case"isValid":
                    actionObj.value ? (valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer)) : actionObj.value = isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                    for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; rl < lmib && !isMask(lmib); lmib--) ;
                    return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === (isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""));
                case"getemptymask":
                    return getBufferTemplate().join("");
                case"remove":
                    if (el && el.inputmask) {
                        $.data(el, "_inputmask_opts", null), $el = $(el);
                        var cv = opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(opts.autoUnmask),
                            valueProperty;
                        cv !== getBufferTemplate().join("") ? el.inputmask._valueSet(cv, opts.autoUnmask) : el.inputmask._valueSet(""), EventRuler.off(el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                            get: el.inputmask.__valueGet,
                            set: el.inputmask.__valueSet,
                            configurable: !0
                        })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0
                    }
                    return el;
                case"getmetadata":
                    if ($.isArray(maskset.metadata)) {
                        var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                        return $.each(maskset.metadata, function (ndx, mtdt) {
                            if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1
                        }), maskTarget
                    }
                    return maskset.metadata
            }
        }
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var Inputmask = __webpack_require__(0), $ = Inputmask.dependencyLib, formatCode = {
            d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
            dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
                return pad(Date.prototype.getDate.call(this), 2)
            }],
            ddd: [""],
            dddd: [""],
            m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                return Date.prototype.getMonth.call(this) + 1
            }],
            mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                return pad(Date.prototype.getMonth.call(this) + 1, 2)
            }],
            mmm: [""],
            mmmm: [""],
            yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
                return pad(Date.prototype.getFullYear.call(this), 2)
            }],
            yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
                return pad(Date.prototype.getFullYear.call(this), 4)
            }],
            h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
            hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
                return pad(Date.prototype.getHours.call(this), 2)
            }],
            hhh: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
            H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
            HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
                return pad(Date.prototype.getHours.call(this), 2)
            }],
            HHH: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
            M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
            MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
                return pad(Date.prototype.getMinutes.call(this), 2)
            }],
            s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
            ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
                return pad(Date.prototype.getSeconds.call(this), 2)
            }],
            l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
                return pad(Date.prototype.getMilliseconds.call(this), 3)
            }],
            L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
                return pad(Date.prototype.getMilliseconds.call(this), 2)
            }],
            t: ["[ap]"],
            tt: ["[ap]m"],
            T: ["[AP]"],
            TT: ["[AP]M"],
            Z: [""],
            o: [""],
            S: [""]
        }, formatAlias = {
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        function getTokenizer(opts) {
            if (!opts.tokenizer) {
                var tokens = [];
                for (var ndx in formatCode) -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
                opts.tokenizer = "(" + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g")
            }
            return opts.tokenizer
        }

        function isValidDate(dateParts, currentResult) {
            return (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) && currentResult
        }

        function isDateInRange(dateParts, opts) {
            var result = !0;
            if (opts.min) {
                if (dateParts.rawyear) {
                    var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
                        minYear = opts.min.year.substr(0, rawYear.length);
                    result = minYear <= rawYear
                }
                dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime())
            }
            return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), result
        }

        function parse(format, dateObjValue, opts, raw) {
            var mask = "", match;
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) if (void 0 === dateObjValue) if (formatCode[match[0]]) mask += "(" + formatCode[match[0]][0] + ")"; else switch (match[0]) {
                case"[":
                    mask += "(";
                    break;
                case"]":
                    mask += ")?";
                    break;
                default:
                    mask += Inputmask.escapeRegex(match[0])
            } else if (formatCode[match[0]]) if (!0 !== raw && formatCode[match[0]][3]) {
                var getFn = formatCode[match[0]][3];
                mask += getFn.call(dateObjValue.date)
            } else formatCode[match[0]][2] ? mask += dateObjValue["raw" + formatCode[match[0]][2]] : mask += match[0]; else mask += match[0];
            return mask
        }

        function pad(val, len) {
            for (val = String(val), len = len || 2; val.length < len;) val = "0" + val;
            return val
        }

        function analyseMask(maskString, format, opts) {
            var dateObj = {date: new Date(1, 0, 1)}, targetProp, mask = maskString, match, dateOperation;

            function extendProperty(value) {
                var correctedValue = value.replace(/[^0-9]/g, "0");
                return correctedValue
            }

            function setValue(dateObj, value, opts) {
                dateObj[targetProp] = extendProperty(value), dateObj["raw" + targetProp] = value, void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp])
            }

            if ("string" == typeof mask) {
                for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
                    var value = mask.slice(0, match[0].length);
                    formatCode.hasOwnProperty(match[0]) && (targetProp = formatCode[match[0]][2], dateOperation = formatCode[match[0]][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length)
                }
                return dateObj
            }
            if (mask && "object" === _typeof(mask) && mask.hasOwnProperty("date")) return mask
        }

        Inputmask.extendAliases({
            datetime: {
                mask: function mask(opts) {
                    return formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), opts.regex = parse(opts.inputFormat, void 0, opts), null
                },
                placeholder: "",
                inputFormat: "isoDateTime",
                displayFormat: void 0,
                outputFormat: void 0,
                min: null,
                max: null,
                skipOptionalPartCharacter: "",
                i18n: {
                    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    ordinalSuffix: ["st", "nd", "rd", "th"]
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (strict) return !0;
                    var calcPos = 0, targetMatch, match;
                    if (isNaN(c) && buffer[pos] !== c) {
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) if (calcPos += match[0].length, pos <= calcPos) {
                            targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
                            break
                        }
                        if (match && match[0] === c && 1 < targetMatch[0].length) return buffer[pos] = buffer[pos - 1], buffer[pos - 1] = "0", {
                            fuzzy: !0,
                            buffer: buffer,
                            refreshFromBuffer: {start: pos - 1, end: pos + 1},
                            pos: pos + 1
                        }
                    }
                    return !0
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos);
                    var calcPos = 0, match;
                    for (getTokenizer(opts).lastIndex = 0; (match = getTokenizer(opts).exec(opts.inputFormat)) && (calcPos += match[0].length, !(pos < calcPos));) ;
                    if (match && match[0] && void 0 !== formatCode[match[0]]) {
                        var validator = formatCode[match[0]][0],
                            part = buffer.slice(match.index, match.index + match[0].length);
                        !1 === new RegExp(validator).test(part.join("")) && 2 === match[0].length && maskset.validPositions[match.index] && maskset.validPositions[match.index + 1] && (maskset.validPositions[match.index + 1].input = "0")
                    }
                    var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                    return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = isValidDate(dateParts, result), result = result && isDateInRange(dateParts, opts)), pos && result && currentResult.pos !== pos ? {
                        buffer: parse(opts.inputFormat, dateParts, opts).split(""),
                        refreshFromBuffer: {start: pos, end: currentResult.pos}
                    } : result
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var input = this;
                    if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                        var today = new Date, match, date = "";
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) "d" === match[0].charAt(0) ? date += pad(today.getDate(), match[0].length) : "m" === match[0].charAt(0) ? date += pad(today.getMonth() + 1, match[0].length) : "yyyy" === match[0] ? date += today.getFullYear().toString() : "y" === match[0].charAt(0) && (date += pad(today.getYear(), match[0].length));
                        this.inputmask._valueSet(date), $(this).trigger("setvalue")
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue
                },
                casing: function casing(elem, test, pos, validPositions) {
                    return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem
                },
                insertMode: !1,
                shiftPositions: !1,
                keepStatic: !1
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var Inputmask = __webpack_require__(0), $ = Inputmask.dependencyLib;

        function autoEscape(txt, opts) {
            for (var escapedTxt = "", i = 0; i < txt.length; i++) Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
            return escapedTxt
        }

        function alignDigits(buffer, digits, opts, force) {
            if (0 < digits && (!opts.digitsOptional || force)) {
                var radixPosition = $.inArray(opts.radixPoint, buffer);
                -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
                for (var i = 1; i <= digits; i++) buffer[radixPosition + i] = buffer[radixPosition + i] || "0"
            }
            return buffer
        }

        function findValidator(symbol, maskset) {
            var posNdx = 0;
            if ("+" === symbol) {
                for (posNdx in maskset.validPositions) ;
                posNdx = parseInt(posNdx)
            }
            for (var tstNdx in maskset.tests) if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
            return posNdx
        }

        function findValid(symbol, maskset) {
            var ret = -1;
            return $.each(maskset.validPositions, function (ndx, tst) {
                if (tst && tst.match.def === symbol) return ret = parseInt(ndx), !1
            }), ret
        }

        function parseMinMaxOptions(opts) {
            void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), opts.parseMinMaxOptions = "done")
        }

        function genMask(opts) {
            opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
            var decimalDef = "0";
            !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1) : (opts.__financeInput = !1, opts.numericInput = !0);
            var mask = "[+]", altMask;
            if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? mask += opts._mask(opts) : mask += "9{+}", void 0 !== opts.digits && 0 !== opts.digits) {
                var dq = opts.digits.toString().split(",");
                isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + opts.radixPoint + decimalDef + "{0," + opts.digits + "}", opts.keepStatic = !0) : mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}")
            }
            return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]), opts.greedy = !1, parseMinMaxOptions(opts), mask
        }

        function hanndleRadixDance(pos, c, radixPos, opts) {
            return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (pos -= 1), pos
        }

        function decimalValidator(chrs, maskset, pos, strict, opts) {
            var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
                result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
            return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
                insert: {
                    pos: radixPos === pos ? radixPos + 1 : radixPos,
                    c: opts.radixPoint
                }, pos: pos
            } : result
        }

        function checkForLeadingZeroes(buffer, opts) {
            try {
                var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
                    number = numberMatches ? numberMatches[2] : "", leadingzeroes = !1;
                return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes
            } catch (e) {
                console.log(buffer.slice().reverse().join(""))
            }
        }

        Inputmask.extendAliases({
            numeric: {
                mask: genMask,
                _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "999){+|1}"
                },
                placeholder: "0",
                greedy: !1,
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                _radixDance: !0,
                groupSeparator: "",
                allowMinus: !0,
                negationSymbol: {front: "-", back: ""},
                prefix: "",
                suffix: "",
                rightAlign: !0,
                min: null,
                max: null,
                step: 1,
                insertMode: !0,
                autoUnmask: !1,
                unmaskAsNumber: !1,
                inputmode: "numeric",
                skipOptionalPartCharacter: "",
                definitions: {
                    0: {validator: decimalValidator},
                    1: {validator: decimalValidator, definitionSymbol: "*"},
                    "+": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front)
                        }
                    },
                    "-": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && chrs === opts.negationSymbol.back
                        }
                    }
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
                    var radixPos = $.inArray(opts.radixPoint, buffer);
                    if (pos = hanndleRadixDance(pos, c, radixPos, opts), "-" !== c && c !== opts.negationSymbol.front) return !!strict || (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos ? {caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos} : {rewritePosition: isSelection && opts.digitsOptional ? caretPos.end : pos});
                    if (!0 !== opts.allowMinus) return !1;
                    var isNegative = !1, front = findValid("+", maskset), back = findValid("-", maskset);
                    return -1 !== front && (isNegative = [front, back]), !1 !== isNegative ? {
                        remove: isNegative,
                        caret: pos < radixPos ? pos + 1 : pos
                    } : {
                        insert: [{
                            pos: findValidator("+", maskset),
                            c: opts.negationSymbol.front,
                            fromIsValid: !0
                        }, {pos: findValidator("-", maskset), c: opts.negationSymbol.back, fromIsValid: void 0}],
                        caret: pos < radixPos ? pos + 1 : pos
                    }
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    if (null !== opts.min || null !== opts.max) {
                        var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {unmaskAsNumber: !0}));
                        if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length >= opts.min.toString().length || unmasked < 0)) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        };
                        if (null !== opts.max && unmasked > opts.max) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        }
                    }
                    return currentResult
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), Number(processValue)) : processValue
                },
                isComplete: function isComplete(buffer, opts) {
                    var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                    return maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === opts.radixPoint && (maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), isFinite(maskedValue)
                },
                onBeforeMask: function onBeforeMask(initialValue, opts) {
                    var radixPoint = opts.radixPoint || ",";
                    "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
                    var valueParts = initialValue.split(radixPoint),
                        integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
                        decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
                        forceDigits = 1 < valueParts.length;
                    initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
                    var digits = 0;
                    if ("" !== radixPoint && (digits = decimalPart.length, "" !== decimalPart)) {
                        var digitsFactor = Math.pow(10, digits || 1);
                        isFinite(opts.digits) && (digits = parseInt(opts.digits), digitsFactor = Math.pow(10, digits)), initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), "."), isFinite(initialValue) && (initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor), initialValue = initialValue.toString().replace(".", radixPoint)
                    }
                    if (0 === opts.digits && -1 !== initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) && (initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)))), null !== opts.min || null !== opts.max) {
                        var numberValue = initialValue.toString().replace(radixPoint, ".");
                        null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint))
                    }
                    return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("")
                },
                onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
                    function stripBuffer(buffer, stripRadix) {
                        if (!1 !== opts.__financeInput || stripRadix) {
                            var position = $.inArray(opts.radixPoint, buffer);
                            -1 !== position && buffer.splice(position, 1)
                        }
                        if ("" !== opts.groupSeparator) for (; -1 !== (position = buffer.indexOf(opts.groupSeparator));) buffer.splice(position, 1);
                        return buffer
                    }

                    var result, leadingzeroes = checkForLeadingZeroes(buffer, opts);
                    if (leadingzeroes) {
                        var buf = buffer.slice().reverse(), caretNdx = buf.join("").indexOf(leadingzeroes[0]);
                        buf.splice(caretNdx, leadingzeroes[0].length);
                        var newCaretPos = buf.length - caretNdx;
                        stripBuffer(buf), result = {
                            refreshFromBuffer: !0,
                            buffer: buf.reverse(),
                            caret: caretPos < newCaretPos ? caretPos : newCaretPos
                        }
                    }
                    if (e) switch (e.type) {
                        case"blur":
                        case"checkval":
                            if (null !== opts.min) {
                                var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {unmaskAsNumber: !0}));
                                if (null !== opts.min && unmasked < opts.min) return {
                                    refreshFromBuffer: !0,
                                    buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                                }
                            }
                            if ("" !== opts.radixPoint && buffer[0] === opts.radixPoint) result && result.buffer ? result.buffer.shift() : (buffer.shift(), result = {
                                refreshFromBuffer: !0,
                                buffer: stripBuffer(buffer)
                            }); else if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                                var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
                                    number = nmbrMtchs ? nmbrMtchs[2] : "";
                                0 == number && (result = {refreshFromBuffer: !0, buffer: [0]})
                            }
                    }
                    return result
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var $input = $(this), bffr;
                    if (e.ctrlKey) switch (e.keyCode) {
                        case Inputmask.keyCode.UP:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue"), !1;
                        case Inputmask.keyCode.DOWN:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue"), !1
                    }
                    if (!e.shiftKey && (e.keyCode === Inputmask.keyCode.DELETE || e.keyCode === Inputmask.keyCode.BACKSPACE || e.keyCode === Inputmask.keyCode.BACKSPACE_SAFARI)) {
                        if (buffer[e.keyCode === Inputmask.keyCode.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1;
                        if (!0 === opts._radixDance) {
                            var radixPos = $.inArray(opts.radixPoint, buffer);
                            if (opts.digitsOptional) {
                                if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1
                            } else if (-1 !== radixPos && (caretPos.begin < radixPos || e.keyCode === Inputmask.keyCode.DELETE && caretPos.begin === radixPos)) return e.keyCode !== Inputmask.keyCode.BACKSPACE && e.keyCode !== Inputmask.keyCode.BACKSPACE_SAFARI || caretPos.begin++, bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, 1), $input.trigger("setvalue", [alignDigits(bffr, opts.digits, opts).join(""), caretPos.begin]), !1
                        }
                    }
                }
            },
            currency: {prefix: "$ ", groupSeparator: ",", alias: "numeric", digits: 2, digitsOptional: !1},
            decimal: {alias: "numeric"},
            integer: {alias: "numeric", digits: 0},
            percentage: {alias: "numeric", min: 0, max: 100, suffix: " %", digits: 0, allowMinus: !1},
            indianns: {
                alias: "numeric", _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}"
                }, groupSeparator: ",", radixPoint: ".", placeholder: "0", digits: 2, digitsOptional: !1
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(2), Inputmask = __webpack_require__(0);
        void 0 === $.fn.inputmask && ($.fn.inputmask = function (fn, options) {
            var nptmask, input = this[0];
            if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
                case"unmaskedvalue":
                    return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();
                case"remove":
                    return this.each(function () {
                        this.inputmask && this.inputmask.remove()
                    });
                case"getemptymask":
                    return input && input.inputmask ? input.inputmask.getemptymask() : "";
                case"hasMaskedValue":
                    return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();
                case"isComplete":
                    return !input || !input.inputmask || input.inputmask.isComplete();
                case"getmetadata":
                    return input && input.inputmask ? input.inputmask.getmetadata() : void 0;
                case"setvalue":
                    Inputmask.setValue(input, options);
                    break;
                case"option":
                    if ("string" != typeof options) return this.each(function () {
                        if (void 0 !== this.inputmask) return this.inputmask.option(options)
                    });
                    if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
                    break;
                default:
                    return options.alias = fn, nptmask = new Inputmask(options), this.each(function () {
                        nptmask.mask(this)
                    })
            } else {
                if (Array.isArray(fn)) return options.alias = fn, nptmask = new Inputmask(options), this.each(function () {
                    nptmask.mask(this)
                });
                if ("object" == _typeof(fn)) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function () {
                    if (void 0 !== this.inputmask) return this.inputmask.option(fn);
                    nptmask.mask(this)
                }) : this.each(function () {
                    nptmask.mask(this)
                });
                if (void 0 === fn) return this.each(function () {
                    nptmask = new Inputmask(options), nptmask.mask(this)
                })
            }
        })
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var im = __webpack_require__(5), jQuery = __webpack_require__(2);
        im.dependencyLib === jQuery && __webpack_require__(10), module.exports = im
    }], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {enumerable: !0, get: getter})
    }, __webpack_require__.r = function (exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(exports, "__esModule", {value: !0})
    }, __webpack_require__.t = function (value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function (key) {
            return value[key]
        }.bind(null, key));
        return ns
    }, __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module.default
        } : function getModuleExports() {
            return module
        };
        return __webpack_require__.d(getter, "a", getter), getter
    }, __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 11);

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {i: moduleId, l: !1, exports: {}};
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
    }

    var modules, installedModules
});
$(document).ready(function () {
    LoadBasket();
    AddCountClick()
})

function LoadBasket() {
    $("span.basket").load(serverfullname + "action/loadbasket/", {}, function (answer) {
        $('a[rel*=facebox]').facebox()
    })
}

function GetAddToBasketForm(item) {
    $.post(serverfullname + "action/addtobasketform/", {item: item}, function (answer) {
        $.facebox(answer)
    })
}

function AddCountClick() {
    $("#basketcontent .minus, #basketcontent .plus").unbind('click');
    $("#basketcontent .minus, #basketcontent .plus").click(function () {
        var o = $(this);
        var c = o.parent().find(".count");
        var j = o.data("index");
        var cls = o.attr("class");
        if (cls == "plus") {
            newval = parseInt(c.html()) + 1;
            c.html(newval);
            ChangeCount(j, newval)
        }
        if (cls == "minus") {
            newval = parseInt(c.html()) - 1;
            if (newval > 0) {
                c.html(newval);
                ChangeCount(j, newval)
            }
        }
    })
}

function ChangeCount(index, newval) {
    $.post(serverfullname + "action/changecount/", {index: index, newval: newval}, function (answer) {
        location.reload()
    })
}

function GetNextStep() {
}

function ChangeLinkState(item) {
    $("#linkorder" + item).load(serverfullname + "action/orderedlink/", {item: item})
}

function SendBasket() {
    $.post(serverfullname + "action/sendbasket/", $("#sendbasket").serialize(), function (answer) {
        alert(answer)
    })
}

function ShowNextStep() {
    $("#state").show()
}

function DeleteFromBasket(index) {
    if (!confirm("Удалить из заказа ?")) return;
    $.get(serverfullname + "action/delfrombasket/", {index: index}, function (answer) {
        location.reload()
    })
}

function GetBasketContent() {
    $.post(serverfullname + "action/getbasketcontent/", {}, function (answer) {
        $.facebox(answer)
    })
};!function (a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {start: null, current: null},
            direction: null
        }, this._states = {
            current: {},
            tags: {initializing: ["busy"], animating: ["busy"], dragging: ["interacting"]}
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function (b, c) {
            this._pipe.push({filter: c.filter, run: a.proxy(c.run, this)})
        }, this)), this.setup(), this.initialize()
    }

    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {Default: "default", Inner: "inner", Outer: "outer"}, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"], run: function () {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function () {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            var b = this.settings.margin || "", c = !this.settings.autoWidth, d = this.settings.rtl,
                e = {width: "auto", "margin-left": d ? b : "", "margin-right": d ? "" : b};
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, c = null,
                d = this._items.length, e = !this.settings.autoWidth, f = [];
            for (a.items = {
                merge: !1,
                width: b
            }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var b = [], c = this._items, d = this.settings, e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2), g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0, h = "",
                i = "";
            for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var a = this.settings.stagePadding, b = this._coordinates, c = {
                width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                "padding-left": a || "",
                "padding-right": a || ""
            };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            var b = this._coordinates.length, c = !this.settings.autoWidth, d = this.$stage.children();
            if (c && a.items.merge) for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css); else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"], run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"], run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function () {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], e.prototype.initialize = function () {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.setup = function () {
        var b = this.viewport(), c = this.options.responsive, d = -1, e = null;
        c ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, e.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function (b) {
        var c = this.trigger("prepare", {content: b});
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {content: c.data}), c.data
    }, e.prototype.update = function () {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
            return this[a]
        }, this._invalidated), e = {}; b < c;) (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function (a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function () {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function () {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function () {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, e.prototype.registerEventHandlers = function () {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function (b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function (a) {
        var b = null, c = null, d = null, e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function (b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)), e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function (b, c) {
        var d = -1, e = 30, f = this.width(), g = this.coordinates();
        return this.settings.freeDrag || a.each(g, a.proxy(function (a, h) {
            return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1
        }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
    }, e.prototype.animate = function (b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : c ? this.$stage.animate({left: b + "px"}, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({left: b + "px"})
    }, e.prototype.is = function (a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function (a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {property: {name: "position", value: a}});
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function (b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
            return b
        })
    }, e.prototype.reset = function (a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function (a, b) {
        var c = this._items.length, e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
    }, e.prototype.relative = function (a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function (a) {
        var b, c, d, e = this.settings, f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1; else if (e.autoWidth || e.merge) {
            for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d));) ;
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }, e.prototype.minimum = function (a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function (a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function (a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function (b) {
        var c = this._clones.length / 2, e = c + this._items.length, f = function (a) {
            return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
        };
        return b === d ? a.map(this._clones, function (a, b) {
            return f(b)
        }) : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function (a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function (b) {
        var c, e = 1, f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    }, e.prototype.duration = function (a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function (a, b) {
        var c = this.current(), d = null, e = a - this.relative(c), f = (e > 0) - (e < 0), g = this._items.length,
            h = this.minimum(), i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
    }, e.prototype.next = function (a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function (a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function (a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, e.prototype.viewport = function () {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
    }, e.prototype.replace = function (b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
            return 1 === this.nodeType
        }).each(a.proxy(function (a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function (b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function (a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function (b) {
        b.each(a.proxy(function (b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function (a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function () {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function (a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case"<":
                return d ? a > c : a < c;
            case">":
                return d ? a < c : a > c;
            case">=":
                return d ? a <= c : a >= c;
            case"<=":
                return d ? a >= c : a <= c
        }
    }, e.prototype.on = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function (a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function (b, c, d, f, g) {
        var h = {item: {count: this._items.length, index: this.current()}},
            i = a.camelCase(a.grep(["on", b, d], function (a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({relatedTarget: this}, h, c));
        return this._supress[b] || (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function (b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function (a) {
                    return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function (b) {
        a.each(b, a.proxy(function (a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function (b) {
        a.each(b, a.proxy(function (a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function (a) {
        var c = {x: null, y: null};
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.isNumeric = function (a) {
        return !isNaN(parseFloat(a))
    }, e.prototype.difference = function (a, b) {
        return {x: a.x - b.x, y: a.y - b.y}
    }, a.fn.owlCarousel = function (b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var d = a(this), f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}, e.prototype.watch = function () {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function (a, b) {
                    this.load(b)
                }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {lazyLoad: !1}, e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c), e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
            var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
                f.css("opacity", 1), this._core.trigger("loaded", {element: f, url: g}, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function () {
                f.css({"background-image": 'url("' + g + '")', opacity: "1"}), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this), "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this), "loaded.owl.lazy": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, e.prototype.update = function () {
        var b = this._core._current, c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c), e = [], f = 0;
        a.each(d, function (b, c) {
            e.push(a(c).height())
        }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.register({type: "state", name: "playing", tags: ["interacting"]})
            }, this), "resize.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this), "refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this), "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this), "prepared.owl.carousel": a.proxy(function (b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, e.prototype.fetch = function (a, b) {
        var c = function () {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }(), d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight, g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube"; else if (d[3].indexOf("vimeo") > -1) c = "vimeo"; else {
            if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function (b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function (a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a) {
                f = a[0].thumbnail_large, l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a) {
                f = a.framegrab_url, l(f)
            }
        })
    }, e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function (b) {
        var c, d = a(b.target), e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")], g = f.width || "100%", h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function () {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this), "translate.owl.carousel": a.proxy(function (a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {animateOut: !1, animateIn: !1}, e.prototype.swap = function () {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({left: b + "px"}).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function (b) {
        a(b.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
            }, this), "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this), "play.owl.autoplay": a.proxy(function (a, b, c) {
                a.namespace && this.play(b, c)
            }, this), "stop.owl.autoplay": a.proxy(function (a) {
                a.namespace && this.stop()
            }, this), "mouseover.owl.autoplay": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "mouseleave.owl.autoplay": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this), "touchstart.owl.core": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "touchend.owl.core": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype.play = function (a, b) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
    }, e.prototype._getNextTimeout = function (d, e) {
        return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function () {
            this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
        }, this), d || this._core.settings.autoplayTimeout)
    }, e.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout()
    }, e.prototype.stop = function () {
        this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"))
    }, e.prototype.pause = function () {
        this._core.is("rotating") && (this._paused = !0)
    }, e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    "use strict";
    var e = function (b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function (b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this), "added.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this), "remove.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this), "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this), "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this), "refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function () {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function (b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function () {
        var a, b, c, d = this._core.clones().length / 2, e = d + this._core.items().length, f = this._core.maximum(!0),
            g = this._core.settings, h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
                if (this._pages.push({start: Math.min(f, a - d), end: a - d + h - 1}), Math.min(f, a - d) === f) break;
                b = 0, ++c
            }
            b += this._core.mergers(this._core.relative(a))
        }
    }, e.prototype.draw = function () {
        var b, c = this._core.settings, d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()), f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function (a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function (b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    "use strict";
    var e = function (c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this), "prepared.owl.carousel": a.proxy(function (b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this), "changed.owl.carousel": a.proxy(function (c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function (a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
            var c = b.location.hash.substring(1), e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {URLhashListener: !1}, e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    function e(b, c) {
        var e = !1, f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
            if (g[b] !== d) return e = !c || b, !1
        }), e
    }

    function f(a) {
        return e(a, !0)
    }

    var g = a("<support>").get(0).style, h = "Webkit Moz O ms".split(" "), i = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    }, j = {
        csstransforms: function () {
            return !!e("transform")
        }, csstransforms3d: function () {
            return !!e("perspective")
        }, csstransitions: function () {
            return !!e("transition")
        }, cssanimations: function () {
            return !!e("animation")
        }
    };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
$(document).ready(function () {
    $(".slider-widget").each(function () {
        $(this).find(".owl-carousel").owlCarousel({
            items: 1,
            nav: $(this).data("dots") != "",
            autoplaySpeed: 1000,
            loop: $(this).data("auto") != "",
            autoplay: $(this).data("auto") != "",
            dots: $(this).data("pagination") != "",
            navText: ["", ""]
        })
    })
});

function CallBack(form) {
    if ($(form).find('.inputphone').length > 0) {
        if ($(form).find('.inputphone').val().replaceAll('_', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').length < 11) {
            alert("Неверно введен номер телефона, не менее 11 цифр");
            return !1
        }
    }
    $.post(serverfullname + "module/callback/send/", $(form).serialize(), function (answer) {
        jscallback();
        j = $.parseJSON(answer);
        alert(j.msg)
    });
    $.facebox.close();
    return !0
};/*!
 * HC Off-canvas Nav
 * ===================
 * Version: 3.1.2
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-offcanvas-nav
 * Description: jQuery plugin for creating off-canvas multi-level navigations
 * License: MIT
 */
!function (B, e) {
    "use strict";
    var a, l, S = e.document,
        N = (/iPad|iPhone|iPod/.test(navigator.userAgent) || !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) && !e.MSStream,
        P = "ontouchstart" in e || navigator.maxTouchPoints || e.DocumentTouch && S instanceof DocumentTouch,
        M = function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, A = function (e) {
            return e.stopPropagation()
        }, D = function (n, a, l) {
            return function (e) {
                n && e.preventDefault(), a && e.stopPropagation(), "function" == typeof l && l()
            }
        }, E = (a = B("head"), l = "hc-offcanvas-nav-style", function (e) {
            var n = a.find("style#" + l);
            n.length ? n.html(n.html() + e) : B('<style id="' + l + '">' + e + "</style>").appendTo(a)
        }), H = function (e, n, a) {
            var l = a.children("li"), t = l.length,
                o = -1 < n ? Math.max(0, Math.min(n - 1, t)) : Math.max(0, Math.min(t + n + 1, t));
            0 === o ? a.prepend(e) : l.eq(o - 1).after(e)
        }, W = 0;
    B.fn.extend({
        hcOffcanvasNav: function (e) {
            if (!this.length) return this;
            var l, x = B.extend({}, {
                maxWidth: 1024,
                pushContent: !1,
                side: "left",
                levelOpen: "overlap",
                levelSpacing: 40,
                levelTitles: !1,
                navTitle: null,
                navClass: "",
                disableBody: !0,
                closeOnClick: !0,
                customToggle: null,
                insertClose: !0,
                insertBack: !0,
                labelClose: "Закрыть",
                labelBack: "Назад"
            }, e), w = B(S.getElementsByTagName("html")[0]), O = (B(S), B(S.body)), T = (l = function (e) {
                var n = ["Webkit", "Moz", "Ms", "O"], a = (S.body || S.documentElement).style,
                    l = e.charAt(0).toUpperCase() + e.slice(1);
                if (void 0 !== a[e]) return e;
                for (var t = 0; t < n.length; t++) if (void 0 !== a[n[t] + l]) return n[t] + l;
                return !1
            }("transform"), function (e, n) {
                if (l) {
                    var a = "left" === x.side ? n : -n;
                    e.css(l, "translate3d(" + a + "px,0,0)")
                } else e.css(x.side, n)
            });
            return this.each(function () {
                var e = B(this), n = void 0;
                if (e.is("ul")) n = e.clone().wrap("<nav>").parent(); else if (e.is("nav")) n = e.clone(); else if (!(n = e.find("nav, ul").first().clone()).length) return void console.log("%c! HC Offcanvas Nav:%c There is no <nav> or <ul> elements in your menu.", "color: red", "color: black");
                var a = n.find("ul");
                if (a.length) {
                    var p = "hc-nav-" + ++W, v = {}, l = !1, t = 0, s = 0, o = void 0, i = null, r = void 0, c = void 0;
                    e.addClass("hc-nav " + p), x.customToggle ? r = B(x.customToggle).addClass("hc-nav-trigger " + p).on("click", b) : (r = B('<a class="hc-nav-trigger ' + p + '"><span></span></a>').on("click", b), e.after(r));
                    var d = r.css("display"),
                        f = "\n          .hc-offcanvas-nav." + p + " {\n            display: block;\n          }\n          .hc-nav-trigger." + p + " {\n            display: " + (d && "none" !== d ? d : "block") + "\n          }\n          .hc-nav." + p + " {\n            display: none;\n          }\n          ";
                    x.maxWidth && (f = "@media screen and (max-width: " + (x.maxWidth - 1) + "px) {\n            " + f + "\n          }"), E(f);
                    var h = n.children("ul").wrapAll('<div class="nav-wrapper nav-wrapper-1">').parent().on("click", A).wrap('<div class="nav-container">').parent();
                    if (x.navTitle && h.children().prepend("<h2>" + x.navTitle + "</h2>"), n.on("click", A).removeAttr("id").removeClass().addClass("\n            hc-offcanvas-nav\n            " + p + "\n            " + (x.navClass || "") + "\n            nav-levels-" + (x.levelOpen || "none") + "\n            side-" + x.side + "\n            " + (x.disableBody ? "disable-body" : "") + "\n            " + (N ? "is-ios" : "") + "\n            " + (P ? "touch-device" : "") + "\n          ").find("[id]").removeAttr("id"), setTimeout(function () {
                        var e;
                        s = h.width(), e = h.css("transition-duration"), o = parseFloat(e) * (/\ds$/.test(e) ? 1e3 : 1), "boolean" != typeof x.pushContent && (c = B(x.pushContent)).length && E(function e(n) {
                            return "string" == typeof n ? n : n.attr("id") ? "#" + n.attr("id") : n.attr("class") ? n.prop("tagName").toLowerCase() + "." + n.attr("class").replace(/\s+/g, ".") : e(n.parent()) + " " + n.prop("tagName").toLowerCase()
                        }(x.pushContent) + " {\n                transition: " + h.css("transition-property").split(",")[0] + " " + h.css("transition-duration") + " " + h.css("transition-timing-function").split(",")[0] + ";\n              }")
                    }, 1), x.disableBody && n.on("click", C), x.closeOnClick && a.find("li").children("a").on("click", C), !1 !== x.insertClose) {
                        var u = B('<li class="nav-close"><a href="#">' + (x.labelClose || "") + "<span></span></a></li>");
                        u.children("a").on("click", D(!0, !0, C)), !0 === x.insertClose ? a.first().prepend(u) : M(x.insertClose) && H(u, x.insertClose, a.first().add(a.siblings("ul")))
                    }
                    a.each(function () {
                        var e = B(this), n = e.parents("li").length;
                        if (0 !== n) {
                            var a = e.parent().addClass("nav-parent"), l = a.children("a");
                            v[n] || (v[n] = []), v[n].push({nav: e});
                            var t = v[n].length - 1;
                            v[n][t].wrapper = e.closest(".nav-wrapper");
                            var o = e.wrap('<div class="nav-wrapper nav-wrapper-' + (n + 1) + '">').parent().on("click", A);
                            if (!x.levelSpacing || "expand" !== x.levelOpen && !1 !== x.levelOpen && "none" !== x.levelOpen || e.css("text-indent", x.levelSpacing * n + "px"), !1 === x.levelOpen || "none" === x.levelOpen) return;
                            !0 === x.levelTitles && o.prepend("<h2>" + l.text() + "</h2>");
                            var i = B('<span class="nav-next">').appendTo(l),
                                s = B('<label for="' + p + "-" + n + "-" + t + '">').on("click", A),
                                r = B('<input type="checkbox" id="' + p + "-" + n + "-" + t + '">').attr("data-level", n).attr("data-index", t).on("click", A).on("change", m);
                            if (v[n][t].checkbox = r, a.prepend(r), l.attr("href") && "#" !== l.attr("href") ? i.append(s) : l.on("click", D(!0, !0)).prepend(s), !1 !== x.insertBack && "overlap" === x.levelOpen) {
                                var c = B('<li class="nav-back"><a href="#">' + (x.labelBack || "") + "<span></span></a></li>");
                                c.children("a").on("click", D(!0, !0, function () {
                                    return y(n, t)
                                })), !0 === x.insertBack ? e.prepend(c) : M(x.insertBack) && H(c, x.insertBack, e)
                            }
                        }
                    }), O.append(n);
                    var g = function (e, n) {
                        if (v[e] && v[e][n]) {
                            var a = v[e][n].checkbox, l = a.parent("li"), t = v[e][n].wrapper;
                            a.prop("checked", !1), t.removeClass("sub-level-open"), l.removeClass("level-open")
                        }
                    }
                } else console.log("%c! HC Offcanvas Nav:%c Menu must contain <ul> element.", "color: red", "color: black");

                function m() {
                    var e, n, a, l, t = B(this), o = Number(t.attr("data-level")), i = Number(t.attr("data-index"));
                    t.prop("checked") ? (n = i, a = v[e = o][n].checkbox.parent("li"), (l = v[e][n].wrapper).addClass("sub-level-open"), a.addClass("level-open"), "overlap" === x.levelOpen && (l.on("click", function () {
                        return y(e, n)
                    }), T(h, e * x.levelSpacing), c && c.length && T(c, s + e * x.levelSpacing))) : y(o, i)
                }

                function k() {
                    l = !0, n.addClass("nav-open"), r.addClass("toggle-open"), "expand" === x.levelOpen && i && clearTimeout(i), x.disableBody && (t = w.scrollTop() || O.scrollTop(), S.documentElement.scrollHeight > S.documentElement.offsetHeight && w.addClass("hc-nav-yscroll"), O.addClass("hc-nav-open"), t && O.css("top", -t)), c && c.length && T(c, s)
                }

                function C() {
                    l = !1, c && c.length && T(c, 0), n.removeClass("nav-open"), h.removeAttr("style"), r.removeClass("toggle-open"), !1 !== x.levelOpen && "none" !== x.levelOpen && (i = setTimeout(function () {
                        y(0)
                    }, "expand" === x.levelOpen ? o : 0)), x.disableBody && (O.removeClass("hc-nav-open"), w.removeClass("hc-nav-yscroll"), t && (O.css("top", "").scrollTop(t), w.scrollTop(t), t = 0))
                }

                function b(e) {
                    e.preventDefault(), e.stopPropagation(), l ? C() : k()
                }

                function y(e, n) {
                    for (var a = e; a <= Object.keys(v).length; a++) {
                        if (0 !== a) if (a == e && void 0 !== n) {
                            if (g(a, n), "overlap" === x.levelOpen) v[a][n].wrapper.off("click").on("click", A), T(h, (a - 1) * x.levelSpacing), c && c.length && T(c, s + (a - 1) * x.levelSpacing)
                        } else for (var l in v[a]) {
                            if (g(a, l), "overlap" === x.levelOpen) v[a][l].wrapper.off("click").on("click", A), a == e && (T(h, (a - 1) * x.levelSpacing), c && c.length && T(c, s + (a - 1) * x.levelSpacing))
                        }
                    }
                }
            })
        }
    })
}(jQuery, "undefined" != typeof window ? window : this);
$(document).ready(function () {
    if (isMobile) {
        var $toggle = $('.btn-sitenav-toggle');
        $("#mobile-nav .first-nav").html($(".catalog_content .catmenu").html());
        $("#mobile-nav .second-nav").html($(".menu_top1").html());
        $("#mobile-nav .contacts").html($(".footer_contacts").html());
        $('#mobile-nav').hcOffcanvasNav({customToggle: $toggle});
        $(".nav-container .region_selector a").click(function () {
            $(".nav-container .nav-close a").trigger("click")
        })
    }
})
