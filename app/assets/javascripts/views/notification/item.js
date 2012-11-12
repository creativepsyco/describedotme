DescribeMe.Views.Notification = Backbone.View.extend({
	
	template: JST['notification/item'],

    initialize: function () {
    },

    events : {
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});