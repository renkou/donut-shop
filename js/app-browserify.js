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

///////collections/////////////////

var ItemCollection = Backbone.Collection.extend({
    model: ItemModel,

    url: "https://api.imgur.com/3/album/iQVb1/images",

});

/////////////////views/////////////////

var DonutView = Backbone.View.extend({
    el: '#donuts-container',

    initialize: function() {
        var originalView = new OriginalListView();
        originalView.render();

        var specialView = new specialListView();
        specialView.render();
    }
});

var OriginalListView = Backbone.View.extend({
    el: '#original-donuts',

    render: function() {
        var self = this;

        var originalCollection = new ItemCollection();

        $.when(originalCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(ItemObject) {
            var originalArray = _.filter(ItemObject.data, function(item) {
                return item.description === 'original';
            });

            self.$el.html(self.itemTemplate({ items: originalArray }));
        });
    },

    itemTemplate: _.template($('#item-template').html(), {})
});

var specialListView = Backbone.View.extend({
    el: '#special-donuts',

    render: function() {
        var self = this;

        var specialCollection = new ItemCollection();

        $.when(specialCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(ItemObject) {
            var specialArray = _.filter(ItemObject.data, function(item) {
                return item.description === 'special';
            });

            self.$el.html(self.itemTemplate({ items: specialArray }));
        });
    },

    itemTemplate: _.template($('#item-template').html(), {})
});

var donutView = new DonutView();
