DescribeMe.Views.ProfileShow = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/profile'],

	initialize: function () {
		if(this.options.theme)
			this.theme = DescribeMe.ThemeFactory.getTheme(this.options.theme);
		else
			this.theme = DescribeMe.ThemeFactory.getTheme('BlueGrid');
	},

	events : {
	},

	isFollowed:function(followed){
		this.userProfileView.isFollowed(followed);
	},

	render: function() {
		$(this.el).empty();
		$(this.el).html(this.template());
		this.theme.setElement(this.el);
		this.theme.render();
		return this;
	},

	renderProfile: function() {
		this.userProfileView = new DescribeMe.Views.UserProfile({model: this.profileModel, myProfile:this.options.myProfile}).render();
		//render the view
		$(this.el).find('#profile-container').append($(this.userProfileView.el));
		//load the widgets
		window.id = this.profileModel.get('id');
		WidgetLoader.addAllWidgets('#addon-container', this.profileModel.get('id') ,null);
		//apply the theme
		if(!this.options.theme)
		{
			console.log('------->',this.profileModel.get('theme'));
			this.theme = DescribeMe.ThemeFactory.getTheme(this.profileModel.get('theme'));
		}
		this.theme.render();
	},

	renderProject: function(editable) {
		this.projectList = new DescribeMe.Views.ProjectList({model: this.projectsModel, editable: this.options.myProfile});
		this.projectList.uid = this.profileModel.get('id');
		$(this.el).find('#project-container').append($(this.projectList.render().el));
		//apply the theme
		if(!this.options.theme)
		{
			console.log('------->',this.profileModel.get('theme'));
			this.theme = DescribeMe.ThemeFactory.getTheme(this.profileModel.get('theme'));
		}
		this.theme.render();

	},
});
