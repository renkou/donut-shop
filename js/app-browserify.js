// es5 polyfills, powered by es5-shim
require("es5-shim")

// es6 polyfills, powered by babel
require("babel/polyfill")
global.jQuery = require('jquery');


var Promise = require('es6-promise').Promise
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

require("bootstrap")
//use function like this to import other js files or functions
// var newJs = require('./kolaches');
// var newJs = require('./kolaches').test;

/////////////Index////////////////////////////////////////////////////

$("#carousel-showcase").carousel();
///////////////////Other Pages////////////////////////////////////////

//-------side bar toggle--------//
$('#nav-toggle').click(function(){
	$('.side-nav').toggleClass('show-nav');
	$('.all-donuts').toggleClass('move-for-nav');
});

// Backbone.Model.prototype.idAttribute = '_id';
var clientid = 'ab1a596d4c80874';

// var items = [
//     { itemType: 'original', name: 'Glazed' },

//     { itemType: 'original', name: 'Chocolate Iced' },

//     { itemType: 'original', name: 'Chocolate Sprinkle' },

//     { itemType: 'cake', name: 'Plain' },

//     { itemType: 'cake', name: 'Blueberry' }
// ];


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

        var cakeView = new CakeListView();
        cakeView.render();
    }
});

var OriginalListView = Backbone.View.extend({
    el: '#original-donuts',

    render: function() {
        var self = this;

        var originalCollection = new DonutCollection();

        $.when(originalCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(DonutObject) {
            var originalArray = _.filter(DonutObject.data, function(donut) {
                return donut.description === 'original';
            });

            self.$el.html(self.donutTemplate({ donuts: originalArray }));
        });
    },

    donutTemplate: _.template($('#donut-template').html(), {})
});

var CakeListView = Backbone.View.extend({
    el: '#cake-donuts',

    render: function() {
        var self = this;

        var cakeCollection = new DonutCollection();

        $.when(cakeCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(DonutObject) {
            var cakeArray = _.filter(DonutObject.data, function(donut) {
                return donut.description === 'cake';
            });

            self.$el.html(self.donutTemplate({ donuts: cakeArray }));
        });
    },

    donutTemplate: _.template($('#donut-template').html(), {})
});

var donutView = new DonutView();
