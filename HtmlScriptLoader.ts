'use strict';

// Load and execute a script in a html document asynchronously.
// @see https://stackoverflow.com/questions/8578617/inject-a-script-tag-with-remote-src-and-wait-for-it-to-execute
exports.loadAndExecuteScript = (scriptUrl, callback) => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.onload = callback;
	script.src = scriptUrl;
	document.getElementsByTagName('head')[0].appendChild(script);
};

exports.loadScript = (scriptUrl) => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = scriptUrl;
		script.async = true;
		script.onload = resolve;
		script.onerror = reject;
		document.getElementsByTagName('head')[0].appendChild(script);
	});
};