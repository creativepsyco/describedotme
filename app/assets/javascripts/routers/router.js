DescribeMe.Routers.Router = Backbone.Router.extend({
	routes: {
		'profile': 'showProfile',
		'projects': 'showAllProjects',
		'projects/new': 'newProject',
		'dashboard' : 'homePage',
		'': 'showDashboard'
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
		var self = this;
		var profile = new DescribeMe.Models.Profile({id:"1"});
		// , username:'Mike Nicolas', profilePicture: 'http://500px.com/graphics/userpic.png', aboutMe: 'I work on mobile application project, and like to take photograph with my DSLR'}
		var projects = new DescribeMe.Collections.ProjectList();

		this.profileShow = new DescribeMe.Views.ProfileShow();
		this.profileShow.render();

		profile.fetch(
		{
			success: function() {
				if(self.profileShow) {
    				self.profileShow.profileModel = profile;
    			}
    			else {
					self.profileShow = new DescribeMe.Views.ProfileShow({profileModel:profile});
    			}
    			self.profileShow.renderProfile();
				console.log(profile.toJSON());
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
		projects.fetch(
		{
    		success: function () {
    			if(self.profileShow) {
    				self.profileShow.projectsModel = projects;
    			}
    			else {
					self.profileShow = new DescribeMe.Views.ProfileShow({projectsModel:projects});
    			}
    			self.profileShow.renderProject();
    		},
    		error: function() {
    			console.log('Unable to load projects!');
    		}
	    });
		
	},

	showAllProjects: function() {
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		var projects = new DescribeMe.Collections.ProjectList();
		projects.fetch(
		{
    		success: function () {
    			if(self.projectList) {
    				self.projectList.model = projects;
    				console.log(projects.toJSON());
    			}
    			else {
    				self.projectList = new DescribeMe.Views.Organizer({model:projects, sidebar: self.sidebar});
    			}
    			self.projectList.render();
    		},
    		error: function() {
    			console.log('Unable to load projects!');
    		}
	    });
	},

	newProject: function() {
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		this.projectNewView = (this.projectNewView) ? this.projectNewView : new DescribeMe.Views.ProjectNew({sidebar:self.sidebar});
		this.projectNewView.render();
	},

	homePage: function() {
		//var homeView = new DescribeMe.Views.Home().render();
	},

	showDashboard: function(){
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		
		var dashboardShow = new DescribeMe.Views.DashboardShow({sidebar:self.sidebar}).render();
	}
});
