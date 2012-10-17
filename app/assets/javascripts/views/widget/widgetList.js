/**
 * [WidgetList description]
 * @type {[type]}
 */
DescribeMe.Views.WidgetList = Backbone.View.extend({
    model: DescribeMe.Models.WidgetList,

	el: '#main-content',

	template: JST['widget/widgetMarketplaceList'],

	initialize: function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
	},

	add: function(item) {
        var self = this;
        $(self.widgetContainer).append(new DescribeMe.Views.WidgetItem({ model: item }).render().el);
    },

    render: function() {
        var self = this;
        $(this.el).html($(this.options.sidebar.el));
        $(this.el).append(this.template());
        this.widgetContainer = $(this.el).find('#widget-container');
        $(this.widgetContainer).empty();

        _.each(this.model.models, function(item) {
            self.add(item);
        }, this);

        return this;
    }
});
