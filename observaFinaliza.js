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
const targetElement = getElementByXPath("//*[@id='sidebar']/div[1]/div[3]/ul/li[13]"); // Menu finalizar atendimento

if (targetElement) {
    // Crie um MutationObserver
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                console.log('Classe alterada:', targetElement.className);
                // Verifique se a classe 'active' foi adicionada
                if (targetElement.classList.contains('active')) {
                    console.log('A classe "active" foi adicionada ao item menu finalizar atendimento');

                    // Aguardar aparecer o elemento codProcedimento e preencher com 0301010064
                    waitForElementToBeVisible("#lookup_key_pec_atendimento_soap_finalizacao_procedimento", (codProcedimento) => {
                        // Se ja tiver Procedimento inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_procedimentos_finalizacao_table") == 1) {
                            codProcedimento.focus();
                            setTimeout(() => {
                                codProcedimento.value = "0301010064";
                                console.log("Valor '0301010064' digitado no campo.");
                            }, 100);

                            const campoProcedimento = document.getElementById("select2-chosen-23");
                            setTimeout(() => {
                                //campoProcedimento.click();
                                campoProcedimento.focus();
                            }, 100);
                        }
                        else {
                            console.log("Ja tem Procedimento adicionado, nao adicionar mais")
                        }
                    });

                    // Aguarda aparecer a descrição do procedimento e clica no botão de +
                    botaoAdicionarProced = document.getElementById("pec_atendimento_soap_procedimentos_finalizacao_button");
                    waitForTextChange("#select2-chosen-23", (innerText) => {
                        // Se ja tiver Procedimento inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_procedimentos_finalizacao_table") == 1) {
                            console.log("Descrição Procedimento alterado para:", innerText);
                            botaoAdicionarProced.focus();
                            setTimeout(() => {
                                botaoAdicionarProced.click();
                                console.log("botao add procedimento clicado");
                            }, 100);

                            const campoProcedimento = document.getElementById("select2-chosen-23");
                            setTimeout(() => {
                                //campoAvaliacao.click();
                                campoAvaliacao.focus();
                            }, 100);
                        }
                        else {
                            console.log("Ja tem Procedimento adicionado, nao adicionar mais")
                        }
                    });

                } else {
                    console.log('A classe "active" foi removida do item menu finalizar atendimento');
                }
            }
        }
    });

    // Configuração do observer: observar mudanças nos atributos
    const config = { attributes: true };

    // Inicie o observer no elemento alvo
    observer.observe(targetElement, config);

    console.log('Observando mudanças na classe do item menu finalizar atendimento');
} else {
    console.log('Elemento do item menu soap não encontrado para o XPath fornecido.');
}
