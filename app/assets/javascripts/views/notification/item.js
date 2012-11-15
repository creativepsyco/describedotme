DescribeMe.Views.NotificationItem = Backbone.View.extend({
	
	template: JST['notification/item'],

    template2: JST['notification/item_profile'],

    initialize: function () {
    },

    events : {
    },

    render: function() {
        console.log(this.model.toJSON());
        if (this.model.get('type') == 'KUDO_CREATED')
            $(this.el).html(this.template(this.model.toJSON()));
        else
            $(this.el).html(this.template2(this.model.toJSON()));
        return this;
    }
});