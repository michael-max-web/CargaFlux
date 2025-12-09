// Função responsável por receber todas as cargas salvas no localStorage e mostrar dentro da tabela da página
function carregar_cargas() {

    // Busca a lista de cargas no localStorage
    let lista = localStorage.getItem("cargas");

    // Se não existir nada para a função
    if (lista == null) {
        return;
    }

    // Converte a lista de textos para array ou objeto
    let arr = JSON.parse(lista);

    // Encontra a tabela onde as linhas serão icluidas
    let tabela = document.getElementById("tabelaCargas");

    // Passa por todas as cargas cadastradas
    for (let i = 0; i < arr.length; i++) {

        // Faz com que cada carga tenha um status padrão
        if (arr[i].status === undefined || arr[i].status === "") {
            arr[i].status = "agendado";
        }

        // Faz com que a coluna Liberação tmb tenha status padrão
        if (arr[i].liberacao === undefined || arr[i].liberacao === "") {
            arr[i].liberacao = "aguardando";
        }

        // Monta uma linha na tabela com os dados da carga usando tags
        let linha = `
            <tr>
                <td>${arr[i].dt}</td>
                <td>${arr[i].tipo}</td>
                <td>${arr[i].veiculo}</td>
                <td>${arr[i].cliente}</td>
                <td>${arr[i].nome}</td>
                <td>${arr[i].placa}</td>
                <td>${arr[i].peso}</td>
                <td>${arr[i].data}</td>
                <td>${arr[i].hora}</td>

                <td>
                    <select onchange="atualizarStatus(${i}, this.value)">
                        <option value="agendado"   ${arr[i].status == "agendado" ? "selected" : ""}>Agendado</option>
                        <option value="pátio"      ${arr[i].status == "pátio" ? "selected" : ""}>Pátio</option>
                        <option value="doca 1"     ${arr[i].status == "doca 1" ? "selected" : ""}>Doca 1</option>
                        <option value="doca 2"     ${arr[i].status == "doca 2" ? "selected" : ""}>Doca 2</option>
                        <option value="doca 3"     ${arr[i].status == "doca 3" ? "selected" : ""}>Doca 3</option>
                        <option value="doca 4"     ${arr[i].status == "doca 4" ? "selected" : ""}>Doca 4</option>
                        <option value="finalizado" ${arr[i].status == "finalizado" ? "selected" : ""}>Finalizado</option>
                    </select>
                </td>

                <td>
                    <select onchange="atualizarLiberacao(${i}, this.value)">
                        <option value="emOperação" ${arr[i].liberacao == "emOperação" ? "selected" : ""}>Em Operação</option>
                        <option value="aguardando" ${arr[i].liberacao == "aguardando" ? "selected" : ""}>Aguardando</option>
                        <option value="liberado"   ${arr[i].liberacao == "liberado" ? "selected" : ""}>Liberado</option>
                    </select>
                </td>

                <td>
                    <button onclick="excluirCarga(${i})">Excluir</button>
                </td>
            </tr>
        `;

        // Crias novas linhas na tabela
        tabela.innerHTML += linha;
    }

    // Salva de volta no localStorage (caso algum dado padrão tenha sido ajustado)
    localStorage.setItem("cargas", JSON.stringify(arr));
}

// Chama a função de forma automatica quando abro a página
carregar_cargas();

// Função que atualiza o status de cada carga pelo índice e o novo status escolhido
function atualizarStatus(indice, novoStatus) {
    let lista = JSON.parse(localStorage.getItem("cargas"));
    lista[indice].status = novoStatus;
    localStorage.setItem("cargas", JSON.stringify(lista));

    alert("Status atualizado!");
}

// Função que atualiza o status de liberação e mostra uma mensagem específica caso o motorista seja liberado
function atualizarLiberacao(indice, novoValor) {
    let lista = JSON.parse(localStorage.getItem("cargas"));
    lista[indice].liberacao = novoValor;
    localStorage.setItem("cargas", JSON.stringify(lista));

    if (novoValor === "liberado") {
        alert("Motorista liberado!");
    } else {
        alert("Status de liberação atualizado!");
    }
}

// Função para excluir carga com mensagem de validação
function excluirCarga(indice) {

    // Variável para confirmar a ação co mensagem de validação
    let confirmar = confirm("Tem certeza que deseja excluir esta carga? Essa ação não poderá ser desfeita!");

    if (confirmar === true) {

        // Pega a lista e remove o item pelo indice e depois salva novamente
        let lista = JSON.parse(localStorage.getItem("cargas"));
        lista.splice(indice, 1);
        localStorage.setItem("cargas", JSON.stringify(lista));

        alert("Carga excluída com sucesso!");

        // Recarrega a página para atualizar a tabela
        location.reload();

    } else {
        alert("Exclusão cancelada!");
    }
}
