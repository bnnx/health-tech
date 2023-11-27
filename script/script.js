// Carregar os itens do Local Storage ao iniciar a página
document.addEventListener("DOMContentLoaded", function () {
  carregarLista();
});

// Código para limpar os campos do formulário
function limparCamposForm() {
  document.getElementById("pnome").value = "";
  document.getElementById("snome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("espec").value = "psico"; // voltar ao valor padrão.
  document.getElementById("horario").value = "Manhã"; // voltar ao valor padrão.
}

document
  .querySelector(".submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    //Obter valores dos campos
    const nome = document.getElementById("pnome").value;
    const sobrenome = document.getElementById("snome").value;
    const email = document.getElementById("email").value;
    const idade = document.getElementById("idade").value;
    const especialidade = document.getElementById("espec").value;
    const horario = document.getElementById("horario").value;

    // Validar se os campos estão preenchidos
    if (nome && sobrenome && email && idade && especialidade && horario) {
      // Criar um objeto com os dados do formulário
      const consulta = {
        data: new Date().toLocaleString(), // Adiciona a data do envio
        nome,
        sobrenome,
        email,
        idade,
        especialidade,
        horario,
      };

      // Adiciona o item à lista e ao Local Storage
      adicionaItemLista(consulta);

      //Limpa os campos do formulário
      limparCamposForm();
    } else {
      alert("Preencha todos os campos do formulário.");
    }
  });

// Adicionar os itens na lista e ao Local Storage
function adicionaItemLista(consulta) {
  // Adicionar na lista da página
  const lista = document.getElementById("lista-consultas");
  const item = document.createElement("li");
  item.innerHTML = `
    <span>${consulta.data}</span>
    <span>${consulta.nome} ${consulta.sobrenome}</span>
    <span>${consulta.especialidade} - ${consulta.horario}</span>
    <button class="delete-button" onclick="excluirItem(this)">Excluir</button>
  `;
  lista.appendChild(item);

  //Adicionar ao Local Storage
  const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
  consultas.push(consulta);
  localStorage.setItem("consultas", JSON.stringify(consultas));
}

// Carregar a base da lista
function carregarLista() {
  const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
  const lista = document.getElementById("lista-consultas");

  consultas.forEach((consulta) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <span>${consulta.data}</span>
      <span>${consulta.nome} ${consulta.sobrenome}</span>
      <span>${consulta.especialidade} - ${consulta.horario}</span>
      <button class="delete-button" onclick="excluirItem(this)">Excluir</button>
    `;
    lista.appendChild(item);
  });
}

function excluirItem(button) {
  const item = button.parentElement;
  const lista = item.parentElement;

  //Remover do Local Storage
  const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
  const index = Array.from(lista.children).indexOf(item);
  consultas.splice(index, 1);
  localStorage.setItem("consultas", JSON.stringify(consultas));

  //Remover da lista na página
  lista.removeChild(item);
}

// Limpa o localStorage, exclui os items da lista e limpa os campos
function excluirTudo() {
  localStorage.clear("consultas");
  const lista = document.getElementById("lista-consultas");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  limparCamposForm();
}

// funcao de pesquisa usando nome do cliente como parametro
function search() {
  const searchText = document.getElementById("search").value;

  if (searchText && searchText.trim().length > 0) {
    const lista = document.getElementById("lista-consultas");
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }

    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    const normalizedText = searchText.trim().toLowerCase();
    const filtered = consultas.filter((con) => {
      const fullname = `${con.nome} ${con.sobrenome}`;
      return fullname.trim().toLowerCase().includes(normalizedText);
    });

    //criacao lista com filtro e adicao de botao e classes
    filtered.forEach((consulta) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <span>${consulta.data}</span>
        <span>${consulta.nome} ${consulta.sobrenome}</span>
        <span>${consulta.especialidade} - ${consulta.horario}</span>
        <button class="delete-button" onclick="excluirItem(this)">Excluir</button>
      `;
      lista.appendChild(item);
    });
  }
}

//funcao para limpar o filtro de pesquisa, retornando a lista completa
function clearSearch() {
  const lista = document.getElementById("lista-consultas");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  document.getElementById("search").value = "";
  carregarLista();
}
