let projetos = JSON.parse(localStorage.getItem("projetos")) || [];

function salvarProjeto() {
  const projeto = {
    nome: document.getElementById("nome").value,
    tipo: document.getElementById("tipo").value,
    status: document.getElementById("status").value,
    obs: document.getElementById("obs").value
  };

  if (projeto.nome === "") {
    alert("Digite o nome do projeto");
    return;
  }

  projetos.push(projeto);
  localStorage.setItem("projetos", JSON.stringify(projetos));

  limparFormulario();
  mostrarProjetos();
}

function mostrarProjetos() {
  const lista = document.getElementById("listaProjetos");
  lista.innerHTML = "";

  projetos.forEach((p, index) => {
    lista.innerHTML += `
      <div class="projeto">
        <b>${p.nome}</b> (${p.tipo})<br>
        <span class="status">Status:</span> ${p.status}<br>
        ${p.obs}<br><br>
        <button onclick="removerProjeto(${index})">Remover</button>
      </div>
    `;
  });
}

function removerProjeto(index) {
  projetos.splice(index, 1);
  localStorage.setItem("projetos", JSON.stringify(projetos));
  mostrarProjetos();
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("obs").value = "";
}

mostrarProjetos();
