function carregar_cargas() {
    let lista = localStorage.getItem("cargas");

    if (lista == null) {
        return;
    }

    let arr = JSON.parse(lista);

    let tabela = document.getElementById("tabelaCargas");

    for (let i = 0; i < arr.length; i++) {
        let linha = `
            <tr>
                <td>${arr[i].dt}</td>
                <td>${arr[i].nome}</td>
                <td>${arr[i].tipo}</td>
                <td>${arr[i].peso}</td>
                <td>${arr[i].valor}</td>
                <td>${arr[i].data}</td>
                <td>${arr[i].hora}</td>
            </tr>
        `;

        tabela.innerHTML += linha;
    }
}

carregar_cargas();

