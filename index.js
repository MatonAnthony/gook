var config = require('./config.json');
var gitty = require('gitty');
var args = require('yargs').argv;

function watch(){
	config.watch.forEach(function(element, index){
		var git = gitty(element.directory);
		if(element.credentials != undefined){
			git.pull(element.repository, element.branch, element.credentials, function(err){
				if(err) return console.log(err);
			});
		}else{
			git.pull(element.repository, element.branch, element.username, function(err){
				if(err) return console.log(err);
			});
		};
	});
}

if(args.config != undefined){
	config = require(args.config);
}

if(config.generic.delay === undefined){
	throw new Error('Delay missing in configuration file');
}

watch();
setInterval(function(){
	watch();
}, config.generic.delay * 1000);
