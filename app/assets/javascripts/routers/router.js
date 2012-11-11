DescribeMe.Routers.Router = Backbone.Router.extend({
	routes: {
		'marketplace': 'showMarketplace',
		'widget/upload' : 'addWidget',
		'profile': 'showProfile',
		'profile/:id': 'showUserProfile',
		'profile/preview/:id': 'previewTheme',
		'projects': 'showAllProjects',
		'project/:uid/:pid': 'showProjectDetail',
		'projects/new': 'newProject',
		'dashboard' : 'homePage',
		'': 'showDashboard',
		'settings': 'showSettings',
		'community': 'communityProjects',
	},
  
	initialize: function() {
		//alert('init');
	},

	previewTheme: function(theme) {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.Profile();
		// , username:'Mike Nicolas', profilePicture: 'http://500px.com/graphics/userpic.png', aboutMe: 'I work on mobile application project, and like to take photograph with my DSLR'}
		var projects = new DescribeMe.Collections.ProjectList();

		this.profileShow = new DescribeMe.Views.ProfileShow({theme:theme});
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
    			projects.fetch(
				{
		    		success: function () {
		    			if(self.profileShow) {
		    				self.profileShow.projectsModel = projects;
		    			}
		    			else {
							self.profileShow = new DescribeMe.Views.ProfileShow({projectsModel:projects});
		    			}
		    			self.profileShow.renderProject(true);
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
		
	},

	getDummy: function() {
		var p1 = new DescribeMe.Models.ProjectItem({title:'Project Title 1', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-1.jpg'});
		var p2 = new DescribeMe.Models.ProjectItem({title:'Project Title 2', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		var p3 = new DescribeMe.Models.ProjectItem({title:'Project Title 3', thumbnail: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-2.jpg'});
		window.projects = new DescribeMe.Collections.ProjectList();
		projects.fetch();
		return projects;
	},

	routeTriggered: function() {
		$('.navbar-inverse .navbar-inner').css('background-image','-webkit-linear-gradient(top, #04498C, #033C73)');
	},

	showProfile: function() {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.Profile();
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

    			self.profileShow.renderProfile();
		    	projects.fetch(
				{
		    		success: function () {
		    			if(self.profileShow) {
		    				self.profileShow.projectsModel = projects;
		    			}
		    			self.profileShow.renderProject(true);
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});		
	},

	showAllProjects: function() {
		this.routeTriggered();
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		var projects = new DescribeMe.Collections.ProjectList();
		var profile = new DescribeMe.Models.Profile();

		profile.fetch(
		{
			success: function() {
				projects.fetch(
				{
		    		success: function () {
		    			if(self.projectList) {
		    				self.projectList.model = projects;
		    			}
		    			else {
		    				self.projectList = new DescribeMe.Views.Organizer({model:projects, sidebar: self.sidebar});
		    			}
		    			self.projectList.profile = profile;
		    			self.projectList.render();
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });	
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
	},

	communityProjects: function(){
		this.routeTriggered();
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		var projects = new DescribeMe.Collections.ProjectList();
		projects.url = '/featured_items.json';
		projects.fetch(
		{
    		success: function () {
    			if(self.communityProjectList) {
    				self.communityProjectList.model = projects;
    			}
    			else {
    				self.communityProjectList = new DescribeMe.Views.CommunityProjectList({model:projects, sidebar:self.sidebar});
    			}
    			self.communityProjectList.render();
    		},
    		error: function() {
    			console.log('Unable to load projects!');
    		}
	    });
	},

	showUserProfile: function(id) {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.UserProfile({id:id});
		var projects = new DescribeMe.Collections.UserProjectList();
		projects.userid = id;

		this.profileShow = new DescribeMe.Views.ProfileShow();
		this.profileShow.render();

		profile.fetch(
		{
			success: function() {
				if(self.profileShow) {
    				self.profileShow.profileModel = profile;
    			}

				self.profileShow.renderProfile();

    			projects.fetch(
				{
		    		success: function () {
		    			if(self.profileShow) {
		    				self.profileShow.projectsModel = projects;
		    			}
		    			self.profileShow.renderProject(false);
		    		},
		    		error: function() {
		    			console.log('Unable to load projects!');
		    		}
			    });
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});		
	},

	showSettings: function() {
		this.routeTriggered();
		var self = this;
		var profile = new DescribeMe.Models.Profile();

		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		profile.fetch(
		{
			success: function() {
				if(self.Settings) {
    				self.Settings.profileModel = profile;
    			}
    			else {
					self.Settings = new DescribeMe.Views.Settings({model:profile, sidebar:self.sidebar});
    			}
    			self.Settings.render();
			},
			error: function() {
				console.log('Unable to load profile!');
			}
		});
	},

	showProjectDetail: function(uid, pid) {
		var self = this;
		var profile = new DescribeMe.Models.UserProfile({id:uid});
		var project = new DescribeMe.Models.UserProjectItem();
		project.uid = uid;
		project.pid  = pid;

		this.projectDetail = new DescribeMe.Views.ProjectDetail();

		project.fetch(
		{
			success: function() {
				if(self.projectDetail) {
    				self.projectDetail.model = project;
    			}
    			else {
					self.projectDetail = new DescribeMe.Views.ProjectDetail({model:project});
    			}
    			self.projectDetail.render();

    			profile.fetch(
				{
					success: function() {
						if(self.projectDetail) {
		    				self.projectDetail.profileModel = profile;
		    			}
		    			else {
							self.projectDetail = new DescribeMe.Views.ProjectDetail({profileModel:profile});
		    			}
		    			self.projectDetail.renderProfile();
					},
					error: function() {
						console.log('Unable to load profile!');
					}
				});
			},
			error: function() {
				console.log('Unable to load project!');
			}
		});
	},


	newProject: function() {
		this.routeTriggered();
		var self = this;
		//initialize sidebar if it is required for this page.
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();

		this.projectNewView = (this.projectNewView) ? this.projectNewView : new DescribeMe.Views.ProjectNew({sidebar:self.sidebar});
		this.projectNewView.render();
	},

	homePage: function() {
		// code to display home page view.
		//var homeView = new DescribeMe.Views.Home().render();
	},

	/**
	 * [showMarketplace Basically Show All Widgets]
	 * @return {[type]} [description]
	 */
	showMarketplace: function() {
		this.routeTriggered();
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		var widgets = new DescribeMe.Collections.WidgetList();
		widgets.fetch({
			success: function () {
    			if(self.marketplace) {
    				self.marketplace.model = widgets;
    			}
    			else {
    				self.marketplace = new DescribeMe.Views.WidgetList({model:widgets, sidebar: self.sidebar});
    			}
    			self.marketplace.render();
    		},
    		error: function() {
    			console.log('Unable to load marketplace!');
    		}
    	});
	},

	addWidget: function() {
		this.routeTriggered();
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		var aWidget = new DescribeMe.Models.WidgetItem();
		var uploadWidget = new DescribeMe.Views.WidgetUpload({model: aWidget, sidebar:this.sidebar}).render();
	},

	showDashboard: function(){
		this.routeTriggered();
		var self = this;
		this.sidebar = (this.sidebar) ? this.sidebar : new DescribeMe.Views.Sidebar();
		
		var dashboardShow = new DescribeMe.Views.DashboardShow({sidebar:self.sidebar}).render();
	}
});
