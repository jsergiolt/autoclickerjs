var numerodecids = 0;

// Encontrar elementos usando IDs diretos
const menuFinalizarAtendimento = document.querySelector("#sidebar > div:nth-child(1) > div:nth-child(3) > ul > li:nth-child(12) > a");
const menuSoap = document.querySelector("#sidebar > div:nth-child(1) > div:nth-child(3) > ul > li:nth-child(3) > a");
const campoAvaliacao = document.getElementById("pec_atendimento_soap_avaliacao");
// Encontrar campos pelo ID
const codigoEsp = document.getElementById("lookup_key_pec_atendimento_soap_codespecialidade");
const cid = document.getElementById("lookup_key_pec_atendimento_soap_avaliacao_cid");
const addCid = document.getElementById("pec_atendimento_soap_avaliacao_add_fields_button");
const tipoAtendimento = document.getElementById("lookup_key_pec_atendimento_soap_esu_tipo_atendimento_id");
const codigoProced = document.getElementById("lookup_key_pec_atendimento_soap_finalizacao_procedimento");
const cbRetornoCCP = document.getElementById("pec_atendimento_soap_esu_conduta_ids_7");

const addProc = document.getElementById("pec_atendimento_soap_procedimentos_finalizacao_button");

// Verificar se o campo de especialidade foi encontrado e alterá-lo se necessário
if (codigoEsp && codigoEsp.value !== "225142") {
    setTimeout(trocarEspecialidade, 250);
}

function trocarEspecialidade() {
    codigoEsp.focus();
    codigoEsp.value = "225142";
}

// Clicar no link SOAP
if(menuSoap){
    setTimeout(clicarSoap, 500);
}

function clicarSoap() {
    menuSoap.click();
}

// Verificar se o campo CID foi encontrado e inserir um valor se necessário
if (cid && cid.value !== "Z00" && numerodecids === 0) {
    setTimeout(inserirCid, 750);
}

function inserirCid() {
    cid.focus();
    cid.value = "Z00";
    addCid.focus();
    setTimeout(clicarAddCid, 1250);
}

function clicarAddCid() {
    addCid.click();
    numerodecids = 1;
}

// Clicar em finalizar atendimento
setTimeout(finalizar, 1500);
function finalizar() {
    menuFinalizarAtendimento.click();
}

// Preencher campos de tipo de atendimento e procedimento, e marcar checkbox de retorno
if (tipoAtendimento && codigoProced) {
    setTimeout(trocarTipoAtendimento, 1750);
    setTimeout(trocarCodigoProced, 2000);
    setTimeout(marcarRetorno, 2500);
    
    //retorna ao soap
    setTimeout(clicarSoap, 2750);
    setTimeout(clicaCampoAvaliacao, 3000);
    
}

function trocarTipoAtendimento() {
    tipoAtendimento.focus();
    tipoAtendimento.value = "5";
    codigoProced.focus();
}

function trocarCodigoProced() {
    codigoProced.focus();
    codigoProced.value = "0301010064";
    
    addProc.focus();
    setTimeout(clicarAddProc, 250);
}

function pressionarEnter() {
    var evento = new KeyboardEvent('keydown', {
        'keyCode': 13,
        'which': 13
    });
    codigoProced.dispatchEvent(evento);
}
    
function clicarAddProc() {
    addProc.click();
}

function clicaCampoAvaliacao(){
  campoAvaliacao.click();
  campoAvaliacao.focus();
}

function marcarRetorno() {
    cbRetornoCCP.checked = true;
}

function waitForElement(elmt) {
    var observer = new MutationObserver(function (mutations, me) {
        //var element = document.querySelector(selector);
        if (elmt) {
            me.disconnect(); // stop observing
            //callback(elmt);
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}