DescribeMe.Views.NotificationItem = Backbone.View.extend({
	
	template: JST['notification/item'],

    initialize: function () {
    },

    events : {
    },

    render: function() {
        console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});