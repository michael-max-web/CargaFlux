function redefinir() {

    let usuarioInformado = document.getElementById("userRecuperar").value;
    let novaSenha = document.getElementById("novaSenha").value;

    let pegar = localStorage.getItem("cadastro");

    if (pegar == null) {
        alert("Nenhum usuário cadastrado!");
        return;
    }

    let dados = JSON.parse(pegar);

    // Verifica se o usuário existe
    if (usuarioInformado !== dados.usuario) {
        alert("Usuário não encontrado!");
        return;
    }

    // Atualiza a senha
    dados.senha = novaSenha;

    // Salva de volta no localStorage
    localStorage.setItem("cadastro", JSON.stringify(dados));

    alert("Senha redefinida com sucesso!");
    window.location.href = "http://127.0.0.1:5501/inicial/login/index.html";
}