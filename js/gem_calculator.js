$(function () {
    $("form").submit(function() {
        return false;
    });
    $(":submit").click(function() {

    });
    $("#starting").click(function() {
        $.facybox(function() {
            $.get('gem_selector.html', function(data) {
                $.facybox(data);
            });
        });
    });
    $("#final").click(function() {

    });
});
