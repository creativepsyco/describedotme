DescribeMe.Views.UserProfileBrief = Backbone.View.extend({

	template: JST['user/userProfileBrief'],

	initialize: function () {
	},

    render: function() {
        var self = this;
        $(this.el).empty();
        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    }
});
