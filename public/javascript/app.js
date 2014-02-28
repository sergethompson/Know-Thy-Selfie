
//------Model---------------------------
var Selfie = Backbone.Model.extend ({
	defaults: {
		uri: '',
		state: '',
		image_url: ".s3",
		json_analysis: "",
		votes: 0,
		latitude: 0,
		longitude: 0,
		user_id: 0
	},
	select: function(state){
		this.set({'state': state ? 'selected' : '' });
	}
});

//----Collection------------------------
var Selfies = Backbone.Collection.extend({
	url: '/selfies',
		initialize: function(){
			this.fetch()
	},

	model: Selfie

	,
	fetch: function(){
		return _.map(urls,
			function(url){
				return new Selfie({uri:url})
			});
	},
	select: function(model){
		if ( this.selectedSelfie() ){
			this.selectedSelfie().select(false);
		}
		this.selected = model;
		this.selected.select(true);
		this.trigger('selfies:selected');
	},
	selectedSelfie: function(){
		return this.selected;
	}
});

//-----Views--------------------------
// var selfies = new Selfies;

// var Frontview = Backbone.View.extend({
// 	template: _.template('<img src="%= uri %>" />'),
// 	el: $('#front'),

// 	initialize: function(){
// 		this.model.bind('selfies:selected', this.render, this);
// 	},

// 	render: function(){
// 		this.el.html(this.template(this.model.selectedSelfie().toJSON()));
// 	}
// });

// var frontview = new FrontView({model:selfies});

// var SelfieView = Backbone.View.extend({
// 	tagName: 'li',
// 	template: _.template('<img src="<%= uri %>" class="<%= state %> />'),
// 	events: {
// 		"click" : "selectSelfie"
// 	},
// 	initialize: function(){
// 		this.model.bind('change', this.render, this);
// 	},
// 	render: function(){
// 		$(this.el).html(this.template(this.model.toJSON()));
// 	},
// 	selectSelfie: function(){
// 		selfies.select(this.model);
// 	}
// });

// var Appview = Backbone.View.extend({
// 	el: $("#container"),
// 	render: function(){
// 		_.each(new Selfies().fetch(),
// 			function(t){
// 				$('div ul').append( new SelfieView({model: t}).render().el)
// 			});
// 	}
// });

var SelfieFormView = Backbone.View.extend({
	events:{
		'submit' : 'submitCallback'
	},
	getSelfieData: function(){
		var selfieData = new Selfie({
			var imgElem = $('img')[0].src;
			var selfieData = new Selfie({jsone_analysis: imgElem});
			return selfieData
		})
	},

	submitCallback: function(e){
		e.preventDefault();
		var selfieData = this.getSelfieData();
		this.collection.create(selfieData);
	}

 });