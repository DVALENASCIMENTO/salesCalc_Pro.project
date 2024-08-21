// Função para carregar os dados salvos no localStorage
function carregarDados() {
    document.getElementById('vendas').value = localStorage.getItem('vendas') || '';
    document.getElementById('porcentagem').value = localStorage.getItem('porcentagem') || '';
    document.getElementById('salario').value = localStorage.getItem('salario') || '';
    document.getElementById('quebraCx').value = localStorage.getItem('quebraCx') || '';
    calcularTotal(); // Calcula o total ao carregar os dados
}

// Função para salvar os dados no localStorage
function salvarDados() {
    localStorage.setItem('vendas', document.getElementById('vendas').value);
    localStorage.setItem('porcentagem', document.getElementById('porcentagem').value);
    localStorage.setItem('salario', document.getElementById('salario').value);
    localStorage.setItem('quebraCx', document.getElementById('quebraCx').value);
}

function calcularTotal() {
    let vendas = parseFloat(document.getElementById('vendas').value) || 0;
    let porcentagem = parseFloat(document.getElementById('porcentagem').value) || 0;
    let salario = parseFloat(document.getElementById('salario').value) || 0;
    let quebraCx = parseFloat(document.getElementById('quebraCx').value) || 0;

    let comissao = vendas * (porcentagem / 100);
    let total = comissao + salario + quebraCx;

    document.getElementById('comissao').value = comissao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('total').textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    salvarDados(); // Salva os dados toda vez que o cálculo é realizado
}

// Chama a função para carregar os dados ao iniciar a página
window.onload = carregarDados;
