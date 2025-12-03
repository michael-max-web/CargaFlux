function carregar_dashboard() {

    const div = document.getElementById("dashboardInfo");
    div.innerHTML = "";

    const filtroData = document.getElementById("filtroData").value;
    const filtroDT = document.getElementById("filtroDT").value; 

    if (!filtroData) {
        div.innerHTML = "<p>Digite uma data para visualizar o dashboard.</p>";
        return;
    }

    const lista = localStorage.getItem("cargas");

    if (!lista) {
        div.innerHTML = "<p>Nenhuma carga cadastrada.</p>";
        return;
    }

    let arr = JSON.parse(lista);

    // 🔹 PRIMEIRA VALIDAÇÃO → DATA QUE NÃO TEM NENHUM AGENDAMENTO
    const existeData = arr.some(c => c.data === filtroData);
    if (!existeData) {
        div.innerHTML = "<p>Não existe cargas para essa data!</p>";
        return;
    }

    // 🔹 FILTRA PELA DATA
    arr = arr.filter(c => c.data === filtroData);

    // 🔹 SEGUNDA VALIDAÇÃO → DT QUE NÃO EXISTE
    if (filtroDT && filtroDT.trim() !== "") {
        const existeDT = arr.some(c => c.dt.toLowerCase() === filtroDT.toLowerCase());

        if (!existeDT) {
            div.innerHTML = "<p>A DT digitada não existe!</p>";
            return;
        }

        arr = arr.filter(c => c.dt.toLowerCase().includes(filtroDT.toLowerCase()));
    }

    if (arr.length === 0) {
        div.innerHTML = "<p>Nenhuma carga encontrada para essa busca.</p>";
        return;
    }

    // 🔹 AGRUPAMENTO POR CLIENTE
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