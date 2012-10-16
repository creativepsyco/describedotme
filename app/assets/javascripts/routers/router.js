DescribeMe.Routers.Router = Backbone.Router.extend({
	routes: {
		'marketplace': 'showMarketplace',
		'widget/upload' : 'addWidget',
		'profile': 'showProfile',
		'projects': 'showAllProjects',
		'projects/new': 'newProject',
		'' : 'homePage'
	},
  
	initialize: function() {
		//alert('init');
	},

	getDummy: function() {
		var p1 = new DescribeMe.Models.ProjectItem({title:'Project Title 1', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-1.jpg'});
		var p2 = new DescribeMe.Models.ProjectItem({title:'Project Title 2', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		var p3 = new DescribeMe.Models.ProjectItem({title:'Project Title 3', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		window.projects = new DescribeMe.Collections.ProjectList();
		projects.fetch();
		return projects;
	},

	showProfile: function() {
		var p1 = new DescribeMe.Models.Profile({username:'Mike Nicolas', profilePicture: 'http://a.dryicons.com/images/icon_sets/shine_icon_set/png/256x256/user.png', aboutMe: 'I work on mobile application project, and like to take photograph with my DSLR'});
		var profileShow = new DescribeMe.Views.ProfileShow({model:p1}).render();
	},

	showAllProjects: function() {
		var projects = this.getDummy();
		var projectList = new DescribeMe.Views.ProjectList({model:projects}).render();
	},

	newProject: function() {
		var newProject = new DescribeMe.Views.ProjectNew().render();
	},

	homePage: function() {
		// code to display home page view.
	},

	/**
	 * [showMarketplace Basically Show All Widgets]
	 * @return {[type]} [description]
	 */
	showMarketplace: function() {
		// Marketplace showing code
		var w1 = new DescribeMe.Models.WidgetItem({title:'Widget Title 1', thumbnail: 'http://lorempixel.com/g/400/200/'});
		var w2 = new DescribeMe.Models.WidgetItem({title:'Widget Title 2', thumbnail: 'http://lorempixel.com/g/400/200/'});
		var w3 = new DescribeMe.Models.WidgetItem({title:'Widget Title 3', thumbnail: 'http://lorempixel.com/g/400/200/'});
	
		var widgets = new DescribeMe.Collections.WidgetList([w1, w2, w3]);
		//widgets.fetch();
		var marketplace = new DescribeMe.Views.WidgetList({model:widgets}).render();
	},

	addWidget: function() {
		var aWidget = new DescribeMe.Models.WidgetItem();
		var uploadWidget = new DescribeMe.Views.WidgetUpload({model: aWidget}).render();
	} 
});
