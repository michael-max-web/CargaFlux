function carregar_cargas() {
    let lista = localStorage.getItem("cargas");

    if (lista == null) {
        return;
    }

    let arr = JSON.parse(lista);

    let tabela = document.getElementById("tabelaCargas");

    for (let i = 0; i < arr.length; i++) {

        if (!arr[i].status) {
            arr[i].status = "agendado";
        }

        let linha = `
            <tr>
                <td>${arr[i].dt}</td>
                <td>${arr[i].tipo}</td>
                <td>${arr[i].nome}</td>
                <td>${arr[i].placa}</td>
                <td>${arr[i].peso}</td>
                <td>${arr[i].valor}</td>
                <td>${arr[i].data}</td>
                <td>${arr[i].hora}</td>

                <td>
                    <select onchange="atualizarStatus(${i}, this.value)">
                        <option ${arr[i].status == "agendado" ? "selected" : ""}>Agendado</option>
                        <option ${arr[i].status == "pátio" ? "selected" : ""}>Pátio</option>
                        <option ${arr[i].status == "doca 1" ? "selected" : ""}>Doca 1</option>
                        <option ${arr[i].status == "doca 2" ? "selected" : ""}>Doca 2</option>
                        <option ${arr[i].status == "doca 3" ? "selected" : ""}>Doca 3</option>
                        <option ${arr[i].status == "doca 4" ? "selected" : ""}>Doca 4</option>
                        <option ${arr[i].status == "finalizado" ? "selected" : ""}>Finalizado</option>
                    </select>
                </td>

                <td>
                     <select onchange="atualizarLiberacao(${i}, this.value)">
                        <option ${arr[i].liberacao == "aguardando" ? "selected" : ""}>Aguardando</option>
                        <option ${arr[i].liberacao == "liberado" ? "selected" : ""}>Liberado</option>
                    </select>
                </td>

                <td>
                    <button onclick="excluirCarga(${i})">Excluir</button>
                </td>
            </tr>
        `;

        tabela.innerHTML += linha;
    }

    // Atualiza para garantir o campo 'status'
    localStorage.setItem("cargas", JSON.stringify(arr));
}

carregar_cargas();

// Atualiza status da carga no localStorage
function atualizarStatus(indice, novoStatus) {
    let lista = JSON.parse(localStorage.getItem("cargas"));
    lista[indice].status = novoStatus;
    localStorage.setItem("cargas", JSON.stringify(lista));
}

function atualizarLiberacao(indice, novoValor) {
    let lista = JSON.parse(localStorage.getItem("cargas"));
    lista[indice].liberacao = novoValor;
    localStorage.setItem("cargas", JSON.stringify(lista));
}

// Excluir carga
function excluirCarga(indice) {
    let lista = JSON.parse(localStorage.getItem("cargas"));

    lista.splice(indice, 1); // Remove a carga da posição 'indice'

    localStorage.setItem("cargas", JSON.stringify(lista));

    location.reload(); // Atualiza a página para reconstruir a tabela
}