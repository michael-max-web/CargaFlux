function atualizar_dashboard() {
    let lista = localStorage.getItem("cargas");

    if (!lista) return;

    let arr = JSON.parse(lista);

    document.getElementById("totalDia").innerText = arr.length;

    let pendentes = arr.filter(x => x.status == "pendente").length;
    let finalizadas = arr.filter(x => x.status == "finalizada").length;

    document.getElementById("totalPendentes").innerText = pendentes;
    document.getElementById("totalFinalizadas").innerText = finalizadas;

    if (arr.length > 0) {
        document.getElementById("ultimaCarga").innerText = arr[arr.length - 1].nome;
    }
}

function ir_agendar() {
    window.location.href = "../agendamento/agendamento.html";
}

function ir_controle() {
    window.location.href = "../controle/controle.html";
}

atualizar_dashboard();