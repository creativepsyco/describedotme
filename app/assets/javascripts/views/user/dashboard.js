DescribeMe.Views.DashboardShow = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['user/dashboard'],

	initialize: function () {
		this.model.bind("add", this.add);
	},

	events : {
		
	},

	add: function(item) {
        var self = this;
        var projectItem = "<div class='dashboard-entry row'><img src='"+item.get('profilepic')+"'/><div class='dashboard-entry-text'><a href='#profile/"+item.get('userid')+"'>"+item.get('username')+"</a> has added <a href='#project/"+item.get('userid')+"/"+item.get('itemid')+"'>"+item.get('itemname')+"</a> to their Portfolio.</div></div>";
        $(self.el).find('.dashboard').append(projectItem);
   	},

	addDashboardEntries: function() {
		var self = this;
		_.each(this.model.models, function(item) {
			if(item.get('type') == 'ITEM_CREATED')
			{	
				self.add(item);
			}
        }, this);
	},	

	render: function() {
		$(this.el).empty();
		$(this.el).html($(this.options.sidebar.el));
		$(this.el).append(this.template());
		this.addDashboardEntries();
		return this;
	}
});