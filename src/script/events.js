import * as $ from 'jquery';
import Siema from 'siema';

export default function() {
    // Initialize
    var siema_list = [];
    $('.evt-siema > div').each(function() {
        siema_list.push($(this).attr('ga-event'));
    })

    // Make numbers slider
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

    // Update on slide
    var onSlideSiema = () => {
        // Update number
        $('.mi-evt-num-template').removeClass('active');
        var elem = $("#mi-evt-ind-" + evt_siema.currentSlide);
        elem.addClass('active');

        // Raise an analytics event
        if (typeof gtag === 'function') {
            const ref = siema_list[evt_siema.currentSlide];
            gtag('event', 'page', {
                'event_category' : 'events',
                'event_label' : ref.toLowerCase()
            });
        }
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

    // Fix for mobile
    if (window.innerWidth <= 600) {
        $('.mi-siema-container').each(function() {
            const right = $(this).find('.mi-evt-right-content');
            if (right.length) {
                right.remove();
                right.appendTo($(this).find('.mi-evt-left-content'));
            }
        });
    }

    // Button for toggling lineup
    $('.t-button').on('click', function() {
        var open = '.t-' + $(this).attr('data-open');
        var close = '.t-' + $(this).attr('data-close');
        $(close).fadeOut();
        $(open).fadeIn();
    });

    $('.form').on('click', function(){
        var event = $(this).attr('data');
        var event_name = '.form-' + event;
        var event_span = "#"+event;
        console.log($('.' + event).get(0));
        var name = $(event_name).get(0).value;
        var mobile_number = $(event_name).get(1).value;
        console.log(event);
        console.log(name);
        console.log(mobile_number);
        $.post("https://api2.moodi.org/wsreg/",
            {
              name: name,
              mobile_number: mobile_number,
              event_name:event
            },
            function(data, status){
                if(status=="success"){
                    $(event_span).innerHTML = data["details"];
                }
                else{
                    $(event_span).innerHTML = "Mobile Number/Name is incorrect";
                }
            });
    });

}
