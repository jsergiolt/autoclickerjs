var numerodecids = 0;
var espOK = 0; // TODO: Quando tudo estiver ok, muda para 1, assim podemos evitar que o código seja executado em loop (ajustar isso)

function waitForElement(selector, callback) {
    var observer = new MutationObserver(function (mutations, me) {
        var element = document.querySelector(selector);
        if (element) {
            me.disconnect(); // stop observing
            callback(element);
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

function waitForTextToBe(selector, text, interval = 100) {
    return new Promise((resolve, reject) => {
        const element = document.getElementById(selector);
        if (!element) {
            return reject(new Error(`Element with id ${selector} not found`));
        }
        
        const checkText = setInterval(() => {
            if (element.innerText === text) {
                clearInterval(checkText);
                resolve();
            }
        }, interval);
    });
}

function isActive(menuLi) {
    // Verifica se o elemento possui a classe "active"
    return menuLi && menuLi.classList.contains('active');
}

function waitForClassChange(xpath, className, callback) {
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (!element) {
        console.error(`Element with selector ${selector} not found`);
        return;
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (element.classList.contains(className)) {
                    observer.disconnect();
                    callback();
                }
            }
        });
    });

    observer.observe(element, {
        attributes: true
    });
}
function observeClassChange(xpath, className, callback) {
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (!element) {
        console.error(`Element with XPath ${xpath} not found`);
        return;
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (element.classList.contains(className)) {
                    observer.disconnect();
                    callback();
                }
            }
        });
    });

    observer.observe(element, {
        attributes: true,
        attributeFilter: ['class']
    });
}



// Verificar e alterar campo de especialidade
waitForElement("#lookup_key_pec_atendimento_soap_codespecialidade", function (codigoEsp) {
    if (codigoEsp.value !== "225142") {
        codigoEsp.focus();
        codigoEsp.value = "225142";
    }
});


observeClassChange("//*[@id='sidebar']/div[1]/div[3]/ul/li[3]", 'active', () => {
    const liSoap = document.querySelector("#sidebar > div:nth-child(1) > div:nth-child(3) > ul > li:nth-child(3)"); ////*[@id="sidebar"]/div[1]/div[3]/ul/li[3]
    // Verificar e inserir CID
    waitForElement("#lookup_key_pec_atendimento_soap_avaliacao_cid", function (cid) {
        if (liSoap && isActive(liSoap)){
            if (cid.value !== "Z00" && numerodecids === 0) {
                cid.focus();
                cid.value = "Z00";

                
                // Espera o texto do campo ser trocado
                waitForTextToBe("select2-chosen-9", "Exame geral e investigação de pessoas sem queixas ou diagnóstico relatado")
                .then(() => {
                    // Clica no botao adicionar
                    waitForElement("#pec_atendimento_soap_avaliacao_add_fields_button", function (addCid) { 
                        addCid.focus();
                        addCid.click();
                        numerodecids = 1;
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }
    });
});




/* verificar o que fazer com isso
// Clicar em finalizar atendimento
waitForElement("#sidebar > div:nth-child(1) > div:nth-child(3) > ul > li:nth-child(12) > a", function (finalizarAtendimento) {
    // ADICIONAR CÓDIGO PARA CLICAR SOMENTE SE A TABELA DE CID JÁ TIVER SIDO PREENCHIDA
    finalizarAtendimento.click();
});*/

// Preencher campos de tipo de atendimento, procedimento, marcar checkbox de retorno e retornar ao SOAP
waitForElement("#lookup_key_pec_atendimento_soap_esu_tipo_atendimento_id", function (tipoAtendimento) {
    tipoAtendimento.focus();
    tipoAtendimento.value = "5";
});

waitForElement("#pec_atendimento_soap_esu_conduta_ids_7", function (cbRetornoCCP) {
    cbRetornoCCP.checked = true;
});

waitForElement("#lookup_key_pec_atendimento_soap_finalizacao_procedimento", function (codigoProced) {
    codigoProced.focus();
    codigoProced.value = "0301010064";

    // Espera o texto do campo ser trocado
    waitForTextToBe("select2-chosen-23", "CONSULTA MEDICA EM ATENÇÃO PRIMÁRIA") // <span class="select2-chosen" id="select2-chosen-23">CONSULTA MEDICA EM ATENÇÃO PRIMÁRIA</span>
    .then(() => {
        // Clica no botao adicionar
        waitForElement("#pec_atendimento_soap_procedimentos_finalizacao_button", function (addProc) {
            addProc.focus();
            addProc.click();
        });
    })
    .catch((error) => {
        console.error(error);
    });
    
    
});

/*
// Retornar ao SOAP e clicar no campo de avaliação
waitForElement("#sidebar > div:nth-child(1) > div:nth-child(3) > ul > li:nth-child(3) > a", function (soap) {
    setTimeout(function () {
        soap.click();
        waitForElement("#pec_atendimento_soap_avaliacao", function (campoAvaliacao) {
            campoAvaliacao.click();
            campoAvaliacao.focus();
        });
    }, 1000); // Atraso para garantir que o click anterior tenha sido processado
});*/




https://mariana-mg.vivver.com/pec/atendimento_soap/new?oldWorkMode=wmSearch&pec_atendimento_soap%5Bamb_recepcao_id%5D=7171&pec_atendimento_soap%5Bcarregar_exame_agenda%5D=false&pec_atendimento_soap%5Bcodespecialidade%5D=225125&pec_atendimento_soap%5Bcodprofissional%5D=151&pec_atendimento_soap%5Bfila_recepcao_id%5D=4415&pec_atendimento_soap%5Bpec_escuta_inicial_id%5D=&workMode=wmInsert
https://mariana-mg.vivver.com/pec/atendimento_soap/new?oldWorkMode=wmSearch&pec_atendimento_soap%5Bamb_recepcao_id%5D=7171&pec_atendimento_soap%5Bcarregar_exame_agenda%5D=false&pec_atendimento_soap%5Bcodespecialidade%5D=225125&pec_atendimento_soap%5Bcodprofissional%5D=151&pec_atendimento_soap%5Bfila_recepcao_id%5D=4415&pec_atendimento_soap%5Bpec_escuta_inicial_id%5D=&workMode=wmInsert#tab_soap
https://mariana-mg.vivver.com/pec/atendimento_soap/new?oldWorkMode=wmSearch&pec_atendimento_soap%5Bamb_recepcao_id%5D=7171&pec_atendimento_soap%5Bcarregar_exame_agenda%5D=false&pec_atendimento_soap%5Bcodespecialidade%5D=225125&pec_atendimento_soap%5Bcodprofissional%5D=151&pec_atendimento_soap%5Bfila_recepcao_id%5D=4415&pec_atendimento_soap%5Bpec_escuta_inicial_id%5D=&workMode=wmInsert#tab_finalizar