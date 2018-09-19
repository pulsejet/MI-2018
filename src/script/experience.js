import * as $ from 'jquery';
import Siema from 'siema';

export default function() {
    // Numbers
    $('.mi-exp-num-template').on("click", function() {
        exp_siema.goTo($(this).attr('data-index'));
    });

    var onSlideSiema = () => {
      $('.mi-exp-num-template').removeClass('active');
      var elem = $("#mi-exp-ind-" + exp_siema.currentSlide);
      elem.addClass('active');
    };

    // Make siema
    var exp_siema = new Siema({
      selector: '.exp-siema',
      duration: 500,
      loop: true,
      onChange: onSlideSiema,
    });

    onSlideSiema();

    // Action buttons
    $('#exp-siema-next').click(function() {
      exp_siema.next();
    });
    $('#exp-siema-prev').click(function() {
      exp_siema.prev();
    });

    // Move to next every few seconds
    var refreshIntervalId = setInterval(() => {
      if (!$('.exp-siema').length) clearInterval(refreshIntervalId);
      else exp_siema.next();
    }, 5000);
}
