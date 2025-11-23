document.addEventListener('DOMContentLoaded', () => {
    const cartKey = 'carrinhoGuitas';

    // === Funções do carrinho ===
    const getCart = () => JSON.parse(localStorage.getItem(cartKey) || '[]');
    const saveCart = (cart) => localStorage.setItem(cartKey, JSON.stringify(cart));

    const updateCartCount = () => {
        const count = getCart().reduce((acc, item) => acc + (item.quantidade || 1), 0);
        document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
    };

    // Adicionar ao carrinho (permite repetir produto aumentando quantidade)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const p = btn.closest('.produto');
            const item = {
                id: p.dataset.id,
                nome: p.dataset.nome,
                preco: parseFloat(p.dataset.preco),
                imagem: p.dataset.imagem || 'produtos/placeholder.jpg',
                quantidade: 1
            };

            let cart = getCart();
            const existente = cart.find(i => i.id === item.id);
            if (existente) {
                existente.quantidade++;
            } else {
                cart.push(item);
            }

            saveCart(cart);
            updateCartCount();
            alert(`${item.nome} adicionado!`);
        });
    });

    // === Página do carrinho (carrinho.html) ===
    const listaCarrinho = document.getElementById('carrinho-lista');
    if (listaCarrinho) {
        const subtotalEl = document.querySelector('#subtotal');
    const totalEl = document.querySelector('#total');

        const renderCart = () => {
            listaCarrinho.innerHTML = '';
            const cart = getCart();
            let subtotal = 0;

            if (cart.length === 0) {
                listaCarrinho.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Seu carrinho está vazio.</p>';
                subtotalEl.textContent = 'Subtotal: R$ 0,00';
                totalEl.textContent = 'Total: R$ 0,00';
                return;
            }

            cart.forEach((item, index) => {
                const li = document.createElement('article');
                li.className = 'item-carrinho';
                li.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div>
                        <h4>${item.nome}</h4>
                        <p>R$ ${item.preco.toFixed(2)}</p>
                        <div class="quantidade">
                            <button type="button" class="diminuir" data-index="${index}">-</button>
                            <input type="number" value="${item.quantidade}" min="1" data-index="${index}">
                            <button type="button" class="aumentar" data-index="${index}">+</button>
                        </div>
                        <button type="button" class="remover" data-index="${index}">Remover</button>
                    </div>
                `;
                listaCarrinho.appendChild(li);
                subtotal += item.preco * item.quantidade;
            });

            subtotalEl.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
            totalEl.textContent = `Total: R$ ${subtotal.toFixed(2)}`;
        };

        // Eventos de quantidade e remoção
        listaCarrinho.addEventListener('click', e => {
            const index = e.target.dataset.index;
            if (!index) return;
            let cart = getCart();

            if (e.target.classList.contains('remover')) {
                cart.splice(index, 1);
            } else if (e.target.classList.contains('aumentar')) {
                cart[index].quantidade++;
            } else if (e.target.classList.contains('diminuir')) {
                if (cart[index].quantidade > 1) cart[index].quantidade--;
                else cart.splice(index, 1);
            }

            saveCart(cart);
            renderCart();
            updateCartCount();
        });

        // Mudança manual no input de quantidade
        listaCarrinho.addEventListener('change', e => {
            if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
                const index = e.target.dataset.index;
                let qtd = parseInt(e.target.value);
                if (qtd < 1) qtd = 1;
                let cart = getCart();
                cart[index].quantidade = qtd;
                saveCart(cart);
                renderCart();
                updateCartCount();
            }
        });

        renderCart();
    }

    // === Filtros, busca, etc (mantidos iguais) ===
    // (cole aqui o resto do seu código original de filtros, busca, login, etc)
    updateCartCount();
});