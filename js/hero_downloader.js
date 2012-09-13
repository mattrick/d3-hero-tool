function get_icon(skill)
{
    return (skill) ? 'http://eu.media.blizzard.com/d3/icons/skills/64/' + skill + '.png' : '';
}

function get_item(item)
{
	return (item) ? 'http://eu.media.blizzard.com/d3/icons/items/large/' + item["icon"] + '.png' : '';
}

function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
      }

CanvasRenderingContext2D.prototype.fillRoundedRect =
    function (xx,yy, ww,hh, rad, fill, stroke) {
      if (typeof(rad) == "undefined") rad = 5;
      this.beginPath();
      this.moveTo(xx+rad, yy);
      this.arcTo(xx+ww, yy,    xx+ww, yy+hh, rad);
      this.arcTo(xx+ww, yy+hh, xx,    yy+hh, rad);
      this.arcTo(xx,    yy+hh, xx,    yy,    rad);
      this.arcTo(xx,    yy,    xx+ww, yy,    rad);
      this.stroke();  // Default to no stroke
      this.fill();  // Default to fill
  }; // end of fillRoundedRect method

function addItem(sources, slot)
{
    if (sources[slot])
        $("#equipment #" + slot).append('<img src="' + get_item(sources[slot]) +'" />');
}

function getQuality(items, images, slot, affix)
{
    switch (items[slot]["displayColor"])
    {
        case 'blue':
            return images["magic" + affix];
            break;

        case 'yellow':
            return images["rare" + affix];
            break;

        case 'orange':
            return images["legendary" + affix];
            break;

        case 'green':
            return images["set" + affix];
            break;
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
			var canvas = document.getElementById("equipmentCanvas");
			var context = canvas.getContext("2d");

			var sources = {
				background: 'img/classes/' + hero_class + '-' + gender + '.png',

				yellow: 'http://eu.battle.net/d3/static/images/item/icon-bgs/yellow.png',
				gradient: 'http://eu.battle.net/d3/static/images/item/icon-bgs/gradient.png',

				magicBig: 'img/item_backgrounds/magic_big.png',
				rareBig: 'img/item_backgrounds/rare_big.png',
				legendaryBig: 'img/item_backgrounds/legendary_big.png',
				setBig: 'img/item_backgrounds/set_big.png'
			};

			loadImages(sources, function(images) {
				context.drawImage(images.background, 0, 0, 509, 436, 0, 0, 509, 436);

                context.drawImage(getQuality(items, images, "hands", "Big"), 219, 141, 60, 80);
                context.drawImage(getQuality(items, images, "mainHand", "Big"), 219, 294, 60, 124);
			});

            addItem(items, "hands");
            addItem(items, "mainHand");
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
		}, 'jsonp');
	}
}

$(function () {
	//$("#load_url").click(function() {
		var url = "http://eu.battle.net/d3/pl/profile/mattrick-2123/hero/2762321";
		//var url = "http://eu.battle.net/d3/pl/profile/mattrick-2123/hero/2759703";
		//var url = $("#url").val();

		Tool.loadUrl(url);
	//});
});

