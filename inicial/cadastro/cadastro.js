    // Função de cadastro
function salvar_cadastro() {
    // Recebe o dado digitado no campo usuário
    let usuario = document.getElementById("usuarioCadastro").value;

    // Recebe o dado digitado no campo senha
    let senha = document.getElementById("senhaCadastro").value;

    // Busca no localStorage a lista de cadastros e se não tiver nenhum, ela cria um vetor vazio
    let arr = JSON.parse(localStorage.getItem("cadastros")) || [];

    // Cria um objeto com os dados capturados
    let dados = {
        usuario: usuario,
        senha: senha
    };

    // Verifica se o usuário já existe
    let duplicado = arr.some(item =>
        item.usuario === usuario
    );

    // Mostra uma mensagem e interrompe a função
    if (duplicado) {
        alert("Esse usuário já existe!");
        return;
    }

    // Inclui o novo usuário no array 
    arr.push(dados);

    // Salva o array atualizado no localStorage
    localStorage.setItem("cadastros", JSON.stringify(arr));

    // Mostra uma mensagem de validação
    alert("Cadastro realizado!");

    // Me redireciona para a página de login
    window.location.href = "../login/index.html";
}