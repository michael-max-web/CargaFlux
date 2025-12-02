function ir_agendar() {
    window.location.href = "../agendamento/agendamento.html";
}

function ir_controle() {
    window.location.href = "../controle/controle.html";
    
}function carregar_dashboard() {

    let div = document.getElementById("dashboardInfo");
    div.innerHTML = "";

    let filtroData = document.getElementById("filtroData").value;

    // ❗ Se não tiver data digitada: não mostra nada
    if (!filtroData) {
        return; 
    }

    let lista = localStorage.getItem("cargas");

    if (!lista) {
        div.innerHTML = "<p>Nenhuma carga cadastrada.</p>";
        return;
    }

    let arr = JSON.parse(lista);

    // Filtra pela data exata
    arr = arr.filter(c => c.data === filtroData);

    if (arr.length === 0) {
        div.innerHTML = "<p>Nenhuma carga encontrada para esta data.</p>";
        return;
    }

    let clientes = {};

    for (let i = 0; i < arr.length; i++) {

        let c = arr[i].cliente || "Sem Cliente";
        let liberacao = arr[i].liberacao || "aguardando";

        if (!clientes[c]) {
            clientes[c] = {
                liberados: [],
                aguardando: []
            };
        }

        if (liberacao.toLowerCase() === "liberado") {
            clientes[c].liberados.push(arr[i]);
        } else {
            clientes[c].aguardando.push(arr[i]);
        }
    }

    // Criar blocos
    for (let cliente in clientes) {

        let bloco = document.createElement("div");
        bloco.classList.add("blocoDashboard");

        bloco.innerHTML = `
            <h3>Cliente: ${cliente}</h3>

            <p><strong>Liberadas:</strong> ${clientes[cliente].liberados.length}</p>
            <ul>
                ${clientes[cliente].liberados.map(c => `<li>DT: ${c.dt}</li>`).join("") || "<li>Nenhuma</li>"}
            </ul>

            <p><strong>Pendente:</strong> ${clientes[cliente].aguardando.length}</p>
            <ul>
                ${clientes[cliente].aguardando.map(c => `<li>DT: ${c.dt}</li>`).join("") || "<li>Nenhuma</li>"}
            </ul>
        `;

        div.appendChild(bloco);
    }
}