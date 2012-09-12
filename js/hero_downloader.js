var url = "http://eu.battle.net/d3/pl/profile/mattrick-2123/hero/2762321";
url = url.replace("http://", "");
url = url.split('/');

var profile = url[4].split('-')[0];
var tag = url[4].split('-')[1];
var hero = url[6];

function fill_header(name, hero_class, level, paragon, battletag)
{
	$("article header h1").text(name);
	$("article header h3").text(battletag);
	$("article header h2 span.hero_class").text(hero_class);
	$("article header h2 span.level").text(level);
	$("article header h2 span.paragon").text("(" + paragon + ")");
}

$.get('http://eu.battle.net/api/d3/profile/' + profile + '-' + tag + '/hero/' + hero, function(data) {
	fill_header(data["name"], data["class"], data["level"], data["paragonLevel"], profile + '#' + tag);
}, 'jsonp');