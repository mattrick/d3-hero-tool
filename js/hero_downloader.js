function fill_header(name, hero_class, level, paragon, battletag)
{
	$("article header h1").text(name);
	$("article header h3").text(battletag);
	$("article header h2 span.hero_class").text(hero_class);
	$("article header h2 span.level").text(level);
	$("article header h2 span.paragon").text("(" + paragon + ")");
}

function fill_equipment(hero_class, gender)
{
	$(function() {
        var canvas = document.getElementById("equipmentCanvas");
        var context = canvas.getContext("2d");
        var imageObj = new Image();
		
				 // position of male characters
		 var positions = {
							'barbarian': [1, 0],
							'demon-hunter': [3, 0],
							'monk': [1, 1],
							'witch-doctor': [3, 1],
							'wizard': [1, 2]
							};	

        $(imageObj).load(function() {
          // draw cropped image
          var sourceX = (positions[hero_class][0] - gender) * 509;
          var sourceY = positions[hero_class][1] * 436;
          var sourceWidth = 509;
          var sourceHeight = 436;
          var destWidth = sourceWidth;
          var destHeight = sourceHeight;
          var destX = 0;
          var destY = 0;

          context.drawImage(imageObj, sourceX, sourceY, 509, 436, 0, 0, 509, 436);
        });
		
        imageObj.src = "img/classes.png";
      });
}

function load_hero(profile, tag, hero)
{
	$.get('http://eu.battle.net/api/d3/profile/' + profile + '-' + tag + '/hero/' + hero, function(data) {
		fill_header(data["name"], data["class"], data["level"], data["paragonLevel"], profile + '#' + tag);
		fill_equipment(data["class"], data["gender"]);
	}, 'jsonp');
}

$(function () {
	$("#load_url").click(function() {
		//var url = "http://eu.battle.net/d3/pl/profile/mattrick-2123/hero/2762321";
		var url = $("#url").val();
		
		url = url.replace("http://", "");
		url = url.split('/');

		var profile = url[4].split('-')[0];
		var tag = url[4].split('-')[1];
		var hero = url[6];
		
		load_hero(profile, tag, hero);
	});
});

