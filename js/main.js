var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var siteNameDiv = document.getElementById("siteNameDiv")
var siteUrlDiv = document.getElementById("siteUrlDiv")
var layerDiv = document.getElementById("layerDiv")
var submitBtn = document.getElementById("submit")
var okBtn = document.getElementById("okBtn")
var opacityDiv = document.getElementById("opacityDiv")

var websiteArray = []
var deletebtns = []

siteNameDiv.style.display = "none"
siteUrlDiv.style.display = "none"

if (localStorage.getItem("website") != null) {
    websiteArray = JSON.parse(localStorage.getItem("website"))
    display();
    eventHandler();
}


submitBtn.addEventListener("click", function () {
    submit()
})


okBtn.addEventListener("click", function () {
    layerDiv.classList.replace("show", "hide");
    opacityDiv.classList.remove("opacity-25")
})


siteNameInput.addEventListener("keyup", function () {
    if (checkSiteName() != true) {
        siteNameDiv.style.display = "block"
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("mb-5")

    }

    else {
        siteNameDiv.style.display = "none"
        siteNameInput.classList.remove("is-invalid")
        siteNameInput.classList.add("mb-5", "is-valid")
    }
})


siteUrlInput.addEventListener("keyup", function () {
    if (checkSiteUrl() != true) {
        siteUrlDiv.style.display = "block"
        siteUrlInput.classList.add("is-invalid")
        siteUrlInput.classList.remove("mb-5")
    }

    else {
        siteUrlDiv.style.display = "none"
        siteUrlInput.classList.remove("is-invalid")
        siteUrlInput.classList.add("mb-5", "is-valid")
    }
})


function submit() {

    if (siteNameInput.value == "" && siteUrlInput.value == "") {
        siteNameDiv.style.display = "block"
        siteUrlDiv.style.display = "block"
        siteNameInput.classList.remove("mb-5")
        siteUrlInput.classList.remove("mb-5")
    }

    else if (siteNameInput.value == "") {
        siteNameDiv.style.display = "block"
        siteNameInput.classList.replace("mb-5", "border-danger")
    }

    else if (siteUrlInput.value == "") {
        siteUrlDiv.style.display = "block"
        siteUrlInput.classList.replace("mb-5", "border-danger")
    }

    else {
        siteNameDiv.style.display = "none"
        siteUrlDiv.style.display = "none"
        siteNameInput.classList.add("mb-5")
        siteUrlInput.classList.add("mb-5")
    }

    var flag = 0

    if (checkSiteUrl() == true && checkSiteName() == true) {

        //check if the url or site name has been added before or not
        for (var counter = 0; counter < websiteArray.length; counter++) {
            if ((siteNameInput.value.toLowerCase() == websiteArray[counter].name.toLowerCase()) || (siteUrlInput.value.toLowerCase() == websiteArray[counter].url.toLowerCase())) {

                showLayerDiv()

                flag = 1;
                break;
            }
        }

        //if url and site name are new
        if (flag == 0) {

            var website = {
                name: siteNameInput.value,
                url: siteUrlInput.value,
            }

            websiteArray.push(website)
            localStorage.setItem("website", JSON.stringify(websiteArray));
            display()
            eventHandler()
            clearForm()

        }

    }
}


function display() {
    temp = ""
    for (var i = 0; i < websiteArray.length; i++) {

        temp = temp +
            `<tr>
                <td>${i + 1}</td>
                <td>${(websiteArray[i].name.charAt(0).toUpperCase() + websiteArray[i].name.slice(1).toLowerCase())}</td>
                <td>
                    <a href="${websiteArray[i].url}">
                        <button class="btn btn-success px-4 text-white">
                        <i class="fa-solid fa-eye"></i>
                        Visit
                        </button>
                    </a>
                </td>
                <td>
                    <button deleteCounter=${i} class="btn btn-danger px-4 ">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                    </button>
                </td>
            </tr>`
    }

    document.getElementById("body").innerHTML = temp;

}


function deleteWebsite(best) {
    websiteArray.splice(best, 1);
    localStorage.setItem("website", JSON.stringify(websiteArray));
    display();
    eventHandler();
}


function eventHandler() {

    deletebtns = document.querySelectorAll("[deleteCounter]")

    for (let index = 0; index < deletebtns.length; index++) {
        deletebtns[index].addEventListener("click", function (e) {
            var best = Number(e.target.getAttribute("deleteCounter"));
            deleteWebsite(best);
        })

    }
}


function clearForm() {

    siteNameInput.value = ""
    siteUrlInput.value = ""
    siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")

}


function checkSiteName() {
    var regexName = /^[a-zA-z]{3}/
    if (regexName.test(siteNameInput.value)) {
        return true;
    }
    else {
        return false;
    }
}


function checkSiteUrl() {
    var regexUrl = /^(https|HTTPS|http|HTTP):\/\/(www\.|WWW\.)?[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}$/
    if (regexUrl.test(siteUrlInput.value)) {
        return true;
    }
    else {
        return false;
    }
}


function showLayerDiv() {
    layerDiv.classList.replace("hide", "show");
    opacityDiv.classList.add("opacity-25")
}

