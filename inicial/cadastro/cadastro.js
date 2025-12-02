function salvar_cadastro() {
    let usuario = document.getElementById("usuarioCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;

    let dados = {
        usuario: usuario,
        senha: senha
    };

    localStorage.setItem("cadastro", JSON.stringify(dados));
    alert("Cadastro realizado!");
    window.location.href = "../login/index.html";
}