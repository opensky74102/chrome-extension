var showDHO = " ";
var showTrip = " ";

const Inject = {
    async init() {
        var resultHeader = document.querySelector('.resultsHeader');
        console.log(document.body)
        console.log(resultHeader)
    }
}

window.addEventListener("load", () => {
    Inject.init();
});