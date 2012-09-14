var vStarting = 0;
var vFinal = 0;

$(function () {
    $("form").submit(function() {
        calculateGems();
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
    if (gem)
        $("#final").html('<img src="http://eu.media.blizzard.com/d3/icons/items/large/emerald_' + ((gem < 10) ? '0' : '') + gem + '_demonhunter_male.png" />')
    else
        $("#final").html('click to choose <strong>final gem</strong>');
}

function calculateGems() {
    if (!vStarting && !vFinal)
    {
        $.facybox("You must set at least starting and final gem!");
        return false;
    }

    $(":text").each(function() {
        if (isNaN(this.value - 0))
        {
            $.facybox("Prices have to be numbers!");
            return false;
        }
    });

    var result = calculateCost(vStarting, vFinal);
    var additional = [result[0] * $("#starting_cost").val(), result[2] * $("#page").val(), result[3] * $("#tome_hell").val(), result[4] * $("#tome_inferno").val()];

    var sum = result[1] + additional[0] + additional[1] + additional[2] + additional[3];

    $("#ah_cost").text("> " + sum * (100/85));
}

function calculateCost(starting, final) {
    var count;
    var difference = final - starting;
    var twoFactor = 8 - starting;
    var threeFactor = final - 8;

    if (threeFactor < 0)
    {
        twoFactor = final - starting;
        threeFactor = 0;
    }

    if (twoFactor)
    {
        count = Math.pow(2, twoFactor);
        if (threeFactor)
            count *= Math.pow(3, threeFactor);
    }
    else
        count = Math.pow(3, difference);

    var result = [count, 0, 0, 0, 0];

    for (var i = starting; i < final; i = i + 1)
    {
        var upgradeFactor = 0;

        if (i > 7)
            upgradeFactor = 3;
        else
            upgradeFactor = 2;

        result[1] *= upgradeFactor;
        result[1] += cost[i][0];
        result[2] *= upgradeFactor;
        result[2] += cost[i][1];
        result[3] *= upgradeFactor;
        result[3] += cost[i][2];
        result[4] *= upgradeFactor;
        result[4] += cost[i][3];
    }

    return result;
}

//              [gold,   pages,  tomes1, tomes2  ],
var cost = [    [0,      0,      0,      0,      ],
                [10,     0,      0,      0       ],
                [25,     0,      0,      0       ],
                [40,     0,      0,      0       ],
                [55,     1,      0,      0       ],
                [70,     1,      0,      0       ],
                [85,     0,      1,      0       ],
                [100,    0,      1,      0       ],
                [30000,  0,      0,      3       ],
                [50000,  0,      0,      6       ],
                [80000,  0,      0,      9       ],
                [100000, 0,      0,      12      ],
                [200000, 0,      0,      15      ],
                [400000, 0,      0,      20      ]   ];