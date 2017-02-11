var casper = require('casper').create();

casper.start('http://www.robindykema.com/', function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://www.hackreactor.com', function() {
    this.echo(this.getTitle());
});

casper.run();