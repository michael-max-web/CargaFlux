// Função de agendar carga
function salvar_agendamento() {

    // Recebe os dados digitados nos meus inputs ou campos de formulário
    let dt = document.getElementById("dt").value;
    let cliente = document.getElementById("cliente").value;
    let tipo = document.getElementById("tipo").value;
    let nome = document.getElementById("nomeMotorista").value;
    let placa = document.getElementById("placa").value;
    let peso = document.getElementById("peso").value;
    let valor = document.getElementById("valor").value;
    let data = document.getElementById("dataCarga").value;
    let hora = document.getElementById("horaCarga").value;

    // Busca no localStorage a lista de cargas que vão sendo cadastradas
    let lista = localStorage.getItem("cargas");

    // Cria um array vazio se ainda não existir nenhum dado
    let arr = [];

    // Se já existir uma lista de dados converte o texto em objeto ou array
    if (lista != null) {
        arr = JSON.parse(lista);
    }

    // Verifica se já existe uma carga com a mesma placa data e hora para evitar agendamentos duplicados
    let duplicado = arr.some(item =>
        item.placa === placa &&
        item.data === data &&
        item.hora === hora
    );

    // Caso exista um agendamento igual me mostra uma mensagem e cancela o processo
    if (duplicado) {
        alert("Já existe um agendamento para esta PLACA na mesma DATA e HORA!");
        return;
    }

    // Se não houver nada duplicado inclui o novo agendamento no array
    arr.push({
        dt: dt,
        cliente: cliente,
        tipo: tipo,
        nome: nome,
        placa: placa,
        peso: peso,
        valor: valor,
        data: data,
        hora: hora,
        status: "agendado",       // Define o status padrão da carga
        liberacao: "aguardando"   // Define o status padrão da liberação
    });

    // Salva o array atualizado como texto no localStorage
    localStorage.setItem("cargas", JSON.stringify(arr));

    // Mostra uma mensagem de cinfirmação
    alert("Carga agendada!");
}
