import * as $ from 'jquery';
import Siema from 'siema';

export default function() {
    // Initialize
    var siema_list = [];
    $('.acco-siema > div').each(function() {
        siema_list.push($(this).attr('ga-event'));
    })

    // Make numbers slider
    var numtempl = $(".mi-acco-num-template");
    const data = [1,2];
    for (const point in data) {
        var newnode = numtempl.clone();
        newnode.html((Number(point) + 1).toString());
        newnode.attr("id", "mi-acco-ind-" + point);
        newnode.on("click", () => {
        acco_siema.goTo(point);
        });
        newnode.appendTo(".mi-acco-indices");
    }
    numtempl.remove();

    // Update on slide
    var onSlideSiema = () => {
        // Update numbers
        $('.mi-acco-num-template').removeClass('active');
        var elem = $("#mi-acco-ind-" + acco_siema.currentSlide);
        elem.addClass('active');

        // Raise an analytics event
        if (typeof gtag === 'function') {
            const ref = siema_list[acco_siema.currentSlide];
            gtag('event', ('siema_' + ref).toLowerCase(), {
                'event_category' : 'Accomodation'
            });
        }
    };

    // Make siema
    var acco_siema = new Siema({
        selector: '.acco-siema',
        duration: 500,
        loop: true,
        onChange: onSlideSiema,
    });

    onSlideSiema();

    $('#acco-siema-next').click(function() {
        acco_siema.next();
    });
    $('#acco-siema-prev').click(function() {
        acco_siema.prev();
    });
}