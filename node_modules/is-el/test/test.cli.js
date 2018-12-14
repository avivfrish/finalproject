#!/usr/bin/env node

var spawn = require('child_process').spawn;

var server = spawn('http-server', ['.', '-p', '9911', '-a', '127.0.0.1']);

var child = spawn('./node_modules/.bin/mocha-phantomjs', [
	'http://127.0.0.1:9911/test/spec/index.html',
	'-p', 'node_modules/.bin/phantomjs',
	'-k', 'test/hooks.js',
	'--local-to-remote-url-access', 'true',
	'--ignore-resource-errors', 'true',
	'--ignore-ssl-errors', 'true',
	'--web-security', 'false',
	'--timeout', '20000'
]);

child.on('close', function (code) {
	console.log('Mocha process exited with code ' + code);
	server.kill('SIGINT');
	if (code > 0) {
		process.exit(1);
	}
});
