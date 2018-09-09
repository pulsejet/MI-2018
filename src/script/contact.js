import * as $ from 'jquery';
import { addInvert } from './main.js';
import { teams } from './people.js';

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

export default function() {
    addInvert();
    var currentElem = $('#cu-compi');

    $('#mi-cu-container').on('scroll', function() {
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
    });

    var templ = $(".mi-cu-img-template");
    var sectempl = $('#cu-section-template');
    var numtempl = $('.mi-cu-num-template');
    var activeDone = false;
    var index = 1;

    for (const team of teams) {
        var outerSection = document.createElement('div');
        $(outerSection).attr('id', 'cu-' + team.short_name)
                    .appendTo($("#mi-cu-container"));

        $(document.createElement('div')).addClass('mi-cu-dep-name')
                                        .html(team.name)
                                        .appendTo($(outerSection));

        var section = document.createElement('div');
        $(section).addClass('mi-cu-panel')
                .appendTo($(outerSection));

        for (const cg of team.people) {
            // Make a new node
            var newnode = templ.clone();

            // Setup basic stuff
            newnode.find('.mi-cu-cg-img').attr('src', 'images/people/' + cg.image);
            newnode.find('.mi-cu-name').html(cg.name);
            if ('department' in cg) {
                newnode.find('.mi-cu-dept').html(cg.department);
            } else {
                newnode.find('.mi-cu-dept').html(team.name);
            }

            // Setup telephone
            const tel = newnode.find('.mi-cu-tel');
            if ('tel' in cg) {
                tel.html(cg.tel);
                tel.attr('href', 'tel:' + cg.tel);
                tel.on('contextmenu click', () => raiseContactAnalytics('tel', cg.name));
            } else {
                tel.next().remove();
                tel.remove();
            }

            // Setup email
            const emnode = newnode.find('.mi-cu-email');
            emnode.html(cg.email);
            emnode.attr('href', 'mailto:' + cg.email);
            emnode.on('contextmenu click', () => raiseContactAnalytics('email', cg.name));

            // Append the fresh node
            newnode.appendTo($(section));
        }

        // Set up right sections
        var secnode = sectempl.clone();
        secnode.find('.cu-section').attr('href', '#cu-' + team.short_name);
        secnode.find('.cu-section').html(team.name);
        secnode.appendTo($('#cu-sections-ul'));
        secnode.on('click', () => raiseContactAnalytics('dept', team.short_name));

        // Set up numbers
        var numnode = numtempl.clone();
        numnode.html(index);
        numnode.attr('href', '#cu-' + team.short_name);
        index++;
        numnode.appendTo('.mi-cu-indices');

        // Mark first node active
        if (!activeDone) {
            activeDone = true;
            secnode.find('.cu-section').addClass('active');
            numnode.addClass('active');
        }
    }
    templ.remove();
    sectempl.remove();
    numtempl.remove();
}
