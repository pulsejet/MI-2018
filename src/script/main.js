var sidebarvisible = false;

tiltConfig = { maxTilt: 50, perspective: 10000 }
$('#sb-toggle').tilt(tiltConfig);
$('.mi-close-sidebar').tilt(tiltConfig);
$('.logo-main img').tilt();

function MoodIndigoReInit() {
  links = [
    {sel: '.fa-facebook-f', href: 'https://www.facebook.com/iitb.moodindigo/'},
    {sel: '.fa-youtube', href: 'https://facebook.com/moodi'},
    {sel: '.fa-twitter', href: 'https://twitter.com/iitb_moodi'},
    {sel: '.fa-instagram', href: 'https://www.instagram.com/iitbombay.moodi/'},
    {sel: '.fa-linkedin-in', href: 'https://www.linkedin.com/company/mood-indigo/'},
  ]
  for (const l of links) {
    $(l.sel).parent().off("click");
    $(l.sel).parent().on("click", () => window.open(l.href));
  }
}

MoodIndigoReInit();

var sidebarjs = new SidebarJS.SidebarElement({
    position: 'right',
    onChangeVisibility: function(changes) {
      sidebarvisible = changes.isVisible;
    }
});

Barba.Pjax.start();
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  scrs = container.querySelectorAll("script");
  for (i = 0; i < scrs.length; ++i) {
    eval(scrs[i].innerHTML);
  }
});

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    return $(this.oldContainer).animate({ opacity: 0 }, 0).promise();
  },

  fadeIn: function() {
    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      _this.done();
    });
  }
});

Barba.Pjax.getTransition = function() {
  if (sidebarvisible) {
    $("#sb-toggle").trigger("click");
  }
  $.scrollify.destroy();
  removeInvert();
  MoodIndigoReInit();
  return FadeTransition;
};
