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
