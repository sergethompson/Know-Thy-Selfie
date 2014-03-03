
var zindex = 1;
// Fix security concerns with rails
Backbone.sync = (function(original) {
  return function(method, model, options) {
    options.beforeSend = function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
    };
    original(method, model, options);
  };
})(Backbone.sync);

//Fix underscore problems with erb

// _.templateSettings = {
//     interpolate: /\{\{\=(.+?)\}\}/g,
//     evaluate: /\{\{(.+?)\}\}/g
// };

// ** Model **  

var Selfie = Backbone.Model.extend({

	defaults: {
		show_url: "https://pbs.twimg.com/profile_images/378800000553651991/ac5d33362645c4f415a7933d3c296d70.jpeg",
		image_url: "",
		json_analysis: "",
		votes: 0,
		latitude: 0,
		longitude: 0,
		user_id: 0,
		photobooth_image_data: ""
	}
});

var SelfieCollection = Backbone.Collection.extend({
	url: '/selfies',
	initialize: function(){
		this.fetch()
	},
	model: Selfie
});


var SelfieFormView = Backbone.View.extend({
	events:{
		'submit' : 'submitCallback'
	},
	getSelfieData: function(){
		var imgElem = $('#gallery img')[0].src;
		var selfieData = new Selfie({ photobooth_image_data: imgElem});
		return selfieData
	},
	submitCallback: function(e){
		e.preventDefault();
		var selfieData = this.getSelfieData();
		console.log(selfieData);
		this.collection.create(selfieData);
	}
});


var SelfieView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'remove', this.remove)
	},
	events: {
		"click [data-action='destroy']" : 'destroy',
		'click [id="show"]' : 'show'
	},
	tagnName: 'div',

	template_selfie: _.template( $("#selfieview-template").html() ),
	template_selfie_stats: _.template( $("#selfieview-stats-template").html()),

	render: function(){
	var rot = Math.random()*30-15+'deg';
  var left = Math.random()*50+'px';
  var top = Math.random()*150+'px';
		this.$el.html(this.template_selfie( this.model.attributes ) );
		this.$el
		.css('-webkit-transform' , 'rotate('+rot+')')
			.css('-moz-transform' , 'rotate('+rot+')')
			.css('top' , left)
			.css('left' , top)
			.draggable({
  			start: function(event, ui) {
   			zindex++;
   			var cssObj = { 'z-index' : zindex };
   			$(this).css(cssObj);
  			}
 			})
 			.mouseup(function(){
 				zindex++;
 				$(this).css('z-index' , zindex);
 			})
 			.dblclick(function(){
  			$(this).css('-webkit-transform' , 'rotate(0)');
  			$(this).css('-moz-transform' , 'rotate(0)');
}			);
		console.log(this);
		console.log(this.model.get("json_analysis").url);
		console.log(this.model.get("json_analysis").url);
		return this
	},
	show: function(e) {
		e.preventDefault();
		this.$("#stats-view").html(this.template_selfie_stats( this.model.attributes ) );
	},
	destroy: function(e){
		e.preventDefault();
		this.model.destroy();
	}


});

var SelfieListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.renderSelfie)
	},
	renderSelfie: function(instance_of_selfie){
		instance_of_selfie.view = new SelfieView({model: instance_of_selfie})
		this.$el.prepend( instance_of_selfie.view.render().el)
		return this;
	}
})




$(function(){
var selfies_collection = new SelfieCollection();
var selfie_list_view = new SelfieListView({collection: selfies_collection, el: $('#selfies-list')});
var selfie_form_view = new SelfieFormView({collection: selfies_collection,
 el: $('#selfie-form')})
});







