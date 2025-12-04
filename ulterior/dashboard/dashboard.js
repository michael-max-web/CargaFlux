// Função que me envia para a tela de agendamento
function ir_agendar() {
    window.location.href = "../agendamento/agendamento.html";
}

// Função que me envia para a tela de controle
function ir_controle() {
    window.location.href = "../controle/controle.html";
}

// Essa função executa automaticamente quando a página carrega restaurando o filtro de data salvo anteriormente e carregando o dashboard.
window.onload = function () {
    const dataSalva = localStorage.getItem("dataSelecionadaDashboard");

    if (dataSalva) {
        document.getElementById("filtroData").value = dataSalva;
        carregar_dashboard(); // Recarrega automaticamente com o filtro salvo
    }
};

// Sempre que a data do filtro for alterada ela será salva no localStorage para permanecer quando a página for recarregada
document.getElementById("filtroData").addEventListener("change", function () {
    localStorage.setItem("dataSelecionadaDashboard", this.value);
});

// Função principal que gera o meu dashboard filtrando cargas por data e dt e organizando por cliente em blocos exibindo quantas cargas foram liberadas e quantas estão pendentes
function carregar_dashboard() {

    // Parte onde o dashboard é exibido na página
    const div = document.getElementById("dashboardInfo");
    div.innerHTML = "";

    // Recebe os filtros digitados
    const filtroData = document.getElementById("filtroData").value;
    const filtroDT = document.getElementById("filtroDT").value;

    // Mensagem de validação para pesquisa com identificador chave
    if (filtroDT.trim() !== "") {
        const confirmar = confirm(`Deseja filtrar somente a DT ${filtroDT}?`);
        if (confirmar) {
            // limpa a data caso o filtro seja apenas pela DT
            document.getElementById("filtroData").value = "";
        }
    }

    // Se nenhum filtro for preenchido mostra uma mensagem
    if (!filtroData && filtroDT.trim() === "") {
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.textAlign = "center";
        div.innerHTML = "<p>Digite uma data para visualizar o dashboard.</p>";
        return;
    }

    // Busca todas as cargas e se não houver mostra uma mensagem
    const lista = localStorage.getItem("cargas");

    if (!lista) {
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.textAlign = "center";
        div.innerHTML = "<p>Nenhuma carga cadastrada.</p>";
        return;
    }

    // Converte o texto para array
    let arr = JSON.parse(lista);

    // filtra por data 
    if (filtroData.trim() !== "") {
        arr = arr.filter(c => c.data === filtroData);
    }

    // filtra por dt
    if (filtroDT.trim() !== "") {
        arr = arr.filter(c => c.dt.toLowerCase().includes(filtroDT.toLowerCase()));
    }

    // Se não encontrou nada após o filtro mostra uma mensagem de resposta da listagem
    if (arr.length === 0) {
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.textAlign = "center";
        div.innerHTML = "<p>Nenhuma carga encontrada com essa DT!</p>";
        return;
    }

    // Objeto onde cada cliente vai receber suas cargas separadas
    const clientes = {};

    // Agrupa os registros por cliente e tmb por liberados e aguardando
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

    // Cria blocos para cada cliente no meu dashboard
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

// Função para excluir o meu cadastro
function excluirUsuario(usuarioAlvo) {
    const confirmar = confirm("Tem certeza que deseja excluir este usuário? Essa ação não poderá ser desfeita!");
    if (!confirmar) return;

    const lista = localStorage.getItem("cadastros");
    if (!lista) {
        alert("Nenhum usuário cadastrado.");
        return;
    }

    let usuarios = JSON.parse(lista);

    // Exclui o usuário cujo o nome corresponde ao identificador
    usuarios = usuarios.filter(u => u.usuario !== usuarioAlvo);

    // Salva novamente no localStorage
    localStorage.setItem("cadastros", JSON.stringify(usuarios));

    alert("Usuário excluído com sucesso.");

    // Redireciona para o cadastro
    window.location.href = "http://127.0.0.1:5501/inicial/cadastro/cadastro.html";
}