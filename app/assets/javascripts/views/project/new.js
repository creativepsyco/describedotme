DescribeMe.Views.ProjectNew = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['project/new'],

	initialize: function () {
	},

	events : {
		'submit form' : 'onSave',
	},

	onSave: function() {

		var title = this.titleDOM.val();
		var description = this.titleDOM.val();
		var tag = this.tagDOM.val();

		this.model = new DescribeMe.Models.ProjectItem({title: title, description: description, tag: tag});

		this.model.save(null,
	    {
	    	success: function (model, response) {
	        	DescribeMe.router.navigate('#projects',{trigger:true});
	    	},

	    	error: function(model, response){
	    		alert("Failure - " + response);
	    	}
	    });
		return false;
		
	},

	render: function() {
		$(this.el).html(this.template());

		this.titleDOM = $(this.el).find('#title');
		this.descriptionDOM = $(this.el).find('#description');
		this.tagDOM = $(this.el).find('#tag');

		return this;
	}
});