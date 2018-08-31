import * as $ from 'jquery';
import Siema from 'siema';

export default function() {
    var numtempl = $(".mi-evt-num-template");
    const data = [1,2,3]
    for (const point in data) {
        var newnode = numtempl.clone();
        newnode.html((Number(point) + 1).toString());
        newnode.attr("id", "mi-evt-ind-" + point);
        newnode.on("click", () => {
            evt_siema.goTo(point);
        });
        newnode.appendTo(".mi-evt-indices");
    }
    numtempl.remove();

    // Numbers
    var onSlideSiema = () => {
        $('.mi-evt-num-template').removeClass('active');
        var elem = $("#mi-evt-ind-" + evt_siema.currentSlide);
        elem.addClass('active');
    };

    // Make siema
    var evt_siema = new Siema({
        selector: '.evt-siema',
        duration: 500,
        loop: true,
        onChange: onSlideSiema,
    });

    onSlideSiema();

    $('#evt-siema-next').click(function() {
        evt_siema.next();
    });
    $('#evt-siema-prev').click(function() {
        evt_siema.prev();
    });
}
