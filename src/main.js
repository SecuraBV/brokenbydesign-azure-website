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
            let challengeCompletedNumer = this.responseText.charCodeAt(1) - 97;

            if (localStorage.getItem("completed") !== null) {
                var array = JSON.parse(localStorage.getItem("completed"));
                if (!array.includes(challengeCompletedNumer)) {
                    array.push(challengeCompletedNumer);
                    array.sort();
                }
            } else {
                localStorage.setItem("completed", JSON.stringify([challengeCompletedNumer]));
            }

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

function findMissing(array, latestChallenge) {
    if (array === null) {
        array = new Array();
    }

    var missing = new Array();

    for (var i = 0; i <= latestChallenge; i++) {
        if (array.indexOf(i) == -1) {
            missing.push(i);
        }
    }

    return missing;
}

function checkForMissing() {
    if ([...location.pathname.matchAll('/')].length > 1) {
        var challengeCompletedNumer = (location.pathname[1].charCodeAt(0)) - 97;
        var missing = findMissing(localStorage.getItem("completed"), challengeCompletedNumer);
        console.log(missing);
        if (missing.length !== 0) {
            console.log("in here!");
            var challengeWord = missing.length === 1 ? 'challenge ' : 'challenges '
            var itOrThem = missing.length === 1 ? 'it ' : 'them '
            document.getElementById('missing-challenges').innerHTML = document.getElementById('missing-challenges').innerHTML.replace('CHALLENGES_HERE', challengeWord + missing.map(a => a + 1).join(', ')).replace('THEM', itOrThem);
            document.getElementById('missing-challenges').style = 'display:block;';
        }
    }
}