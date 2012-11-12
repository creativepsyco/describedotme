DescribeMe.Models.NotificationItem = Backbone.Model.extend({
    initialize:function () {
        if(this.get('type') == 'ITEM_CREATED')
        {
            var data = eval ("(" + this.get('data') + ")");
            //console.log(data.item_name);
            this.set({userid:data.user_id});
            this.set({username:data.user_name});
            this.set({itemid:data.item_id});
            this.set({notficationcontent:' added a new project: '+data.item_name});
        }
        if(this.get('type') == 'KUDO_CREATED')
        {
            var data = eval ("(" + this.get('data') + ")");
            this.set({userid:data.user_id});
            this.set({username:data.user_name});
            this.set({itemid:data.item_id});
            this.set({notficationcontent:' gave you a kudo for project: '+data.item_name});
        }
        if(this.get('type') == 'USER_FOLLOWED')
        {
            var data = eval ("(" + this.get('data') + ")");
            this.set({userid:data.user_id});
            this.set({username:data.user_name});
            this.set({itemid:data.item_id});
            this.set({notficationcontent:' is now following you'});
        }

    }
});