// Seleciona todos os elementos na página
const elementos = document.querySelectorAll('*');

// Função para modificar os elementos na pagina soap
function modificarElementos() {

    // Elementos da página soap
    const codigoEsp = document.getElementById("lookup_key_pec_atendimento_soap_codespecialidade");
    const cid = document.getElementById("lookup_key_pec_atendimento_soap_avaliacao_cid");

    // Verifica se os elementos codigoEsp e cid existem [se sim, a página atual é o soap]
    if (codigoEsp && cid) {

        // Verifica se o valor de codigoEsp é diferente de "225142"
        if (codigoEsp.value !== "225142") {
            // Modifica para o código desejado
            setTimeout(() => {
                codigoEsp.focus();
                codigoEsp.value = "225142"; // TODO: VERIFICAR NECESSIDADE DE FOCAR EM OUTRO ELEMENTO APÓS ISSO - PODE SER QUE BUG AO DIGITAR 
            }, 200);
        }

        // Seleciona a tabela de cids pelo id
        const tabela = document.getElementById('pec_atendimento_soap_avaliacao_cid_table');
        // Seleciona todos os elementos <tr> dentro da tabela
        const elementosTr = tabela.querySelectorAll('tr');

        // Verifica se não tem nenhum cid já inserido, se não tiver, digita Z00 (se ja tiver digitado nao faz nada)
        if (elementosTr.length == 1 && cid.value !== "Z00") {
            setTimeout(() => {
                cid.focus();
                cid.value = "Z00"; // TODO: VERIFICAR NECESSIDADE DE FOCAR EM OUTRO ELEMENTO APÓS ISSO - PODE SER QUE BUG AO DIGITAR 
            }, 200);
        }

        // Encontra o campo com a descricao do cid
        const campoNomeCid = document.getElementById("select2-chosen-9");
        // Verifica se o campo existe e se o innerText é diferente de "CID 10"
        if (campoNomeCid && campoNomeCid.innerText !== "CID 10") {
            // Encontra o botão adicionar CID
            const botaoAddCid = document.getElementById("pec_atendimento_soap_avaliacao_add_fields_button");

            // Verifica se o botão existe
            if (botaoAddCid) {
                // Clica no botão
                botaoAddCid.click();
            } else {
                console.log('Botão adicionar CID não encontrado.');
            }
        } else {
            console.log('Campo descrição CID não encontrado ou innerText é "CID 10".');
        }
    }


    // Elementos da pagina finalizar atendimento
    const tipoAtendimento = document.getElementById("lookup_key_pec_atendimento_soap_esu_tipo_atendimento_id");
    const codigoProced = document.getElementById("lookup_key_pec_atendimento_soap_finalizacao_procedimento");
    const cbRetornoCCP = document.getElementById("pec_atendimento_soap_esu_conduta_ids_7");
    // Verifica se os elementos existem [se sim, a página atual é o finalizar atendimento]
    if (tipoAtendimento && codigoProced && cbRetornoCCP) {
        // Verifica se o valor de tipoAtendimento é diferente de "5"
        if (tipoAtendimento.value !== "5") {
            // Modifica para o código desejado
            setTimeout(() => {
                tipoAtendimento.focus();
                tipoAtendimento.value = "5"; // TODO: VERIFICAR NECESSIDADE DE FOCAR EM OUTRO ELEMENTO APÓS ISSO - PODE SER QUE BUG AO DIGITAR 
            }, 200);
        }

        // Marca o checkbox de retorno para cuidado continuado / programado
        if (!cbRetornoCCP.checked){
            cbRetornoCCP.checked = true;
        }

        // Verifica se ja tem algum procedimento inserido
        // Seleciona a tabela de procedimentos pelo id //*[@id="pec_atendimento_soap_procedimentos_finalizacao_table"]
        const tabelaProc = document.getElementById('pec_atendimento_soap_procedimentos_finalizacao_table');
        // Seleciona todos os elementos <tr> dentro da tabela
        const elementosTrProc = tabelaProc.querySelectorAll('tr');

        // Verifica se não tem nenhum procedimento já inserido, se não tiver, digita 0301010064
        if (elementosTrProc.length == 1 && codigoProced.value !== "0301010064") {
            setTimeout(() => {
                codigoProced.focus();
                codigoProced.value = "0301010064"; // TODO: VERIFICAR NECESSIDADE DE FOCAR EM OUTRO ELEMENTO APÓS ISSO - PODE SER QUE BUG AO DIGITAR 
            }, 200);
        }

        // Encontra o campo com a descricao do procedimento
        const descProcedimento = document.getElementById("select2-chosen-23");
        // Verifica se o campo existe e se o innerText é diferente de "CONSULTA MEDICA EM ATENÇÃO PRIMÁRIA"
        if (descProcedimento && descProcedimento.innerText !== "CONSULTA MEDICA EM ATENÇÃO PRIMÁRIA") {
            // Encontra o botão adicionar Procedimento //*[@id="pec_atendimento_soap_procedimentos_finalizacao_button"]
            const botaoAddProced = document.getElementById("pec_atendimento_soap_procedimentos_finalizacao_button");

            // Verifica se o botão existe
            if (botaoAddProced) {
                // Clica no botão
                botaoAddProced.click();
            } else {
                console.log('Botão adicionar Procedimento não encontrado.');
            }
        } else {
            console.log('Campo descrição Procedimento não encontrado ou innerText é "CONSULTA MEDICA EM ATENÇÃO PRIMÁRIA".');
        }
    }
}

// Adiciona o evento de clique a todos os elementos
elementos.forEach((elemento) => {
    elemento.addEventListener('click', modificarElementos);
    elemento.addEventListener('focus', modificarElementos);
});