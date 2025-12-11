// A função principal agora aceita uma lista de cargas (filtrada ou completa).
function renderizar_tabela(listaCargasParaExibir = null) {

    // Busca a lista de cargas no localStorage
    let listaJSON = localStorage.getItem("cargas");

    // Encontra a tabela
    let tabela = document.getElementById("tabelaCargas");

    // Encontra o corpo da tabela onde as linhas serão incluídas
    let tabelaBody = tabela.getElementsByTagName('tbody')[0];
    
    // Se o tbody não existir, cria um e anexa à tabela
    if (!tabelaBody) {
        tabelaBody = tabela.createTBody();
    }
    
    // Limpa o conteúdo ATUAL do corpo da tabela
    tabelaBody.innerHTML = '';
    
    // Se não existir nada ou a lista estiver vazia no localStorage
    if (listaJSON == null || listaJSON === "[]") {
        tabelaBody.innerHTML = '<tr><td colspan="12">Nenhuma carga cadastrada.</td></tr>';
        return;
    }

    // Converte a lista de textos para array ou objeto
    let arr = JSON.parse(listaJSON);

    // Usa a lista filtrada (se passada) ou a lista completa
    let cargas = listaCargasParaExibir || arr;

    // Se a lista filtrada estiver vazia
    if (cargas.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="12">Nenhuma carga encontrada para esta data.</td></tr>';
        return;
    }

    // Passa por todas as cargas a serem exibidas
    for (let i = 0; i < cargas.length; i++) {

        // Encontra o índice original da carga no array completo 'arr' do localStorage
        // Isso é CRUCIAL para que as funções de ação (excluir, atualizar) funcionem corretamente
        // mesmo quando a lista está filtrada.
        let indiceOriginal = arr.findIndex(item => 
            item.dt === cargas[i].dt && 
            item.placa === cargas[i].placa && 
            item.data === cargas[i].data 
        );

        if (indiceOriginal === -1) continue; // Pula se não encontrar (segurança)

        // Faz com que cada carga tenha um status padrão
        if (cargas[i].status === undefined || cargas[i].status === "") {
            cargas[i].status = "agendado";
        }

        // Faz com que a coluna Liberação tmb tenha status padrão
        if (cargas[i].liberacao === undefined || cargas[i].liberacao === "") {
            cargas[i].liberacao = "aguardando";
        }

        // Monta uma linha na tabela com os dados da carga usando tags
        // O índice usado no 'onclick' agora é o indiceOriginal
        let linha = `
            <tr>
                <td>${cargas[i].dt}</td>
                <td>${cargas[i].tipo}</td>
                <td>${cargas[i].veiculo}</td>
                <td>${cargas[i].cliente}</td>
                <td>${cargas[i].nome}</td>
                <td>${cargas[i].placa}</td>
                <td>${cargas[i].peso}</td>
                <td>${cargas[i].data}</td>
                <td>${cargas[i].hora}</td>

                <td>
                    <select onchange="atualizarStatus(${indiceOriginal}, this.value)">
                        <option value="agendado"   ${cargas[i].status == "agendado" ? "selected" : ""}>Agendado</option>
                        <option value="pátio"      ${cargas[i].status == "pátio" ? "selected" : ""}>Pátio</option>
                        <option value="doca 1"     ${cargas[i].status == "doca 1" ? "selected" : ""}>Doca 1</option>
                        <option value="doca 2"     ${cargas[i].status == "doca 2" ? "selected" : ""}>Doca 2</option>
                        <option value="doca 3"     ${cargas[i].status == "doca 3" ? "selected" : ""}>Doca 3</option>
                        <option value="doca 4"     ${cargas[i].status == "doca 4" ? "selected" : ""}>Doca 4</option>
                        <option value="finalizado" ${cargas[i].status == "finalizado" ? "selected" : ""}>Finalizado</option>
                    </select>
                </td>

                <td>
                    <select onchange="atualizarLiberacao(${indiceOriginal}, this.value)">
                        <option value="emOperação" ${cargas[i].liberacao == "emOperação" ? "selected" : ""}>Em Operação</option>
                        <option value="aguardando" ${cargas[i].liberacao == "aguardando" ? "selected" : ""}>Aguardando</option>
                        <option value="liberado"   ${cargas[i].liberacao == "liberado" ? "selected" : ""}>Liberado</option>
                    </select>
                </td>

                <td>
                    <button onclick="excluirCarga(${indiceOriginal})">Excluir</button>
                </td>
            </tr>
        `;

        // Crias novas linhas no corpo da tabela
        tabelaBody.innerHTML += linha;
    }

    // Salva de volta no localStorage (caso algum dado padrão tenha sido ajustado)
    localStorage.setItem("cargas", JSON.stringify(arr));
}


// --- NOVAS FUNÇÕES DE FILTRO ---

// Função responsável por filtrar as cargas pela data selecionada
function filtrarCargas() {
    // Pega o valor do input de data
    let dataFiltro = document.getElementById("dataFiltro").value;

    if (!dataFiltro) {
        alert("Por favor, selecione uma data para filtrar.");
        return;
    }

    let listaJSON = localStorage.getItem("cargas");
    if (listaJSON == null || listaJSON === "[]") return;

    let listaCompleta = JSON.parse(listaJSON);

    // Filtra o array
    let listaFiltrada = listaCompleta.filter(carga => carga.data === dataFiltro);

    // Chama a função de renderização, passando a lista filtrada
    renderizar_tabela(listaFiltrada);

    alert(`Tabela filtrada para a data: ${dataFiltro}`);
}

// Função para limpar o filtro e recarregar todas as cargas
function limparFiltro() {
    // Limpa o valor do input de data
    document.getElementById("dataFiltro").value = "";
    
    // Chama a função de renderização sem nenhum parâmetro para carregar tudo
    renderizar_tabela(); 

    alert("Filtro removido. Mostrando todas as cargas.");
}

// --- FUNÇÕES DE AÇÃO (USAM O renderizar_tabela) ---

// Função que atualiza o status de cada carga pelo índice e o novo status escolhido
function atualizarStatus(indice, novoStatus) {
    let lista = JSON.parse(localStorage.getItem("cargas"));
    lista[indice].status = novoStatus;
    localStorage.setItem("cargas", JSON.stringify(lista));

    alert("Status atualizado!");
    // Não é necessário renderizar a tabela novamente se o status for a única coisa alterada.
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

// Chama a função de forma automática quando abro a página
renderizar_tabela();