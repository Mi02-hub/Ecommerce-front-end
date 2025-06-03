// Seleciona os elementos do DOM
const addProductForm = document.getElementById('addProductForm');
const productsTableBody = document.getElementById('productsTableBody');

// Dados iniciais
const initialProducts = [
  { id: 1, name: "Notebook", price: "3000", category: "Informática" }
];

// Função para carregar produtos do localStorage ou usar os iniciais
function loadProducts() {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : initialProducts;
}

// Função para salvar produtos no localStorage
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Função para renderizar a tabela
function renderTable() {
  const products = loadProducts();
  productsTableBody.innerHTML = ''; // Limpa a tabela
  products.forEach((product, index) => {
    const row = productsTableBody.insertRow();
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>R$ ${product.price}</td>
      <td>${product.category}</td>
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
    const products = loadProducts();
    const product = products[index];
    const name = prompt('Novo nome:', product.name);
    const price = prompt('Novo preço (R$):', product.price);
    const category = prompt('Nova categoria:', product.category);
    if (name && price && category) {
      products[index] = { ...product, name, price, category };
      saveProducts(products);
      renderTable();
    }
  });

  deleteBtn.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const products = loadProducts();
      products.splice(index, 1);
      saveProducts(products);
      renderTable();
    }
  });
}

// Adicionar novo produto
addProductForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('productId').value);
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const category = document.getElementById('productCategory').value;

  const products = loadProducts();
  products.push({ id, name, price, category });
  saveProducts(products);
  renderTable();
  addProductForm.reset();
});

// Renderizar a tabela ao carregar a página
renderTable();