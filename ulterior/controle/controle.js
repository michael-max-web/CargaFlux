// Os status disponíveis
const STATUS_OPCOES = ["agendado", "pátio", "doca", "finalizado"];

function salvar_cargas(arr) {
    localStorage.setItem("cargas", JSON.stringify(arr));
}

function atualizar_status(selectElement) {
    // Pega o novo valor do status
    const novoStatus = selectElement.value;
    
    // Pega o índice do item na lista (o data-index do <tr> pai)
    const linha = selectElement.closest('tr');
    const index = linha.getAttribute('data-index');

    if (index === null) {
        console.error("Índice da carga não encontrado.");
        return;
    }

    let lista = localStorage.getItem("cargas");
    if (lista == null) {
        return;
    }

    let arr = JSON.parse(lista);

    // Atualiza o status do item no array
    if (arr[index]) {
        arr[index].status = novoStatus;
        salvar_cargas(arr); // Salva o array atualizado no localStorage
        console.log(`Status da carga ${index} atualizado para: ${novoStatus}`);
    } else {
        console.error(`Carga com índice ${index} não encontrada no array.`);
    }
}


function carregar_cargas() {
    let lista = localStorage.getItem("cargas");

    if (lista == null) {
        return;
    }

    let arr = JSON.parse(lista);

    let tabela = document.getElementById("tabelaCargas");

    // Limpa a tabela antes de carregar (mantendo o cabeçalho)
    // Isso é útil para evitar duplicatas se a função for chamada novamente
    while(tabela.rows.length > 1) {
      tabela.deleteRow(1);
    }
    
    for (let i = 0; i < arr.length; i++) {
        // Inicializa o status se ele não existir na carga. O valor inicial será "agendado".
        if (!arr[i].status) {
            arr[i].status = STATUS_OPCOES[0];
        }

        // Gera as opções do <select> e marca o status atual como 'selected'
        let statusOptions = '';
        STATUS_OPCOES.forEach(status => {
            const isSelected = arr[i].status === status ? 'selected' : '';
            statusOptions += `<option value="${status}" ${isSelected}>${status.charAt(0).toUpperCase() + status.slice(1)}</option>`;
        });

        let linha = `
            <tr data-index="${i}"> 
                <td>${arr[i].dt}</td>
                <td>${arr[i].tipo}</td>
                <td>${arr[i].nome}</td>
                <td>${arr[i].placa}</td>
                <td>${arr[i].peso}</td>
                <td>${arr[i].valor}</td>
                <td>${arr[i].data}</td>
                <td>${arr[i].hora}</td>
                <td>
                    <select onchange="atualizar_status(this)">
                        ${statusOptions}
                    </select>
                </td>
            </tr>
        `;

        tabela.innerHTML += linha;
    }
    
    // Se o status foi inicializado para alguma carga que não tinha, salvamos a lista atualizada
    salvar_cargas(arr);
}

carregar_cargas();