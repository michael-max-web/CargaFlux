function salvar_agendamento() {
    let dt = document.getElementById("DT").value;
    let nome = document.getElementById("nomeMotorista").value;
    let tipo = document.getElementById("tipo").value;
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
        nome: nome,
        tipo: tipo,
        peso: peso,
        valor: valor,
        data: data,
        hora: hora
    });

    localStorage.setItem("cargas", JSON.stringify(arr));

    alert("Carga agendada!");
}