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
const targetElementMenuSoap = getElementByXPath("//*[@id='sidebar']/div[1]/div[3]/ul/li[3]");

if (targetElementMenuSoap) {
    // Crie um MutationObserver
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                console.log('Classe alterada:', targetElementMenuSoap.className);
                // Verifique se a classe 'active' foi adicionada
                if (targetElementMenuSoap.classList.contains('active')) {
                    console.log('A classe "active" foi adicionada ao item menu soap');

                    // Aguardar aparecer o elemento campoCid e preencher com Z00
                    waitForElementToBeVisible("#lookup_key_pec_atendimento_soap_avaliacao_cid", (campoCodigoCid) => {
                        // Se ja tiver CID inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_avaliacao_cid_table") == 1) {
                            campoCodigoCid.focus();
                            setTimeout(() => {
                                campoCodigoCid.value = "Z00";
                                console.log("Valor 'Z00' digitado no campo.");
                            }, 100);

                            const campoAvaliacao = document.getElementById("pec_atendimento_soap_avaliacao");
                            setTimeout(() => {
                                campoAvaliacao.click();
                                campoAvaliacao.focus();
                            }, 100);
                        }
                        else {
                            console.log("Ja tem cid adicionado, nao adicionar mais")
                        }
                    });

                    // Aguarda aparecer a descrição do CID e clica no botão de +
                    botaoAdicionarCid = document.getElementById("pec_atendimento_soap_avaliacao_add_fields_button");
                    waitForTextChange("#select2-chosen-9", (innerText) => {
                        // Se ja tiver CID inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_avaliacao_cid_table") == 1) {
                            console.log("Descrição CID alterado para:", innerText);
                            botaoAdicionarCid.focus();
                            setTimeout(() => {
                                botaoAdicionarCid.click();
                                console.log("Valor 'Z00' digitado no campo.");
                            }, 100);

                            const campoAvaliacao = document.getElementById("pec_atendimento_soap_avaliacao");
                            setTimeout(() => {
                                campoAvaliacao.click();
                                campoAvaliacao.focus();
                                // Até aqui funcionou

                                // Ideia para continuar = daqui mesmo já clicar no campo finalizar atendimento [mas fazer outra lógica para ele ficar observando]
                                // Falta também fazer a mesma lógica para mudar o CBO
                            }, 100);
                        }
                        else {
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
    observer.observe(targetElementMenuSoap, config);

    console.log('Observando mudanças na classe do item menu soap');
} else {
    console.log('Elemento do item menu soap não encontrado para o XPath fornecido.');
}








// Encontre o elemento
const targetElementMenuFinalizar = getElementByXPath("//*[@id='sidebar']/div[1]/div[3]/ul/li[13]"); // Menu finalizar atendimento

if (targetElementMenuFinalizar) {
    // Crie um MutationObserver
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                console.log('Classe alterada:', targetElementMenuFinalizar.className);
                // Verifique se a classe 'active' foi adicionada
                if (targetElementMenuFinalizar.classList.contains('active')) {
                    console.log('A classe "active" foi adicionada ao item menu finalizar atendimento');

                    // Aguardar aparecer o elemento codProcedimento e preencher com 0301010064
                    ////*[@id="lookup_key_pec_atendimento_soap_esu_tipo_atendimento_id"]
                    const tipoAtendimento = document.getElementById("lookup_key_pec_atendimento_soap_esu_tipo_atendimento_id");
                    waitForElementToBeVisible("#lookup_key_pec_atendimento_soap_finalizacao_procedimento", (codProcedimento) => {
                        // Se ja tiver Procedimento inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_procedimentos_finalizacao_table") == 1) {
                            codProcedimento.focus();
                            setTimeout(() => {
                                codProcedimento.value = "0301010064";
                                console.log("Valor '0301010064' digitado no campo.");
                            }, 100);

                            
                            // Clica fora do campo só para carregar a descrição do procedimento
                            setTimeout(() => {
                                tipoAtendimento.click();
                                tipoAtendimento.focus();
                            }, 200);
                        }
                        else {
                            console.log("Ja tem Procedimento adicionado, nao adicionar mais")
                        }
                    });

                    // Aguarda aparecer a descrição do procedimento e clica no botão de +
                    const botaoAdicionarProced = document.getElementById("pec_atendimento_soap_procedimentos_finalizacao_button");
                    waitForTextChange("#select2-chosen-23", (innerText) => {
                        // Se ja tiver Procedimento inserido nao fazer nada
                        if (numeroElementosTR("pec_atendimento_soap_procedimentos_finalizacao_table") == 1) {
                            console.log("Descrição Procedimento alterado para:", innerText);
                            //botaoAdicionarProced.focus();
                            setTimeout(() => {
                                botaoAdicionarProced.click();
                                console.log("botao add procedimento clicado");
                            }, 100);
                        }
                        else {
                            console.log("Ja tem Procedimento adicionado, nao adicionar mais");
                        }
                    });

                    // Adiciona o EventListener ao botão após o carregamento do DOM
                    document.addEventListener('DOMContentLoaded', function() {
                        //Adiciona o EventListener ao botão
                        botaoAdicionarProced.addEventListener('click', addProcedimentoClicado);
                    });

                    function addProcedimentoClicado(){
                        setTimeout(() => {
                        alert("oi");
                        }, 1000);
                    }

                    //document.getElementById("lookup_key_pec_atendimento_soap_esu_tipo_atendimento_id"). value = "5"; // Tipoatendimento
                    document.getElementById("pec_atendimento_soap_esu_conduta_ids_7").checked = true; // Checkbox retorno programado  condinuado


                } else {
                    console.log('A classe "active" foi removida do item menu finalizar atendimento');
                }
            }
        }
    });

    // Configuração do observer: observar mudanças nos atributos
    const config = { attributes: true };

    // Inicie o observer no elemento alvo
    observer.observe(targetElementMenuFinalizar, config);

    console.log('Observando mudanças na classe do item menu finalizar atendimento');
} else {
    console.log('Elemento do item menu soap não encontrado para o XPath fornecido.');
}
