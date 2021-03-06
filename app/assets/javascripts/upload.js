// Author: Mohit
// More info here; http://api.imgur.com/resources_anon
// Allows only 50 uploads per client per hour
//
// GLOBAL VARS
var API_KEY = "1748ee815be8f13cea057a29a7ec47ee"; // Developer key for imgur
var pictureSource = null;
var destinationType = null;
// Only png and jpg files are supported
// image data should be in base64 encoded stream
//
// The format of the callback_func is 
// function callback_func(img_url, error_string)
//
// If it failed to upload then img_url will be null 
// And error_string will be set to the error type
// Otherwise img_url will contain the url of the uploaded image
// SUPPORTED ERRORS:-
// wrong file format
//
var WRONG_FILE_FORMAT_ERROR = "file format is wrong please check, only png or jpg supported";

var Upload = {
   // The callback function that will be invoked with either link or error
   callback_func: null,
   // file is from a <input> tag or from Drag'n Drop
   doUpload: function(file, callback_func) {
      
      // Set up the callback first
      Upload.callback_func = callback_func;
      // Checking if the file selected 
      if (!file || file.length<1) {
         Upload.callback_func(null, WRONG_FILE_FORMAT_ERROR);
      }
      
      // It is!
      // Let's build a FormData object
      var fd = new FormData();
      fd.append("image", file); // Append the file
      fd.append("key", API_KEY);
      // Create the XHR (Cross-Domain XHR FTW!!!)
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
      
      xhr.onload = function() {
         // Big win!
         // The URL of the image is:
         var img_url = JSON.parse(xhr.responseText).upload.links.original;
         console.log("Image url of the uploaded image" + img_url);
         // other flavors of the image
         if(img_url) {
            Upload.onSuccess("", img_url);
         } else {
            Upload.onFail("Failed!", img_url);
         }
      }
      // And now, we send the formdata
      xhr.send(fd);
   },

   /**
    * [onSuccess invokes the callback with the message and image uploaded url]
    * @param  {[string]} message [description]
    * @return {[type]}         [description]
    */
   onSuccess: function(message, img_url) {
      console.log("Success! " + img_url);
      /***
            "original": "http:\/\/imgur.com\/cSNjk.jpg",
            "imgur_page": "http:\/\/imgur.com\/cSNjk",
            "delete_page": "http:\/\/imgur.com\/delete\/ZnKGru1reZKoabU",
            "small_square": "http:\/\/imgur.com\/cSNjks.jpg",
            "large_thumbnail": "http:\/\/imgur.com\/cSNjkl.jpg"
       **/
      if(Upload.callback_func) {
         console.log(img_url);
         Upload.callback_func(img_url, "");
      }
   },

   onFail: function(message) {
      console.log("[Upload] Failed to upload image");
      if(Upload.callback_func) {
         Upload.callback_func("", message);
      }
   }
}