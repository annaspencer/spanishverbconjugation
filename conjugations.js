let verbInput = document.getElementById('verb');
let transInput = document.getElementById('translation');
let yoInput = document.getElementById('yo');
let tuInput = document.getElementById('tu');
let elInput = document.getElementById('elUstedElla');
let nosotrosInput = document.getElementById('nosotros');
let ellosInput = document.getElementById('ellaUstedesEllos');
let inputForm = document.getElementById('tableForm');
let conjugationsTbody = document.querySelector('#conjugationsTable tbody');

let allData = {};
let verbs = JSON.parse(localStorage.getItem("verbs")) || [];
let dataId = verbs.length ? verbs[verbs.length - 1].id : 0;


for (let i = 0; i < verbs.length; i++) {
  let newTr = document.createElement('tr');
    newTr.id = 'data-' + dataId;

    appendTd(newTr, verbs[i].verbData);
    appendTd(newTr, verbs[i].transData);
    appendTd(newTr, verbs[i].yoData);
    appendTd(newTr, verbs[i].tuData);
    appendTd(newTr, verbs[i].elData);
    appendTd(newTr, verbs[i].nosData);
    appendTd(newTr, verbs[i].ellosData);
    appendDeleteBtn(newTr);
    conjugationsTbody.append(newTr);

    dataId += 1;
}

inputForm.addEventListener('submit', submitData);

function submitData(evt) {
    if (evt) {
      evt.preventDefault();
    }

    let verbData = verbInput.value;
    let transData =transInput.value;
    let yoData = yoInput.value;
    let tuData = tuInput.value;
    let elData = elInput.value;
    let nosData = nosotrosInput.value;
    let ellosData = ellosInput.value;

    let curVerb = createVerbData();
    if (curVerb) {
      allData['data-' + dataId] = curVerb;
      appendDataTable(curVerb);

      verbInput.value = '';
      transInput.value = '';
      yoInput.value = '';
      tuInput.value = '';
      elInput.value = '';
      nosotrosInput.value = '';
      ellosInput.value = '';

      verbs.push({ id: dataId, verbData: verbData, transData: transData, yoData: yoData, tuData: tuData, elData: elData, nosData: nosData, ellosData: ellosData});
      localStorage.setItem("verbs", JSON.stringify(verbs));

      dataId += 1;
  }
}

function createVerbData() {
  let verbData = verbInput.value;
  let transData =transInput.value;
  let yoData = yoInput.value;
  let tuData = tuInput.value;
  let elData = elInput.value;
  let nosData = nosotrosInput.value;
  let ellosData = ellosInput.value;

  if (verbData !== '') {
    return {
      verbData: verbData,
      transData: transData,
      yoData: yoData,
      tuData: tuData,
      elData: elData,
      nosData: nosData,
      ellosData: ellosData
    }
  }
}

function appendDataTable(curVerb) {
  let newTr = document.createElement('tr');
  newTr.id = 'data-' + dataId;

  appendTd(newTr, curVerb.verbData);
  appendTd(newTr, curVerb.transData);
  appendTd(newTr, curVerb.yoData);
  appendTd(newTr, curVerb.tuData);
  appendTd(newTr, curVerb.elData);
  appendTd(newTr, curVerb.nosData);
  appendTd(newTr, curVerb.ellosData);
  appendDeleteBtn(newTr);
  conjugationsTbody.append(newTr);
}

function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;
  tr.append(newTd);
}

function appendDeleteBtn(tr, type) {
  let newTd = document.createElement('td');
  newTd.className = 'deleteBtn';
  newTd.innerText = 'X';
  newTd.addEventListener('click', removeEle);
  tr.append(newTd);
}


function removeEle(evt) {
  let ele = evt.target.closest('tr');
  let index = verbs.findIndex(item => item.id.toString() === ele.id.split('-')[1]);
  removeLocalStorage(index);
  ele.parentNode.removeChild(ele);

}

function removeLocalStorage(index){
  let store = JSON.parse(localStorage.getItem("verbs")) || [];
  store.splice(index, 1);
  localStorage.setItem('verbs', JSON.stringify(store));
}

let clear = document.getElementById('clear-button');

clear.addEventListener('click', function() {
  localStorage.clear();
  window.location.reload(false);
});
