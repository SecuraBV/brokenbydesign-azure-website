// Modified from https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
  var z, i, file;
  z = document.querySelectorAll("[include-html]");
  for (i = 0; i < z.length; i++) {
    file = z[i].getAttribute("include-html");
    makeHTTPRequest(z[i], file);
  }
}

function makeHTTPRequest(elmnt, file) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var result = this.responseText;
        if (elmnt.getAttribute("challenge-nr")) {
          result = result.replace("CHALLENGE_NR", "Challenge " + elmnt.getAttribute("challenge-nr"))
        }
        else {
          result = result.replace("CHALLENGE_NR", "")
        }
        if (elmnt.getAttribute("hint-nr")) {
          result = result.replace("HINT_NR", "| Hint #" + elmnt.getAttribute("hint-nr"))
        }
        else {
          result = result.replace("HINT_NR", "")
        }

        elmnt.innerHTML = result;
      }
      if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
      elmnt.removeAttribute("include-html");
    }
  }
  xhttp.open("GET", file, true);
  xhttp.send();
}

includeHTML();
