/*chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html',
    {width: 800, height: 600});
});*/

chrome.app.runtime.onLaunched.addListener(function() {
	var window = chrome.app.window.create('index.html', {
		minWidth:840, minHeight:600
	},function(createdWindow){
		//createdWindow.maximize();
	});
});

