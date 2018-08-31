import * as $ from 'jquery';
import Siema from 'siema';

export default function() {
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

    // Numbers
    var onSlideSiema = () => {
        $('.mi-acco-num-template').removeClass('active');
        var elem = $("#mi-acco-ind-" + acco_siema.currentSlide);
        elem.addClass('active');
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