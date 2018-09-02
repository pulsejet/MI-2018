import * as $ from 'jquery';
import Barba from 'barba.js';
import tilt from 'tilt.js';
import lottie from 'lottie-web';
import {SidebarElement } from 'sidebarjs';
import animationData from './animation.json.js'
import * as scrollify from 'jquery-scrollify';
import 'simplebar';

$.tilt = tilt;

/* Loading animation */
var lottieParams = {
    container: document.getElementById('lottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData
};

function addInvert() {
  $(".logo-main").addClass('invert-colors');
  $("#sb-toggle").addClass('invert-colors');
  $(".need-invert").css("color", "black");
  $(".need-invert *").css("border-color", "black");
}

function removeInvert() {
  $(".pagination").css('color', 'white');
  $(".logo-main").removeClass('invert-colors');
  $("#sb-toggle").removeClass('invert-colors');
  $(".need-invert").css("color", "white");
  $(".need-invert *").css("border-color", "white");
}

/* Helpers */
function getParameterByName(name, url) {
if (!url) url = window.location.href;
name = name.replace(/[\[\]]/g, '\\$&');
var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
if (!results) return null;
if (!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function initIFrameSub(iframe, url) {
  const sub = getParameterByName('sub');
  if (sub != null) { url += sub; }
  $(iframe).attr("src", url);
}

/* FB share */
function fbshareCurrentPage() {
      window.open("https://www.facebook.com/sharer.php?u="+escape(window.location.href)+"&t="+document.title, '',
  'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
  return false;
}

function setShareOrRegister(share) {
  const elem = $('#mi-bottom-right-register-button');
  if (share) {
    elem.html('SHARE THIS');
    elem.attr('onclick', 'MoodI.fbshareCurrentPage()');
    elem.removeAttr('href');
  } else {
    elem.html('REGISTER');
    elem.attr('href', '/register');
    elem.removeAttr('onclick');
  }
}

function MoodIndigoReInit() {
  const links = [
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

/** Refresh the user's MI number */
function RefreshUserInfo(google_id) {
  if (google_id === null) {
    $('#mi-sidebar-number').html('');
  } else {
    $.get('https://api2.moodi.org/user/' + google_id, (response) => {
      console.log(response);
      $('#mi-sidebar-number').html(response.mi_number);
    })
  }
}

/* Definitions end */

var sidebarvisible = false;
var loader5s = false;

$(window).on('load', function() {
  if (loader5s) {
    $(".se-pre-con").fadeOut("slow");
  } else {
    setTimeout(() => {
      $(".se-pre-con").fadeOut("slow");
    }, 3000);
  }
});

$(document).ready(() => {
  /* Init MI number */
  RefreshUserInfo(localStorage.getItem('google_id'));

  /* Listen for events */
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent,function(e) {
      console.log(e.data);
      if (e.data.type == 1) {
        for (const field in e.data.data) {
            localStorage.setItem(field, e.data.data[field]);
        }
      } else if (e.data.type == 2) {
        for (const key of e.data.data) {
            localStorage.removeItem(key);
        }
      } else if (e.data.type == 3) {
        Barba.Pjax.goTo(window.data.data);
      }
      RefreshUserInfo(localStorage.getItem('google_id'));
  }, false);

  /* Start animation */
  lottie.loadAnimation(lottieParams);
  setTimeout(() => loader5s = true, 3000);

  /* Tilt on desktop only */
  if (window.outerWidth > 600) {
    var tiltConfig = { maxTilt: 50, perspective: 10000 };
    $('#sb-toggle').tilt(tiltConfig);
    $('.mi-close-sidebar').tilt(tiltConfig);
    $('.logo-main img').tilt();
  }

  MoodIndigoReInit();

  var sidebarjs = new SidebarElement({
    position: 'right',
    onChangeVisibility: function(changes) {
      sidebarvisible = changes.isVisible;
    }
  });

  Barba.Pjax.start();
  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    let scrs = container.querySelectorAll("script");
    for (let i = 0; i < scrs.length; ++i) {
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
    scrollify.destroy();
    removeInvert();
    $(".logo-main").removeClass("sitemap");
    setShareOrRegister(false);
    MoodIndigoReInit();
    return FadeTransition;
  };
})

export {default as miInitIndex} from './index.js';
export {default as miInitExperience} from './experience.js';
export {default as miInitAccomodation} from './accomodation.js';
export {default as miInitContactUs} from './contact.js';
export {default as miInitEvents} from './events.js';
export {
  addInvert, removeInvert, getParameterByName, initIFrameSub,
  fbshareCurrentPage, MoodIndigoReInit, setShareOrRegister
};
