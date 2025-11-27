function fazer_login() {
    let usuario = document.getElementById("usuarioInput").value;
    let senha = document.getElementById("senhaInput").value;

    let pegar = localStorage.getItem("cadastro");

    if (pegar == null) {
        alert("Nenhum cadastro encontrado.");
        return;
    }

    let dados = JSON.parse(pegar);

    if (usuario == dados.usuario && senha == dados.senha) {
        window.location.href = "../../ulterior/dashboard/dashboard.html";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}