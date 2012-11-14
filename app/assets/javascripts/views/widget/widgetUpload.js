DescribeMe.Views.WidgetUpload = Backbone.View.extend({
    model: DescribeMe.Models.WidgetItem,

    el: '#main-content',

    template: JST['widget/widgetUpload'],

    events: {
        'click .createWidget': "onCreateWidgetClicked"
    },

    onCreateWidgetClicked: function() {
        var self = this;
        var name = $('#widgetName').val();
        var desc = $('#description').val();
        var thumbnail = $('#thumbnail').val();

        var aModel = new DescribeMe.Models.WidgetItem({
            name: name,
            description: desc,
            thumbnail: thumbnail
        });

        var fd = new FormData();
        fd.append("name", $('#widgetName').val());
        fd.append("description", $('#description').val());
        fd.append("thumbnail", $('#thumbnail').val());
        var input = document.getElementById('zipFile');
        fd.append("zipFile", input.files[0]);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "widgets");
        xhr.onload = function() {
            console.log(xhr.responseText);
            self.uploadSuccess(xhr);
        }

        xhr.send(fd);
    },

    uploadSuccess: function(response) {
        if(response.status == 200)
        {
            alert("Success");
        } else
        {
            alert("Unsuccessful");
        }
    },

    initialize: function() {
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