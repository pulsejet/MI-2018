import * as $ from 'jquery';
import { addInvert } from './main.js';

/** Raise an analytics event for contact us */
function raiseContactAnalytics(method, particular) {
    if (typeof gtag === 'function') {
        // Strip too much stuff
        if (particular.includes(' ')) { particular = particular.substr(0, particular.indexOf(' ')); }
        // Make call
        gtag('event', method, {
            'event_category' : 'contact',
            'event_label' : particular.toLowerCase()
        });
    }
}

var currentElem;

function handleScroll() {
    if (!currentElem) { currentElem = $('#cu-compi'); }
    var top = null;
    const containerHeight = $(this).height();
    $(this).children().each(function(){
        var offset = $(this).position().top;
        if (offset >= -10 && offset < containerHeight + 10) {
            top = $(this);
            return false;
        }
    });

    if (top !== null && top.attr('id') != currentElem.attr('id')) {
      currentElem = top;
      $('.mi-cu-num-template').removeClass('active');
      $('.cu-section').removeClass('active');
      $('a[href="#' + top.attr('id') + '"]').addClass('active');
    }
}

export default function() {
    addInvert();

    $('.mi-cu-num-template:first, .cu-section:first').addClass('active');
    $('#mi-cu-container').on('scroll', handleScroll)
    handleScroll($('#mi-cu-container'));

    $('.mi-cu-tel, .mi-cu-email').on('contextmenu click', function() {
        raiseContactAnalytics($(this).attr('data-type'), $(this).attr('data-cg'));
    });

    $('.cu-section-li').on('click', function() {
        raiseContactAnalytics('dept', $(this).attr('data-team'));
    });
}
