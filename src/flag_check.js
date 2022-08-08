document.getElementById("submit-flag-button").addEventListener("click", checkflag);

document.getElementById("flag").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkflag();
    }
});

function checkflag() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function () {
        if (this.status === 404) {
            alert('Incorrect flag!');
            return;
        }
        if (this.status === 200) {
            window.location.href = this.responseText;
        }
    }

    var flag = document.getElementById('flag').value;
    xmlHttp.open("GET", "https://secura-vulnerable-app-api.azurewebsites.net/api/flagcheckendpoint?flag=" + flag, true);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}