DescribeMe.Views.ProjectNew = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['project/new'],

	initialize: function () {
		this.model = new DescribeMe.Models.ProjectItem();
		DescribeMe.imgarr = [];
	},

	events : {
		'submit form' : 'onSave',
		'change #img-uploader': 'uploadImage'
	},

	onSave: function() {

		var title = this.titleDOM.val();
		var description = this.titleDOM.val();
		var tag = this.tagDOM.val();

		this.model.set({title:title});
		this.model.set({description: description});
		this.model.set({tag:tag});
		this.model.set({photos:DescribeMe.imgarr});
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
		var imagerow = "<tr><td><img src='"+ img_url +"' style='height:40px'/></td><td style='padding-top:15px;'><a class='btn btn-small delete-img pull-right' ><i class='icon-remove-sign'></i></a></td></tr>";
		$('#image-table').append(imagerow);
		DescribeMe.imgarr.push({photo_url: img_url, description: 'none'});
	},

	uploadImage: function() {
		var input = document.getElementById('img-uploader');
		if (input.files && input.files[0]) {
         	$('#img-upload-preview').attr('src', 'http://i293.photobucket.com/albums/mm49/oficinademultimedia/Loading_Animation.gif');
            Upload.doUpload(input.files[0], this.onUploadComplete);
        }
	},

	render: function() {
		$(this.el).html($(this.options.sidebar.el));
		$(this.el).append(this.template());

		this.imageUploadModal = $(this.el).find('#imageUploadModal');
		this.imageUploadModal.modal();
		this.imageUploadModal.modal('hide');
		
		this.titleDOM = $(this.el).find('#title');
		this.descriptionDOM = $(this.el).find('#description');
		this.tagDOM = $(this.el).find('#tag');

		return this;
	}
});
