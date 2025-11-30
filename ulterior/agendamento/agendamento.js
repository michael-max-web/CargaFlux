function salvar_agendamento() {
    let dt = document.getElementById("dt").value;
    let tipo = document.getElementById("tipo").value;
    let nome = document.getElementById("nomeMotorista").value;
    let placa = document.getElementById("placa").value;
    let peso = document.getElementById("peso").value;
    let valor = document.getElementById("valor").value;
    let data = document.getElementById("dataCarga").value;
    let hora = document.getElementById("horaCarga").value;

    let lista = localStorage.getItem("cargas");
    let arr = [];

    if (lista != null) {
        arr = JSON.parse(lista);
    }

    arr.push({
        dt: dt,
        tipo: tipo,
        nome: nome,
        placa: placa,
        peso: peso,
        valor: valor,
        data: data,
        hora: hora,
        status: "agendado" // já salva com status padrão
    });

    localStorage.setItem("cargas", JSON.stringify(arr));

    alert("Carga agendada!");
}