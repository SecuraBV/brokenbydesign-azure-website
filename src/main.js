if (document.getElementById("submit-flag-button")) {
    document.getElementById("submit-flag-button").addEventListener("click", checkflag);
}

if (document.getElementById("flag")) {
    document.getElementById("flag").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkflag();
        }
    });
}


function checkflag() {
    setCheckingFlag(true);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function () {
        if (this.status === 404) {
            alert('Incorrect flag!');
            setCheckingFlag(false);
            return;
        }
        if (this.status === 200) {
            setCheckingFlag(false);
            window.location.href = this.responseText;
        } else {
            alert('An unexpected error occurred. Please try again later.');
            setCheckingFlag(false);
        }
    }

    xmlHttp.onerror = function () {
        alert('An unexpected error occurred. Please try again later.');
        setCheckingFlag(false);
    }

    let flag = document.getElementById('flag').value;
    xmlHttp.open("GET", "https://secura-vulnerable-app-api.azurewebsites.net/api/flagcheckendpoint?flag=" + flag, true);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function loadingFailed() {
    location.replace("/maintenance.html")
}

function setCheckingFlag(isLoading) {
    if (isLoading) {
        document.getElementById("submit-flag-button").setAttribute('disabled', '');
        document.getElementById("flag").setAttribute('disabled', '');
        document.getElementById("submit-flag-button").value = 'Checking flag...';
    } else {
        document.getElementById("submit-flag-button").removeAttribute('disabled');
        document.getElementById("flag").removeAttribute('disabled', '');
        document.getElementById("submit-flag-button").value = 'Submit flag'
    }
}