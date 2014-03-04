var dino_data = [{"name":"ACROCANTHOSAURUS","weight":4000}];
var organized = 0;
var projectionIndex = 1;

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
		glasses: 0
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
		var rot = Math.random()*30-15+'deg';
		var left = Math.random()*50+'px';
		var top = Math.random()*300+'px';

		this.$el.html(this.template_selfie( this.model.attributes ) );
		if (organized === 0)
		{







  	//////////////////////////////////////////////
  	console.log(this.$('#stats-view')[0])
  	//console.log(this.el);
  	//console.log(this.model.get("age"))

  		///////////// ***************** d3 start ???
  		// var projection = d3.select(this.$('#stats-view')[0]).selectAll('div').data([{"age":this.model.get("age"),"weight":4000}]);

  		// projection.enter()
  		// .append('div')
  		// .style("background-color", "blue")			
  		// .transition()
  		// .duration(3000)
  		// .text(function(d){
  		// 	return d.age
  		// })
  		// .style('width' , function(d){return d.age + 'px';} )
  		// .transition()
  		// .duration(3000);
			//****************
  	/////////////////////////////////////////////











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
  	});

  }
  return this
},

show: function(e) {
	e.preventDefault();
		// this.$("#stats-view").html(this.template_selfie_stats( this.model.attributes ) );
		var projection = d3.select(this.$('#stats-view')[0]).selectAll('div').data([{"age":this.model.get("age"),"weight":4000}]);

		projection.enter()
		.append('div')
		.style("background-color", "blue")
		.style("height", "200px")			
		.transition()
		.duration(3000)
		.text(function(d){
			return d.age
		})
		.style('width' , function(d){return d.age/5 + 'px';} )
		.transition()
		.duration(3000);
	},
	destroy: function(e){
		e.preventDefault();
		this.model.destroy();
	}
});
/////////////////////////////////////////////////////////////////////
var SelfieStatView = Backbone.View.extend({
	id: 'vis',
	initialize: function(){
		this.vis = d3.select(this.el)
	},


	renderStats: function(){



	}


});
////////////////////////////////////////////////////////////////////////////

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







