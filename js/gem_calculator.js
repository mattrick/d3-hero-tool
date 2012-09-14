var vStarting = 0;
var vFinal = 0;

$(function () {
    $("form").submit(function() {
        return false;
    });
    $(":submit").click(function() {

    });
    $("#starting").click(function() {
        $.facybox(generateGemSelector("Starting"));
    });
    $("#final").click(function() {
        $.facybox(generateGemSelector("Final"));
    });
});

function generateGemSelector(which) {
    var result = '';

    result += '<section id="gem_selector">\n' +
              '\t<table>\n';

    for (y = 0; y <= 1; y++)
    {
        result += '\t\t<tr>\n';

        for (x = 1; x <= 7; x++)
        {
            var gem = (y * 7 + x);

            result += '\t\t\t<td>\n' +
                      '\t\t\t\t<img \n' +
                      '\t\t\t\t\tonclick=\'gemSelected' + which + '(' + gem +'); $(document).trigger("close.facybox");\'\n' +
                      ((vStarting >= gem && which == "Final") ? '\t\t\t\t\tstyle="display: none"\n' : '') +
                      '\t\t\t\t\tsrc="http://eu.media.blizzard.com/d3/icons/items/large/emerald_' + ((gem < 10) ? '0' : '') + gem + '_demonhunter_male.png" />\n' +
                      '\t\t\t</td>\n';
        }

        result += '\t\t</tr>\n';
    }

    result += '\t</table>\n' +
              '</section>'

    return result;
}

function gemSelectedStarting(gem) {
    vStarting = gem;
    $("#starting").html('<img src="http://eu.media.blizzard.com/d3/icons/items/large/emerald_' + ((gem < 10) ? '0' : '') + gem + '_demonhunter_male.png" />')
    if (vStarting >= vFinal)
        gemSelectedFinal(0);
}

function gemSelectedFinal(gem) {
    vFinal = gem;
    if (gem > 0)
        $("#final").html('<img src="http://eu.media.blizzard.com/d3/icons/items/large/emerald_' + ((gem < 10) ? '0' : '') + gem + '_demonhunter_male.png" />')
    else
        $("#final").html('click to choose <strong>final gem</strong>');
}