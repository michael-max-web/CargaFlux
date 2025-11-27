function carregar_cargas() {
    let lista = localStorage.getItem("cargas");

    if (!lista) return;

    let arr = JSON.parse(lista);
    let tabela = document.getElementById("tabelaCargas");

    for (let i = 0; i < arr.length; i++) {
        let linha = `
            <tr>
                <td>${arr[i].nome}</td>
                <td>${arr[i].motorista}</td>
                <td>${arr[i].placa}</td>
                <td>${arr[i].tipo}</td>
                <td>${arr[i].peso}</td>
                <td>${arr[i].origem}</td>
                <td>${arr[i].destino}</td>
                <td>${arr[i].data}</td>
                <td>${arr[i].hora}</td>
                <td>${arr[i].status}</td>
            </tr>
        `;
        tabela.innerHTML += linha;
    }
}

carregar_cargas();