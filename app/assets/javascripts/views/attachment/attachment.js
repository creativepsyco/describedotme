DescribeMe.Views.Attachment = Backbone.View.extend({

  rendererMap: {
    'photo': 'PictureAttachment',
    'video': 'VideoAttachment',
  },
	
	// template: JST['project/picture-attachment'],

	initialize: function () {
	},

	events : {
	},

	render: function() {
    var cl = this.rendererMap[this.model.get('att_type')];
    var renderer = new DescribeMe.Views[cl]({ model: this.model});
		return renderer.render();
	}
});
