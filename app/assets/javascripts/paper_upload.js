var PaperUpload = {
  doUpload: function(file, att_type, callback) {
    var fd = new FormData();
    fd.append("attachment[att_type]", att_type);
    fd.append("attachment[attfile]", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "attachments.json");
    xhr.onload = function() {
      resp = JSON.parse(xhr.responseText);
      console.log(resp);
      callback(resp.url, resp.id);
    }

    xhr.send(fd);
  }
}
