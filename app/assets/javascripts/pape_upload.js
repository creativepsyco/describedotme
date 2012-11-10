var PaperUpload = {
  doUpload: function(file, callback) {
    var fd = new FormData();
    fd.append("attachment[type]", "photo");
    fd.append("attachment[attfile]", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "attachments.json");
    xhr.onload = function() {
      // resp = JSON.parse(xhr.responseText);
      console.log(xhr.responseText);
      img_url = xhr.responseText;
      callback(img_url);
    }

    xhr.send(fd);
  }
}
