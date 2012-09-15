function addItem(items, slot)
{
    if (items[slot])
    {
        $("#equipment #" + slot).append('<img src="http://eu.media.blizzard.com/d3/icons/items/large/' + items[slot]["icon"] + '.png" />');
        $("#equipment #" + slot).addClass(items[slot]["displayColor"] + 'Big');
    }
}

var Tool = {
	data: '',

	loadHeader: function(name, battletag, hero_class, level, paragonLevel) {
		$("article header h1").text(name);
		$("article header h3").text(battletag);
		$("article header h2 span.hero_class").text(hero_class);
		$("article header h2 span.level").text(level);
		$("article header h2 span.paragon").text("(" + paragonLevel + ")");
	},

	loadEquipment: function(hero_class, gender, items) {
		$(function() {
            $("#equipment").css('background-image', 'url(img/classes/' + hero_class + '-' + gender + '.png)');
            addItem(items, "head");
            addItem(items, "torso");
            addItem(items, "feet");
            addItem(items, "hands");
            addItem(items, "shoulders");
            addItem(items, "legs");
            addItem(items, "bracers");
            addItem(items, "mainHand");
            addItem(items, "offHand");
            addItem(items, "waist");
            addItem(items, "rightFinger");
            addItem(items, "leftFinger");
            addItem(items, "neck");
		});
	},

	loadUrl: function(url) {
		url = url.replace("http://", "");
		url = url.split('/');

		this.profile = url[4].split('-')[0];
		this.tag = url[4].split('-')[1];
		this.hero = url[6];

		var _this = this;

		$.get('http://eu.battle.net/api/d3/profile/' + this.profile + '-' + this.tag + '/hero/' + this.hero, function(reply) {
			_this.data = reply;
			var _data = _this.data;

			_this.loadHeader(_data["name"], _this.profile + '#' + _this.tag, _data["class"], _data["level"], _data["paragonLevel"]);
			_this.loadEquipment(_data["class"], _data["gender"], _data["items"]);

            $("article").show();
		}, 'jsonp');
	}
};

$(function () {
    $("form").submit(function() {
        return false;
    });
	$("#load_url").click(function() {
		var url = $("#url").val();

		Tool.loadUrl(url);

        $("form").hide();
	});
});

