DescribeMe.Views.ProjectDetail = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['project/detail'],

	initialize: function () {
		//this.projects = new DescribeMe.Collections.ProjectList(this.model.get('projects'));
	},

	events : {
		
	},
	
	add: function(item) {
        var self = this;
        $(self.el).find('#project-container').append(new DescribeMe.Views.PictureAttachment({ model: item }).render().el);
    },

	render: function() {
		var self = this;
		$(this.el).empty();
		$(this.el).html(this.template(this.model.toJSON()));

		if(this.options.myProfile){
			$(this.el).find('#controls').css("display", "none");
		}
		
		this.attachmentList = this.model.getAttachmentList();
		
		_.each(this.attachmentList.models, function(item) {
            self.add(item);
        }, this);

		return this;
	},

	renderProfile: function() {
		this.userProfileView = new DescribeMe.Views.UserProfileBrief({model: this.profileModel}).render();
		$(this.el).find('#project-owner').append($(this.userProfileView.el));
	},
});
