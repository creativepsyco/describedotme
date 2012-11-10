var PaperUpload = {
  doUpload: function(file, callback) {
    var fd = new FormData();
    fd.append("attachment[atttype]", "photo");
    fd.append("attachment[attfile]", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "attachments.json");
    xhr.onload = function() {
      resp = JSON.parse(xhr.responseText);
      console.log(resp);
      callback(resp.img_url, resp.att_id);
    }

    xhr.send(fd);
  }
}
