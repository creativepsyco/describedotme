DescribeMe.Collections.WidgetList = Backbone.Collection.extend({

    model: DescribeMe.Models.WidgetItem,

    url: '/users/1/items.json',

});