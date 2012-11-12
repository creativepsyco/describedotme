DescribeMe.Models.NotificationItem = Backbone.Model.extend({
    initialize:function () {
        if(this.get('type') == 'ITEM_CREATED')
        {
            var data = this.get('data');
            console.log(data);
            //this.set{userid:data.user
        }
        if(this.get('type') == 'KUDO_CREATED')
        {
            
        }
        if(this.get('type') == 'USER_FOLLOWED')
        {
            
        }

    }
});