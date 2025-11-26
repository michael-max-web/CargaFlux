// inicial.html

let usuario, senha
function loginUsuario(){
    
usuario = document.getElementById("inputUsuario").value 
document.getElementById("inputUsuario").value = ''   

senha = document.getElementById("inputSenha").value 
document.getElementById("inputSenha").value = ''

document.getElementById('inputUsuario').focus()
}

let botaoCadastro = document.getElementById("cadastro");

botaoCadastro.onclick = function() {
    window.location.href = "cadastro.html";
}


function cadastrarUsuario() {
  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  // Se os dois campos estiverem preenchidos
  if (usuario !== "" && senha !== "") {

    // Salva no localStorage
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("senha", senha);

    // Redireciona
    window.location.href = "inicial.html";

  } else {
    alert("Preencha todos os campos!");
  }
}

function loginUsuario() {

    let usuarioDigitado = document.getElementById("inputUsuario").value;
    let senhaDigitada = document.getElementById("inputSenha").value;

    let usuarioSalvo = localStorage.getItem("inputUsuario");
    let senhaSalva = localStorage.getItem("inputSenha");

    if (usuarioDigitado === usuarioSalvo && senhaDigitada === senhaSalva) {
        window.location.href = "controle.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

  alert('Cadastro realizado com sucesso!');
  
  // Redireciona para a tela de login
  window.location.href = 'inicial.html';


// Dashboard simples (versão com o que o Ka aprendeu até agora)
const botaoAtualizar = document.getElementById("btnAtualizar");

botaoAtualizar.addEventListener("click", function() {
  document.getElementById("totalCargas").innerText = "25";
  document.getElementById("emAndamento").innerText = "10";
  document.getElementById("finalizadas").innerText = "15";
  document.getElementById("ultimaAtualizacao").innerText = "Atualizado agora";
});
