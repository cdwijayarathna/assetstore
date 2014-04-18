var format = function(context, data, page, area, meta) {
	context = context();
	context.user = data.user;
	return context;
};

var resources = function(page, meta) {
	return {
		js : ['token.input/jquery.tokeninput.js','asset-helpers.js', 'navigation.js', 'jquery.validate.js', 'search.js'],
		css : ['../js/token.input/css/token-input.css','../js/token.input/css/token-input-facebook.css','../js/token.input/css/token-input-mac.css','navigation.css']
	};
};

var currentPage = function(navigation, type, search) {
	var asset;

	for (asset in navigation.assets) {
		if (asset == type) {
			navigation.assets[asset].selected = true;
			break;
		}
	}
	navigation.search = search;
	return navigation;
}
