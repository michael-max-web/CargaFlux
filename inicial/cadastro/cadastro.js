function salvar_cadastro() {
    let usuario = document.getElementById("usuarioCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;

    // Carrega cadastros existentes ou cria um array vazio
    let arr = JSON.parse(localStorage.getItem("cadastros")) || [];

    let dados = {
        usuario: usuario,
        senha: senha
    };

    // Verifica se já existe alguém com o mesmo usuário
    let duplicado = arr.some(item =>
        item.usuario === usuario
    );

    if (duplicado) {
        alert("Esse usuário já existe!");
        return;
    }

    // Adiciona novo cadastro ao array
    arr.push(dados);

    // Salva de volta
    localStorage.setItem("cadastros", JSON.stringify(arr));

    alert("Cadastro realizado!");
    window.location.href = "../login/index.html";
}
