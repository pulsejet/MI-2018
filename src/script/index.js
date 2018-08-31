import * as $ from 'jquery';
import * as scrollify from 'jquery-scrollify';
import particle from './particle_config.js';
import { addInvert, removeInvert, setShareOrRegister } from './main.js';

export default function() {
  particle();

  scrollify.enable();
  scrollify.destroy();

  var currentScrollifySection = 0;
  var lastScrollifySection = 5;

  $("#mi-mp-prev, #mi-mp-next").addClass("at-start");

  $(function() {
    scrollify({
      section:".panel",
      scrollbars:false,
      standardScrollElements: (window.innerWidth<=800||window.innerHeight<=600)?'.scrollify-standard-scroll':'',
      before:function(i,panels) {
        var ref = panels[i].attr("data-section-name");
        currentScrollifySection = i;
        $(".pagination .active").removeClass("active");
        $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
        if (i == 0) {
          $("#mi-mp-prev, #mi-mp-next").addClass("at-start");
          $(".pagination").css('color', 'black');
          addInvert();
          setShareOrRegister(true);
        } else {
          $("#mi-mp-prev, #mi-mp-next").removeClass("at-start");
          removeInvert();
          setShareOrRegister(false);
        }
        if (i == lastScrollifySection) {
          $("#mi-mp-prev, #mi-mp-next").addClass("at-end");
          $(".logo-main").addClass("sitemap");
        } else {
          $("#mi-mp-prev, #mi-mp-next").removeClass("at-end");
          $(".logo-main").removeClass("sitemap");
        }
      },
    });
  });

  /* Init and Create paginator */
  addInvert();
  setShareOrRegister(true);
  var pagination = "<ul class=\"pagination\">";
  var activeClass = "";
  $(".panel").each(function(i) {
    activeClass = "";
    if(i===0) {
      activeClass = "active";
    }
    pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1).replace('_',' ') + "</span></a></li>";
  });

  pagination += "</ul>";
  $(".home").append(pagination);
  $(".pagination a").on("click",scrollify.move);

  $("#mi-mp-next").on("click", () => {
    if (currentScrollifySection == lastScrollifySection) {
      scrollify.previous();
    } else {
      scrollify.next();
    }
  });
  $("#mi-mp-prev").on("click", () => {
    scrollify.previous();
  });
}
