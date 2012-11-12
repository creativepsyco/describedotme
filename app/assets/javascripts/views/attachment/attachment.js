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

  getUploadForms: function(callback) {
    var forms = []
    for (att_type in this.rendererMap) {
      var cl = this.rendererMap[att_type];
      var renderer = new DescribeMe.Views[cl]();
      renderer.registerUploadCallback(callback);
      forms.push(renderer.renderUpload());
    }
    return forms;
  },

	render: function() {
    var cl = this.rendererMap[this.model.get('att_type')];
    var renderer = new DescribeMe.Views[cl]({ model: this.model});
		return renderer.render();
	}
});
