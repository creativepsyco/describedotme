DescribeMe.Views.ProjectList = Backbone.View.extend({

	template: JST['project/list'],

	initialize: function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
	},

	add: function(item) {
        var self = this;
        var projectItem = new DescribeMe.Views.ProjectItem({ model: item});
        projectItem.editable = this.options.editable;
        projectItem.uid = this.uid;
        $(self.el).append(projectItem.render().el);
    },

    render: function() {
        var self = this;
        $(this.el).empty();

        _.each(this.model.models, function(item) {
            self.add(item);
        }, this);

        return this;
    }
});
