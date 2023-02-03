var showDHO = " ";
var showTrip = " ";

const Inject = {
  async init() {
    Inject.cache = {
      resultItemsList: [],
    }
    if (document.querySelector('.resultsHeader') == null) {
      return;
    }
    this.createSearchBar();
    this.paintingRows();
  },
  createSearchBar() {
    var resultHeader = document.querySelector('.resultsHeader');
    resultHeader.style.display = "flex";
    resultHeader.style.justifyContent = "space-between";

    var searchBarDom = document.createElement('div');
    searchBarDom.style.display = "flex";

    var DomMinMile = this.createInputDom("minmile", "Min Mile", 'number');
    var DomMaxMile = this.createInputDom("maxmile", "Max Mile", 'number');
    var DomMinOffer = this.createInputDom("minoffer", "Min Offer", 'number');
    var DomBlockcities = this.createInputDom("blockcities", "Block Cities", 'text');
    var DomBlockstates = this.createInputDom("blockstates", "Block States", 'text');
    var DomSubmitBtn = this.createInputDom("filterSubmit", "Filter", 'button');
    DomSubmitBtn.addEventListener('click', this.handleClickFilterBtn);

    searchBarDom.append(DomMinMile);
    searchBarDom.append(DomMaxMile);
    searchBarDom.append(DomMinOffer);
    searchBarDom.append(DomBlockcities);
    searchBarDom.append(DomBlockstates);
    searchBarDom.append(DomSubmitBtn);

    resultHeader.append(searchBarDom)
  },
  createInputDom(inputName, labelName, type) {
    var DomP = document.createElement('div');
    DomP.style.marginLeft = "5px";
    DomP.style.marginRight = "5px";

    var DomInput = document.createElement("input");
    DomInput.type = type;
    DomInput.name = inputName;
    if (type !== "button") {
      var DomLabel = document.createElement("label");
      DomLabel.innerHTML = labelName;
      DomLabel.for = inputName;
      DomLabel.style.textTransform = "capitalize";
      DomLabel.style.color = "blue";
      DomP.append(DomInput);
      DomP.append(DomLabel);
    } else {
      DomInput.value = labelName;
      DomInput.style.textTransform = "capitalize";
      DomInput.style.color = "blue";
      DomP.append(DomInput);
    }

    return DomP;
  },
  paintingRows() {
    var gettingResultItems = setInterval(function () {
      var resultItemsList = document.getElementsByClassName("resultItem");
      if (resultItemsList != null && resultItemsList.length !== 0) {
        Inject.cache.resultItemsList = resultItemsList;
        console.log(resultItemsList.length)
        for (let i = 0; i < resultItemsList.length; i++) {
          let resultItem = resultItemsList[i];
          let rateStr = (resultItem.querySelector('.rate').innerHTML);
          let tripStr = (resultItem.querySelector('.trip>a').innerHTML);
          let rate = convertToFloat(rateStr);
          let trip = convertToFloat(tripStr);
          let rpm = rate / trip;
          let resultItemTr = resultItem.querySelector('tr.qa-match-row')
          if (rpm >= 2.5) {
            resultItemTr.style.background = "green";
          } else if ((rpm >= 1.5) && (rpm < 2.5)) {
            resultItemTr.style.background = 'yellow';
          }
        }
        clearInterval(gettingResultItems);
      }
    }, 1000)
  },
  handleClickFilterBtn() {
    let minMile = document.querySelector('input[name=minmile]').value;
    let maxMile = document.querySelector('input[name=maxmile]').value;
    let minOffer = document.querySelector('input[name=minoffer]').value;
    let blockcities = document.querySelector('input[name=blockcities]').value;
    let blockstates = document.querySelector('input[name=blockstates]').value;
    if (convertToFloat(minMile) > convertToFloat(maxMile)) {
      return;
    }
    Inject.filtering(
      convertToFloat(minMile),
      convertToFloat(maxMile),
      convertToFloat(minOffer),
      convertToArray(blockcities),
      convertToArray(blockstates)
    )
  },
  filtering(minMile, maxMile, minOffer, blockcitiesArr, blockstatesArr) {
    console.log(minMile, maxMile, minOffer, blockcitiesArr, blockstatesArr);
    if (maxMile === 0) {
      return;
    }
    let rows = Inject.cache.resultItemsList;
    let numRows = rows.length;
    for (let i = 0; i < numRows; i++) {
      let resultItem = rows[i];
      if (resultItem === null) {
        continue;
      }
      let rateStr = resultItem.querySelector('.rate').innerHTML;
      let tripStr = resultItem.querySelector('.trip>a').innerHTML;
      let originStr = resultItem.querySelector('.origin').innerHTML;
      let destStr = resultItem.querySelector('.dest').innerHTML;
      let rate = convertToFloat(rateStr);
      let trip = convertToFloat(tripStr);
      let cities = [];
      let states = [];
      let originCity = convertToArray(originStr)[0];
      let originState = convertToArray(originStr)[1];
      let destCity = convertToArray(destStr)[0];
      let destState = convertToArray(destStr)[1];
      // if (originCity !== undefined)

      // if (
      //     (trip<minMile) || 
      //     ((maxMile !== 0) && (trip>maxMile)) || 
      //     ((minOffer !== 0) && (rate<minOffer)) ||

      //     ) {

      // }
      // let resultItemTr = resultItem.querySelector('tr.qa-match-row')
      // if (rpm >= 2.5) {
      //     resultItemTr.style.background = "green";
      // } else if ((rpm >= 1.5) && (rpm < 2.5)) {
      //     resultItemTr.style.background = 'yellow';
      // }
    }
  }
}

function convertToFloat(string) {
  let patt = /[^\w.]|_/g;
  let res = parseFloat(string.replace(patt, ''));
  return isNaN(res) ? 0 : res;
}
function convertToArray(string) {
  var wordArray = [];
  wordArray = string.match(/\b[-?(\w+)?]+\b/gi);

  return wordArray === null ? [] : wordArray;
}
window.addEventListener("load", function () {
  Inject.init();
});