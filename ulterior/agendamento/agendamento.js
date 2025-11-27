function salvar_agendamento() {
    let lista = localStorage.getItem("cargas");
    let arr = lista ? JSON.parse(lista) : [];

    let carga = {
        nome: document.getElementById("nomeCarga").value,
        motorista: document.getElementById("motorista").value,
        placa: document.getElementById("placa").value,
        tipo: document.getElementById("tipoCarga").value,
        peso: document.getElementById("peso").value,
        origem: document.getElementById("origem").value,
        destino: document.getElementById("destino").value,
        data: document.getElementById("dataCarga").value,
        hora: document.getElementById("horaCarga").value,
        observacao: document.getElementById("observacao").value,
        status: "pendente"
    };

    arr.push(carga);

    localStorage.setItem("cargas", JSON.stringify(arr));

    alert("Carga salva!");
}