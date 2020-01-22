function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function checkCookie() {
    var access=getCookie("access");
    if (access != "") {
      var num = parseInt(access, 10);
      num++;
      document.getElementById("visits").innerHTML='<h3>You have visited this page '+num+' times.</h3>';
      document.cookie = "access="+num;
    } else {
       alert("Welcome for the first time!")
       document.cookie = "access=1";

    }
    document.getElementById("my_audio").play();
  }

if (screen.height < 900 || screen.length < 1200) {
  alert("Your screen size may be a tad too small!");
}