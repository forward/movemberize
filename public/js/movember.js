var thisPageUsingOtherJSLibrary = false;
(function() {
  if (typeof jQuery === "undefined") {
    getScript = function(url, success) {
      var done, head, script;
      script = document.createElement("script");
      script.src = url;
      head = document.getElementsByTagName("head")[0];
      done = false;
      script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
          done = true;
          success();
          script.onload = script.onreadystatechange = null;
          return head.removeChild(script);
        }
      };
      return head.appendChild(script);
    };
    if (typeof $ === "function") {
      thisPageUsingOtherJSLibrary = true;
    }
    // getScript("" + location.protocol + "//ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js", function() {
    getScript("http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js", function() {
      if (typeof jQuery === "undefined") {
        try {
          return console.log("jQuery could not be loaded.");
        } catch (error) {

        }
      } else {
        try {
          console.log("jQuery was not found on the page so it was loaded by movember");
        } catch (error) {

        }
        if (thisPageUsingOtherJSLibrary) {} else {
          $(function() {
            return movemberise();
          });
        }
      }
    });
  } else {
    $(function() {
      return movemberise();
    });
  }

  movemberise = function(){
    $('img:visible').each(function(i,e) {
      if ($(this).width() * $(this).height() < 45000) return;
      var originalImage = e.src;
      if (!originalImage) return;

      var newImage = "http://mustachy.heroku.com/?src=" + originalImage;

      function success(){
        $(e).attr('src', newImage);
      }

      var tester=new Image();
      tester.onload=success;
      tester.src=newImage;
    });
  }
}).call(this);