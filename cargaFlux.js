let usuario; senha
function loginUsuario(){
    
usuario = document.getElementById("inputUsuario").value 
document.getElementById("inputUsuario").value = ''   

senha = document.getElementById("inputSenha").value 
document.getElementById("inputSenha").value = ''

document.getElementById('inputUsuario').focus()
}

const form = document.getElementById('formCadastro');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o envio tradicional do form

  // Captura os valores digitados
  const usuario = document.getElementById('usuario').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Cria um objeto com os dados
  const dadosUsuario = { usuario, email, senha };

  // Salva no localStorage (convertendo para texto)
  localStorage.setItem('usuarioCadastrado', JSON.stringify(dadosUsuario));

  alert('Cadastro realizado com sucesso!');
  
  // Redireciona para a tela de login
  window.location.href = 'inicial.html';
});

// Dashboard simples (versão com o que o Ka aprendeu até agora)
const botaoAtualizar = document.getElementById("btnAtualizar");

botaoAtualizar.addEventListener("click", function() {
  document.getElementById("totalCargas").innerText = "25";
  document.getElementById("emAndamento").innerText = "10";
  document.getElementById("finalizadas").innerText = "15";
  document.getElementById("ultimaAtualizacao").innerText = "Atualizado agora";
});