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
var googleMap = require('../googlemap.js')
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

///////////models////////////////
var ItemModel = Backbone.Model.extend({

});

///////collections/////////////////

var ItemCollection = Backbone.Collection.extend({
    model: ItemModel,

    url: "https://api.imgur.com/3/album/iQVb1/images",

});

/////////////////views/////////////////
//----------donuts.html------------------//
var DonutView = Backbone.View.extend({
    el: '#items-container',

    initialize: function() {
        this.$el.html(this.donutTemplate({}));

        var originalView = new OriginalListView();
        originalView.render();

        var specialView = new specialListView();
        specialView.render();
    },

    donutTemplate: _.template($('#donut-template').html())
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

// var donutView = new DonutView();

//-----donuts.html end------------//


//--------kolaches.html------------//
var KolacheView = Backbone.View.extend({
    el: '#items-container',

    initialize: function() {
    	this.$el.html(this.kolacheTemplate({}));

        var kolacheView = new KolacheListView();
        kolacheView.render();
    },

    kolacheTemplate: _.template($('#kolache-template').html())
});

var KolacheListView = Backbone.View.extend({
    el: '#kolaches-div',

    render: function() {
        var self = this;

        var kolacheCollection = new ItemCollection();

        $.when(kolacheCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(ItemObject) {
            var kolacheArray = _.filter(ItemObject.data, function(item) {
                return item.description === 'kolache';
            });

            self.$el.html(self.itemTemplate({ items: kolacheArray }));
        });
    },

    itemTemplate: _.template($('#item-template').html(), {})
});

// var kolachesView = new KolacheView();
//-------kolaches.html end---------////

//--------croissants.html------------//
var CroissantView = Backbone.View.extend({
    el: '#items-container',

    initialize: function() {
    	this.$el.html(this.croissantTemplate({}));

        var croissantView = new CroissantListView();
        croissantView.render();
    },

    croissantTemplate: _.template($('#croissant-template').html())
});

var CroissantListView = Backbone.View.extend({
    el: '#croissants-div',

    render: function() {
        var self = this;

        var croissantCollection = new ItemCollection();

        $.when(croissantCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(ItemObject) {
            var croissantArray = _.filter(ItemObject.data, function(item) {
                return item.description === 'croissant';
            });

            self.$el.html(self.itemTemplate({ items: croissantArray }));
        });
    },

    itemTemplate: _.template($('#item-template').html(), {})
});

// var croissantsView = new CroissantView();
//-------croissants.html end---------////

//--------moreitems.html------------//
var MoreItemsView = Backbone.View.extend({
    el: '#items-container',

    initialize: function() {
    	this.$el.html(this.moreItemsTemplate({}));

        var moreItemsView = new MoreItemsListView();
        moreItemsView.render();
    },

    moreItemsTemplate: _.template($('#more-items-template').html())
});

var MoreItemsListView = Backbone.View.extend({
    el: '#more-items-div',

    render: function() {
        var self = this;

        var moreItemsCollection = new ItemCollection();

        $.when(moreItemsCollection.fetch({
        	headers: {
		 		Authorization: 'Client-ID ' + clientid,
				Accept: 'application/json'
			}
		})).done(function(ItemObject) {
            var moreItemsArray = _.filter(ItemObject.data, function(item) {
                return item.description === 'moreItems';
            });

            self.$el.html(self.itemTemplate({ items: moreItemsArray }));
        });
    },

    itemTemplate: _.template($('#item-template').html(), {})
});
//-------------end moreitems-----------------//

var OverAllView = Backbone.View.extend({
    el: '#overall-div',

    initialize: function(){
    	this.render();
    },

    render: function() {
    	this.$el.html(this.homeTemplate({}));
    },

    homeTemplate: _.template($('#home-template').html())
});

var OverAllMenuView = Backbone.View.extend({
    el: '#overall-div',

    initialize: function(){
    	this.render();
    },

    render: function() {
    	this.$el.html(this.overallTemplate({}));
    },

    overallTemplate: _.template($('#menu-template').html())
});
// var moreItemView = new MoreItemsView();
//-------moreitems.html end---------////

var storeMap;

var DonutRouter = Backbone.Router.extend({
    routes: {
        "menu": "menu",
        "donuts": "donuts",
        "kolaches": "kolaches",
        "croissants": "croissants",
        "moreitems": "moreitems",
        "*default": "home"
    },

    home: function(){
    	var overAll = new OverAllView();
    	
    	// var delay = 1000;

    	// setTimeout(function(){
    	// 	storeMap = $('#map-container').html();	
	    // 	console.log(storeMap);
    	// }, delay);
    },

    menu: function(){
        var overAllMenu = new OverAllMenuView();
        var donutView = new DonutView();
    },

    donuts: function(){
    	// DonutView.closeView();
    	var overAllMenu = new OverAllMenuView();
    	var donutView = new DonutView();
    },

    kolaches: function(){
    	// KolacheView.closeView();
    	var overAllMenu = new OverAllMenuView();
    	var kolachesView = new KolacheView();
    },

    croissants: function(){
    	// CroissantView.closeView();
    	var overAllMenu = new OverAllMenuView();
    	var croissantsView = new CroissantView();
    },

    moreitems: function(){
    	// MoreItemsView.closeView();
    	var overAllMenu = new OverAllMenuView();
    	var moreItemView = new MoreItemsView();
    },

    initialize: function(){
        Backbone.history.start();
    }
})


//--------------------end--------------------------//
var router = new DonutRouter();
router.on('route:home', function () {
	// var g = new googleMap();
	// $(g).trigger('loadMap');
	// console.log('test');
	location.reload(true);
	// $('#map-container').html(storeMap);

	
})
