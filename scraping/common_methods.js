//put this at the beginning
var casper = require('casper').create();

//put in .start with the URL and then put an optional callback
casper.start('http://en.wikipedia.org/', function(){
	this.echo(this.getTitle())
})
casper.then(function(){
	this.echo(this.getCurrentUrl());
})
//put this at the end, can put a callback inside, must put exit at the end
casper.run(function(){
	this.echo('Finished!')
	this.exit();
})
// casper.run()