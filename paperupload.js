var PaperUpload = {
  uploadAttachment: function(file, type, callback) {
    var fd = new FormData();
    fd.append("type", type);
    fd.append("attfile", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "attachments");
    xhr.onload = function() {
      console.log(xhr.responseText);
      callback();
    }

    xhr.send(fd);
  }
}
