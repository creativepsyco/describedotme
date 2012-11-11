DescribeMe.Views.Organizer = Backbone.View.extend({

	el: '#main-content',

	template: JST['layout/organizer'],

	initialize: function () {
		this.projectList = new DescribeMe.Views.ProjectList({model: this.model, editable:this.options.editable});
	},

	render: function() {
		$(this.el).html($(this.options.sidebar.el));
        $(this.el).append(this.template());
        this.projectList.model = this.model;

        $(this.el).find('#project-container').append($(this.projectList.render().el));
		return this;
	}
});
