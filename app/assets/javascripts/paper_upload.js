var PaperUpload = {
  doUpload: function(file, desc, att_type, callback) {
    var fd = new FormData();
    fd.append("attachment[att_type]", att_type);
    fd.append("attachment[attfile]", file);
    fd.append("attachment[description]", desc);
    console.log(fd);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "attachments.json");
    xhr.onload = function() {
      resp = JSON.parse(xhr.responseText);
      console.log(resp);
      callback(resp);
    }

    xhr.send(fd);
  }
}
