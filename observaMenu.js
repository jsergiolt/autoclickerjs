// Função para encontrar um elemento usando XPath
function getElementByXPath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Função que aguarda o elemento aparecer
function waitForElementToBeVisible(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        if (element.offsetParent !== null) {
            callback(element);
        } else {
            setTimeout(() => waitForElementToBeVisible(selector, callback), 100);
        }
    } else {
        console.log("Elemento não encontrado.");
    }
}

// Função para aguardar a mudança no texto do elemento
function waitForTextChange(selector, callback) {
    const targetElement = document.querySelector(selector);

    if (!targetElement) {
        console.log("Elemento não encontrado.");
        return;
    }

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                callback(targetElement.innerText);
                observer.disconnect();
            }
        }
    });

    observer.observe(targetElement, { subtree: true, characterData: true, childList: true });
}

// Função para contar elementos tr dentro da tabela
function numeroElementosTR(idTabela) {
    // Selecione a tabela pelo id
    const table = document.getElementById(idTabela);

    // Verifique se a tabela existe
    if (table) {
        // Selecione todos os elementos tr dentro da tabela
        const trElements = table.querySelectorAll("tr");

        // Retorne a contagem de elementos tr
        return trElements.length;
    } else {
        console.log("Tabela não encontrada.");
        return 0;
    }
}

// Encontre o elemento
const targetElement = getElementByXPath("//*[@id='sidebar']/div[1]/div[3]/ul/li[3]");

if (targetElement) {
    // Crie um MutationObserver
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                console.log('Classe alterada:', targetElement.className);
                // Verifique se a classe 'active' foi adicionada
                if (targetElement.classList.contains('active')) {
                    console.log('A classe "active" foi adicionada ao item menu soap');

                    // Aguardar aparecer o elemento campoCid e preencher com Z00
                    waitForElementToBeVisible("#lookup_key_pec_atendimento_soap_avaliacao_cid", (campoCodigoCid) => {
                        // Se ja tiver CID inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_avaliacao_cid_table") == 1){
                            campoCodigoCid.focus();
                            setTimeout(() => {
                                campoCodigoCid.value = "Z00";
                                console.log("Valor 'Z00' digitado no campo.");
                            }, 100);

                            const campoAvaliacao = document.getElementById("pec_atendimento_soap_avaliacao");
                            setTimeout(() => {
                                campoAvaliacao.focus();
                                campoAvaliacao.click();
                            }, 100);
                        }
                        else{
                            console.log("Ja tem cid adicionado, nao adicionar mais")
                        }                       
                    });                 
                    
                    // Aguarda aparecer a descrição do CID e clica no botão de +
                    botaoAdicionarCid = document.getElementById("pec_atendimento_soap_avaliacao_add_fields_button");
                    waitForTextChange("#select2-chosen-9", (innerText) => {
                        // Se ja tiver CID inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_avaliacao_cid_table") == 1){
                            console.log("Descrição CID alterado para:", innerText);
                            botaoAdicionarCid.focus();
                            setTimeout(() => {
                                botaoAdicionarCid.click();
                                console.log("Valor 'Z00' digitado no campo.");
                            }, 100);
                        }
                        else{
                            console.log("Ja tem cid adicionado, nao adicionar mais")
                        }
                    });

                } else {
                    console.log('A classe "active" foi removida do item menu soap');
                }
            }
        }
    });

    // Configuração do observer: observar mudanças nos atributos
    const config = { attributes: true };

    // Inicie o observer no elemento alvo
    observer.observe(targetElement, config);

    console.log('Observando mudanças na classe do item menu soap');
} else {
    console.log('Elemento do item menu soap não encontrado para o XPath fornecido.');
}
