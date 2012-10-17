DescribeMe.Views.WidgetUpload = Backbone.View.extend({
    model: DescribeMe.Models.WidgetItem,

    el: '#main-content',

    template: JST['widget/widgetUpload'],

    events: {
        'click .createWidget' : "onCreateWidgetClicked"
    },

    onCreateWidgetClicked: function () {
        var name = $('#widgetName').val();
        var desc = $('#description').val();
        var thumbnail = $('#thumbnail').val();
        var location = $('#location').val();

        var aModel = new DescribeMe.Models.WidgetItem({
            name: name, 
            description: desc, 
            thumbnail: thumbnail, 
            location: location
        });

        aModel.save(null, {
            success: function (model, response){
                alert("successfully saved");
            }, 
            error: function (model, response){
                alert("error");
            }
        });
    },

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
        $(this.el).html($(this.options.sidebar.el));
        $(this.el).append(this.template());
        // this.projectContainer = $(this.el).find('#project-container');
        // $(this.projectContainer).empty();

        // _.each(this.model.models, function(item) {
        //     self.add(item);
        // }, this);

return this;
}
});
