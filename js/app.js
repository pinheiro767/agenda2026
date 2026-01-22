// 🔹 Carrega projetos com segurança
let projetos = [];

try {
  projetos = JSON.parse(localStorage.getItem("projetos")) || [];
} catch (e) {
  projetos = [];
  localStorage.removeItem("projetos");
}

// 🔹 Salvar projeto
function salvarProjeto() {
  const nome = document.getElementById("nome").value.trim();
  const tipo = document.getElementById("tipo").value;
  const status = document.getElementById("status").value;
  const obs = document.getElementById("obs").value.trim();

  if (!nome) {
    alert("Digite o nome do projeto.");
    return;
  }

  const projeto = {
    id: crypto.randomUUID(),
    nome,
    tipo,
    status,
    obs
  };

  projetos.push(projeto);
  persistirProjetos();
  limparFormulario();
  mostrarProjetos();
}

// 🔹 Persistência centralizada
function persistirProjetos() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

// 🔹 Mostrar projetos
function mostrarProjetos() {
  const lista = document.getElementById("listaProjetos");
  lista.innerHTML = "";

  if (projetos.length === 0) {
    lista.innerHTML = "<p class='text-slate-500 text-sm'>Nenhum projeto cadastrado.</p>";
    return;
  }

  projetos.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "projeto";

    div.innerHTML = `
      <b>${p.nome}</b> (${p.tipo})<br>
      <span class="status">Status:</span> ${p.status}<br>
      ${p.obs ? p.obs + "<br><br>" : "<br>"}
      <button onclick="removerProjeto(${index})">Remover</button>
    `;

    lista.appendChild(div);
  });
}

// 🔹 Remover projeto
function removerProjeto(index) {
  if (!confirm("Deseja remover este projeto?")) return;

  projetos.splice(index, 1);
  persistirProjetos();
  mostrarProjetos();
}

// 🔹 Limpar formulário
function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("obs").value = "";
  document.getElementById("tipo").selectedIndex = 0;
  document.getElementById("status").selectedIndex = 0;
}

// 🔹 Inicialização
mostrarProjetos();
