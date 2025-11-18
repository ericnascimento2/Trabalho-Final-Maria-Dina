document.addEventListener('DOMContentLoaded', () => {
    // Carrinho com localStorage
    const cartKey = 'carrinho';
    function getCart() {
        return JSON.parse(localStorage.getItem(cartKey) || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = getCart();
        const countElements = document.querySelectorAll('.cart-count');
        countElements.forEach(el => el.textContent = cart.length);
    }

    // Adicionar ao carrinho
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.closest('.produto');
            const item = {
                id: product.dataset.id,
                nome: product.dataset.nome,
                preco: product.dataset.preco
            };
            let cart = getCart();
            cart.push(item);
            saveCart(cart);
            updateCartCount();
            alert(`${item.nome} adicionado ao carrinho!`);
        });
    });

    // Carregar carrinho em carrinho.html
    if (document.getElementById('carrinho-lista')) {
        const lista = document.getElementById('carrinho-lista');
        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total');

        function renderCart() {
            lista.innerHTML = '';
            let cart = getCart();
            let subtotal = 0;
            cart.forEach((item, index) => {
                const article = document.createElement('article');
                article.classList.add('item');
                article.innerHTML = `
                    <img src="placeholder.jpg" alt="${item.nome}">
                    <div>
                        <h4>${item.nome}</h4>
                        <p>Preço: R$ ${parseFloat(item.preco).toFixed(2)}</p>
                        <label for="quantidade-${index}">Quantidade:</label>
                        <input type="number" id="quantidade-${index}" value="1" min="1">
                        <button type="button" class="remove-item" data-index="${index}">Remover</button>
                    </div>
                `;
                lista.appendChild(article);
                subtotal += parseFloat(item.preco);
            });
            subtotalEl.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
            totalEl.textContent = `Total: R$ ${subtotal.toFixed(2)}`; // Frete a calcular

            // Remover item
            const removeButtons = lista.querySelectorAll('.remove-item');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.index;
                    let cart = getCart();
                    cart.splice(index, 1);
                    saveCart(cart);
                    renderCart();
                    updateCartCount();
                });
            });
        }
        renderCart();
    }

    // Toggle busca
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.getElementById('search-box');
    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', () => {
            const expanded = searchToggle.getAttribute('aria-expanded') === 'true';
            searchToggle.setAttribute('aria-expanded', !expanded);
            searchBox.style.display = expanded ? 'none' : 'block';
            if (!expanded) document.getElementById('search-input').focus();
        });
    }

    // Filtro por marca em produtos.html
    const radioModelos = document.querySelectorAll('input[name="modelo"]');
    radioModelos.forEach(radio => {
        radio.addEventListener('change', () => {
            const modelo = radio.value;
            const produtos = document.querySelectorAll('.produto');
            produtos.forEach(prod => {
                if (modelo === 'todas' || prod.dataset.modelo === modelo) {
                    prod.style.display = 'block';
                } else {
                    prod.style.display = 'none';
                }
            });
        });
    });

    // Validação de login
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = formLogin['email-login'].value;
            const senha = formLogin['senha-login'].value;
            if (email && senha) {
                alert('Login realizado! (Simulado)');
                // Redirecionar ou autenticar real
            } else {
                alert('Preencha todos os campos.');
            }
        });
    }

    // Máscara CEP e validação compra
    const formCompra = document.getElementById('compra-form');
    if (formCompra) {
        const cepInput = formCompra.cep;
        cepInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });

        const pagamentoSelect = formCompra.pagamento;
        const cartaoCampos = document.getElementById('cartao-campos');
        pagamentoSelect.addEventListener('change', () => {
            cartaoCampos.style.display = pagamentoSelect.value === 'cartao' ? 'block' : 'none';
        });

        formCompra.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pedido concluído! (Simulado)');
            localStorage.removeItem(cartKey); // Limpa carrinho
            updateCartCount();
        });
    }

    updateCartCount();
});