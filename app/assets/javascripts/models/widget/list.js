DescribeMe.Collections.WidgetList = Backbone.Collection.extend({

    model: DescribeMe.Models.WidgetItem,

    url: '/widgets.json',

});