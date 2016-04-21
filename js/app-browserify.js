// es5 polyfills, powered by es5-shim
require("es5-shim")

// es6 polyfills, powered by babel
require("babel/polyfill")

var Promise = require('es6-promise').Promise
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

//use function like this to import other js files or functions
// var newJs = require('./kolaches');
// var newJs = require('./kolaches').test;

// just Node?
// var fetch = require('node-fetch')
// Browserify?
// require('whatwg-fetch') //--> not a typo, don't store as a var

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
// start app
// new Router()
// }

// Backbone.Model.prototype.idAttribute = '_id';
var clientid = 'ab1a596d4c80874';
/////////////donuts//////////////////
// var originalDonutArray = ['Glazed', 'Chocolate Iced', 'Chocolate Sprinkle', 'Chocolate Coconut', 'Chocolate Nut', 'Strawberry Iced', 'Strawberry Sprinkle', 'White Iced', 'White Sprinkle', 'White Nut', 'White Coconut', 'Maple Iced', 'Plain Sugar', 'Cinnamon Sugar', 'Powdered Sugar', 'Crumb'];
// var cakeArray = ['Plain', 'Blueberry', 'Blueberry Glazed', 'Glazed', 'Chocolate Iced', 'Chocolate Sprinkle', 'Chocolate Coconut', 'Chocolate Nut', 'Strawberry Iced', 'Strawberry Sprinkle', 'White Iced', 'White Sprinkle', 'White Nut', 'White Coconut', 'Plain Sugar', 'Cinnamon Sugar'];
// var buttermilkArray = ['Plain', 'Glazed', 'Chocolate Iced'];
// var frenchCrullerArray = ['Glazed', 'Chocolate Iced'];
// var bigRollArray = ['Eclair', 'Cinnamon Roll', 'Cinnamon Twist', 'Apple Fritter'];
// var filledArray = ['Bavarian', 'Strawberry', 'Chocolate', 'Lemon'];

var items = [
    { itemType: 'original', name: 'Glazed' },

    { itemType: 'original', name: 'Chocolate Iced' },

    { itemType: 'original', name: 'Chocolate Sprinkle' },

    { itemType: 'cake', name: 'Plain' },

    { itemType: 'cake', name: 'Blueberry' }
];

///////////kolaches//////////////////
// var kolachesArray = ['Sausage & Cheese', 'Jumbo Sausage & Cheese', 'Plain Sausage', 'Beef Sausage', 'Jalapeño Sausage & Cheese', 'Boudain Sausage & Cheese', 'Ham & Cheese', 'Jalapeño Ham & Cheese'];

///////////croissants////////////////
// var croissantsArray = ['Bacon, Egg & Cheese', 'Sausage Patty, Egg & Cheese', 'Plain', 'Sausage & Cheese', 'Jalapeño Sausage & Cheese', 'Ham & Cheese', 'Jalapeño Ham & Cheese'];

///////////more items////////////////
// var moreItemsArray =  ['Sausage, Egg & Cheese Biscuit', 'Cream Cheese Danish', 'Donut Holes', 'Community Coffee','Cappachinos'];
// var burritosArray = ['Sausage, Egg & Cheese', 'Bacon, Egg & Cheese', 'Potato, Egg & Cheese'];
// var muffinsArray = ['Blueberry', 'Banana', 'Chocolate'];

/////////////////////////////////////////////////

/////////////filter items/////////
// var originalList = _.filter(items, function(donut){
// 	return donut.itemType === 'original';
// });

// var cakeList = _.filter(items, function(donut){
// 	return donut.itemType === 'cake';
// });
///////////models////////////////
var ItemModel = Backbone.Model.extend({
    // itemType: '',
    // name: ''
    //create a way to fetch items by array name

});

var DonutModel = Backbone.Model.extend({

});

///////collections/////////////////

var DonutCollection = Backbone.Collection.extend({
    model: DonutModel,

    url: "https://api.imgur.com/3/album/iQVb1/images",

});

var donutCollection = new DonutCollection();

/////////////////views/////////////////

var DonutView = Backbone.View.extend({
    el: '#donuts-container',

    initialize: function() {
        var originalView = new OriginalListView();
        originalView.render();

        // var cakeView = new CakeListView();
        // cakeView.render();
    }
});

var OriginalListView = Backbone.View.extend({
    el: '#original-donuts',

    render: function() {
        var self = this;

        // var originalCollection = new DonutCollection(originalList);

        // var originalDonuts = new DonutModel();
        // can you pass something into collection
        var testCollection = new DonutCollection();

        $.when(testCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(originalDonuts) {
            console.log(originalDonuts);
            var originalArray = _.filter(originalDonuts.data, function(donut) {
                return donut.description === 'original';
            });

            self.$el.html(self.donutTemplate({ donuts: originalArray }));
        });
        // this.$el.html(self.donutTemplate({ donuts: originalCollection.models }));
        // return this;
    },

    donutTemplate: _.template($('#donut-template').html(), {})
});

var CakeListView = Backbone.View.extend({
    el: '#cake-donuts',

    // initialize: function(){
    // 	this.showoriginalDonuts();
    // },

    render: function() {
        var self = this;

        var cakeCollection = new DonutCollection(cakeList);

        this.$el.html(self.donutTemplate({ donuts: cakeCollection.models }));
        return this;
    },

    donutTemplate: _.template($('#donut-template').html(), {})
});

var donutView = new DonutView();
