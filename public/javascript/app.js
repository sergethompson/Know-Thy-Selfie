// ** Model **  

Backbone.sync = (function(original) {
  return function(method, model, options) {
    options.beforeSend = function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
    };
    original(method, model, options);
  };
})(Backbone.sync);

var Selfie = Backbone.Model.extend({

	defaults: {
		image_url: "https://pbs.twimg.com/profile_images/378800000553651991/ac5d33362645c4f415a7933d3c296d70.jpeg",
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
		var imgElem = $('img')[0].src;
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

$(function(){

var selfies_collection = new SelfieCollection();

var selfie_form_view = new SelfieFormView({collection: selfies_collection,
 el: $('#selfie-form')})
});







