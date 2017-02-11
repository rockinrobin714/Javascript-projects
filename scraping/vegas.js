//grab hotel's name and price

//print name and price to console

//wait for selector load

//I don't think this is actually working...?

var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    //this makes it seem more natural to the web browser that a user is actually logging in
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url ='https://www.agoda.com/pages/agoda/default/DestinationSearchResult.aspx?asq=u2qcKLxwzRU5NDuxJ0kOF9qc6iYHx6nN7nnGV8SeY3o1vfv%2FfnGBWznj2In3R6GWoHxCNHZ7i%2BMFciATRgDLpWV56jswVWDVKt7cQkuIMT5FhNo5BqKfuIIZg6OdfnBiHUYzT5KXLdOHxeTRZP1x2OIvlq0GCrfGe0tf1LPwYFtDp0waQmZOQUEdHWvlQEN5dKT8zx5W5BioMdUuG%2F%2Fqg0mDkh6fdJUSXTb6S93IA7s%3D&city=17072&tick=636223920502&pagetypeid=1&origin=US&cid=-1&tag=&gclid=&aid=130243&userId=0a682a71-0109-4e60-bca3-b75ab1fe09de&languageId=1&sessionId=3q3q3pkn05g3ymcbgp5tlgvv&storefrontId=3&currencyCode=USD&htmlLanguage=en-us&trafficType=User&cultureInfoName=en-US&checkIn=2017-02-20&checkOut=2017-02-21&los=1&rooms=1&adults=2&children=0&priceCur=USD&hotelReviewScore=5&ckuid=0a682a71-0109-4e60-bca3-b75ab1fe09de';

var names = [];
var prices = [];

function getNames(){
	var names = $('[data-selenium=hotel-name]');
	return _.map(names, function(e){
		return e.innerHTML;
	})
}

function getPrices(){
	var prices = $('[data-selenium=display-price]');
	return _.map(prices, function(e){
		return e.innerHTML;
	})
}


casper.start(url, function(){
	this.echo(this.getTitle())
})

casper.then(function(){
	names = this.evaluate(getNames);
	//prices = this.evaluate(getPrices);
});

//because ajax is async
casper.waitForSelector('.hotel-name', function(){
	console.log('hotel-name selector is loaded')
})

casper.then(function(){
	this.clickLabel('Stars (5...1)', 'span');
	console.log('click to filter ratings');
})

casper.wait(1000, function(){
	this.echo('I waited one second')
})

casper.run(function(){
	this.echo(names.length+ 'names found:');
	this.echo('-' + names.join('\n -'))
	//this.echo('-' + prices.join('\n -'))
  	this.echo("\n Execution terminated").exit(); 
});