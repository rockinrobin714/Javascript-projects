var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    //this makes it seem more natural to the web browser that a user is actually logging in
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["/vendor/jquery.min.js"]
});
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