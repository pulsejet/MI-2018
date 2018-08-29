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
