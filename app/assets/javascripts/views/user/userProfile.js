DescribeMe.Views.UserProfile = Backbone.View.extend({

	template: JST['user/userProfile'],

	initialize: function () {
	},

    render: function() {
        var self = this;
        $(this.el).empty();
        $(this.el).html(this.template(this.model.toJSON()));

        if(this.options.myProfile){
			$(this.el).find('#followMe').css("display", "none");
        }

        return this;
    }
});
