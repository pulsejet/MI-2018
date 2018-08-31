import * as $ from 'jquery';
import * as scrollify from 'jquery-scrollify';
import { addInvert, removeInvert } from './main.js';
import 'particles.js';

export default function() {
  particlesJS("particles-js",{particles:{number:{value:160,density:{enable:!1,value_area:800}},color:{value:"#000000"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"",width:100,height:100}},opacity:{value:1,random:!0,anim:{enable:!0,speed:1,opacity_min:0,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:4,size_min:.3,sync:!1}},line_linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!(window.innerWidth<=800&&window.innerHeight<=600),speed:1,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:600}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"bubble"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:250,size:0,duration:2,opacity:0,speed:3},repulse:{distance:400,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!1});

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
        } else {
          $("#mi-mp-prev, #mi-mp-next").removeClass("at-start");
          removeInvert();
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
