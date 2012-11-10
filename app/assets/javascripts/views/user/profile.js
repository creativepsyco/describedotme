DescribeMe.Views.ProfileShow = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/profile'],

	initialize: function () {
		this.theme = new DescribeMe.Views.Theme({el:this.el});
	},

	events : {
		
	},

	onEditClick: function() {
		
	},

	onDeleteClick: function() {

	},

	render: function() {
		$(this.el).empty();
		$(this.el).html(this.template());
		this.theme.render();
		return this;
	},

	renderProfile: function() {
		this.userProfileView = new DescribeMe.Views.UserProfile({model: this.profileModel}).render();
		//render the view
		$(this.el).find('#profile-container').append($(this.userProfileView.el));
		//load the widgets
		window.id = this.profileModel.get('id');
		WidgetLoader.addAllWidgets('#addon-container', this.profileModel.get('id') ,null);
		//apply the theme
		this.theme.render();
		
		
	},

	renderProject: function() {
		this.projectList = new DescribeMe.Views.ProjectList({model: this.projectsModel}).render();
		$(this.el).find('#project-container').append($(this.projectList.el));
		//apply the theme
		this.theme.render();

	},
});
