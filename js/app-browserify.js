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
//----------donuts.html------------------//
var DonutView = Backbone.View.extend({
    el: '#items-container',

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

//-----donuts.html end------------//


//--------kolaches.html------------//
var KolacheView = Backbone.View.extend({
    el: '#items-container',

    initialize: function() {
        var kolacheView = new KolacheListView();
        kolacheView.render();
    }
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

var kolachesView = new KolacheView();
//-------kolaches.html end---------////

//--------croissants.html------------//
var CroissantView = Backbone.View.extend({
    el: '#items-container',

    initialize: function() {
        var croissantView = new CroissantListView();
        croissantView.render();
    }
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

var croissantsView = new CroissantView();
//-------croissants.html end---------////

//--------moreitems.html------------//
var MoreItemsView = Backbone.View.extend({
    el: '#items-container',

    initialize: function() {
        var moreItemsView = new MoreItemsListView();
        moreItemsView.render();
    }
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

var moreItemView = new MoreItemsView();
//-------moreitems.html end---------////

//-------------------class toggles----------------//
//if button is clicked, toggle all other buttons to hide but display clicked
//or make every div hidden and toggle display but then hide all others
$('.donuts-btn').click(function(){
	$('.nav-li').removeClass('active');
	$('.top-donuts-nav').addClass('active');

	if($('#donuts').css({'display': 'none'}))
		{
			$('#donuts').css({'display':'block'});
			$('#kolaches').css({'display':'none'});
			$('#croissants').css({'display':'none'});
			$('#more-items').css({'display':'none'});
		}
});

$('.kolaches-btn').click(function(){
	$('.nav-li').removeClass('active');
	$('.top-kolaches-nav').addClass('active');

	if($('#kolaches').css({'display': 'none'}))
		{
			$('#donuts').css({'display':'none'});
			$('#kolaches').css({'display':'block'});
			$('#croissants').css({'display':'none'});
			$('#more-items').css({'display':'none'});
		}
});

$('.croissants-btn').click(function(){
	$('.nav-li').removeClass('active');
	$('.top-croissants-nav').addClass('active');

	if($('#croissants').css({'display': 'none'}))
		{
			$('#donuts').css({'display':'none'});
			$('#kolaches').css({'display':'none'});
			$('#croissants').css({'display':'block'});
			$('#more-items').css({'display':'none'});
		}
});
$('.more-items-btn').click(function(){
	$('.nav-li').removeClass('active');
	$('.top-more-items-nav').addClass('active');

	if($('#more-items').css({'display': 'none'}))
		{
			$('#donuts').css({'display':'none'});
			$('#kolaches').css({'display':'none'});
			$('#croissants').css({'display':'none'});
			$('#more-items').css({'display':'block'});
		}
});

//what