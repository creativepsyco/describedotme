DescribeMe.Views.VideoAttachment = Backbone.View.extend({
	
	template: JST['attachment/video-attachment'],

  uploadTemplate: JST['attachment/video-upload'],

	initialize: function () {
	},

	events : {
	},

  upload: function(self) {
		var input = document.getElementById('video-uploader');
    var desc = document.getElementById('video-description').value;
    if (input.files && input.files[0]) {
      PaperUpload.doUpload(input.files[0], desc, 'video',  function(att, msg) {
        self.onUploadComplete(self, att, msg);
      });
    }
  },

	onUploadComplete: function(self, att, message) {
    this.uploadForm.modal('hide');
    if (self.uploadCallback) {
      self.uploadCallback(att, message);
    }
	},

  registerUploadCallback: function(callback) {
    this.uploadCallback = callback;
  },

  renderUpload: function() {
    this.uploadForm= $(this.uploadTemplate());
    this.uploadForm.modal();
    this.uploadForm.modal('hide');
    self = this;
    $(document).on('click', '#video-save',  function() {
      self.upload(self);
    });
    return this.uploadForm;
  },

  renderTrigger: function() {
    var trigger = $('<a id="vid-upload" class="btn btn-small" href="#videoUploadModal" class="delete" data-toggle="modal"><i class="icon-camera"></i></a>');
    return trigger;
  },

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
