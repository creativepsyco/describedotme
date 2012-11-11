DescribeMe.Views.PictureAttachment = Backbone.View.extend({
	
	template: JST['attachment/picture-attachment'],

  uploadTemplate: JST['attachment/picture-upload'],

	initialize: function () {
	},

	events : {
    'change #picture-uploader': 'upload'
	},

  upload: function(self) {
		var input = document.getElementById('picture-uploader');
    var desc = document.getElementById('picture-description').value;
    if (input.files && input.files[0]) {
      $('#picture-upload-preview').attr('src', 'http://i293.photobucket.com/albums/mm49/oficinademultimedia/Loading_Animation.gif');
      PaperUpload.doUpload(input.files[0], desc, 'photo', function(att, msg) {
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
    this.uploadForm = $(this.uploadTemplate());
    this.uploadForm.modal();
    this.uploadForm.modal('hide');
    var self = this;
    $(document).on('click', '#picture-save', function() {
      self.upload(self);
    });
    return this.uploadForm;;
  },

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
