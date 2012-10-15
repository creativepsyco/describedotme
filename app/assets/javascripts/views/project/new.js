DescribeMe.Views.ProjectNew = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['project/new'],

	initialize: function () {
	},

	events : {
		'submit form' : 'onSave',
		'change #img-uploader': 'uploadImage'
	},

	onSave: function() {

		var title = this.titleDOM.val();
		var description = this.titleDOM.val();
		var tag = this.tagDOM.val();

		this.model = new DescribeMe.Models.ProjectItem({title: title, description: description, tag: tag});

		this.model.save(null,
	    {
	    	success: function (model, response) {
	        	DescribeMe.router.navigate('#projects',{trigger:true});
	    	},

	    	error: function(model, response){
	    		alert("Failure - " + response);
	    	}
	    });
		return false;
		
	},

	onUploadComplete: function(img_url, message) {
		$('#img-upload-preview').attr('src', img_url);
	},

	uploadImage: function() {
		var input = document.getElementById('img-uploader');
		if (input.files && input.files[0]) {
         	$('#img-upload-preview').attr('src', 'http://i293.photobucket.com/albums/mm49/oficinademultimedia/Loading_Animation.gif');
            Upload.doUpload(input.files[0], this.onUploadComplete);
        }
	},

	render: function() {
		$(this.el).html(this.template());

		this.imageUploadModal = $(this.el).find('#imageUploadModal');
		this.imageUploadModal.modal();
		this.imageUploadModal.modal('hide');
		
		this.titleDOM = $(this.el).find('#title');
		this.descriptionDOM = $(this.el).find('#description');
		this.tagDOM = $(this.el).find('#tag');

		return this;
	}
});