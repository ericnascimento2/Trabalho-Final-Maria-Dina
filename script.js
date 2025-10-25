// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Interatividade para Botões "Adicionar ao Carrinho" ---
    const botoesAdicionar = document.querySelectorAll('.produto button');
    
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            alert('Produto adicionado ao carrinho! (Funcionalidade a ser implementada)');
            // Aqui você implementaria a lógica real para adicionar o item
        });
    });

    // --- Validação Simples do Formulário de Login ---
    const formLogin = document.querySelector('#login-form form');

    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            // Previne o envio padrão do formulário
            event.preventDefault(); 
            
            const email = document.querySelector('#email-login').value;
            const senha = document.querySelector('#senha-login').value;

            if (email === '' || senha === '') {
                alert('Por favor, preencha todos os campos.');
            } else {
                alert('Login enviado! (Funcionalidade de autenticação a ser implementada)');
                // Aqui você enviaria os dados para um servidor para autenticação
                formLogin.submit(); // Exemplo de como reenviar o formulário
            }
        });
    }

    // --- Lógica para o botão "Remover" do carrinho ---
    const botoesRemover = document.querySelectorAll('.item button');
    
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', () => {
            // Encontra o 'article' pai do botão e o remove da tela
            const itemParaRemover = botao.closest('.item');
            if (itemParaRemover) {
                itemParaRemover.remove();
                alert('Item removido!');
                // Aqui você atualizaria o subtotal e o total
            }
        });
    });

});