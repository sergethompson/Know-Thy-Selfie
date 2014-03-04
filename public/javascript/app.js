var organized = 0;

// Sets zindex outside functions to be used later unrestricted
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

// ** Model **

var Selfie = Backbone.Model.extend({

	defaults: {
		show_url: "https://pbs.twimg.com/profile_images/378800000553651991/ac5d33362645c4f415a7933d3c296d70.jpeg",
		caption: "Mysteriously empty caption",
		image_url: "",
		json_analysis: "",
		votes: 0,
		latitude: 0,
		longitude: 0,
		user_id: 0,
		photobooth_image_data: "",
		age: 0,
		race_string: "",
		race_conf: 0,
		confused: 0,
		calm: 0,
		angry: 0,
		happy: 0,
		sad: 0,
		roll: 0,
		pitch: 0,
		yaw: 0,
		smile: 0,
		sex: 0,
		surprised: 0,
		eye_closed: 0,
		glasses: 0,
		rot: -1,
		left: -1,
		top: -1
	}
});
// ** Collection **
var SelfieCollection = Backbone.Collection.extend({
	url: '/selfies',
	initialize: function(){
		this.fetch()
	},
	model: Selfie
});

// ** Submit Button for adding selfie to collection **
var SelfieFormView = Backbone.View.extend({
	events:{
		'submit' : 'submitCallback'
	},
	getSelfieData: function(){
		var imgElem = $('#gallery img')[0].src;
		var selfieData = new Selfie({ photobooth_image_data: imgElem, show_url: imgElem});
		return selfieData
	},
	submitCallback: function(e){
		e.preventDefault();
		var selfieData = this.getSelfieData();
		this.collection.create(selfieData);
	}
});

// ** Selfie View and setting actions on view (movable, alignable, clickable) **
var SelfieView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'remove', this.remove);
		this.listenTo(this.model, 'change', this.render);
	},
	events: {
		"click [data-action='destroy']" : 'destroy',
		'click [id="show"]' : 'show'
		//'click [id="stats"]' : 'stats'
	},
	tagName: 'div',

	template_selfie: _.template( $("#selfieview-template").html() ),
	template_selfie_stats: _.template( $("#selfieview-stats-template").html()),

	render: function(){

		/* Since these all get set at once, just checking the 'rot' for a -1 value should be sufficient */
		if (-1 == this.model.get("rot")){
			this.model.set({'rot' 	: Math.random()*30-15+'deg'});
  			this.model.set({'left' 	: Math.random()*50+'px'});
			this.model.set({'top'	: Math.random()*300+'px'});
		}

		this.$el.html(this.template_selfie( this.model.attributes ) );

		if (organized === 0){
			this.$el
				.css('-webkit-transform' , 'rotate('+this.model.get('rot')+')')
				.css('-moz-transform' , 'rotate('+this.model.get('rot')+')')
				.css('top' , this.model.get('top'))
				.css('left' , this.model.get('left'))
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
				});
				// console.log(this);
				// console.log(this.model.get("json_analysis").url);
				// console.log(this.model.get("json_analysis").url);

				// console.log("Inspecting this.$el.css to determine if it has a z-index set");
//				console.log("z-index is: ["+ this.$el.css('z-index') + "]")
//				if(null == this.$el.css('z-index')){
				// 	console.log(">>>>>>>>>>>>>>>>Setting z-index");
				// 	// console.log("Inspecting this.$el.css to determine if it has a z-index set: IT DOES NOT...  Setting one");
//				 	this.$el.css('z-index' , zindex);
//				 }
				// else{
				// 	console.log("Inspecting this.$el.css to determine if it has a z-index set: IT DOES");
				// }
		}
		return this
	},

	show: function(e) {
		e.preventDefault();
		// this.$("#stats-view").html(this.template_selfie_stats( this.model.attributes ) );
		var projection = d3.select(this.$('#stats-view')[0]).selectAll('div').data([
			{"value":this.model.get("sex"),"name":"sex"}, 
			{"value":this.model.get("confused"),"name":"confused"},
			{"value":this.model.get("angry"),"name":"angry"},
			{"value":this.model.get("glasses"),"name":"glasses"},
			{"value":this.model.get("happy"),"name":"happy"},
			{"value":this.model.get("sad"),"name":"sad"},
			{"value":this.model.get("calm"),"name":"calm"},
			{"value":this.model.get("race_conf"),"name":"race_conf"},
			{"value":Math.abs(this.model.get("roll")/90),"name":"roll"},
			{"value":Math.abs(this.model.get("pitch")/90),"name":"pitch"},
			{"value":Math.abs(this.model.get("yaw")/90),"name":"yaw"},
			{"value":this.model.get("smile"),"name":"smile"},
			{"value":this.model.get("surprised"),"name":"surprised"},
			{"value":this.model.get("eye_closed"),"name":"eye_closed"},
			{"value":this.model.get("glases"),"name":"glases"}
			]);

		projection.enter()
		.append('div')
		.style("background-color", "black")
		.style("height", "1.5em")
		.style("float", "left")
		.style("margin", ".3em")
		.transition()
		.duration(3000)
		// .text(function(d){
		// 	return d.name
		// })
		.style('width' , function(d){return d.value*5 + .5 + 'px';} )
		.transition()
		.duration(3000);
	},
	
	destroy: function(e){
		e.preventDefault();
		this.model.destroy();
	}
});


// ** List View **
var SelfieListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.renderSelfie)
	},
	renderSelfie: function(instance_of_selfie){
		instance_of_selfie.view = new SelfieView({model: instance_of_selfie})
		this.$el.append( instance_of_selfie.view.render().el)
		return this;
	}
})

// ** Document Ready **
$(function(){
	var selfies_collection = new SelfieCollection();
	var selfie_list_view = new SelfieListView({collection: selfies_collection, el: $('#selfies-list')});
	var selfie_form_view = new SelfieFormView({collection: selfies_collection, el: $('#selfie-form')})
});







