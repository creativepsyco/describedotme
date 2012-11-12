DescribeMe.Views.ProjectDetail = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['project/detail'],

	initialize: function () {
		//this.projects = new DescribeMe.Collections.ProjectList(this.model.get('projects'));
	},

	events : {
        'click #followMe' : 'onFollow',
    },

    onFollow: function(){
        var self = this;
        this.follow = new DescribeMe.Models.Follow();
        this.follow.uid = this.uid;
        if(!this.followed){
            this.follow.save(null,
            {
                success: function (model, response) {
                    self.isFollowed(true);
                },

                error: function(model, response){
                    console.log("Cannot follow");
                }
            });
        }
        else{
            this.follow.id = this.follow.uid;
            this.follow.destroy(
            {
                success: function (model, response) {
                    self.isFollowed(false);
                },

                error: function(model, response){
                    console.log("Cannot unfollow");
                }
            });
        }
    },
	
	add: function(item) {
    var self = this;
    console.log(item);
    $(self.el).find('#project-container').append(new DescribeMe.Views.Attachment({ model: item }).render().el);
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

	isFollowed:function(followed){
        this.followed = followed;
        if(followed){
            $(this.el).find('#followMe').attr("class", "btn btn-warning");
            $(this.el).find('#followMe').css("display", "inline");
            $(this.el).find('#followMe').html("<i class='icon-plus'></i> Unfollow User");
        }
        else{
            $(this.el).find('#followMe').attr("class", "btn btn-primary");
            $(this.el).find('#followMe').css("display", "inline");
            $(this.el).find('#followMe').html("<i class='icon-plus'></i> Follow User");
        }
    },

	renderProfile: function() {
		this.userProfileView = new DescribeMe.Views.UserProfileBrief({model: this.profileModel}).render();
		$(this.el).find('#project-owner').append($(this.userProfileView.el));
	},
});
