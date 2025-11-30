function carregar_cargas() {
    let lista = localStorage.getItem("cargas");

    if (lista == null) {
        return;
    }

    let arr = JSON.parse(lista);

    let tabela = document.getElementById("tabelaCargas");

    for (let i = 0; i < arr.length; i++) {

        // Se não existir status, define padrão
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
                        <option ${arr[i].status == "agendado" ? "selected" : ""}>agendado</option>
                        <option ${arr[i].status == "pátio" ? "selected" : ""}>pátio</option>
                        <option ${arr[i].status == "doca 1" ? "selected" : ""}>doca 1</option>
                        <option ${arr[i].status == "doca 2" ? "selected" : ""}>doca 2</option>
                        <option ${arr[i].status == "doca 3" ? "selected" : ""}>doca 3</option>
                        <option ${arr[i].status == "doca 4" ? "selected" : ""}>doca 4</option>
                        <option ${arr[i].status == "finalizado" ? "selected" : ""}>finalizado</option>
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

// Excluir carga
function excluirCarga(indice) {
    let lista = JSON.parse(localStorage.getItem("cargas"));

    lista.splice(indice, 1); // Remove a carga da posição 'indice'

    localStorage.setItem("cargas", JSON.stringify(lista));

    location.reload(); // Atualiza a página para reconstruir a tabela
}