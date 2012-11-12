DescribeMe.Collections.NotificationList = Backbone.Collection.extend({

    model: DescribeMe.Models.NotificationItem,

    url: '/notifications'

});