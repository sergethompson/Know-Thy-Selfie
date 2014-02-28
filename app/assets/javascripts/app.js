// ** Model **        (:image_url, :json_analysis, :votes, 
	//                   :latitude, :longitude, :user_id)

var Selfie = Backbone.Model.extend({

	defaults: {
		image_url: ".s3",
		json_analysis: "",
		votes: 0,
		latitude: 0,
		longitude: 0,
		user_id: 0
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
		var selfieData = new Selfie({
			
		})
	}



});