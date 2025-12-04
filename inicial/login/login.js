// Função de login
function fazer_login() {

    // Recebe o dado digitado no campo usuário
    let usuario = document.getElementById("usuarioInput").value;

    // Recebe o dado digitado no campo senha
    let senha = document.getElementById("senhaInput").value;

    // Busca o cadastro salvo no localStorage
    let pegar = localStorage.getItem("cadastro");

    // Verifica se o cadastro existe ou não
    if (pegar == null) {
        alert("Usuário não encontrado.");
        return; // Para a função se o cadastro não existir 
    }

    // Converte o texto para objeto
    let dados = JSON.parse(pegar);

    // Compara os dados digitados com os que foram salvos no localStorage
    if (usuario == dados.usuario && senha == dados.senha) {

        // Se os dados estiverem corretos me envia para o dashboard
        window.location.href = "../../ulterior/dashboard/dashboard.html";

    } else {
        // Caso houver erros exibe uma mensagem
        alert("Usuário ou senha incorretos.");
    }
}
