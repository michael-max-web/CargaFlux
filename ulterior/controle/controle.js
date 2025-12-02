function carregar_cargas() {
    let lista = localStorage.getItem("cargas");

    if (lista == null) {
        return;
    }

    let arr = JSON.parse(lista);

    let tabela = document.getElementById("tabelaCargas");

    for (let i = 0; i < arr.length; i++) {

        if (arr[i].status === undefined || arr[i].status === "") {
            arr[i].status = "agendado";
        }

        if (arr[i].liberacao === undefined || arr[i].liberacao === "") {
            arr[i].liberacao = "aguardando";
        }

        let linha = `
            <tr>
                <td>${arr[i].dt}</td>
                <td>${arr[i].cliente}</td>
                <td>${arr[i].tipo}</td>
                <td>${arr[i].nome}</td>
                <td>${arr[i].placa}</td>
                <td>${arr[i].peso}</td>
                <td>${arr[i].valor}</td>
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

        tabela.innerHTML += linha;
    }

    localStorage.setItem("cargas", JSON.stringify(arr));
}

carregar_cargas();

function atualizarStatus(indice, novoStatus) {
    let lista = JSON.parse(localStorage.getItem("cargas"));
    lista[indice].status = novoStatus;
    localStorage.setItem("cargas", JSON.stringify(lista));

    alert("Status Atualizado");
}

function atualizarLiberacao(indice, novoValor) {
    let lista = JSON.parse(localStorage.getItem("cargas"));
    lista[indice].liberacao = novoValor;
    localStorage.setItem("cargas", JSON.stringify(lista));

    if (novoValor === "liberado") {
        alert("Motorista Liberado");
    } else {
        alert("Status de liberação atualizado");
    }
}

function excluirCarga(indice) {
    let lista = JSON.parse(localStorage.getItem("cargas"));

    lista.splice(indice, 1);

    localStorage.setItem("cargas", JSON.stringify(lista));

    alert("Carga excluída com sucesso!");

    location.reload();
}