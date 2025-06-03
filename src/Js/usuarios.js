// Seleciona os elementos do DOM
const addUserForm = document.getElementById('addUserForm');
const usersTableBody = document.getElementById('usersTableBody');

// Dados iniciais
const initialUsers = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", profile: "Administrador" },
  { id: 2, name: "João Souza", email: "joao@email.com", profile: "Cliente" }
];

// Função para carregar usuários do localStorage ou usar os iniciais
function loadUsers() {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : initialUsers;
}

// Função para salvar usuários no localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Função para renderizar a tabela
function renderTable() {
  const users = loadUsers();
  usersTableBody.innerHTML = ''; // Limpa a tabela
  users.forEach((user, index) => {
    const row = usersTableBody.insertRow();
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.profile}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Editar</button>
        <button class="delete-btn" data-index="${index}">Excluir</button>
      </td>
    `;
    attachRowEvents(row, index);
  });
}

// Função para adicionar eventos às linhas
function attachRowEvents(row, index) {
  const editBtn = row.querySelector('.edit-btn');
  const deleteBtn = row.querySelector('.delete-btn');

  editBtn.addEventListener('click', function() {
    const users = loadUsers();
    const user = users[index];
    const name = prompt('Novo nome:', user.name);
    const email = prompt('Novo email:', user.email);
    const profile = prompt('Novo perfil (Administrador/Cliente):', user.profile);
    if (name && email && profile) {
      users[index] = { ...user, name, email, profile };
      saveUsers(users);
      renderTable();
    }
  });

  deleteBtn.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      const users = loadUsers();
      users.splice(index, 1);
      saveUsers(users);
      renderTable();
    }
  });
}

// Adicionar novo usuário
addUserForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('userId').value);
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const profile = document.getElementById('userProfile').value;

  const users = loadUsers();
  users.push({ id, name, email, profile });
  saveUsers(users);
  renderTable();
  addUserForm.reset();
});

// Renderizar a tabela ao carregar a página
renderTable();