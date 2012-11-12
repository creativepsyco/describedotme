DescribeMe.Views.ProjectNew = Backbone.View.extend({
	
	el: '#main-content',

	template: JST['project/new'],

	initialize: function () {
		this.model = new DescribeMe.Models.ProjectItem();
		DescribeMe.attachments = [];
	},

	events : {
		'submit form' : 'onSave',
	},

	onSave: function() {

		var title = this.titleDOM.val();
		var description = this.titleDOM.val();
		var tag = this.tagDOM.val();

    console.log(DescribeMe.attachments);

		this.model.set({title:title});
		this.model.set({description: description});
		this.model.set({tag:tag});
		this.model.set({attachments:DescribeMe.attachments});
		this.model.save(null, {
	    	success: function (model, response) {
	        	DescribeMe.router.navigate('#projects',{trigger:true});
	    	},

	    	error: function(model, response){
	    		alert("Some problem with the network, refresh and try again.");
	    	}
	    });
		return false;
		
	},

	onAttachmentCreated: function(att, message) {
		$('#img-upload-preview').attr('src', att.url);
		var imagerow = "<tr><td><img src='"+ att.url +"' style='height:40px'/></td><td style='padding-top:15px;'><span>" + att.description +
      "<a class='btn btn-small delete-img pull-right' ><i class='icon-remove-sign'></i></a></td></tr>";
		$('#image-table').append(imagerow);
		DescribeMe.attachments.push(att.id);
	},

	render: function() {
		$(this.el).html($(this.options.sidebar.el));
		$(this.el).append(this.template());

    var att_container = $(this.el).find('#attachment-upload-container');
    this.atts = AttachmentFactory.getAllAttachments();

    for (i in this.atts) {
      var att = this.atts[i];
      att.registerUploadCallback(this.onAttachmentCreated);
      att_container.append(att.renderUpload());
    }

		this.titleDOM = $(this.el).find('#title');
		this.descriptionDOM = $(this.el).find('#description');
		this.tagDOM = $(this.el).find('#tag');

		return this;
	}
});
