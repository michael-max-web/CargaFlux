function ir_agendar() {
    window.location.href = "../agendamento/agendamento.html";
}

function ir_controle() {
    window.location.href = "../controle/controle.html";
}

window.onload = function () {
    const dataSalva = localStorage.getItem("dataSelecionadaDashboard");

    if (dataSalva) {
        document.getElementById("filtroData").value = dataSalva;
        carregar_dashboard();
    }
};

document.getElementById("filtroData").addEventListener("change", function () {
    localStorage.setItem("dataSelecionadaDashboard", this.value);
});

function carregar_dashboard() {

    const div = document.getElementById("dashboardInfo");
    div.innerHTML = "";

    const filtroData = document.getElementById("filtroData").value;
    const filtroDT = document.getElementById("filtroDT").value;

    // ⚠️ Alert quando o filtro DT estiver preenchido
    if (filtroDT.trim() !== "") {
        const confirmar = confirm(`Deseja filtrar somente a DT ${filtroDT}?`);
        if (confirmar) {
            // Limpa o filtro de data para mostrar só a DT
            document.getElementById("filtroData").value = "";
        }
    }

    // ➤ Se não tiver data e o usuário escolheu filtrar só pela DT
    if (!filtroData && filtroDT.trim() === "") {
        div.innerHTML = "<p>Digite uma data para visualizar o dashboard.</p>";
        return;
    }

    const lista = localStorage.getItem("cargas");

    if (!lista) {
        div.innerHTML = "<p>Nenhuma carga cadastrada.</p>";
        return;
    }

    let arr = JSON.parse(lista);

    // 🔹 FILTRA PELA DATA (somente se houver data)
    if (filtroData.trim() !== "") {
        arr = arr.filter(c => c.data === filtroData);
    }

    // 🔹 FILTRA POR DT (caso digitado)
    if (filtroDT.trim() !== "") {
        arr = arr.filter(c => c.dt.toLowerCase().includes(filtroDT.toLowerCase()));
    }

    if (arr.length === 0) {
        div.innerHTML = "<p>Nenhuma carga encontrada para essa busca.</p>";
        return;
    }

    const clientes = {};

    arr.forEach(c => {
        const cliente = c.cliente || "Sem Cliente";
        const liberacao = (c.liberacao || "aguardando").toLowerCase();

        if (!clientes[cliente]) {
            clientes[cliente] = { liberados: [], aguardando: [] };
        }

        if (liberacao === "liberado") {
            clientes[cliente].liberados.push(c);
        } else {
            clientes[cliente].aguardando.push(c);
        }
    });

    for (const cliente in clientes) {

        const bloco = document.createElement("div");
        bloco.classList.add("blocoDashboard");

        const dados = clientes[cliente];

        bloco.innerHTML = `
            <h3>Cliente: ${cliente}</h3>

            <p><strong>Liberadas:</strong> ${dados.liberados.length}</p>
            <ul>
                ${dados.liberados.length > 0 
                    ? dados.liberados.map(c => `<li>DT: ${c.dt}</li>`).join("")
                    : "<li>Nenhuma</li>"}
            </ul>

            <p><strong>Pendente:</strong> ${dados.aguardando.length}</p>
            <ul>
                ${dados.aguardando.length > 0
                    ? dados.aguardando.map(c => `<li>DT: ${c.dt}</li>`).join("")
                    : "<li>Nenhuma</li>"}
            </ul>
        `;

        div.appendChild(bloco);
    }
}
