DescribeMe.Views.UserProfile = Backbone.View.extend({

	template: JST['user/userProfile'],

	initialize: function () {
	},

    events : {
        'click #followMe' : 'onFollow',
    },

    onFollow: function(){
        var self = this;
        this.follow = new DescribeMe.Models.Follow();
        this.follow.uid = this.model.get('id');
        if(!this.followed){
            this.follow.save(null,
            {
                success: function (model, response) {
                    self.isFollowed(true);
                    self.updateFollowers();
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
                    self.updateFollowers();
                },

                error: function(model, response){
                    console.log("Cannot unfollow");
                }
            });
        }
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

    updateFollowers:function(){
        var self = this;
        var follow = new DescribeMe.Models.Follow();
        follow.uid = this.model.get('id');
        follow.fetch({
            success:function(){
                $(self.el).find('#followersCount').text(follow.get('followers').length);
            }
        });
    },

    render: function() {
        var self = this;
        $(this.el).empty();
        $(this.el).html(this.template(this.model.toJSON()));

        this.updateFollowers();

        if(this.options.myProfile){
			$(this.el).find('#followMe').css("display", "none");
        }

        return this;
    }
});
