class Produto {
      constructor(nome, preco, categoria) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
      }
    }

    class ProdutoManager {
      constructor() {
        this.produtos = JSON.parse(localStorage.getItem('produtos')) || [];
      }

      adicionarProduto(produto) {
        this.produtos.push(produto);
        this.salvar();
      }

      removerProduto(index) {
        this.produtos.splice(index, 1);
        this.salvar();
      }

      listarProdutos() {
        return this.produtos;
      }

      salvar() {
        localStorage.setItem('produtos', JSON.stringify(this.produtos));
      }
    }

    const produtoManager = new ProdutoManager();
    const form = document.getElementById('formProduto');
    const lista = document.getElementById('listaProdutos');

    function renderizarProdutos() {
      lista.innerHTML = '';
      produtoManager.listarProdutos().forEach((produto, index) => {
        const div = document.createElement('div');
        div.className = 'produto';
        div.innerHTML = `
          <strong>${produto.nome}</strong><br>
          Preço: R$ ${parseFloat(produto.preco).toFixed(2)}<br>
          Categoria: ${produto.categoria}
          <span class="remover" onclick="removerProduto(${index})">[remover]</span>
        `;
        lista.appendChild(div);
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const preco = document.getElementById('preco').value;
      const categoria = document.getElementById('categoria').value;

      const produto = new Produto(nome, preco, categoria);
      produtoManager.adicionarProduto(produto);
      renderizarProdutos();
      form.reset();
    });

    function removerProduto(index) {
      produtoManager.removerProduto(index);
      renderizarProdutos();
    }

    // Inicializa a lista ao carregar
    renderizarProdutos();