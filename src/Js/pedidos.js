// Seleciona os elementos do DOM
const addOrderForm = document.getElementById('addOrderForm');
const ordersTableBody = document.getElementById('ordersTableBody');

// Dados iniciais
const initialOrders = [
  { id: 101, user: "João", status: "Enviado", date: "22/05/2025" }
];

// Função para carregar pedidos do localStorage ou usar os iniciais
function loadOrders() {
  const storedOrders = localStorage.getItem('orders');
  return storedOrders ? JSON.parse(storedOrders) : initialOrders;
}

// Função para salvar pedidos no localStorage
function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Função para renderizar a tabela
function renderTable() {
  const orders = loadOrders();
  ordersTableBody.innerHTML = ''; // Limpa a tabela
  orders.forEach((order, index) => {
    const row = ordersTableBody.insertRow();
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.user}</td>
      <td>${order.status}</td>
      <td>${order.date}</td>
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
    const orders = loadOrders();
    const order = orders[index];
    const user = prompt('Novo usuário:', order.user);
    const status = prompt('Novo status (Enviado/Pendente):', order.status);
    const date = prompt('Nova data (dd/mm/aaaa):', order.date);
    if (user && status && date) {
      orders[index] = { ...order, user, status, date };
      saveOrders(orders);
      renderTable();
    }
  });

  deleteBtn.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      const orders = loadOrders();
      orders.splice(index, 1);
      saveOrders(orders);
      renderTable();
    }
  });
}

// Adicionar novo pedido
addOrderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('orderId').value);
  const user = document.getElementById('orderUser').value;
  const status = document.getElementById('orderStatus').value;
  const date = document.getElementById('orderDate').value.split('-').reverse().join('/');

  const orders = loadOrders();
  orders.push({ id, user, status, date });
  saveOrders(orders);
  renderTable();
  addOrderForm.reset();
});

// Renderizar a tabela ao carregar a página
renderTable();