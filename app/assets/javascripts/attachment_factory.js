var AttachmentFactory = function() {

  var rendererMap = {
    'photo': 'PictureAttachment',
    'video': 'VideoAttachment',
  };

  return {

    getAllAttachments: function() {
      var atts = [];
      for (att_type in rendererMap) {
        var cl = rendererMap[att_type];
        var renderer = new DescribeMe.Views[cl]();
        atts.push(renderer);
      }
      return atts;
    },

    getAttachmentForModel: function(att_model) {
      var cl = rendererMap[att_model.get('att_type')];
      var att = new DescribeMe.Views[cl]({ model: att_model });
      return att;
    }
  }
}();
