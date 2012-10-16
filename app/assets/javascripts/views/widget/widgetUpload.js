DescribeMe.Views.WidgetUpload = Backbone.View.extend({
    model: DescribeMe.Models.WidgetItem,

	el: '#main-content',

	template: JST['widget/widgetUpload'],

	initialize: function () {
        //this.model.bind("reset", this.render, this);
        //this.model.bind("add", this.add);
	},

	add: function(item) {
        var self = this;
        //$(self.projectContainer).append(new DescribeMe.Views.ProjectItem({ model: item }).render().el);
    },

    render: function() {
        var self = this;
        $(this.el).html(this.template());
        // this.projectContainer = $(this.el).find('#project-container');
        // $(this.projectContainer).empty();

        // _.each(this.model.models, function(item) {
        //     self.add(item);
        // }, this);

        return this;
    }
});
