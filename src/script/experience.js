import * as $ from 'jquery';
import Siema from 'siema';

export default function() {
    // Data to create elements
    var data = [
        {
            head:'Air Lantern',
            des: 'The liveliest concert that will make you numb with excitement',
            img:'10-2.jpg',
        },
        {
            head:'Air Lantern',
            des: 'Thumkas and Jhatkas at Desi Beats, The Bollywood Dance Competition',
            img:'14.jpg',
        },
        {
            head:'Air Lantern',
            des: 'ChoreoNite, The flagship dance competition',
            img:'3.jpg',
        },
        {
            head:'Air Lantern',
            des: 'Fire Juggling Act',
            img:'22.png',
        },
        {
            head:'Air Lantern',
            des: 'Workshops at Mood Indigo',
            img:'21.jpg',
        },
        {
            head:'Neon Zone',
            des: 'A place that could relieve all your worries and free you of all the shackles!',
            img:'neon_zone.jpg',
        },
        {
            head:'Silent Disco',
            des:'Leave the world behind and dance to your own beat!',
            img:'silent_disco.jpg',
        },
        {
            head:'Air Lantern',
            des: 'When we lit up the sky!',
            img:'Air Lanterns.jpg',
        },
        {
            head:'Air Lantern',
            des: 'This party was a dream come true!',
            img:'Masquerade Party.jpg',
        },
        {
            head:'Air Lantern',
            des: 'Only those who stepped in to play UV Paintball know the worth!',
            img:'UV Paintball.jpg',
        },
        {
            head:'Air Lantern',
            des: 'This gets you high, really high',
            img:'Hot Air Balloning.jpg',
        },
        {
            head:'Air Lantern',
            des: 'Dragon boat racing held at Marine Drive.',
            img:'Dragon Boat Racing.jpg',
        },
    ]

    // Setup all elements
    var templ = $(".mi-exp-template");
    var numtempl = $(".mi-exp-num-template");
    for (const point in data) {
      var newnode = templ.clone();
      newnode.find(".exp-img").attr('src', 'images/experience/' + data[point]['img']);
      newnode.find(".exp-img").attr('alt', data[point]['des']);
      newnode.find(".exp-desc").html(data[point]['des'])
      newnode.appendTo(".exp-siema");

      newnode = numtempl.clone();
      newnode.html((Number(point) + 1).toString());
      newnode.attr("id", "mi-exp-ind-" + point);
      newnode.on("click", () => {
        exp_siema.goTo(point);
      });
      newnode.appendTo(".mi-exp-indices");
    }
    numtempl.remove();
    templ.remove();

    // Numbers
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
