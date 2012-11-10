DescribeMe.Views.CommunityItem = Backbone.View.extend({
	
	template: JST['project/communityItem'],

	className: 'span4',

	initialize: function () {
		this.kudos = new DescribeMe.Models.Kudos();
		this.kudos.pid = this.model.id;
	},

	events : {
		'click .kudos' : 'onKudosClick',
	},

	onKudosClick: function(){
		this.kudos.save(null,
	    {
	    	success: function (model, response) {
	        	console.log(response);
	    	},

	    	error: function(model, response){
	    		alert("Failure - " + response);
	    	}
	    });
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
