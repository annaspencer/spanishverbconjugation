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
let dataId = 0;

let savedVerbs = JSON.parse(localStorage.getItem("verbs")) || [];
let deletedVerbs = JSON.parse(localStorage.getItem("deleted")) || [];

for (let i = 0; i < savedVerbs.length; i++) {
  let newTr = document.createElement('tr');
    newTr.id = 'data' + dataId;
    
  
    appendTd(newTr, savedVerbs[i].verbData);
    appendTd(newTr, savedVerbs[i].transData);
    appendTd(newTr, savedVerbs[i].yoData);
    appendTd(newTr, savedVerbs[i].tuData);
    appendTd(newTr, savedVerbs[i].elData);
    appendTd(newTr, savedVerbs[i].nosData);
    appendTd(newTr, savedVerbs[i].ellosData);
    appendDeleteBtn(newTr);
    conjugationsTbody.append(newTr);
}

inputForm.addEventListener('submit', submitData);

function submitData(evt){
    if (evt) evt.preventDefault(); 

    let verbData = verbInput.value;
    let transData =transInput.value;
    let yoData = yoInput.value;
    let tuData = tuInput.value;
    let elData = elInput.value;
    let nosData = nosotrosInput.value;
    let ellosData = ellosInput.value; 
   
    let curVerb = createVerbData();
    if (curVerb) {
        dataId += 1;
    
        allData['data' + dataId] = curVerb;
    
      appendDataTable(curVerb);
      
      verbInput.value = '';
      transInput.value='';
      yoInput.value = '';
      tuInput.value = '';
      elInput.value = '';
      nosotrosInput.value = '';
      ellosInput.value = '';
      
      savedVerbs.push({ verbData: verbData, transData: transData, yoData: yoData, tuData: tuData, elData: elData, nosData: nosData, ellosData: ellosData});
      localStorage.setItem("verbs", JSON.stringify(savedVerbs));
      
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



    if (verbData === ''){ return;
  
     } else {
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
    newTr.id = 'data' + dataId;
  
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
    
    console.log(ele);
 
    
    delete allData[ele.id];
    ele.parentNode.removeChild(ele);
    
    deletedVerbs.push(allData[ele.id]);
    localStorage.setItem("deleted", JSON.stringify(deletedVerbs));
  }

  let clear = document.getElementById('clear-box');
  clear.addEventListener('click', function(){
    localStorage.clear();
    window.location.reload(false);
   
   })