var config = require('./config.json');
var gitty = require('gitty');
var args = require('yargs').argv;

function watch(){
	console.log(config.watch.length);
	config.watch.forEach(function(element, index){
		var git = gitty(element.directory);
		if(element.credentials != undefined){
			git.pull(element.remote, element.branch, element.credentials);
		}else{
			git.pull(element.remote, element.branch);
		}
	});
}

if(args.config != undefined){
	config = require(args.config);
}

if(config.generic.delay === undefined){
	throw new Error('Delay missing in configuration file');
}

setInterval(function(){
	watch();
}, config.generic.delay);
