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
		var self = this;
		this.kudos.save(null,
	    {
	    	success: function (model, response) {
	        	var kudo = self.model.get('kudos_count');
	        	var int_kudo = parseInt(kudo) + 1;

	        	$(self.el).find('#stat-value').text(int_kudo);
	    	},

	    	error: function(model, response){
	    		console.log("Cannot kudos");
	    	}
	    });
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
